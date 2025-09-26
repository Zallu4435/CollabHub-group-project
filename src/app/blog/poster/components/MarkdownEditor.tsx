"use client";

import React, { useState, useEffect, useRef } from 'react';
import MarkdownPreview from './MarkdownPreview';
import { ViewMode } from './types';

interface MarkdownEditorProps {
  initialContent?: string;
  onContentChange?: (content: string) => void;
  previewSize?: number;
  setPreviewSize?: (size: number) => void;
  viewMode?: ViewMode;
}

export const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ 
  initialContent = '', 
  onContentChange,
  previewSize: externalPreviewSize,
  setPreviewSize: externalSetPreviewSize,
  viewMode = 'side-by-side'
}) => {
  const [markdownContent, setMarkdownContent] = useState(initialContent);
  const [internalPreviewSize, setInternalPreviewSize] = useState(50);
  const [isResizing, setIsResizing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Use external preview size if provided, otherwise use internal state
  const previewSize = externalPreviewSize ?? internalPreviewSize;
  const setPreviewSize = externalSetPreviewSize ?? setInternalPreviewSize;

  // Update parent component when content changes
  useEffect(() => {
    if (onContentChange) {
      onContentChange(markdownContent);
    }
  }, [markdownContent, onContentChange]);

  // Handle textarea changes
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdownContent(e.target.value);
  };

  // Handle resize functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsResizing(true);
    e.preventDefault();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing || !containerRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const newPreviewSize = ((e.clientX - containerRect.left) / containerRect.width) * 100;
    
    // Constrain between 20% and 80%
    const constrainedSize = Math.min(Math.max(newPreviewSize, 20), 80);
    setPreviewSize(constrainedSize);
  };

  const handleMouseUp = () => {
    setIsResizing(false);
  };

  // Add event listeners for resize
  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isResizing]);

  // Render different layouts based on viewMode
  const renderMarkdownEditor = () => {
    // Editor-Only View
    if (viewMode === 'editor-only') {
      return (
        <div className="flex-1 flex flex-col bg-gray-100 overflow-hidden">
          <div className="flex-1 overflow-y-auto">
            <div className="flex flex-col h-full">
              {/* Editor Header */}
              <div className="bg-white border-b border-gray-300 px-4 py-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600 font-medium">Markdown Editor</span>
                    <span className="text-xs text-gray-500">• Write in markdown syntax</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">
                      {markdownContent.split(/\s+/).filter(word => word.length > 0).length} words
                    </span>
                    <span className="text-xs text-gray-500">•</span>
                    <span className="text-xs text-gray-500">
                      {markdownContent.length} characters
                    </span>
                  </div>
                </div>
              </div>

              {/* Document-like Editor */}
              <div className="flex-1 flex justify-center py-8 px-4">
                <div className="w-full max-w-4xl">
                  <div className="bg-white shadow-lg min-h-[11in] p-12 relative" style={{ 
                    width: '8.5in',
                    minHeight: '11in',
                    margin: '0 auto',
                    boxShadow: '0 0 0 1px rgba(0,0,0,0.1), 0 2px 10px rgba(0,0,0,0.1)'
                  }}>
                    <textarea
                      value={markdownContent}
                      onChange={handleTextareaChange}
                      placeholder="# Start writing your markdown here...

## Features you can use:
- **Bold text** with double asterisks
- *Italic text* with single asterisks
- [Links](https://example.com) with square brackets
- \`inline code\` with backticks
- \`\`\`code blocks\`\`\` with triple backticks

### Lists
- Unordered lists with dashes
- Or with asterisks
- Or with plus signs

1. Ordered lists with numbers
2. Just like this

> Blockquotes with greater than signs

---

Horizontal rules with three dashes

| Tables | Are | Supported |
|--------|-----|----------|
| With   | Pipe | Symbols  |"
                      className="w-full h-full resize-none border-none outline-none bg-transparent text-gray-800 font-mono text-sm leading-relaxed"
                      style={{ 
                        fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
                        lineHeight: '1.6',
                        minHeight: '10in'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Preview-Only View
    if (viewMode === 'preview-only') {
      return (
        <div className="flex-1 flex flex-col bg-gray-100 overflow-y-auto">
          {/* Preview Header */}
          <div className="bg-white border-b border-gray-300 px-4 py-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600 font-medium">Markdown Preview</span>
                <span className="text-xs text-gray-500">• Read-only view</span>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                  onClick={() => navigator.clipboard.writeText(markdownContent)}
                  title="Copy markdown content"
                >
                  Copy Markdown
                </button>
                <button 
                  className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                  onClick={() => window.print()}
                  title="Print preview"
                >
                  Print
                </button>
              </div>
            </div>
          </div>

          {/* Preview Content */}
          <div className="flex-1 flex justify-center py-8 px-4">
            <div className="w-full max-w-4xl">
              <div className="bg-white shadow-lg min-h-[11in] p-12 relative" style={{ 
                width: '8.5in',
                minHeight: '11in',
                margin: '0 auto',
                boxShadow: '0 0 0 1px rgba(0,0,0,0.1), 0 2px 10px rgba(0,0,0,0.1)'
              }}>
                {markdownContent.trim() ? (
                  <MarkdownPreview content={markdownContent} />
                ) : (
                  <div className="text-center text-gray-500 py-20">
                    <h3 className="text-lg font-medium mb-2">No Content to Preview</h3>
                    <p className="text-sm">Start typing in the editor to see the markdown preview here.</p>
                    <div className="mt-8 text-left max-w-md mx-auto">
                      <h4 className="font-medium mb-2">Markdown Tips:</h4>
                      <div className="bg-gray-100 p-4 rounded text-xs text-left space-y-2">
                        <div><code># Heading 1</code></div>
                        <div><code>## Heading 2</code></div>
                        <div><code>**Bold** and *italic*</code></div>
                        <div><code>- List items</code></div>
                        <div><code>[Links](url)</code></div>
                        <div><code>`code` and ```blocks```</code></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Side-by-Side View (default)
    return (
      <div className="flex-1 flex bg-gray-100 overflow-hidden" ref={containerRef}>
        {/* Left Side: Markdown Editor */}
        <div 
          className="overflow-y-auto"
          style={{ width: `${100 - previewSize}%` }}
        >
          <div className="flex flex-col h-full">
            {/* Editor Header */}
            <div className="bg-white border-b border-gray-300 px-4 py-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600 font-medium">Markdown Editor</span>
                  <span className="text-xs text-gray-500">• Write in markdown syntax</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500">
                    {markdownContent.split(/\s+/).filter(word => word.length > 0).length} words
                  </span>
                  <span className="text-xs text-gray-500">•</span>
                  <span className="text-xs text-gray-500">
                    {markdownContent.length} characters
                  </span>
                </div>
              </div>
            </div>

            {/* Textarea */}
            <div className="flex-1 p-6 bg-white">
              <div className="h-full border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                <textarea
                  value={markdownContent}
                  onChange={handleTextareaChange}
                  placeholder="# Start writing your markdown here...

## Features you can use:
- **Bold text** with double asterisks
- *Italic text* with single asterisks
- [Links](https://example.com) with square brackets
- \`inline code\` with backticks
- \`\`\`code blocks\`\`\` with triple backticks

### Lists
- Unordered lists with dashes
- Or with asterisks
- Or with plus signs

1. Ordered lists with numbers
2. Just like this

> Blockquotes with greater than signs

---

Horizontal rules with three dashes

| Tables | Are | Supported |
|--------|-----|----------|
| With   | Pipe | Symbols  |"
                  className="w-full h-full resize-none border-none outline-none bg-transparent text-gray-800 font-mono text-sm leading-relaxed p-4"
                  style={{ 
                    fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
                    lineHeight: '1.6'
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Resize Handle */}
        <div 
          className={`w-2 bg-gray-200 hover:bg-blue-300 cursor-col-resize transition-all duration-150 flex items-center justify-center ${
            isResizing ? 'bg-blue-400' : ''
          }`}
          onMouseDown={handleMouseDown}
          title="Drag to resize panels"
        >
          <div className="w-1 h-8 bg-gray-400 rounded-full opacity-50 hover:opacity-100 transition-opacity" />
        </div>

        {/* Right Side: Live Preview */}
        <div 
          className="overflow-y-auto border-l border-gray-300 bg-gray-100"
          style={{ width: `${previewSize}%` }}
        >
          <div className="flex flex-col h-full">
            {/* Preview Header */}
            <div className="bg-white border-b border-gray-300 px-4 py-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600 font-medium">Live Preview</span>
                  <span className="text-xs text-gray-500">• Real-time markdown rendering</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button 
                    className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                    onClick={() => navigator.clipboard.writeText(markdownContent)}
                    title="Copy markdown content"
                  >
                    Copy Markdown
                  </button>
                  <button 
                    className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                    onClick={() => window.print()}
                    title="Print preview"
                  >
                    Print
                  </button>
                </div>
              </div>
            </div>

            {/* Preview Content */}
            <div className="flex-1 flex justify-center py-8 px-4">
              <div className="w-full max-w-4xl">
                <div className="bg-white shadow-lg min-h-[11in] p-12 relative" style={{ 
                  width: '8.5in',
                  minHeight: '11in',
                  margin: '0 auto',
                  boxShadow: '0 0 0 1px rgba(0,0,0,0.1), 0 2px 10px rgba(0,0,0,0.1)'
                }}>
                  {markdownContent.trim() ? (
                    <MarkdownPreview content={markdownContent} />
                  ) : (
                    <div className="text-center text-gray-500 py-20">
                      <h3 className="text-lg font-medium mb-2">No Content to Preview</h3>
                      <p className="text-sm">Start typing in the editor to see the live preview here.</p>
                      <div className="mt-8 text-left max-w-md mx-auto">
                        <h4 className="font-medium mb-2">Markdown Tips:</h4>
                        <div className="bg-gray-100 p-4 rounded text-xs text-left space-y-2">
                          <div><code># Heading 1</code></div>
                          <div><code>## Heading 2</code></div>
                          <div><code>**Bold** and *italic*</code></div>
                          <div><code>- List items</code></div>
                          <div><code>[Links](url)</code></div>
                          <div><code>`code` and ```blocks```</code></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return renderMarkdownEditor();
};

export default MarkdownEditor;
