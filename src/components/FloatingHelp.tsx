'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';

const FloatingHelp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const triggerFeedback = () => {
    window.dispatchEvent(new Event('open-feedback'));
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9998]" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          'w-14 h-14 rounded-full shadow-xl text-white flex items-center justify-center transition-all duration-300',
          'bg-gradient-to-br from-indigo-600 to-fuchsia-600 hover:from-indigo-700 hover:to-fuchsia-700',
          isOpen ? 'rotate-12' : 'animate-pulse'
        )}
        aria-label="Open help menu"
      >
        <span className="text-2xl">❓</span>
      </button>

      <div
        className={clsx(
          'absolute bottom-20 right-0 w-72 rounded-2xl overflow-hidden border border-gray-200 shadow-2xl',
          'backdrop-blur-lg bg-white/90',
          'transform transition-all duration-300 origin-bottom-right',
          isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4 pointer-events-none'
        )}
      >
        <div className="px-5 py-4 bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center">❓</div>
            <div>
              <p className="font-semibold leading-tight">Need help?</p>
              <p className="text-xs text-indigo-100">We are here for you</p>
            </div>
          </div>
        </div>

        <div className="p-3 grid grid-cols-1 gap-2 bg-white">
          <button
            onClick={triggerFeedback}
            className="flex items-center gap-3 px-3 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 transition"
          >
            <span className="text-lg">💬</span>
            <div className="text-left">
              <p className="text-sm font-medium">Give Feedback</p>
              <p className="text-xs text-gray-500">Report a bug or request a feature</p>
            </div>
          </button>

          <Link
            href="/help"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-3 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 transition"
          >
            <span className="text-lg">📚</span>
            <div className="text-left">
              <p className="text-sm font-medium">Support Center</p>
              <p className="text-xs text-gray-500">FAQs and guides</p>
            </div>
          </Link>

          <Link
            href="/updates"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-3 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 transition"
          >
            <span className="text-lg">🚀</span>
            <div className="text-left">
              <p className="text-sm font-medium">What’s New</p>
              <p className="text-xs text-gray-500">Latest improvements</p>
            </div>
          </Link>

          <a
            href="mailto:support@example.com"
            className="flex items-center gap-3 px-3 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 transition"
          >
            <span className="text-lg">✉️</span>
            <div className="text-left">
              <p className="text-sm font-medium">Contact Support</p>
              <p className="text-xs text-gray-500">Email our team</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default FloatingHelp;


