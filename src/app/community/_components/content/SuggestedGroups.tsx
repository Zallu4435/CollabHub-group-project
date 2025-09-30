"use client";

import Link from 'next/link';
import { groups } from '../../_data/groups';

export default function SuggestedGroups() {
  const suggestions = groups.filter(g => !g.isJoined).slice(0, 4);

  return (
    <aside className="bg-white border border-gray-200 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-900">Suggested groups</h3>
        <Link href="/community/discover" className="text-xs text-blue-600 hover:text-blue-700 font-medium">See all</Link>
      </div>
      <ul className="space-y-3">
        {suggestions.map(g => (
          <li key={g.id} className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md overflow-hidden bg-gray-200">
              <img src={g.coverImage} alt={g.name} className="w-full h-full object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <Link href={`/community/groups/${g.id}`} className="block text-sm font-medium text-gray-900 truncate">
                {g.name}
              </Link>
              <p className="text-xs text-gray-600 truncate">{g.memberCount} members</p>
            </div>
            <Link href={`/community/groups/${g.id}`} className="text-xs px-3 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Join</Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}


