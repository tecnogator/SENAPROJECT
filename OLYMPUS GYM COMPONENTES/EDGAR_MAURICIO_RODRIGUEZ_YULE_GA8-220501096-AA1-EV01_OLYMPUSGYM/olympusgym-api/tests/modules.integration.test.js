import assert from 'node:assert/strict';
import { after, before, beforeEach, test } from 'node:test';

process.env.DATA_FILE = ':memory:';
process.env.TOKEN_SECRET = 'olympusgym-integration-test-secret';

const [{ default: app }, { resetStore }] = await Promise.all([
  import('../src/app.js'),
  import('../src/data/store.js')
]);

let server;
let baseUrl;

before(async () => {
  await new Promise((resolve) => {
    server = app.listen(0, '127.0.0.1', () => {
      baseUrl = `http://127.0.0.1:${server.address().port}`;
      resolve();
    });
  });
});

after(async () => {
  await new Promise((resolve) => server.close(resolve));
});

beforeEach(() => resetStore());

async function request(path, { token, ...options } = {}) {
  const response = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers: {
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers
    }
  });
  const body = await response.json();
  return { response, body };
}

async function register() {
  return request('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({
      nombreCompleto: 'Edgar Integración',
      email: 'edgar.integracion@olympusgym.test',
      password: 'Demo123*'
    })
  });
}

test('health identifica el runtime Node.js y Express', async () => {
  const { response, body } = await request('/health');
  assert.equal(response.status, 200);
  assert.equal(body.status, 'ok');
  assert.match(body.runtime, /^Node\.js/);
  assert.match(body.framework, /^Express/);
});

test('las rutas privadas rechazan solicitudes sin Bearer token', async () => {
  const { response, body } = await request('/api/dashboard/stats');
  assert.equal(response.status, 401);
  assert.equal(body.error, 'UNAUTHORIZED');
});

test('registro seguro devuelve token y nunca expone credenciales', async () => {
  const { response, body } = await register();
  assert.equal(response.status, 201);
  assert.equal(body.rol, 'cliente');
  assert.ok(body.token);
  assert.equal('password' in body, false);
  assert.equal('passwordHash' in body, false);
});

test('inicio de sesión autentica credenciales válidas', async () => {
  await register();
  const { response, body } = await request('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      email: 'edgar.integracion@olympusgym.test',
      password: 'Demo123*'
    })
  });
  assert.equal(response.status, 200);
  assert.ok(body.token);
  assert.equal(body.nombreCompleto, 'Edgar Integración');
});

test('integra rutinas, alimentación, suplementos y membresías', async () => {
  const { body: user } = await register();
  const token = user.token;
  const usuario = { id: user.id };

  const operations = [
    ['/api/rutinas/asignar', { usuario, dia: 'Lunes', ejercicio: 'Press de banca', series: 4, repeticiones: 12 }],
    ['/api/planes/asignar', {
      usuario,
      titulo: 'Definición 8 semanas',
      objetivo: 'Definición',
      descripcion: 'Plan nutricional integrado',
      calorias: 2000,
      proteinas: 180,
      carbohidratos: 150,
      grasas: 50,
      fechaInicio: '2026-08-14',
      fechaFin: '2026-10-09'
    }],
    ['/api/suplementos/asignar', { usuario, nombre: 'Proteína Whey', dosis: '30 g', horario: 'Post-entreno' }],
    ['/api/membresias/asignar', { usuario, tipo: 'Mensual' }]
  ];

  for (const [path, payload] of operations) {
    const { response, body } = await request(path, {
      token,
      method: 'POST',
      body: JSON.stringify(payload)
    });
    assert.equal(response.status, 201, `${path}: ${JSON.stringify(body)}`);
    assert.equal(body.usuario.id, user.id);
  }

  const collections = ['rutinas', 'planes', 'suplementos', 'membresias'];
  for (const collection of collections) {
    const { response, body } = await request(`/api/${collection}/usuario/${user.id}`, { token });
    assert.equal(response.status, 200);
    assert.equal(body.length, 1);
  }

  const { body: stats } = await request('/api/dashboard/stats', { token });
  assert.deepEqual(stats, {
    totalUsuarios: 2,
    totalClientes: 1,
    totalRutinas: 1,
    totalIngresos: 80000
  });
});

test('valida campos obligatorios y conserva un contrato de error', async () => {
  const { body: user } = await register();
  const { response, body } = await request('/api/rutinas/asignar', {
    token: user.token,
    method: 'POST',
    body: JSON.stringify({ usuario: { id: user.id }, dia: 'Martes', series: 3, repeticiones: 10 })
  });
  assert.equal(response.status, 400);
  assert.equal(body.error, 'VALIDATION_ERROR');
  assert.equal(body.details[0].field, 'ejercicio');
});

test('impide registrar correos duplicados', async () => {
  await register();
  const { response, body } = await register();
  assert.equal(response.status, 409);
  assert.equal(body.error, 'EMAIL_ALREADY_EXISTS');
});
