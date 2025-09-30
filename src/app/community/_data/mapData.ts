export const mapMembers = [
    {
      id: '1',
      name: 'John Doe',
      avatar: '/avatars/john.jpg',
      location: { lat: 37.7749, lng: -122.4194 },
      city: 'San Francisco',
      country: 'United States'
    },
    {
      id: '2',
      name: 'Jane Smith',
      avatar: '/avatars/jane.jpg',
      location: { lat: 40.7128, lng: -74.0060 },
      city: 'New York',
      country: 'United States'
    },
    {
      id: '3',
      name: 'Bob Johnson',
      avatar: '/avatars/bob.jpg',
      location: { lat: 30.2672, lng: -97.7431 },
      city: 'Austin',
      country: 'United States'
    },
    {
      id: '4',
      name: 'Alice Brown',
      avatar: '/avatars/alice.jpg',
      location: { lat: 51.5074, lng: -0.1278 },
      city: 'London',
      country: 'United Kingdom'
    },
    {
      id: '5',
      name: 'Charlie Wilson',
      avatar: '/avatars/charlie.jpg',
      location: { lat: 43.6532, lng: -79.3832 },
      city: 'Toronto',
      country: 'Canada'
    }
  ];
  
  export const mapEvents = [
    {
      id: '1',
      title: 'JavaScript Framework Showdown',
      location: { lat: 37.7749, lng: -122.4194 },
      city: 'San Francisco, CA',
      date: '2024-10-15T18:00:00Z',
      type: 'online' as const
    },
    {
      id: '2',
      title: 'UX Design Workshop',
      location: { lat: 37.7749, lng: -122.4194 },
      city: 'San Francisco, CA',
      date: '2024-10-20T10:00:00Z',
      type: 'in-person' as const
    },
    {
      id: '3',
      title: 'Startup Pitch Night',
      location: { lat: 30.2672, lng: -97.7431 },
      city: 'Austin, TX',
      date: '2024-10-25T19:00:00Z',
      type: 'in-person' as const
    }
  ];
  