"use client";

import React, { useState } from 'react';
import Link from 'next/link';

const QALandingPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [showAskModal, setShowAskModal] = useState(false);

  const [askQuestionData, setAskQuestionData] = useState({
    title: '',
    description: '',
    tags: [] as string[],
    code: ''
  });

  // Mock data for questions
  const questions = [
    {
      id: 1,
      title: 'How to implement JWT authentication in React with TypeScript?',
      description: 'I\'m building a React application with TypeScript and need to implement JWT authentication. What\'s the best approach for storing tokens and handling authentication state?',
      author: {
        name: 'Sarah Chen',
        avatar: '/avatars/sarah.jpg',
        reputation: 2847
      },
      tags: ['react', 'typescript', 'jwt', 'authentication'],
      stats: {
        answers: 8,
        votes: 42,
        views: 1247
      },
      timePosted: '2 hours ago',
      hasAcceptedAnswer: true,
      bounty: null
    },
    {
      id: 2,
      title: 'Node.js memory leak detection and prevention best practices',
      description: 'My Node.js application is experiencing memory leaks in production. What are the best tools and techniques to identify and prevent memory leaks?',
      author: {
        name: 'Mike Rodriguez',
        avatar: '/avatars/mike.jpg',
        reputation: 5129
      },
      tags: ['node.js', 'memory-management', 'performance', 'debugging'],
      stats: {
        answers: 15,
        votes: 78,
        views: 3421
      },
      timePosted: '6 hours ago',
      hasAcceptedAnswer: true,
      bounty: 100
    },
    {
      id: 3,
      title: 'Understanding React useEffect cleanup function',
      description: 'When and why should I use the cleanup function in useEffect? I\'m confused about memory leaks and when cleanup is necessary.',
      author: {
        name: 'Emma Johnson',
        avatar: '/avatars/emma.jpg',
        reputation: 1456
      },
      tags: ['react', 'hooks', 'useeffect', 'cleanup'],
      stats: {
        answers: 5,
        votes: 23,
        views: 892
      },
      timePosted: '1 day ago',
      hasAcceptedAnswer: false,
      bounty: null
    },
    {
      id: 4,
      title: 'Optimizing PostgreSQL queries for large datasets',
      description: 'I have a PostgreSQL database with millions of records and queries are becoming slow. What are the best optimization techniques?',
      author: {
        name: 'David Kim',
        avatar: '/avatars/david.jpg',
        reputation: 3892
      },
      tags: ['postgresql', 'optimization', 'database', 'performance'],
      stats: {
        answers: 12,
        votes: 56,
        views: 2108
      },
      timePosted: '2 days ago',
      hasAcceptedAnswer: true,
      bounty: null
    }
  ];

  const trendingTags = [
    { name: 'React', count: 15420 },
    { name: 'JavaScript', count: 23156 },
    { name: 'Python', count: 18743 },
    { name: 'Node.js', count: 12987 },
    { name: 'TypeScript', count: 9876 },
    { name: 'Vue.js', count: 7654 },
    { name: 'Database', count: 11234 },
    { name: 'CSS', count: 8765 }
  ];

  const topContributors = [
    { name: 'Alex Zhang', avatar: '/avatars/alex.jpg', points: 45789, badges: { gold: 12, silver: 34, bronze: 67 } },
    { name: 'Lisa Park', avatar: '/avatars/lisa.jpg', points: 38492, badges: { gold: 8, silver: 29, bronze: 52 } },
    { name: 'John Smith', avatar: '/avatars/john.jpg', points: 32156, badges: { gold: 6, silver: 25, bronze: 48 } },
    { name: 'Maria Garcia', avatar: '/avatars/maria.jpg', points: 28734, badges: { gold: 5, silver: 22, bronze: 41 } }
  ];

  const featuredQuestion = {
    id: 5,
    title: 'Best practices for microservices architecture in 2025',
    description: 'What are the current best practices and patterns for implementing microservices architecture? Looking for real-world experiences and lessons learned.',
    author: { name: 'Tech Lead', avatar: '/avatars/techlead.jpg' },
    tags: ['microservices', 'architecture', 'best-practices'],
    stats: { answers: 23, votes: 156, views: 8934 },
    bounty: 500
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const handleAskQuestion = () => {
    console.log('Asking question:', askQuestionData);
    setShowAskModal(false);
  };

  const addTag = (tag: string) => {
    if (!askQuestionData.tags.includes(tag) && askQuestionData.tags.length < 5) {
      setAskQuestionData(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
    }
  };

  const removeTag = (tagToRemove: string) => {
    setAskQuestionData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">Q</span>
              </div>
              <span className="text-xl font-semibold text-gray-900">DevQ&A</span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/questions" className="text-gray-600 hover:text-gray-900 font-medium">Questions</Link>
              <Link href="/tags" className="text-gray-600 hover:text-gray-900 font-medium">Tags</Link>
              <Link href="/users" className="text-gray-600 hover:text-gray-900 font-medium">Users</Link>
              <Link href="/jobs" className="text-gray-600 hover:text-gray-900 font-medium">Jobs</Link>
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-orange-50 to-orange-100 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Find Answers. <span className="text-orange-600">Share Knowledge.</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Join our community of developers helping each other solve coding challenges and share expertise.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mb-8">
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-4 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-orange-500 focus:border-orange-500 text-lg"
                placeholder="Search for questions, tags, or keywords..."
              />
            </div>
          </form>

          <button
            onClick={() => setShowAskModal(true)}
            className="inline-flex items-center px-8 py-4 bg-orange-600 text-white font-semibold text-lg rounded-lg hover:bg-orange-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Ask a Question
          </button>

          <div className="mt-6 flex items-center justify-center space-x-8 text-sm text-gray-600">
            <div className="flex items-center">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
              15,234 questions answered
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
              8,976 active developers
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
              99.2% response rate
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content - Questions Feed */}
          <div className="lg:col-span-3">
            {/* Filter & Sort Controls */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">Latest Questions</h2>
              
              <div className="flex items-center space-x-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="newest">Newest</option>
                  <option value="trending">Trending</option>
                  <option value="most-answered">Most Answered</option>
                  <option value="unanswered">Unanswered</option>
                  <option value="bounty">Active Bounties</option>
                </select>
              </div>
            </div>

            {/* Questions List */}
            <div className="space-y-4">
              {questions.map((question) => (
                <div key={question.id} className="bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200 overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-start space-x-4">
                      {/* Vote & Stats */}
                      <div className="flex-shrink-0 text-center">
                        <div className="bg-gray-50 rounded-lg p-3 mb-2">
                          <div className="text-lg font-semibold text-gray-900">{question.stats.votes}</div>
                          <div className="text-xs text-gray-500">votes</div>
                        </div>
                        <div className={`rounded-lg p-3 mb-2 ${
                          question.hasAcceptedAnswer ? 'bg-green-50' : 'bg-gray-50'
                        }`}>
                          <div className={`text-lg font-semibold ${
                            question.hasAcceptedAnswer ? 'text-green-600' : 'text-gray-900'
                          }`}>
                            {question.stats.answers}
                          </div>
                          <div className="text-xs text-gray-500">answers</div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <div className="text-lg font-semibold text-gray-900">{question.stats.views}</div>
                          <div className="text-xs text-gray-500">views</div>
                        </div>
                      </div>

                      {/* Question Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-3">
                          <Link href={`/questions/${question.id}`}>
                            <h3 className="text-lg font-semibold text-blue-600 hover:text-blue-700 cursor-pointer line-clamp-2">
                              {question.title}
                            </h3>
                          </Link>
                          {question.bounty && (
                            <div className="flex-shrink-0 ml-3">
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                +{question.bounty}
                              </span>
                            </div>
                          )}
                        </div>
                        
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{question.description}</p>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {question.tags.map((tag, index) => (
                            <Link key={index} href={`/tags/${tag}`}>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 cursor-pointer transition-colors">
                                {tag}
                              </span>
                            </Link>
                          ))}
                        </div>
                        
                        {/* Author & Time */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                            <div>
                              <Link href={`/users/${question.author.name.toLowerCase().replace(' ', '-')}`}>
                                <span className="text-sm font-medium text-blue-600 hover:text-blue-700 cursor-pointer">
                                  {question.author.name}
                                </span>
                              </Link>
                              <div className="text-xs text-gray-500">
                                {question.author.reputation.toLocaleString()} reputation
                              </div>
                            </div>
                          </div>
                          <div className="text-sm text-gray-500">
                            asked {question.timePosted}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                Load More Questions
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-8">
              {/* Featured Question */}
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
                <div className="flex items-center mb-3">
                  <svg className="w-5 h-5 text-yellow-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <h3 className="font-semibold text-gray-900">Featured Question</h3>
                  <span className="ml-2 px-2 py-1 bg-yellow-200 text-yellow-800 text-xs rounded-full font-medium">
                    +{featuredQuestion.bounty}
                  </span>
                </div>
                <Link href={`/questions/${featuredQuestion.id}`}>
                  <h4 className="font-semibold text-gray-900 hover:text-blue-600 cursor-pointer mb-2 line-clamp-2">
                    {featuredQuestion.title}
                  </h4>
                </Link>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{featuredQuestion.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{featuredQuestion.stats.answers} answers</span>
                  <span>{featuredQuestion.stats.views} views</span>
                </div>
              </div>

              {/* Trending Tags */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <svg className="w-5 h-5 text-orange-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  Trending Tags
                </h3>
                <div className="space-y-3">
                  {trendingTags.map((tag, index) => (
                    <Link key={index} href={`/tags/${tag.name.toLowerCase()}`}>
                      <div className="flex items-center justify-between hover:bg-gray-50 p-2 rounded cursor-pointer">
                        <span className="font-medium text-blue-600 hover:text-blue-700">{tag.name}</span>
                        <span className="text-sm text-gray-500">{tag.count.toLocaleString()}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Top Contributors */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Top Contributors
                </h3>
                <div className="space-y-4">
                  {topContributors.map((contributor, index) => (
                    <Link key={index} href={`/users/${contributor.name.toLowerCase().replace(' ', '-')}`}>
                      <div className="flex items-center space-x-3 hover:bg-gray-50 p-2 rounded cursor-pointer">
                        <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"></div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-900">{contributor.name}</div>
                          <div className="text-sm text-gray-500">{contributor.points.toLocaleString()} points</div>
                        </div>
                        <div className="flex space-x-1">
                          <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
                          <span className="text-xs text-gray-500">{contributor.badges.gold}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* CTA Section */}
              <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-xl p-6 text-white">
                <h3 className="text-lg font-semibold mb-2">Join Our Community</h3>
                <p className="text-orange-100 text-sm mb-4">
                  Get help from experts and help others solve coding challenges.
                </p>
                <button
                  onClick={() => setShowAskModal(true)}
                  className="w-full py-2 bg-white text-orange-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Ask Your First Question
                </button>
                <div className="mt-4 text-center text-orange-200 text-sm">
                  ✓ Free to join • ✓ Expert answers • ✓ Build reputation
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ask Question Modal */}
      {showAskModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-900">Ask a Question</h2>
              <button
                onClick={() => setShowAskModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Question Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Question Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={askQuestionData.title}
                  onChange={(e) => setAskQuestionData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Be specific and imagine you're asking a question to another person"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Make your title descriptive and specific. This helps others find your question.
                </p>
              </div>

              {/* Question Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={askQuestionData.description}
                  onChange={(e) => setAskQuestionData(prev => ({ ...prev, description: e.target.value }))}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                  placeholder="Provide as much detail as possible. Include what you've tried and what didn't work."
                />
              </div>

              {/* Code (Optional) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Code (Optional)
                </label>
                <textarea
                  value={askQuestionData.code}
                  onChange={(e) => setAskQuestionData(prev => ({ ...prev, code: e.target.value }))}
                  rows={8}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none font-mono text-sm bg-gray-50"
                  placeholder="Paste your relevant code here..."
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {askQuestionData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 bg-orange-100 text-orange-700 text-sm rounded-full"
                    >
                      {tag}
                      <button
                        onClick={() => removeTag(tag)}
                        className="ml-2 hover:text-orange-900"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {['react', 'javascript', 'python', 'node.js', 'typescript', 'vue.js', 'css', 'html'].filter(tag => !askQuestionData.tags.includes(tag)).slice(0, 8).map((tag) => (
                    <button
                      key={tag}
                      onClick={() => addTag(tag)}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors"
                    >
                      + {tag}
                    </button>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Add up to 5 tags to describe what your question is about. Use existing tags when possible.
                </p>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowAskModal(false)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAskQuestion}
                disabled={!askQuestionData.title.trim() || !askQuestionData.description.trim() || askQuestionData.tags.length === 0}
                className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Post Your Question
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QALandingPage;
