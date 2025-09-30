interface TrendingSearch {
    query: string;
    count: number;
    trend: 'up' | 'down' | 'stable';
  }
  
  interface TrendingSearchesProps {
    searches: TrendingSearch[];
    onSearchClick: (query: string) => void;
  }
  
  export default function TrendingSearches({ searches, onSearchClick }: TrendingSearchesProps) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Trending Searches</h3>
        
        <div className="space-y-3">
          {searches.map((search, index) => (
            <button
              key={index}
              onClick={() => onSearchClick(search.query)}
              className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg font-bold text-gray-400">#{index + 1}</span>
                <div>
                  <p className="font-medium text-gray-900">{search.query}</p>
                  <p className="text-sm text-gray-600">{search.count.toLocaleString()} searches</p>
                </div>
              </div>
  
              <div className="flex items-center gap-1">
                {search.trend === 'up' && (
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                )}
                {search.trend === 'down' && (
                  <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }
  