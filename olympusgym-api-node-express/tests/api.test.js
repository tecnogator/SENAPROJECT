import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import app from '../src/app.js';

let server;
let baseUrl;

before(async () => {
  await new Promise((resolve) => {
    server = app.listen(0, '127.0.0.1', () => {
      const { port } = server.address();
      baseUrl = `http://127.0.0.1:${port}`;
      resolve();
    });
  });
});

after(async () => {
  await new Promise((resolve) => server.close(resolve));
});

async function request(path, options = {}) {
  const response = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers: { 'content-type': 'application/json', ...options.headers }
  });
  const body = await response.json();
  return { response, body };
}

test('GET /health confirma Node.js y Express', async () => {
  const { response, body } = await request('/health');
  assert.equal(response.status, 200);
  assert.equal(body.status, 'ok');
  assert.match(body.technology, /Node\.js \+ Express/);
});

test('POST /api/auth/login autentica al usuario de demostración', async () => {
  const { response, body } = await request('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email: 'edgar@olympusgym.test', password: 'Olympus123*' })
  });
  assert.equal(response.status, 200);
  assert.equal(body.email, 'edgar@olympusgym.test');
  assert.ok(body.token);
  assert.equal(body.passwordHash, undefined);
});

test('módulos integrados crean y consultan información del usuario', async () => {
  const create = await request('/api/rutinas/asignar', {
    method: 'POST',
    body: JSON.stringify({
      usuario: { id: 2 },
      dia: 'Lunes',
      ejercicio: 'Press de banca',
      series: 4,
      repeticiones: 12
    })
  });
  assert.equal(create.response.status, 201);

  const list = await request('/api/rutinas/usuario/2');
  assert.equal(list.response.status, 200);
  assert.ok(list.body.some((item) => item.ejercicio === 'Press de banca'));
});

test('la API responde errores de validación uniformes', async () => {
  const { response, body } = await request('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email: 'edgar@olympusgym.test' })
  });
  assert.equal(response.status, 400);
  assert.equal(body.error, 'VALIDATION_ERROR');
  assert.equal(body.path, '/api/auth/login');
});
