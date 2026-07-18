import { Router } from 'express';
import { db } from '../db.js';
import { hashPassword, verifyPassword } from '../lib/password.js';

interface UserRow {
  id: number;
  username: string;
  password_hash: string;
}

export const authRouter = Router();

authRouter.post('/signup', (req, res) => {
  const { username, password } = req.body ?? {};
  if (typeof username !== 'string' || !username.trim() || typeof password !== 'string' || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  const existing = db.prepare('SELECT id FROM users WHERE username = ?').get(username);
  if (existing) {
    return res.status(409).json({ error: 'Username is already taken' });
  }

  const passwordHash = hashPassword(password);
  const result = db
    .prepare('INSERT INTO users (username, password_hash) VALUES (?, ?)')
    .run(username, passwordHash);

  req.session = { userId: result.lastInsertRowid };
  res.status(201).json({ user: { id: result.lastInsertRowid, username } });
});

authRouter.post('/login', (req, res) => {
  const { username, password } = req.body ?? {};
  if (typeof username !== 'string' || typeof password !== 'string') {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  const user = db
    .prepare('SELECT id, username, password_hash FROM users WHERE username = ?')
    .get(username) as UserRow | undefined;

  if (!user || !verifyPassword(password, user.password_hash)) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  req.session = { userId: user.id };
  res.json({ user: { id: user.id, username: user.username } });
});

authRouter.post('/logout', (req, res) => {
  req.session = null;
  res.status(204).end();
});

authRouter.get('/me', (req, res) => {
  const userId = req.session?.userId;
  if (!userId) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  const user = db.prepare('SELECT id, username FROM users WHERE id = ?').get(userId);
  if (!user) {
    req.session = null;
    return res.status(401).json({ error: 'Not authenticated' });
  }

  res.json({ user });
});
