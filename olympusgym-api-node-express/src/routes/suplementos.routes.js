import { Router } from 'express';
import { findUserOrThrow, nextId, store } from '../data/store.js';

const router = Router();

router.post('/asignar', (req, res, next) => {
  try {
    const data = req.body ?? {};
    const user = findUserOrThrow(data.usuario?.id);
    const missing = ['nombre', 'dosis', 'horario'].filter((field) => !data[field]);
    if (missing.length) {
      const error = new Error('El suplemento contiene campos incompletos');
      error.status = 400;
      error.code = 'VALIDATION_ERROR';
      error.details = missing.map((field) => ({ field, message: 'El campo es obligatorio' }));
      throw error;
    }
    const suplemento = {
      id: nextId(store.suplementos),
      usuario: { id: user.id, nombreCompleto: user.nombreCompleto },
      nombre: data.nombre,
      dosis: data.dosis,
      horario: data.horario
    };
    store.suplementos.push(suplemento);
    res.status(201).json(suplemento);
  } catch (error) {
    next(error);
  }
});

export default router;
