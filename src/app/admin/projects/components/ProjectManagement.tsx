'use client';

import { useState } from 'react';
import { Project, ProjectStatus, ProjectVisibility } from '../types/project-admin';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { 
  FiFolder,
  FiPlus,
  FiSearch,
  FiFilter,
  FiMoreVertical,
  FiEdit2,
  FiTrash2,
  FiEye,
  FiUsers,
  FiCheckSquare,
  FiFileText,
  FiMessageSquare,
  FiGlobe,
  FiLock,
  FiX,
  FiTrendingUp,
  FiClock,
  FiCalendar,
  FiGithub,
  FiExternalLink,
  FiArchive,
  FiCheck
} from 'react-icons/fi';

// Mock data
const mockProjects: Project[] = [
  {
    id: 'proj-1',
    title: 'E-Commerce Platform',
    description: 'Building a scalable e-commerce platform with React and Node.js',
    category: 'Web Development',
    tags: ['React', 'Node.js', 'MongoDB', 'E-commerce'],
    visibility: 'public',
    status: 'active',
    ownerId: 'user-1',
    ownerName: 'John Doe',
    teamId: 'team-1',
    teamName: 'Web Dev Warriors',
    createdAt: new Date(2025, 5, 15).toISOString(),
    updatedAt: new Date(2025, 9, 4, 10, 30).toISOString(),
    lastActivity: new Date(2025, 9, 4, 10, 30).toISOString(),
    stats: {
      totalTasks: 45,
      completedTasks: 28,
      teamMembers: 6,
      filesCount: 234,
      chatMessages: 1420,
    },
    metadata: {
      githubRepo: 'https://github.com/user/ecommerce',
      website: 'https://example.com',
      license: 'MIT',
    },
  },
  {
    id: 'proj-2',
    title: 'Mobile Banking App',
    description: 'Secure mobile banking application with biometric authentication',
    category: 'Mobile Development',
    tags: ['React Native', 'Firebase', 'Banking', 'Security'],
    visibility: 'private',
    status: 'active',
    ownerId: 'user-2',
    ownerName: 'Jane Smith',
    createdAt: new Date(2025, 6, 20).toISOString(),
    updatedAt: new Date(2025, 9, 4, 9, 15).toISOString(),
    lastActivity: new Date(2025, 9, 4, 9, 15).toISOString(),
    stats: {
      totalTasks: 67,
      completedTasks: 45,
      teamMembers: 8,
      filesCount: 456,
      chatMessages: 2340,
    },
    metadata: {
      githubRepo: 'https://github.com/user/banking-app',
    },
  },
  {
    id: 'proj-3',
    title: 'AI Chatbot Integration',
    description: 'OpenAI-powered chatbot for customer support',
    category: 'AI/ML',
    tags: ['Python', 'OpenAI', 'NLP', 'Chatbot'],
    visibility: 'public',
    status: 'idle',
    ownerId: 'user-3',
    ownerName: 'Mike Johnson',
    teamId: 'team-2',
    teamName: 'AI Innovators',
    createdAt: new Date(2025, 4, 10).toISOString(),
    updatedAt: new Date(2025, 8, 15).toISOString(),
    lastActivity: new Date(2025, 8, 15).toISOString(),
    stats: {
      totalTasks: 23,
      completedTasks: 18,
      teamMembers: 4,
      filesCount: 89,
      chatMessages: 567,
    },
    metadata: {
      githubRepo: 'https://github.com/user/ai-chatbot',
      license: 'Apache 2.0',
    },
  },
  {
    id: 'proj-4',
    title: 'IoT Home Automation',
    description: 'Smart home system with IoT devices and mobile control',
    category: 'IoT',
    tags: ['Arduino', 'MQTT', 'Mobile', 'IoT'],
    visibility: 'private',
    status: 'archived',
    ownerId: 'user-4',
    ownerName: 'Sarah Williams',
    createdAt: new Date(2024, 11, 5).toISOString(),
    updatedAt: new Date(2025, 7, 20).toISOString(),
    lastActivity: new Date(2025, 7, 20).toISOString(),
    stats: {
      totalTasks: 34,
      completedTasks: 34,
      teamMembers: 3,
      filesCount: 156,
      chatMessages: 890,
    },
    metadata: {
      githubRepo: 'https://github.com/user/iot-home',
    },
  },
];

export default function ProjectManagement() {
  const [projects, setProjects] = useState(mockProjects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | 'all'>('all');
  const [visibilityFilter, setVisibilityFilter] = useState<ProjectVisibility | 'all'>('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const router = useRouter();

  const categories = ['Web Development', 'Mobile Development', 'AI/ML', 'IoT', 'DevOps', 'Data Science'];

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         p.ownerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    const matchesVisibility = visibilityFilter === 'all' || p.visibility === visibilityFilter;
    const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesVisibility && matchesCategory;
  });

  const handleStatusChange = (projectId: string, newStatus: ProjectStatus) => {
    setProjects(projects.map(p => 
      p.id === projectId ? { ...p, status: newStatus, updatedAt: new Date().toISOString() } : p
    ));
    toast.success(`Project status updated to ${newStatus}`);
  };

  const handleVisibilityChange = (projectId: string, newVisibility: ProjectVisibility) => {
    setProjects(projects.map(p => 
      p.id === projectId ? { ...p, visibility: newVisibility, updatedAt: new Date().toISOString() } : p
    ));
    toast.success(`Project visibility updated to ${newVisibility}`);
  };

  const handleDeleteProject = (projectId: string) => {
    if (confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      setProjects(projects.filter(p => p.id !== projectId));
      toast.success('Project deleted successfully');
    }
  };

  const handleBulkAction = (action: 'archive' | 'delete' | 'approve') => {
    if (action === 'delete') {
      if (confirm(`Delete ${selectedProjects.length} projects?`)) {
        setProjects(projects.filter(p => !selectedProjects.includes(p.id)));
        toast.success(`${selectedProjects.length} projects deleted`);
        setSelectedProjects([]);
      }
    } else if (action === 'archive') {
      setProjects(projects.map(p => 
        selectedProjects.includes(p.id) ? { ...p, status: 'archived' } : p
      ));
      toast.success(`${selectedProjects.length} projects archived`);
      setSelectedProjects([]);
    } else if (action === 'approve') {
      toast.success(`${selectedProjects.length} projects approved`);
      setSelectedProjects([]);
    }
  };

  const getStatusColor = (status: ProjectStatus) => {
    switch (status) {
      case 'active': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'idle': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'archived': return 'bg-gray-50 text-gray-700 border-gray-200';
      case 'completed': return 'bg-blue-50 text-blue-700 border-blue-200';
    }
  };

  const getVisibilityIcon = (visibility: ProjectVisibility) => {
    switch (visibility) {
      case 'public': return <FiGlobe size={14} className="text-blue-600" />;
      case 'private': return <FiLock size={14} className="text-orange-600" />;
      case 'team': return <FiUsers size={14} className="text-purple-600" />;
    }
  };

  const getActivityStatus = (lastActivity: string) => {
    const hoursSinceActivity = (Date.now() - new Date(lastActivity).getTime()) / (1000 * 60 * 60);
    if (hoursSinceActivity < 24) return { label: 'Active', color: 'text-emerald-600', dot: 'bg-emerald-500' };
    if (hoursSinceActivity < 168) return { label: 'Recent', color: 'text-amber-600', dot: 'bg-amber-500' };
    return { label: 'Inactive', color: 'text-red-600', dot: 'bg-red-500' };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Project Management Console</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage all projects, visibility, and permissions
          </p>
        </div>
        <button
          onClick={() => router.push('/admin/projects/pages/projects/create')}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-all flex items-center gap-2"
        >
          <FiPlus size={16} />
          Create Project
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Total Projects"
          value={projects.length}
          icon={<FiFolder size={20} />}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
        />
        <StatCard
          title="Active"
          value={projects.filter(p => p.status === 'active').length}
          icon={<FiCheckSquare size={20} />}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
        />
        <StatCard
          title="Idle"
          value={projects.filter(p => p.status === 'idle').length}
          icon={<FiClock size={20} />}
          iconBg="bg-amber-50"
          iconColor="text-amber-600"
        />
        <StatCard
          title="Archived"
          value={projects.filter(p => p.status === 'archived').length}
          icon={<FiArchive size={20} />}
          iconBg="bg-gray-50"
          iconColor="text-gray-600"
        />
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
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
            <option value="active">Active</option>
            <option value="idle">Idle</option>
            <option value="archived">Archived</option>
            <option value="completed">Completed</option>
          </select>

          <select
            value={visibilityFilter}
            onChange={(e) => setVisibilityFilter(e.target.value as any)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium"
          >
            <option value="all">All Visibility</option>
            <option value="public">Public</option>
            <option value="private">Private</option>
            <option value="team">Team</option>
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
            <span className="font-semibold text-blue-900 flex items-center gap-2">
              <FiCheck size={16} />
              {selectedProjects.length} selected
            </span>
            <button
              onClick={() => handleBulkAction('approve')}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm font-medium transition-all"
            >
              Approve
            </button>
            <button
              onClick={() => handleBulkAction('archive')}
              className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 text-sm font-medium transition-all"
            >
              Archive
            </button>
            <button
              onClick={() => handleBulkAction('delete')}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-medium transition-all"
            >
              Delete
            </button>
            <button
              onClick={() => setSelectedProjects([])}
              className="ml-auto px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium transition-all"
            >
              Clear Selection
            </button>
          </div>
        </div>
      )}

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredProjects.map(project => {
          const activityStatus = getActivityStatus(project.lastActivity);
          const completionPercentage = Math.round((project.stats.completedTasks / project.stats.totalTasks) * 100);
          
          return (
            <div key={project.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
              {/* Project Header */}
              <div className="p-5 border-b border-gray-100">
                <div className="flex items-start gap-4">
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
                    className="mt-1 rounded border-gray-300"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-bold text-gray-900 truncate">{project.title}</h3>
                      {getVisibilityIcon(project.visibility)}
                      <span className={`px-2.5 py-0.5 rounded-md text-xs font-semibold capitalize border ${getStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                    </div>

                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                      {project.description}
                    </p>

                    <div className="flex items-center flex-wrap gap-3 text-sm text-gray-600 mb-3">
                      <span className="flex items-center gap-1">
                        <FiUsers size={14} />
                        {project.ownerName}
                      </span>
                      {project.teamName && (
                        <span className="flex items-center gap-1">
                          <FiUsers size={14} />
                          {project.teamName}
                        </span>
                      )}
                      <span className={`flex items-center gap-1 ${activityStatus.color}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${activityStatus.dot}`}></span>
                        {activityStatus.label}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <span className="px-2.5 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-md text-xs font-medium">
                        {project.category}
                      </span>
                      {project.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="px-2.5 py-1 bg-gray-50 text-gray-700 border border-gray-200 rounded-md text-xs font-medium">
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="px-2.5 py-1 bg-gray-50 text-gray-500 border border-gray-200 rounded-md text-xs font-medium">
                          +{project.tags.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="px-5 py-3 bg-gray-50">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-600 font-medium">Progress</span>
                  <span className="font-bold text-gray-900">{completionPercentage}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full transition-all"
                    style={{ width: `${completionPercentage}%` }}
                  ></div>
                </div>
              </div>

              {/* Project Stats */}
              <div className="px-5 py-4 bg-white">
                <div className="grid grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="flex items-center justify-center gap-1 text-gray-900 font-bold text-lg">
                      <FiCheckSquare size={16} className="text-blue-600" />
                      {project.stats.totalTasks}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Tasks</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-1 text-gray-900 font-bold text-lg">
                      <FiUsers size={16} className="text-purple-600" />
                      {project.stats.teamMembers}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Members</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-1 text-gray-900 font-bold text-lg">
                      <FiFileText size={16} className="text-emerald-600" />
                      {project.stats.filesCount}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Files</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-1 text-gray-900 font-bold text-lg">
                      <FiMessageSquare size={16} className="text-orange-600" />
                      {project.stats.chatMessages}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Messages</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="px-5 py-4 border-t border-gray-100 flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-all flex items-center gap-1.5"
                >
                  <FiEye size={14} />
                  View
                </button>
                <button
                  onClick={() => router.push(`/admin/projects/pages/projects/${project.id}/edit`)}
                  className="px-3 py-1.5 bg-gray-100 text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-200 text-sm font-medium transition-all flex items-center gap-1.5"
                >
                  <FiEdit2 size={14} />
                  Edit
                </button>
                
                <select
                  value={project.status}
                  onChange={(e) => handleStatusChange(project.id, e.target.value as ProjectStatus)}
                  className="px-3 py-1.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium"
                >
                  <option value="active">Active</option>
                  <option value="idle">Idle</option>
                  <option value="archived">Archived</option>
                  <option value="completed">Completed</option>
                </select>

                <select
                  value={project.visibility}
                  onChange={(e) => handleVisibilityChange(project.id, e.target.value as ProjectVisibility)}
                  className="px-3 py-1.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium"
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                  <option value="team">Team</option>
                </select>

                <button
                  onClick={() => handleDeleteProject(project.id)}
                  className="ml-auto px-3 py-1.5 bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-100 text-sm font-medium transition-all flex items-center gap-1.5"
                >
                  <FiTrash2 size={14} />
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiFolder size={24} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No projects found</h3>
          <p className="text-sm text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
          <button
            onClick={() => router.push('/admin/projects/pages/projects/create')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-all inline-flex items-center gap-2"
          >
            <FiPlus size={16} />
            Create Your First Project
          </button>
        </div>
      )}

      {/* Project Details Modal */}
      {selectedProject && (
        <ProjectDetailsModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onStatusChange={handleStatusChange}
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

function ProjectDetailsModal({ project, onClose, onStatusChange }: any) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-xl border border-gray-200 max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-slideUp">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FiFolder className="text-blue-600" size={20} />
              </div>
              <h2 className="text-xl font-bold text-gray-900">{project.title}</h2>
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
            {/* Basic Info */}
            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-3">Project Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Owner</p>
                  <p className="font-medium text-gray-900">{project.ownerName}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Category</p>
                  <p className="font-medium text-gray-900">{project.category}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Status</p>
                  <p className="font-medium text-gray-900 capitalize">{project.status}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Visibility</p>
                  <p className="font-medium text-gray-900 capitalize">{project.visibility}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600">{project.description}</p>
            </div>

            {/* Stats */}
            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-3">Project Stats</h3>
              <div className="grid grid-cols-4 gap-4">
                <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg text-center">
                  <p className="text-2xl font-bold text-gray-900">{project.stats.totalTasks}</p>
                  <p className="text-sm text-gray-600 mt-1">Total Tasks</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg text-center">
                  <p className="text-2xl font-bold text-gray-900">{project.stats.completedTasks}</p>
                  <p className="text-sm text-gray-600 mt-1">Completed</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-lg text-center">
                  <p className="text-2xl font-bold text-gray-900">{project.stats.teamMembers}</p>
                  <p className="text-sm text-gray-600 mt-1">Team Members</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-lg text-center">
                  <p className="text-2xl font-bold text-gray-900">{project.stats.filesCount}</p>
                  <p className="text-sm text-gray-600 mt-1">Files</p>
                </div>
              </div>
            </div>

            {/* Metadata */}
            {project.metadata && (
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-3">Metadata</h3>
                <div className="space-y-2">
                  {project.metadata.githubRepo && (
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <FiGithub className="text-gray-600" size={18} />
                      <span className="text-sm text-gray-600 font-medium">GitHub:</span>
                      <a href={project.metadata.githubRepo} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm flex items-center gap-1">
                        {project.metadata.githubRepo}
                        <FiExternalLink size={12} />
                      </a>
                    </div>
                  )}
                  {project.metadata.website && (
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <FiGlobe className="text-gray-600" size={18} />
                      <span className="text-sm text-gray-600 font-medium">Website:</span>
                      <a href={project.metadata.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm flex items-center gap-1">
                        {project.metadata.website}
                        <FiExternalLink size={12} />
                      </a>
                    </div>
                  )}
                  {project.metadata.license && (
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <FiFileText className="text-gray-600" size={18} />
                      <span className="text-sm text-gray-600 font-medium">License:</span>
                      <span className="text-sm text-gray-900">{project.metadata.license}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <button className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-all">
                View Full Project
              </button>
              <button
                onClick={() => {
                  onStatusChange(project.id, 'archived');
                  onClose();
                }}
                className="px-4 py-2.5 bg-amber-50 text-amber-700 border border-amber-200 rounded-lg hover:bg-amber-100 font-medium transition-all flex items-center gap-2"
              >
                <FiArchive size={16} />
                Archive
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
