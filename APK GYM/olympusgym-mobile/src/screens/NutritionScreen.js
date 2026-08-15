import { StyleSheet, Text, View } from 'react-native'
import { useState } from 'react'
import Feedback from '../components/Feedback'
import FormField from '../components/FormField'
import PrimaryButton from '../components/PrimaryButton'
import Screen from '../components/Screen'
import { useGymData } from '../context/GymDataContext'
import { colors } from '../theme/colors'
import { globalStyles } from '../theme/styles'

const initial = { titulo: '', objetivo: '', descripcion: '', calorias: '2000', proteinas: '180', carbohidratos: '150', grasas: '50', fechaInicio: '2026-08-14', fechaFin: '2026-10-09' }

export default function NutritionScreen() {
  const { plans, create, loading, refresh } = useGymData()
  const [form, setForm] = useState(initial)
  const [feedback, setFeedback] = useState(null)
  const [saving, setSaving] = useState(false)
  const change = (key) => (value) => setForm((current) => ({ ...current, [key]: value }))

  const submit = async () => {
    if (!form.titulo.trim() || !form.objetivo.trim() || !form.descripcion.trim()) { setFeedback({ type: 'error', message: 'Complete título, objetivo y descripción.' }); return }
    if (form.fechaFin < form.fechaInicio) { setFeedback({ type: 'error', message: 'La fecha final debe ser posterior a la inicial.' }); return }
    setSaving(true); setFeedback(null)
    try {
      await create('plans', { ...form, calorias: Number(form.calorias), proteinas: Number(form.proteinas), carbohidratos: Number(form.carbohidratos), grasas: Number(form.grasas) })
      setForm(initial); setFeedback({ type: 'success', message: 'Plan de alimentación asignado.' })
    } catch (error) { setFeedback({ type: 'error', message: error.message }) } finally { setSaving(false) }
  }

  return (
    <Screen eyebrow="Nutrición" title="Alimentación" description="Gestiona objetivos, calorías y macronutrientes." refreshing={loading} onRefresh={refresh}>
      {feedback ? <Feedback type={feedback.type}>{feedback.message}</Feedback> : null}
      <View style={globalStyles.card}>
        <Text style={globalStyles.sectionTitle}>Nuevo plan</Text>
        <FormField label="Título" placeholder="Definición 8 semanas" value={form.titulo} onChangeText={change('titulo')} />
        <FormField label="Objetivo" placeholder="Definición" value={form.objetivo} onChangeText={change('objetivo')} />
        <FormField label="Descripción" multiline value={form.descripcion} onChangeText={change('descripcion')} />
        <View style={styles.grid}>
          {[
            ['calorias', 'Calorías'], ['proteinas', 'Proteína'], ['carbohidratos', 'Carbos'], ['grasas', 'Grasas'],
          ].map(([key, label]) => <View style={styles.half} key={key}><FormField label={label} keyboardType="number-pad" value={form[key]} onChangeText={change(key)} /></View>)}
        </View>
        <FormField label="Fecha inicial (AAAA-MM-DD)" value={form.fechaInicio} onChangeText={change('fechaInicio')} />
        <FormField label="Fecha final (AAAA-MM-DD)" value={form.fechaFin} onChangeText={change('fechaFin')} />
        <PrimaryButton title="Asignar plan" onPress={submit} loading={saving} />
      </View>
      <Text style={globalStyles.sectionTitle}>Mis planes</Text>
      {plans.map((plan) => (
        <View style={styles.plan} key={plan.id}>
          <View style={globalStyles.chip}><Text style={globalStyles.chipText}>{plan.objetivo}</Text></View>
          <Text style={styles.planTitle}>{plan.titulo}</Text><Text style={globalStyles.mutedText}>{plan.descripcion}</Text>
          <View style={styles.metrics}><Metric label="kcal" value={plan.calorias} /><Metric label="proteína" value={`${plan.proteinas} g`} /><Metric label="carbos" value={`${plan.carbohidratos} g`} /><Metric label="grasas" value={`${plan.grasas} g`} /></View>
        </View>
      ))}
    </Screen>
  )
}

function Metric({ label, value }) { return <View style={styles.metric}><Text style={styles.metricValue}>{value}</Text><Text style={styles.metricLabel}>{label}</Text></View> }

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  half: { width: '48%' },
  plan: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 17, padding: 17, gap: 9 },
  planTitle: { color: colors.ink, fontSize: 19, fontWeight: '900' },
  metrics: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 4 },
  metric: { width: '47%', backgroundColor: '#F7F8FA', borderRadius: 12, padding: 10 },
  metricValue: { color: colors.ink, fontWeight: '900', fontSize: 16 },
  metricLabel: { color: colors.muted, fontSize: 11 },
})
