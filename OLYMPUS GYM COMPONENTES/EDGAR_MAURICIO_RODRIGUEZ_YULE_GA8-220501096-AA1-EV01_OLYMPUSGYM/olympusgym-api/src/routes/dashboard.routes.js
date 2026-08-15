import { Router } from 'express';
import { store } from '../data/store.js';

const router = Router();

router.get('/stats', (req, res) => {
  const totalIngresos = store.membresias.reduce((sum, membresia) => sum + membresia.valor, 0);
  res.status(200).json({
    totalUsuarios: store.users.length,
    totalClientes: store.users.filter((user) => user.rol === 'cliente').length,
    totalRutinas: store.rutinas.length,
    totalIngresos
  });
});

export default router;
