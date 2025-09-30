/**
 * Format a date relative to now (e.g., "2 hours ago")
 */
export function formatRelativeTime(date: string | Date): string {
    const now = new Date();
    const past = new Date(date);
    const diffMs = now.getTime() - past.getTime();
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);
  
    if (diffSecs < 60) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    if (diffWeeks < 4) return `${diffWeeks}w ago`;
    if (diffMonths < 12) return `${diffMonths}mo ago`;
    return `${diffYears}y ago`;
  }
  
  /**
   * Format date to a readable string
   */
  export function formatDate(date: string | Date, options?: Intl.DateTimeFormatOptions): string {
    const defaultOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      ...options,
    };
    return new Date(date).toLocaleDateString('en-US', defaultOptions);
  }
  
  /**
   * Format date and time
   */
  export function formatDateTime(date: string | Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  }
  
  /**
   * Format time only
   */
  export function formatTime(date: string | Date): string {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });
  }
  
  /**
   * Format duration in minutes/hours
   */
  export function formatDuration(minutes: number): string {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (mins === 0) return `${hours}h`;
    return `${hours}h ${mins}m`;
  }
  
  /**
   * Format price/currency
   */
  export function formatCurrency(amount: number, currency = 'USD'): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).format(amount);
  }
  
  /**
   * Format percentage
   */
  export function formatPercentage(value: number, decimals = 1): string {
    return `${value.toFixed(decimals)}%`;
  }
  
  /**
   * Format phone number (US format)
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
   * Format username with @ symbol
   */
  export function formatUsername(username: string): string {
    return username.startsWith('@') ? username : `@${username}`;
  }
  
  /**
   * Format hashtag
   */
  export function formatHashtag(tag: string): string {
    return tag.startsWith('#') ? tag : `#${tag}`;
  }
  
  /**
   * Format count with label (singular/plural)
   */
  export function formatCount(count: number, singular: string, plural?: string): string {
    const label = count === 1 ? singular : (plural || singular + 's');
    return `${count} ${label}`;
  }
  
  /**
   * Format list of items with commas and "and"
   */
  export function formatList(items: string[]): string {
    if (items.length === 0) return '';
    if (items.length === 1) return items[0];
    if (items.length === 2) return `${items[0]} and ${items[1]}`;
    const last = items[items.length - 1];
    const rest = items.slice(0, -1);
    return `${rest.join(', ')}, and ${last}`;
  }
  
  /**
   * Format bytes to human readable size
   */
  export function formatBytes(bytes: number, decimals = 2): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
  
  /**
   * Format markdown-style text (basic)
   */
  export function formatMarkdown(text: string): string {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br>');
  }
  
  /**
   * Format mentions in text
   */
  export function formatMentions(text: string): string {
    return text.replace(/@(\w+)/g, '<a href="/community/profiles/$1" class="text-blue-600 hover:underline">@$1</a>');
  }
  
  /**
   * Format hashtags in text
   */
  export function formatHashtags(text: string): string {
    return text.replace(/#(\w+)/g, '<a href="/community/search?tag=$1" class="text-blue-600 hover:underline">#$1</a>');
  }
  
  /**
   * Format links in text
   */
  export function formatLinks(text: string): string {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">$1</a>');
  }
  
  /**
   * Strip HTML tags from text
   */
  export function stripHtml(html: string): string {
    return html.replace(/<[^>]*>/g, '');
  }
  
  /**
   * Capitalize first letter
   */
  export function capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
  
  /**
   * Convert to title case
   */
  export function toTitleCase(text: string): string {
    return text.replace(/\w\S*/g, (word) => {
      return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
    });
  }
  
  /**
   * Convert to slug (URL-friendly string)
   */
  export function toSlug(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/--+/g, '-')
      .trim();
  }
  
  /**
   * Format social media links
   */
  export function formatSocialLink(platform: string, username: string): string {
    const platforms: Record<string, string> = {
      twitter: `https://twitter.com/${username}`,
      github: `https://github.com/${username}`,
      linkedin: `https://linkedin.com/in/${username}`,
      instagram: `https://instagram.com/${username}`,
    };
    return platforms[platform] || username;
  }
  
  /**
   * Format skill level
   */
  export function formatSkillLevel(level: number): string {
    if (level < 20) return 'Beginner';
    if (level < 40) return 'Novice';
    if (level < 60) return 'Intermediate';
    if (level < 80) return 'Advanced';
    return 'Expert';
  }
  
  /**
   * Format badge rarity
   */
  export function formatBadgeRarity(rarity: string): string {
    const rarityMap: Record<string, string> = {
      common: '⚪',
      rare: '🔵',
      epic: '🟣',
      legendary: '🟡',
    };
    return rarityMap[rarity] || '';
  }
  