"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';

const CommunityPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedTopic, setSelectedTopic] = useState('general');

  const communityStats = [
    { label: 'Active Members', value: '25,000+', icon: '👥', color: 'from-blue-500 to-indigo-600' },
    { label: 'Discussions', value: '150,000+', icon: '💬', color: 'from-green-500 to-emerald-600' },
    { label: 'Questions Answered', value: '45,000+', icon: '❓', color: 'from-orange-500 to-red-600' },
    { label: 'Projects Shared', value: '12,000+', icon: '🚀', color: 'from-purple-500 to-pink-600' }
  ];

  const featuredDiscussions = [
    {
      id: 1,
      title: 'Best practices for remote team collaboration in 2025',
      category: 'Remote Work',
      author: {
        name: 'Sarah Chen',
        avatar: '/avatars/sarah.jpg',
        badges: ['Expert', 'Top Contributor']
      },
      preview: 'After managing remote teams for 3 years, here are the strategies that actually work for keeping everyone engaged and productive...',
      stats: {
        replies: 47,
        views: 2834,
        likes: 156
      },
      timePosted: '2 hours ago',
      tags: ['remote-work', 'productivity', 'team-management']
    },
    {
      id: 2,
      title: 'Show & Tell: AI-powered project management dashboard',
      category: 'Show & Tell',
      author: {
        name: 'Michael Torres',
        avatar: '/avatars/michael.jpg',
        badges: ['Creator', 'Verified']
      },
      preview: 'Just launched my side project - an AI dashboard that predicts project delays before they happen. Built with React, Node.js, and OpenAI...',
      stats: {
        replies: 23,
        views: 1567,
        likes: 89
      },
      timePosted: '4 hours ago',
      tags: ['ai', 'project-management', 'react', 'showcase']
    },
    {
      id: 3,
      title: 'Help needed: Scaling team communication as we grow',
      category: 'Help & Support',
      author: {
        name: 'Emma Rodriguez',
        avatar: '/avatars/emma.jpg',
        badges: ['Rising Star']
      },
      preview: 'Our startup just hit 50 people and our communication is breaking down. Slack is too noisy, email is too slow. What solutions have worked for you?',
      stats: {
        replies: 34,
        views: 892,
        likes: 45
      },
      timePosted: '6 hours ago',
      tags: ['startup', 'communication', 'scaling', 'help']
    }
  ];

  const communityCategories = [
    { id: 'all', name: 'All Discussions', icon: '🌟', count: 1247 },
    { id: 'general', name: 'General', icon: '💬', count: 423 },
    { id: 'help', name: 'Help & Support', icon: '🆘', count: 312 },
    { id: 'show-tell', name: 'Show & Tell', icon: '🎨', count: 189 },
    { id: 'jobs', name: 'Job Board', icon: '💼', count: 156 },
    { id: 'feedback', name: 'Product Feedback', icon: '💡', count: 89 },
    { id: 'events', name: 'Events & Meetups', icon: '📅', count: 78 }
  ];

  const topContributors = [
    {
      name: 'Alex Chen',
      role: 'Full Stack Developer',
      avatar: '/avatars/alex.jpg',
      stats: {
        posts: 156,
        helpful: 89,
        reputation: 4567
      },
      badges: ['Top Contributor', 'Expert', 'Mentor']
    },
    {
      name: 'Maria Garcia',
      role: 'Product Designer',
      avatar: '/avatars/maria.jpg',
      stats: {
        posts: 134,
        helpful: 76,
        reputation: 3892
      },
      badges: ['Design Expert', 'Community Leader']
    },
    {
      name: 'David Kumar',
      role: 'Engineering Manager',
      avatar: '/avatars/david.jpg',
      stats: {
        posts: 112,
        helpful: 68,
        reputation: 3456
      },
      badges: ['Leadership', 'Mentor']
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'Remote Work Best Practices Workshop',
      date: '2025-09-05',
      time: '2:00 PM EST',
      type: 'Virtual Workshop',
      host: 'Sarah Chen',
      attendees: 147,
      description: 'Learn proven strategies for managing remote teams effectively.'
    },
    {
      id: 2,
      title: 'Show & Tell: September Edition',
      date: '2025-09-12',
      time: '6:00 PM EST',
      type: 'Community Showcase',
      host: 'Community Team',
      attendees: 89,
      description: 'Monthly showcase of amazing projects built by our community.'
    },
    {
      id: 3,
      title: 'AI in Project Management Roundtable',
      date: '2025-09-18',
      time: '3:00 PM EST',
      type: 'Panel Discussion',
      host: 'Michael Torres',
      attendees: 203,
      description: 'Exploring how AI is transforming project management workflows.'
    }
  ];

  const communityGuidelines = [
    {
      title: 'Be Respectful',
      description: 'Treat all community members with respect and kindness. Personal attacks, harassment, or discrimination will not be tolerated.',
      icon: '🤝'
    },
    {
      title: 'Stay On Topic',
      description: 'Keep discussions relevant to the channel or category. This helps everyone find the information they need.',
      icon: '🎯'
    },
    {
      title: 'Help Others',
      description: 'Share your knowledge and help fellow community members. We grow stronger when we lift each other up.',
      icon: '🤲'
    },
    {
      title: 'No Spam',
      description: 'Avoid excessive self-promotion, duplicate posts, or irrelevant content. Quality over quantity always.',
      icon: '🚫'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        
        {/* Floating Community Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-16 h-16 bg-white bg-opacity-10 rounded-full flex items-center justify-center animate-pulse">
            <span className="text-2xl">💬</span>
          </div>
          <div className="absolute top-40 right-20 w-12 h-12 bg-white bg-opacity-10 rounded-full flex items-center justify-center animate-pulse delay-1000">
            <span className="text-xl">🤝</span>
          </div>
          <div className="absolute bottom-32 left-20 w-14 h-14 bg-white bg-opacity-10 rounded-full flex items-center justify-center animate-pulse delay-2000">
            <span className="text-xl">🚀</span>
          </div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Connect. <span className="text-yellow-300">Learn.</span> Grow Together.
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-purple-100">
            Join a thriving community of creators, developers, and innovators. Share knowledge, get help, and build amazing things together.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <button className="px-8 py-4 bg-yellow-400 text-purple-900 font-bold text-lg rounded-2xl hover:bg-yellow-300 transform hover:scale-105 transition-all duration-200 shadow-xl">
              Join the Community
            </button>
            <button className="px-8 py-4 bg-white bg-opacity-20 text-white font-semibold text-lg rounded-2xl hover:bg-opacity-30 backdrop-blur-sm transition-all duration-200 border border-white border-opacity-30">
              Start a Discussion
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {communityStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-purple-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Community Categories */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Explore Discussions</h2>
            <p className="text-lg text-gray-600">Find conversations that match your interests</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {communityCategories.slice(1).map((category) => (
              <Link key={category.id} href={`/community/${category.id}`}>
                <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer group">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl group-hover:scale-110 transition-transform">{category.icon}</span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
                      {category.count}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Featured Discussions */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Featured Discussions</h2>
            <Link href="/community/discussions" className="text-indigo-600 hover:text-indigo-700 font-medium">
              View All Discussions →
            </Link>
          </div>

          <div className="space-y-6">
            {featuredDiscussions.map((discussion) => (
              <div key={discussion.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full font-medium">
                        {discussion.category}
                      </span>
                      <span className="text-sm text-gray-500">{discussion.timePosted}</span>
                    </div>
                    <Link href={`/community/discussion/${discussion.id}`}>
                      <h3 className="text-xl font-semibold text-gray-900 hover:text-indigo-600 cursor-pointer mb-3 line-clamp-1">
                        {discussion.title}
                      </h3>
                    </Link>
                    <p className="text-gray-600 line-clamp-2 mb-4">{discussion.preview}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {discussion.tags.map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded hover:bg-gray-200 cursor-pointer transition-colors">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                      <div>
                        <div className="flex items-center space-x-1">
                          <span className="text-sm font-medium text-gray-900">{discussion.author.name}</span>
                          {discussion.author.badges.slice(0, 1).map((badge, index) => (
                            <span key={index} className="px-1.5 py-0.5 bg-purple-100 text-purple-700 text-xs rounded font-medium">
                              {badge}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      {discussion.stats.replies}
                    </span>
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      {discussion.stats.likes}
                    </span>
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      {discussion.stats.views}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Community Features Grid */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Join Our Community?</h2>
            <p className="text-lg text-gray-600">Connect with like-minded professionals and grow together</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '🧠',
                title: 'Knowledge Sharing',
                description: 'Learn from experts and share your expertise with others. Our Q&A system helps everyone find answers quickly.',
                color: 'from-blue-500 to-indigo-600'
              },
              {
                icon: '🚀',
                title: 'Project Showcase',
                description: 'Show off your latest projects, get feedback, and discover inspiring work from the community.',
                color: 'from-purple-500 to-pink-600'
              },
              {
                icon: '💼',
                title: 'Career Growth',
                description: 'Find job opportunities, get career advice, and connect with potential collaborators and mentors.',
                color: 'from-green-500 to-emerald-600'
              },
              {
                icon: '🎯',
                title: 'Expert Mentorship',
                description: 'Connect with industry experts who are willing to share their knowledge and guide your journey.',
                color: 'from-orange-500 to-red-600'
              },
              {
                icon: '🌐',
                title: 'Global Network',
                description: 'Build relationships with professionals from around the world. Diversity makes us all stronger.',
                color: 'from-teal-500 to-cyan-600'
              },
              {
                icon: '📚',
                title: 'Continuous Learning',
                description: 'Access exclusive workshops, webinars, and learning resources shared by community members.',
                color: 'from-indigo-500 to-purple-600'
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-4`}>
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Top Contributors & Upcoming Events */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Top Contributors */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Top Contributors</h2>
            <div className="space-y-4">
              {topContributors.map((contributor, index) => (
                <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
                      <div className={`absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                        index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-500'
                      }`}>
                        {index + 1}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{contributor.name}</h3>
                      <p className="text-gray-600 text-sm">{contributor.role}</p>
                      
                      <div className="flex flex-wrap gap-1 mt-2">
                        {contributor.badges.slice(0, 2).map((badge, badgeIndex) => (
                          <span key={badgeIndex} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded font-medium">
                            {badge}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
                        <span>{contributor.stats.posts} posts</span>
                        <span>{contributor.stats.helpful} helpful</span>
                        <span>{contributor.stats.reputation} reputation</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Events</h2>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">{event.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{event.description}</p>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                      {event.type}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a4 4 0 118 0v4M5 7h14l-1 10H6L5 7z" />
                          </svg>
                          {event.date}
                        </span>
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {event.time}
                        </span>
                      </div>
                      <div className="mt-2">
                        <span>{event.attendees} attending • Hosted by {event.host}</span>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm">
                      Join Event
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Community Guidelines */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Community Guidelines</h2>
            <p className="text-lg text-gray-600">Help us maintain a positive and productive environment for everyone</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {communityGuidelines.map((guideline, index) => (
              <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 text-center">
                <div className="text-4xl mb-4">{guideline.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{guideline.title}</h3>
                <p className="text-gray-600 text-sm">{guideline.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-12 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Join the Conversation?
            </h2>
            <p className="text-xl mb-8 text-indigo-100">
              Connect with 25,000+ professionals, share your expertise, and accelerate your growth.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
              <button className="px-8 py-4 bg-yellow-400 text-purple-900 font-bold text-lg rounded-2xl hover:bg-yellow-300 transform hover:scale-105 transition-all duration-200 shadow-xl">
                Join Community Free
              </button>
              <button className="px-8 py-4 bg-white bg-opacity-20 text-white font-semibold text-lg rounded-2xl hover:bg-opacity-30 backdrop-blur-sm transition-all duration-200 border border-white border-opacity-30">
                Start Your First Post
              </button>
            </div>

            <div className="flex items-center justify-center space-x-8 text-sm text-purple-100">
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Free to join
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                No spam policy
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Professional network
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <Link href="/" className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">C</span>
                </div>
                <span className="text-xl font-semibold">ConnectHub</span>
              </Link>
              <p className="text-gray-400 mb-4">
                Building bridges between talented professionals worldwide. Join our community and grow together.
              </p>
              <div className="flex space-x-4">
                {['Discord', 'Twitter', 'LinkedIn', 'GitHub'].map((social) => (
                  <a key={social} href="#" className="text-gray-400 hover:text-white transition-colors">
                    <span className="sr-only">{social}</span>
                    <div className="w-6 h-6 bg-gray-400 rounded"></div>
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/community/discussions" className="hover:text-white transition-colors">Discussions</Link></li>
                <li><Link href="/community/help" className="hover:text-white transition-colors">Help & Support</Link></li>
                <li><Link href="/community/events" className="hover:text-white transition-colors">Events</Link></li>
                <li><Link href="/community/guidelines" className="hover:text-white transition-colors">Guidelines</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="/api" className="hover:text-white transition-colors">API Docs</Link></li>
                <li><Link href="/status" className="hover:text-white transition-colors">Status</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 ConnectHub. All rights reserved. Built with ❤️ by our community.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CommunityPage;
