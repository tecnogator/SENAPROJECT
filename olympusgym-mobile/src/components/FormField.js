import { Text, TextInput, View } from 'react-native'
import { globalStyles } from '../theme/styles'

export default function FormField({ label, error, ...inputProps }) {
  return (
    <View style={{ gap: 7 }}>
      <Text style={globalStyles.label}>{label}</Text>
      <TextInput placeholderTextColor="#9299A8" style={[globalStyles.input, error && { borderColor: '#B4233B' }]} {...inputProps} />
      {error ? <Text style={globalStyles.errorText}>{error}</Text> : null}
    </View>
  )
}
