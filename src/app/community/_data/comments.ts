export const comments = [
    {
      id: '1',
      postId: '1',
      userId: '2',
      userName: 'Jane Smith',
      userAvatar: '/avatars/jane.jpg',
      content: 'This looks amazing! Love the clean design and smooth animations. 🎨',
      createdAt: '2024-09-28T11:00:00Z',
      likes: 5,
      replies: [
        {
          id: '1-1',
          userId: '1',
          userName: 'John Doe',
          userAvatar: '/avatars/john.jpg',
          content: 'Thanks! I used Framer Motion for the animations.',
          createdAt: '2024-09-28T11:15:00Z',
          likes: 2
        }
      ]
    },
    {
      id: '2',
      postId: '1',
      userId: '3',
      userName: 'Bob Johnson',
      userAvatar: '/avatars/bob.jpg',
      content: 'Great work! What animation library did you use for the transitions?',
      createdAt: '2024-09-28T11:30:00Z',
      likes: 3,
      replies: [
        {
          id: '2-1',
          userId: '1',
          userName: 'John Doe',
          userAvatar: '/avatars/john.jpg',
          content: 'Framer Motion! It\'s super easy to use and has great documentation.',
          createdAt: '2024-09-28T11:45:00Z',
          likes: 1
        },
        {
          id: '2-2',
          userId: '3',
          userName: 'Bob Johnson',
          userAvatar: '/avatars/bob.jpg',
          content: 'Awesome, I\'ll check it out. Thanks!',
          createdAt: '2024-09-28T12:00:00Z',
          likes: 0
        }
      ]
    },
    {
      id: '3',
      postId: '1',
      userId: '4',
      userName: 'Alice Brown',
      userAvatar: '/avatars/alice.jpg',
      content: 'The color scheme is perfect! Mind sharing the palette you used?',
      createdAt: '2024-09-28T13:00:00Z',
      likes: 4,
      replies: []
    },
    {
      id: '4',
      postId: '2',
      userId: '1',
      userName: 'John Doe',
      userAvatar: '/avatars/john.jpg',
      content: 'Accessibility should always be a priority! Great tip! ♿',
      createdAt: '2024-09-27T15:00:00Z',
      likes: 8,
      replies: []
    },
    {
      id: '5',
      postId: '2',
      userId: '3',
      userName: 'Bob Johnson',
      userAvatar: '/avatars/bob.jpg',
      content: 'What are your favorite accessibility testing tools?',
      createdAt: '2024-09-27T16:00:00Z',
      likes: 6,
      replies: [
        {
          id: '5-1',
          userId: '2',
          userName: 'Jane Smith',
          userAvatar: '/avatars/jane.jpg',
          content: 'I use axe DevTools and WAVE. Both are excellent!',
          createdAt: '2024-09-27T16:30:00Z',
          likes: 3
        }
      ]
    }
  ];
  
  export const discussionComments = [
    {
      id: 'd1',
      discussionId: '1',
      userId: '2',
      userName: 'Jane Smith',
      userAvatar: '/avatars/jane.jpg',
      content: 'For component rendering optimization, I highly recommend using React.memo() for expensive components and useMemo/useCallback hooks to prevent unnecessary re-renders.',
      createdAt: '2024-09-28T11:00:00Z',
      likes: 15,
      isAccepted: true,
      replies: []
    },
    {
      id: 'd2',
      discussionId: '1',
      userId: '3',
      userName: 'Bob Johnson',
      userAvatar: '/avatars/bob.jpg',
      content: 'Code splitting with React.lazy() and Suspense has been a game-changer for my projects. Load time improvements are significant!',
      createdAt: '2024-09-28T12:30:00Z',
      likes: 12,
      isAccepted: false,
      replies: [
        {
          id: 'd2-1',
          userId: '1',
          userName: 'John Doe',
          userAvatar: '/avatars/john.jpg',
          content: 'Agreed! I also use route-based code splitting with Next.js which makes it even easier.',
          createdAt: '2024-09-28T13:00:00Z',
          likes: 5
        }
      ]
    }
  ];
  