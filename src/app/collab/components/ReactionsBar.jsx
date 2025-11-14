'use client';

import React, { useMemo, useState } from 'react';
import { useParticipants, useReactions, useHandRaise } from '../store/collabStore.jsx';
import { Hand, Smile, Sparkles } from 'lucide-react';

const EMOJI_CATEGORIES = {
  reactions: ['👍', '👏', '🎉', '❤️', '🔥', '💯'],
  emotions: ['😂', '😮', '🤔', '😍', '😢', '🤯'],
  gestures: ['✅', '👋', '🙌', '💪', '🚀', '⭐']
};

export default function ReactionsBar({ roomId, user }) {
  const { participants } = useParticipants(roomId);
  const { push } = useReactions(roomId, user);
  const { raiseLower } = useHandRaise(roomId, user);
  const me = useMemo(
    () => participants.find((p) => p.id === user?.id) || participants[0],
    [participants, user]
  );
  const [lastEmoji, setLastEmoji] = useState(null);
  const [category, setCategory] = useState('reactions');
  const [expanded, setExpanded] = useState(false);

  const sendReaction = (emoji) => {
    setLastEmoji(emoji);
    push(emoji);
    setTimeout(() => setLastEmoji(null), 2000);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
      <div className="px-4 py-3 flex items-center justify-between gap-3">
        {/* Quick Reactions */}
        <div className="flex items-center gap-1 flex-1 overflow-x-auto">
          {EMOJI_CATEGORIES[category].map((emoji) => (
            <button
              key={emoji}
              onClick={() => sendReaction(emoji)}
              className="min-w-[44px] h-11 rounded-xl hover:bg-gray-100 transition-all text-2xl flex items-center justify-center hover:scale-110 active:scale-95"
              title={`Send ${emoji}`}
            >
              {emoji}
            </button>
          ))}
        </div>

        {/* Category Switcher */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="p-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors flex-shrink-0"
          title="More reactions"
        >
          <Smile className="w-5 h-5 text-gray-600" />
        </button>

        {/* Raise Hand */}
        <button
          onClick={() => raiseLower()}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
            me?.handRaised
              ? 'bg-amber-600 text-white shadow-md hover:bg-amber-700'
              : 'border-2 border-gray-200 text-gray-700 hover:bg-gray-50'
          }`}
        >
          <Hand className="w-4 h-4" />
          <span className="hidden sm:inline">{me?.handRaised ? 'Lower Hand' : 'Raise Hand'}</span>
        </button>

        {/* Last Reaction */}
        {lastEmoji && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-50 border border-blue-200 animate-fadeIn flex-shrink-0">
            <span className="text-xl">{lastEmoji}</span>
            <span className="text-xs text-blue-700 font-medium">Sent!</span>
          </div>
        )}
      </div>

      {/* Expanded Picker */}
      {expanded && (
        <div className="border-t bg-gray-50 p-4 animate-fadeIn">
          <div className="flex items-center gap-2 mb-3">
            {Object.keys(EMOJI_CATEGORIES).map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                  category === cat
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-8 gap-2">
            {Object.values(EMOJI_CATEGORIES)
              .flat()
              .map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => {
                    sendReaction(emoji);
                    setExpanded(false);
                  }}
                  className="w-12 h-12 rounded-xl hover:bg-white transition-all text-2xl flex items-center justify-center hover:scale-110 active:scale-95 border border-transparent hover:border-gray-200"
                >
                  {emoji}
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
