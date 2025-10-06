"use client";

import React, { useState } from 'react';
import { FiImage, FiVideo, FiFile, FiTrash2, FiDownload, FiEye, FiSearch, FiFilter } from 'react-icons/fi';

interface MediaFile {
  id: string;
  name: string;
  type: 'image' | 'video' | 'document';
  size: string;
  uploadedBy: string;
  uploadedAt: string;
  views: number;
  downloads: number;
  status: 'active' | 'archived' | 'flagged';
  url: string;
  thumbnail?: string;
}

const mockMedia: MediaFile[] = [
  {
    id: '1',
    name: 'react-logo.png',
    type: 'image',
    size: '2.4 MB',
    uploadedBy: 'John Doe',
    uploadedAt: '2024-09-28T10:30:00Z',
    views: 1200,
    downloads: 45,
    status: 'active',
    url: '/media/react-logo.png',
    thumbnail: '/media/react-logo.png'
  },
  {
    id: '2',
    name: 'tutorial-video.mp4',
    type: 'video',
    size: '45.2 MB',
    uploadedBy: 'Jane Smith',
    uploadedAt: '2024-09-27T14:20:00Z',
    views: 800,
    downloads: 12,
    status: 'active',
    url: '/media/tutorial-video.mp4',
    thumbnail: '/media/video-thumb.jpg'
  },
  {
    id: '3',
    name: 'inappropriate-content.jpg',
    type: 'image',
    size: '1.8 MB',
    uploadedBy: 'SpamUser',
    uploadedAt: '2024-09-28T16:00:00Z',
    views: 5,
    downloads: 0,
    status: 'flagged',
    url: '/media/inappropriate-content.jpg',
    thumbnail: '/media/inappropriate-content.jpg'
  }
];

export default function MediaManagement() {
  const [media, setMedia] = useState(mockMedia);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedMedia, setSelectedMedia] = useState<string[]>([]);

  const types = ['All', 'Image', 'Video', 'Document'];
  const statuses = ['All', 'Active', 'Archived', 'Flagged'];

  const filteredMedia = media.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || file.type === filterType.toLowerCase();
    const matchesStatus = filterStatus === 'all' || file.status === filterStatus.toLowerCase();
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleApprove = (mediaId: string) => {
    setMedia(media.map(m =>
      m.id === mediaId ? { ...m, status: 'active' as const } : m
    ));
  };

  const handleArchive = (mediaId: string) => {
    setMedia(media.map(m =>
      m.id === mediaId ? { ...m, status: 'archived' as const } : m
    ));
  };

  const handleDelete = (mediaId: string) => {
    if (confirm('Delete this media file permanently?')) {
      setMedia(media.filter(m => m.id !== mediaId));
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'image': return <FiImage className="h-5 w-5 text-blue-600" />;
      case 'video': return <FiVideo className="h-5 w-5 text-purple-600" />;
      case 'document': return <FiFile className="h-5 w-5 text-green-600" />;
      default: return <FiFile className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      case 'flagged': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'image': return 'bg-blue-100 text-blue-800';
      case 'video': return 'bg-purple-100 text-purple-800';
      case 'document': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Media Management</h1>
          <p className="text-gray-600">Manage community media files and uploads</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Upload Media
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <FiImage className="h-8 w-8 text-blue-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Total Files</p>
              <p className="text-2xl font-bold text-gray-900">{media.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <FiEye className="h-8 w-8 text-green-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Total Views</p>
              <p className="text-2xl font-bold text-gray-900">{media.reduce((sum, m) => sum + m.views, 0)}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <FiDownload className="h-8 w-8 text-purple-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Total Downloads</p>
              <p className="text-2xl font-bold text-gray-900">{media.reduce((sum, m) => sum + m.downloads, 0)}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <FiFile className="h-8 w-8 text-red-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Flagged Files</p>
              <p className="text-2xl font-bold text-gray-900">{media.filter(m => m.status === 'flagged').length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search media files..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {types.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMedia.map((file) => (
          <div key={file.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
            {/* Media Preview */}
            <div className="aspect-video bg-gray-100 flex items-center justify-center">
              {file.type === 'image' ? (
                <img 
                  src={file.thumbnail || file.url} 
                  alt={file.name}
                  className="w-full h-full object-cover"
                />
              ) : file.type === 'video' ? (
                <div className="flex flex-col items-center justify-center text-gray-500">
                  <FiVideo className="h-12 w-12 mb-2" />
                  <span className="text-sm">Video File</span>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-gray-500">
                  <FiFile className="h-12 w-12 mb-2" />
                  <span className="text-sm">Document</span>
                </div>
              )}
            </div>

            {/* File Info */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getTypeIcon(file.type)}
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(file.type)}`}>
                    {file.type}
                  </span>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(file.status)}`}>
                  {file.status}
                </span>
              </div>

              <h3 className="font-medium text-gray-900 mb-1 truncate">{file.name}</h3>
              <p className="text-sm text-gray-500 mb-2">by {file.uploadedBy}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                <span>{file.size}</span>
                <span>{new Date(file.uploadedAt).toLocaleDateString()}</span>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-1">
                  <FiEye className="h-3 w-3" />
                  {file.views}
                </div>
                <div className="flex items-center gap-1">
                  <FiDownload className="h-3 w-3" />
                  {file.downloads}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                {file.status === 'flagged' && (
                  <button
                    onClick={() => handleApprove(file.id)}
                    className="flex-1 px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
                  >
                    Approve
                  </button>
                )}
                <button
                  onClick={() => handleArchive(file.id)}
                  className="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700 transition-colors"
                >
                  Archive
                </button>
                <button
                  onClick={() => handleDelete(file.id)}
                  className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
                >
                  <FiTrash2 className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
