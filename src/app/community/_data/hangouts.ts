export const audioRooms = [
    {
      id: '1',
      name: 'JavaScript Office Hours',
      topic: 'Ask anything about JavaScript, React, or web development',
      host: {
        id: '1',
        name: 'John Doe',
        avatar: '/avatars/john.jpg'
      },
      participants: 23,
      maxParticipants: 50,
      isLive: true,
      tags: ['JavaScript', 'Q&A', 'Learning']
    },
    {
      id: '2',
      name: 'Design Feedback Session',
      topic: 'Share your designs and get constructive feedback',
      host: {
        id: '2',
        name: 'Jane Smith',
        avatar: '/avatars/jane.jpg'
      },
      participants: 15,
      maxParticipants: 30,
      isLive: true,
      tags: ['Design', 'Feedback', 'UX']
    }
  ];
  
  export const videoRooms = [
    {
      id: '1',
      name: 'Weekly Team Standup',
      description: 'Quick sync on what everyone is working on',
      thumbnail: '/rooms/standup.jpg',
      host: {
        id: '3',
        name: 'Bob Johnson',
        avatar: '/avatars/bob.jpg'
      },
      participants: 8,
      maxParticipants: 15,
      isLive: true,
      isPrivate: true
    },
    {
      id: '2',
      name: 'Code Pairing Session',
      description: 'Live coding together on open source projects',
      thumbnail: '/rooms/pairing.jpg',
      host: {
        id: '1',
        name: 'John Doe',
        avatar: '/avatars/john.jpg'
      },
      participants: 6,
      maxParticipants: 10,
      isLive: false,
      isPrivate: false
    }
  ];
  
  export const participants = [
    {
      id: '1',
      name: 'John Doe',
      username: 'johndoe',
      avatar: '/avatars/john.jpg',
      isMuted: false,
      isHost: true,
      isSpeaking: false
    },
    {
      id: '2',
      name: 'Jane Smith',
      username: 'janesmith',
      avatar: '/avatars/jane.jpg',
      isMuted: false,
      isHost: false,
      isSpeaking: true
    },
    {
      id: '3',
      name: 'Bob Johnson',
      username: 'bobjohnson',
      avatar: '/avatars/bob.jpg',
      isMuted: true,
      isHost: false,
      isSpeaking: false
    }
  ];
  