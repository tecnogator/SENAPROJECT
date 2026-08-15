import { StyleSheet, Text, View } from 'react-native'
import { useState } from 'react'
import Feedback from '../components/Feedback'
import FormField from '../components/FormField'
import PrimaryButton from '../components/PrimaryButton'
import Screen from '../components/Screen'
import { useGymData } from '../context/GymDataContext'
import { colors } from '../theme/colors'
import { globalStyles } from '../theme/styles'

export default function SupplementsScreen() {
  const { supplements, create, loading, refresh } = useGymData()
  const [form, setForm] = useState({ nombre: '', dosis: '', horario: '' })
  const [feedback, setFeedback] = useState(null)
  const [saving, setSaving] = useState(false)
  const change = (key) => (value) => setForm((current) => ({ ...current, [key]: value }))

  const submit = async () => {
    if (Object.values(form).some((value) => !value.trim())) { setFeedback({ type: 'error', message: 'Complete nombre, dosis y horario.' }); return }
    setSaving(true); setFeedback(null)
    try { await create('supplements', form); setForm({ nombre: '', dosis: '', horario: '' }); setFeedback({ type: 'success', message: 'Suplemento asignado correctamente.' }) }
    catch (error) { setFeedback({ type: 'error', message: error.message }) } finally { setSaving(false) }
  }

  return (
    <Screen eyebrow="Bienestar" title="Suplementos" description="Organiza dosis y horarios asociados a tu proceso." refreshing={loading} onRefresh={refresh}>
      {feedback ? <Feedback type={feedback.type}>{feedback.message}</Feedback> : null}
      <View style={globalStyles.card}>
        <Text style={globalStyles.sectionTitle}>Nueva asignación</Text>
        <FormField label="Nombre" placeholder="Ej. Proteína Whey" value={form.nombre} onChangeText={change('nombre')} />
        <FormField label="Dosis" placeholder="Ej. 30 g" value={form.dosis} onChangeText={change('dosis')} />
        <FormField label="Horario" placeholder="Ej. Post-entreno" value={form.horario} onChangeText={change('horario')} />
        <PrimaryButton title="Asignar suplemento" onPress={submit} loading={saving} />
      </View>
      <Text style={globalStyles.sectionTitle}>Registros</Text>
      {supplements.map((item) => <View style={styles.item} key={item.id}><View style={styles.icon}><Text style={styles.iconText}>S</Text></View><View style={{ flex: 1 }}><Text style={styles.title}>{item.nombre}</Text><Text style={globalStyles.mutedText}>{item.dosis} · {item.horario}</Text></View></View>)}
    </Screen>
  )
}

const styles = StyleSheet.create({
  item: { flexDirection: 'row', alignItems: 'center', gap: 13, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 16, padding: 15 },
  icon: { width: 42, height: 42, borderRadius: 13, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center' },
  iconText: { color: colors.primary, fontWeight: '900' },
  title: { color: colors.ink, fontSize: 16, fontWeight: '800' },
})
