'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { 
  FiSearch, 
  FiUserPlus, 
  FiUsers,
  FiFileText,
  FiEye,
  FiCheckCircle,
  FiX,
  FiEdit,
  FiTrash2,
  FiClock,
  FiShield,
  FiCalendar,
  FiTrendingUp,
  FiPause,
  FiExternalLink,
  FiSettings
} from 'react-icons/fi';

interface Team {
  id: string;
  name: string;
  description: string;
  avatar: string;
  members: number;
  posts: number;
  views: number;
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
  owner: string;
  category: string;
}

// Mock teams data
const mockTeams: Team[] = [
  {
    id: 'team-1',
    name: 'Web Dev Warriors',
    description: 'A team focused on modern web development practices',
    avatar: 'https://i.pravatar.cc/150?img=10',
    members: 8,
    posts: 24,
    views: 15600,
    status: 'active',
    createdAt: new Date(2024, 5, 15).toISOString(),
    owner: 'John Doe',
    category: 'Technology',
  },
  {
    id: 'team-2',
    name: 'Design Collective',
    description: 'Exploring UI/UX design trends and best practices',
    avatar: 'https://i.pravatar.cc/150?img=11',
    members: 12,
    posts: 35,
    views: 28400,
    status: 'active',
    createdAt: new Date(2024, 3, 20).toISOString(),
    owner: 'Jane Smith',
    category: 'Design',
  },
  {
    id: 'team-3',
    name: 'DevOps Masters',
    description: 'Sharing DevOps knowledge and automation techniques',
    avatar: 'https://i.pravatar.cc/150?img=12',
    members: 6,
    posts: 18,
    views: 12300,
    status: 'active',
    createdAt: new Date(2024, 7, 10).toISOString(),
    owner: 'Mike Johnson',
    category: 'Technology',
  },
  {
    id: 'team-4',
    name: 'Content Creators Hub',
    description: 'Writing tips and content strategy discussions',
    avatar: 'https://i.pravatar.cc/150?img=13',
    members: 15,
    posts: 42,
    views: 35200,
    status: 'active',
    createdAt: new Date(2024, 2, 5).toISOString(),
    owner: 'Sarah Williams',
    category: 'Writing',
  },
  {
    id: 'team-5',
    name: 'AI Enthusiasts',
    description: 'Exploring artificial intelligence and machine learning',
    avatar: 'https://i.pravatar.cc/150?img=14',
    members: 4,
    posts: 8,
    views: 4200,
    status: 'pending',
    createdAt: new Date(2025, 9, 1).toISOString(),
    owner: 'David Brown',
    category: 'Technology',
  },
];

export default function TeamManagement() {
  const [teams, setTeams] = useState(mockTeams);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  const filteredTeams = teams.filter(team => {
    const matchesSearch = team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         team.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || team.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleApprove = (teamId: string) => {
    setTeams(teams.map(t => 
      t.id === teamId ? { ...t, status: 'active' as const } : t
    ));
    toast.success('Team approved!');
  };

  const handleDeactivate = (teamId: string) => {
    setTeams(teams.map(t => 
      t.id === teamId ? { ...t, status: 'inactive' as const } : t
    ));
    toast.success('Team deactivated');
  };

  const handleDelete = (teamId: string) => {
    if (confirm('Are you sure you want to delete this team?')) {
      setTeams(teams.filter(t => t.id !== teamId));
      toast.success('Team deleted');
    }
  };

  // Calculate stats
  const totalMembers = teams.reduce((acc, t) => acc + t.members, 0);
  const totalPosts = teams.reduce((acc, t) => acc + t.posts, 0);
  const activeTeams = teams.filter(t => t.status === 'active').length;
  const pendingTeams = teams.filter(t => t.status === 'pending').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Team Management</h1>
          <p className="text-sm text-gray-700 mt-1">
            Manage collaborative blog teams and their activities
          </p>
        </div>
        <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all text-sm font-medium flex items-center gap-2">
          <FiUserPlus size={16} />
          Create Team
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Total Teams"
          value={teams.length}
          icon={<FiUsers size={20} />}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
          subtitle="All teams"
        />
        <StatCard
          title="Active Teams"
          value={activeTeams}
          icon={<FiCheckCircle size={20} />}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
          subtitle="Currently active"
        />
        <StatCard
          title="Total Members"
          value={totalMembers}
          icon={<FiUserPlus size={20} />}
          iconBg="bg-purple-50"
          iconColor="text-purple-600"
          subtitle="Across all teams"
        />
        <StatCard
          title="Pending Approval"
          value={pendingTeams}
          icon={<FiClock size={20} />}
          iconBg="bg-orange-50"
          iconColor="text-orange-600"
          subtitle="Needs review"
        />
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search teams..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400 outline-none text-sm"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400 outline-none text-sm font-medium"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="inactive">Inactive</option>
          </select>
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
            <span className="text-sm text-gray-600">
              Showing <span className="font-semibold text-gray-900">{filteredTeams.length}</span> of {teams.length}
            </span>
          </div>
        </div>
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeams.map(team => (
          <div key={team.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all group">
            {/* Team Header with Cover */}
            <div className="relative h-28 bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>
              <div className="absolute top-3 right-3">
                <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold border backdrop-blur-sm ${
                  team.status === 'active' ? 'bg-emerald-500/90 text-white border-emerald-400' :
                  team.status === 'pending' ? 'bg-amber-500/90 text-white border-amber-400' :
                  'bg-gray-500/90 text-white border-gray-400'
                }`}>
                  {team.status.toUpperCase()}
                </span>
              </div>
              <div className="absolute -bottom-10 left-5">
                <div className="relative">
                  <img
                    src={team.avatar}
                    alt={team.name}
                    className="w-20 h-20 rounded-full ring-4 ring-white shadow-lg"
                  />
                  {team.status === 'active' && (
                    <div className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-white">
                      <FiCheckCircle size={12} className="text-white" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Team Content */}
            <div className="pt-12 px-5 pb-5">
              <h3 className="text-lg font-bold text-gray-900 mb-1 truncate group-hover:text-emerald-600 transition-colors">
                {team.name}
              </h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2 min-h-[40px]">
                {team.description}
              </p>

              {/* Owner & Category */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <FiShield size={12} />
                  <span className="font-medium">{team.owner}</span>
                </div>
                <span className="text-gray-300">•</span>
                <span className="text-xs text-gray-500">{team.category}</span>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mb-4 p-3 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200">
                <div className="text-center">
                  <p className="text-lg font-bold text-gray-900">{team.members}</p>
                  <p className="text-xs text-gray-500">Members</p>
                </div>
                <div className="text-center border-x border-gray-200">
                  <p className="text-lg font-bold text-gray-900">{team.posts}</p>
                  <p className="text-xs text-gray-500">Posts</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-gray-900">{(team.views / 1000).toFixed(1)}K</p>
                  <p className="text-xs text-gray-500">Views</p>
                </div>
              </div>

              {/* Created Date */}
              <div className="text-xs text-gray-500 mb-4 flex items-center gap-1">
                <FiCalendar size={12} />
                Created {new Date(team.createdAt).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedTeam(team)}
                  className="flex-1 px-3 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm font-medium transition-all flex items-center justify-center gap-1.5"
                >
                  <FiExternalLink size={14} />
                  View
                </button>
                {team.status === 'pending' && (
                  <button
                    onClick={() => handleApprove(team.id)}
                    className="px-3 py-2 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg hover:bg-emerald-100 text-sm font-medium transition-all"
                    title="Approve Team"
                  >
                    <FiCheckCircle size={16} />
                  </button>
                )}
                {team.status === 'active' && (
                  <button
                    onClick={() => handleDeactivate(team.id)}
                    className="px-3 py-2 bg-amber-50 text-amber-700 border border-amber-200 rounded-lg hover:bg-amber-100 text-sm font-medium transition-all"
                    title="Pause Team"
                  >
                    <FiPause size={16} />
                  </button>
                )}
                <button
                  onClick={() => handleDelete(team.id)}
                  className="px-3 py-2 bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-100 text-sm font-medium transition-all"
                  title="Delete Team"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredTeams.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiSearch size={24} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No teams found</h3>
          <p className="text-sm text-gray-500 mb-4">
            Try adjusting your search or filter criteria
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setStatusFilter('all');
            }}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm font-medium"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Team Details Modal */}
      {selectedTeam && (
        <TeamDetailsModal 
          team={selectedTeam} 
          onClose={() => setSelectedTeam(null)}
          onApprove={() => handleApprove(selectedTeam.id)}
          onDeactivate={() => handleDeactivate(selectedTeam.id)}
          onDelete={() => handleDelete(selectedTeam.id)}
        />
      )}
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
  value: number;
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

function TeamDetailsModal({ 
  team, 
  onClose,
  onApprove,
  onDeactivate,
  onDelete
}: { 
  team: Team; 
  onClose: () => void;
  onApprove: () => void;
  onDeactivate: () => void;
  onDelete: () => void;
}) {
  const members = [
    { name: 'John Doe', role: 'Owner', avatar: 'https://i.pravatar.cc/150?img=1', posts: 12, joined: '2024-05-15' },
    { name: 'Jane Smith', role: 'Editor', avatar: 'https://i.pravatar.cc/150?img=2', posts: 8, joined: '2024-06-20' },
    { name: 'Mike Johnson', role: 'Contributor', avatar: 'https://i.pravatar.cc/150?img=3', posts: 4, joined: '2024-07-10' },
  ];

  const avgViewsPerPost = team.posts > 0 ? Math.round(team.views / team.posts) : 0;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-xl border border-gray-200 max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-slideUp">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-emerald-50 to-teal-50">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Team Details</h2>
            <button 
              onClick={onClose} 
              className="p-2 text-gray-500 hover:bg-white hover:text-gray-700 rounded-lg transition-all"
            >
              <FiX size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="space-y-6">
            {/* Team Info Card */}
            <div className="flex items-start gap-4 p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
              <div className="relative">
                <img 
                  src={team.avatar} 
                  alt={team.name} 
                  className="w-20 h-20 rounded-full ring-4 ring-white shadow-md" 
                />
                {team.status === 'active' && (
                  <div className="absolute bottom-0 right-0 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-white">
                    <FiCheckCircle size={14} className="text-white" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{team.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{team.description}</p>
                    <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <FiShield size={14} />
                        Owner: {team.owner}
                      </span>
                      <span>•</span>
                      <span>{team.category}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <FiCalendar size={14} />
                        {new Date(team.createdAt).toLocaleDateString('en-US', { 
                          month: 'long', 
                          year: 'numeric' 
                        })}
                      </span>
                    </div>
                  </div>
                  <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                    team.status === 'active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                    team.status === 'pending' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                    'bg-gray-50 text-gray-700 border-gray-200'
                  }`}>
                    {team.status.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <FiTrendingUp className="text-emerald-600" size={18} />
                Performance Metrics
              </h4>
              <div className="grid grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                  <FiUsers className="text-blue-600 mx-auto mb-2" size={24} />
                  <p className="text-2xl font-bold text-gray-900">{team.members}</p>
                  <p className="text-xs text-gray-600 mt-1">Members</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                  <FiFileText className="text-purple-600 mx-auto mb-2" size={24} />
                  <p className="text-2xl font-bold text-gray-900">{team.posts}</p>
                  <p className="text-xs text-gray-600 mt-1">Total Posts</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg border border-emerald-200">
                  <FiEye className="text-emerald-600 mx-auto mb-2" size={24} />
                  <p className="text-2xl font-bold text-gray-900">{team.views.toLocaleString()}</p>
                  <p className="text-xs text-gray-600 mt-1">Total Views</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg border border-orange-200">
                  <FiTrendingUp className="text-orange-600 mx-auto mb-2" size={24} />
                  <p className="text-2xl font-bold text-gray-900">{avgViewsPerPost.toLocaleString()}</p>
                  <p className="text-xs text-gray-600 mt-1">Avg/Post</p>
                </div>
              </div>
            </div>

            {/* Members List */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                  <FiUsers className="text-gray-600" size={18} />
                  Team Members ({members.length})
                </h4>
                <button className="text-sm text-emerald-600 font-medium hover:text-emerald-700">
                  View All
                </button>
              </div>
              <div className="space-y-2">
                {members.map((member, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200">
                    <div className="flex items-center gap-3">
                      <img 
                        src={member.avatar} 
                        alt={member.name}
                        className="w-10 h-10 rounded-full ring-2 ring-gray-100"
                      />
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{member.name}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span className={`px-2 py-0.5 rounded ${
                            member.role === 'Owner' ? 'bg-purple-100 text-purple-700' :
                            member.role === 'Editor' ? 'bg-blue-100 text-blue-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {member.role}
                          </span>
                          <span>•</span>
                          <span>{member.posts} posts</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <FiCalendar size={12} />
                      {new Date(member.joined).toLocaleDateString('en-US', { 
                        month: 'short', 
                        year: 'numeric' 
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button className="flex-1 px-4 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm font-medium transition-all flex items-center justify-center gap-2">
                <FiEdit size={16} />
                Edit Team
              </button>
              <button className="flex-1 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium transition-all flex items-center justify-center gap-2">
                <FiFileText size={16} />
                View Posts
              </button>
              {team.status === 'pending' && (
                <button 
                  onClick={() => {
                    onApprove();
                    onClose();
                  }}
                  className="px-4 py-2.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg hover:bg-emerald-100 text-sm font-medium transition-all"
                >
                  <FiCheckCircle size={16} />
                </button>
              )}
              <button 
                onClick={() => {
                  onDelete();
                  onClose();
                }}
                className="px-4 py-2.5 bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-100 text-sm font-medium transition-all"
              >
                <FiTrash2 size={16} />
              </button>
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
