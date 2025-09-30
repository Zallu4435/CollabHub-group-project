// qa/components/comment/CommentList.tsx
import { useState } from 'react'
import { Comment } from '../../lib/types/question.types'
import CommentCard from './CommentCard'

interface CommentListProps {
  comments: Comment[]
  targetId: string
  targetType: 'question' | 'answer'
  currentUserId?: string
  maxVisible?: number
  className?: string
}

export default function CommentList({
  comments,
  targetId,
  targetType,
  currentUserId,
  maxVisible = 5,
  className = ''
}: CommentListProps) {
  const [showAll, setShowAll] = useState(false)

  if (comments.length === 0) {
    return null
  }

  const visibleComments = showAll ? comments : comments.slice(0, maxVisible)
  const hasMoreComments = comments.length > maxVisible

  return (
    <div className={className}>
      {visibleComments.map(comment => (
        <CommentCard
          key={comment.id}
          comment={comment}
          canEdit={currentUserId === comment.author.id}
          canDelete={currentUserId === comment.author.id}
        />
      ))}
      
      {hasMoreComments && !showAll && (
        <button
          onClick={() => setShowAll(true)}
          className="mt-2 text-sm text-blue-600 hover:text-blue-800"
        >
          Show {comments.length - maxVisible} more comment{comments.length - maxVisible > 1 ? 's' : ''}
        </button>
      )}
      
      {showAll && hasMoreComments && (
        <button
          onClick={() => setShowAll(false)}
          className="mt-2 text-sm text-gray-600 hover:text-gray-800"
        >
          Show less
        </button>
      )}
    </div>
  )
}
