import { RefreshControl, ScrollView, Text, View } from 'react-native'
import { globalStyles } from '../theme/styles'

export default function Screen({ eyebrow, title, description, children, refreshing = false, onRefresh }) {
  return (
    <ScrollView
      style={globalStyles.screen}
      contentContainerStyle={globalStyles.content}
      keyboardShouldPersistTaps="handled"
      refreshControl={onRefresh ? <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> : undefined}
    >
      <View style={{ gap: 5 }}>
        {eyebrow ? <Text style={globalStyles.eyebrow}>{eyebrow}</Text> : null}
        <Text style={globalStyles.title}>{title}</Text>
        {description ? <Text style={globalStyles.subtitle}>{description}</Text> : null}
      </View>
      {children}
    </ScrollView>
  )
}
