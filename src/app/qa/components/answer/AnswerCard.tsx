// qa/components/answer/AnswerCard.tsx
import { useState } from 'react'
import { MessageCircle, Clock, Flag, Edit, Trash2, Award } from 'lucide-react'
import { Answer } from '../../lib/types/question.types'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import UserAvatar from '../common/UserAvatar'
import VoteButtons from '../common/VoteButtons'
import BestAnswerBadge from './BestAnswerBadge'
import CommentList from '../comment/CommentList'
import CommentForm from '../comment/CommentForm'
import PollWidget from '../engagement/PollWidget'

interface AnswerCardProps {
  answer: Answer
  questionAuthorId: string
  canAcceptAnswer?: boolean
  canEdit?: boolean
  canDelete?: boolean
  onAcceptAnswer?: (answerId: string) => void
  onEdit?: (answerId: string) => void
  onDelete?: (answerId: string) => void
  className?: string
}

export default function AnswerCard({
  answer,
  questionAuthorId,
  canAcceptAnswer = false,
  canEdit = false,
  canDelete = false,
  onAcceptAnswer,
  onEdit,
  onDelete,
  className = ''
}: AnswerCardProps) {
  const [showComments, setShowComments] = useState(false)
  const [showCommentForm, setShowCommentForm] = useState(false)

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`
    return `${Math.floor(diffInHours / 168)}w ago`
  }

  const handleAcceptAnswer = () => {
    onAcceptAnswer?.(answer.id)
  }

  return (
    <Card 
      className={`
        ${className} 
        ${answer.isAccepted ? 'ring-2 ring-green-200 bg-green-50/30' : ''}
      `}
    >
      <div className="flex gap-4">
        {/* Vote Buttons */}
        <div className="flex-shrink-0">
          <VoteButtons
            initialVotes={answer.votes}
            size="md"
          />
        </div>

        {/* Answer Content */}
        <div className="flex-1 min-w-0">
          {/* Best Answer Badge */}
          {answer.isAccepted && (
            <div className="mb-4">
              <BestAnswerBadge />
            </div>
          )}

          {/* Answer Text */}
          <div className="prose prose-sm max-w-none mb-6">
            <div 
              className="text-gray-900 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: answer.content }}
            />
          </div>

          {/* Quick Poll (optional) */}
          {answer.poll && (
            <div className="mb-6">
              <PollWidget 
                pollId={`answer-${answer.id}`}
                question={answer.poll.question}
                options={answer.poll.options}
                allowMultiple={!!answer.poll.allowMultiple}
              />
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowComments(!showComments)}
                className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>
                  {answer.comments.length > 0 
                    ? `${answer.comments.length} comment${answer.comments.length > 1 ? 's' : ''}`
                    : 'Add comment'
                  }
                </span>
              </button>

              {canAcceptAnswer && !answer.isAccepted && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleAcceptAnswer}
                  className="flex items-center gap-1"
                >
                  <Award className="w-4 h-4" />
                  Accept Answer
                </Button>
              )}

              <button className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded-lg transition-colors">
                <Flag className="w-4 h-4" />
                Report
              </button>

              {canEdit && (
                <button 
                  onClick={() => onEdit?.(answer.id)}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
              )}

              {canDelete && (
                <button 
                  onClick={() => onDelete?.(answer.id)}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              )}
            </div>

            {/* Author Info */}
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>answered {formatTimeAgo(answer.createdAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <UserAvatar 
                  name={answer.author.name}
                  avatar={answer.author.avatar}
                  size="sm"
                  isOnline={answer.author.isOnline}
                />
                <div>
                  <div className="font-medium text-gray-900">{answer.author.name}</div>
                  <div className="text-xs text-gray-500">{answer.author.reputation} reputation</div>
                </div>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          {showComments && (
            <div className="border-t border-gray-200 pt-4">
              <CommentList 
                comments={answer.comments}
                targetId={answer.id}
                targetType="answer"
              />
              {!showCommentForm && (
                <button
                  onClick={() => setShowCommentForm(true)}
                  className="mt-3 text-sm text-blue-600 hover:text-blue-800"
                >
                  Add a comment
                </button>
              )}
              {showCommentForm && (
                <div className="mt-3">
                  <CommentForm
                    targetId={answer.id}
                    targetType="answer"
                    onSubmit={() => setShowCommentForm(false)}
                    onCancel={() => setShowCommentForm(false)}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
