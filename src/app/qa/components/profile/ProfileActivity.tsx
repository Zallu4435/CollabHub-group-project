// qa/components/profile/ProfileActivity.tsx
"use client"

import { useState } from 'react'
import { 
  MessageCircle, UserCheck, ThumbsUp, Award, Eye, 
  Calendar, Filter, Search, Clock, Tag, ExternalLink
} from 'lucide-react'
import { Card } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'

type ProfileActivityProps = { userId: string }

interface ActivityItem {
  id: string
  type: 'question_asked' | 'answer_given' | 'question_upvoted' | 'answer_upvoted' | 'answer_accepted' | 'badge_earned' | 'question_viewed'
  title: string
  description: string
  date: string
  points?: number
  tags?: string[]
  questionId?: string
  answerId?: string
  badgeName?: string
  views?: number
  upvotes?: number
}

const mockActivity: ActivityItem[] = [
  {
    id: '1',
    type: 'answer_accepted',
    title: 'Answer accepted for "How to implement infinite scrolling in React with TypeScript?"',
    description: 'Your answer was marked as the accepted solution',
    date: '2024-01-21T10:30:00Z',
    points: 15,
    tags: ['react', 'typescript', 'infinite-scroll'],
    questionId: 'q1'
  },
  {
    id: '2',
    type: 'answer_upvoted',
    title: 'Answer upvoted for "Best practices for state management in large React applications"',
    description: 'Your answer received 3 upvotes',
    date: '2024-01-20T14:15:00Z',
    points: 10,
    tags: ['react', 'state-management', 'best-practices'],
    questionId: 'q2',
    upvotes: 3
  },
  {
    id: '3',
    type: 'badge_earned',
    title: 'Badge earned: Expert',
    description: 'You earned the Expert badge for consistent high-quality contributions',
    date: '2024-01-19T09:00:00Z',
    points: 100,
    badgeName: 'Expert'
  },
  {
    id: '4',
    type: 'question_asked',
    title: 'Asked: "TypeScript error: Property does not exist on type"',
    description: 'You asked a new question about TypeScript type errors',
    date: '2024-01-18T16:45:00Z',
    tags: ['typescript', 'error-handling', 'types'],
    questionId: 'q3',
    views: 42
  },
  {
    id: '5',
    type: 'answer_given',
    title: 'Answered: "How to optimize bundle size in Next.js applications?"',
    description: 'You provided a comprehensive answer about Next.js optimization',
    date: '2024-01-17T11:20:00Z',
    tags: ['nextjs', 'optimization', 'bundle-size'],
    questionId: 'q4',
    upvotes: 5
  },
  {
    id: '6',
    type: 'question_upvoted',
    title: 'Question upvoted: "CSS Grid vs Flexbox: When to use which?"',
    description: 'Your question received 2 upvotes',
    date: '2024-01-16T13:30:00Z',
    points: 5,
    tags: ['css', 'grid', 'flexbox'],
    questionId: 'q5',
    upvotes: 2
  },
  {
    id: '7',
    type: 'answer_given',
    title: 'Answered: "WebAssembly with React: Real-world Use Cases"',
    description: 'You shared insights about WebAssembly integration with React',
    date: '2024-01-15T15:10:00Z',
    tags: ['webassembly', 'react', 'performance'],
    questionId: 'q6',
    upvotes: 7
  },
  {
    id: '8',
    type: 'question_viewed',
    title: 'Viewed: "Advanced React Patterns: Render Props vs HOCs"',
    description: 'You viewed a question about React patterns',
    date: '2024-01-14T12:00:00Z',
    tags: ['react', 'patterns', 'hoc', 'render-props'],
    questionId: 'q7',
    views: 1
  }
]

export default function ProfileActivity({ userId }: ProfileActivityProps) {
  const [filter, setFilter] = useState<'all' | 'questions' | 'answers' | 'badges' | 'upvotes'>('all')
  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'points'>('recent')

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'question_asked': return <MessageCircle className="w-5 h-5 text-blue-600" />
      case 'answer_given': return <UserCheck className="w-5 h-5 text-green-600" />
      case 'question_upvoted': return <ThumbsUp className="w-5 h-5 text-green-600" />
      case 'answer_upvoted': return <ThumbsUp className="w-5 h-5 text-green-600" />
      case 'answer_accepted': return <Award className="w-5 h-5 text-yellow-600" />
      case 'badge_earned': return <Award className="w-5 h-5 text-purple-600" />
      case 'question_viewed': return <Eye className="w-5 h-5 text-gray-600" />
      default: return <Clock className="w-5 h-5 text-gray-600" />
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'question_asked': return 'text-blue-600'
      case 'answer_given': return 'text-green-600'
      case 'question_upvoted': return 'text-green-600'
      case 'answer_upvoted': return 'text-green-600'
      case 'answer_accepted': return 'text-yellow-600'
      case 'badge_earned': return 'text-purple-600'
      case 'question_viewed': return 'text-gray-600'
      default: return 'text-gray-600'
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const filteredActivity = mockActivity.filter(item => {
    if (filter === 'all') return true
    if (filter === 'questions') return item.type === 'question_asked' || item.type === 'question_upvoted'
    if (filter === 'answers') return item.type === 'answer_given' || item.type === 'answer_upvoted' || item.type === 'answer_accepted'
    if (filter === 'badges') return item.type === 'badge_earned'
    if (filter === 'upvotes') return item.type === 'question_upvoted' || item.type === 'answer_upvoted'
    return true
  })

  const sortedActivity = [...filteredActivity].sort((a, b) => {
    if (sortBy === 'recent') return new Date(b.date).getTime() - new Date(a.date).getTime()
    if (sortBy === 'popular') return (b.upvotes || 0) - (a.upvotes || 0)
    if (sortBy === 'points') return (b.points || 0) - (a.points || 0)
    return 0
  })

  const activityStats = {
    total: mockActivity.length,
    questions: mockActivity.filter(a => a.type === 'question_asked').length,
    answers: mockActivity.filter(a => a.type === 'answer_given').length,
    upvotes: mockActivity.filter(a => a.type === 'question_upvoted' || a.type === 'answer_upvoted').length,
    badges: mockActivity.filter(a => a.type === 'badge_earned').length
  }

  return (
    <div className="space-y-6">
      {/* Header and Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Activity Timeline</h2>
          <p className="text-sm text-gray-600">Track all your contributions and interactions</p>
        </div>
        
        <div className="flex items-center gap-4">
          {Object.entries(activityStats).map(([key, value]) => (
            <div key={key} className="text-center">
              <div className="text-lg font-bold text-gray-900">{value}</div>
              <div className="text-xs text-gray-600 capitalize">{key}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters and Sorting */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Filter:</span>
          <div className="flex bg-gray-100 rounded-lg p-1">
            {[
              { id: 'all', label: 'All Activity' },
              { id: 'questions', label: 'Questions' },
              { id: 'answers', label: 'Answers' },
              { id: 'badges', label: 'Badges' },
              { id: 'upvotes', label: 'Upvotes' }
            ].map(option => (
              <button
                key={option.id}
                onClick={() => setFilter(option.id as any)}
                className={`
                  px-3 py-1.5 text-sm font-medium rounded-md transition-colors
                  ${filter === option.id
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                  }
                `}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          >
            <option value="recent">Most Recent</option>
            <option value="popular">Most Popular</option>
            <option value="points">Most Points</option>
          </select>
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="space-y-4">
        {sortedActivity.map((activity, index) => (
          <Card key={activity.id} className="p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                <div className={`p-2 rounded-lg bg-gray-50 ${getActivityColor(activity.type)}`}>
                  {getActivityIcon(activity.type)}
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
                    {activity.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-gray-500 flex-shrink-0">
                    <Clock className="w-3 h-3" />
                    {formatDate(activity.date)}
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-3">{activity.description}</p>
                
                <div className="flex items-center gap-4 flex-wrap">
                  {activity.points && (
                    <div className="flex items-center gap-1 text-sm font-medium text-green-600">
                      <span>+{activity.points}</span>
                      <span className="text-gray-500">points</span>
                    </div>
                  )}
                  
                  {activity.upvotes && (
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <ThumbsUp className="w-3 h-3" />
                      <span>{activity.upvotes} upvotes</span>
                    </div>
                  )}
                  
                  {activity.views && (
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Eye className="w-3 h-3" />
                      <span>{activity.views} views</span>
                    </div>
                  )}
                  
                  {activity.badgeName && (
                    <Badge variant="secondary" size="sm">
                      {activity.badgeName}
                    </Badge>
                  )}
                </div>
                
                {activity.tags && activity.tags.length > 0 && (
                  <div className="flex items-center gap-2 mt-3 flex-wrap">
                    {activity.tags.map(tag => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded"
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                
                {(activity.questionId || activity.answerId) && (
                  <div className="mt-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-blue-600 hover:text-blue-800 p-0 h-auto"
                    >
                      View Details
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="secondary" size="md">
          Load More Activity
        </Button>
      </div>
    </div>
  )
}
