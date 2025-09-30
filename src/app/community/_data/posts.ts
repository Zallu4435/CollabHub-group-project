export const posts = [
    {
      id: '1',
      authorId: '1',
      authorName: 'John Doe',
      authorUsername: 'johndoe',
      authorAvatar: '/avatars/john.jpg',
      content: 'Just launched my new portfolio website! Built with Next.js 14, TypeScript, and Tailwind CSS. Check it out and let me know what you think! 🚀\n\nWhat stack are you using for your projects?',
      mediaUrls: ['/posts/portfolio1.jpg', '/posts/portfolio2.jpg'],
      reactions: {
        likes: 145,
        loves: 32,
        celebrate: 28
      },
      commentCount: 23,
      shareCount: 12,
      createdAt: '2024-09-28T10:30:00Z',
      groupId: '1',
      groupName: 'JavaScript Developers'
    },
    {
      id: '2',
      authorId: '2',
      authorName: 'Jane Smith',
      authorUsername: 'janesmith',
      authorAvatar: '/avatars/jane.jpg',
      content: 'Design tip of the day: Always consider accessibility from the start, not as an afterthought. Your users will thank you! ♿\n\n#UXDesign #Accessibility',
      reactions: {
        likes: 89,
        loves: 45,
        celebrate: 12
      },
      commentCount: 15,
      shareCount: 8,
      createdAt: '2024-09-27T14:20:00Z',
      groupId: '2',
      groupName: 'UX/UI Design Community'
    },
    {
      id: '3',
      authorId: '3',
      authorName: 'Bob Johnson',
      authorUsername: 'bobjohnson',
      authorAvatar: '/avatars/bob.jpg',
      content: 'Excited to announce that we just closed our seed round! 🎉 Thank you to all our supporters and the amazing team that made this possible.\n\nNow the real work begins! 💪',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      reactions: {
        likes: 234,
        loves: 89,
        celebrate: 156
      },
      commentCount: 45,
      shareCount: 34,
      createdAt: '2024-09-26T09:15:00Z',
      groupId: '3',
      groupName: 'Startup Founders Network'
    }
    ,
    {
      id: '4',
      authorId: '4',
      authorName: 'Sara Lee',
      authorUsername: 'saralee',
      authorAvatar: '/avatars/sara.jpg',
      content: '10 tips to master Tailwind CSS utility-first workflows. Thread below 👇',
      mediaUrls: [
        'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1600&auto=format&fit=crop'
      ],
      reactions: { likes: 56, loves: 14, celebrate: 8 },
      commentCount: 9,
      shareCount: 3,
      createdAt: '2024-09-25T12:10:00Z',
      groupId: '1',
      groupName: 'JavaScript Developers'
    },
    {
      id: '5',
      authorId: '5',
      authorName: 'DevCon',
      authorUsername: 'devcon',
      authorAvatar: '/avatars/devcon.jpg',
      content: 'Keynote: The future of web frameworks in 2025',
      videoUrl: 'https://youtu.be/ysz5S6PUM-U',
      reactions: { likes: 412, loves: 201, celebrate: 67 },
      commentCount: 112,
      shareCount: 59,
      createdAt: '2024-09-24T18:00:00Z',
      groupId: '4',
      groupName: 'Web Dev Conferences'
    }
  ];
  
  export const reactions = [
    { emoji: '👍', name: 'like', count: 145 },
    { emoji: '❤️', name: 'love', count: 32 },
    { emoji: '🎉', name: 'celebrate', count: 28 }
  ];
  
  export const comments = [
    {
      id: '1',
      userId: '2',
      userName: 'Jane Smith',
      userAvatar: '/avatars/jane.jpg',
      content: 'This looks amazing! Love the clean design.',
      createdAt: '2024-09-28T11:00:00Z',
      likes: 5
    },
    {
      id: '2',
      userId: '3',
      userName: 'Bob Johnson',
      userAvatar: '/avatars/bob.jpg',
      content: 'Great work! What animation library did you use?',
      createdAt: '2024-09-28T11:30:00Z',
      likes: 3
    }
  ];
  