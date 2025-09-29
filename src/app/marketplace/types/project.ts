// market/src/types/project.ts
import { ProjectState } from './purchase-request';

export interface Project {
    id: string;
    title: string;
    description: string;
    shortDescription: string;
    sellerId: string;
    sellerName: string;
    sellerAvatar?: string;
    
    // Technical specs
    techStack: string[];
    framework?: string;
    database?: string;
    deployment: string[];
    browserCompat: string[];
    mobileResponsive: boolean;
    
    // Media
    screenshots: string[];
    demoUrl?: string;
    videoUrl?: string;
    documentationUrl?: string;
    
    // Pricing & licensing
    price: number;
    licenseType: LicenseType;
    
    // Categories
    category: string;
    subcategory?: string;
    tags: string[];
    
    // Stats
    downloads: number;
    views: number;
    rating: number;
    reviewCount: number;
    
    // Status
    featured: boolean;
    trending: boolean;
    isNew: boolean;
    
    // Request-based purchase settings
    isRequestOnly: boolean;
    state: ProjectState;
    requiresApproval: boolean;
    autoApprove: boolean;
    maxRequestsPerBuyer: number;
    
    // Request statistics
    totalRequests: number;
    pendingRequests: number;
    approvedRequests: number;
    rejectedRequests: number;
    completedRequests: number;
    
    createdAt: string;
    updatedAt: string;
    lastRequestAt?: string;
  }
  
  export type LicenseType = 'personal' | 'commercial' | 'extended' | 'white-label';

export interface Seller {
  id: string;
  displayName?: string;
  name?: string;
  username: string;
  bio?: string;
  avatar?: string;
  location?: string;
  website?: string;
  github?: string;
  twitter?: string;
  linkedin?: string;
  verified: boolean;
  badges?: string[];
  rating: number;
  salesCount?: number;
  totalSales?: number;
  reviewCount?: number;
  followerCount?: number;
  joinedAt?: string;
  joinDate?: string;
  lastActiveAt?: string;
  socialLinks?: {
    twitter?: string;
    github?: string;
    linkedin?: string;
    dribbble?: string;
  };
  languages?: string[];
  specialties?: string[];
}
  
  export interface ProjectFilter {
    category?: string;
    techStack?: string[];
    priceRange?: [number, number];
    licenseType?: LicenseType;
    rating?: number;
    sortBy?: 'newest' | 'popular' | 'price-low' | 'price-high' | 'rating';
  }
  