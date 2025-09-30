// qa/components/activity/DraftsList.tsx
"use client"

import { useState } from 'react'
import { 
  FileText, Edit3, Trash2, Clock, Search, Filter, 
  Plus, Eye, Send, Save, AlertCircle, CheckCircle
} from 'lucide-react'
import { Card } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'

interface Draft {
  id: string
  title: string
  content: string
  type: 'question' | 'answer'
  tags: string[]
  createdAt: string
  lastModified: string
  wordCount: number
  status: 'draft' | 'ready' | 'needs-review'
  questionId?: string
  questionTitle?: string
}

const mockDrafts: Draft[] = [
  {
    id: '1',
    title: 'How to implement custom hooks in React with TypeScript?',
    content: 'I\'m working on a React application and want to create custom hooks with proper TypeScript support. I\'ve been trying to implement a custom hook for API calls but I\'m running into some type issues...\n\nHere\'s what I\'ve tried so far:\n\n```typescript\nconst useApi = <T>(url: string) => {\n  const [data, setData] = useState<T | null>(null);\n  const [loading, setLoading] = useState(false);\n  const [error, setError] = useState<string | null>(null);\n\n  // Implementation details...\n};\n```\n\nBut I\'m getting TypeScript errors when trying to use this hook. Can someone help me understand the proper way to type custom hooks?',
    type: 'question',
    tags: ['react', 'typescript', 'custom-hooks'],
    createdAt: '2024-01-20',
    lastModified: '2024-01-21',
    wordCount: 156,
    status: 'ready'
  },
  {
    id: '2',
    title: 'Answer to: Best practices for error handling in Node.js applications',
    content: 'Here are some comprehensive best practices for error handling in Node.js applications:\n\n## 1. Use Error Classes\nCreate custom error classes that extend the built-in Error class:\n\n```javascript\nclass ValidationError extends Error {\n  constructor(message) {\n    super(message);\n    this.name = \'ValidationError\';\n  }\n}\n```\n\n## 2. Centralized Error Handling\nImplement a centralized error handling middleware for Express applications...',
    type: 'answer',
    tags: ['nodejs', 'error-handling', 'best-practices'],
    createdAt: '2024-01-19',
    lastModified: '2024-01-20',
    wordCount: 234,
    status: 'draft',
    questionId: '123',
    questionTitle: 'Best practices for error handling in Node.js applications'
  },
  {
    id: '3',
    title: 'CSS Grid vs Flexbox: When to use which?',
    content: 'I\'m confused about when to use CSS Grid versus Flexbox. Both seem to solve similar layout problems but I\'m not sure about the specific use cases for each...\n\nCould someone explain:\n1. The main differences between Grid and Flexbox\n2. When to use each one\n3. Can they be used together?\n4. Performance considerations\n\nI\'ve read some documentation but I\'d like to hear from developers with real-world experience.',
    type: 'question',
    tags: ['css', 'grid', 'flexbox', 'layout'],
    createdAt: '2024-01-18',
    lastModified: '2024-01-19',
    wordCount: 89,
    status: 'needs-review'
  },
  {
    id: '4',
    title: 'Answer to: How to optimize React component re-renders?',
    content: 'Optimizing React component re-renders is crucial for performance. Here are the key strategies:\n\n## 1. Use React.memo()\nWrap components that receive props that don\'t change frequently:\n\n```jsx\nconst ExpensiveComponent = React.memo(({ data }) => {\n  // Component logic\n});\n```\n\n## 2. useMemo and useCallback\nUse these hooks to memoize expensive calculations and functions...',
    type: 'answer',
    tags: ['react', 'performance', 'optimization'],
    createdAt: '2024-01-17',
    lastModified: '2024-01-18',
    wordCount: 178,
    status: 'ready',
    questionId: '456',
    questionTitle: 'How to optimize React component re-renders?'
  }
]

export default function DraftsList() {
  const [drafts, setDrafts] = useState(mockDrafts)
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState<'all' | 'question' | 'answer'>('all')
  const [statusFilter, setStatusFilter] = useState<'all' | 'draft' | 'ready' | 'needs-review'>('all')
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'last-modified' | 'word-count'>('last-modified')

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ready': return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'needs-review': return <AlertCircle className="w-4 h-4 text-yellow-600" />
      case 'draft': return <FileText className="w-4 h-4 text-gray-600" />
      default: return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': return 'success'
      case 'needs-review': return 'warning'
      case 'draft': return 'secondary'
      default: return 'secondary'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'question': return 'primary'
      case 'answer': return 'secondary'
      default: return 'secondary'
    }
  }

  const filteredDrafts = drafts.filter(draft => {
    const matchesSearch = draft.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         draft.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         draft.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesType = typeFilter === 'all' || draft.type === typeFilter
    const matchesStatus = statusFilter === 'all' || draft.status === statusFilter
    return matchesSearch && matchesType && matchesStatus
  })

  const sortedDrafts = [...filteredDrafts].sort((a, b) => {
    switch (sortBy) {
      case 'newest': return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      case 'oldest': return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      case 'last-modified': return new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime()
      case 'word-count': return b.wordCount - a.wordCount
      default: return 0
    }
  })

  const handleDeleteDraft = (draftId: string) => {
    setDrafts(prev => prev.filter(d => d.id !== draftId))
  }

  const handlePublishDraft = (draftId: string) => {
    // In a real app, this would publish the draft
    console.log('Publishing draft:', draftId)
    setDrafts(prev => prev.filter(d => d.id !== draftId))
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const totalDrafts = drafts.length
  const readyDrafts = drafts.filter(d => d.status === 'ready').length
  const totalWords = drafts.reduce((sum, draft) => sum + draft.wordCount, 0)

  return (
    <div className="space-y-6">
      {/* Header and Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Drafts</h2>
          <p className="text-sm text-gray-600">Manage your unpublished questions and answers</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600">{totalDrafts}</div>
            <div className="text-xs text-gray-600">Total Drafts</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-green-600">{readyDrafts}</div>
            <div className="text-xs text-gray-600">Ready to Publish</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-purple-600">{totalWords}</div>
            <div className="text-xs text-gray-600">Total Words</div>
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
              placeholder="Search drafts..."
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
            <span className="text-sm text-gray-600">Type:</span>
            <div className="flex bg-gray-100 rounded-lg p-1">
              {[
                { id: 'all', label: 'All' },
                { id: 'question', label: 'Questions' },
                { id: 'answer', label: 'Answers' }
              ].map(option => (
                <button
                  key={option.id}
                  onClick={() => setTypeFilter(option.id as any)}
                  className={`
                    px-3 py-1.5 text-sm font-medium rounded-md transition-colors
                    ${typeFilter === option.id
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
            <span className="text-sm text-gray-600">Status:</span>
            <div className="flex bg-gray-100 rounded-lg p-1">
              {[
                { id: 'all', label: 'All' },
                { id: 'draft', label: 'Draft' },
                { id: 'ready', label: 'Ready' },
                { id: 'needs-review', label: 'Review' }
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
              <option value="last-modified">Last Modified</option>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="word-count">Word Count</option>
            </select>
          </div>
        </div>
      </div>

      {/* Drafts List */}
      <div className="space-y-4">
        {sortedDrafts.length === 0 ? (
          <Card className="p-8 text-center">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No drafts found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || typeFilter !== 'all' || statusFilter !== 'all'
                ? 'Try adjusting your search or filter criteria'
                : 'You don\'t have any drafts yet'
              }
            </p>
            {!searchTerm && typeFilter === 'all' && statusFilter === 'all' && (
              <div className="flex items-center justify-center gap-2">
                <Button variant="primary">
                  <Plus className="w-4 h-4 mr-2" />
                  New Question
                </Button>
                <Button variant="secondary">
                  <Plus className="w-4 h-4 mr-2" />
                  New Answer
                </Button>
              </div>
            )}
          </Card>
        ) : (
          sortedDrafts.map(draft => (
            <Card key={draft.id} className="hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {getStatusIcon(draft.status)}
                      <Badge variant={getStatusColor(draft.status)} size="sm">
                        {draft.status}
                      </Badge>
                      <Badge variant={getTypeColor(draft.type)} size="sm">
                        {draft.type}
                      </Badge>
                      {draft.questionTitle && (
                        <Badge variant="secondary" size="sm">
                          Answer to: {draft.questionTitle}
                        </Badge>
                      )}
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {draft.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                      {draft.content}
                    </p>
                    
                    <div className="flex items-center gap-2 mb-3">
                      {draft.tags.map(tag => (
                        <Badge key={tag} variant="secondary" size="sm">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit3 className="w-4 h-4" />
                    </Button>
                    {draft.status === 'ready' && (
                      <Button 
                        variant="primary" 
                        size="sm"
                        onClick={() => handlePublishDraft(draft.id)}
                        className="flex items-center gap-1"
                      >
                        <Send className="w-3 h-3" />
                        Publish
                      </Button>
                    )}
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleDeleteDraft(draft.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <FileText className="w-4 h-4" />
                      <span>{draft.wordCount} words</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>Created {formatDate(draft.createdAt)}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Save className="w-4 h-4" />
                    <span>Modified {formatDate(draft.lastModified)}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Pagination */}
      {sortedDrafts.length > 0 && (
        <div className="flex items-center justify-between pt-6 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            Showing {sortedDrafts.length} of {drafts.length} drafts
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
