// market/src/lib/mock-data/categories.ts

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  projectCount: number;
  subcategories: string[];
}

export const categories: Category[] = [
  {
    id: 'web-templates',
    name: 'Web Templates',
    description: 'Modern, responsive web templates and themes',
    icon: '🌐',
    projectCount: 156,
    subcategories: ['react', 'vue', 'angular', 'nextjs', 'nuxt']
  },
  {
    id: 'mobile-apps',
    name: 'Mobile Apps',
    description: 'iOS and Android mobile applications',
    icon: '📱',
    projectCount: 89,
    subcategories: ['react-native', 'flutter', 'ios', 'android']
  },
  {
    id: 'backend-apis',
    name: 'Backend APIs',
    description: 'RESTful APIs and server-side applications',
    icon: '⚙️',
    projectCount: 67,
    subcategories: ['nodejs', 'python', 'php', 'go']
  },
  {
    id: 'ui-ux-kits',
    name: 'UI/UX Kits',
    description: 'Design systems, components, and UI kits',
    icon: '🎨',
    projectCount: 234,
    subcategories: ['components', 'icons', 'illustrations', 'animations']
  },
  {
    id: 'landing-pages',
    name: 'Landing Pages',
    description: 'High-converting landing page templates',
    icon: '🚀',
    projectCount: 123,
    subcategories: ['saas', 'ecommerce', 'portfolio', 'corporate']
  },
  {
    id: 'full-stack',
    name: 'Full-Stack Apps',
    description: 'Complete applications with frontend and backend',
    icon: '💻',
    projectCount: 78,
    subcategories: ['ecommerce', 'social', 'dashboard', 'blog']
  },
  {
    id: 'ecommerce',
    name: 'E-commerce',
    description: 'Online store templates and solutions',
    icon: '🛒',
    projectCount: 145,
    subcategories: ['shopify', 'woocommerce', 'magento', 'custom']
  },
  {
    id: 'dashboard',
    name: 'Dashboards',
    description: 'Admin panels and analytics dashboards',
    icon: '📊',
    projectCount: 92,
    subcategories: ['admin', 'analytics', 'crm', 'cms']
  },
  {
    id: 'portfolio',
    name: 'Portfolio',
    description: 'Personal and professional portfolio sites',
    icon: '👤',
    projectCount: 167,
    subcategories: ['personal', 'agency', 'creative', 'corporate']
  }
];