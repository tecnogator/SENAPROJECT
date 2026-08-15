import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import Brand from '../components/Brand'

export default function NotFoundPage() {
  return (
    <main className="not-found">
      <Brand />
      <span>404</span>
      <h1>Página no encontrada</h1>
      <p>La dirección solicitada no pertenece a un módulo de OlympusGym.</p>
      <Link className="primary-button" to="/dashboard"><ArrowLeft size={18} /> Volver al panel</Link>
    </main>
  )
}
