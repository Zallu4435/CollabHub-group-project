'use client';

import { useState, useMemo } from 'react';
import { mockDb } from '../lib/mockDb';
import { formatNumber } from '../lib/charts';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import { 
  FiTrendingUp, 
  FiTrendingDown, 
  FiEye, 
  FiUsers, 
  FiFileText,
  FiHeart,
  FiMessageCircle,
  FiAlertCircle,
  FiClock,
  FiCheckCircle,
  FiEdit3,
  FiBarChart2,
  FiMail,
  FiSettings
} from 'react-icons/fi';

export default function BlogDashboard() {
  const metrics = mockDb.getMetrics();
  const analytics = mockDb.getAnalytics();
  const recentPosts = mockDb.getPosts().slice(0, 5);
  const authors = mockDb.getAuthors();
  const comments = mockDb.getComments();
  
  const topPosts = mockDb.getPosts()
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);
  
  const trendingTags = mockDb.getTags()
    .sort((a, b) => b.usage - a.usage)
    .slice(0, 6);

  const pendingComments = comments.filter(c => c.status === 'pending').length;
  const flaggedContent = comments.filter(c => c.flagged).length;

  const chartData = useMemo(() => {
    return analytics.slice(-7).map(d => ({
      date: new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      views: d.views,
      engagement: d.engagement,
    }));
  }, [analytics]);

  const statusData = [
    { name: 'Published', value: mockDb.getPosts().filter(p => p.state === 'published').length, color: '#10b981' },
    { name: 'Draft', value: mockDb.getPosts().filter(p => p.state === 'draft').length, color: '#f59e0b' },
    { name: 'Scheduled', value: mockDb.getPosts().filter(p => p.state === 'scheduled').length, color: '#3b82f6' },
  ];

  const totalViews = analytics.reduce((acc, a) => acc + a.views, 0);
  const totalEngagement = analytics.reduce((acc, a) => acc + a.engagement, 0);
  const engagementRate = ((totalEngagement / totalViews) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-sm text-gray-700 mt-1">
            Welcome back! Here's what's happening with your blog today.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {(flaggedContent > 0 || pendingComments > 0) && (
            <button className="px-4 py-2 bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-100 transition-all text-sm font-medium flex items-center gap-2">
              <FiAlertCircle size={16} />
              {flaggedContent + pendingComments} Pending
            </button>
          )}
          <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all text-sm font-medium flex items-center gap-2">
            <FiEdit3 size={16} />
            New Post
          </button>
        </div>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Posts"
          value={metrics.totalPosts}
          change="+12.5%"
          changeType="increase"
          icon={<FiFileText size={20} />}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
          subtitle={`${mockDb.getPosts().filter(p => p.state === 'published').length} published`}
        />
        <MetricCard
          title="Total Views"
          value={formatNumber(metrics.totalViews)}
          change="+18.2%"
          changeType="increase"
          icon={<FiEye size={20} />}
          iconBg="bg-purple-50"
          iconColor="text-purple-600"
          subtitle="Last 30 days"
        />
        <MetricCard
          title="Engagement Rate"
          value={`${engagementRate}%`}
          change="+3.4%"
          changeType="increase"
          icon={<FiHeart size={20} />}
          iconBg="bg-pink-50"
          iconColor="text-pink-600"
          subtitle="Avg. interaction"
        />
        <MetricCard
          title="Active Authors"
          value={metrics.totalAuthors}
          change="+2"
          changeType="increase"
          icon={<FiUsers size={20} />}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
          subtitle={`${authors.filter(a => a.verified).length} verified`}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Engagement Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-semibold text-gray-900">Performance Trend</h3>
              <p className="text-sm text-gray-500 mt-0.5">Last 7 days activity</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 text-xs font-medium bg-emerald-50 text-emerald-700 rounded-lg">7D</button>
              <button className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 rounded-lg">30D</button>
              <button className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 rounded-lg">90D</button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorEngagement" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#9ca3af" />
              <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '12px'
                }} 
              />
              <Area type="monotone" dataKey="views" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorViews)" />
              <Area type="monotone" dataKey="engagement" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorEngagement)" />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              <span className="text-sm text-gray-600">Views</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-sm text-gray-600">Engagement</span>
            </div>
          </div>
        </div>

        {/* Post Status Distribution */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="mb-6">
            <h3 className="text-base font-semibold text-gray-900">Content Status</h3>
            <p className="text-sm text-gray-500 mt-0.5">Distribution by state</p>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                fill="#8884d8"
                paddingAngle={2}
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-4 pt-4 border-t border-gray-100">
            {statusData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-gray-600">{item.name}</span>
                </div>
                <span className="font-semibold text-gray-900">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Posts & Trending Tags */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing Posts */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-semibold text-gray-900">Top Performing</h3>
              <p className="text-sm text-gray-500 mt-0.5">Most viewed posts</p>
            </div>
            <button className="text-sm text-emerald-600 font-medium hover:text-emerald-700">
              View All
            </button>
          </div>
          <div className="space-y-3">
            {topPosts.map((post, idx) => (
              <div key={post.id} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors group">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg flex items-center justify-center font-semibold text-emerald-600 text-sm">
                  {idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate text-sm group-hover:text-emerald-600">{post.title}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <FiEye size={12} />
                      {post.views.toLocaleString()}
                    </span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-500">{post.authorName}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-emerald-600 text-sm font-semibold">
                  <FiTrendingUp size={14} />
                  {Math.floor(Math.random() * 30 + 10)}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trending Tags */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-semibold text-gray-900">Trending Topics</h3>
              <p className="text-sm text-gray-500 mt-0.5">Popular tags this week</p>
            </div>
            <button className="text-sm text-emerald-600 font-medium hover:text-emerald-700">
              Manage
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {trendingTags.map(tag => (
              <div
                key={tag.id}
                className="group px-4 py-2 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-emerald-50 hover:to-teal-50 border border-gray-200 hover:border-emerald-200 rounded-lg transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900 text-sm group-hover:text-emerald-700">{tag.name}</span>
                  <span className="text-xs text-gray-500 group-hover:text-emerald-600">
                    {tag.usage}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <FiTrendingUp className="text-blue-600" size={16} />
              </div>
              <div>
                <p className="text-sm font-medium text-blue-900">Trending Now</p>
                <p className="text-xs text-blue-700 mt-1">"React" and "TypeScript" tags are gaining 45% more traction this week</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Posts - Takes 2 columns */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-semibold text-gray-900">Recent Activity</h3>
              <p className="text-sm text-gray-500 mt-0.5">Latest content updates</p>
            </div>
            <button className="text-sm text-emerald-600 font-medium hover:text-emerald-700">
              View All
            </button>
          </div>
          <div className="space-y-3">
            {recentPosts.map(post => (
              <div key={post.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors group">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 text-sm group-hover:text-emerald-600 truncate">{post.title}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-gray-500">{post.authorName}</span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <span className={`px-2.5 py-1 rounded-md text-xs font-medium flex-shrink-0 ml-3 ${
                  post.state === 'published' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                  post.state === 'draft' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                  'bg-blue-50 text-blue-700 border border-blue-200'
                }`}>
                  {post.state}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="mb-6">
            <h3 className="text-base font-semibold text-gray-900">Quick Actions</h3>
            <p className="text-sm text-gray-500 mt-0.5">Common tasks</p>
          </div>
          
          <div className="space-y-2">
            <QuickActionButton 
              icon={<FiEdit3 size={16} />} 
              label="New Post" 
              href="/admin/blog/pages/posts/create" 
            />
            <QuickActionButton 
              icon={<FiBarChart2 size={16} />} 
              label="Analytics" 
              href="/admin/blog/pages/analytics" 
            />
            <QuickActionButton 
              icon={<FiMessageCircle size={16} />} 
              label="Comments" 
              href="/admin/blog/pages/comments" 
              badge={pendingComments} 
            />
            <QuickActionButton 
              icon={<FiUsers size={16} />} 
              label="Authors" 
              href="/admin/blog/pages/authors" 
            />
            <QuickActionButton 
              icon={<FiMail size={16} />} 
              label="Newsletter" 
              href="/admin/blog/pages/newsletter" 
            />
            <QuickActionButton 
              icon={<FiSettings size={16} />} 
              label="Settings" 
              href="/admin/blog/pages/settings" 
            />
          </div>
          
          {(flaggedContent > 0 || metrics.pendingReview > 0) && (
            <div className="mt-6 p-4 bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg">
              <div className="flex items-start gap-3">
                <FiAlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={18} />
                <div className="flex-1">
                  <h4 className="font-semibold text-red-900 text-sm">Pending Review</h4>
                  <p className="text-2xl font-bold text-red-600 mt-1">{metrics.pendingReview}</p>
                  <p className="text-xs text-red-700 mt-1">Items need attention</p>
                  <button className="mt-3 w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-medium transition-all">
                    Review Now →
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function MetricCard({ 
  title, 
  value, 
  change, 
  changeType, 
  icon, 
  iconBg, 
  iconColor, 
  subtitle 
}: {
  title: string;
  value: string | number;
  change: string;
  changeType: 'increase' | 'decrease';
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  subtitle: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className={`${iconBg} ${iconColor} p-2.5 rounded-lg`}>
          {icon}
        </div>
        <div className={`flex items-center gap-1 text-sm font-semibold ${
          changeType === 'increase' ? 'text-emerald-600' : 'text-red-600'
        }`}>
          {changeType === 'increase' ? <FiTrendingUp size={14} /> : <FiTrendingDown size={14} />}
          {change}
        </div>
      </div>
      <div className="mt-4">
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
      </div>
    </div>
  );
}

function QuickActionButton({ 
  icon, 
  label, 
  href, 
  badge 
}: { 
  icon: React.ReactNode; 
  label: string; 
  href: string; 
  badge?: number; 
}) {
  return (
    <a
      href={href}
      className="relative flex items-center gap-3 px-4 py-3 bg-gray-50 hover:bg-emerald-50 border border-gray-200 hover:border-emerald-200 rounded-lg transition-all group"
    >
      <div className="text-gray-600 group-hover:text-emerald-600 transition-colors">
        {icon}
      </div>
      <span className="text-sm font-medium text-gray-900 group-hover:text-emerald-700">
        {label}
      </span>
      {badge && badge > 0 && (
        <span className="ml-auto bg-red-500 text-white text-xs rounded-full min-w-[20px] h-5 flex items-center justify-center px-1.5 font-semibold">
          {badge}
        </span>
      )}
    </a>
  );
}
