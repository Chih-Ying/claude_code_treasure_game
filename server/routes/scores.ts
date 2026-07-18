import { Router } from 'express';
import { db } from '../db.js';
import { requireAuth } from '../middleware/requireAuth.js';

export const scoresRouter = Router();

scoresRouter.post('/', requireAuth, (req, res) => {
  const { score } = req.body ?? {};
  if (typeof score !== 'number' || !Number.isFinite(score)) {
    return res.status(400).json({ error: 'score must be a number' });
  }

  const result = db
    .prepare('INSERT INTO scores (user_id, score) VALUES (?, ?)')
    .run(req.session!.userId, score);

  const row = db
    .prepare('SELECT id, score, created_at FROM scores WHERE id = ?')
    .get(result.lastInsertRowid);

  res.status(201).json(row);
});

scoresRouter.get('/', requireAuth, (req, res) => {
  const rows = db
    .prepare('SELECT id, score, created_at FROM scores WHERE user_id = ? ORDER BY created_at DESC LIMIT 50')
    .all(req.session!.userId);

  res.json(rows);
});
