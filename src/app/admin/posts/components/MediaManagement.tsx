'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { 
  FiImage, 
  FiVideo,
  FiFile,
  FiTrash2,
  FiEye,
  FiSearch,
  FiRefreshCw,
  FiDownload,
  FiUpload,
  FiAlertCircle,
  FiHardDrive,
  FiFolder,
  FiFlag,
  FiCalendar,
  FiUser
} from 'react-icons/fi';

interface Media {
  id: string;
  url: string;
  type: 'image' | 'video' | 'document';
  fileName: string;
  fileSize: number;
  uploadedBy: string;
  uploadedById: string;
  uploadedAt: string;
  usedInPosts: number;
  reported: boolean;
  thumbnail?: string;
}

const mockMedia: Media[] = [
  {
    id: 'media-1',
    url: 'https://example.com/image1.jpg',
    type: 'image',
    fileName: 'product-launch.jpg',
    fileSize: 2.5,
    uploadedBy: 'Sarah Johnson',
    uploadedById: 'user-1',
    uploadedAt: new Date(2025, 9, 7, 10, 30).toISOString(),
    usedInPosts: 5,
    reported: false,
    thumbnail: '🖼️',
  },
  {
    id: 'media-2',
    url: 'https://example.com/video1.mp4',
    type: 'video',
    fileName: 'team-celebration.mp4',
    fileSize: 15.8,
    uploadedBy: 'Mike Chen',
    uploadedById: 'user-2',
    uploadedAt: new Date(2025, 9, 7, 9, 15).toISOString(),
    usedInPosts: 2,
    reported: false,
    thumbnail: '🎥',
  },
  {
    id: 'media-3',
    url: 'https://example.com/doc1.pdf',
    type: 'document',
    fileName: 'report-2025.pdf',
    fileSize: 3.2,
    uploadedBy: 'Emma Davis',
    uploadedById: 'user-3',
    uploadedAt: new Date(2025, 9, 6, 14, 0).toISOString(),
    usedInPosts: 1,
    reported: false,
    thumbnail: '📄',
  },
  {
    id: 'media-4',
    url: 'https://example.com/spam-image.jpg',
    type: 'image',
    fileName: 'spam-ad.jpg',
    fileSize: 1.2,
    uploadedBy: 'Spam Bot',
    uploadedById: 'user-99',
    uploadedAt: new Date(2025, 9, 8, 8, 0).toISOString(),
    usedInPosts: 0,
    reported: true,
    thumbnail: '🖼️',
  },
];

export default function MediaManagement() {
  const [media, setMedia] = useState(mockMedia);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterReported, setFilterReported] = useState('all');

  const filteredMedia = media.filter(m => {
    const matchesSearch = m.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         m.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || m.type === filterType;
    const matchesReported = filterReported === 'all' || 
                           (filterReported === 'reported' && m.reported) ||
                           (filterReported === 'clean' && !m.reported);
    return matchesSearch && matchesType && matchesReported;
  });

  const handleDelete = (mediaId: string) => {
    if (confirm('Delete this media file? This action cannot be undone.')) {
      setMedia(media.filter(m => m.id !== mediaId));
      toast.success('Media file deleted successfully');
    }
  };

  const handleDeleteUnused = () => {
    const unusedCount = media.filter(m => m.usedInPosts === 0).length;
    if (confirm(`Delete ${unusedCount} unused media files? This will free up storage space.`)) {
      setMedia(media.filter(m => m.usedInPosts > 0));
      toast.success(`${unusedCount} unused files deleted`);
    }
  };

  const getTypeConfig = (type: string) => {
    switch (type) {
      case 'image': return { 
        bg: 'bg-blue-100', 
        text: 'text-blue-700', 
        border: 'border-blue-300',
        icon: FiImage 
      };
      case 'video': return { 
        bg: 'bg-purple-100', 
        text: 'text-purple-700', 
        border: 'border-purple-300',
        icon: FiVideo 
      };
      case 'document': return { 
        bg: 'bg-green-100', 
        text: 'text-green-700', 
        border: 'border-green-300',
        icon: FiFile 
      };
      default: return { 
        bg: 'bg-gray-100', 
        text: 'text-gray-700', 
        border: 'border-gray-300',
        icon: FiFolder 
      };
    }
  };

  const totalStorage = media.reduce((acc, m) => acc + m.fileSize, 0);
  const unusedMedia = media.filter(m => m.usedInPosts === 0);
  const unusedStorage = unusedMedia.reduce((acc, m) => acc + m.fileSize, 0);
  const storageLimit = 1000; // MB
  const storagePercentage = (totalStorage / storageLimit) * 100;

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Media Management</h1>
          <p className="text-sm text-gray-500 mt-1">
            Organize and manage uploaded images, videos, and documents
          </p>
        </div>
        <div className="flex items-center gap-3">
          {unusedMedia.length > 0 && (
            <button
              onClick={handleDeleteUnused}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 text-sm font-medium"
            >
              <FiTrash2 size={16} />
              Delete Unused ({unusedMedia.length})
            </button>
          )}
          <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm font-medium">
            <FiRefreshCw size={16} />
            Refresh
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm font-medium">
            <FiUpload size={16} />
            Upload
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-blue-50 rounded-lg">
              <FiFolder className="text-blue-600" size={20} />
            </div>
            <p className="text-sm text-gray-600 font-medium">Total Files</p>
          </div>
          <p className="text-3xl font-bold text-gray-900">{media.length}</p>
          <p className="text-xs text-gray-500 mt-1">All media types</p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-white rounded-lg">
              <FiHardDrive className="text-blue-600" size={20} />
            </div>
            <p className="text-sm text-blue-700 font-medium">Storage Used</p>
          </div>
          <p className="text-3xl font-bold text-blue-700">{totalStorage.toFixed(1)} MB</p>
          <div className="mt-2">
            <div className="w-full bg-blue-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all" 
                style={{ width: `${Math.min(storagePercentage, 100)}%` }}
              ></div>
            </div>
            <p className="text-xs text-blue-600 mt-1">{storagePercentage.toFixed(1)}% of {storageLimit} MB</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl border border-yellow-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-white rounded-lg">
              <FiAlertCircle className="text-yellow-600" size={20} />
            </div>
            <p className="text-sm text-yellow-700 font-medium">Unused Files</p>
          </div>
          <p className="text-3xl font-bold text-yellow-700">{unusedMedia.length}</p>
          <p className="text-xs text-yellow-600 mt-1">{unusedStorage.toFixed(1)} MB can be freed</p>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl border border-red-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-white rounded-lg">
              <FiFlag className="text-red-600" size={20} />
            </div>
            <p className="text-sm text-red-700 font-medium">Reported</p>
          </div>
          <p className="text-3xl font-bold text-red-700">{media.filter(m => m.reported).length}</p>
          <p className="text-xs text-red-600 mt-1">Needs review</p>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search files..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm"
            />
          </div>
          
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium"
          >
            <option value="all">All Types</option>
            <option value="image">Images</option>
            <option value="video">Videos</option>
            <option value="document">Documents</option>
          </select>

          <select
            value={filterReported}
            onChange={(e) => setFilterReported(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium"
          >
            <option value="all">All Files</option>
            <option value="clean">Clean</option>
            <option value="reported">Reported</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing <span className="font-semibold text-gray-900">{filteredMedia.length}</span> of <span className="font-semibold text-gray-900">{media.length}</span> files
        </p>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredMedia.length === 0 ? (
          <div className="col-span-full bg-white rounded-xl border border-gray-200 p-12 text-center">
            <FiFolder className="mx-auto text-gray-300 mb-3" size={48} />
            <p className="text-gray-500 font-medium">No media files found</p>
            <p className="text-sm text-gray-400 mt-1">Try adjusting your filters</p>
          </div>
        ) : (
          filteredMedia.map(m => {
            const typeConfig = getTypeConfig(m.type);
            const TypeIcon = typeConfig.icon;
            
            return (
              <div key={m.id} className={`bg-white rounded-xl border-2 shadow-sm hover:shadow-md transition-all ${
                m.reported ? 'border-red-300 bg-red-50/30' : 'border-gray-200'
              }`}>
                {/* Thumbnail Area */}
                <div className={`relative h-48 rounded-t-xl overflow-hidden ${
                  m.reported ? 'bg-red-100' : 'bg-gradient-to-br from-gray-100 to-gray-200'
                } flex items-center justify-center`}>
                  <span className="text-7xl">{m.thumbnail}</span>
                  {m.reported && (
                    <div className="absolute top-3 right-3 px-2.5 py-1 bg-red-600 text-white rounded-full text-xs font-bold flex items-center gap-1">
                      <FiFlag size={10} />
                      REPORTED
                    </div>
                  )}
                  <div className={`absolute top-3 left-3 px-2.5 py-1.5 rounded-lg font-semibold text-xs border flex items-center gap-1.5 ${typeConfig.bg} ${typeConfig.text} ${typeConfig.border}`}>
                    <TypeIcon size={12} />
                    <span>{m.type.toUpperCase()}</span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-4">
                  <h4 className="font-semibold text-gray-900 mb-2 truncate" title={m.fileName}>
                    {m.fileName}
                  </h4>
                  
                  <div className="flex items-center gap-2 mb-3 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <FiUser size={11} />
                      <span className="truncate">{m.uploadedBy}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <FiCalendar size={11} />
                      <span>{formatTimeAgo(m.uploadedAt)}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1">File Size</p>
                      <p className="font-bold text-gray-900">{m.fileSize.toFixed(1)} MB</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1">Used In</p>
                      <p className="font-bold text-gray-900">{m.usedInPosts} posts</p>
                    </div>
                  </div>

                  {m.usedInPosts === 0 && (
                    <div className="mb-3 p-2 bg-yellow-50 border border-yellow-200 rounded-lg text-xs text-yellow-700 flex items-center gap-2">
                      <FiAlertCircle size={14} />
                      <span>Unused file</span>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button className="flex-1 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center gap-2 text-sm font-medium border border-blue-200">
                      <FiEye size={14} />
                      Preview
                    </button>
                    <button
                      onClick={() => handleDelete(m.id)}
                      className="px-3 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors border border-red-200"
                    >
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Storage Insights */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center gap-2 mb-6">
          <div className="p-2 bg-purple-50 rounded-lg">
            <FiHardDrive className="text-purple-600" size={18} />
          </div>
          <h3 className="text-base font-semibold text-gray-900">Storage Insights</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-gray-600 font-medium mb-4">Storage by Type</p>
            <div className="space-y-3">
              {[
                { type: 'image', label: 'Images', icon: FiImage, color: 'text-blue-600' },
                { type: 'video', label: 'Videos', icon: FiVideo, color: 'text-purple-600' },
                { type: 'document', label: 'Documents', icon: FiFile, color: 'text-green-600' }
              ].map(({ type, label, icon: Icon, color }) => {
                const typeStorage = media.filter(m => m.type === type).reduce((acc, m) => acc + m.fileSize, 0);
                const percentage = totalStorage > 0 ? (typeStorage / totalStorage) * 100 : 0;
                
                return (
                  <div key={type} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Icon className={color} size={16} />
                      <span className="text-sm font-medium text-gray-700">{label}</span>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">{typeStorage.toFixed(1)} MB</p>
                      <p className="text-xs text-gray-500">{percentage.toFixed(1)}%</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-600 font-medium mb-4">Total Storage</p>
            <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
              <p className="text-4xl font-bold text-blue-700 mb-2">{totalStorage.toFixed(1)} MB</p>
              <p className="text-sm text-blue-600">of {storageLimit} MB used</p>
              <div className="mt-4 w-full bg-blue-200 rounded-full h-3">
                <div 
                  className="bg-blue-600 h-3 rounded-full transition-all" 
                  style={{ width: `${Math.min(storagePercentage, 100)}%` }}
                ></div>
              </div>
              <p className="text-xs text-blue-600 mt-2">{(storageLimit - totalStorage).toFixed(1)} MB available</p>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-600 font-medium mb-4">Optimization</p>
            <div className="p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl border border-yellow-200">
              <div className="flex items-center gap-2 mb-3">
                <FiAlertCircle className="text-yellow-600" size={20} />
                <p className="font-semibold text-yellow-900">Cleanup Available</p>
              </div>
              <p className="text-sm text-yellow-700 mb-2">
                {unusedMedia.length} unused {unusedMedia.length === 1 ? 'file' : 'files'} detected
              </p>
              <p className="text-2xl font-bold text-yellow-700 mb-2">{unusedStorage.toFixed(1)} MB</p>
              <p className="text-xs text-yellow-600">can be freed by cleanup</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
