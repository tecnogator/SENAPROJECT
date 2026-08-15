import { Clock3, Pill, Plus } from 'lucide-react'
import { useState } from 'react'
import { Alert } from '../components/Feedback'
import FormField from '../components/FormField'
import PageHeader from '../components/PageHeader'
import { useAuth } from '../context/AuthContext'
import { api } from '../services/api'

export default function SupplementsPage() {
  const { user } = useAuth()
  const [form, setForm] = useState({ nombre: '', dosis: '', horario: '' })
  const [created, setCreated] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleChange = ({ target }) => {
    setForm((current) => ({ ...current, [target.name]: target.value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      const data = await api.supplements.create({ ...form, usuario: { id: user.id } })
      setCreated(data)
      setForm({ nombre: '', dosis: '', horario: '' })
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <PageHeader eyebrow="Bienestar" title="Suplementación" description="Registra el suplemento, la dosis y el momento de consumo." />
      {error && <Alert type="error">{error}</Alert>}
      {created && <Alert>Suplemento “{created.nombre}” asignado correctamente.</Alert>}

      <section className="content-grid content-grid--form">
        <article className="panel supplement-feature">
          <span className="supplement-feature__icon"><Pill size={38} /></span>
          <span className="eyebrow">Control responsable</span>
          <h2>Organiza tus indicaciones</h2>
          <p>
            Este módulo integra un componente React reutilizable con los
            servicios protegidos de la API Node.js + Express.
          </p>
          <ul className="check-list">
            <li>Nombre comercial o tipo de suplemento.</li>
            <li>Dosis indicada por el profesional.</li>
            <li>Horario relacionado con el entrenamiento.</li>
          </ul>
          {created && (
            <div className="last-created">
              <Clock3 size={19} />
              <div><small>Último registro</small><strong>{created.nombre} · {created.dosis} · {created.horario}</strong></div>
            </div>
          )}
        </article>

        <article className="panel form-panel">
          <span className="eyebrow">Nueva asignación</span><h2>Agregar suplemento</h2>
          <p>La API Node.js + Express expone la operación de creación mediante POST.</p>
          <form className="form-stack" onSubmit={handleSubmit}>
            <FormField label="Nombre" name="nombre" placeholder="Ej. Proteína Whey" required value={form.nombre} onChange={handleChange} />
            <FormField label="Dosis" name="dosis" placeholder="Ej. 30 g" required value={form.dosis} onChange={handleChange} />
            <FormField label="Horario" name="horario" placeholder="Ej. Post-entreno" required value={form.horario} onChange={handleChange} />
            <button className="primary-button" disabled={submitting}><Plus size={18} /> {submitting ? 'Guardando...' : 'Asignar suplemento'}</button>
          </form>
        </article>
      </section>
    </>
  )
}
