// qa/components/explore/RandomQuestion.tsx
import { useState } from 'react'
import { Shuffle, ArrowRight } from 'lucide-react'
import { Button } from '../ui/Button'
import { Question } from '../../lib/types/question.types'

interface RandomQuestionProps {
  questions: Question[]
  onQuestionSelect?: (question: Question) => void
  className?: string
}

export default function RandomQuestion({ 
  questions, 
  onQuestionSelect,
  className = '' 
}: RandomQuestionProps) {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)

  const getRandomQuestion = () => {
    if (questions.length === 0) return
    
    const randomIndex = Math.floor(Math.random() * questions.length)
    const randomQuestion = questions[randomIndex]
    setCurrentQuestion(randomQuestion)
    onQuestionSelect?.(randomQuestion)
  }

  return (
    <div className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`}>
      <div className="p-4 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Shuffle className="w-5 h-5 text-blue-600" />
          Random Question
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          Discover interesting questions from our community
        </p>
      </div>
      
      <div className="p-4">
        {currentQuestion ? (
          <div className="space-y-3">
            <div className="bg-blue-50 rounded-lg p-3">
              <h4 className="font-medium text-blue-900 line-clamp-2">
                {currentQuestion.title}
              </h4>
              <div className="flex items-center gap-4 mt-2 text-xs text-blue-700">
                <span>{currentQuestion.votes} votes</span>
                <span>{currentQuestion.answers} answers</span>
                <span>{currentQuestion.views} views</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="primary" 
                size="sm" 
                onClick={getRandomQuestion}
                className="flex items-center gap-1"
              >
                <Shuffle className="w-4 h-4" />
                Another Question
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                className="flex items-center gap-1"
              >
                <ArrowRight className="w-4 h-4" />
                View Full
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-4">
            <div className="w-12 h-12 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-3">
              <Shuffle className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-gray-600 text-sm mb-3">
              Click the button below to discover a random question
            </p>
            <Button 
              variant="primary" 
              size="sm" 
              onClick={getRandomQuestion}
              className="flex items-center gap-1"
            >
              <Shuffle className="w-4 h-4" />
              Get Random Question
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}