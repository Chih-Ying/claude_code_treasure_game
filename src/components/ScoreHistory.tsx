import { useEffect, useState } from 'react';
import { api, ScoreEntry } from '../lib/api';

export default function ScoreHistory({ refreshKey }: { refreshKey: number }) {
  const [scores, setScores] = useState<ScoreEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api
      .getScores()
      .then(setScores)
      .catch(() => setScores([]))
      .finally(() => setLoading(false));
  }, [refreshKey]);

  if (loading) return null;
  if (scores.length === 0) return null;

  return (
    <div className="mt-8 w-full max-w-sm p-4 bg-amber-200/60 backdrop-blur-sm rounded-lg shadow border border-amber-300">
      <h3 className="text-amber-900 mb-2">Your Score History</h3>
      <ul className="space-y-1 text-sm">
        {scores.map((entry) => (
          <li key={entry.id} className="flex justify-between text-amber-800">
            <span>{new Date(entry.created_at).toLocaleString()}</span>
            <span className={entry.score >= 0 ? 'text-green-600' : 'text-red-600'}>${entry.score}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
