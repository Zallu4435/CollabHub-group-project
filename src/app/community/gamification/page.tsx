"use client";

import PointsDisplay from '../_components/gamification/PointsDisplay';
import QuestProgress from '../_components/gamification/QuestProgress';
import ChallengeCard from '../_components/gamification/ChallengeCard';
import { challenges, questSteps } from '../_data/challenges';
import { badges } from '../_data/badges';
import Link from 'next/link';

export default function GamificationPage() {
  const unlockedBadges = badges.filter(b => !b.isLocked).length;
  const totalBadges = badges.length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Achievements Hub</h1>
              <p className="text-gray-600 mt-1">Track your progress, complete challenges, and earn rewards</p>
            </div>
          </div>
          {/* Add navigation buttons here */}
          <div className="flex gap-4 mt-4">
            <Link href="/community/gamification/rewards" className="px-5 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold shadow hover:from-purple-600 hover:to-pink-600 transition-all">
              🎁 Rewards Shop
            </Link>
            <Link href="/community/gamification/leaderboard" className="px-5 py-2.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-xl font-semibold shadow hover:from-yellow-500 hover:to-orange-600 transition-all">
              🏆 Leaderboard
            </Link>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{unlockedBadges}</p>
                <p className="text-xs text-gray-600">Badges Earned</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{challenges.filter(c => c.isCompleted).length}</p>
                <p className="text-xs text-gray-600">Completed</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{challenges.filter(c => !c.isCompleted).length}</p>
                <p className="text-xs text-gray-600">Active Now</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round((unlockedBadges / totalBadges) * 100)}%
                </p>
                <p className="text-xs text-gray-600">Completion</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <PointsDisplay
              currentPoints={12450}
              level={15}
              pointsToNextLevel={550}
              totalPointsForNextLevel={1000}
            />

            <QuestProgress 
              questId="onboarding"
              questTitle="Community Onboarding"
              questDescription="Complete these steps to get started and earn rewards."
              steps={questSteps}
              totalReward={500}
            />

            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-5 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">Active Challenges</h2>
                      <p className="text-sm text-gray-600">Complete to earn rewards</p>
                    </div>
                  </div>
                  <Link href="/community/gamification/challenges" className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl hover:border-blue-500 hover:text-blue-600 text-sm font-semibold transition-all">
                    View All
                  </Link>
                </div>
              </div>
              <div className="p-6 space-y-4">
                {challenges.slice(0, 3).map((challenge) => (
                  <ChallengeCard key={challenge.id} {...challenge} />
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden sticky top-8">
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 px-6 py-5 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-600 rounded-xl flex items-center justify-center shadow-md">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">Recent Badges</h3>
                      <p className="text-xs text-gray-600">{unlockedBadges} of {totalBadges}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                {/* Custom recent badges list */}
                <ul className="space-y-4">
                  {badges.filter(b => !b.isLocked).slice(0, 3).map((badge) => (
                    <li key={badge.id} className="flex items-center gap-3 bg-gray-50 rounded-xl p-3 shadow-sm">
                      <div className="w-12 h-12 flex items-center justify-center bg-white rounded-full border border-gray-200 overflow-hidden">
                        {badge.icon ? (
                          <img src={badge.icon} alt={badge.name} className="w-10 h-10 object-contain" onError={e => { e.currentTarget.src = '/default-badge.svg'; }} />
                        ) : (
                          <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-900 truncate">{badge.name}</span>
                          <span className={`text-xs font-bold rounded px-2 py-0.5 ml-1 ${badge.rarity === 'epic' ? 'bg-purple-100 text-purple-700' : badge.rarity === 'rare' ? 'bg-blue-100 text-blue-700' : badge.rarity === 'legendary' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-600'}`}>{badge.rarity.charAt(0).toUpperCase() + badge.rarity.slice(1)}</span>
                        </div>
                        <div className="text-xs text-gray-500 truncate">{badge.unlockedDate ? new Date(badge.unlockedDate).toLocaleDateString() : ''}</div>
                      </div>
                    </li>
                  ))}
                  {badges.filter(b => !b.isLocked).length === 0 && (
                    <li className="text-center text-gray-400 py-8">No badges unlocked yet.</li>
                  )}
                </ul>
                <Link 
                  href="/community/gamification/badges" 
                  className="block w-full mt-6 px-4 py-2.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-xl hover:from-yellow-500 hover:to-orange-600 text-sm font-bold text-center transition-all shadow-md hover:shadow-lg"
                >
                  View All Badges
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
