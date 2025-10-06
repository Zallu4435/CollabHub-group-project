"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FiChevronLeft, 
  FiChevronRight, 
  FiHome,
  FiFolder,
  FiUsers,
  FiCheckSquare,
  FiFileText,
  FiMessageSquare,
  FiVideo,
  FiBarChart2,
  FiShield,
  FiSettings,
  FiZap,
  FiSearch,
  FiLogOut,
  FiTrendingUp,
  FiMonitor,
  FiTool,
  FiBell,
  FiDollarSign,
  FiCheckCircle
} from 'react-icons/fi';

interface ProjectAdminSidebarProps {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

const ProjectAdminSidebar: React.FC<ProjectAdminSidebarProps> = ({ sidebarCollapsed, setSidebarCollapsed }) => {
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<string[]>([
    'Overview',
    'Project Management',
    'Team & Users',
    'Content & Files',
    'Communication',
    'Analytics & Reports',
    'System & Security'
  ]);

  const sidebarItems = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: <FiHome size={20} />,
      description: 'Overview and key metrics',
      path: '/admin/projects',
      category: 'Overview'
    },
    {
      id: 'projects',
      title: 'Projects',
      icon: <FiFolder size={20} />,
      description: 'Manage all projects and portfolios',
      path: '/admin/projects/pages/projects',
      category: 'Project Management'
    },
    {
      id: 'moderation',
      title: 'Project Moderation',
      icon: <FiCheckCircle size={20} />,
      description: 'Review and approve project submissions',
      path: '/admin/projects/pages/moderation',
      category: 'Project Management'
    },
    {
      id: 'tasks',
      title: 'Tasks & Workflows',
      icon: <FiCheckSquare size={20} />,
      description: 'Task management and workflow oversight',
      path: '/admin/projects/pages/tasks',
      category: 'Project Management'
    },
    {
      id: 'users',
      title: 'Users & Teams',
      icon: <FiUsers size={20} />,
      description: 'User management and team administration',
      path: '/admin/projects/pages/users',
      category: 'Team & Users'
    },
    {
      id: 'content',
      title: 'Content Management',
      icon: <FiFileText size={20} />,
      description: 'Advanced file management and storage',
      path: '/admin/projects/pages/content',
      category: 'Content & Files'
    },
    {
      id: 'files',
      title: 'Files & Documents',
      icon: <FiFileText size={20} />,
      description: 'File management and document oversight',
      path: '/admin/projects/pages/files',
      category: 'Content & Files'
    },
    {
      id: 'communication',
      title: 'Communication',
      icon: <FiMessageSquare size={20} />,
      description: 'Messages, discussions, and collaboration',
      path: '/admin/projects/pages/communication',
      category: 'Communication'
    },
    {
      id: 'meetings',
      title: 'Meetings & Calls',
      icon: <FiVideo size={20} />,
      description: 'Meeting management and video calls',
      path: '/admin/projects/pages/meetings',
      category: 'Communication'
    },
    {
      id: 'analytics',
      title: 'Analytics & Insights',
      icon: <FiBarChart2 size={20} />,
      description: 'Project analytics and performance metrics',
      path: '/admin/projects/pages/analytics',
      category: 'Analytics & Reports'
    },
    {
      id: 'reports',
      title: 'Reports',
      icon: <FiTrendingUp size={20} />,
      description: 'Project reports and detailed analytics',
      path: '/admin/projects/pages/reports',
      category: 'Analytics & Reports'
    },
    {
      id: 'automation',
      title: 'Automation',
      icon: <FiZap size={20} />,
      description: 'Workflow automation and triggers',
      path: '/admin/projects/pages/automation',
      category: 'System & Security'
    },
    {
      id: 'tools',
      title: 'Admin Tools',
      icon: <FiTool size={20} />,
      description: 'Administrative tools and utilities',
      path: '/admin/projects/pages/tools',
      category: 'System & Security'
    },
    {
      id: 'security',
      title: 'Security & Compliance',
      icon: <FiShield size={20} />,
      description: 'Security settings and compliance monitoring',
      path: '/admin/projects/pages/security',
      category: 'System & Security'
    },
    {
      id: 'system',
      title: 'System Monitoring',
      icon: <FiMonitor size={20} />,
      description: 'System health and performance monitoring',
      path: '/admin/projects/pages/system',
      category: 'System & Security'
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: <FiBell size={20} />,
      description: 'Notification management and settings',
      path: '/admin/projects/pages/notifications',
      category: 'System & Security'
    },
    {
      id: 'marketing',
      title: 'Marketing Tools',
      icon: <FiTrendingUp size={20} />,
      description: 'Promote projects and manage campaigns',
      path: '/admin/projects/pages/marketing',
      category: 'System & Security'
    },
    {
      id: 'financial',
      title: 'Financial Management',
      icon: <FiDollarSign size={20} />,
      description: 'Revenue tracking, billing, and payments',
      path: '/admin/projects/pages/financial',
      category: 'System & Security'
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: <FiSettings size={20} />,
      description: 'System configuration and preferences',
      path: '/admin/projects/pages/settings',
      category: 'System & Security'
    }
  ];

  const categories = [
    'Overview',
    'Project Management',
    'Team & Users',
    'Content & Files',
    'Communication',
    'Analytics & Reports',
    'System & Security'
  ];

  const filteredItems = sidebarItems.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Overview': 'from-blue-500 to-blue-600',
      'Project Management': 'from-emerald-500 to-emerald-600',
      'Team & Users': 'from-purple-500 to-purple-600',
      'Content & Files': 'from-orange-500 to-orange-600',
      'Communication': 'from-pink-500 to-pink-600',
      'Analytics & Reports': 'from-indigo-500 to-indigo-600',
      'System & Security': 'from-red-500 to-red-600'
    };

    return colors[category] || 'from-gray-500 to-gray-600';
  };

  return (
    <>
      <aside
        className={`fixed inset-y-0 left-0 z-40 bg-white border-r border-gray-200 shadow-sm transition-all duration-300 ease-in-out flex flex-col
          ${sidebarCollapsed ? 'w-20' : 'w-72'}`}
      >
        {/* Header */}
        <div className="flex-shrink-0 h-21 px-4 flex items-center justify-between border-b border-gray-200/80 bg-gradient-to-r from-blue-50/50 to-purple-50/50">
          {!sidebarCollapsed && (
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <div>
                <div className="font-semibold text-gray-900 text-sm">Project Admin</div>
                <div className="text-xs text-gray-500">Project Management</div>
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

        {/* Search Bar */}
        {!sidebarCollapsed && (
          <div className="px-3 py-3 border-b border-gray-100">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-2 pl-9 pr-4 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all outline-none text-sm text-gray-700 placeholder-gray-400"
              />
              <FiSearch className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          </div>
        )}

        {/* Navigation - Scrollable */}
        <nav className="flex-1 px-3 py-2 overflow-y-auto custom-scrollbar">
          <div className="space-y-1">
            {categories.map((category) => {
              const categoryItems = filteredItems.filter(item => item.category === category);
              if (categoryItems.length === 0) return null;

              const isExpanded = expandedCategories.includes(category);
              const hasActiveItem = categoryItems.some(item => pathname === item.path);

              return (
                <div key={category} className="mb-3">
                  {!sidebarCollapsed && (
                    <div
                      className="flex items-center justify-between px-3 py-2 text-xs font-semibold cursor-pointer group"
                      onClick={() => toggleCategory(category)}
                    >
                      <span className={`bg-gradient-to-r ${getCategoryColor(category)} bg-clip-text text-transparent uppercase tracking-wide`}>
                        {category}
                      </span>
                      <div className="h-5 w-5 rounded-md flex items-center justify-center transition-all duration-300 bg-gray-50 hover:bg-gray-100">
                        <svg
                          className={`h-3 w-3 text-gray-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  )}
                  
                  {sidebarCollapsed && <div className="my-2 border-t border-gray-200 mx-2" />}
                  
                  <div className={`space-y-0.5 ${!sidebarCollapsed && !isExpanded ? 'hidden' : ''}`}>
                    {categoryItems.map((item) => {
                      const isActive = pathname === item.path || (item.id === 'dashboard' && pathname === '/admin/projects');

                      return (
                        <Link
                          key={item.id}
                          href={item.path}
                          className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'justify-start'} px-3 py-2.5 rounded-lg transition-all duration-200 relative group
                            ${isActive
                              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md shadow-blue-200'
                              : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'}`}
                          onMouseEnter={() => setHoveredItem(item.id)}
                          onMouseLeave={() => setHoveredItem(null)}
                        >
                          <div className={`flex items-center ${!sidebarCollapsed ? 'w-full' : ''}`}>
                            <div
                              className={`relative flex-shrink-0 transition-all duration-200
                                ${hoveredItem === item.id && !isActive ? 'transform scale-110' : ''}`}
                            >
                              {item.icon}
                            </div>
                            
                            {!sidebarCollapsed && (
                              <div className="ml-3 flex-1 min-w-0">
                                <div className={`text-sm font-medium truncate ${hoveredItem === item.id ? 'font-semibold' : ''}`}>
                                  {item.title}
                                </div>
                                <div className={`text-xs truncate ${
                                  isActive
                                    ? 'text-blue-100' 
                                    : 'text-gray-500'
                                }`}>
                                  {item.description}
                                </div>
                              </div>
                            )}
                          </div>
                          
                          {!sidebarCollapsed && isActive && (
                            <div className="inline-flex h-1.5 w-1.5 rounded-full bg-white" />
                          )}
                          
                          {isActive && (
                            <div className="absolute left-0 top-1/2 w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-r-md transform -translate-y-1/2 shadow-sm" />
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="flex-shrink-0 px-4 py-3 border-t border-gray-200/80 bg-gray-50/30">
          {!sidebarCollapsed ? (
            <div className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center">
                <span className="text-white font-semibold text-xs">A</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">Admin User</div>
                <div className="text-xs text-gray-500 truncate">Project Administrator</div>
              </div>
              <button className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200">
                <FiLogOut size={16} />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center">
                <span className="text-white font-semibold text-xs">A</span>
              </div>
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200">
                <FiLogOut size={16} />
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Content Spacer */}
      <div className={`transition-all duration-300 ease-in-out ${sidebarCollapsed ? 'ml-20' : 'ml-72'}`} />

      {/* Custom Scrollbar Styles */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.3);
        }
      `}</style>
    </>
  );
};

export default ProjectAdminSidebar;

