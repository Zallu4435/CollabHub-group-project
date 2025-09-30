export const groups = [
    {
      id: '1',
      name: 'JavaScript Developers',
      description: 'A community for JavaScript developers to share knowledge, best practices, and help each other grow.',
      coverImage: '/groups/js-devs.jpg',
      privacy: 'public' as const,
      memberCount: 2450,
      category: 'Programming',
      tags: ['JavaScript', 'Web Development', 'Node.js', 'React'],
      createdBy: 'John Doe',
      createdAt: '2023-01-15',
      isJoined: true,
      isAdmin: false,
      postCount: 1250,
      eventCount: 12
    },
    {
      id: '2',
      name: 'UX/UI Design Community',
      description: 'Share your designs, get feedback, and learn from experienced designers.',
      coverImage: '/groups/ux-design.jpg',
      privacy: 'public' as const,
      memberCount: 1890,
      category: 'Design',
      tags: ['UX', 'UI', 'Design', 'Figma'],
      createdBy: 'Jane Smith',
      createdAt: '2023-02-20',
      isJoined: false,
      isAdmin: false,
      postCount: 890,
      eventCount: 8
    },
    {
      id: '3',
      name: 'Startup Founders Network',
      description: 'Connect with fellow founders, share experiences, and grow together.',
      coverImage: '/groups/startups.jpg',
      privacy: 'private' as const,
      memberCount: 567,
      category: 'Business',
      tags: ['Startups', 'Entrepreneurship', 'Fundraising'],
      createdBy: 'Bob Johnson',
      createdAt: '2023-03-10',
      isJoined: true,
      isAdmin: true,
      postCount: 345,
      eventCount: 5
    },
    {
      id: '4',
      name: 'Machine Learning Research',
      description: 'Discuss latest ML research papers, share implementations, and collaborate on projects.',
      coverImage: '/groups/ml-research.jpg',
      privacy: 'invite-only' as const,
      memberCount: 432,
      category: 'Technology',
      tags: ['Machine Learning', 'AI', 'Research', 'Python'],
      createdBy: 'Dr. Sarah Chen',
      createdAt: '2023-04-05',
      isJoined: false,
      isAdmin: false,
      postCount: 567,
      eventCount: 15
    }
  ];
  
  export const groupMembers = [
    {
      id: '1',
      username: 'johndoe',
      name: 'John Doe',
      avatar: '/avatars/john.jpg',
      role: 'admin' as const,
      joinedAt: '2023-01-15'
    },
    {
      id: '2',
      username: 'janesmith',
      name: 'Jane Smith',
      avatar: '/avatars/jane.jpg',
      role: 'moderator' as const,
      joinedAt: '2023-01-20'
    },
    {
      id: '3',
      username: 'bobjohnson',
      name: 'Bob Johnson',
      avatar: '/avatars/bob.jpg',
      role: 'member' as const,
      joinedAt: '2023-02-15'
    }
  ];
  
  export const groupAnnouncements = [
    {
      id: '1',
      authorId: '1',
      authorName: 'John Doe',
      authorAvatar: '/avatars/john.jpg',
      title: 'Welcome to JavaScript Developers!',
      content: 'Welcome everyone! Please introduce yourself and share what you\'re currently working on. Let\'s build an amazing community together!',
      createdAt: '2024-01-15T10:00:00Z',
      isPinned: true
    },
    {
      id: '2',
      authorId: '1',
      authorName: 'John Doe',
      authorAvatar: '/avatars/john.jpg',
      title: 'Monthly Meetup - This Saturday!',
      content: 'Don\'t forget our monthly virtual meetup this Saturday at 2 PM EST. We\'ll discuss latest JavaScript features and best practices.',
      createdAt: '2024-09-20T14:30:00Z',
      isPinned: false
    }
  ];
  
  export const groupProjects = [
    {
      id: '1',
      name: 'Open Source Dashboard',
      description: 'Building a customizable analytics dashboard for startups',
      status: 'in-progress' as const,
      members: 8,
      createdAt: '2024-08-15'
    },
    {
      id: '2',
      name: 'Community Bot',
      description: 'Creating a Discord bot to help manage community activities',
      status: 'planning' as const,
      members: 5,
      createdAt: '2024-09-01'
    }
  ];
  