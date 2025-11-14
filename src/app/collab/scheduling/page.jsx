'use client';

import React from 'react';
import { CollabProvider } from '../store/collabStore.jsx';
import SchedulingPoll from '../components/SchedulingPoll.jsx';
import { BarChart3, Users, TrendingUp, CheckCircle } from 'lucide-react';

function SchedulingInner() {
  const user = { id: 'me', name: 'You', role: 'host' };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border-2 border-teal-200 shadow-md mb-6">
            <BarChart3 className="w-5 h-5 text-teal-600" />
            <span className="text-sm font-bold text-teal-900">Democratic Scheduling</span>
          </div>

          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
            Scheduling Polls
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Create polls for topics and time slots. Winners automatically become scheduled sessions
          </p>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-md">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Team Voting</h3>
              <p className="text-sm text-gray-600">
                Everyone votes on preferred options
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-md">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Ranked Choice</h3>
              <p className="text-sm text-gray-600">
                Advanced voting with preference ranking
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-md">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Auto-Schedule</h3>
              <p className="text-sm text-gray-600">
                Winners become calendar events
              </p>
            </div>
          </div>
        </div>

        {/* Polling Component */}
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
