// Mock profile data for different users
export const mockProfileData = {
  alexchen: {
    id: "follower_1",
    name: "Alex Chen",
    username: "alexchen",
    avatarUrl: "/avatars/alex.jpg",
    bio: "Full-stack developer passionate about React and Node.js. Building scalable web applications and sharing knowledge with the community.",
    isVerified: true,
    followersCount: 1250,
    followingCount: 340,
    postsCount: 45,
    joinedDate: "2022-03-15T00:00:00.000Z",
    location: "San Francisco, CA",
    website: "https://alexchen.dev",
    isFollowing: false,
    isFollowedBy: true,
    recentPosts: [
      {
        id: "post_1",
        title: "Building Scalable React Applications with TypeScript",
        excerpt: "Learn how to structure large React applications using TypeScript, proper state management, and modern development practices...",
        publishedAt: "2024-12-10T10:00:00.000Z",
        likesCount: 89,
        commentsCount: 23,
        readTime: "8 min",
        tags: ["React", "TypeScript", "Web Development"]
      },
      {
        id: "post_2",
        title: "Node.js Performance Optimization Techniques",
        excerpt: "Discover advanced techniques to optimize your Node.js applications for better performance and scalability...",
        publishedAt: "2024-12-08T14:30:00.000Z",
        likesCount: 156,
        commentsCount: 34,
        readTime: "12 min",
        tags: ["Node.js", "Performance", "Backend"]
      },
      {
        id: "post_3",
        title: "Modern CSS Grid Layouts for Responsive Design",
        excerpt: "Master CSS Grid to create beautiful, responsive layouts that work across all devices and screen sizes...",
        publishedAt: "2024-12-05T09:15:00.000Z",
        likesCount: 67,
        commentsCount: 18,
        readTime: "6 min",
        tags: ["CSS", "Grid", "Responsive Design"]
      }
    ],
    stats: {
      totalViews: 125000,
      totalLikes: 8900,
      totalComments: 1200,
      avgReadTime: "7 min"
    },
    tags: ["React", "TypeScript", "Node.js", "Web Development"]
  },
  mariarod: {
    id: "follower_2",
    name: "Maria Rodriguez",
    username: "mariarod",
    avatarUrl: "/avatars/maria.jpg",
    bio: "UI/UX Designer creating beautiful digital experiences. Passionate about user-centered design and accessibility.",
    isVerified: false,
    followersCount: 890,
    followingCount: 280,
    postsCount: 32,
    joinedDate: "2022-07-22T00:00:00.000Z",
    location: "Barcelona, Spain",
    website: "https://mariarodriguez.design",
    isFollowing: false,
    isFollowedBy: true,
    recentPosts: [
      {
        id: "post_4",
        title: "The Psychology of Color in Digital Design",
        excerpt: "Understanding how colors affect user behavior and emotions in digital interfaces...",
        publishedAt: "2024-12-09T11:20:00.000Z",
        likesCount: 124,
        commentsCount: 28,
        readTime: "5 min",
        tags: ["Design", "Psychology", "UX"]
      },
      {
        id: "post_5",
        title: "Accessibility-First Design Principles",
        excerpt: "Learn how to create inclusive designs that work for everyone, regardless of their abilities...",
        publishedAt: "2024-12-06T16:45:00.000Z",
        likesCount: 98,
        commentsCount: 19,
        readTime: "7 min",
        tags: ["Accessibility", "Inclusive Design", "UX"]
      }
    ],
    stats: {
      totalViews: 78000,
      totalLikes: 5600,
      totalComments: 890,
      avgReadTime: "6 min"
    },
    tags: ["Design", "UX", "Accessibility", "UI"]
  },
  davidkim: {
    id: "follower_3",
    name: "David Kim",
    username: "davidkim",
    avatarUrl: "/avatars/david.jpg",
    bio: "Product Manager & Tech Writer. Building the future of work through innovative products and thoughtful leadership.",
    isVerified: true,
    followersCount: 2100,
    followingCount: 450,
    postsCount: 78,
    joinedDate: "2021-11-08T00:00:00.000Z",
    location: "Seattle, WA",
    website: "https://davidkim.tech",
    isFollowing: false,
    isFollowedBy: true,
    recentPosts: [
      {
        id: "post_6",
        title: "The Future of Remote Work: Trends and Predictions",
        excerpt: "Exploring how remote work is evolving and what it means for the future of employment...",
        publishedAt: "2024-12-11T08:30:00.000Z",
        likesCount: 234,
        commentsCount: 45,
        readTime: "10 min",
        tags: ["Remote Work", "Future of Work", "Product Management"]
      },
      {
        id: "post_7",
        title: "Building High-Performing Product Teams",
        excerpt: "Key strategies for creating and managing product teams that deliver exceptional results...",
        publishedAt: "2024-12-07T13:15:00.000Z",
        likesCount: 189,
        commentsCount: 32,
        readTime: "9 min",
        tags: ["Product Management", "Leadership", "Team Building"]
      },
      {
        id: "post_8",
        title: "Data-Driven Decision Making in Product Development",
        excerpt: "How to use analytics and user feedback to make better product decisions...",
        publishedAt: "2024-12-04T10:45:00.000Z",
        likesCount: 167,
        commentsCount: 29,
        readTime: "8 min",
        tags: ["Analytics", "Product Development", "Data"]
      }
    ],
    stats: {
      totalViews: 280000,
      totalLikes: 15600,
      totalComments: 2100,
      avgReadTime: "8 min"
    },
    tags: ["Product Management", "Leadership", "Remote Work", "Analytics"]
  },
  sarahw: {
    id: "follower_4",
    name: "Sarah Wilson",
    username: "sarahw",
    avatarUrl: "/avatars/sarah.jpg",
    bio: "Frontend developer specializing in Vue.js and TypeScript. Creating smooth user experiences with modern web technologies.",
    isVerified: false,
    followersCount: 650,
    followingCount: 190,
    postsCount: 28,
    joinedDate: "2023-01-12T00:00:00.000Z",
    location: "Austin, TX",
    website: "https://sarahwilson.dev",
    isFollowing: false,
    isFollowedBy: true,
    recentPosts: [
      {
        id: "post_9",
        title: "Vue 3 Composition API Best Practices",
        excerpt: "Master the Composition API in Vue 3 with these practical tips and patterns...",
        publishedAt: "2024-12-08T15:20:00.000Z",
        likesCount: 76,
        commentsCount: 15,
        readTime: "6 min",
        tags: ["Vue.js", "Composition API", "Frontend"]
      },
      {
        id: "post_10",
        title: "TypeScript Tips for Vue Developers",
        excerpt: "Essential TypeScript patterns and techniques for Vue.js development...",
        publishedAt: "2024-12-05T12:10:00.000Z",
        likesCount: 89,
        commentsCount: 22,
        readTime: "7 min",
        tags: ["TypeScript", "Vue.js", "Development"]
      }
    ],
    stats: {
      totalViews: 45000,
      totalLikes: 3200,
      totalComments: 450,
      avgReadTime: "6 min"
    },
    tags: ["Vue.js", "TypeScript", "Frontend", "Development"]
  },
  jamest: {
    id: "follower_5",
    name: "James Thompson",
    username: "jamest",
    avatarUrl: "/avatars/james.jpg",
    bio: "DevOps engineer and cloud architecture enthusiast. Automating infrastructure and scaling systems for the modern web.",
    isVerified: true,
    followersCount: 1800,
    followingCount: 320,
    postsCount: 56,
    joinedDate: "2021-05-20T00:00:00.000Z",
    location: "London, UK",
    website: "https://jamesthompson.cloud",
    isFollowing: false,
    isFollowedBy: true,
    recentPosts: [
      {
        id: "post_11",
        title: "Kubernetes Deployment Strategies for Zero Downtime",
        excerpt: "Learn how to deploy applications to Kubernetes without any service interruption...",
        publishedAt: "2024-12-09T09:45:00.000Z",
        likesCount: 145,
        commentsCount: 31,
        readTime: "11 min",
        tags: ["Kubernetes", "DevOps", "Deployment"]
      },
      {
        id: "post_12",
        title: "Infrastructure as Code with Terraform",
        excerpt: "Building and managing cloud infrastructure using Terraform best practices...",
        publishedAt: "2024-12-06T14:30:00.000Z",
        likesCount: 112,
        commentsCount: 24,
        readTime: "9 min",
        tags: ["Terraform", "Infrastructure", "Cloud"]
      },
      {
        id: "post_13",
        title: "Monitoring and Observability in Microservices",
        excerpt: "Essential tools and techniques for monitoring distributed systems...",
        publishedAt: "2024-12-03T11:15:00.000Z",
        likesCount: 98,
        commentsCount: 18,
        readTime: "8 min",
        tags: ["Monitoring", "Microservices", "Observability"]
      }
    ],
    stats: {
      totalViews: 195000,
      totalLikes: 11200,
      totalComments: 1450,
      avgReadTime: "9 min"
    },
    tags: ["DevOps", "Kubernetes", "Cloud", "Infrastructure"]
  }
};

export type ProfileData = typeof mockProfileData[keyof typeof mockProfileData];
