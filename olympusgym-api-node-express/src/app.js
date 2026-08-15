import cors from 'cors';
import express from 'express';
import authRoutes from './routes/auth.routes.js';
import dashboardRoutes from './routes/dashboard.routes.js';
import planesRoutes from './routes/planes.routes.js';
import rutinasRoutes from './routes/rutinas.routes.js';
import suplementosRoutes from './routes/suplementos.routes.js';
import membresiasRoutes from './routes/membresias.routes.js';
import { errorHandler, notFound } from './middleware/errors.js';
import { requestLogger } from './middleware/requestLogger.js';

const app = express();

app.disable('x-powered-by');
const allowedOrigins = (process.env.FRONTEND_ORIGINS ?? 'http://localhost:5173,http://localhost:4173')
  .split(',')
  .map((origin) => origin.trim());
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Origen no permitido por CORS'));
  }
}));
app.use(express.json({ limit: '1mb' }));
app.use(requestLogger);

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'olympusgym-api',
    runtime: `Node.js ${process.version}`,
    framework: 'Express 5.2.1',
    technology: 'Node.js + Express',
    timestamp: new Date().toISOString()
  });
});

app.get('/api', (req, res) => {
  res.status(200).json({
    name: 'OlympusGym API',
    version: '1.0.0',
    documentation: '/health',
    modules: ['auth', 'dashboard', 'planes', 'rutinas', 'suplementos', 'membresias']
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/planes', planesRoutes);
app.use('/api/rutinas', rutinasRoutes);
app.use('/api/suplementos', suplementosRoutes);
app.use('/api/membresias', membresiasRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
