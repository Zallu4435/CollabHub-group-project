"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BusinessMenu from "./BusinessMenu";

const NAV = [
  { 
    href: "/posts", 
    label: "Home",
    icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
  },
  { 
    href: "/posts/network", 
    label: "My Network",
    icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
  },
  { 
    href: "/posts/jobs", 
    label: "Jobs",
    icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/></svg>
  },
  { 
    href: "/posts/messages", 
    label: "Messaging",
    icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/></svg>
  },
  { 
    href: "/posts/notifications", 
    label: "Notifications",
    icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>
  },
];

export default function PostsHeader() {
  const pathname = usePathname();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showBusinessMenu, setShowBusinessMenu] = useState(false);

  return (
    <header className="bg-white border-b border-gray-300 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo and Search */}
          <div className="flex items-center gap-2 flex-1">
            {/* Logo */}
            <Link href="/" className="flex items-center flex-shrink-0">
              <div className="w-29 h-9 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-lg">Code Post</span>
              </div>
            </Link>

            {/* Search */}
            <div className="relative flex-1 max-w-xs">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search"
                className="w-full py-1.5 pl-9 pr-3 bg-blue-50 text-sm rounded focus:bg-white focus:outline-none focus:ring-1 focus:ring-gray-400 transition-all"
              />
            </div>
          </div>

          {/* Navigation Icons */}
          <nav className="flex items-center">
            {NAV.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex flex-col items-center justify-center px-3 py-2 min-w-[80px] relative group ${
                    active ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <div className="relative">
                    {item.icon}
                    {item.label === "Notifications" && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                        3
                      </span>
                    )}
                  </div>
                  <span className="text-xs mt-0.5 font-medium">{item.label}</span>
                  {active && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"></div>
                  )}
                </Link>
              );
            })}

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex flex-col items-center justify-center px-3 py-2 min-w-[80px] text-gray-600 hover:text-gray-900"
              >
                <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full"></div>
                <div className="flex items-center gap-0.5 mt-0.5">
                  <span className="text-xs font-medium">Me</span>
                  <svg className={`w-3 h-3 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
                  </svg>
                </div>
              </button>

              {/* Dropdown Menu */}
              {showUserMenu && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setShowUserMenu(false)}
                  ></div>
                  <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-lg shadow-2xl border border-gray-300 z-50">
                    {/* Profile Section */}
                    <div className="p-4 border-b border-gray-300">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full"></div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">John Doe</h3>
                          <p className="text-sm text-gray-600">Full Stack Developer</p>
                        </div>
                      </div>
                      <Link 
                        href="/posts/profile"
                        className="block w-full py-2 px-4 border-2 border-blue-600 text-blue-600 rounded-full text-center font-semibold hover:bg-blue-50 transition-all text-sm"
                        onClick={() => setShowUserMenu(false)}
                      >
                        View Profile
                      </Link>
                    </div>

                    {/* Account Section */}
                    <div className="py-2">
                      <div className="px-4 py-2 text-xs font-semibold text-gray-900">Account</div>
                      <Link 
                        href="/community/settings"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-900 hover:bg-gray-100"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94L14.4 2.81c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
                        </svg>
                        Settings & Privacy
                      </Link>
                      <Link 
                        href="/posts/help"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-900 hover:bg-gray-100"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"/>
                        </svg>
                        Help
                      </Link>
                    </div>

                    {/* Manage Section */}
                    <div className="py-2 border-t border-gray-300">
                      <div className="px-4 py-2 text-xs font-semibold text-gray-900">Manage</div>
                      <button className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-900 hover:bg-gray-100 w-full">
                        <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                        </svg>
                        Posts & Activity
                      </button>
                    </div>

                    {/* Sign Out */}
                    <div className="py-2 border-t border-gray-300">
                      <button className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-900 hover:bg-gray-100 w-full">
                        <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
                        </svg>
                        Sign Out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Work (For Business) */}
            <div className="relative">
              <button 
                onClick={() => setShowBusinessMenu(!showBusinessMenu)}
                className="flex flex-col items-center justify-center px-3 py-2 min-w-[80px] text-gray-600 hover:text-gray-900 border-l border-gray-300"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/>
                </svg>
                <div className="flex items-center gap-0.5 mt-0.5">
                  <span className="text-xs font-medium">Business</span>
                  <svg className={`w-3 h-3 transition-transform ${showBusinessMenu ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
                  </svg>
                </div>
              </button>
            </div>
          </nav>
        </div>
      </div>
      
      {/* Business Menu */}
      <BusinessMenu 
        isOpen={showBusinessMenu} 
        onClose={() => setShowBusinessMenu(false)} 
      />
    </header>
  );
}
