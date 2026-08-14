import { AlertCircle, CheckCircle2, LoaderCircle } from 'lucide-react'

export function LoadingState({ message = 'Cargando información...' }) {
  return (
    <div className="state-card" role="status">
      <LoaderCircle className="spin" size={24} />
      <span>{message}</span>
    </div>
  )
}

export function EmptyState({ title, message }) {
  return (
    <div className="empty-state">
      <AlertCircle size={26} />
      <h3>{title}</h3>
      <p>{message}</p>
    </div>
  )
}

export function Alert({ type = 'success', children }) {
  const Icon = type === 'success' ? CheckCircle2 : AlertCircle
  return (
    <div className={`alert alert--${type}`} role="alert">
      <Icon size={19} />
      <span>{children}</span>
    </div>
  )
}
