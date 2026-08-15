import { Check, Crown, Flame, Sparkles, WalletCards } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { Alert, LoadingState } from '../components/Feedback'
import PageHeader from '../components/PageHeader'
import { useAuth } from '../context/AuthContext'
import { api } from '../services/api'

const plans = [
  {
    name: 'Plan Básico', type: 'Mensual', price: '$80.000', icon: Flame,
    features: ['Acceso a máquinas', 'Área de cardio', 'Seguimiento de rutina'],
  },
  {
    name: 'Plan Premium', type: 'Trimestral', price: '$210.000', icon: Sparkles, popular: true,
    features: ['Acceso total', 'Clases grupales', 'Evaluación física', 'Plan nutricional'],
  },
  {
    name: 'Plan Elite', type: 'Anual', price: '$720.000', icon: Crown,
    features: ['Acceso 24/7', 'Seguimiento integral', 'Zona VIP', 'Beneficios exclusivos'],
  },
]

export default function MembershipPage() {
  const { user } = useAuth()
  const [memberships, setMemberships] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState('')
  const [feedback, setFeedback] = useState({ type: '', message: '' })

  const loadMemberships = useCallback(async () => {
    setLoading(true)
    try {
      const data = await api.memberships.byUser(user.id)
      setMemberships(Array.isArray(data) ? data : [])
    } catch (error) {
      setFeedback({ type: 'error', message: error.message })
    } finally {
      setLoading(false)
    }
  }, [user.id])

  useEffect(() => { loadMemberships() }, [loadMemberships])

  const assignMembership = async (type) => {
    setSelected(type)
    setFeedback({ type: '', message: '' })
    try {
      await api.memberships.create({ usuario: { id: user.id }, tipo: type })
      setFeedback({ type: 'success', message: `Membresía ${type} asignada correctamente.` })
      await loadMemberships()
    } catch (error) {
      setFeedback({ type: 'error', message: error.message })
    } finally {
      setSelected('')
    }
  }

  return (
    <>
      <PageHeader eyebrow="Acceso al gimnasio" title="Planes de membresía" description="Módulo React integrado con la API Node.js + Express de OlympusGym." />
      {feedback.message && <Alert type={feedback.type}>{feedback.message}</Alert>}

      <section className="pricing-grid">
        {plans.map(({ icon: Icon, ...plan }) => (
          <article className={`pricing-card ${plan.popular ? 'pricing-card--popular' : ''}`} key={plan.type}>
            {plan.popular && <span className="popular-badge">Más popular</span>}
            <span className="pricing-card__icon"><Icon size={28} /></span>
            <span className="eyebrow">{plan.type}</span>
            <h2>{plan.name}</h2>
            <div className="pricing-card__price">{plan.price}<small> / periodo</small></div>
            <ul>
              {plan.features.map((feature) => <li key={feature}><Check size={17} /> {feature}</li>)}
            </ul>
            <button className={plan.popular ? 'primary-button' : 'secondary-button'} type="button" disabled={Boolean(selected)} onClick={() => assignMembership(plan.type)}>
              {selected === plan.type ? 'Procesando...' : 'Seleccionar plan'}
            </button>
          </article>
        ))}
      </section>

      <section className="panel membership-history">
        <div className="panel__heading">
          <div><span className="eyebrow">Historial</span><h2>Membresías registradas</h2></div>
          <WalletCards />
        </div>
        {loading ? <LoadingState /> : memberships.length === 0 ? (
          <p className="muted-text">No se encontraron membresías asociadas.</p>
        ) : (
          <div className="data-table-wrapper">
            <table className="data-table">
              <thead><tr><th>Tipo</th><th>Fecha de inicio</th><th>Fecha final</th><th>Estado</th></tr></thead>
              <tbody>{memberships.map((membership) => (
                <tr key={membership.id ?? `${membership.tipo}-${membership.fechaInicio}`}>
                  <td><strong>{membership.tipo}</strong></td>
                  <td>{membership.fechaInicio}</td><td>{membership.fechaFin}</td>
                  <td><span className="status-badge">Registrada</span></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        )}
      </section>
    </>
  )
}
