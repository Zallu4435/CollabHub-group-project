'use client';

import { useState } from 'react';
import { Project, ProjectStatus } from '../types/marketplace-admin';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { 
  FiPackage,
  FiClock,
  FiCheckCircle,
  FiStar,
  FiSearch,
  FiEye,
  FiCheck,
  FiX,
  FiAward,
  FiArchive,
  FiTrash2,
  FiDownload,
  FiDollarSign,
  FiUser,
  FiCalendar,
  FiTag,
  FiFileText,
  FiTrendingUp,
  FiFolder
} from 'react-icons/fi';

// Mock projects (same as before)
const mockProjects: Project[] = [
  {
    id: 'proj-1',
    title: 'React Admin Dashboard Pro',
    description: 'Modern admin dashboard with React, TypeScript, and Tailwind CSS',
    category: 'Admin Panels',
    subcategory: 'React',
    tags: ['React', 'TypeScript', 'Tailwind', 'Dashboard'],
    price: 79,
    sellerId: 'seller-1',
    sellerName: 'TechCraft Studios',
    status: 'approved',
    version: '2.1.0',
    fileCount: 45,
    fileSize: 15728640,
    thumbnail: 'https://picsum.photos/seed/proj1/400/300',
    previewImages: ['https://picsum.photos/seed/proj1a/800/600', 'https://picsum.photos/seed/proj1b/800/600'],
    downloads: 234,
    rating: 4.8,
    reviewCount: 67,
    uploadedAt: new Date(2025, 5, 15).toISOString(),
    updatedAt: new Date(2025, 9, 1).toISOString(),
    approvedAt: new Date(2025, 5, 16).toISOString(),
    revenue: 18486,
    isFeatured: true,
    metadata: {
      framework: 'React 18',
      license: 'Standard',
      compatibility: ['Desktop', 'Tablet', 'Mobile'],
    },
  },
  {
    id: 'proj-2',
    title: 'Next.js E-commerce Template',
    description: 'Full-featured e-commerce solution with Next.js 14 and Stripe',
    category: 'Web Templates',
    subcategory: 'E-commerce',
    tags: ['Next.js', 'E-commerce', 'Stripe', 'TypeScript'],
    price: 149,
    sellerId: 'seller-2',
    sellerName: 'DesignHub',
    status: 'pending',
    version: '1.0.0',
    fileCount: 78,
    fileSize: 25165824,
    thumbnail: 'https://picsum.photos/seed/proj2/400/300',
    previewImages: ['https://picsum.photos/seed/proj2a/800/600'],
    downloads: 0,
    rating: 0,
    reviewCount: 0,
    uploadedAt: new Date(2025, 9, 4, 10, 30).toISOString(),
    updatedAt: new Date(2025, 9, 4, 10, 30).toISOString(),
    revenue: 0,
    isFeatured: false,
    metadata: {
      framework: 'Next.js 14',
      license: 'Extended',
      compatibility: ['Desktop', 'Tablet', 'Mobile'],
    },
  },
  {
    id: 'proj-3',
    title: 'Vue.js Mobile App UI Kit',
    description: 'Beautiful mobile app UI components for Vue.js',
    category: 'UI Kits',
    subcategory: 'Mobile',
    tags: ['Vue.js', 'Mobile', 'UI Kit', 'Components'],
    price: 59,
    sellerId: 'seller-3',
    sellerName: 'CodeMasters',
    status: 'rejected',
    version: '1.2.0',
    fileCount: 32,
    fileSize: 8388608,
    thumbnail: 'https://picsum.photos/seed/proj3/400/300',
    previewImages: [],
    downloads: 0,
    rating: 0,
    reviewCount: 0,
    uploadedAt: new Date(2025, 9, 3, 14, 20).toISOString(),
    updatedAt: new Date(2025, 9, 3, 14, 20).toISOString(),
    revenue: 0,
    isFeatured: false,
    metadata: {
      framework: 'Vue.js 3',
      license: 'Standard',
      compatibility: ['Mobile'],
    },
  },
];

export default function ProjectProductManagement() {
  const [projects, setProjects] = useState(mockProjects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | 'all'>('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const router = useRouter();

  const categories = ['Admin Panels', 'Web Templates', 'UI Kits', 'Landing Pages', 'Mobile Apps'];

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         p.sellerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleApprove = (projectId: string) => {
    setProjects(projects.map(p => 
      p.id === projectId 
        ? { ...p, status: 'approved', approvedAt: new Date().toISOString() }
        : p
    ));
    toast.success('Project approved');
  };

  const handleReject = (projectId: string) => {
    setProjects(projects.map(p => 
      p.id === projectId ? { ...p, status: 'rejected' } : p
    ));
    toast.success('Project rejected');
  };

  const handleUnlist = (projectId: string) => {
    setProjects(projects.map(p => 
      p.id === projectId ? { ...p, status: 'unlisted' } : p
    ));
    toast.success('Project unlisted');
  };

  const handleFeature = (projectId: string) => {
    setProjects(projects.map(p => 
      p.id === projectId ? { ...p, isFeatured: !p.isFeatured } : p
    ));
    toast.success('Featured status updated');
  };

  const handleBulkAction = (action: 'approve' | 'reject' | 'delete') => {
    if (action === 'delete') {
      if (confirm(`Delete ${selectedProjects.length} projects?`)) {
        setProjects(projects.filter(p => !selectedProjects.includes(p.id)));
        toast.success(`${selectedProjects.length} projects deleted`);
        setSelectedProjects([]);
      }
    } else {
      const newStatus = action === 'approve' ? 'approved' : 'rejected';
      setProjects(projects.map(p => 
        selectedProjects.includes(p.id) ? { ...p, status: newStatus } : p
      ));
      toast.success(`${selectedProjects.length} projects ${action}d`);
      setSelectedProjects([]);
    }
  };

  const getStatusColor = (status: ProjectStatus) => {
    switch (status) {
      case 'approved': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'pending': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'rejected': return 'bg-red-50 text-red-700 border-red-200';
      case 'unlisted': return 'bg-gray-50 text-gray-700 border-gray-200';
      case 'featured': return 'bg-purple-50 text-purple-700 border-purple-200';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1048576) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / 1048576).toFixed(2) + ' MB';
  };

  const totalCount = projects.length;
  const pendingCount = projects.filter(p => p.status === 'pending').length;
  const approvedCount = projects.filter(p => p.status === 'approved').length;
  const featuredCount = projects.filter(p => p.isFeatured).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Project & Product Management</h1>
          <p className="text-sm text-gray-500 mt-1">
            Moderate and manage all marketplace projects
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Total Projects"
          value={totalCount}
          icon={<FiPackage size={20} />}
          iconBg="bg-gray-50"
          iconColor="text-gray-600"
        />
        <StatCard
          title="Pending Approval"
          value={pendingCount}
          icon={<FiClock size={20} />}
          iconBg="bg-amber-50"
          iconColor="text-amber-600"
        />
        <StatCard
          title="Approved"
          value={approvedCount}
          icon={<FiCheckCircle size={20} />}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
        />
        <StatCard
          title="Featured"
          value={featuredCount}
          icon={<FiStar size={20} />}
          iconBg="bg-purple-50"
          iconColor="text-purple-600"
        />
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm"
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="unlisted">Unlisted</option>
          </select>

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
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedProjects.length > 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-blue-900">{selectedProjects.length} selected</span>
            <button
              onClick={() => handleBulkAction('approve')}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm font-medium transition-all flex items-center gap-2"
            >
              <FiCheck size={14} />
              Approve All
            </button>
            <button
              onClick={() => handleBulkAction('reject')}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-medium transition-all flex items-center gap-2"
            >
              <FiX size={14} />
              Reject All
            </button>
            <button
              onClick={() => handleBulkAction('delete')}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-medium transition-all flex items-center gap-2"
            >
              <FiTrash2 size={14} />
              Delete
            </button>
            <button
              onClick={() => setSelectedProjects([])}
              className="ml-auto px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium transition-all"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProjects.map(project => (
          <div key={project.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            {/* Thumbnail */}
            <div className="relative h-48">
              <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover" />
              <div className="absolute top-2 right-2 flex gap-2">
                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold border ${getStatusColor(project.status)}`}>
                  {project.status === 'approved' && <FiCheckCircle size={10} />}
                  {project.status === 'pending' && <FiClock size={10} />}
                  {project.status === 'rejected' && <FiX size={10} />}
                  {project.status.toUpperCase()}
                </span>
                {project.isFeatured && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-purple-600 text-white rounded-md text-xs font-bold">
                    <FiStar size={10} />
                    FEATURED
                  </span>
                )}
              </div>
              <input
                type="checkbox"
                checked={selectedProjects.includes(project.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedProjects([...selectedProjects, project.id]);
                  } else {
                    setSelectedProjects(selectedProjects.filter(id => id !== project.id));
                  }
                }}
                className="absolute top-2 left-2 w-4 h-4 rounded border-gray-300"
              />
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-1">{project.title}</h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {project.description}
              </p>

              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-md text-xs font-semibold">
                  <FiTag size={10} />
                  {project.category}
                </span>
                <span className="text-xl font-bold text-emerald-600 flex items-center gap-1">
                  <FiDollarSign size={16} />
                  {project.price}
                </span>
              </div>

              <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
                <span className="flex items-center gap-1">
                  <FiStar size={12} className="text-amber-500" />
                  {project.rating} ({project.reviewCount})
                </span>
                <span className="flex items-center gap-1">
                  <FiDownload size={12} />
                  {project.downloads}
                </span>
                <span className="flex items-center gap-1">
                  <FiFolder size={12} />
                  {formatFileSize(project.fileSize)}
                </span>
              </div>

              <div className="text-sm text-gray-600 mb-4">
                <p className="flex items-center gap-1 mb-1">
                  <FiUser size={12} />
                  {project.sellerName}
                </p>
                <p className="flex items-center gap-1">
                  <FiCalendar size={12} />
                  {new Date(project.uploadedAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-all flex items-center justify-center gap-1"
                >
                  <FiEye size={14} />
                  View
                </button>
                
                {project.status === 'pending' && (
                  <>
                    <button
                      onClick={() => handleApprove(project.id)}
                      className="p-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all"
                      title="Approve"
                    >
                      <FiCheck size={16} />
                    </button>
                    <button
                      onClick={() => handleReject(project.id)}
                      className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
                      title="Reject"
                    >
                      <FiX size={16} />
                    </button>
                  </>
                )}

                {project.status === 'approved' && (
                  <>
                    <button
                      onClick={() => handleFeature(project.id)}
                      className={`p-2 rounded-lg transition-all ${
                        project.isFeatured 
                          ? 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      title="Toggle Featured"
                    >
                      <FiStar size={16} />
                    </button>
                    <button
                      onClick={() => handleUnlist(project.id)}
                      className="p-2 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition-all"
                      title="Unlist"
                    >
                      <FiArchive size={16} />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiPackage size={24} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No projects found</h3>
          <p className="text-sm text-gray-500">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Project Details Modal */}
      {selectedProject && (
        <ProjectDetailsModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onApprove={handleApprove}
          onReject={handleReject}
          onFeature={handleFeature}
          formatFileSize={formatFileSize}
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

function ProjectDetailsModal({ project, onClose, onApprove, onReject, onFeature, formatFileSize }: any) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-xl border border-gray-200 max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-slideUp">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">{project.title}</h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:bg-white hover:text-gray-700 rounded-lg transition-all"
            >
              <FiX size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-160px)]">
          <div className="space-y-6">
            {/* Images */}
            <div className="grid grid-cols-2 gap-4">
              <img src={project.thumbnail} alt={project.title} className="w-full h-48 object-cover rounded-lg border border-gray-200" />
              {project.previewImages.map((img: string, idx: number) => (
                <img key={idx} src={img} alt={`Preview ${idx + 1}`} className="w-full h-48 object-cover rounded-lg border border-gray-200" />
              ))}
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-4">
              <DetailItem icon={<FiUser size={14} />} label="Seller" value={project.sellerName} />
              <DetailItem icon={<FiDollarSign size={14} />} label="Price" value={`$${project.price}`} valueClass="text-emerald-600 text-xl" />
              <DetailItem icon={<FiTag size={14} />} label="Category" value={project.category} />
              <DetailItem icon={<FiFileText size={14} />} label="Status" value={project.status} valueClass="capitalize" />
              <DetailItem icon={<FiTrendingUp size={14} />} label="Version" value={project.version} />
              <DetailItem icon={<FiFolder size={14} />} label="Files" value={`${project.fileCount} files (${formatFileSize(project.fileSize)})`} />
            </div>

            {/* Description */}
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <p className="text-sm text-gray-600 mb-2 flex items-center gap-1 font-semibold">
                <FiFileText size={12} />
                Description
              </p>
              <p className="text-gray-800">{project.description}</p>
            </div>

            {/* Tags */}
            <div>
              <p className="text-sm text-gray-600 mb-2 flex items-center gap-1 font-semibold">
                <FiTag size={12} />
                Tags
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag: string) => (
                  <span key={tag} className="px-3 py-1.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg text-sm font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4">
              <StatBox icon={<FiDownload size={16} />} value={project.downloads} label="Downloads" />
              <StatBox icon={<FiStar size={16} />} value={project.rating} label="Rating" />
              <StatBox icon={<FiFileText size={16} />} value={project.reviewCount} label="Reviews" />
              <StatBox icon={<FiDollarSign size={16} />} value={`$${project.revenue.toLocaleString()}`} label="Revenue" />
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              {project.status === 'pending' && (
                <>
                  <button
                    onClick={() => {
                      onApprove(project.id);
                      onClose();
                    }}
                    className="flex-1 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium transition-all flex items-center justify-center gap-2"
                  >
                    <FiCheck size={18} />
                    Approve Project
                  </button>
                  <button
                    onClick={() => {
                      onReject(project.id);
                      onClose();
                    }}
                    className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-all flex items-center justify-center gap-2"
                  >
                    <FiX size={18} />
                    Reject Project
                  </button>
                </>
              )}
              {project.status === 'approved' && (
                <button
                  onClick={() => {
                    onFeature(project.id);
                    onClose();
                  }}
                  className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium transition-all flex items-center justify-center gap-2"
                >
                  <FiStar size={18} />
                  {project.isFeatured ? 'Unfeature' : 'Feature'} Project
                </button>
              )}
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

function DetailItem({ icon, label, value, valueClass = '' }: any) {
  return (
    <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
      <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
        {icon}
        {label}
      </p>
      <p className={`font-semibold text-gray-900 ${valueClass}`}>{value}</p>
    </div>
  );
}

function StatBox({ icon, value, label }: any) {
  return (
    <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
      <div className="flex items-center justify-center mb-2">
        <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
          {icon}
        </div>
      </div>
      <p className="text-xl font-bold text-gray-900">{value}</p>
      <p className="text-xs text-gray-600 mt-1">{label}</p>
    </div>
  );
}
