// qa/components/question/QuestionEditor.tsx
'use client'
import { useState, useRef } from 'react'
import { 
  Bold, 
  Italic, 
  Link, 
  Code, 
  Image, 
  List, 
  Quote, 
  Eye,
  HelpCircle 
} from 'lucide-react'

interface QuestionEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export default function QuestionEditor({
  value,
  onChange,
  placeholder = "Describe your question in detail...",
  className = ''
}: QuestionEditorProps) {
  const [showHelp, setShowHelp] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const insertMarkdown = (before: string, after: string = '') => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end)
    
    const beforeText = value.substring(0, start)
    const afterText = value.substring(end)
    
    const newText = `${beforeText}${before}${selectedText}${after}${afterText}`
    
    onChange(newText)
    
    // Restore cursor position
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(
        start + before.length, 
        start + before.length + selectedText.length
      )
    }, 0)
  }

  const toolbarButtons = [
    { 
      icon: Bold, 
      label: 'Bold', 
      action: () => insertMarkdown('**', '**'),
      shortcut: 'Ctrl+B'
    },
    { 
      icon: Italic, 
      label: 'Italic', 
      action: () => insertMarkdown('*', '*'),
      shortcut: 'Ctrl+I'
    },
    { 
      icon: Link, 
      label: 'Link', 
      action: () => insertMarkdown('[', '](url)'),
      shortcut: 'Ctrl+K'
    },
    { 
      icon: Code, 
      label: 'Code', 
      action: () => insertMarkdown('`', '`'),
      shortcut: 'Ctrl+`'
    },
    { 
      icon: Image, 
      label: 'Image', 
      action: () => insertMarkdown('![alt text](', ')'),
      shortcut: 'Ctrl+G'
    },
    { 
      icon: List, 
      label: 'List', 
      action: () => insertMarkdown('\n- ', ''),
      shortcut: 'Ctrl+L'
    },
    { 
      icon: Quote, 
      label: 'Quote', 
      action: () => insertMarkdown('\n> ', ''),
      shortcut: 'Ctrl+Q'
    }
  ]

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case 'b':
          e.preventDefault()
          insertMarkdown('**', '**')
          break
        case 'i':
          e.preventDefault()
          insertMarkdown('*', '*')
          break
        case 'k':
          e.preventDefault()
          insertMarkdown('[', '](url)')
          break
        case '`':
          e.preventDefault()
          insertMarkdown('`', '`')
          break
      }
    }
  }

  return (
    <div className={`border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent ${className}`}>
      {/* Toolbar */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center gap-1">
          {toolbarButtons.map((button, index) => (
            <button
              key={index}
              onClick={button.action}
              className="p-1.5 text-gray-600 hover:text-gray-800 hover:bg-white rounded transition-colors"
              title={`${button.label} (${button.shortcut})`}
              type="button"
            >
              <button.icon className="w-4 h-4" />
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowHelp(!showHelp)}
            className="p-1.5 text-gray-600 hover:text-gray-800 hover:bg-white rounded transition-colors"
            title="Markdown Help"
            type="button"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Editor */}
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full px-3 py-3 border-0 resize-none focus:outline-none font-mono text-sm leading-relaxed"
          rows={12}
          style={{ minHeight: '200px' }}
        />
        
        {/* Character count */}
        <div className="absolute bottom-2 right-3 text-xs text-gray-400">
          {value.length} characters
        </div>
      </div>

      {/* Help Panel */}
      {showHelp && (
        <div className="border-t border-gray-200 bg-gray-50 px-3 py-3">
          <h4 className="text-sm font-medium text-gray-800 mb-2">Markdown Formatting</h4>
          <div className="grid grid-cols-2 gap-3 text-xs text-gray-600">
            <div>
              <code>**bold text**</code> → <strong>bold text</strong>
            </div>
            <div>
              <code>*italic text*</code> → <em>italic text</em>
            </div>
            <div>
              <code>`inline code`</code> → <code className="bg-gray-200 px-1 rounded">inline code</code>
            </div>
            <div>
              <code>[link](url)</code> → <span className="text-blue-600">link</span>
            </div>
            <div>
              <code>- list item</code> → • list item
            </div>
            <div>
              <code>&gt; quote</code> → blockquote
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-500">
            Use three backticks (```
          </div>
        </div>
      )}
    </div>
  )
}
