'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const primaryItems = [
  { name: 'Overview', href: '/marketplace/dashboard', icon: '🏠' },
  { name: 'My Projects', href: '/marketplace/dashboard/my-projects', icon: '📦' },
  { name: 'Sales', href: '/marketplace/dashboard/sales', icon: '📊' },
  { name: 'Earnings', href: '/marketplace/dashboard/earnings', icon: '💰' },
  { name: 'Orders', href: '/marketplace/dashboard/orders', icon: '📋' },
  { name: 'My Requests', href: '/marketplace/dashboard/my-requests', icon: '📋' },
  { name: 'Messages', href: '/marketplace/dashboard/messages', icon: '💬' }
];

const secondaryItems = [
  { name: 'Reviews', href: '/marketplace/dashboard/reviews', icon: '⭐' },
  { name: 'Support', href: '/marketplace/dashboard/support', icon: '🎧' },
  { name: 'Downloads', href: '/marketplace/dashboard/downloads', icon: '⬇️' },
  { name: 'Purchases', href: '/marketplace/dashboard/purchases', icon: '🛒' },
  { name: 'Escrow (Seller)', href: '/marketplace/dashboard/escrow/seller', icon: '🔒' },
  { name: 'Escrow (Buyer)', href: '/marketplace/dashboard/escrow/buyer', icon: '🛡️' },
  { name: 'Purchase Requests', href: '/marketplace/dashboard/requests', icon: '📝' },
  { name: 'Coins', href: '/marketplace/dashboard/coins', icon: '🪙' },
  { name: 'Settings', href: '/marketplace/dashboard/settings', icon: '⚙️' }
];

const allItems = [...primaryItems, ...secondaryItems];

export const DashboardTopbar: React.FC = () => {
  const pathname = usePathname();
  const [showDropdown, setShowDropdown] = useState(false);

  // Find current active item
  const activeItem = allItems.find(item => pathname === item.href);
  const isPrimaryActive = primaryItems.some(item => pathname === item.href);

  return (
    <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          
          {/* Primary Navigation - Centered */}
          <div className="hidden lg:flex items-center justify-center flex-1 max-w-4xl mx-auto">
            <div className="flex items-center space-x-1 bg-gray-50 p-1 rounded-xl">
              {primaryItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`relative inline-flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                      isActive
                        ? 'bg-white text-blue-700 shadow-sm transform scale-105'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                    }`}
                  >
                    <span className="text-base">{item.icon}</span>
                    <span className="hidden xl:inline">{item.name}</span>
                    {isActive && (
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full"></div>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Mobile Primary Navigation */}
          <div className="lg:hidden flex-1 flex items-center justify-center">
            <div className="flex items-center space-x-1 bg-gray-50 p-1 rounded-xl max-w-sm overflow-hidden">
              {primaryItems.slice(0, 4).map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`relative inline-flex items-center justify-center p-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-white text-blue-700 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                    }`}
                  >
                    <span className="text-base">{item.icon}</span>
                    {isActive && (
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full"></div>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* More Menu Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className={`inline-flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                !isPrimaryActive && activeItem
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {!isPrimaryActive && activeItem ? (
                <>
                  <span className="text-base">{activeItem.icon}</span>
                  <span className="hidden sm:inline text-xs">{activeItem.name}</span>
                </>
              ) : (
                <>
                  <span className="text-base">⋯</span>
                  <span className="hidden sm:inline text-xs">More</span>
                </>
              )}
              <svg className={`w-3 h-3 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowDropdown(false)}></div>
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-20 max-h-80 overflow-y-auto">
                  {/* Primary items for mobile */}
                  <div className="lg:hidden px-3 py-2">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Navigation</div>
                    {primaryItems.map((item) => {
                      const isActive = pathname === item.href;
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setShowDropdown(false)}
                          className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors mb-1 ${
                            isActive
                              ? 'bg-blue-50 text-blue-700'
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <span className="text-base">{item.icon}</span>
                          <span>{item.name}</span>
                        </Link>
                      );
                    })}
                    <div className="border-t border-gray-200 my-2"></div>
                  </div>

                  {/* Secondary items */}
                  <div className="px-3 py-2">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      More Options
                    </div>
                    {secondaryItems.map((item) => {
                      const isActive = pathname === item.href;
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setShowDropdown(false)}
                          className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors mb-1 ${
                            isActive
                              ? 'bg-blue-50 text-blue-700'
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <span className="text-base">{item.icon}</span>
                          <span>{item.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashboardTopbar;
