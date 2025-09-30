export const profiles = [
    {
      id: '1',
      username: 'johndoe',
      name: 'John Doe',
      avatar: '/avatars/john.jpg',
      coverPhoto: '/covers/john.jpg',
      bio: 'Full-stack developer passionate about building scalable web applications. Love to mentor and share knowledge with the community.',
      title: 'Senior Software Engineer',
      location: 'San Francisco, CA',
      joinedDate: '2023-01-15',
      followerCount: 1250,
      followingCount: 380,
      isFollowing: false,
      skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'AWS'],
      interests: ['Web Development', 'Open Source', 'AI/ML', 'DevOps'],
      socialLinks: {
        github: 'https://github.com/johndoe',
        twitter: 'https://twitter.com/johndoe',
        linkedin: 'https://linkedin.com/in/johndoe',
        website: 'https://johndoe.dev'
      },
      stats: {
        posts: 145,
        followers: 1250,
        contributions: 89
      }
    },
    {
      id: '2',
      username: 'janesmith',
      name: 'Jane Smith',
      avatar: '/avatars/jane.jpg',
      coverPhoto: '/covers/jane.jpg',
      bio: 'UX Designer crafting beautiful and intuitive user experiences. Coffee enthusiast ☕',
      title: 'Lead UX Designer',
      location: 'New York, NY',
      joinedDate: '2023-03-20',
      followerCount: 890,
      followingCount: 420,
      isFollowing: true,
      skills: ['UI/UX Design', 'Figma', 'Prototyping', 'User Research'],
      interests: ['Design Systems', 'Accessibility', 'Psychology'],
      socialLinks: {
        twitter: 'https://twitter.com/janesmith',
        linkedin: 'https://linkedin.com/in/janesmith',
        website: 'https://janesmith.design'
      },
      stats: {
        posts: 98,
        followers: 890,
        contributions: 56
      }
    },
    {
      id: '3',
      username: 'bobjohnson',
      name: 'Bob Johnson',
      avatar: '/avatars/bob.jpg',
      coverPhoto: '/covers/bob.jpg',
      bio: 'Product Manager | Tech enthusiast | Always learning something new',
      title: 'Senior Product Manager',
      location: 'Austin, TX',
      joinedDate: '2023-02-10',
      followerCount: 670,
      followingCount: 290,
      isFollowing: false,
      skills: ['Product Management', 'Agile', 'Analytics', 'Strategy'],
      interests: ['Startups', 'Innovation', 'Leadership'],
      socialLinks: {
        linkedin: 'https://linkedin.com/in/bobjohnson'
      },
      stats: {
        posts: 67,
        followers: 670,
        contributions: 34
      }
    }
  ];
  
  export const connections = [
    {
      id: '2',
      username: 'janesmith',
      name: 'Jane Smith',
      avatar: '/avatars/jane.jpg',
      bio: 'UX Designer crafting beautiful and intuitive user experiences.',
      isFollowing: true
    },
    {
      id: '4',
      username: 'alicebrown',
      name: 'Alice Brown',
      avatar: '/avatars/alice.jpg',
      bio: 'DevOps Engineer | Cloud Architecture | Kubernetes enthusiast',
      isFollowing: true
    }
  ];
  
  export const mutualConnections = [
    {
      id: '5',
      name: 'Charlie Wilson',
      avatar: '/avatars/charlie.jpg'
    },
    {
      id: '6',
      name: 'Diana Martinez',
      avatar: '/avatars/diana.jpg'
    }
  ];
  