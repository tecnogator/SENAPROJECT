import { createMembership } from '../domain/membership.js'

const delay = (ms = 120) => new Promise((resolve) => setTimeout(resolve, ms))
const user = { id: 2, nombreCompleto: 'Edgar Rodríguez', email: 'edgar@olympusgym.test', rol: 'cliente', token: 'demo-token-olympusgym' }
let routines = [{ id: 1, dia: 'Lunes', ejercicio: 'Press de banca', series: 4, repeticiones: 12 }]
let plans = [{ id: 1, titulo: 'Definición 8 semanas', objetivo: 'Definición', descripcion: 'Plan equilibrado para disminuir grasa corporal.', calorias: 2000, proteinas: 180, carbohidratos: 150, grasas: 50, fechaInicio: '2026-08-14', fechaFin: '2026-10-09' }]
let supplements = [{ id: 1, nombre: 'Proteína Whey', dosis: '30 g', horario: 'Post-entreno' }]
let memberships = [{ id: 1, ...createMembership('Mensual', '2026-08-14') }]

const withUser = (item) => ({ ...item, usuario: { id: user.id, nombreCompleto: user.nombreCompleto, email: user.email, rol: user.rol } })

export const mockApi = {
  auth: {
    async login(credentials) {
      await delay()
      if (!credentials.email || !credentials.password) throw new Error('Credenciales incompletas')
      return { ...user, email: credentials.email.trim().toLowerCase() }
    },
    async register(payload) {
      await delay()
      return { ...user, nombreCompleto: payload.nombreCompleto.trim(), email: payload.email.trim().toLowerCase() }
    },
  },
  dashboard: {
    async stats() {
      await delay()
      return { totalUsuarios: 12, totalClientes: 10, totalRutinas: routines.length, totalIngresos: memberships.reduce((sum, item) => sum + item.valor, 0) }
    },
  },
  routines: {
    async byUser() { await delay(); return routines.map(withUser) },
    async create(payload) { await delay(); const created = withUser({ id: routines.length + 1, ...payload }); routines = [created, ...routines]; return created },
  },
  plans: {
    async byUser() { await delay(); return plans.map(withUser) },
    async create(payload) { await delay(); const created = withUser({ id: plans.length + 1, ...payload }); plans = [created, ...plans]; return created },
  },
  supplements: {
    async byUser() { await delay(); return supplements.map(withUser) },
    async create(payload) { await delay(); const created = withUser({ id: supplements.length + 1, ...payload }); supplements = [created, ...supplements]; return created },
  },
  memberships: {
    async byUser() { await delay(); return memberships.map(withUser) },
    async create(payload) { await delay(); const created = withUser({ id: memberships.length + 1, usuario: payload.usuario, ...createMembership(payload.tipo) }); memberships = [created, ...memberships]; return created },
  },
}

export function resetMockData() {
  routines = []
  plans = []
  supplements = []
  memberships = []
}
