"use client";

import React from 'react';
import CollabHeader from './components/CollabHeader';
import CollabFooter from './components/CollabFooter';

export default function CollabLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex flex-col">
      <CollabHeader />
      <main className="flex-1 relative">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none" />
        <div className="relative z-10">
          {children}
        </div>
      </main>
      <CollabFooter />
    </div>
  );
}
