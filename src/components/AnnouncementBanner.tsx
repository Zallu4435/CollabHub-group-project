'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const LATEST_ID = '1.2.0';

const AnnouncementBanner: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem('updates:dismissed');
    setVisible(dismissed !== LATEST_ID);
  }, []);

  const dismiss = () => {
    localStorage.setItem('updates:dismissed', LATEST_ID);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed top-0 inset-x-0 z-[9997]">
      <div className="mx-auto max-w-6xl px-4 py-3 mt-2 rounded-2xl shadow-2xl border border-indigo-200 bg-gradient-to-r from-indigo-50 to-fuchsia-50">
        <div className="flex items-center gap-3 text-indigo-900">
          <span className="text-xl">🚀</span>
          <div className="flex-1">
            <p className="text-sm">
              New update available: <span className="font-semibold">v{LATEST_ID}</span> — Support Center, Feedback modal, and Floating Help.
              <Link className="ml-2 text-indigo-700 font-semibold hover:underline" href="/updates">See what’s new</Link>
            </p>
          </div>
          <button onClick={dismiss} className="px-3 py-1.5 text-sm rounded-full border border-indigo-200 hover:bg-white">Dismiss</button>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBanner;


