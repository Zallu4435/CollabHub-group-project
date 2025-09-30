// qa/lib/types/common.types.ts
export interface User {
    id: string
    name: string
    email: string
    avatar?: string
    reputation: number
    joinDate: string
    badges: Badge[]
    isOnline: boolean
  }
  
  export interface Badge {
    id: string
    name: string
    description: string
    icon: string
    color: string
    earnedDate: string
  }
  
  export interface Tag {
    id: string
    name: string
    description: string
    questionCount: number
    followers: number
    color: string
  }
  
  export interface Vote {
    id: string
    userId: string
    targetId: string
    targetType: 'question' | 'answer'
    type: 'up' | 'down'
    createdAt: string
  }
  