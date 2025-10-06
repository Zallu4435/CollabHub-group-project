"use client";

import React, { useState } from 'react';
import { FiFileText, FiUsers, FiEye, FiTrash2, FiCheck, FiX, FiFlag, FiSearch, FiHeart } from 'react-icons/fi';

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  group: string;
  likes: number;
  comments: number;
  views: number;
  status: 'published' | 'draft' | 'archived';
  createdAt: string;
  reported: boolean;
  featured: boolean;
}

const mockPosts: Post[] = [
  {
    id: '1',
    title: 'New React 18 Features You Should Know',
    content: 'React 18 introduces several exciting new features including concurrent rendering, automatic batching, and new hooks...',
    author: 'John Doe',
    group: 'JavaScript Developers',
    likes: 45,
    comments: 12,
    views: 1200,
    status: 'published',
    createdAt: '2024-09-28T10:30:00Z',
    reported: false,
    featured: true
  },
  {
    id: '2',
    title: 'Spam post - please remove',
    content: 'This is spam content that should be removed...',
    author: 'SpamUser',
    group: 'General',
    likes: 0,
    comments: 0,
    views: 5,
    status: 'published',
    createdAt: '2024-09-28T16:00:00Z',
    reported: true,
    featured: false
  },
  {
    id: '3',
    title: 'Draft: Advanced TypeScript Patterns',
    content: 'Working on a comprehensive guide to advanced TypeScript patterns...',
    author: 'Jane Smith',
    group: 'TypeScript Developers',
    likes: 0,
    comments: 0,
    views: 0,
    status: 'draft',
    createdAt: '2024-09-27T14:20:00Z',
    reported: false,
    featured: false
  }
];

export default function PostsManagement() {
  const [posts, setPosts] = useState(mockPosts);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterGroup, setFilterGroup] = useState('all');
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);

  const groups = ['All', 'JavaScript Developers', 'TypeScript Developers', 'General', 'Other'];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || post.status === filterStatus;
    const matchesGroup = filterGroup === 'all' || post.group === filterGroup;
    return matchesSearch && matchesStatus && matchesGroup;
  });

  const handleApprove = (postId: string) => {
    setPosts(posts.map(p =>
      p.id === postId ? { ...p, reported: false } : p
    ));
  };

  const handleFeature = (postId: string) => {
    setPosts(posts.map(p =>
      p.id === postId ? { ...p, featured: !p.featured } : p
    ));
  };

  const handleArchive = (postId: string) => {
    setPosts(posts.map(p =>
      p.id === postId ? { ...p, status: 'archived' as const } : p
    ));
  };

  const handleDelete = (postId: string) => {
    if (confirm('Delete this post permanently?')) {
      setPosts(posts.filter(p => p.id !== postId));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getGroupColor = (group: string) => {
    switch (group) {
      case 'JavaScript Developers': return 'bg-blue-100 text-blue-800';
      case 'TypeScript Developers': return 'bg-purple-100 text-purple-800';
      case 'General': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Posts Management</h1>
          <p className="text-gray-600">Manage and moderate community posts</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Create Post
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <FiFileText className="h-8 w-8 text-blue-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Total Posts</p>
              <p className="text-2xl font-bold text-gray-900">{posts.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <FiCheck className="h-8 w-8 text-green-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Published</p>
              <p className="text-2xl font-bold text-gray-900">{posts.filter(p => p.status === 'published').length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <FiFlag className="h-8 w-8 text-red-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Reported</p>
              <p className="text-2xl font-bold text-gray-900">{posts.filter(p => p.reported).length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <FiEye className="h-8 w-8 text-purple-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Total Views</p>
              <p className="text-2xl font-bold text-gray-900">{posts.reduce((sum, p) => sum + p.views, 0)}</p>
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
                placeholder="Search posts..."
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
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
            <select
              value={filterGroup}
              onChange={(e) => setFilterGroup(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {groups.map(group => (
                <option key={group} value={group}>{group}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Posts Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input type="checkbox" className="rounded border-gray-300" />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Post
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Author
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Group
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
              {filteredPosts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-gray-900">{post.title}</p>
                          {post.featured && (
                            <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                              Featured
                            </span>
                          )}
                          {post.reported && (
                            <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                              Reported
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 line-clamp-2">{post.content}</p>
                        <p className="text-xs text-gray-400">
                          Created {new Date(post.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{post.author}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getGroupColor(post.group)}`}>
                      {post.group}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div className="flex items-center gap-1">
                        <FiHeart className="h-3 w-3 text-red-500" />
                        {post.likes}
                      </div>
                      <div>{post.comments} comments</div>
                      <div>{post.views} views</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(post.status)}`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleFeature(post.id)}
                        className="text-yellow-600 hover:text-yellow-900"
                        title="Feature/Unfeature"
                      >
                        ⭐
                      </button>
                      {post.reported && (
                        <button
                          onClick={() => handleApprove(post.id)}
                          className="text-green-600 hover:text-green-900"
                          title="Approve"
                        >
                          <FiCheck />
                        </button>
                      )}
                      <button
                        onClick={() => handleArchive(post.id)}
                        className="text-gray-600 hover:text-gray-900"
                        title="Archive"
                      >
                        📁
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
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
