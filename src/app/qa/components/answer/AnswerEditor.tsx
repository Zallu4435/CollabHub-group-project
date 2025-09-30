// qa/components/answer/AnswerEditor.tsx
'use client'
import { useState, useRef, useEffect } from 'react'
import { 
  Bold, 
  Italic, 
  Link, 
  Code, 
  Image, 
  List, 
  Quote,
  Minus,
  Hash,
  Type,
  HelpCircle,
  Upload
} from 'lucide-react'

interface AnswerEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export default function AnswerEditor({
  value,
  onChange,
  placeholder = "Write your answer...",
  className = ''
}: AnswerEditorProps) {
  const [showHelp, setShowHelp] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${Math.max(textarea.scrollHeight, 300)}px`
    }
  }, [value])

  const insertMarkdown = (before: string, after: string = '', newLine: boolean = false) => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end)
    
    const beforeText = value.substring(0, start)
    const afterText = value.substring(end)
    
    const prefix = newLine && beforeText && !beforeText.endsWith('\n') ? '\n' : ''
    const suffix = newLine && afterText && !afterText.startsWith('\n') ? '\n' : ''
    
    const newText = `${beforeText}${prefix}${before}${selectedText}${after}${suffix}${afterText}`
    
    onChange(newText)
    
    // Restore cursor position
    setTimeout(() => {
      textarea.focus()
      const newCursorPos = start + prefix.length + before.length + selectedText.length
      textarea.setSelectionRange(newCursorPos, newCursorPos)
    }, 0)
  }

  const insertCodeBlock = () => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const selectedText = value.substring(textarea.selectionStart, textarea.selectionEnd)
    
    insertMarkdown('\n``````\n', true)
    
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + 5, start + 5 + selectedText.length)
    }, 0)
  }

  const handleFileUpload = (files: FileList) => {
    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        // In a real app, upload to cloud storage and get URL
        const mockUrl = `https://example.com/images/${file.name}`
        insertMarkdown(`\n![${file.name}](${mockUrl})\n`, '', true)
      }
    })
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
    
    if (e.dataTransfer.files) {
      handleFileUpload(e.dataTransfer.files)
    }
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
      icon: Code,
      label: 'Inline Code',
      action: () => insertMarkdown('`', '`'),
      shortcut: 'Ctrl+`'
    },
    {
      icon: Type,
      label: 'Code Block',
      action: insertCodeBlock,
      shortcut: 'Ctrl+Shift+`'
    },
    { type: 'separator' },
    {
      icon: Hash,
      label: 'Heading',
      action: () => insertMarkdown('\n## ', '', true),
      shortcut: 'Ctrl+H'
    },
    {
      icon: List,
      label: 'Bulleted List',
      action: () => insertMarkdown('\n- ', '', true),
      shortcut: 'Ctrl+L'
    },
    {
      icon: Quote,
      label: 'Quote',
      action: () => insertMarkdown('\n> ', '', true),
      shortcut: 'Ctrl+Q'
    },
    {
      icon: Minus,
      label: 'Horizontal Rule',
      action: () => insertMarkdown('\n---\n', '', true)
    },
    { type: 'separator' },
    {
      icon: Link,
      label: 'Link',
      action: () => insertMarkdown('[', '](url)'),
      shortcut: 'Ctrl+K'
    },
    {
      icon: Image,
      label: 'Image',
      action: () => insertMarkdown('![alt text](', ')'),
      shortcut: 'Ctrl+G'
    },
    {
      icon: Upload,
      label: 'Upload Image',
      action: () => fileInputRef.current?.click()
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
          if (e.shiftKey) {
            insertCodeBlock()
          } else {
            insertMarkdown('`', '`')
          }
          break
        case 'h':
          e.preventDefault()
          insertMarkdown('\n## ', '', true)
          break
        case 'l':
          e.preventDefault()
          insertMarkdown('\n- ', '', true)
          break
        case 'q':
          e.preventDefault()
          insertMarkdown('\n> ', '', true)
          break
      }
    }
  }

  return (
    <div className={`border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent ${className}`}>
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
      />

      {/* Toolbar */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center gap-1">
          {toolbarButtons.map((button, index) => (
            button.type === 'separator' ? (
              <div key={index} className="w-px h-6 bg-gray-300 mx-1" />
            ) : (
              <button
                key={index}
                onClick={button.action}
                className="p-1.5 text-gray-600 hover:text-gray-800 hover:bg-white rounded transition-colors"
                title={button.shortcut ? `${button.label} (${button.shortcut})` : button.label}
                type="button"
              >
                <button.icon className="w-4 h-4" />
              </button>
            )
          ))}
        </div>
        
        <button
          onClick={() => setShowHelp(!showHelp)}
          className="p-1.5 text-gray-600 hover:text-gray-800 hover:bg-white rounded transition-colors"
          title="Formatting Help"
          type="button"
        >
          <HelpCircle className="w-4 h-4" />
        </button>
      </div>

      {/* Editor */}
      <div 
        className={`relative ${dragActive ? 'bg-blue-50 border-blue-300' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full px-3 py-3 border-0 resize-none focus:outline-none font-mono text-sm leading-relaxed"
          style={{ minHeight: '300px' }}
        />
        
        {dragActive && (
          <div className="absolute inset-0 flex items-center justify-center bg-blue-50 bg-opacity-90 border-2 border-dashed border-blue-300 rounded">
            <div className="text-center">
              <Upload className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-blue-600 font-medium">Drop images here to upload</p>
            </div>
          </div>
        )}
      </div>

      {/* Help Panel */}
      {showHelp && (
        <div className="border-t border-gray-200 bg-gray-50 px-3 py-3">
          <h4 className="text-sm font-medium text-gray-800 mb-3">Formatting Help</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-2">
              <div className="font-medium text-gray-700">Text Formatting</div>
              <div><code>**bold**</code> → <strong>bold</strong></div>
              <div><code>*italic*</code> → <em>italic</em></div>
              <div><code>`code`</code> → <code className="bg-gray-200 px-1 rounded">code</code></div>
              <div><code>``````</code> → code block</div>
            </div>
            <div className="space-y-2">
              <div className="font-medium text-gray-700">Structure</div>
              <div><code>## Heading</code> → heading</div>
              <div><code>- list item</code> → • list item</div>
              <div><code>&gt; quote</code> → quote</div>
              <div><code>[link](url)</code> → <span className="text-blue-600">link</span></div>
            </div>
          </div>
          <div className="mt-3 text-xs text-gray-600">
            💡 Use keyboard shortcuts for faster formatting. Drag & drop images to upload.
          </div>
        </div>
      )}
    </div>
  )
}
