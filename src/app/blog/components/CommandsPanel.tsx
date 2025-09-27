"use client";
import React from "react";

type Props = { storageKey: string };

export default function CommandsPanel({ storageKey }: Props) {
  const [counts, setCounts] = React.useState<Record<string, number>>({});

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      setCounts(raw ? JSON.parse(raw) : {});
    } catch {}
  }, [storageKey]);

  const react = (emoji: string) => {
    setCounts(prev => {
      const next = { ...prev, [emoji]: (prev[emoji] || 0) + 1 };
      try { localStorage.setItem(storageKey, JSON.stringify(next)); } catch {}
      return next;
    });
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <div className="mb-2 font-medium text-gray-900">Commands & Reactions</div>
      <div className="mb-3 flex flex-wrap gap-2">
        {['❤️','🔥','😂','👍','🎉'].map(e => (
          <button
            key={e}
            className="px-2.5 py-1 rounded border bg-gray-50 hover:bg-gray-100 text-sm"
            onClick={() => react(e)}
          >
            {e} <span className="text-xs text-gray-500">{counts[e] || 0}</span>
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 text-sm">
        <button
          className="px-2.5 py-1 rounded border bg-gray-50 hover:bg-gray-100"
          onClick={() => {
            if (typeof window !== 'undefined') window.print();
          }}
        >
          Print
        </button>
        <button
          className="px-2.5 py-1 rounded border bg-gray-50 hover:bg-gray-100"
          onClick={() => {
            if (typeof window !== 'undefined') navigator.clipboard?.writeText(window.location.href);
          }}
        >
          Copy Link
        </button>
      </div>
    </div>
  );
}


