import EventCard from '../../../_components/events/EventCard';
import { events } from '../../../_data/events';
import Link from 'next/link';

export default function GroupEventsPage({ params }: { params: { groupId: string } }) {
  const groupEvents = events.filter(e => e.groupId === params.groupId);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center gap-2 text-sm">
            <li>
              <Link href="/community/groups" className="text-blue-600 hover:text-blue-700 font-medium">
                Groups
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li>
              <Link href={`/community/groups/${params.groupId}`} className="text-blue-600 hover:text-blue-700 font-medium">
                Group
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-600">Events</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Group Events</h1>
            <p className="text-gray-600">Upcoming and past events organized by this group</p>
          </div>
          <Link href={`/community/events/create?groupId=${params.groupId}`}>
            <button className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 font-semibold shadow-lg hover:shadow-xl transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create Event
            </button>
          </Link>
        </div>

        {/* Events */}
        {groupEvents.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groupEvents.map((event) => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-12 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No Events Yet</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Create your first event to bring the group together
            </p>
            <Link href={`/community/events/create?groupId=${params.groupId}`}>
              <button className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-semibold transition-all inline-flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create First Event
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
