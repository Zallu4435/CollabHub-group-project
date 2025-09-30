"use client";

import Link from 'next/link';
import { events } from '../../_data/events';

export default function UpcomingEvents() {
  const upcoming = [...events].sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()).slice(0, 3);

  return (
    <aside className="bg-white border border-gray-200 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-900">Upcoming events</h3>
        <Link href="/community/events" className="text-xs text-blue-600 hover:text-blue-700 font-medium">View all</Link>
      </div>
      <ul className="space-y-3">
        {upcoming.map(e => (
          <li key={e.id} className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-md overflow-hidden bg-gray-200">
              <img src={e.coverImage} alt={e.title} className="w-full h-full object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <Link href={`/community/events/${e.id}`} className="block text-sm font-medium text-gray-900 truncate">
                {e.title}
              </Link>
              <p className="text-xs text-gray-600 truncate">
                {new Date(e.startDate).toLocaleString(undefined, { month: 'short', day: 'numeric' })} · {e.type}
              </p>
            </div>
            <Link href={`/community/events/${e.id}`} className="text-xs px-3 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800">Details</Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}


