// market/src/lib/utils/validation.ts

/**
 * Email validation
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Password validation
 */
export function isValidPassword(password: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * URL validation
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Phone number validation
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

/**
 * Username validation
 */
export function isValidUsername(username: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (username.length < 3) {
    errors.push('Username must be at least 3 characters long');
  }
  
  if (username.length > 20) {
    errors.push('Username must be less than 20 characters');
  }
  
  if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
    errors.push('Username can only contain letters, numbers, hyphens, and underscores');
  }
  
  if (!/^[a-zA-Z]/.test(username)) {
    errors.push('Username must start with a letter');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Project title validation
 */
export function isValidProjectTitle(title: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (title.length < 3) {
    errors.push('Title must be at least 3 characters long');
  }
  
  if (title.length > 100) {
    errors.push('Title must be less than 100 characters');
  }
  
  if (!title.trim()) {
    errors.push('Title cannot be empty');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Project description validation
 */
export function isValidProjectDescription(description: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (description.length < 10) {
    errors.push('Description must be at least 10 characters long');
  }
  
  if (description.length > 2000) {
    errors.push('Description must be less than 2000 characters');
  }
  
  if (!description.trim()) {
    errors.push('Description cannot be empty');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Price validation
 */
export function isValidPrice(price: number): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (price < 0) {
    errors.push('Price cannot be negative');
  }
  
  if (price > 10000) {
    errors.push('Price cannot exceed $10,000');
  }
  
  if (!Number.isFinite(price)) {
    errors.push('Price must be a valid number');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * File validation
 */
export function isValidFile(file: File, options: {
  maxSize?: number;
  allowedTypes?: string[];
  maxFiles?: number;
} = {}): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  const { maxSize = 10 * 1024 * 1024, allowedTypes = [], maxFiles = 1 } = options;
  
  if (file.size > maxSize) {
    errors.push(`File size must be less than ${Math.round(maxSize / 1024 / 1024)}MB`);
  }
  
  if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
    errors.push(`File type must be one of: ${allowedTypes.join(', ')}`);
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Tag validation
 */
export function isValidTags(tags: string[]): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (tags.length === 0) {
    errors.push('At least one tag is required');
  }
  
  if (tags.length > 10) {
    errors.push('Maximum 10 tags allowed');
  }
  
  for (const tag of tags) {
    if (tag.length < 2) {
      errors.push('Each tag must be at least 2 characters long');
    }
    
    if (tag.length > 20) {
      errors.push('Each tag must be less than 20 characters');
    }
    
    if (!/^[a-zA-Z0-9\s-]+$/.test(tag)) {
      errors.push('Tags can only contain letters, numbers, spaces, and hyphens');
    }
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * License validation
 */
export function isValidLicense(license: string): boolean {
  const validLicenses = ['personal', 'commercial', 'extended', 'white-label'];
  return validLicenses.includes(license);
}

/**
 * Category validation
 */
export function isValidCategory(category: string): boolean {
  const validCategories = [
    'web-templates', 'mobile-apps', 'backend-apis', 'ui-ux-kits',
    'landing-pages', 'full-stack', 'ecommerce', 'dashboard', 'portfolio'
  ];
  return validCategories.includes(category);
}

/**
 * Rating validation
 */
export function isValidRating(rating: number): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (rating < 1 || rating > 5) {
    errors.push('Rating must be between 1 and 5');
  }
  
  if (!Number.isInteger(rating) && rating % 0.5 !== 0) {
    errors.push('Rating must be a whole number or half star (e.g., 3.5)');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Search query validation
 */
export function isValidSearchQuery(query: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (query.length < 2) {
    errors.push('Search query must be at least 2 characters long');
  }
  
  if (query.length > 100) {
    errors.push('Search query must be less than 100 characters');
  }
  
  if (!query.trim()) {
    errors.push('Search query cannot be empty');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Form validation helper
 */
export function validateForm<T extends Record<string, any>>(
  data: T,
  rules: Record<keyof T, (value: any) => { valid: boolean; errors: string[] }>
): { valid: boolean; errors: Record<keyof T, string[]> } {
  const errors: Record<keyof T, string[]> = {} as any;
  let valid = true;
  
  for (const [field, validator] of Object.entries(rules)) {
    const result = validator(data[field as keyof T]);
    errors[field as keyof T] = result.errors;
    
    if (!result.valid) {
      valid = false;
    }
  }
  
  return { valid, errors };
}

/**
 * Credit card validation
 */
export function isValidCreditCard(cardNumber: string): { valid: boolean; type?: string } {
  const cleanNumber = cardNumber.replace(/\D/g, '');
  
  // Luhn algorithm
  let sum = 0;
  let isEven = false;
  
  for (let i = cleanNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cleanNumber[i]);
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  const valid = sum % 10 === 0;
  
  // Card type detection
  let type: string | undefined;
  if (valid) {
    if (cleanNumber.startsWith('4')) {
      type = 'visa';
    } else if (cleanNumber.startsWith('5') || cleanNumber.startsWith('2')) {
      type = 'mastercard';
    } else if (cleanNumber.startsWith('3')) {
      type = 'amex';
    } else if (cleanNumber.startsWith('6')) {
      type = 'discover';
    }
  }
  
  return { valid, type };
}

/**
 * CVV validation
 */
export function isValidCVV(cvv: string, cardType?: string): boolean {
  const cleanCVV = cvv.replace(/\D/g, '');
  
  if (cardType === 'amex') {
    return cleanCVV.length === 4;
  }
  
  return cleanCVV.length === 3;
}

/**
 * Expiry date validation
 */
export function isValidExpiryDate(month: string, year: string): boolean {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  
  const expMonth = parseInt(month);
  const expYear = parseInt(year);
  
  if (expMonth < 1 || expMonth > 12) {
    return false;
  }
  
  if (expYear < currentYear) {
    return false;
  }
  
  if (expYear === currentYear && expMonth < currentMonth) {
    return false;
  }
  
  return true;
}

/**
 * ZIP code validation
 */
export function isValidZipCode(zipCode: string, country = 'US'): boolean {
  const cleanZip = zipCode.replace(/\D/g, '');
  
  switch (country) {
    case 'US':
      return /^\d{5}(-\d{4})?$/.test(zipCode);
    case 'CA':
      return /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/.test(zipCode);
    case 'UK':
      return /^[A-Za-z]{1,2}\d[A-Za-z\d]? \d[A-Za-z]{2}$/.test(zipCode);
    default:
      return cleanZip.length >= 3 && cleanZip.length <= 10;
  }
}

/**
 * Required field validation
 */
export function isRequired(value: any): boolean {
  if (value === null || value === undefined) {
    return false;
  }
  
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  
  if (Array.isArray(value)) {
    return value.length > 0;
  }
  
  return true;
}

/**
 * Min length validation
 */
export function hasMinLength(value: string, minLength: number): boolean {
  return value.length >= minLength;
}

/**
 * Max length validation
 */
export function hasMaxLength(value: string, maxLength: number): boolean {
  return value.length <= maxLength;
}

/**
 * Range validation
 */
export function isInRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

/**
 * Pattern validation
 */
export function matchesPattern(value: string, pattern: RegExp): boolean {
  return pattern.test(value);
}
