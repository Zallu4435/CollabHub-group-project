'use client';

import React, { useEffect } from 'react';
import { CollabProvider } from '../store/collabStore.jsx';
import { useQuizQueue } from '../store/collabStore.jsx';
import { QUIZ_SESSIONS } from '../_data/quizSessions.js';
import QuizSessionCard from '../components/QuizSessionCard.jsx';

function QuizzesInner() {
  const user = { id: 'me', name: 'You', role: 'host' };
  const { sessions, loadSessions } = useQuizQueue(user);
  useEffect(() => { loadSessions(QUIZ_SESSIONS); }, [loadSessions]);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Live Quizzes</h1>
          <p className="text-gray-600">Browse upcoming quiz sessions. Enroll when enrollment opens.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {sessions.map(s => (
            <QuizSessionCard key={s.id} session={s} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function QuizzesPage() {
  return (
    <CollabProvider>
      <QuizzesInner />
    </CollabProvider>
  );
}
