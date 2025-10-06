'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { 
  FiBook,
  FiCheckCircle,
  FiEye,
  FiThumbsUp,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiArchive,
  FiSearch,
  FiTag,
  FiUser,
  FiCalendar,
  FiTrendingUp,
  FiFileText
} from 'react-icons/fi';

interface HelpArticle {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  author: string;
  createdAt: string;
  updatedAt: string;
  views: number;
  helpful: number;
  notHelpful: number;
  status: 'published' | 'draft' | 'archived';
}

const mockArticles: HelpArticle[] = [
  {
    id: 'art-1',
    title: 'How to purchase a project',
    content: 'Step-by-step guide on purchasing projects from the marketplace...',
    category: 'Getting Started',
    tags: ['purchase', 'buyer', 'payment'],
    author: 'Admin',
    createdAt: new Date(2025, 5, 15).toISOString(),
    updatedAt: new Date(2025, 9, 1).toISOString(),
    views: 1245,
    helpful: 98,
    notHelpful: 12,
    status: 'published',
  },
  {
    id: 'art-2',
    title: 'How to upload your first project',
    content: 'Complete guide for sellers to upload and publish their projects...',
    category: 'For Sellers',
    tags: ['upload', 'seller', 'project'],
    author: 'Admin',
    createdAt: new Date(2025, 6, 20).toISOString(),
    updatedAt: new Date(2025, 8, 15).toISOString(),
    views: 867,
    helpful: 76,
    notHelpful: 8,
    status: 'published',
  },
  {
    id: 'art-3',
    title: 'Understanding escrow system',
    content: 'Learn how our escrow system protects both buyers and sellers...',
    category: 'Payment & Security',
    tags: ['escrow', 'payment', 'security'],
    author: 'Admin',
    createdAt: new Date(2025, 7, 10).toISOString(),
    updatedAt: new Date(2025, 9, 4).toISOString(),
    views: 543,
    helpful: 45,
    notHelpful: 5,
    status: 'published',
  },
  {
    id: 'art-4',
    title: 'Refund policy explained',
    content: 'Understanding our refund policy and dispute resolution...',
    category: 'Payment & Security',
    tags: ['refund', 'dispute', 'policy'],
    author: 'Admin',
    createdAt: new Date(2025, 8, 5).toISOString(),
    updatedAt: new Date(2025, 8, 5).toISOString(),
    views: 234,
    helpful: 18,
    notHelpful: 3,
    status: 'draft',
  },
];

export default function HelpCenterCMS() {
  const [articles, setArticles] = useState(mockArticles);
  const [selectedArticle, setSelectedArticle] = useState<HelpArticle | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const categories = ['Getting Started', 'For Sellers', 'For Buyers', 'Payment & Security', 'Account Management'];

  const filteredArticles = articles.filter(a => {
    const matchesSearch = a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         a.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || a.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || a.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handlePublish = (articleId: string) => {
    setArticles(articles.map(a => 
      a.id === articleId ? { ...a, status: 'published' } : a
    ));
    toast.success('Article published');
  };

  const handleArchive = (articleId: string) => {
    setArticles(articles.map(a => 
      a.id === articleId ? { ...a, status: 'archived' } : a
    ));
    toast.success('Article archived');
  };

  const handleDelete = (articleId: string) => {
    if (confirm('Delete this article?')) {
      setArticles(articles.filter(a => a.id !== articleId));
      toast.success('Article deleted');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'draft': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'archived': return 'bg-gray-50 text-gray-700 border-gray-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const totalViews = articles.reduce((acc, a) => acc + a.views, 0);
  const totalHelpful = articles.reduce((acc, a) => acc + a.helpful, 0);
  const publishedCount = articles.filter(a => a.status === 'published').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Help Center & Content Management</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage FAQ articles and help content
          </p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-all flex items-center gap-2">
          <FiPlus size={16} />
          Create Article
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Total Articles"
          value={articles.length}
          icon={<FiBook size={20} />}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
        />
        <StatCard
          title="Published"
          value={publishedCount}
          icon={<FiCheckCircle size={20} />}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
        />
        <StatCard
          title="Total Views"
          value={totalViews.toLocaleString()}
          icon={<FiEye size={20} />}
          iconBg="bg-purple-50"
          iconColor="text-purple-600"
        />
        <StatCard
          title="Helpful Votes"
          value={totalHelpful}
          icon={<FiThumbsUp size={20} />}
          iconBg="bg-orange-50"
          iconColor="text-orange-600"
        />
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm"
            />
          </div>
          
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium"
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {/* Articles List */}
      <div className="space-y-4">
        {filteredArticles.map(article => (
          <div key={article.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <h3 className="text-lg font-bold text-gray-900">{article.title}</h3>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold capitalize border ${getStatusColor(article.status)}`}>
                    {article.status === 'published' && <FiCheckCircle size={10} />}
                    {article.status === 'draft' && <FiFileText size={10} />}
                    {article.status === 'archived' && <FiArchive size={10} />}
                    {article.status}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {article.content}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-md text-xs font-medium">
                    <FiTag size={10} />
                    {article.category}
                  </span>
                  {article.tags.map(tag => (
                    <span key={tag} className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-50 text-gray-700 border border-gray-200 rounded-md text-xs font-medium">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600 flex-wrap">
                  <span className="flex items-center gap-1">
                    <FiEye size={12} />
                    {article.views} views
                  </span>
                  <span className="flex items-center gap-1">
                    <FiThumbsUp size={12} />
                    {article.helpful}
                  </span>
                  <span className="flex items-center gap-1 text-gray-400">
                    👎 {article.notHelpful}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiUser size={12} />
                    {article.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiCalendar size={12} />
                    {new Date(article.updatedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setSelectedArticle(article)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-all flex items-center gap-2"
              >
                <FiEdit2 size={14} />
                Edit
              </button>
              
              {article.status === 'draft' && (
                <button
                  onClick={() => handlePublish(article.id)}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm font-medium transition-all flex items-center gap-2"
                >
                  <FiCheckCircle size={14} />
                  Publish
                </button>
              )}

              {article.status === 'published' && (
                <button
                  onClick={() => handleArchive(article.id)}
                  className="px-4 py-2 bg-amber-50 text-amber-700 border border-amber-200 rounded-lg hover:bg-amber-100 text-sm font-medium transition-all flex items-center gap-2"
                >
                  <FiArchive size={14} />
                  Archive
                </button>
              )}

              <button
                onClick={() => handleDelete(article.id)}
                className="ml-auto px-4 py-2 bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-100 text-sm font-medium transition-all flex items-center gap-2"
              >
                <FiTrash2 size={14} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredArticles.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiBook size={24} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No articles found</h3>
          <p className="text-sm text-gray-500">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Popular Articles */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FiTrendingUp className="text-blue-600" size={18} />
          Most Viewed Articles
        </h3>
        <div className="space-y-3">
          {articles
            .sort((a, b) => b.views - a.views)
            .slice(0, 5)
            .map((article, idx) => (
              <div key={article.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg hover:shadow-sm transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center font-bold text-white shadow-sm">
                    {idx + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{article.title}</p>
                    <p className="text-xs text-gray-600 flex items-center gap-1 mt-0.5">
                      <FiTag size={10} />
                      {article.category}
                    </p>
                  </div>
                </div>
                <span className="text-sm font-bold text-blue-600 flex items-center gap-1">
                  <FiEye size={14} />
                  {article.views}
                </span>
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
