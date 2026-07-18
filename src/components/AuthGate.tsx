import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

export default function AuthGate() {
  const { playAsGuest } = useAuth();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 flex flex-col items-center justify-center p-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl mb-4 text-amber-900">🏴‍☠️ Treasure Hunt Game 🏴‍☠️</h1>
        <p className="text-amber-800">Sign in to save your scores, or play as a guest.</p>
      </div>

      <Card className="w-full max-w-sm border-2 border-amber-400">
        <CardHeader>
          <CardTitle className="text-amber-900">{mode === 'signin' ? 'Sign In' : 'Sign Up'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {mode === 'signin' ? <SignInForm /> : <SignUpForm />}

          <button
            type="button"
            onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
            className="text-sm text-amber-700 hover:underline w-full text-center"
          >
            {mode === 'signin' ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
          </button>

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-amber-300" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-2 text-amber-600">or</span>
            </div>
          </div>

          <Button type="button" variant="outline" onClick={playAsGuest} className="w-full border-amber-400">
            Play as Guest
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
