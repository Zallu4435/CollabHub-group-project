import React from 'react';
import { usePostsState } from '../../hooks/usePostsState';

export default function HashtagPage({ params }: { params: { tag: string } }) {
  const { posts } = usePostsState();
  const tag = decodeURIComponent(params.tag);
  const filtered = posts.filter((p) => p.entities?.hashtags?.map((h) => h.toLowerCase()).includes(tag.toLowerCase()));
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">#{tag}</h2>
      <p className="text-gray-600 mb-6">Showing posts tagged with #{tag} (UI only).</p>
      <div className="space-y-4">
        {filtered.map((p) => (
          <div key={p.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="text-sm text-gray-500">{p.author.name}</div>
            <div className="text-gray-800 mt-1 whitespace-pre-wrap">{p.content}</div>
          </div>
        ))}
        {filtered.length === 0 && <div className="text-gray-500">No posts for this tag yet.</div>}
      </div>
    </div>
  );
}


