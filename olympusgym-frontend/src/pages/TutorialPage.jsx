import { Apple, Bike, Dumbbell, Flame, HeartPulse, Lightbulb } from 'lucide-react'
import PageHeader from '../components/PageHeader'

const topics = [
  { icon: Flame, title: 'Calentamiento y movilidad', text: 'Dedica entre 10 y 15 minutos a movilidad articular, cardio ligero y estiramientos dinámicos.', tip: 'El calentamiento prepara músculos y articulaciones para la carga.' },
  { icon: Dumbbell, title: 'Ejercicios de fuerza', text: 'Prioriza movimientos compuestos como sentadilla, peso muerto, press de banca y dominadas.', tip: 'Realiza de 3 a 4 series con técnica controlada.' },
  { icon: Bike, title: 'Cardio y resistencia', text: 'Combina sesiones de intervalos con cardio de intensidad moderada según tu objetivo.', tip: 'Aumenta la intensidad de forma progresiva.' },
  { icon: HeartPulse, title: 'Recuperación', text: 'Finaliza con respiración, estiramientos estáticos e hidratación adecuada.', tip: 'El descanso también hace parte del entrenamiento.' },
  { icon: Apple, title: 'Nutrición básica', text: 'Distribuye proteína, carbohidratos y grasas saludables según la recomendación profesional.', tip: 'La constancia alimentaria mejora la recuperación.' },
]

export default function TutorialPage() {
  return (
    <>
      <PageHeader eyebrow="Contenido educativo" title="Guía para armar tu rutina" description="Migración a React del tutorial incluido en el frontend original." />
      <div className="tutorial-intro panel">
        <span className="tutorial-intro__icon"><Lightbulb /></span>
        <div><h2>Entrena de forma segura y progresiva</h2><p>Esta guía es informativa y no reemplaza la valoración de un profesional de la salud o del deporte.</p></div>
      </div>
      <section className="tutorial-grid">
        {topics.map(({ icon: Icon, title, text, tip }, index) => (
          <article className="tutorial-card" key={title}>
            <div className="tutorial-card__number">{String(index + 1).padStart(2, '0')}</div>
            <span className="tutorial-card__icon"><Icon /></span>
            <h2>{title}</h2><p>{text}</p><small><Lightbulb size={15} /> {tip}</small>
          </article>
        ))}
      </section>
    </>
  )
}
