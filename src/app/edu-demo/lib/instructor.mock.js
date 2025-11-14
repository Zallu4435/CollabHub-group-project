'use client';

// Mock instructor data
export const INSTRUCTOR_PROFILE = {
  id: 'instructor-1',
  name: 'Sarah Chen',
  email: 'sarah.chen@eduplatform.com',
  avatar: 'https://api.dicebear.com/7.x/thumbs/svg?seed=sarah',
  title: 'Senior Full-Stack Developer',
  bio: 'Experienced developer with 8+ years in web development. Passionate about teaching modern JavaScript and React.',
  expertise: ['JavaScript', 'React', 'Node.js', 'TypeScript', 'MongoDB'],
  joinedDate: '2023-01-15',
  stats: {
    totalStudents: 25400,
    totalCourses: 12,
    averageRating: 4.8,
    totalRevenue: 125000,
    completionRate: 87,
  },
  socialLinks: {
    linkedin: 'https://linkedin.com/in/sarahchen',
    github: 'https://github.com/sarahchen',
    twitter: 'https://twitter.com/sarahchen',
  },
};

// Mock instructor courses
export const INSTRUCTOR_COURSES = [
  {
    id: 'course-1',
    title: 'Complete React Development Bootcamp',
    description: 'Master React from basics to advanced concepts including hooks, context, and modern patterns.',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop',
    status: 'published', // draft | pending_approval | approved | published | rejected | archived
    approvalStatus: 'approved', // pending | approved | rejected
    approvedDate: '2024-01-22',
    approvedBy: 'Platform Admin',
    rejectionReason: null,
    price: 199,
    duration: '12 weeks',
    difficulty: 'Intermediate',
    skills: ['React', 'JavaScript', 'Hooks', 'Context API'],
    createdAt: '2024-01-10',
    lastUpdated: '2024-01-20',
    analytics: {
      enrollments: 8900,
      completions: 7743,
      averageRating: 4.8,
      totalRevenue: 1771100,
      progressionRate: 92,
      dropOffPoints: [
        { lesson: 'lesson-1-3', title: 'Props and State', dropOffRate: 8 },
        { lesson: 'lesson-2-2', title: 'useState and useEffect', dropOffRate: 12 },
        { lesson: 'lesson-3-4', title: 'Performance Optimization', dropOffRate: 15 },
      ],
      weeklyEnrollments: [120, 145, 189, 167, 203, 178, 156, 134, 98, 87, 76, 65],
      completionsByWeek: [0, 12, 45, 89, 156, 234, 345, 467, 589, 678, 721, 743],
      averageTestScores: [78, 82, 85, 87, 89, 88, 86, 84, 87, 89, 91, 88],
    },
  },
  {
    id: 'course-7',
    title: 'Advanced JavaScript Patterns',
    description: 'Deep dive into advanced JavaScript concepts, design patterns, and performance optimization.',
    thumbnail: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=250&fit=crop',
    status: 'published',
    approvalStatus: 'approved',
    approvedDate: '2024-02-22',
    approvedBy: 'Platform Admin',
    rejectionReason: null,
    price: 249,
    duration: '8 weeks',
    difficulty: 'Advanced',
    skills: ['JavaScript', 'Design Patterns', 'Performance', 'ES6+'],
    createdAt: '2024-02-15',
    lastUpdated: '2024-02-20',
    analytics: {
      enrollments: 3200,
      completions: 2720,
      averageRating: 4.9,
      totalRevenue: 796800,
      progressionRate: 89,
      dropOffPoints: [
        { lesson: 'lesson-2-1', title: 'Closures and Scope', dropOffRate: 11 },
        { lesson: 'lesson-4-3', title: 'Async Patterns', dropOffRate: 18 },
      ],
      weeklyEnrollments: [89, 156, 234, 189, 167, 145, 123, 98],
      completionsByWeek: [0, 8, 34, 78, 145, 198, 245, 272],
      averageTestScores: [82, 85, 88, 86, 89, 91, 93, 90],
    },
  },
  {
    id: 'course-8',
    title: 'TypeScript for React Developers',
    description: 'Learn TypeScript fundamentals and how to use it effectively with React applications.',
    thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=250&fit=crop',
    status: 'draft',
    approvalStatus: 'pending',
    approvedDate: null,
    approvedBy: null,
    rejectionReason: null,
    price: 179,
    duration: '6 weeks',
    difficulty: 'Intermediate',
    skills: ['TypeScript', 'React', 'Type Safety', 'Interfaces'],
    createdAt: '2024-03-01',
    lastUpdated: '2024-03-10',
    analytics: {
      enrollments: 0,
      completions: 0,
      averageRating: 0,
      totalRevenue: 0,
      progressionRate: 0,
      dropOffPoints: [],
      weeklyEnrollments: [0, 0, 0, 0, 0, 0],
      completionsByWeek: [0, 0, 0, 0, 0, 0],
      averageTestScores: [0, 0, 0, 0, 0, 0],
    },
  },
];

// Mock lesson structure for course editing
export const LESSON_TEMPLATES = {
  video: {
    type: 'video',
    title: 'New Video Lesson',
    duration: 30,
    description: 'Video lesson description',
    resources: [],
    quiz: null,
  },
  reading: {
    type: 'reading',
    title: 'New Reading Material',
    duration: 15,
    description: 'Reading material description',
    content: '',
    resources: [],
  },
  quiz: {
    type: 'quiz',
    title: 'New Quiz',
    duration: 20,
    description: 'Quiz description',
    questions: [],
    passingScore: 70,
  },
  project: {
    type: 'project',
    title: 'New Project',
    duration: 120,
    description: 'Project description',
    requirements: [],
    resources: [],
  },
};

// Mock analytics data
export const ANALYTICS_DATA = {
  overview: {
    totalStudents: 25400,
    totalRevenue: 2567900,
    averageRating: 4.8,
    completionRate: 87,
    monthlyGrowth: 12.5,
  },
  enrollmentTrends: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Enrollments',
        data: [1200, 1450, 1890, 1670, 2030, 1780, 1560, 1340, 980, 870, 760, 650],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
      },
    ],
  },
  completionRates: {
    labels: ['React Bootcamp', 'Advanced JS', 'TypeScript', 'Node.js API', 'Vue.js Basics'],
    datasets: [
      {
        label: 'Completion Rate (%)',
        data: [87, 89, 85, 82, 91],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(168, 85, 247, 0.8)',
          'rgba(249, 115, 22, 0.8)',
          'rgba(236, 72, 153, 0.8)',
        ],
      },
    ],
  },
  revenueBreakdown: {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'Revenue ($)',
        data: [450000, 620000, 580000, 917900],
        backgroundColor: 'rgba(16, 185, 129, 0.8)',
        borderColor: 'rgb(16, 185, 129)',
        borderWidth: 2,
      },
    ],
  },
};

// Course creation wizard steps
export const COURSE_WIZARD_STEPS = [
  {
    id: 'basic',
    title: 'Basic Information',
    description: 'Course title, description, and thumbnail',
  },
  {
    id: 'details',
    title: 'Course Details',
    description: 'Duration, difficulty, pricing, and skills',
  },
  {
    id: 'curriculum',
    title: 'Curriculum',
    description: 'Lessons, modules, and structure',
  },
  {
    id: 'settings',
    title: 'Settings',
    description: 'Publishing options and advanced settings',
  },
];

// Marketplace listing template
export const MARKETPLACE_LISTING_TEMPLATE = {
  title: 'Complete React Development Bootcamp',
  shortDescription: 'Master React from basics to advanced concepts',
  longDescription: `
    This comprehensive React bootcamp will take you from a complete beginner to an advanced React developer. 
    You'll learn modern React patterns, hooks, context, and how to build real-world applications.
    
    What you'll learn:
    • React fundamentals and JSX
    • Component lifecycle and state management
    • Hooks and custom hooks
    • Context API and global state
    • Performance optimization
    • Testing React applications
    • Deployment strategies
  `,
  category: 'Web Development',
  subcategory: 'Frontend Frameworks',
  tags: ['React', 'JavaScript', 'Frontend', 'Web Development', 'Hooks'],
  targetAudience: 'Beginner to Intermediate developers',
  prerequisites: 'Basic JavaScript knowledge',
  learningOutcomes: [
    'Build modern React applications from scratch',
    'Understand React hooks and state management',
    'Implement routing and navigation',
    'Optimize React app performance',
    'Deploy React applications to production',
  ],
  pricing: {
    basePrice: 199,
    discountPrice: 149,
    currency: 'USD',
  },
  promotion: {
    featured: true,
    badge: 'Bestseller',
    urgency: 'Limited time offer',
  },
};
