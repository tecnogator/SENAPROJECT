import { StyleSheet, Text, View } from 'react-native'
import { colors } from '../theme/colors'

export default function Feedback({ type = 'success', children }) {
  const success = type === 'success'
  return (
    <View style={[styles.box, success ? styles.success : styles.error]}>
      <Text style={[styles.text, { color: success ? colors.success : colors.danger }]}>{children}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  box: { borderRadius: 13, paddingHorizontal: 14, paddingVertical: 12, borderWidth: 1 },
  success: { backgroundColor: colors.successSoft, borderColor: '#B9E8CE' },
  error: { backgroundColor: colors.primarySoft, borderColor: '#F4B9C5' },
  text: { fontSize: 14, fontWeight: '700' },
})
