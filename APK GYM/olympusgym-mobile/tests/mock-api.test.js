import test from 'node:test'
import assert from 'node:assert/strict'
import { mockApi, resetMockData } from '../src/services/mockApi.js'

test.beforeEach(() => resetMockData())

test('registra usuario y entrega token', async () => {
  const session = await mockApi.auth.register({ nombreCompleto: 'Edgar Rodríguez', email: 'EDGAR@OLYMPUSGYM.TEST', password: 'Olympus123*' })
  assert.equal(session.email, 'edgar@olympusgym.test')
  assert.ok(session.token)
})

test('crea y consulta una rutina', async () => {
  await mockApi.routines.create({ usuario: { id: 2 }, dia: 'Lunes', ejercicio: 'Press de banca', series: 4, repeticiones: 12 })
  const routines = await mockApi.routines.byUser(2)
  assert.equal(routines.length, 1)
  assert.equal(routines[0].ejercicio, 'Press de banca')
})

test('integra plan, suplemento y membresía', async () => {
  await mockApi.plans.create({ usuario: { id: 2 }, titulo: 'Definición', objetivo: 'Definición', descripcion: 'Plan', calorias: 2000, proteinas: 180, carbohidratos: 150, grasas: 50, fechaInicio: '2026-08-14', fechaFin: '2026-10-09' })
  await mockApi.supplements.create({ usuario: { id: 2 }, nombre: 'Proteína Whey', dosis: '30 g', horario: 'Post-entreno' })
  await mockApi.memberships.create({ usuario: { id: 2 }, tipo: 'Mensual' })
  assert.equal((await mockApi.plans.byUser(2)).length, 1)
  assert.equal((await mockApi.supplements.byUser(2)).length, 1)
  assert.equal((await mockApi.memberships.byUser(2))[0].valor, 80000)
})

test('dashboard refleja los módulos creados', async () => {
  await mockApi.routines.create({ usuario: { id: 2 }, dia: 'Martes', ejercicio: 'Sentadilla', series: 4, repeticiones: 10 })
  await mockApi.memberships.create({ usuario: { id: 2 }, tipo: 'Trimestral' })
  const stats = await mockApi.dashboard.stats()
  assert.equal(stats.totalRutinas, 1)
  assert.equal(stats.totalIngresos, 210000)
})
