import { StyleSheet, Text, View } from 'react-native'
import Screen from '../components/Screen'
import { colors } from '../theme/colors'
import { globalStyles } from '../theme/styles'

const steps = [
  ['01', 'Define tu objetivo', 'Selecciona fuerza, hipertrofia, resistencia o recomposición corporal.'],
  ['02', 'Organiza la semana', 'Alterna grupos musculares y conserva días de recuperación.'],
  ['03', 'Registra la rutina', 'Guarda ejercicio, series y repeticiones para hacer seguimiento.'],
  ['04', 'Acompaña con nutrición', 'Ajusta calorías y macronutrientes según orientación profesional.'],
]

export default function GuideScreen() {
  return (
    <Screen eyebrow="Aprendizaje" title="Guía de entrenamiento" description="Recomendaciones para utilizar OlympusGym de forma responsable.">
      <View style={styles.notice}><Text style={styles.noticeTitle}>Entrena con seguridad</Text><Text style={styles.noticeText}>Consulta a profesionales de actividad física y nutrición antes de cambiar tu entrenamiento o alimentación.</Text></View>
      {steps.map(([number, title, description]) => <View style={styles.step} key={number}><Text style={styles.number}>{number}</Text><View style={{ flex: 1 }}><Text style={styles.title}>{title}</Text><Text style={globalStyles.mutedText}>{description}</Text></View></View>)}
    </Screen>
  )
}

const styles = StyleSheet.create({
  notice: { backgroundColor: colors.warningSoft, borderWidth: 1, borderColor: '#F0D899', borderRadius: 16, padding: 16, gap: 6 },
  noticeTitle: { color: colors.warning, fontWeight: '900', fontSize: 16 },
  noticeText: { color: '#6C5323', lineHeight: 20 },
  step: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 17, padding: 16, flexDirection: 'row', gap: 14 },
  number: { color: '#F2A7B5', fontSize: 24, fontWeight: '900' },
  title: { color: colors.ink, fontSize: 17, fontWeight: '900', marginBottom: 4 },
})
