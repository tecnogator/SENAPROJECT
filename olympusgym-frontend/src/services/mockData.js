const wait = (milliseconds = 280) =>
  new Promise((resolve) => window.setTimeout(resolve, milliseconds))

const mockUser = {
  id: 2,
  nombreCompleto: 'María González',
  email: 'maria@email.com',
  rol: 'cliente',
}

let routines = [
  {
    id: 1,
    dia: 'Lunes',
    ejercicio: 'Press de banca',
    series: 4,
    repeticiones: 12,
  },
  {
    id: 2,
    dia: 'Miércoles',
    ejercicio: 'Sentadilla',
    series: 4,
    repeticiones: 10,
  },
]

let plans = [
  {
    id: 1,
    titulo: 'Definición 8 semanas',
    objetivo: 'Definición',
    descripcion: 'Plan equilibrado para disminuir grasa corporal.',
    calorias: 2000,
    proteinas: 180,
    carbohidratos: 150,
    grasas: 50,
    fechaInicio: '2026-08-12',
    fechaFin: '2026-10-12',
  },
]

let memberships = [
  {
    id: 1,
    tipo: 'Mensual',
    fechaInicio: '2026-08-13',
    fechaFin: '2026-09-13',
  },
]

const withId = (record, collection) => ({
  id: collection.length + 1,
  ...record,
  usuario: mockUser,
})

export const mockApi = {
  auth: {
    async login(credentials) {
      await wait()
      if (!credentials.email || !credentials.password) {
        throw new Error('Debe ingresar correo y contraseña.')
      }
      return mockUser
    },
    async register(data) {
      await wait()
      return { ...mockUser, ...data, id: 3, rol: 'cliente' }
    },
  },
  dashboard: {
    async stats() {
      await wait()
      return {
        totalUsuarios: 12,
        totalClientes: 10,
        totalRutinas: routines.length,
        totalIngresos: 850000,
      }
    },
  },
  routines: {
    async byUser() {
      await wait()
      return routines
    },
    async create(payload) {
      await wait()
      const created = withId(payload, routines)
      routines = [created, ...routines]
      return created
    },
  },
  plans: {
    async byUser() {
      await wait()
      return plans
    },
    async create(payload) {
      await wait()
      const created = withId(payload, plans)
      plans = [created, ...plans]
      return created
    },
  },
  supplements: {
    async create(payload) {
      await wait()
      return { id: 1, ...payload, usuario: mockUser }
    },
  },
  memberships: {
    async byUser() {
      await wait()
      return memberships
    },
    async create(payload) {
      await wait()
      const today = new Date()
      const months = payload.tipo === 'Anual' ? 12 : payload.tipo === 'Trimestral' ? 3 : 1
      const end = new Date(today)
      end.setMonth(end.getMonth() + months)
      const created = withId(
        {
          ...payload,
          fechaInicio: today.toISOString().slice(0, 10),
          fechaFin: end.toISOString().slice(0, 10),
        },
        memberships,
      )
      memberships = [created, ...memberships]
      return created
    },
  },
}
