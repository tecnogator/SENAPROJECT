import Brand from './Brand'

export default function AuthLayout({ title, description, children, footer }) {
  return (
    <main className="auth-page">
      <section className="auth-hero" aria-label="Presentación de OlympusGym">
        <Brand />
        <div className="auth-hero__content">
          <span className="eyebrow eyebrow--light">Tu progreso comienza hoy</span>
          <h1>Convierte cada entrenamiento en un resultado medible.</h1>
          <p>
            Consulta rutinas, alimentación, suplementación y membresía desde una
            experiencia web integrada con React, Node.js y Express.
          </p>
          <div className="auth-hero__metric">
            <strong>100 %</strong>
            <span>gestión digital de tu proceso fitness</span>
          </div>
        </div>
        <small>Proyecto formativo ADSO · GA8-220501096-AA1-EV02</small>
      </section>

      <section className="auth-panel">
        <div className="auth-panel__card">
          <span className="eyebrow">Acceso seguro</span>
          <h2>{title}</h2>
          <p>{description}</p>
          {children}
          <div className="auth-panel__footer">{footer}</div>
        </div>
      </section>
    </main>
  )
}
