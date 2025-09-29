"use client";
// market/src/components/layout/Header.tsx
import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '../ui/Button';
import { CurrencySelector } from '@/components/ui/CurrencySelector';
import { ProfileDropdown } from './ProfileDropdown';

export const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Mock user data - in real app, this would come from auth context
  const currentUser = {
    name: 'John Doe',
    username: 'johndoe',
    avatar: '/images/avatars/john.jpg',
    rating: 4.8,
    role: 'Seller'
  };
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/marketplace" className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span className="ml-2 text-xl font-bold text-black">DevMarket</span>
            </Link>
          </div>

          {/* Hamburger for mobile */}
          <div className="md:hidden flex items-center">
            <button
              className="p-2 rounded-md text-gray-600 hover:text-black focus:outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/marketplace/browse" className="text-black hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium">
              Browse
            </Link>
            <Link href="/marketplace/categories" className="text-black hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium">
              Categories
            </Link>
            <Link href="/marketplace/licensing" className="text-black hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium">
              Licensing
            </Link>
            <Link href="/marketplace/escrow/browse" className="text-black hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium">
              Escrow
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8 hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Search projects, templates..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            <Link href="/marketplace/cart">
              <div className="relative p-2">
                <svg className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6.5M7 13l-1.5-6.5m0 0h15M17 21a2 2 0 100-4 2 2 0 000 4zM9 21a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
              </div>
            </Link>
            <Link href="/marketplace/wishlist">
              <div className="relative p-2">
                <svg className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">2</span>
              </div>
            </Link>
            
            {/* Profile Dropdown */}
            <ProfileDropdown user={currentUser} />
            
          </div>
        </div>
        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden mt-2 space-y-2">
            <nav className="flex flex-col space-y-1">
              <Link href="/marketplace/browse" className="text-black hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium" onClick={() => setMenuOpen(false)}>
                Browse
              </Link>
              <Link href="/marketplace/categories" className="text-black hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium" onClick={() => setMenuOpen(false)}>
                Categories
              </Link>
              <Link href="/marketplace/licensing" className="text-black hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium" onClick={() => setMenuOpen(false)}>
                Licensing
              </Link>
            </nav>
            <div className="mt-2 flex flex-col space-y-2">
              <input
                type="text"
                placeholder="Search projects, templates..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="flex space-x-2">
                <Link href="/marketplace/cart" className="p-2">
                  <svg className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6.5M7 13l-1.5-6.5m0 0h15M17 21a2 2 0 100-4 2 2 0 000 4zM9 21a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                </Link>
                <Link href="/marketplace/wishlist" className="p-2">
                  <svg className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </Link>
                <div className="p-2">
                  <ProfileDropdown user={currentUser} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
