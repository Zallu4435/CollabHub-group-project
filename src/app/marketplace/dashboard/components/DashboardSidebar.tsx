'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';

const navigationItems = [
  {
    name: 'Overview',
    href: '/marketplace/dashboard',
    icon: '🏠',
    description: 'Dashboard overview'
  },
  {
    name: 'My Projects',
    href: '/marketplace/dashboard/my-projects',
    icon: '📦',
    description: 'Manage your projects'
  },
  {
    name: 'Sales',
    href: '/marketplace/dashboard/sales',
    icon: '📊',
    description: 'Sales analytics'
  },
  {
    name: 'Earnings',
    href: '/marketplace/dashboard/earnings',
    icon: '💰',
    description: 'Earnings & payouts'
  },
  {
    name: 'Orders',
    href: '/marketplace/dashboard/orders',
    icon: '📋',
    description: 'Order management'
  },
  {
    name: 'Reviews',
    href: '/marketplace/dashboard/reviews',
    icon: '⭐',
    description: 'Manage reviews'
  },
  {
    name: 'Messages',
    href: '/marketplace/messages',
    icon: '💬',
    description: 'Buyer-seller communication'
  },
  {
    name: 'Support',
    href: '/marketplace/dashboard/support',
    icon: '🎧',
    description: 'Customer support'
  },
  {
    name: 'Downloads',
    href: '/marketplace/dashboard/downloads',
    icon: '⬇️',
    description: 'My downloads'
  },
  {
    name: 'Purchases',
    href: '/marketplace/dashboard/purchases',
    icon: '🛒',
    description: 'Purchase history'
  },
  {
    name: 'Escrow (Seller)',
    href: '/marketplace/escrow/seller',
    icon: '🔒',
    description: 'Manage escrow projects'
  },
  {
    name: 'Escrow (Buyer)',
    href: '/marketplace/escrow/buyer',
    icon: '🛡️',
    description: 'My escrow purchases'
  },
  {
    name: 'Purchase Requests',
    href: '/marketplace/dashboard/requests',
    icon: '📝',
    description: 'Manage purchase requests'
  },
  {
    name: 'My Requests',
    href: '/marketplace/dashboard/my-requests',
    icon: '📋',
    description: 'My purchase requests'
  },
  {
    name: 'Coins',
    href: '/marketplace/dashboard/coins',
    icon: '🪙',
    description: 'Coin rewards & redemptions'
  },
  {
    name: 'Settings',
    href: '/marketplace/dashboard/settings',
    icon: '⚙️',
    description: 'Account settings'
  }
];

export const DashboardSidebar: React.FC = () => {
  const pathname = usePathname();

  return (
    <div className="w-64 space-y-6">
      {/* Quick Stats */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Quick Stats</h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Total Sales</span>
              <span className="text-sm font-semibold">$12,450</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Projects</span>
              <span className="text-sm font-semibold">12</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Orders</span>
              <span className="text-sm font-semibold">47</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Rating</span>
              <span className="text-sm font-semibold">4.8⭐</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Dashboard Menu</h3>
        </CardHeader>
        <CardContent>
          <nav className="space-y-1">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <div className="flex-1">
                    <div>{item.name}</div>
                    <div className="text-xs text-gray-500">{item.description}</div>
                  </div>
                </Link>
              );
            })}
          </nav>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Quick Actions</h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Link
              href="/marketplace/sell"
              className="block w-full px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-center transition-colors"
            >
              🚀 Sell Projects
            </Link>
            <Link
              href="/marketplace/browse"
              className="block w-full px-3 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-center transition-colors"
            >
              🔍 Browse Projects
            </Link>
            <Link
              href="/marketplace/escrow/browse"
              className="block w-full px-3 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-center transition-colors"
            >
              🔒 Browse Escrow
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
