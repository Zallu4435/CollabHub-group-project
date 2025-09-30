import EmptyState from '../_components/common/EmptyState';
import CommunityMap from '../_components/map/CommunityMap';

export default function CommunityMapPage() {
  // Mock data - replace with actual data fetching
  const mockMembers = [
    {
      id: '1',
      name: 'John Doe',
      avatar: '/avatars/john.jpg',
      location: { lat: 40.7128, lng: -74.0060 },
      city: 'New York',
      country: 'United States'
    },
    {
      id: '2',
      name: 'Jane Smith',
      avatar: '/avatars/jane.jpg',
      location: { lat: 51.5074, lng: -0.1278 },
      city: 'London',
      country: 'United Kingdom'
    }
  ];

  const mockEvents = [
    {
      id: '1',
      title: 'Web Dev Meetup',
      location: { lat: 40.7580, lng: -73.9855 },
      city: 'New York',
      date: '2024-10-15T18:00:00Z',
      type: 'in-person' as const
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Community Map</h1>
          <p className="text-gray-600">Discover members and events near you</p>
        </div>

        {/* Map Component */}
        <CommunityMap members={mockMembers} events={mockEvents} />

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Find Members</h3>
            <p className="text-sm text-gray-600">Connect with community members around the world</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Local Events</h3>
            <p className="text-sm text-gray-600">Discover upcoming events in your area</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Explore Regions</h3>
            <p className="text-sm text-gray-600">Filter by country and city to find your community</p>
          </div>
        </div>
      </div>
    </div>
  );
}
