import { Pressable, StyleSheet, Text, View } from 'react-native'
import Screen from '../components/Screen'
import { useAuth } from '../context/AuthContext'
import { apiMode, API_BASE_URL } from '../services/apiClient'
import { colors } from '../theme/colors'
import { globalStyles } from '../theme/styles'

export default function ProfileScreen({ go }) {
  const { user, logout } = useAuth()
  return (
    <Screen eyebrow="Cuenta" title="Mi perfil" description="Información de la sesión y accesos complementarios.">
      <View style={styles.profile}><View style={styles.avatar}><Text style={styles.avatarText}>{user.nombreCompleto?.charAt(0) ?? 'O'}</Text></View><Text style={styles.name}>{user.nombreCompleto}</Text><Text style={globalStyles.mutedText}>{user.email}</Text><View style={globalStyles.chip}><Text style={globalStyles.chipText}>{user.rol}</Text></View></View>
      <View style={globalStyles.card}><Text style={globalStyles.eyebrow}>Integración</Text><Text style={globalStyles.sectionTitle}>{apiMode}</Text><Text style={globalStyles.mutedText}>{API_BASE_URL}</Text></View>
      <Pressable onPress={() => go('supplements')} style={styles.link}><Text style={styles.linkText}>Suplementos</Text><Text style={styles.arrow}>›</Text></Pressable>
      <Pressable onPress={() => go('membership')} style={styles.link}><Text style={styles.linkText}>Membresías</Text><Text style={styles.arrow}>›</Text></Pressable>
      <Pressable onPress={() => go('guide')} style={styles.link}><Text style={styles.linkText}>Guía de entrenamiento</Text><Text style={styles.arrow}>›</Text></Pressable>
      <Pressable onPress={logout} style={styles.logout}><Text style={styles.logoutText}>Cerrar sesión</Text></Pressable>
    </Screen>
  )
}

const styles = StyleSheet.create({
  profile: { alignItems: 'center', backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 19, padding: 22, gap: 8 },
  avatar: { width: 70, height: 70, borderRadius: 35, backgroundColor: colors.dark, borderWidth: 3, borderColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: colors.white, fontSize: 28, fontWeight: '900' },
  name: { color: colors.ink, fontSize: 21, fontWeight: '900' },
  link: { minHeight: 56, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 15, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  linkText: { color: colors.ink, fontSize: 15, fontWeight: '800' },
  arrow: { color: colors.primary, fontSize: 25 },
  logout: { minHeight: 50, borderRadius: 13, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center' },
  logoutText: { color: colors.primaryDark, fontWeight: '900' },
})
