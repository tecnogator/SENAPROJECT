import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useState } from 'react'
import Brand from '../components/Brand'
import Feedback from '../components/Feedback'
import FormField from '../components/FormField'
import PrimaryButton from '../components/PrimaryButton'
import { useAuth } from '../context/AuthContext'
import { colors } from '../theme/colors'
import { hasErrors, validateRegister } from '../utils/validators'

export default function RegisterScreen({ goLogin }) {
  const { register } = useAuth()
  const [form, setForm] = useState({ nombreCompleto: '', email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [feedback, setFeedback] = useState('')
  const [loading, setLoading] = useState(false)
  const change = (key) => (value) => setForm((current) => ({ ...current, [key]: value }))

  const submit = async () => {
    const validation = validateRegister(form); setErrors(validation); setFeedback('')
    if (hasErrors(validation)) return
    setLoading(true)
    try { await register(form) } catch (error) { setFeedback(error.message) } finally { setLoading(false) }
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Brand /><View style={{ gap: 6 }}><Text style={styles.eyebrow}>Nuevo cliente</Text><Text style={styles.title}>Crea tu cuenta</Text><Text style={styles.subtitle}>Empieza a gestionar tu proceso deportivo.</Text></View>
        {feedback ? <Feedback type="error">{feedback}</Feedback> : null}
        <FormField label="Nombre completo" value={form.nombreCompleto} onChangeText={change('nombreCompleto')} error={errors.nombreCompleto} />
        <FormField label="Correo electrónico" autoCapitalize="none" keyboardType="email-address" value={form.email} onChangeText={change('email')} error={errors.email} />
        <FormField label="Contraseña" secureTextEntry value={form.password} onChangeText={change('password')} error={errors.password} />
        <PrimaryButton title="Crear cuenta" onPress={submit} loading={loading} />
        <Pressable accessibilityRole="button" onPress={goLogin}><Text style={styles.link}>Ya tengo una cuenta</Text></Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.dark },
  content: { flexGrow: 1, padding: 24, gap: 17, justifyContent: 'center' },
  eyebrow: { color: colors.primary, fontSize: 12, fontWeight: '900', letterSpacing: 1.2, textTransform: 'uppercase' },
  title: { color: colors.white, fontSize: 31, fontWeight: '900' },
  subtitle: { color: '#AEB5C5', fontSize: 15 },
  link: { color: colors.white, textAlign: 'center', fontWeight: '800', padding: 8 },
})
