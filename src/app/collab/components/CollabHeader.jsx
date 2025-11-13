'use client';

import React from 'react';

export default function CollabHeader() {
  return (
    <header className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="/collab" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white flex items-center justify-center font-bold">CH</div>
          <span className="font-semibold text-gray-900">Collab Hub</span>
        </a>
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-700">
          <a href="/collab" className="hover:text-blue-600">Home</a>
          <a href="/collab/quizzes" className="hover:text-blue-600">Quizzes</a>
          <a href="/collab/calendar" className="hover:text-blue-600">Calendar</a>
          <a href="/collab/omega" className="hover:text-blue-600">Omega</a>
          <a href="/collab/scheduling" className="hover:text-blue-600">Scheduling</a>
        </nav>
        <div className="flex items-center gap-2">
          <a href="/collab#join" className="px-3 py-1.5 rounded-lg border text-sm">Join</a>
          <a href="/" className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-sm">Go to Platform</a>
        </div>
      </div>
    </header>
  );
}
