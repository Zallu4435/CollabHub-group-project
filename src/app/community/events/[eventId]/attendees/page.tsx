import EventCalendar from '../../../_components/events/AttendeesList';
import { calendarEvents } from '@/app/community/_data/events';
import Link from 'next/link';

export default function EventAttendeesPage({ params }: { params: { eventId: string } }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center gap-2 text-sm">
            <li>
              <Link href="/community/events" className="text-blue-600 hover:text-blue-700 font-medium">
                Events
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li>
              <Link href={`/community/events/${params.eventId}`} className="text-blue-600 hover:text-blue-700 font-medium">
                Event Details
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-600">Calendar</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Event Calendar</h1>
          <p className="text-gray-600">View all upcoming events and manage your schedule</p>
        </div>

        {/* Calendar */}
        <EventCalendar events={calendarEvents} />
      </div>
    </div>
  );
}
