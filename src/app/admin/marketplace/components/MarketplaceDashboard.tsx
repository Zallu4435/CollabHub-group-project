'use client';

import { useState } from 'react';
import { MarketplaceDashboardStats, ActivityLog } from '../types/marketplace-admin';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useRouter } from 'next/navigation';
import { 
  FiDollarSign,
  FiPackage,
  FiUsers,
  FiShoppingBag,
  FiClock,
  FiAlertTriangle,
  FiFlag,
  FiTrendingUp,
  FiDownload,
  FiActivity,
  FiAward,
  FiCalendar,
  FiFileText
} from 'react-icons/fi';

// Mock data
const mockStats: MarketplaceDashboardStats = {
  overview: {
    totalProjects: 2456,
    activeSellers: 892,
    totalBuyers: 12340,
    totalRevenue: 487650,
    pendingApprovals: 23,
    activeDisputes: 8,
  },
  revenue: {
    today: 12450,
    week: 78320,
    month: 324560,
    platformFees: 48765,
    commissions: 97530,
  },
  projects: {
    pending: 23,
    approved: 2234,
    rejected: 145,
    featured: 54,
  },
  users: {
    newSellersToday: 12,
    newBuyersToday: 145,
    activeUsers: 3421,
  },
};

const mockActivityLogs: ActivityLog[] = [
  {
    id: 'log-1',
    type: 'project',
    action: 'uploaded',
    description: 'New project "React Admin Dashboard" uploaded',
    userId: 'seller-1',
    userName: 'John Developer',
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
  },
  {
    id: 'log-2',
    type: 'transaction',
    action: 'purchased',
    description: 'Purchase of "Next.js E-commerce Template" for $79',
    userId: 'buyer-1',
    userName: 'Jane Smith',
    timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
  },
  {
    id: 'log-3',
    type: 'dispute',
    action: 'opened',
    description: 'Dispute opened for transaction #12345',
    userId: 'buyer-2',
    userName: 'Mike Johnson',
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
  },
  {
    id: 'log-4',
    type: 'review',
    action: 'submitted',
    description: 'Review submitted: 5 stars for "Vue.js Dashboard"',
    userId: 'buyer-3',
    userName: 'Sarah Williams',
    timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
  },
];

export default function MarketplaceDashboard() {
  const [stats, setStats] = useState(mockStats);
  const [activityLogs, setActivityLogs] = useState(mockActivityLogs);
  const [timeRange, setTimeRange] = useState('7d');
  const router = useRouter();

  // Revenue trend data
  const revenueTrend = [
    { date: 'Mon', revenue: 12450, orders: 34 },
    { date: 'Tue', revenue: 15230, orders: 42 },
    { date: 'Wed', revenue: 18900, orders: 51 },
    { date: 'Thu', revenue: 14560, orders: 38 },
    { date: 'Fri', revenue: 21340, orders: 58 },
    { date: 'Sat', revenue: 16890, orders: 45 },
    { date: 'Sun', revenue: 13420, orders: 37 },
  ];

  // Category distribution
  const categoryData = [
    { name: 'Web Templates', value: 456, color: '#3b82f6' },
    { name: 'Mobile Apps', value: 234, color: '#10b981' },
    { name: 'UI Kits', value: 189, color: '#f59e0b' },
    { name: 'Admin Panels', value: 167, color: '#8b5cf6' },
    { name: 'Landing Pages', value: 145, color: '#ec4899' },
  ];

  // Top sellers data
  const topSellers = [
    { name: 'TechCraft Studios', sales: 234, revenue: 18720 },
    { name: 'DesignHub', sales: 189, revenue: 15120 },
    { name: 'CodeMasters', sales: 167, revenue: 13360 },
    { name: 'Creative Labs', sales: 145, revenue: 11600 },
  ];

  const getTimeAgo = (timestamp: string) => {
    const seconds = Math.floor((Date.now() - new Date(timestamp).getTime()) / 1000);
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'project': return <FiPackage className="text-blue-600" size={16} />;
      case 'transaction': return <FiDollarSign className="text-emerald-600" size={16} />;
      case 'dispute': return <FiAlertTriangle className="text-red-600" size={16} />;
      case 'review': return <FiAward className="text-amber-600" size={16} />;
      case 'user': return <FiUsers className="text-purple-600" size={16} />;
      default: return <FiActivity size={16} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Marketplace Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">
            Complete overview of your marketplace performance
          </p>
        </div>
        <div className="flex gap-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-all flex items-center gap-2">
            <FiDownload size={16} />
            Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Revenue"
          value={`$${stats.overview.totalRevenue.toLocaleString()}`}
          subtitle={`$${stats.revenue.today.toLocaleString()} today`}
          icon={<FiDollarSign size={24} />}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
          trend="+18%"
          trendUp
          onClick={() => router.push('/admin/marketplace/pages/transactions')}
        />
        <MetricCard
          title="Total Projects"
          value={stats.overview.totalProjects}
          subtitle={`${stats.projects.pending} pending approval`}
          icon={<FiPackage size={24} />}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
          trend="+12%"
          trendUp
          onClick={() => router.push('/admin/marketplace/pages/products')}
        />
        <MetricCard
          title="Active Sellers"
          value={stats.overview.activeSellers}
          subtitle={`${stats.users.newSellersToday} joined today`}
          icon={<FiUsers size={24} />}
          iconBg="bg-purple-50"
          iconColor="text-purple-600"
          trend="+8%"
          trendUp
          onClick={() => router.push('/admin/marketplace/pages/sellers')}
        />
        <MetricCard
          title="Total Buyers"
          value={stats.overview.totalBuyers.toLocaleString()}
          subtitle={`${stats.users.newBuyersToday} new today`}
          icon={<FiShoppingBag size={24} />}
          iconBg="bg-orange-50"
          iconColor="text-orange-600"
          trend="+15%"
          trendUp
          onClick={() => router.push('/admin/marketplace/pages/buyers')}
        />
      </div>

      {/* Urgent Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div 
          className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl shadow-sm p-6 cursor-pointer hover:shadow-lg transition-all"
          onClick={() => router.push('/admin/marketplace/pages/products?status=pending')}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <FiClock size={16} className="text-orange-100" />
                <p className="text-orange-100 text-sm font-medium">Pending Approvals</p>
              </div>
              <p className="text-4xl font-bold mt-2">{stats.overview.pendingApprovals}</p>
              <p className="text-orange-100 text-xs mt-1">Requires immediate action</p>
            </div>
            <div className="p-4 bg-white/10 rounded-lg backdrop-blur-sm">
              <FiClock size={32} className="text-white/60" />
            </div>
          </div>
        </div>

        <div 
          className="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-xl shadow-sm p-6 cursor-pointer hover:shadow-lg transition-all"
          onClick={() => router.push('/admin/marketplace/pages/disputes')}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <FiAlertTriangle size={16} className="text-red-100" />
                <p className="text-red-100 text-sm font-medium">Active Disputes</p>
              </div>
              <p className="text-4xl font-bold mt-2">{stats.overview.activeDisputes}</p>
              <p className="text-red-100 text-xs mt-1">Needs resolution</p>
            </div>
            <div className="p-4 bg-white/10 rounded-lg backdrop-blur-sm">
              <FiAlertTriangle size={32} className="text-white/60" />
            </div>
          </div>
        </div>

        <div 
          className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl shadow-sm p-6 cursor-pointer hover:shadow-lg transition-all"
          onClick={() => router.push('/admin/marketplace/pages/reviews?status=flagged')}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <FiFlag size={16} className="text-purple-100" />
                <p className="text-purple-100 text-sm font-medium">Flagged Reviews</p>
              </div>
              <p className="text-4xl font-bold mt-2">12</p>
              <p className="text-purple-100 text-xs mt-1">Pending moderation</p>
            </div>
            <div className="p-4 bg-white/10 rounded-lg backdrop-blur-sm">
              <FiFlag size={32} className="text-white/60" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FiTrendingUp className="text-blue-600" size={18} />
            Revenue Trend (Last 7 Days)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} name="Revenue ($)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FiFileText className="text-purple-600" size={18} />
            Projects by Category
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.name}: ${entry.value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Sellers & Live Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Sellers */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FiAward className="text-amber-600" size={18} />
            Top Sellers (This Month)
          </h3>
          <div className="space-y-3">
            {topSellers.map((seller, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg hover:shadow-sm transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center font-bold text-white shadow-sm">
                    {idx + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{seller.name}</p>
                    <p className="text-xs text-gray-600">{seller.sales} sales</p>
                  </div>
                </div>
                <p className="font-bold text-emerald-600 flex items-center gap-1">
                  <FiDollarSign size={14} />
                  {seller.revenue.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Live Activity Feed */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FiActivity className="text-red-600" size={18} />
            Live Activity Feed
          </h3>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {activityLogs.map((log) => (
              <div key={log.id} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="p-2 bg-gray-100 rounded-lg mt-0.5">
                  {getActivityIcon(log.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900">{log.userName}</p>
                  <p className="text-sm text-gray-600">{log.description}</p>
                  <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                    <FiClock size={10} />
                    {getTimeAgo(log.timestamp)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Revenue Breakdown */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FiDollarSign className="text-emerald-600" size={18} />
          Revenue Breakdown
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FiCalendar className="text-blue-600" size={16} />
              </div>
            </div>
            <p className="text-xs text-gray-600 mb-1">Today</p>
            <p className="text-xl font-bold text-gray-900">${stats.revenue.today.toLocaleString()}</p>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <FiCalendar className="text-emerald-600" size={16} />
              </div>
            </div>
            <p className="text-xs text-gray-600 mb-1">This Week</p>
            <p className="text-xl font-bold text-gray-900">${stats.revenue.week.toLocaleString()}</p>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <FiCalendar className="text-purple-600" size={16} />
              </div>
            </div>
            <p className="text-xs text-gray-600 mb-1">This Month</p>
            <p className="text-xl font-bold text-gray-900">${stats.revenue.month.toLocaleString()}</p>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <div className="p-2 bg-orange-100 rounded-lg">
                <FiDollarSign className="text-orange-600" size={16} />
              </div>
            </div>
            <p className="text-xs text-gray-600 mb-1">Platform Fees</p>
            <p className="text-xl font-bold text-gray-900">${stats.revenue.platformFees.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, subtitle, icon, iconBg, iconColor, trend, trendUp, onClick }: any) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl border border-gray-200 p-5 cursor-pointer hover:shadow-md transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`${iconBg} ${iconColor} p-2.5 rounded-lg`}>
          {icon}
        </div>
        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold ${trendUp ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
          <FiTrendingUp size={10} />
          {trend}
        </span>
      </div>
      <p className="text-sm text-gray-600 font-medium">{title}</p>
      <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
      <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
    </div>
  );
}
