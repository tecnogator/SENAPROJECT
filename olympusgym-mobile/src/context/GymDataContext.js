import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { api } from '../services/apiClient'
import { useAuth } from './AuthContext'

const GymDataContext = createContext(null)
const initial = { stats: null, routines: [], plans: [], supplements: [], memberships: [] }

export function GymDataProvider({ children }) {
  const { user } = useAuth()
  const [data, setData] = useState(initial)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const refresh = useCallback(async () => {
    if (!user?.id) return
    setLoading(true); setError('')
    try {
      const [stats, routines, plans, supplements, memberships] = await Promise.all([
        api.dashboard.stats(), api.routines.byUser(user.id), api.plans.byUser(user.id), api.supplements.byUser(user.id), api.memberships.byUser(user.id),
      ])
      setData({ stats, routines, plans, supplements, memberships })
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setLoading(false)
    }
  }, [user?.id])

  useEffect(() => {
    if (user?.id) refresh()
    else setData(initial)
  }, [user?.id, refresh])

  const create = useCallback(async (collection, payload) => {
    if (!user?.id) throw new Error('La sesión no está disponible')
    const created = await api[collection].create({ ...payload, usuario: { id: user.id } })
    await refresh()
    return created
  }, [refresh, user?.id])

  const value = useMemo(() => ({ ...data, loading, error, refresh, create }), [data, loading, error, refresh, create])
  return <GymDataContext.Provider value={value}>{children}</GymDataContext.Provider>
}

export function useGymData() {
  const context = useContext(GymDataContext)
  if (!context) throw new Error('useGymData debe utilizarse dentro de GymDataProvider')
  return context
}
