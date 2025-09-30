// qa/components/question/QuestionForm.tsx
'use client'
import { useState } from 'react'
import { Eye, Save, X, AlertCircle } from 'lucide-react'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import QuestionEditor from './QuestionEditor'
import QuestionPreview from './QuestionPreview'
import SimilarQuestions from './SimilarQuestions'
import TagChip from '../common/TagChip'
import { tags } from '../../lib/dummy-data/questions'

interface QuestionFormProps {
  onSubmit?: (questionData: any) => void
  onCancel?: () => void
  initialData?: {
    title: string
    content: string
    tags: string[]
  }
  mode?: 'create' | 'edit'
  className?: string
}

export default function QuestionForm({
  onSubmit,
  onCancel,
  initialData,
  mode = 'create',
  className = ''
}: QuestionFormProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    content: initialData?.content || '',
    tags: initialData?.tags || [],
    isAnonymous: false
  })
  
  const [showPreview, setShowPreview] = useState(false)
  const [tagInput, setTagInput] = useState('')
  const [tagSuggestions, setTagSuggestions] = useState<any[]>([])
  const [showSimilar, setShowSimilar] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDraft, setIsDraft] = useState(false)

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (formData.title.length < 10) {
      newErrors.title = 'Title must be at least 10 characters long'
    }
    if (formData.title.length > 150) {
      newErrors.title = 'Title must be less than 150 characters'
    }
    
    if (formData.content.length < 20) {
      newErrors.content = 'Question body must be at least 20 characters long'
    }
    
    if (formData.tags.length === 0) {
      newErrors.tags = 'Please add at least one tag'
    }
    if (formData.tags.length > 5) {
      newErrors.tags = 'Maximum 5 tags allowed'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({ ...prev, title }))
    
    // Show similar questions when title is long enough
    if (title.length > 20) {
      setShowSimilar(true)
    } else {
      setShowSimilar(false)
    }
  }

  const handleTagInputChange = (value: string) => {
    setTagInput(value)
    
    if (value.length > 0) {
      const filtered = tags.filter(tag =>
        tag.name.toLowerCase().includes(value.toLowerCase()) &&
        !formData.tags.includes(tag.id)
      ).slice(0, 5)
      setTagSuggestions(filtered)
    } else {
      setTagSuggestions([])
    }
  }

  const addTag = (tagId: string) => {
    if (formData.tags.length < 5 && !formData.tags.includes(tagId)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagId]
      }))
    }
    setTagInput('')
    setTagSuggestions([])
  }

  const removeTag = (tagId: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(id => id !== tagId)
    }))
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500)) // Mock API call
      onSubmit?.(formData)
    } catch (error) {
      console.error('Failed to submit question:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const saveDraft = async () => {
    setIsDraft(true)
    try {
      // Save to localStorage or API
      localStorage.setItem('qa-question-draft', JSON.stringify(formData))
      await new Promise(resolve => setTimeout(resolve, 500))
      // Show success message
    } catch (error) {
      console.error('Failed to save draft:', error)
    } finally {
      setIsDraft(false)
    }
  }

  const selectedTags = formData.tags.map(tagId => tags.find(t => t.id === tagId)).filter(Boolean)

  return (
    <div className={`max-w-4xl mx-auto ${className}`}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {mode === 'edit' ? 'Edit Question' : 'Ask a Question'}
        </h1>
        <p className="text-gray-600">
          Be specific and imagine you're asking a question to another person. 
          Include all the information someone would need to answer your question.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <Card>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title <span className="text-red-500">*</span>
              </label>
              <p className="text-sm text-gray-600 mb-3">
                Be specific and imagine you're asking a question to another person
              </p>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. How can I implement authentication in Next.js?"
                className={`
                  w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  ${errors.title ? 'border-red-300' : 'border-gray-300'}
                `}
                maxLength={150}
              />
              <div className="flex justify-between mt-1">
                {errors.title && (
                  <span className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.title}
                  </span>
                )}
                <span className={`text-sm ml-auto ${formData.title.length > 140 ? 'text-red-600' : 'text-gray-500'}`}>
                  {formData.title.length}/150
                </span>
              </div>
            </div>
          </Card>

          {/* Similar Questions */}
          {showSimilar && <SimilarQuestions searchQuery={formData.title} />}

          {/* Content */}
          <Card>
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Question Body <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowPreview(!showPreview)}
                    className="flex items-center gap-1 px-3 py-1 text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    {showPreview ? 'Edit' : 'Preview'}
                  </button>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-3">
                Include all the information someone would need to answer your question. 
                You can use Markdown formatting.
              </p>

              {showPreview ? (
                <QuestionPreview 
                  title={formData.title}
                  content={formData.content}
                  tags={selectedTags}
                />
              ) : (
                <QuestionEditor
                  value={formData.content}
                  onChange={(content) => setFormData(prev => ({ ...prev, content }))}
                  placeholder="Describe your problem in detail..."
                />
              )}
              
              {errors.content && (
                <span className="text-sm text-red-600 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.content}
                </span>
              )}
            </div>
          </Card>

          {/* Tags */}
          <Card>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags <span className="text-red-500">*</span>
              </label>
              <p className="text-sm text-gray-600 mb-3">
                Add up to 5 tags to describe what your question is about
              </p>
              
              {/* Selected Tags */}
              {selectedTags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {selectedTags.map(tag => (
                    <div key={tag!.id} className="flex items-center gap-1">
                      <TagChip tag={tag!} size="sm" />
                      <button
                        onClick={() => removeTag(tag!.id)}
                        className="p-0.5 text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Tag Input */}
              <div className="relative">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => handleTagInputChange(e.target.value)}
                  placeholder="Type to search tags..."
                  className={`
                    w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                    ${errors.tags ? 'border-red-300' : 'border-gray-300'}
                  `}
                  disabled={formData.tags.length >= 5}
                />
                
                {/* Tag Suggestions */}
                {tagSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    {tagSuggestions.map(tag => (
                      <button
                        key={tag.id}
                        onClick={() => addTag(tag.id)}
                        className="w-full text-left px-3 py-2 hover:bg-gray-50 transition-colors flex items-center justify-between"
                      >
                        <div>
                          <TagChip tag={tag} size="sm" />
                          <p className="text-xs text-gray-500 mt-1">{tag.description}</p>
                        </div>
                        <div className="text-xs text-gray-400">
                          {tag.questionCount} questions
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {errors.tags && (
                <span className="text-sm text-red-600 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.tags}
                </span>
              )}
            </div>
          </Card>

          {/* Options */}
          <Card>
            <div className="space-y-3">
              <h3 className="font-medium text-gray-900">Options</h3>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.isAnonymous}
                  onChange={(e) => setFormData(prev => ({ ...prev, isAnonymous: e.target.checked }))}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">
                  Post anonymously
                </span>
              </label>
            </div>
          </Card>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="primary"
                onClick={handleSubmit}
                loading={isSubmitting}
                disabled={!formData.title || !formData.content || formData.tags.length === 0}
              >
                {mode === 'edit' ? 'Update Question' : 'Post Question'}
              </Button>
              
              <Button
                variant="secondary"
                onClick={saveDraft}
                loading={isDraft}
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
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Tips */}
          <Card>
            <h3 className="font-medium text-gray-900 mb-3">Writing Tips</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>Summarize your problem in the title</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>Describe what you tried and what you expected to happen</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>Add relevant tags to help others find your question</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>Include code samples if applicable</span>
              </div>
            </div>
          </Card>

          {/* Popular Tags */}
          <Card>
            <h3 className="font-medium text-gray-900 mb-3">Popular Tags</h3>
            <div className="flex flex-wrap gap-1">
              {tags.slice(0, 10).map(tag => (
                <button
                  key={tag.id}
                  onClick={() => addTag(tag.id)}
                  disabled={formData.tags.includes(tag.id) || formData.tags.length >= 5}
                  className="disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <TagChip tag={tag} size="sm" />
                </button>
              ))}
            </div>
          </Card>

          {/* Community Guidelines */}
          <Card>
            <h3 className="font-medium text-gray-900 mb-3">Community Guidelines</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>• Be respectful and constructive</p>
              <p>• Search for existing answers first</p>
              <p>• Provide context and details</p>
              <p>• Accept helpful answers</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
