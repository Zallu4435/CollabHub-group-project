"use client";

import React, { useState } from 'react';
import Link from 'next/link';

const ProjectsLandingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('your-projects');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const [createProjectData, setCreateProjectData] = useState({
    title: '',
    shortDescription: '',
    detailedDescription: '',
    tags: [] as string[],
    projectType: 'personal',
    coverImage: null as File | null,
    githubLink: '',
    websiteLink: ''
  });

  // Mock data for user projects
  const userProjects = [
    {
      id: 1,
      title: 'E-commerce AI Chatbot',
      description: 'AI-powered customer service chatbot for e-commerce platforms with natural language processing.',
      tags: ['AI', 'React', 'Node.js', 'Machine Learning'],
      status: 'In Progress',
      coverImage: '/projects/chatbot.jpg',
      updatedAt: '2 days ago',
      views: 1247
    },
    {
      id: 2,
      title: 'Task Management Dashboard',
      description: 'Modern project management tool with real-time collaboration and analytics.',
      tags: ['React', 'TypeScript', 'Dashboard', 'SaaS'],
      status: 'Completed',
      coverImage: '/projects/dashboard.jpg',
      updatedAt: '1 week ago',
      views: 856
    },
    {
      id: 3,
      title: 'Cryptocurrency Portfolio Tracker',
      description: 'Real-time crypto portfolio tracking with advanced analytics and alerts.',
      tags: ['Blockchain', 'Vue.js', 'Crypto', 'Finance'],
      status: 'In Progress',
      coverImage: '/projects/crypto.jpg',
      updatedAt: '3 days ago',
      views: 2341
    }
  ];

  // Mock data for community projects
  const communityProjects = [
    {
      id: 4,
      title: 'Open Source Design System',
      description: 'Comprehensive design system with components, tokens, and documentation.',
      owner: { name: 'Sarah Chen', avatar: '/avatars/sarah.jpg' },
      tags: ['Design System', 'React', 'Figma', 'Open Source'],
      views: 4521,
      likes: 234,
      featured: true
    },
    {
      id: 5,
      title: 'Social Media Analytics Tool',
      description: 'Track and analyze social media performance across multiple platforms.',
      owner: { name: 'Mike Johnson', avatar: '/avatars/mike.jpg' },
      tags: ['Analytics', 'Social Media', 'Python', 'Data Science'],
      views: 3214,
      likes: 189,
      featured: true
    },
    {
      id: 6,
      title: 'Weather App with AR Features',
      description: 'Interactive weather application with augmented reality visualization.',
      owner: { name: 'Emily Rodriguez', avatar: '/avatars/emily.jpg' },
      tags: ['Mobile', 'AR', 'Swift', 'Weather'],
      views: 2876,
      likes: 156,
      featured: false
    },
    {
      id: 7,
      title: 'Code Review Assistant',
      description: 'AI-powered tool to help developers with code reviews and best practices.',
      owner: { name: 'Alex Kim', avatar: '/avatars/alex.jpg' },
      tags: ['AI', 'Developer Tools', 'Code Review', 'Productivity'],
      views: 1923,
      likes: 98,
      featured: false
    }
  ];

  const filterOptions = ['All', 'AI', 'Web', 'Mobile', 'Blockchain', 'Design', 'Data Science', 'Open Source'];
  const tagSuggestions = ['React', 'Node.js', 'Python', 'AI', 'Machine Learning', 'Blockchain', 'Vue.js', 'TypeScript', 'Mobile', 'iOS', 'Android', 'Design', 'UI/UX', 'SaaS', 'Open Source'];

  const handleCreateProject = () => {
    // Handle project creation logic
    console.log('Creating project:', createProjectData);
    setShowCreateModal(false);
    // Reset form
    setCreateProjectData({
      title: '',
      shortDescription: '',
      detailedDescription: '',
      tags: [],
      projectType: 'personal',
      coverImage: null,
      githubLink: '',
      websiteLink: ''
    });
  };

  const addTag = (tag: string) => {
    if (!createProjectData.tags.includes(tag)) {
      setCreateProjectData(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
    }
  };

  const removeTag = (tagToRemove: string) => {
    setCreateProjectData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <span className="text-xl font-semibold text-gray-900">Projects Hub</span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/explore" className="text-gray-600 hover:text-gray-900 font-medium">Explore</Link>
              <Link href="/trending" className="text-gray-600 hover:text-gray-900 font-medium">Trending</Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900 font-medium">About</Link>
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Showcase Your <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Creative Projects</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Share your work, discover amazing projects from the community, and collaborate with creators from around the world.
          </p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Create New Project
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('your-projects')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                activeTab === 'your-projects'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Your Projects
            </button>
            <button
              onClick={() => setActiveTab('explore')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                activeTab === 'explore'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Explore Projects
            </button>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center space-x-4">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded transition-all ${
                  viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded transition-all ${
                  viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Filters & Sorting */}
        {activeTab === 'explore' && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 space-y-4 sm:space-y-0">
            <div className="flex flex-wrap gap-2">
              {filterOptions.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter.toLowerCase())}
                  className={`px-3 py-1 text-sm rounded-full border transition-all ${
                    selectedFilter === filter.toLowerCase()
                      ? 'bg-indigo-100 border-indigo-300 text-indigo-700'
                      : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="latest">Latest</option>
              <option value="trending">Trending</option>
              <option value="most-viewed">Most Viewed</option>
              <option value="most-liked">Most Liked</option>
            </select>
          </div>
        )}

        {/* Your Projects Section */}
        {activeTab === 'your-projects' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">Your Projects</h2>
              <span className="text-sm text-gray-500">{userProjects.length} projects</span>
            </div>

            <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
              {userProjects.map((project) => (
                <div key={project.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 overflow-hidden">
                  <div className="aspect-[16/9] bg-gradient-to-br from-gray-100 to-gray-200"></div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{project.title}</h3>
                      <div className={`px-2 py-1 text-xs font-medium rounded-full ${
                        project.status === 'Completed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {project.status}
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="px-2 py-1 text-xs text-gray-500">
                          +{project.tags.length - 3} more
                        </span>
                      )}
                    </div>
                    
                                          <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                          Updated {project.updatedAt} • {project.views} views
                        </div>
                        <div className="flex space-x-2">
                          <Link href="/project/space" className="px-3 py-1 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700 transition-colors">
                            Open Workspace
                          </Link>
                          <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-all">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                          </button>
                          <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded transition-all">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                          <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-all">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Explore Projects Section */}
        {activeTab === 'explore' && (
          <div>
            {/* Featured Projects */}
            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Featured Projects</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {communityProjects.filter(p => p.featured).map((project) => (
                  <div key={project.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-200 overflow-hidden">
                    <div className="aspect-[16/9] bg-gradient-to-br from-indigo-100 to-purple-100"></div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-semibold text-gray-900">{project.title}</h3>
                        <div className="flex items-center space-x-1 text-sm text-gray-500">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                          <span>{project.likes}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-4">{project.description}</p>
                      
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                        <div>
                          <div className="font-medium text-gray-900">{project.owner.name}</div>
                          <div className="text-sm text-gray-500">{project.views} views</div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mb-4">
                        {project.tags.map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <button className="w-full py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors">
                        View Project
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* All Community Projects */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Community Projects</h2>
              <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                {communityProjects.map((project) => (
                  <div key={project.id} className={`bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 overflow-hidden ${
                    viewMode === 'list' ? 'flex' : ''
                  }`}>
                    <div className={`bg-gradient-to-br from-gray-100 to-gray-200 ${
                      viewMode === 'list' ? 'w-48 h-32' : 'aspect-[16/9]'
                    }`}></div>
                    <div className="p-6 flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">{project.title}</h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{project.description}</p>
                      
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                        <span className="text-sm font-medium text-gray-900">{project.owner.name}</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mb-4">
                        {project.tags.slice(0, 2).map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>{project.views} views</span>
                          <div className="flex items-center space-x-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            <span>{project.likes}</span>
                          </div>
                        </div>
                        <button className="px-4 py-1 bg-indigo-100 text-indigo-700 text-sm font-medium rounded hover:bg-indigo-200 transition-colors">
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Create Project Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-900">Create New Project</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Project Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Project Title</label>
                <input
                  type="text"
                  value={createProjectData.title}
                  onChange={(e) => setCreateProjectData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter your project title"
                />
              </div>

              {/* Short Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Short Description</label>
                <input
                  type="text"
                  value={createProjectData.shortDescription}
                  onChange={(e) => setCreateProjectData(prev => ({ ...prev, shortDescription: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Brief description for project cards"
                  maxLength={150}
                />
                <p className="text-sm text-gray-500 mt-1">{createProjectData.shortDescription.length}/150 characters</p>
              </div>

              {/* Detailed Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Detailed Description</label>
                <textarea
                  value={createProjectData.detailedDescription}
                  onChange={(e) => setCreateProjectData(prev => ({ ...prev, detailedDescription: e.target.value }))}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                  placeholder="Detailed description of your project, features, and goals"
                />
              </div>

              {/* Project Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Project Type</label>
                <select
                  value={createProjectData.projectType}
                  onChange={(e) => setCreateProjectData(prev => ({ ...prev, projectType: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="personal">Personal</option>
                  <option value="open-source">Open Source</option>
                  <option value="team-based">Team-based</option>
                  <option value="marketplace">Marketplace</option>
                </select>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {createProjectData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 bg-indigo-100 text-indigo-700 text-sm rounded-full"
                    >
                      {tag}
                      <button
                        onClick={() => removeTag(tag)}
                        className="ml-2 hover:text-indigo-900"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {tagSuggestions.filter(tag => !createProjectData.tags.includes(tag)).slice(0, 8).map((tag) => (
                    <button
                      key={tag}
                      onClick={() => addTag(tag)}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors"
                    >
                      + {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">GitHub Link (Optional)</label>
                  <input
                    type="url"
                    value={createProjectData.githubLink}
                    onChange={(e) => setCreateProjectData(prev => ({ ...prev, githubLink: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="https://github.com/username/repo"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Website Link (Optional)</label>
                  <input
                    type="url"
                    value={createProjectData.websiteLink}
                    onChange={(e) => setCreateProjectData(prev => ({ ...prev, websiteLink: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="https://your-project.com"
                  />
                </div>
              </div>

              {/* Cover Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer">
                  <svg className="mx-auto h-12 w-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-gray-600 font-medium">Upload cover image</p>
                  <p className="text-gray-500 text-sm">PNG, JPG up to 10MB</p>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateProject}
                disabled={!createProjectData.title.trim()}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Create Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsLandingPage;
