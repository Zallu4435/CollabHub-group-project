// qa/components/profile/ProfileStats.tsx
"use client"

import { useState } from 'react'
import { 
  TrendingUp, TrendingDown, Award, MessageCircle, UserCheck, 
  ThumbsUp, Eye, Calendar, BarChart3, Target, Star
} from 'lucide-react'
import { Card } from '../ui/Card'
import { Badge } from '../ui/Badge'

type ProfileStatsProps = { userId: string }

interface ReputationEvent {
  id: string
  type: 'question_upvote' | 'answer_upvote' | 'answer_accepted' | 'badge_earned' | 'question_downvote' | 'answer_downvote'
  points: number
  description: string
  date: string
  questionTitle?: string
  answerTitle?: string
  badgeName?: string
}

const mockReputationEvents: ReputationEvent[] = [
  {
    id: '1',
    type: 'answer_accepted',
    points: 15,
    description: 'Answer accepted',
    date: '2024-01-21',
    questionTitle: 'How to implement infinite scrolling in React with TypeScript?'
  },
  {
    id: '2',
    type: 'answer_upvote',
    points: 10,
    description: 'Answer upvoted',
    date: '2024-01-20',
    questionTitle: 'Best practices for state management in large React applications'
  },
  {
    id: '3',
    type: 'badge_earned',
    points: 100,
    description: 'Badge earned',
    date: '2024-01-19',
    badgeName: 'Expert'
  },
  {
    id: '4',
    type: 'answer_upvote',
    points: 10,
    description: 'Answer upvoted',
    date: '2024-01-18',
    questionTitle: 'TypeScript error: Property does not exist on type'
  },
  {
    id: '5',
    type: 'question_upvote',
    points: 5,
    description: 'Question upvoted',
    date: '2024-01-17',
    questionTitle: 'How to optimize bundle size in Next.js applications?'
  },
  {
    id: '6',
    type: 'answer_upvote',
    points: 10,
    description: 'Answer upvoted',
    date: '2024-01-16',
    questionTitle: 'CSS Grid vs Flexbox: When to use which?'
  },
  {
    id: '7',
    type: 'answer_upvote',
    points: 10,
    description: 'Answer upvoted',
    date: '2024-01-15',
    questionTitle: 'WebAssembly with React: Real-world Use Cases'
  },
  {
    id: '8',
    type: 'answer_upvote',
    points: 10,
    description: 'Answer upvoted',
    date: '2024-01-14',
    questionTitle: 'Advanced React Patterns: Render Props vs HOCs'
  }
]

export default function ProfileStats({ userId }: ProfileStatsProps) {
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'year' | 'all'>('month')

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'question_upvote': return <ThumbsUp className="w-4 h-4 text-green-600" />
      case 'answer_upvote': return <ThumbsUp className="w-4 h-4 text-green-600" />
      case 'answer_accepted': return <Award className="w-4 h-4 text-yellow-600" />
      case 'badge_earned': return <Star className="w-4 h-4 text-purple-600" />
      case 'question_downvote': return <TrendingDown className="w-4 h-4 text-red-600" />
      case 'answer_downvote': return <TrendingDown className="w-4 h-4 text-red-600" />
      default: return <TrendingUp className="w-4 h-4 text-blue-600" />
    }
  }

  const getEventColor = (type: string) => {
    switch (type) {
      case 'question_upvote': return 'text-green-600'
      case 'answer_upvote': return 'text-green-600'
      case 'answer_accepted': return 'text-yellow-600'
      case 'badge_earned': return 'text-purple-600'
      case 'question_downvote': return 'text-red-600'
      case 'answer_downvote': return 'text-red-600'
      default: return 'text-blue-600'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const totalReputation = mockReputationEvents.reduce((sum, event) => sum + event.points, 0)
  const thisWeekReputation = mockReputationEvents
    .filter(event => {
      const eventDate = new Date(event.date)
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      return eventDate >= weekAgo
    })
    .reduce((sum, event) => sum + event.points, 0)

  const reputationBreakdown = {
    answers: mockReputationEvents.filter(e => e.type === 'answer_upvote' || e.type === 'answer_accepted').length,
    questions: mockReputationEvents.filter(e => e.type === 'question_upvote').length,
    badges: mockReputationEvents.filter(e => e.type === 'badge_earned').length
  }

  return (
    <div className="space-y-6">
      {/* Header and Stats Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Reputation History</h2>
          <p className="text-sm text-gray-600">Track your reputation changes over time</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">+{totalReputation}</div>
            <div className="text-xs text-gray-600">Total Earned</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">+{thisWeekReputation}</div>
            <div className="text-xs text-gray-600">This Week</div>
          </div>
        </div>
      </div>

      {/* Timeframe Filter */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">Timeframe:</span>
        <div className="flex bg-gray-100 rounded-lg p-1">
          {[
            { id: 'week', label: 'This Week' },
            { id: 'month', label: 'This Month' },
            { id: 'year', label: 'This Year' },
            { id: 'all', label: 'All Time' }
          ].map(option => (
            <button
              key={option.id}
              onClick={() => setTimeframe(option.id as any)}
              className={`
                px-3 py-1.5 text-sm font-medium rounded-md transition-colors
                ${timeframe === option.id
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

      {/* Reputation Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <UserCheck className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">From Answers</h3>
              <p className="text-sm text-gray-600">{reputationBreakdown.answers} events</p>
            </div>
          </div>
          <div className="text-2xl font-bold text-green-600">
            +{mockReputationEvents.filter(e => e.type === 'answer_upvote' || e.type === 'answer_accepted').reduce((sum, e) => sum + e.points, 0)}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <MessageCircle className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">From Questions</h3>
              <p className="text-sm text-gray-600">{reputationBreakdown.questions} events</p>
            </div>
          </div>
          <div className="text-2xl font-bold text-blue-600">
            +{mockReputationEvents.filter(e => e.type === 'question_upvote').reduce((sum, e) => sum + e.points, 0)}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Award className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">From Badges</h3>
              <p className="text-sm text-gray-600">{reputationBreakdown.badges} events</p>
            </div>
          </div>
          <div className="text-2xl font-bold text-purple-600">
            +{mockReputationEvents.filter(e => e.type === 'badge_earned').reduce((sum, e) => sum + e.points, 0)}
          </div>
        </Card>
      </div>

      {/* Reputation Timeline */}
      <Card className="p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {mockReputationEvents.map((event, index) => (
            <div key={event.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0 mt-1">
                {getEventIcon(event.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`font-semibold ${getEventColor(event.type)}`}>
                    +{event.points}
                  </span>
                  <span className="text-sm text-gray-600">{event.description}</span>
                  {event.badgeName && (
                    <Badge variant="secondary" size="sm">
                      {event.badgeName}
                    </Badge>
                  )}
                </div>
                {(event.questionTitle || event.answerTitle) && (
                  <p className="text-sm text-gray-700 truncate">
                    {event.questionTitle || event.answerTitle}
                  </p>
                )}
                <p className="text-xs text-gray-500">{formatDate(event.date)}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Reputation Chart Placeholder */}
      <Card className="p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Reputation Trend</h3>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">Reputation chart coming soon</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
