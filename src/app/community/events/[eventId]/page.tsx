import Link from 'next/link';
import Image from 'next/image';
import Avatar from '../../_components/common/Avatar';
import RSVPButton from '../../_components/events/RSVPButton';

export default function EventPage({ params }: { params: { eventId: string } }) {
  const { eventId } = params;

  // Mock event data - replace with actual data fetching
  const event = {
    id: eventId,
    title: 'Web Development Workshop: Building Modern React Apps',
    description: 'Join us for an intensive workshop where we\'ll dive deep into modern React development practices, including hooks, context, and performance optimization. Perfect for intermediate developers looking to level up their skills.',
    fullDescription: 'This comprehensive workshop will cover:\n\n• Advanced React Hooks patterns\n• State management with Context API\n• Performance optimization techniques\n• Building scalable component architectures\n• Real-world project examples\n\nYou\'ll walk away with practical knowledge you can immediately apply to your projects. We\'ll provide all materials and a certificate of completion.',
    coverImage: '/events/workshop.jpg',
    type: 'hybrid' as const,
    startDate: '2024-10-15T14:00:00Z',
    endDate: '2024-10-15T17:00:00Z',
    location: 'TechHub Downtown, 123 Main St',
    organizer: {
      id: '1',
      name: 'John Doe',
      avatar: '/avatars/john.jpg',
      title: 'Senior Developer'
    },
    attendeeCount: 87,
    maxAttendees: 100,
    isRSVPed: false,
    tags: ['React', 'JavaScript', 'Web Development', 'Workshop'],
    price: 'Free',
    requirements: ['Laptop with Node.js installed', 'Basic React knowledge', 'Code editor (VS Code recommended)']
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center gap-2 text-sm">
            <li>
              <Link href="/community/events" className="text-blue-600 hover:text-blue-700 font-medium">
                Events
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-600 truncate">{event.title}</li>
          </ol>
        </nav>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Image */}
            <div className="relative h-96 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl overflow-hidden shadow-xl">
              {event.coverImage ? (
                <Image
                  src={event.coverImage}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-24 h-24 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              
              {/* Type Badge */}
              <div className="absolute top-6 left-6">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/95 backdrop-blur-sm rounded-full text-sm font-semibold text-gray-900 shadow-lg">
                  <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                  {event.type}
                </span>
              </div>
            </div>

            {/* Event Info Card */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">{event.title}</h1>
              
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
                <Link href={`/community/profiles/${event.organizer.id}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                  <Avatar src={event.organizer.avatar} alt={event.organizer.name} size="lg" />
                  <div>
                    <p className="font-semibold text-gray-900">{event.organizer.name}</p>
                    <p className="text-sm text-gray-600">{event.organizer.title}</p>
                  </div>
                </Link>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Date & Time</p>
                    <p className="text-gray-600">
                      {new Date(event.startDate).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                    <p className="text-sm text-gray-600">
                      {new Date(event.startDate).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                      {' - '}
                      {new Date(event.endDate).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Location</p>
                    <p className="text-gray-600">{event.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Price</p>
                    <p className="text-gray-600">{event.price}</p>
                  </div>
                </div>
              </div>

              <div className="prose max-w-none mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3">About this event</h2>
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{event.fullDescription}</p>
              </div>

              {event.requirements.length > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    What to bring
                  </h3>
                  <ul className="space-y-2">
                    {event.requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-blue-800">
                        <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {event.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-6">
                  {event.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Event Actions</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <Link
                  href={`/community/events/${eventId}/live`}
                  className="flex items-center gap-3 p-4 bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-xl hover:shadow-md transition-all group"
                >
                  <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Live Session</h3>
                    <p className="text-sm text-gray-600">Join the stream</p>
                  </div>
                </Link>

                <Link
                  href={`/community/events/${eventId}/attendees`}
                  className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl hover:shadow-md transition-all group"
                >
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">View Attendees</h3>
                    <p className="text-sm text-gray-600">{event.attendeeCount} going</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* RSVP Card */}
              <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-3xl font-bold text-gray-900">{event.price}</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-900">{event.attendeeCount}</span> of {event.maxAttendees} spots filled
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all"
                      style={{ width: `${(event.attendeeCount / event.maxAttendees) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <RSVPButton 
                  eventId={eventId} 
                  isRSVPed={event.isRSVPed}
                  fullWidth
                />

                <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-gray-700 hover:bg-gray-50 rounded-xl transition-all">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    Share Event
                  </button>
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-gray-700 hover:bg-gray-50 rounded-xl transition-all">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                    Save Event
                  </button>
                </div>
              </div>

              {/* Attendees Preview */}
              <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Who's Coming</h3>
                <div className="flex -space-x-2 mb-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 border-2 border-white"></div>
                  ))}
                  {event.attendeeCount > 5 && (
                    <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center">
                      <span className="text-xs font-semibold text-gray-700">+{event.attendeeCount - 5}</span>
                    </div>
                  )}
                </div>
                <Link 
                  href={`/community/events/${eventId}/attendees`}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  View all attendees →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
