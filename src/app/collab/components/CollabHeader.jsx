'use client';

import React, { useState } from 'react';
import { Menu, X, Home, Video, Brain, Calendar, Sparkles, Clock } from 'lucide-react';

const NAV_LINKS = [
  { href: '/collab', label: 'Home', icon: Home },
  { href: '/collab/sessions', label: 'Live Sessions', icon: Video },
  { href: '/collab/quizzes', label: 'Quizzes', icon: Brain },
  { href: '/collab/calendar', label: 'Calendar', icon: Calendar },
  { href: '/collab/omega', label: 'Omega', icon: Sparkles },
  { href: '/collab/scheduling', label: 'Scheduling', icon: Clock }
];

export default function CollabHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="/collab" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-500 text-white flex items-center justify-center font-bold shadow-lg group-hover:scale-105 transition-transform">
              CH
            </div>
            <span className="font-bold text-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
              Collab Hub
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all"
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="/collab#join"
              className="px-4 py-2 rounded-xl border-2 border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Join Room
            </a>
            <a
              href="/"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm font-medium shadow-md hover:shadow-lg transition-all"
            >
              Go to Platform
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden py-4 border-t animate-fadeIn">
            <nav className="space-y-1">
              {NAV_LINKS.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                    {link.label}
                  </a>
                );
              })}
            </nav>
            <div className="mt-4 pt-4 border-t space-y-2">
              <a
                href="/collab#join"
                className="block w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 text-sm font-medium text-gray-700 text-center hover:bg-gray-50 transition-colors"
              >
                Join Room
              </a>
              <a
                href="/"
                className="block w-full px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-medium text-center shadow-md"
              >
                Go to Platform
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
