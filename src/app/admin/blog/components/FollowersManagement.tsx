'use client';

import { useState } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import toast from 'react-hot-toast';
import { 
  FiUsers,
  FiTrendingUp,
  FiActivity,
  FiShield,
  FiSearch,
  FiMapPin,
  FiMessageCircle,
  FiEye,
  FiMail,
  FiSend,
  FiBarChart2,
  FiPieChart,
  FiGlobe,
  FiTarget,
  FiCalendar,
  FiX
} from 'react-icons/fi';

interface Follower {
  id: string;
  name: string;
  email: string;
  avatar: string;
  followedAt: string;
  status: 'active' | 'inactive' | 'blocked';
  engagement: number;
  postsViewed: number;
  commentsCount: number;
  location: string;
  interests: string[];
  lastActive: string;
  demographics: {
    age: number;
    gender: string;
  };
}

const mockFollowers: Follower[] = [
  {
    id: 'fol-1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://i.pravatar.cc/150?img=1',
    followedAt: new Date(2024, 5, 15).toISOString(),
    status: 'active',
    engagement: 85,
    postsViewed: 234,
    commentsCount: 45,
    location: 'New York, US',
    interests: ['Technology', 'Design', 'Startup'],
    lastActive: new Date(2025, 9, 4, 10, 30).toISOString(),
    demographics: { age: 28, gender: 'Male' },
  },
  {
    id: 'fol-2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    avatar: 'https://i.pravatar.cc/150?img=2',
    followedAt: new Date(2024, 7, 20).toISOString(),
    status: 'active',
    engagement: 92,
    postsViewed: 456,
    commentsCount: 78,
    location: 'London, UK',
    interests: ['Technology', 'AI', 'DevOps'],
    lastActive: new Date(2025, 9, 4, 14, 15).toISOString(),
    demographics: { age: 32, gender: 'Female' },
  },
  {
    id: 'fol-3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    avatar: 'https://i.pravatar.cc/150?img=3',
    followedAt: new Date(2025, 0, 10).toISOString(),
    status: 'active',
    engagement: 67,
    postsViewed: 123,
    commentsCount: 23,
    location: 'Toronto, CA',
    interests: ['Design', 'UI/UX'],
    lastActive: new Date(2025, 9, 3, 18, 45).toISOString(),
    demographics: { age: 25, gender: 'Male' },
  },
  {
    id: 'fol-4',
    name: 'Sarah Williams',
    email: 'sarah@example.com',
    avatar: 'https://i.pravatar.cc/150?img=4',
    followedAt: new Date(2024, 3, 5).toISOString(),
    status: 'inactive',
    engagement: 23,
    postsViewed: 45,
    commentsCount: 5,
    location: 'Sydney, AU',
    interests: ['Writing', 'Content'],
    lastActive: new Date(2025, 8, 15, 9, 20).toISOString(),
    demographics: { age: 35, gender: 'Female' },
  },
];

export default function FollowersManagement() {
  const [followers, setFollowers] = useState(mockFollowers);
  const [activeTab, setActiveTab] = useState<'overview' | 'analytics' | 'demographics' | 'communication'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredFollowers = followers.filter(f => {
    const matchesSearch = f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         f.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || f.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Growth data
  const growthData = [
    { month: 'Jan', followers: 1200 },
    { month: 'Feb', followers: 1450 },
    { month: 'Mar', followers: 1680 },
    { month: 'Apr', followers: 1920 },
    { month: 'May', followers: 2340 },
    { month: 'Jun', followers: 2850 },
    { month: 'Jul', followers: 3420 },
  ];

  // Demographics data
  const ageDistribution = [
    { range: '18-24', count: 890 },
    { range: '25-34', count: 1450 },
    { range: '35-44', count: 780 },
    { range: '45-54', count: 420 },
    { range: '55+', count: 280 },
  ];

  const genderDistribution = [
    { gender: 'Male', value: 1890, color: '#3b82f6' },
    { gender: 'Female', value: 1650, color: '#ec4899' },
    { gender: 'Other', value: 280, color: '#8b5cf6' },
  ];

  const topLocations = [
    { location: 'United States', count: 1420 },
    { location: 'United Kingdom', count: 890 },
    { location: 'India', count: 720 },
    { location: 'Canada', count: 540 },
    { location: 'Australia', count: 350 },
  ];

  const handleBlock = (followerId: string) => {
    if (confirm('Block this follower?')) {
      setFollowers(followers.map(f => 
        f.id === followerId ? { ...f, status: 'blocked' as const } : f
      ));
      toast.success('Follower blocked');
    }
  };

  const handleUnblock = (followerId: string) => {
    setFollowers(followers.map(f => 
      f.id === followerId ? { ...f, status: 'active' as const } : f
    ));
    toast.success('Follower unblocked');
  };

  const totalFollowers = 3820;
  const avgEngagement = 72.5;
  const growthRate = 18.5;
  const activeFollowers = followers.filter(f => f.status === 'active').length;
  const blockedFollowers = followers.filter(f => f.status === 'blocked').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Followers & Social Management</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage followers, analyze engagement, and communicate with your audience
          </p>
        </div>
        <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all text-sm font-medium flex items-center gap-2">
          <FiSend size={16} />
          Send Announcement
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-emerald-100 text-sm font-medium">Total Followers</p>
            <FiUsers className="text-emerald-100" size={20} />
          </div>
          <p className="text-4xl font-bold mb-1">{totalFollowers.toLocaleString()}</p>
          <p className="text-emerald-100 text-xs flex items-center gap-1">
            <FiTrendingUp size={12} />
            {growthRate}% this month
          </p>
        </div>
        <StatCard
          title="Avg Engagement"
          value={`${avgEngagement}%`}
          icon={<FiActivity size={20} />}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
          subtitle="User interaction"
        />
        <StatCard
          title="Active Followers"
          value={activeFollowers}
          icon={<FiUsers size={20} />}
          iconBg="bg-purple-50"
          iconColor="text-purple-600"
          subtitle="Currently active"
        />
        <StatCard
          title="Blocked Users"
          value={blockedFollowers}
          icon={<FiShield size={20} />}
          iconBg="bg-red-50"
          iconColor="text-red-600"
          subtitle="Restricted access"
        />
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex overflow-x-auto">
            {(['overview', 'analytics', 'demographics', 'communication'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-shrink-0 px-6 py-4 font-medium text-sm transition-all relative flex items-center justify-center gap-2 ${
                  activeTab === tab
                    ? 'text-emerald-600 bg-emerald-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {tab === 'overview' && <FiUsers size={18} />}
                {tab === 'analytics' && <FiBarChart2 size={18} />}
                {tab === 'demographics' && <FiPieChart size={18} />}
                {tab === 'communication' && <FiMail size={18} />}
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Filters */}
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-4">
                <div className="flex flex-col md:flex-row gap-3">
                  <div className="flex-1 relative">
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      placeholder="Search followers by name or email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-10 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400 outline-none text-sm"
                    />
                    {searchTerm && (
                      <button
                        onClick={() => setSearchTerm('')}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <FiX size={18} />
                      </button>
                    )}
                  </div>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400 outline-none text-sm font-medium"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="blocked">Blocked</option>
                  </select>
                  <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200">
                    <span className="text-sm text-gray-600">
                      Showing <span className="font-semibold text-gray-900">{filteredFollowers.length}</span> of {followers.length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Followers List */}
              <div className="space-y-3">
                {filteredFollowers.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FiUsers size={24} className="text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No followers found</h3>
                    <p className="text-sm text-gray-500">Try adjusting your search or filter criteria</p>
                  </div>
                ) : (
                  filteredFollowers.map(follower => (
                    <div key={follower.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-emerald-200 hover:bg-emerald-50/30 transition-all">
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <div className="relative">
                          <img src={follower.avatar} alt={follower.name} className="w-12 h-12 rounded-full ring-2 ring-gray-100" />
                          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                            follower.status === 'active' ? 'bg-emerald-500' :
                            follower.status === 'inactive' ? 'bg-gray-400' :
                            'bg-red-500'
                          }`}></div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 truncate">{follower.name}</p>
                          <p className="text-sm text-gray-500 truncate">{follower.email}</p>
                          <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-gray-600">
                            <span className="flex items-center gap-1">
                              <FiMapPin size={12} />
                              {follower.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <FiMessageCircle size={12} />
                              {follower.commentsCount}
                            </span>
                            <span className="flex items-center gap-1">
                              <FiEye size={12} />
                              {follower.postsViewed}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 ml-4">
                        <div className="text-right hidden sm:block">
                          <p className="text-xs text-gray-500 mb-1">Engagement</p>
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${
                                  follower.engagement >= 70 ? 'bg-emerald-500' :
                                  follower.engagement >= 40 ? 'bg-amber-500' :
                                  'bg-red-500'
                                }`}
                                style={{ width: `${follower.engagement}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-semibold text-gray-900">{follower.engagement}%</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {follower.status === 'blocked' ? (
                            <button
                              onClick={() => handleUnblock(follower.id)}
                              className="px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg hover:bg-emerald-100 text-sm font-medium transition-all"
                            >
                              Unblock
                            </button>
                          ) : (
                            <button
                              onClick={() => handleBlock(follower.id)}
                              className="px-3 py-1.5 bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-100 text-sm font-medium transition-all"
                            >
                              Block
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-1 flex items-center gap-2">
                  <FiBarChart2 className="text-emerald-600" size={18} />
                  Follower Growth & Engagement
                </h3>
                <p className="text-sm text-gray-500">Track your audience growth and activity patterns</p>
              </div>

              {/* Growth Chart */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Follower Growth (Last 7 Months)</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={growthData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#9ca3af" />
                    <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '12px'
                      }} 
                    />
                    <Line type="monotone" dataKey="followers" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Engagement Patterns */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Most Active Followers</h4>
                  <div className="space-y-3">
                    {followers
                      .sort((a, b) => b.engagement - a.engagement)
                      .slice(0, 5)
                      .map((f, idx) => (
                        <div key={f.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg flex items-center justify-center font-semibold text-emerald-600 text-sm">
                              {idx + 1}
                            </div>
                            <span className="font-medium text-gray-900">{f.name}</span>
                          </div>
                          <span className="text-emerald-600 font-semibold">{f.engagement}%</span>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Activity Metrics</h4>
                  <div className="space-y-4">
                    {[
                      { label: 'Avg Posts Viewed', value: 156, percentage: 78, color: 'blue' },
                      { label: 'Avg Comments', value: 23, percentage: 46, color: 'purple' },
                      { label: 'Avg Session Duration', value: '8m 34s', percentage: 65, color: 'emerald' }
                    ].map((metric, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-600">{metric.label}</span>
                          <span className="font-bold text-gray-900">{metric.value}</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full bg-${metric.color}-500 rounded-full transition-all`}
                            style={{ width: `${metric.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'demographics' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-1 flex items-center gap-2">
                  <FiPieChart className="text-emerald-600" size={18} />
                  Follower Demographics
                </h3>
                <p className="text-sm text-gray-500">Understand your audience composition</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Age Distribution */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Age Distribution</h4>
                  <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={ageDistribution}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                      <XAxis dataKey="range" tick={{ fontSize: 12 }} stroke="#9ca3af" />
                      <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px',
                          fontSize: '12px'
                        }} 
                      />
                      <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Gender Distribution */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Gender Distribution</h4>
                  <ResponsiveContainer width="100%" height={280}>
                    <PieChart>
                      <Pie
                        data={genderDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={(entry) => `${entry.gender}: ${entry.value}`}
                        outerRadius={90}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {genderDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Top Locations */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FiGlobe className="text-emerald-600" size={18} />
                  Top Locations
                </h4>
                <div className="space-y-3">
                  {topLocations.map((loc, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg flex items-center justify-center font-semibold text-blue-600 text-sm">
                          {idx + 1}
                        </div>
                        <span className="font-medium text-gray-900">{loc.location}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-500 rounded-full transition-all"
                            style={{ width: `${(loc.count / topLocations[0].count) * 100}%` }}
                          ></div>
                        </div>
                        <span className="font-semibold text-gray-900 w-16 text-right">{loc.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interest Segmentation */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FiTarget className="text-emerald-600" size={18} />
                  Interest Segmentation
                </h4>
                <div className="flex flex-wrap gap-3">
                  {['Technology', 'Design', 'AI', 'DevOps', 'Startup', 'UI/UX', 'Writing', 'Content'].map(interest => (
                    <div key={interest} className="px-4 py-2 bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-lg hover:border-emerald-300 hover:from-emerald-50 hover:to-teal-50 transition-all cursor-pointer">
                      <span className="font-medium text-gray-900 text-sm">{interest}</span>
                      <span className="ml-2 text-xs text-gray-500">
                        ({Math.floor(Math.random() * 500 + 200)})
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'communication' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-1 flex items-center gap-2">
                  <FiMail className="text-emerald-600" size={18} />
                  Follower Communication
                </h3>
                <p className="text-sm text-gray-500">Send announcements and track communication history</p>
              </div>

              {/* Send Announcement */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Send Announcement</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                    <input
                      type="text"
                      placeholder="Announcement subject..."
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400 outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <textarea
                      rows={5}
                      placeholder="Your message to followers..."
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400 outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
                    <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400 outline-none text-sm">
                      <option>All Followers</option>
                      <option>Active Followers Only</option>
                      <option>By Location</option>
                      <option>By Interest</option>
                    </select>
                  </div>
                  <button
                    onClick={() => toast.success('Announcement sent to all followers!')}
                    className="w-full px-4 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium transition-all flex items-center justify-center gap-2"
                  >
                    <FiSend size={16} />
                    Send Announcement
                  </button>
                </div>
              </div>

              {/* Recent Communications */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Recent Communications</h4>
                <div className="space-y-3">
                  {[
                    { subject: 'New Feature Launch', sent: '2 days ago', recipients: 3820, opened: 2890 },
                    { subject: 'Weekly Newsletter', sent: '1 week ago', recipients: 3650, opened: 2340 },
                    { subject: 'Important Update', sent: '2 weeks ago', recipients: 3420, opened: 3120 },
                  ].map((comm, idx) => (
                    <div key={idx} className="p-4 bg-gray-50 border border-gray-200 rounded-lg hover:border-emerald-200 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold text-gray-900">{comm.subject}</p>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <FiCalendar size={12} />
                          {comm.sent}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <FiMail size={14} />
                          {comm.recipients} sent
                        </span>
                        <span className="flex items-center gap-1">
                          <FiEye size={14} className="text-blue-600" />
                          {comm.opened} opened
                          <span className="text-blue-600 font-semibold">
                            ({((comm.opened / comm.recipients) * 100).toFixed(1)}%)
                          </span>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ 
  title, 
  value, 
  icon, 
  iconBg, 
  iconColor, 
  subtitle
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  subtitle: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className={`${iconBg} ${iconColor} p-2.5 rounded-lg`}>
          {icon}
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
      </div>
    </div>
  );
}
