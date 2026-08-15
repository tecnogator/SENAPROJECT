import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native'
import { useState } from 'react'
import Brand from '../components/Brand'
import { useAuth } from '../context/AuthContext'
import { apiMode } from '../services/apiClient'
import { colors } from '../theme/colors'
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'
import DashboardScreen from '../screens/DashboardScreen'
import RoutinesScreen from '../screens/RoutinesScreen'
import NutritionScreen from '../screens/NutritionScreen'
import SupplementsScreen from '../screens/SupplementsScreen'
import MembershipScreen from '../screens/MembershipScreen'
import GuideScreen from '../screens/GuideScreen'
import ProfileScreen from '../screens/ProfileScreen'

const screens = { dashboard: DashboardScreen, routines: RoutinesScreen, nutrition: NutritionScreen, supplements: SupplementsScreen, membership: MembershipScreen, guide: GuideScreen, profile: ProfileScreen }

export default function AppNavigator() {
  const { user, booting, logout } = useAuth()
  const [authRoute, setAuthRoute] = useState('login')
  const [route, setRoute] = useState('dashboard')

  if (booting) return <View style={styles.center}><ActivityIndicator color={colors.primary} size="large" /><Text style={styles.loading}>Preparando OlympusGym...</Text></View>
  if (!user) return authRoute === 'login' ? <LoginScreen goRegister={() => setAuthRoute('register')} /> : <RegisterScreen goLogin={() => setAuthRoute('login')} />

  const CurrentScreen = screens[route] ?? DashboardScreen
  const go = (next) => setRoute(next)

  return (
    <View style={styles.shell}>
      <View style={styles.header}>
        <Brand compact />
        <View style={{ alignItems: 'flex-end' }}><Text style={styles.user}>{user.nombreCompleto?.split(' ')[0]}</Text><Text style={styles.mode}>{apiMode}</Text></View>
      </View>
      <View style={styles.body}><CurrentScreen go={go} /></View>
      <View style={styles.tabs}>
        {[
          ['dashboard', 'Inicio'], ['routines', 'Rutinas'], ['nutrition', 'Nutrición'], ['profile', 'Cuenta'],
        ].map(([key, label]) => (
          <Pressable accessibilityRole="button" key={key} onPress={() => go(key)} style={styles.tab}>
            <View style={[styles.dot, route === key && styles.dotActive]} />
            <Text style={[styles.tabText, route === key && styles.tabTextActive]}>{label}</Text>
          </Pressable>
        ))}
      </View>
      {route === 'profile' ? <Pressable accessibilityLabel="Cerrar sesión" onPress={logout} style={styles.logout}><Text style={styles.logoutText}>Salir</Text></Pressable> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  shell: { flex: 1, backgroundColor: colors.background },
  header: { height: 68, backgroundColor: colors.dark, paddingHorizontal: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  user: { color: colors.white, fontWeight: '800', fontSize: 14 },
  mode: { color: '#AEB5C5', fontSize: 11 },
  body: { flex: 1 },
  tabs: { minHeight: 72, paddingBottom: 8, backgroundColor: colors.dark, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', borderTopWidth: 1, borderColor: colors.darkSoft },
  tab: { alignItems: 'center', justifyContent: 'center', minWidth: 72, gap: 5 },
  dot: { width: 7, height: 7, borderRadius: 4, backgroundColor: '#5B6272' },
  dotActive: { backgroundColor: colors.primary },
  tabText: { color: '#AEB5C5', fontSize: 12, fontWeight: '700' },
  tabTextActive: { color: colors.white },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.dark, gap: 14 },
  loading: { color: colors.white },
  logout: { position: 'absolute', top: 18, right: 128, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, backgroundColor: colors.primary },
  logoutText: { color: colors.white, fontWeight: '800', fontSize: 12 },
})
