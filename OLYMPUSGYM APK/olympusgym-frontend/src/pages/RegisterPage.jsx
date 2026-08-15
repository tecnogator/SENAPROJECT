import { ArrowRight, LockKeyhole, Mail, UserRound } from 'lucide-react'
import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'
import { Alert } from '../components/Feedback'
import { useAuth } from '../context/AuthContext'

export default function RegisterPage() {
  const [form, setForm] = useState({ nombreCompleto: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const { register, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  if (isAuthenticated) return <Navigate to="/dashboard" replace />

  const handleChange = ({ target }) => {
    setForm((current) => ({ ...current, [target.name]: target.value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await register(form)
      navigate('/dashboard', { replace: true })
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AuthLayout
      title="Crear una cuenta"
      description="Registra un perfil de cliente para iniciar tu proceso en OlympusGym."
      footer={
        <p>
          ¿Ya tienes cuenta? <Link to="/login">Iniciar sesión</Link>
        </p>
      }
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        {error && <Alert type="error">{error}</Alert>}
        {[
          {
            name: 'nombreCompleto',
            label: 'Nombre completo',
            type: 'text',
            placeholder: 'Nombre y apellido',
            icon: UserRound,
          },
          {
            name: 'email',
            label: 'Correo electrónico',
            type: 'email',
            placeholder: 'nombre@correo.com',
            icon: Mail,
          },
          {
            name: 'password',
            label: 'Contraseña',
            type: 'password',
            placeholder: 'Mínimo 8 caracteres',
            icon: LockKeyhole,
          },
        ].map(({ icon: Icon, ...field }) => (
          <label className="input-group" htmlFor={field.name} key={field.name}>
            <span>{field.label}</span>
            <div>
              <Icon size={19} />
              <input
                {...field}
                id={field.name}
                minLength={field.name === 'password' ? 8 : undefined}
                autoComplete={field.name === 'password' ? 'new-password' : field.name}
                required
                value={form[field.name]}
                onChange={handleChange}
              />
            </div>
          </label>
        ))}

        <button className="primary-button primary-button--wide" disabled={submitting}>
          {submitting ? 'Creando cuenta...' : 'Registrarme'}
          {!submitting && <ArrowRight size={19} />}
        </button>
      </form>
    </AuthLayout>
  )
}
