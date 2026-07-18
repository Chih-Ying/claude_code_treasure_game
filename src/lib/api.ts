const BASE = '/api';

export interface User {
  id: number;
  username: string;
}

export interface ScoreEntry {
  id: number;
  score: number;
  created_at: string;
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? `Request failed: ${res.status}`);
  }

  if (res.status === 204) {
    return undefined as T;
  }

  return res.json();
}

export const api = {
  signup: (username: string, password: string) =>
    request<{ user: User }>('/signup', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    }),
  login: (username: string, password: string) =>
    request<{ user: User }>('/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    }),
  logout: () => request<void>('/logout', { method: 'POST' }),
  me: () => request<{ user: User }>('/me'),
  saveScore: (score: number) =>
    request<ScoreEntry>('/scores', {
      method: 'POST',
      body: JSON.stringify({ score }),
    }),
  getScores: () => request<ScoreEntry[]>('/scores'),
};
