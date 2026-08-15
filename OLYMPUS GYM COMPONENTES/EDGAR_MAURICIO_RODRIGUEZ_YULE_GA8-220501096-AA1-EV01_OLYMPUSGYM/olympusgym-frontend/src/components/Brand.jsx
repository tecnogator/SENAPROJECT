import { Dumbbell } from 'lucide-react'

export default function Brand({ compact = false }) {
  return (
    <div className={`brand ${compact ? 'brand--compact' : ''}`}>
      <span className="brand__icon" aria-hidden="true">
        <Dumbbell size={24} strokeWidth={2.5} />
      </span>
      <span>
        <strong>Olympus</strong>Gym
      </span>
    </div>
  )
}
