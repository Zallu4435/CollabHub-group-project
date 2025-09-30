// qa/components/answer/AnswerList.tsx
import { Answer } from '../../lib/types/question.types'
import AnswerCard from './AnswerCard'

interface AnswerListProps {
  answers: Answer[]
  questionAuthorId: string
  currentUserId?: string
  loading?: boolean
  onAcceptAnswer?: (answerId: string) => void
  className?: string
}

export default function AnswerList({
  answers,
  questionAuthorId,
  currentUserId,
  loading = false,
  onAcceptAnswer,
  className = ''
}: AnswerListProps) {
  if (loading) {
    return (
      <div className={`space-y-6 ${className}`}>
        {[...Array(3)].map((_, index) => (
          <AnswerCardSkeleton key={index} />
        ))}
      </div>
    )
  }

  if (answers.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 text-gray-300">
          <svg fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No Answers Yet
        </h3>
        <p className="text-gray-500">
          Be the first to answer this question!
        </p>
      </div>
    )
  }

  // Sort answers: accepted first, then by votes
  const sortedAnswers = [...answers].sort((a, b) => {
    if (a.isAccepted && !b.isAccepted) return -1
    if (!a.isAccepted && b.isAccepted) return 1
    return b.votes - a.votes
  })

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          {answers.length} Answer{answers.length > 1 ? 's' : ''}
        </h3>
        <select className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          <option value="votes">Highest Voted</option>
          <option value="oldest">Oldest</option>
          <option value="newest">Newest</option>
        </select>
      </div>

      {sortedAnswers.map(answer => (
        <AnswerCard
          key={answer.id}
          answer={answer}
          questionAuthorId={questionAuthorId}
          canAcceptAnswer={currentUserId === questionAuthorId && !answer.isAccepted}
          canEdit={currentUserId === answer.author.id}
          canDelete={currentUserId === answer.author.id}
          onAcceptAnswer={onAcceptAnswer}
        />
      ))}
    </div>
  )
}

function AnswerCardSkeleton() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 animate-pulse">
      <div className="flex gap-4">
        <div className="flex flex-col items-center space-y-2">
          <div className="w-8 h-6 bg-gray-200 rounded"></div>
          <div className="w-8 h-8 bg-gray-200 rounded"></div>
          <div className="w-8 h-6 bg-gray-200 rounded"></div>
        </div>
        <div className="flex-1 space-y-4">
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              <div className="h-4 bg-gray-200 rounded w-20"></div>
              <div className="h-4 bg-gray-200 rounded w-16"></div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
              <div className="h-4 bg-gray-200 rounded w-24"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
