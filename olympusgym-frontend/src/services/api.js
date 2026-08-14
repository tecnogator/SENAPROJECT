import { mockApi } from './mockData'

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080/api'
const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === 'true'

export class ApiError extends Error {
  constructor(message, status) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  })

  const rawBody = await response.text()
  let data = null

  if (rawBody) {
    try {
      data = JSON.parse(rawBody)
    } catch {
      data = rawBody
    }
  }

  if (!response.ok) {
    const message =
      data?.error ?? data?.message ?? data ?? 'No fue posible procesar la solicitud.'
    throw new ApiError(message, response.status)
  }

  return data
}

const jsonPost = (path, body) =>
  request(path, {
    method: 'POST',
    body: JSON.stringify(body),
  })

const realApi = {
  auth: {
    login: (credentials) => jsonPost('/auth/login', credentials),
    register: (data) => jsonPost('/auth/register', data),
  },
  dashboard: {
    stats: () => request('/dashboard/stats'),
  },
  routines: {
    byUser: (userId) => request(`/rutinas/usuario/${userId}`),
    create: (data) => jsonPost('/rutinas/asignar', data),
  },
  plans: {
    byUser: (userId) => request(`/planes/usuario/${userId}`),
    create: (data) => jsonPost('/planes/asignar', data),
  },
  supplements: {
    create: (data) => jsonPost('/suplementos/asignar', data),
  },
  memberships: {
    byUser: (userId) => request(`/membresias/usuario/${userId}`),
    create: (data) => jsonPost('/membresias/asignar', data),
  },
}

// El modo demostración permite evaluar la interfaz cuando MySQL o Spring Boot no están activos.
export const api = USE_MOCKS ? mockApi : realApi
export const apiMode = USE_MOCKS ? 'demostración' : 'Spring Boot'
