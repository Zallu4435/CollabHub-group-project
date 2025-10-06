'use client';

import { useState } from 'react';
import { Category } from '../types/marketplace-admin';
import toast from 'react-hot-toast';
import { 
  FiFolder,
  FiCheckCircle,
  FiPackage,
  FiDollarSign,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiX,
  FiChevronUp,
  FiChevronDown,
  FiSave,
  FiTrendingUp,
  FiBarChart2
} from 'react-icons/fi';

const mockCategories: Category[] = [
  {
    id: 'cat-1',
    name: 'Web Templates',
    slug: 'web-templates',
    description: 'Complete website templates and themes',
    icon: '🌐',
    projectCount: 456,
    revenue: 36240,
    order: 1,
    isActive: true,
  },
  {
    id: 'cat-2',
    name: 'Admin Panels',
    slug: 'admin-panels',
    description: 'Dashboard and admin panel templates',
    icon: '📊',
    projectCount: 234,
    revenue: 18486,
    order: 2,
    isActive: true,
  },
  {
    id: 'cat-3',
    name: 'UI Kits',
    slug: 'ui-kits',
    description: 'UI component libraries and design systems',
    icon: '🎨',
    projectCount: 189,
    revenue: 11097,
    order: 3,
    isActive: true,
  },
  {
    id: 'cat-4',
    name: 'Landing Pages',
    slug: 'landing-pages',
    description: 'Marketing and landing page templates',
    icon: '🚀',
    projectCount: 167,
    revenue: 13193,
    order: 4,
    isActive: true,
  },
  {
    id: 'cat-5',
    name: 'Mobile Apps',
    slug: 'mobile-apps',
    description: 'Mobile application templates',
    icon: '📱',
    projectCount: 145,
    revenue: 11600,
    order: 5,
    isActive: false,
  },
];

export default function CategoryTagManagement() {
  const [categories, setCategories] = useState(mockCategories);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleToggleActive = (categoryId: string) => {
    setCategories(categories.map(c => 
      c.id === categoryId ? { ...c, isActive: !c.isActive } : c
    ));
    toast.success('Category status updated');
  };

  const handleDelete = (categoryId: string) => {
    if (confirm('Delete this category? All projects will be uncategorized.')) {
      setCategories(categories.filter(c => c.id !== categoryId));
      toast.success('Category deleted');
    }
  };

  const handleReorder = (categoryId: string, direction: 'up' | 'down') => {
    const index = categories.findIndex(c => c.id === categoryId);
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === categories.length - 1)) return;

    const newCategories = [...categories];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    [newCategories[index], newCategories[swapIndex]] = [newCategories[swapIndex], newCategories[index]];
    
    // Update order numbers
    newCategories.forEach((cat, idx) => cat.order = idx + 1);
    
    setCategories(newCategories);
    toast.success('Category order updated');
  };

  const totalProjects = categories.reduce((acc, c) => acc + c.projectCount, 0);
  const totalRevenue = categories.reduce((acc, c) => acc + c.revenue, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Category & Tag Management</h1>
          <p className="text-sm text-gray-500 mt-1">
            Organize and optimize marketplace navigation
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-all flex items-center gap-2"
        >
          <FiPlus size={16} />
          Create Category
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Total Categories"
          value={categories.length}
          icon={<FiFolder size={20} />}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
        />
        <StatCard
          title="Active"
          value={categories.filter(c => c.isActive).length}
          icon={<FiCheckCircle size={20} />}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
        />
        <StatCard
          title="Total Projects"
          value={totalProjects}
          icon={<FiPackage size={20} />}
          iconBg="bg-purple-50"
          iconColor="text-purple-600"
        />
        <StatCard
          title="Total Revenue"
          value={`$${totalRevenue.toLocaleString()}`}
          icon={<FiDollarSign size={20} />}
          iconBg="bg-orange-50"
          iconColor="text-orange-600"
        />
      </div>

      {/* Categories Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Order</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Category</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Projects</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Revenue</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {categories.map((category, index) => (
                <tr key={category.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleReorder(category.id, 'up')}
                        disabled={index === 0}
                        className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <FiChevronUp size={14} />
                      </button>
                      <button
                        onClick={() => handleReorder(category.id, 'down')}
                        disabled={index === categories.length - 1}
                        className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <FiChevronDown size={14} />
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{category.icon}</div>
                      <div>
                        <p className="font-semibold text-gray-900">{category.name}</p>
                        <p className="text-xs text-gray-500">/{category.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-gray-900">
                      <FiPackage size={12} />
                      {category.projectCount}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1 text-sm font-bold text-emerald-600">
                      <FiDollarSign size={12} />
                      {category.revenue.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={category.isActive}
                        onChange={() => handleToggleActive(category.id)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-emerald-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all shadow-sm"></div>
                    </label>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedCategory(category)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors flex items-center gap-1"
                      >
                        <FiEdit2 size={12} />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(category.id)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium transition-colors flex items-center gap-1"
                      >
                        <FiTrash2 size={12} />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Category Performance */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FiBarChart2 className="text-purple-600" size={18} />
          Category Performance
        </h3>
        <div className="space-y-4">
          {categories.map(category => {
            const percentage = (category.projectCount / totalProjects) * 100;
            
            return (
              <div key={category.id} className="group">
                <div className="flex items-center gap-4 mb-2">
                  <div className="text-2xl">{category.icon}</div>
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="font-semibold text-gray-900">{category.name}</span>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600 flex items-center gap-1">
                          <FiPackage size={12} />
                          {category.projectCount} projects
                        </span>
                        <span className="text-sm font-bold text-emerald-600 flex items-center gap-1">
                          <FiDollarSign size={12} />
                          {category.revenue.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all group-hover:from-blue-600 group-hover:to-blue-700"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{percentage.toFixed(1)}% of total projects</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Edit Category Modal */}
      {selectedCategory && (
        <CategoryEditModal
          category={selectedCategory}
          onClose={() => setSelectedCategory(null)}
          onSave={(updated: any) => {
            setCategories(categories.map(c => c.id === updated.id ? updated : c));
            setSelectedCategory(null);
            toast.success('Category updated');
          }}
        />
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

function CategoryEditModal({ category, onClose, onSave }: any) {
  const [formData, setFormData] = useState(category);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-xl border border-gray-200 max-w-2xl w-full shadow-2xl animate-slideUp">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FiEdit2 className="text-blue-600" size={20} />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Edit Category</h2>
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
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Slug</label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-mono"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Icon (Emoji)</label>
              <input
                type="text"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-2xl text-center"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={() => onSave(formData)}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-all flex items-center justify-center gap-2"
              >
                <FiSave size={16} />
                Save Changes
              </button>
              <button
                onClick={onClose}
                className="px-6 py-3 bg-gray-50 text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-100 font-medium transition-all"
              >
                Cancel
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
