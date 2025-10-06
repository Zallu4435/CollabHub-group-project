'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { 
  FiUsers,
  FiCheckCircle,
  FiClock,
  FiStar,
  FiPlus,
  FiSearch,
  FiEye,
  FiTrash2,
  FiArchive,
  FiAward,
  FiMessageSquare,
  FiTrendingUp,
  FiShield,
  FiGlobe,
  FiLock,
  FiCalendar,
  FiUserPlus
} from 'react-icons/fi';

interface Group {
  id: string;
  name: string;
  description: string;
  type: 'public' | 'private' | 'invite-only';
  category: string;
  coverImage: string;
  createdBy: string;
  createdAt: string;
  status: 'active' | 'pending' | 'archived';
  members: number;
  posts: number;
  engagement: number;
  admins: string[];
  moderators: string[];
  rules?: string[];
  featured: boolean;
}

const mockGroups: Group[] = [
  {
    id: 'group-1',
    name: 'Web Developers Hub',
    description: 'Community for web developers to share knowledge and projects',
    type: 'public',
    category: 'Technology',
    coverImage: 'https://picsum.photos/seed/group1/800/400',
    createdBy: 'Sarah Johnson',
    createdAt: new Date(2024, 5, 15).toISOString(),
    status: 'active',
    members: 2456,
    posts: 8934,
    engagement: 92,
    admins: ['Sarah Johnson', 'Mike Chen'],
    moderators: ['Emma Davis'],
    rules: ['Be respectful', 'No spam', 'Share quality content'],
    featured: true,
  },
  {
    id: 'group-2',
    name: 'AI & Machine Learning',
    description: 'Discuss latest trends in AI and machine learning',
    type: 'public',
    category: 'Technology',
    coverImage: 'https://picsum.photos/seed/group2/800/400',
    createdBy: 'Alex Kumar',
    createdAt: new Date(2024, 7, 20).toISOString(),
    status: 'active',
    members: 3245,
    posts: 12456,
    engagement: 88,
    admins: ['Alex Kumar'],
    moderators: ['Lisa Park', 'Tom Wilson'],
    featured: true,
  },
  {
    id: 'group-3',
    name: 'Spam Group',
    description: 'This is a test spam group',
    type: 'public',
    category: 'Other',
    coverImage: 'https://picsum.photos/seed/group3/800/400',
    createdBy: 'SpamUser',
    createdAt: new Date(2025, 9, 5).toISOString(),
    status: 'pending',
    members: 5,
    posts: 2,
    engagement: 10,
    admins: ['SpamUser'],
    moderators: [],
    featured: false,
  },
];

export default function GroupManagement() {
  const [groups, setGroups] = useState(mockGroups);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');

  const categories = ['Technology', 'Business', 'Design', 'Health', 'Other'];

  const filteredGroups = groups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         group.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || group.type === filterType;
    const matchesStatus = filterStatus === 'all' || group.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || group.category === filterCategory;
    return matchesSearch && matchesType && matchesStatus && matchesCategory;
  });

  const handleApprove = (groupId: string) => {
    setGroups(groups.map(g =>
      g.id === groupId ? { ...g, status: 'active' } : g
    ));
    toast.success('Group approved');
  };

  const handleArchive = (groupId: string) => {
    setGroups(groups.map(g =>
      g.id === groupId ? { ...g, status: 'archived' } : g
    ));
    toast.success('Group archived');
  };

  const handleDelete = (groupId: string) => {
    if (confirm('Delete this group permanently?')) {
      setGroups(groups.filter(g => g.id !== groupId));
      toast.success('Group deleted');
    }
  };

  const handleFeature = (groupId: string) => {
    setGroups(groups.map(g =>
      g.id === groupId ? { ...g, featured: !g.featured } : g
    ));
    toast.success('Featured status updated');
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'public': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'private': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'invite-only': return 'bg-purple-50 text-purple-700 border-purple-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getTypeIcon = (type: string, size = 10) => {
    switch (type) {
      case 'public': return <FiGlobe size={size} />;
      case 'private': return <FiLock size={size} />;
      case 'invite-only': return <FiUserPlus size={size} />;
      default: return <FiGlobe size={size} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'pending': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'archived': return 'bg-gray-50 text-gray-700 border-gray-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string, size = 10) => {
    switch (status) {
      case 'active': return <FiCheckCircle size={size} />;
      case 'pending': return <FiClock size={size} />;
      case 'archived': return <FiArchive size={size} />;
      default: return <FiCheckCircle size={size} />;
    }
  };

  const totalGroups = groups.length;
  const activeGroups = groups.filter(g => g.status === 'active').length;
  const pendingGroups = groups.filter(g => g.status === 'pending').length;
  const featuredGroups = groups.filter(g => g.featured).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Group Management</h1>
          <p className="text-sm text-gray-500 mt-1">
            Oversee all community groups
          </p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-all flex items-center gap-2">
          <FiPlus size={16} />
          Create Group
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Total Groups"
          value={totalGroups}
          icon={<FiUsers size={20} />}
          iconBg="bg-gray-50"
          iconColor="text-gray-600"
        />
        <StatCard
          title="Active"
          value={activeGroups}
          icon={<FiCheckCircle size={20} />}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
        />
        <StatCard
          title="Pending Approval"
          value={pendingGroups}
          icon={<FiClock size={20} />}
          iconBg="bg-amber-50"
          iconColor="text-amber-600"
        />
        <StatCard
          title="Featured"
          value={featuredGroups}
          icon={<FiStar size={20} />}
          iconBg="bg-purple-50"
          iconColor="text-purple-600"
        />
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search groups..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm"
            />
          </div>
          
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium"
          >
            <option value="all">All Types</option>
            <option value="public">Public</option>
            <option value="private">Private</option>
            <option value="invite-only">Invite Only</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="archived">Archived</option>
          </select>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium"
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Groups Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredGroups.map(group => (
          <div key={group.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
            {/* Cover Image */}
            <div className="relative h-40">
              <img src={group.coverImage} alt={group.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute top-3 right-3 flex gap-2">
                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold uppercase border backdrop-blur-sm ${getStatusColor(group.status)}`}>
                  {getStatusIcon(group.status)}
                  {group.status}
                </span>
                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold uppercase border backdrop-blur-sm ${getTypeColor(group.type)}`}>
                  {getTypeIcon(group.type)}
                  {group.type}
                </span>
                {group.featured && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-500 text-white rounded-md text-xs font-bold uppercase backdrop-blur-sm">
                    <FiStar size={10} />
                    FEATURED
                  </span>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">{group.name}</h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {group.description}
              </p>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                    <FiUsers size={10} />
                    Members
                  </p>
                  <p className="font-bold text-gray-900">{group.members.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                    <FiMessageSquare size={10} />
                    Posts
                  </p>
                  <p className="font-bold text-gray-900">{group.posts.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                    <FiTrendingUp size={10} />
                    Engagement
                  </p>
                  <p className="font-bold text-emerald-600">{group.engagement}%</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-xs text-gray-600 mb-2">Category</p>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-md text-xs font-semibold">
                  {group.category}
                </span>
              </div>

              <div className="mb-4">
                <p className="text-xs text-gray-600 mb-2 flex items-center gap-1">
                  <FiShield size={10} />
                  Admins ({group.admins.length}) & Moderators ({group.moderators.length})
                </p>
                <div className="flex flex-wrap gap-1">
                  {group.admins.slice(0, 3).map((admin, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1 px-2 py-1 bg-red-50 text-red-700 border border-red-200 rounded-md text-xs font-semibold">
                      {admin}
                    </span>
                  ))}
                </div>
              </div>

              <div className="text-xs text-gray-600 mb-4 flex items-center gap-1">
                <FiCalendar size={10} />
                Created by <strong>{group.createdBy}</strong> on {new Date(group.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2">
                {group.status === 'pending' && (
                  <button
                    onClick={() => handleApprove(group.id)}
                    className="px-3 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-xs font-medium transition-all flex items-center gap-1"
                  >
                    <FiCheckCircle size={12} />
                    Approve
                  </button>
                )}
                
                {group.status === 'active' && (
                  <>
                    <button
                      onClick={() => handleFeature(group.id)}
                      className={`px-3 py-2 rounded-lg text-xs font-medium transition-all flex items-center gap-1 ${
                        group.featured 
                          ? 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100'
                          : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      <FiStar size={12} />
                      {group.featured ? 'Featured' : 'Feature'}
                    </button>
                    <button
                      onClick={() => handleArchive(group.id)}
                      className="px-3 py-2 bg-orange-50 text-orange-700 border border-orange-200 rounded-lg hover:bg-orange-100 text-xs font-medium transition-all flex items-center gap-1"
                    >
                      <FiArchive size={12} />
                      Archive
                    </button>
                  </>
                )}

                <button
                  onClick={() => setSelectedGroup(group)}
                  className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-xs font-medium transition-all flex items-center gap-1"
                >
                  <FiEye size={12} />
                  View Details
                </button>

                <button
                  onClick={() => handleDelete(group.id)}
                  className="ml-auto px-3 py-2 bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-100 text-xs font-medium transition-all flex items-center gap-1"
                >
                  <FiTrash2 size={12} />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Top Groups by Engagement */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FiAward className="text-amber-600" size={18} />
          Top Groups by Engagement
        </h3>
        <div className="space-y-3">
          {groups
            .filter(g => g.status === 'active')
            .sort((a, b) => b.engagement - a.engagement)
            .slice(0, 5)
            .map((group, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg hover:shadow-sm transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center font-bold text-white shadow-sm">
                    {idx + 1}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{group.name}</p>
                    <p className="text-xs text-gray-600">
                      {group.members.toLocaleString()} members • {group.posts.toLocaleString()} posts
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-emerald-600 text-lg flex items-center gap-1">
                    <FiTrendingUp size={14} />
                    {group.engagement}%
                  </p>
                  <p className="text-xs text-gray-600">engagement</p>
                </div>
              </div>
            ))}
        </div>
      </div>
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
