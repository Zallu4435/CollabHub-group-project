// market/src/lib/mock-data/projects.ts
import { Project } from '../../types/project';

export const projects: Project[] = [
  {
    id: '1',
    title: 'Modern E-commerce Dashboard',
    description: 'Complete admin dashboard for e-commerce platforms with analytics, product management, order tracking, and customer insights. Built with modern React patterns and TypeScript for maximum maintainability.',
    shortDescription: 'Complete admin dashboard for e-commerce platforms with analytics and management tools.',
    sellerId: 'seller_1',
    sellerName: 'Sarah Johnson',
    sellerAvatar: '/images/avatars/sarah.jpg',
    
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Chart.js', 'Framer Motion'],
    framework: 'Next.js 14',
    database: 'PostgreSQL',
    deployment: ['Vercel', 'Netlify', 'AWS'],
    browserCompat: ['Chrome', 'Firefox', 'Safari', 'Edge'],
    mobileResponsive: true,
    
    screenshots: ['/images/projects/dashboard-1.jpg', '/images/projects/dashboard-2.jpg'],
    demoUrl: 'https://ecommerce-dashboard-demo.vercel.app',
    videoUrl: 'https://youtube.com/watch?v=demo1',
    documentationUrl: '/docs/ecommerce-dashboard',
    
    price: 79.99,
    licenseType: 'commercial',
    
    category: 'dashboard',
    subcategory: 'ecommerce',
    tags: ['dashboard', 'admin', 'ecommerce', 'analytics', 'react'],
    
    downloads: 1245,
    views: 8932,
    rating: 4.8,
    reviewCount: 89,
    
    featured: true,
    trending: true,
    isNew: false,
    
    // Request-based purchase settings
    isRequestOnly: false,
    state: 'available_for_request',
    requiresApproval: false,
    autoApprove: false,
    maxRequestsPerBuyer: 1,
    
    // Request statistics
    totalRequests: 0,
    pendingRequests: 0,
    approvedRequests: 0,
    rejectedRequests: 0,
    completedRequests: 0,
    
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-03-10T00:00:00Z'
  },
  {
    id: '2',
    title: 'React Native Food Delivery App',
    description: 'Complete food delivery mobile app with user authentication, restaurant listings, cart management, real-time order tracking, and payment integration. Includes both customer and restaurant owner interfaces.',
    shortDescription: 'Complete food delivery mobile app with real-time tracking and payment integration.',
    sellerId: 'seller_2',
    sellerName: 'Mike Chen',
    sellerAvatar: '/images/avatars/mike.jpg',
    
    techStack: ['React Native', 'TypeScript', 'Redux Toolkit', 'Stripe', 'Firebase'],
    framework: 'Expo SDK 49',
    database: 'Firebase Firestore',
    deployment: ['App Store', 'Google Play', 'Expo'],
    browserCompat: ['iOS Safari', 'Chrome Mobile'],
    mobileResponsive: true,
    
    screenshots: ['/images/projects/food-app-1.jpg', '/images/projects/food-app-2.jpg'],
    demoUrl: 'https://expo.dev/@demo/food-delivery',
    videoUrl: 'https://youtube.com/watch?v=demo2',
    
    price: 149.99,
    licenseType: 'extended',
    
    category: 'mobile-apps',
    subcategory: 'react-native',
    tags: ['mobile', 'food-delivery', 'react-native', 'payments', 'real-time'],
    
    downloads: 567,
    views: 4521,
    rating: 4.9,
    reviewCount: 43,
    
    featured: false,
    trending: true,
    isNew: true,
    
    // Request-based purchase settings
    isRequestOnly: false,
    state: 'available_for_request',
    requiresApproval: false,
    autoApprove: false,
    maxRequestsPerBuyer: 1,
    
    // Request statistics
    totalRequests: 0,
    pendingRequests: 0,
    approvedRequests: 0,
    rejectedRequests: 0,
    completedRequests: 0,
    
    createdAt: '2024-02-20T00:00:00Z',
    updatedAt: '2024-03-15T00:00:00Z'
  },
  {
    id: '3',
    title: 'Vue.js SaaS Landing Page',
    description: 'Modern, conversion-optimized landing page template for SaaS products. Features responsive design, smooth animations, pricing tables, testimonials, and contact forms. Fully customizable and SEO-friendly.',
    shortDescription: 'Modern, conversion-optimized landing page template for SaaS products.',
    sellerId: 'seller_3',
    sellerName: 'Emma Wilson',
    sellerAvatar: '/images/avatars/emma.jpg',
    
    techStack: ['Vue.js', 'Nuxt.js', 'Tailwind CSS', 'GSAP', 'TypeScript'],
    framework: 'Nuxt.js 3',
    database: 'None',
    deployment: ['Vercel', 'Netlify', 'Static Hosting'],
    browserCompat: ['Chrome', 'Firefox', 'Safari', 'Edge'],
    mobileResponsive: true,
    
    screenshots: ['/images/projects/saas-landing-1.jpg', '/images/projects/saas-landing-2.jpg'],
    demoUrl: 'https://vue-saas-landing.netlify.app',
    
    price: 39.99,
    licenseType: 'personal',
    
    category: 'landing-pages',
    tags: ['vue', 'saas', 'landing-page', 'responsive', 'animations'],
    
    downloads: 892,
    views: 3421,
    rating: 4.6,
    reviewCount: 67,
    
    featured: true,
    trending: false,
    isNew: false,
    
    // Request-based purchase settings
    isRequestOnly: false,
    state: 'available_for_request',
    requiresApproval: false,
    autoApprove: false,
    maxRequestsPerBuyer: 1,
    
    // Request statistics
    totalRequests: 0,
    pendingRequests: 0,
    approvedRequests: 0,
    rejectedRequests: 0,
    completedRequests: 0,
    
    createdAt: '2023-11-10T00:00:00Z',
    updatedAt: '2024-01-05T00:00:00Z'
  },
  // Request-based projects
  {
    id: 'proj_1',
    title: 'E-commerce React Template',
    description: 'A modern e-commerce template built with React and TypeScript',
    shortDescription: 'Modern e-commerce template',
    sellerId: 'seller_1',
    sellerName: 'John Developer',
    sellerAvatar: '/avatars/john.jpg',
    techStack: ['React', 'TypeScript', 'Tailwind CSS'],
    framework: 'Next.js',
    database: 'PostgreSQL',
    deployment: ['Vercel', 'Netlify'],
    browserCompat: ['Chrome', 'Firefox', 'Safari'],
    mobileResponsive: true,
    screenshots: ['/screenshots/ecommerce-1.jpg', '/screenshots/ecommerce-2.jpg'],
    demoUrl: 'https://demo.example.com',
    price: 299,
    licenseType: 'commercial',
    category: 'Web Templates',
    subcategory: 'E-commerce',
    tags: ['react', 'ecommerce', 'typescript'],
    downloads: 150,
    views: 1200,
    rating: 4.8,
    reviewCount: 45,
    featured: true,
    trending: false,
    isNew: false,
    isRequestOnly: true,
    state: 'pending_request',
    requiresApproval: true,
    autoApprove: false,
    maxRequestsPerBuyer: 1,
    totalRequests: 2,
    pendingRequests: 1,
    approvedRequests: 0,
    rejectedRequests: 0,
    completedRequests: 1,
    lastRequestAt: '2024-01-20T10:30:00Z',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 'proj_2',
    title: 'Mobile App UI Kit',
    description: 'Complete UI kit for mobile applications with 50+ components',
    shortDescription: 'Mobile UI kit with 50+ components',
    sellerId: 'seller_2',
    sellerName: 'Sarah Designer',
    sellerAvatar: '/avatars/sarah.jpg',
    techStack: ['React Native', 'Figma', 'Sketch'],
    framework: 'React Native',
    deployment: ['iOS', 'Android'],
    browserCompat: ['iOS Safari', 'Chrome Mobile'],
    mobileResponsive: true,
    screenshots: ['/screenshots/mobile-1.jpg', '/screenshots/mobile-2.jpg'],
    price: 199,
    licenseType: 'commercial',
    category: 'Mobile UI',
    subcategory: 'UI Kits',
    tags: ['mobile', 'ui', 'react-native'],
    downloads: 89,
    views: 650,
    rating: 4.6,
    reviewCount: 23,
    featured: false,
    trending: true,
    isNew: true,
    isRequestOnly: true,
    state: 'available_for_request',
    requiresApproval: true,
    autoApprove: false,
    maxRequestsPerBuyer: 2,
    totalRequests: 2,
    pendingRequests: 0,
    approvedRequests: 1,
    rejectedRequests: 1,
    completedRequests: 0,
    lastRequestAt: '2024-01-19T14:20:00Z',
    createdAt: '2024-01-20T14:30:00Z',
    updatedAt: '2024-01-20T14:30:00Z'
  }
];

export const getFeaturedProjects = () => projects.filter(p => p.featured);
export const getTrendingProjects = () => projects.filter(p => p.trending);
export const getNewProjects = () => projects.filter(p => p.isNew);
export const getProjectsByCategory = (category: string) => projects.filter(p => p.category === category);
