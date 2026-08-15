import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { api, setAccessToken } from '../services/apiClient'
import { clearSession, readSession, saveSession } from '../services/sessionStore'

const AuthContext = createContext(null)

function safeSession(raw) {
  if (!raw) return null
  const { password: _password, passwordHash: _passwordHash, ...safe } = raw
  return safe
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [booting, setBooting] = useState(true)

  useEffect(() => {
    readSession().then((session) => {
      if (session?.token) setAccessToken(session.token)
      setUser(session)
    }).finally(() => setBooting(false))
  }, [])

  const persist = async (raw) => {
    const session = safeSession(raw)
    setAccessToken(session?.token)
    setUser(session)
    await saveSession(session)
    return session
  }

  const value = useMemo(() => ({
    user,
    booting,
    login: async (credentials) => persist(await api.auth.login(credentials)),
    register: async (payload) => persist(await api.auth.register(payload)),
    logout: async () => { setAccessToken(''); setUser(null); await clearSession() },
  }), [user, booting])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth debe utilizarse dentro de AuthProvider')
  return context
}
