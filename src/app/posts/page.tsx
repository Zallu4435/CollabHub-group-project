"use client";   

import React, { useState } from 'react';
import Link from 'next/link';

const LinkedInStylePostPage: React.FC = () => {
  const [postContent, setPostContent] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handlePost = async () => {
    if (!postContent.trim()) return;
    
    setIsPosting(true);
    // Simulate posting
    setTimeout(() => {
      setIsPosting(false);
      setPostContent('');
      // Show success message or redirect
    }, 2000);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // Handle image upload logic
      console.log('Images selected:', files);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">CP</span>
              </div>
              <span className="text-xl font-semibold text-gray-800 hidden sm:block">Community Platform</span>
            </Link>

            {/* Search Bar */}
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full px-4 py-2 pl-10 bg-gray-100 border-0 rounded-md focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                />
                <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Navigation Icons */}
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </button>
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5v-5a7.5 7.5 0 1-15 0v5z" />
                </svg>
              </button>
              <div className="w-8 h-8 bg-gray-300 rounded-full cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all"></div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {/* Profile Card */}
              <div className="relative">
                <div className="h-16 bg-gradient-to-r from-blue-500 to-blue-600"></div>
                <div className="px-4 pb-4">
                  <div className="relative -mt-8 mb-4">
                    <div className="w-16 h-16 bg-gray-300 rounded-full border-4 border-white"></div>
                  </div>
                  <h3 className="font-semibold text-gray-900">John Doe</h3>
                  <p className="text-sm text-gray-600 mb-3">Full Stack Developer at TechCorp</p>
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Profile views</span>
                      <span className="text-blue-600 font-semibold">142</span>
                    </div>
                    <div className="flex justify-between text-sm mt-1">
                      <span className="text-gray-600">Post impressions</span>
                      <span className="text-blue-600 font-semibold">1,204</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 mt-4 p-4">
              <h4 className="font-semibold text-gray-900 mb-3">Quick Access</h4>
              <div className="space-y-2">
                <Link href="#" className="flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  My Network
                </Link>
                <Link href="#" className="flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  Jobs
                </Link>
                <Link href="#" className="flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Analytics
                </Link>
              </div>
            </div>
          </div>

          {/* Main Content - Post Creation */}
          <div className="lg:col-span-2">
            {/* Create Post Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
              <div className="p-4">
                {/* Post Header */}
                <div className="flex items-start space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex-shrink-0"></div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-gray-900">John Doe</h3>
                      <span className="text-sm text-gray-500">• 1st</span>
                    </div>
                    <p className="text-sm text-gray-600">Full Stack Developer</p>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                  </button>
                </div>

                {/* Post Content */}
                <div className="mb-4">
                  <textarea
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    placeholder="What's on your mind, John?"
                    className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    rows={6}
                    maxLength={3000}
                  />
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-gray-500">
                      {postContent.length}/3000 characters
                    </span>
                    {postContent.length > 0 && (
                      <button
                        onClick={() => setPostContent('')}
                        className="text-sm text-blue-600 hover:text-blue-700"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </div>

                {/* Media Upload Preview */}
                <div className="mb-4">
                  <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-gray-300 transition-colors">
                    <svg className="mx-auto h-12 w-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm text-gray-600">Add photos, videos, or documents</p>
                  </div>
                </div>

                {/* Post Options */}
                <div className="flex items-center justify-between border-t pt-4">
                  <div className="flex items-center space-x-4">
                    {/* Media Upload */}
                    <label className="flex items-center space-x-2 cursor-pointer text-gray-600 hover:text-blue-600 transition-colors">
                      <input
                        type="file"
                        multiple
                        accept="image/*,video/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm font-medium">Photo</span>
                    </label>

                    {/* Video Upload */}
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm font-medium">Video</span>
                    </button>

                    {/* Document Upload */}
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span className="text-sm font-medium">Document</span>
                    </button>

                    {/* Poll */}
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-orange-600 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      <span className="text-sm font-medium">Poll</span>
                    </button>
                  </div>

                  {/* Post Settings */}
                  <div className="flex items-center space-x-3">
                    {/* Privacy Settings */}
                    <select className="text-sm border border-gray-200 rounded-md px-3 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="public">🌍 Anyone</option>
                      <option value="connections">👥 Connections only</option>
                      <option value="private">🔒 Only me</option>
                    </select>

                    {/* Post Button */}
                    <button
                      onClick={handlePost}
                      disabled={!postContent.trim() || isPosting}
                      className={`px-6 py-2 rounded-full font-semibold text-sm transition-all duration-200 ${
                        postContent.trim() && !isPosting
                          ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {isPosting ? (
                        <div className="flex items-center">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Posting...
                        </div>
                      ) : (
                        'Post'
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Sample Posts Feed */}
            <div className="space-y-6">
              {/* Sample Post 1 */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-4">
                  <div className="flex items-start space-x-3 mb-3">
                    <div className="w-12 h-12 bg-blue-400 rounded-full flex-shrink-0"></div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-gray-900">Sarah Johnson</h3>
                        <span className="text-sm text-gray-500">• 2nd</span>
                      </div>
                      <p className="text-sm text-gray-600">Senior Software Engineer at Google</p>
                      <p className="text-sm text-gray-500">2h • 🌍</p>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-gray-800 leading-relaxed">
                      Excited to share that I just completed my first machine learning project! 🎉 
                      Building a recommendation system taught me so much about data preprocessing and model evaluation. 
                      The journey from raw data to actionable insights never gets old.
                    </p>
                    <div className="mt-3">
                      <span className="text-blue-600 hover:underline cursor-pointer">#MachineLearning</span>
                      <span className="text-blue-600 hover:underline cursor-pointer ml-2">#AI</span>
                      <span className="text-blue-600 hover:underline cursor-pointer ml-2">#TechCommunity</span>
                    </div>
                  </div>

                  <div className="border-t pt-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6">
                        <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2H4a2 2 0 00-2 2v7a2 2 0 002 2h3m7-10L7 20" />
                          </svg>
                          <span className="text-sm font-medium">Like</span>
                        </button>
                        <button className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                          <span className="text-sm font-medium">Comment</span>
                        </button>
                        <button className="flex items-center space-x-2 text-gray-600 hover:text-yellow-600 transition-colors">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                          </svg>
                          <span className="text-sm font-medium">Share</span>
                        </button>
                        <button className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                          <span className="text-sm font-medium">Send</span>
                        </button>
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-gray-500">
                      <span>47 likes • 12 comments</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            {/* Who to Follow */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4">
              <div className="p-4">
                <h4 className="font-semibold text-gray-900 mb-4">People you may know</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-400 rounded-full"></div>
                      <div>
                        <h5 className="font-medium text-gray-900">Mike Chen</h5>
                        <p className="text-sm text-gray-600">Product Manager</p>
                      </div>
                    </div>
                    <button className="px-3 py-1 border border-blue-600 text-blue-600 rounded-full text-sm font-medium hover:bg-blue-50 transition-colors">
                      Connect
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-400 rounded-full"></div>
                      <div>
                        <h5 className="font-medium text-gray-900">Lisa Park</h5>
                        <p className="text-sm text-gray-600">UX Designer</p>
                      </div>
                    </div>
                    <button className="px-3 py-1 border border-blue-600 text-blue-600 rounded-full text-sm font-medium hover:bg-blue-50 transition-colors">
                      Connect
                    </button>
                  </div>
                </div>
                <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium">
                  Show more suggestions
                </button>
              </div>
            </div>

            {/* Trending Topics */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-4">
                <h4 className="font-semibold text-gray-900 mb-4">Trending in Tech</h4>
                <div className="space-y-3">
                  <div>
                    <h5 className="font-medium text-gray-900">#ArtificialIntelligence</h5>
                    <p className="text-sm text-gray-600">12,543 posts today</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900">#RemoteWork</h5>
                    <p className="text-sm text-gray-600">8,291 posts today</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900">#WebDevelopment</h5>
                    <p className="text-sm text-gray-600">6,847 posts today</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkedInStylePostPage;
