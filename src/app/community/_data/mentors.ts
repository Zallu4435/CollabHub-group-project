export const mentors = [
    {
      id: '1',
      name: 'John Doe',
      username: 'johndoe',
      avatar: '/avatars/john.jpg',
      title: 'Senior Software Engineer',
      expertise: ['JavaScript', 'React', 'Node.js', 'System Design', 'Career Growth'],
      bio: 'Passionate about helping developers grow their skills and advance their careers. 10+ years of experience in web development.',
      mentees: 12,
      rating: 4.9,
      availability: 'available' as const
    },
    {
      id: '2',
      name: 'Jane Smith',
      username: 'janesmith',
      avatar: '/avatars/jane.jpg',
      title: 'Lead UX Designer',
      expertise: ['UX Design', 'UI Design', 'Figma', 'User Research', 'Design Systems'],
      bio: 'Helping designers create beautiful and accessible user experiences. Former design lead at top tech companies.',
      mentees: 8,
      rating: 4.8,
      availability: 'limited' as const
    },
    {
      id: '6',
      name: 'Dr. Sarah Chen',
      username: 'sarahchen',
      avatar: '/avatars/sarah.jpg',
      title: 'Machine Learning Research Scientist',
      expertise: ['Machine Learning', 'Deep Learning', 'Python', 'Research', 'Academia'],
      bio: 'PhD in Computer Science specializing in ML. Published researcher and industry practitioner.',
      mentees: 15,
      rating: 5.0,
      availability: 'unavailable' as const
    }
  ];
  
  export const mentees = [
    {
      id: '4',
      name: 'Alice Brown',
      username: 'alicebrown',
      avatar: '/avatars/alice.jpg',
      goals: 'Learn advanced React patterns and land a senior developer role',
      startDate: '2024-06-15',
      progress: 75,
      status: 'active' as const
    },
    {
      id: '5',
      name: 'Charlie Wilson',
      username: 'charliewilson',
      avatar: '/avatars/charlie.jpg',
      goals: 'Transition from backend to full-stack development',
      startDate: '2024-08-01',
      progress: 45,
      status: 'active' as const
    }
  ];
  
  export const upcomingSessions = [
    {
      id: '1',
      menteeName: 'Alice Brown',
      date: '2024-10-05T15:00:00Z',
      topic: 'Code Review: React Component Architecture'
    },
    {
      id: '2',
      menteeName: 'Charlie Wilson',
      date: '2024-10-07T10:00:00Z',
      topic: 'Career Planning & Goal Setting'
    }
  ];
  