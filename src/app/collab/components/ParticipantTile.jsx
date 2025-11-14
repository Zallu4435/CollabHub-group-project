'use client';

import React, { useMemo } from 'react';
import { Mic, MicOff, Video, VideoOff, Hand, Monitor } from 'lucide-react';

export default function ParticipantTile({
  participant,
  dominant,
  reactions = [],
  now = Date.now()
}) {
  const recentReactions = useMemo(() => {
    const cutoff = now - 3000;
    return (reactions || [])
      .filter((r) => r.ts >= cutoff)
      .slice(-8);
  }, [reactions, now]);

  const onStageLeft = participant.onStageUntil
    ? Math.max(0, Math.ceil((participant.onStageUntil - now) / 1000))
    : 0;

  return (
    <div
      className={`relative rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
        dominant
          ? 'border-blue-500 ring-4 ring-blue-200 shadow-2xl'
          : 'border-gray-200 hover:border-gray-300 hover:shadow-lg'
      }`}
    >
      <div className="aspect-video bg-gray-900 relative">
        {participant.videoEnabled ? (
          <div className="w-full h-full bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 animate-pulse" />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <img
              src={participant.avatarUrl}
              alt={participant.name}
              className="w-20 h-20 rounded-full border-4 border-white shadow-lg mb-2"
            />
            <VideoOff className="w-5 h-5 text-gray-400" />
          </div>
        )}

        {/* Floating Reactions */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {recentReactions.map((r, idx) => (
            <span
              key={r.id}
              className="absolute text-3xl animate-[float_2s_ease-out]"
              style={{
                left: `${10 + (idx % 4) * 20}%`,
                bottom: `${15 + (idx % 3) * 18}%`,
                animationDelay: `${idx * 100}ms`
              }}
            >
              {r.emoji}
            </span>
          ))}
        </div>

        {/* Status Overlay */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <div
                className={`w-2.5 h-2.5 rounded-full ${
                  participant.speaking ? 'bg-green-400 animate-pulse' : 'bg-gray-400'
                }`}
              />
              <span className="font-semibold text-white text-sm truncate max-w-[140px]">
                {participant.name}
              </span>
              <span className="text-white/60 text-xs">•</span>
              <span className="text-white/80 text-xs capitalize">{participant.role}</span>
            </div>

            <div className="flex items-center gap-1.5 flex-shrink-0">
              {participant.screenSharing && (
                <span className="flex items-center gap-1 px-2 py-1 rounded-md bg-purple-600 text-white text-[10px] font-medium">
                  <Monitor className="w-3 h-3" />
                  Screen
                </span>
              )}
              {participant.handRaised && (
                <span className="flex items-center gap-1 px-2 py-1 rounded-md bg-amber-500 text-white text-[10px] font-medium">
                  <Hand className="w-3 h-3" />
                  Hand
                </span>
              )}
              {participant.muted && (
                <span className="p-1.5 rounded-md bg-red-600 text-white">
                  <MicOff className="w-3 h-3" />
                </span>
              )}
              {onStageLeft > 0 && (
                <span className="px-2 py-1 rounded-md bg-blue-600 text-white text-[10px] font-medium">
                  {onStageLeft}s
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
