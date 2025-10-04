'use client';

import { useState } from 'react';
import { FileEntry } from '../types/project-admin';
import toast from 'react-hot-toast';
import { 
  FiFile,
  FiFolder,
  FiTrash2,
  FiDownload,
  FiSearch,
  FiFilter,
  FiUser,
  FiCalendar,
  FiHardDrive,
  FiShare2,
  FiLock,
  FiImage,
  FiFileText,
  FiDatabase,
  FiPackage,
  FiVideo,
  FiX
} from 'react-icons/fi';

// Mock files
const mockFiles: FileEntry[] = [
  {
    id: 'file-1',
    name: 'design-mockups.fig',
    type: 'figma',
    size: 15728640, // 15MB
    projectId: 'proj-1',
    projectName: 'E-Commerce Platform',
    uploadedBy: 'user-2',
    uploadedByName: 'Jane Smith',
    uploadedAt: new Date(2025, 9, 1).toISOString(),
    path: '/projects/ecommerce/designs/',
    isPublic: false,
    downloads: 12,
  },
  {
    id: 'file-2',
    name: 'api-documentation.pdf',
    type: 'pdf',
    size: 2097152, // 2MB
    projectId: 'proj-1',
    projectName: 'E-Commerce Platform',
    uploadedBy: 'user-1',
    uploadedByName: 'John Doe',
    uploadedAt: new Date(2025, 9, 2).toISOString(),
    path: '/projects/ecommerce/docs/',
    isPublic: true,
    shareLink: 'https://share.example.com/abc123',
    downloads: 45,
  },
  {
    id: 'file-3',
    name: 'database-schema.sql',
    type: 'sql',
    size: 524288, // 512KB
    projectId: 'proj-2',
    projectName: 'Mobile Banking App',
    uploadedBy: 'user-2',
    uploadedByName: 'Jane Smith',
    uploadedAt: new Date(2025, 9, 3).toISOString(),
    path: '/projects/banking/database/',
    isPublic: false,
    downloads: 8,
  },
  {
    id: 'file-4',
    name: 'presentation-slides.pptx',
    type: 'pptx',
    size: 10485760, // 10MB
    projectId: 'proj-3',
    projectName: 'AI Chatbot Integration',
    uploadedBy: 'user-3',
    uploadedByName: 'Mike Johnson',
    uploadedAt: new Date(2025, 9, 4).toISOString(),
    path: '/projects/ai-chatbot/presentations/',
    isPublic: true,
    shareLink: 'https://share.example.com/xyz789',
    downloads: 23,
  },
];

export default function FileSystemAdmin() {
  const [files, setFiles] = useState(mockFiles);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [projectFilter, setProjectFilter] = useState('all');
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'name' | 'size' | 'date'>('date');

  const fileTypes = Array.from(new Set(files.map(f => f.type)));
  const projects = Array.from(new Set(files.map(f => ({ id: f.projectId, name: f.projectName }))));

  const filteredFiles = files.filter(f => {
    const matchesSearch = f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         f.uploadedByName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || f.type === typeFilter;
    const matchesProject = projectFilter === 'all' || f.projectId === projectFilter;
    return matchesSearch && matchesType && matchesProject;
  }).sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'size') return b.size - a.size;
    return new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime();
  });

  const totalStorage = files.reduce((acc, f) => acc + f.size, 0);
  const storageLimit = 2147483648; // 2GB
  const storagePercentage = (totalStorage / storageLimit) * 100;

  const handleDelete = (fileId: string) => {
    if (confirm('Delete this file? This action cannot be undone.')) {
      setFiles(files.filter(f => f.id !== fileId));
      toast.success('File deleted');
    }
  };

  const handleBulkDelete = () => {
    if (confirm(`Delete ${selectedFiles.length} files?`)) {
      setFiles(files.filter(f => !selectedFiles.includes(f.id)));
      toast.success(`${selectedFiles.length} files deleted`);
      setSelectedFiles([]);
    }
  };

  const handleRevokeShare = (fileId: string) => {
    setFiles(files.map(f => 
      f.id === fileId ? { ...f, isPublic: false, shareLink: undefined } : f
    ));
    toast.success('Share link revoked');
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(2) + ' KB';
    if (bytes < 1073741824) return (bytes / 1048576).toFixed(2) + ' MB';
    return (bytes / 1073741824).toFixed(2) + ' GB';
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
      case 'docx': return <FiFileText className="text-red-600" size={20} />;
      case 'figma': return <FiImage className="text-purple-600" size={20} />;
      case 'sql': return <FiDatabase className="text-blue-600" size={20} />;
      case 'pptx':
      case 'xlsx': return <FiFileText className="text-orange-600" size={20} />;
      case 'zip': return <FiPackage className="text-amber-600" size={20} />;
      case 'png':
      case 'jpg':
      case 'jpeg': return <FiImage className="text-emerald-600" size={20} />;
      case 'mp4': return <FiVideo className="text-pink-600" size={20} />;
      default: return <FiFile className="text-gray-600" size={20} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">File System Administration</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage files, storage, and sharing across all projects
          </p>
        </div>
      </div>

      {/* Storage Overview */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FiHardDrive className="text-blue-600" size={18} />
          Storage Overview
        </h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Total Storage Used</span>
              <span className="font-bold text-gray-900">
                {formatFileSize(totalStorage)} / {formatFileSize(storageLimit)}
              </span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  storagePercentage > 90 ? 'bg-gradient-to-r from-red-500 to-red-600' :
                  storagePercentage > 70 ? 'bg-gradient-to-r from-amber-500 to-amber-600' :
                  'bg-gradient-to-r from-blue-500 to-blue-600'
                }`}
                style={{ width: `${storagePercentage}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">{storagePercentage.toFixed(1)}% used</p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
              <p className="text-2xl font-bold text-gray-900">{files.length}</p>
              <p className="text-sm text-gray-600 mt-1">Total Files</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg">
              <p className="text-2xl font-bold text-gray-900">{files.filter(f => f.isPublic).length}</p>
              <p className="text-sm text-gray-600 mt-1">Public Files</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-lg">
              <p className="text-2xl font-bold text-gray-900">
                {files.reduce((acc, f) => acc + f.downloads, 0)}
              </p>
              <p className="text-sm text-gray-600 mt-1">Total Downloads</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search files..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm"
            />
          </div>
          
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium"
          >
            <option value="all">All Types</option>
            {fileTypes.map(type => (
              <option key={type} value={type}>{type.toUpperCase()}</option>
            ))}
          </select>

          <select
            value={projectFilter}
            onChange={(e) => setProjectFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium"
          >
            <option value="all">All Projects</option>
            {projects.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium"
          >
            <option value="date">Sort by Date</option>
            <option value="name">Sort by Name</option>
            <option value="size">Sort by Size</option>
          </select>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedFiles.length > 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-blue-900 flex items-center gap-2">
              <FiFile size={16} />
              {selectedFiles.length} selected
            </span>
            <button
              onClick={handleBulkDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-medium transition-all flex items-center gap-2"
            >
              <FiTrash2 size={14} />
              Delete Selected
            </button>
            <button
              onClick={() => setSelectedFiles([])}
              className="ml-auto px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium transition-all"
            >
              Clear Selection
            </button>
          </div>
        </div>
      )}

      {/* Files Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedFiles.length === filteredFiles.length && filteredFiles.length > 0}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedFiles(filteredFiles.map(f => f.id));
                      } else {
                        setSelectedFiles([]);
                      }
                    }}
                    className="rounded border-gray-300"
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">File</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Size</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Project</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Uploaded By</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Downloads</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredFiles.map(file => (
                <tr key={file.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedFiles.includes(file.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedFiles([...selectedFiles, file.id]);
                        } else {
                          setSelectedFiles(selectedFiles.filter(id => id !== file.id));
                        }
                      }}
                      className="rounded border-gray-300"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-50 rounded-lg">
                        {getFileIcon(file.type)}
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-gray-900 truncate">{file.name}</p>
                        <p className="text-xs text-gray-500 truncate">{file.path}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 font-medium">{formatFileSize(file.size)}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{file.projectName}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 flex items-center gap-1">
                    <FiUser size={12} />
                    {file.uploadedByName}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 flex items-center gap-1">
                    <FiCalendar size={12} />
                    {new Date(file.uploadedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 flex items-center gap-1">
                    <FiDownload size={12} />
                    {file.downloads}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      {file.isPublic && (
                        <button
                          onClick={() => handleRevokeShare(file.id)}
                          className="px-2 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-lg hover:bg-amber-100 text-xs font-medium transition-all flex items-center gap-1"
                        >
                          <FiShare2 size={10} />
                          Revoke
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(file.id)}
                        className="px-2 py-1 bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-100 text-xs font-medium transition-all flex items-center gap-1"
                      >
                        <FiTrash2 size={10} />
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

      {/* Empty State */}
      {filteredFiles.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiFolder size={24} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No files found</h3>
          <p className="text-sm text-gray-500">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}
