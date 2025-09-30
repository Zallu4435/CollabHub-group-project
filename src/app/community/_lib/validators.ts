import { TEXT_LIMITS, MEDIA } from './constants';

/**
 * Validate post content
 */
export function validatePostContent(content: string): { valid: boolean; error?: string } {
  if (!content || content.trim().length === 0) {
    return { valid: false, error: 'Post content cannot be empty' };
  }
  if (content.length > TEXT_LIMITS.POST_CONTENT) {
    return { valid: false, error: `Post content must be less than ${TEXT_LIMITS.POST_CONTENT} characters` };
  }
  return { valid: true };
}

/**
 * Validate comment content
 */
export function validateCommentContent(content: string): { valid: boolean; error?: string } {
  if (!content || content.trim().length === 0) {
    return { valid: false, error: 'Comment cannot be empty' };
  }
  if (content.length > TEXT_LIMITS.COMMENT_CONTENT) {
    return { valid: false, error: `Comment must be less than ${TEXT_LIMITS.COMMENT_CONTENT} characters` };
  }
  return { valid: true };
}

/**
 * Validate email
 */
export function validateEmail(email: string): { valid: boolean; error?: string } {
  if (!email || email.trim().length === 0) {
    return { valid: false, error: 'Email is required' };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, error: 'Invalid email format' };
  }
  return { valid: true };
}

/**
 * Validate username
 */
export function validateUsername(username: string): { valid: boolean; error?: string } {
  if (!username || username.trim().length === 0) {
    return { valid: false, error: 'Username is required' };
  }
  if (username.length < 3) {
    return { valid: false, error: 'Username must be at least 3 characters' };
  }
  if (username.length > 20) {
    return { valid: false, error: 'Username must be less than 20 characters' };
  }
  const usernameRegex = /^[a-zA-Z0-9_]+$/;
  if (!usernameRegex.test(username)) {
    return { valid: false, error: 'Username can only contain letters, numbers, and underscores' };
  }
  return { valid: true };
}

/**
 * Validate image file
 */
export function validateImageFile(file: File): { valid: boolean; error?: string } {
  if (!(MEDIA.ALLOWED_IMAGE_TYPES as readonly string[]).includes(file.type as any)) {
    return { valid: false, error: 'Invalid image type. Please upload JPG, PNG, GIF, or WebP' };
  }
  if (file.size > MEDIA.MAX_IMAGE_SIZE) {
    return { valid: false, error: `Image size must be less than ${MEDIA.MAX_IMAGE_SIZE / 1024 / 1024}MB` };
  }
  return { valid: true };
}

/**
 * Validate video file
 */
export function validateVideoFile(file: File): { valid: boolean; error?: string } {
  if (!(MEDIA.ALLOWED_VIDEO_TYPES as readonly string[]).includes(file.type as any)) {
    return { valid: false, error: 'Invalid video type. Please upload MP4, WebM, or OGG' };
  }
  if (file.size > MEDIA.MAX_VIDEO_SIZE) {
    return { valid: false, error: `Video size must be less than ${MEDIA.MAX_VIDEO_SIZE / 1024 / 1024}MB` };
  }
  return { valid: true };
}

/**
 * Validate URL
 */
export function validateUrl(url: string): { valid: boolean; error?: string } {
  if (!url || url.trim().length === 0) {
    return { valid: false, error: 'URL is required' };
  }
  try {
    new URL(url);
    return { valid: true };
  } catch {
    return { valid: false, error: 'Invalid URL format' };
  }
}

/**
 * Validate required field
 */
export function validateRequired(value: any, fieldName: string): { valid: boolean; error?: string } {
  if (value === null || value === undefined || value === '') {
    return { valid: false, error: `${fieldName} is required` };
  }
  if (typeof value === 'string' && value.trim().length === 0) {
    return { valid: false, error: `${fieldName} is required` };
  }
  return { valid: true };
}

/**
 * Validate min length
 */
export function validateMinLength(value: string, minLength: number, fieldName: string): { valid: boolean; error?: string } {
  if (value.length < minLength) {
    return { valid: false, error: `${fieldName} must be at least ${minLength} characters` };
  }
  return { valid: true };
}

/**
 * Validate max length
 */
export function validateMaxLength(value: string, maxLength: number, fieldName: string): { valid: boolean; error?: string } {
  if (value.length > maxLength) {
    return { valid: false, error: `${fieldName} must be less than ${maxLength} characters` };
  }
  return { valid: true };
}
