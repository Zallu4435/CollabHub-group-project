// qa/components/question/QuestionList.tsx
import { useState } from 'react'
import { Question } from '../../lib/types/question.types'
import QuestionCard from './QuestionCard'
import { Plus, Star } from 'lucide-react'
import { Button } from '../ui/Button'
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll'
import { QuestionListSkeleton } from './QuestionSkeleton'

interface QuestionListProps {
  questions: Question[]
  loading?: boolean
  compact?: boolean
  emptyMessage?: string
  className?: string
  showHeader?: boolean
  showStats?: boolean
  sortable?: boolean
  hasMore?: boolean
  onLoadMore?: () => void
}

export default function QuestionList({ 
  questions, 
  loading = false,
  compact = false,
  emptyMessage = "No questions found",
  className = '',
  showHeader = true,
  showStats = true,
  sortable = true,
  hasMore = false,
  onLoadMore = () => {}
}: QuestionListProps) {
  const [viewMode, setViewMode] = useState<'list' | 'compact'>('list')
  
  // Infinite scroll hook
  const { lastElementRef } = useInfiniteScroll({
    hasMore,
    loading,
    onLoadMore
  })
  
  // Calculate stats
  const stats = {
    total: questions.length,
    answered: questions.filter(q => q.isAnswered).length,
    unanswered: questions.filter(q => !q.isAnswered).length,
    accepted: questions.filter(q => q.acceptedAnswerId).length,
    totalVotes: questions.reduce((sum, q) => sum + q.votes, 0),
    totalViews: questions.reduce((sum, q) => sum + q.views, 0)
  }

  if (loading && questions.length === 0) {
    return (
      <div className={className}>
        <QuestionListSkeleton count={5} compact={compact} />
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        {showHeader && (
          <div className="border-b border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Questions</h2>
              <Button variant="primary" className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Ask Question
              </Button>
            </div>
          </div>
        )}
        
        <div className="text-center py-16">
          <div className="relative mb-6">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
              <Search className="w-10 h-10 text-blue-500" />
            </div>
            <div className="absolute -top-2 -right-6 w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
              <Star className="w-4 h-4 text-yellow-500" />
            </div>
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            No Questions Found
          </h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto leading-relaxed">
            {emptyMessage}
          </p>
          
          <div className="flex items-center justify-center gap-4">
            <Button variant="primary" size="lg" className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Ask the First Question
            </Button>
            <Button variant="ghost" size="lg">
              Browse All Topics
            </Button>
          </div>
          
          {/* Tips */}
          <div className="mt-8 bg-blue-50 rounded-lg p-4 max-w-lg mx-auto">
            <h4 className="font-medium text-blue-900 mb-2">💡 Tips for asking great questions:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Be specific and clear in your title</li>
              <li>• Include relevant code examples</li>
              <li>• Add appropriate tags</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`${className}`}>
      {/* Enhanced Header with Stats */}
      {showHeader && (
        <div className="bg-white rounded-t-lg border border-b-0 border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-100">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Questions</h2>
                <p className="text-gray-600">
                  Community knowledge sharing and problem solving
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex items-center bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('list')}
                    className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
                      viewMode === 'list' 
                        ? 'bg-white text-blue-600 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    Detailed
                  </button>
                  <button
                    onClick={() => setViewMode('compact')}
                    className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
                      viewMode === 'compact' 
                        ? 'bg-white text-blue-600 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    Compact
                  </button>
                </div>
                
                <Button variant="primary" className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Ask Question
                </Button>
              </div>
            </div>
          </div>
          
          {/* Stats Bar */}
          {showStats && (
            <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-100">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                <div className="text-center">
                  <div className="text-xl font-bold text-blue-600">{stats.total.toLocaleString()}</div>
                  <div className="text-xs text-gray-600 font-medium">Total Questions</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-green-600">{stats.answered.toLocaleString()}</div>
                  <div className="text-xs text-gray-600 font-medium">Answered</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-red-600">{stats.unanswered.toLocaleString()}</div>
                  <div className="text-xs text-gray-600 font-medium">Unanswered</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-purple-600">{stats.accepted.toLocaleString()}</div>
                  <div className="text-xs text-gray-600 font-medium">Accepted</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-orange-600">{stats.totalVotes.toLocaleString()}</div>
                  <div className="text-xs text-gray-600 font-medium">Total Votes</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-indigo-600">{(stats.totalViews / 1000).toFixed(1)}k</div>
                  <div className="text-xs text-gray-600 font-medium">Total Views</div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Question List - Stack Overflow Style */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <div className="divide-y divide-gray-100">
          {questions
            .filter((q: any) => !!q && typeof q === 'object')
            .map((question: any, index: number) => (
            <QuestionCard 
              key={question?.id ?? `q-${index}`}
              question={question as any}
              compact={viewMode === 'compact' || compact}
              className="border-0 rounded-none shadow-none hover:shadow-none"
            />
          ))}
          
          {/* Infinite scroll trigger */}
          {hasMore && (
            <div ref={lastElementRef} className="p-4 text-center">
              {loading ? (
                <div className="flex items-center justify-center gap-2 text-gray-500">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  <span>Loading more questions...</span>
                </div>
              ) : (
                <Button 
                  variant="ghost" 
                  onClick={onLoadMore}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Load more questions
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

    </div>
  )
}

