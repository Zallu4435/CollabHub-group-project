import EventCalendar from '../../_components/events/EventCalendar';
import { calendarEvents } from '../../_data/events';

export default function EventCalendarPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Event Calendar</h1>
        <EventCalendar events={calendarEvents} />
      </div>
    </div>
  );
}
