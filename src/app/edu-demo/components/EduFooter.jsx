'use client';

import React from 'react';
import { BookOpen, Compass, Calendar, LayoutDashboard, Search, Award } from 'lucide-react';

export default function EduFooter() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold shadow-lg">
              <BookOpen className="w-6 h-6" />
            </div>
            <span className="font-bold text-xl">EduPlatform</span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed max-w-md">
            {/* Comprehensive platform description */}
          </p>
        </div>
        <div>
          <div className="flex items-center gap-2 font-bold mb-4 text-blue-400">
            <Compass className="w-5 h-5" />
            Learning
          </div>
          <ul className="space-y-3 text-gray-300 text-sm">
            <li>
              <a href="/edu-demo/catalog" className="hover:text-white transition-colors flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                Course Catalog
              </a>
            </li>
            <li>
              <a href="/edu-demo/dashboard" className="hover:text-white transition-colors flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                Dashboard
              </a>
            </li>
            <li>
              <a href="/edu-demo/planner" className="hover:text-white transition-colors flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                Study Planner
              </a>
            </li>
            <li>
              <a href="/edu-demo/certificate/verify" className="hover:text-white transition-colors flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                Verify Certificate
              </a>
            </li>
          </ul>
        </div>
        <div>
          <div className="flex items-center gap-2 font-bold mb-4 text-purple-400">
            <LayoutDashboard className="w-5 h-5" />
            Platform
          </div>
          <ul className="space-y-3 text-gray-300 text-sm">
            <li>
              <a href="/blog" className="hover:text-white transition-colors flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                Blog
              </a>
            </li>
            <li>
              <a href="/community" className="hover:text-white transition-colors flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                Community
              </a>
            </li>
            <li>
              <a href="/qa" className="hover:text-white transition-colors flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                Q&A
              </a>
            </li>
            <li>
              <a href="/marketplace" className="hover:text-white transition-colors flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                Marketplace
              </a>
            </li>
            <li>
              <a href="/collab" className="hover:text-white transition-colors flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                Collab Hub
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-700 py-6 text-center text-gray-400 text-sm">
        <p>&copy; 2025 EduPlatform. All rights reserved.</p>
      </div>
    </footer>
  );
}
