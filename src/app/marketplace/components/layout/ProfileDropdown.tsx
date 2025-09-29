"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface User {
  name: string;
  username: string;
  avatar?: string;
  rating: number;
  role: string;
}

interface MenuItem {
  type?: 'action';
  href?: string;
  icon: string;
  label: string;
  action?: string;
}

interface ProfileDropdownProps {
  user: User;
  onSignOut?: () => void;
}

export const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ user, onSignOut }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = () => {
    onSignOut?.();
    router.push('/auth/login');
    setIsOpen(false);
  };

  const menuItems: MenuItem[] = [
    { href: '/profile', icon: '👤', label: 'My Profile' },
    { href: '/marketplace/dashboard/settings', icon: '⚙️', label: 'Marketplace Settings' },
    { href: '/marketplace/sell', icon: '💼', label: 'Sell Project' },
    { href: '/marketplace/help', icon: '❓', label: 'Help & Support' },
    { type: 'action', action: 'signout', icon: '🚪', label: 'Sign Out' }
  ];

  const handleItemClick = (item: MenuItem) => {
    if (item.action === 'signout') {
      handleSignOut();
    } else if (item.href) {
      router.push(item.href);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
        aria-label="Profile menu"
      >
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
          {user.avatar ? (
            <img 
              src={user.avatar} 
              alt={user.name}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <span className="text-white font-semibold text-sm">
              {user.name.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
        <div className="hidden lg:block text-left">
          <div className="text-sm font-medium text-gray-900">{user.name}</div>
          <div className="text-xs text-gray-500">{user.role}</div>
        </div>
        <svg 
          className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop for mobile */}
          <div 
            className="fixed inset-0 z-10 md:hidden" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown Content */}
          <div className="absolute right-0 mt-3 w-56 bg-white border border-gray-200 rounded-xl shadow-xl z-50
                          transform transition-all duration-200 ease-out
                          animate-in fade-in-0 zoom-in-95 slide-in-from-top-2">
            
            {/* Arrow pointer */}
            <div className="absolute -top-1 right-4 w-2 h-2 bg-white border-l border-t border-gray-200 
                          transform rotate-45"></div>
            
            {/* User Info */}
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                {user.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <span className="text-white font-semibold">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-900 truncate">{user.name}</div>
                <div className="text-xs text-gray-500 truncate">@{user.username}</div>
                <div className="flex items-center space-x-1 mt-1">
                  <span className="text-xs text-gray-500">{user.role}</span>
                  <span className="text-yellow-500">⭐</span>
                  <span className="text-xs text-gray-500">{user.rating}</span>
                </div>
              </div>
            </div>
          </div>

            {/* Menu Items */}
            <div className="py-2">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleItemClick(item)}
                  className={`w-full flex items-center px-4 py-3 text-sm transition-colors duration-150 group ${
                    item.action === 'signout' 
                      ? 'text-red-600 hover:bg-red-50' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-base mr-3">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
