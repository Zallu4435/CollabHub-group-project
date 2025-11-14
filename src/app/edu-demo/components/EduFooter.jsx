'use client';

import React from 'react';

export default function EduFooter() {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center font-bold text-sm">EDU</div>
            <span className="font-semibold">EduPlatform</span>
          </div>
          <p className="text-gray-400 text-sm">
            Comprehensive education and certification platform with dual learning modes, 
            progress tracking, and seamless integrations.
          </p>
        </div>
        <div>
          <div className="font-semibold mb-3">Learning</div>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li><a href="/edu-demo/catalog" className="hover:text-white">Course Catalog</a></li>
            <li><a href="/edu-demo/dashboard" className="hover:text-white">Dashboard</a></li>
            <li><a href="/edu-demo/planner" className="hover:text-white">Study Planner</a></li>
            <li><a href="/edu-demo/certificate/verify" className="hover:text-white">Verify Certificate</a></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-3">Platform</div>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li><a href="/blog" className="hover:text-white">Blog</a></li>
            <li><a href="/community" className="hover:text-white">Community</a></li>
            <li><a href="/qa" className="hover:text-white">Q&A</a></li>
            <li><a href="/marketplace" className="hover:text-white">Marketplace</a></li>
            <li><a href="/collab" className="hover:text-white">Collab Hub</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-700 py-4 text-center text-gray-400 text-xs">
        © 2025 EduPlatform. All rights reserved.
      </div>
    </footer>
  );
}
