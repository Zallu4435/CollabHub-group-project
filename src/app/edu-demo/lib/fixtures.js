'use client';

// Mock instructors
export const INSTRUCTORS = [
  { id: 'inst-1', name: 'Sarah Chen', avatar: 'https://api.dicebear.com/7.x/thumbs/svg?seed=sarah', title: 'Senior Full-Stack Developer', rating: 4.9, students: 12500, courses: 8 },
  { id: 'inst-2', name: 'Marcus Johnson', avatar: 'https://api.dicebear.com/7.x/thumbs/svg?seed=marcus', title: 'DevOps Engineer', rating: 4.8, students: 8900, courses: 5 },
  { id: 'inst-3', name: 'Elena Rodriguez', avatar: 'https://api.dicebear.com/7.x/thumbs/svg?seed=elena', title: 'UI/UX Designer', rating: 4.9, students: 15200, courses: 12 },
  { id: 'inst-4', name: 'David Kim', avatar: 'https://api.dicebear.com/7.x/thumbs/svg?seed=david', title: 'Data Scientist', rating: 4.7, students: 6800, courses: 6 },
];

// Mock courses
export const COURSES = [
  {
    id: 'course-1',
    title: 'Complete React Development Bootcamp',
    description: 'Master React from basics to advanced concepts including hooks, context, and modern patterns.',
    instructor: INSTRUCTORS[0],
    stack: 'Frontend',
    difficulty: 'Intermediate',
    duration: '12 weeks',
    rating: 4.8,
    reviews: 2340,
    price: 199,
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop',
    tags: ['React', 'JavaScript', 'Hooks', 'Context'],
    enrolled: 8900,
    lastUpdated: '2024-01-15',
  },
  {
    id: 'course-2',
    title: 'Node.js & Express Backend Mastery',
    description: 'Build scalable backend applications with Node.js, Express, MongoDB, and authentication.',
    instructor: INSTRUCTORS[1],
    stack: 'Backend',
    difficulty: 'Advanced',
    duration: '10 weeks',
    rating: 4.7,
    reviews: 1890,
    price: 249,
    thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=250&fit=crop',
    tags: ['Node.js', 'Express', 'MongoDB', 'API'],
    enrolled: 5600,
    lastUpdated: '2024-02-01',
  },
  {
    id: 'course-3',
    title: 'UI/UX Design Fundamentals',
    description: 'Learn design principles, user research, prototyping, and modern design tools.',
    instructor: INSTRUCTORS[2],
    stack: 'Design',
    difficulty: 'Beginner',
    duration: '8 weeks',
    rating: 4.9,
    reviews: 3200,
    price: 149,
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop',
    tags: ['Figma', 'Design Systems', 'Prototyping', 'User Research'],
    enrolled: 12400,
    lastUpdated: '2024-01-20',
  },
  {
    id: 'course-4',
    title: 'Python Data Science & Machine Learning',
    description: 'Complete data science pipeline from data collection to machine learning deployment.',
    instructor: INSTRUCTORS[3],
    stack: 'Data Science',
    difficulty: 'Intermediate',
    duration: '16 weeks',
    rating: 4.6,
    reviews: 1560,
    price: 299,
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
    tags: ['Python', 'Pandas', 'Scikit-learn', 'TensorFlow'],
    enrolled: 4200,
    lastUpdated: '2024-01-10',
  },
  {
    id: 'course-5',
    title: 'DevOps & Cloud Infrastructure',
    description: 'Master Docker, Kubernetes, AWS, and CI/CD pipelines for modern deployment.',
    instructor: INSTRUCTORS[1],
    stack: 'DevOps',
    difficulty: 'Advanced',
    duration: '14 weeks',
    rating: 4.8,
    reviews: 980,
    price: 349,
    thumbnail: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=400&h=250&fit=crop',
    tags: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'],
    enrolled: 2800,
    lastUpdated: '2024-02-05',
  },
  {
    id: 'course-6',
    title: 'Full-Stack JavaScript Development',
    description: 'Build complete web applications using React, Node.js, and modern JavaScript.',
    instructor: INSTRUCTORS[0],
    stack: 'Full-Stack',
    difficulty: 'Intermediate',
    duration: '20 weeks',
    rating: 4.9,
    reviews: 4100,
    price: 399,
    thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=250&fit=crop',
    tags: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
    enrolled: 15600,
    lastUpdated: '2024-01-25',
  },
];

// Mock lessons for courses
export const LESSONS = {
  'course-1': [
    // Unit 1: React Basics
    { id: 'lesson-1-1', title: 'Introduction to React', unit: 1, unitTitle: 'React Fundamentals', duration: '45 min', type: 'video', completed: false, locked: false },
    { id: 'lesson-1-2', title: 'JSX and Components', unit: 1, unitTitle: 'React Fundamentals', duration: '60 min', type: 'video', completed: false, locked: true },
    { id: 'lesson-1-3', title: 'Props and State', unit: 1, unitTitle: 'React Fundamentals', duration: '75 min', type: 'video', completed: false, locked: true },
    { id: 'lesson-1-4', title: 'Event Handling', unit: 1, unitTitle: 'React Fundamentals', duration: '50 min', type: 'video', completed: false, locked: true },
    { id: 'lesson-1-5', title: 'React Basics Quiz', unit: 1, unitTitle: 'React Fundamentals', duration: '30 min', type: 'quiz', completed: false, locked: true },
    
    // Unit 2: Advanced React
    { id: 'lesson-2-1', title: 'React Hooks Introduction', unit: 2, unitTitle: 'Advanced React', duration: '90 min', type: 'video', completed: false, locked: true },
    { id: 'lesson-2-2', title: 'useState and useEffect', unit: 2, unitTitle: 'Advanced React', duration: '80 min', type: 'video', completed: false, locked: true },
    { id: 'lesson-2-3', title: 'Custom Hooks', unit: 2, unitTitle: 'Advanced React', duration: '70 min', type: 'video', completed: false, locked: true },
    { id: 'lesson-2-4', title: 'Context API', unit: 2, unitTitle: 'Advanced React', duration: '85 min', type: 'video', completed: false, locked: true },
    { id: 'lesson-2-5', title: 'Advanced React Project', unit: 2, unitTitle: 'Advanced React', duration: '120 min', type: 'project', completed: false, locked: true },
    
    // Unit 3: React Ecosystem
    { id: 'lesson-3-1', title: 'React Router', unit: 3, unitTitle: 'React Ecosystem', duration: '65 min', type: 'video', completed: false, locked: true },
    { id: 'lesson-3-2', title: 'State Management with Redux', unit: 3, unitTitle: 'React Ecosystem', duration: '95 min', type: 'video', completed: false, locked: true },
    { id: 'lesson-3-3', title: 'Testing React Applications', unit: 3, unitTitle: 'React Ecosystem', duration: '75 min', type: 'video', completed: false, locked: true },
    { id: 'lesson-3-4', title: 'Performance Optimization', unit: 3, unitTitle: 'React Ecosystem', duration: '80 min', type: 'video', completed: false, locked: true },
    { id: 'lesson-3-5', title: 'Final Capstone Project', unit: 3, unitTitle: 'React Ecosystem', duration: '180 min', type: 'project', completed: false, locked: true },
  ],
  'course-2': [
    // Unit 1: Node.js Fundamentals
    { id: 'lesson-2-1-1', title: 'Node.js Introduction', unit: 1, unitTitle: 'Node.js Fundamentals', duration: '50 min', type: 'video', completed: false, locked: false },
    { id: 'lesson-2-1-2', title: 'NPM and Modules', unit: 1, unitTitle: 'Node.js Fundamentals', duration: '45 min', type: 'video', completed: false, locked: true },
    { id: 'lesson-2-1-3', title: 'File System Operations', unit: 1, unitTitle: 'Node.js Fundamentals', duration: '60 min', type: 'video', completed: false, locked: true },
    { id: 'lesson-2-1-4', title: 'HTTP Server Basics', unit: 1, unitTitle: 'Node.js Fundamentals', duration: '70 min', type: 'video', completed: false, locked: true },
    
    // Unit 2: Express Framework
    { id: 'lesson-2-2-1', title: 'Express Setup', unit: 2, unitTitle: 'Express Framework', duration: '40 min', type: 'video', completed: false, locked: true },
    { id: 'lesson-2-2-2', title: 'Routing and Middleware', unit: 2, unitTitle: 'Express Framework', duration: '85 min', type: 'video', completed: false, locked: true },
    { id: 'lesson-2-2-3', title: 'REST API Design', unit: 2, unitTitle: 'Express Framework', duration: '90 min', type: 'video', completed: false, locked: true },
    { id: 'lesson-2-2-4', title: 'Error Handling', unit: 2, unitTitle: 'Express Framework', duration: '55 min', type: 'video', completed: false, locked: true },
    
    // Unit 3: Database Integration
    { id: 'lesson-2-3-1', title: 'MongoDB Basics', unit: 3, unitTitle: 'Database Integration', duration: '75 min', type: 'video', completed: false, locked: true },
    { id: 'lesson-2-3-2', title: 'Mongoose ODM', unit: 3, unitTitle: 'Database Integration', duration: '80 min', type: 'video', completed: false, locked: true },
    { id: 'lesson-2-3-3', title: 'Authentication & JWT', unit: 3, unitTitle: 'Database Integration', duration: '95 min', type: 'video', completed: false, locked: true },
    { id: 'lesson-2-3-4', title: 'API Security', unit: 3, unitTitle: 'Database Integration', duration: '70 min', type: 'video', completed: false, locked: true },
  ],
};

// Mock enrollments and progress
export const ENROLLMENTS = [
  { id: 'enroll-1', courseId: 'course-1', userId: 'user-1', mode: 'diploma', enrolledAt: '2024-01-15', progress: 20 },
  { id: 'enroll-2', courseId: 'course-3', userId: 'user-1', mode: 'direct', enrolledAt: '2024-02-01', progress: 65 },
];

export const LESSON_PROGRESS = {
  'course-1': {
    'lesson-1-1': { completed: true, completedAt: '2024-01-16', timeSpent: 45 },
    'lesson-1-2': { completed: true, completedAt: '2024-01-17', timeSpent: 58 },
    'lesson-1-3': { completed: false, timeSpent: 12 },
  },
  'course-3': {
    'lesson-3-1-1': { completed: true, completedAt: '2024-02-02', timeSpent: 40 },
    'lesson-3-1-2': { completed: true, completedAt: '2024-02-03', timeSpent: 35 },
    'lesson-3-1-3': { completed: true, completedAt: '2024-02-04', timeSpent: 50 },
  },
};
