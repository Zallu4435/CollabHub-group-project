"use client";

import React, { useState } from 'react';
import { FiMessageCircle, FiUsers, FiEye, FiTrash2, FiCheck, FiX, FiFlag, FiSearch, FiFilter } from 'react-icons/fi';

interface Discussion {
  id: string;
  title: string;
  author: string;
  category: string;
  replies: number;
  views: number;
  status: 'active' | 'locked' | 'archived';
  createdAt: string;
  lastActivity: string;
  reported: boolean;
  pinned: boolean;
}

const mockDiscussions: Discussion[] = [
  {
    id: '1',
    title: 'Best practices for React state management in 2024',
    author: 'John Doe',
    category: 'Technology',
    replies: 45,
    views: 1200,
    status: 'active',
    createdAt: '2024-09-28T10:30:00Z',
    lastActivity: '2024-09-28T15:45:00Z',
    reported: false,
    pinned: true
  },
  {
    id: '2',
    title: 'Community guidelines and code of conduct',
    author: 'Admin User',
    category: 'Announcements',
    replies: 12,
    views: 800,
    status: 'active',
    createdAt: '2024-09-25T09:00:00Z',
    lastActivity: '2024-09-28T12:30:00Z',
    reported: false,
    pinned: true
  },
  {
    id: '3',
    title: 'Spam discussion - please remove',
    author: 'SpamUser',
    category: 'General',
    replies: 0,
    views: 5,
    status: 'active',
    createdAt: '2024-09-28T16:00:00Z',
    lastActivity: '2024-09-28T16:00:00Z',
    reported: true,
    pinned: false
  }
];

export default function DiscussionsManagement() {
  const [discussions, setDiscussions] = useState(mockDiscussions);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [selectedDiscussions, setSelectedDiscussions] = useState<string[]>([]);

  const categories = ['All', 'Technology', 'General', 'Announcements', 'Support', 'Other'];

  const filteredDiscussions = discussions.filter(discussion => {
    const matchesSearch = discussion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         discussion.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || discussion.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || discussion.category === filterCategory;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleApprove = (discussionId: string) => {
    setDiscussions(discussions.map(d =>
      d.id === discussionId ? { ...d, reported: false } : d
    ));
  };

  const handleLock = (discussionId: string) => {
    setDiscussions(discussions.map(d =>
      d.id === discussionId ? { ...d, status: 'locked' as const } : d
    ));
  };

  const handleArchive = (discussionId: string) => {
    setDiscussions(discussions.map(d =>
      d.id === discussionId ? { ...d, status: 'archived' as const } : d
    ));
  };

  const handleDelete = (discussionId: string) => {
    if (confirm('Delete this discussion permanently?')) {
      setDiscussions(discussions.filter(d => d.id !== discussionId));
    }
  };

  const handlePin = (discussionId: string) => {
    setDiscussions(discussions.map(d =>
      d.id === discussionId ? { ...d, pinned: !d.pinned } : d
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'locked': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Technology': return 'bg-blue-100 text-blue-800';
      case 'Announcements': return 'bg-purple-100 text-purple-800';
      case 'General': return 'bg-gray-100 text-gray-800';
      case 'Support': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Discussions Management</h1>
          <p className="text-gray-600">Manage discussion threads and forums</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Create Discussion
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <FiMessageCircle className="h-8 w-8 text-blue-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Total Discussions</p>
              <p className="text-2xl font-bold text-gray-900">{discussions.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <FiUsers className="h-8 w-8 text-green-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Active Discussions</p>
              <p className="text-2xl font-bold text-gray-900">{discussions.filter(d => d.status === 'active').length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <FiFlag className="h-8 w-8 text-red-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Reported</p>
              <p className="text-2xl font-bold text-gray-900">{discussions.filter(d => d.reported).length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <FiEye className="h-8 w-8 text-purple-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Total Views</p>
              <p className="text-2xl font-bold text-gray-900">{discussions.reduce((sum, d) => sum + d.views, 0)}</p>
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
                placeholder="Search discussions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="locked">Locked</option>
              <option value="archived">Archived</option>
            </select>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Discussions Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input type="checkbox" className="rounded border-gray-300" />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Discussion
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Author
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stats
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDiscussions.map((discussion) => (
                <tr key={discussion.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-gray-900">{discussion.title}</p>
                          {discussion.pinned && (
                            <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                              Pinned
                            </span>
                          )}
                          {discussion.reported && (
                            <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                              Reported
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500">
                          Created {new Date(discussion.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{discussion.author}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(discussion.category)}`}>
                      {discussion.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div>{discussion.replies} replies</div>
                      <div>{discussion.views} views</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(discussion.status)}`}>
                      {discussion.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handlePin(discussion.id)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Pin/Unpin"
                      >
                        📌
                      </button>
                      {discussion.reported && (
                        <button
                          onClick={() => handleApprove(discussion.id)}
                          className="text-green-600 hover:text-green-900"
                          title="Approve"
                        >
                          <FiCheck />
                        </button>
                      )}
                      <button
                        onClick={() => handleLock(discussion.id)}
                        className="text-yellow-600 hover:text-yellow-900"
                        title="Lock"
                      >
                        🔒
                      </button>
                      <button
                        onClick={() => handleArchive(discussion.id)}
                        className="text-gray-600 hover:text-gray-900"
                        title="Archive"
                      >
                        📁
                      </button>
                      <button
                        onClick={() => handleDelete(discussion.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete"
                      >
                        <FiTrash2 />
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
}
