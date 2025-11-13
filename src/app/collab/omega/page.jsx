'use client';

import React from 'react';
import { CollabProvider } from '../store/collabStore.jsx';
import OmegaMatchForm from '../components/omega/OmegaMatchForm.jsx';
import OmegaRoomWidget from '../components/omega/OmegaRoomWidget.jsx';
import { useOmegaMatch } from '../store/collabStore.jsx';

function OmegaInner() {
  const user = { id: 'me', name: 'You', role: 'participant' };
  const { omega } = useOmegaMatch(user);
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Omega — Random Pairing</h1>
          <p className="text-gray-600">Find a partner with aligned skills/interests and pair for 5–10 minutes.</p>
        </div>
        <OmegaMatchForm user={user} />
        {omega.current?.status === 'matched' && <OmegaRoomWidget user={user} />}
      </div>
    </div>
  );
}

export default function OmegaPage() {
  return (
    <CollabProvider>
      <OmegaInner />
    </CollabProvider>
  );
}
