'use client';

import { useState, useMemo } from 'react';
import { mockDb } from '../lib/mockDb';
import type { Post, PostState } from '../types/blog-admin';
import { paginate, sortData, filterData, searchData, PaginationState, SortState } from '../lib/table';
import { 
  FiFileText,
  FiSearch,
  FiFilter,
  FiCalendar,
  FiGrid,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiEye,
  FiStar,
  FiCheck,
  FiClock,
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiMoreVertical,
  FiArrowUp,
  FiArrowDown
} from 'react-icons/fi';

export default function ContentManagement() {
  const [posts, setPosts] = useState(mockDb.getPosts());
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<any>({});
  const [sort, setSort] = useState<SortState | null>(null);
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 });
  const [selected, setSelected] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'table' | 'calendar'>('table');

  const filteredData = useMemo(() => {
    let result = posts;
    result = searchData(result, searchTerm, ['title', 'authorName']);
    result = filterData(result, filters);
    result = sortData(result, sort);
    return result;
  }, [posts, searchTerm, filters, sort]);

  const paginatedData = useMemo(() => {
    return paginate(filteredData, pagination);
  }, [filteredData, pagination]);

  const totalPages = Math.ceil(filteredData.length / pagination.pageSize);

  const handleBulkAction = (action: string) => {
    switch (action) {
      case 'publish':
        mockDb.bulkUpdatePosts(selected, { state: 'published' });
        break;
      case 'unpublish':
        mockDb.bulkUpdatePosts(selected, { state: 'draft' });
        break;
      case 'delete':
        if (confirm(`Delete ${selected.length} posts?`)) {
          mockDb.bulkDeletePosts(selected);
        }
        break;
    }
    setPosts([...mockDb.getPosts()]);
    setSelected([]);
  };

  const handleSort = (column: string) => {
    setSort(prev => ({
      column,
      direction: prev?.column === column && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const draftCount = posts.filter(p => p.state === 'draft').length;
  const publishedCount = posts.filter(p => p.state === 'published').length;
  const scheduledCount = posts.filter(p => p.state === 'scheduled').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Content Management</h1>
          <p className="text-sm text-gray-700 mt-1">
            Manage all your blog posts and content
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode(viewMode === 'table' ? 'calendar' : 'table')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              viewMode === 'calendar' 
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
            }`}
          >
            {viewMode === 'table' ? <FiCalendar size={16} /> : <FiGrid size={16} />}
            {viewMode === 'table' ? 'Calendar' : 'Table'}
          </button>
          <a
            href="/admin/blog/pages/posts/create"
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm font-medium transition-all flex items-center gap-2"
          >
            <FiPlus size={16} />
            New Post
          </a>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Total Posts"
          value={posts.length}
          icon={<FiFileText size={20} />}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
          subtitle="All content"
        />
        <StatCard
          title="Published"
          value={publishedCount}
          icon={<FiCheck size={20} />}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
          subtitle="Live posts"
        />
        <StatCard
          title="Drafts"
          value={draftCount}
          icon={<FiEdit2 size={20} />}
          iconBg="bg-amber-50"
          iconColor="text-amber-600"
          subtitle="Work in progress"
        />
        <StatCard
          title="Scheduled"
          value={scheduledCount}
          icon={<FiClock size={20} />}
          iconBg="bg-purple-50"
          iconColor="text-purple-600"
          subtitle="Future posts"
        />
      </div>

      {viewMode === 'table' ? (
        <>
          {/* Toolbar */}
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex flex-col md:flex-row gap-3">
              {/* Search */}
              <div className="flex-1 relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search posts by title or author..."
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

              {/* Filters */}
              <div className="flex gap-2">
                <select
                  value={filters.state || 'all'}
                  onChange={(e) => setFilters({ ...filters, state: e.target.value })}
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400 outline-none text-sm font-medium"
                >
                  <option value="all">All States</option>
                  <option value="draft">Draft</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="published">Published</option>
                </select>

                <select
                  value={filters.featured || 'all'}
                  onChange={(e) => setFilters({ ...filters, featured: e.target.value === 'true' ? true : e.target.value === 'false' ? false : 'all' })}
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400 outline-none text-sm font-medium"
                >
                  <option value="all">All Posts</option>
                  <option value="true">Featured Only</option>
                  <option value="false">Not Featured</option>
                </select>

                <select
                  value={pagination.pageSize}
                  onChange={(e) => setPagination({ ...pagination, pageSize: Number(e.target.value), pageIndex: 0 })}
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400 outline-none text-sm font-medium"
                >
                  <option value="10">10 per page</option>
                  <option value="25">25 per page</option>
                  <option value="50">50 per page</option>
                  <option value="100">100 per page</option>
                </select>
              </div>
            </div>

            {/* Bulk Actions */}
            {selected.length > 0 && (
              <div className="flex items-center gap-3 mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                <span className="font-medium text-emerald-900 text-sm flex items-center gap-2">
                  <FiCheck size={16} />
                  {selected.length} selected
                </span>
                <button
                  onClick={() => handleBulkAction('publish')}
                  className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm font-medium transition-all"
                >
                  Publish
                </button>
                <button
                  onClick={() => handleBulkAction('unpublish')}
                  className="px-3 py-1.5 bg-amber-600 text-white rounded-lg hover:bg-amber-700 text-sm font-medium transition-all"
                >
                  Unpublish
                </button>
                <button
                  onClick={() => handleBulkAction('delete')}
                  className="px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-medium transition-all"
                >
                  Delete
                </button>
                <button
                  onClick={() => setSelected([])}
                  className="ml-auto px-3 py-1.5 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium transition-all"
                >
                  Clear Selection
                </button>
              </div>
            )}
          </div>

          {/* Table */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left w-12">
                      <input
                        type="checkbox"
                        checked={selected.length === paginatedData.length && paginatedData.length > 0}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelected(paginatedData.map(p => p.id));
                          } else {
                            setSelected([]);
                          }
                        }}
                        className="rounded border-gray-300"
                      />
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort('title')}
                    >
                      <div className="flex items-center gap-2">
                        Title
                        {sort?.column === 'title' && (
                          sort.direction === 'asc' ? <FiArrowUp size={14} /> : <FiArrowDown size={14} />
                        )}
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Author
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Category
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort('state')}
                    >
                      <div className="flex items-center gap-2">
                        Status
                        {sort?.column === 'state' && (
                          sort.direction === 'asc' ? <FiArrowUp size={14} /> : <FiArrowDown size={14} />
                        )}
                      </div>
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort('views')}
                    >
                      <div className="flex items-center gap-2">
                        Views
                        {sort?.column === 'views' && (
                          sort.direction === 'asc' ? <FiArrowUp size={14} /> : <FiArrowDown size={14} />
                        )}
                      </div>
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort('updatedAt')}
                    >
                      <div className="flex items-center gap-2">
                        Updated
                        {sort?.column === 'updatedAt' && (
                          sort.direction === 'asc' ? <FiArrowUp size={14} /> : <FiArrowDown size={14} />
                        )}
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {paginatedData.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center">
                          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <FiFileText size={24} className="text-gray-400" />
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">No posts found</h3>
                          <p className="text-sm text-gray-500">Try adjusting your search or filter criteria</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    paginatedData.map(post => (
                      <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <input
                            type="checkbox"
                            checked={selected.includes(post.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelected([...selected, post.id]);
                              } else {
                                setSelected(selected.filter(id => id !== post.id));
                              }
                            }}
                            className="rounded border-gray-300"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            {post.featured && (
                              <FiStar className="text-amber-500 fill-amber-500 flex-shrink-0" size={16} />
                            )}
                            <span className="font-medium text-gray-900 line-clamp-1">{post.title}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{post.authorName}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{post.categoryName || '-'}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold ${
                            post.state === 'published' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                            post.state === 'draft' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                            'bg-purple-50 text-purple-700 border border-purple-200'
                          }`}>
                            {post.state === 'published' && <FiCheck size={10} />}
                            {post.state === 'draft' && <FiEdit2 size={10} />}
                            {post.state === 'scheduled' && <FiClock size={10} />}
                            {post.state.charAt(0).toUpperCase() + post.state.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <FiEye size={14} />
                            {post.views.toLocaleString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {new Date(post.updatedAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <a
                              href={`/admin/blog/pages/posts/${post.id}`}
                              className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                              title="Edit"
                            >
                              <FiEdit2 size={16} />
                            </a>
                            <a
                              href={`/post/${post.slug}`}
                              target="_blank"
                              className="p-1.5 text-gray-600 hover:bg-gray-100 rounded transition-colors"
                              title="View"
                            >
                              <FiEye size={16} />
                            </a>
                            <button
                              onClick={() => {
                                if (confirm('Delete this post?')) {
                                  mockDb.deletePost(post.id);
                                  setPosts([...mockDb.getPosts()]);
                                }
                              }}
                              className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                              title="Delete"
                            >
                              <FiTrash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50">
              <div className="text-sm text-gray-600">
                Showing <span className="font-semibold text-gray-900">{pagination.pageIndex * pagination.pageSize + 1}</span> to{' '}
                <span className="font-semibold text-gray-900">{Math.min((pagination.pageIndex + 1) * pagination.pageSize, filteredData.length)}</span> of{' '}
                <span className="font-semibold text-gray-900">{filteredData.length}</span> results
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPagination({ ...pagination, pageIndex: pagination.pageIndex - 1 })}
                  disabled={pagination.pageIndex === 0}
                  className="px-3 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium transition-all flex items-center gap-1.5"
                >
                  <FiChevronLeft size={16} />
                  Previous
                </button>
                <span className="px-4 py-2 text-sm text-gray-700">
                  Page <span className="font-semibold">{pagination.pageIndex + 1}</span> of <span className="font-semibold">{totalPages}</span>
                </span>
                <button
                  onClick={() => setPagination({ ...pagination, pageIndex: pagination.pageIndex + 1 })}
                  disabled={pagination.pageIndex >= totalPages - 1}
                  className="px-3 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium transition-all flex items-center gap-1.5"
                >
                  Next
                  <FiChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <CalendarView posts={posts} />
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

function CalendarView({ posts }: { posts: Post[] }) {
  const scheduledPosts = posts.filter(p => p.state === 'scheduled' && p.scheduledAt);
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  
  // Get first day of month and number of days
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <FiCalendar className="text-emerald-600" size={20} />
          Content Calendar
        </h3>
        <div className="text-sm text-gray-600">
          {now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center font-semibold text-gray-700 text-sm py-2">{day}</div>
        ))}
        {/* Empty cells for days before month starts */}
        {Array.from({ length: firstDay }, (_, i) => (
          <div key={`empty-${i}`} className="min-h-[100px] bg-gray-50 rounded-lg"></div>
        ))}
        {/* Calendar days */}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          const isToday = day === now.getDate() && currentMonth === now.getMonth();
          const dayPosts = scheduledPosts.filter(p => {
            const postDate = new Date(p.scheduledAt!);
            return postDate.getDate() === day && 
                   postDate.getMonth() === currentMonth && 
                   postDate.getFullYear() === currentYear;
          });
          
          return (
            <div 
              key={day} 
              className={`min-h-[100px] border rounded-lg p-2 ${
                isToday ? 'border-emerald-400 bg-emerald-50' : 'border-gray-200 bg-white'
              }`}
            >
              <div className={`text-sm font-semibold mb-2 ${
                isToday ? 'text-emerald-700' : 'text-gray-700'
              }`}>
                {day}
              </div>
              <div className="space-y-1">
                {dayPosts.map(p => (
                  <div 
                    key={p.id} 
                    className="text-xs bg-purple-100 text-purple-800 border border-purple-200 rounded p-1.5 cursor-pointer hover:bg-purple-200 transition-colors"
                    title={p.title}
                  >
                    <div className="flex items-start gap-1">
                      <FiClock size={10} className="flex-shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{p.title}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-6 flex items-center gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-emerald-50 border border-emerald-400 rounded"></div>
          <span>Today</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-purple-100 border border-purple-200 rounded"></div>
          <span>Scheduled Post</span>
        </div>
      </div>
    </div>
  );
}
