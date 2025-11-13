'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface ReleaseNote {
  id: string;
  version: string;
  date: string;
  highlights: string[];
  category: 'new' | 'improvement' | 'fix';
  description?: string;
}

const RELEASES: ReleaseNote[] = [
  {
    id: '1.2.0',
    version: '1.2.0',
    date: '2025-10-01',
    category: 'new',
    description: 'Enhanced user support experience',
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
    category: 'improvement',
    description: 'Performance and UX refinements',
    highlights: [
      'Performance improvements across marketplace pages',
      'Refined global navigation and animations'
    ]
  }
];

const categoryConfig = {
  new: { label: 'New', color: 'bg-emerald-500', icon: '✨' },
  improvement: { label: 'Improved', color: 'bg-blue-500', icon: '⚡' },
  fix: { label: 'Fixed', color: 'bg-amber-500', icon: '🔧' }
};

const UpdatesPage: React.FC = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => router.back(), 300);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-gradient-to-br from-slate-900/30 via-indigo-900/20 to-purple-900/30 backdrop-blur-xl backdrop-saturate-150 z-[9999] transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={handleClose}
      />

      {/* Slide-in Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-[680px] lg:w-[760px] bg-white shadow-2xl z-[10000] transform transition-transform duration-300 ease-out ${
          isVisible ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
          <div className="px-6 py-5">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl font-bold text-gray-900">What's New</h1>
                  <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-semibold">
                    v{RELEASES[0].version}
                  </span>
                </div>
                <p className="text-sm text-gray-600">Latest updates and improvements to your experience</p>
              </div>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Close"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="h-[calc(100vh-88px)] overflow-y-auto">
          <div className="px-6 py-6 space-y-6">
            {RELEASES.map((release, index) => {
              const config = categoryConfig[release.category];
              return (
                <article
                  key={release.id}
                  className="group relative"
                >
                  {/* Connection Line */}
                  {index !== RELEASES.length - 1 && (
                    <div className="absolute left-[19px] top-12 bottom-0 w-px bg-gradient-to-b from-gray-200 to-transparent" />
                  )}

                  <div className="relative flex gap-4">
                    {/* Timeline Indicator */}
                    <div className="flex-shrink-0 relative">
                      <div className={`w-10 h-10 rounded-xl ${config.color} flex items-center justify-center text-white shadow-lg`}>
                        <span className="text-lg">{config.icon}</span>
                      </div>
                      {index === 0 && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full animate-pulse" />
                      )}
                    </div>

                    {/* Content Card */}
                    <div className="flex-1 pb-8">
                      {/* Meta Info */}
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`px-3 py-1 rounded-lg ${config.color} text-white text-xs font-semibold shadow-sm`}>
                          {config.label}
                        </span>
                        <span className="text-sm font-semibold text-gray-900">v{release.version}</span>
                        <span className="text-sm text-gray-500">
                          {new Date(release.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                        {index === 0 && (
                          <span className="px-2 py-0.5 rounded-md bg-green-50 text-green-700 text-xs font-medium">
                            Latest
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      {release.description && (
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                          {release.description}
                        </h3>
                      )}

                      {/* Highlights */}
                      <ul className="space-y-2.5">
                        {release.highlights.map((highlight, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2.5 text-gray-700 text-sm leading-relaxed group/item hover:text-gray-900 transition-colors"
                          >
                            <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-gray-400 mt-1.5 group-hover/item:bg-indigo-500 transition-colors" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Footer Actions */}
          <div className="px-6 pb-8 space-y-6">
            {/* Status Message */}
            <div className="flex items-center justify-center gap-2 py-4">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm text-gray-600">
                You're on the latest version
              </span>
            </div>

            {/* CTA Card */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 border border-indigo-100/50 p-8">
              <div className="relative z-10">
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Never miss an update</h3>
                    <p className="text-sm text-gray-600">
                      Get notified about new features, improvements, and important changes
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="flex-1 px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-300 transition-all duration-200 hover:-translate-y-0.5">
                    Subscribe to Updates
                  </button>
                  <button className="px-5 py-3 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-700 font-medium hover:bg-white transition-colors">
                    View Roadmap
                  </button>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-300/20 to-transparent rounded-full blur-2xl" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-indigo-300/20 to-transparent rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdatesPage;
