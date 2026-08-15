import { createContext, useContext, useState } from 'react'
import { api } from '../services/api'

const STORAGE_KEY = 'olympusgym.user'
const AuthContext = createContext(null)

function readStoredUser() {
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY))
  } catch {
    return null
  }
}

function sanitizeUser(user) {
  if (!user) return null
  // El frontend nunca persiste campos de contraseña, aunque el backend ya los omite.
  const { password: _password, passwordHash: _passwordHash, ...safeUser } = user
  return safeUser
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser)

  const persistUser = (rawUser) => {
    const safeUser = sanitizeUser(rawUser)
    setUser(safeUser)
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(safeUser))
    return safeUser
  }

  const login = async (credentials) => persistUser(await api.auth.login(credentials))
  const register = async (data) => persistUser(await api.auth.register(data))
  const logout = () => {
    setUser(null)
    window.localStorage.removeItem(STORAGE_KEY)
  }

  const value = { user, login, register, logout, isAuthenticated: Boolean(user) }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe utilizarse dentro de AuthProvider.')
  }
  return context
}
