'use client';

import React from 'react';

export default function CollabFooter() {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center font-bold">CH</div>
            <span className="font-semibold">Collab Hub</span>
          </div>
          <p className="text-gray-400 text-sm">Room-based live collaboration: voice/video UI simulations, chat, whiteboard, Q&A, quizzes, calendar, Omega pairing, and scheduling polls.</p>
        </div>
        <div>
          <div className="font-semibold mb-3">Explore</div>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li><a href="/collab/quizzes" className="hover:text-white">Quizzes</a></li>
            <li><a href="/collab/calendar" className="hover:text-white">Calendar</a></li>
            <li><a href="/collab/omega" className="hover:text-white">Omega</a></li>
            <li><a href="/collab/scheduling" className="hover:text-white">Scheduling</a></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-3">Platform</div>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li><a href="/blog" className="hover:text-white">Blog</a></li>
            <li><a href="/project" className="hover:text-white">Projects</a></li>
            <li><a href="/qa" className="hover:text-white">Q&A</a></li>
            <li><a href="/marketplace" className="hover:text-white">Marketplace</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-700 py-4 text-center text-gray-400 text-xs">© 2025 Collab Hub. All rights reserved.</div>
    </footer>
  );
}
