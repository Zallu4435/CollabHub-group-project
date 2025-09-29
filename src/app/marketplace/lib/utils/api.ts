// market/src/lib/utils/api.ts

import { sleep } from './helpers';
import { projects, categories, sellers, reviews } from '../mock-data';

/**
 * Mock API Response interface
 */
export interface MockResponse<T = any> {
  data: T;
  message: string;
  success: boolean;
  status: number;
}

/**
 * Mock API Error class
 */
export class MockError extends Error {
  public status: number;
  public code?: string;
  public details?: any;

  constructor(message: string, status: number, code?: string, details?: any) {
    super(message);
    this.name = 'MockError';
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

/**
 * Simulate API delay
 */
async function simulateDelay(min: number = 100, max: number = 500): Promise<void> {
  const delay = Math.random() * (max - min) + min;
  await sleep(delay);
}

/**
 * Create mock response
 */
function createResponse<T>(data: T, message: string = 'Success'): MockResponse<T> {
  return {
    data,
    message,
    success: true,
    status: 200
  };
}

/**
 * Create mock error
 */
function createError(message: string, status: number = 400): MockError {
  return new MockError(message, status);
}

/**
 * Projects API (Mock)
 */
export const projectsApi = {
  /**
   * Get all projects
   */
  getAll: async (params?: {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
    sort?: string;
    minPrice?: number;
    maxPrice?: number;
    license?: string;
    rating?: number;
  }) => {
    await simulateDelay();
    
    let filteredProjects = [...projects];
    
    // Apply filters
    if (params?.category) {
      filteredProjects = filteredProjects.filter(p => p.category === params.category);
    }
    
    if (params?.search) {
      const searchLower = params.search.toLowerCase();
      filteredProjects = filteredProjects.filter(p => 
        p.title.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower) ||
        p.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }
    
    if (params?.minPrice !== undefined) {
      filteredProjects = filteredProjects.filter(p => p.price >= params.minPrice!);
    }
    
    if (params?.maxPrice !== undefined) {
      filteredProjects = filteredProjects.filter(p => p.price <= params.maxPrice!);
    }
    
    if (params?.license) {
      filteredProjects = filteredProjects.filter(p => p.licenseType === params.license);
    }
    
    if (params?.rating) {
      filteredProjects = filteredProjects.filter(p => p.rating >= params.rating!);
    }
    
    // Apply sorting
    if (params?.sort) {
      switch (params.sort) {
        case 'newest':
          filteredProjects.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          break;
        case 'popular':
          filteredProjects.sort((a, b) => b.downloads - a.downloads);
          break;
        case 'rating':
          filteredProjects.sort((a, b) => b.rating - a.rating);
          break;
        case 'price-low':
          filteredProjects.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          filteredProjects.sort((a, b) => b.price - a.price);
          break;
        case 'downloads':
          filteredProjects.sort((a, b) => b.downloads - a.downloads);
          break;
      }
    }
    
    // Apply pagination
    const page = params?.page || 1;
    const limit = params?.limit || 12;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProjects = filteredProjects.slice(startIndex, endIndex);
    
    return createResponse({
      projects: paginatedProjects,
      total: filteredProjects.length,
      page,
      limit,
      totalPages: Math.ceil(filteredProjects.length / limit)
    });
  },

  /**
   * Get project by ID
   */
  getById: async (id: string) => {
    await simulateDelay();
    
    const project = projects.find(p => p.id === id);
    if (!project) {
      throw createError('Project not found', 404);
    }
    
    return createResponse(project);
  },

  /**
   * Create new project
   */
  create: async (data: any) => {
    await simulateDelay();
    
    const newProject = {
      id: `project_${Date.now()}`,
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    projects.push(newProject);
    return createResponse(newProject, 'Project created successfully');
  },

  /**
   * Update project
   */
  update: async (id: string, data: any) => {
    await simulateDelay();
    
    const projectIndex = projects.findIndex(p => p.id === id);
    if (projectIndex === -1) {
      throw createError('Project not found', 404);
    }
    
    projects[projectIndex] = {
      ...projects[projectIndex],
      ...data,
      updatedAt: new Date().toISOString()
    };
    
    return createResponse(projects[projectIndex], 'Project updated successfully');
  },

  /**
   * Delete project
   */
  delete: async (id: string) => {
    await simulateDelay();
    
    const projectIndex = projects.findIndex(p => p.id === id);
    if (projectIndex === -1) {
      throw createError('Project not found', 404);
    }
    
    projects.splice(projectIndex, 1);
    return createResponse(null, 'Project deleted successfully');
  },

  /**
   * Get featured projects
   */
  getFeatured: async () => {
    await simulateDelay();
    
    const featuredProjects = projects.filter(p => p.featured).slice(0, 6);
    return createResponse(featuredProjects);
  },

  /**
   * Get trending projects
   */
  getTrending: async () => {
    await simulateDelay();
    
    const trendingProjects = projects
      .sort((a, b) => b.downloads - a.downloads)
      .slice(0, 8);
    
    return createResponse(trendingProjects);
  },

  /**
   * Get related projects
   */
  getRelated: async (id: string) => {
    await simulateDelay();
    
    const project = projects.find(p => p.id === id);
    if (!project) {
      throw createError('Project not found', 404);
    }
    
    const relatedProjects = projects
      .filter(p => p.id !== id && p.category === project.category)
      .slice(0, 4);
    
    return createResponse(relatedProjects);
  },

  /**
   * Search projects
   */
  search: async (query: string, filters?: any) => {
    await simulateDelay();
    
    const searchLower = query.toLowerCase();
    const searchResults = projects.filter(p => 
      p.title.toLowerCase().includes(searchLower) ||
      p.description.toLowerCase().includes(searchLower) ||
      p.tags.some(tag => tag.toLowerCase().includes(searchLower))
    );
    
    return createResponse(searchResults);
  },
};

/**
 * Categories API (Mock)
 */
export const categoriesApi = {
  /**
   * Get all categories
   */
  getAll: async () => {
    await simulateDelay();
    return createResponse(categories);
  },

  /**
   * Get category by ID
   */
  getById: async (id: string) => {
    await simulateDelay();
    
    const category = categories.find(c => c.id === id);
    if (!category) {
      throw createError('Category not found', 404);
    }
    
    return createResponse(category);
  },

  /**
   * Get category projects
   */
  getProjects: async (id: string, params?: any) => {
    await simulateDelay();
    
    const categoryProjects = projects.filter(p => p.category === id);
    return createResponse(categoryProjects);
  },
};

/**
 * Sellers API (Mock)
 */
export const sellersApi = {
  /**
   * Get seller profile
   */
  getProfile: async (id: string) => {
    await simulateDelay();
    
    const seller = sellers.find(s => s.id === id);
    if (!seller) {
      throw createError('Seller not found', 404);
    }
    
    return createResponse(seller);
  },

  /**
   * Get seller projects
   */
  getProjects: async (id: string, params?: any) => {
    await simulateDelay();
    
    const sellerProjects = projects.filter(p => p.sellerId === id);
    return createResponse(sellerProjects);
  },

  /**
   * Update seller profile
   */
  updateProfile: async (id: string, data: any) => {
    await simulateDelay();
    
    const sellerIndex = sellers.findIndex(s => s.id === id);
    if (sellerIndex === -1) {
      throw createError('Seller not found', 404);
    }
    
    sellers[sellerIndex] = { ...sellers[sellerIndex], ...data };
    return createResponse(sellers[sellerIndex], 'Profile updated successfully');
  },

  /**
   * Get seller stats
   */
  getStats: async (id: string) => {
    await simulateDelay();
    
    const sellerProjects = projects.filter(p => p.sellerId === id);
    const totalSales = sellerProjects.reduce((sum, p) => sum + p.downloads, 0);
    const totalRevenue = sellerProjects.reduce((sum, p) => sum + (p.price * p.downloads), 0);
    const averageRating = sellerProjects.reduce((sum, p) => sum + p.rating, 0) / sellerProjects.length || 0;
    
    return createResponse({
      totalProjects: sellerProjects.length,
      totalSales,
      totalRevenue,
      averageRating: Math.round(averageRating * 10) / 10,
      joinDate: sellers.find(s => s.id === id)?.joinDate || new Date().toISOString()
    });
  },
};

/**
 * Reviews API (Mock)
 */
export const reviewsApi = {
  /**
   * Get project reviews
   */
  getByProject: async (projectId: string, params?: any) => {
    await simulateDelay();
    
    const projectReviews = reviews.filter(r => r.projectId === projectId);
    return createResponse(projectReviews);
  },

  /**
   * Create review
   */
  create: async (data: any) => {
    await simulateDelay();
    
    const newReview = {
      id: `review_${Date.now()}`,
      ...data,
      createdAt: new Date().toISOString()
    };
    
    reviews.push(newReview);
    return createResponse(newReview, 'Review created successfully');
  },

  /**
   * Update review
   */
  update: async (id: string, data: any) => {
    await simulateDelay();
    
    const reviewIndex = reviews.findIndex(r => r.id === id);
    if (reviewIndex === -1) {
      throw createError('Review not found', 404);
    }
    
    reviews[reviewIndex] = { ...reviews[reviewIndex], ...data };
    return createResponse(reviews[reviewIndex], 'Review updated successfully');
  },

  /**
   * Delete review
   */
  delete: async (id: string) => {
    await simulateDelay();
    
    const reviewIndex = reviews.findIndex(r => r.id === id);
    if (reviewIndex === -1) {
      throw createError('Review not found', 404);
    }
    
    reviews.splice(reviewIndex, 1);
    return createResponse(null, 'Review deleted successfully');
  },

  /**
   * Get user reviews
   */
  getByUser: async (userId: string) => {
    await simulateDelay();
    
    const userReviews = reviews.filter(r => r.userId === userId);
    return createResponse(userReviews);
  },
};

/**
 * Cart API (Mock - using localStorage)
 */
export const cartApi = {
  /**
   * Get cart items
   */
  getItems: async () => {
    await simulateDelay();
    
    const cartItems = JSON.parse(localStorage.getItem('marketplace-cart') || '[]');
    return createResponse(cartItems);
  },

  /**
   * Add item to cart
   */
  addItem: async (data: any) => {
    await simulateDelay();
    
    const cartItems = JSON.parse(localStorage.getItem('marketplace-cart') || '[]');
    const existingItem = cartItems.find((item: any) => 
      item.projectId === data.projectId && item.licenseType === data.licenseType
    );
    
    if (existingItem) {
      existingItem.quantity += data.quantity || 1;
    } else {
      cartItems.push(data);
    }
    
    localStorage.setItem('marketplace-cart', JSON.stringify(cartItems));
    return createResponse(cartItems, 'Item added to cart');
  },

  /**
   * Update cart item
   */
  updateItem: async (id: string, data: any) => {
    await simulateDelay();
    
    const cartItems = JSON.parse(localStorage.getItem('marketplace-cart') || '[]');
    const itemIndex = cartItems.findIndex((item: any) => item.id === id);
    
    if (itemIndex === -1) {
      throw createError('Cart item not found', 404);
    }
    
    cartItems[itemIndex] = { ...cartItems[itemIndex], ...data };
    localStorage.setItem('marketplace-cart', JSON.stringify(cartItems));
    return createResponse(cartItems, 'Cart item updated');
  },

  /**
   * Remove item from cart
   */
  removeItem: async (id: string) => {
    await simulateDelay();
    
    const cartItems = JSON.parse(localStorage.getItem('marketplace-cart') || '[]');
    const filteredItems = cartItems.filter((item: any) => item.id !== id);
    
    localStorage.setItem('marketplace-cart', JSON.stringify(filteredItems));
    return createResponse(filteredItems, 'Item removed from cart');
  },

  /**
   * Clear cart
   */
  clear: async () => {
    await simulateDelay();
    
    localStorage.removeItem('marketplace-cart');
    return createResponse([], 'Cart cleared');
  },
};

/**
 * Wishlist API (Mock - using localStorage)
 */
export const wishlistApi = {
  /**
   * Get wishlist items
   */
  getItems: async () => {
    await simulateDelay();
    
    const wishlistItems = JSON.parse(localStorage.getItem('marketplace-wishlist') || '[]');
    return createResponse(wishlistItems);
  },

  /**
   * Add item to wishlist
   */
  addItem: async (projectId: string) => {
    await simulateDelay();
    
    const wishlistItems = JSON.parse(localStorage.getItem('marketplace-wishlist') || '[]');
    
    if (!wishlistItems.includes(projectId)) {
      wishlistItems.push(projectId);
      localStorage.setItem('marketplace-wishlist', JSON.stringify(wishlistItems));
    }
    
    return createResponse(wishlistItems, 'Item added to wishlist');
  },

  /**
   * Remove item from wishlist
   */
  removeItem: async (projectId: string) => {
    await simulateDelay();
    
    const wishlistItems = JSON.parse(localStorage.getItem('marketplace-wishlist') || '[]');
    const filteredItems = wishlistItems.filter((id: string) => id !== projectId);
    
    localStorage.setItem('marketplace-wishlist', JSON.stringify(filteredItems));
    return createResponse(filteredItems, 'Item removed from wishlist');
  },

  /**
   * Check if item is in wishlist
   */
  isInWishlist: async (projectId: string) => {
    await simulateDelay();
    
    const wishlistItems = JSON.parse(localStorage.getItem('marketplace-wishlist') || '[]');
    const isInWishlist = wishlistItems.includes(projectId);
    
    return createResponse({ isInWishlist });
  },
};

/**
 * Upload API (Mock)
 */
export const uploadApi = {
  /**
   * Upload file
   */
  uploadFile: async (file: File, type: 'image' | 'archive' | 'document') => {
    await simulateDelay(500, 2000); // Simulate upload delay
    
    // Mock file upload response
    const mockUrl = `https://mock-cdn.com/uploads/${type}/${file.name}`;
    
    return createResponse({
      url: mockUrl,
      filename: file.name,
      size: file.size,
      type: file.type
    }, 'File uploaded successfully');
  },

  /**
   * Upload multiple files
   */
  uploadFiles: async (files: File[], type: 'image' | 'archive' | 'document') => {
    await simulateDelay(1000, 3000); // Simulate upload delay
    
    const uploadResults = files.map(file => ({
      url: `https://mock-cdn.com/uploads/${type}/${file.name}`,
      filename: file.name,
      size: file.size,
      type: file.type
    }));
    
    return createResponse(uploadResults, 'Files uploaded successfully');
  },
};

/**
 * Auth API (Mock)
 */
export const authApi = {
  /**
   * Login
   */
  login: async (email: string, password: string) => {
    await simulateDelay();
    
    // Mock authentication
    const mockUser = {
      id: 'user_1',
      email,
      name: 'John Doe',
      avatar: 'https://ui-avatars.com/api/?name=John+Doe',
      role: 'user'
    };
    
    return createResponse({
      user: mockUser,
      token: 'mock_jwt_token_' + Date.now()
    }, 'Login successful');
  },

  /**
   * Register
   */
  register: async (data: any) => {
    await simulateDelay();
    
    const mockUser = {
      id: 'user_' + Date.now(),
      ...data,
      role: 'user',
      createdAt: new Date().toISOString()
    };
    
    return createResponse({
      user: mockUser,
      token: 'mock_jwt_token_' + Date.now()
    }, 'Registration successful');
  },

  /**
   * Logout
   */
  logout: async () => {
    await simulateDelay();
    return createResponse(null, 'Logout successful');
  },

  /**
   * Refresh token
   */
  refreshToken: async () => {
    await simulateDelay();
    return createResponse({
      token: 'mock_jwt_token_' + Date.now()
    }, 'Token refreshed');
  },

  /**
   * Forgot password
   */
  forgotPassword: async (email: string) => {
    await simulateDelay();
    return createResponse(null, 'Password reset email sent');
  },

  /**
   * Reset password
   */
  resetPassword: async (token: string, password: string) => {
    await simulateDelay();
    return createResponse(null, 'Password reset successful');
  },

  /**
   * Verify email
   */
  verifyEmail: async (token: string) => {
    await simulateDelay();
    return createResponse(null, 'Email verified successfully');
  },
};

/**
 * Error handling utility
 */
export function handleApiError(error: any): string {
  if (error instanceof MockError) {
    switch (error.status) {
      case 400:
        return 'Invalid request. Please check your input.';
      case 401:
        return 'Please log in to continue.';
      case 403:
        return 'You do not have permission to perform this action.';
      case 404:
        return 'The requested resource was not found.';
      case 409:
        return 'This action conflicts with existing data.';
      case 422:
        return 'Please check your input and try again.';
      case 500:
        return 'Server error. Please try again later.';
      default:
        return error.message || 'An unexpected error occurred.';
    }
  }
  
  return 'Network error. Please check your connection.';
}

/**
 * Retry utility
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  delay = 1000
): Promise<T> {
  let lastError: any;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
      }
    }
  }
  
  throw lastError;
}
