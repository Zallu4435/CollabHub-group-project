export const polls = [
    {
      id: '1',
      question: 'Which JavaScript framework do you prefer for your next project?',
      options: [
        { id: '1', text: 'React', votes: 145 },
        { id: '2', text: 'Vue.js', votes: 89 },
        { id: '3', text: 'Angular', votes: 56 },
        { id: '4', text: 'Svelte', votes: 78 }
      ],
      createdBy: {
        id: '1',
        name: 'John Doe',
        avatar: '/avatars/john.jpg'
      },
      createdAt: '2024-09-28T10:00:00Z',
      expiresAt: '2024-10-05T10:00:00Z',
      totalVotes: 368,
      hasVoted: false,
      allowMultiple: false
    },
    {
      id: '2',
      question: 'What topics would you like to see in our next workshop?',
      options: [
        { id: '1', text: 'Advanced TypeScript', votes: 234 },
        { id: '2', text: 'System Design', votes: 189 },
        { id: '3', text: 'GraphQL APIs', votes: 156 },
        { id: '4', text: 'Testing Strategies', votes: 198 }
      ],
      createdBy: {
        id: '2',
        name: 'Jane Smith',
        avatar: '/avatars/jane.jpg'
      },
      createdAt: '2024-09-25T14:30:00Z',
      expiresAt: '2024-10-02T14:30:00Z',
      totalVotes: 777,
      hasVoted: true,
      userVote: '1',
      allowMultiple: true
    }
  ];
  
  export const surveyQuestions = [
    {
      id: '1',
      question: 'What is your primary role?',
      type: 'radio' as const,
      required: true,
      options: ['Developer', 'Designer', 'Product Manager', 'Other']
    },
    {
      id: '2',
      question: 'How many years of experience do you have?',
      type: 'radio' as const,
      required: true,
      options: ['0-2 years', '3-5 years', '6-10 years', '10+ years']
    },
    {
      id: '3',
      question: 'What programming languages do you use? (Select all that apply)',
      type: 'checkbox' as const,
      required: false,
      options: ['JavaScript', 'Python', 'Java', 'Go', 'Rust', 'Other']
    },
    {
      id: '4',
      question: 'How would you rate our community?',
      type: 'rating' as const,
      required: true
    },
    {
      id: '5',
      question: 'What features would you like to see added?',
      type: 'textarea' as const,
      required: false
    }
  ];
  