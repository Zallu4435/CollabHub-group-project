// qa/lib/types/question.types.ts
import { User, Tag, Vote } from './common.types'

export interface Question {
  id: string
  title: string
  content: string
  author: User
  tags: Tag[]
  votes: number
  views: number
  answers: number
  isAnswered: boolean
  acceptedAnswerId?: string
  createdAt: string
  updatedAt: string
  bookmarked?: boolean
  followed?: boolean
}

export interface Answer {
  id: string
  questionId: string
  content: string
  author: User
  votes: number
  isAccepted: boolean
  createdAt: string
  updatedAt: string
  comments: Comment[]
  // Optional quick poll embedded within the answer
  poll?: {
    question?: string
    allowMultiple?: boolean
    options: Array<{
      id: string
      label: string
      votes: number
    }>
  }
}

export interface Comment {
  id: string
  content: string
  author: User
  targetId: string
  targetType: 'question' | 'answer'
  createdAt: string
  votes: number
}

// Re-export Tag so consumers can import from '../types/question.types'
export type { Tag } from './common.types'
