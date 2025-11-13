'use client';

import React from 'react';
import { CollabProvider } from '../store/collabStore.jsx';
import CalendarView from '../components/CalendarView.jsx';

function CalendarInner() {
  const user = { id: 'me', name: 'You', role: 'participant' };
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
          <p className="text-gray-600">Upcoming sessions, quizzes, and Omega pairing slots.</p>
        </div>
        <CalendarView user={user} />
      </div>
    </div>
  );
}

export default function CalendarPage() {
  return (
    <CollabProvider>
      <CalendarInner />
    </CollabProvider>
  );
}
