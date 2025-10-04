"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FiChevronLeft, 
  FiChevronRight, 
  FiHome,
  FiFileText,
  FiUsers,
  FiTag,
  FiImage,
  FiMessageSquare,
  FiMapPin,
  FiBookOpen,
  FiRss,
  FiMail,
  FiBarChart2,
  FiZap,
  FiShield,
  FiMonitor,
  FiTrendingUp,
  FiCheckCircle,
  FiUserPlus,
  FiSettings,
  FiSearch,
  FiLogOut
} from 'react-icons/fi';

interface AdminSidebarProps {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ sidebarCollapsed, setSidebarCollapsed }) => {
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<string[]>([
    'Overview',
    'Content Management',
    'Organization',
    'Engagement',
    'Marketing',
    'Analytics & Reports',
    'System & Security'
  ]);

  const sidebarItems = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: <FiHome size={20} />,
      description: 'Overview and key metrics',
      path: '/admin/blog',
      category: 'Overview'
    },
    {
      id: 'posts',
      title: 'Posts & Content',
      icon: <FiFileText size={20} />,
      description: 'Manage blog posts, drafts, and content',
      path: '/admin/blog/pages/posts',
      category: 'Content Management'
    },
    {
      id: 'authors',
      title: 'Authors & Writers',
      icon: <FiUsers size={20} />,
      description: 'Manage authors, writers, and permissions',
      path: '/admin/blog/pages/authors',
      category: 'Content Management'
    },
    {
      id: 'teams',
      title: 'Teams & Collaboration',
      icon: <FiUsers size={20} />,
      description: 'Team blogs, roles, and collaboration',
      path: '/admin/blog/pages/teams',
      category: 'Content Management'
    },
    {
      id: 'categories',
      title: 'Categories & Tags',
      icon: <FiTag size={20} />,
      description: 'Organize content with categories and tags',
      path: '/admin/blog/pages/categories',
      category: 'Organization'
    },
    {
      id: 'media',
      title: 'Media Library',
      icon: <FiImage size={20} />,
      description: 'Images, videos, and media files',
      path: '/admin/blog/pages/media',
      category: 'Organization'
    },
    {
      id: 'series',
      title: 'Blog Series',
      icon: <FiBookOpen size={20} />,
      description: 'Manage blog series and collections',
      path: '/admin/blog/pages/series',
      category: 'Organization'
    },
    {
      id: 'locations',
      title: 'Location & Maps',
      icon: <FiMapPin size={20} />,
      description: 'Location-based content and mapping',
      path: '/admin/blog/pages/locations',
      category: 'Organization'
    },
    {
      id: 'comments',
      title: 'Comments & Engagement',
      icon: <FiMessageSquare size={20} />,
      description: 'Moderate comments and user engagement',
      path: '/admin/blog/pages/comments',
      category: 'Engagement'
    },
    {
      id: 'moderation',
      title: 'Content Moderation',
      icon: <FiCheckCircle size={20} />,
      description: 'Review, approve, and moderate content',
      path: '/admin/blog/pages/moderation',
      category: 'Engagement'
    },
    {
      id: 'followers',
      title: 'Followers & Social',
      icon: <FiUserPlus size={20} />,
      description: 'User followers and social features',
      path: '/admin/blog/pages/followers',
      category: 'Engagement'
    },
    {
      id: 'newsletter',
      title: 'Newsletter',
      icon: <FiMail size={20} />,
      description: 'Email campaigns and subscribers',
      path: '/admin/blog/pages/newsletter',
      category: 'Marketing'
    },
    {
      id: 'rss',
      title: 'RSS & Feeds',
      icon: <FiRss size={20} />,
      description: 'RSS feeds and content syndication',
      path: '/admin/blog/pages/res',
      category: 'Marketing'
    },
    {
      id: 'analytics',
      title: 'Analytics & Insights',
      icon: <FiTrendingUp size={20} />,
      description: 'Performance metrics and analytics',
      path: '/admin/blog/pages/analytics',
      category: 'Analytics & Reports'
    },
    {
      id: 'reports',
      title: 'Reports',
      icon: <FiBarChart2 size={20} />,
      description: 'Content reports and analytics',
      path: '/admin/blog/pages/reports',
      category: 'Analytics & Reports'
    },
    {
      id: 'automation',
      title: 'Automation',
      icon: <FiZap size={20} />,
      description: 'Automated workflows and tasks',
      path: '/admin/blog/pages/automation',
      category: 'System & Security'
    },
    {
      id: 'security',
      title: 'Security',
      icon: <FiShield size={20} />,
      description: 'Security settings and compliance',
      path: '/admin/blog/pages/security',
      category: 'System & Security'
    },
    {
      id: 'system',
      title: 'System',
      icon: <FiMonitor size={20} />,
      description: 'System monitoring and health',
      path: '/admin/blog/pages/system',
      category: 'System & Security'
    },
    {
      id: 'settings',
      title: 'Settings & Configuration',
      icon: <FiSettings size={20} />,
      description: 'Blog settings, notifications, and preferences',
      path: '/admin/blog/pages/settings',
      category: 'System & Security'
    }
  ];

  const groupedItems = [
    { 
      category: 'Overview', 
      items: sidebarItems.filter(item => item.category === 'Overview') 
    },
    { 
      category: 'Content Management', 
      items: sidebarItems.filter(item => item.category === 'Content Management') 
    },
    { 
      category: 'Organization', 
      items: sidebarItems.filter(item => item.category === 'Organization') 
    },
    { 
      category: 'Engagement', 
      items: sidebarItems.filter(item => item.category === 'Engagement') 
    },
    { 
      category: 'Marketing', 
      items: sidebarItems.filter(item => item.category === 'Marketing') 
    },
    { 
      category: 'Analytics & Reports', 
      items: sidebarItems.filter(item => item.category === 'Analytics & Reports') 
    },
    { 
      category: 'System & Security', 
      items: sidebarItems.filter(item => item.category === 'System & Security') 
    },
  ];

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const filteredGroupedItems = groupedItems
    .map(group => ({
      ...group,
      items: group.items.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter(group => group.items.length > 0 || sidebarCollapsed);

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Overview': 'from-emerald-500 to-teal-600',
      'Content Management': 'from-blue-500 to-indigo-600',
      'Organization': 'from-violet-500 to-purple-600',
      'Engagement': 'from-pink-500 to-rose-600',
      'Marketing': 'from-orange-500 to-amber-600',
      'Analytics & Reports': 'from-cyan-500 to-blue-600',
      'System & Security': 'from-slate-600 to-gray-700',
    };
    return colors[category] || 'from-gray-500 to-gray-600';
  };

  return (
    <>
      <aside
        className={`fixed inset-y-0 left-0 z-40 bg-white border-r border-gray-200/80 shadow-sm transition-all duration-300 ease-in-out flex flex-col
          ${sidebarCollapsed ? 'w-20' : 'w-72'}`}
      >
        {/* Header */}
        <div className="flex-shrink-0 h-21 px-4 flex items-center justify-between border-b border-gray-200/80 bg-gradient-to-r from-emerald-50/50 to-teal-50/50">
          {!sidebarCollapsed && (
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-sm">B</span>
              </div>
              <div>
                <div className="font-semibold text-gray-900 text-sm">Blog Admin</div>
                <div className="text-xs text-gray-500">Content Management</div>
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
                className="w-full py-2 pl-9 pr-4 rounded-lg bg-gray-50 border border-gray-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all outline-none text-sm text-gray-700 placeholder-gray-400"
              />
              <FiSearch className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          </div>
        )}

        {/* Navigation - Scrollable */}
        <nav className="flex-1 px-3 py-2 overflow-y-auto custom-scrollbar">
          <div className="space-y-1">
            {filteredGroupedItems.map((group) => (
              <div key={group.category} className="mb-3">
                {!sidebarCollapsed && (
                  <div
                    className="flex items-center justify-between px-3 py-2 text-xs font-semibold cursor-pointer group"
                    onClick={() => toggleCategory(group.category)}
                  >
                    <span className={`bg-gradient-to-r ${getCategoryColor(group.category)} bg-clip-text text-transparent uppercase tracking-wide`}>
                      {group.category}
                    </span>
                    <div className="h-5 w-5 rounded-md flex items-center justify-center transition-all duration-300 bg-gray-50 hover:bg-gray-100">
                      <svg
                        className={`h-3 w-3 text-gray-500 transition-transform ${expandedCategories.includes(group.category) ? 'rotate-180' : ''}`}
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
                
                <div className={`space-y-0.5 ${!sidebarCollapsed && !expandedCategories.includes(group.category) ? 'hidden' : ''}`}>
                  {group.items.map((item) => (
                    <Link
                      key={item.id}
                      href={item.path}
                      className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'justify-start'} px-3 py-2.5 rounded-lg transition-all duration-200 relative group
                        ${pathname === item.path || (item.id === 'dashboard' && pathname === '/admin/blog')
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-200'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'}`}
                      onMouseEnter={() => setHoveredItem(item.id)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <div className={`flex items-center ${!sidebarCollapsed ? 'w-full' : ''}`}>
                        <div
                          className={`relative flex-shrink-0 transition-all duration-200
                            ${hoveredItem === item.id && pathname !== item.path ? 'transform scale-110' : ''}`}
                        >
                          {item.icon}
                        </div>
                        
                        {!sidebarCollapsed && (
                          <div className="ml-3 flex-1 min-w-0">
                            <div className={`text-sm font-medium truncate ${hoveredItem === item.id ? 'font-semibold' : ''}`}>
                              {item.title}
                            </div>
                            <div className={`text-xs truncate ${
                              pathname === item.path || (item.id === 'dashboard' && pathname === '/admin/blog')
                                ? 'text-emerald-100' 
                                : 'text-gray-500'
                            }`}>
                              {item.description}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {!sidebarCollapsed && (pathname === item.path || (item.id === 'dashboard' && pathname === '/admin/blog')) && (
                        <div className="inline-flex h-1.5 w-1.5 rounded-full bg-white" />
                      )}
                      
                      {(pathname === item.path || (item.id === 'dashboard' && pathname === '/admin/blog')) && (
                        <div className="absolute left-0 top-1/2 w-1 h-8 bg-gradient-to-b from-emerald-500 to-teal-600 rounded-r-md transform -translate-y-1/2 shadow-sm" />
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </nav>

        {/* User Profile - Fixed at bottom */}
        <div className="flex-shrink-0 p-4 border-t border-gray-200/80 bg-gradient-to-b from-white to-gray-50/50">
          <div className={`flex ${sidebarCollapsed ? 'flex-col items-center' : 'items-center justify-between'}`}>
            <div className={`flex items-center ${sidebarCollapsed ? 'flex-col' : ''}`}>
              <div className="relative">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-sm ring-2 ring-emerald-100">
                  <span className="text-sm font-bold text-white">BA</span>
                </div>
                <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-400 border-2 border-white" />
              </div>
              
              {!sidebarCollapsed && (
                <div className="ml-3 flex-1 min-w-0">
                  <p className="font-medium text-gray-900 text-sm truncate">Blog Admin</p>
                  <p className="text-xs text-gray-500 truncate">Content Manager</p>
                </div>
              )}
            </div>
            
            <button 
              className={`p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors ${sidebarCollapsed ? 'mt-2' : ''}`}
              title="Logout"
            >
              <FiLogOut size={18} />
            </button>
          </div>
          
          {!sidebarCollapsed && (
            <Link
              href="/admin"
              className="w-full mt-3 px-3 py-2 text-sm text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all duration-200 flex items-center justify-center font-medium border border-emerald-200 hover:border-emerald-300"
            >
              ← Back to Main Admin
            </Link>
          )}
        </div>
      </aside>

      {/* Content Spacer */}
      <div className={`transition-all duration-300 ease-in-out ${sidebarCollapsed ? 'ml-20' : 'ml-72'}`}>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(16, 185, 129, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(16, 185, 129, 0.3);
        }
      `}</style>
    </>
  );
};

export default AdminSidebar;
