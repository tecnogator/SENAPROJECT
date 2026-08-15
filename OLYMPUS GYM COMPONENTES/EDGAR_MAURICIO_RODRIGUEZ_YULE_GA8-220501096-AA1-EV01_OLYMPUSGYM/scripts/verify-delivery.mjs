import { spawnSync } from 'node:child_process';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const checks = [
  ['Pruebas backend', ['--test', '--test-concurrency=1', 'tests/*.test.js'], 'olympusgym-api', true],
  ['ESLint frontend', ['node_modules/eslint/bin/eslint.js', '.'], 'olympusgym-frontend', false],
  ['Compilación frontend', ['node_modules/vite/bin/vite.js', 'build'], 'olympusgym-frontend', false]
];

let failed = false;
for (const [label, args, folder, shell] of checks) {
  console.log(`\n=== ${label} ===`);
  const result = spawnSync(process.execPath, args, {
    cwd: path.join(root, folder),
    stdio: 'inherit',
    shell
  });
  if (result.status !== 0) failed = true;
}

console.log(`\nResultado de la entrega: ${failed ? 'CON FALLOS' : 'APROBADA'}`);
process.exit(failed ? 1 : 0);
