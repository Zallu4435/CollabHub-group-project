"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FiChevronLeft,
  FiChevronRight,
  FiHome,
  FiUsers,
  FiSettings,
  FiBarChart2,
  FiBell,
  FiShield,
  FiGlobe,
  FiBox,
  FiLayers,
  FiLogOut,
} from 'react-icons/fi';

interface SuperAdminSidebarProps {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

const SuperAdminSidebar: React.FC<SuperAdminSidebarProps> = ({ sidebarCollapsed, setSidebarCollapsed }) => {
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const items = [
    { id: 'overview', title: 'Overview', icon: <FiHome size={20} />, path: '/super-admin' },
    { id: 'analytics', title: 'Analytics', icon: <FiBarChart2 size={20} />, path: '/super-admin/analytics' },
    { id: 'users', title: 'Users', icon: <FiUsers size={20} />, path: '/super-admin/users' },
    { id: 'notifications', title: 'Notifications', icon: <FiBell size={20} />, path: '/super-admin/notifications' },
    { id: 'remotes', title: 'Remote Modules', icon: <FiLayers size={20} />, path: '/super-admin/remotes' },
    { id: 'settings', title: 'Settings', icon: <FiSettings size={20} />, path: '/super-admin/settings' },
    { id: 'security', title: 'Security', icon: <FiShield size={20} />, path: '/super-admin/settings' },
    { id: 'marketplace', title: 'Marketplace', icon: <FiBox size={20} />, path: '/super-admin' },
    { id: 'global', title: 'Global', icon: <FiGlobe size={20} />, path: '/super-admin' },
  ];

  return (
    <>
      <aside
        className={`fixed inset-y-0 left-0 z-40 bg-white border-r border-gray-200/80 shadow-sm transition-all duration-300 ease-in-out flex flex-col
          ${sidebarCollapsed ? 'w-20' : 'w-72'}`}
      >
        <div className="flex-shrink-0 h-21 px-4 flex items-center justify-between border-b border-gray-200/80 bg-gradient-to-r from-violet-50/50 to-purple-50/50">
          {!sidebarCollapsed && (
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-sm">SA</span>
              </div>
              <div>
                <div className="font-semibold text-gray-900 text-sm">Super Admin</div>
                <div className="text-xs text-gray-500">Platform Control</div>
              </div>
            </div>
          )}

          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200 hidden lg:flex items-center justify-center"
            aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {sidebarCollapsed ? <FiChevronRight size={18} /> : <FiChevronLeft size={18} />}
          </button>
        </div>

        <nav className="flex-1 px-3 py-2 overflow-y-auto">
          <div className="space-y-1">
            {items.map(item => {
              const active = pathname === item.path || (item.id === 'overview' && pathname === '/super-admin');
              return (
                <Link
                  key={item.id}
                  href={item.path}
                  className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'justify-start'} px-3 py-2.5 rounded-lg transition-all duration-200 relative
                    ${active ? 'bg-gradient-to-r from-violet-600 to-purple-700 text-white shadow-md shadow-purple-200' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'}`}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <div className={`flex items-center ${!sidebarCollapsed ? 'w-full' : ''}`}>
                    <div className={`relative flex-shrink-0 transition-all duration-200 ${hoveredItem === item.id && !active ? 'transform scale-110' : ''}`}>
                      {item.icon}
                    </div>
                    {!sidebarCollapsed && (
                      <div className="ml-3 flex-1 min-w-0">
                        <div className={`text-sm font-medium truncate ${hoveredItem === item.id ? 'font-semibold' : ''}`}>{item.title}</div>
                      </div>
                    )}
                  </div>
                  {active && <div className="absolute left-0 top-1/2 w-1 h-8 bg-gradient-to-b from-violet-600 to-purple-700 rounded-r-md transform -translate-y-1/2 shadow-sm" />}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="flex-shrink-0 p-4 border-t border-gray-200/80 bg-gradient-to-b from-white to-gray-50/50">
          <div className={`flex ${sidebarCollapsed ? 'flex-col items-center' : 'items-center justify-between'}`}>
            <div className={`flex items-center ${sidebarCollapsed ? 'flex-col' : ''}`}>
              <div className="relative">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center shadow-sm ring-2 ring-purple-100">
                  <span className="text-sm font-bold text-white">SA</span>
                </div>
                <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-400 border-2 border-white" />
              </div>
              {!sidebarCollapsed && (
                <div className="ml-3 flex-1 min-w-0">
                  <p className="font-medium text-gray-900 text-sm truncate">Super Admin</p>
                  <p className="text-xs text-gray-500 truncate">Platform Owner</p>
                </div>
              )}
            </div>
            <button className={`p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors ${sidebarCollapsed ? 'mt-2' : ''}`} title="Logout">
              <FiLogOut size={18} />
            </button>
          </div>
        </div>
      </aside>

      <div className={`transition-all duration-300 ease-in-out ${sidebarCollapsed ? 'ml-20' : 'ml-72'}`}></div>
    </>
  );
}

export default SuperAdminSidebar;


