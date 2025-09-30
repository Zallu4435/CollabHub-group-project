// qa/components/question/QuestionCard.tsx
import Link from 'next/link'
import { Eye, MessageCircle, Clock, Bookmark, BookmarkCheck, CheckCircle } from 'lucide-react'
import { Question } from '../../lib/types/question.types'
import { Badge } from '../ui/Badge'
import UserAvatar from '../common/UserAvatar'
import VoteButtons from '../common/VoteButtons'
import TagChip from '../common/TagChip'

interface QuestionCardProps {
  question: Question
  compact?: boolean
  showAuthor?: boolean
  className?: string
}

export default function QuestionCard({ 
  question, 
  compact = false,
  showAuthor = true,
  className = '' 
}: QuestionCardProps) {
  const formatTimeAgo = (dateString: string | undefined) => {
    if (!dateString) return 'just now'
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`
    return `${Math.floor(diffInHours / 168)}w ago`
  }

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k'
    }
    return num.toString()
  }

  return (
    <div className={`p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors ${className}`}>
      <div className="flex gap-4">
        {/* Stats Column - Stack Overflow style */}
        <div className="flex flex-col items-end text-right text-sm text-gray-600 min-w-[80px]">
          <div className="mb-2">
            <div className="text-lg font-semibold text-gray-900">{formatNumber(question.votes)}</div>
            <div className="text-xs">votes</div>
          </div>
          <div className={`mb-2 ${question.isAnswered ? 'text-green-600' : 'text-gray-400'}`}>
            <div className="text-lg font-semibold">{formatNumber(question.answers)}</div>
            <div className="text-xs">answers</div>
          </div>
          <div className="text-gray-500">
            <div className="text-sm font-medium">{formatNumber(question.views)}</div>
            <div className="text-xs">views</div>
          </div>
        </div>

        {/* Content Column */}
        <div className="flex-1 min-w-0">
          {/* Question Title */}
          <div className="mb-2">
            <Link 
              href={`/qa/question/${question.id}`}
              className="text-blue-600 hover:text-blue-800 text-lg leading-tight hover:underline"
            >
              {question.title}
            </Link>
            {question.isAnswered && (
              <div className="inline-flex items-center ml-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
            )}
          </div>

          {/* Question Preview */}
          {!compact && (
            <div className="mb-3">
              <p className="text-gray-700 text-sm line-clamp-2 leading-relaxed">
                {(question.content || '').substring(0, 200)}...
              </p>
            </div>
          )}

          {/* Tags and Meta */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap gap-1">
              {(question.tags || []).map(tag => (
                <TagChip key={tag?.id ?? `${question.id}-tag`} tag={tag} size="sm" />
              ))}
            </div>
            
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{formatTimeAgo(question.createdAt)}</span>
              </div>
              
              {showAuthor && question.author && (
                <Link 
                  href={`/qa/profile/${question.author.id}`}
                  className="flex items-center gap-1 hover:text-blue-600 transition-colors"
                >
                  <UserAvatar 
                    name={question.author.name}
                    avatar={question.author.avatar}
                    size="xs"
                    isOnline={question.author.isOnline}
                  />
                  <span className="font-medium">{question.author.name}</span>
                  <span className="text-gray-400">{question.author.reputation}</span>
                </Link>
              )}
              
              <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                {question.bookmarked ? (
                  <BookmarkCheck className="w-4 h-4" />
                ) : (
                  <Bookmark className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
