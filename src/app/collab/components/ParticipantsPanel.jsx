'use client';

import React, { useMemo, useState } from 'react';
import { useRoom, useParticipants } from '../store/collabStore.jsx';

export default function ParticipantsPanel({ roomId, user }) {
  const { room, dispatch } = useRoom(roomId, roomId);
  const { participants } = useParticipants(roomId);
  const [filter, setFilter] = useState('all');

  const filtered = useMemo(() => {
    if (filter === 'all') return participants;
    if (filter === 'speaking') return participants.filter(p => p.speaking);
    if (filter === 'hand') return participants.filter(p => p.handRaised);
    if (filter === 'muted') return participants.filter(p => p.muted);
    return participants;
  }, [participants, filter]);

  const isHost = user?.role === 'host' || user?.role === 'cohost';

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden h-full flex flex-col">
      <div className="px-4 py-3 border-b flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-600">Participants</div>
          <div className="text-lg font-semibold text-gray-900">{participants.length}</div>
        </div>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="text-sm border rounded-lg px-2 py-1">
          <option value="all">All</option>
          <option value="speaking">Speaking</option>
          <option value="hand">Hands Raised</option>
          <option value="muted">Muted</option>
        </select>
      </div>

      <div className="flex-1 overflow-auto divide-y">
        {filtered.map((p) => (
          <div key={p.id} className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <img src={p.avatarUrl} alt={p.name} className="w-8 h-8 rounded-full" />
              <div className="min-w-0">
                <div className="text-sm font-medium text-gray-900 truncate">{p.name}</div>
                <div className="text-xs text-gray-500 flex items-center gap-2">
                  <span className="capitalize">{p.role}</span>
                  {p.speaking && <span className="px-1.5 py-0.5 rounded bg-green-100 text-green-700 text-[10px]">Speaking</span>}
                  {p.handRaised && <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 text-[10px]">Hand</span>}
                  {p.muted && <span className="px-1.5 py-0.5 rounded bg-gray-100 text-gray-700 text-[10px]">Muted</span>}
                </div>
              </div>
            </div>
            {isHost && (
              <div className="flex items-center gap-2">
                <button onClick={() => dispatch({ type: 'TOGGLE_MUTE', roomId, participantId: p.id })} className="text-xs px-2 py-1 border rounded">{p.muted ? 'Unmute' : 'Mute'}</button>
                <button onClick={() => dispatch({ type: 'REMOVE_PARTICIPANT', roomId, participantId: p.id })} className="text-xs px-2 py-1 border rounded">Remove</button>
                <select value={p.role} onChange={(e) => dispatch({ type: 'PROMOTE_ROLE', roomId, participantId: p.id, role: e.target.value })} className="text-xs border rounded px-1 py-0.5">
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
