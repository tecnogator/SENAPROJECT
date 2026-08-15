import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, View } from 'react-native'
import { useState } from 'react'
import Brand from '../components/Brand'
import Feedback from '../components/Feedback'
import FormField from '../components/FormField'
import PrimaryButton from '../components/PrimaryButton'
import { useAuth } from '../context/AuthContext'
import { colors } from '../theme/colors'
import { hasErrors, validateLogin } from '../utils/validators'

export default function LoginScreen({ goRegister }) {
  const { login } = useAuth()
  const [form, setForm] = useState({ email: 'edgar@olympusgym.test', password: 'Olympus123*' })
  const [errors, setErrors] = useState({})
  const [feedback, setFeedback] = useState('')
  const [loading, setLoading] = useState(false)
  const change = (key) => (value) => setForm((current) => ({ ...current, [key]: value }))

  const submit = async () => {
    const validation = validateLogin(form)
    setErrors(validation); setFeedback('')
    if (hasErrors(validation)) return
    setLoading(true)
    try { await login(form) } catch (error) { setFeedback(error.message) } finally { setLoading(false) }
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.screen}>
      <View style={styles.hero}><Brand /><Text style={styles.heroTitle}>Entrena. Progresa. Supera.</Text><Text style={styles.heroText}>Tu gimnasio, tu rutina y tu membresía en una sola aplicación.</Text></View>
      <View style={styles.panel}>
        <Text style={styles.eyebrow}>Acceso de cliente</Text><Text style={styles.title}>Bienvenido</Text><Text style={styles.subtitle}>Ingresa a tu cuenta OlympusGym.</Text>
        {feedback ? <Feedback type="error">{feedback}</Feedback> : null}
        <FormField label="Correo electrónico" autoCapitalize="none" keyboardType="email-address" value={form.email} onChangeText={change('email')} error={errors.email} />
        <FormField label="Contraseña" secureTextEntry value={form.password} onChangeText={change('password')} error={errors.password} />
        <PrimaryButton title="Entrar al gimnasio" onPress={submit} loading={loading} />
        <Pressable accessibilityRole="button" onPress={goRegister}><Text style={styles.link}>¿No tienes cuenta? Regístrate</Text></Pressable>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.dark, justifyContent: 'flex-end' },
  hero: { paddingHorizontal: 24, paddingTop: 38, paddingBottom: 30, gap: 12 },
  heroTitle: { color: colors.white, fontSize: 30, lineHeight: 36, fontWeight: '900', maxWidth: 320 },
  heroText: { color: '#AEB5C5', fontSize: 15, lineHeight: 22, maxWidth: 320 },
  panel: { backgroundColor: colors.surface, borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 24, gap: 15 },
  eyebrow: { color: colors.primary, fontSize: 12, fontWeight: '900', letterSpacing: 1.2, textTransform: 'uppercase' },
  title: { color: colors.ink, fontSize: 30, fontWeight: '900' },
  subtitle: { color: colors.muted, fontSize: 15 },
  link: { color: colors.primary, textAlign: 'center', fontWeight: '800', padding: 8 },
})
