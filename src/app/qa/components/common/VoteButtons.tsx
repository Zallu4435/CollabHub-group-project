// qa/components/common/VoteButtons.tsx
'use client'
import { useState } from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'

interface VoteButtonsProps {
  initialVotes: number
  initialUserVote?: 'up' | 'down' | null
  onVote?: (voteType: 'up' | 'down' | null) => void
  size?: 'sm' | 'md' | 'lg'
  orientation?: 'vertical' | 'horizontal'
  className?: string
}

export default function VoteButtons({
  initialVotes,
  initialUserVote = null,
  onVote,
  size = 'md',
  orientation = 'vertical',
  className = ''
}: VoteButtonsProps) {
  const [votes, setVotes] = useState(initialVotes)
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(initialUserVote)

  const sizeClasses = {
    sm: { button: 'p-1', icon: 'w-4 h-4', text: 'text-sm' },
    md: { button: 'p-2', icon: 'w-5 h-5', text: 'text-base' },
    lg: { button: 'p-3', icon: 'w-6 h-6', text: 'text-lg' }
  }

  const handleVote = (voteType: 'up' | 'down') => {
    let newVotes = votes
    let newUserVote: 'up' | 'down' | null = voteType

    if (userVote === voteType) {
      newVotes = voteType === 'up' ? votes - 1 : votes + 1
      newUserVote = null
    } else if (userVote === null) {
      newVotes = voteType === 'up' ? votes + 1 : votes - 1
    } else {
      newVotes = voteType === 'up' ? votes + 2 : votes - 2
    }

    setVotes(newVotes)
    setUserVote(newUserVote)
    onVote?.(newUserVote)
  }

  const containerClass = orientation === 'vertical' 
    ? 'flex flex-col items-center space-y-1' 
    : 'flex items-center space-x-2'

  return (
    <div className={`${containerClass} ${className}`}>
      <button
        onClick={() => handleVote('up')}
        className={`
          ${sizeClasses[size].button}
          rounded-lg transition-colors
          ${userVote === 'up' 
            ? 'bg-green-100 text-green-600 hover:bg-green-200' 
            : 'text-gray-500 hover:bg-gray-100 hover:text-green-600'
          }
        `}
        aria-label="Upvote"
      >
        <ChevronUp className={sizeClasses[size].icon} />
      </button>

      <span className={`
        font-semibold 
        ${sizeClasses[size].text}
        ${votes > 0 ? 'text-green-600' : votes < 0 ? 'text-red-600' : 'text-gray-700'}
        ${orientation === 'horizontal' ? 'min-w-[2rem] text-center' : ''}
      `}>
        {votes > 0 ? `+${votes}` : votes}
      </span>

      <button
        onClick={() => handleVote('down')}
        className={`
          ${sizeClasses[size].button}
          rounded-lg transition-colors
          ${userVote === 'down' 
            ? 'bg-red-100 text-red-600 hover:bg-red-200' 
            : 'text-gray-500 hover:bg-gray-100 hover:text-red-600'
          }
        `}
        aria-label="Downvote"
      >
        <ChevronDown className={sizeClasses[size].icon} />
      </button>
    </div>
  )
}
