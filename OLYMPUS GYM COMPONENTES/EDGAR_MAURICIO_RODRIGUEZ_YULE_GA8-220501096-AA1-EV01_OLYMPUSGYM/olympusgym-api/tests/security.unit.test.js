import assert from 'node:assert/strict';
import test from 'node:test';
import { hashPassword, issueToken, verifyPassword, verifyToken } from '../src/utils/security.js';

process.env.TOKEN_SECRET = 'olympusgym-unit-test-secret';

test('la contraseña se almacena mediante scrypt y no en texto plano', () => {
  const plain = 'Demo123*';
  const stored = hashPassword(plain);
  assert.notEqual(stored, plain);
  assert.match(stored, /^[a-f0-9]+:[a-f0-9]+$/);
  assert.equal(verifyPassword(plain, stored), true);
});

test('una contraseña incorrecta no supera la verificación', () => {
  const stored = hashPassword('Demo123*');
  assert.equal(verifyPassword('Incorrecta123*', stored), false);
});

test('el token firmado conserva usuario, rol y expiración', () => {
  const token = issueToken({ id: 7, rol: 'cliente' });
  const payload = verifyToken(token);
  assert.equal(payload.sub, 7);
  assert.equal(payload.role, 'cliente');
  assert.ok(payload.exp > payload.iat);
});

test('un token alterado es rechazado', () => {
  const token = issueToken({ id: 7, rol: 'cliente' });
  const altered = `${token.slice(0, -2)}xx`;
  assert.equal(verifyToken(altered), null);
});
