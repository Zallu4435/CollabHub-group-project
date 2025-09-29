// market/src/lib/utils/storage.ts

import { STORAGE_KEYS } from './constants';

/**
 * Storage utility class for managing localStorage and sessionStorage
 */
export class Storage {
  private storage: globalThis.Storage;

  constructor(type: 'local' | 'session' = 'local') {
    this.storage = type === 'local' ? localStorage : sessionStorage;
  }

  /**
   * Set item in storage
   */
  setItem<T>(key: string, value: T): void {
    try {
      const serializedValue = JSON.stringify(value);
      this.storage.setItem(key, serializedValue);
    } catch (error) {
      console.error('Error setting storage item:', error);
    }
  }

  /**
   * Get item from storage
   */
  getItem<T>(key: string, defaultValue?: T): T | null {
    try {
      const item = this.storage.getItem(key);
      if (item === null) {
        return defaultValue || null;
      }
      return JSON.parse(item);
    } catch (error) {
      console.error('Error getting storage item:', error);
      return defaultValue || null;
    }
  }

  /**
   * Remove item from storage
   */
  removeItem(key: string): void {
    try {
      this.storage.removeItem(key);
    } catch (error) {
      console.error('Error removing storage item:', error);
    }
  }

  /**
   * Clear all items from storage
   */
  clear(): void {
    try {
      this.storage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  }

  /**
   * Check if key exists in storage
   */
  hasItem(key: string): boolean {
    return this.storage.getItem(key) !== null;
  }

  /**
   * Get all keys from storage
   */
  getKeys(): string[] {
    const keys: string[] = [];
    for (let i = 0; i < this.storage.length; i++) {
      const key = this.storage.key(i);
      if (key) {
        keys.push(key);
      }
    }
    return keys;
  }

  /**
   * Get storage size in bytes
   */
  getSize(): number {
    let size = 0;
    for (let i = 0; i < this.storage.length; i++) {
      const key = this.storage.key(i);
      if (key) {
        const value = this.storage.getItem(key);
        if (value) {
          size += key.length + value.length;
        }
      }
    }
    return size;
  }
}

// Create storage instances
export const localStorage = new Storage('local');
export const sessionStorage = new Storage('session');

/**
 * Cart storage utilities
 */
export class CartStorage {
  private storage = new Storage('local');
  private key = STORAGE_KEYS.CART;

  /**
   * Get cart items
   */
  getItems(): CartItem[] {
    return this.storage.getItem(this.key, []);
  }

  /**
   * Set cart items
   */
  setItems(items: CartItem[]): void {
    this.storage.setItem(this.key, items);
  }

  /**
   * Add item to cart
   */
  addItem(item: CartItem): void {
    const items = this.getItems();
    const existingIndex = items.findIndex(i => 
      i.projectId === item.projectId && i.licenseType === item.licenseType
    );

    if (existingIndex >= 0) {
      items[existingIndex].quantity += item.quantity;
    } else {
      items.push(item);
    }

    this.setItems(items);
  }

  /**
   * Update item quantity
   */
  updateQuantity(projectId: string, licenseType: string, quantity: number): void {
    const items = this.getItems();
    const itemIndex = items.findIndex(i => 
      i.projectId === projectId && i.licenseType === licenseType
    );

    if (itemIndex >= 0) {
      if (quantity <= 0) {
        items.splice(itemIndex, 1);
      } else {
        items[itemIndex].quantity = quantity;
      }
      this.setItems(items);
    }
  }

  /**
   * Remove item from cart
   */
  removeItem(projectId: string, licenseType: string): void {
    const items = this.getItems();
    const filteredItems = items.filter(i => 
      !(i.projectId === projectId && i.licenseType === licenseType)
    );
    this.setItems(filteredItems);
  }

  /**
   * Clear cart
   */
  clear(): void {
    this.storage.removeItem(this.key);
  }

  /**
   * Get cart count
   */
  getCount(): number {
    const items = this.getItems();
    return items.reduce((total, item) => total + item.quantity, 0);
  }

  /**
   * Get cart total
   */
  getTotal(): number {
    const items = this.getItems();
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
}

/**
 * Wishlist storage utilities
 */
export class WishlistStorage {
  private storage = new Storage('local');
  private key = STORAGE_KEYS.WISHLIST;

  /**
   * Get wishlist items
   */
  getItems(): string[] {
    return this.storage.getItem(this.key, []);
  }

  /**
   * Set wishlist items
   */
  setItems(items: string[]): void {
    this.storage.setItem(this.key, items);
  }

  /**
   * Add item to wishlist
   */
  addItem(projectId: string): void {
    const items = this.getItems();
    if (!items.includes(projectId)) {
      items.push(projectId);
      this.setItems(items);
    }
  }

  /**
   * Remove item from wishlist
   */
  removeItem(projectId: string): void {
    const items = this.getItems();
    const filteredItems = items.filter(id => id !== projectId);
    this.setItems(filteredItems);
  }

  /**
   * Check if item is in wishlist
   */
  hasItem(projectId: string): boolean {
    const items = this.getItems();
    return items.includes(projectId);
  }

  /**
   * Toggle item in wishlist
   */
  toggleItem(projectId: string): boolean {
    if (this.hasItem(projectId)) {
      this.removeItem(projectId);
      return false;
    } else {
      this.addItem(projectId);
      return true;
    }
  }

  /**
   * Clear wishlist
   */
  clear(): void {
    this.storage.removeItem(this.key);
  }

  /**
   * Get wishlist count
   */
  getCount(): number {
    return this.getItems().length;
  }
}

/**
 * User preferences storage utilities
 */
export class UserPreferencesStorage {
  private storage = new Storage('local');
  private key = STORAGE_KEYS.USER_PREFERENCES;

  /**
   * Get user preferences
   */
  getPreferences(): UserPreferences {
    return this.storage.getItem(this.key, {
      theme: 'light',
      language: 'en',
      currency: 'USD',
      itemsPerPage: 12,
      sortBy: 'newest',
      viewMode: 'grid',
      notifications: {
        email: true,
        push: true,
        marketing: false
      }
    });
  }

  /**
   * Set user preferences
   */
  setPreferences(preferences: Partial<UserPreferences>): void {
    const current = this.getPreferences();
    const updated = { ...current, ...preferences };
    this.storage.setItem(this.key, updated);
  }

  /**
   * Update specific preference
   */
  updatePreference<K extends keyof UserPreferences>(
    key: K,
    value: UserPreferences[K]
  ): void {
    const preferences = this.getPreferences();
    preferences[key] = value;
    this.storage.setItem(this.key, preferences);
  }

  /**
   * Reset preferences to default
   */
  reset(): void {
    this.storage.removeItem(this.key);
  }
}

/**
 * Search history storage utilities
 */
export class SearchHistoryStorage {
  private storage = new Storage('local');
  private key = STORAGE_KEYS.SEARCH_HISTORY;
  private maxItems = 10;

  /**
   * Get search history
   */
  getHistory(): string[] {
    return this.storage.getItem(this.key, []);
  }

  /**
   * Add search query to history
   */
  addQuery(query: string): void {
    if (!query.trim()) return;

    const history = this.getHistory();
    const filteredHistory = history.filter(item => item !== query);
    filteredHistory.unshift(query);
    
    if (filteredHistory.length > this.maxItems) {
      filteredHistory.splice(this.maxItems);
    }

    this.storage.setItem(this.key, filteredHistory);
  }

  /**
   * Remove query from history
   */
  removeQuery(query: string): void {
    const history = this.getHistory();
    const filteredHistory = history.filter(item => item !== query);
    this.storage.setItem(this.key, filteredHistory);
  }

  /**
   * Clear search history
   */
  clear(): void {
    this.storage.removeItem(this.key);
  }

  /**
   * Get recent searches
   */
  getRecent(limit = 5): string[] {
    const history = this.getHistory();
    return history.slice(0, limit);
  }
}

/**
 * Recent views storage utilities
 */
export class RecentViewsStorage {
  private storage = new Storage('local');
  private key = STORAGE_KEYS.RECENT_VIEWS;
  private maxItems = 20;

  /**
   * Get recent views
   */
  getViews(): RecentView[] {
    return this.storage.getItem(this.key, []);
  }

  /**
   * Add view to recent
   */
  addView(projectId: string, projectTitle: string, projectImage?: string): void {
    const views = this.getViews();
    const existingIndex = views.findIndex(v => v.projectId === projectId);

    const newView: RecentView = {
      projectId,
      projectTitle,
      projectImage,
      viewedAt: new Date().toISOString()
    };

    if (existingIndex >= 0) {
      views.splice(existingIndex, 1);
    }

    views.unshift(newView);

    if (views.length > this.maxItems) {
      views.splice(this.maxItems);
    }

    this.storage.setItem(this.key, views);
  }

  /**
   * Remove view from recent
   */
  removeView(projectId: string): void {
    const views = this.getViews();
    const filteredViews = views.filter(v => v.projectId !== projectId);
    this.storage.setItem(this.key, filteredViews);
  }

  /**
   * Clear recent views
   */
  clear(): void {
    this.storage.removeItem(this.key);
  }

  /**
   * Get recent views count
   */
  getCount(): number {
    return this.getViews().length;
  }
}

// Create storage instances
export const cartStorage = new CartStorage();
export const wishlistStorage = new WishlistStorage();
export const userPreferencesStorage = new UserPreferencesStorage();
export const searchHistoryStorage = new SearchHistoryStorage();
export const recentViewsStorage = new RecentViewsStorage();

// Type definitions
export interface CartItem {
  projectId: string;
  projectTitle: string;
  projectImage?: string;
  price: number;
  licenseType: string;
  quantity: number;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  language: string;
  currency: string;
  itemsPerPage: number;
  sortBy: string;
  viewMode: 'grid' | 'list';
  notifications: {
    email: boolean;
    push: boolean;
    marketing: boolean;
  };
}

export interface RecentView {
  projectId: string;
  projectTitle: string;
  projectImage?: string;
  viewedAt: string;
}

/**
 * Storage migration utility
 */
export class StorageMigration {
  /**
   * Migrate old storage format to new format
   */
  static migrate(): void {
    try {
      // Example migration logic
      const oldCartKey = 'cart';
      const newCartKey = STORAGE_KEYS.CART;
      
      if (localStorage.hasItem(oldCartKey) && !localStorage.hasItem(newCartKey)) {
        const oldCart = localStorage.getItem(oldCartKey);
        if (oldCart) {
          localStorage.setItem(newCartKey, oldCart);
          localStorage.removeItem(oldCartKey);
        }
      }
    } catch (error) {
      console.error('Storage migration failed:', error);
    }
  }
}

/**
 * Storage cleanup utility
 */
export class StorageCleanup {
  /**
   * Clean up expired items
   */
  static cleanup(): void {
    try {
      const keys = localStorage.getKeys();
      const now = Date.now();
      
      keys.forEach(key => {
        if (key.startsWith('temp_') || key.startsWith('cache_')) {
          const item = localStorage.getItem(key);
          if (item && item.expiresAt && now > item.expiresAt) {
            localStorage.removeItem(key);
          }
        }
      });
    } catch (error) {
      console.error('Storage cleanup failed:', error);
    }
  }
}

// Initialize storage
if (typeof window !== 'undefined') {
  // Run migration on app start
  StorageMigration.migrate();
  
  // Clean up expired items
  StorageCleanup.cleanup();
  
  // Set up periodic cleanup
  setInterval(StorageCleanup.cleanup, 24 * 60 * 60 * 1000); // Daily
}
