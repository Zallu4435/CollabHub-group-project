'use client';

import React, { useMemo } from 'react';
import { useHandRaise, useParticipants } from '../../store/collabStore.jsx';

export default function HandRaiseQueue({ roomId, user }) {
  const { queue, dequeue, callOn } = useHandRaise(roomId, user, user?.role === 'host' || user?.role === 'cohost');
  const { participants } = useParticipants(roomId);
  const isHost = user?.role === 'host' || user?.role === 'cohost';

  const items = useMemo(() => queue.map(id => participants.find(p => p.id === id)).filter(Boolean), [queue, participants]);

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
      <div className="px-4 py-3 border-b flex items-center justify-between">
        <div className="text-sm font-semibold text-gray-900">Hand Raise Queue</div>
        <div className="text-xs text-gray-500">{items.length} waiting</div>
      </div>
      <div className="max-h-48 overflow-auto divide-y">
        {items.length === 0 && (
          <div className="p-4 text-sm text-gray-500">No one is waiting to speak.</div>
        )}
        {items.map((p) => (
          <div key={p.id} className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <img src={p.avatarUrl} alt={p.name} className="w-7 h-7 rounded-full" />
              <div className="min-w-0">
                <div className="text-sm font-medium text-gray-900 truncate">{p.name}</div>
                <div className="text-xs text-gray-500 capitalize">{p.role}</div>
              </div>
            </div>
            {isHost && (
              <div className="flex items-center gap-2">
                <button onClick={() => callOn(p.id, 90)} className="text-xs px-2 py-1 border rounded bg-blue-600 text-white">Call on (90s)</button>
                <button onClick={() => dequeue(p.id)} className="text-xs px-2 py-1 border rounded">Remove</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
