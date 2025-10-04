'use client';

import React, { useMemo } from 'react';

interface ReleaseNote {
  id: string;
  version: string;
  date: string;
  highlights: string[];
}

const RELEASES: ReleaseNote[] = [
  {
    id: '1.2.0',
    version: '1.2.0',
    date: '2025-10-01',
    highlights: [
      'Introduced Support Center with searchable FAQs',
      'New Feedback modal with screenshot support',
      'Floating Help menu for quick access to support'
    ]
  },
  {
    id: '1.1.0',
    version: '1.1.0',
    date: '2025-09-20',
    highlights: [
      'Performance improvements across marketplace pages',
      'Refined global navigation and animations'
    ]
  }
];

const UpdatesPage: React.FC = () => {
  const latest = useMemo(() => RELEASES[0], []);

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-100 bg-white">
        <div className="px-8 py-10 bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white">
          <h1 className="text-3xl font-extrabold tracking-tight">What’s New</h1>
          <p className="text-indigo-100 mt-2">Latest improvements, features, and fixes</p>
        </div>

        <div className="p-8 space-y-6">
          {RELEASES.map((release) => (
            <div key={release.id} className="border border-gray-100 rounded-2xl p-6">
              <div className="flex items-center gap-3">
                <div className="px-3 py-1 rounded-full text-xs bg-indigo-50 text-indigo-700 font-semibold">v{release.version}</div>
                <div className="text-sm text-gray-500">{new Date(release.date).toLocaleDateString()}</div>
              </div>
              <ul className="mt-4 list-disc list-inside space-y-2 text-gray-800">
                {release.highlights.map((h, idx) => (
                  <li key={idx}>{h}</li>
                ))}
              </ul>
            </div>
          ))}

          <div className="text-sm text-gray-500">You’re up to date. Latest version: v{latest.version}.</div>
        </div>
      </div>
    </div>
  );
};

export default UpdatesPage;


