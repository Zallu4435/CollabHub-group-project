// qa/components/activity/MyAnswers.tsx
"use client"

import { useState } from 'react'
import Link from 'next/link'
import { 
  User, Eye, ThumbsUp, MessageSquare, Clock, 
  Edit3, Trash2, MoreHorizontal, Search, Filter, 
  CheckCircle, Star, Award, TrendingUp, XCircle
} from 'lucide-react'
import { Card } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'

interface Answer {
  id: string
  questionId: string
  questionTitle: string
  content: string
  tags: string[]
  status: 'accepted' | 'pending' | 'rejected'
  views: number
  upvotes: number
  downvotes: number
  createdAt: string
  lastActivity: string
  isBestAnswer: boolean
  reputation: number
}

const mockAnswers: Answer[] = [
  {
    id: '1',
    questionId: '1',
    questionTitle: 'How to implement infinite scrolling in React with TypeScript?',
    content: 'Here\'s a comprehensive solution for implementing infinite scrolling in React with TypeScript. I\'ll show you the most efficient approach using Intersection Observer API...',
    tags: ['react', 'typescript', 'infinite-scroll'],
    status: 'accepted',
    views: 1247,
    upvotes: 23,
    downvotes: 2,
    createdAt: '2024-01-15',
    lastActivity: '2 hours ago',
    isBestAnswer: true,
    reputation: 115
  },
  {
    id: '2',
    questionId: '2',
    questionTitle: 'Best practices for state management in large React applications',
    content: 'For large React applications, I recommend a combination of approaches. Here\'s my experience with different state management solutions...',
    tags: ['react', 'state-management', 'redux'],
    status: 'pending',
    views: 892,
    upvotes: 18,
    downvotes: 1,
    createdAt: '2024-01-12',
    lastActivity: '1 day ago',
    isBestAnswer: false,
    reputation: 90
  },
  {
    id: '3',
    questionId: '3',
    questionTitle: 'TypeScript error: Property does not exist on type',
    content: 'This TypeScript error typically occurs when you\'re trying to access a property that doesn\'t exist on the type. Here are the most common solutions...',
    tags: ['typescript', 'types', 'error'],
    status: 'pending',
    views: 456,
    upvotes: 5,
    downvotes: 0,
    createdAt: '2024-01-10',
    lastActivity: '3 days ago',
    isBestAnswer: false,
    reputation: 25
  },
  {
    id: '4',
    questionId: '4',
    questionTitle: 'How to optimize bundle size in Next.js applications?',
    content: 'Bundle size optimization in Next.js is crucial for performance. Here are the most effective strategies I\'ve used in production applications...',
    tags: ['nextjs', 'optimization', 'bundle-size'],
    status: 'accepted',
    views: 1567,
    upvotes: 31,
    downvotes: 3,
    createdAt: '2024-01-08',
    lastActivity: '4 hours ago',
    isBestAnswer: true,
    reputation: 155
  },
  {
    id: '5',
    questionId: '5',
    questionTitle: 'CSS Grid vs Flexbox: When to use which?',
    content: 'Great question! CSS Grid and Flexbox serve different purposes. Here\'s a comprehensive comparison to help you decide...',
    tags: ['css', 'grid', 'flexbox'],
    status: 'accepted',
    views: 2341,
    upvotes: 45,
    downvotes: 2,
    createdAt: '2024-01-05',
    lastActivity: '1 week ago',
    isBestAnswer: true,
    reputation: 225
  }
]

export default function MyAnswers() {
  const [answers, setAnswers] = useState(mockAnswers)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'accepted' | 'pending' | 'rejected'>('all')
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'most-upvoted' | 'most-reputation'>('newest')

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'accepted': return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'pending': return <Clock className="w-4 h-4 text-yellow-600" />
      case 'rejected': return <XCircle className="w-4 h-4 text-red-600" />
      default: return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted': return 'success'
      case 'pending': return 'warning'
      case 'rejected': return 'error'
      default: return 'secondary'
    }
  }

  const filteredAnswers = answers.filter(answer => {
    const matchesSearch = answer.questionTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         answer.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         answer.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesStatus = statusFilter === 'all' || answer.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const sortedAnswers = [...filteredAnswers].sort((a, b) => {
    switch (sortBy) {
      case 'newest': return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      case 'oldest': return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      case 'most-upvoted': return b.upvotes - a.upvotes
      case 'most-reputation': return b.reputation - a.reputation
      default: return 0
    }
  })

  const handleDeleteAnswer = (answerId: string) => {
    setAnswers(prev => prev.filter(a => a.id !== answerId))
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const totalReputation = answers.reduce((sum, answer) => sum + answer.reputation, 0)
  const totalUpvotes = answers.reduce((sum, answer) => sum + answer.upvotes, 0)
  const acceptedAnswers = answers.filter(answer => answer.status === 'accepted').length

  return (
    <div className="space-y-6">
      {/* Header and Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">My Answers</h2>
          <p className="text-sm text-gray-600">Track your contributions and reputation</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-lg font-bold text-green-600">+{totalReputation}</div>
            <div className="text-xs text-gray-600">Total Reputation</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600">{acceptedAnswers}</div>
            <div className="text-xs text-gray-600">Accepted</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-purple-600">{totalUpvotes}</div>
            <div className="text-xs text-gray-600">Upvotes</div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search answers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
          <Button variant="ghost" size="sm">
            <Filter className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Status:</span>
            <div className="flex bg-gray-100 rounded-lg p-1">
              {[
                { id: 'all', label: 'All' },
                { id: 'accepted', label: 'Accepted' },
                { id: 'pending', label: 'Pending' },
                { id: 'rejected', label: 'Rejected' }
              ].map(option => (
                <button
                  key={option.id}
                  onClick={() => setStatusFilter(option.id as any)}
                  className={`
                    px-3 py-1.5 text-sm font-medium rounded-md transition-colors
                    ${statusFilter === option.id
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
              className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="most-upvoted">Most Upvoted</option>
              <option value="most-reputation">Most Reputation</option>
            </select>
          </div>
        </div>
      </div>

      {/* Answers List */}
      <div className="space-y-4">
        {sortedAnswers.length === 0 ? (
          <Card className="p-8 text-center">
            <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No answers found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'You haven\'t answered any questions yet'
              }
            </p>
            {!searchTerm && statusFilter === 'all' && (
              <Button variant="primary">
                Start Answering Questions
              </Button>
            )}
          </Card>
        ) : (
          sortedAnswers.map(answer => (
            <Card key={answer.id} className="hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {getStatusIcon(answer.status)}
                      <Badge variant={getStatusColor(answer.status)} size="sm">
                        {answer.status}
                      </Badge>
                      {answer.isBestAnswer && (
                        <Badge variant="success" size="sm" className="flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          Best Answer
                        </Badge>
                      )}
                      <Badge variant="primary" size="sm" className="flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        +{answer.reputation} rep
                      </Badge>
                    </div>
                    
                    <Link 
                      href={`/qa/question/${answer.questionId}`}
                      className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors mb-2 block"
                    >
                      {answer.questionTitle}
                    </Link>
                    
                    <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                      {answer.content}
                    </p>
                    
                    <div className="flex items-center gap-2 mb-3">
                      {answer.tags.map(tag => (
                        <Badge key={tag} variant="secondary" size="sm">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <Button variant="ghost" size="sm">
                      <Edit3 className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleDeleteAnswer(answer.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{answer.views.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="w-4 h-4" />
                      <span>{answer.upvotes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-red-500">↓</span>
                      <span>{answer.downvotes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Award className="w-4 h-4 text-yellow-600" />
                      <span>+{answer.reputation}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>Answered {formatDate(answer.createdAt)}</span>
                    </div>
                    <span>Last activity {answer.lastActivity}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Pagination */}
      {sortedAnswers.length > 0 && (
        <div className="flex items-center justify-between pt-6 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            Showing {sortedAnswers.length} of {answers.length} answers
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">Previous</Button>
            <Button variant="primary" size="sm">1</Button>
            <Button variant="ghost" size="sm">2</Button>
            <Button variant="ghost" size="sm">3</Button>
            <Button variant="ghost" size="sm">Next</Button>
          </div>
        </div>
      )}
    </div>
  )
}
