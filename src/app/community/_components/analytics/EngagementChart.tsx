'use client';

interface EngagementData {
  date: string;
  posts: number;
  reactions: number;
  comments: number;
}

interface EngagementChartProps {
  data: EngagementData[];
}

export default function EngagementChart({ data }: EngagementChartProps) {
  const maxValue = Math.max(
    ...data.flatMap(d => [d.posts, d.reactions, d.comments])
  );

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-5 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Engagement Over Time</h3>
              <p className="text-sm text-gray-600">Last 7 days activity</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">Posts</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">Reactions</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">Comments</span>
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="p-6">
        <div className="h-80 flex items-end justify-between gap-3">
          {data.map((item, index) => {
            const postsHeight = (item.posts / maxValue) * 100;
            const reactionsHeight = (item.reactions / maxValue) * 100;
            const commentsHeight = (item.comments / maxValue) * 100;

            return (
              <div key={index} className="flex-1 flex flex-col items-center group">
                <div className="w-full flex justify-center items-end gap-1 h-full mb-3">
                  <div
                    className="flex-1 bg-blue-500 rounded-t-lg hover:bg-blue-600 transition-all cursor-pointer relative group/bar"
                    style={{ height: `${postsHeight}%`, minHeight: '4px' }}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs font-bold opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap">
                      {item.posts} posts
                    </div>
                  </div>
                  <div
                    className="flex-1 bg-purple-500 rounded-t-lg hover:bg-purple-600 transition-all cursor-pointer relative group/bar"
                    style={{ height: `${reactionsHeight}%`, minHeight: '4px' }}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs font-bold opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap">
                      {item.reactions} reactions
                    </div>
                  </div>
                  <div
                    className="flex-1 bg-green-500 rounded-t-lg hover:bg-green-600 transition-all cursor-pointer relative group/bar"
                    style={{ height: `${commentsHeight}%`, minHeight: '4px' }}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs font-bold opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap">
                      {item.comments} comments
                    </div>
                  </div>
                </div>
                <div className="text-xs font-medium text-gray-600 group-hover:text-gray-900 transition-colors">
                  {new Date(item.date).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Summary */}
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-black text-blue-600">
              {data.reduce((sum, item) => sum + item.posts, 0)}
            </div>
            <div className="text-xs text-gray-600 font-medium">Total Posts</div>
          </div>
          <div>
            <div className="text-2xl font-black text-purple-600">
              {data.reduce((sum, item) => sum + item.reactions, 0)}
            </div>
            <div className="text-xs text-gray-600 font-medium">Total Reactions</div>
          </div>
          <div>
            <div className="text-2xl font-black text-green-600">
              {data.reduce((sum, item) => sum + item.comments, 0)}
            </div>
            <div className="text-xs text-gray-600 font-medium">Total Comments</div>
          </div>
        </div>
      </div>
    </div>
  );
}
