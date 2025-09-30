// qa/lib/utils/helpers.ts
export const calculateReputation = (votes: number, answers: number, bestAnswers: number): number => {
    return (votes * 10) + (answers * 5) + (bestAnswers * 25)
  }
  
  export const getReputationLevel = (reputation: number): string => {
    if (reputation >= 10000) return 'Expert'
    if (reputation >= 5000) return 'Moderator'
    if (reputation >= 2500) return 'Trusted'
    if (reputation >= 1000) return 'Established'
    if (reputation >= 500) return 'Regular'
    if (reputation >= 100) return 'Contributor'
    return 'Newcomer'
  }
  
  export const generateId = (): string => {
    return Math.random().toString(36).substring(2) + Date.now().toString(36)
  }
  
  export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
  
  export const sanitizeHtml = (html: string): string => {
    // Basic HTML sanitization - in production, use a proper library like DOMPurify
    return html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
  }
  
  export const extractTextFromHtml = (html: string): string => {
    return html.replace(/<[^>]*>/g, '').trim()
  }
  
  export const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }
  