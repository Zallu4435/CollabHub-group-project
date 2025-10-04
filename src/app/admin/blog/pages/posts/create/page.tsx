'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { postSchema, type PostFormData } from '../../../lib/validation';
import { mockDb } from '../../../lib/mockDb';
import toast from 'react-hot-toast';
import { 
  FiSave,
  FiX,
  FiFileText,
  FiTag,
  FiFolder,
  FiStar,
  FiCalendar,
  FiEye,
  FiImage,
  FiAlertCircle,
  FiCheckCircle,
  FiClock,
  FiGlobe
} from 'react-icons/fi';
import { useState } from 'react';

export default function CreatePostPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'content' | 'seo' | 'settings'>('content');
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm<PostFormData>({
    resolver: zodResolver(postSchema) as any,
    defaultValues: {
      state: 'draft',
      featured: false,
      tagIds: [],
    }
  });

  const onSubmit = (data: PostFormData) => {
    const postData = {
      ...data,
      authorId: 'author-1',
      authorName: 'Current User',
      views: 0,
      revisions: [],
    };
    mockDb.createPost(postData);
    toast.success('Post created successfully!');
    router.push('/admin/blog/pages/posts');
  };

  const categories = mockDb.getCategories();
  const tags = mockDb.getTags();
  const watchTitle = watch('title');
  const watchContent = watch('content');
  const watchState = watch('state');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Create New Post</h1>
          <p className="text-sm text-gray-700 mt-1">
            Write and publish a new blog post
          </p>
        </div>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium transition-all flex items-center gap-2"
        >
          <FiX size={16} />
          Cancel
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tabs */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="border-b border-gray-200">
                <div className="flex">
                  {(['content', 'seo', 'settings'] as const).map(tab => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 px-6 py-4 font-medium text-sm transition-all relative flex items-center justify-center gap-2 ${
                        activeTab === tab
                          ? 'text-emerald-600 bg-emerald-50'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      {tab === 'content' && <FiFileText size={18} />}
                      {tab === 'seo' && <FiGlobe size={18} />}
                      {tab === 'settings' && <FiTag size={18} />}
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      {activeTab === tab && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6">
                {activeTab === 'content' && (
                  <div className="space-y-6">
                    {/* Title */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Title <span className="text-red-500">*</span>
                      </label>
                      <input
                        {...register('title')}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-100 outline-none text-sm transition-all ${
                          errors.title 
                            ? 'border-red-300 focus:border-red-400' 
                            : 'border-gray-200 focus:border-emerald-400'
                        }`}
                        placeholder="Enter an engaging post title..."
                      />
                      {errors.title && (
                        <div className="flex items-center gap-1 text-red-600 text-sm mt-1">
                          <FiAlertCircle size={14} />
                          {errors.title.message}
                        </div>
                      )}
                      {watchTitle && (
                        <p className="text-xs text-gray-500 mt-1">{watchTitle.length} characters</p>
                      )}
                    </div>

                    {/* Slug */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        URL Slug <span className="text-red-500">*</span>
                      </label>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">yoursite.com/blog/</span>
                        <input
                          {...register('slug')}
                          className={`flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-100 outline-none text-sm font-mono transition-all ${
                            errors.slug 
                              ? 'border-red-300 focus:border-red-400' 
                              : 'border-gray-200 focus:border-emerald-400'
                          }`}
                          placeholder="post-slug-here"
                        />
                      </div>
                      {errors.slug && (
                        <div className="flex items-center gap-1 text-red-600 text-sm mt-1">
                          <FiAlertCircle size={14} />
                          {errors.slug.message}
                        </div>
                      )}
                      <p className="text-xs text-gray-500 mt-1">Lowercase letters, numbers, and hyphens only</p>
                    </div>

                    {/* Excerpt */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Excerpt
                      </label>
                      <textarea
                        {...register('excerpt')}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400 outline-none text-sm resize-none"
                        placeholder="Write a brief description of your post..."
                      />
                      <p className="text-xs text-gray-500 mt-1">Optional summary that appears in post previews</p>
                    </div>

                    {/* Content */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Content <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        {...register('content')}
                        rows={16}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-100 outline-none text-sm font-mono resize-none transition-all ${
                          errors.content 
                            ? 'border-red-300 focus:border-red-400' 
                            : 'border-gray-200 focus:border-emerald-400'
                        }`}
                        placeholder="Write your content in markdown...

# Heading 1
## Heading 2

**Bold text** and *italic text*

- List item 1
- List item 2"
                      />
                      {errors.content && (
                        <div className="flex items-center gap-1 text-red-600 text-sm mt-1">
                          <FiAlertCircle size={14} />
                          {errors.content.message}
                        </div>
                      )}
                      {watchContent && (
                        <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
                          <span>Markdown supported</span>
                          <span>{watchContent.length} characters · {Math.ceil(watchContent.split(' ').length / 200)} min read</span>
                        </div>
                      )}
                    </div>

                    {/* Featured Image */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Featured Image
                      </label>
                      <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center hover:border-emerald-300 transition-colors cursor-pointer">
                        <div className="flex flex-col items-center">
                          <div className="p-3 bg-gray-100 rounded-lg mb-3">
                            <FiImage className="text-gray-400" size={24} />
                          </div>
                          <p className="text-sm text-gray-600 mb-1">Click to upload or drag and drop</p>
                          <p className="text-xs text-gray-500">PNG, JPG or WebP (max. 2MB)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'seo' && (
                  <div className="space-y-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                      <div className="flex items-start gap-3">
                        <FiGlobe className="text-blue-600 flex-shrink-0 mt-0.5" size={18} />
                        <div>
                          <p className="font-medium text-blue-900 text-sm mb-1">SEO Optimization</p>
                          <p className="text-sm text-blue-700">
                            Optimize your post for search engines and social media sharing
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Meta Title */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Meta Title
                      </label>
                      <input
                        {...register('metaTitle')}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400 outline-none text-sm"
                        placeholder="SEO-friendly title (leave blank to use post title)"
                      />
                      <p className="text-xs text-gray-500 mt-1">Recommended: 50-60 characters</p>
                    </div>

                    {/* Meta Description */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Meta Description
                      </label>
                      <textarea
                        {...register('metaDescription')}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400 outline-none text-sm resize-none"
                        placeholder="Brief description for search results..."
                      />
                      <p className="text-xs text-gray-500 mt-1">Recommended: 150-160 characters</p>
                    </div>

                    {/* Preview */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <p className="text-xs font-semibold text-gray-500 uppercase mb-3">Search Result Preview</p>
                      <div className="space-y-2">
                        <p className="text-blue-600 text-lg font-medium">
                          {watchTitle || 'Your Post Title'}
                        </p>
                        <p className="text-sm text-emerald-600">
                          yoursite.com › blog › {watch('slug') || 'post-slug'}
                        </p>
                        <p className="text-sm text-gray-600">
                          {watch('metaDescription') || watch('excerpt') || 'Your post description will appear here...'}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'settings' && (
                  <div className="space-y-6">
                    {/* Category */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                      </label>
                      <select
                        {...register('categoryId')}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400 outline-none text-sm"
                      >
                        <option value="">Select a category</option>
                        {categories.map(cat => (
                          <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                      </select>
                    </div>

                    {/* Tags */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Tags
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {tags.map(tag => (
                          <label 
                            key={tag.id} 
                            className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg cursor-pointer hover:bg-emerald-50 hover:border-emerald-200 transition-all"
                          >
                            <input 
                              type="checkbox" 
                              value={tag.id} 
                              {...register('tagIds')}
                              className="rounded border-gray-300"
                            />
                            <span className="text-sm text-gray-700">{tag.name}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Featured */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-amber-100 rounded-lg">
                          <FiStar className="text-amber-600" size={18} />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 text-sm">Featured Post</p>
                          <p className="text-xs text-gray-500 mt-0.5">Highlight this post on homepage</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          {...register('featured')}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-emerald-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all shadow-sm"></div>
                      </label>
                    </div>

                    {/* Scheduled Date */}
                    {watchState === 'scheduled' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Scheduled Date & Time
                        </label>
                        <input
                          type="datetime-local"
                          {...register('scheduledAt')}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400 outline-none text-sm"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Publish Box */}
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FiCheckCircle className="text-emerald-600" size={18} />
                Publish
              </h3>
              
              <div className="space-y-4">
                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    {...register('state')}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400 outline-none text-sm"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="scheduled">Scheduled</option>
                  </select>
                </div>

                {/* Save Buttons */}
                <div className="space-y-2 pt-2">
                  <button
                    type="submit"
                    className="w-full px-4 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium transition-all flex items-center justify-center gap-2"
                  >
                    <FiSave size={16} />
                    {watchState === 'published' ? 'Publish Post' : watchState === 'scheduled' ? 'Schedule Post' : 'Save Draft'}
                  </button>
                  <button
                    type="button"
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-all flex items-center justify-center gap-2"
                  >
                    <FiEye size={16} />
                    Preview
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="text-base font-semibold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Word Count</span>
                  <span className="font-semibold text-gray-900">
                    {watchContent ? watchContent.split(' ').length : 0}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Reading Time</span>
                  <span className="font-semibold text-gray-900">
                    {watchContent ? Math.ceil(watchContent.split(' ').length / 200) : 0} min
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Characters</span>
                  <span className="font-semibold text-gray-900">
                    {watchContent ? watchContent.length : 0}
                  </span>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-5">
              <h3 className="text-base font-semibold text-blue-900 mb-3 flex items-center gap-2">
                <FiAlertCircle size={16} />
                Writing Tips
              </h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>Use clear, descriptive titles</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>Break content into sections</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>Add relevant tags and categories</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>Optimize for SEO</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
