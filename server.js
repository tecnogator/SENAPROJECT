import app from './app.js';

const port = Number(process.env.PORT ?? 3000);

const server = app.listen(port, () => {
  console.log('');
  console.log('  OLYMPUSGYM API');
  console.log('  Runtime   : Node.js ' + process.version);
  console.log('  Framework : Express 5.2.1');
  console.log(`  Estado    : servidor activo en http://localhost:${port}`);
  console.log(`  Health    : http://localhost:${port}/health`);
  console.log('');
});

function shutdown(signal) {
  console.log(`\n${signal}: cerrando servidor...`);
  server.close(() => process.exit(0));
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
