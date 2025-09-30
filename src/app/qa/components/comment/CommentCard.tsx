// qa/components/comment/CommentCard.tsx
import { useState } from 'react'
import { Clock, Flag, Edit, Trash2 } from 'lucide-react'
import { Comment } from '../../lib/types/question.types'
import UserAvatar from '../common/UserAvatar'
import VoteButtons from '../common/VoteButtons'

interface CommentCardProps {
  comment: Comment
  canEdit?: boolean
  canDelete?: boolean
  onEdit?: (commentId: string) => void
  onDelete?: (commentId: string) => void
  className?: string
}

export default function CommentCard({
  comment,
  canEdit = false,
  canDelete = false,
  onEdit,
  onDelete,
  className = ''
}: CommentCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState(comment.content)

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) return 'Just now'
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return `${Math.floor(diffInMinutes / 1440)}d ago`
  }

  const handleSaveEdit = () => {
    // Save edit logic here
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setEditContent(comment.content)
    setIsEditing(false)
  }

  return (
    <div className={`flex gap-3 py-3 border-b border-gray-100 last:border-b-0 ${className}`}>
      {/* Vote Buttons (minimal) */}
      <div className="flex-shrink-0">
        <VoteButtons
          initialVotes={comment.votes}
          size="sm"
          orientation="horizontal"
        />
      </div>

      {/* Comment Content */}
      <div className="flex-1 min-w-0">
        {isEditing ? (
          <div className="space-y-3">
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={2}
            />
            <div className="flex gap-2">
              <button
                onClick={handleSaveEdit}
                className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
              >
                Save
              </button>
              <button
                onClick={handleCancelEdit}
                className="px-3 py-1 text-gray-600 text-sm hover:text-gray-800"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="text-sm text-gray-900 mb-2 leading-relaxed">
              {comment.content}
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{formatTimeAgo(comment.createdAt)}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <UserAvatar 
                    name={comment.author.name}
                    avatar={comment.author.avatar}
                    size="xs"
                  />
                  <span className="font-medium">{comment.author.name}</span>
                  <span className="text-gray-400">•</span>
                  <span>{comment.author.reputation}</span>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {canEdit && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                    title="Edit comment"
                  >
                    <Edit className="w-3 h-3" />
                  </button>
                )}
                {canDelete && (
                  <button
                    onClick={() => onDelete?.(comment.id)}
                    className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                    title="Delete comment"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
                <button
                  className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                  title="Report comment"
                >
                  <Flag className="w-3 h-3" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
