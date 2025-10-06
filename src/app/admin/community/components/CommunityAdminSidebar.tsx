"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FiChevronLeft, 
  FiChevronRight, 
  FiHome,
  FiUsers,
  FiMessageSquare,
  FiCalendar,
  FiMapPin,
  FiAward,
  FiTrendingUp,
  FiBarChart2,
  FiSettings,
  FiSearch,
  FiLogOut,
  FiMonitor,
  FiBell,
  FiGift,
  FiShield,
  FiUserPlus,
  FiLayers,
  FiVideo,
  FiZap,
  FiFileText,
  FiActivity,
  FiUsers as FiGroup,
  FiMessageCircle,
  FiEdit3,
} from 'react-icons/fi';

interface CommunityAdminSidebarProps {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

const CommunityAdminSidebar: React.FC<CommunityAdminSidebarProps> = ({ sidebarCollapsed, setSidebarCollapsed }) => {
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<string[]>([
    'Overview',
    'User Management',
    'Content & Posts',
    'Groups & Communities',
    'Events & Activities',
    'Communication',
    'Gamification',
    'Analytics & Insights',
    'System & Security'
  ]);

  const sidebarItems = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: <FiHome size={20} />,
      description: 'Community overview and key metrics',
      path: '/admin/community',
      category: 'Overview'
    },
    {
      id: 'users',
      title: 'User Management',
      icon: <FiUsers size={20} />,
      description: 'Manage community members and profiles',
      path: '/admin/community/users',
      category: 'User Management'
    },
    {
      id: 'groups',
      title: 'Groups & Communities',
      icon: <FiGroup size={20} />,
      description: 'Manage groups and community spaces',
      path: '/admin/community/groups',
      category: 'Groups & Communities'
    },
    {
      id: 'events',
      title: 'Events Management',
      icon: <FiCalendar size={20} />,
      description: 'Create and manage community events',
      path: '/admin/community/events',
      category: 'Events & Activities'
    },
    {
      id: 'posts',
      title: 'Posts Management',
      icon: <FiFileText size={20} />,
      description: 'Manage and moderate community posts',
      path: '/admin/community/posts',
      category: 'Content & Posts'
    },
    {
      id: 'discussions',
      title: 'Discussions Management',
      icon: <FiMessageCircle size={20} />,
      description: 'Manage discussion threads and forums',
      path: '/admin/community/discussions',
      category: 'Content & Posts'
    },
    {
      id: 'moderation',
      title: 'Content Moderation',
      icon: <FiShield size={20} />,
      description: 'Review and moderate community content',
      path: '/admin/community/moderation',
      category: 'Content & Posts'
    },
    {
      id: 'cms',
      title: 'Content Management',
      icon: <FiEdit3 size={20} />,
      description: 'Manage community content and announcements',
      path: '/admin/community/cms',
      category: 'Content & Posts'
    },
    {
      id: 'media',
      title: 'Media Management',
      icon: <FiFileText size={20} />,
      description: 'Manage community media files and uploads',
      path: '/admin/community/media',
      category: 'Content & Posts'
    },
    {
      id: 'rooms',
      title: 'Audio/Video Rooms',
      icon: <FiVideo size={20} />,
      description: 'Manage hangout rooms and live sessions',
      path: '/admin/community/rooms',
      category: 'Communication'
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: <FiBell size={20} />,
      description: 'Manage notification settings and delivery',
      path: '/admin/community/notifications',
      category: 'Communication'
    },
    {
      id: 'polls',
      title: 'Polls & Surveys',
      icon: <FiBarChart2 size={20} />,
      description: 'Create and manage community polls',
      path: '/admin/community/polls',
      category: 'Events & Activities'
    },
    {
      id: 'collaboration',
      title: 'Collaboration Tools',
      icon: <FiLayers size={20} />,
      description: 'Manage whiteboards and collaborative spaces',
      path: '/admin/community/collaboration',
      category: 'Events & Activities'
    },
    {
      id: 'mentorship',
      title: 'Mentorship Program',
      icon: <FiUserPlus size={20} />,
      description: 'Manage mentorship relationships and programs',
      path: '/admin/community/mentorship',
      category: 'Events & Activities'
    },
    {
      id: 'gamification',
      title: 'Gamification',
      icon: <FiAward size={20} />,
      description: 'Manage badges, points, and rewards system',
      path: '/admin/community/gamification',
      category: 'Gamification'
    },
    {
      id: 'analytics',
      title: 'Analytics & Insights',
      icon: <FiBarChart2 size={20} />,
      description: 'Community analytics and performance metrics',
      path: '/admin/community/analytics',
      category: 'Analytics & Insights'
    },
    {
      id: 'reports',
      title: 'Reports Management',
      icon: <FiFileText size={20} />,
      description: 'Generate and manage community reports',
      path: '/admin/community/reports',
      category: 'Analytics & Insights'
    },
    {
      id: 'location',
      title: 'Location Services',
      icon: <FiMapPin size={20} />,
      description: 'Manage location-based features and maps',
      path: '/admin/community/location',
      category: 'System & Security'
    },
    {
      id: 'security',
      title: 'Security & Compliance',
      icon: <FiShield size={20} />,
      description: 'Security settings and compliance monitoring',
      path: '/admin/community/security',
      category: 'System & Security'
    },
    {
      id: 'system',
      title: 'System Monitoring',
      icon: <FiMonitor size={20} />,
      description: 'System health and performance monitoring',
      path: '/admin/community/system',
      category: 'System & Security'
    },
    {
      id: 'tools',
      title: 'Admin Tools',
      icon: <FiZap size={20} />,
      description: 'Advanced tools for platform management',
      path: '/admin/community/tools',
      category: 'System & Security'
    },
    {
      id: 'configuration',
      title: 'System Configuration',
      icon: <FiSettings size={20} />,
      description: 'Platform settings and configuration',
      path: '/admin/community/configuration',
      category: 'System & Security'
    },
    
  ];

  const groupedItems = [
    { 
      category: 'Overview', 
      items: sidebarItems.filter(item => item.category === 'Overview') 
    },
    { 
      category: 'User Management', 
      items: sidebarItems.filter(item => item.category === 'User Management') 
    },
    { 
      category: 'Content & Posts', 
      items: sidebarItems.filter(item => item.category === 'Content & Posts') 
    },
    { 
      category: 'Groups & Communities', 
      items: sidebarItems.filter(item => item.category === 'Groups & Communities') 
    },
    { 
      category: 'Events & Activities', 
      items: sidebarItems.filter(item => item.category === 'Events & Activities') 
    },
    { 
      category: 'Communication', 
      items: sidebarItems.filter(item => item.category === 'Communication') 
    },
    { 
      category: 'Gamification', 
      items: sidebarItems.filter(item => item.category === 'Gamification') 
    },
    { 
      category: 'Analytics & Insights', 
      items: sidebarItems.filter(item => item.category === 'Analytics & Insights') 
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
      'Overview': 'from-blue-500 to-cyan-600',
      'User Management': 'from-purple-500 to-violet-600',
      'Content & Posts': 'from-green-500 to-emerald-600',
      'Groups & Communities': 'from-orange-500 to-amber-600',
      'Events & Activities': 'from-pink-500 to-rose-600',
      'Communication': 'from-indigo-500 to-blue-600',
      'Gamification': 'from-yellow-500 to-orange-600',
      'Analytics & Insights': 'from-teal-500 to-cyan-600',
      'System & Security': 'from-red-500 to-pink-600',
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
        <div className="flex-shrink-0 h-21 px-4 flex items-center justify-between border-b border-gray-200/80 bg-gradient-to-r from-blue-50/50 to-cyan-50/50">
          {!sidebarCollapsed && (
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <div>
                <div className="font-semibold text-gray-900 text-sm">Community Admin</div>
                <div className="text-xs text-gray-500">Social Platform</div>
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
                        ${pathname === item.path || (item.id === 'dashboard' && pathname === '/admin/community')
                          ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-md shadow-blue-200'
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
                              pathname === item.path || (item.id === 'dashboard' && pathname === '/admin/community')
                                ? 'text-blue-100' 
                                : 'text-gray-500'
                            }`}>
                              {item.description}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {!sidebarCollapsed && (pathname === item.path || (item.id === 'dashboard' && pathname === '/admin/community')) && (
                        <div className="inline-flex h-1.5 w-1.5 rounded-full bg-white" />
                      )}
                      
                      {(pathname === item.path || (item.id === 'dashboard' && pathname === '/admin/community')) && (
                        <div className="absolute left-0 top-1/2 w-1 h-8 bg-gradient-to-b from-blue-500 to-cyan-600 rounded-r-md transform -translate-y-1/2 shadow-sm" />
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
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-sm ring-2 ring-blue-100">
                  <span className="text-sm font-bold text-white">CA</span>
                </div>
                <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-400 border-2 border-white" />
              </div>
              
              {!sidebarCollapsed && (
                <div className="ml-3 flex-1 min-w-0">
                  <p className="font-medium text-gray-900 text-sm truncate">Community Admin</p>
                  <p className="text-xs text-gray-500 truncate">Platform Manager</p>
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
              className="w-full mt-3 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 flex items-center justify-center font-medium border border-blue-200 hover:border-blue-300"
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

export default CommunityAdminSidebar;
