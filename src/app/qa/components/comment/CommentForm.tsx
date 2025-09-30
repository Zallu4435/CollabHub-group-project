// qa/components/comment/CommentForm.tsx
'use client'
import { useState } from 'react'
import { Button } from '../ui/Button'

interface CommentFormProps {
  targetId: string
  targetType: 'question' | 'answer'
  onSubmit?: (content: string) => void
  onCancel?: () => void
  placeholder?: string
  className?: string
}

export default function CommentForm({
  targetId,
  targetType,
  onSubmit,
  onCancel,
  placeholder = "Add a comment...",
  className = ''
}: CommentFormProps) {
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (content.trim().length < 10) {
      return
    }

    setIsSubmitting(true)
    
    try {
      // Submit comment logic here
      await new Promise(resolve => setTimeout(resolve, 1000)) // Mock delay
      onSubmit?.(content)
      setContent('')
    } catch (error) {
      console.error('Failed to submit comment:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    setContent('')
    onCancel?.()
  }

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="relative">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={placeholder}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          rows={3}
          maxLength={600}
        />
        <div className="absolute bottom-2 right-2 text-xs text-gray-400">
          {content.length}/600
        </div>
      </div>
      
      {content.length > 0 && (
        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-500">
            {content.length < 10 && (
              <span className="text-red-500">
                Comments must be at least 10 characters
              </span>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleCancel}
              className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <Button
              onClick={handleSubmit}
              disabled={content.trim().length < 10}
              loading={isSubmitting}
              size="sm"
            >
              Add Comment
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
