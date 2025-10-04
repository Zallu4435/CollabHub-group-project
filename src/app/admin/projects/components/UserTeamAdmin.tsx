'use client';

import { useState } from 'react';
import { User, Team, UserRole } from '../types/project-admin';
import toast from 'react-hot-toast';
import { 
  FiUsers,
  FiUser,
  FiShield,
  FiSearch,
  FiMoreVertical,
  FiEye,
  FiEdit2,
  FiTrash2,
  FiCheckCircle,
  FiAlertCircle,
  FiClock,
  FiMail,
  FiCalendar,
  FiDatabase,
  FiX,
  FiUserPlus,
  FiUserMinus,
  FiUserCheck
} from 'react-icons/fi';

// Mock users
const mockUsers: User[] = [
  {
    id: 'user-1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://i.pravatar.cc/150?img=1',
    role: 'owner',
    status: 'active',
    joinedAt: new Date(2024, 5, 15).toISOString(),
    lastActive: new Date(2025, 9, 4, 10, 30).toISOString(),
    stats: { projectsOwned: 5, tasksCompleted: 234, messagesSent: 1420, meetingsHosted: 23 },
    storageUsed: 847,
    storageLimit: 2000,
  },
  {
    id: 'user-2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    avatar: 'https://i.pravatar.cc/150?img=2',
    role: 'editor',
    status: 'active',
    joinedAt: new Date(2024, 6, 20).toISOString(),
    lastActive: new Date(2025, 9, 4, 9, 15).toISOString(),
    stats: { projectsOwned: 3, tasksCompleted: 189, messagesSent: 890, meetingsHosted: 12 },
    storageUsed: 456,
    storageLimit: 1000,
  },
  {
    id: 'user-3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    avatar: 'https://i.pravatar.cc/150?img=3',
    role: 'viewer',
    status: 'active',
    joinedAt: new Date(2025, 0, 10).toISOString(),
    lastActive: new Date(2025, 9, 3, 18, 45).toISOString(),
    stats: { projectsOwned: 1, tasksCompleted: 67, messagesSent: 234, meetingsHosted: 4 },
    storageUsed: 123,
    storageLimit: 500,
  },
  {
    id: 'user-4',
    name: 'Sarah Williams',
    email: 'sarah@example.com',
    avatar: 'https://i.pravatar.cc/150?img=4',
    role: 'admin',
    status: 'suspended',
    joinedAt: new Date(2024, 3, 5).toISOString(),
    lastActive: new Date(2025, 8, 20).toISOString(),
    stats: { projectsOwned: 2, tasksCompleted: 145, messagesSent: 567, meetingsHosted: 8 },
    storageUsed: 234,
    storageLimit: 1000,
  },
];

// Mock teams
const mockTeams: Team[] = [
  {
    id: 'team-1',
    name: 'Web Dev Warriors',
    description: 'Building modern web applications',
    avatar: 'https://i.pravatar.cc/150?img=10',
    ownerId: 'user-1',
    ownerName: 'John Doe',
    createdAt: new Date(2024, 5, 15).toISOString(),
    memberCount: 8,
    projectCount: 5,
    status: 'active',
    members: [
      { userId: 'user-1', name: 'John Doe', role: 'owner', joinedAt: new Date(2024, 5, 15).toISOString() },
      { userId: 'user-2', name: 'Jane Smith', role: 'admin', joinedAt: new Date(2024, 6, 1).toISOString() },
      { userId: 'user-3', name: 'Mike Johnson', role: 'editor', joinedAt: new Date(2024, 7, 10).toISOString() },
    ],
  },
  {
    id: 'team-2',
    name: 'AI Innovators',
    description: 'Exploring artificial intelligence and machine learning',
    avatar: 'https://i.pravatar.cc/150?img=11',
    ownerId: 'user-3',
    ownerName: 'Mike Johnson',
    createdAt: new Date(2024, 7, 20).toISOString(),
    memberCount: 5,
    projectCount: 3,
    status: 'active',
    members: [
      { userId: 'user-3', name: 'Mike Johnson', role: 'owner', joinedAt: new Date(2024, 7, 20).toISOString() },
      { userId: 'user-4', name: 'Sarah Williams', role: 'editor', joinedAt: new Date(2024, 8, 5).toISOString() },
    ],
  },
  {
    id: 'team-3',
    name: 'DevOps Masters',
    description: 'Infrastructure and deployment automation',
    avatar: 'https://i.pravatar.cc/150?img=12',
    ownerId: 'user-2',
    ownerName: 'Jane Smith',
    createdAt: new Date(2025, 1, 10).toISOString(),
    memberCount: 3,
    projectCount: 1,
    status: 'inactive',
    members: [
      { userId: 'user-2', name: 'Jane Smith', role: 'owner', joinedAt: new Date(2025, 1, 10).toISOString() },
    ],
  },
];

export default function UserTeamAdmin() {
  const [activeTab, setActiveTab] = useState<'users' | 'teams'>('users');
  const [users, setUsers] = useState(mockUsers);
  const [teams, setTeams] = useState(mockTeams);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || u.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const filteredTeams = teams.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         t.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSuspendUser = (userId: string) => {
    setUsers(users.map(u => 
      u.id === userId ? { ...u, status: 'suspended' } : u
    ));
    toast.success('User suspended');
  };

  const handleActivateUser = (userId: string) => {
    setUsers(users.map(u => 
      u.id === userId ? { ...u, status: 'active' } : u
    ));
    toast.success('User activated');
  };

  const handleBanUser = (userId: string) => {
    if (confirm('Ban this user permanently?')) {
      setUsers(users.map(u => 
        u.id === userId ? { ...u, status: 'banned' } : u
      ));
      toast.success('User banned');
    }
  };

  const handleChangeRole = (userId: string, newRole: UserRole) => {
    setUsers(users.map(u => 
      u.id === userId ? { ...u, role: newRole } : u
    ));
    toast.success(`Role updated to ${newRole}`);
  };

  const handleDisbandTeam = (teamId: string) => {
    if (confirm('Disband this team? All members will be removed.')) {
      setTeams(teams.filter(t => t.id !== teamId));
      toast.success('Team disbanded');
    }
  };

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case 'admin': return 'bg-red-50 text-red-700 border-red-200';
      case 'owner': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'editor': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'viewer': return 'bg-gray-50 text-gray-700 border-gray-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-emerald-600 bg-emerald-500';
      case 'suspended': return 'text-amber-600 bg-amber-500';
      case 'banned': return 'text-red-600 bg-red-500';
      case 'inactive': return 'text-gray-600 bg-gray-500';
      default: return 'text-gray-600 bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User & Team Administration</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage users, teams, roles, and permissions
          </p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-all flex items-center gap-2">
          <FiUserPlus size={16} />
          Invite User
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Total Users"
          value={users.length}
          icon={<FiUsers size={20} />}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
        />
        <StatCard
          title="Active Users"
          value={users.filter(u => u.status === 'active').length}
          icon={<FiCheckCircle size={20} />}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
        />
        <StatCard
          title="Total Teams"
          value={teams.length}
          icon={<FiUsers size={20} />}
          iconBg="bg-purple-50"
          iconColor="text-purple-600"
        />
        <StatCard
          title="Suspended"
          value={users.filter(u => u.status === 'suspended').length}
          icon={<FiAlertCircle size={20} />}
          iconBg="bg-amber-50"
          iconColor="text-amber-600"
        />
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="flex border-b border-gray-200">
          {(['users', 'teams'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setSearchTerm('');
                setRoleFilter('all');
                setStatusFilter('all');
              }}
              className={`flex-1 px-6 py-4 font-medium text-sm transition-all relative flex items-center justify-center gap-2 ${
                activeTab === tab
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {tab === 'users' ? <FiUser size={18} /> : <FiUsers size={18} />}
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
              )}
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder={`Search ${activeTab}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm"
              />
            </div>
            
            {activeTab === 'users' && (
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium"
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="owner">Owner</option>
                <option value="editor">Editor</option>
                <option value="viewer">Viewer</option>
              </select>
            )}

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              {activeTab === 'users' ? (
                <>
                  <option value="suspended">Suspended</option>
                  <option value="banned">Banned</option>
                </>
              ) : (
                <option value="inactive">Inactive</option>
              )}
            </select>
          </div>

          {/* Users List */}
          {activeTab === 'users' && (
            <div className="space-y-4">
              {filteredUsers.map(user => (
                <div key={user.id} className="p-5 border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="relative flex-shrink-0">
                      <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-full border-2 border-gray-100" />
                      <span className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(user.status).split(' ')[1]} border-2 border-white rounded-full`}></span>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-bold text-gray-900">{user.name}</h3>
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold capitalize border ${getRoleColor(user.role)}`}>
                          <FiShield size={12} />
                          {user.role}
                        </span>
                        <span className={`inline-flex items-center gap-1 text-xs font-medium ${getStatusColor(user.status).split(' ')[0]}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${getStatusColor(user.status).split(' ')[1]}`}></span>
                          {user.status}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
                        <FiMail size={14} />
                        {user.email}
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-4 gap-3 mb-4">
                        <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg text-center">
                          <p className="text-lg font-bold text-gray-900">{user.stats.projectsOwned}</p>
                          <p className="text-xs text-gray-600">Projects</p>
                        </div>
                        <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-lg text-center">
                          <p className="text-lg font-bold text-gray-900">{user.stats.tasksCompleted}</p>
                          <p className="text-xs text-gray-600">Tasks</p>
                        </div>
                        <div className="p-3 bg-purple-50 border border-purple-100 rounded-lg text-center">
                          <p className="text-lg font-bold text-gray-900">{user.stats.messagesSent}</p>
                          <p className="text-xs text-gray-600">Messages</p>
                        </div>
                        <div className="p-3 bg-orange-50 border border-orange-100 rounded-lg text-center">
                          <p className="text-lg font-bold text-gray-900">{user.storageUsed}MB</p>
                          <p className="text-xs text-gray-600">Storage</p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => setSelectedUser(user)}
                          className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-all flex items-center gap-1.5"
                        >
                          <FiEye size={14} />
                          Details
                        </button>
                        
                        <select
                          value={user.role}
                          onChange={(e) => handleChangeRole(user.id, e.target.value as UserRole)}
                          className="px-3 py-1.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium"
                        >
                          <option value="admin">Admin</option>
                          <option value="owner">Owner</option>
                          <option value="editor">Editor</option>
                          <option value="viewer">Viewer</option>
                        </select>

                        {user.status === 'active' ? (
                          <button
                            onClick={() => handleSuspendUser(user.id)}
                            className="px-3 py-1.5 bg-amber-50 text-amber-700 border border-amber-200 rounded-lg hover:bg-amber-100 text-sm font-medium transition-all flex items-center gap-1.5"
                          >
                            <FiUserMinus size={14} />
                            Suspend
                          </button>
                        ) : user.status === 'suspended' ? (
                          <button
                            onClick={() => handleActivateUser(user.id)}
                            className="px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg hover:bg-emerald-100 text-sm font-medium transition-all flex items-center gap-1.5"
                          >
                            <FiUserCheck size={14} />
                            Activate
                          </button>
                        ) : null}

                        {user.status !== 'banned' && (
                          <button
                            onClick={() => handleBanUser(user.id)}
                            className="ml-auto px-3 py-1.5 bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-100 text-sm font-medium transition-all flex items-center gap-1.5"
                          >
                            <FiTrash2 size={14} />
                            Ban
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Teams List */}
          {activeTab === 'teams' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredTeams.map(team => (
                <div key={team.id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-32 bg-gradient-to-r from-blue-500 to-purple-600">
                    <div className="absolute -bottom-12 left-6">
                      <img src={team.avatar} alt={team.name} className="w-24 h-24 rounded-full border-4 border-white shadow-md" />
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                        team.status === 'active' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : 'bg-gray-100 text-gray-700 border border-gray-200'
                      }`}>
                        {team.status === 'active' ? <FiCheckCircle size={10} /> : <FiAlertCircle size={10} />}
                        {team.status.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div className="pt-14 p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{team.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{team.description}</p>

                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-4 p-2 bg-gray-50 rounded-lg">
                      <FiUser size={14} />
                      <span>Owner: <span className="font-medium text-gray-900">{team.ownerName}</span></span>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg text-center">
                        <p className="text-lg font-bold text-gray-900">{team.memberCount}</p>
                        <p className="text-xs text-gray-600">Members</p>
                      </div>
                      <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-lg text-center">
                        <p className="text-lg font-bold text-gray-900">{team.projectCount}</p>
                        <p className="text-xs text-gray-600">Projects</p>
                      </div>
                      <div className="p-3 bg-purple-50 border border-purple-100 rounded-lg text-center">
                        <p className="text-lg font-bold text-gray-900">{team.members.length}</p>
                        <p className="text-xs text-gray-600">Active</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedTeam(team)}
                        className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-all flex items-center justify-center gap-2"
                      >
                        <FiUsers size={14} />
                        View Members
                      </button>
                      <button
                        onClick={() => handleDisbandTeam(team.id)}
                        className="px-3 py-2 bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-100 text-sm font-medium transition-all flex items-center gap-2"
                      >
                        <FiTrash2 size={14} />
                        Disband
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty States */}
          {activeTab === 'users' && filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiUser size={24} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No users found</h3>
              <p className="text-sm text-gray-500">Try adjusting your search or filters</p>
            </div>
          )}

          {activeTab === 'teams' && filteredTeams.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiUsers size={24} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No teams found</h3>
              <p className="text-sm text-gray-500">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>

      {/* User Details Modal */}
      {selectedUser && (
        <UserDetailsModal user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}

      {/* Team Details Modal */}
      {selectedTeam && (
        <TeamDetailsModal team={selectedTeam} onClose={() => setSelectedTeam(null)} />
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

function UserDetailsModal({ user, onClose }: { user: User; onClose: () => void }) {
  const storagePercentage = (user.storageUsed / user.storageLimit) * 100;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-xl border border-gray-200 max-w-2xl w-full shadow-2xl animate-slideUp">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FiUser className="text-blue-600" size={20} />
              </div>
              <h2 className="text-xl font-bold text-gray-900">User Details</h2>
            </div>
            <button 
              onClick={onClose} 
              className="p-2 text-gray-500 hover:bg-white hover:text-gray-700 rounded-lg transition-all"
            >
              <FiX size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="space-y-6">
            {/* User Info */}
            <div className="flex items-center gap-4">
              <img src={user.avatar} alt={user.name} className="w-20 h-20 rounded-full border-4 border-gray-100" />
              <div>
                <h3 className="text-xl font-bold text-gray-900">{user.name}</h3>
                <div className="flex items-center gap-1 text-gray-600 mt-1">
                  <FiMail size={14} />
                  <p className="text-sm">{user.email}</p>
                </div>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">Role</p>
                <p className="font-bold text-gray-900 capitalize">{user.role}</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">Status</p>
                <p className="font-bold text-gray-900 capitalize">{user.status}</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-lg">
                <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                  <FiCalendar size={12} />
                  Joined
                </p>
                <p className="font-bold text-gray-900">{new Date(user.joinedAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-lg">
                <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                  <FiClock size={12} />
                  Last Active
                </p>
                <p className="font-bold text-gray-900">{new Date(user.lastActive).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}</p>
              </div>
            </div>

            {/* Storage Usage */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                  <FiDatabase className="text-blue-600" size={16} />
                  Storage Usage
                </h4>
                <span className="text-sm font-medium text-gray-600">
                  {user.storageUsed}MB / {user.storageLimit}MB
                </span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full transition-all"
                  style={{ width: `${storagePercentage}%` }}
                ></div>
              </div>
            </div>

            {/* Activity Stats */}
            <div className="grid grid-cols-4 gap-3">
              <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg text-center">
                <p className="text-lg font-bold text-gray-900">{user.stats.projectsOwned}</p>
                <p className="text-xs text-gray-600">Projects</p>
              </div>
              <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-lg text-center">
                <p className="text-lg font-bold text-gray-900">{user.stats.tasksCompleted}</p>
                <p className="text-xs text-gray-600">Tasks</p>
              </div>
              <div className="p-3 bg-purple-50 border border-purple-100 rounded-lg text-center">
                <p className="text-lg font-bold text-gray-900">{user.stats.messagesSent}</p>
                <p className="text-xs text-gray-600">Messages</p>
              </div>
              <div className="p-3 bg-orange-50 border border-orange-100 rounded-lg text-center">
                <p className="text-lg font-bold text-gray-900">{user.stats.meetingsHosted}</p>
                <p className="text-xs text-gray-600">Meetings</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

function TeamDetailsModal({ team, onClose }: { team: Team; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-xl border border-gray-200 max-w-2xl w-full shadow-2xl animate-slideUp">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-pink-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <FiUsers className="text-purple-600" size={20} />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Team Members</h2>
            </div>
            <button 
              onClick={onClose} 
              className="p-2 text-gray-500 hover:bg-white hover:text-gray-700 rounded-lg transition-all"
            >
              <FiX size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="space-y-3">
            {team.members.map(member => (
              <div key={member.userId} className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-lg hover:shadow-sm transition-shadow">
                <div>
                  <p className="font-semibold text-gray-900">{member.name}</p>
                  <p className="text-sm text-gray-600 capitalize flex items-center gap-1 mt-1">
                    <FiShield size={12} />
                    {member.role}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <FiCalendar size={10} />
                    Joined
                  </p>
                  <span className="text-sm font-medium text-gray-900">
                    {new Date(member.joinedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
