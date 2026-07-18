import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { api } from './lib/api';
import AuthGate from './components/AuthGate';
import GameBoard from './components/GameBoard';
import ScoreHistory from './components/ScoreHistory';
import { Button } from './components/ui/button';

function AppShell() {
  const { user, isGuest, loading, logout } = useAuth();
  const [scoreRefreshKey, setScoreRefreshKey] = useState(0);

  if (loading) {
    return <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100" />;
  }

  if (!user && !isGuest) {
    return <AuthGate />;
  }

  const handleGameEnd = async (score: number) => {
    if (!user) return; // guest mode: nothing is persisted
    try {
      await api.saveScore(score);
      setScoreRefreshKey(key => key + 1);
    } catch {
      // saving the score failing shouldn't block the player from seeing their result
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 flex flex-col items-center p-8">
      <div className="w-full max-w-3xl flex justify-end mb-4">
        <div className="flex items-center gap-3 text-sm text-amber-800">
          <span>{user ? `Playing as ${user.username}` : 'Playing as Guest'}</span>
          {user && (
            <Button variant="outline" size="sm" onClick={logout} className="border-amber-400">
              Log out
            </Button>
          )}
        </div>
      </div>

      <GameBoard onGameEnd={handleGameEnd} />

      {user && <ScoreHistory refreshKey={scoreRefreshKey} />}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppShell />
    </AuthProvider>
  );
}
