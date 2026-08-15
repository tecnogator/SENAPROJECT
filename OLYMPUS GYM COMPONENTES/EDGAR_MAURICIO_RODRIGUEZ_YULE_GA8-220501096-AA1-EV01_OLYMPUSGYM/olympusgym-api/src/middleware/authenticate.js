import { findUserOrThrow } from '../data/store.js';
import { verifyToken } from '../utils/security.js';

export function authenticate(req, res, next) {
  try {
    const authorization = req.get('authorization') ?? '';
    const token = authorization.startsWith('Bearer ') ? authorization.slice(7) : '';
    const payload = verifyToken(token);
    if (!payload) {
      const error = new Error('Se requiere un token de acceso válido');
      error.status = 401;
      error.code = 'UNAUTHORIZED';
      throw error;
    }
    req.user = findUserOrThrow(payload.sub);
    next();
  } catch (error) {
    next(error);
  }
}
