import type { Post, Author, Category, Tag, Media, Comment, AnalyticsData, DashboardMetrics } from '../types/blog-admin';

const generateId = () => Math.random().toString(36).substr(2, 9);

export const mockAuthors: Author[] = Array.from({ length: 20 }, (_, i) => ({
  id: `author-${i + 1}`,
  name: ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Williams', 'David Brown', 'Emily Davis', 'Robert Miller', 'Lisa Wilson', 'James Moore', 'Mary Taylor', 'Michael Anderson', 'Patricia Thomas', 'Christopher Jackson', 'Jennifer White', 'Daniel Harris', 'Linda Martin', 'Matthew Thompson', 'Barbara Garcia', 'Anthony Martinez', 'Susan Robinson'][i],
  email: `author${i + 1}@example.com`,
  role: ['admin', 'editor', 'contributor', 'analyst'][i % 4] as any,
  bio: `Passionate writer with ${i + 1} years of experience in content creation.`,
  avatar: `https://i.pravatar.cc/150?img=${i + 1}`,
  badges: i < 5 ? ['Top Contributor', 'Verified'] : i < 10 ? ['Verified'] : [],
  verified: i < 15,
  metrics: {
    posts: Math.floor(Math.random() * 50) + 5,
    views: Math.floor(Math.random() * 10000) + 500,
    engagement: Math.floor(Math.random() * 100) + 10,
  },
  createdAt: new Date(2023, i % 12, (i % 28) + 1).toISOString(),
}));

export const mockCategories: Category[] = [
  { id: 'cat-1', name: 'Technology', slug: 'technology', postCount: 45 },
  { id: 'cat-2', name: 'Design', slug: 'design', postCount: 32 },
  { id: 'cat-3', name: 'Business', slug: 'business', postCount: 28 },
  { id: 'cat-4', name: 'Marketing', slug: 'marketing', postCount: 38 },
  { id: 'cat-5', name: 'Development', slug: 'development', parentId: 'cat-1', postCount: 25 },
  { id: 'cat-6', name: 'UI/UX', slug: 'ui-ux', parentId: 'cat-2', postCount: 18 },
  { id: 'cat-7', name: 'Entrepreneurship', slug: 'entrepreneurship', parentId: 'cat-3', postCount: 15 },
  { id: 'cat-8', name: 'SEO', slug: 'seo', parentId: 'cat-4', postCount: 22 },
];

export const mockTags: Tag[] = [
  { id: 'tag-1', name: 'React', slug: 'react', usage: 45, color: '#61DAFB' },
  { id: 'tag-2', name: 'Next.js', slug: 'nextjs', usage: 38, color: '#000000' },
  { id: 'tag-3', name: 'TypeScript', slug: 'typescript', usage: 52, color: '#3178C6' },
  { id: 'tag-4', name: 'UI Design', slug: 'ui-design', usage: 28, color: '#FF6B6B' },
  { id: 'tag-5', name: 'CSS', slug: 'css', usage: 35, color: '#1572B6' },
  { id: 'tag-6', name: 'JavaScript', slug: 'javascript', usage: 48, color: '#F7DF1E' },
  { id: 'tag-7', name: 'Node.js', slug: 'nodejs', usage: 32, color: '#339933' },
  { id: 'tag-8', name: 'API', slug: 'api', usage: 25, color: '#FF9800' },
  { id: 'tag-9', name: 'Database', slug: 'database', usage: 20, color: '#4CAF50' },
  { id: 'tag-10', name: 'Cloud', slug: 'cloud', usage: 18, color: '#2196F3' },
];

export const mockPosts: Post[] = Array.from({ length: 55 }, (_, i) => {
  const author = mockAuthors[i % mockAuthors.length];
  const category = mockCategories[i % mockCategories.length];
  const state = ['draft', 'scheduled', 'published'][i % 3] as any;
  
  return {
    id: `post-${i + 1}`,
    title: ['Getting Started with Next.js 14', 'Modern UI Design Principles', 'Building Scalable React Applications', 'TypeScript Best Practices', 'Introduction to Server Components', 'Mastering Tailwind CSS', 'React Performance Optimization', 'Understanding React Hooks', 'Building RESTful APIs', 'Database Design Patterns'][i % 10] + ` - Part ${Math.floor(i / 10) + 1}`,
    slug: `post-${i + 1}-slug`,
    state,
    authorId: author.id,
    authorName: author.name,
    categoryId: category.id,
    categoryName: category.name,
    tagIds: mockTags.slice(i % 5, (i % 5) + 3).map(t => t.id),
    featured: i < 10,
    scheduledAt: state === 'scheduled' ? new Date(2025, 10, (i % 28) + 1).toISOString() : undefined,
    createdAt: new Date(2024, (i % 12), (i % 28) + 1).toISOString(),
    updatedAt: new Date(2025, 9, (i % 28) + 1).toISOString(),
    excerpt: `This is an exciting post about modern web development. Learn the latest techniques and best practices.`,
    content: `# Main Content\n\nThis is the full content of the post. It contains valuable information about web development, best practices, and modern techniques.\n\n## Section 1\n\nDetailed explanation here...\n\n## Section 2\n\nMore insights...`,
    views: Math.floor(Math.random() * 5000) + 100,
    revisions: [{ id: `rev-${i}-1`, title: 'Initial draft', content: 'Initial content', createdAt: new Date(2024, (i % 12), (i % 28) + 1).toISOString(), createdBy: author.name }],
    metaTitle: `SEO Title - Post ${i + 1}`,
    metaDescription: `Meta description for post ${i + 1}`,
    seoScore: Math.floor(Math.random() * 40) + 60,
  };
});

export const mockMedia: Media[] = Array.from({ length: 30 }, (_, i) => ({
  id: `media-${i + 1}`,
  type: ['image', 'video', 'file'][i % 3] as any,
  url: `https://picsum.photos/seed/${i + 1}/800/600`,
  title: `Media File ${i + 1}`,
  alt: `Description for media ${i + 1}`,
  sizeKB: Math.floor(Math.random() * 5000) + 100,
  dimensions: { width: 800, height: 600 },
  usedIn: mockPosts.slice(0, Math.floor(Math.random() * 5)).map(p => p.id),
  license: i % 3 === 0 ? 'CC BY-SA' : undefined,
  uploadedAt: new Date(2024, i % 12, (i % 28) + 1).toISOString(),
  uploadedBy: mockAuthors[i % mockAuthors.length].name,
}));

export const mockComments: Comment[] = Array.from({ length: 80 }, (_, i) => ({
  id: `comment-${i + 1}`,
  postId: mockPosts[i % mockPosts.length].id,
  postTitle: mockPosts[i % mockPosts.length].title,
  authorName: `Commenter ${i + 1}`,
  authorEmail: `commenter${i + 1}@example.com`,
  content: `This is comment ${i + 1}. Great article! I really enjoyed reading this and learned a lot.`,
  status: ['pending', 'approved', 'spam'][i % 3] as any,
  createdAt: new Date(2025, 9, (i % 28) + 1).toISOString(),
  flagged: i % 10 === 0,
  spamScore: Math.floor(Math.random() * 100),
}));

export const mockAnalytics: AnalyticsData[] = Array.from({ length: 30 }, (_, i) => ({
  date: new Date(2025, 8, i + 1).toISOString().split('T')[0],
  views: Math.floor(Math.random() * 1000) + 500,
  engagement: Math.floor(Math.random() * 500) + 100,
  comments: Math.floor(Math.random() * 50) + 10,
}));

const getDashboardMetrics = (): DashboardMetrics => ({
  totalPosts: mockPosts.length,
  totalViews: mockPosts.reduce((acc, p) => acc + p.views, 0),
  totalComments: mockComments.length,
  totalAuthors: mockAuthors.length,
  pendingReview: mockComments.filter(c => c.status === 'pending').length + mockPosts.filter(p => p.state === 'draft').length,
  scheduledPosts: mockPosts.filter(p => p.state === 'scheduled').length,
});

export const mockDb = {
  getPosts: () => mockPosts,
  getPost: (id: string) => mockPosts.find(p => p.id === id),
  createPost: (post: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newPost: Post = { ...post, id: generateId(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() } as Post;
    mockPosts.unshift(newPost);
    return newPost;
  },
  updatePost: (id: string, updates: Partial<Post>) => {
    const index = mockPosts.findIndex(p => p.id === id);
    if (index !== -1) {
      mockPosts[index] = { ...mockPosts[index], ...updates, updatedAt: new Date().toISOString() };
      return mockPosts[index];
    }
    return null;
  },
  deletePost: (id: string) => {
    const index = mockPosts.findIndex(p => p.id === id);
    if (index !== -1) {
      mockPosts.splice(index, 1);
      return true;
    }
    return false;
  },
  bulkUpdatePosts: (ids: string[], updates: Partial<Post>) => {
    ids.forEach(id => mockDb.updatePost(id, updates));
  },
  bulkDeletePosts: (ids: string[]) => {
    ids.forEach(id => mockDb.deletePost(id));
  },
  getAuthors: () => mockAuthors,
  getAuthor: (id: string) => mockAuthors.find(a => a.id === id),
  getCategories: () => mockCategories,
  getTags: () => mockTags,
  getMedia: () => mockMedia,
  getComments: () => mockComments,
  updateComment: (id: string, status: any) => {
    const comment = mockComments.find(c => c.id === id);
    if (comment) comment.status = status;
  },
  getAnalytics: () => mockAnalytics,
  getMetrics: getDashboardMetrics,
};
