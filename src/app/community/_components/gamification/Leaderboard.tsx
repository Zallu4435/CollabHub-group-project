import Avatar from '../common/Avatar';
import Link from 'next/link';

interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  name: string;
  avatar: string;
  points: number;
  postsCount: number;
  reactionsReceived: number;
  badgesCount: number;
  change?: number;
}

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  currentUserId?: string;
  timeframe?: 'weekly' | 'monthly' | 'all-time';
}

export default function Leaderboard({ 
  entries, 
  currentUserId,
  timeframe = 'all-time' 
}: LeaderboardProps) {
  const getRankIcon = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return rank;
  };

  const getRankBadgeColor = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white';
    if (rank === 2) return 'bg-gradient-to-br from-gray-300 to-gray-400 text-white';
    if (rank === 3) return 'bg-gradient-to-br from-orange-400 to-orange-600 text-white';
    return 'bg-gray-100 text-gray-700';
  };

  // Skip top 3 as they're shown in podium
  const displayEntries = entries.slice(3);

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-5 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Rankings</h2>
            <p className="text-sm text-gray-600">
              {timeframe === 'all-time' ? 'All-time' : timeframe.charAt(0).toUpperCase() + timeframe.slice(1)} standings
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span className="font-semibold">{entries.length} members</span>
          </div>
        </div>
      </div>

      {/* Table Header */}
      <div className="hidden md:grid md:grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-200 text-sm font-semibold text-gray-600">
        <div className="col-span-1">Rank</div>
        <div className="col-span-4">Member</div>
        <div className="col-span-2 text-center">Points</div>
        <div className="col-span-1 text-center">Posts</div>
        <div className="col-span-2 text-center">Reactions</div>
        <div className="col-span-1 text-center">Badges</div>
        <div className="col-span-1 text-center">Trend</div>
      </div>

      {/* Leaderboard Entries */}
      <div className="divide-y divide-gray-200">
        {displayEntries.map((entry) => {
          const isCurrentUser = entry.userId === currentUserId;
          
          return (
            <div 
              key={entry.userId} 
              className={`transition-all duration-200 ${
                isCurrentUser 
                  ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-l-blue-600' 
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className="px-6 py-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  {/* Rank */}
                  <div className="col-span-1">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold shadow-sm ${getRankBadgeColor(entry.rank)}`}>
                      {getRankIcon(entry.rank)}
                    </div>
                  </div>

                  {/* Member Info */}
                  <div className="col-span-4">
                    <Link 
                      href={`/community/profiles/${entry.userId}`}
                      className="flex items-center gap-3 group"
                    >
                      <div className="relative">
                        <Avatar src={entry.avatar} alt={entry.name} size="lg" />
                        {entry.rank <= 10 && (
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-md">
                            {entry.rank}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                            {entry.name}
                          </h3>
                          {isCurrentUser && (
                            <span className="inline-flex items-center gap-1 bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-semibold">
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                              </svg>
                              You
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">@{entry.username}</p>
                      </div>
                    </Link>
                  </div>

                  {/* Points */}
                  <div className="col-span-2 text-center">
                    <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-xl font-bold">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {entry.points.toLocaleString()}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="col-span-1 text-center hidden md:block">
                    <div className="font-semibold text-gray-900">{entry.postsCount}</div>
                  </div>

                  <div className="col-span-2 text-center hidden md:block">
                    <div className="font-semibold text-gray-900">{entry.reactionsReceived}</div>
                  </div>

                  <div className="col-span-1 text-center hidden md:block">
                    <div className="inline-flex items-center gap-1 bg-purple-100 text-purple-700 px-2 py-1 rounded-lg font-semibold text-sm">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {entry.badgesCount}
                    </div>
                  </div>

                  {/* Change/Trend */}
                  <div className="col-span-1 text-center">
                    {entry.change !== undefined && (
                      <div className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg font-bold text-sm ${
                        entry.change > 0 
                          ? 'bg-green-100 text-green-700' 
                          : entry.change < 0 
                          ? 'bg-red-100 text-red-700' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {entry.change > 0 ? (
                          <>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                            </svg>
                            +{entry.change}
                          </>
                        ) : entry.change < 0 ? (
                          <>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                            {entry.change}
                          </>
                        ) : (
                          <>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
                            </svg>
                            -
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Mobile Stats */}
                <div className="md:hidden mt-4 flex items-center justify-around text-center text-sm">
                  <div>
                    <div className="font-semibold text-gray-900">{entry.postsCount}</div>
                    <div className="text-xs text-gray-600">Posts</div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{entry.reactionsReceived}</div>
                    <div className="text-xs text-gray-600">Reactions</div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{entry.badgesCount}</div>
                    <div className="text-xs text-gray-600">Badges</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 text-center">
        <p className="text-sm text-gray-600">
          Want to climb higher? Keep contributing to the community! 🚀
        </p>
      </div>
    </div>
  );
}
