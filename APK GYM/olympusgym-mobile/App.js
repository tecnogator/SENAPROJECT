import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native'
import { AuthProvider } from './src/context/AuthContext'
import { GymDataProvider } from './src/context/GymDataContext'
import AppNavigator from './src/navigation/AppNavigator'
import { globalStyles } from './src/theme/styles'

export default function App() {
  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <StatusBar style="light" />
      <AuthProvider>
        <GymDataProvider>
          <AppNavigator />
        </GymDataProvider>
      </AuthProvider>
    </SafeAreaView>
  )
}
