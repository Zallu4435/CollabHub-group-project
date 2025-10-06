'use client';

import { useState } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { 
  FiTrendingUp,
  FiShoppingCart,
  FiDollarSign,
  FiPercent,
  FiDownload,
  FiAward,
  FiUsers,
  FiPackage,
  FiAlertCircle,
  FiStar,
  FiFilter
} from 'react-icons/fi';

export default function ReportsAnalytics() {
  const [timeRange, setTimeRange] = useState('30d');
  const [reportType, setReportType] = useState('sales');

  // Sales data
  const salesData = [
    { date: 'Week 1', sales: 12450, orders: 34, avgOrder: 366 },
    { date: 'Week 2', sales: 15230, orders: 42, avgOrder: 363 },
    { date: 'Week 3', sales: 18900, orders: 51, avgOrder: 371 },
    { date: 'Week 4', sales: 14560, orders: 38, avgOrder: 383 },
  ];

  // Category revenue
  const categoryRevenue = [
    { name: 'Web Templates', value: 36240, color: '#3b82f6' },
    { name: 'Admin Panels', value: 18486, color: '#10b981' },
    { name: 'UI Kits', value: 11097, color: '#f59e0b' },
    { name: 'Landing Pages', value: 13193, color: '#8b5cf6' },
    { name: 'Mobile Apps', value: 11600, color: '#ec4899' },
  ];

  // Top products
  const topProducts = [
    { name: 'React Admin Dashboard Pro', sales: 234, revenue: 18486 },
    { name: 'Next.js E-commerce Template', sales: 189, revenue: 28161 },
    { name: 'Vue.js Mobile App UI Kit', sales: 167, revenue: 9853 },
    { name: 'Angular Dashboard Kit', sales: 145, revenue: 11600 },
  ];

  // Seller performance
  const sellerPerformance = [
    { seller: 'TechCraft Studios', sales: 234, revenue: 18486, rating: 4.8 },
    { seller: 'DesignHub', sales: 189, revenue: 15120, rating: 4.6 },
    { seller: 'CodeMasters', sales: 167, revenue: 13360, rating: 4.2 },
    { seller: 'Creative Labs', sales: 145, revenue: 11600, rating: 4.5 },
  ];

  // Growth metrics
  const growthData = [
    { month: 'Jan', users: 850, sellers: 120, projects: 340 },
    { month: 'Feb', users: 920, sellers: 135, projects: 380 },
    { month: 'Mar', users: 1100, sellers: 156, projects: 445 },
    { month: 'Apr', users: 1280, sellers: 178, projects: 520 },
    { month: 'May', users: 1450, sellers: 198, projects: 590 },
    { month: 'Jun', users: 1620, sellers: 215, projects: 650 },
  ];

  // Conversion funnel
  const conversionData = [
    { stage: 'Visitors', count: 15420, percentage: 100 },
    { stage: 'Product Views', count: 8930, percentage: 58 },
    { stage: 'Add to Cart', count: 3245, percentage: 21 },
    { stage: 'Checkout', count: 1567, percentage: 10 },
    { stage: 'Purchase', count: 1234, percentage: 8 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-sm text-gray-500 mt-1">
            Deep insights for business decisions
          </p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium appearance-none"
            >
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
              <option value="1y">Last Year</option>
            </select>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-all flex items-center gap-2">
            <FiDownload size={16} />
            Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-emerald-100 text-sm font-medium">Total Revenue</p>
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <FiDollarSign size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold mt-2">$90,616</p>
          <p className="text-emerald-100 text-xs mt-2 flex items-center gap-1">
            <FiTrendingUp size={12} />
            +18% vs last month
          </p>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-blue-100 text-sm font-medium">Total Orders</p>
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <FiShoppingCart size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold mt-2">165</p>
          <p className="text-blue-100 text-xs mt-2 flex items-center gap-1">
            <FiTrendingUp size={12} />
            +12% vs last month
          </p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-purple-100 text-sm font-medium">Avg Order Value</p>
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <FiDollarSign size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold mt-2">$549</p>
          <p className="text-purple-100 text-xs mt-2 flex items-center gap-1">
            <FiTrendingUp size={12} />
            +5% vs last month
          </p>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-orange-100 text-sm font-medium">Conversion Rate</p>
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <FiPercent size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold mt-2">8.0%</p>
          <p className="text-orange-100 text-xs mt-2 flex items-center gap-1">
            <FiTrendingUp size={12} />
            +2.3% vs last month
          </p>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Trend */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FiTrendingUp className="text-blue-600" size={18} />
            Sales Trend (Last 4 Weeks)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip />
              <Area type="monotone" dataKey="sales" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Category Revenue */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FiPackage className="text-purple-600" size={18} />
            Revenue by Category
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryRevenue}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.name}: $${(entry.value / 1000).toFixed(1)}k`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryRevenue.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FiAward className="text-amber-600" size={18} />
          Top Performing Products
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Product</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Sales</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Revenue</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Avg Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {topProducts.map((product, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-semibold text-gray-900">{product.name}</td>
                  <td className="px-4 py-3 text-gray-900">{product.sales}</td>
                  <td className="px-4 py-3 font-bold text-emerald-600">${product.revenue.toLocaleString()}</td>
                  <td className="px-4 py-3 text-gray-900">${(product.revenue / product.sales).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Seller Performance */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FiUsers className="text-blue-600" size={18} />
          Top Seller Performance
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={sellerPerformance}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="seller" stroke="#6b7280" fontSize={12} />
            <YAxis stroke="#6b7280" fontSize={12} />
            <Tooltip />
            <Legend />
            <Bar dataKey="sales" fill="#3b82f6" name="Sales Count" radius={[4, 4, 0, 0]} />
            <Bar dataKey="revenue" fill="#10b981" name="Revenue ($)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Growth Metrics */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FiTrendingUp className="text-emerald-600" size={18} />
          Platform Growth (6 Months)
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={growthData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
            <YAxis stroke="#6b7280" fontSize={12} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={2} name="Users" />
            <Line type="monotone" dataKey="sellers" stroke="#10b981" strokeWidth={2} name="Sellers" />
            <Line type="monotone" dataKey="projects" stroke="#f59e0b" strokeWidth={2} name="Projects" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Conversion Funnel */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FiFilter className="text-purple-600" size={18} />
          Sales Conversion Funnel
        </h3>
        <div className="space-y-3">
          {conversionData.map((stage, idx) => (
            <div key={idx} className="relative">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-900">{stage.stage}</span>
                <span className="text-sm text-gray-600">
                  {stage.count.toLocaleString()} ({stage.percentage}%)
                </span>
              </div>
              <div className="h-12 bg-gray-100 rounded-lg overflow-hidden relative">
                <div
                  className={`h-full flex items-center justify-center text-white font-bold transition-all ${
                    idx === 0 ? 'bg-blue-600' :
                    idx === 1 ? 'bg-blue-500' :
                    idx === 2 ? 'bg-blue-400' :
                    idx === 3 ? 'bg-emerald-500' :
                    'bg-emerald-600'
                  }`}
                  style={{ width: `${stage.percentage}%` }}
                >
                  {stage.percentage}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FiUsers className="text-blue-600" size={16} />
            Customer Insights
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">New Customers</span>
              <span className="font-bold text-gray-900">342</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">Returning Customers</span>
              <span className="font-bold text-gray-900">856</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-lg border border-emerald-200">
              <span className="text-sm text-gray-600">Customer Lifetime Value</span>
              <span className="font-bold text-emerald-600">$1,247</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FiDollarSign className="text-emerald-600" size={16} />
            Revenue Breakdown
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">Gross Revenue</span>
              <span className="font-bold text-gray-900">$90,616</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
              <span className="text-sm text-gray-600">Platform Fees</span>
              <span className="font-bold text-blue-600">$18,123</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">Seller Payouts</span>
              <span className="font-bold text-gray-900">$72,493</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FiStar className="text-amber-600" size={16} />
            Quality Metrics
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-amber-50 rounded-lg border border-amber-200">
              <span className="text-sm text-gray-600">Avg Product Rating</span>
              <span className="font-bold text-amber-600 flex items-center gap-1">
                <FiStar size={12} />
                4.6
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-lg border border-emerald-200">
              <span className="text-sm text-gray-600">Refund Rate</span>
              <span className="font-bold text-emerald-600">3.2%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg border border-red-200">
              <span className="text-sm text-gray-600">Dispute Rate</span>
              <span className="font-bold text-red-600 flex items-center gap-1">
                <FiAlertCircle size={12} />
                1.8%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
