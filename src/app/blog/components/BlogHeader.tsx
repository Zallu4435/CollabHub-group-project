"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";

export default function BlogHeader() {
  // Mock user data - replace with real auth context in production
  const user = {
    name: 'Jane Doe',
    email: 'jane@example.com',
    avatar: '', // Add avatar URL if available
  };
  return (
    <nav className="border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur-sm z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/blog" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">B</span>
            </div>
            <span className="text-xl font-serif font-bold text-gray-900">BlogSpace</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/blog" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              Home
            </Link>
            <Link href="/blog/explore" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              Explore
            </Link>
            <Link href="/blog/create" className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
              Write
            </Link>
            <ProfileMenu user={user} />
          </div>

          <button className="md:hidden p-2" aria-label="Open menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}

function ProfileMenu({ user }: { user: { name: string; email: string; avatar?: string } }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  // Close dropdown on escape key
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center space-x-2 w-auto h-10 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full cursor-pointer 
                   hover:shadow-md hover:scale-105 active:scale-95 transition-all duration-200 
                   border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 px-3"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Open profile menu"
      >
        {/* Profile icon or avatar placeholder */}
        <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white font-semibold text-sm">
          {user.avatar ? (
            <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
          ) : (
            user.name.charAt(0).toUpperCase()
          )}
        </div>
        <span className="hidden lg:block text-sm font-medium text-gray-900">{user.name}</span>
      </button>

      {/* Dropdown Menu */}
      {open && (
        <>
          {/* Backdrop for mobile */}
          <div 
            className="fixed inset-0 z-10 md:hidden" 
            onClick={() => setOpen(false)}
          />
          
          {/* Dropdown Content */}
          <div className="absolute right-0 mt-3 w-56 bg-white border border-gray-200 rounded-xl shadow-xl z-50
                          transform transition-all duration-200 ease-out
                          animate-in fade-in-0 zoom-in-95 slide-in-from-top-2">
            
            {/* Arrow pointer */}
            <div className="absolute -top-1 right-4 w-2 h-2 bg-white border-l border-t border-gray-200 
                          transform rotate-45"></div>
            
            {/* User Info Section */}
            <div className="px-4 py-3 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full 
                              flex items-center justify-center text-white font-semibold text-sm">
                  U
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    User Name
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    user@example.com
                  </p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              <Link 
                href="/profile" 
                className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 
                          transition-colors duration-150 group"
                onClick={() => setOpen(false)}
              >
                <svg 
                  className="w-4 h-4 mr-3 text-gray-400 group-hover:text-gray-600" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                  />
                </svg>
                My Profile
              </Link>

              <Link 
                href="/blog/settings" 
                className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 
                          transition-colors duration-150 group"
                onClick={() => setOpen(false)}
              >
                <svg 
                  className="w-4 h-4 mr-3 text-gray-400 group-hover:text-gray-600" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" 
                  />
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
                  />
                </svg>
                Blog Settings
              </Link>

              {/* Divider */}
              <div className="my-2 border-t border-gray-100"></div>

              <button 
                className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 
                          transition-colors duration-150 group"
                onClick={() => {
                  setOpen(false);
                  // Add logout logic here
                }}
              >
                <svg 
                  className="w-4 h-4 mr-3 text-red-500 group-hover:text-red-600" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
                  />
                </svg>
                Sign Out
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
