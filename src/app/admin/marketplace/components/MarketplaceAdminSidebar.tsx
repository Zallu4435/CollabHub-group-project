"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FiChevronLeft, 
  FiChevronRight, 
  FiHome,
  FiShoppingBag,
  FiUsers,
  FiTag,
  FiFileText,
  FiMessageSquare,
  FiDollarSign,
  FiShield,
  FiBarChart2,
  FiZap,
  FiSettings,
  FiSearch,
  FiLogOut,
  FiTrendingUp,
  FiMonitor,
  FiTool,
  FiBell,
  FiStar,
  FiHelpCircle,
  FiGift,
  FiCreditCard,
  FiAlertTriangle,
  FiImage,
  FiCheckCircle,
  FiMail,
  FiHeart,
  FiFileText as FiInvoice,
  FiAward,
  FiUserPlus,
  FiShare2,
  FiLayers
} from 'react-icons/fi';

interface MarketplaceAdminSidebarProps {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

const MarketplaceAdminSidebar: React.FC<MarketplaceAdminSidebarProps> = ({ sidebarCollapsed, setSidebarCollapsed }) => {
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<string[]>([
    'Overview',
    'Product Management',
    'User Management',
    'Financial Operations',
    'Content & Media',
    'Customer Support',
    'Marketing & Promotions',
    'Analytics & Reports',
    'System & Security'
  ]);

  const sidebarItems = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: <FiHome size={20} />,
      description: 'Overview and key metrics',
      path: '/admin/marketplace',
      category: 'Overview'
    },
    {
      id: 'products',
      title: 'Products & Services',
      icon: <FiShoppingBag size={20} />,
      description: 'Manage products, services, and listings',
      path: '/admin/marketplace/pages/products',
      category: 'Product Management'
    },
    {
      id: 'categories',
      title: 'Categories & Tags',
      icon: <FiTag size={20} />,
      description: 'Organize products with categories and tags',
      path: '/admin/marketplace/pages/categories',
      category: 'Product Management'
    },
    {
      id: 'comparison',
      title: 'Comparison Tools',
      icon: <FiLayers size={20} />,
      description: 'Product comparison settings and analytics',
      path: '/admin/marketplace/pages/comparison',
      category: 'Product Management'
    },
    {
      id: 'sellers',
      title: 'Sellers & Vendors',
      icon: <FiUsers size={20} />,
      description: 'Manage sellers, vendors, and merchant accounts',
      path: '/admin/marketplace/pages/sellers',
      category: 'User Management'
    },
    {
      id: 'buyers',
      title: 'Buyers & Customers',
      icon: <FiUsers size={20} />,
      description: 'Customer management and buyer accounts',
      path: '/admin/marketplace/pages/buyers',
      category: 'User Management'
    },
    {
      id: 'wishlists',
      title: 'Wishlist Management',
      icon: <FiHeart size={20} />,
      description: 'Manage user wishlists and preferences',
      path: '/admin/marketplace/pages/wishlists',
      category: 'User Management'
    },
    {
      id: 'transactions',
      title: 'Transactions & Payments',
      icon: <FiDollarSign size={20} />,
      description: 'Payment processing and transaction management',
      path: '/admin/marketplace/pages/transactions',
      category: 'Financial Operations'
    },
    {
      id: 'escrow',
      title: 'Escrow & Disputes',
      icon: <FiShield size={20} />,
      description: 'Escrow services and dispute resolution',
      path: '/admin/marketplace/pages/disputes',
      category: 'Financial Operations'
    },
    {
      id: 'coins',
      title: 'Coin System',
      icon: <FiDollarSign size={20} />,
      description: 'Manage coin economy and rewards',
      path: '/admin/marketplace/pages/coins',
      category: 'Financial Operations'
    },
    {
      id: 'tax',
      title: 'Tax Management',
      icon: <FiDollarSign size={20} />,
      description: 'Tax calculations and compliance',
      path: '/admin/marketplace/pages/tax',
      category: 'Financial Operations'
    },
    {
      id: 'invoices',
      title: 'Invoice Management',
      icon: <FiInvoice size={20} />,
      description: 'Generate and manage invoices',
      path: '/admin/marketplace/pages/invoices',
      category: 'Financial Operations'
    },
    {
      id: 'files',
      title: 'Files & Assets',
      icon: <FiFileText size={20} />,
      description: 'Digital assets and file management',
      path: '/admin/marketplace/pages/files',
      category: 'Content & Media'
    },
    {
      id: 'media',
      title: 'Media Library',
      icon: <FiImage size={20} />,
      description: 'Manage product images and videos',
      path: '/admin/marketplace/pages/media',
      category: 'Content & Media'
    },
    {
      id: 'moderation',
      title: 'Content Moderation',
      icon: <FiCheckCircle size={20} />,
      description: 'Approve and moderate products',
      path: '/admin/marketplace/pages/moderation',
      category: 'Content & Media'
    },
    {
      id: 'reviews',
      title: 'Reviews & Feedback',
      icon: <FiStar size={20} />,
      description: 'Product reviews and customer feedback',
      path: '/admin/marketplace/pages/reviews',
      category: 'Content & Media'
    },
    {
      id: 'help-center',
      title: 'Help Center',
      icon: <FiHelpCircle size={20} />,
      description: 'Customer support and help documentation',
      path: '/admin/marketplace/pages/help-center',
      category: 'Customer Support'
    },
    {
      id: 'messaging',
      title: 'Messaging System',
      icon: <FiMessageSquare size={20} />,
      description: 'Monitor buyer-seller communications',
      path: '/admin/marketplace/pages/messaging',
      category: 'Customer Support'
    },
    {
      id: 'marketing',
      title: 'Marketing & Promotions',
      icon: <FiTrendingUp size={20} />,
      description: 'Marketing campaigns and promotional activities',
      path: '/admin/marketplace/pages/marketing',
      category: 'Marketing & Promotions'
    },
    {
      id: 'rewards',
      title: 'Rewards & Gamification',
      icon: <FiGift size={20} />,
      description: 'Loyalty programs and gamification features',
      path: '/admin/marketplace/pages/rewards',
      category: 'Marketing & Promotions'
    },
    {
      id: 'achievements',
      title: 'Achievement System',
      icon: <FiAward size={20} />,
      description: 'Manage user achievements and badges',
      path: '/admin/marketplace/pages/achievements',
      category: 'Marketing & Promotions'
    },
    {
      id: 'referrals',
      title: 'Referral Management',
      icon: <FiUserPlus size={20} />,
      description: 'Referral tracking and commission management',
      path: '/admin/marketplace/pages/referrals',
      category: 'Marketing & Promotions'
    },
    {
      id: 'social',
      title: 'Social Features',
      icon: <FiShare2 size={20} />,
      description: 'Social media integration and sharing',
      path: '/admin/marketplace/pages/social',
      category: 'Marketing & Promotions'
    },
    {
      id: 'analytics',
      title: 'Analytics & Insights',
      icon: <FiBarChart2 size={20} />,
      description: 'Sales analytics and performance metrics',
      path: '/admin/marketplace/pages/analytics',
      category: 'Analytics & Reports'
    },
    {
      id: 'reports',
      title: 'Reports',
      icon: <FiTrendingUp size={20} />,
      description: 'Financial reports and detailed analytics',
      path: '/admin/marketplace/pages/reports',
      category: 'Analytics & Reports'
    },
    {
      id: 'automation',
      title: 'Automation',
      icon: <FiZap size={20} />,
      description: 'Workflow automation and business processes',
      path: '/admin/marketplace/pages/automation',
      category: 'System & Security'
    },
    {
      id: 'security',
      title: 'Security & Compliance',
      icon: <FiShield size={20} />,
      description: 'Security settings and compliance monitoring',
      path: '/admin/marketplace/pages/security',
      category: 'System & Security'
    },
    {
      id: 'system',
      title: 'System Monitoring',
      icon: <FiMonitor size={20} />,
      description: 'System health and performance monitoring',
      path: '/admin/marketplace/pages/system',
      category: 'System & Security'
    },
    {
      id: 'notifications',
      title: 'Notification Management',
      icon: <FiBell size={20} />,
      description: 'Manage notification templates and delivery',
      path: '/admin/marketplace/pages/notifications',
      category: 'System & Security'
    },
    {
      id: 'settings',
      title: 'Settings & Configuration',
      icon: <FiSettings size={20} />,
      description: 'Platform settings and configuration',
      path: '/admin/marketplace/pages/settings',
      category: 'System & Security'
    }
  ];

  const groupedItems = [
    { 
      category: 'Overview', 
      items: sidebarItems.filter(item => item.category === 'Overview') 
    },
    { 
      category: 'Product Management', 
      items: sidebarItems.filter(item => item.category === 'Product Management') 
    },
    { 
      category: 'User Management', 
      items: sidebarItems.filter(item => item.category === 'User Management') 
    },
    { 
      category: 'Financial Operations', 
      items: sidebarItems.filter(item => item.category === 'Financial Operations') 
    },
    { 
      category: 'Content & Media', 
      items: sidebarItems.filter(item => item.category === 'Content & Media') 
    },
    { 
      category: 'Customer Support', 
      items: sidebarItems.filter(item => item.category === 'Customer Support') 
    },
    { 
      category: 'Marketing & Promotions', 
      items: sidebarItems.filter(item => item.category === 'Marketing & Promotions') 
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
      'Overview': 'from-orange-500 to-amber-600',
      'Product Management': 'from-blue-500 to-indigo-600',
      'User Management': 'from-purple-500 to-violet-600',
      'Financial Operations': 'from-green-500 to-emerald-600',
      'Content & Media': 'from-pink-500 to-rose-600',
      'Customer Support': 'from-cyan-500 to-teal-600',
      'Marketing & Promotions': 'from-yellow-500 to-orange-600',
      'Analytics & Reports': 'from-indigo-500 to-blue-600',
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
        <div className="flex-shrink-0 h-21 px-4 flex items-center justify-between border-b border-gray-200/80 bg-gradient-to-r from-orange-50/50 to-amber-50/50">
          {!sidebarCollapsed && (
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <div>
                <div className="font-semibold text-gray-900 text-sm">Marketplace Admin</div>
                <div className="text-xs text-gray-500">E-commerce Platform</div>
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
                className="w-full py-2 pl-9 pr-4 rounded-lg bg-gray-50 border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all outline-none text-sm text-gray-700 placeholder-gray-400"
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
                        ${pathname === item.path || (item.id === 'dashboard' && pathname === '/admin/marketplace')
                          ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-md shadow-orange-200'
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
                              pathname === item.path || (item.id === 'dashboard' && pathname === '/admin/marketplace')
                                ? 'text-orange-100' 
                                : 'text-gray-500'
                            }`}>
                              {item.description}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {!sidebarCollapsed && (pathname === item.path || (item.id === 'dashboard' && pathname === '/admin/marketplace')) && (
                        <div className="inline-flex h-1.5 w-1.5 rounded-full bg-white" />
                      )}
                      
                      {(pathname === item.path || (item.id === 'dashboard' && pathname === '/admin/marketplace')) && (
                        <div className="absolute left-0 top-1/2 w-1 h-8 bg-gradient-to-b from-orange-500 to-amber-600 rounded-r-md transform -translate-y-1/2 shadow-sm" />
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
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-sm ring-2 ring-orange-100">
                  <span className="text-sm font-bold text-white">MA</span>
                </div>
                <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-400 border-2 border-white" />
              </div>
              
              {!sidebarCollapsed && (
                <div className="ml-3 flex-1 min-w-0">
                  <p className="font-medium text-gray-900 text-sm truncate">Marketplace Admin</p>
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
              className="w-full mt-3 px-3 py-2 text-sm text-orange-600 hover:bg-orange-50 rounded-lg transition-all duration-200 flex items-center justify-center font-medium border border-orange-200 hover:border-orange-300"
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
          background: rgba(251, 146, 60, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(251, 146, 60, 0.3);
        }
      `}</style>
    </>
  );
};

export default MarketplaceAdminSidebar;
