// market/src/lib/utils/format.ts

/**
 * Format currency values
 */
export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(amount);
}

/**
 * Format large numbers with K, M, B suffixes
 */
export function formatNumber(num: number): string {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + 'B';
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

/**
 * Format file sizes
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Format relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(date: Date | string): string {
  const now = new Date();
  const targetDate = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - targetDate.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return 'just now';
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  }
  
  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `${diffInWeeks} week${diffInWeeks > 1 ? 's' : ''} ago`;
  }
  
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
  }
  
  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears} year${diffInYears > 1 ? 's' : ''} ago`;
}

/**
 * Format date in a readable format
 */
export function formatDate(date: Date | string, options?: Intl.DateTimeFormatOptions): string {
  const targetDate = new Date(date);
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options
  };
  
  return targetDate.toLocaleDateString('en-US', defaultOptions);
}

/**
 * Format date and time
 */
export function formatDateTime(date: Date | string): string {
  return formatDate(date, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

/**
 * Format percentage
 */
export function formatPercentage(value: number, decimals = 1): string {
  return `${(value * 100).toFixed(decimals)}%`;
}

/**
 * Format rating with stars
 */
export function formatRating(rating: number, maxRating = 5): string {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = maxRating - fullStars - (hasHalfStar ? 1 : 0);
  
  return '★'.repeat(fullStars) + 
         (hasHalfStar ? '☆' : '') + 
         '☆'.repeat(emptyStars);
}

/**
 * Format phone number
 */
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  
  return phone;
}

/**
 * Format URL slug
 */
export function formatSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Format text with ellipsis
 */
export function formatText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

/**
 * Format search query
 */
export function formatSearchQuery(query: string): string {
  return query
    .trim()
    .replace(/\s+/g, ' ')
    .toLowerCase();
}

/**
 * Format price range
 */
export function formatPriceRange(min: number, max: number, currency = 'USD'): string {
  if (min === max) {
    return formatCurrency(min, currency);
  }
  return `${formatCurrency(min, currency)} - ${formatCurrency(max, currency)}`;
}

/**
 * Format license type
 */
export function formatLicenseType(license: string): string {
  return license
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Format tech stack tags
 */
export function formatTechStack(tags: string[]): string[] {
  return tags.map(tag => 
    tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase()
  );
}

/**
 * Format file extension
 */
export function formatFileExtension(filename: string): string {
  return filename.split('.').pop()?.toUpperCase() || '';
}

/**
 * Format download count
 */
export function formatDownloadCount(count: number): string {
  if (count === 0) return 'No downloads';
  if (count === 1) return '1 download';
  return `${formatNumber(count)} downloads`;
}

/**
 * Format view count
 */
export function formatViewCount(count: number): string {
  if (count === 0) return 'No views';
  if (count === 1) return '1 view';
  return `${formatNumber(count)} views`;
}

/**
 * Format project status
 */
export function formatProjectStatus(status: string): string {
  const statusMap: Record<string, string> = {
    'draft': 'Draft',
    'published': 'Published',
    'featured': 'Featured',
    'archived': 'Archived',
    'rejected': 'Rejected',
    'pending': 'Pending Review'
  };
  
  return statusMap[status] || status;
}

/**
 * Format order status
 */
export function formatOrderStatus(status: string): string {
  const statusMap: Record<string, string> = {
    'pending': 'Pending',
    'processing': 'Processing',
    'completed': 'Completed',
    'cancelled': 'Cancelled',
    'refunded': 'Refunded'
  };
  
  return statusMap[status] || status;
}

/**
 * Format license price
 */
export function formatLicensePrice(basePrice: number, licenseType: string): number {
  const multipliers: Record<string, number> = {
    'personal': 1,
    'commercial': 1.5,
    'extended': 2.5,
    'white-label': 4
  };
  
  return basePrice * (multipliers[licenseType] || 1);
}

/**
 * Format discount percentage
 */
export function formatDiscount(originalPrice: number, discountedPrice: number): string {
  const discount = ((originalPrice - discountedPrice) / originalPrice) * 100;
  return `${Math.round(discount)}% off`;
}

/**
 * Format social media handle
 */
export function formatSocialHandle(handle: string, platform: string): string {
  const cleanHandle = handle.replace(/^@/, '');
  
  switch (platform.toLowerCase()) {
    case 'twitter':
    case 'x':
      return `@${cleanHandle}`;
    case 'github':
      return cleanHandle;
    case 'linkedin':
      return cleanHandle;
    default:
      return handle;
  }
}

/**
 * Format breadcrumb path
 */
export function formatBreadcrumbPath(path: string[]): Array<{ label: string; href: string }> {
  return path.map((segment, index) => ({
    label: segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' '),
    href: '/' + path.slice(0, index + 1).join('/')
  }));
}

/**
 * Format search suggestions
 */
export function formatSearchSuggestions(suggestions: string[]): string[] {
  return suggestions
    .map(s => s.trim())
    .filter(s => s.length > 0)
    .slice(0, 5);
}

/**
 * Format validation error
 */
export function formatValidationError(field: string, message: string): string {
  return `${field}: ${message}`;
}

/**
 * Format API error
 */
export function formatApiError(error: any): string {
  if (typeof error === 'string') return error;
  if (error?.message) return error.message;
  if (error?.error) return error.error;
  return 'An unexpected error occurred';
}
