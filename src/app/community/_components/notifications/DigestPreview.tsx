interface DigestItem {
    type: 'post' | 'event' | 'badge' | 'trending';
    title: string;
    description: string;
    count?: number;
    image?: string;
  }
  
  interface DigestPreviewProps {
    period: 'day' | 'week';
    items: DigestItem[];
    stats: {
      newFollowers: number;
      totalLikes: number;
      totalComments: number;
    };
  }
  
  export default function DigestPreview({ period, items, stats }: DigestPreviewProps) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg max-w-2xl mx-auto">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-lg">
          <h2 className="text-2xl font-bold mb-1">Your {period === 'day' ? 'Daily' : 'Weekly'} Digest</h2>
          <p className="text-blue-100">Here's what happened in the community</p>
        </div>
  
        <div className="p-6">
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{stats.newFollowers}</div>
              <div className="text-sm text-gray-600">New Followers</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{stats.totalLikes}</div>
              <div className="text-sm text-gray-600">Total Likes</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{stats.totalComments}</div>
              <div className="text-sm text-gray-600">Comments</div>
            </div>
          </div>
  
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Highlights</h3>
            {items.map((item, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3">
                  {item.image && (
                    <div className="w-16 h-16 bg-gray-200 rounded flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.description}</p>
                    {item.count && (
                      <span className="inline-block mt-2 bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                        {item.count} {item.type === 'post' ? 'posts' : item.type === 'event' ? 'events' : 'items'}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
  
          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
              View Full Activity
            </button>
          </div>
        </div>
      </div>
    );
  }
  