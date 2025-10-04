"use client";

import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
            <span className="text-indigo-700 font-extrabold text-lg tracking-wide select-none">CP</span>
          </div>
          <span className="text-white text-2xl font-extrabold tracking-wide select-none">Community Platform</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-10">
          <Link href="/" className="text-white hover:text-pink-300 font-semibold transition-colors duration-300">
            Home
          </Link>
          <Link href="/about" className="text-white hover:text-pink-300 font-semibold transition-colors duration-300">
            About
          </Link>
          <Link href="/services" className="text-white hover:text-pink-300 font-semibold transition-colors duration-300">
            Services
          </Link>
          <Link href="/community" className="text-white hover:text-pink-300 font-semibold transition-colors duration-300">
            Community
          </Link>
          <Link href="/contact" className="text-white hover:text-pink-300 font-semibold transition-colors duration-300">
            Contact
          </Link>
          {/* Help dropdown */}
          <div className="relative group">
            <button className="text-white hover:text-pink-300 font-semibold transition-colors duration-300 flex items-center gap-1">
              Help
              <span>▾</span>
            </button>
            <div className="absolute right-0 mt-3 w-60 bg-white text-gray-800 rounded-xl shadow-2xl border border-gray-100 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transform scale-95 group-hover:scale-100 transition p-2">
              <a href="/help" className="block px-3 py-2 rounded-lg hover:bg-gray-50">📚 Support Center</a>
              <a href="/updates" className="block px-3 py-2 rounded-lg hover:bg-gray-50">🚀 What’s New</a>
              <button onClick={() => window.dispatchEvent(new Event('open-feedback'))} className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50">💬 Give Feedback</button>
            </div>
          </div>
        </nav>

        {/* User Actions */}
        <div className="flex items-center space-x-4">
          <Link
            href="/auth/login"
            className="px-5 py-2 bg-white bg-opacity-25 text-indigo-900 rounded-full text-sm font-semibold hover:bg-opacity-40 transition duration-300 shadow-sm select-none"
          >
            Sign In
          </Link>
          <Link
            href="/auth/register"
            className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full text-sm font-semibold hover:from-pink-600 hover:to-purple-700 transition duration-300 shadow-lg select-none"
          >
            Join Now
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
