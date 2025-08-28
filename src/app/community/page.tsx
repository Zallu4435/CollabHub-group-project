"use client";

import React, { useState } from 'react';
import Link from 'next/link';

const CommunityLandingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('discussions');
  const [selectedTag, setSelectedTag] = useState('all');

  // Mock data for discussions
  const discussions = [
    {
      id: 1,
      title: 'How to build a sustainable side hustle while working full-time?',
      preview: 'I\'ve been struggling to balance my 9-5 job with building my side project. Looking for advice on time management and sustainable growth strategies.',
      author: {
        name: 'SarahK',
        avatar: '/avatars/sarah.jpg',
        badge: 'Rising Star',
        reputation: 1247
      },
      upvotes: 47,
      replies: 23,
      views: 892,
      tags: ['entrepreneurship', 'side-hustle', 'productivity'],
      timePosted: '2 hours ago',
      isPinned: false,
      hasNewReplies: true
    },
    {
      id: 2,
      title: 'Best practices for remote team collaboration in 2025',
      preview: 'Our team has been fully remote for 2 years now. Here are the tools and processes that have made the biggest difference in our productivity.',
      author: {
        name: 'TechLead_Mike',
        avatar: '/avatars/mike.jpg',
        badge: 'Community Expert',
        reputation: 3421
      },
      upvotes: 156,
      replies: 67,
      views: 2341,
      tags: ['remote-work', 'team-management', 'productivity'],
      timePosted: '4 hours ago',
      isPinned: true,
      hasNewReplies: false
    },
    {
      id: 3,
      title: 'Looking for feedback on my new SaaS landing page design',
      preview: 'Just launched my first SaaS product and would love some constructive feedback on the landing page. Conversion rates are lower than expected.',
      author: {
        name: 'DesignNewbie',
        avatar: '/avatars/design.jpg',
        badge: 'New Member',
        reputation: 89
      },
      upvotes: 34,
      replies: 18,
      views: 567,
      tags: ['design', 'saas', 'feedback'],
      timePosted: '6 hours ago',
      isPinned: false,
      hasNewReplies: true
    }
  ];

  // Mock data for groups
  const groups = [
    {
      id: 1,
      name: 'Full Stack Developers',
      description: 'Discussion about modern web development, frameworks, and best practices',
      icon: '💻',
      members: 12847,
      posts: 3421,
      isJoined: true,
      isActive: true,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 2,
      name: 'UI/UX Designers',
      description: 'Share designs, get feedback, and discuss the latest design trends',
      icon: '🎨',
      members: 8934,
      posts: 2156,
      isJoined: false,
      isActive: true,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 3,
      name: 'Startup Founders',
      description: 'Building companies, raising funds, and sharing entrepreneurial experiences',
      icon: '🚀',
      members: 15672,
      posts: 4823,
      isJoined: true,
      isActive: true,
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 4,
      name: 'AI & Machine Learning',
      description: 'Latest developments in AI, ML models, and practical applications',
      icon: '🤖',
      members: 6789,
      posts: 1934,
      isJoined: false,
      isActive: true,
      color: 'from-green-500 to-emerald-500'
    }
  ];

  // Mock data for events
  const upcomingEvents = [
    {
      id: 1,
      title: 'Remote Work Best Practices Workshop',
      date: '2025-01-15',
      time: '2:00 PM EST',
      type: 'Virtual',
      attendees: 234,
      host: 'Community Team'
    },
    {
      id: 2,
      title: 'Startup Pitch Night',
      date: '2025-01-20',
      time: '6:00 PM EST',
      type: 'Hybrid',
      attendees: 89,
      host: 'Entrepreneur Group'
    },
    {
      id: 3,
      title: 'Design System Masterclass',
      date: '2025-01-25',
      time: '3:00 PM EST',
      type: 'Virtual',
      attendees: 156,
      host: 'UX Guild'
    }
  ];

  // Mock data for top contributors
  const topContributors = [
    {
      id: 1,
      name: 'Alex Chen',
      avatar: '/avatars/alex.jpg',
      points: 15847,
      badges: ['Expert', 'Helper', 'Mentor'],
      specialty: 'Full Stack Development',
      contributions: 342
    },
    {
      id: 2,
      name: 'Maria Rodriguez',
      avatar: '/avatars/maria.jpg',
      points: 12934,
      badges: ['Design Pro', 'Community Leader'],
      specialty: 'UI/UX Design',
      contributions: 278
    },
    {
      id: 3,
      name: 'David Kim',
      avatar: '/avatars/david.jpg',
      points: 11567,
      badges: ['Startup Guru', 'Investor'],
      specialty: 'Entrepreneurship',
      contributions: 198
    }
  ];

  // Mock data for resources
  const featuredResources = [
    {
      id: 1,
      title: 'Complete Guide to Remote Team Management',
      type: 'Guide',
      author: 'Community Team',
      downloads: 2847,
      rating: 4.9,
      tags: ['management', 'remote-work']
    },
    {
      id: 2,
      title: 'Startup Funding Checklist 2025',
      type: 'Checklist',
      author: 'VentureExpert',
      downloads: 1923,
      rating: 4.8,
      tags: ['startup', 'funding']
    },
    {
      id: 3,
      title: 'Design System Template (Figma)',
      type: 'Template',
      author: 'DesignMaster',
      downloads: 3456,
      rating: 4.9,
      tags: ['design', 'figma', 'templates']
    }
  ];

  const trendingTags = ['javascript', 'react', 'startup', 'remote-work', 'design', 'ai', 'freelancing', 'saas'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <span className="text-xl font-semibold text-gray-900">ConnectHub</span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/discussions" className="text-gray-600 hover:text-gray-900 font-medium">Discussions</Link>
              <Link href="/groups" className="text-gray-600 hover:text-gray-900 font-medium">Groups</Link>
              <Link href="/events" className="text-gray-600 hover:text-gray-900 font-medium">Events</Link>
              <Link href="/resources" className="text-gray-600 hover:text-gray-900 font-medium">Resources</Link>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                Join Community
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        
        {/* Background Network Illustration */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 1200 600">
            <defs>
              <pattern id="network" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <circle cx="50" cy="50" r="2" fill="white" opacity="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#network)" />
            <g stroke="white" strokeWidth="1" opacity="0.3">
              <line x1="100" y1="100" x2="300" y2="200" />
              <line x1="300" y1="200" x2="500" y2="150" />
              <line x1="500" y1="150" x2="700" y2="250" />
              <line x1="200" y1="300" x2="400" y2="350" />
              <line x1="400" y1="350" x2="600" y2="300" />
              <line x1="600" y1="300" x2="800" y2="400" />
            </g>
            <g fill="white" opacity="0.6">
              <circle cx="300" cy="200" r="8" />
              <circle cx="500" cy="150" r="6" />
              <circle cx="700" cy="250" r="7" />
              <circle cx="400" cy="350" r="5" />
              <circle cx="600" cy="300" r="9" />
            </g>
          </svg>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Join the Conversation. <span className="text-yellow-300">Build Together.</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-indigo-100">
            Connect with like-minded professionals, share knowledge, and grow your network in our thriving community.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <button className="px-8 py-4 bg-yellow-400 text-indigo-900 font-bold text-lg rounded-2xl hover:bg-yellow-300 transform hover:scale-105 transition-all duration-200 shadow-xl">
              Join the Community
            </button>
            <button className="px-8 py-4 bg-white bg-opacity-20 text-white font-semibold text-lg rounded-2xl hover:bg-opacity-30 backdrop-blur-sm transition-all duration-200 border border-white border-opacity-30">
              Start a Discussion
            </button>
          </div>

          <div className="flex items-center justify-center space-x-8 text-sm text-indigo-200">
            <div className="flex items-center">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              25K+ Active Members
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2 animate-pulse"></span>
              150+ Daily Discussions
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></span>
              50+ Expert Contributors
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Navigation Tabs */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 overflow-hidden">
              <div className="flex border-b border-gray-200">
                {[
                  { id: 'discussions', label: 'Discussions', icon: '💬' },
                  { id: 'groups', label: 'Groups', icon: '👥' },
                  { id: 'events', label: 'Events', icon: '📅' },
                  { id: 'resources', label: 'Resources', icon: '📚' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 px-6 py-4 font-medium text-sm transition-all ${
                      activeTab === tab.id
                        ? 'bg-indigo-50 text-indigo-600 border-b-2 border-indigo-600'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <span className="mr-2">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Trending Tags */}
              <div className="p-4 bg-gray-50 border-b border-gray-200">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-sm font-medium text-gray-700">Trending:</span>
                  {trendingTags.slice(0, 6).map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(tag)}
                      className={`px-3 py-1 text-xs rounded-full transition-colors ${
                        selectedTag === tag
                          ? 'bg-indigo-100 text-indigo-700'
                          : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                      }`}
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Discussions Feed */}
            {activeTab === 'discussions' && (
              <div className="space-y-4">
                {discussions.map((discussion) => (
                  <div key={discussion.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200">
                    <div className="flex items-start space-x-4">
                      {/* Voting */}
                      <div className="flex flex-col items-center space-y-1 flex-shrink-0">
                        <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                          <svg className="w-5 h-5 text-gray-400 hover:text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                          </svg>
                        </button>
                        <span className="font-semibold text-gray-900">{discussion.upvotes}</span>
                        <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                          <svg className="w-5 h-5 text-gray-400 hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          {discussion.isPinned && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              📌 Pinned
                            </span>
                          )}
                          {discussion.hasNewReplies && (
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                          )}
                        </div>

                        <Link href={`/discussions/${discussion.id}`}>
                          <h3 className="text-lg font-semibold text-gray-900 hover:text-indigo-600 cursor-pointer mb-2 line-clamp-2">
                            {discussion.title}
                          </h3>
                        </Link>
                        
                        <p className="text-gray-600 mb-4 line-clamp-2">{discussion.preview}</p>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mb-4">
                          {discussion.tags.map((tag, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded hover:bg-gray-200 cursor-pointer transition-colors">
                              #{tag}
                            </span>
                          ))}
                        </div>
                        
                        {/* Author & Stats */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                            <div>
                              <div className="flex items-center space-x-2">
                                <span className="text-sm font-medium text-gray-900">{discussion.author.name}</span>
                                <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full">
                                  {discussion.author.badge}
                                </span>
                              </div>
                              <div className="text-xs text-gray-500">
                                {discussion.author.reputation} reputation • {discussion.timePosted}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                              </svg>
                              <span>{discussion.replies}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                              <span>{discussion.views}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Groups Section */}
            {activeTab === 'groups' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {groups.map((group) => (
                  <div key={group.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200">
                    <div className={`h-20 bg-gradient-to-r ${group.color} relative`}>
                      <div className="absolute bottom-4 left-6 text-3xl">{group.icon}</div>
                      {group.isActive && (
                        <div className="absolute top-4 right-4 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-semibold text-gray-900">{group.name}</h3>
                        {group.isJoined && (
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                            Joined
                          </span>
                        )}
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{group.description}</p>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>{group.members.toLocaleString()} members</span>
                          <span>{group.posts} posts</span>
                        </div>
                      </div>
                      
                      <button className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                        group.isJoined
                          ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          : 'bg-indigo-600 text-white hover:bg-indigo-700'
                      }`}>
                        {group.isJoined ? 'View Group' : 'Join Group'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Events Section */}
            {activeTab === 'events' && (
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            event.type === 'Virtual' 
                              ? 'bg-blue-100 text-blue-700' 
                              : 'bg-green-100 text-green-700'
                          }`}>
                            {event.type}
                          </span>
                        </div>
                        
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{event.title}</h3>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center space-x-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a4 4 0 118 0v4M5 7h14l-1 10H6L5 7z" />
                            </svg>
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{event.time}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>{event.attendees} attending</span>
                          <span>Hosted by {event.host}</span>
                        </div>
                      </div>
                      
                      <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                        Join Event
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Resources Section */}
            {activeTab === 'resources' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredResources.map((resource) => (
                  <div key={resource.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200">
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded font-medium">
                        {resource.type}
                      </span>
                      <div className="flex items-center space-x-1">
                        <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-sm text-gray-600">{resource.rating}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{resource.title}</h3>
                    
                    <p className="text-sm text-gray-600 mb-3">By {resource.author}</p>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {resource.tags.map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{resource.downloads} downloads</span>
                      <button className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition-colors">
                        Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Top Contributors */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <svg className="w-5 h-5 text-yellow-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  Top Contributors
                </h3>
                
                <div className="space-y-4">
                  {topContributors.map((contributor, index) => (
                    <div key={contributor.id} className="flex items-center space-x-3">
                      <div className="flex-shrink-0 relative">
                        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                        <div className={`absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                          index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-500'
                        }`}>
                          {index + 1}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900">{contributor.name}</div>
                        <div className="text-sm text-gray-500">{contributor.points.toLocaleString()} points</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Events */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a4 4 0 118 0v4M5 7h14l-1 10H6L5 7z" />
                  </svg>
                  Upcoming Events
                </h3>
                
                <div className="space-y-3">
                  {upcomingEvents.slice(0, 3).map((event) => (
                    <div key={event.id} className="border-l-4 border-indigo-500 pl-3">
                      <h4 className="font-medium text-gray-900 text-sm line-clamp-2">{event.title}</h4>
                      <div className="text-xs text-gray-500 mt-1">{event.date} • {event.attendees} attending</div>
                    </div>
                  ))}
                </div>
                
                <Link href="/events">
                  <button className="w-full mt-4 py-2 text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                    View All Events →
                  </button>
                </Link>
              </div>

              {/* Community Guidelines */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Safe Community
                </h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                    <span>24/7 Moderation Team</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                    <span>Zero Tolerance for Harassment</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                    <span>Verified Professional Network</span>
                  </div>
                </div>
                <Link href="/guidelines">
                  <button className="w-full mt-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors">
                    Read Guidelines
                  </button>
                </Link>
              </div>

              {/* CTA Card */}
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-6 text-white">
                <h3 className="text-lg font-semibold mb-2">Ready to Join?</h3>
                <p className="text-indigo-100 text-sm mb-4">
                  Be part of a growing community of 25K+ professionals sharing knowledge and building together.
                </p>
                <button className="w-full py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
                  Join ConnectHub
                </button>
                <div className="mt-3 text-center text-indigo-200 text-xs">
                  ✓ Free forever • ✓ No spam • ✓ Cancel anytime
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityLandingPage;
