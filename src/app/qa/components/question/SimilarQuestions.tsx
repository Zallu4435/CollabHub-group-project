// qa/components/question/SimilarQuestions.tsx
import Link from 'next/link'
import { AlertTriangle, ExternalLink } from 'lucide-react'
import { Card } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { questions } from '../../lib/dummy-data/questions'

interface SimilarQuestionsProps {
  searchQuery: string
  maxResults?: number
  className?: string
}

export default function SimilarQuestions({
  searchQuery,
  maxResults = 5,
  className = ''
}: SimilarQuestionsProps) {
  // Mock similar questions - in real app, this would be an API call
  const similarQuestions = questions.filter(q => 
    q.title.toLowerCase().includes(searchQuery.toLowerCase().split(' ')) ||
    q.content.toLowerCase().includes(searchQuery.toLowerCase().split(' '))
  ).slice(0, maxResults)

  if (similarQuestions.length === 0) {
    return null
  }

  return (
    <Card className={`bg-yellow-50 border-yellow-200 ${className}`}>
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <h3 className="font-medium text-yellow-800 mb-2">
            Similar questions found
          </h3>
          <p className="text-sm text-yellow-700 mb-4">
            Please check if your question has already been asked. If not, continue with your question.
          </p>
          
          <div className="space-y-3">
            {similarQuestions.map(question => (
              <div key={question.id} className="bg-white rounded-lg p-3 border border-yellow-200">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <Link 
                      href={`/qa/question/${question.id}`}
                      className="text-blue-600 hover:text-blue-800 font-medium text-sm leading-tight block mb-2"
                      target="_blank"
                    >
                      {question.title}
                    </Link>
                    
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span>{question.votes} votes</span>
                      <span>{question.answers} answers</span>
                      <span>{question.views} views</span>
                      {question.isAnswered && (
                        <Badge variant="success" size="sm">✓ Answered</Badge>
                      )}
                    </div>
                  </div>
                  
                  <Link 
                    href={`/qa/question/${question.id}`}
                    target="_blank"
                    className="text-gray-400 hover:text-blue-600 transition-colors flex-shrink-0"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-3 border-t border-yellow-200">
            <p className="text-sm text-yellow-700">
              If none of these answer your question, you can continue posting your question.
            </p>
          </div>
        </div>
      </div>
    </Card>
  )
}
