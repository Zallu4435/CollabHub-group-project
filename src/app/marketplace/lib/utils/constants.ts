// market/src/lib/utils/constants.ts

// API Endpoints
export const API_ENDPOINTS = {
  PROJECTS: '/api/projects',
  CATEGORIES: '/api/categories',
  SELLERS: '/api/sellers',
  REVIEWS: '/api/reviews',
  ORDERS: '/api/orders',
  CART: '/api/cart',
  WISHLIST: '/api/wishlist',
  SEARCH: '/api/search',
  UPLOAD: '/api/upload',
  AUTH: '/api/auth'
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 12,
  MAX_PAGE_SIZE: 100,
  DEFAULT_PAGE: 1
} as const;

// Price Ranges
export const PRICE_RANGES = [
  { label: 'Free', value: [0, 0] },
  { label: 'Under $25', value: [0, 25] },
  { label: '$25 - $50', value: [25, 50] },
  { label: '$50 - $100', value: [50, 100] },
  { label: '$100 - $250', value: [100, 250] },
  { label: '$250+', value: [250, 999] }
] as const;

// License Types
export const LICENSE_TYPES = [
  { value: 'personal', label: 'Personal Use', multiplier: 1 },
  { value: 'commercial', label: 'Commercial Use', multiplier: 1.5 },
  { value: 'extended', label: 'Extended License', multiplier: 2.5 },
  { value: 'white-label', label: 'White Label', multiplier: 4 }
] as const;

// Sort Options
export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'downloads', label: 'Most Downloaded' }
] as const;

// Categories
export const CATEGORIES = [
  { id: 'web-templates', name: 'Web Templates', icon: '🌐', subcategories: ['react', 'vue', 'angular', 'nextjs', 'nuxt'] },
  { id: 'mobile-apps', name: 'Mobile Apps', icon: '📱', subcategories: ['react-native', 'flutter', 'ios', 'android'] },
  { id: 'backend-apis', name: 'Backend APIs', icon: '⚙️', subcategories: ['nodejs', 'python', 'php', 'go'] },
  { id: 'ui-ux-kits', name: 'UI/UX Kits', icon: '🎨', subcategories: ['components', 'icons', 'illustrations', 'animations'] },
  { id: 'landing-pages', name: 'Landing Pages', icon: '🚀', subcategories: ['saas', 'ecommerce', 'portfolio', 'corporate'] },
  { id: 'full-stack', name: 'Full-Stack Apps', icon: '💻', subcategories: ['ecommerce', 'social', 'dashboard', 'blog'] },
  { id: 'ecommerce', name: 'E-commerce', icon: '🛒', subcategories: ['shopify', 'woocommerce', 'magento', 'custom'] },
  { id: 'dashboard', name: 'Dashboards', icon: '📊', subcategories: ['admin', 'analytics', 'crm', 'cms'] },
  { id: 'portfolio', name: 'Portfolio', icon: '👤', subcategories: ['personal', 'agency', 'creative', 'corporate'] }
] as const;

// Tech Stacks
export const TECH_STACKS = [
  // Frontend
  'React', 'Vue.js', 'Angular', 'Svelte', 'Next.js', 'Nuxt.js', 'Gatsby',
  'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Sass', 'Less',
  
  // Styling
  'Tailwind CSS', 'Bootstrap', 'Material UI', 'Chakra UI', 'Ant Design',
  'Styled Components', 'Emotion', 'CSS Modules',
  
  // Backend
  'Node.js', 'Express', 'Fastify', 'Python', 'Django', 'Flask', 'FastAPI',
  'PHP', 'Laravel', 'Symfony', 'CodeIgniter', 'Ruby', 'Rails', 'Sinatra',
  'Go', 'Gin', 'Echo', 'Java', 'Spring Boot', 'C#', '.NET', 'ASP.NET',
  
  // Mobile
  'React Native', 'Flutter', 'Ionic', 'Xamarin', 'Cordova', 'PhoneGap',
  'Swift', 'Kotlin', 'Java (Android)',
  
  // Databases
  'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'SQLite', 'Firebase',
  'Supabase', 'Prisma', 'Sequelize', 'TypeORM', 'Mongoose',
  
  // Cloud & DevOps
  'AWS', 'Vercel', 'Netlify', 'Heroku', 'Docker', 'Kubernetes',
  'GitHub Actions', 'GitLab CI', 'Jenkins', 'Terraform',
  
  // Tools & Libraries
  'Webpack', 'Vite', 'Parcel', 'Rollup', 'Babel', 'ESLint', 'Prettier',
  'Jest', 'Cypress', 'Playwright', 'Storybook', 'Figma', 'Sketch'
] as const;

// Browser Compatibility
export const BROWSER_COMPAT = [
  'Chrome', 'Firefox', 'Safari', 'Edge', 'Opera'
] as const;

// Deployment Options
export const DEPLOYMENT_OPTIONS = [
  'Vercel', 'Netlify', 'AWS', 'Heroku', 'Docker', 'Static Hosting'
] as const;

// File Upload
export const FILE_UPLOAD = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  ALLOWED_ARCHIVE_TYPES: ['application/zip', 'application/x-rar-compressed'],
  MAX_FILES: 10
} as const;

// Validation
export const VALIDATION = {
  MIN_TITLE_LENGTH: 3,
  MAX_TITLE_LENGTH: 100,
  MIN_DESCRIPTION_LENGTH: 10,
  MAX_DESCRIPTION_LENGTH: 2000,
  MIN_PRICE: 0,
  MAX_PRICE: 10000,
  MIN_TAGS: 1,
  MAX_TAGS: 10
} as const;

// UI Constants
export const UI = {
  ANIMATION_DURATION: 200,
  DEBOUNCE_DELAY: 300,
  TOAST_DURATION: 3000,
  MODAL_Z_INDEX: 50,
  DROPDOWN_Z_INDEX: 40
} as const;

// Social Links
export const SOCIAL_LINKS = {
  TWITTER: 'https://twitter.com/devmarket',
  GITHUB: 'https://github.com/devmarket',
  LINKEDIN: 'https://linkedin.com/company/devmarket',
  DISCORD: 'https://discord.gg/devmarket'
} as const;

// Support
export const SUPPORT = {
  EMAIL: 'support@devmarket.com',
  PHONE: '+1 (555) 123-4567',
  HELP_CENTER: 'https://help.devmarket.com',
  DOCS: 'https://docs.devmarket.com'
} as const;

// Legal
export const LEGAL = {
  TERMS_URL: '/terms',
  PRIVACY_URL: '/privacy',
  COOKIE_URL: '/cookies',
  LICENSE_URL: '/licensing'
} as const;

// Feature Flags
export const FEATURES = {
  ENABLE_REVIEWS: true,
  ENABLE_WISHLIST: true,
  ENABLE_COMPARISON: true,
  ENABLE_SOCIAL_SHARING: true,
  ENABLE_ANALYTICS: true,
  ENABLE_NOTIFICATIONS: true
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  FORBIDDEN: 'Access denied.',
  NOT_FOUND: 'Resource not found.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  SERVER_ERROR: 'Server error. Please try again later.',
  FILE_TOO_LARGE: 'File size exceeds the maximum limit.',
  INVALID_FILE_TYPE: 'Invalid file type.',
  UPLOAD_FAILED: 'File upload failed. Please try again.'
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  PROJECT_CREATED: 'Project created successfully!',
  PROJECT_UPDATED: 'Project updated successfully!',
  PROJECT_DELETED: 'Project deleted successfully!',
  ORDER_PLACED: 'Order placed successfully!',
  REVIEW_SUBMITTED: 'Review submitted successfully!',
  WISHLIST_ADDED: 'Added to wishlist!',
  WISHLIST_REMOVED: 'Removed from wishlist!',
  CART_UPDATED: 'Cart updated successfully!',
  PROFILE_UPDATED: 'Profile updated successfully!'
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  CART: 'marketplace-cart',
  WISHLIST: 'marketplace-wishlist',
  USER_PREFERENCES: 'marketplace-user-preferences',
  SEARCH_HISTORY: 'marketplace-search-history',
  RECENT_VIEWS: 'marketplace-recent-views'
} as const;

// API Response Codes
export const API_CODES = {
  SUCCESS: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500
} as const;
