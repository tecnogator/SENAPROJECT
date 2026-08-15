import { Apple, Flame, Plus } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { Alert, EmptyState, LoadingState } from '../components/Feedback'
import FormField from '../components/FormField'
import PageHeader from '../components/PageHeader'
import { useAuth } from '../context/AuthContext'
import { api } from '../services/api'

const initialForm = {
  titulo: '', objetivo: '', descripcion: '', calorias: 2000,
  proteinas: 150, carbohidratos: 220, grasas: 60,
  fechaInicio: '', fechaFin: '',
}

export default function NutritionPage() {
  const { user } = useAuth()
  const [plans, setPlans] = useState([])
  const [form, setForm] = useState(initialForm)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [feedback, setFeedback] = useState({ type: '', message: '' })

  const loadPlans = useCallback(async () => {
    setLoading(true)
    try {
      const data = await api.plans.byUser(user.id)
      setPlans(Array.isArray(data) ? data : [])
    } catch (error) {
      setFeedback({ type: 'error', message: error.message })
    } finally {
      setLoading(false)
    }
  }, [user.id])

  useEffect(() => { loadPlans() }, [loadPlans])

  const handleChange = ({ target }) => {
    const numeric = ['calorias', 'proteinas', 'carbohidratos', 'grasas'].includes(target.name)
    setForm((current) => ({ ...current, [target.name]: numeric ? Number(target.value) : target.value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitting(true)
    setFeedback({ type: '', message: '' })
    try {
      await api.plans.create({ ...form, usuario: { id: user.id } })
      setForm(initialForm)
      setFeedback({ type: 'success', message: 'El plan de alimentación fue asignado.' })
      await loadPlans()
    } catch (error) {
      setFeedback({ type: 'error', message: error.message })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <PageHeader eyebrow="Nutrición" title="Planes de alimentación" description="Consulta y registra planes nutricionales asociados a tu perfil." />
      {feedback.message && <Alert type={feedback.type}>{feedback.message}</Alert>}

      <section className="content-grid content-grid--form">
        <div>
          {loading ? <LoadingState /> : plans.length === 0 ? (
            <EmptyState title="Sin plan nutricional" message="Registra el primer plan desde el formulario." />
          ) : (
            <div className="card-list">
              {plans.map((plan) => (
                <article className="panel nutrition-card" key={plan.id ?? plan.titulo}>
                  <div className="panel__heading">
                    <div><span className="eyebrow">{plan.objetivo || 'Plan activo'}</span><h2>{plan.titulo}</h2></div>
                    <Apple />
                  </div>
                  <p>{plan.descripcion}</p>
                  <div className="macro-grid">
                    <span><Flame size={17} /><strong>{plan.calorias}</strong><small>kcal</small></span>
                    <span><strong>{plan.proteinas} g</strong><small>proteína</small></span>
                    <span><strong>{plan.carbohidratos} g</strong><small>carbohidratos</small></span>
                    <span><strong>{plan.grasas} g</strong><small>grasas</small></span>
                  </div>
                  <footer>{plan.fechaInicio || 'Sin fecha'} <span>→</span> {plan.fechaFin || 'Sin fecha'}</footer>
                </article>
              ))}
            </div>
          )}
        </div>

        <article className="panel form-panel">
          <span className="eyebrow">Nueva asignación</span><h2>Crear plan</h2>
          <p>Completa los datos nutricionales definidos por el profesional.</p>
          <form className="form-stack" onSubmit={handleSubmit}>
            <FormField label="Título" name="titulo" placeholder="Ej. Definición 8 semanas" required value={form.titulo} onChange={handleChange} />
            <FormField label="Objetivo" name="objetivo" placeholder="Definición, fuerza..." required value={form.objetivo} onChange={handleChange} />
            <label className="form-field" htmlFor="descripcion"><span>Descripción</span><textarea id="descripcion" name="descripcion" rows="3" required value={form.descripcion} onChange={handleChange} /></label>
            <div className="form-row">
              <FormField label="Calorías" name="calorias" type="number" min="500" required value={form.calorias} onChange={handleChange} />
              <FormField label="Proteína (g)" name="proteinas" type="number" min="0" required value={form.proteinas} onChange={handleChange} />
            </div>
            <div className="form-row">
              <FormField label="Carbohidratos (g)" name="carbohidratos" type="number" min="0" required value={form.carbohidratos} onChange={handleChange} />
              <FormField label="Grasas (g)" name="grasas" type="number" min="0" required value={form.grasas} onChange={handleChange} />
            </div>
            <div className="form-row">
              <FormField label="Fecha inicial" name="fechaInicio" type="date" required value={form.fechaInicio} onChange={handleChange} />
              <FormField label="Fecha final" name="fechaFin" type="date" required value={form.fechaFin} onChange={handleChange} />
            </div>
            <button className="primary-button" disabled={submitting}><Plus size={18} /> {submitting ? 'Guardando...' : 'Asignar plan'}</button>
          </form>
        </article>
      </section>
    </>
  )
}
