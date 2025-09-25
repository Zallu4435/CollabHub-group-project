// src/app/project/utils/dateUtils.ts
export const formatRelativeTime = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 604800)}w ago`;
    
    return date.toLocaleDateString();
  };
  
  export const formatDueDate = (dateString: string): { text: string; isOverdue: boolean; isUpcoming: boolean } => {
    const dueDate = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays < 0) {
      return { text: `Overdue by ${Math.abs(diffInDays)} days`, isOverdue: true, isUpcoming: false };
    } else if (diffInDays === 0) {
      return { text: 'Due today', isOverdue: false, isUpcoming: true };
    } else if (diffInDays <= 7) {
      return { text: `Due in ${diffInDays} days`, isOverdue: false, isUpcoming: true };
    } else {
      return { text: `Due ${dueDate.toLocaleDateString()}`, isOverdue: false, isUpcoming: false };
    }
  };
  