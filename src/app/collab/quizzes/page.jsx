'use client';

import React, { useEffect } from 'react';
import { CollabProvider } from '../store/collabStore.jsx';
import { useQuizQueue } from '../store/collabStore.jsx';
import { QUIZ_SESSIONS } from '../_data/quizSessions.js';
import QuizSessionCard from '../components/QuizSessionCard.jsx';
import { Brain, Trophy, Zap, TrendingUp } from 'lucide-react';

function QuizzesInner() {
  const user = { id: 'me', name: 'You', role: 'host' };
  const { sessions, loadSessions } = useQuizQueue(user);

  useEffect(() => {
    loadSessions(QUIZ_SESSIONS);
  }, [loadSessions]);

  const upcomingCount = sessions.filter((s) => s.status === 'scheduled').length;
  const liveCount = sessions.filter((s) => s.status === 'live').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border-2 border-purple-200 shadow-md mb-6">
            <Brain className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-bold text-purple-900">Interactive Learning</span>
          </div>

          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
            Live Quiz Sessions
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join interactive quizzes with real-time scoring, leaderboards, and instant feedback
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 mt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">{liveCount}</div>
              <div className="text-sm text-gray-600 mt-1">Live Now</div>
            </div>
            <div className="w-px h-12 bg-gray-300" />
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{upcomingCount}</div>
              <div className="text-sm text-gray-600 mt-1">Upcoming</div>
            </div>
            <div className="w-px h-12 bg-gray-300" />
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-600">{sessions.length}</div>
              <div className="text-sm text-gray-600 mt-1">Total Sessions</div>
            </div>
          </div>
        </div>

        {/* Features Banner */}
        <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 mb-8 shadow-lg">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-3">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Live Leaderboards</h3>
              <p className="text-sm text-gray-600">
                Real-time rankings with streak bonuses
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-3">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Timed Challenges</h3>
              <p className="text-sm text-gray-600">
                Race against the clock for points
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mb-3">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Multiple Formats</h3>
              <p className="text-sm text-gray-600">
                MCQ, True/False, and code challenges
              </p>
            </div>
          </div>
        </div>

        {/* Quiz Sessions Grid */}
        {sessions.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
              <Brain className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No quiz sessions yet</h3>
            <p className="text-gray-600">Check back soon for upcoming quizzes</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sessions.map((s) => (
              <QuizSessionCard key={s.id} session={s} user={user} />
            ))}
          </div>
        )}
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
