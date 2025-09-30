"use client";

import Leaderboard from '../../_components/gamification/Leaderboard';
import { leaderboardEntries } from '../../_data/leaderboard';

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Leaderboard</h1>
              <p className="text-gray-600 mt-1">See how you rank against the community</p>
            </div>
          </div>
        </div>

        {/* Top 3 Podium */}
        <div className="mb-8">
          <div className="grid grid-cols-3 gap-4 items-end max-w-4xl mx-auto">
            {/* 2nd Place */}
            {leaderboardEntries[1] && (
              <div className="text-center">
                <div className="bg-gradient-to-br from-gray-300 to-gray-400 rounded-2xl p-6 shadow-lg mb-4 h-48 flex flex-col justify-end">
                  <div className="relative -mt-20 mb-4">
                    <div className="w-20 h-20 mx-auto rounded-full border-4 border-white shadow-xl overflow-hidden">
                      <img src={leaderboardEntries[1].avatar} alt={leaderboardEntries[1].name} className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-8 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center text-white font-black text-lg shadow-lg">
                      2
                    </div>
                  </div>
                  <h3 className="font-bold text-white truncate mb-1">{leaderboardEntries[1].name}</h3>
                  <div className="flex items-center justify-center gap-1 text-white">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="font-bold text-sm">{leaderboardEntries[1].points.toLocaleString()}</span>
                  </div>
                </div>
                <span className="text-4xl">🥈</span>
              </div>
            )}

            {/* 1st Place */}
            {leaderboardEntries[0] && (
              <div className="text-center">
                <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-6 shadow-2xl mb-4 h-64 flex flex-col justify-end relative overflow-hidden">
                  <div className="absolute top-0 inset-x-0 h-16 bg-white/20 blur-xl"></div>
                  <div className="relative -mt-24 mb-4">
                    <div className="w-24 h-24 mx-auto rounded-full border-4 border-white shadow-2xl overflow-hidden">
                      <img src={leaderboardEntries[0].avatar} alt={leaderboardEntries[0].name} className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-black text-xl shadow-lg animate-pulse">
                      👑
                    </div>
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-black text-xl shadow-lg border-2 border-white">
                      1
                    </div>
                  </div>
                  <h3 className="font-bold text-white truncate mb-1 text-lg">{leaderboardEntries[0].name}</h3>
                  <div className="flex items-center justify-center gap-1 text-white">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="font-bold">{leaderboardEntries[0].points.toLocaleString()}</span>
                  </div>
                </div>
                <span className="text-5xl">🥇</span>
              </div>
            )}

            {/* 3rd Place */}
            {leaderboardEntries[2] && (
              <div className="text-center">
                <div className="bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl p-6 shadow-lg mb-4 h-40 flex flex-col justify-end">
                  <div className="relative -mt-16 mb-4">
                    <div className="w-20 h-20 mx-auto rounded-full border-4 border-white shadow-xl overflow-hidden">
                      <img src={leaderboardEntries[2].avatar} alt={leaderboardEntries[2].name} className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-black text-lg shadow-lg">
                      3
                    </div>
                  </div>
                  <h3 className="font-bold text-white truncate mb-1">{leaderboardEntries[2].name}</h3>
                  <div className="flex items-center justify-center gap-1 text-white">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="font-bold text-sm">{leaderboardEntries[2].points.toLocaleString()}</span>
                  </div>
                </div>
                <span className="text-4xl">🥉</span>
              </div>
            )}
          </div>
        </div>

        <Leaderboard entries={leaderboardEntries} timeframe="weekly" currentUserId="1" />
      </div>
    </div>
  );
}
