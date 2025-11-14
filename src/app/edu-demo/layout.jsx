'use client';

import React from 'react';
import EduHeader from './components/EduHeader';
import EduFooter from './components/EduFooter';
import { EduProvider } from './lib/store';

export default function EduLayout({ children }) {
  return (
    <EduProvider>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <EduHeader />
        <main className="flex-1">{children}</main>
        <EduFooter />
      </div>
    </EduProvider>
  );
}
