"use client";

import React from 'react';
import { ReactionType } from "../types";

interface ReactionBarProps {
  current?: ReactionType | null;
  counts?: Partial<Record<ReactionType, number>>;
  onReact: (type: ReactionType) => void;
}

const REACTIONS: { key: ReactionType; label: string }[] = [
  { key: 'like', label: 'Like' },
  { key: 'celebrate', label: 'Celebrate' },
  { key: 'support', label: 'Support' },
  { key: 'love', label: 'Love' },
  { key: 'insightful', label: 'Insightful' },
  { key: 'curious', label: 'Curious' },
];

export default function ReactionBar({ current, counts, onReact }: ReactionBarProps) {
  return (
    <div className="flex items-center space-x-6">
      {REACTIONS.map((r) => (
        <button
          key={r.key}
          onClick={() => onReact(r.key)}
          className={`flex items-center space-x-2 transition-colors ${current === r.key ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
          aria-pressed={current === r.key}
          aria-label={r.label}
        >
          <span className="text-sm font-medium">{r.label}</span>
          {counts?.[r.key] ? (
            <span className="text-xs text-gray-500">{counts?.[r.key]}</span>
          ) : null}
        </button>
      ))}
    </div>
  );
}


