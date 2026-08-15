import { Router } from 'express';
import { findUserOrThrow, nextId, store } from '../data/store.js';

const router = Router();

const pricing = { Mensual: 80000, Trimestral: 210000, Anual: 720000 };
const months = { Mensual: 1, Trimestral: 3, Anual: 12 };

router.post('/asignar', (req, res, next) => {
  try {
    const data = req.body ?? {};
    const user = findUserOrThrow(data.usuario?.id);
    if (!pricing[data.tipo]) {
      const error = new Error('El tipo debe ser Mensual, Trimestral o Anual');
      error.status = 400;
      error.code = 'VALIDATION_ERROR';
      throw error;
    }
    const fechaInicio = new Date();
    const fechaFin = new Date(fechaInicio);
    fechaFin.setMonth(fechaFin.getMonth() + months[data.tipo]);
    const membresia = {
      id: nextId(store.membresias),
      usuario: { id: user.id, nombreCompleto: user.nombreCompleto },
      tipo: data.tipo,
      valor: pricing[data.tipo],
      fechaInicio: fechaInicio.toISOString().slice(0, 10),
      fechaFin: fechaFin.toISOString().slice(0, 10)
    };
    store.membresias.push(membresia);
    res.status(201).json(membresia);
  } catch (error) {
    next(error);
  }
});

router.get('/usuario/:usuarioId', (req, res, next) => {
  try {
    const user = findUserOrThrow(req.params.usuarioId);
    res.status(200).json(store.membresias.filter((item) => item.usuario.id === user.id));
  } catch (error) {
    next(error);
  }
});

export default router;
