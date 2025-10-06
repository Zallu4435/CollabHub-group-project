'use client';

import React, { useState } from 'react';
import { 
  FiFileText, 
  FiImage, 
  FiVideo, 
  FiMusic, 
  FiArchive,
  FiFolder,
  FiUpload,
  FiDownload,
  FiTrash2,
  FiEdit,
  FiEye,
  FiSearch,
  FiFilter,
  FiRefreshCw,
  FiCopy,
  FiMove,
  FiShare2,
  FiLock,
  FiUnlock,
  FiStar,
  FiTag,
  FiCalendar,
  FiUser,
  FiHardDrive,
  FiCloud,
  FiDatabase,
  FiCpu,
  FiWifi,
  FiShield,
  FiAlertTriangle,
  FiCheckCircle,
  FiXCircle,
  FiMoreVertical,
  FiGrid,
  FiList,
  FiPlus,
  FiChevronRight,
  FiChevronDown,
  FiExternalLink,
  FiLink,
  FiMaximize2,
  FiMinimize2,
  FiRotateCw,
  FiCrop,
  FiSettings,
  FiZap,
  FiBarChart2,
  FiTrendingUp
} from 'react-icons/fi';

// Types
interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  mimeType?: string;
  size: number;
  path: string;
  parentId?: string;
  projectId: string;
  projectName: string;
  authorId: string;
  authorName: string;
  createdAt: string;
  updatedAt: string;
  lastAccessedAt: string;
  version: number;
  isPublic: boolean;
  isLocked: boolean;
  tags: string[];
  description?: string;
  thumbnailUrl?: string;
  downloadCount: number;
  viewCount: number;
  shareCount: number;
  checksum: string;
  storageLocation: 'local' | 'cloud' | 'cdn';
  compressionRatio?: number;
  quality?: 'low' | 'medium' | 'high' | 'original';
  format?: string;
  dimensions?: {
    width: number;
    height: number;
  };
  duration?: number; // for video/audio files
  bitrate?: number;
  sampleRate?: number;
}

interface StorageMetrics {
  totalSpace: number;
  usedSpace: number;
  availableSpace: number;
  fileCount: number;
  folderCount: number;
  averageFileSize: number;
  largestFile: FileItem | null;
  oldestFile: FileItem | null;
  newestFile: FileItem | null;
  storageByType: {
    images: number;
    videos: number;
    documents: number;
    audio: number;
    archives: number;
    other: number;
  };
  storageByProject: {
    projectId: string;
    projectName: string;
    usedSpace: number;
    fileCount: number;
  }[];
}

interface VersionHistory {
  id: string;
  fileId: string;
  version: number;
  size: number;
  createdAt: string;
  authorId: string;
  authorName: string;
  changeDescription: string;
  checksum: string;
  downloadUrl: string;
}

// Mock data
const mockFiles: FileItem[] = [
  {
    id: 'file-1',
    name: 'project-proposal.pdf',
    type: 'file',
    mimeType: 'application/pdf',
    size: 2048000,
    path: '/projects/proj-1/documents/project-proposal.pdf',
    projectId: 'proj-1',
    projectName: 'E-Commerce Platform',
    authorId: 'user-1',
    authorName: 'John Doe',
    createdAt: '2024-01-10T10:30:00Z',
    updatedAt: '2024-01-15T14:20:00Z',
    lastAccessedAt: '2024-01-15T16:45:00Z',
    version: 3,
    isPublic: false,
    isLocked: false,
    tags: ['proposal', 'documentation', 'planning'],
    description: 'Initial project proposal and requirements',
    downloadCount: 12,
    viewCount: 45,
    shareCount: 3,
    checksum: 'sha256:abc123def456',
    storageLocation: 'cloud',
    quality: 'high',
    format: 'PDF'
  },
  {
    id: 'file-2',
    name: 'dashboard-mockup.png',
    type: 'file',
    mimeType: 'image/png',
    size: 1536000,
    path: '/projects/proj-1/designs/dashboard-mockup.png',
    projectId: 'proj-1',
    projectName: 'E-Commerce Platform',
    authorId: 'user-2',
    authorName: 'Sarah Chen',
    createdAt: '2024-01-12T09:15:00Z',
    updatedAt: '2024-01-12T09:15:00Z',
    lastAccessedAt: '2024-01-14T11:30:00Z',
    version: 1,
    isPublic: true,
    isLocked: false,
    tags: ['design', 'mockup', 'ui'],
    description: 'Dashboard interface mockup',
    thumbnailUrl: '/thumbnails/dashboard-mockup-thumb.png',
    downloadCount: 8,
    viewCount: 23,
    shareCount: 5,
    checksum: 'sha256:def456ghi789',
    storageLocation: 'cdn',
    quality: 'high',
    format: 'PNG',
    dimensions: {
      width: 1920,
      height: 1080
    }
  },
  {
    id: 'file-3',
    name: 'demo-video.mp4',
    type: 'file',
    mimeType: 'video/mp4',
    size: 52428800,
    path: '/projects/proj-1/media/demo-video.mp4',
    projectId: 'proj-1',
    projectName: 'E-Commerce Platform',
    authorId: 'user-3',
    authorName: 'Mike Wilson',
    createdAt: '2024-01-14T16:45:00Z',
    updatedAt: '2024-01-14T16:45:00Z',
    lastAccessedAt: '2024-01-15T10:20:00Z',
    version: 1,
    isPublic: true,
    isLocked: false,
    tags: ['video', 'demo', 'presentation'],
    description: 'Product demonstration video',
    thumbnailUrl: '/thumbnails/demo-video-thumb.jpg',
    downloadCount: 15,
    viewCount: 67,
    shareCount: 12,
    checksum: 'sha256:ghi789jkl012',
    storageLocation: 'cloud',
    quality: 'high',
    format: 'MP4',
    dimensions: {
      width: 1280,
      height: 720
    },
    duration: 180,
    bitrate: 2000
  },
  {
    id: 'folder-1',
    name: 'source-code',
    type: 'folder',
    path: '/projects/proj-1/source-code',
    projectId: 'proj-1',
    projectName: 'E-Commerce Platform',
    authorId: 'user-1',
    authorName: 'John Doe',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T14:20:00Z',
    lastAccessedAt: '2024-01-15T16:45:00Z',
    version: 1,
    isPublic: false,
    isLocked: false,
    tags: ['code', 'source', 'development'],
    description: 'Main source code directory',
    downloadCount: 0,
    viewCount: 0,
    shareCount: 0,
    checksum: '',
    storageLocation: 'local',
    size: 0 // <-- Add this line
  }
];

const mockStorageMetrics: StorageMetrics = {
  totalSpace: 1000000000000, // 1TB
  usedSpace: 450000000000,   // 450GB
  availableSpace: 550000000000, // 550GB
  fileCount: 1247,
  folderCount: 156,
  averageFileSize: 360000000, // 360MB
  largestFile: mockFiles[2], // demo-video.mp4
  oldestFile: mockFiles[3], // source-code folder
  newestFile: mockFiles[2], // demo-video.mp4
  storageByType: {
    images: 45000000000,    // 45GB
    videos: 250000000000,   // 250GB
    documents: 80000000000, // 80GB
    audio: 30000000000,     // 30GB
    archives: 20000000000,  // 20GB
    other: 25000000000      // 25GB
  },
  storageByProject: [
    {
      projectId: 'proj-1',
      projectName: 'E-Commerce Platform',
      usedSpace: 150000000000, // 150GB
      fileCount: 456
    },
    {
      projectId: 'proj-2',
      projectName: 'Mobile Banking App',
      usedSpace: 200000000000, // 200GB
      fileCount: 623
    },
    {
      projectId: 'proj-3',
      projectName: 'AI Chatbot System',
      usedSpace: 100000000000, // 100GB
      fileCount: 168
    }
  ]
};

const mockVersionHistory: VersionHistory[] = [
  {
    id: 'ver-1',
    fileId: 'file-1',
    version: 3,
    size: 2048000,
    createdAt: '2024-01-15T14:20:00Z',
    authorId: 'user-1',
    authorName: 'John Doe',
    changeDescription: 'Updated budget estimates and timeline',
    checksum: 'sha256:abc123def456',
    downloadUrl: '/files/project-proposal-v3.pdf'
  },
  {
    id: 'ver-2',
    fileId: 'file-1',
    version: 2,
    size: 1984000,
    createdAt: '2024-01-12T11:30:00Z',
    authorId: 'user-1',
    authorName: 'John Doe',
    changeDescription: 'Added technical specifications',
    checksum: 'sha256:xyz789abc123',
    downloadUrl: '/files/project-proposal-v2.pdf'
  },
  {
    id: 'ver-3',
    fileId: 'file-1',
    version: 1,
    size: 1856000,
    createdAt: '2024-01-10T10:30:00Z',
    authorId: 'user-1',
    authorName: 'John Doe',
    changeDescription: 'Initial version',
    checksum: 'sha256:def456ghi789',
    downloadUrl: '/files/project-proposal-v1.pdf'
  }
];

export default function AdvancedContentManagement() {
  const [activeTab, setActiveTab] = useState<'overview' | 'files' | 'storage' | 'versions' | 'analytics'>('overview');
  const [files, setFiles] = useState<FileItem[]>(mockFiles);
  const [storageMetrics, setStorageMetrics] = useState<StorageMetrics>(mockStorageMetrics);
  const [versionHistory, setVersionHistory] = useState<VersionHistory[]>(mockVersionHistory);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [projectFilter, setProjectFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'name' | 'size' | 'date' | 'type'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showVersionModal, setShowVersionModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = typeFilter === 'all' || file.type === typeFilter;
    const matchesProject = projectFilter === 'all' || file.projectId === projectFilter;
    return matchesSearch && matchesType && matchesProject;
  });

  const sortedFiles = [...filteredFiles].sort((a, b) => {
    let comparison = 0;
    switch (sortBy) {
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      case 'size':
        comparison = a.size - b.size;
        break;
      case 'date':
        comparison = new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
        break;
      case 'type':
        comparison = (a.mimeType || '').localeCompare(b.mimeType || '');
        break;
    }
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (file: FileItem) => {
    if (file.type === 'folder') return <FiFolder size={20} />;
    
    const mimeType = file.mimeType || '';
    if (mimeType.startsWith('image/')) return <FiImage size={20} />;
    if (mimeType.startsWith('video/')) return <FiVideo size={20} />;
    if (mimeType.startsWith('audio/')) return <FiMusic size={20} />;
    if (mimeType.includes('pdf') || mimeType.includes('document')) return <FiFileText size={20} />;
    if (mimeType.includes('zip') || mimeType.includes('rar') || mimeType.includes('tar')) return <FiArchive size={20} />;
    
    return <FiFileText size={20} />;
  };

  const StatCard = ({ title, value, icon, iconBg, iconColor, trend, trendValue, subtitle }: {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    iconBg: string;
    iconColor: string;
    trend?: 'up' | 'down' | 'neutral';
    trendValue?: string;
    subtitle?: string;
  }) => (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
          {trend && trendValue && (
            <div className={`flex items-center mt-2 text-sm ${
              trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600'
            }`}>
              <FiTrendingUp className={`mr-1 ${trend === 'down' ? 'rotate-180' : ''}`} size={14} />
              {trendValue}
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${iconBg}`}>
          <div className={iconColor}>{icon}</div>
        </div>
      </div>
    </div>
  );

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Files"
          value={storageMetrics.fileCount.toLocaleString()}
          icon={<FiFileText size={24} />}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
          trend="up"
          trendValue="+12.5%"
          subtitle={`${storageMetrics.folderCount} folders`}
        />
        <StatCard
          title="Storage Used"
          value={formatFileSize(storageMetrics.usedSpace)}
          icon={<FiHardDrive size={24} />}
          iconBg="bg-green-50"
          iconColor="text-green-600"
          trend="up"
          trendValue="+8.3%"
          subtitle={`${((storageMetrics.usedSpace / storageMetrics.totalSpace) * 100).toFixed(1)}% of total`}
        />
        <StatCard
          title="Available Space"
          value={formatFileSize(storageMetrics.availableSpace)}
          icon={<FiCloud size={24} />}
          iconBg="bg-purple-50"
          iconColor="text-purple-600"
          trend="neutral"
          trendValue="0%"
          subtitle="Remaining storage"
        />
        <StatCard
          title="Avg File Size"
          value={formatFileSize(storageMetrics.averageFileSize)}
          icon={<FiBarChart2 size={24} />}
          iconBg="bg-orange-50"
          iconColor="text-orange-600"
          trend="down"
          trendValue="-2.1%"
          subtitle="Per file"
        />
      </div>

      {/* Storage Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Storage by Type</h3>
          <div className="space-y-4">
            {Object.entries(storageMetrics.storageByType).map(([type, size]) => (
              <div key={type} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="mr-3">
                    {type === 'images' && <FiImage size={16} className="text-blue-600" />}
                    {type === 'videos' && <FiVideo size={16} className="text-red-600" />}
                    {type === 'documents' && <FiFileText size={16} className="text-green-600" />}
                    {type === 'audio' && <FiMusic size={16} className="text-purple-600" />}
                    {type === 'archives' && <FiArchive size={16} className="text-orange-600" />}
                    {type === 'other' && <FiFileText size={16} className="text-gray-600" />}
                  </div>
                  <span className="text-sm font-medium text-gray-900 capitalize">{type}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{formatFileSize(size)}</div>
                  <div className="text-xs text-gray-500">
                    {((size / storageMetrics.usedSpace) * 100).toFixed(1)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Storage by Project</h3>
          <div className="space-y-4">
            {storageMetrics.storageByProject.map((project) => (
              <div key={project.projectId} className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-900">{project.projectName}</div>
                  <div className="text-xs text-gray-500">{project.fileCount} files</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{formatFileSize(project.usedSpace)}</div>
                  <div className="text-xs text-gray-500">
                    {((project.usedSpace / storageMetrics.usedSpace) * 100).toFixed(1)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Files */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Files</h3>
        <div className="space-y-3">
          {files.slice(0, 5).map((file) => (
            <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="text-gray-400">{getFileIcon(file)}</div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{file.name}</p>
                  <p className="text-xs text-gray-500">{file.projectName}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-900">{formatFileSize(file.size)}</p>
                <p className="text-xs text-gray-500">
                  {new Date(file.updatedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderFiles = () => (
    <div className="space-y-6">
      {/* Controls */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search files..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="file">Files</option>
            <option value="folder">Folders</option>
          </select>
          <select
            value={projectFilter}
            onChange={(e) => setProjectFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Projects</option>
            <option value="proj-1">E-Commerce Platform</option>
            <option value="proj-2">Mobile Banking App</option>
            <option value="proj-3">AI Chatbot System</option>
          </select>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
            >
              <FiGrid size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
            >
              <FiList size={16} />
            </button>
          </div>
          <button
            onClick={() => setShowUploadModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <FiUpload size={16} />
            Upload
          </button>
        </div>
      </div>

      {/* Files Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedFiles.map((file) => (
            <div key={file.id} className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="text-gray-400">{getFileIcon(file)}</div>
                <div className="flex items-center gap-1">
                  {file.isLocked && <FiLock size={14} className="text-red-500" />}
                  {file.isPublic && <FiUnlock size={14} className="text-green-500" />}
                  <button className="text-gray-400 hover:text-gray-600">
                    <FiMoreVertical size={14} />
                  </button>
                </div>
              </div>
              <h3 className="font-medium text-gray-900 mb-1 truncate">{file.name}</h3>
              <p className="text-sm text-gray-500 mb-2">{file.projectName}</p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{formatFileSize(file.size)}</span>
                <span>{file.version}</span>
              </div>
              {file.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {file.tags.slice(0, 2).map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                  {file.tags.length > 2 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                      +{file.tags.length - 2}
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Project
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Size
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Modified
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Version
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedFiles.map((file) => (
                  <tr key={file.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-gray-400 mr-3">{getFileIcon(file)}</div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{file.name}</div>
                          <div className="text-sm text-gray-500">{file.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {file.projectName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatFileSize(file.size)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(file.updatedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      v{file.version}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <FiEye size={16} />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          <FiDownload size={16} />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          <FiEdit size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );

  const renderStorage = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Storage Management</h2>
      
      {/* Storage Overview */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Storage Overview</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Total Storage</span>
            <span className="text-sm font-bold text-gray-900">{formatFileSize(storageMetrics.totalSpace)}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-blue-600 h-3 rounded-full" 
              style={{ width: `${(storageMetrics.usedSpace / storageMetrics.totalSpace) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>Used: {formatFileSize(storageMetrics.usedSpace)}</span>
            <span>Available: {formatFileSize(storageMetrics.availableSpace)}</span>
          </div>
        </div>
      </div>

      {/* Storage Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Cleanup Tools</h3>
          <div className="space-y-3">
            <button className="w-full px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 flex items-center gap-2">
              <FiTrash2 size={16} />
              Remove Duplicates
            </button>
            <button className="w-full px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 flex items-center gap-2">
              <FiArchive size={16} />
              Archive Old Files
            </button>
            <button className="w-full px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 flex items-center gap-2">
              <FiZap size={16} />
              Optimize Storage
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Backup & Sync</h3>
          <div className="space-y-3">
            <button className="w-full px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 flex items-center gap-2">
              <FiCloud size={16} />
              Backup to Cloud
            </button>
            <button className="w-full px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 flex items-center gap-2">
              <FiRefreshCw size={16} />
              Sync Files
            </button>
            <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center gap-2">
              <FiShield size={16} />
              Verify Integrity
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Storage Settings</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Auto-compression</span>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6" />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">CDN Storage</span>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6" />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Version History</span>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderVersions = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Version History</h2>
      
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  File
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Version
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Author
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Changes
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Size
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {versionHistory.map((version) => (
                <tr key={version.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {files.find(f => f.id === version.fileId)?.name || 'Unknown File'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      v{version.version}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {version.authorName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(version.createdAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate">
                      {version.changeDescription}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatFileSize(version.size)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <FiEye size={16} />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <FiDownload size={16} />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <FiRotateCw size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Content Analytics</h2>
      
      {/* File Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Downloads"
          value={files.reduce((sum, f) => sum + f.downloadCount, 0).toLocaleString()}
          icon={<FiDownload size={24} />}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
          trend="up"
          trendValue="+15.2%"
        />
        <StatCard
          title="Total Views"
          value={files.reduce((sum, f) => sum + f.viewCount, 0).toLocaleString()}
          icon={<FiEye size={24} />}
          iconBg="bg-green-50"
          iconColor="text-green-600"
          trend="up"
          trendValue="+22.1%"
        />
        <StatCard
          title="Total Shares"
          value={files.reduce((sum, f) => sum + f.shareCount, 0).toLocaleString()}
          icon={<FiShare2 size={24} />}
          iconBg="bg-purple-50"
          iconColor="text-purple-600"
          trend="up"
          trendValue="+8.7%"
        />
        <StatCard
          title="Avg File Age"
          value="45 days"
          icon={<FiCalendar size={24} />}
          iconBg="bg-orange-50"
          iconColor="text-orange-600"
          trend="down"
          trendValue="-5.3%"
        />
      </div>

      {/* Popular Files */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Most Popular Files</h3>
        <div className="space-y-3">
          {files
            .sort((a, b) => (b.downloadCount + b.viewCount) - (a.downloadCount + a.viewCount))
            .slice(0, 5)
            .map((file) => (
              <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="text-gray-400">{getFileIcon(file)}</div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{file.name}</p>
                    <p className="text-xs text-gray-500">{file.projectName}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {file.downloadCount + file.viewCount} interactions
                  </p>
                  <p className="text-xs text-gray-500">
                    {file.downloadCount} downloads, {file.viewCount} views
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Advanced Content Management</h1>
          <p className="text-sm text-gray-500 mt-1">
            Comprehensive file management, storage optimization, and content analytics
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
            <FiRefreshCw size={16} />
            Refresh
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
            <FiDownload size={16} />
            Export Report
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'overview', label: 'Overview', icon: <FiBarChart2 size={16} /> },
            { id: 'files', label: 'Files', icon: <FiFileText size={16} /> },
            { id: 'storage', label: 'Storage', icon: <FiHardDrive size={16} /> },
            { id: 'versions', label: 'Versions', icon: <FiRotateCw size={16} /> },
            { id: 'analytics', label: 'Analytics', icon: <FiTrendingUp size={16} /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'files' && renderFiles()}
      {activeTab === 'storage' && renderStorage()}
      {activeTab === 'versions' && renderVersions()}
      {activeTab === 'analytics' && renderAnalytics()}
    </div>
  );
}
