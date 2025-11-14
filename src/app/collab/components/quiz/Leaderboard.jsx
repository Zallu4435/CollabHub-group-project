'use client';

import React, { useState } from 'react';
import { useQuiz } from '../../store/collabStore.jsx';
import { Trophy, Medal, Crown, TrendingUp, Users, Zap, ChevronDown } from 'lucide-react';

export default function Leaderboard({ roomId, user }) {
  const { leaderboard } = useQuiz(roomId, user);
  const [expanded, setExpanded] = useState(true);

  if (!leaderboard || leaderboard.length === 0) return null;

  const topThree = leaderboard.slice(0, 3);
  const others = leaderboard.slice(3);

  const getMedalIcon = (rank) => {
    if (rank === 1) return <Crown className="w-5 h-5 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />;
    if (rank === 3) return <Medal className="w-5 h-5 text-amber-600" />;
    return null;
  };

  const getRankStyle = (rank) => {
    if (rank === 1)
      return 'bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-300';
    if (rank === 2) return 'bg-gradient-to-r from-gray-50 to-slate-50 border-2 border-gray-300';
    if (rank === 3)
      return 'bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-300';
    return 'bg-white border border-gray-200';
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
      {/* Header */}
      <div className="px-5 py-4 bg-gradient-to-r from-yellow-50 via-amber-50 to-orange-50 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
              <Trophy className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900">Live Leaderboard</h3>
              <p className="text-xs text-gray-600 flex items-center gap-1">
                <Users className="w-3 h-3" />
                {leaderboard.length} {leaderboard.length === 1 ? 'player' : 'players'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setExpanded(!expanded)}
            className="p-2 rounded-lg hover:bg-amber-100 transition-colors"
            title={expanded ? 'Collapse' : 'Expand'}
          >
            <ChevronDown
              className={`w-4 h-4 text-gray-600 transition-transform ${
                expanded ? '' : 'rotate-180'
              }`}
            />
          </button>
        </div>
      </div>

      {expanded && (
        <div className="p-4 space-y-3 max-h-[500px] overflow-auto">
          {/* Top 3 - Podium Style */}
          <div className="space-y-2">
            {topThree.map((l, i) => {
              const rank = i + 1;
              const isMe = l.userId === (user?.id || 'me');

              return (
                <div
                  key={l.userId}
                  className={`${getRankStyle(rank)} rounded-xl p-4 transition-all hover:shadow-md ${
                    isMe ? 'ring-2 ring-blue-500' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Rank Badge */}
                    <div className="relative">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${
                          rank === 1
                            ? 'bg-yellow-500 text-white'
                            : rank === 2
                            ? 'bg-gray-400 text-white'
                            : 'bg-orange-500 text-white'
                        }`}
                      >
                        #{rank}
                      </div>
                      <div className="absolute -top-1 -right-1">{getMedalIcon(rank)}</div>
                    </div>

                    {/* Player Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-gray-900 truncate">{l.userId}</span>
                        {isMe && (
                          <span className="px-2 py-0.5 rounded bg-blue-600 text-white text-[10px] font-bold uppercase">
                            You
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-xs">
                        <span className="flex items-center gap-1 text-gray-700">
                          <Trophy className="w-3 h-3" />
                          <span className="font-semibold">{l.score}</span> points
                        </span>
                        <span className="flex items-center gap-1 text-gray-700">
                          <Zap className="w-3 h-3 text-orange-500" />
                          <span className="font-semibold">{l.streak}x</span> streak
                        </span>
                      </div>
                    </div>

                    {/* Trophy Icon */}
                    {rank === 1 && (
                      <div className="text-yellow-500 animate-bounce">
                        <Crown className="w-8 h-8" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Rest of the players */}
          {others.length > 0 && (
            <>
              <div className="border-t border-gray-200 pt-3">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  Other Players
                </div>
                <div className="space-y-2">
                  {others.map((l, i) => {
                    const rank = i + 4;
                    const isMe = l.userId === (user?.id || 'me');

                    return (
                      <div
                        key={l.userId}
                        className={`flex items-center justify-between p-3 rounded-lg border transition-all hover:bg-gray-50 ${
                          isMe
                            ? 'bg-blue-50 border-blue-300 ring-2 ring-blue-200'
                            : 'bg-white border-gray-200'
                        }`}
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                            <span className="text-sm font-bold text-gray-600">#{rank}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-gray-900 truncate">
                                {l.userId}
                              </span>
                              {isMe && (
                                <span className="px-1.5 py-0.5 rounded bg-blue-600 text-white text-[9px] font-bold uppercase">
                                  You
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 text-xs flex-shrink-0">
                          <span className="font-semibold text-gray-700">{l.score} pts</span>
                          <span className="text-gray-500">{l.streak}x</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {/* Stats Summary */}
          <div className="border-t border-gray-200 pt-3 mt-3">
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="bg-purple-50 rounded-lg p-2 border border-purple-200">
                <div className="text-xs text-purple-600 font-semibold">Highest Score</div>
                <div className="text-lg font-bold text-purple-900">
                  {Math.max(...leaderboard.map((l) => l.score))}
                </div>
              </div>
              <div className="bg-orange-50 rounded-lg p-2 border border-orange-200">
                <div className="text-xs text-orange-600 font-semibold">Best Streak</div>
                <div className="text-lg font-bold text-orange-900">
                  {Math.max(...leaderboard.map((l) => l.streak))}x
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
