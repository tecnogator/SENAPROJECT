import * as SecureStore from 'expo-secure-store'

const KEY = 'olympusgym.session'

export async function readSession() {
  const raw = await SecureStore.getItemAsync(KEY)
  if (!raw) return null
  try { return JSON.parse(raw) } catch { return null }
}

export async function saveSession(session) {
  await SecureStore.setItemAsync(KEY, JSON.stringify(session))
}

export async function clearSession() {
  await SecureStore.deleteItemAsync(KEY)
}
