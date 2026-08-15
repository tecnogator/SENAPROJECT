import { ArrowRight, LockKeyhole, Mail } from 'lucide-react'
import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'
import { Alert } from '../components/Feedback'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const { login, isAuthenticated } = useAuth()
  const location = useLocation()
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
      await login(form)
      navigate(location.state?.from?.pathname ?? '/dashboard', { replace: true })
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AuthLayout
      title="Iniciar sesión"
      description="Ingresa tus credenciales para acceder al panel de cliente."
      footer={
        <p>
          ¿Aún no tienes cuenta? <Link to="/registro">Crear una cuenta</Link>
        </p>
      }
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        {error && <Alert type="error">{error}</Alert>}

        <label className="input-group" htmlFor="email">
          <span>Correo electrónico</span>
          <div>
            <Mail size={19} />
            <input
              id="email"
              name="email"
              type="email"
              placeholder="nombre@correo.com"
              autoComplete="email"
              required
              value={form.email}
              onChange={handleChange}
            />
          </div>
        </label>

        <label className="input-group" htmlFor="password">
          <span>Contraseña</span>
          <div>
            <LockKeyhole size={19} />
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Mínimo 8 caracteres"
              autoComplete="current-password"
              minLength="8"
              required
              value={form.password}
              onChange={handleChange}
            />
          </div>
        </label>

        <button className="primary-button primary-button--wide" disabled={submitting}>
          {submitting ? 'Validando...' : 'Entrar al panel'}
          {!submitting && <ArrowRight size={19} />}
        </button>
      </form>
    </AuthLayout>
  )
}
