import { StyleSheet, Text, View } from 'react-native'
import { colors } from '../theme/colors'

export default function Brand({ compact = false }) {
  return (
    <View style={styles.row} accessibilityLabel="OlympusGym">
      <View style={[styles.mark, compact && styles.markCompact]}><Text style={styles.markText}>O</Text></View>
      <Text style={[styles.name, compact && styles.nameCompact]}><Text style={styles.accent}>Olympus</Text>Gym</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  mark: { width: 46, height: 46, borderRadius: 13, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  markCompact: { width: 36, height: 36, borderRadius: 10 },
  markText: { color: colors.white, fontSize: 20, fontWeight: '900' },
  name: { color: colors.white, fontSize: 23, fontWeight: '800' },
  nameCompact: { fontSize: 19 },
  accent: { color: colors.primary },
})
