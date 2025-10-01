"use client";

import React, { useState, useRef, useEffect } from 'react';

interface PostComposerProps {
  onSubmit: (payload: {
    content: string;
    mediaFiles: File[];
    visibility: 'public' | 'connections' | 'private';
    poll?: { question: string; options: string[]; endsAt?: string };
  }) => Promise<void> | void;
  onSaveDraft?: (payload: {
    content: string;
    mediaUrls: string[];
    visibility: 'public' | 'connections' | 'private';
    poll?: { question: string; options: string[]; endsAt?: string };
  }) => void;
  onSchedule?: (payload: {
    content: string;
    mediaUrls: string[];
    visibility: 'public' | 'connections' | 'private';
    poll?: { question: string; options: string[]; endsAt?: string };
    scheduledFor: string;
  }) => void;
  isSubmitting?: boolean;
}

export default function PostComposer({ onSubmit, onSaveDraft, onSchedule, isSubmitting }: PostComposerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [content, setContent] = useState('');
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [mediaPreviews, setMediaPreviews] = useState<string[]>([]);
  const [visibility, setVisibility] = useState<'public' | 'connections' | 'private'>('public');
  const [showPollBuilder, setShowPollBuilder] = useState(false);
  const [pollQuestion, setPollQuestion] = useState('');
  const [pollOptions, setPollOptions] = useState(['', '']);
  const [pollEndsAt, setPollEndsAt] = useState('');
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [scheduledFor, setScheduledFor] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (isModalOpen && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isModalOpen]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length) {
      setMediaFiles(prev => [...prev, ...files]);
      
      // Generate previews
      files.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setMediaPreviews(prev => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleRemoveMedia = (index: number) => {
    setMediaFiles(prev => prev.filter((_, i) => i !== index));
    setMediaPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!content.trim() && mediaFiles.length === 0 && !showPollBuilder) return;
    
    const pollData = showPollBuilder && pollQuestion.trim() && pollOptions.filter(o => o.trim()).length >= 2 
      ? { question: pollQuestion.trim(), options: pollOptions.filter(o => o.trim()), endsAt: pollEndsAt || undefined }
      : undefined;

    await onSubmit({ content: content.trim(), mediaFiles, visibility, poll: pollData });
    setContent('');
    setMediaFiles([]);
    setMediaPreviews([]);
    setShowPollBuilder(false);
    setPollQuestion('');
    setPollOptions(['', '']);
    setPollEndsAt('');
    setIsModalOpen(false);
  };

  const handleClose = () => {
    if (content.trim() || mediaFiles.length > 0 || showPollBuilder) {
      if (!confirm('Discard post?')) return;
    }
    setIsModalOpen(false);
    setContent('');
    setMediaFiles([]);
    setMediaPreviews([]);
    setShowPollBuilder(false);
    setPollQuestion('');
    setPollOptions(['', '']);
    setPollEndsAt('');
  };

  const addPollOption = () => {
    if (pollOptions.length < 4) {
      setPollOptions([...pollOptions, '']);
    }
  };

  const updatePollOption = (index: number, value: string) => {
    const newOptions = [...pollOptions];
    newOptions[index] = value;
    setPollOptions(newOptions);
  };

  const removePollOption = (index: number) => {
    if (pollOptions.length > 2) {
      setPollOptions(pollOptions.filter((_, i) => i !== index));
    }
  };

  const handleSaveDraft = () => {
    if (!content.trim() && mediaFiles.length === 0 && !showPollBuilder) return;
    
    const pollData = showPollBuilder && pollQuestion.trim() && pollOptions.filter(o => o.trim()).length >= 2 
      ? { question: pollQuestion.trim(), options: pollOptions.filter(o => o.trim()), endsAt: pollEndsAt || undefined }
      : undefined;

    onSaveDraft?.({
      content: content.trim(),
      mediaUrls: mediaPreviews, // In real app, would upload files and get URLs
      visibility,
      poll: pollData,
    });
    
    setContent('');
    setMediaFiles([]);
    setMediaPreviews([]);
    setShowPollBuilder(false);
    setPollQuestion('');
    setPollOptions(['', '']);
    setPollEndsAt('');
    setIsModalOpen(false);
  };

  const handleSchedule = () => {
    if (!content.trim() && mediaFiles.length === 0 && !showPollBuilder) return;
    if (!scheduledFor) return;
    
    const pollData = showPollBuilder && pollQuestion.trim() && pollOptions.filter(o => o.trim()).length >= 2 
      ? { question: pollQuestion.trim(), options: pollOptions.filter(o => o.trim()), endsAt: pollEndsAt || undefined }
      : undefined;

    onSchedule?.({
      content: content.trim(),
      mediaUrls: mediaPreviews,
      visibility,
      poll: pollData,
      scheduledFor,
    });
    
    setContent('');
    setMediaFiles([]);
    setMediaPreviews([]);
    setShowPollBuilder(false);
    setPollQuestion('');
    setPollOptions(['', '']);
    setPollEndsAt('');
    setScheduledFor('');
    setShowScheduleModal(false);
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Compact Creator */}
      <div className="bg-white rounded-lg border border-gray-300 shadow-sm mb-4 p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex-shrink-0" />
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex-1 text-left px-4 py-3 border border-gray-400 rounded-full text-sm text-gray-600 hover:bg-gray-100 transition-all"
          >
            Start a post
          </button>
        </div>
        <div className="flex items-center justify-around">
          {[
            { icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>, label: 'Photo', color: 'text-blue-600' },
            { icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/></svg>, label: 'Video', color: 'text-green-600' },
            { icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>, label: 'Event', color: 'text-orange-600' },
            { icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>, label: 'Write article', color: 'text-red-600' },
          ].map((item, idx) => (
            <button 
              key={idx} 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg transition-all"
            >
              {item.icon}
              <span className={`text-xs font-semibold ${item.color} hidden sm:inline`}>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-300">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full" />
                <div>
                  <h3 className="font-semibold text-gray-900">John Doe</h3>
                  <select
                    value={visibility}
                    onChange={(e) => setVisibility(e.target.value as any)}
                    className="text-xs text-gray-600 border-0 p-0 focus:ring-0 cursor-pointer bg-transparent"
                  >
                    <option value="public">🌍 Anyone</option>
                    <option value="connections">👥 Connections only</option>
                    <option value="private">🔒 Only me</option>
                  </select>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="text-gray-500 hover:bg-gray-100 p-2 rounded-full transition-all"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              </button>
            </div>

            {/* Modal Content - Scrollable */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <textarea
                ref={textareaRef}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What do you want to talk about?"
                className="w-full min-h-[200px] p-0 border-0 resize-none focus:ring-0 focus:outline-none text-base text-gray-900 placeholder-gray-400"
                style={{ lineHeight: '1.5' }}
              />

              {/* Live Link Previews */}
              {(() => {
                const extractUrls = (text: string) => {
                  const urlRegex = /(https?:\/\/[^\s]+)/g;
                  return text.match(urlRegex) || [];
                };
                const getYouTubeThumb = (url: string) => {
                  try {
                    const u = new URL(url);
                    if (u.hostname.includes('youtube.com') || u.hostname.includes('youtu.be')) {
                      let id = '';
                      if (u.hostname.includes('youtu.be')) id = u.pathname.slice(1);
                      else id = u.searchParams.get('v') || '';
                      if (id) return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
                    }
                  } catch {}
                  return undefined;
                };
                const urls = extractUrls(content);
                if (urls.length === 0) return null;
                return (
                  <div className="mt-3 space-y-3">
                    {urls.slice(0, 2).map((url, index) => {
                      const hostname = (() => { try { return new URL(url).hostname; } catch { return url; } })();
                      const thumb = getYouTubeThumb(url);
                      return (
                        <div key={index} className="relative border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                          <div className="flex">
                            <div className="flex-1 p-4">
                              <div className="flex items-start gap-3">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M10.59 13.41c.41.39.41 1.03 0 1.42-.39.39-1.03.39-1.42 0a5.003 5.003 0 0 1 0-7.07l3.54-3.54a5.003 5.003 0 0 1 7.07 0 5.003 5.003 0 0 1 0 7.07l-1.49 1.49c.01-.82-.12-1.64-.4-2.42l.47-.48a2.982 2.982 0 0 0 0-4.24 2.982 2.982 0 0 0-4.24 0l-3.53 3.53a2.982 2.982 0 0 0 0 4.24zm2.82-4.24c.39-.39 1.03-.39 1.42 0a5.003 5.003 0 0 1 0 7.07l-3.54 3.54a5.003 5.003 0 0 1-7.07 0 5.003 5.003 0 0 1 0-7.07l1.49-1.49c-.01.82.12 1.64.4 2.42l-.47.48a2.982 2.982 0 0 0 0 4.24 2.982 2.982 0 0 0 4.24 0l3.53-3.53a2.982 2.982 0 0 0 0-4.24z"/>
                                  </svg>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-1">{hostname}</h4>
                                  <p className="text-xs text-gray-600 line-clamp-2 mb-2">{url}</p>
                                  <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <span className="flex items-center gap-1">
                                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                      </svg>
                                      Link
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="w-32 h-24 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center flex-shrink-0">
                              {thumb ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={thumb} alt="preview" className="w-full h-full object-cover" />
                              ) : (
                                <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                                </svg>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })()}

              {/* Media Previews */}
              {mediaPreviews.length > 0 && (
                <div className="mt-4">
                  <div className={`grid gap-2 ${
                    mediaPreviews.length === 1 ? 'grid-cols-1' :
                    mediaPreviews.length === 2 ? 'grid-cols-2' :
                    'grid-cols-2'
                  }`}>
                    {mediaPreviews.map((preview, idx) => (
                      <div key={idx} className="relative group">
                        <img 
                          src={preview} 
                          alt={`Upload ${idx + 1}`} 
                          className="w-full h-48 object-cover rounded-lg border border-gray-300"
                        />
                        <button
                          onClick={() => handleRemoveMedia(idx)}
                          className="absolute top-2 right-2 w-8 h-8 bg-gray-900 bg-opacity-80 hover:bg-opacity-100 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Poll Builder */}
              {showPollBuilder && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-gray-900 mb-3">Create a Poll</h4>
                  
                  {/* Poll Question */}
                  <div className="mb-4">
                    <input
                      type="text"
                      value={pollQuestion}
                      onChange={(e) => setPollQuestion(e.target.value)}
                      placeholder="Ask a question..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Poll Options */}
                  <div className="space-y-2 mb-4">
                    {pollOptions.map((option, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => updatePollOption(index, e.target.value)}
                          placeholder={`Option ${index + 1}`}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {pollOptions.length > 2 && (
                          <button
                            onClick={() => removePollOption(index)}
                            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                            title="Remove option"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                            </svg>
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Add Option Button */}
                  {pollOptions.length < 4 && (
                    <button
                      onClick={addPollOption}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium mb-4"
                    >
                      + Add option
                    </button>
                  )}

                  {/* Poll Duration */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Poll duration (optional)
                    </label>
                    <select
                      value={pollEndsAt}
                      onChange={(e) => setPollEndsAt(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">No time limit</option>
                      <option value="1h">1 hour</option>
                      <option value="1d">1 day</option>
                      <option value="3d">3 days</option>
                      <option value="7d">1 week</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Formatting Toolbar */}
              <div className="mt-4 flex items-center gap-2 text-gray-600">
                <button className="p-2 hover:bg-gray-100 rounded transition-all" title="Bold">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z"/>
                  </svg>
                </button>
                <button className="p-2 hover:bg-gray-100 rounded transition-all" title="Italic">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4z"/>
                  </svg>
                </button>
                <button className="p-2 hover:bg-gray-100 rounded transition-all" title="Add emoji">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-gray-300">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1">
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*,video/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="p-2 hover:bg-gray-100 rounded transition-all"
                    title="Add photos/videos"
                  >
                    <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                    </svg>
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded transition-all" title="Add a video">
                    <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
                    </svg>
                  </button>
                  <button 
                    onClick={() => setShowPollBuilder(!showPollBuilder)}
                    className={`p-2 rounded transition-all ${showPollBuilder ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
                    title="Create a poll"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                    </svg>
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded transition-all" title="Add a document">
                    <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
                    </svg>
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded transition-all" title="Celebrate an occasion">
                    <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M7 8h10M7 12h10M7 16h10M5 4h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z"/>
                    </svg>
                  </button>
                  <div className="w-px h-6 bg-gray-300 mx-1"></div>
                  <button className="p-2 hover:bg-gray-100 rounded transition-all" title="More">
                    <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                    </svg>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSaveDraft}
                    disabled={(!content.trim() && mediaFiles.length === 0 && !showPollBuilder) || isSubmitting}
                    className="px-4 py-2 rounded-full font-semibold text-sm transition-all bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Save as draft
                  </button>
                  
                  <button
                    onClick={() => setShowScheduleModal(true)}
                    disabled={(!content.trim() && mediaFiles.length === 0 && !showPollBuilder) || isSubmitting}
                    className="px-4 py-2 rounded-full font-semibold text-sm transition-all bg-purple-100 text-purple-700 hover:bg-purple-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Schedule
                  </button>
                  
                  <button
                    onClick={handleSubmit}
                    disabled={(!content.trim() && mediaFiles.length === 0 && !showPollBuilder) || isSubmitting}
                    className={`px-6 py-2 rounded-full font-semibold text-sm transition-all ${
                      content.trim() || mediaFiles.length > 0 || showPollBuilder
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {isSubmitting ? 'Posting...' : 'Post'}
                  </button>
                </div>
              </div>

              {/* Character count or other info */}
              {content.length > 0 && (
                <div className="text-xs text-gray-500 text-right">
                  {content.length} / 3,000
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Schedule Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            <div className="px-6 py-4 border-b border-gray-300">
              <h3 className="font-semibold text-gray-900">Schedule Post</h3>
            </div>
            
            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  When should this post be published?
                </label>
                <input
                  type="datetime-local"
                  value={scheduledFor}
                  onChange={(e) => setScheduledFor(e.target.value)}
                  min={new Date().toISOString().slice(0, 16)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="text-xs text-gray-500 mb-4">
                Posts can be scheduled up to 30 days in advance.
              </div>
            </div>
            
            <div className="px-6 py-4 border-t border-gray-300 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowScheduleModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSchedule}
                disabled={!scheduledFor}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg font-semibold text-sm hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Schedule Post
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
