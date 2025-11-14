'use client';

import React from 'react';
import Achievements from '../components/Achievements';

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Achievements userId="user-1" />
    </div>
  );
}
