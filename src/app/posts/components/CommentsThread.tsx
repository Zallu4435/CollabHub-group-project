"use client";

import React, { useState, useRef, useEffect } from 'react';
import { CommentItem } from "../types";

interface CommentsThreadProps {
  comments: CommentItem[];
  onAdd: (content: string, parentId?: string) => void;
}

// Mock users for mentions
const MOCK_USERS = [
  { id: 'u_sarah', name: 'Sarah Johnson', handle: '@sarahj' },
  { id: 'u_maria', name: 'Maria Gomez', handle: '@mariag' },
  { id: 'u_dev', name: 'Alex Kim', handle: '@alexk' },
  { id: 'u_mike', name: 'Mike Chen', handle: '@mikec' },
  { id: 'u_jane', name: 'Jane Smith', handle: '@janes' },
];

export default function CommentsThread({ comments, onAdd }: CommentsThreadProps) {
  const [content, setContent] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [showMentions, setShowMentions] = useState(false);
  const [mentionQuery, setMentionQuery] = useState('');
  const [mentionPosition, setMentionPosition] = useState(0);
  const [filteredUsers, setFilteredUsers] = useState(MOCK_USERS);
  const [selectedMentionIndex, setSelectedMentionIndex] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const replyTextareaRef = useRef<HTMLTextAreaElement>(null);

  const topLevel = comments.filter((c) => !c.parentId);
  const repliesOf = (id: string) => comments.filter((c) => c.parentId === id);

  // Handle mention detection and filtering
  useEffect(() => {
    if (mentionQuery.length > 0) {
      const filtered = MOCK_USERS.filter(user => 
        user.name.toLowerCase().includes(mentionQuery.toLowerCase()) ||
        user.handle.toLowerCase().includes(mentionQuery.toLowerCase())
      );
      setFilteredUsers(filtered);
      setSelectedMentionIndex(0);
    } else {
      setFilteredUsers(MOCK_USERS);
    }
  }, [mentionQuery]);

  const handleMentionInput = (value: string, textarea: HTMLTextAreaElement) => {
    const cursorPos = textarea.selectionStart;
    const textBeforeCursor = value.substring(0, cursorPos);
    const mentionMatch = textBeforeCursor.match(/@(\w*)$/);
    
    if (mentionMatch) {
      setShowMentions(true);
      setMentionQuery(mentionMatch[1]);
      setMentionPosition(cursorPos - mentionMatch[1].length - 1);
    } else {
      setShowMentions(false);
      setMentionQuery('');
    }
  };

  const insertMention = (user: typeof MOCK_USERS[0], textarea: HTMLTextAreaElement, setValue: (value: string) => void) => {
    const cursorPos = textarea.selectionStart;
    const textBeforeCursor = textarea.value.substring(0, mentionPosition);
    const textAfterCursor = textarea.value.substring(cursorPos);
    const newValue = textBeforeCursor + user.handle + ' ' + textAfterCursor;
    
    setValue(newValue);
    setShowMentions(false);
    setMentionQuery('');
    
    // Focus back to textarea after a brief delay
    setTimeout(() => {
      const newCursorPos = textBeforeCursor.length + user.handle.length + 1;
      textarea.focus();
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent, textarea: HTMLTextAreaElement, setValue: (value: string) => void) => {
    if (showMentions) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedMentionIndex(prev => Math.min(prev + 1, filteredUsers.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedMentionIndex(prev => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredUsers[selectedMentionIndex]) {
          insertMention(filteredUsers[selectedMentionIndex], textarea, setValue);
        }
      } else if (e.key === 'Escape') {
        setShowMentions(false);
        setMentionQuery('');
      }
    }
  };

  const handleAdd = () => {
    if (!content.trim()) return;
    onAdd(content.trim());
    setContent('');
  };

  const handleReply = (parentId: string) => {
    if (!replyContent.trim()) return;
    onAdd(replyContent.trim(), parentId);
    setReplyContent('');
    setReplyingTo(null);
  };

  return (
    <div className="px-4 py-4">
      {/* Add Comment Input */}
      <div className="flex items-start gap-2 mb-4">
        <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex-shrink-0" />
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              handleMentionInput(e.target.value, e.target);
            }}
            onKeyDown={(e) => handleKeyDown(e, e.currentTarget, setContent)}
            onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleAdd())}
            placeholder="Add a comment... (use @ to mention someone)"
            className="w-full px-4 py-2 border border-gray-400 rounded-full text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none min-h-[40px] max-h-[120px]"
            rows={1}
          />
          
          {/* Mentions Dropdown */}
          {showMentions && filteredUsers.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto">
              {filteredUsers.map((user, index) => (
                <button
                  key={user.id}
                  onClick={() => insertMention(user, textareaRef.current!, setContent)}
                  className={`w-full text-left px-3 py-2 hover:bg-gray-100 flex items-center gap-2 ${
                    index === selectedMentionIndex ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex-shrink-0" />
                  <div>
                    <div className="font-medium text-sm">{user.name}</div>
                    <div className="text-xs text-gray-500">{user.handle}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-3">
        {topLevel.map((comment) => (
          <div key={comment.id}>
            {/* Top Level Comment */}
            <div className="flex items-start gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex-shrink-0" />
              <div className="flex-1">
                <div className="bg-gray-100 rounded-2xl px-4 py-2">
                  <h4 className="font-semibold text-sm text-gray-900 hover:text-blue-700 hover:underline cursor-pointer">
                    {comment.author.name}
                  </h4>
                  <p className="text-sm text-gray-900 leading-relaxed">{comment.content}</p>
                </div>
                
                {/* Comment Actions */}
                <div className="flex items-center gap-4 mt-1 ml-4 text-xs font-semibold text-gray-600">
                  <button className="hover:text-blue-700 hover:underline">Like</button>
                  <button 
                    onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                    className="hover:text-blue-700 hover:underline"
                  >
                    Reply
                  </button>
                  <span className="text-gray-500">{new Date(comment.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                </div>

                {/* Reply Input */}
                {replyingTo === comment.id && (
                  <div className="flex items-start gap-2 mt-3 ml-4">
                    <div className="w-7 h-7 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex-shrink-0" />
                    <div className="flex-1 relative">
                      <textarea
                        ref={replyTextareaRef}
                        value={replyContent}
                        onChange={(e) => {
                          setReplyContent(e.target.value);
                          handleMentionInput(e.target.value, e.target);
                        }}
                        onKeyDown={(e) => handleKeyDown(e, e.currentTarget, setReplyContent)}
                        onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleReply(comment.id))}
                        placeholder={`Reply to ${comment.author.name}... (use @ to mention someone)`}
                        className="w-full px-4 py-2 border border-gray-400 rounded-full text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none min-h-[40px] max-h-[120px]"
                        rows={1}
                        autoFocus
                      />
                      
                      {/* Mentions Dropdown for Reply */}
                      {showMentions && filteredUsers.length > 0 && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto">
                          {filteredUsers.map((user, index) => (
                            <button
                              key={user.id}
                              onClick={() => insertMention(user, replyTextareaRef.current!, setReplyContent)}
                              className={`w-full text-left px-3 py-2 hover:bg-gray-100 flex items-center gap-2 ${
                                index === selectedMentionIndex ? 'bg-blue-50' : ''
                              }`}
                            >
                              <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex-shrink-0" />
                              <div>
                                <div className="font-medium text-sm">{user.name}</div>
                                <div className="text-xs text-gray-500">{user.handle}</div>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                      
                      <button
                        onClick={() => handleReply(comment.id)}
                        disabled={!replyContent.trim()}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-600 disabled:text-gray-400"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                )}

                {/* Nested Replies */}
                {repliesOf(comment.id).length > 0 && (
                  <div className="mt-3 ml-4 space-y-3">
                    {repliesOf(comment.id).map((reply) => (
                      <div key={reply.id} className="flex items-start gap-2">
                        <div className="w-7 h-7 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex-shrink-0" />
                        <div className="flex-1">
                          <div className="bg-gray-100 rounded-2xl px-4 py-2">
                            <h4 className="font-semibold text-sm text-gray-900 hover:text-blue-700 hover:underline cursor-pointer">
                              {reply.author.name}
                            </h4>
                            <p className="text-sm text-gray-900 leading-relaxed">{reply.content}</p>
                          </div>
                          
                          <div className="flex items-center gap-4 mt-1 ml-4 text-xs font-semibold text-gray-600">
                            <button className="hover:text-blue-700 hover:underline">Like</button>
                            <button className="hover:text-blue-700 hover:underline">Reply</button>
                            <span className="text-gray-500">{new Date(reply.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
