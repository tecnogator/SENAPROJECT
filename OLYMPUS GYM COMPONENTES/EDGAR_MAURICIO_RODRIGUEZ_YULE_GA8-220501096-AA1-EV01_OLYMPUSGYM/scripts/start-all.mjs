import { spawn } from 'node:child_process';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function run(label, command, args, cwd, env = {}) {
  const child = spawn(command, args, {
    cwd,
    env: { ...process.env, ...env },
    stdio: ['inherit', 'pipe', 'pipe']
  });
  child.stdout.on('data', (chunk) => process.stdout.write(`[${label}] ${chunk}`));
  child.stderr.on('data', (chunk) => process.stderr.write(`[${label}] ${chunk}`));
  return child;
}

const api = run('API', process.execPath, ['src/server.js'], path.join(root, 'olympusgym-api'));
const web = run(
  'WEB',
  process.execPath,
  ['node_modules/vite/bin/vite.js', '--host', '127.0.0.1'],
  path.join(root, 'olympusgym-frontend'),
  { VITE_API_BASE_URL: 'http://localhost:3000/api', VITE_USE_MOCKS: 'false' }
);

console.log('OlympusGym integrado: API http://localhost:3000 | Web http://localhost:5173');

function shutdown(signal) {
  api.kill(signal);
  web.kill(signal);
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

for (const child of [api, web]) {
  child.on('exit', (code) => {
    if (code && code !== 0) {
      shutdown('SIGTERM');
      process.exitCode = code;
    }
  });
}
