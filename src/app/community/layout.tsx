"use client";

import { useState, type ReactNode } from 'react';
import NotificationBell from './_components/notifications/NotificationBell';

type AvatarSize = 'sm' | 'md' | 'lg';
type AvatarProps = { src?: string; alt?: string; size?: AvatarSize };
const Avatar = ({ src, alt, size = "sm" }: AvatarProps) => {
  const sizeClasses: Record<AvatarSize, string> = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12"
  };
  
  return (
    <div className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold overflow-hidden ring-2 ring-white`}>
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <span className="text-sm">{alt?.charAt(0) || 'U'}</span>
      )}
    </div>
  );
};

export default function CommunityLayout({ children }: { children?: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const primaryNav = [
    { href: '/community/feed', label: 'Feed', icon: '🏠' },
    { href: '/community/discussions', label: 'Discussions', icon: '💬' },
    { href: '/community/groups', label: 'Groups', icon: '👥' },
    { href: '/community/events', label: 'Events', icon: '📅' }
  ];

  const secondaryNav = [
    { href: '/community/hangouts', label: 'Hangouts' },
    { href: '/community/mentorship', label: 'Mentorship' },
    { href: '/community/polls', label: 'Polls' },
    { href: '/community/discover', label: 'Discover' },
    { href: '/community/gamification', label: 'Gamification' },
    { href: '/community/map', label: 'Map' },
    { href: '/community/leaderboard', label: 'Leaderboard' },
    { href: '/community/analytics', label: 'Analytics' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left Section: Brand + Navigation */}
            <div className="flex items-center gap-8 flex-1">
              {/* Mobile Menu Toggle */}
              <button
                aria-label="Toggle menu"
                className="md:hidden p-2 -ml-2 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>

              {/* Brand Logo */}
              <a href="/community" className="flex items-center gap-2 group">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <span className="text-xl font-bold text-gray-900 hidden sm:block">Community</span>
              </a>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-1">
                {primaryNav.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    {item.label}
                  </a>
                ))}

                {/* More Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setMoreOpen(!moreOpen)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg inline-flex items-center gap-1 transition-colors"
                  >
                    More
                    <svg 
                      className={`w-4 h-4 transition-transform ${moreOpen ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {moreOpen && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setMoreOpen(false)} />
                      <div className="absolute top-full right-0 mt-2 z-20 w-64 bg-white border border-gray-200 rounded-xl shadow-lg py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Explore More
                        </div>
                        <div className="grid grid-cols-1">
                          {secondaryNav.map((item) => (
                            <a
                              key={item.href}
                              href={item.href}
                              className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                              onClick={() => setMoreOpen(false)}
                            >
                              {item.label}
                            </a>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </nav>
            </div>

            {/* Right Section: Search + Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Search Bar */}
              <div className="hidden lg:block">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                    className={`w-64 xl:w-80 pl-10 pr-4 py-2 bg-gray-100 rounded-lg border-2 transition-all text-sm ${
                      searchFocused 
                        ? 'border-blue-500 bg-white shadow-sm' 
                        : 'border-transparent hover:bg-gray-200'
                    }`}
                  />
                  <svg 
                    className={`w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${
                      searchFocused ? 'text-blue-500' : 'text-gray-500'
                    }`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-5.2-5.2M10 18a8 8 0 100-16 8 8 0 000 16z" />
                  </svg>
                </div>
              </div>

              {/* Search Icon (Mobile) */}
              <button className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-5.2-5.2M10 18a8 8 0 100-16 8 8 0 000 16z" />
                </svg>
              </button>

              {/* Create Post Button removed as requested */}

              {/* Divider */}
              <div className="hidden sm:block w-px h-6 bg-gray-300" />

              {/* Messages */}
              <a href="/community/messages">
                <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
                </button>
              </a>

              {/* Notifications */}
              <NotificationBell unreadCount={3} />

              {/* Profile Dropdown */}
              <div className="relative ml-1">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center focus:outline-none"
                  aria-label="Open profile menu"
                  aria-haspopup="menu"
                  aria-expanded={profileOpen}
                >
                  <Avatar src="" alt="John Doe" size="sm" />
                </button>
                {profileOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setProfileOpen(false)} />
                    <div className="absolute top-full right-0 mt-2 z-20 w-64 bg-white border border-gray-200 rounded-xl shadow-lg py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="px-4 py-3 flex items-center gap-3">
                        <div className="shrink-0">
                          <Avatar src="" alt="John Doe" size="md" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">John Doe</p>
                          <p className="text-xs text-gray-500 truncate">john@example.com</p>
                        </div>
                      </div>
                      <div className="h-px bg-gray-200 my-1" />
                      <a
                        href="/community/profiles/1"
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                        onClick={() => setProfileOpen(false)}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Profile
                      </a>
                      <a
                        href="/community/settings"
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                        onClick={() => setProfileOpen(false)}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0a1.724 1.724 0 002.573.986c.83-.48 1.86.45 1.38 1.28a1.724 1.724 0 00.986 2.573c.921.3.921 1.603 0 1.902a1.724 1.724 0 00-.986 2.573c.48.83-.55 1.76-1.38 1.28a1.724 1.724 0 00-2.573.986c-.3.921-1.603.921-1.902 0a1.724 1.724 0 00-2.573-.986c-.83.48-1.86-.45-1.38-1.28a1.724 1.724 0 00-.986-2.573c-.921-.3-.921-1.603 0-1.902.64-.208 1.116-.684 1.324-1.324.48-.83 1.91-.83 2.39 0 .208.64.684 1.116 1.324 1.324z" />
                        </svg>
                        Settings
                      </a>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white animate-in slide-in-from-top duration-200">
            <div className="max-w-7xl mx-auto px-4 py-4">
              {/* Mobile Search */}
              <div className="mb-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search community..."
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-100 rounded-lg border border-transparent focus:border-blue-500 focus:bg-white focus:outline-none text-sm"
                  />
                  <svg className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-5.2-5.2M10 18a8 8 0 100-16 8 8 0 000 16z" />
                  </svg>
                </div>
              </div>

              {/* Primary Navigation */}
              <div className="space-y-1 mb-4">
                {primaryNav.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 text-gray-700 hover:text-gray-900 font-medium transition-colors"
                  >
                    <span className="text-lg">{item.icon}</span>
                    {item.label}
                  </a>
                ))}
              </div>

              {/* Divider */}
              <div className="h-px bg-gray-200 my-4" />

              {/* Secondary Navigation */}
              <div className="space-y-1">
                <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  More Options
                </div>
                {secondaryNav.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="block px-3 py-2.5 rounded-lg hover:bg-gray-50 text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
              </div>

              {/* Create Button (Mobile) */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Create New Post
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children || (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Welcome to Community</h3>
              <p className="text-gray-600 text-sm">Start exploring discussions, connect with others, and share your thoughts.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}