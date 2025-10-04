'use client';

import { useState } from 'react';
import { mockDb } from '../lib/mockDb';
import toast from 'react-hot-toast';
import { 
  FiUpload,
  FiSearch,
  FiGrid,
  FiList,
  FiImage,
  FiVideo,
  FiFile,
  FiEye,
  FiTrash2,
  FiDownload,
  FiX,
  FiCalendar,
  FiUser,
  FiExternalLink,
  FiCopy
} from 'react-icons/fi';

export default function MediaLibrary() {
  const [media, setMedia] = useState(mockDb.getMedia());
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedMedia, setSelectedMedia] = useState<any>(null);

  const filteredMedia = media.filter(m => {
    const matchesSearch = m.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || m.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const handleUpload = () => {
    toast.success('File uploaded successfully!');
    const newMedia = {
      id: `media-${Date.now()}`,
      type: 'image' as const,
      url: `https://picsum.photos/seed/${Date.now()}/800/600`,
      title: `New Upload ${Date.now()}`,
      sizeKB: Math.floor(Math.random() * 1000),
      dimensions: { width: 800, height: 600 },
      usedIn: [],
      uploadedAt: new Date().toISOString(),
      uploadedBy: 'Current User',
    };
    setMedia([newMedia, ...media]);
  };

  const handleDelete = (mediaId: string) => {
    if (confirm('Are you sure you want to delete this media?')) {
      setMedia(media.filter(m => m.id !== mediaId));
      toast.success('Media deleted successfully');
    }
  };

  // Calculate stats
  const totalSize = media.reduce((acc, m) => acc + m.sizeKB, 0);
  const imageCount = media.filter(m => m.type === 'image').length;
  const videoCount = media.filter(m => m.type === 'video').length;
  const fileCount = media.filter(m => m.type === 'file').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Media Library</h1>
          <p className="text-sm text-gray-700 mt-1">
            Manage and organize your images, videos, and files
          </p>
        </div>
        <button
          onClick={handleUpload}
          className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all text-sm font-medium flex items-center gap-2"
        >
          <FiUpload size={16} />
          Upload Media
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Total Files"
          value={media.length}
          icon={<FiFile size={20} />}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
          subtitle={`${(totalSize / 1024).toFixed(1)} MB total`}
        />
        <StatCard
          title="Images"
          value={imageCount}
          icon={<FiImage size={20} />}
          iconBg="bg-purple-50"
          iconColor="text-purple-600"
          subtitle="Photo files"
        />
        <StatCard
          title="Videos"
          value={videoCount}
          icon={<FiVideo size={20} />}
          iconBg="bg-orange-50"
          iconColor="text-orange-600"
          subtitle="Video files"
        />
        <StatCard
          title="Documents"
          value={fileCount}
          icon={<FiFile size={20} />}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
          subtitle="Other files"
        />
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search media by title..."
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
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400 outline-none text-sm font-medium"
          >
            <option value="all">All Types</option>
            <option value="image">Images</option>
            <option value="video">Videos</option>
            <option value="file">Files</option>
          </select>
          <div className="flex gap-2 border border-gray-200 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
                viewMode === 'grid' 
                  ? 'bg-emerald-600 text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <FiGrid size={16} />
              Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
                viewMode === 'list' 
                  ? 'bg-emerald-600 text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <FiList size={16} />
              List
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
          <span className="text-sm text-gray-600">
            Showing <span className="font-semibold text-gray-900">{filteredMedia.length}</span> of {media.length} files
          </span>
          <span className="text-sm text-gray-500">
            Total size: {(totalSize / 1024).toFixed(2)} MB
          </span>
        </div>
      </div>

      {/* Media Grid/List */}
      {filteredMedia.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiImage size={24} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No media found</h3>
          <p className="text-sm text-gray-500 mb-4">
            {searchTerm || typeFilter !== 'all' 
              ? 'Try adjusting your search or filter' 
              : 'Upload your first media file to get started'}
          </p>
          {(searchTerm || typeFilter !== 'all') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setTypeFilter('all');
              }}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm font-medium"
            >
              Clear Filters
            </button>
          )}
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredMedia.map(item => (
            <div 
              key={item.id} 
              className="bg-white rounded-xl border border-gray-200 overflow-hidden group hover:shadow-lg hover:border-emerald-200 transition-all cursor-pointer"
              onClick={() => setSelectedMedia(item)}
            >
              {/* Media Preview */}
              <div className="relative aspect-video bg-gray-100 overflow-hidden">
                {item.type === 'image' ? (
                  <img 
                    src={item.url} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                    {item.type === 'video' ? (
                      <FiVideo className="text-gray-400" size={48} />
                    ) : (
                      <FiFile className="text-gray-400" size={48} />
                    )}
                  </div>
                )}
                <div className="absolute top-2 right-2 px-2 py-1 bg-black/60 backdrop-blur-sm text-white text-xs rounded-md">
                  {item.type.toUpperCase()}
                </div>
              </div>

              {/* Media Info */}
              <div className="p-4">
                <p className="font-medium text-gray-900 truncate mb-1">{item.title}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{(item.sizeKB / 1024).toFixed(1)} MB</span>
                  {item.dimensions && (
                    <span>{item.dimensions.width} × {item.dimensions.height}</span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                  <FiExternalLink size={12} />
                  Used in {item.usedIn.length} posts
                </p>
              </div>

              {/* Actions */}
              <div className="px-4 pb-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  className="flex-1 px-3 py-2 text-sm bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg hover:bg-emerald-100 font-medium transition-all flex items-center justify-center gap-1.5"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedMedia(item);
                  }}
                >
                  <FiEye size={14} />
                  View
                </button>
                <button 
                  className="px-3 py-2 text-sm bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-100 font-medium transition-all"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(item.id);
                  }}
                >
                  <FiTrash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Preview
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Size
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Dimensions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Used In
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredMedia.map(item => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      {item.type === 'image' ? (
                        <img 
                          src={item.url} 
                          alt={item.title} 
                          className="w-14 h-14 object-cover rounded-lg ring-2 ring-gray-100" 
                        />
                      ) : (
                        <div className="w-14 h-14 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                          {item.type === 'video' ? (
                            <FiVideo className="text-gray-400" size={24} />
                          ) : (
                            <FiFile className="text-gray-400" size={24} />
                          )}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900 text-sm">{item.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">ID: {item.id}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold ${
                        item.type === 'image' ? 'bg-purple-50 text-purple-700 border border-purple-200' :
                        item.type === 'video' ? 'bg-orange-50 text-orange-700 border border-orange-200' :
                        'bg-blue-50 text-blue-700 border border-blue-200'
                      }`}>
                        {item.type === 'image' ? <FiImage size={12} /> :
                         item.type === 'video' ? <FiVideo size={12} /> :
                         <FiFile size={12} />}
                        {item.type.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {(item.sizeKB / 1024).toFixed(2)} MB
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {item.dimensions ? `${item.dimensions.width} × ${item.dimensions.height}` : 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {item.usedIn.length} posts
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button 
                          className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                          onClick={() => setSelectedMedia(item)}
                          title="View Details"
                        >
                          <FiEye size={16} />
                        </button>
                        <button 
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Download"
                        >
                          <FiDownload size={16} />
                        </button>
                        <button 
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          onClick={() => handleDelete(item.id)}
                          title="Delete"
                        >
                          <FiTrash2 size={16} />
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

      {/* Media Details Modal */}
      {selectedMedia && (
        <MediaDetailsModal 
          media={selectedMedia} 
          onClose={() => setSelectedMedia(null)}
          onDelete={() => {
            handleDelete(selectedMedia.id);
            setSelectedMedia(null);
          }}
        />
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
        <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
      </div>
    </div>
  );
}

function MediaDetailsModal({ 
  media, 
  onClose,
  onDelete
}: { 
  media: any; 
  onClose: () => void;
  onDelete: () => void;
}) {
  const copyUrl = () => {
    navigator.clipboard.writeText(media.url);
    toast.success('URL copied to clipboard!');
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-xl border border-gray-200 max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-slideUp">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Media Details</h2>
          <button 
            onClick={onClose} 
            className="p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-lg transition-all"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Preview */}
            <div className="space-y-4">
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                {media.type === 'image' ? (
                  <img 
                    src={media.url} 
                    alt={media.title} 
                    className="w-full h-full object-contain" 
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                    {media.type === 'video' ? (
                      <FiVideo className="text-gray-400" size={64} />
                    ) : (
                      <FiFile className="text-gray-400" size={64} />
                    )}
                  </div>
                )}
              </div>

              {/* URL Copy */}
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500 mb-1">File URL</p>
                    <p className="text-sm text-gray-700 truncate font-mono">{media.url}</p>
                  </div>
                  <button
                    onClick={copyUrl}
                    className="px-3 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium transition-all flex items-center gap-2"
                  >
                    <FiCopy size={14} />
                    Copy
                  </button>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3">File Information</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Title</p>
                    <p className="text-sm font-medium text-gray-900">{media.title}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Type</p>
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold ${
                        media.type === 'image' ? 'bg-purple-100 text-purple-700' :
                        media.type === 'video' ? 'bg-orange-100 text-orange-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {media.type.toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Size</p>
                      <p className="text-sm font-medium text-gray-900">
                        {(media.sizeKB / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  {media.dimensions && (
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Dimensions</p>
                      <p className="text-sm font-medium text-gray-900">
                        {media.dimensions.width} × {media.dimensions.height}px
                      </p>
                    </div>
                  )}
                  <div>
                    <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                      <FiCalendar size={12} />
                      Uploaded
                    </p>
                    <p className="text-sm font-medium text-gray-900">
                      {new Date(media.uploadedAt).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                      <FiUser size={12} />
                      Uploaded By
                    </p>
                    <p className="text-sm font-medium text-gray-900">{media.uploadedBy}</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2 text-sm">Usage</h3>
                <p className="text-sm text-blue-700">
                  This media is currently used in <span className="font-bold">{media.usedIn.length}</span> posts
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button className="flex-1 px-4 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm font-medium transition-all flex items-center justify-center gap-2">
                  <FiDownload size={16} />
                  Download
                </button>
                <button 
                  onClick={onDelete}
                  className="px-4 py-2.5 bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-100 text-sm font-medium transition-all flex items-center gap-2"
                >
                  <FiTrash2 size={16} />
                  Delete
                </button>
              </div>
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
