export const surveys = [
    {
      id: '1',
      title: 'Community Feedback Survey 2024',
      description: 'Help us improve the community by sharing your feedback',
      questions: [
        {
          id: '1',
          question: 'What is your primary role?',
          type: 'radio' as const,
          required: true,
          options: ['Developer', 'Designer', 'Product Manager', 'Student', 'Other']
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
          options: ['JavaScript', 'Python', 'Java', 'Go', 'Rust', 'C++', 'PHP', 'Ruby', 'Other']
        },
        {
          id: '4',
          question: 'How would you rate the community?',
          type: 'rating' as const,
          required: true
        },
        {
          id: '5',
          question: 'What features would you like to see added?',
          type: 'textarea' as const,
          required: false
        },
        {
          id: '6',
          question: 'How often do you visit the community?',
          type: 'radio' as const,
          required: true,
          options: ['Daily', 'Weekly', 'Monthly', 'Rarely']
        },
        {
          id: '7',
          question: 'Which community features do you use most? (Select all that apply)',
          type: 'checkbox' as const,
          required: false,
          options: ['Feed', 'Groups', 'Events', 'Mentorship', 'Hangouts', 'Discussions']
        },
        {
          id: '8',
          question: 'Additional comments or suggestions',
          type: 'textarea' as const,
          required: false
        }
      ],
      createdBy: 'Community Team',
      createdAt: '2024-09-01T00:00:00Z',
      expiresAt: '2024-12-31T23:59:59Z',
      responses: 234
    }
  ];
  