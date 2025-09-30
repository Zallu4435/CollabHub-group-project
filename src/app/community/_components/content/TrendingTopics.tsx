"use client";

import Link from 'next/link';
import { posts } from '../../_data/posts';
import { groups } from '../../_data/groups';

function extractHashtags(text: string): string[] {
  const matches = text.match(/#[a-zA-Z0-9_]+/g) || [];
  return matches.map(t => t.replace('#', '').toLowerCase());
}

export default function TrendingTopics() {
  const counts: Record<string, number> = {};
  posts.forEach(p => {
    extractHashtags(p.content || '').forEach(tag => {
      counts[tag] = (counts[tag] || 0) + 1;
    });
  });
  groups.forEach(g => {
    g.tags.forEach(tag => {
      const key = tag.toLowerCase().replace(/\s+/g, '-');
      counts[key] = (counts[key] || 0) + 1;
    });
  });
  const trending = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);

  return (
    <aside className="bg-white border border-gray-200 rounded-xl p-4">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">Trending</h3>
      {trending.length === 0 ? (
        <p className="text-sm text-gray-600">No trends yet</p>
      ) : (
        <ul className="space-y-2">
          {trending.map(([tag, count]) => (
            <li key={tag} className="flex items-center justify-between">
              <Link
                href={`/community/discover?topic=${encodeURIComponent(tag)}`}
                className="text-sm text-gray-800 hover:text-blue-600 font-medium truncate"
              >
                #{tag}
              </Link>
              <span className="text-xs text-gray-500">{count} posts</span>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}


