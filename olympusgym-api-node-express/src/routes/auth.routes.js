import { Router } from 'express';
import { nextId, publicUser, store } from '../data/store.js';
import { hashPassword, issueDemoToken, verifyPassword } from '../utils/security.js';

const router = Router();

router.post('/register', (req, res, next) => {
  try {
    const { nombreCompleto, email, password } = req.body ?? {};
    const missing = ['nombreCompleto', 'email', 'password'].filter((field) => !req.body?.[field]);
    if (missing.length) {
      const error = new Error('Faltan campos obligatorios');
      error.status = 400;
      error.code = 'VALIDATION_ERROR';
      error.details = missing.map((field) => ({ field, message: 'El campo es obligatorio' }));
      throw error;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      const error = new Error('El email no tiene un formato válido');
      error.status = 400;
      error.code = 'VALIDATION_ERROR';
      throw error;
    }
    if (String(password).length < 8) {
      const error = new Error('La contraseña debe tener al menos 8 caracteres');
      error.status = 400;
      error.code = 'VALIDATION_ERROR';
      throw error;
    }
    if (store.users.some((user) => user.email.toLowerCase() === email.toLowerCase())) {
      const error = new Error('El email ya se encuentra registrado');
      error.status = 409;
      error.code = 'EMAIL_ALREADY_EXISTS';
      throw error;
    }

    const user = {
      id: nextId(store.users),
      nombreCompleto: nombreCompleto.trim(),
      email: email.toLowerCase(),
      passwordHash: hashPassword(password),
      rol: 'cliente'
    };
    store.users.push(user);
    res.status(201).json(publicUser(user));
  } catch (error) {
    next(error);
  }
});

router.post('/login', (req, res, next) => {
  try {
    const { email, password } = req.body ?? {};
    if (!email || !password) {
      const error = new Error('Email y contraseña son obligatorios');
      error.status = 400;
      error.code = 'VALIDATION_ERROR';
      throw error;
    }
    const user = store.users.find((item) => item.email === email.toLowerCase());
    if (!user || !verifyPassword(password, user.passwordHash)) {
      const error = new Error('Credenciales incorrectas');
      error.status = 401;
      error.code = 'INVALID_CREDENTIALS';
      throw error;
    }
    res.status(200).json({ ...publicUser(user), token: issueDemoToken(user.id) });
  } catch (error) {
    next(error);
  }
});

export default router;
