// API Endpoints
export const API_ENDPOINTS = {
    PROFILES: '/api/profiles',
    POSTS: '/api/posts',
    GROUPS: '/api/groups',
    EVENTS: '/api/events',
    NOTIFICATIONS: '/api/notifications',
    BADGES: '/api/badges',
    LEADERBOARD: '/api/leaderboard',
    POLLS: '/api/polls',
    MENTORSHIP: '/api/mentorship',
    HANGOUTS: '/api/hangouts',
    ANALYTICS: '/api/analytics',
  } as const;
  
  // Routes
  export const ROUTES = {
    HOME: '/',
    COMMUNITY: '/community',
    FEED: '/community/feed',
    PROFILES: '/community/profiles',
    GROUPS: '/community/groups',
    EVENTS: '/community/events',
    GAMIFICATION: '/community/gamification',
    LEADERBOARD: '/community/leaderboard',
    BADGES: '/community/badges',
    NOTIFICATIONS: '/community/notifications',
    MENTORSHIP: '/community/mentorship',
    HANGOUTS: '/community/hangouts',
    ANALYTICS: '/community/analytics',
    MAP: '/community/map',
  } as const;
  
  // Pagination
  export const PAGINATION = {
    DEFAULT_PAGE_SIZE: 20,
    MAX_PAGE_SIZE: 100,
    POSTS_PER_PAGE: 10,
    COMMENTS_PER_PAGE: 20,
    MEMBERS_PER_PAGE: 24,
  } as const;
  
  // Media
  export const MEDIA = {
    MAX_IMAGE_SIZE: 5 * 1024 * 1024, // 5MB
    MAX_VIDEO_SIZE: 50 * 1024 * 1024, // 50MB
    ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    ALLOWED_VIDEO_TYPES: ['video/mp4', 'video/webm', 'video/ogg'],
    MAX_IMAGES_PER_POST: 10,
  } as const;
  
  // Text Limits
  export const TEXT_LIMITS = {
    POST_CONTENT: 5000,
    COMMENT_CONTENT: 1000,
    BIO_LENGTH: 500,
    GROUP_NAME: 100,
    GROUP_DESCRIPTION: 500,
    EVENT_TITLE: 200,
    EVENT_DESCRIPTION: 2000,
    POLL_QUESTION: 200,
    POLL_OPTION: 100,
  } as const;
  
  // Badge Rarity Colors
  export const BADGE_RARITY_COLORS = {
    common: {
      gradient: 'from-gray-400 to-gray-600',
      border: 'border-gray-400',
      bg: 'bg-gray-100',
      text: 'text-gray-700',
    },
    rare: {
      gradient: 'from-blue-400 to-blue-600',
      border: 'border-blue-500',
      bg: 'bg-blue-100',
      text: 'text-blue-700',
    },
    epic: {
      gradient: 'from-purple-400 to-purple-600',
      border: 'border-purple-500',
      bg: 'bg-purple-100',
      text: 'text-purple-700',
    },
    legendary: {
      gradient: 'from-yellow-400 to-orange-600',
      border: 'border-yellow-500',
      bg: 'bg-yellow-100',
      text: 'text-yellow-700',
    },
  } as const;
  
  // Points & Rewards
  export const POINTS = {
    POST_CREATED: 50,
    COMMENT_ADDED: 10,
    REACTION_RECEIVED: 5,
    PROFILE_VIEW: 1,
    EVENT_ATTENDED: 100,
    GROUP_JOINED: 20,
    BADGE_EARNED: 100,
    DAILY_LOGIN: 10,
  } as const;
  
  // Avatar Sizes
  export const AVATAR_SIZES = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
    '2xl': 'w-24 h-24',
  } as const;
  
  // Status Colors
  export const STATUS_COLORS = {
    online: 'bg-green-500',
    away: 'bg-yellow-500',
    busy: 'bg-red-500',
    offline: 'bg-gray-400',
  } as const;
  
  // Event Types
  export const EVENT_TYPES = {
    ONLINE: 'online',
    IN_PERSON: 'in-person',
    HYBRID: 'hybrid',
  } as const;
  
  export const EVENT_TYPE_COLORS = {
    online: 'bg-blue-100 text-blue-700',
    'in-person': 'bg-green-100 text-green-700',
    hybrid: 'bg-purple-100 text-purple-700',
  } as const;
  
  // Group Privacy
  export const GROUP_PRIVACY = {
    PUBLIC: 'public',
    PRIVATE: 'private',
    INVITE_ONLY: 'invite-only',
  } as const;
  
  // Notification Types
  export const NOTIFICATION_TYPES = {
    LIKE: 'like',
    COMMENT: 'comment',
    FOLLOW: 'follow',
    MENTION: 'mention',
    EVENT: 'event',
    BADGE: 'badge',
  } as const;
  
  // Time Formats
  export const TIME_FORMATS = {
    SHORT_DATE: 'MMM dd',
    LONG_DATE: 'MMMM dd, yyyy',
    DATE_TIME: 'MMM dd, yyyy h:mm a',
    TIME_ONLY: 'h:mm a',
  } as const;
  
  // Challenge Types
  export const CHALLENGE_TYPES = {
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    SPECIAL: 'special',
  } as const;
  
  // Reactions
  export const REACTIONS = [
    { emoji: '👍', name: 'like', label: 'Like' },
    { emoji: '❤️', name: 'love', label: 'Love' },
    { emoji: '🎉', name: 'celebrate', label: 'Celebrate' },
    { emoji: '💡', name: 'insightful', label: 'Insightful' },
    { emoji: '😂', name: 'funny', label: 'Funny' },
    { emoji: '🤔', name: 'curious', label: 'Curious' },
  ] as const;
  
  // Mentorship Availability
  export const MENTORSHIP_AVAILABILITY = {
    AVAILABLE: 'available',
    LIMITED: 'limited',
    UNAVAILABLE: 'unavailable',
  } as const;
  
  export const AVAILABILITY_COLORS = {
    available: 'bg-green-100 text-green-700',
    limited: 'bg-yellow-100 text-yellow-700',
    unavailable: 'bg-red-100 text-red-700',
  } as const;
  
  // Local Storage Keys
  export const STORAGE_KEYS = {
    AUTH_TOKEN: 'auth_token',
    USER_PREFERENCES: 'user_preferences',
    THEME: 'theme',
    DRAFT_POST: 'draft_post',
    VIEWED_STORIES: 'viewed_stories',
  } as const;
  
  // Toast Messages
  export const TOAST_MESSAGES = {
    POST_CREATED: 'Post created successfully!',
    POST_DELETED: 'Post deleted successfully!',
    COMMENT_ADDED: 'Comment added!',
    GROUP_JOINED: 'You joined the group!',
    GROUP_LEFT: 'You left the group!',
    EVENT_RSVP: 'RSVP confirmed!',
    FOLLOW_SUCCESS: 'Now following!',
    UNFOLLOW_SUCCESS: 'Unfollowed!',
    ERROR: 'Something went wrong. Please try again.',
  } as const;
  
  // Placeholder Images
  export const PLACEHOLDERS = {
    AVATAR: '/placeholders/avatar.png',
    COVER: '/placeholders/cover.jpg',
    GROUP: '/placeholders/group.jpg',
    EVENT: '/placeholders/event.jpg',
    POST_IMAGE: '/placeholders/post-image.jpg',
  } as const;
  
  // Community Categories
  export const CATEGORIES = [
    'Programming',
    'Design',
    'Marketing',
    'Business',
    'Gaming',
    'Music',
    'Sports',
    'Education',
    'Technology',
    'Health & Fitness',
    'Art & Creativity',
    'Science',
    'Other',
  ] as const;
  
  // Skills & Interests (Popular ones)
  export const POPULAR_SKILLS = [
    'JavaScript',
    'TypeScript',
    'React',
    'Node.js',
    'Python',
    'Java',
    'Go',
    'Rust',
    'AWS',
    'Docker',
    'Kubernetes',
    'UI/UX Design',
    'Figma',
    'Product Management',
    'Data Science',
    'Machine Learning',
    'DevOps',
    'System Design',
  ] as const;
  
  // Countries for Map
  export const COUNTRIES = [
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' },
    { value: 'au', label: 'Australia' },
    { value: 'in', label: 'India' },
    { value: 'de', label: 'Germany' },
    { value: 'fr', label: 'France' },
    { value: 'jp', label: 'Japan' },
    { value: 'cn', label: 'China' },
    { value: 'br', label: 'Brazil' },
  ] as const;
  