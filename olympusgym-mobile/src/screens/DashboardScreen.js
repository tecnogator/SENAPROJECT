import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native'
import Screen from '../components/Screen'
import Feedback from '../components/Feedback'
import { useAuth } from '../context/AuthContext'
import { useGymData } from '../context/GymDataContext'
import { colors } from '../theme/colors'
import { globalStyles } from '../theme/styles'

const money = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })

export default function DashboardScreen({ go }) {
  const { user } = useAuth()
  const { stats, memberships, loading, error, refresh } = useGymData()
  const current = memberships[0]
  return (
    <Screen eyebrow="Panel personal" title={`Hola, ${user.nombreCompleto?.split(' ')[0] ?? 'atleta'}`} description="Consulta tu proceso y administra cada módulo desde el celular." refreshing={loading} onRefresh={refresh}>
      {error ? <Feedback type="error">{error}</Feedback> : null}
      {!stats && loading ? <ActivityIndicator color={colors.primary} size="large" /> : (
        <View style={styles.grid}>
          <Stat label="Usuarios" value={stats?.totalUsuarios ?? 0} accent />
          <Stat label="Clientes" value={stats?.totalClientes ?? 0} />
          <Stat label="Rutinas" value={stats?.totalRutinas ?? 0} />
          <Stat label="Ingresos" value={money.format(stats?.totalIngresos ?? 0)} />
        </View>
      )}
      <View style={globalStyles.card}>
        <Text style={globalStyles.eyebrow}>Membresía actual</Text>
        <Text style={globalStyles.sectionTitle}>{current?.tipo ?? 'Sin membresía'}</Text>
        <Text style={globalStyles.mutedText}>{current ? `${current.fechaInicio} a ${current.fechaFin}` : 'Selecciona un plan para activar tu acceso.'}</Text>
        <Pressable onPress={() => go('membership')}><Text style={styles.link}>Administrar membresía →</Text></Pressable>
      </View>
      <Text style={globalStyles.sectionTitle}>Continúa tu proceso</Text>
      <View style={{ gap: 11 }}>
        {[
          ['routines', 'Rutinas', 'Ejercicios, series y repeticiones'],
          ['nutrition', 'Alimentación', 'Calorías y macronutrientes'],
          ['supplements', 'Suplementos', 'Dosis y horarios'],
          ['guide', 'Guía de entrenamiento', 'Recomendaciones de uso seguro'],
        ].map(([route, title, description], index) => (
          <Pressable accessibilityRole="button" key={route} onPress={() => go(route)} style={styles.action}>
            <Text style={styles.number}>{String(index + 1).padStart(2, '0')}</Text>
            <View style={{ flex: 1 }}><Text style={styles.actionTitle}>{title}</Text><Text style={globalStyles.mutedText}>{description}</Text></View>
            <Text style={styles.arrow}>›</Text>
          </Pressable>
        ))}
      </View>
    </Screen>
  )
}

function Stat({ label, value, accent = false }) {
  return <View style={[styles.stat, accent && styles.statAccent]}><Text style={[styles.statLabel, accent && { color: '#FFD7DF' }]}>{label}</Text><Text style={[styles.statValue, accent && { color: colors.white }]} numberOfLines={1} adjustsFontSizeToFit>{value}</Text></View>
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  stat: { width: '48%', minHeight: 94, borderRadius: 17, padding: 15, justifyContent: 'space-between', backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  statAccent: { backgroundColor: colors.primary, borderColor: colors.primary },
  statLabel: { color: colors.muted, fontSize: 13, fontWeight: '700' },
  statValue: { color: colors.ink, fontSize: 23, fontWeight: '900' },
  link: { color: colors.primary, fontWeight: '800', paddingVertical: 5 },
  action: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 16, padding: 15, flexDirection: 'row', alignItems: 'center', gap: 13 },
  number: { color: '#F2A7B5', fontSize: 21, fontWeight: '900' },
  actionTitle: { color: colors.ink, fontSize: 16, fontWeight: '800', marginBottom: 2 },
  arrow: { color: colors.primary, fontSize: 28, fontWeight: '500' },
})
