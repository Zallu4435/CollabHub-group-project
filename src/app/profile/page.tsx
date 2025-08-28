"use client";

import React, { useState, useRef } from 'react';

const UserProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [activeSettingsSection, setActiveSettingsSection] = useState('profile');
  const [, setShowOnboardingModal] = useState(false);
  const [showMessageDropdown, setShowMessageDropdown] = useState(false);
  const [profileCompletion, ] = useState(65);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock user data (same as before)
  const user = {
    id: 'sarah_johnson',
    name: 'Sarah Johnson',
    username: '@sarah_dev',
    email: 'sarah@company.com',
    bio: 'Full-stack developer passionate about creating scalable web applications and mentoring junior developers.',
    avatar: '/avatars/sarah.jpg',
    coverImage: '/covers/sarah-cover.jpg',
    location: 'San Francisco, CA',
    timezone: 'PST',
    joinDate: 'January 2023',
    verified: true,
    globalRole: 'Senior Developer',
    projectRoles: [
      { project: 'E-commerce Platform', role: 'Lead Developer' },
      { project: 'Mobile App Redesign', role: 'Frontend Developer' },
      { project: 'AI Analytics Tool', role: 'Contributor' }
    ],
    stats: {
      projectsCreated: 8,
      projectsContributed: 24,
      tasksCompleted: 156,
      blogPosts: 12,
      qaContributions: 89,
      marketplaceListings: 3,
      followers: 1247,
      following: 892
    },
    skills: ['React', 'Node.js', 'TypeScript', 'GraphQL', 'AWS'],
    interests: ['Web Development', 'AI/ML', 'Open Source', 'Mentoring'],
    availability: 'Available for part-time projects',
    socialLinks: {
      github: 'https://github.com/sarahj-dev',
      linkedin: 'https://linkedin.com/in/sarahjohnson',
      twitter: 'https://twitter.com/sarah_dev'
    },
    recentMessages: [
      {
        id: 1,
        sender: 'Mike Johnson',
        avatar: '/avatars/mike.jpg',
        message: 'Hey Sarah! I saw your React project and would love to collaborate...',
        time: '2 hours ago',
        unread: true
      },
      {
        id: 2,
        sender: 'Emma Rodriguez',
        avatar: '/avatars/emma.jpg',
        message: 'Thanks for the code review! Your suggestions were really helpful.',
        time: '1 day ago',
        unread: false
      },
      {
        id: 3,
        sender: 'Alex Chen',
        avatar: '/avatars/alex.jpg',
        message: 'Are you available for a quick call about the project?',
        time: '2 days ago',
        unread: false
      }
    ]
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: '📊' },
    { id: 'projects', name: 'Projects', icon: '🚀' },
    { id: 'tasks', name: 'Tasks', icon: '✅' },
    { id: 'blogs', name: 'Blogs', icon: '✍️' },
    { id: 'qa', name: 'Q&A', icon: '❓' },
    { id: 'marketplace', name: 'Marketplace', icon: '🛍️' },
    { id: 'community', name: 'Community', icon: '💬' },
    { id: 'activity', name: 'Activity', icon: '📈' },
    { id: 'settings', name: 'Settings', icon: '⚙️' }
  ];

  // Improved Header Component
  const ProfileHeader = () => (
    <div className="relative">
      {/* Profile Info */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative pt-8 pb-6">
          <div className="flex flex-col lg:flex-row lg:items-end lg:space-x-8">
            {/* Avatar Section */}
            <div className="flex flex-col items-center lg:items-start mb-6 lg:mb-0">
              <div className="relative mb-4">
                <div className="w-32 h-32 md:w-36 md:h-36 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full border-4 border-white shadow-xl overflow-hidden">
                  <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                    <span className="text-4xl font-bold text-gray-600">{user.name.charAt(0)}</span>
                  </div>
                </div>
                {user.verified && (
                  <div className="absolute bottom-1 right-1 w-8 h-8 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
                >
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  </svg>
                </button>
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" />
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setActiveTab('settings')}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm flex items-center justify-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  Edit Profile
                </button>
                <div className="relative">
                  <button 
                    onClick={() => setShowMessageDropdown(!showMessageDropdown)}
                    className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors shadow-sm flex items-center justify-center relative"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    Messages
                    {user.recentMessages.filter(m => m.unread).length > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                        {user.recentMessages.filter(m => m.unread).length}
                      </span>
                    )}
                  </button>
                  
                  {/* Message Dropdown */}
                  {showMessageDropdown && (
                    <div className="absolute top-full left-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                      <div className="p-4 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-gray-900">Messages</h3>
                          <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
                            View All
                          </button>
                        </div>
                      </div>
                      
                      <div className="max-h-64 overflow-y-auto">
                        {user.recentMessages.map((message) => (
                          <div 
                            key={message.id} 
                            className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                              message.unread ? 'bg-blue-50' : ''
                            }`}
                          >
                            <div className="flex items-start space-x-3">
                              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-sm font-medium text-gray-600">{message.sender.charAt(0)}</span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <p className="text-sm font-medium text-gray-900 truncate">{message.sender}</p>
                                  <p className="text-xs text-gray-500">{message.time}</p>
                                </div>
                                <p className="text-sm text-gray-600 truncate mt-1">{message.message}</p>
                                {message.unread && (
                                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="p-4 border-t border-gray-200">
                        <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium">
                          New Message
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* User Details */}
            <div className="flex-1 text-center lg:text-left">
              <div className="mb-4">
                <div className="flex items-center justify-center lg:justify-start space-x-2 mb-2">
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{user.name}</h1>
                  {user.verified && (
                    <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <p className="text-lg text-gray-600 mb-3">{user.username}</p>
                
                {/* Location & Time Info */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-gray-500 mb-4">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    {user.location}
                  </span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {user.timezone}
                  </span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a4 4 0 118 0v4m-4 14a9 9 0 100-18 9 9 0 000 18z" />
                    </svg>
                    Joined {user.joinDate}
                  </span>
                </div>
                
                <p className="text-gray-700 text-lg leading-relaxed max-w-3xl mx-auto lg:mx-0 mb-4">{user.bio}</p>
                
                {/* Availability Status */}
                <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  {user.availability}
                </div>
              </div>

              {/* Roles */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-4">
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                  {user.globalRole}
                </span>
                {user.projectRoles.slice(0, 2).map((role, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {role.role} • {role.project}
                  </span>
                ))}
                {user.projectRoles.length > 2 && (
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                    +{user.projectRoles.length - 2} more roles
                  </span>
                )}
              </div>

              {/* Social Links */}
              <div className="flex justify-center lg:justify-start space-x-4">
                {Object.entries(user.socialLinks).map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200"
                  >
                    <span className="sr-only">{platform}</span>
                    {platform === 'github' && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    )}
                    {platform === 'linkedin' && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    )}
                    {platform === 'twitter' && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    )}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Comprehensive Settings Component
  const SettingsTab = () => {
    const settingsSections = [
      { id: 'profile', name: 'Profile Information', icon: '👤' },
      { id: 'account', name: 'Account Settings', icon: '⚙️' },
      { id: 'privacy', name: 'Privacy & Security', icon: '🔒' },
      { id: 'notifications', name: 'Notifications', icon: '🔔' },
      { id: 'preferences', name: 'Preferences', icon: '🎨' },
      { id: 'integrations', name: 'Integrations', icon: '🔗' },
      { id: 'billing', name: 'Billing & Plans', icon: '💳' },
      { id: 'danger', name: 'Advanced', icon: '⚠️' }
    ];

    const renderSettingsContent = () => {
      switch (activeSettingsSection) {
        case 'profile':
          return (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Profile Information</h3>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                  Public
                </span>
              </div>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Display Name
                    </label>
                    <input
                      type="text"
                      defaultValue={user.name}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                    />
                    <p className="text-xs text-gray-500 mt-1">This name will be visible to other users</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Username
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-gray-500">@</span>
                      <input
                        type="text"
                        defaultValue={user.username.replace('@', '')}
                        className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Your unique username for mentions and links</p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Professional Bio
                  </label>
                  <textarea
                    rows={4}
                    defaultValue={user.bio}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                    placeholder="Tell others about yourself, your skills, and what you're passionate about..."
                  />
                  <p className="text-xs text-gray-500 mt-1">Help others understand your background and expertise</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      defaultValue={user.location}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                      placeholder="City, State/Country"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Timezone
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors">
                      <option value="PST">PST - Pacific Standard Time</option>
                      <option value="EST">EST - Eastern Standard Time</option>
                      <option value="CST">CST - Central Standard Time</option>
                      <option value="MST">MST - Mountain Standard Time</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Availability Status
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors">
                    <option>Available for full-time projects</option>
                    <option>Available for part-time projects</option>
                    <option>Available for consulting only</option>
                    <option>Not available for new projects</option>
                    <option>Open to opportunities</option>
                  </select>
                </div>
              </div>
            </div>
          );

        case 'account':
          return (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Account Settings</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="email"
                      defaultValue={user.email}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                    />
                    <span className="px-3 py-2 bg-green-100 text-green-700 text-sm rounded-lg font-medium">
                      Verified
                    </span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <button className="w-full px-4 py-3 border border-gray-300 text-left text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    Change Password...
                  </button>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Two-Factor Authentication
                  </label>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">Enhanced Security</div>
                      <div className="text-sm text-gray-600">Protect your account with 2FA</div>
                    </div>
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                      Enable 2FA
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );

        case 'privacy':
          return (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Privacy & Security</h3>
              
              <div className="space-y-6">
                {[
                  {
                    title: 'Profile Visibility',
                    description: 'Control who can see your profile information',
                    options: ['Public', 'Members Only', 'Private'],
                    current: 'Public'
                  },
                  {
                    title: 'Project Visibility',
                    description: 'Control who can see your projects and contributions',
                    options: ['Public', 'Members Only', 'Private'],
                    current: 'Public'
                  },
                  {
                    title: 'Activity Status',
                    description: 'Show when you\'re online and active',
                    options: ['Everyone', 'Connections Only', 'Nobody'],
                    current: 'Everyone'
                  },
                  {
                    title: 'Contact Permissions',
                    description: 'Who can send you direct messages',
                    options: ['Everyone', 'Connections Only', 'Nobody'],
                    current: 'Everyone'
                  }
                ].map((setting, index) => (
                  <div key={index} className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0">
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{setting.title}</div>
                      <div className="text-sm text-gray-600 mt-1">{setting.description}</div>
                    </div>
                    <select 
                      defaultValue={setting.current}
                      className="ml-4 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      {setting.options.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>
          );

        case 'notifications':
          return (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Notification Preferences</h3>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="font-medium text-gray-700">Notification Type</div>
                  <div className="font-medium text-gray-700 text-center">Email</div>
                  <div className="font-medium text-gray-700 text-center">Push</div>
                </div>
                
                {[
                  { name: 'Task Assignments', email: true, push: true },
                  { name: 'Project Updates', email: true, push: false },
                  { name: 'Chat Messages', email: false, push: true },
                  { name: 'Meeting Reminders', email: true, push: true },
                  { name: 'New Followers', email: true, push: false },
                  { name: 'Blog Comments', email: true, push: false },
                  { name: 'Q&A Responses', email: true, push: true },
                  { name: 'Weekly Summary', email: true, push: false }
                ].map((notification, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 py-3 border-b border-gray-100 last:border-b-0">
                    <div className="text-gray-900">{notification.name}</div>
                    <div className="flex justify-center">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked={notification.email} />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                      </label>
                    </div>
                    <div className="flex justify-center">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked={notification.push} />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );

        case 'preferences':
          return (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Interface Preferences</h3>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                      <option value="light">Light Mode</option>
                      <option value="dark">Dark Mode</option>
                      <option value="auto">System Default</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Layout Density</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                      <option value="comfortable">Comfortable</option>
                      <option value="compact">Compact</option>
                      <option value="spacious">Spacious</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                  </select>
                </div>
              </div>
            </div>
          );

        case 'integrations':
          return (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Connected Accounts</h3>
              
              <div className="space-y-4">
                {[
                  { name: 'GitHub', icon: '🐙', connected: true, description: 'Connect your repositories and contributions' },
                  { name: 'Google', icon: '🌐', connected: true, description: 'Use Google for authentication and calendar sync' },
                  { name: 'Slack', icon: '💬', connected: false, description: 'Receive notifications in your Slack workspace' },
                  { name: 'Discord', icon: '🎮', connected: false, description: 'Connect to Discord servers and communities' }
                ].map((account, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{account.icon}</span>
                      <div>
                        <div className="font-medium text-gray-900">{account.name}</div>
                        <div className="text-sm text-gray-600">{account.description}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      {account.connected && (
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                          Connected
                        </span>
                      )}
                      <button className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                        account.connected 
                          ? 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                          : 'bg-indigo-600 text-white hover:bg-indigo-700'
                      }`}>
                        {account.connected ? 'Disconnect' : 'Connect'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );

        case 'billing':
          return (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Billing & Plans</h3>
              
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">Current Plan</h4>
                      <p className="text-gray-600">Pro Plan - $19/month</p>
                    </div>
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm rounded-full font-medium">
                      Active
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="font-medium text-gray-900">Next Billing</div>
                      <div className="text-gray-600">March 15, 2024</div>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Payment Method</div>
                      <div className="text-gray-600">•••• •••• •••• 4242</div>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Billing Cycle</div>
                      <div className="text-gray-600">Monthly</div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h5 className="font-medium text-gray-900 mb-2">Free Plan</h5>
                    <div className="text-2xl font-bold text-gray-900 mb-2">$0<span className="text-sm text-gray-600">/month</span></div>
                    <ul className="text-sm text-gray-600 space-y-1 mb-4">
                      <li>• 3 projects</li>
                      <li>• Basic features</li>
                      <li>• Community support</li>
                    </ul>
                    <button className="w-full px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                      Current Plan
                    </button>
                  </div>
                  
                  <div className="border-2 border-indigo-500 rounded-lg p-4 bg-indigo-50">
                    <h5 className="font-medium text-gray-900 mb-2">Pro Plan</h5>
                    <div className="text-2xl font-bold text-gray-900 mb-2">$19<span className="text-sm text-gray-600">/month</span></div>
                    <ul className="text-sm text-gray-600 space-y-1 mb-4">
                      <li>• Unlimited projects</li>
                      <li>• Advanced features</li>
                      <li>• Priority support</li>
                      <li>• Analytics</li>
                    </ul>
                    <button className="w-full px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                      Current Plan
                    </button>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h5 className="font-medium text-gray-900 mb-2">Enterprise</h5>
                    <div className="text-2xl font-bold text-gray-900 mb-2">Custom</div>
                    <ul className="text-sm text-gray-600 space-y-1 mb-4">
                      <li>• Custom features</li>
                      <li>• Dedicated support</li>
                      <li>• SSO integration</li>
                      <li>• Custom integrations</li>
                    </ul>
                    <button className="w-full px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                      Contact Sales
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );

        case 'danger':
          return (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Advanced Settings</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">Export Your Data</div>
                    <div className="text-sm text-gray-600">Download a copy of your account data</div>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Request Export
                  </button>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">Account Deactivation</div>
                    <div className="text-sm text-gray-600">Temporarily disable your account</div>
                  </div>
                  <button className="px-4 py-2 border border-yellow-600 text-yellow-600 rounded-lg hover:bg-yellow-100 transition-colors">
                    Deactivate
                  </button>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">Delete Account</div>
                    <div className="text-sm text-gray-600">Permanently delete your account and all data</div>
                  </div>
                  <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          );

        default:
          return (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Select a settings section</h3>
              <p className="text-gray-600">Choose a category from the sidebar to configure your settings.</p>
            </div>
          );
      }
    };

    return (
      <div className="max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Settings Navigation */}
          <div className="lg:col-span-1">
            <nav className="space-y-1">
              {settingsSections.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSettingsSection(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 text-left text-sm rounded-lg transition-colors ${
                    activeSettingsSection === item.id
                      ? 'bg-indigo-100 text-indigo-900 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.name}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3">
            {renderSettingsContent()}
            
            {/* Save Button - Only show for sections that need saving */}
            {['profile', 'account', 'privacy', 'notifications', 'preferences'].includes(activeSettingsSection) && (
              <div className="flex justify-end space-x-3 pt-6 mt-6 border-t border-gray-200">
                <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Reset Changes
                </button>
                <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Rest of components remain the same...
  const OverviewTab = () => (
    <div className="space-y-8">
      {/* Skills & Interests */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills & Technologies</h3>
          <div className="flex flex-wrap gap-2">
            {user.skills.map((skill, index) => (
              <span key={index} className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Interests</h3>
          <div className="flex flex-wrap gap-2">
            {user.interests.map((interest, index) => (
              <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                {interest}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[
            { action: 'Completed task "Update user authentication"', project: 'E-commerce Platform', time: '2 hours ago', type: 'task' },
            { action: 'Published blog post "React Performance Tips"', project: 'Personal Blog', time: '1 day ago', type: 'blog' },
            { action: 'Answered question about GraphQL optimization', project: 'Community Q&A', time: '2 days ago', type: 'qa' },
            { action: 'Joined project "AI Analytics Tool"', project: 'Open Source', time: '3 days ago', type: 'project' }
          ].map((activity, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm ${
                activity.type === 'task' ? 'bg-green-500' :
                activity.type === 'blog' ? 'bg-blue-500' :
                activity.type === 'qa' ? 'bg-orange-500' : 'bg-purple-500'
              }`}>
                {activity.type === 'task' ? '✅' : 
                 activity.type === 'blog' ? '✍️' :
                 activity.type === 'qa' ? '❓' : '🚀'}
              </div>
              <div className="flex-1">
                <p className="text-gray-800">{activity.action}</p>
                <p className="text-sm text-gray-500">{activity.project} • {activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview': return <OverviewTab />;
      case 'settings': return <SettingsTab />;
      default:
        return (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {tabs.find(t => t.id === activeTab)?.name}
            </h3>
            <p className="text-gray-600">This section is coming soon!</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <button 
          onClick={() => window.history.back()} 
          className="inline-flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="font-medium text-sm">Back</span>
        </button>
      </div>

      {/* Profile Header */}
      <ProfileHeader />

      {/* Quick Stats */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {[
            { label: 'Projects Created', value: user.stats.projectsCreated, icon: '🚀' },
            { label: 'Contributed', value: user.stats.projectsContributed, icon: '👥' },
            { label: 'Tasks Done', value: user.stats.tasksCompleted, icon: '✅' },
            { label: 'Blog Posts', value: user.stats.blogPosts, icon: '✍️' },
            { label: 'Q&A Helps', value: user.stats.qaContributions, icon: '❓' },
            { label: 'Followers', value: user.stats.followers, icon: '👤' },
            { label: 'Following', value: user.stats.following, icon: '➕' }
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-4 border border-gray-200 text-center hover:shadow-md transition-shadow">
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-xs text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Onboarding Card */}
        {profileCompletion < 100 && (
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-6 mb-8">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-2xl">🎯</span>
                  <h3 className="text-lg font-semibold text-gray-900">Complete Your Profile</h3>
                </div>
                <p className="text-gray-700 mb-4">Get better project suggestions and connect with relevant team members by completing your profile.</p>
                
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Profile Completion</span>
                    <span className="text-sm text-gray-600">{profileCompletion}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${profileCompletion}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowOnboardingModal(true)}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                  >
                    Update Now
                  </button>
                  <button className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors">
                    Skip for Later
                  </button>
                </div>
              </div>
              
              <button className="text-gray-400 hover:text-gray-600 ml-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {renderTabContent()}
      </div>
    </div>
  );
};

export default UserProfilePage;
