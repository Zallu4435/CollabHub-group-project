export const events = [
    {
      id: '1',
      title: 'JavaScript Framework Showdown 2024',
      description: 'Join us for an exciting discussion comparing React, Vue, and Svelte. We\'ll dive deep into performance, developer experience, and use cases.',
      coverImage: '/events/js-showdown.jpg',
      type: 'online' as const,
      startDate: '2024-10-15T18:00:00Z',
      endDate: '2024-10-15T20:00:00Z',
      location: 'Zoom Meeting',
      organizerId: '1',
      organizerName: 'John Doe',
      organizerAvatar: '/avatars/john.jpg',
      groupId: '1',
      groupName: 'JavaScript Developers',
      attendeeCount: 156,
      maxAttendees: 200,
      isRSVPed: true,
      tags: ['JavaScript', 'Frameworks', 'Web Development'],
      agenda: '6:00 PM - Welcome & Introductions\n6:15 PM - Framework Presentations\n7:00 PM - Live Coding Demo\n7:30 PM - Q&A Session\n8:00 PM - Networking',
      requirements: ['Basic JavaScript knowledge', 'Code editor installed', 'Curiosity and enthusiasm!']
    },
    {
      id: '2',
      title: 'UX Design Workshop: Creating Accessible Interfaces',
      description: 'Learn how to design beautiful and accessible user interfaces that work for everyone.',
      coverImage: '/events/ux-workshop.jpg',
      type: 'in-person' as const,
      startDate: '2024-10-20T10:00:00Z',
      endDate: '2024-10-20T16:00:00Z',
      location: 'Design Hub, 123 Main St, San Francisco, CA',
      organizerId: '2',
      organizerName: 'Jane Smith',
      organizerAvatar: '/avatars/jane.jpg',
      groupId: '2',
      groupName: 'UX/UI Design Community',
      attendeeCount: 28,
      maxAttendees: 30,
      isRSVPed: false,
      tags: ['UX', 'Accessibility', 'Workshop'],
      agenda: '10:00 AM - Registration & Coffee\n10:30 AM - Accessibility Fundamentals\n12:00 PM - Lunch Break\n1:00 PM - Hands-on Design Session\n3:30 PM - Showcase & Feedback\n4:00 PM - Closing',
      requirements: ['Bring your laptop', 'Figma account (free tier is fine)', 'Open mind']
    },
    {
      id: '3',
      title: 'Startup Pitch Night',
      description: 'Present your startup idea to potential investors and get valuable feedback from experienced founders.',
      coverImage: '/events/pitch-night.jpg',
      type: 'hybrid' as const,
      startDate: '2024-10-25T19:00:00Z',
      endDate: '2024-10-25T22:00:00Z',
      location: 'Innovation Center, Austin TX (Also streaming online)',
      organizerId: '3',
      organizerName: 'Bob Johnson',
      organizerAvatar: '/avatars/bob.jpg',
      groupId: '3',
      groupName: 'Startup Founders Network',
      attendeeCount: 45,
      maxAttendees: 50,
      isRSVPed: true,
      tags: ['Startups', 'Pitch', 'Networking'],
      agenda: '7:00 PM - Welcome & Networking\n7:30 PM - Startup Pitches (5 min each)\n9:00 PM - Investor Feedback\n9:30 PM - Open Networking\n10:00 PM - Closing',
      requirements: ['Pitch deck (if presenting)', 'Business cards', 'Elevator pitch ready']
    }
  ];
  
  export const calendarEvents = [
    {
      id: '1',
      title: 'JavaScript Framework Showdown',
      startDate: '2024-10-15',
      type: 'online' as const
    },
    {
      id: '2',
      title: 'UX Design Workshop',
      startDate: '2024-10-20',
      type: 'in-person' as const
    },
    {
      id: '3',
      title: 'Startup Pitch Night',
      startDate: '2024-10-25',
      type: 'hybrid' as const
    }
  ];
  
  export const attendees = [
    {
      id: '1',
      username: 'johndoe',
      name: 'John Doe',
      avatar: '/avatars/john.jpg',
      bio: 'Full-stack developer passionate about web technologies',
      isFollowing: false,
      rsvpStatus: 'going' as const
    },
    {
      id: '2',
      username: 'janesmith',
      name: 'Jane Smith',
      avatar: '/avatars/jane.jpg',
      bio: 'UX Designer crafting beautiful experiences',
      isFollowing: true,
      rsvpStatus: 'going' as const
    },
    {
      id: '4',
      username: 'alicebrown',
      name: 'Alice Brown',
      avatar: '/avatars/alice.jpg',
      bio: 'DevOps Engineer | Cloud enthusiast',
      isFollowing: false,
      rsvpStatus: 'interested' as const
    }
  ];
  