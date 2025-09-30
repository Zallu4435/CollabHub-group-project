export const challenges = [
    {
      id: '1',
      title: 'Post Streak',
      description: 'Create a post every day for 7 days',
      type: 'weekly' as const,
      reward: {
        points: 100,
        badge: 'Consistent Creator'
      },
      progress: 4,
      target: 7,
      expiresAt: '2024-10-07T23:59:59Z',
      isCompleted: false
    },
    {
      id: '2',
      title: 'Community Helper',
      description: 'Reply to 10 questions in the community',
      type: 'daily' as const,
      reward: {
        points: 50
      },
      progress: 10,
      target: 10,
      expiresAt: '2024-09-30T23:59:59Z',
      isCompleted: true
    },
    {
      id: '3',
      title: 'Event Participant',
      description: 'Attend 3 community events this month',
      type: 'monthly' as const,
      reward: {
        points: 200,
        badge: 'Active Member'
      },
      progress: 1,
      target: 3,
      expiresAt: '2024-10-31T23:59:59Z',
      isCompleted: false
    },
    {
      id: '4',
      title: 'Knowledge Sharer',
      description: 'Get 50 helpful reactions on your posts',
      type: 'special' as const,
      reward: {
        points: 500,
        badge: 'Expert Contributor'
      },
      progress: 32,
      target: 50,
      expiresAt: '2024-12-31T23:59:59Z',
      isCompleted: false
    }
  ];
  
  export const questSteps = [
    {
      id: '1',
      title: 'Create Your Profile',
      description: 'Complete your profile with bio and skills',
      isCompleted: true,
      reward: 10
    },
    {
      id: '2',
      title: 'Make Your First Post',
      description: 'Share something with the community',
      isCompleted: true,
      reward: 20
    },
    {
      id: '3',
      title: 'Join a Group',
      description: 'Find and join a group that interests you',
      isCompleted: true,
      reward: 15
    },
    {
      id: '4',
      title: 'Attend an Event',
      description: 'RSVP and attend a community event',
      isCompleted: false,
      reward: 30
    },
    {
      id: '5',
      title: 'Connect with Others',
      description: 'Follow 10 community members',
      isCompleted: false,
      reward: 25
    }
  ];
  