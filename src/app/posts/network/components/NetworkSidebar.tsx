import React from 'react';
import Link from 'next/link';

export default function NetworkSidebar() {
  const navItems = [
    { icon: '👥', label: 'Connections', count: 1638, href: '/network/connections' },
    { icon: '👤', label: 'Following & followers', count: null, href: '/network/following' },
    { icon: '🔰', label: 'Groups', count: 3, href: '/network/groups' },
    { icon: '📅', label: 'Events', count: 1, href: '/network/events' },
    { icon: '📄', label: 'Pages', count: 33, href: '/network/pages' },
    { icon: '📧', label: 'Newsletters', count: 8, href: '/network/newsletters' },
  ];

  return (
    <div className="space-y-2">
      {/* Manage Network Card */}
      <div className="bg-white rounded-lg border border-gray-300 overflow-hidden">
        <div className="p-4 border-b border-gray-300">
          <h2 className="font-semibold text-gray-900">Manage my network</h2>
        </div>
        <div>
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center justify-between px-4 py-3 hover:bg-gray-100 transition-all"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{item.icon}</span>
                <span className="text-sm text-gray-900 font-medium">{item.label}</span>
              </div>
              {item.count !== null && (
                <span className="text-sm font-semibold text-gray-700">{item.count}</span>
              )}
            </Link>
          ))}
        </div>
      </div>

      {/* Premium Ad */}
      <div className="bg-white rounded-lg border border-gray-300 p-4">
        <div className="text-xs text-gray-600 mb-2">Ad</div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full"></div>
          <div className="w-20 h-8 bg-yellow-100 rounded flex items-center justify-center">
            <span className="text-xs font-bold text-gray-900">Premium</span>
          </div>
        </div>
        <p className="text-sm text-gray-900 font-semibold mb-2">
          Muhammed, here's a 1-month free trial of LinkedIn Premium
        </p>
        <p className="text-xs text-gray-600 mb-4">
          Increase your chances of getting hired by 2.6x
        </p>
        <button className="w-full px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-full font-semibold hover:bg-blue-50 transition-all text-sm">
          Try for free
        </button>
      </div>
    </div>
  );
}
