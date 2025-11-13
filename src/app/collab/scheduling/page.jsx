'use client';

import React from 'react';
import { CollabProvider } from '../store/collabStore.jsx';
import SchedulingPoll from '../components/SchedulingPoll.jsx';

function SchedulingInner() {
  const user = { id: 'me', name: 'You', role: 'host' };
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Scheduling Polls</h1>
          <p className="text-gray-600">Create polls for topics/times. Closing a poll auto-creates a session in the calendar.</p>
        </div>
        <SchedulingPoll user={user} />
      </div>
    </div>
  );
}

export default function SchedulingPage() {
  return (
    <CollabProvider>
      <SchedulingInner />
    </CollabProvider>
  );
}
