"use client";

import React, { useEffect } from 'react';
import { EditorContent, useEditor, Editor } from '@tiptap/react';
import { Extension } from '@tiptap/core';

// Tiptap Extensions
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import { TextStyle } from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import { FontFamily } from '@tiptap/extension-font-family';
import Focus from '@tiptap/extension-focus';
import Superscript from '@tiptap/extension-superscript';
import Subscript from '@tiptap/extension-subscript';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import { Table } from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableHeader from '@tiptap/extension-table-header';
import TableCell from '@tiptap/extension-table-cell';
import Image from '@tiptap/extension-image';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Placeholder from '@tiptap/extension-placeholder';
import CharacterCount from '@tiptap/extension-character-count';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { createLowlight } from 'lowlight';
import { marked } from 'marked';


interface EditorWrapperProps {
  onHtmlChange: (html: string) => void;
  onEditorReady: (editor: Editor | null) => void;
}

// Custom Font Size Extension
const FontSize = Extension.create({
  name: 'fontSize',
  addGlobalAttributes() {
    return [
      {
        types: ['textStyle'],
        attributes: {
          fontSize: {
            default: null,
            renderHTML: (attributes: { fontSize?: string | null }) => {
              if (!attributes.fontSize) return {};
              return { style: `font-size: ${attributes.fontSize}` };
            },
            parseHTML: (element: HTMLElement) => ({ fontSize: element.style.fontSize || null })
          }
        }
      }
    ];
  }
});

export const EditorWrapper: React.FC<EditorWrapperProps> = ({ onHtmlChange, onEditorReady }) => {
  // Function to detect if text is markdown
  const isMarkdown = (text: string): boolean => {
    const markdownPatterns = [
      /^#{1,6}\s+/, // Headers
      /\*\*.*\*\*/, // Bold
      /\*.*\*/, // Italic
      /^\s*[-*+]\s+/, // Unordered lists
      /^\s*\d+\.\s+/, // Ordered lists
      /^\s*>\s+/, // Blockquotes
      /```[\s\S]*```/, // Code blocks
      /`.*`/, // Inline code
      /\[.*\]\(.*\)/, // Links
      /!\[.*\]\(.*\)/, // Images
      /^\s*\|.*\|.*\|/, // Tables
      /^---+$/, // Horizontal rules
    ];
    
    return markdownPatterns.some(pattern => pattern.test(text));
  };

  // Function to convert markdown to HTML
  const convertMarkdownToHtml = (markdown: string): string => {
    try {
      return marked.parse(markdown, {
        breaks: true,
        gfm: true,
      }) as string;
    } catch (error) {
      console.error('Error converting markdown:', error);
      return markdown;
    }
  };

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Color,
      Highlight,
      FontFamily,
      Focus,
      Superscript,
      Subscript,
      Link.configure({ 
        openOnClick: true, 
        autolink: true, 
        protocols: ['http', 'https', 'mailto'] 
      }),
      TextAlign.configure({ 
        types: ['heading', 'paragraph'] 
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Placeholder.configure({
        placeholder: 'Start typing your document...',
      }),
      FontSize,
      CharacterCount, // Added for the status bar word count
      CodeBlockLowlight.configure({
        lowlight: createLowlight(),
      }),
    ],
    content: '<p></p>',
    editorProps: {
      attributes: {
        className: 'min-h-[10in] w-full outline-none focus:outline-none prose prose-lg max-w-none'
      },
      handlePaste: (view, event, slice) => {
        const text = event.clipboardData?.getData('text/plain') || '';
        
        if (isMarkdown(text)) {
          console.log('Detected markdown paste:', text);
          // Convert markdown to HTML and insert
          const html = convertMarkdownToHtml(text);
          console.log('Converted HTML:', html);
          
          // For now, just insert the markdown text directly
          // The editor will handle the formatting
          const { state, dispatch } = view;
          const tr = state.tr.insertText(text);
          dispatch(tr);
          return true; // Prevent default paste behavior
        }
        
        return false; // Allow default paste behavior
      }
    },
    onCreate({ editor }) {
      // Focus the editor immediately for Google Docs-like behavior
      setTimeout(() => {
        editor.commands.focus();
        // Ensure cursor is visible and blinking
        const editorElement = editor.view.dom;
        if (editorElement) {
          editorElement.focus();
          editorElement.click();
        }
      }, 200);
    }
  });

  // Handle HTML changes and pass to parent
  useEffect(() => {
    if (!editor) return;
    
    const handler = () => onHtmlChange(editor.getHTML());
    editor.on('update', handler);
    onHtmlChange(editor.getHTML()); // Initial content
    
    return () => { 
      editor.off('update', handler); 
    };
  }, [editor, onHtmlChange]);

  // Pass editor instance to parent component
  useEffect(() => {
    if (editor) {
      onEditorReady(editor);
    }
  }, [editor, onEditorReady]);

  return (
    // Google Docs-like page layout
    <div className="flex-1 flex flex-col bg-gray-100 overflow-y-auto">
      {/* Ruler */}
      <div className="bg-white border-b border-gray-300 px-4 py-2">
        <div className="max-w-4xl mx-auto">
          <div className="relative h-6 bg-gray-50 border border-gray-300">
            {/* Ruler markings */}
            <div className="absolute inset-0 flex items-center">
              {Array.from({ length: 19 }, (_, i) => (
                <div key={i} className="relative flex-1">
                  <div className="absolute left-0 top-0 h-2 w-px bg-gray-400"></div>
                  {i % 2 === 0 && (
                    <div className="absolute left-0 top-1 h-1 w-px bg-gray-600"></div>
                  )}
                  {i % 4 === 0 && (
                    <span className="absolute left-0 top-2 text-xs text-gray-600 transform -translate-x-1/2">
                      {i}
                    </span>
                  )}
                </div>
              ))}
            </div>
            {/* Indent markers */}
            <div className="absolute left-4 top-0 w-0 h-0 border-l-2 border-r-2 border-b-2 border-l-transparent border-r-transparent border-b-blue-500"></div>
            <div className="absolute left-4 top-2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-l-transparent border-r-transparent border-t-blue-500"></div>
          </div>
        </div>
      </div>
      
      {/* Document page */}
      <div className="flex-1 flex justify-center py-8 px-4">
        <div className="w-full max-w-4xl">
          {/* Page container with shadow and proper styling */}
          <div 
            className="bg-white shadow-lg min-h-[11in] p-12 relative cursor-text" 
            style={{ 
              width: '8.5in',
              minHeight: '11in',
              margin: '0 auto',
              boxShadow: '0 0 0 1px rgba(0,0,0,0.1), 0 2px 10px rgba(0,0,0,0.1)'
            }}
            onClick={() => {
              if (editor) {
                editor.commands.focus();
              }
            }}
          >
        <EditorContent editor={editor} />
          </div>
        </div>
      </div>
    </div>
  );
};