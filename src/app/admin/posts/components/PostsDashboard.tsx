'use client';

import { useState } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { 
  FiFileText, 
  FiHeart,
  FiMessageSquare,
  FiFlag,
  FiRefreshCw,
  FiDownload,
  FiPlus,
  FiTrendingUp,
  FiEye,
  FiActivity,
  FiAward,
  FiCalendar,
  FiEdit,
  FiBarChart2
} from 'react-icons/fi';

export default function PostsDashboard() {
  const [timeRange, setTimeRange] = useState('7d');

  const engagementData = [
    { date: 'Mon', posts: 156, reactions: 2340, comments: 567 },
    { date: 'Tue', posts: 189, reactions: 2890, comments: 645 },
    { date: 'Wed', posts: 234, reactions: 3456, comments: 789 },
    { date: 'Thu', posts: 198, reactions: 2987, comments: 612 },
    { date: 'Fri', posts: 267, reactions: 3890, comments: 892 },
    { date: 'Sat', posts: 145, reactions: 2234, comments: 456 },
    { date: 'Sun', posts: 123, reactions: 1987, comments: 389 },
  ];

  const reactionBreakdown = [
    { name: 'Like', value: 45678, color: '#3b82f6', emoji: '👍' },
    { name: 'Celebrate', value: 12345, color: '#10b981', emoji: '🎉' },
    { name: 'Insightful', value: 8934, color: '#f59e0b', emoji: '💡' },
    { name: 'Curious', value: 5678, color: '#8b5cf6', emoji: '🤔' },
    { name: 'Love', value: 4567, color: '#ec4899', emoji: '❤️' },
    { name: 'Support', value: 3456, color: '#06b6d4', emoji: '🙌' },
  ];

  const topPosts = [
    { id: '1', content: 'Excited to announce our new product launch! 🚀', author: 'Sarah Johnson', reactions: 1234, comments: 89, views: 15678, avatar: '👩‍💼' },
    { id: '2', content: 'Just completed a major project milestone...', author: 'Mike Chen', reactions: 987, comments: 67, views: 12456, avatar: '👨‍💻' },
    { id: '3', content: 'Sharing my thoughts on industry trends...', author: 'Emma Davis', reactions: 856, comments: 54, views: 10234, avatar: '👩‍🎓' },
  ];

  const topUsers = [
    { name: 'Sarah Johnson', posts: 45, engagement: 15678, avatar: '👩‍💼', growth: '+12%' },
    { name: 'Mike Chen', posts: 38, engagement: 12456, avatar: '👨‍💻', growth: '+8%' },
    { name: 'Emma Davis', posts: 34, engagement: 10234, avatar: '👩‍🎓', growth: '+15%' },
    { name: 'Alex Kumar', posts: 29, engagement: 8934, avatar: '👨‍🔬', growth: '+10%' },
  ];

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Posts Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">
            Comprehensive overview of post activity and engagement metrics
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
          <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm font-medium">
            <FiRefreshCw size={16} />
            Refresh
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm font-medium">
            <FiDownload size={16} />
            Export
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 text-sm font-medium">
            <FiPlus size={16} />
            Create Post
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-white/10 rounded-lg">
              <FiFileText size={24} />
            </div>
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold bg-white/20">
              <FiTrendingUp size={10} />
              +5.2%
            </span>
          </div>
          <p className="text-blue-100 text-sm font-medium">Total Posts</p>
          <p className="text-3xl font-bold mt-2">45,678</p>
          <p className="text-blue-100 text-xs mt-2">+234 this week</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-white/10 rounded-lg">
              <FiHeart size={24} />
            </div>
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold bg-white/20">
              <FiTrendingUp size={10} />
              +8.3%
            </span>
          </div>
          <p className="text-green-100 text-sm font-medium">Total Reactions</p>
          <p className="text-3xl font-bold mt-2">89,658</p>
          <p className="text-green-100 text-xs mt-2">+1.2K today</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-white/10 rounded-lg">
              <FiMessageSquare size={24} />
            </div>
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold bg-white/20">
              <FiTrendingUp size={10} />
              +6.7%
            </span>
          </div>
          <p className="text-purple-100 text-sm font-medium">Total Comments</p>
          <p className="text-3xl font-bold mt-2">23,456</p>
          <p className="text-purple-100 text-xs mt-2">+567 today</p>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-white/10 rounded-lg">
              <FiFlag size={24} />
            </div>
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold bg-white/20">
              Urgent
            </span>
          </div>
          <p className="text-orange-100 text-sm font-medium">Flagged Posts</p>
          <p className="text-3xl font-bold mt-2">23</p>
          <p className="text-orange-100 text-xs mt-2">Requires review</p>
        </div>
      </div>

      {/* Engagement Trends & Reaction Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
              <FiBarChart2 className="text-blue-600" size={18} />
              Engagement Trends
            </h3>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View Details
            </button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={engagementData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#9ca3af" />
              <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend />
              <Area type="monotone" dataKey="posts" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} name="Posts" strokeWidth={2} />
              <Area type="monotone" dataKey="reactions" stroke="#10b981" fill="#10b981" fillOpacity={0.2} name="Reactions" strokeWidth={2} />
              <Area type="monotone" dataKey="comments" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.1} name="Comments" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
              <FiHeart className="text-pink-600" size={18} />
              Reaction Breakdown
            </h3>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              Analyze
            </button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={reactionBreakdown}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry: any) => `${entry.name}: ${entry.value.toLocaleString()}`}
                outerRadius={90}
                fill="#8884d8"
                dataKey="value"
              >
                {reactionBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Performing Posts */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
            <FiAward className="text-yellow-600" size={18} />
            Top Performing Posts
          </h3>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            View All
          </button>
        </div>
        <div className="space-y-3">
          {topPosts.map((post, idx) => (
            <div key={post.id} className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50/30 transition-all">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0 ${
                idx === 0 ? 'bg-gradient-to-br from-yellow-400 to-yellow-500 text-white' :
                idx === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-white' :
                idx === 2 ? 'bg-gradient-to-br from-orange-400 to-orange-500 text-white' :
                'bg-blue-50 text-blue-700'
              }`}>
                {idx + 1}
              </div>
              
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-2xl">
                  {post.avatar}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 mb-1">{post.content}</p>
                <p className="text-sm text-gray-500">By {post.author}</p>
              </div>

              <div className="text-right flex-shrink-0">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-sm text-gray-600">
                    <FiHeart size={12} className="text-gray-400" />
                    <span className="font-semibold">{post.reactions}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-gray-600">
                    <FiMessageSquare size={12} className="text-gray-400" />
                    <span className="font-semibold">{post.comments}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-gray-600">
                    <FiEye size={12} className="text-gray-400" />
                    <span className="font-semibold">{post.views.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Most Active Users */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
            <FiActivity className="text-green-600" size={18} />
            Most Active Users
          </h3>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            View Leaderboard
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {topUsers.map((user, idx) => (
            <div key={idx} className="p-5 border-2 border-gray-200 rounded-xl text-center hover:border-blue-300 hover:bg-blue-50/30 transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-4xl mx-auto mb-3">
                {user.avatar}
              </div>
              <p className="font-semibold text-gray-900 mb-1">{user.name}</p>
              <p className="text-sm text-gray-500 mb-2">{user.posts} posts</p>
              <div className="flex items-center justify-center gap-2">
                <p className="text-sm text-green-600 font-bold">{user.engagement.toLocaleString()}</p>
                <span className="text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-full font-semibold">
                  {user.growth}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <FiCalendar className="text-blue-600" size={18} />
            </div>
            <p className="text-sm text-gray-600 font-medium">New Today</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">234</p>
          <p className="text-xs text-gray-500 mt-1">Posts published</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-purple-50 rounded-lg">
              <FiFileText className="text-purple-600" size={18} />
            </div>
            <p className="text-sm text-gray-600 font-medium">Scheduled</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">45</p>
          <p className="text-xs text-gray-500 mt-1">Upcoming posts</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-orange-50 rounded-lg">
              <FiEdit className="text-orange-600" size={18} />
            </div>
            <p className="text-sm text-gray-600 font-medium">Drafts</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">89</p>
          <p className="text-xs text-gray-500 mt-1">Work in progress</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <FiTrendingUp className="text-green-600" size={18} />
            </div>
            <p className="text-sm text-gray-600 font-medium">Avg Engagement</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">3.8%</p>
          <p className="text-xs text-gray-500 mt-1">Platform average</p>
        </div>
      </div>
    </div>
  );
}
