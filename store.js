import { hashPassword } from '../utils/security.js';

export const store = {
  users: [
    {
      id: 1,
      nombreCompleto: 'Administrador OlympusGym',
      email: 'admin@olympusgym.test',
      passwordHash: hashPassword('Admin123*'),
      rol: 'admin'
    }
  ],
  planes: [],
  rutinas: [],
  suplementos: [],
  membresias: []
};

export function nextId(collection) {
  return collection.length === 0
    ? 1
    : Math.max(...collection.map((item) => item.id)) + 1;
}

export function findUserOrThrow(userId) {
  const user = store.users.find((item) => item.id === Number(userId));
  if (!user) {
    const error = new Error(`No existe el usuario con id ${userId}`);
    error.status = 404;
    error.code = 'USER_NOT_FOUND';
    throw error;
  }
  return user;
}

export function publicUser(user) {
  const { passwordHash, ...safeUser } = user;
  return {
    ...safeUser,
    planesAlimentacion: store.planes.filter((item) => item.usuario.id === user.id),
    rutinas: store.rutinas.filter((item) => item.usuario.id === user.id),
    suplementos: store.suplementos.filter((item) => item.usuario.id === user.id),
    membresias: store.membresias.filter((item) => item.usuario.id === user.id)
  };
}
