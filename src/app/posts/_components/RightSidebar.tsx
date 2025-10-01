import React from 'react';

export default function RightSidebar() {
  return (
    <div>
      {/* Community News Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900">Community News</h4>
            <button className="text-gray-500 hover:text-gray-700">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </button>
          </div>
          <p className="text-sm text-gray-600 mb-4">Top stories</p>
          
          <div className="space-y-4">
            {[
              { 
                title: "New React 19 features released", 
                time: "2h ago", 
                readers: "1,234 readers",
                category: "Development"
              },
              { 
                title: "Community project hits 10k stars", 
                time: "4h ago", 
                readers: "856 readers",
                category: "Projects"
              },
              { 
                title: "AI tools transforming development", 
                time: "6h ago", 
                readers: "2,156 readers",
                category: "Technology"
              },
              { 
                title: "Open source marketplace trends", 
                time: "8h ago", 
                readers: "743 readers",
                category: "Market"
              },
              { 
                title: "Developer Q&A session insights", 
                time: "1d ago", 
                readers: "1,892 readers",
                category: "Community"
              }
            ].map((news, index) => (
              <div key={index} className="border-b border-gray-100 pb-3 last:border-b-0">
                <h5 className="font-medium text-gray-900 text-sm leading-tight mb-1">{news.title}</h5>
                <div className="flex items-center text-xs text-gray-500">
                  <span>{news.time}</span>
                  <span className="mx-1">•</span>
                  <span>{news.readers}</span>
                </div>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center justify-center">
            Show more
            <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Today's Activities */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4">
        <div className="p-4">
          <h4 className="font-semibold text-gray-900 mb-4">Today's activities</h4>
          <div className="space-y-3">
            {[
              { 
                title: "Code Challenge #42", 
                icon: "💻", 
                players: "156 members participated",
                type: "Challenge"
              },
              { 
                title: "Design Contest #18", 
                icon: "🎨", 
                players: "89 members participated",
                type: "Design"
              },
              { 
                title: "Tech Talk: Web3", 
                icon: "🎤", 
                players: "234 members joined",
                type: "Event"
              },
              { 
                title: "Hackathon Results", 
                icon: "🏆", 
                players: "67 teams competed",
                type: "Competition"
              }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="text-lg">{activity.icon}</div>
                  <div>
                    <h5 className="font-medium text-gray-900 text-sm">{activity.title}</h5>
                    <p className="text-xs text-gray-600">{activity.players}</p>
                  </div>
                </div>
                <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                </svg>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center justify-center">
            Show more
            <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
            </svg>
          </button>
        </div>
      </div>

      {/* People you may know */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4">
        <div className="p-4">
          <h4 className="font-semibold text-gray-900 mb-4">People you may know</h4>
          <div className="space-y-3">
            {[{ name: 'Mike Chen', role: 'Product Manager', color: 'bg-green-400' }, { name: 'Lisa Park', role: 'UX Designer', color: 'bg-purple-400' }].map((p) => (
              <div key={p.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 ${p.color} rounded-full`} />
                  <div>
                    <h5 className="font-medium text-gray-900">{p.name}</h5>
                    <p className="text-sm text-gray-600">{p.role}</p>
                  </div>
                </div>
                <button className="px-3 py-1 border border-blue-600 text-blue-600 rounded-full text-sm font-medium hover:bg-blue-50 transition-colors">Connect</button>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium">Show more suggestions</button>
        </div>
      </div>

      {/* Trending Topics */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4">
          <h4 className="font-semibold text-gray-900 mb-4">Trending in Tech</h4>
          <div className="space-y-3">
            {[
              { tag: 'ArtificialIntelligence', count: '12,543 posts today' },
              { tag: 'RemoteWork', count: '8,291 posts today' },
              { tag: 'WebDevelopment', count: '6,847 posts today' },
            ].map((t) => (
              <div key={t.tag}>
                <h5 className="font-medium text-gray-900">#{t.tag}</h5>
                <p className="text-sm text-gray-600">{t.count}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


