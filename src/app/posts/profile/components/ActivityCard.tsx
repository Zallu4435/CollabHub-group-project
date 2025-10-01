import React, { useState } from 'react';

export default function ActivityCard() {
  const [activeTab, setActiveTab] = useState<'posts' | 'comments' | 'images'>('posts');

  const posts = [
    {
      id: 1,
      content: '◇◇◆ Future-Proofing My Next Teammate ◆◇◇',
      image: '/post1.jpg',
      reactions: 40,
      comments: 1,
      time: '1mo'
    },
    {
      id: 2,
      content: 'Post 1:\n"The Debugging Struggle"',
      images: ['/post2-1.jpg', '/post2-2.jpg'],
      reactions: 108,
      comments: 11,
      time: '8mo'
    }
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-300 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Activity</h2>
            <p className="text-sm text-blue-600 font-semibold">1,660 followers</p>
          </div>
          <div className="flex gap-2">
            <button className="px-5 py-2 border-2 border-blue-600 text-blue-600 rounded-full font-semibold hover:bg-blue-50 text-sm">
              Create a post
            </button>
            <button className="text-gray-600 hover:bg-gray-100 p-2 rounded-full">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-300">
          {[
            { id: 'posts', label: 'Posts' },
            { id: 'comments', label: 'Comments' },
            { id: 'images', label: 'Images' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 font-semibold text-sm relative ${
                activeTab === tab.id
                  ? 'text-green-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600"></div>
              )}
            </button>
          ))}
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-2 gap-4">
          {posts.map((post) => (
            <div key={post.id} className="border border-gray-300 rounded-lg overflow-hidden hover:shadow-lg transition-all cursor-pointer">
              <div className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full"></div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">Muhammed Nazal k • You</h4>
                    <p className="text-xs text-gray-600">{post.time} •</p>
                  </div>
                  <button>
                    <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                    </svg>
                  </button>
                </div>
                <p className="text-sm text-gray-900 mb-3 line-clamp-2">{post.content}</p>
                {post.content.includes('...') && (
                  <button className="text-sm text-gray-600 hover:text-blue-600">... more</button>
                )}
              </div>
              {Array.isArray(post.images) ? (
                <div className="grid grid-cols-2 gap-0.5">
                  {post.images.map((img, idx) => (
                    <div key={idx} className="h-40 bg-gray-200"></div>
                  ))}
                </div>
              ) : (
                <div className="h-64 bg-gray-200"></div>
              )}
              <div className="p-3 flex items-center justify-between text-xs text-gray-600">
                <div className="flex items-center gap-1">
                  <span className="flex">
                    <span className="w-4 h-4 bg-blue-500 rounded-full border border-white -ml-1 first:ml-0"></span>
                    <span className="w-4 h-4 bg-red-500 rounded-full border border-white -ml-1"></span>
                  </span>
                  <span>{post.reactions}</span>
                </div>
                <span>{post.comments} comment{post.comments !== 1 ? 's' : ''}</span>
              </div>
              <div className="border-t border-gray-300 flex">
                {['Like', 'Comment', 'Repost', 'Send'].map((action) => (
                  <button key={action} className="flex-1 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100">
                    {action}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button className="w-full mt-4 py-2 text-center text-gray-700 hover:bg-gray-100 rounded-lg font-semibold text-sm flex items-center justify-center gap-2">
          Show all
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
