'use client';

import { useEffect, useRef, useState } from 'react';
import Avatar from '../common/Avatar';

interface CreatePostFormProps {
  userAvatar: string;
  userName: string;
  groupId?: string;
  onSubmit: (data: PostFormData) => void;
}

interface PostFormData {
  content: string;
  mediaFiles: File[];
  visibility: 'public' | 'connections' | 'private';
  hashtags: string[];
  mentions: string[];
}

export default function CreatePostForm({ userAvatar, userName, groupId, onSubmit }: CreatePostFormProps) {
  const [content, setContent] = useState('');
  const [visibility, setVisibility] = useState<'public' | 'connections' | 'private'>('public');
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [mediaPreviews, setMediaPreviews] = useState<Array<{ id: string; type: 'image' | 'video'; url: string; file: File }>>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const videoInputRef = useRef<HTMLInputElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const dropZoneRef = useRef<HTMLDivElement | null>(null);

  const MAX_MEDIA_FILES = 10;
  const MAX_CHARS = 5000;

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
    setCharCount(content.length);
  }, [content]);

  const extractHashtagsAndMentions = (text: string) => {
    const hashtags = text.match(/#[a-zA-Z0-9_]+/g) || [];
    const mentions = text.match(/@[a-zA-Z0-9_]+/g) || [];
    return {
      hashtags: hashtags.map(tag => tag.slice(1)),
      mentions: mentions.map(mention => mention.slice(1))
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() && mediaFiles.length === 0) return;

    const { hashtags, mentions } = extractHashtagsAndMentions(content);

    onSubmit({
      content,
      mediaFiles,
      visibility,
      hashtags,
      mentions
    });

    setContent('');
    clearMedia();
  };

  const clearMedia = () => {
    setMediaFiles([]);
    setMediaPreviews((prev) => {
      prev.forEach(p => URL.revokeObjectURL(p.url));
      return [];
    });
  };

  const addFiles = (files: FileList | File[]) => {
    const arr = Array.from(files);
    if (arr.length === 0) return;

    const remaining = Math.max(0, MAX_MEDIA_FILES - mediaFiles.length);
    const toAdd = arr.slice(0, remaining);
    if (toAdd.length === 0) return;

    const nextFiles = [...mediaFiles, ...toAdd];
    const nextPreviews = [
      ...mediaPreviews,
      ...toAdd.map((file) => {
        const mime = file.type || '';
        const isImage = mime.startsWith('image/');
        const isVideo = mime.startsWith('video/');
        const url = URL.createObjectURL(file);
        return { 
          id: `${Date.now()}_${Math.random().toString(36).slice(2)}`, 
          type: isImage ? 'image' : isVideo ? 'video' : 'image', 
          url, 
          file 
        };
      })
    ];

    setMediaFiles(nextFiles);
    setMediaPreviews(nextPreviews);
  };

  const onSelectImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) addFiles(e.target.files);
    if (imageInputRef.current) imageInputRef.current.value = '';
  };

  const onSelectVideos = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) addFiles(e.target.files);
    if (videoInputRef.current) videoInputRef.current.value = '';
  };

  const removeMedia = (id: string) => {
    const preview = mediaPreviews.find(p => p.id === id);
    if (preview) URL.revokeObjectURL(preview.url);
    setMediaPreviews(prev => prev.filter(p => p.id !== id));
    setMediaFiles(prev => {
      const idx = mediaPreviews.findIndex(p => p.id === id);
      return prev.filter((_, i) => i !== idx);
    });
  };

  useEffect(() => {
    return () => {
      mediaPreviews.forEach(p => URL.revokeObjectURL(p.url));
    };
  }, []);

  // Drag & drop support
  useEffect(() => {
    const el = dropZoneRef.current;
    if (!el) return;
    
    const prevent = (e: DragEvent) => { 
      e.preventDefault(); 
      e.stopPropagation(); 
    };
    
    const onDragEnter = (e: DragEvent) => {
      prevent(e);
      setIsDragging(true);
    };
    
    const onDragLeave = (e: DragEvent) => {
      prevent(e);
      if (e.target === el) setIsDragging(false);
    };
    
    const onDrop = (e: DragEvent) => {
      prevent(e);
      setIsDragging(false);
      if (e.dataTransfer?.files) addFiles(e.dataTransfer.files);
    };
    
    el.addEventListener('dragover', prevent);
    el.addEventListener('dragenter', onDragEnter);
    el.addEventListener('dragleave', onDragLeave);
    el.addEventListener('drop', onDrop);
    
    return () => {
      el.removeEventListener('dragover', prevent);
      el.removeEventListener('dragenter', onDragEnter);
      el.removeEventListener('dragleave', onDragLeave);
      el.removeEventListener('drop', onDrop);
    };
  }, []);

  const insertEmoji = (emoji: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newContent = content.slice(0, start) + emoji + content.slice(end);
    
    setContent(newContent);
    setTimeout(() => {
      textarea.selectionStart = textarea.selectionEnd = start + emoji.length;
      textarea.focus();
    }, 0);
  };

  const quickEmojis = ['😊', '😂', '❤️', '🎉', '👍', '🔥', '💯', '🚀'];

  const visibilityOptions = [
    {
      value: 'public',
      label: 'Public',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      description: 'Anyone can see this'
    },
    {
      value: 'connections',
      label: 'Connections',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      description: 'Only your connections'
    },
    {
      value: 'private',
      label: 'Only Me',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      description: 'Only you can see this'
    }
  ];

  const selectedVisibilityOption = visibilityOptions.find(opt => opt.value === visibility) || visibilityOptions[0];

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
      <form onSubmit={handleSubmit}>
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar src={userAvatar} alt={userName} size="lg" />
              <div>
                <h3 className="font-semibold text-gray-900">{userName}</h3>
                <div className="flex items-center gap-2 mt-0.5">
                  <button
                    type="button"
                    className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {selectedVisibilityOption.icon}
                    <span className="font-medium">{selectedVisibilityOption.label}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Character Count */}
            <div className="flex items-center gap-2">
              <span className={`text-sm font-medium ${charCount > MAX_CHARS * 0.9 ? 'text-red-600' : 'text-gray-500'}`}>
                {charCount}/{MAX_CHARS}
              </span>
              {charCount > MAX_CHARS * 0.9 && (
                <div className="relative">
                  <svg className="w-8 h-8 transform -rotate-90">
                    <circle
                      cx="16"
                      cy="16"
                      r="14"
                      stroke="currentColor"
                      strokeWidth="3"
                      fill="none"
                      className="text-gray-200"
                    />
                    <circle
                      cx="16"
                      cy="16"
                      r="14"
                      stroke="currentColor"
                      strokeWidth="3"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 14}`}
                      strokeDashoffset={`${2 * Math.PI * 14 * (1 - charCount / MAX_CHARS)}`}
                      className={charCount > MAX_CHARS ? 'text-red-600' : 'text-yellow-500'}
                    />
                  </svg>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="px-6 py-4">
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => {
              if (e.target.value.length <= MAX_CHARS) {
                setContent(e.target.value);
              }
            }}
            placeholder={groupId ? "Share something with the group..." : "What's on your mind?"}
            className="w-full px-0 py-2 border-0 focus:ring-0 outline-none resize-none text-[17px] leading-relaxed placeholder:text-gray-400 min-h-[120px] max-h-[400px]"
            style={{ overflow: 'hidden' }}
          />

          {/* Quick Emojis */}
          <div className="flex items-center gap-2 mt-3 mb-4">
            {quickEmojis.map((emoji, index) => (
              <button
                key={index}
                type="button"
                onClick={() => insertEmoji(emoji)}
                className="text-2xl hover:scale-125 transition-transform"
              >
                {emoji}
              </button>
            ))}
          </div>

          {/* Media Preview */}
          {mediaPreviews.length > 0 && (
            <div className="mb-4">
              <div className={`grid gap-2 ${
                mediaPreviews.length === 1 ? 'grid-cols-1' :
                mediaPreviews.length === 2 ? 'grid-cols-2' :
                mediaPreviews.length === 3 ? 'grid-cols-3' :
                'grid-cols-2'
              }`}>
                {mediaPreviews.map((m, index) => (
                  <div 
                    key={m.id} 
                    className={`relative group rounded-2xl overflow-hidden border-2 border-gray-200 bg-gray-100 ${
                      mediaPreviews.length === 3 && index === 0 ? 'col-span-2 row-span-2' : ''
                    }`}
                  >
                    {m.type === 'image' ? (
                      <img 
                        src={m.url} 
                        alt="preview" 
                        className="w-full h-full object-cover aspect-square" 
                      />
                    ) : (
                      <video 
                        controls 
                        src={m.url} 
                        className="w-full h-full object-cover aspect-square" 
                      />
                    )}
                    <button
                      type="button"
                      onClick={() => removeMedia(m.id)}
                      className="absolute top-2 right-2 w-8 h-8 bg-black/70 hover:bg-black text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                      aria-label="Remove media"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
              {mediaPreviews.length >= MAX_MEDIA_FILES && (
                <p className="text-xs text-red-600 mt-2">Maximum {MAX_MEDIA_FILES} files reached</p>
              )}
            </div>
          )}

          {/* Drag & Drop Zone */}
          <div
            ref={dropZoneRef}
            className={`border-2 border-dashed rounded-xl p-6 text-center transition-all ${
              isDragging 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100'
            }`}
          >
            <svg className={`w-12 h-12 mx-auto mb-3 ${isDragging ? 'text-blue-600' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="text-sm text-gray-700 font-medium mb-1">
              {isDragging ? 'Drop your files here' : 'Drag & drop photos or videos'}
            </p>
            <p className="text-xs text-gray-500">or click below to browse</p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => imageInputRef.current?.click()}
                disabled={mediaPreviews.length >= MAX_MEDIA_FILES}
                className="p-2.5 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title="Add photos"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </button>

              <button
                type="button"
                onClick={() => videoInputRef.current?.click()}
                disabled={mediaPreviews.length >= MAX_MEDIA_FILES}
                className="p-2.5 text-green-600 hover:bg-green-50 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title="Add videos"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>

              <button
                type="button"
                className="p-2.5 text-purple-600 hover:bg-purple-50 rounded-xl transition-colors"
                title="Add poll"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </button>

              <button
                type="button"
                className="p-2.5 text-orange-600 hover:bg-orange-50 rounded-xl transition-colors"
                title="Add location"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>

              {mediaPreviews.length > 0 && (
                <button
                  type="button"
                  onClick={clearMedia}
                  className="ml-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-xl font-medium transition-colors"
                >
                  Clear all
                </button>
              )}
            </div>

            <button
              type="submit"
              disabled={!content.trim() && mediaFiles.length === 0}
              className="px-8 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-md hover:shadow-lg transition-all flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              Post
            </button>
          </div>

          <input
            ref={imageInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={onSelectImages}
            className="hidden"
          />
          <input
            ref={videoInputRef}
            type="file"
            accept="video/*"
            multiple
            onChange={onSelectVideos}
            className="hidden"
          />
        </div>
      </form>
    </div>
  );
}
