// qa/components/answer/AnswerForm.tsx
'use client'
import { useState, useRef, useEffect } from 'react'
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

  type ContributionType = 'text' | 'video' | 'diagram'
  interface Contribution {
    id: string
    type: ContributionType
    author: string
    data: { text?: string; videoUrl?: string; diagramCode?: string }
  }

  const [contributions, setContributions] = useState<Contribution[]>([])
  const [showSuperPreview, setShowSuperPreview] = useState(false)
  const generateId = () => `contrib_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`

  const buildText = (author: string, text: string): Contribution => ({
    id: generateId(),
    type: 'text',
    author,
    data: { text }
  })
  const buildVideo = (author: string, url: string): Contribution => ({
    id: generateId(),
    type: 'video',
    author,
    data: { videoUrl: url }
  })
  const buildDiagram = (author: string, code: string): Contribution => ({
    id: generateId(),
    type: 'diagram',
    author,
    data: { diagramCode: code }
  })

  const getSeedContributionsForQuestion = (q: Question): Contribution[] => {
    const t = `${q.title} ${q.content}`.toLowerCase()
    // API/HTTP
    if (t.includes('api') || t.includes('http') || t.includes('rest') || t.includes('endpoint')) {
      return [
        buildText(
          'Alex (Writer)',
          'Overview of designing a robust REST API: define routes, validate inputs, handle errors consistently, and document with OpenAPI.'
        ),
        buildVideo('Sam (Video)', 'https://www.youtube.com/watch?v=lsMQRaeKNDk'),
        buildDiagram(
          'Rae (Diagram)',
          'sequenceDiagram\n  participant C as Client\n  participant S as Server\n  C->>S: POST /api/resource\n  S-->>C: 201 Created + JSON payload'
        )
      ]
    }
    // Database/SQL
    if (t.includes('database') || t.includes('sql') || t.includes('postgres') || t.includes('mysql')) {
      return [
        buildText(
          'Alex (Writer)',
          'Normalize data to 3NF, index read-heavy columns, and use transactions for multi-step writes.'
        ),
        buildVideo('Sam (Video)', 'https://www.youtube.com/watch?v=hZxnzfnt5v8'),
        buildDiagram(
          'Rae (Diagram)',
          'erDiagram\n  USERS ||--o{ ORDERS : places\n  ORDERS ||--|{ ORDER_ITEMS : contains\n  PRODUCTS ||--o{ ORDER_ITEMS : referenced'
        )
      ]
    }
    // React/Next.js
    if (t.includes('react') || t.includes('next.js') || t.includes('nextjs') || t.includes('tsx')) {
      return [
        buildText(
          'Alex (Writer)',
          'Use server components for data fetching, client components for interactivity, and cache with React Query when necessary.'
        ),
        buildVideo('Sam (Video)', 'https://www.youtube.com/watch?v=ZVOGPvo08zM'),
        buildDiagram(
          'Rae (Diagram)',
          'graph TD\n  App[Next.js App] -->|Routes| Pages[App Router]\n  Pages -->|Server| RSC[Server Components]\n  Pages -->|Client| CSC[Client Components]'
        )
      ]
    }
    // Default generic seed
    return [
      buildText('Alex (Writer)', 'Here is a concise written explanation covering the key steps and rationale.'),
      buildVideo('Sam (Video)', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'),
      buildDiagram('Rae (Diagram)', 'graph TD; A[Start] --> B{Decision}; B -->|Yes| C[Path 1]; B -->|No| D[Path 2];')
    ]
  }

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

    const hasValidContribution = contributions.some(c => {
      if (c.type === 'text') return !!c.data.text && c.data.text.trim().length >= 10
      if (c.type === 'video') return !!c.data.videoUrl && c.data.videoUrl.trim().length > 0
      if (c.type === 'diagram') return !!c.data.diagramCode && c.data.diagramCode.trim().length > 0
      return false
    })

    const hasSufficientText = content.trim().length >= 30

    if (!hasSufficientText && !hasValidContribution) {
      newErrors.content = 'Provide at least 30 chars of text or add a contribution'
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

      if (contributions.length > 0) {
        payload.contributions = contributions
        const combined = contributions
          .map(c => {
            if (c.type === 'text') {
              return `<section data-type="text"><h4>${c.author || 'Contributor'}</h4><div>${c.data.text || ''}</div></section>`
            }
            if (c.type === 'video') {
              const url = c.data.videoUrl || ''
              const ytMatch = url.match(/(?:v=|youtu\.be\/)([\w-]{6,})/)
              const embed = ytMatch
                ? `<iframe src="https://www.youtube.com/embed/${ytMatch[1]}" allowfullscreen class="w-full aspect-video"></iframe>`
                : `<a href="${url}" target="_blank" rel="noreferrer" class="text-blue-600 underline">Video link</a>`
              return `<section data-type="video"><h4>${c.author || 'Contributor'}</h4>${embed}</section>`
            }
            if (c.type === 'diagram') {
              const code = (c.data.diagramCode || '').replace(/</g, '&lt;').replace(/>/g, '&gt;')
              return `<section data-type="diagram"><h4>${c.author || 'Contributor'}</h4><pre class="bg-gray-900 text-gray-100 p-3 rounded overflow-auto"><code>${code}</code></pre></section>`
            }
            return ''
          })
          .join('\n')
        payload.superAnswer = combined
      }
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

  // Load draft on component mount and seed default contributions for testing (create mode)
  useEffect(() => {
    const savedDraft = typeof window !== 'undefined' ? localStorage.getItem(`qa-answer-draft-${question.id}`) : null
    if (savedDraft && !initialContent) {
      setContent(savedDraft)
    }
    if (mode === 'create' && contributions.length === 0) {
      setContributions(getSeedContributionsForQuestion(question))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const addContribution = (type: ContributionType) => {
    const base: Contribution = {
      id: generateId(),
      type,
      author: '',
      data: {}
    }
    if (type === 'text') base.data.text = ''
    if (type === 'video') base.data.videoUrl = ''
    if (type === 'diagram') base.data.diagramCode = ''
    setContributions(prev => [...prev, base])
  }

  const removeContribution = (id: string) => {
    setContributions(prev => prev.filter(c => c.id !== id))
  }

  const updateContribution = (id: string, next: Partial<Contribution>) => {
    setContributions(prev => prev.map(c => (c.id === id ? { ...c, ...next, data: { ...c.data, ...(next.data || {}) } } : c)))
  }

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

          {/* Multi-Format Contributions */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-900">Multi-format contributions</label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowSuperPreview(!showSuperPreview)}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  {showSuperPreview ? 'Hide Super Preview' : 'Show Super Preview'}
                </button>
                <button
                  type="button"
                  onClick={() => setContributions(getSeedContributionsForQuestion(question))}
                  className="text-xs px-2 py-1 rounded-md border border-gray-300 bg-white hover:bg-gray-50"
                >
                  Load suggested defaults
                </button>
              </div>
            </div>

            {showSuperPreview ? (
              <div className="border border-gray-200 rounded-lg p-4 bg-white">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Super Answer Preview</h4>
                <div className="space-y-4">
                  {contributions.length === 0 && (
                    <p className="text-gray-500 text-sm">No contributions yet.</p>
                  )}
                  {contributions.map(c => (
                    <div key={c.id} className="border rounded-md p-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className={`text-xs px-2 py-0.5 rounded-full border ${c.type === 'text' ? 'bg-blue-50 text-blue-700 border-blue-200' : c.type === 'video' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-purple-50 text-purple-700 border-purple-200'}`}>{c.type}</span>
                          <span className="text-sm text-gray-700">{c.author || 'Anonymous'}</span>
                        </div>
                      </div>
                      {c.type === 'text' && (
                        <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: c.data.text || '' }} />
                      )}
                      {c.type === 'video' && (
                        <div>
                          {c.data.videoUrl ? (
                            <a href={c.data.videoUrl} target="_blank" rel="noreferrer" className="text-blue-600 underline text-sm">{c.data.videoUrl}</a>
                          ) : (
                            <p className="text-sm text-gray-500">No video URL</p>
                          )}
                        </div>
                      )}
                      {c.type === 'diagram' && (
                        <pre className="bg-gray-900 text-gray-100 text-xs p-3 rounded overflow-auto"><code>{c.data.diagramCode || ''}</code></pre>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="border border-gray-200 rounded-lg p-3 bg-gray-50">
                <div className="space-y-3">
                  {contributions.map(c => (
                    <div key={c.id} className="bg-white border border-gray-200 rounded-md p-3">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className={`text-xs px-2 py-0.5 rounded-full border ${c.type === 'text' ? 'bg-blue-50 text-blue-700 border-blue-200' : c.type === 'video' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-purple-50 text-purple-700 border-purple-200'}`}>{c.type}</span>
                          <input
                            type="text"
                            placeholder="Author (optional)"
                            value={c.author}
                            onChange={e => updateContribution(c.id, { author: e.target.value })}
                            className="text-sm px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeContribution(c.id)}
                          className="p-2 text-gray-500 hover:text-red-600"
                          aria-label="Remove contribution"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      {c.type === 'text' && (
                        <textarea
                          value={c.data.text || ''}
                          onChange={e => updateContribution(c.id, { data: { text: e.target.value } })}
                          placeholder="Write the text portion here (HTML supported in preview)."
                          className="w-full text-sm px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          rows={4}
                        />
                      )}
                      {c.type === 'video' && (
                        <input
                          type="url"
                          value={c.data.videoUrl || ''}
                          onChange={e => updateContribution(c.id, { data: { videoUrl: e.target.value } })}
                          placeholder="Video URL (YouTube, Loom, etc.)"
                          className="w-full text-sm px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      )}
                      {c.type === 'diagram' && (
                        <textarea
                          value={c.data.diagramCode || ''}
                          onChange={e => updateContribution(c.id, { data: { diagramCode: e.target.value } })}
                          placeholder="Diagram code (e.g., Mermaid)"
                          className="w-full text-sm px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
                          rows={4}
                        />
                      )}
                    </div>
                  ))}

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => addContribution('text')}
                      className="text-sm px-3 py-1.5 rounded-md border border-gray-300 bg-white hover:bg-gray-50"
                    >
                      + Add text
                    </button>
                    <button
                      type="button"
                      onClick={() => addContribution('video')}
                      className="text-sm px-3 py-1.5 rounded-md border border-gray-300 bg-white hover:bg-gray-50"
                    >
                      + Add video
                    </button>
                    <button
                      type="button"
                      onClick={() => addContribution('diagram')}
                      className="text-sm px-3 py-1.5 rounded-md border border-gray-300 bg-white hover:bg-gray-50"
                    >
                      + Add diagram
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

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
              disabled={
                content.trim().length < 30 &&
                !contributions.some(c => (c.type === 'text' && (c.data.text || '').trim().length >= 10) || (c.type === 'video' && (c.data.videoUrl || '').trim().length > 0) || (c.type === 'diagram' && (c.data.diagramCode || '').trim().length > 0))
              }
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
