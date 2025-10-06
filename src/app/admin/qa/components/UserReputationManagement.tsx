'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { 
  FiUsers, 
  FiAward,
  FiShield,
  FiEdit,
  FiEye,
  FiSearch,
  FiRefreshCw,
  FiDownload,
  FiPlus,
  FiMinus,
  FiCheck,
  FiX,
  FiClock,
  FiTrendingUp,
  FiMessageSquare,
  FiCheckCircle,
  FiThumbsUp
} from 'react-icons/fi';

interface QAUser {
  id: string;
  username: string;
  email: string;
  avatar: string;
  reputation: number;
  role: 'user' | 'moderator' | 'admin';
  status: 'active' | 'suspended' | 'banned';
  badges: number;
  stats: {
    questions: number;
    answers: number;
    acceptedAnswers: number;
    votes: number;
  };
  joinedAt: string;
  lastActive: string;
}

const mockUsers: QAUser[] = [
  {
    id: 'user-1',
    username: 'Alex Kumar',
    email: 'alex@example.com',
    avatar: '👨‍💻',
    reputation: 15678,
    role: 'user',
    status: 'active',
    badges: 12,
    stats: {
      questions: 45,
      answers: 234,
      acceptedAnswers: 189,
      votes: 1234,
    },
    joinedAt: new Date(2024, 3, 15).toISOString(),
    lastActive: new Date(2025, 9, 6, 12, 30).toISOString(),
  },
  {
    id: 'user-2',
    username: 'Sarah Chen',
    email: 'sarah@example.com',
    avatar: '👩‍💼',
    reputation: 14234,
    role: 'moderator',
    status: 'active',
    badges: 15,
    stats: {
      questions: 38,
      answers: 198,
      acceptedAnswers: 156,
      votes: 1089,
    },
    joinedAt: new Date(2024, 5, 20).toISOString(),
    lastActive: new Date(2025, 9, 6, 11, 45).toISOString(),
  },
  {
    id: 'user-3',
    username: 'SpamBot',
    email: 'spam@example.com',
    avatar: '🤖',
    reputation: -50,
    role: 'user',
    status: 'suspended',
    badges: 0,
    stats: {
      questions: 15,
      answers: 5,
      acceptedAnswers: 0,
      votes: -45,
    },
    joinedAt: new Date(2025, 9, 5).toISOString(),
    lastActive: new Date(2025, 9, 6, 9, 0).toISOString(),
  },
];

export default function UserReputationManagement() {
  const [users, setUsers] = useState(mockUsers);
  const [selectedUser, setSelectedUser] = useState<QAUser | null>(null);
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

  const handleAdjustReputation = (userId: string, amount: number) => {
    setUsers(users.map(u =>
      u.id === userId ? { ...u, reputation: u.reputation + amount } : u
    ));
    toast.success(`Reputation ${amount > 0 ? 'increased' : 'decreased'} by ${Math.abs(amount)}`);
  };

  const handleChangeRole = (userId: string, newRole: QAUser['role']) => {
    setUsers(users.map(u =>
      u.id === userId ? { ...u, role: newRole } : u
    ));
    toast.success(`Role changed to ${newRole}`);
  };

  const handleSuspend = (userId: string) => {
    setUsers(users.map(u =>
      u.id === userId ? { ...u, status: 'suspended' } : u
    ));
    toast.success('User suspended');
  };

  const handleBan = (userId: string) => {
    setUsers(users.map(u =>
      u.id === userId ? { ...u, status: 'banned' } : u
    ));
    toast.success('User banned');
  };

  const handleActivate = (userId: string) => {
    setUsers(users.map(u =>
      u.id === userId ? { ...u, status: 'active' } : u
    ));
    toast.success('User activated');
  };

  const getRoleConfig = (role: string) => {
    switch (role) {
      case 'admin': return { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300', icon: FiShield };
      case 'moderator': return { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-300', icon: FiShield };
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

  const getReputationColor = (reputation: number) => {
    if (reputation > 10000) return 'text-yellow-600';
    if (reputation > 5000) return 'text-blue-600';
    if (reputation > 0) return 'text-green-600';
    return 'text-red-600';
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User & Reputation Management</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage users, roles, permissions, and reputation scores
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
            <p className="text-sm text-green-700 font-medium">Active</p>
          </div>
          <p className="text-3xl font-bold text-green-700">{users.filter(u => u.status === 'active').length}</p>
          <p className="text-xs text-green-600 mt-1">{((users.filter(u => u.status === 'active').length / users.length) * 100).toFixed(1)}% of total</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-white rounded-lg">
              <FiShield className="text-purple-600" size={20} />
            </div>
            <p className="text-sm text-purple-700 font-medium">Moderators</p>
          </div>
          <p className="text-3xl font-bold text-purple-700">{users.filter(u => u.role === 'moderator').length}</p>
          <p className="text-xs text-purple-600 mt-1">Staff members</p>
        </div>

        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl border border-yellow-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-white rounded-lg">
              <FiAward className="text-yellow-600" size={20} />
            </div>
            <p className="text-sm text-yellow-700 font-medium">Avg Reputation</p>
          </div>
          <p className="text-3xl font-bold text-yellow-700">
            {Math.round(users.reduce((acc, u) => acc + u.reputation, 0) / users.length).toLocaleString()}
          </p>
          <p className="text-xs text-yellow-600 mt-1">Community score</p>
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
            <option value="moderator">Moderator</option>
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
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Reputation
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Activity
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
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
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex items-center gap-1 text-xs text-gray-500">
                                <FiAward size={11} className="text-yellow-500" />
                                <span>{user.badges} badges</span>
                              </div>
                              <span className="text-gray-300">•</span>
                              <div className="flex items-center gap-1 text-xs text-gray-500">
                                <FiClock size={11} />
                                <span>{formatTimeAgo(user.lastActive)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <span className={`text-2xl font-bold ${getReputationColor(user.reputation)}`}>
                            {user.reputation.toLocaleString()}
                          </span>
                          <div className="flex flex-col gap-1">
                            <button
                              onClick={() => handleAdjustReputation(user.id, 100)}
                              className="p-1 bg-green-50 text-green-600 rounded hover:bg-green-100 transition-colors"
                              title="Add 100 reputation"
                            >
                              <FiPlus size={12} />
                            </button>
                            <button
                              onClick={() => handleAdjustReputation(user.id, -100)}
                              className="p-1 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors"
                              title="Remove 100 reputation"
                            >
                              <FiMinus size={12} />
                            </button>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={user.role}
                          onChange={(e) => handleChangeRole(user.id, e.target.value as any)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${roleConfig.bg} ${roleConfig.text} ${roleConfig.border} focus:ring-2 focus:ring-blue-100 outline-none capitalize`}
                        >
                          <option value="user">User</option>
                          <option value="moderator">Moderator</option>
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
                            <FiMessageSquare size={14} className="text-gray-400" />
                            <span>{user.stats.questions} questions</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-gray-600">
                            <FiCheckCircle size={14} className="text-gray-400" />
                            <span>{user.stats.answers} answers ({user.stats.acceptedAnswers} accepted)</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-gray-600">
                            <FiThumbsUp size={14} className="text-gray-400" />
                            <span>{user.stats.votes} votes</span>
                          </div>
                        </div>
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
                                <FiX size={16} />
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() => handleActivate(user.id)}
                              className="p-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
                              title="Activate user"
                            >
                              <FiCheck size={16} />
                            </button>
                          )}
                          <button 
                            className="p-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                            title="View details"
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
    </div>
  );
}
