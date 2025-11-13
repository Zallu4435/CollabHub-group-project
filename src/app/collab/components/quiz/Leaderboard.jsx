'use client';

import React from 'react';
import { useQuiz } from '../../store/collabStore.jsx';

export default function Leaderboard({ roomId, user }) {
  const { leaderboard } = useQuiz(roomId, user);
  if (!leaderboard || leaderboard.length === 0) return null;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
      <div className="px-4 py-3 border-b text-sm font-semibold">Leaderboard</div>
      <div className="p-3">
        <ol className="space-y-2">
          {leaderboard.map((l, i) => (
            <li key={l.userId} className={`flex items-center justify-between ${i===0?'bg-yellow-50 border border-yellow-200 rounded px-2 py-1':''}`}>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold">#{i+1}</span>
                <span className="text-sm">{l.userId}</span>
              </div>
              <div className="text-sm">Score {l.score} • Streak {l.streak}</div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
