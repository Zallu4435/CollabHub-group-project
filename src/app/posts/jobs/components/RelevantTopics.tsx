import React from 'react';

export default function RelevantTopics() {
  return (
    <div className="bg-white rounded-lg border border-gray-300 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Relevant Topics</h2>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            Explore more
          </button>
        </div>
        
        <div className="space-y-4">
          {[
            {
              title: "Web Development Trends 2024",
              description: "Latest frameworks, tools, and best practices",
              posts: 1247,
              followers: 15600,
              trending: true,
              category: "Development"
            },
            {
              title: "Open Source Contributions",
              description: "How to get started with open source projects",
              posts: 892,
              followers: 12300,
              trending: false,
              category: "Community"
            },
            {
              title: "AI in Software Development",
              description: "Integrating AI tools into your development workflow",
              posts: 2156,
              followers: 23400,
              trending: true,
              category: "Technology"
            },
            {
              title: "Remote Work Best Practices",
              description: "Tips for productive remote development",
              posts: 743,
              followers: 8900,
              trending: false,
              category: "Career"
            },
            {
              title: "Startup Tech Stack",
              description: "Choosing the right technologies for your startup",
              posts: 567,
              followers: 11200,
              trending: false,
              category: "Business"
            }
          ].map((topic, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-gray-900">{topic.title}</h3>
                    {topic.trending && (
                      <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                        Trending
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{topic.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                      </svg>
                      {topic.posts} posts
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H16c-.8 0-1.54.37-2.01.99L12 11l-1.99-2.01A2.5 2.5 0 0 0 8 8H5.46c-.8 0-1.54.37-2.01.99L1 15.5V22h2v-6h2.5l2.54-7.63A1.5 1.5 0 0 1 9.46 8H12c.8 0 1.54.37 2.01.99L16 11l1.99-2.01A2.5 2.5 0 0 1 20 8h2.54c.8 0 1.54.37 2.01.99L27 15.5V22h-7z"/>
                      </svg>
                      {topic.followers.toLocaleString()} followers
                    </span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      {topic.category}
                    </span>
                  </div>
                </div>
                <button className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                  Follow
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
