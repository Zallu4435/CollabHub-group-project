'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { 
  FiImage,
  FiVideo,
  FiFile,
  FiFolder,
  FiUpload,
  FiRefreshCw,
  FiSearch,
  FiGrid,
  FiList,
  FiTrash2,
  FiDownload,
  FiEye,
  FiHardDrive,
  FiCalendar,
  FiUser,
  FiLayers,
  FiX
} from 'react-icons/fi';

interface MediaFile {
  id: string;
  name: string;
  type: 'image' | 'video' | 'document';
  url: string;
  size: number;
  uploadedBy: string;
  uploadedAt: string;
  usedIn: string[];
  cdnUrl?: string;
  thumbnail?: string;
}

const mockMediaFiles: MediaFile[] = [
  {
    id: 'media-1',
    name: 'product-banner.jpg',
    type: 'image',
    url: 'https://picsum.photos/seed/banner1/800/400',
    size: 2097152,
    uploadedBy: 'Admin',
    uploadedAt: new Date(2025, 9, 1).toISOString(),
    usedIn: ['proj-1', 'proj-2'],
    cdnUrl: 'https://cdn.example.com/banner1.jpg',
    thumbnail: 'https://picsum.photos/seed/banner1/200/100',
  },
  {
    id: 'media-2',
    name: 'demo-video.mp4',
    type: 'video',
    url: 'https://example.com/videos/demo.mp4',
    size: 15728640,
    uploadedBy: 'TechCraft Studios',
    uploadedAt: new Date(2025, 9, 2).toISOString(),
    usedIn: ['proj-3'],
    thumbnail: 'https://picsum.photos/seed/video1/200/100',
  },
  {
    id: 'media-3',
    name: 'product-screenshot-1.png',
    type: 'image',
    url: 'https://picsum.photos/seed/screen1/800/600',
    size: 1048576,
    uploadedBy: 'DesignHub',
    uploadedAt: new Date(2025, 9, 3).toISOString(),
    usedIn: ['proj-1'],
    thumbnail: 'https://picsum.photos/seed/screen1/200/150',
  },
  {
    id: 'media-4',
    name: 'documentation.pdf',
    type: 'document',
    url: 'https://example.com/docs/documentation.pdf',
    size: 524288,
    uploadedBy: 'Admin',
    uploadedAt: new Date(2025, 9, 4).toISOString(),
    usedIn: [],
  },
];

export default function MediaLibraryManagement() {
  const [mediaFiles, setMediaFiles] = useState(mockMediaFiles);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterType, setFilterType] = useState<'all' | 'image' | 'video' | 'document'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMedia = mediaFiles.filter(file => {
    const matchesType = filterType === 'all' || file.type === filterType;
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handleDelete = (fileId: string) => {
    if (confirm('Delete this file? This action cannot be undone.')) {
      setMediaFiles(mediaFiles.filter(f => f.id !== fileId));
      toast.success('File deleted');
    }
  };

  const handleBulkDelete = () => {
    if (confirm(`Delete ${selectedFiles.length} files?`)) {
      setMediaFiles(mediaFiles.filter(f => !selectedFiles.includes(f.id)));
      setSelectedFiles([]);
      toast.success(`${selectedFiles.length} files deleted`);
    }
  };

  const handleCDNSync = () => {
    toast.success('CDN sync started');
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1048576) return (bytes / 1024).toFixed(2) + ' KB';
    if (bytes < 1073741824) return (bytes / 1048576).toFixed(2) + ' MB';
    return (bytes / 1073741824).toFixed(2) + ' GB';
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image': return <FiImage className="text-blue-600" size={32} />;
      case 'video': return <FiVideo className="text-purple-600" size={32} />;
      case 'document': return <FiFile className="text-emerald-600" size={32} />;
      default: return <FiFolder className="text-gray-600" size={32} />;
    }
  };

  const totalStorage = mediaFiles.reduce((acc, f) => acc + f.size, 0);
  const storageLimit = 10737418240; // 10GB
  const storagePercentage = (totalStorage / storageLimit) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Media Library Management</h1>
          <p className="text-sm text-gray-500 mt-1">
            Upload, organize, and manage product media files
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleCDNSync}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm font-medium transition-all flex items-center gap-2"
          >
            <FiRefreshCw size={16} />
            Sync CDN
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-all flex items-center gap-2">
            <FiUpload size={16} />
            Upload Files
          </button>
        </div>
      </div>

      {/* Storage Stats */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FiHardDrive className="text-blue-600" size={18} />
          Storage Overview
        </h3>
        <div className="space-y-6">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600 font-medium">Total Storage Used</span>
              <span className="font-bold text-gray-900">
                {formatFileSize(totalStorage)} / {formatFileSize(storageLimit)}
              </span>
            </div>
            <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all"
                style={{ width: `${storagePercentage}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">{storagePercentage.toFixed(1)}% used</p>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gradient-to-br from-gray-50 to-slate-50 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <FiFolder className="text-gray-600" size={20} />
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900">{mediaFiles.length}</p>
              <p className="text-sm text-gray-600 mt-1">Total Files</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FiImage className="text-blue-600" size={20} />
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900">{mediaFiles.filter(f => f.type === 'image').length}</p>
              <p className="text-sm text-gray-600 mt-1">Images</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <FiVideo className="text-purple-600" size={20} />
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900">{mediaFiles.filter(f => f.type === 'video').length}</p>
              <p className="text-sm text-gray-600 mt-1">Videos</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <FiFile className="text-emerald-600" size={20} />
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900">{mediaFiles.filter(f => f.type === 'document').length}</p>
              <p className="text-sm text-gray-600 mt-1">Documents</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters & View Mode */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex gap-3 flex-1">
            <div className="relative flex-1">
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
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium"
            >
              <option value="all">All Types</option>
              <option value="image">Images</option>
              <option value="video">Videos</option>
              <option value="document">Documents</option>
            </select>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-all ${
                viewMode === 'grid'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <FiGrid size={18} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-all ${
                viewMode === 'list'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <FiList size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedFiles.length > 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-blue-900">{selectedFiles.length} selected</span>
            <button
              onClick={handleBulkDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-medium transition-all flex items-center gap-2"
            >
              <FiTrash2 size={14} />
              Delete Selected
            </button>
            <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm font-medium transition-all flex items-center gap-2">
              <FiDownload size={14} />
              Download Selected
            </button>
            <button
              onClick={() => setSelectedFiles([])}
              className="ml-auto px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium transition-all"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredMedia.map(file => (
            <div key={file.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative h-40 bg-gray-50">
                {file.type === 'image' ? (
                  <img src={file.thumbnail || file.url} alt={file.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    {getFileIcon(file.type)}
                  </div>
                )}
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
                  className="absolute top-2 left-2 w-4 h-4 rounded border-gray-300"
                />
              </div>
              
              <div className="p-4">
                <p className="font-semibold text-gray-900 truncate mb-1">{file.name}</p>
                <p className="text-xs text-gray-600 mb-2">
                  {formatFileSize(file.size)} • {file.type}
                </p>
                <p className="text-xs text-gray-500 mb-3 flex items-center gap-1">
                  <FiLayers size={10} />
                  Used in {file.usedIn.length} project(s)
                </p>
                
                <div className="flex gap-2">
                  <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-xs font-medium transition-all flex items-center justify-center gap-1">
                    <FiEye size={12} />
                    View
                  </button>
                  <button
                    onClick={() => handleDelete(file.id)}
                    className="px-3 py-2 bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-100 text-xs font-medium transition-all"
                  >
                    <FiTrash2 size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left">
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedFiles(filteredMedia.map(f => f.id));
                        } else {
                          setSelectedFiles([]);
                        }
                      }}
                      className="rounded border-gray-300"
                    />
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Type</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Size</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Uploaded By</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Used In</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredMedia.map(file => (
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
                    <td className="px-4 py-3 font-semibold text-gray-900">{file.name}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1 text-sm capitalize text-gray-900">
                        {file.type === 'image' && <FiImage size={12} className="text-blue-600" />}
                        {file.type === 'video' && <FiVideo size={12} className="text-purple-600" />}
                        {file.type === 'document' && <FiFile size={12} className="text-emerald-600" />}
                        {file.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">{formatFileSize(file.size)}</td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-gray-900 flex items-center gap-1">
                        <FiUser size={12} />
                        {file.uploadedBy}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-gray-600 flex items-center gap-1">
                        <FiCalendar size={12} />
                        {new Date(file.uploadedAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-gray-900 flex items-center gap-1">
                        <FiLayers size={12} />
                        {file.usedIn.length} project(s)
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleDelete(file.id)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium transition-colors flex items-center gap-1"
                      >
                        <FiTrash2 size={12} />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredMedia.length === 0 && (
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
