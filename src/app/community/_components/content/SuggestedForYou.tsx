"use client";

import Link from 'next/link';

const topics = [
  { label: 'JavaScript', href: '/community/discover?topic=javascript' },
  { label: 'TypeScript', href: '/community/discover?topic=typescript' },
  { label: 'React', href: '/community/discover?topic=react' },
  { label: 'Open Source', href: '/community/discover?topic=open-source' },
  { label: 'AI/ML', href: '/community/discover?topic=ai-ml' }
];

export default function SuggestedForYou() {
  return (
    <aside className="bg-white border border-gray-200 rounded-xl p-4">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">Suggested for you</h3>
      <div className="flex flex-wrap gap-2">
        {topics.map((t) => (
          <Link
            key={t.label}
            href={t.href}
            className="text-xs px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800"
          >
            #{t.label}
          </Link>
        ))}
      </div>
    </aside>
  );
}


