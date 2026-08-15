import { Router } from 'express';
import { findUserOrThrow, nextId, persistStore, store } from '../data/store.js';

const router = Router();

router.post('/asignar', (req, res, next) => {
  try {
    const data = req.body ?? {};
    const user = findUserOrThrow(data.usuario?.id);
    const required = ['titulo', 'objetivo', 'descripcion', 'calorias', 'proteinas', 'carbohidratos', 'grasas', 'fechaInicio', 'fechaFin'];
    const missing = required.filter((field) => data[field] === undefined || data[field] === '');
    if (missing.length) {
      const error = new Error('El plan contiene campos incompletos');
      error.status = 400;
      error.code = 'VALIDATION_ERROR';
      error.details = missing.map((field) => ({ field, message: 'El campo es obligatorio' }));
      throw error;
    }
    const plan = {
      id: nextId(store.planes),
      usuario: { id: user.id, nombreCompleto: user.nombreCompleto },
      titulo: data.titulo,
      objetivo: data.objetivo,
      descripcion: data.descripcion,
      calorias: Number(data.calorias),
      proteinas: Number(data.proteinas),
      carbohidratos: Number(data.carbohidratos),
      grasas: Number(data.grasas),
      fechaInicio: data.fechaInicio,
      fechaFin: data.fechaFin
    };
    store.planes.push(plan);
    persistStore();
    res.status(201).json(plan);
  } catch (error) {
    next(error);
  }
});

router.get('/usuario/:usuarioId', (req, res, next) => {
  try {
    const user = findUserOrThrow(req.params.usuarioId);
    res.status(200).json(store.planes.filter((plan) => plan.usuario.id === user.id));
  } catch (error) {
    next(error);
  }
});

export default router;
