import fs from 'node:fs'
import path from 'node:path'

const required = [
  'olympusgym-api-node-express/package.json',
  'olympusgym-api-node-express/src/server.js',
  'olympusgym-frontend/package.json',
  'olympusgym-frontend/index.html',
  'olympusgym-frontend/src/App.jsx',
  'olympusgym-mobile/package.json',
  'olympusgym-mobile/app.json',
  'olympusgym-mobile/App.js',
  '.github/workflows/ci.yml',
  '.github/workflows/android-apk.yml',
  'legacy-html/login.html',
  'legacy-html/dashboard.html'
]

const missing = required.filter((file) => !fs.existsSync(path.resolve(file)))
if (missing.length) {
  console.error('Archivos obligatorios ausentes:')
  missing.forEach((file) => console.error(`- ${file}`))
  process.exit(1)
}

const mobile = JSON.parse(fs.readFileSync('olympusgym-mobile/package.json', 'utf8'))
const app = JSON.parse(fs.readFileSync('olympusgym-mobile/app.json', 'utf8'))
if (!mobile.dependencies?.expo || !mobile.dependencies?.['react-native']) throw new Error('Expo o React Native no están configurados')
if (app.expo?.android?.package !== 'com.tecnogator.olympusgym') throw new Error('Package Android incorrecto')

console.log('OLYMPUSGYM FULLSTACK - VALIDACIÓN APROBADA')
console.log(`Expo: ${mobile.dependencies.expo}`)
console.log(`React Native: ${mobile.dependencies['react-native']}`)
console.log(`Android package: ${app.expo.android.package}`)
console.log(`Archivos requeridos: ${required.length}/${required.length}`)
