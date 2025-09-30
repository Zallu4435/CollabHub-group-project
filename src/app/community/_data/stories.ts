export const storyGroups = [
    {
      userId: '1',
      userName: 'John Doe',
      userAvatar: '/avatars/john.jpg',
      hasUnviewed: true,
      stories: [
        {
          id: '1',
          mediaUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1600&auto=format&fit=crop',
          mediaType: 'image' as const,
          text: 'Working on something exciting! 🚀',
          createdAt: '2024-09-30T08:00:00Z'
        },
        {
          id: '2',
          mediaUrl: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1600&auto=format&fit=crop',
          mediaType: 'image' as const,
          createdAt: '2024-09-30T10:30:00Z'
        }
      ]
    },
    {
      userId: '2',
      userName: 'Jane Smith',
      userAvatar: '/avatars/jane.jpg',
      hasUnviewed: true,
      stories: [
        {
          id: '3',
          mediaUrl: 'https://images.unsplash.com/photo-1522199710521-72d69614c702?q=80&w=1600&auto=format&fit=crop',
          mediaType: 'image' as const,
          text: 'New design system components 🎨',
          createdAt: '2024-09-30T09:15:00Z'
        }
      ]
    },
    {
      userId: '3',
      userName: 'Bob Johnson',
      userAvatar: '/avatars/bob.jpg',
      hasUnviewed: false,
      stories: [
        {
          id: '4',
          mediaUrl: 'https://videos.pexels.com/video-files/856993/856993-uhd_2560_1440_25fps.mp4',
          mediaType: 'image' as const,
          text: 'Team offsite day! 🏖️',
          createdAt: '2024-09-29T14:00:00Z'
        }
      ]
    }
  ];
  