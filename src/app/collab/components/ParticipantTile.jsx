'use client';

import React, { useMemo } from 'react';

export default function ParticipantTile({ participant, dominant, reactions = [], now = Date.now() }) {
  const recentReactions = useMemo(() => {
    const cutoff = now - 2500;
    return (reactions || []).filter(r => r.ts >= cutoff).slice(-6);
  }, [reactions, now]);

  const onStageLeft = participant.onStageUntil ? Math.max(0, Math.ceil((participant.onStageUntil - now) / 1000)) : 0;

  return (
    <div className={`relative rounded-xl overflow-hidden border ${dominant ? 'border-blue-600 ring-2 ring-blue-300' : 'border-gray-200'}`}>
      <div className="aspect-video bg-gray-100">
        {participant.videoEnabled ? (
          <div className="w-full h-full bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300 animate-pulse" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200">
            <img src={participant.avatarUrl} alt={participant.name} className="w-16 h-16 rounded-full" />
          </div>
        )}
        {/* Floating reactions */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {recentReactions.map((r, idx) => (
            <span
              key={r.id}
              className="absolute text-2xl animate-[float_1.5s_ease-out]
                        "
              style={{
                left: `${10 + (idx % 4) * 20}%`,
                bottom: `${10 + (idx % 3) * 14}%`,
              }}
            >
              {r.emoji}
            </span>
          ))}
        </div>
      </div>
      <div className="absolute left-2 bottom-2 right-2 flex items-center justify-between">
        <div className="px-2 py-1 rounded bg-black/60 text-white text-xs flex items-center gap-2">
          <span className={`inline-block w-2 h-2 rounded-full ${participant.speaking ? 'bg-green-400' : 'bg-gray-400'}`} />
          <span className="font-medium truncate max-w-[140px]">{participant.name}</span>
          <span className="opacity-70">•</span>
          <span className="opacity-80">{participant.role}</span>
        </div>
        <div className="flex items-center gap-1">
          {participant.screenSharing && <span className="px-1.5 py-0.5 rounded bg-purple-600 text-white text-[10px]">Screen</span>}
          {participant.handRaised && <span className="px-1.5 py-0.5 rounded bg-amber-500 text-white text-[10px]">Hand</span>}
          {participant.muted && <span className="px-1.5 py-0.5 rounded bg-gray-700 text-white text-[10px]">Muted</span>}
          {onStageLeft > 0 && (
            <span className="px-1.5 py-0.5 rounded bg-blue-600 text-white text-[10px]">On stage {onStageLeft}s</span>
          )}
        </div>
      </div>
    </div>
  );
}
