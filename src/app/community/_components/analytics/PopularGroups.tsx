import Link from 'next/link';

interface Group {
  id: string;
  name: string;
  memberCount: number;
  growthRate: number;
  category: string;
}

interface PopularGroupsProps {
  groups: Group[];
}

export default function PopularGroups({ groups }: PopularGroupsProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 px-6 py-5 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Popular Groups</h3>
            <p className="text-sm text-gray-600">Join the conversation</p>
          </div>
        </div>
      </div>
      
      {/* Groups List */}
      <div className="p-4 space-y-2">
        {groups.map((group, index) => {
          const isTop3 = index < 3;
          const rankBadges = [
            { bg: 'bg-gradient-to-br from-yellow-400 to-yellow-600', emoji: '🥇' },
            { bg: 'bg-gradient-to-br from-gray-300 to-gray-400', emoji: '🥈' },
            { bg: 'bg-gradient-to-br from-orange-400 to-orange-600', emoji: '🥉' }
          ];
          
          return (
            <Link
              key={group.id}
              href={`/community/groups/${group.id}`}
              className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-all border border-transparent hover:border-gray-200 group"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  isTop3 ? rankBadges[index].bg + ' text-white shadow-md' : 'bg-gray-200 text-gray-600'
                } font-black text-sm`}>
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                      {group.name}
                    </h4>
                    {isTop3 && (
                      <span className="text-lg flex-shrink-0">{rankBadges[index].emoji}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-bold border border-blue-200">
                      {group.category}
                    </span>
                    <span className="text-xs text-gray-600 font-medium">
                      {group.memberCount.toLocaleString()} members
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="text-right ml-3 flex-shrink-0">
                <div className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-100 rounded-lg border border-green-200">
                  <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  <span className="text-xs font-bold text-green-700">{group.growthRate}%</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
        <Link
          href="/community/groups"
          className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-white border-2 border-gray-200 text-gray-700 rounded-xl hover:border-blue-500 hover:text-blue-600 font-semibold transition-all"
        >
          View All Groups
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
