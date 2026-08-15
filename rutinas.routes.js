import { Router } from 'express';
import { findUserOrThrow, nextId, store } from '../data/store.js';

const router = Router();

router.post('/asignar', (req, res, next) => {
  try {
    const data = req.body ?? {};
    const user = findUserOrThrow(data.usuario?.id);
    const missing = ['dia', 'ejercicio', 'series', 'repeticiones'].filter(
      (field) => data[field] === undefined || data[field] === ''
    );
    if (missing.length) {
      const error = new Error('La rutina contiene campos incompletos');
      error.status = 400;
      error.code = 'VALIDATION_ERROR';
      error.details = missing.map((field) => ({ field, message: 'El campo es obligatorio' }));
      throw error;
    }
    const rutina = {
      id: nextId(store.rutinas),
      usuario: { id: user.id, nombreCompleto: user.nombreCompleto },
      dia: data.dia,
      ejercicio: data.ejercicio,
      series: Number(data.series),
      repeticiones: Number(data.repeticiones)
    };
    store.rutinas.push(rutina);
    res.status(201).json(rutina);
  } catch (error) {
    next(error);
  }
});

router.get('/usuario/:usuarioId', (req, res, next) => {
  try {
    const user = findUserOrThrow(req.params.usuarioId);
    res.status(200).json(store.rutinas.filter((rutina) => rutina.usuario.id === user.id));
  } catch (error) {
    next(error);
  }
});

export default router;
