import EventCard from '../../_components/events/EventCard';
import { events } from '../../_data/events';

export default function MyEventsPage() {
  const myEvents = events.filter(e => e.isRSVPed);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Events</h1>

        <div className="space-y-6">
          {myEvents.map((event) => (
            <EventCard key={event.id} {...event} />
          ))}

          {myEvents.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p>You haven't RSVP'd to any events yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
