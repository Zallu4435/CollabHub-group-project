// qa/components/activity/BookmarkedQuestions.tsx
"use client"

import { useState } from 'react'
import Link from 'next/link'
import { 
  Bookmark, Eye, ThumbsUp, MessageSquare, Clock, 
  Trash2, MoreHorizontal, Search, Filter, 
  CheckCircle, AlertCircle, XCircle, Star, Tag
} from 'lucide-react'
import { Card } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'

interface BookmarkedQuestion {
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
  bookmarkedAt: string
  isAccepted: boolean
  author: {
    name: string
    reputation: number
  }
}

const mockBookmarkedQuestions: BookmarkedQuestion[] = [
  {
    id: '1',
    title: 'Advanced React Patterns: Render Props vs HOCs',
    content: 'I\'m trying to understand the differences between Render Props and Higher-Order Components in React. Both seem to solve similar problems but in different ways...',
    tags: ['react', 'patterns', 'hoc', 'render-props'],
    status: 'answered',
    views: 2156,
    upvotes: 67,
    answers: 12,
    createdAt: '2024-01-20',
    lastActivity: '1 hour ago',
    bookmarkedAt: '2024-01-21',
    isAccepted: true,
    author: {
      name: 'Sarah Johnson',
      reputation: 2847
    }
  },
  {
    id: '2',
    title: 'TypeScript: Advanced Type Manipulation Techniques',
    content: 'What are some advanced TypeScript techniques for type manipulation? I\'m particularly interested in conditional types, mapped types, and template literal types...',
    tags: ['typescript', 'advanced', 'types', 'manipulation'],
    status: 'answered',
    views: 1834,
    upvotes: 89,
    answers: 8,
    createdAt: '2024-01-18',
    lastActivity: '3 hours ago',
    bookmarkedAt: '2024-01-19',
    isAccepted: true,
    author: {
      name: 'Alex Chen',
      reputation: 1543
    }
  },
  {
    id: '3',
    title: 'Next.js 14: App Router vs Pages Router Performance',
    content: 'Has anyone done a comprehensive performance comparison between App Router and Pages Router in Next.js 14? I\'m considering migrating but want to understand the implications...',
    tags: ['nextjs', 'performance', 'app-router', 'pages-router'],
    status: 'unanswered',
    views: 987,
    upvotes: 23,
    answers: 0,
    createdAt: '2024-01-16',
    lastActivity: '2 days ago',
    bookmarkedAt: '2024-01-17',
    isAccepted: false,
    author: {
      name: 'David Kim',
      reputation: 1234
    }
  },
  {
    id: '4',
    title: 'CSS-in-JS vs CSS Modules: 2024 Comparison',
    content: 'With the evolution of CSS-in-JS libraries and CSS Modules, what\'s the current state of styling in React applications? Which approach would you recommend for a new project?',
    tags: ['css', 'css-in-js', 'css-modules', 'styling'],
    status: 'answered',
    views: 3421,
    upvotes: 156,
    answers: 25,
    createdAt: '2024-01-14',
    lastActivity: '5 hours ago',
    bookmarkedAt: '2024-01-15',
    isAccepted: true,
    author: {
      name: 'Maria Garcia',
      reputation: 3921
    }
  },
  {
    id: '5',
    title: 'WebAssembly with React: Real-world Use Cases',
    content: 'I\'m exploring WebAssembly integration with React applications. What are some real-world use cases where WASM provides significant performance benefits?',
    tags: ['webassembly', 'react', 'performance', 'wasm'],
    status: 'answered',
    views: 1456,
    upvotes: 45,
    answers: 7,
    createdAt: '2024-01-12',
    lastActivity: '1 day ago',
    bookmarkedAt: '2024-01-13',
    isAccepted: false,
    author: {
      name: 'Emma Wilson',
      reputation: 987
    }
  }
]

export default function BookmarkedQuestions() {
  const [bookmarks, setBookmarks] = useState(mockBookmarkedQuestions)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'answered' | 'unanswered' | 'closed'>('all')
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'most-viewed' | 'most-upvoted' | 'recently-bookmarked'>('recently-bookmarked')

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

  const filteredBookmarks = bookmarks.filter(bookmark => {
    const matchesSearch = bookmark.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bookmark.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bookmark.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         bookmark.author.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || bookmark.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const sortedBookmarks = [...filteredBookmarks].sort((a, b) => {
    switch (sortBy) {
      case 'newest': return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      case 'oldest': return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      case 'most-viewed': return b.views - a.views
      case 'most-upvoted': return b.upvotes - a.upvotes
      case 'recently-bookmarked': return new Date(b.bookmarkedAt).getTime() - new Date(a.bookmarkedAt).getTime()
      default: return 0
    }
  })

  const handleRemoveBookmark = (bookmarkId: string) => {
    setBookmarks(prev => prev.filter(b => b.id !== bookmarkId))
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const totalBookmarks = bookmarks.length
  const answeredBookmarks = bookmarks.filter(b => b.status === 'answered').length
  const totalViews = bookmarks.reduce((sum, bookmark) => sum + bookmark.views, 0)

  return (
    <div className="space-y-6">
      {/* Header and Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Bookmarked Questions</h2>
          <p className="text-sm text-gray-600">Your saved questions for future reference</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600">{totalBookmarks}</div>
            <div className="text-xs text-gray-600">Total Bookmarks</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-green-600">{answeredBookmarks}</div>
            <div className="text-xs text-gray-600">Answered</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-purple-600">{totalViews.toLocaleString()}</div>
            <div className="text-xs text-gray-600">Total Views</div>
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
              placeholder="Search bookmarks..."
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
              <option value="recently-bookmarked">Recently Bookmarked</option>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="most-viewed">Most Viewed</option>
              <option value="most-upvoted">Most Upvoted</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bookmarks List */}
      <div className="space-y-4">
        {sortedBookmarks.length === 0 ? (
          <Card className="p-8 text-center">
            <Bookmark className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No bookmarks found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'You haven\'t bookmarked any questions yet'
              }
            </p>
            {!searchTerm && statusFilter === 'all' && (
              <Button variant="primary">
                Browse Questions to Bookmark
              </Button>
            )}
          </Card>
        ) : (
          sortedBookmarks.map(bookmark => (
            <Card key={bookmark.id} className="hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {getStatusIcon(bookmark.status)}
                      <Badge variant={getStatusColor(bookmark.status)} size="sm">
                        {bookmark.status}
                      </Badge>
                      {bookmark.isAccepted && (
                        <Badge variant="success" size="sm">
                          ✓ Accepted
                        </Badge>
                      )}
                      <Badge variant="secondary" size="sm" className="flex items-center gap-1">
                        <Bookmark className="w-3 h-3" />
                        Bookmarked {formatDate(bookmark.bookmarkedAt)}
                      </Badge>
                    </div>
                    
                    <Link 
                      href={`/qa/question/${bookmark.id}`}
                      className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors mb-2 block"
                    >
                      {bookmark.title}
                    </Link>
                    
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {bookmark.content}
                    </p>
                    
                    <div className="flex items-center gap-2 mb-3">
                      {bookmark.tags.map(tag => (
                        <Badge key={tag} variant="secondary" size="sm">
                          #{tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>by</span>
                      <span className="font-medium text-gray-900">{bookmark.author.name}</span>
                      <Badge variant="secondary" size="sm">
                        {bookmark.author.reputation} rep
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleRemoveBookmark(bookmark.id)}
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
                      <span>{bookmark.views.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="w-4 h-4" />
                      <span>{bookmark.upvotes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="w-4 h-4" />
                      <span>{bookmark.answers}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>Asked {formatDate(bookmark.createdAt)}</span>
                    </div>
                    <span>Last activity {bookmark.lastActivity}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Pagination */}
      {sortedBookmarks.length > 0 && (
        <div className="flex items-center justify-between pt-6 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            Showing {sortedBookmarks.length} of {bookmarks.length} bookmarks
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
