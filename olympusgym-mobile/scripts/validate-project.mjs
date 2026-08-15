import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { parse } from '@babel/parser'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const required = ['App.js', 'index.js', 'app.json', 'eas.json', 'src/services/apiClient.js', 'src/navigation/AppNavigator.js']
for (const relative of required) assert.ok(fs.existsSync(path.join(root, relative)), `Falta ${relative}`)

const files = []
function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const target = path.join(directory, entry.name)
    if (entry.isDirectory()) walk(target)
    else if (/\.(js|mjs)$/.test(entry.name)) files.push(target)
  }
}
walk(path.join(root, 'src'))
files.push(path.join(root, 'App.js'), path.join(root, 'index.js'))
for (const file of files) parse(fs.readFileSync(file, 'utf8'), { sourceType: 'module', plugins: ['jsx'] })

const config = JSON.parse(fs.readFileSync(path.join(root, 'app.json'), 'utf8'))
assert.equal(config.expo.android.package, 'com.tecnogator.olympusgym')
assert.ok(files.length >= 20, 'La aplicación debe conservar su estructura modular')
console.log(`VALIDACIÓN APROBADA: ${files.length} archivos JavaScript/JSX y configuración Android correcta.`)
