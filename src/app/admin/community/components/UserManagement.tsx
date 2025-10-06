'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { 
  FiUsers,
  FiCheckCircle,
  FiShield,
  FiAlertTriangle,
  FiMail,
  FiDownload,
  FiSearch,
  FiUser,
  FiClock,
  FiAward,
  FiMessageSquare,
  FiHeart,
  FiTrendingUp,
  FiEye,
  FiX,
  FiUserPlus,
  FiUserMinus,
  FiUserX
} from 'react-icons/fi';

interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  role: 'admin' | 'moderator' | 'mentor' | 'member';
  verified: boolean;
  joinedAt: string;
  lastActive: string;
  status: 'active' | 'suspended' | 'banned' | 'shadowbanned';
  stats: {
    posts: number;
    comments: number;
    reactions: number;
    points: number;
    badges: number;
    followers: number;
    following: number;
  };
  warnings: number;
  location?: string;
}

const mockUsers: User[] = [
  {
    id: 'user-1',
    name: 'Sarah Johnson',
    username: '@sarahjohn',
    email: 'sarah@example.com',
    avatar: 'https://i.pravatar.cc/150?img=1',
    role: 'member',
    verified: true,
    joinedAt: new Date(2024, 3, 15).toISOString(),
    lastActive: new Date(2025, 9, 6, 9, 30).toISOString(),
    status: 'active',
    stats: {
      posts: 234,
      comments: 567,
      reactions: 5678,
      points: 12450,
      badges: 15,
      followers: 892,
      following: 456,
    },
    warnings: 0,
    location: 'San Francisco, CA',
  },
  {
    id: 'user-2',
    name: 'Mike Chen',
    username: '@mikechen',
    email: 'mike@example.com',
    avatar: 'https://i.pravatar.cc/150?img=2',
    role: 'mentor',
    verified: true,
    joinedAt: new Date(2024, 6, 20).toISOString(),
    lastActive: new Date(2025, 9, 6, 8, 15).toISOString(),
    status: 'active',
    stats: {
      posts: 189,
      comments: 423,
      reactions: 4567,
      points: 9830,
      badges: 12,
      followers: 645,
      following: 234,
    },
    warnings: 0,
    location: 'New York, NY',
  },
  {
    id: 'user-3',
    name: 'Spam User',
    username: '@spambot',
    email: 'spam@example.com',
    avatar: 'https://i.pravatar.cc/150?img=3',
    role: 'member',
    verified: false,
    joinedAt: new Date(2025, 9, 5).toISOString(),
    lastActive: new Date(2025, 9, 6, 7, 0).toISOString(),
    status: 'suspended',
    stats: {
      posts: 45,
      comments: 123,
      reactions: 12,
      points: 230,
      badges: 1,
      followers: 3,
      following: 890,
    },
    warnings: 3,
    location: 'Unknown',
  },
];

export default function UserManagement() {
  const [users, setUsers] = useState(mockUsers);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleSuspendUser = (userId: string) => {
    setUsers(users.map(u =>
      u.id === userId ? { ...u, status: 'suspended' } : u
    ));
    toast.success('User suspended');
  };

  const handleBanUser = (userId: string) => {
    setUsers(users.map(u =>
      u.id === userId ? { ...u, status: 'banned' } : u
    ));
    toast.success('User banned');
  };

  const handleUnbanUser = (userId: string) => {
    setUsers(users.map(u =>
      u.id === userId ? { ...u, status: 'active', warnings: 0 } : u
    ));
    toast.success('User unbanned');
  };

  const handleVerifyUser = (userId: string) => {
    setUsers(users.map(u =>
      u.id === userId ? { ...u, verified: !u.verified } : u
    ));
    toast.success('Verification status updated');
  };

  const handleChangeRole = (userId: string, newRole: User['role']) => {
    setUsers(users.map(u =>
      u.id === userId ? { ...u, role: newRole } : u
    ));
    toast.success(`Role changed to ${newRole}`);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-50 text-red-700 border-red-200';
      case 'moderator': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'mentor': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'member': return 'bg-gray-50 text-gray-700 border-gray-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getRoleIcon = (role: string, size = 10) => {
    switch (role) {
      case 'admin': return <FiShield size={size} />;
      case 'moderator': return <FiShield size={size} />;
      case 'mentor': return <FiAward size={size} />;
      case 'member': return <FiUser size={size} />;
      default: return <FiUser size={size} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'suspended': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'banned': return 'bg-red-50 text-red-700 border-red-200';
      case 'shadowbanned': return 'bg-orange-50 text-orange-700 border-orange-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string, size = 10) => {
    switch (status) {
      case 'active': return <FiCheckCircle size={size} />;
      case 'suspended': return <FiAlertTriangle size={size} />;
      case 'banned': return <FiUserX size={size} />;
      case 'shadowbanned': return <FiUserMinus size={size} />;
      default: return <FiUser size={size} />;
    }
  };

  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === 'active').length;
  const verifiedUsers = users.filter(u => u.verified).length;
  const mentorUsers = users.filter(u => u.role === 'mentor').length;
  const bannedUsers = users.filter(u => u.status === 'banned').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage all community members
          </p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm font-medium transition-all flex items-center gap-2">
            <FiMail size={16} />
            Send Message
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-all flex items-center gap-2">
            <FiDownload size={16} />
            Export Users
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <StatCard
          title="Total Users"
          value={totalUsers}
          icon={<FiUsers size={20} />}
          iconBg="bg-gray-50"
          iconColor="text-gray-600"
        />
        <StatCard
          title="Active"
          value={activeUsers}
          icon={<FiCheckCircle size={20} />}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
        />
        <StatCard
          title="Verified"
          value={verifiedUsers}
          icon={<FiShield size={20} />}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
        />
        <StatCard
          title="Mentors"
          value={mentorUsers}
          icon={<FiAward size={20} />}
          iconBg="bg-purple-50"
          iconColor="text-purple-600"
        />
        <StatCard
          title="Banned"
          value={bannedUsers}
          icon={<FiUserX size={20} />}
          iconBg="bg-red-50"
          iconColor="text-red-600"
        />
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search users by name, email, or username..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm"
            />
          </div>
          
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="moderator">Moderator</option>
            <option value="mentor">Mentor</option>
            <option value="member">Member</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
            <option value="banned">Banned</option>
            <option value="shadowbanned">Shadowbanned</option>
          </select>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedUsers.length > 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="font-semibold text-gray-900">{selectedUsers.length} users selected</span>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-all flex items-center gap-2">
              <FiMail size={14} />
              Message All
            </button>
            <button className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 text-sm font-medium transition-all flex items-center gap-2">
              <FiAlertTriangle size={14} />
              Warn All
            </button>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-medium transition-all flex items-center gap-2">
              <FiUserX size={14} />
              Suspend All
            </button>
            <button
              onClick={() => setSelectedUsers([])}
              className="ml-auto px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium transition-all flex items-center gap-2"
            >
              <FiX size={14} />
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedUsers(filteredUsers.map(u => u.id));
                      } else {
                        setSelectedUsers([]);
                      }
                    }}
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">User</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Role</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Stats</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Last Active</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map(user => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300"
                      checked={selectedUsers.includes(user.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedUsers([...selectedUsers, user.id]);
                        } else {
                          setSelectedUsers(selectedUsers.filter(id => id !== user.id));
                        }
                      }}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full border-2 border-gray-200" />
                      <div>
                        <p className="font-semibold text-gray-900 flex items-center gap-1">
                          {user.name}
                          {user.verified && <FiCheckCircle className="text-blue-600" size={14} />}
                        </p>
                        <p className="text-sm text-gray-600">{user.username}</p>
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <FiMail size={10} />
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold capitalize border ${getRoleColor(user.role)}`}>
                      {getRoleIcon(user.role)}
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold capitalize border ${getStatusColor(user.status)}`}>
                      {getStatusIcon(user.status)}
                      {user.status}
                    </span>
                    {user.warnings > 0 && (
                      <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                        <FiAlertTriangle size={10} />
                        {user.warnings} warnings
                      </p>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    <p className="flex items-center gap-1">
                      <FiMessageSquare size={12} />
                      {user.stats.posts} posts
                    </p>
                    <p className="flex items-center gap-1">
                      <FiTrendingUp size={12} />
                      {user.stats.points} points
                    </p>
                    <p className="flex items-center gap-1">
                      <FiUserPlus size={12} />
                      {user.stats.followers} followers
                    </p>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    <p className="flex items-center gap-1">
                      <FiClock size={12} />
                      {new Date(user.lastActive).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      {user.status === 'active' ? (
                        <>
                          <button
                            onClick={() => handleSuspendUser(user.id)}
                            className="px-3 py-1.5 bg-amber-50 text-amber-700 border border-amber-200 rounded-lg text-xs font-medium hover:bg-amber-100 transition-colors"
                          >
                            Suspend
                          </button>
                          <button
                            onClick={() => handleBanUser(user.id)}
                            className="px-3 py-1.5 bg-red-50 text-red-700 border border-red-200 rounded-lg text-xs font-medium hover:bg-red-100 transition-colors"
                          >
                            Ban
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => handleUnbanUser(user.id)}
                          className="px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-medium hover:bg-emerald-100 transition-colors"
                        >
                          Unban
                        </button>
                      )}
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="px-3 py-1.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg text-xs font-medium hover:bg-blue-100 transition-colors flex items-center gap-1"
                      >
                        <FiEye size={12} />
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {filteredUsers.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiUsers size={24} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No users found</h3>
          <p className="text-sm text-gray-500">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}

function StatCard({ title, value, icon, iconBg, iconColor }: any) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className={`${iconBg} ${iconColor} p-2.5 rounded-lg`}>
          {icon}
        </div>
      </div>
      <p className="text-sm text-gray-600 font-medium">{title}</p>
      <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
    </div>
  );
}
