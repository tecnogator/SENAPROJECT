import { Dumbbell, Plus, RefreshCw } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { Alert, EmptyState, LoadingState } from '../components/Feedback'
import FormField from '../components/FormField'
import PageHeader from '../components/PageHeader'
import { useAuth } from '../context/AuthContext'
import { api } from '../services/api'

const initialForm = {
  dia: 'Lunes',
  ejercicio: '',
  series: 4,
  repeticiones: 12,
}

export default function RoutinesPage() {
  const { user } = useAuth()
  const [routines, setRoutines] = useState([])
  const [form, setForm] = useState(initialForm)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const loadRoutines = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const data = await api.routines.byUser(user.id)
      setRoutines(Array.isArray(data) ? data : [])
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setLoading(false)
    }
  }, [user.id])

  useEffect(() => {
    loadRoutines()
  }, [loadRoutines])

  const handleChange = ({ target }) => {
    const value = target.type === 'number' ? Number(target.value) : target.value
    setForm((current) => ({ ...current, [target.name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitting(true)
    setError('')
    setMessage('')
    try {
      await api.routines.create({ ...form, usuario: { id: user.id } })
      setForm(initialForm)
      setMessage('La rutina fue asignada correctamente.')
      await loadRoutines()
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="Módulo de entrenamiento"
        title="Mi rutina"
        description="Gestiona los ejercicios asociados al usuario autenticado."
        action={
          <button className="secondary-button" type="button" onClick={loadRoutines}>
            <RefreshCw size={18} /> Actualizar
          </button>
        }
      />

      {message && <Alert>{message}</Alert>}
      {error && <Alert type="error">{error}</Alert>}

      <section className="content-grid content-grid--form">
        <article className="panel">
          <div className="panel__heading">
            <div><span className="eyebrow">Rutinas asignadas</span><h2>Plan semanal</h2></div>
            <Dumbbell />
          </div>

          {loading ? (
            <LoadingState />
          ) : routines.length === 0 ? (
            <EmptyState title="Aún no hay rutinas" message="Usa el formulario para crear el primer ejercicio." />
          ) : (
            <div className="data-table-wrapper">
              <table className="data-table">
                <thead><tr><th>Día</th><th>Ejercicio</th><th>Series</th><th>Repeticiones</th></tr></thead>
                <tbody>
                  {routines.map((routine) => (
                    <tr key={routine.id ?? `${routine.dia}-${routine.ejercicio}`}>
                      <td><span className="day-badge">{routine.dia}</span></td>
                      <td><strong>{routine.ejercicio}</strong></td>
                      <td>{routine.series}</td>
                      <td>{routine.repeticiones}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </article>

        <article className="panel form-panel">
          <span className="eyebrow">Nueva asignación</span>
          <h2>Agregar ejercicio</h2>
          <p>Los datos se envían a <code>POST /api/rutinas/asignar</code>.</p>
          <form className="form-stack" onSubmit={handleSubmit}>
            <label className="form-field" htmlFor="dia">
              <span>Día</span>
              <select id="dia" name="dia" value={form.dia} onChange={handleChange}>
                {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'].map((day) => (
                  <option key={day}>{day}</option>
                ))}
              </select>
            </label>
            <FormField label="Ejercicio" name="ejercicio" placeholder="Ej. Press de banca" required value={form.ejercicio} onChange={handleChange} />
            <div className="form-row">
              <FormField label="Series" name="series" type="number" min="1" max="10" required value={form.series} onChange={handleChange} />
              <FormField label="Repeticiones" name="repeticiones" type="number" min="1" max="100" required value={form.repeticiones} onChange={handleChange} />
            </div>
            <button className="primary-button" disabled={submitting}>
              <Plus size={18} /> {submitting ? 'Guardando...' : 'Asignar rutina'}
            </button>
          </form>
        </article>
      </section>
    </>
  )
}
