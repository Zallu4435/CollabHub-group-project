export const reactionTypes = [
    { id: 'like', emoji: '👍', name: 'Like', color: 'blue' },
    { id: 'love', emoji: '❤️', name: 'Love', color: 'red' },
    { id: 'celebrate', emoji: '🎉', name: 'Celebrate', color: 'purple' },
    { id: 'insightful', emoji: '💡', name: 'Insightful', color: 'yellow' },
    { id: 'funny', emoji: '😂', name: 'Funny', color: 'orange' },
    { id: 'curious', emoji: '🤔', name: 'Curious', color: 'gray' }
  ];
  
  export const postReactions = [
    {
      postId: '1',
      reactions: [
        { type: 'like', count: 145, users: ['2', '3', '4'] },
        { type: 'love', count: 32, users: ['5', '6'] },
        { type: 'celebrate', count: 28, users: ['7', '8'] },
        { type: 'insightful', count: 15, users: ['9'] }
      ]
    },
    {
      postId: '2',
      reactions: [
        { type: 'like', count: 89, users: ['1', '3', '4'] },
        { type: 'love', count: 45, users: ['5', '6', '7'] },
        { type: 'insightful', count: 38, users: ['8', '9'] }
      ]
    }
  ];
  
  export const commentReactions = [
    {
      commentId: '1',
      reactions: [
        { type: 'like', count: 5, users: ['1', '3'] },
        { type: 'love', count: 2, users: ['4'] }
      ]
    },
    {
      commentId: '2',
      reactions: [
        { type: 'like', count: 3, users: ['2', '5'] },
        { type: 'insightful', count: 1, users: ['6'] }
      ]
    }
  ];
  