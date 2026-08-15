import { createHash } from 'node:crypto'
import { readdir, readFile, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()
const outputName = 'MANIFIESTO_SHA256.txt'
const ignored = new Set(['.git', 'node_modules', outputName])

async function filesIn(directory) {
  const entries = await readdir(directory)
  const files = []
  for (const name of entries.sort()) {
    if (ignored.has(name)) continue
    const absolute = path.join(directory, name)
    const info = await stat(absolute)
    if (info.isDirectory()) files.push(...await filesIn(absolute))
    if (info.isFile()) files.push(absolute)
  }
  return files
}

const lines = [
  'OLYMPUSGYM — MANIFIESTO DE INTEGRIDAD SHA-256',
  'Generado por: scripts/generate-manifest.mjs',
  ''
]

for (const absolute of await filesIn(root)) {
  const digest = createHash('sha256').update(await readFile(absolute)).digest('hex')
  lines.push(`${digest}  ${path.relative(root, absolute).replaceAll(path.sep, '/')}`)
}

await writeFile(path.join(root, outputName), `${lines.join('\n')}\n`, 'utf8')
console.log(`Manifiesto generado: ${lines.length - 3} archivos`)
