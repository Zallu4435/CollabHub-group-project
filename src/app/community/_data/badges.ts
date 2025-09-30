export const badges = [
    {
      id: '1',
      name: 'Early Adopter',
      description: 'Joined the community in its first month',
      icon: '/badges/early-adopter.png',
      rarity: 'rare' as const,
      unlockedDate: '2023-01-20',
      isLocked: false
    },
    {
      id: '2',
      name: 'Conversation Starter',
      description: 'Created 50 discussion topics',
      icon: '/badges/conversation.png',
      rarity: 'common' as const,
      unlockedDate: '2023-06-15',
      isLocked: false
    },
    {
      id: '3',
      name: 'Knowledge Sharer',
      description: 'Received 100+ helpful reactions',
      icon: '/badges/knowledge.png',
      rarity: 'epic' as const,
      unlockedDate: '2023-11-03',
      isLocked: false
    },
    {
      id: '4',
      name: 'Event Organizer',
      description: 'Successfully hosted 10 community events',
      icon: '/badges/organizer.png',
      rarity: 'legendary' as const,
      isLocked: true,
      progress: 65
    },
    {
      id: '5',
      name: 'Helping Hand',
      description: 'Helped 50 community members',
      icon: '/badges/helper.png',
      rarity: 'rare' as const,
      isLocked: true,
      progress: 82
    },
    {
      id: '6',
      name: 'Content Creator',
      description: 'Published 100 posts',
      icon: '/badges/creator.png',
      rarity: 'common' as const,
      isLocked: true,
      progress: 45
    }
  ];
  
  export const achievements = [
    {
      name: 'First Post',
      description: 'Published your first community post',
      icon: '/badges/first-post.png',
      rarity: 'common' as const,
      points: 10
    },
    {
      name: 'Popular Creator',
      description: 'Got 100 reactions on a single post',
      icon: '/badges/popular.png',
      rarity: 'rare' as const,
      points: 50
    }
  ];
  