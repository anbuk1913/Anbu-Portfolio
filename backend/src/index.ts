import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import path from 'path';

import contactRouter from './routes/contact';

dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 5000;
const isDev = process.env.NODE_ENV !== 'production';

// ─── Security Middleware ───────────────────────────────────────────────────────
app.use(helmet());

app.use(cors({
  origin: isDev
    ? [process.env.FRONTEND_URL ?? 'http://localhost:5173']
    : [process.env.FRONTEND_URL ?? ''],
  methods: ['GET', 'POST'],
  credentials: true,
}));

// ─── Rate Limiting ─────────────────────────────────────────────────────────────
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests. Please wait and try again.' },
});

// ─── Body Parsing ──────────────────────────────────────────────────────────────
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

// ─── Health check ──────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ─── API Routes ────────────────────────────────────────────────────────────────
app.use('/api/contact', contactLimiter, contactRouter);

// ─── Serve frontend build in production ───────────────────────────────────────
if (!isDev) {
  const frontendBuild = path.join(__dirname, '../../frontend/dist');
  app.use(express.static(frontendBuild));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(frontendBuild, 'index.html'));
  });
}

// ─── 404 handler ──────────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Route not found.' });
});

// ─── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n  🚀  Portfolio API running`);
  console.log(`      http://localhost:${PORT}/api/health\n`);
});

export default app;
