import {
  ArrowRight,
  CalendarDays,
  Dumbbell,
  ShieldCheck,
  UsersRound,
  WalletCards,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Alert, LoadingState } from '../components/Feedback'
import PageHeader from '../components/PageHeader'
import { useAuth } from '../context/AuthContext'
import { api } from '../services/api'

const money = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
})

export default function DashboardPage() {
  const { user } = useAuth()
  const [stats, setStats] = useState(null)
  const [memberships, setMemberships] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    Promise.all([api.dashboard.stats(), api.memberships.byUser(user.id)])
      .then(([statsData, membershipData]) => {
        if (!active) return
        setStats(statsData)
        setMemberships(Array.isArray(membershipData) ? membershipData : [])
      })
      .catch((requestError) => active && setError(requestError.message))
    return () => {
      active = false
    }
  }, [user.id])

  const currentMembership = useMemo(() => memberships[0] ?? null, [memberships])

  return (
    <>
      <PageHeader
        eyebrow="Panel de cliente"
        title={`Bienvenido, ${user.nombreCompleto?.split(' ')[0] ?? 'atleta'}`}
        description="Consulta el estado general de tu proceso y accede rápidamente a cada módulo."
        action={
          <Link className="secondary-button" to="/tutorial">
            Ver guía <ArrowRight size={18} />
          </Link>
        }
      />

      {error && <Alert type="error">{error}</Alert>}
      {!stats && !error ? (
        <LoadingState message="Consultando indicadores del backend..." />
      ) : (
        stats && (
          <section className="stats-grid" aria-label="Indicadores generales">
            <article className="stat-card stat-card--accent">
              <span><UsersRound /></span>
              <div><small>Usuarios registrados</small><strong>{stats.totalUsuarios}</strong></div>
            </article>
            <article className="stat-card">
              <span><ShieldCheck /></span>
              <div><small>Clientes activos</small><strong>{stats.totalClientes}</strong></div>
            </article>
            <article className="stat-card">
              <span><Dumbbell /></span>
              <div><small>Rutinas creadas</small><strong>{stats.totalRutinas}</strong></div>
            </article>
            <article className="stat-card">
              <span><WalletCards /></span>
              <div><small>Ingresos registrados</small><strong>{money.format(stats.totalIngresos)}</strong></div>
            </article>
          </section>
        )
      )}

      <section className="dashboard-grid">
        <article className="panel profile-panel">
          <div className="profile-panel__avatar">
            {user.nombreCompleto?.charAt(0) ?? 'O'}
          </div>
          <div>
            <span className="eyebrow">Perfil registrado</span>
            <h2>{user.nombreCompleto}</h2>
            <p>{user.email}</p>
            <span className="role-badge">{user.rol}</span>
          </div>
        </article>

        <article className="panel membership-summary">
          <div className="panel__heading">
            <div>
              <span className="eyebrow">Membresía</span>
              <h2>{currentMembership?.tipo ?? 'Sin membresía'}</h2>
            </div>
            <CalendarDays />
          </div>
          {currentMembership ? (
            <div className="membership-dates">
              <span><small>Inicio</small>{currentMembership.fechaInicio ?? 'Pendiente'}</span>
              <span><small>Vencimiento</small>{currentMembership.fechaFin ?? 'Pendiente'}</span>
            </div>
          ) : (
            <p>Selecciona un plan para activar tu acceso al gimnasio.</p>
          )}
          <Link className="text-link" to="/membresia">Administrar membresía <ArrowRight size={17} /></Link>
        </article>
      </section>

      <section className="quick-actions">
        <div className="section-heading">
          <span className="eyebrow">Accesos rápidos</span>
          <h2>Continúa tu proceso</h2>
        </div>
        <div className="quick-actions__grid">
          {[
            ['01', '/rutinas', 'Rutinas', 'Consulta ejercicios, series y repeticiones.'],
            ['02', '/nutricion', 'Alimentación', 'Revisa calorías y distribución de macronutrientes.'],
            ['03', '/suplementos', 'Suplementos', 'Registra dosis y horarios recomendados.'],
          ].map(([number, to, title, description]) => (
            <Link className="action-card" to={to} key={to}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{description}</p>
              <ArrowRight size={19} />
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
