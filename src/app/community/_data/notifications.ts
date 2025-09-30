export const notifications = [
    {
      id: '1',
      type: 'like' as const,
      actorId: '2',
      actorName: 'Jane Smith',
      actorAvatar: '/avatars/jane.jpg',
      content: 'liked your post',
      targetUrl: '/community/posts/1',
      createdAt: '2024-09-30T09:30:00Z',
      isRead: false
    },
    {
      id: '2',
      type: 'comment' as const,
      actorId: '3',
      actorName: 'Bob Johnson',
      actorAvatar: '/avatars/bob.jpg',
      content: 'commented on your post: "Great work!"',
      targetUrl: '/community/posts/1',
      createdAt: '2024-09-30T08:15:00Z',
      isRead: false
    },
    {
      id: '3',
      type: 'follow' as const,
      actorId: '4',
      actorName: 'Alice Brown',
      actorAvatar: '/avatars/alice.jpg',
      content: 'started following you',
      targetUrl: '/community/profiles/4',
      createdAt: '2024-09-29T16:45:00Z',
      isRead: true
    },
    {
      id: '4',
      type: 'mention' as const,
      actorId: '5',
      actorName: 'Charlie Wilson',
      actorAvatar: '/avatars/charlie.jpg',
      content: 'mentioned you in a post',
      targetUrl: '/community/posts/5',
      createdAt: '2024-09-29T14:20:00Z',
      isRead: true
    },
    {
      id: '5',
      type: 'event' as const,
      actorId: '1',
      actorName: 'John Doe',
      actorAvatar: '/avatars/john.jpg',
      content: 'Event reminder: JavaScript Framework Showdown starts in 1 hour',
      targetUrl: '/community/events/1',
      createdAt: '2024-09-29T12:00:00Z',
      isRead: true
    },
    {
      id: '6',
      type: 'badge' as const,
      actorId: 'system',
      actorName: 'Community',
      actorAvatar: '/logo.png',
      content: 'You earned the "Knowledge Sharer" badge!',
      targetUrl: '/community/gamification/badges',
      createdAt: '2024-09-28T18:30:00Z',
      isRead: true
    }
  ];
  