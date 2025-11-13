'use client';

import React, { useMemo, useState } from 'react';
import { useParticipants, useReactions, useHandRaise } from '../store/collabStore.jsx';

const EMOJIS = ['👍','👏','🎉','❤️','😂','😮','🤔','✅'];

export default function ReactionsBar({ roomId, user }) {
  const { participants } = useParticipants(roomId);
  const { push } = useReactions(roomId, user);
  const { raiseLower } = useHandRaise(roomId, user);
  const me = useMemo(() => participants.find(p => p.id === user?.id) || participants[0], [participants, user]);
  const [lastEmoji, setLastEmoji] = useState(null);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-2 flex items-center justify-between">
      <div className="flex items-center gap-1 overflow-auto">
        {EMOJIS.map(e => (
          <button key={e} onClick={() => { setLastEmoji(e); push(e); }} className="px-2 py-1 rounded hover:bg-gray-100 text-xl">
            {e}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => raiseLower()}
          className="px-3 py-1.5 border rounded-lg text-sm"
        >
          ✋ {me?.handRaised ? 'Lower' : 'Raise'} hand
        </button>
        {lastEmoji && <span className="text-sm text-gray-600">Last reaction: {lastEmoji}</span>}
      </div>
    </div>
  );
}
