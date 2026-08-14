export function requestLogger(req, res, next) {
  const start = performance.now();
  res.on('finish', () => {
    const elapsed = Math.round(performance.now() - start);
    const timestamp = new Date().toISOString();
    console.log(`${timestamp}  ${req.method.padEnd(4)} ${String(res.statusCode).padEnd(3)}  ${req.originalUrl}  ${elapsed} ms`);
  });
  next();
}
