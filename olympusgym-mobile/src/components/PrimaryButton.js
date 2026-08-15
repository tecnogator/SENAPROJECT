import { ActivityIndicator, Pressable, Text } from 'react-native'
import { globalStyles } from '../theme/styles'

export default function PrimaryButton({ title, onPress, loading = false, variant = 'primary', disabled = false }) {
  const secondary = variant === 'secondary'
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      disabled={loading || disabled}
      onPress={onPress}
      style={({ pressed }) => [
        globalStyles.button,
        secondary ? globalStyles.buttonSecondary : globalStyles.buttonPrimary,
        (pressed || loading || disabled) && { opacity: 0.72 },
      ]}
    >
      {loading ? <ActivityIndicator color={secondary ? '#171B26' : '#FFFFFF'} /> : (
        <Text style={secondary ? globalStyles.buttonTextDark : globalStyles.buttonText}>{title}</Text>
      )}
    </Pressable>
  )
}
