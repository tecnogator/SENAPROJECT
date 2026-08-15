import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useState } from 'react'
import Feedback from '../components/Feedback'
import Screen from '../components/Screen'
import { useGymData } from '../context/GymDataContext'
import { MEMBERSHIP_RULES } from '../domain/membership'
import { colors } from '../theme/colors'
import { globalStyles } from '../theme/styles'

const names = { Mensual: 'Plan Básico', Trimestral: 'Plan Premium', Anual: 'Plan Elite' }
const money = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })

export default function MembershipScreen() {
  const { memberships, create, loading, refresh } = useGymData()
  const [selected, setSelected] = useState('')
  const [feedback, setFeedback] = useState(null)

  const assign = async (tipo) => {
    setSelected(tipo); setFeedback(null)
    try { await create('memberships', { tipo }); setFeedback({ type: 'success', message: `Membresía ${tipo} asignada correctamente.` }) }
    catch (error) { setFeedback({ type: 'error', message: error.message }) } finally { setSelected('') }
  }

  return (
    <Screen eyebrow="Acceso al gimnasio" title="Membresías" description="Selecciona el plan que mejor se adapta a tu proceso." refreshing={loading} onRefresh={refresh}>
      {feedback ? <Feedback type={feedback.type}>{feedback.message}</Feedback> : null}
      {Object.entries(MEMBERSHIP_RULES).map(([tipo, rule]) => (
        <View style={[styles.plan, tipo === 'Trimestral' && styles.popular]} key={tipo}>
          {tipo === 'Trimestral' ? <Text style={styles.badge}>MÁS POPULAR</Text> : null}
          <Text style={globalStyles.eyebrow}>{tipo}</Text><Text style={styles.planName}>{names[tipo]}</Text>
          <Text style={styles.price}>{money.format(rule.value)}</Text><Text style={globalStyles.mutedText}>Acceso al gimnasio y seguimiento desde la aplicación móvil.</Text>
          <Pressable disabled={Boolean(selected)} onPress={() => assign(tipo)} style={[styles.button, tipo === 'Trimestral' && styles.buttonPrimary]}><Text style={[styles.buttonText, tipo === 'Trimestral' && { color: colors.white }]}>{selected === tipo ? 'Procesando...' : 'Seleccionar plan'}</Text></Pressable>
        </View>
      ))}
      <Text style={globalStyles.sectionTitle}>Historial</Text>
      {memberships.map((item) => <View style={styles.history} key={item.id}><View><Text style={styles.historyTitle}>{item.tipo}</Text><Text style={globalStyles.mutedText}>{item.fechaInicio} → {item.fechaFin}</Text></View><Text style={styles.status}>ACTIVA</Text></View>)}
    </Screen>
  )
}

const styles = StyleSheet.create({
  plan: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 19, padding: 19, gap: 10 },
  popular: { borderColor: colors.primary, borderWidth: 2 },
  badge: { alignSelf: 'flex-end', color: colors.white, backgroundColor: colors.primary, borderRadius: 999, paddingHorizontal: 10, paddingVertical: 5, fontSize: 10, fontWeight: '900' },
  planName: { color: colors.ink, fontSize: 21, fontWeight: '900' },
  price: { color: colors.primary, fontSize: 27, fontWeight: '900' },
  button: { minHeight: 48, alignItems: 'center', justifyContent: 'center', borderRadius: 13, borderWidth: 1, borderColor: colors.border },
  buttonPrimary: { backgroundColor: colors.primary, borderColor: colors.primary },
  buttonText: { color: colors.ink, fontWeight: '900' },
  history: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 15, padding: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  historyTitle: { color: colors.ink, fontSize: 16, fontWeight: '800' },
  status: { color: colors.success, backgroundColor: colors.successSoft, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999, fontSize: 11, fontWeight: '900' },
})
