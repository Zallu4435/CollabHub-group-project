import Link from 'next/link';

interface Topic {
  name: string;
  count: number;
  trend: number;
}

interface TrendingTopicsProps {
  topics: Topic[];
}

export default function TrendingTopics({ topics }: TrendingTopicsProps) {
  const maxCount = Math.max(...topics.map(t => t.count));

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-5 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Trending Topics</h3>
              <p className="text-sm text-gray-600">What's hot right now</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold border border-blue-200">
              Live
            </span>
          </div>
        </div>
      </div>
      
      {/* Topics List */}
      <div className="p-6 space-y-5">
        {topics.map((topic, index) => {
          const isTop3 = index < 3;
          const rankConfig = [
            { color: 'text-yellow-500', badge: 'bg-gradient-to-br from-yellow-400 to-yellow-600', emoji: '🥇' },
            { color: 'text-gray-400', badge: 'bg-gradient-to-br from-gray-300 to-gray-400', emoji: '🥈' },
            { color: 'text-orange-500', badge: 'bg-gradient-to-br from-orange-400 to-orange-600', emoji: '🥉' }
          ];
          
          return (
            <Link
              key={index}
              href={`/community/search?q=${encodeURIComponent(topic.name)}`}
              className="block group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  {isTop3 ? (
                    <div className={`w-10 h-10 rounded-xl ${rankConfig[index].badge} flex items-center justify-center text-white font-black text-lg shadow-md`}>
                      {index + 1}
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600 font-black text-lg">
                      {index + 1}
                    </div>
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                        {topic.name}
                      </span>
                      {isTop3 && (
                        <span className="text-xl">{rankConfig[index].emoji}</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 font-medium">{topic.count.toLocaleString()} posts</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {topic.trend > 0 && (
                    <div className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-100 rounded-full border border-green-200">
                      <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                      <span className="text-xs font-bold text-green-700">+{topic.trend}%</span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="relative w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="absolute h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-500 group-hover:from-blue-600 group-hover:to-purple-700"
                  style={{ width: `${(topic.count / maxCount) * 100}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Footer */}
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm">
          <p className="text-gray-600 font-medium">
            <span className="font-bold text-gray-900">{topics.length}</span> trending topics
          </p>
          <Link
            href="/community/search"
            className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1"
          >
            Explore all
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
