// market/src/lib/mock-data/sellers.ts

export interface Seller {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  bio: string;
  location: string;
  website?: string;
  socialLinks: {
    twitter?: string;
    github?: string;
    linkedin?: string;
    dribbble?: string;
  };
  joinDate: string;
  verified: boolean;
  rating: number;
  totalSales: number;
  totalProjects: number;
  responseTime: string;
  languages: string[];
  specialties: string[];
}

export const sellers: Seller[] = [
  {
    id: 'seller_1',
    name: 'Alex Johnson',
    username: 'alexdev',
    email: 'alex@example.com',
    avatar: 'https://ui-avatars.com/api/?name=Alex+Johnson&background=4F46E5&color=fff',
    bio: 'Full-stack developer with 8+ years of experience building modern web applications. Passionate about clean code and user experience.',
    location: 'San Francisco, CA',
    website: 'https://alexdev.com',
    socialLinks: {
      twitter: '@alexdev',
      github: 'alexdev',
      linkedin: 'alex-johnson-dev',
      dribbble: 'alexdev'
    },
    joinDate: '2022-01-15',
    verified: true,
    rating: 4.9,
    totalSales: 1247,
    totalProjects: 23,
    responseTime: '< 1 hour',
    languages: ['JavaScript', 'TypeScript', 'Python', 'Go'],
    specialties: ['React', 'Node.js', 'AWS', 'Docker']
  },
  {
    id: 'seller_2',
    name: 'Sarah Chen',
    username: 'sarahdesigns',
    email: 'sarah@example.com',
    avatar: 'https://ui-avatars.com/api/?name=Sarah+Chen&background=EC4899&color=fff',
    bio: 'UI/UX designer and frontend developer specializing in beautiful, functional interfaces. Love creating pixel-perfect designs.',
    location: 'New York, NY',
    website: 'https://sarahdesigns.com',
    socialLinks: {
      twitter: '@sarahdesigns',
      github: 'sarahdesigns',
      linkedin: 'sarah-chen-design',
      dribbble: 'sarahdesigns'
    },
    joinDate: '2021-11-03',
    verified: true,
    rating: 4.8,
    totalSales: 892,
    totalProjects: 18,
    responseTime: '< 2 hours',
    languages: ['JavaScript', 'TypeScript', 'CSS', 'HTML'],
    specialties: ['Figma', 'React', 'Vue.js', 'Design Systems']
  },
  {
    id: 'seller_3',
    name: 'Mike Rodriguez',
    username: 'mikemobile',
    email: 'mike@example.com',
    avatar: 'https://ui-avatars.com/api/?name=Mike+Rodriguez&background=10B981&color=fff',
    bio: 'Mobile app developer focused on React Native and Flutter. Building cross-platform apps that users love.',
    location: 'Austin, TX',
    website: 'https://mikemobile.dev',
    socialLinks: {
      twitter: '@mikemobile',
      github: 'mikemobile',
      linkedin: 'mike-rodriguez-mobile'
    },
    joinDate: '2022-03-20',
    verified: true,
    rating: 4.7,
    totalSales: 634,
    totalProjects: 15,
    responseTime: '< 3 hours',
    languages: ['JavaScript', 'TypeScript', 'Dart', 'Swift'],
    specialties: ['React Native', 'Flutter', 'iOS', 'Android']
  },
  {
    id: 'seller_4',
    name: 'Emma Wilson',
    username: 'emmabackend',
    email: 'emma@example.com',
    avatar: 'https://ui-avatars.com/api/?name=Emma+Wilson&background=F59E0B&color=fff',
    bio: 'Backend developer and DevOps engineer. Expert in scalable systems and cloud architecture.',
    location: 'Seattle, WA',
    website: 'https://emmabackend.com',
    socialLinks: {
      twitter: '@emmabackend',
      github: 'emmabackend',
      linkedin: 'emma-wilson-backend'
    },
    joinDate: '2021-08-12',
    verified: true,
    rating: 4.9,
    totalSales: 1156,
    totalProjects: 31,
    responseTime: '< 1 hour',
    languages: ['Python', 'Go', 'JavaScript', 'Rust'],
    specialties: ['Django', 'FastAPI', 'AWS', 'Kubernetes', 'Docker']
  },
  {
    id: 'seller_5',
    name: 'David Kim',
    username: 'davidfullstack',
    email: 'david@example.com',
    avatar: 'https://ui-avatars.com/api/?name=David+Kim&background=8B5CF6&color=fff',
    bio: 'Full-stack developer with expertise in modern web technologies. Building end-to-end solutions for startups and enterprises.',
    location: 'Los Angeles, CA',
    website: 'https://davidfullstack.com',
    socialLinks: {
      twitter: '@davidfullstack',
      github: 'davidfullstack',
      linkedin: 'david-kim-fullstack'
    },
    joinDate: '2022-05-08',
    verified: true,
    rating: 4.8,
    totalSales: 743,
    totalProjects: 19,
    responseTime: '< 2 hours',
    languages: ['JavaScript', 'TypeScript', 'Python', 'Java'],
    specialties: ['Next.js', 'Node.js', 'PostgreSQL', 'Redis', 'GraphQL']
  },
  {
    id: 'seller_6',
    name: 'Lisa Thompson',
    username: 'lisaui',
    email: 'lisa@example.com',
    avatar: 'https://ui-avatars.com/api/?name=Lisa+Thompson&background=EF4444&color=fff',
    bio: 'Creative UI/UX designer with a passion for creating beautiful, accessible interfaces. Specializing in design systems and component libraries.',
    location: 'Chicago, IL',
    website: 'https://lisaui.design',
    socialLinks: {
      twitter: '@lisaui',
      github: 'lisaui',
      linkedin: 'lisa-thompson-ui',
      dribbble: 'lisaui'
    },
    joinDate: '2021-12-14',
    verified: true,
    rating: 4.9,
    totalSales: 1023,
    totalProjects: 27,
    responseTime: '< 1 hour',
    languages: ['JavaScript', 'TypeScript', 'CSS', 'HTML'],
    specialties: ['Figma', 'Sketch', 'React', 'Vue.js', 'Design Systems']
  },
  {
    id: 'seller_7',
    name: 'James Brown',
    username: 'jamesecommerce',
    email: 'james@example.com',
    avatar: 'https://ui-avatars.com/api/?name=James+Brown&background=06B6D4&color=fff',
    bio: 'E-commerce specialist and Shopify expert. Building high-converting online stores and custom e-commerce solutions.',
    location: 'Miami, FL',
    website: 'https://jamesecommerce.com',
    socialLinks: {
      twitter: '@jamesecommerce',
      github: 'jamesecommerce',
      linkedin: 'james-brown-ecommerce'
    },
    joinDate: '2022-02-28',
    verified: true,
    rating: 4.7,
    totalSales: 567,
    totalProjects: 12,
    responseTime: '< 4 hours',
    languages: ['JavaScript', 'Liquid', 'PHP', 'Ruby'],
    specialties: ['Shopify', 'WooCommerce', 'Magento', 'Stripe', 'PayPal']
  },
  {
    id: 'seller_8',
    name: 'Maria Garcia',
    username: 'mariadashboard',
    email: 'maria@example.com',
    avatar: 'https://ui-avatars.com/api/?name=Maria+Garcia&background=84CC16&color=fff',
    bio: 'Data visualization expert and dashboard specialist. Creating beautiful, functional admin panels and analytics dashboards.',
    location: 'Denver, CO',
    website: 'https://mariadashboard.com',
    socialLinks: {
      twitter: '@mariadashboard',
      github: 'mariadashboard',
      linkedin: 'maria-garcia-dashboard'
    },
    joinDate: '2021-09-22',
    verified: true,
    rating: 4.8,
    totalSales: 789,
    totalProjects: 16,
    responseTime: '< 2 hours',
    languages: ['JavaScript', 'TypeScript', 'Python', 'R'],
    specialties: ['D3.js', 'Chart.js', 'React', 'Vue.js', 'Data Analysis']
  }
];
