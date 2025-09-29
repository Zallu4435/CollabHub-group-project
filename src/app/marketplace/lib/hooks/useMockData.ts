// market/src/lib/hooks/useMockData.ts
import { useState, useEffect } from 'react';
import { Project } from '../../types/project';

export const useMockData = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mock data generator
  const generateMockProjects = (count: number = 50): Project[] => {
    const categories = ['web-templates', 'mobile-apps', 'backend-apis', 'ui-ux-kits', 'landing-pages', 'full-stack', 'ecommerce', 'dashboard', 'portfolio'];
    const techStacks = ['React', 'Vue.js', 'Angular', 'Next.js', 'Nuxt.js', 'Svelte', 'TypeScript', 'JavaScript', 'Node.js', 'Python', 'PHP', 'Go', 'React Native', 'Flutter', 'Ionic', 'Laravel', 'Django', 'MongoDB', 'PostgreSQL', 'MySQL', 'Firebase', 'Supabase', 'Tailwind CSS', 'Bootstrap', 'Material UI', 'Chakra UI'];
    const sellers = [
      { id: 'seller1', name: 'Sarah Johnson', avatar: '/images/avatars/sarah.jpg' },
      { id: 'seller2', name: 'Mike Chen', avatar: '/images/avatars/mike.jpg' },
      { id: 'seller3', name: 'Emma Wilson', avatar: '/images/avatars/emma.jpg' },
      { id: 'seller4', name: 'Alex Thompson', avatar: '/images/avatars/alex.jpg' },
      { id: 'seller5', name: 'Maria Rodriguez', avatar: '/images/avatars/maria.jpg' },
      { id: 'seller6', name: 'David Chen', avatar: '/images/avatars/david.jpg' },
      { id: 'seller7', name: 'Jennifer Lee', avatar: '/images/avatars/jennifer.jpg' },
      { id: 'seller8', name: 'James Wilson', avatar: '/images/avatars/james.jpg' }
    ];
    const licenseTypes = ['personal', 'commercial', 'extended', 'white-label'] as const;
    const deploymentOptions = ['Vercel', 'Netlify', 'AWS', 'Heroku', 'Docker', 'Static Hosting'];
    const browserCompat = ['Chrome', 'Firefox', 'Safari', 'Edge', 'Opera'];

    const projectTitles = [
      'Modern E-commerce Dashboard',
      'React Native Food Delivery App',
      'Vue.js SaaS Landing Page',
      'Node.js REST API Template',
      'Flutter Social Media App',
      'Angular Admin Panel',
      'Next.js Blog Template',
      'Laravel E-commerce Platform',
      'React Portfolio Website',
      'Vue.js Dashboard Template',
      'Express.js API Boilerplate',
      'React Native Dating App',
      'Flutter E-commerce App',
      'Angular CRM System',
      'Next.js E-learning Platform',
      'Laravel Task Management',
      'React Social Network',
      'Vue.js Real Estate App',
      'Node.js Chat Application',
      'Flutter Fitness Tracker'
    ];

    const descriptions = [
      'Complete admin dashboard for e-commerce platforms with analytics, product management, order tracking, and customer insights.',
      'Full-featured mobile application with user authentication, real-time updates, and payment integration.',
      'Modern, conversion-optimized landing page template with responsive design and smooth animations.',
      'RESTful API template with authentication, validation, error handling, and comprehensive documentation.',
      'Cross-platform mobile app with beautiful UI, offline support, and cloud synchronization.',
      'Professional admin panel with data visualization, user management, and customizable dashboard.',
      'SEO-optimized blog template with markdown support, comments, and social sharing.',
      'Complete e-commerce solution with product management, shopping cart, and payment processing.',
      'Personal portfolio website with project showcase, blog, and contact form.',
      'Interactive dashboard with charts, tables, and real-time data updates.',
      'Scalable API boilerplate with authentication, rate limiting, and database integration.',
      'Dating app with matching algorithm, chat functionality, and profile management.',
      'E-commerce mobile app with product catalog, shopping cart, and order tracking.',
      'Customer relationship management system with lead tracking and sales analytics.',
      'Online learning platform with course management, video streaming, and progress tracking.',
      'Task management system with team collaboration, project tracking, and time management.',
      'Social networking platform with user profiles, posts, comments, and messaging.',
      'Real estate listing platform with property search, filters, and agent profiles.',
      'Real-time chat application with rooms, private messaging, and file sharing.',
      'Fitness tracking app with workout plans, progress monitoring, and social features.'
    ];

    return Array.from({ length: count }, (_, index) => {
      const seller = sellers[Math.floor(Math.random() * sellers.length)];
      const category = categories[Math.floor(Math.random() * categories.length)];
      const techStack = techStacks.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 6) + 3);
      const title = projectTitles[Math.floor(Math.random() * projectTitles.length)];
      const description = descriptions[Math.floor(Math.random() * descriptions.length)];
      const price = Math.floor(Math.random() * 500) + 10;
      const rating = Math.random() * 2 + 3; // 3.0 to 5.0
      const downloads = Math.floor(Math.random() * 5000) + 100;
      const views = Math.floor(Math.random() * 10000) + 500;
      const reviewCount = Math.floor(Math.random() * 200) + 10;
      const createdAt = new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString();
      const updatedAt = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString();

      return {
        id: `project-${index + 1}`,
        title: `${title} ${index + 1}`,
        description,
        shortDescription: description.substring(0, 100) + '...',
        sellerId: seller.id,
        sellerName: seller.name,
        sellerAvatar: seller.avatar,
        techStack,
        framework: techStack.find(tech => ['React', 'Vue.js', 'Angular', 'Next.js', 'Nuxt.js', 'Svelte'].includes(tech)) || 'React',
        database: techStack.find(tech => ['MongoDB', 'PostgreSQL', 'MySQL', 'Firebase', 'Supabase'].includes(tech)) || 'PostgreSQL',
        deployment: deploymentOptions.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 3) + 1),
        browserCompat: browserCompat.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 3) + 2),
        mobileResponsive: Math.random() > 0.3,
        screenshots: [
          `/images/projects/project-${index + 1}-1.jpg`,
          `/images/projects/project-${index + 1}-2.jpg`,
          `/images/projects/project-${index + 1}-3.jpg`
        ],
        demoUrl: Math.random() > 0.2 ? `https://demo-project-${index + 1}.vercel.app` : undefined,
        videoUrl: Math.random() > 0.5 ? `https://youtube.com/watch?v=project-${index + 1}` : undefined,
        documentationUrl: Math.random() > 0.3 ? `/docs/project-${index + 1}` : undefined,
        price,
        licenseType: licenseTypes[Math.floor(Math.random() * licenseTypes.length)],
        category,
        subcategory: Math.random() > 0.5 ? techStack[0].toLowerCase() : undefined,
        tags: techStack.slice(0, Math.floor(Math.random() * 4) + 2),
        downloads,
        views,
        rating: Math.round(rating * 10) / 10,
        reviewCount,
        featured: Math.random() > 0.8,
        trending: Math.random() > 0.7,
        isNew: Math.random() > 0.9,
        createdAt,
        updatedAt
      };
    });
  };

  // Load mock data
  useEffect(() => {
    const loadMockData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockProjects = generateMockProjects(50);
        setProjects(mockProjects);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load mock data');
      } finally {
        setIsLoading(false);
      }
    };

    loadMockData();
  }, []);

  // Get projects by category
  const getProjectsByCategory = (category: string) => {
    return projects.filter(project => project.category === category);
  };

  // Get featured projects
  const getFeaturedProjects = () => {
    return projects.filter(project => project.featured);
  };

  // Get trending projects
  const getTrendingProjects = () => {
    return projects.filter(project => project.trending);
  };

  // Get new projects
  const getNewProjects = () => {
    return projects.filter(project => project.isNew);
  };

  // Get projects by seller
  const getProjectsBySeller = (sellerId: string) => {
    return projects.filter(project => project.sellerId === sellerId);
  };

  // Get projects by tech stack
  const getProjectsByTechStack = (tech: string) => {
    return projects.filter(project => project.techStack.includes(tech));
  };

  // Get projects by price range
  const getProjectsByPriceRange = (minPrice: number, maxPrice: number) => {
    return projects.filter(project => project.price >= minPrice && project.price <= maxPrice);
  };

  // Get projects by rating
  const getProjectsByRating = (minRating: number) => {
    return projects.filter(project => project.rating >= minRating);
  };

  // Search projects
  const searchProjects = (query: string) => {
    const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0);
    
    return projects.filter(project => {
      const searchableText = [
        project.title,
        project.description,
        project.shortDescription,
        ...project.techStack,
        ...project.tags,
        project.category,
        project.subcategory || '',
        project.sellerName
      ].join(' ').toLowerCase();

      return searchTerms.every(term => searchableText.includes(term));
    });
  };

  // Get random projects
  const getRandomProjects = (count: number = 10) => {
    const shuffled = [...projects].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  // Get project by ID
  const getProjectById = (id: string) => {
    return projects.find(project => project.id === id);
  };

  // Get categories
  const getCategories = () => {
    const categories = [...new Set(projects.map(project => project.category))];
    return categories.map(category => ({
      id: category,
      name: category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' '),
      count: projects.filter(project => project.category === category).length
    }));
  };

  // Get tech stacks
  const getTechStacks = () => {
    const techStacks = [...new Set(projects.flatMap(project => project.techStack))];
    return techStacks.map(tech => ({
      name: tech,
      count: projects.filter(project => project.techStack.includes(tech)).length
    }));
  };

  return {
    projects,
    isLoading,
    error,
    getProjectsByCategory,
    getFeaturedProjects,
    getTrendingProjects,
    getNewProjects,
    getProjectsBySeller,
    getProjectsByTechStack,
    getProjectsByPriceRange,
    getProjectsByRating,
    searchProjects,
    getRandomProjects,
    getProjectById,
    getCategories,
    getTechStacks
  };
};
