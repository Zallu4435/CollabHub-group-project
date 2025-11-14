'use client';

import React, { useMemo, useState } from 'react';
import { useRoom, useParticipants } from '../store/collabStore.jsx';
import { Users, Filter, Mic, MicOff, Hand, Trash2, Shield } from 'lucide-react';

const FILTERS = [
  { value: 'all', label: 'All', icon: Users },
  { value: 'speaking', label: 'Speaking', icon: Mic },
  { value: 'hand', label: 'Hands Up', icon: Hand },
  { value: 'muted', label: 'Muted', icon: MicOff }
];

export default function ParticipantsPanel({ roomId, user }) {
  const { room, dispatch } = useRoom(roomId, roomId);
  const { participants } = useParticipants(roomId);
  const [filter, setFilter] = useState('all');

  const filtered = useMemo(() => {
    if (filter === 'all') return participants;
    if (filter === 'speaking') return participants.filter((p) => p.speaking);
    if (filter === 'hand') return participants.filter((p) => p.handRaised);
    if (filter === 'muted') return participants.filter((p) => p.muted);
    return participants;
  }, [participants, filter]);

  const isHost = user?.role === 'host' || user?.role === 'cohost';

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden h-full flex flex-col shadow-sm">
      {/* Header */}
      <div className="px-5 py-4 border-b bg-gradient-to-r from-gray-50 to-white">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Participants</div>
            <div className="text-2xl font-bold text-gray-900">{participants.length}</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
            <Users className="w-6 h-6 text-blue-600" />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {FILTERS.map((f) => {
            const Icon = f.icon;
            return (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  filter === f.value
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Participants List */}
      <div className="flex-1 overflow-auto divide-y divide-gray-100">
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center px-4">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
              <Users className="w-6 h-6 text-gray-400" />
            </div>
            <p className="text-sm text-gray-500">No participants match this filter</p>
          </div>
        )}
        {filtered.map((p) => (
          <div
            key={p.id}
            className="px-5 py-4 hover:bg-gray-50 transition-colors flex items-center justify-between group"
          >
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="relative">
                <img
                  src={p.avatarUrl}
                  alt={p.name}
                  className="w-11 h-11 rounded-full border-2 border-gray-100"
                />
                {p.speaking && (
                  <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 border-2 border-white rounded-full animate-pulse" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold text-gray-900 truncate">{p.name}</div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-gray-500 capitalize">{p.role}</span>
                  {p.handRaised && (
                    <span className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 text-[10px] font-medium">
                      <Hand className="w-3 h-3" />
                      Hand
                    </span>
                  )}
                  {p.muted && (
                    <span className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-gray-100 text-gray-600 text-[10px] font-medium">
                      <MicOff className="w-3 h-3" />
                      Muted
                    </span>
                  )}
                </div>
              </div>
            </div>

            {isHost && (
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() =>
                    dispatch({ type: 'TOGGLE_MUTE', roomId, participantId: p.id })
                  }
                  className="p-2 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                  title={p.muted ? 'Unmute' : 'Mute'}
                >
                  {p.muted ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                </button>
                <button
                  onClick={() =>
                    dispatch({ type: 'REMOVE_PARTICIPANT', roomId, participantId: p.id })
                  }
                  className="p-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                  title="Remove"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <select
                  value={p.role}
                  onChange={(e) =>
                    dispatch({
                      type: 'PROMOTE_ROLE',
                      roomId,
                      participantId: p.id,
                      role: e.target.value
                    })
                  }
                  className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 bg-white hover:bg-gray-50 transition-colors"
                >
                  <option value="host">Host</option>
                  <option value="cohost">Co-host</option>
                  <option value="participant">Participant</option>
                  <option value="viewer">Viewer</option>
                </select>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
