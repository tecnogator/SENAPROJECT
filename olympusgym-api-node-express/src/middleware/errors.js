export function notFound(req, res) {
  res.status(404).json({
    timestamp: new Date().toISOString(),
    status: 404,
    error: 'ROUTE_NOT_FOUND',
    message: `No existe la ruta ${req.method} ${req.originalUrl}`,
    path: req.originalUrl
  });
}

export function errorHandler(error, req, res, next) {
  if (res.headersSent) {
    return next(error);
  }

  const status = error.status ?? 500;
  res.status(status).json({
    timestamp: new Date().toISOString(),
    status,
    error: error.code ?? 'INTERNAL_ERROR',
    message: status === 500 ? 'Ocurrió un error interno' : error.message,
    path: req.originalUrl,
    ...(error.details ? { details: error.details } : {})
  });
}
