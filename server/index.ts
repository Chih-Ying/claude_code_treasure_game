import cookieSession from 'cookie-session';
import express from 'express';
import './db.js';
import { authRouter } from './routes/auth.js';
import { scoresRouter } from './routes/scores.js';

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(
  cookieSession({
    name: 'session',
    keys: [process.env.SESSION_SECRET ?? 'dev-secret-change-me'],
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: 'lax',
  }),
);

app.use('/api', authRouter);
app.use('/api/scores', scoresRouter);

app.listen(PORT, () => {
  console.log(`API server listening on http://localhost:${PORT}`);
});
