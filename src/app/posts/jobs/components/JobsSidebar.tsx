import React from 'react';
import Link from 'next/link';

export default function JobsSidebar() {
  return (
    <div className="space-y-2">
      {/* Profile Card */}
      <div className="bg-white rounded-lg border border-gray-300 overflow-hidden">
        <div className="relative">
          <div className="h-16 bg-gradient-to-r from-blue-400 via-blue-500 to-purple-600"></div>
          <div className="px-4 pb-4">
            <div className="relative -mt-10 mb-3">
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full border-4 border-white"></div>
            </div>
            <h3 className="font-bold text-gray-900">Muhammed Nazal k</h3>
            <p className="text-sm text-gray-600 italic mb-3">"Spreading Joy, Sparking Innovation, and Embracing New Possibilities!"</p>
            <p className="text-xs text-gray-600">Kannur, Kerala</p>
          </div>
        </div>

        <div className="border-t border-gray-300">
          <button className="w-full px-4 py-3 text-left hover:bg-gray-100 transition-all flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            </svg>
            <span className="text-sm font-semibold text-gray-900">Experience</span>
          </button>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="bg-white rounded-lg border border-gray-300 overflow-hidden">
        <Link
          href="/projects/my-projects"
          className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition-all"
        >
          <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M10 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2h-8l-2-2z"/>
          </svg>
          <div className="flex-1">
            <div className="text-sm font-semibold text-gray-900">My Projects</div>
          </div>
        </Link>

        <Link
          href="/projects/saved"
          className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition-all"
        >
          <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
          </svg>
          <div className="flex-1">
            <div className="text-sm font-semibold text-gray-900">Saved Projects</div>
          </div>
        </Link>

        <Link
          href="/projects/applications"
          className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition-all"
        >
          <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
          </svg>
          <div className="flex-1">
            <div className="text-sm font-semibold text-gray-900">My Applications</div>
          </div>
        </Link>

        <Link
          href="/projects/portfolio"
          className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition-all"
        >
          <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
          <div className="flex-1">
            <div className="text-sm font-semibold text-gray-900">Portfolio</div>
          </div>
        </Link>
      </div>

      {/* Post a project */}
      <Link
        href="/projects/post"
        className="block bg-white rounded-lg border border-gray-300 px-4 py-3 hover:bg-gray-100 transition-all"
      >
        <div className="flex items-center gap-2 text-blue-600">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
          </svg>
          <span className="text-sm font-semibold">Post a Project</span>
        </div>
      </Link>
    </div>
  );
}
