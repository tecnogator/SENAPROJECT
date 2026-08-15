import { StyleSheet } from 'react-native'
import { colors } from './colors'

export const globalStyles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.dark },
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, paddingBottom: 120, gap: 16 },
  row: { flexDirection: 'row', alignItems: 'center' },
  rowBetween: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  title: { color: colors.ink, fontSize: 30, lineHeight: 36, fontWeight: '800' },
  subtitle: { color: colors.muted, fontSize: 15, lineHeight: 22 },
  eyebrow: { color: colors.primary, fontSize: 12, fontWeight: '800', letterSpacing: 1.3, textTransform: 'uppercase' },
  sectionTitle: { color: colors.ink, fontSize: 20, lineHeight: 26, fontWeight: '800' },
  card: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 18, padding: 18, gap: 10 },
  label: { color: colors.ink, fontSize: 14, fontWeight: '700' },
  input: { minHeight: 50, borderWidth: 1, borderColor: colors.border, borderRadius: 13, paddingHorizontal: 15, color: colors.ink, backgroundColor: '#FAFBFC', fontSize: 15 },
  button: { minHeight: 50, borderRadius: 13, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 18 },
  buttonPrimary: { backgroundColor: colors.primary },
  buttonSecondary: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  buttonText: { color: colors.white, fontWeight: '800', fontSize: 15 },
  buttonTextDark: { color: colors.ink, fontWeight: '800', fontSize: 15 },
  errorText: { color: colors.danger, fontSize: 13 },
  mutedText: { color: colors.muted, fontSize: 14, lineHeight: 20 },
  value: { color: colors.ink, fontSize: 16, fontWeight: '700' },
  chip: { alignSelf: 'flex-start', backgroundColor: colors.primarySoft, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 999 },
  chipText: { color: colors.primaryDark, fontSize: 12, fontWeight: '800' },
})
