'use client';

import { useState } from 'react';
import { mockDb } from '../lib/mockDb';
import toast from 'react-hot-toast';
import { 
  FiFolder,
  FiTag,
  FiPlus,
  FiEdit,
  FiTrash2,
  FiFileText,
  FiTrendingUp,
  FiAlertCircle,
  FiChevronRight,
  FiSearch,
  FiX
} from 'react-icons/fi';

export default function CategoriesTags() {
  const [activeTab, setActiveTab] = useState<'categories' | 'tags'>('categories');
  const [categories] = useState(mockDb.getCategories());
  const [tags] = useState(mockDb.getTags());
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter based on search
  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cat.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredTags = tags.filter(tag =>
    tag.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate stats
  const totalCategoryPosts = categories.reduce((acc, cat) => acc + cat.postCount, 0);
  const topCategory = categories.sort((a, b) => b.postCount - a.postCount)[0];
  const totalTagUsage = tags.reduce((acc, tag) => acc + tag.usage, 0);
  const unusedTags = tags.filter(t => t.usage === 0).length;
  const mostUsedTag = tags.sort((a, b) => b.usage - a.usage)[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categories & Tags</h1>
          <p className="text-sm text-gray-700 mt-1">
            Organize and manage your content taxonomy
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all text-sm font-medium flex items-center gap-2"
        >
          <FiPlus size={16} />
          Add New
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Total Categories"
          value={categories.length}
          icon={<FiFolder size={20} />}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
          subtitle={`${totalCategoryPosts} total posts`}
        />
        <StatCard
          title="Total Tags"
          value={tags.length}
          icon={<FiTag size={20} />}
          iconBg="bg-purple-50"
          iconColor="text-purple-600"
          subtitle={`${totalTagUsage} total uses`}
        />
        <StatCard
          title="Top Category"
          value={topCategory?.postCount || 0}
          icon={<FiTrendingUp size={20} />}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
          subtitle={topCategory?.name || 'N/A'}
        />
        <StatCard
          title="Unused Tags"
          value={unusedTags}
          icon={<FiAlertCircle size={20} />}
          iconBg="bg-orange-50"
          iconColor="text-orange-600"
          subtitle="Need cleanup"
        />
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex">
            {(['categories', 'tags'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setSearchTerm('');
                }}
                className={`flex-1 px-6 py-4 font-medium text-sm transition-all relative flex items-center justify-center gap-2 ${
                  activeTab === tab
                    ? 'text-emerald-600 bg-emerald-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {tab === 'categories' ? (
                  <>
                    <FiFolder size={18} />
                    Categories ({categories.length})
                  </>
                ) : (
                  <>
                    <FiTag size={18} />
                    Tags ({tags.length})
                  </>
                )}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-gray-100 bg-gray-50">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
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
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'categories' ? (
            <div className="space-y-3">
              {filteredCategories.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FiFolder size={24} className="text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No categories found</h3>
                  <p className="text-sm text-gray-500">Try adjusting your search</p>
                </div>
              ) : (
                filteredCategories.map(cat => (
                  <div
                    key={cat.id}
                    className={`group p-4 border border-gray-200 rounded-lg hover:border-emerald-200 hover:bg-emerald-50/30 transition-all ${
                      cat.parentId ? 'ml-8 border-l-4 border-l-emerald-500' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className={`p-2 rounded-lg ${cat.parentId ? 'bg-emerald-50' : 'bg-blue-50'} mt-0.5`}>
                          {cat.parentId ? (
                            <FiChevronRight className="text-emerald-600" size={18} />
                          ) : (
                            <FiFolder className="text-blue-600" size={18} />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-gray-900">{cat.name}</h3>
                            {cat.parentId && (
                              <span className="text-xs px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full">
                                Subcategory
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-3 text-sm text-gray-500 mb-2">
                            <span className="flex items-center gap-1">
                              <FiFileText size={14} />
                              {cat.postCount} posts
                            </span>
                            <span>•</span>
                            <span className="font-mono text-xs bg-gray-100 px-2 py-0.5 rounded">
                              /{cat.slug}
                            </span>
                          </div>
                          {cat.description && (
                            <p className="text-sm text-gray-600 line-clamp-2">
                              {cat.description}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <FiEdit size={16} />
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {/* Tags Cloud */}
              <div>
                {filteredTags.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FiTag size={24} className="text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No tags found</h3>
                    <p className="text-sm text-gray-500">Try adjusting your search</p>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-3">
                    {filteredTags.map(tag => (
                      <div
                        key={tag.id}
                        className="group relative flex items-center gap-2 px-4 py-2.5 bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-lg hover:border-emerald-300 hover:from-emerald-50 hover:to-teal-50 transition-all cursor-pointer"
                      >
                        <div
                          className="w-2.5 h-2.5 rounded-full ring-2 ring-white"
                          style={{ backgroundColor: tag.color || '#666' }}
                        />
                        <span className="font-medium text-gray-900 text-sm">{tag.name}</span>
                        <span className="text-xs text-gray-500 bg-white px-2 py-0.5 rounded-full border border-gray-200">
                          {tag.usage}
                        </span>
                        <button 
                          className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs hover:bg-red-600"
                          onClick={() => toast.success('Tag deleted')}
                        >
                          <FiX size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Tag Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                <div className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-blue-700 font-medium">Total Tags</span>
                    <FiTag className="text-blue-600" size={18} />
                  </div>
                  <p className="text-3xl font-bold text-gray-900">{tags.length}</p>
                  <p className="text-xs text-blue-600 mt-1">All time</p>
                </div>

                <div className="p-5 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-emerald-700 font-medium">Most Used</span>
                    <FiTrendingUp className="text-emerald-600" size={18} />
                  </div>
                  <p className="text-3xl font-bold text-gray-900">{mostUsedTag?.usage || 0}</p>
                  <p className="text-xs text-emerald-600 mt-1 truncate">{mostUsedTag?.name || 'N/A'}</p>
                </div>

                <div className="p-5 bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-orange-700 font-medium">Unused</span>
                    <FiAlertCircle className="text-orange-600" size={18} />
                  </div>
                  <p className="text-3xl font-bold text-gray-900">{unusedTags}</p>
                  <p className="text-xs text-orange-600 mt-1">Need attention</p>
                </div>
              </div>

              {/* Insights */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-5">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <FiTrendingUp className="text-purple-600" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-purple-900 text-sm mb-2">Tag Usage Insight</h4>
                    <p className="text-sm text-purple-700">
                      The most popular tag "<span className="font-bold">{mostUsedTag?.name}</span>" is used in <span className="font-bold">{mostUsedTag?.usage}</span> posts. {unusedTags > 0 && `Consider removing ${unusedTags} unused tags to keep your taxonomy clean.`}
                    </p>
                  </div>
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
        <p className="text-xs text-gray-500 mt-1 truncate">{subtitle}</p>
      </div>
    </div>
  );
}
