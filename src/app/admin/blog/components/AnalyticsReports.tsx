'use client';

import { useMemo } from 'react';
import { mockDb } from '../lib/mockDb';
import { formatNumber } from '../lib/charts';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { 
  FiEye, 
  FiTrendingUp, 
  FiMessageCircle, 
  FiActivity,
  FiDownload,
  FiCalendar,
  FiArrowUp,
  FiArrowDown,
  FiExternalLink
} from 'react-icons/fi';

export default function AnalyticsReports() {
  const analytics = mockDb.getAnalytics();
  const posts = mockDb.getPosts();

  const chartData = useMemo(() => {
    return analytics.slice(-14).map(d => ({
      date: new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      views: d.views,
      comments: d.comments,
      engagement: d.engagement,
    }));
  }, [analytics]);

  const topPosts = useMemo(() => {
    return posts
      .sort((a, b) => b.views - a.views)
      .slice(0, 10)
      .map(p => ({ 
        title: p.title.length > 40 ? p.title.slice(0, 40) + '...' : p.title, 
        fullTitle: p.title,
        views: p.views 
      }));
  }, [posts]);

  // Calculate metrics
  const totalViews = analytics.reduce((acc, a) => acc + a.views, 0);
  const totalComments = analytics.reduce((acc, a) => acc + a.comments, 0);
  const totalEngagement = analytics.reduce((acc, a) => acc + a.engagement, 0);
  const avgEngagement = ((totalEngagement / totalViews) * 100).toFixed(1);
  const bounceRate = (32 + Math.random() * 8).toFixed(1);

  // Calculate trends (comparing last 7 days vs previous 7 days)
  const recentViews = analytics.slice(-7).reduce((acc, a) => acc + a.views, 0);
  const previousViews = analytics.slice(-14, -7).reduce((acc, a) => acc + a.views, 0);
  const viewsTrend = ((recentViews - previousViews) / previousViews * 100).toFixed(1);

  const recentComments = analytics.slice(-7).reduce((acc, a) => acc + a.comments, 0);
  const previousComments = analytics.slice(-14, -7).reduce((acc, a) => acc + a.comments, 0);
  const commentsTrend = ((recentComments - previousComments) / previousComments * 100).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics & Reports</h1>
          <p className="text-sm text-gray-700 mt-1">
            Track performance metrics and gain insights into your content
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 bg-white text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all text-sm font-medium flex items-center gap-2">
            <FiCalendar size={16} />
            Last 14 Days
          </button>
          <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all text-sm font-medium flex items-center gap-2">
            <FiDownload size={16} />
            Export Report
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Total Views"
          value={formatNumber(totalViews)}
          icon={<FiEye size={20} />}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
          trend={viewsTrend}
          trendLabel="vs last period"
        />
        <KPICard
          title="Engagement Rate"
          value={`${avgEngagement}%`}
          icon={<FiTrendingUp size={20} />}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
          trend="+5.2"
          trendLabel="vs last period"
        />
        <KPICard
          title="Total Comments"
          value={formatNumber(totalComments)}
          icon={<FiMessageCircle size={20} />}
          iconBg="bg-purple-50"
          iconColor="text-purple-600"
          trend={commentsTrend}
          trendLabel="vs last period"
        />
        <KPICard
          title="Bounce Rate"
          value={`${bounceRate}%`}
          icon={<FiActivity size={20} />}
          iconBg="bg-orange-50"
          iconColor="text-orange-600"
          trend="-2.3"
          trendLabel="vs last period"
          invertTrend
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Views Chart - Takes 2 columns */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-semibold text-gray-900">Views & Engagement Trend</h3>
              <p className="text-sm text-gray-500 mt-0.5">Last 14 days performance</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 text-xs font-medium bg-emerald-50 text-emerald-700 rounded-lg">14D</button>
              <button className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 rounded-lg">30D</button>
              <button className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 rounded-lg">90D</button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorComments" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
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
              <Area 
                type="monotone" 
                dataKey="views" 
                stroke="#3b82f6" 
                strokeWidth={2} 
                fillOpacity={1} 
                fill="url(#colorViews)" 
              />
              <Area 
                type="monotone" 
                dataKey="comments" 
                stroke="#8b5cf6" 
                strokeWidth={2} 
                fillOpacity={1} 
                fill="url(#colorComments)" 
              />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-sm text-gray-600">Views</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-500"></div>
              <span className="text-sm text-gray-600">Comments</span>
            </div>
          </div>
        </div>

        {/* Top Posts Bar Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="mb-6">
            <h3 className="text-base font-semibold text-gray-900">Top 5 Posts</h3>
            <p className="text-sm text-gray-500 mt-0.5">By total views</p>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={topPosts.slice(0, 5)} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis type="number" tick={{ fontSize: 12 }} stroke="#9ca3af" />
              <YAxis 
                dataKey="title" 
                type="category" 
                width={120} 
                tick={{ fontSize: 11 }} 
                stroke="#9ca3af" 
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
                formatter={(value: any) => [value.toLocaleString(), 'Views']}
              />
              <Bar 
                dataKey="views" 
                fill="#10b981" 
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Content Performance Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-gray-900">Content Performance</h3>
              <p className="text-sm text-gray-500 mt-0.5">Detailed breakdown of all posts</p>
            </div>
            <button className="text-sm text-emerald-600 font-medium hover:text-emerald-700">
              View All
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Post Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Views
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Author
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Published
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {posts.slice(0, 10).map((post, idx) => (
                <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg flex items-center justify-center font-semibold text-emerald-600 text-xs">
                        {idx + 1}
                      </div>
                      <div className="font-medium text-gray-900 text-sm">{post.title}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-900">
                        {post.views.toLocaleString()}
                      </span>
                      <span className={`flex items-center gap-1 text-xs font-medium ${
                        Math.random() > 0.5 ? 'text-emerald-600' : 'text-red-600'
                      }`}>
                        {Math.random() > 0.5 ? (
                          <>
                            <FiArrowUp size={12} />
                            {Math.floor(Math.random() * 20 + 5)}%
                          </>
                        ) : (
                          <>
                            <FiArrowDown size={12} />
                            {Math.floor(Math.random() * 10 + 1)}%
                          </>
                        )}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {post.authorName}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(post.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-emerald-600 hover:text-emerald-700 transition-colors">
                      <FiExternalLink size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing <span className="font-semibold">10</span> of <span className="font-semibold">{posts.length}</span> posts
            </p>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all">
                Previous
              </button>
              <button className="px-3 py-1.5 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-all">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Insights Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FiTrendingUp className="text-blue-600" size={20} />
            </div>
            <div>
              <h4 className="font-semibold text-blue-900 text-sm">Performance Insight</h4>
              <p className="text-sm text-blue-700 mt-2">
                Your content performance increased by <span className="font-bold">{viewsTrend}%</span> compared to the previous period. Keep up the great work!
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <FiMessageCircle className="text-purple-600" size={20} />
            </div>
            <div>
              <h4 className="font-semibold text-purple-900 text-sm">Engagement Tip</h4>
              <p className="text-sm text-purple-700 mt-2">
                Posts with more than 5 images receive <span className="font-bold">37% more engagement</span>. Try adding more visuals to boost interaction.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function KPICard({ 
  title, 
  value, 
  icon, 
  iconBg, 
  iconColor, 
  trend, 
  trendLabel,
  invertTrend = false
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  trend: string;
  trendLabel: string;
  invertTrend?: boolean;
}) {
  const trendValue = parseFloat(trend);
  const isPositive = invertTrend ? trendValue < 0 : trendValue > 0;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className={`${iconBg} ${iconColor} p-2.5 rounded-lg`}>
          {icon}
        </div>
        <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-md ${
          isPositive 
            ? 'bg-emerald-50 text-emerald-700' 
            : 'bg-red-50 text-red-700'
        }`}>
          {isPositive ? <FiArrowUp size={12} /> : <FiArrowDown size={12} />}
          {Math.abs(trendValue)}%
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        <p className="text-xs text-gray-500 mt-1">{trendLabel}</p>
      </div>
    </div>
  );
}
