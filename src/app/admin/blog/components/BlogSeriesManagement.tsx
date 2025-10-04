'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { 
  FiBookOpen,
  FiFileText,
  FiEye,
  FiClock,
  FiUsers,
  FiPlus,
  FiSearch,
  FiX,
  FiCheck,
  FiEdit2,
  FiTrash2,
  FiMove,
  FiCalendar,
  FiTrendingUp,
  FiLayers,
  FiSave,
  FiGlobe,
  FiCheckCircle
} from 'react-icons/fi';

interface Series {
  id: string;
  title: string;
  description: string;
  slug: string;
  coverImage: string;
  status: 'draft' | 'published' | 'completed';
  postCount: number;
  totalViews: number;
  avgReadingTime: number;
  createdAt: string;
  publishedAt?: string;
  completedAt?: string;
  authors: string[];
  posts: SeriesPost[];
  seo: {
    metaTitle: string;
    metaDescription: string;
  };
}

interface SeriesPost {
  id: string;
  title: string;
  order: number;
  status: 'draft' | 'published';
  views: number;
  readingTime: number;
  publishedAt?: string;
}

const mockSeries: Series[] = [
  {
    id: 'series-1',
    title: 'Mastering React Hooks',
    description: 'A comprehensive guide to React Hooks from basics to advanced patterns',
    slug: 'mastering-react-hooks',
    coverImage: 'https://picsum.photos/seed/series1/800/400',
    status: 'published',
    postCount: 8,
    totalViews: 12450,
    avgReadingTime: 12,
    createdAt: new Date(2024, 5, 1).toISOString(),
    publishedAt: new Date(2024, 5, 15).toISOString(),
    authors: ['John Doe', 'Jane Smith'],
    posts: [
      { id: 'post-1', title: 'Introduction to React Hooks', order: 1, status: 'published', views: 2340, readingTime: 8, publishedAt: new Date(2024, 5, 15).toISOString() },
      { id: 'post-2', title: 'Understanding useState Hook', order: 2, status: 'published', views: 1890, readingTime: 10, publishedAt: new Date(2024, 5, 22).toISOString() },
      { id: 'post-3', title: 'useEffect Deep Dive', order: 3, status: 'published', views: 2120, readingTime: 15, publishedAt: new Date(2024, 5, 29).toISOString() },
      { id: 'post-4', title: 'Custom Hooks Patterns', order: 4, status: 'published', views: 1780, readingTime: 12, publishedAt: new Date(2024, 6, 6).toISOString() },
      { id: 'post-5', title: 'useContext and Context API', order: 5, status: 'published', views: 1650, readingTime: 11, publishedAt: new Date(2024, 6, 13).toISOString() },
      { id: 'post-6', title: 'useReducer for Complex State', order: 6, status: 'published', views: 1420, readingTime: 14, publishedAt: new Date(2024, 6, 20).toISOString() },
      { id: 'post-7', title: 'Performance Optimization with useMemo', order: 7, status: 'published', views: 980, readingTime: 10, publishedAt: new Date(2024, 6, 27).toISOString() },
      { id: 'post-8', title: 'Advanced Hook Patterns', order: 8, status: 'published', views: 270, readingTime: 16, publishedAt: new Date(2024, 7, 3).toISOString() },
    ],
    seo: {
      metaTitle: 'Mastering React Hooks - Complete Series',
      metaDescription: 'Learn React Hooks from basics to advanced patterns in this comprehensive 8-part series',
    },
  },
  {
    id: 'series-2',
    title: 'Modern CSS Techniques',
    description: 'Explore modern CSS features and best practices for responsive design',
    slug: 'modern-css-techniques',
    coverImage: 'https://picsum.photos/seed/series2/800/400',
    status: 'published',
    postCount: 5,
    totalViews: 8920,
    avgReadingTime: 10,
    createdAt: new Date(2024, 7, 10).toISOString(),
    publishedAt: new Date(2024, 7, 20).toISOString(),
    authors: ['Sarah Williams'],
    posts: [
      { id: 'post-9', title: 'CSS Grid Mastery', order: 1, status: 'published', views: 2450, readingTime: 12, publishedAt: new Date(2024, 7, 20).toISOString() },
      { id: 'post-10', title: 'Flexbox Layout Patterns', order: 2, status: 'published', views: 2120, readingTime: 10, publishedAt: new Date(2024, 7, 27).toISOString() },
      { id: 'post-11', title: 'CSS Variables in Practice', order: 3, status: 'published', views: 1890, readingTime: 9, publishedAt: new Date(2024, 8, 3).toISOString() },
      { id: 'post-12', title: 'Modern Animation Techniques', order: 4, status: 'published', views: 1680, readingTime: 11, publishedAt: new Date(2024, 8, 10).toISOString() },
      { id: 'post-13', title: 'Responsive Design Best Practices', order: 5, status: 'published', views: 780, readingTime: 8, publishedAt: new Date(2024, 8, 17).toISOString() },
    ],
    seo: {
      metaTitle: 'Modern CSS Techniques - Complete Guide',
      metaDescription: 'Master modern CSS with Grid, Flexbox, Variables, and more in this 5-part series',
    },
  },
  {
    id: 'series-3',
    title: 'TypeScript for Beginners',
    description: 'Learn TypeScript from scratch with practical examples',
    slug: 'typescript-for-beginners',
    coverImage: 'https://picsum.photos/seed/series3/800/400',
    status: 'draft',
    postCount: 3,
    totalViews: 0,
    avgReadingTime: 0,
    createdAt: new Date(2025, 8, 1).toISOString(),
    authors: ['Mike Johnson'],
    posts: [
      { id: 'post-14', title: 'Introduction to TypeScript', order: 1, status: 'draft', views: 0, readingTime: 10 },
      { id: 'post-15', title: 'Basic Types and Interfaces', order: 2, status: 'draft', views: 0, readingTime: 12 },
      { id: 'post-16', title: 'Generics and Advanced Types', order: 3, status: 'draft', views: 0, readingTime: 15 },
    ],
    seo: {
      metaTitle: 'TypeScript for Beginners - Complete Tutorial',
      metaDescription: 'Start your TypeScript journey with this beginner-friendly series',
    },
  },
];

export default function BlogSeriesManagement() {
  const [series, setSeries] = useState(mockSeries);
  const [selectedSeries, setSelectedSeries] = useState<Series | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const filteredSeries = series.filter(s => {
    const matchesSearch = s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         s.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleMarkComplete = (seriesId: string) => {
    setSeries(series.map(s => 
      s.id === seriesId 
        ? { ...s, status: 'completed' as const, completedAt: new Date().toISOString() }
        : s
    ));
    toast.success('Series marked as complete!');
  };

  const handlePublish = (seriesId: string) => {
    setSeries(series.map(s => 
      s.id === seriesId 
        ? { ...s, status: 'published' as const, publishedAt: new Date().toISOString() }
        : s
    ));
    toast.success('Series published successfully!');
  };

  const totalSeries = series.length;
  const publishedSeries = series.filter(s => s.status === 'published').length;
  const totalPosts = series.reduce((acc, s) => acc + s.postCount, 0);
  const totalViews = series.reduce((acc, s) => acc + s.totalViews, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blog Series Management</h1>
          <p className="text-sm text-gray-500 mt-1">
            Create and manage multi-part blog series
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm font-medium transition-all flex items-center gap-2"
        >
          <FiPlus size={16} />
          Create Series
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Total Series"
          value={totalSeries}
          icon={<FiLayers size={20} />}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
          subtitle="All series"
        />
        <StatCard
          title="Published"
          value={publishedSeries}
          icon={<FiCheckCircle size={20} />}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
          subtitle="Live series"
        />
        <StatCard
          title="Total Posts"
          value={totalPosts}
          icon={<FiFileText size={20} />}
          iconBg="bg-purple-50"
          iconColor="text-purple-600"
          subtitle="Across all series"
        />
        <StatCard
          title="Total Views"
          value={totalViews.toLocaleString()}
          icon={<FiTrendingUp size={20} />}
          iconBg="bg-orange-50"
          iconColor="text-orange-600"
          subtitle="All series combined"
        />
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search series by title or description..."
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
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Series Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredSeries.map(s => (
          <div key={s.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
            {/* Cover Image */}
            <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600">
              <img src={s.coverImage} alt={s.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute top-4 right-4">
                <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold ${
                  s.status === 'published' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' :
                  s.status === 'completed' ? 'bg-blue-100 text-blue-700 border border-blue-200' :
                  'bg-amber-100 text-amber-700 border border-amber-200'
                }`}>
                  {s.status === 'published' && <FiCheckCircle size={10} />}
                  {s.status === 'completed' && <FiCheck size={10} />}
                  {s.status === 'draft' && <FiEdit2 size={10} />}
                  {s.status.toUpperCase()}
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-xl font-bold text-white mb-1">{s.title}</h3>
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {s.description}
              </p>

              {/* Meta Info */}
              <div className="flex items-center flex-wrap gap-3 text-sm text-gray-600 mb-4">
                <span className="flex items-center gap-1">
                  <FiFileText size={14} />
                  {s.postCount} posts
                </span>
                <span className="flex items-center gap-1">
                  <FiEye size={14} />
                  {s.totalViews.toLocaleString()}
                </span>
                <span className="flex items-center gap-1">
                  <FiClock size={14} />
                  ~{s.avgReadingTime}m avg
                </span>
              </div>

              {/* Authors */}
              <div className="flex items-center gap-2 mb-4">
                <FiUsers size={14} className="text-gray-500" />
                <div className="flex flex-wrap gap-1">
                  {s.authors.map((author, idx) => (
                    <span key={idx} className="px-2 py-1 bg-gray-100 border border-gray-200 rounded text-xs text-gray-700">
                      {author}
                    </span>
                  ))}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-xs text-gray-600 mb-2">
                  <span className="font-medium">Publication Progress</span>
                  <span className="font-semibold">{s.posts.filter(p => p.status === 'published').length}/{s.postCount} published</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all"
                    style={{ width: `${(s.posts.filter(p => p.status === 'published').length / s.postCount) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedSeries(s)}
                  className="flex-1 px-3 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm font-medium transition-all flex items-center justify-center gap-2"
                >
                  <FiEye size={14} />
                  View Details
                </button>
                {s.status === 'draft' && (
                  <button
                    onClick={() => handlePublish(s.id)}
                    className="px-3 py-2 bg-blue-50 border border-blue-200 text-blue-700 rounded-lg hover:bg-blue-100 text-sm font-medium transition-all"
                  >
                    Publish
                  </button>
                )}
                {s.status === 'published' && (
                  <button
                    onClick={() => handleMarkComplete(s.id)}
                    className="px-3 py-2 bg-purple-50 border border-purple-200 text-purple-700 rounded-lg hover:bg-purple-100 text-sm font-medium transition-all"
                  >
                    Complete
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredSeries.length === 0 && (
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiBookOpen size={24} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No series found</h3>
          <p className="text-sm text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm font-medium transition-all inline-flex items-center gap-2"
          >
            <FiPlus size={16} />
            Create Your First Series
          </button>
        </div>
      )}

      {/* Series Details Modal */}
      {selectedSeries && (
        <SeriesDetailsModal
          series={selectedSeries}
          onClose={() => setSelectedSeries(null)}
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

function SeriesDetailsModal({ series, onClose }: any) {
  const [draggedPost, setDraggedPost] = useState<SeriesPost | null>(null);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-xl border border-gray-200 max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-slideUp">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-emerald-50 to-teal-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <FiBookOpen className="text-emerald-600" size={20} />
              </div>
              <h2 className="text-xl font-bold text-gray-900">{series.title}</h2>
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
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="space-y-6">
            {/* Cover & Description */}
            <div>
              <img src={series.coverImage} alt={series.title} className="w-full h-48 object-cover rounded-lg mb-4" />
              <p className="text-gray-700">{series.description}</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-4 gap-4">
              <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
                <p className="text-2xl font-bold text-gray-900">{series.postCount}</p>
                <p className="text-sm text-gray-600 mt-1">Posts</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-lg">
                <p className="text-2xl font-bold text-gray-900">{series.totalViews.toLocaleString()}</p>
                <p className="text-sm text-gray-600 mt-1">Views</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg">
                <p className="text-2xl font-bold text-gray-900">{series.avgReadingTime}m</p>
                <p className="text-sm text-gray-600 mt-1">Avg Read</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-lg">
                <p className="text-2xl font-bold text-gray-900">{series.posts.filter((p: SeriesPost) => p.status === 'published').length}</p>
                <p className="text-sm text-gray-600 mt-1">Published</p>
              </div>
            </div>

            {/* Posts in Series */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                  <FiLayers className="text-emerald-600" size={18} />
                  Posts in Series
                </h3>
                <button className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm font-medium transition-all flex items-center gap-2">
                  <FiPlus size={14} />
                  Add Post
                </button>
              </div>
              <div className="space-y-2">
                {series.posts
                  .sort((a: SeriesPost, b: SeriesPost) => a.order - b.order)
                  .map((post: SeriesPost) => (
                    <div
                      key={post.id}
                      draggable
                      onDragStart={() => setDraggedPost(post)}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-emerald-200 hover:bg-emerald-50 cursor-move transition-all group"
                    >
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <FiMove className="text-gray-400 group-hover:text-emerald-600" size={16} />
                          <div className="w-8 h-8 bg-gradient-to-br from-emerald-100 to-teal-100 border border-emerald-200 rounded-lg flex items-center justify-center font-bold text-emerald-700 text-sm">
                            {post.order}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 mb-1">{post.title}</p>
                          <div className="flex items-center flex-wrap gap-3 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <FiEye size={12} />
                              {post.views.toLocaleString()} views
                            </span>
                            <span className="flex items-center gap-1">
                              <FiClock size={12} />
                              {post.readingTime}m read
                            </span>
                            {post.publishedAt && (
                              <span className="flex items-center gap-1">
                                <FiCalendar size={12} />
                                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric'
                                })}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold ${
                          post.status === 'published' 
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}>
                          {post.status === 'published' ? <FiCheckCircle size={10} /> : <FiEdit2 size={10} />}
                          {post.status.toUpperCase()}
                        </span>
                        <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded">
                          <FiEdit2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* SEO Settings */}
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FiGlobe className="text-emerald-600" size={18} />
                SEO Settings
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Meta Title</label>
                  <input
                    type="text"
                    defaultValue={series.seo.metaTitle}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400 outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
                  <textarea
                    defaultValue={series.seo.metaDescription}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400 outline-none text-sm resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <button className="flex-1 px-4 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium transition-all flex items-center justify-center gap-2">
                <FiSave size={16} />
                Save Changes
              </button>
              <button className="px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-all flex items-center gap-2">
                <FiEye size={16} />
                Preview
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
