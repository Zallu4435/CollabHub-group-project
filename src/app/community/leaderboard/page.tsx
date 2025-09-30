"use client";

import { useState } from 'react';
import Leaderboard from '../_components/gamification/Leaderboard';
import { leaderboardEntries } from '../_data/leaderboard';

export default function LeaderboardPage() {
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly' | 'all-time'>('weekly');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Leaderboard</h1>
              <p className="text-gray-600 mt-1">Compete and see where you rank in the community</p>
            </div>
          </div>

          {/* Timeframe Selector */}
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl p-1.5 shadow-sm inline-flex">
            {(['weekly', 'monthly', 'all-time'] as const).map((period) => (
              <button
                key={period}
                onClick={() => setTimeframe(period)}
                className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-all ${
                  timeframe === period
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {period === 'all-time' ? 'All Time' : period.charAt(0).toUpperCase() + period.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-3 gap-4 mb-8 max-w-4xl mx-auto">
          {/* 2nd Place */}
          <div className="mt-12">
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all">
              <div className="relative inline-block mb-4">
                <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-gray-300 mx-auto">
                  <img src={leaderboardEntries[1]?.avatar || '/avatars/default.jpg'} alt={leaderboardEntries[1]?.name} className="w-full h-full object-cover" />
                </div>
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center text-2xl shadow-lg">
                  🥈
                </div>
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-1">{leaderboardEntries[1]?.name}</h3>
              <p className="text-sm text-gray-600 mb-3">@{leaderboardEntries[1]?.username}</p>
              <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl py-2 px-4">
                <p className="text-2xl font-bold text-gray-700">{leaderboardEntries[1]?.points.toLocaleString()}</p>
                <p className="text-xs text-gray-600">Points</p>
              </div>
            </div>
          </div>

          {/* 1st Place */}
          <div>
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-400 rounded-2xl p-6 text-center shadow-2xl hover:shadow-3xl transition-all relative">
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-xl">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <div className="relative inline-block mb-4 mt-4">
                <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-yellow-400 mx-auto">
                  <img src={leaderboardEntries[0]?.avatar || '/avatars/default.jpg'} alt={leaderboardEntries[0]?.name} className="w-full h-full object-cover" />
                </div>
                <div className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-3xl shadow-lg animate-pulse">
                  🥇
                </div>
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-1">{leaderboardEntries[0]?.name}</h3>
              <p className="text-sm text-gray-600 mb-3">@{leaderboardEntries[0]?.username}</p>
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl py-3 px-4 shadow-lg">
                <p className="text-3xl font-bold text-white">{leaderboardEntries[0]?.points.toLocaleString()}</p>
                <p className="text-xs text-yellow-100">Points</p>
              </div>
            </div>
          </div>

          {/* 3rd Place */}
          <div className="mt-12">
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all">
              <div className="relative inline-block mb-4">
                <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-orange-300 mx-auto">
                  <img src={leaderboardEntries[2]?.avatar || '/avatars/default.jpg'} alt={leaderboardEntries[2]?.name} className="w-full h-full object-cover" />
                </div>
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-2xl shadow-lg">
                  🥉
                </div>
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-1">{leaderboardEntries[2]?.name}</h3>
              <p className="text-sm text-gray-600 mb-3">@{leaderboardEntries[2]?.username}</p>
              <div className="bg-gradient-to-r from-orange-100 to-orange-200 rounded-xl py-2 px-4">
                <p className="text-2xl font-bold text-orange-700">{leaderboardEntries[2]?.points.toLocaleString()}</p>
                <p className="text-xs text-orange-600">Points</p>
              </div>
            </div>
          </div>
        </div>

        {/* Full Leaderboard */}
        <Leaderboard 
          entries={leaderboardEntries} 
          timeframe={timeframe} 
          currentUserId="1" 
        />
      </div>
    </div>
  );
}
