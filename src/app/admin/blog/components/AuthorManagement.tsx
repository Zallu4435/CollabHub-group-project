'use client';

import { useState, useMemo } from 'react';
import { mockDb } from '../lib/mockDb';
import type { Author } from '../types/blog-admin';
import { useCan } from '../lib/rbac';
import toast from 'react-hot-toast';
import { 
  FiSearch, 
  FiUserPlus, 
  FiMail, 
  FiCalendar, 
  FiEye,
  FiFileText,
  FiTrendingUp,
  FiCheckCircle,
  FiX,
  FiEdit,
  FiTrash2,
  FiAward,
  FiShield,
  FiExternalLink
} from 'react-icons/fi';

export default function AuthorManagement() {
  const [authors, setAuthors] = useState(mockDb.getAuthors());
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);
  const can = useCan();

  const filteredAuthors = useMemo(() => {
    return authors.filter(author => {
      const matchesSearch = author.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          author.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = roleFilter === 'all' || author.role === roleFilter;
      return matchesSearch && matchesRole;
    });
  }, [authors, searchTerm, roleFilter]);

  const handleToggleVerified = (author: Author) => {
    if (!can('author:manage')) {
      toast.error('You do not have permission to manage authors');
      return;
    }
    
    author.verified = !author.verified;
    setAuthors([...authors]);
    toast.success(`${author.name} ${author.verified ? 'verified' : 'unverified'}`);
  };

  // Calculate statistics
  const totalPosts = authors.reduce((acc, a) => acc + a.metrics.posts, 0);
  const totalViews = authors.reduce((acc, a) => acc + a.metrics.views, 0);
  const verifiedCount = authors.filter(a => a.verified).length;
  const avgEngagement = (authors.reduce((acc, a) => acc + a.metrics.engagement, 0) / authors.length).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Author Management</h1>
          <p className="text-sm text-gray-700 mt-1">
            Manage author profiles, permissions, and track their performance
          </p>
        </div>
        {can('author:manage') && (
          <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all text-sm font-medium flex items-center gap-2">
            <FiUserPlus size={16} />
            Add Author
          </button>
        )}
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Total Authors"
          value={authors.length}
          icon={<FiUserPlus size={20} />}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
          subtitle={`${verifiedCount} verified`}
        />
        <StatCard
          title="Total Posts"
          value={totalPosts}
          icon={<FiFileText size={20} />}
          iconBg="bg-purple-50"
          iconColor="text-purple-600"
          subtitle="All time"
        />
        <StatCard
          title="Total Views"
          value={`${(totalViews / 1000).toFixed(1)}K`}
          icon={<FiEye size={20} />}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
          subtitle="Combined reach"
        />
        <StatCard
          title="Avg. Engagement"
          value={`${avgEngagement}%`}
          icon={<FiTrendingUp size={20} />}
          iconBg="bg-orange-50"
          iconColor="text-orange-600"
          subtitle="Across authors"
        />
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400 outline-none text-sm"
            />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400 outline-none text-sm font-medium"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="editor">Editor</option>
            <option value="contributor">Contributor</option>
            <option value="analyst">Analyst</option>
          </select>
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
            <span className="text-sm text-gray-600">
              Showing <span className="font-semibold text-gray-900">{filteredAuthors.length}</span> of {authors.length}
            </span>
          </div>
        </div>
      </div>

      {/* Authors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAuthors.map(author => (
          <div key={author.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all group">
            {/* Header */}
            <div className="flex items-start gap-3 mb-4">
              <div className="relative">
                <img
                  src={author.avatar}
                  alt={author.name}
                  className="w-14 h-14 rounded-full ring-2 ring-gray-100"
                />
                {author.verified && (
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-white">
                    <FiCheckCircle size={12} className="text-white" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 truncate flex items-center gap-2">
                  {author.name}
                </h3>
                <p className="text-xs text-gray-500 truncate flex items-center gap-1 mt-0.5">
                  <FiMail size={12} />
                  {author.email}
                </p>
                <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                  <FiCalendar size={12} />
                  Joined {new Date(author.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </p>
              </div>
            </div>

            {/* Role & Badges */}
            <div className="flex items-center gap-2 mb-4">
              <span className={`px-2.5 py-1 rounded-md text-xs font-semibold border ${
                author.role === 'admin' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                author.role === 'editor' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                author.role === 'contributor' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                'bg-gray-50 text-gray-700 border-gray-200'
              }`}>
                <FiShield size={12} className="inline mr-1" />
                {author.role.toUpperCase()}
              </span>
              {author.badges.length > 0 && (
                <div className="flex items-center gap-1">
                  <FiAward size={14} className="text-amber-500" />
                  <span className="text-xs font-medium text-gray-600">
                    {author.badges.length}
                  </span>
                </div>
              )}
            </div>

            {/* Bio */}
            {author.bio && (
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {author.bio}
              </p>
            )}

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-3 mb-4 p-3 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200">
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900">{author.metrics.posts}</p>
                <p className="text-xs text-gray-500">Posts</p>
              </div>
              <div className="text-center border-x border-gray-200">
                <p className="text-lg font-bold text-gray-900">{(author.metrics.views / 1000).toFixed(1)}K</p>
                <p className="text-xs text-gray-500">Views</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900">{author.metrics.engagement}%</p>
                <p className="text-xs text-gray-500">Engage</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedAuthor(author)}
                className="flex-1 px-3 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm font-medium transition-all flex items-center justify-center gap-2"
              >
                <FiExternalLink size={14} />
                View Profile
              </button>
              {can('author:manage') && (
                <button
                  onClick={() => handleToggleVerified(author)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    author.verified 
                      ? 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200' 
                      : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                  }`}
                  title={author.verified ? 'Unverify' : 'Verify'}
                >
                  <FiCheckCircle size={16} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredAuthors.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiSearch size={24} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No authors found</h3>
          <p className="text-sm text-gray-500 mb-4">
            Try adjusting your search or filter criteria
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setRoleFilter('all');
            }}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm font-medium"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Selected Author Modal */}
      {selectedAuthor && (
        <AuthorModal 
          author={selectedAuthor} 
          onClose={() => setSelectedAuthor(null)}
          can={can}
          onToggleVerified={() => handleToggleVerified(selectedAuthor)}
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

function AuthorModal({ 
  author, 
  onClose,
  can,
  onToggleVerified
}: { 
  author: Author; 
  onClose: () => void;
  can: (permission: string) => boolean;
  onToggleVerified: () => void;
}) {
  const posts = mockDb.getPosts().filter(p => p.authorId === author.id);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-xl border border-gray-200 max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-slideUp">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-emerald-50 to-teal-50">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Author Profile</h2>
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
            {/* Author Info Card */}
            <div className="flex items-start gap-4 p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
              <div className="relative">
                <img 
                  src={author.avatar} 
                  alt={author.name} 
                  className="w-20 h-20 rounded-full ring-4 ring-white shadow-md" 
                />
                {author.verified && (
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-white">
                    <FiCheckCircle size={14} className="text-white" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{author.name}</h3>
                    <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                      <FiMail size={14} />
                      {author.email}
                    </p>
                    <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                      <FiCalendar size={14} />
                      Joined {new Date(author.createdAt).toLocaleDateString('en-US', { 
                        month: 'long', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </p>
                  </div>
                  <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                    author.role === 'admin' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                    author.role === 'editor' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                    author.role === 'contributor' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                    'bg-gray-50 text-gray-700 border-gray-200'
                  }`}>
                    {author.role.toUpperCase()}
                  </span>
                </div>
                
                {author.bio && (
                  <p className="text-sm text-gray-700 mt-3 p-3 bg-white rounded-lg border border-gray-200">
                    {author.bio}
                  </p>
                )}
              </div>
            </div>

            {/* Badges */}
            {author.badges.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <FiAward className="text-amber-500" size={18} />
                  Achievements & Badges
                </h4>
                <div className="flex flex-wrap gap-2">
                  {author.badges.map(badge => (
                    <span 
                      key={badge} 
                      className="px-3 py-1.5 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 text-amber-700 rounded-lg text-xs font-medium"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Performance Metrics */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <FiTrendingUp className="text-emerald-600" size={18} />
                Performance Metrics
              </h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                  <FiFileText className="text-blue-600 mx-auto mb-2" size={24} />
                  <p className="text-2xl font-bold text-gray-900">{author.metrics.posts}</p>
                  <p className="text-xs text-gray-600 mt-1">Total Posts</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                  <FiEye className="text-purple-600 mx-auto mb-2" size={24} />
                  <p className="text-2xl font-bold text-gray-900">{(author.metrics.views / 1000).toFixed(1)}K</p>
                  <p className="text-xs text-gray-600 mt-1">Total Views</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg border border-emerald-200">
                  <FiTrendingUp className="text-emerald-600 mx-auto mb-2" size={24} />
                  <p className="text-2xl font-bold text-gray-900">{author.metrics.engagement}%</p>
                  <p className="text-xs text-gray-600 mt-1">Engagement</p>
                </div>
              </div>
            </div>

            {/* Recent Posts */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                  <FiFileText className="text-gray-600" size={18} />
                  Recent Posts ({posts.length})
                </h4>
                {posts.length > 5 && (
                  <button className="text-sm text-emerald-600 font-medium hover:text-emerald-700">
                    View All
                  </button>
                )}
              </div>
              <div className="space-y-2">
                {posts.slice(0, 5).map(post => (
                  <div key={post.id} className="p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group border border-gray-200">
                    <p className="font-medium text-gray-900 text-sm group-hover:text-emerald-600 mb-1">
                      {post.title}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <FiEye size={12} />
                        {post.views.toLocaleString()} views
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <FiCalendar size={12} />
                        {new Date(post.createdAt).toLocaleDateString()}
                      </span>
                      <span>•</span>
                      <span className={`px-2 py-0.5 rounded ${
                        post.state === 'published' ? 'bg-emerald-100 text-emerald-700' :
                        post.state === 'draft' ? 'bg-amber-100 text-amber-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {post.state}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            {can('author:manage') && (
              <div className="flex gap-3">
                <button
                  onClick={onToggleVerified}
                  className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                    author.verified
                      ? 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
                      : 'bg-emerald-600 text-white hover:bg-emerald-700'
                  }`}
                >
                  <FiCheckCircle size={16} />
                  {author.verified ? 'Unverify Author' : 'Verify Author'}
                </button>
                <button className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-all flex items-center justify-center gap-2">
                  <FiEdit size={16} />
                  Edit Profile
                </button>
                <button className="px-4 py-2.5 bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-100 text-sm font-medium transition-all">
                  <FiTrash2 size={16} />
                </button>
              </div>
            )}
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
