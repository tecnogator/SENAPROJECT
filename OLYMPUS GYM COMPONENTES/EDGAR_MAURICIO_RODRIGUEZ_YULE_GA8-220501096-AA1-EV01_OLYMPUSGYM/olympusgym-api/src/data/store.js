import fs from 'node:fs';
import path from 'node:path';
import { hashPassword } from '../utils/security.js';

function seedData() {
  return {
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
}

function databasePath() {
  return process.env.DATA_FILE ?? path.resolve(process.cwd(), 'data', 'olympusgym.json');
}

function loadData() {
  const target = databasePath();
  if (target === ':memory:' || !fs.existsSync(target)) return seedData();
  try {
    return { ...seedData(), ...JSON.parse(fs.readFileSync(target, 'utf8')) };
  } catch {
    return seedData();
  }
}

export const store = loadData();

export function persistStore() {
  const target = databasePath();
  if (target === ':memory:') return;
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, `${JSON.stringify(store, null, 2)}\n`, 'utf8');
}

export function resetStore() {
  const seed = seedData();
  for (const key of Object.keys(seed)) {
    store[key].splice(0, store[key].length, ...seed[key]);
  }
  persistStore();
}

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
