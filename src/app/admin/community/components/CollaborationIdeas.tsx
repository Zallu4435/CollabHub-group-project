'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { 
  FiLayout,
  FiUsers,
  FiEdit3,
  FiTrendingUp,
  FiPlus,
  FiSearch,
  FiEye,
  FiTrash2,
  FiArchive,
  FiRefreshCw,
  FiUser,
  FiCalendar,
  FiClock,
  FiHash,
  FiGlobe,
  FiLock,
  FiGrid,
  FiLayers,
  FiZap,
  FiTarget
} from 'react-icons/fi';

interface CollaborativeCanvas {
  id: string;
  title: string;
  description: string;
  type: 'canvas' | 'ideaboard' | 'whiteboard';
  createdBy: string;
  createdAt: string;
  status: 'active' | 'archived';
  visibility: 'public' | 'private' | 'group';
  collaborators: number;
  edits: number;
  version: number;
  lastEditedAt: string;
  tags: string[];
}

const mockCanvases: CollaborativeCanvas[] = [
  {
    id: 'canvas-1',
    title: 'Q4 Product Roadmap',
    description: 'Collaborative planning for Q4 product features',
    type: 'canvas',
    createdBy: 'Product Team',
    createdAt: new Date(2025, 9, 1).toISOString(),
    status: 'active',
    visibility: 'public',
    collaborators: 12,
    edits: 345,
    version: 23,
    lastEditedAt: new Date(2025, 9, 6, 9, 30).toISOString(),
    tags: ['product', 'roadmap', 'planning'],
  },
  {
    id: 'canvas-2',
    title: 'Community Feature Brainstorm',
    description: 'Ideas for new community platform features',
    type: 'ideaboard',
    createdBy: 'Sarah Johnson',
    createdAt: new Date(2025, 9, 3).toISOString(),
    status: 'active',
    visibility: 'public',
    collaborators: 45,
    edits: 892,
    version: 67,
    lastEditedAt: new Date(2025, 9, 6, 8, 15).toISOString(),
    tags: ['features', 'community', 'ideas'],
  },
  {
    id: 'canvas-3',
    title: 'Design System Workshop',
    description: 'Collaborative design system documentation',
    type: 'whiteboard',
    createdBy: 'Design Team',
    createdAt: new Date(2025, 8, 15).toISOString(),
    status: 'archived',
    visibility: 'private',
    collaborators: 8,
    edits: 234,
    version: 15,
    lastEditedAt: new Date(2025, 9, 2).toISOString(),
    tags: ['design', 'system', 'documentation'],
  },
];

export default function CollaborationIdeas() {
  const [canvases, setCanvases] = useState(mockCanvases);
  const [selectedCanvas, setSelectedCanvas] = useState<CollaborativeCanvas | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterVisibility, setFilterVisibility] = useState('all');

  const filteredCanvases = canvases.filter(canvas => {
    const matchesSearch = canvas.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         canvas.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || canvas.type === filterType;
    const matchesStatus = filterStatus === 'all' || canvas.status === filterStatus;
    const matchesVisibility = filterVisibility === 'all' || canvas.visibility === filterVisibility;
    return matchesSearch && matchesType && matchesStatus && matchesVisibility;
  });

  const handleArchive = (canvasId: string) => {
    setCanvases(canvases.map(c =>
      c.id === canvasId ? { ...c, status: 'archived' } : c
    ));
    toast.success('Canvas archived');
  };

  const handleRestore = (canvasId: string) => {
    setCanvases(canvases.map(c =>
      c.id === canvasId ? { ...c, status: 'active' } : c
    ));
    toast.success('Canvas restored');
  };

  const handleDelete = (canvasId: string) => {
    if (confirm('Delete this canvas permanently?')) {
      setCanvases(canvases.filter(c => c.id !== canvasId));
      toast.success('Canvas deleted');
    }
  };

  const handleChangeVisibility = (canvasId: string, visibility: CollaborativeCanvas['visibility']) => {
    setCanvases(canvases.map(c =>
      c.id === canvasId ? { ...c, visibility } : c
    ));
    toast.success('Visibility updated');
  };

  const getTypeIcon = (type: string, size = 24) => {
    switch (type) {
      case 'canvas': return <FiLayout size={size} />;
      case 'ideaboard': return <FiZap size={size} />;
      case 'whiteboard': return <FiEdit3 size={size} />;
      default: return <FiGrid size={size} />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'canvas': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'ideaboard': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'whiteboard': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getVisibilityColor = (visibility: string) => {
    switch (visibility) {
      case 'public': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'private': return 'bg-red-50 text-red-700 border-red-200';
      case 'group': return 'bg-blue-50 text-blue-700 border-blue-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getVisibilityIcon = (visibility: string, size = 10) => {
    switch (visibility) {
      case 'public': return <FiGlobe size={size} />;
      case 'private': return <FiLock size={size} />;
      case 'group': return <FiUsers size={size} />;
      default: return <FiGlobe size={size} />;
    }
  };

  const totalCollaborators = canvases.reduce((acc, c) => acc + c.collaborators, 0);
  const totalEdits = canvases.reduce((acc, c) => acc + c.edits, 0);
  const avgCollaborators = Math.round(totalCollaborators / canvases.length);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Collaboration & Ideas</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage collaborative canvases and idea boards
          </p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-all flex items-center gap-2">
          <FiPlus size={16} />
          Create Canvas
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Total Canvases"
          value={canvases.length}
          icon={<FiLayers size={20} />}
          iconBg="bg-gray-50"
          iconColor="text-gray-600"
        />
        <StatCard
          title="Active Collaborators"
          value={totalCollaborators}
          icon={<FiUsers size={20} />}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
        />
        <StatCard
          title="Total Edits"
          value={totalEdits}
          icon={<FiEdit3 size={20} />}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
        />
        <StatCard
          title="Avg Collaborators"
          value={avgCollaborators}
          icon={<FiTrendingUp size={20} />}
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
              placeholder="Search canvases..."
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
            <option value="canvas">Canvas</option>
            <option value="ideaboard">Idea Board</option>
            <option value="whiteboard">Whiteboard</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="archived">Archived</option>
          </select>

          <select
            value={filterVisibility}
            onChange={(e) => setFilterVisibility(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium"
          >
            <option value="all">All Visibility</option>
            <option value="public">Public</option>
            <option value="private">Private</option>
            <option value="group">Group</option>
          </select>
        </div>
      </div>

      {/* Canvases Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCanvases.map(canvas => (
          <div key={canvas.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4 mb-4">
              <div className={`p-3 rounded-lg ${getTypeColor(canvas.type).split(' ')[0]} border ${getTypeColor(canvas.type).split(' ').pop()}`}>
                {getTypeIcon(canvas.type)}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <h3 className="text-lg font-bold text-gray-900">{canvas.title}</h3>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold capitalize border ${getTypeColor(canvas.type)}`}>
                    {getTypeIcon(canvas.type, 10)}
                    {canvas.type}
                  </span>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold capitalize border ${getVisibilityColor(canvas.visibility)}`}>
                    {getVisibilityIcon(canvas.visibility)}
                    {canvas.visibility}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-4">
                  {canvas.description}
                </p>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                      <FiUsers size={10} />
                      Collaborators
                    </p>
                    <p className="font-bold text-gray-900">{canvas.collaborators}</p>
                  </div>
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                      <FiEdit3 size={10} />
                      Total Edits
                    </p>
                    <p className="font-bold text-gray-900">{canvas.edits}</p>
                  </div>
                  <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                      <FiLayers size={10} />
                      Version
                    </p>
                    <p className="font-bold text-gray-900">v{canvas.version}</p>
                  </div>
                  <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">Status</p>
                    <p className={`font-bold capitalize ${
                      canvas.status === 'active' ? 'text-emerald-600' : 'text-gray-600'
                    }`}>
                      {canvas.status}
                    </p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-xs text-gray-600 mb-2">Tags</p>
                  <div className="flex flex-wrap gap-2">
                    {canvas.tags.map((tag, idx) => (
                      <span key={idx} className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-md text-xs font-semibold">
                        <FiHash size={10} />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="text-xs text-gray-600 mb-4 space-y-1">
                  <p className="flex items-center gap-1">
                    <FiUser size={10} />
                    Created by <strong>{canvas.createdBy}</strong> on {new Date(canvas.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                  <p className="flex items-center gap-1">
                    <FiClock size={10} />
                    Last edited: {new Date(canvas.lastEditedAt).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2">
                  {canvas.status === 'active' ? (
                    <>
                      <button
                        onClick={() => handleArchive(canvas.id)}
                        className="px-3 py-2 bg-orange-50 text-orange-700 border border-orange-200 rounded-lg hover:bg-orange-100 text-xs font-medium transition-all flex items-center gap-1"
                      >
                        <FiArchive size={12} />
                        Archive
                      </button>
                      <select
                        value={canvas.visibility}
                        onChange={(e) => handleChangeVisibility(canvas.id, e.target.value as any)}
                        className="px-3 py-2 border border-gray-200 rounded-lg text-xs font-medium focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none"
                      >
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                        <option value="group">Group</option>
                      </select>
                    </>
                  ) : (
                    <button
                      onClick={() => handleRestore(canvas.id)}
                      className="px-3 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-xs font-medium transition-all flex items-center gap-1"
                    >
                      <FiRefreshCw size={12} />
                      Restore
                    </button>
                  )}

                  <button
                    onClick={() => setSelectedCanvas(canvas)}
                    className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-xs font-medium transition-all flex items-center gap-1"
                  >
                    <FiEye size={12} />
                    View
                  </button>

                  <button
                    onClick={() => handleDelete(canvas.id)}
                    className="ml-auto px-3 py-2 bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-100 text-xs font-medium transition-all flex items-center gap-1"
                  >
                    <FiTrash2 size={12} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Most Active Canvases */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FiTarget className="text-orange-600" size={18} />
          Most Active Canvases
        </h3>
        <div className="space-y-3">
          {canvases
            .filter(c => c.status === 'active')
            .sort((a, b) => b.edits - a.edits)
            .slice(0, 5)
            .map((canvas, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg hover:shadow-sm transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    {getTypeIcon(canvas.type, 20)}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{canvas.title}</p>
                    <p className="text-xs text-gray-600">
                      {canvas.collaborators} collaborators • v{canvas.version}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-blue-600 flex items-center gap-1">
                    <FiEdit3 size={14} />
                    {canvas.edits}
                  </p>
                  <p className="text-xs text-gray-600">edits</p>
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
