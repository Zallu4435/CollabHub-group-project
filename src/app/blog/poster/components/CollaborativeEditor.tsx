"use client";

import React, { useEffect, useRef, useState } from 'react';
import { EditorContent, useEditor, Editor } from '@tiptap/react';
import { Extension, Mark } from '@tiptap/core';

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
import { Node, mergeAttributes } from '@tiptap/core';

// --- Simple helpers for media embeds ---
const detectProvider = (url: string): 'youtube' | 'twitter' | 'gist' | 'generic' => {
  try {
    const u = new URL(url);
    if (/(youtube\.com|youtu\.be)/i.test(u.hostname)) return 'youtube';
    if (/twitter\.com/i.test(u.hostname)) return 'twitter';
    if (/gist\.github\.com/i.test(u.hostname)) return 'gist';
    return 'generic';
  } catch {
    return 'generic';
  }
};

const getYouTubeEmbedSrc = (url: string): string | null => {
  try {
    const u = new URL(url);
    if (u.hostname === 'youtu.be') {
      const id = u.pathname.slice(1);
      return `https://www.youtube.com/embed/${id}`;
    }
    if (u.hostname.includes('youtube.com')) {
      const id = u.searchParams.get('v');
      if (id) return `https://www.youtube.com/embed/${id}`;
      // /embed/ already
      if (u.pathname.startsWith('/embed/')) return u.toString();
    }
  } catch {}
  return null;
};

// Create DOM node for an embed, used by NodeView for better WYSIWYG in-client
function resolveEmbed(url: string, provider?: string) {
  const container = document.createElement('div');
  container.className = 'w-full';
  const resolvedProvider = (provider as any) || detectProvider(url);
  if (resolvedProvider === 'youtube') {
    const src = getYouTubeEmbedSrc(url);
    const iframe = document.createElement('iframe');
    iframe.setAttribute('data-embed', 'true');
    iframe.src = src || url;
    iframe.className = 'w-full';
    iframe.style.aspectRatio = '16 / 9';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.setAttribute('allowfullscreen', 'true');
    container.appendChild(iframe);
    return container;
  }
  if (resolvedProvider === 'twitter') {
    const iframe = document.createElement('iframe');
    iframe.setAttribute('data-embed', 'true');
    iframe.src = `https://twitframe.com/show?url=${encodeURIComponent(url)}`;
    iframe.className = 'w-full';
    iframe.style.minHeight = '200px';
    container.appendChild(iframe);
    return container;
  }
  if (resolvedProvider === 'gist') {
    try {
      const u = new URL(url);
      const pibb = `${u.origin}${u.pathname}.pibb`;
      const iframe = document.createElement('iframe');
      iframe.setAttribute('data-embed', 'true');
      iframe.src = pibb;
      iframe.className = 'w-full';
      iframe.style.minHeight = '300px';
      container.appendChild(iframe);
      return container;
    } catch {}
  }
  const a = document.createElement('a');
  a.href = url;
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  a.textContent = url;
  a.setAttribute('data-embed', 'true');
  container.appendChild(a);
  return container;
}

interface CollaborativeEditorProps {
  onHtmlChange: (html: string) => void;
  onEditorReady: (editor: Editor | null) => void;
  roomId?: string;
  userName?: string;
  onUsersChange?: (users: Array<{ name: string; color: string }>) => void;
  roomKey?: string;
  isAdmin?: boolean;
  approvalRequired?: boolean;
  allowlistText?: string;
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

export const CollaborativeEditor: React.FC<CollaborativeEditorProps> = ({ 
  onHtmlChange, 
  onEditorReady, 
  roomId = 'default-room',
  userName = 'Anonymous',
  onUsersChange,
  roomKey,
  isAdmin = true,
  approvalRequired = false,
  allowlistText
}) => {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('Connecting...');
  type InternalUser = { id: string; name: string; color: string };
  const [connectedUsers, setConnectedUsers] = useState<InternalUser[]>([]);
  const channelRef = useRef<BroadcastChannel | null>(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [pendingRequest, setPendingRequest] = useState(false);
  const selfIdRef = useRef<string>(`u_${Math.random().toString(36).slice(2, 10)}`);

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
      CharacterCount,
      CodeBlockLowlight.configure({
        lowlight: createLowlight(),
      }),
      // Comment mark
      Mark.create({
        name: 'commentMark',
        inclusive: false,
        exitable: true,
        addAttributes() {
          return {
            id: { default: null },
            text: { default: null },
            resolved: { default: false },
          };
        },
        parseHTML() {
          return [
            { tag: 'span[data-comment]' },
          ];
        },
        renderHTML({ HTMLAttributes }: { HTMLAttributes: Record<string, any> }) {
          const attrs = mergeAttributes(HTMLAttributes, {
            'data-comment': 'true',
            'data-id': HTMLAttributes.id,
            'data-resolved': String(HTMLAttributes.resolved ?? false),
            class: `comment-mark ${HTMLAttributes.resolved ? 'opacity-50 line-through' : 'bg-yellow-100'}`,
          });
          return ['span', attrs, 0];
        },
      }),
      // Lightweight embed node for common providers by URL
      Node.create({
        name: 'embed',
        group: 'block',
        atom: true,
        selectable: true,
        draggable: true,
        addAttributes() {
          return {
            url: {
              default: null,
            },
            provider: {
              default: null,
            },
          };
        },
        parseHTML() {
          return [
            { tag: 'div[data-embed]' },
            { tag: 'iframe[data-embed]' },
            { tag: 'a[data-embed]' },
          ];
        },
        renderHTML({ HTMLAttributes }) {
          const url = (HTMLAttributes as any).url as string | null;
          const explicitProvider = (HTMLAttributes as any).provider as string | null;
          const provider = url ? (explicitProvider || detectProvider(url)) : null;
          if (!url || !provider) {
            return ['a', mergeAttributes(HTMLAttributes, { 'data-embed': 'true', href: '#', rel: 'noopener noreferrer' }), 'invalid embed'];
          }
          if (provider === 'youtube') {
            const src = getYouTubeEmbedSrc(url);
            if (src) {
              return ['iframe', mergeAttributes(HTMLAttributes, { 'data-embed': 'true', src, class: 'w-full aspect-video', frameborder: '0', allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share', allowfullscreen: 'true' })];
            }
          }
          if (provider === 'twitter') {
            const src = `https://twitframe.com/show?url=${encodeURIComponent(url)}`;
            return ['iframe', mergeAttributes(HTMLAttributes, { 'data-embed': 'true', src, class: 'w-full', style: 'min-height: 200px' })];
          }
          if (provider === 'gist') {
            // Attempt to transform to .pibb embeddable page when possible
            try {
              const u = new URL(url);
              if (/gist\.github\.com/i.test(u.hostname)) {
                const pibb = `${u.origin}${u.pathname}.pibb`;
                return ['iframe', mergeAttributes(HTMLAttributes, { 'data-embed': 'true', src: pibb, class: 'w-full', style: 'min-height: 300px' })];
              }
            } catch {}
          }
          return ['a', mergeAttributes(HTMLAttributes, { 'data-embed': 'true', href: url, rel: 'noopener noreferrer', target: '_blank' }), url];
        },
        addNodeView() {
          return ({ node }) => {
            const dom = document.createElement('div');
            dom.setAttribute('data-embed', 'true');
            dom.className = 'my-3';
            const url: string = node.attrs.url;
            const provider: string | null = node.attrs.provider || detectProvider(url);

            const wrapper = document.createElement('div');
            wrapper.className = 'rounded-lg overflow-hidden border border-gray-200 bg-white';

            const resolved = resolveEmbed(url, provider || undefined);
            wrapper.appendChild(resolved);
            dom.appendChild(wrapper);
            return { dom };
          };
        },
      })
    ],
    content: '<p></p>',
    editorProps: {
      attributes: {
        className: 'min-h-[10in] w-full outline-none focus:outline-none prose prose-lg max-w-none text-black'
      },
    },
    onCreate({ editor }) {
      // Initialize collaboration
      initializeCollaboration(editor);
      
      // Focus the editor immediately
      setTimeout(() => {
        try {
          // Check if editor is mounted and view is available
          if (editor && editor.view && editor.view.dom) {
            editor.commands.focus();
            const editorElement = editor.view.dom;
            if (editorElement) {
              editorElement.focus();
              editorElement.click();
            }
          }
        } catch (error) {
          console.warn('Collaborative editor focus failed:', error);
        }
      }, 200);
    },
  });

  // Propagate user list changes to parent AFTER render commit
  useEffect(() => {
    // Expose only name/color outward
    onUsersChange?.(connectedUsers.map(u => ({ name: u.name, color: u.color })));
  }, [connectedUsers]);

  const initializeCollaboration = (editor: Editor) => {
    try {
      // Close any existing channel before re-initializing
      if (channelRef.current) {
        try { channelRef.current.close(); } catch {}
      }
      // Create a simple collaboration channel using BroadcastChannel
      const channelName = `collaborative-editor-${roomId}`;
      channelRef.current = new BroadcastChannel(channelName);
      
      // Add current user to the list
      const currentUser: InternalUser = {
        id: selfIdRef.current,
        name: userName,
        color: getRandomColor(),
      };
      setConnectedUsers([currentUser]);
      onUsersChange?.([{ name: currentUser.name, color: currentUser.color }]);

      // Listen for other users joining
      channelRef.current.onmessage = (event) => {
        const { type, data } = event.data;
        
        if (type === 'user-joined') {
          const newUser: InternalUser = {
            id: data.userId || `u_${Math.random().toString(36).slice(2, 10)}`,
            name: data.userName,
            color: data.color || getRandomColor(),
          };
          setConnectedUsers(prev => {
            const exists = prev.some(u => u.id === newUser.id);
            return exists ? prev : [...prev, newUser];
          });
        } else if (type === 'presence-query') {
          // Reply with our presence
          const me = connectedUsers.find(u => u.id === selfIdRef.current);
          if (me) {
            channelRef.current?.postMessage({
              type: 'user-joined',
              data: { userId: me.id, userName: me.name, color: me.color }
            });
          }
        } else if (type === 'join-request' && isAdmin) {
          // Admin: enforce passcode and optional allowlist; approval mode gates entry
          const allowlist = (allowlistText || '')
            .split(/\n|,/)
            .map((s: string) => s.trim())
            .filter(Boolean);
          const nameOk = allowlist.length === 0 || allowlist.includes(data.userName);
          const passOk = !roomKey || roomKey === data.key;
          const approved = passOk && nameOk && (!approvalRequired || approvalRequired);
          channelRef.current?.postMessage({
            type: 'join-response',
            data: { approved, reason: approved ? undefined : 'Invalid passcode or not allowed' }
          });
        } else if (type === 'join-response' && pendingRequest) {
          if (data.approved) {
            setIsAuthorized(true);
            setPendingRequest(false);
          } else {
            setIsAuthorized(false);
            setPendingRequest(false);
            alert(data.reason || 'Join request denied');
          }
        } else if (type === 'content-update') {
          // In a real implementation, you would sync the content here
          // For now, we'll just simulate real-time updates
          console.log('Content update received:', data);
        }
      };

      // Announce user joining
      // First, if not admin, request to join (with optional key)
      if (!isAdmin) {
        setPendingRequest(true);
        channelRef.current.postMessage({ type: 'join-request', data: { userName, key: roomKey } });
      } else {
        setIsAuthorized(true);
      }

      // Broadcast presence (include id and color)
      channelRef.current.postMessage({ type: 'user-joined', data: { userId: selfIdRef.current, userName, color: currentUser.color } });
      // Ask others to announce themselves so we can discover existing members
      channelRef.current.postMessage({ type: 'presence-query', data: { userId: selfIdRef.current } });

      // Simulate connection status
      setTimeout(() => {
        setConnectionStatus('Connected');
        setIsConnected(true);
      }, 500);

    } catch (error) {
      console.error('Failed to initialize collaboration:', error);
      setConnectionStatus('Failed to connect');
      setIsConnected(false);
    }
  };

  // Re-initialize collaboration when room or auth context changes
  useEffect(() => {
    if (!editor) return;
    initializeCollaboration(editor);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId, userName, roomKey, isAdmin]);

  const getRandomColor = (): string => {
    const colors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
      '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Handle HTML changes and pass to parent
  useEffect(() => {
    if (!editor) return;
    
    const handler = () => {
      const html = editor.getHTML();
      onHtmlChange(html);
      
      // Broadcast content changes to other users
      if (channelRef.current) {
        channelRef.current.postMessage({
          type: 'content-update',
          data: { html, userName }
        });
      }
    };
    
    editor.on('update', handler);
    onHtmlChange(editor.getHTML()); // Initial content
    
    return () => { 
      editor.off('update', handler); 
    };
  }, [editor, onHtmlChange, userName]);

  // Pass editor instance to parent component
  useEffect(() => {
    if (editor) {
      onEditorReady(editor);
    }
  }, [editor, onEditorReady]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (channelRef.current) {
        channelRef.current.close();
      }
    };
  }, []);

  return (
    <div className="flex-1 flex flex-col bg-gray-100 overflow-y-auto">
      {/* Connection Status Bar */}
      <div className="bg-white border-b border-gray-300 px-4 py-2">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-sm text-gray-600">
              {isConnected ? 'Connected' : connectionStatus}
            </span>
            <span className="text-xs text-gray-500">• Room: {roomId}</span>
            <span className="text-xs text-gray-500">• Users: {connectedUsers.length}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-500">Collaborative editing enabled</span>
          </div>
        </div>
      </div>

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