'use client';

import { useState } from 'react';
import ChallengeCard from '../../_components/gamification/ChallengeCard';
import { challenges } from '../../_data/challenges';

export default function ChallengesPage() {
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');
  
  const activeChallenges = challenges.filter(c => !c.isCompleted);
  const completedChallenges = challenges.filter(c => c.isCompleted);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Challenges</h1>
              <p className="text-gray-600 mt-1">Complete challenges to earn rewards and XP</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl p-1 shadow-sm inline-flex">
            <button
              onClick={() => setActiveTab('active')}
              className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-all ${
                activeTab === 'active'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Active ({activeChallenges.length})
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-all ${
                activeTab === 'completed'
                  ? 'bg-green-600 text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Completed ({completedChallenges.length})
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          {activeTab === 'active' ? (
            activeChallenges.length > 0 ? (
              activeChallenges.map((challenge) => (
                <ChallengeCard key={challenge.id} {...challenge} />
              ))
            ) : (
              <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center shadow-sm">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No Active Challenges</h3>
                <p className="text-gray-600">Check back soon for new challenges!</p>
              </div>
            )
          ) : (
            completedChallenges.length > 0 ? (
              completedChallenges.map((challenge) => (
                <ChallengeCard key={challenge.id} {...challenge} />
              ))
            ) : (
              <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center shadow-sm">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No Completed Challenges</h3>
                <p className="text-gray-600">Start completing challenges to see them here!</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
