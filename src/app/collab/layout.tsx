"use client";

import React from 'react';
import CollabHeader from './components/CollabHeader';
import CollabFooter from './components/CollabFooter';

export default function CollabLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      <CollabHeader />
      <main className="flex-1">{children}</main>
      <CollabFooter />
    </div>
  );
}
