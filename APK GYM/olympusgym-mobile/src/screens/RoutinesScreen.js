import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useState } from 'react'
import Feedback from '../components/Feedback'
import FormField from '../components/FormField'
import PrimaryButton from '../components/PrimaryButton'
import Screen from '../components/Screen'
import { useGymData } from '../context/GymDataContext'
import { colors } from '../theme/colors'
import { globalStyles } from '../theme/styles'
import { positiveInteger } from '../utils/validators'

const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']

export default function RoutinesScreen() {
  const { routines, create, loading, refresh } = useGymData()
  const [form, setForm] = useState({ dia: 'Lunes', ejercicio: '', series: '4', repeticiones: '12' })
  const [feedback, setFeedback] = useState(null)
  const [saving, setSaving] = useState(false)

  const submit = async () => {
    const seriesError = positiveInteger(form.series, 'Series', 20)
    const repsError = positiveInteger(form.repeticiones, 'Repeticiones', 100)
    if (!form.ejercicio.trim() || seriesError || repsError) {
      setFeedback({ type: 'error', message: !form.ejercicio.trim() ? 'El ejercicio es obligatorio.' : seriesError || repsError }); return
    }
    setSaving(true); setFeedback(null)
    try {
      await create('routines', { dia: form.dia, ejercicio: form.ejercicio.trim(), series: Number(form.series), repeticiones: Number(form.repeticiones) })
      setForm((current) => ({ ...current, ejercicio: '' })); setFeedback({ type: 'success', message: 'Rutina asignada correctamente.' })
    } catch (error) { setFeedback({ type: 'error', message: error.message }) } finally { setSaving(false) }
  }

  return (
    <Screen eyebrow="Entrenamiento" title="Mi rutina" description="Registra y consulta ejercicios asociados a tu perfil." refreshing={loading} onRefresh={refresh}>
      {feedback ? <Feedback type={feedback.type}>{feedback.message}</Feedback> : null}
      <View style={globalStyles.card}>
        <Text style={globalStyles.sectionTitle}>Nueva asignación</Text>
        <Text style={globalStyles.label}>Día</Text>
        <View style={styles.days}>{days.map((day) => <Pressable key={day} onPress={() => setForm((current) => ({ ...current, dia: day }))} style={[styles.day, form.dia === day && styles.dayActive]}><Text style={[styles.dayText, form.dia === day && styles.dayTextActive]}>{day.slice(0, 3)}</Text></Pressable>)}</View>
        <FormField label="Ejercicio" placeholder="Ej. Press de banca" value={form.ejercicio} onChangeText={(value) => setForm((current) => ({ ...current, ejercicio: value }))} />
        <View style={styles.twoColumns}>
          <View style={{ flex: 1 }}><FormField label="Series" keyboardType="number-pad" value={form.series} onChangeText={(value) => setForm((current) => ({ ...current, series: value }))} /></View>
          <View style={{ flex: 1 }}><FormField label="Repeticiones" keyboardType="number-pad" value={form.repeticiones} onChangeText={(value) => setForm((current) => ({ ...current, repeticiones: value }))} /></View>
        </View>
        <PrimaryButton title="Asignar rutina" onPress={submit} loading={saving} />
      </View>
      <Text style={globalStyles.sectionTitle}>Plan semanal</Text>
      {routines.length === 0 ? <Text style={globalStyles.mutedText}>No hay rutinas registradas.</Text> : routines.map((routine) => (
        <View style={styles.item} key={routine.id}><View style={globalStyles.chip}><Text style={globalStyles.chipText}>{routine.dia}</Text></View><Text style={styles.itemTitle}>{routine.ejercicio}</Text><Text style={globalStyles.mutedText}>{routine.series} series · {routine.repeticiones} repeticiones</Text></View>
      ))}
    </Screen>
  )
}

const styles = StyleSheet.create({
  days: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  day: { borderWidth: 1, borderColor: colors.border, backgroundColor: '#FAFBFC', borderRadius: 10, paddingHorizontal: 11, paddingVertical: 9 },
  dayActive: { borderColor: colors.primary, backgroundColor: colors.primarySoft },
  dayText: { color: colors.muted, fontSize: 12, fontWeight: '800' },
  dayTextActive: { color: colors.primaryDark },
  twoColumns: { flexDirection: 'row', gap: 10 },
  item: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 16, padding: 16, gap: 7 },
  itemTitle: { color: colors.ink, fontSize: 17, fontWeight: '800' },
})
