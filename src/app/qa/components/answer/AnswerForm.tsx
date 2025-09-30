// qa/components/answer/AnswerForm.tsx
'use client'
import { useState, useRef } from 'react'
import { Eye, Save, X, AlertCircle, Send, Plus, Trash2 } from 'lucide-react'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import AnswerEditor from './AnswerEditor'
import { Question } from '../../lib/types/question.types'

interface AnswerFormProps {
  question: Question
  onSubmit?: (answerData: any) => void
  onCancel?: () => void
  initialContent?: string
  mode?: 'create' | 'edit'
  className?: string
}

export default function AnswerForm({
  question,
  onSubmit,
  onCancel,
  initialContent = '',
  mode = 'create',
  className = ''
}: AnswerFormProps) {
  const [content, setContent] = useState(initialContent)
  const [showPreview, setShowPreview] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDraft, setIsDraft] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [enablePoll, setEnablePoll] = useState(false)
  const [pollQuestion, setPollQuestion] = useState('')
  const [pollAllowMultiple, setPollAllowMultiple] = useState(false)
  const [pollOptions, setPollOptions] = useState<Array<{ id: string; label: string }>>([
    { id: 'opt1', label: '' },
    { id: 'opt2', label: '' }
  ])

  const handleTogglePoll = () => {
    setEnablePoll(prev => {
      const next = !prev
      if (next) {
        const allEmpty = pollOptions.every(o => !o.label.trim())
        if (allEmpty) {
          setPollQuestion('Which approach do you prefer?')
          setPollOptions([
            { id: 'opt1', label: 'Option 1' },
            { id: 'opt2', label: 'Option 2' }
          ])
        }
      }
      return next
    })
  }

  const validateAnswer = () => {
    const newErrors: { [key: string]: string } = {}

    if (content.length < 30) {
      newErrors.content = 'Answer must be at least 30 characters long'
    }

    if (content.length > 30000) {
      newErrors.content = 'Answer must be less than 30,000 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateAnswer()) return

    setIsSubmitting(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500)) // Mock API call
      const payload: any = { content, questionId: question.id }
      if (enablePoll) {
        const cleaned = pollOptions
          .map(o => ({ id: o.id, label: o.label.trim() }))
          .filter(o => o.label.length > 0)
        if (cleaned.length >= 2) {
          payload.poll = {
            question: pollQuestion.trim() || undefined,
            allowMultiple: pollAllowMultiple,
            options: cleaned.map(o => ({ ...o, votes: 0 }))
          }
        }
      }
      onSubmit?.(payload)
    } catch (error) {
      console.error('Failed to submit answer:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const saveDraft = async () => {
    setIsDraft(true)
    try {
      localStorage.setItem(`qa-answer-draft-${question.id}`, content)
      await new Promise(resolve => setTimeout(resolve, 500))
    } catch (error) {
      console.error('Failed to save draft:', error)
    } finally {
      setIsDraft(false)
    }
  }

  // Load draft on component mount
  useState(() => {
    const savedDraft = localStorage.getItem(`qa-answer-draft-${question.id}`)
    if (savedDraft && !initialContent) {
      setContent(savedDraft)
    }
  })

  return (
    <div className={className}>
      {/* Question Context */}
      <Card className="mb-6 bg-gray-50">
        <div className="flex items-start gap-3">
          <div className="w-1 h-16 bg-blue-600 rounded-full flex-shrink-0"></div>
          <div className="flex-1">
            <h3 className="font-medium text-gray-900 mb-2">
              Answering: {question.title}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2">
              {question.content.substring(0, 200)}...
            </p>
          </div>
        </div>
      </Card>

      <Card>
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-gray-900">
              {mode === 'edit' ? 'Edit Your Answer' : 'Your Answer'}
            </h2>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Eye className="w-4 h-4" />
                {showPreview ? 'Edit' : 'Preview'}
              </button>
            </div>
          </div>

          {/* Guidelines */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
            <p className="text-sm text-blue-800 mb-2 font-medium">
              📝 How to write a great answer:
            </p>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Address the specific question asked</li>
              <li>• Provide step-by-step explanations</li>
              <li>• Include code examples when relevant</li>
              <li>• Link to relevant documentation or resources</li>
              <li>• Be clear and concise</li>
            </ul>
          </div>

          {/* Editor/Preview */}
          {showPreview ? (
            <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Preview:</h4>
              <div 
                className="prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: content }}
              />
              {content.length === 0 && (
                <p className="text-gray-500 italic">Nothing to preview yet...</p>
              )}
            </div>
          ) : (
            <AnswerEditor
              value={content}
              onChange={setContent}
              placeholder="Write your answer here... Be specific and provide details that would help someone solve their problem."
            />
          )}

          {/* Quick Poll (optional) */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-900">Quick Poll (optional)</label>
              <button
                type="button"
                onClick={handleTogglePoll}
                className={`text-sm px-3 py-1.5 rounded-md border transition-colors ${enablePoll ? 'bg-blue-50 text-blue-700 border-blue-200' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
              >
                {enablePoll ? 'Disable' : 'Enable'}
              </button>
            </div>
            {enablePoll && (
              <div className="border border-gray-200 rounded-lg p-3 bg-gray-50">
                <input
                  type="text"
                  value={pollQuestion}
                  onChange={e => setPollQuestion(e.target.value)}
                  placeholder="Poll question (optional)"
                  className="w-full text-sm px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-3 bg-white"
                />
                <div className="space-y-2">
                  {pollOptions.map((opt, idx) => (
                    <div key={opt.id} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={opt.label}
                        onChange={e => setPollOptions(prev => prev.map(o => o.id === opt.id ? { ...o, label: e.target.value } : o))}
                        placeholder={`Option ${idx + 1}`}
                        className="flex-1 text-sm px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                      />
                      {pollOptions.length > 2 && (
                        <button
                          type="button"
                          onClick={() => setPollOptions(prev => prev.filter(o => o.id !== opt.id))}
                          className="p-2 text-gray-500 hover:text-red-600"
                          aria-label="Remove option"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-3">
                  <button
                    type="button"
                    onClick={() => setPollOptions(prev => [...prev, { id: `opt${prev.length + 1}`, label: '' }])}
                    className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
                  >
                    <Plus className="w-4 h-4" />
                    Add option
                  </button>
                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input
                      type="checkbox"
                      checked={pollAllowMultiple}
                      onChange={e => setPollAllowMultiple(e.target.checked)}
                    />
                    Allow multiple selections
                  </label>
                </div>
              </div>
            )}
          </div>

          {errors.content && (
            <div className="flex items-center gap-1 mt-2 text-sm text-red-600">
              <AlertCircle className="w-4 h-4" />
              {errors.content}
            </div>
          )}

          {/* Character Count */}
          <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
            <div></div>
            <span className={content.length > 28000 ? 'text-red-600' : ''}>
              {content.length.toLocaleString()}/30,000 characters
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <Button
              variant="primary"
              onClick={handleSubmit}
              loading={isSubmitting}
              disabled={content.length < 30}
              className="flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              {mode === 'edit' ? 'Update Answer' : 'Post Answer'}
            </Button>

            <Button
              variant="secondary"
              onClick={saveDraft}
              loading={isDraft}
              disabled={content.length === 0}
              className="flex items-center gap-1"
            >
              <Save className="w-4 h-4" />
              Save Draft
            </Button>
          </div>

          {onCancel && (
            <Button variant="ghost" onClick={onCancel}>
              Cancel
            </Button>
          )}
        </div>

        {/* Draft Notice */}
        {content !== initialContent && content.length > 0 && (
          <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-800">
            💡 Your answer is automatically saved as you type
          </div>
        )}
      </Card>
    </div>
  )
}
