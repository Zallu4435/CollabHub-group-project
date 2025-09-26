"use client";

import React, { useState } from 'react';
import { Editor } from '@tiptap/react';
import mammoth from 'mammoth';
import { marked } from 'marked';
import { Toolbar } from './Toolbar';
import { ViewControls } from './ViewControls';
import PreviewPopup from './PreviewPopup';
import { EditorWrapper } from './EditorWrapper';
import { CollaborativeEditor } from './CollaborativeEditor';
import { CollaborativeSidebar } from './CollaborativeSidebar';
import { ViewMode } from './types';
import MarkdownEditor from './MarkdownEditor';

export const WordEditor: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('editor-only');
  const [previewSize, setPreviewSize] = useState(50);
  const [isPreviewPopup, setIsPreviewPopup] = useState(false);
  const [html, setHtml] = useState<string>('');
  const [editor, setEditor] = useState<Editor | null>(null);
  const [markdownContent, setMarkdownContent] = useState<string>('');
  const [isMarkdownEditor, setIsMarkdownEditor] = useState(false);
  const [isCollaborativeMode, setIsCollaborativeMode] = useState(true);
  const [userName, setUserName] = useState<string>('Anonymous');
  const [roomId, setRoomId] = useState<string>('collaborative-editing');
  const [roomKey, setRoomKey] = useState<string>('');
  const [isAdmin, setIsAdmin] = useState<boolean>(true);
  const [approvalRequired, setApprovalRequired] = useState<boolean>(false);
  const [allowlistText, setAllowlistText] = useState<string>('');
  const [connectedUsers, setConnectedUsers] = useState<Array<{ name: string; color: string }>>([]);

  // Function to convert markdown to HTML
  const markdownToHtml = (markdown: string): string => {
    try {
      const result = marked(markdown);
      return typeof result === 'string' ? result : result.toString();
    } catch (error) {
      console.error('Error converting markdown to HTML:', error);
      return markdown; // Return original markdown if conversion fails
    }
  };

  // Function to convert HTML to markdown (simplified)
  const htmlToMarkdown = (html: string): string => {
    // This is a simplified conversion - in a real app you'd use a proper HTML to markdown converter
    return html
      .replace(/<h1[^>]*>(.*?)<\/h1>/gi, '# $1\n\n')
      .replace(/<h2[^>]*>(.*?)<\/h2>/gi, '## $1\n\n')
      .replace(/<h3[^>]*>(.*?)<\/h3>/gi, '### $1\n\n')
      .replace(/<h4[^>]*>(.*?)<\/h4>/gi, '#### $1\n\n')
      .replace(/<h5[^>]*>(.*?)<\/h5>/gi, '##### $1\n\n')
      .replace(/<h6[^>]*>(.*?)<\/h6>/gi, '###### $1\n\n')
      .replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**')
      .replace(/<b[^>]*>(.*?)<\/b>/gi, '**$1**')
      .replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*')
      .replace(/<i[^>]*>(.*?)<\/i>/gi, '*$1*')
      .replace(/<ul[^>]*>(.*?)<\/ul>/gi, (match, content) => {
        return content.replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1\n') + '\n';
      })
      .replace(/<ol[^>]*>(.*?)<\/ol>/gi, (match, content) => {
        return content.replace(/<li[^>]*>(.*?)<\/li>/gi, (match: string, item: string, index: number) => `${index + 1}. ${item}\n`) + '\n';
      })
      .replace(/<blockquote[^>]*>(.*?)<\/blockquote>/gi, '> $1\n\n')
      .replace(/<code[^>]*>(.*?)<\/code>/gi, '`$1`')
      .replace(/<pre[^>]*>(.*?)<\/pre>/gi, '```\n$1\n```\n\n')
      .replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)')
      .replace(/<p[^>]*>(.*?)<\/p>/gi, '$1\n\n')
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<[^>]*>/g, '') // Remove remaining HTML tags
      .replace(/\n\s*\n\s*\n/g, '\n\n') // Clean up multiple newlines
      .trim();
  };

  // Toggle markdown editor mode
  const toggleMarkdownEditor = () => {
    if (!isMarkdownEditor) {
      // Convert current HTML content to markdown when switching to markdown editor
      const markdown = htmlToMarkdown(html);
      setMarkdownContent(markdown);
    } else {
      // Convert markdown content back to HTML when switching back to normal editor
      const htmlFromMarkdown = markdownToHtml(markdownContent);
      setHtml(htmlFromMarkdown);
      if (editor) {
        editor.commands.setContent(htmlFromMarkdown, { emitUpdate: true });
      }
    }
    setIsMarkdownEditor(!isMarkdownEditor);
  };

  // Toggle collaborative mode
  const toggleCollaborativeMode = () => {
    setIsCollaborativeMode(!isCollaborativeMode);
  };

  // Handle user name change
  const handleUserNameChange = (newName: string) => {
    setUserName(newName);
  };

  // Handle room ID change
  const handleRoomIdChange = (newRoomId: string) => {
    setRoomId(newRoomId);
  };

  const handleRoomKeyChange = (newKey: string) => {
    setRoomKey(newKey);
  };

  const toggleAdmin = () => setIsAdmin(prev => !prev);
  const toggleApprovalRequired = () => setApprovalRequired(prev => !prev);

  // Parse URL params on mount for roomId and optional key
  React.useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const idFromUrl = params.get('roomId');
      const keyFromUrl = params.get('key');
      if (idFromUrl) setRoomId(idFromUrl);
      if (keyFromUrl) setRoomKey(keyFromUrl);
    } catch {}
  }, []);

  // Implemented file upload logic
  const handleUpload = async (file: File) => {
    if (!editor) return;
    if (file.name.endsWith('.docx')) {
      const arrayBuffer = await file.arrayBuffer();
      const { value } = await mammoth.convertToHtml({ arrayBuffer });
      editor.commands.setContent(value || '<p></p>', { emitUpdate: true });
    }
  };

  // Handle markdown content changes
  const handleMarkdownChange = (newMarkdown: string) => {
    setMarkdownContent(newMarkdown);
    // Also update HTML in real-time for consistency
    const htmlFromMarkdown = markdownToHtml(newMarkdown);
    setHtml(htmlFromMarkdown);
  };

  const renderContent = () => {
    // Markdown Editor Mode (Live editing with split view)
    if (isMarkdownEditor) {
      return (
        <MarkdownEditor 
          initialContent={markdownContent}
          onContentChange={handleMarkdownChange}
          previewSize={previewSize}
          setPreviewSize={setPreviewSize}
          viewMode={viewMode}
        />
      );
    }

    // Collaborative Editor Mode
    if (isCollaborativeMode) {
      if (viewMode === 'editor-only') {
        return (
          <CollaborativeEditor 
            onHtmlChange={setHtml} 
            onEditorReady={setEditor}
            roomId={roomId}
            userName={userName}
            roomKey={roomKey}
            isAdmin={isAdmin}
            onUsersChange={setConnectedUsers}
          />
        );
      }
      
      // Side-by-Side View with Collaborative Editor
      return (
        <div className="flex-1 flex bg-gray-100 overflow-hidden">
          {/* Editor Pane */}
          <div 
            className="overflow-y-auto"
            style={{ width: `${100 - previewSize}%` }}
          >
            <CollaborativeEditor 
              onHtmlChange={setHtml} 
              onEditorReady={setEditor}
              roomId={roomId}
              userName={userName}
              roomKey={roomKey}
              isAdmin={isAdmin}
              onUsersChange={setConnectedUsers}
            />
          </div>
          {/* Preview Pane */}
          <div 
            className="overflow-y-auto border-l border-gray-300 bg-gray-100"
            style={{ width: `${previewSize}%` }}
          >
            <div className="flex flex-col h-full">
              {/* Preview header */}
              <div className="bg-white border-b border-gray-300 px-4 py-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Live Preview</span>
                  <div className="flex items-center space-x-2">
                    <button 
                      className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                      onClick={() => window.print()}
                      title="Print document"
                    >
                      Print
                    </button>
                    <button 
                      className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                      onClick={() => navigator.clipboard.writeText(html.replace(/<[^>]*>/g, ''))}
                      title="Copy text content"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Document page */}
              <div className="flex-1 flex justify-center py-8 px-4">
                <div className="w-full max-w-4xl">
                  <div className="bg-white shadow-lg min-h-[11in] p-12 relative" style={{ 
                    width: '8.5in',
                    minHeight: '11in',
                    margin: '0 auto',
                    boxShadow: '0 0 0 1px rgba(0,0,0,0.1), 0 2px 10px rgba(0,0,0,0.1)'
                  }}>
                    <div className="min-h-[10in] w-full outline-none focus:outline-none">
                      <div className="preview-content" dangerouslySetInnerHTML={{ __html: html }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Editor-Only View (already good)
    if (viewMode === 'editor-only') {
      return (
        <EditorWrapper 
          onHtmlChange={setHtml} 
          onEditorReady={setEditor}
        />
      );
    }

    // Preview-Only View (Clean reading mode - no editing tools)
    if (viewMode === 'preview-only') {
      return (
        <div className="flex-1 flex flex-col bg-gray-100 overflow-y-auto">
          {/* Clean header for preview mode */}
          <div className="bg-white border-b border-gray-300 px-4 py-3">
            <div className="max-w-4xl mx-auto flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Preview Mode</span>
                <span className="text-xs text-gray-500">• Read-only view</span>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                  onClick={() => window.print()}
                >
                  Print
                </button>
                <button 
                  className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                  onClick={() => navigator.clipboard.writeText(html.replace(/<[^>]*>/g, ''))}
                >
                  Copy Text
                </button>
              </div>
            </div>
          </div>
          
          {/* Document page - clean view without ruler */}
          <div className="flex-1 flex justify-center py-8 px-4">
            <div className="w-full max-w-4xl">
              <div className="bg-white shadow-lg min-h-[11in] p-12 relative" style={{ 
                width: '8.5in',
                minHeight: '11in',
                margin: '0 auto',
                boxShadow: '0 0 0 1px rgba(0,0,0,0.1), 0 2px 10px rgba(0,0,0,0.1)'
              }}>
                <div className="min-h-[10in] w-full outline-none focus:outline-none">
                  <div className="preview-content" dangerouslySetInnerHTML={{ __html: html }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Side-by-Side View (Unified styling)
    return (
      <div className="flex-1 flex bg-gray-100 overflow-hidden">
        {/* Editor Pane */}
        <div 
          className="overflow-y-auto"
          style={{ width: `${100 - previewSize}%` }}
        >
          <EditorWrapper 
            onHtmlChange={setHtml} 
            onEditorReady={setEditor}
          />
        </div>
        {/* Preview Pane */}
        <div 
          className="overflow-y-auto border-l border-gray-300 bg-gray-100"
          style={{ width: `${previewSize}%` }}
        >
          <div className="flex flex-col h-full">
            {/* Preview header */}
            <div className="bg-white border-b border-gray-300 px-4 py-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Live Preview</span>
                <div className="flex items-center space-x-2">
                  <button 
                    className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                    onClick={() => window.print()}
                    title="Print document"
                  >
                    Print
                  </button>
                  <button 
                    className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                    onClick={() => navigator.clipboard.writeText(html.replace(/<[^>]*>/g, ''))}
                    title="Copy text content"
                  >
                    Copy
                  </button>
                </div>
              </div>
            </div>
            
            {/* Document page */}
            <div className="flex-1 flex justify-center py-8 px-4">
              <div className="w-full max-w-4xl">
                <div className="bg-white shadow-lg min-h-[11in] p-12 relative" style={{ 
                  width: '8.5in',
                  minHeight: '11in',
                  margin: '0 auto',
                  boxShadow: '0 0 0 1px rgba(0,0,0,0.1), 0 2px 10px rgba(0,0,0,0.1)'
                }}>
                  <div className="min-h-[10in] w-full outline-none focus:outline-none">
                    <div className="preview-content" dangerouslySetInnerHTML={{ __html: html }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Toolbar editor={editor} onUpload={handleUpload} />
      <ViewControls 
        viewMode={viewMode}
        setViewMode={setViewMode}
        previewSize={previewSize}
        setPreviewSize={setPreviewSize}
        isPreviewPopup={isPreviewPopup}
        setIsPreviewPopup={setIsPreviewPopup}
        isMarkdownEditor={isMarkdownEditor}
        onToggleMarkdownEditor={toggleMarkdownEditor}
        isCollaborativeMode={isCollaborativeMode}
        onToggleCollaborativeMode={toggleCollaborativeMode}
        userName={userName}
        onUserNameChange={handleUserNameChange}
        roomId={roomId}
        onRoomIdChange={handleRoomIdChange}
        roomKey={roomKey}
        onRoomKeyChange={handleRoomKeyChange}
        isAdmin={isAdmin}
        onToggleAdmin={toggleAdmin}
        approvalRequired={approvalRequired}
        onToggleApprovalRequired={toggleApprovalRequired}
        allowlistText={allowlistText}
        onAllowlistTextChange={setAllowlistText}
      />
      
      <main className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex flex-col overflow-hidden">
          {renderContent()}
        </div>
        
        {/* Collaborative Sidebar */}
        {isCollaborativeMode && (
          <CollaborativeSidebar 
            roomId={roomId}
            userName={userName}
            onUsersChange={setConnectedUsers}
            collaborativeUsersExternal={connectedUsers}
          />
        )}
      </main>
      
      <PreviewPopup 
        html={html}
        isOpen={isPreviewPopup}
        onClose={() => setIsPreviewPopup(false)}
      />
      
      {/* Status Bar */}
      <footer className="bg-white border-t border-gray-300 px-4 py-1.5 flex justify-between items-center text-xs text-gray-700">
        <div className="flex items-center space-x-4">
          <span>Page 1 of 1</span>
          <span>Words: {editor?.storage.characterCount.words() ?? 0}</span>
          <span>Characters: {editor?.storage.characterCount.characters() ?? 0}</span>
        </div>
        <div className="flex items-center space-x-2">
          {isCollaborativeMode ? (
            <>
              <span>Collaborative editing enabled</span>
              <span>•</span>
              <span>{connectedUsers.length} users connected</span>
            </>
          ) : (
            <span>Single user mode</span>
          )}
        </div>
      </footer>
    </div>
  );
};

export default WordEditor;