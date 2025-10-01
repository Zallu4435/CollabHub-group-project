import { PostItem, CommentItem, UserSummary } from "../types";

export interface SeedPayload {
  currentUser: UserSummary;
  posts: PostItem[];
  comments: CommentItem[];
}

export const seedData: SeedPayload = {
  currentUser: { id: 'u_me', name: 'John Doe', headline: 'Full Stack Developer' },
  posts: [
    // Text post with hashtags
    {
      id: 'p1',
      author: { id: 'u_sarah', name: 'Sarah Johnson', headline: 'Senior Software Engineer at Google' },
      content: 'Excited to share that I just completed my first machine learning project! 🎉\nBuilding a recommendation system taught me so much about data preprocessing and model evaluation.',
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      visibility: 'public',
      media: [],
      entities: { hashtags: ['MachineLearning', 'AI', 'TechCommunity'], mentions: [] },
      metrics: { views: 1204, comments: 2, reactionsByType: { like: 38, insightful: 9 } },
    },
    // Image grid post
    {
      id: 'p2',
      author: { id: 'u_maria', name: 'Maria Gomez', headline: 'UI/UX Designer at FinTechCo' },
      content: 'Sneak peek of the new dashboard redesign. Feedback welcome! ✨',
      createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      visibility: 'public',
      media: [
        { id: 'm21', type: 'image', url: 'https://images.unsplash.com/photo-1557800636-894a64c1696f?w=800' },
        { id: 'm22', type: 'image', url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800' },
        { id: 'm23', type: 'image', url: 'https://images.unsplash.com/photo-1526378722484-bd91ca387e72?w=800' },
      ],
      entities: { hashtags: ['Design', 'UI', 'Dashboard'], mentions: [] },
      metrics: { views: 2380, comments: 3, reactionsByType: { like: 56, love: 14, celebrate: 4 } },
    },
    // Link preview post
    {
      id: 'p3',
      author: { id: 'u_dev', name: 'Alex Kim', headline: 'Frontend Engineer at CloudOps' },
      content: 'Great write-up on optimizing React rendering and avoiding unnecessary re-renders.',
      createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      visibility: 'public',
      linkPreview: {
        url: 'https://react.dev/learn/you-might-not-need-an-effect',
        title: 'You Might Not Need an Effect',
        description: 'Most of your application logic should not be in Effects. Learn alternative patterns.',
        imageUrl: 'https://react.dev/images/og-social.png',
        siteName: 'React Docs',
      },
      entities: { hashtags: ['React', 'Performance'], mentions: [] },
      metrics: { views: 3140, comments: 1, reactionsByType: { insightful: 22, like: 31 } },
    },
    // Pinned announcement-like post
    {
      id: 'p4',
      author: { id: 'u_me', name: 'John Doe', headline: 'Full Stack Developer' },
      content: 'I’m starting a weekly newsletter about building scalable web apps. First issue drops Friday! Subscribe if interested.',
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      visibility: 'public',
      pinned: true,
      media: [
        { id: 'm41', type: 'image', url: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=800' },
      ],
      entities: { hashtags: ['WebDev', 'Newsletter'], mentions: [] },
      metrics: { views: 5420, comments: 4, reactionsByType: { celebrate: 10, like: 44, support: 6 } },
    },
  ],
  comments: [
    { id: 'c1', postId: 'p1', author: { id: 'u_mike', name: 'Mike Chen', headline: 'Product Manager' }, content: 'Congrats Sarah! Any lessons learned on cold-start?', createdAt: new Date(Date.now() - 90 * 60 * 1000).toISOString() },
    { id: 'c2', postId: 'p1', author: { id: 'u_sarah', name: 'Sarah Johnson', headline: 'Senior Software Engineer at Google' }, content: 'Thank you! Bootstrapping with content-based features helped a lot.', createdAt: new Date(Date.now() - 80 * 60 * 1000).toISOString(), parentId: 'c1' },
    { id: 'c3', postId: 'p2', author: { id: 'u_dev', name: 'Alex Kim', headline: 'Frontend Engineer at CloudOps' }, content: 'Loving the new visual hierarchy!', createdAt: new Date(Date.now() - 2.5 * 60 * 60 * 1000).toISOString() },
    { id: 'c4', postId: 'p3', author: { id: 'u_maria', name: 'Maria Gomez', headline: 'UI/UX Designer at FinTechCo' }, content: 'Saved. Super useful breakdown.', createdAt: new Date(Date.now() - 5.5 * 60 * 60 * 1000).toISOString() },
    { id: 'c5', postId: 'p4', author: { id: 'u_sarah', name: 'Sarah Johnson', headline: 'Senior Software Engineer at Google' }, content: 'Subscribed! Looking forward to it.', createdAt: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString() },
  ],
};


