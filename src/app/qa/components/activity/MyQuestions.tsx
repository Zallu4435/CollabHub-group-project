// qa/components/activity/MyQuestions.tsx
"use client"

import { useState } from 'react'
import Link from 'next/link'
import { 
  MessageCircle, Eye, ThumbsUp, MessageSquare, Clock, 
  Edit3, Trash2, MoreHorizontal, Search, Filter, 
  CheckCircle, AlertCircle, XCircle
} from 'lucide-react'
import { Card } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'

interface Question {
  id: string
  title: string
  content: string
  tags: string[]
  status: 'answered' | 'unanswered' | 'closed'
  views: number
  upvotes: number
  answers: number
  createdAt: string
  lastActivity: string
  isAccepted: boolean
}

const mockQuestions: Question[] = [
  {
    id: '1',
    title: 'How to implement infinite scrolling in React with TypeScript?',
    content: 'I\'m trying to implement infinite scrolling in my React application using TypeScript. I\'ve tried several approaches but none seem to work correctly...',
    tags: ['react', 'typescript', 'infinite-scroll'],
    status: 'answered',
    views: 1247,
    upvotes: 23,
    answers: 5,
    createdAt: '2024-01-15',
    lastActivity: '2 hours ago',
    isAccepted: true
  },
  {
    id: '2',
    title: 'Best practices for state management in large React applications',
    content: 'What are the current best practices for managing state in large React applications? I\'m considering Redux, Zustand, or Context API...',
    tags: ['react', 'state-management', 'redux', 'best-practices'],
    status: 'answered',
    views: 892,
    upvotes: 18,
    answers: 8,
    createdAt: '2024-01-12',
    lastActivity: '1 day ago',
    isAccepted: false
  },
  {
    id: '3',
    title: 'TypeScript error: Property does not exist on type',
    content: 'I\'m getting a TypeScript error that says "Property \'x\' does not exist on type \'y\'". How can I properly type this?',
    tags: ['typescript', 'types', 'error'],
    status: 'unanswered',
    views: 456,
    upvotes: 5,
    answers: 0,
    createdAt: '2024-01-10',
    lastActivity: '3 days ago',
    isAccepted: false
  },
  {
    id: '4',
    title: 'How to optimize bundle size in Next.js applications?',
    content: 'My Next.js application bundle is getting quite large. What are the best strategies to optimize and reduce the bundle size?',
    tags: ['nextjs', 'optimization', 'bundle-size', 'performance'],
    status: 'answered',
    views: 1567,
    upvotes: 31,
    answers: 12,
    createdAt: '2024-01-08',
    lastActivity: '4 hours ago',
    isAccepted: true
  },
  {
    id: '5',
    title: 'CSS Grid vs Flexbox: When to use which?',
    content: 'I\'m confused about when to use CSS Grid versus Flexbox. Can someone explain the differences and use cases?',
    tags: ['css', 'grid', 'flexbox', 'layout'],
    status: 'closed',
    views: 2341,
    upvotes: 45,
    answers: 15,
    createdAt: '2024-01-05',
    lastActivity: '1 week ago',
    isAccepted: true
  }
]

export default function MyQuestions() {
  const [questions, setQuestions] = useState(mockQuestions)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'answered' | 'unanswered' | 'closed'>('all')
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'most-viewed' | 'most-upvoted'>('newest')

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'answered': return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'unanswered': return <AlertCircle className="w-4 h-4 text-yellow-600" />
      case 'closed': return <XCircle className="w-4 h-4 text-red-600" />
      default: return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'answered': return 'success'
      case 'unanswered': return 'warning'
      case 'closed': return 'error'
      default: return 'secondary'
    }
  }

  const filteredQuestions = questions.filter(question => {
    const matchesSearch = question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         question.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         question.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesStatus = statusFilter === 'all' || question.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const sortedQuestions = [...filteredQuestions].sort((a, b) => {
    switch (sortBy) {
      case 'newest': return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      case 'oldest': return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      case 'most-viewed': return b.views - a.views
      case 'most-upvoted': return b.upvotes - a.upvotes
      default: return 0
    }
  })

  const handleDeleteQuestion = (questionId: string) => {
    setQuestions(prev => prev.filter(q => q.id !== questionId))
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="space-y-6">
      {/* Header and Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">My Questions</h2>
          <p className="text-sm text-gray-600">Manage and track your questions</p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
          <Button variant="ghost" size="sm">
            <Filter className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Filters and Sort */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Status:</span>
          <div className="flex bg-gray-100 rounded-lg p-1">
            {[
              { id: 'all', label: 'All' },
              { id: 'answered', label: 'Answered' },
              { id: 'unanswered', label: 'Unanswered' },
              { id: 'closed', label: 'Closed' }
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
            <option value="most-viewed">Most Viewed</option>
            <option value="most-upvoted">Most Upvoted</option>
          </select>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {sortedQuestions.length === 0 ? (
          <Card className="p-8 text-center">
            <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No questions found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'You haven\'t asked any questions yet'
              }
            </p>
            {!searchTerm && statusFilter === 'all' && (
              <Button variant="primary">
                Ask Your First Question
              </Button>
            )}
          </Card>
        ) : (
          sortedQuestions.map(question => (
            <Card key={question.id} className="hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {getStatusIcon(question.status)}
                      <Badge variant={getStatusColor(question.status)} size="sm">
                        {question.status}
                      </Badge>
                      {question.isAccepted && (
                        <Badge variant="success" size="sm">
                          ✓ Accepted
                        </Badge>
                      )}
                    </div>
                    
                    <Link 
                      href={`/qa/question/${question.id}`}
                      className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors mb-2 block"
                    >
                      {question.title}
                    </Link>
                    
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {question.content}
                    </p>
                    
                    <div className="flex items-center gap-2 mb-3">
                      {question.tags.map(tag => (
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
                      onClick={() => handleDeleteQuestion(question.id)}
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
                      <span>{question.views.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="w-4 h-4" />
                      <span>{question.upvotes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="w-4 h-4" />
                      <span>{question.answers}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>Asked {formatDate(question.createdAt)}</span>
                    </div>
                    <span>Last activity {question.lastActivity}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Pagination */}
      {sortedQuestions.length > 0 && (
        <div className="flex items-center justify-between pt-6 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            Showing {sortedQuestions.length} of {questions.length} questions
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
