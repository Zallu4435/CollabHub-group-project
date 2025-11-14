'use client';

import React from 'react';
import { CollabProvider } from '../store/collabStore.jsx';
import OmegaMatchForm from '../components/omega/OmegaMatchForm.jsx';
import OmegaRoomWidget from '../components/omega/OmegaRoomWidget.jsx';
import { useOmegaMatch } from '../store/collabStore.jsx';
import { Sparkles, Users, Code, Zap, Clock } from 'lucide-react';

function OmegaInner() {
  const user = { id: 'me', name: 'You', role: 'participant' };
  const { omega } = useOmegaMatch(user);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-fuchsia-50 to-pink-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        {!omega.current?.status && (
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border-2 border-purple-200 shadow-md mb-6">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <span className="text-sm font-bold text-purple-900">Smart Pairing</span>
            </div>

            <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
              Omega Developer Pairing
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Get matched with developers who share your skills and interests for quick
              collaboration sessions
            </p>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
              <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-md">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-4">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Skill-Based Matching</h3>
                <p className="text-sm text-gray-600">
                  Filter by programming languages and tech stack
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-md">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Quick Sessions</h3>
                <p className="text-sm text-gray-600">
                  5-10 minute focused pairing sessions
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-md">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Auto Feedback</h3>
                <p className="text-sm text-gray-600">
                  Rate your experience and help improve matches
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Matching Form */}
        <OmegaMatchForm user={user} />

        {/* Active Session */}
        {omega.current?.status === 'matched' && (
          <div className="mt-8 animate-fadeIn">
            <OmegaRoomWidget user={user} />
          </div>
        )}
      </div>
    </div>
  );
}

export default function OmegaPage() {
  return (
    <CollabProvider>
      <OmegaInner />
    </CollabProvider>
  );
}
