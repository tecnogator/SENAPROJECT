import { mockApi } from './mockApi'

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://10.0.2.2:8080/api'
const USE_MOCKS = process.env.EXPO_PUBLIC_USE_MOCKS !== 'false'
let accessToken = ''

export class ApiError extends Error {
  constructor(message, status = 0, code = 'REQUEST_ERROR') {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.code = code
  }
}

export function setAccessToken(token = '') { accessToken = token }

async function request(path, options = {}) {
  let response
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        ...options.headers,
      },
    })
  } catch {
    throw new ApiError('No fue posible conectar con el servidor OlympusGym.', 0, 'NETWORK_ERROR')
  }
  const raw = await response.text()
  let data = null
  if (raw) {
    try { data = JSON.parse(raw) } catch { data = raw }
  }
  if (!response.ok) throw new ApiError(data?.message ?? data?.error ?? 'Solicitud rechazada.', response.status, data?.error)
  return data
}

const post = (path, body) => request(path, { method: 'POST', body: JSON.stringify(body) })

const springApi = {
  auth: { login: (body) => post('/auth/login', body), register: (body) => post('/auth/register', body) },
  dashboard: { stats: () => request('/dashboard/stats') },
  routines: { byUser: (id) => request(`/rutinas/usuario/${id}`), create: (body) => post('/rutinas/asignar', body) },
  plans: { byUser: (id) => request(`/planes/usuario/${id}`), create: (body) => post('/planes/asignar', body) },
  supplements: { byUser: (id) => request(`/suplementos/usuario/${id}`), create: (body) => post('/suplementos/asignar', body) },
  memberships: { byUser: (id) => request(`/membresias/usuario/${id}`), create: (body) => post('/membresias/asignar', body) },
}

export const api = USE_MOCKS ? mockApi : springApi
export const apiMode = USE_MOCKS ? 'Modo demostración' : 'API Spring Boot'
export { API_BASE_URL }
