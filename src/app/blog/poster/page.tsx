"use client";

import React, { useState, useRef } from 'react';
import Link from 'next/link';

const CreatePostPage: React.FC = () => {
  const [postData, setPostData] = useState({
    title: '',
    content: '',
    excerpt: '',
    tags: '',
    category: 'technology',
    featuredImage: null as File | null,
    publishStatus: 'draft' as 'draft' | 'published'
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPostData(prev => ({
      ...prev,
      [name]: value
    }));

    // Update word count for content
    if (name === 'content') {
      const words = value.trim().split(/\s+/).filter(word => word.length > 0);
      setWordCount(words.length);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPostData(prev => ({
        ...prev,
        featuredImage: file
      }));

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setPostData(prev => ({
      ...prev,
      featuredImage: null
    }));
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handlePublish = async (status: 'draft' | 'published') => {
    setIsPublishing(true);
    
    // Simulate API call
    setTimeout(() => {
      setPostData(prev => ({
        ...prev,
        publishStatus: status
      }));
      setIsPublishing(false);
      
      if (status === 'published') {
        // Redirect to published post
        console.log('Post published successfully!');
      } else {
        console.log('Post saved as draft!');
      }
    }, 2000);
  };

  const categories = [
    { value: 'technology', label: 'Technology' },
    { value: 'design', label: 'Design' },
    { value: 'programming', label: 'Programming' },
    { value: 'ai', label: 'AI & Machine Learning' },
    { value: 'startup', label: 'Startup' },
    { value: 'productivity', label: 'Productivity' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur-sm z-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">B</span>
              </div>
              <span className="text-xl font-serif font-bold text-gray-900">BlogSpace</span>
            </Link>

            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">
                {wordCount} words
              </div>
              <button
                onClick={() => handlePublish('draft')}
                disabled={isPublishing}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Save Draft
              </button>
              <button
                onClick={() => handlePublish('published')}
                disabled={isPublishing || !postData.title.trim() || !postData.content.trim()}
                className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPublishing ? 'Publishing...' : 'Publish'}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Featured Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Featured Image
            </label>
            {imagePreview ? (
              <div className="relative">
                <div className="aspect-[16/9] bg-gray-100 rounded-2xl overflow-hidden">
                  <img
                    src={imagePreview}
                    alt="Featured image preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  onClick={removeImage}
                  className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="aspect-[16/9] border-2 border-dashed border-gray-300 rounded-2xl flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
              >
                <div className="text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-gray-600 font-medium mb-1">Upload featured image</p>
                  <p className="text-gray-500 text-sm">PNG, JPG up to 10MB</p>
                </div>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          {/* Title Input */}
          <div>
            <textarea
              name="title"
              value={postData.title}
              onChange={handleInputChange}
              placeholder="Write your title here..."
              className="w-full text-4xl md:text-5xl font-serif font-bold text-gray-900 placeholder-gray-400 border-none resize-none focus:outline-none leading-tight"
              rows={2}
              maxLength={200}
            />
            <div className="text-right text-sm text-gray-400 mt-1">
              {postData.title.length}/200
            </div>
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Excerpt (Optional)
            </label>
            <textarea
              name="excerpt"
              value={postData.excerpt}
              onChange={handleInputChange}
              placeholder="Write a brief description of your post..."
              className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent resize-none"
              rows={3}
              maxLength={300}
            />
            <div className="text-right text-sm text-gray-400 mt-1">
              {postData.excerpt.length}/300
            </div>
          </div>

          {/* Content Editor */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content
            </label>
            <div className="border border-gray-200 rounded-xl focus-within:ring-2 focus-within:ring-black focus-within:border-transparent">
              <textarea
                name="content"
                value={postData.content}
                onChange={handleInputChange}
                placeholder="Tell your story..."
                className="w-full p-6 text-lg leading-relaxed text-gray-800 placeholder-gray-400 border-none resize-none focus:outline-none"
                rows={20}
              />
              
              {/* Editor Toolbar */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-b-xl border-t border-gray-200">
                <div className="flex items-center space-x-3">
                  <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm0 5a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-1 0v1A.5.5 0 0 0 8 6z" />
                    </svg>
                  </button>
                  <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </button>
                  <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  </button>
                </div>
                <div className="text-sm text-gray-500">
                  {wordCount} words • {Math.ceil(wordCount / 200)} min read
                </div>
              </div>
            </div>
          </div>

          {/* Meta Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                name="category"
                value={postData.category}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent"
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <input
                type="text"
                name="tags"
                value={postData.tags}
                onChange={handleInputChange}
                placeholder="React, JavaScript, Web Development"
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent"
              />
              <p className="text-sm text-gray-500 mt-1">Separate tags with commas</p>
            </div>
          </div>

          {/* Publishing Options */}
          <div className="bg-gray-50 p-6 rounded-2xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Publishing Options</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Visibility</h4>
                  <p className="text-sm text-gray-600">Who can see this post?</p>
                </div>
                <select className="border border-gray-200 rounded-lg px-3 py-1 text-sm">
                  <option value="public">Public</option>
                  <option value="unlisted">Unlisted</option>
                  <option value="private">Private</option>
                </select>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Comments</h4>
                  <p className="text-sm text-gray-600">Allow readers to comment</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-8 border-t border-gray-100">
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              ← Back to home
            </Link>
            
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-gray-900 transition-colors">
                Preview
              </button>
              <button
                onClick={() => handlePublish('draft')}
                disabled={isPublishing}
                className="px-6 py-2 text-gray-700 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Save Draft
              </button>
              <button
                onClick={() => handlePublish('published')}
                disabled={isPublishing || !postData.title.trim() || !postData.content.trim()}
                className="px-8 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {isPublishing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Publishing...
                  </>
                ) : (
                  'Publish Post'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePostPage;
