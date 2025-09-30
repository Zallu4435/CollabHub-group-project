// qa/components/explore/QuestionOfTheDay.tsx
import { useState, useEffect } from 'react'
import { Star, Calendar, ArrowRight, Trophy } from 'lucide-react'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'
import { Question } from '../../lib/types/question.types'

interface QuestionOfTheDayProps {
  questions: Question[]
  className?: string
}

export default function QuestionOfTheDay({ 
  questions, 
  className = '' 
}: QuestionOfTheDayProps) {
  const [questionOfTheDay, setQuestionOfTheDay] = useState<Question | null>(null)

  useEffect(() => {
    // Select question of the day based on current date for consistency
    const today = new Date()
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24))
    const selectedIndex = dayOfYear % questions.length
    setQuestionOfTheDay(questions[selectedIndex])
  }, [questions])

  if (!questionOfTheDay) return null

  return (
    <div className={`bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg border border-yellow-200 shadow-sm ${className}`}>
      <div className="p-4 border-b border-yellow-200">
        <div className="flex items-center gap-2 mb-1">
          <Trophy className="w-5 h-5 text-yellow-600" />
          <h3 className="text-lg font-semibold text-gray-900">Question of the Day</h3>
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 text-xs">
            Featured
          </Badge>
        </div>
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>{new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="space-y-3">
          <div className="bg-white rounded-lg p-4 border border-yellow-100">
            <h4 className="font-medium text-gray-900 line-clamp-2 mb-2">
              {questionOfTheDay.title}
            </h4>
            
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="font-medium">{questionOfTheDay.votes} votes</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-medium">{questionOfTheDay.answers} answers</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-medium">{questionOfTheDay.views} views</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-1 mb-3">
              {questionOfTheDay.tags.slice(0, 3).map((tag) => (
                <Badge 
                  key={tag.id} 
                  variant="outline" 
                  className="text-xs bg-white border-gray-200"
                >
                  {tag.name}
                </Badge>
              ))}
              {questionOfTheDay.tags.length > 3 && (
                <Badge variant="outline" className="text-xs bg-white border-gray-200">
                  +{questionOfTheDay.tags.length - 3} more
                </Badge>
              )}
            </div>
            
            <div className="text-xs text-gray-500">
              Asked by {questionOfTheDay.author.name} • {new Date(questionOfTheDay.createdAt).toLocaleDateString()}
            </div>
          </div>
          
          <Button 
            variant="primary" 
            size="sm" 
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
          >
            <ArrowRight className="w-4 h-4" />
            View Question
          </Button>
        </div>
      </div>
    </div>
  )
}