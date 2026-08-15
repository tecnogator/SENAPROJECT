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
app.use(cors({ origin: process.env.FRONTEND_ORIGIN ?? 'http://localhost:5173' }));
app.use(express.json({ limit: '1mb' }));
app.use(requestLogger);

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'olympusgym-api',
    runtime: `Node.js ${process.version}`,
    framework: 'Express 5.2.1'
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
