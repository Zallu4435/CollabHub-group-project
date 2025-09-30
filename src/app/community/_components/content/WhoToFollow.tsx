"use client";

import Link from 'next/link';
import FollowButton from '../profiles/FollowButton';
import Avatar from '../common/Avatar';
import { profiles } from '../../_data/profiles';

export default function WhoToFollow() {
  const suggestions = profiles.slice(0, 5);

  return (
    <aside className="bg-white border border-gray-200 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-900">Who to follow</h3>
        <Link href="/community/discover" className="text-xs text-blue-600 hover:text-blue-700 font-medium">
          See all
        </Link>
      </div>

      <ul className="space-y-3">
        {suggestions.map((p) => (
          <li key={p.id} className="flex items-center gap-3">
            <Link href={`/community/profiles/${p.id}`} className="shrink-0">
              <Avatar src={p.avatar} alt={p.name} size="md" />
            </Link>
            <div className="min-w-0 flex-1">
              <Link href={`/community/profiles/${p.id}`} className="block text-sm font-medium text-gray-900 truncate">
                {p.name}
              </Link>
              <p className="text-xs text-gray-600 truncate">@{p.username}</p>
            </div>
            <FollowButton userId={p.id} isFollowing={p.isFollowing} size="sm" />
          </li>
        ))}
      </ul>
    </aside>
  );
}


