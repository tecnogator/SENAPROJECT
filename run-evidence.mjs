import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import newman from 'newman';
import app from '../src/app.js';

const root = process.cwd();
const resultsPath = path.join(root, 'postman', 'newman-results.json');
const transcriptPath = path.join(root, 'evidencias', 'newman-transcript.txt');
const serverLogPath = path.join(root, 'evidencias', 'server-transcript.txt');
const serverLines = [];

const originalLog = console.log;
console.log = (...parts) => {
  const line = parts.map(String).join(' ');
  serverLines.push(line);
  originalLog(...parts);
};

const server = app.listen(3000, () => {
  console.log('OLYMPUSGYM API — SESIÓN DE EVIDENCIA');
  console.log(`Runtime   : Node.js ${process.version}`);
  console.log('Framework : Express 5.2.1');
  console.log('Estado    : servidor activo en http://localhost:3000');
  console.log('Runner    : Postman Collection con Newman');
  console.log('');

  const transcript = [];
  newman.run(
    {
      collection: path.join(root, 'postman', 'OlympusGym_API.postman_collection.json'),
      environment: path.join(root, 'postman', 'OlympusGym_Local.postman_environment.json'),
      reporters: ['cli', 'json'],
      reporter: { json: { export: resultsPath } }
    },
    (error, summary) => {
      fs.writeFileSync(serverLogPath, `${serverLines.join('\n')}\n`, 'utf8');
      if (error) {
        fs.writeFileSync(transcriptPath, `${error.stack ?? error}\n`, 'utf8');
        server.close(() => process.exit(1));
        return;
      }

      const stats = summary.run.stats;
      const failures = summary.run.failures.length;
      transcript.push('POSTMAN / NEWMAN — RESUMEN DE EJECUCIÓN');
      transcript.push(`Colección : ${summary.collection.name}`);
      transcript.push(`Inicio    : ${summary.run.timings.started}`);
      transcript.push(`Solicitudes: ${stats.requests.total}`);
      transcript.push(`Assertions : ${stats.assertions.total}`);
      transcript.push(`Fallos     : ${failures}`);
      transcript.push(`Duración   : ${summary.run.timings.completed - summary.run.timings.started} ms`);
      transcript.push('');
      for (const execution of summary.run.executions) {
        const assertionFailures = execution.assertions?.filter((item) => item.error).length ?? 0;
        transcript.push(
          `${execution.item.name} | ${execution.request.method} ${execution.request.url} | ` +
          `${execution.response.code} ${execution.response.status} | ` +
          `${execution.response.responseTime} ms | ${assertionFailures === 0 ? 'PASS' : 'FAIL'}`
        );
      }
      fs.writeFileSync(transcriptPath, `${transcript.join('\n')}\n`, 'utf8');
      console.log('');
      console.log(`Resultado final: ${failures === 0 ? 'APROBADO' : 'CON FALLOS'}`);
      console.log(`Solicitudes: ${stats.requests.total} | Assertions: ${stats.assertions.total} | Fallos: ${failures}`);
      server.close(() => process.exit(failures === 0 ? 0 : 1));
    }
  );
});

server.on('error', (error) => {
  originalLog(error);
  process.exit(1);
});
