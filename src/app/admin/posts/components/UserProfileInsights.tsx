'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { 
  FiUsers, 
  FiAward,
  FiShield,
  FiFlag,
  FiSearch,
  FiRefreshCw,
  FiDownload,
  FiEye,
  FiCheck,
  FiX,
  FiClock,
  FiTrendingUp,
  FiActivity,
  FiHeart,
  FiMessageSquare,
  FiUserCheck,
  FiUserX,
  FiAlertCircle
} from 'react-icons/fi';

interface UserActivity {
  id: string;
  username: string;
  email: string;
  avatar: string;
  role: 'user' | 'verified' | 'influencer' | 'admin';
  status: 'active' | 'suspended' | 'banned';
  stats: {
    posts: number;
    comments: number;
    reactions: number;
    followers: number;
    following: number;
  };
  engagementRate: number;
  reactionToPostRatio: number;
  flaggedCount: number;
  joinedAt: string;
  lastActive: string;
}

const mockUsers: UserActivity[] = [
  {
    id: 'user-1',
    username: 'Sarah Johnson',
    email: 'sarah@example.com',
    avatar: '👩‍💼',
    role: 'influencer',
    status: 'active',
    stats: {
      posts: 145,
      comments: 567,
      reactions: 2345,
      followers: 5678,
      following: 234,
    },
    engagementRate: 12.5,
    reactionToPostRatio: 16.2,
    flaggedCount: 0,
    joinedAt: new Date(2024, 3, 15).toISOString(),
    lastActive: new Date(2025, 9, 8, 9, 30).toISOString(),
  },
  {
    id: 'user-2',
    username: 'Mike Chen',
    email: 'mike@example.com',
    avatar: '👨‍💻',
    role: 'verified',
    status: 'active',
    stats: {
      posts: 98,
      comments: 423,
      reactions: 1876,
      followers: 3456,
      following: 189,
    },
    engagementRate: 10.8,
    reactionToPostRatio: 19.1,
    flaggedCount: 0,
    joinedAt: new Date(2024, 5, 20).toISOString(),
    lastActive: new Date(2025, 9, 8, 8, 15).toISOString(),
  },
  {
    id: 'user-99',
    username: 'Spam Bot',
    email: 'spam@fake.com',
    avatar: '🤖',
    role: 'user',
    status: 'suspended',
    stats: {
      posts: 56,
      comments: 12,
      reactions: 5,
      followers: 3,
      following: 0,
    },
    engagementRate: 0.2,
    reactionToPostRatio: 0.1,
    flaggedCount: 15,
    joinedAt: new Date(2025, 9, 5).toISOString(),
    lastActive: new Date(2025, 9, 8, 8, 0).toISOString(),
  },
];

export default function UserProfileInsights() {
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleSuspend = (userId: string) => {
    setUsers(users.map(u =>
      u.id === userId ? { ...u, status: 'suspended' } : u
    ));
    toast.success('User suspended - posting privileges revoked');
  };

  const handleBan = (userId: string) => {
    setUsers(users.map(u =>
      u.id === userId ? { ...u, status: 'banned' } : u
    ));
    toast.success('User banned from platform');
  };

  const handleActivate = (userId: string) => {
    setUsers(users.map(u =>
      u.id === userId ? { ...u, status: 'active' } : u
    ));
    toast.success('User activated successfully');
  };

  const handleChangeRole = (userId: string, newRole: UserActivity['role']) => {
    setUsers(users.map(u =>
      u.id === userId ? { ...u, role: newRole } : u
    ));
    toast.success(`Role changed to ${newRole}`);
  };

  const getRoleConfig = (role: string) => {
    switch (role) {
      case 'admin': return { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300', icon: FiShield };
      case 'influencer': return { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-300', icon: FiAward };
      case 'verified': return { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-300', icon: FiUserCheck };
      case 'user': return { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-300', icon: FiUsers };
      default: return { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-300', icon: FiUsers };
    }
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'active': return { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-300', dot: 'bg-green-500' };
      case 'suspended': return { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-300', dot: 'bg-yellow-500' };
      case 'banned': return { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300', dot: 'bg-red-500' };
      default: return { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-300', dot: 'bg-gray-500' };
    }
  };

  const topCreators = users
    .filter(u => u.status === 'active')
    .sort((a, b) => b.stats.posts - a.stats.posts)
    .slice(0, 5);

  const flaggedUsers = users.filter(u => u.flaggedCount > 0);

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User & Profile Insights</h1>
          <p className="text-sm text-gray-500 mt-1">
            Track user activity, engagement metrics, and manage user accounts
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm font-medium">
            <FiRefreshCw size={16} />
            Refresh
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm font-medium">
            <FiDownload size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-blue-50 rounded-lg">
              <FiUsers className="text-blue-600" size={20} />
            </div>
            <p className="text-sm text-gray-600 font-medium">Total Users</p>
          </div>
          <p className="text-3xl font-bold text-gray-900">{users.length}</p>
          <p className="text-xs text-gray-500 mt-1">Registered members</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-white rounded-lg">
              <FiCheck className="text-green-600" size={20} />
            </div>
            <p className="text-sm text-green-700 font-medium">Active Users</p>
          </div>
          <p className="text-3xl font-bold text-green-700">{users.filter(u => u.status === 'active').length}</p>
          <p className="text-xs text-green-600 mt-1">{((users.filter(u => u.status === 'active').length / users.length) * 100).toFixed(1)}% of total</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-white rounded-lg">
              <FiAward className="text-purple-600" size={20} />
            </div>
            <p className="text-sm text-purple-700 font-medium">Influencers</p>
          </div>
          <p className="text-3xl font-bold text-purple-700">{users.filter(u => u.role === 'influencer').length}</p>
          <p className="text-xs text-purple-600 mt-1">Top creators</p>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl border border-red-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-white rounded-lg">
              <FiFlag className="text-red-600" size={20} />
            </div>
            <p className="text-sm text-red-700 font-medium">Flagged Users</p>
          </div>
          <p className="text-3xl font-bold text-red-700">{flaggedUsers.length}</p>
          <p className="text-xs text-red-600 mt-1">Requires review</p>
        </div>
      </div>

      {/* Top Creators */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
            <FiAward className="text-yellow-600" size={18} />
            Top Creators
          </h3>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            View Leaderboard
          </button>
        </div>
        <div className="space-y-3">
          {topCreators.map((user, idx) => (
            <div key={user.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50/30 transition-all">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0 ${
                  idx === 0 ? 'bg-gradient-to-br from-yellow-400 to-yellow-500 text-white' :
                  idx === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-white' :
                  idx === 2 ? 'bg-gradient-to-br from-orange-400 to-orange-500 text-white' :
                  'bg-purple-50 text-purple-700'
                }`}>
                  {idx + 1}
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                  {user.avatar}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{user.username}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                    <span className="flex items-center gap-1">
                      <FiActivity size={11} />
                      {user.stats.posts} posts
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <FiUsers size={11} />
                      {user.stats.followers.toLocaleString()} followers
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-green-600">{user.engagementRate}%</p>
                <p className="text-xs text-gray-500">engagement</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm"
            />
          </div>
          
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="influencer">Influencer</option>
            <option value="verified">Verified</option>
            <option value="user">User</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
            <option value="banned">Banned</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing <span className="font-semibold text-gray-900">{filteredUsers.length}</span> of <span className="font-semibold text-gray-900">{users.length}</span> users
        </p>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">User</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Activity</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Engagement</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <FiUsers className="mx-auto text-gray-300 mb-3" size={48} />
                    <p className="text-gray-500 font-medium">No users found</p>
                    <p className="text-sm text-gray-400 mt-1">Try adjusting your filters</p>
                  </td>
                </tr>
              ) : (
                filteredUsers.map(user => {
                  const roleConfig = getRoleConfig(user.role);
                  const statusConfig = getStatusConfig(user.status);
                  
                  return (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                            {user.avatar}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{user.username}</p>
                            <p className="text-xs text-gray-500">{user.email}</p>
                            {user.flaggedCount > 0 && (
                              <div className="flex items-center gap-1 text-xs text-red-600 mt-1">
                                <FiFlag size={10} />
                                <span>{user.flaggedCount} reports</span>
                              </div>
                            )}
                            <p className="text-xs text-gray-400 mt-1">{formatTimeAgo(user.lastActive)}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={user.role}
                          onChange={(e) => handleChangeRole(user.id, e.target.value as any)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${roleConfig.bg} ${roleConfig.text} ${roleConfig.border} capitalize`}
                        >
                          <option value="user">User</option>
                          <option value="verified">Verified</option>
                          <option value="influencer">Influencer</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}>
                          <div className={`w-2 h-2 rounded-full ${statusConfig.dot} ${user.status === 'active' ? 'animate-pulse' : ''}`}></div>
                          <span className="capitalize">{user.status}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center gap-1.5 text-gray-600">
                            <FiActivity size={12} className="text-gray-400" />
                            <span>{user.stats.posts} posts</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-gray-600">
                            <FiMessageSquare size={12} className="text-gray-400" />
                            <span>{user.stats.comments} comments</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-gray-600">
                            <FiUsers size={12} className="text-gray-400" />
                            <span>{user.stats.followers.toLocaleString()} followers</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-2xl font-bold text-green-600">{user.engagementRate}%</p>
                        <p className="text-xs text-gray-500">engagement rate</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          {user.status === 'active' ? (
                            <>
                              <button
                                onClick={() => handleSuspend(user.id)}
                                className="p-2 bg-yellow-50 text-yellow-700 rounded-lg hover:bg-yellow-100 transition-colors"
                                title="Suspend user"
                              >
                                <FiClock size={16} />
                              </button>
                              <button
                                onClick={() => handleBan(user.id)}
                                className="p-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors"
                                title="Ban user"
                              >
                                <FiUserX size={16} />
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() => handleActivate(user.id)}
                              className="p-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
                              title="Activate user"
                            >
                              <FiUserCheck size={16} />
                            </button>
                          )}
                          <button 
                            className="p-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                            title="View profile"
                          >
                            <FiEye size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inactive Users Alert */}
      <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-white rounded-lg">
            <FiAlertCircle className="text-orange-600" size={20} />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-semibold text-orange-900 mb-2">Inactive Users Detection</h3>
            <p className="text-sm text-orange-700 mb-3">
              <strong>45 users</strong> haven't posted in the last 30 days. Consider sending re-engagement campaigns to bring them back to the platform.
            </p>
            <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium">
              Create Campaign
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
