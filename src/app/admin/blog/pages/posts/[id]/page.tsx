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
  FiGlobe,
  FiTrash2,
  FiActivity
} from 'react-icons/fi';
import { useState } from 'react';

export default function EditPostPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const post = mockDb.getPost(params.id);
  const [activeTab, setActiveTab] = useState<'content' | 'seo' | 'settings'>('content');

  const { register, handleSubmit, watch, formState: { errors } } = useForm<PostFormData>({
    resolver: zodResolver(postSchema) as any,
    defaultValues: post ? {
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      categoryId: post.categoryId,
      tagIds: post.tagIds,
      featured: post.featured,
      state: post.state,
      scheduledAt: post.scheduledAt,
      metaTitle: post.metaTitle,
      metaDescription: post.metaDescription,
    } : undefined
  });

  if (!post) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiAlertCircle size={24} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Post not found</h3>
          <p className="text-sm text-gray-500 mb-4">The post you're looking for doesn't exist</p>
          <button
            onClick={() => router.push('/admin/blog/pages/posts')}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm font-medium transition-all"
          >
            Back to Posts
          </button>
        </div>
      </div>
    );
  }

  const onSubmit = (data: PostFormData) => {
    mockDb.updatePost(params.id, data);
    toast.success('Post updated successfully!');
    router.push('/admin/blog/pages/posts');
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      mockDb.deletePost(params.id);
      toast.success('Post deleted successfully');
      router.push('/admin/blog/pages/posts');
    }
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
          <h1 className="text-2xl font-bold text-gray-900">Edit Post</h1>
          <p className="text-sm text-gray-500 mt-1">
            Update your blog post
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleDelete}
            className="px-4 py-2 bg-red-50 border border-red-200 text-red-700 rounded-lg hover:bg-red-100 text-sm font-medium transition-all flex items-center gap-2"
          >
            <FiTrash2 size={16} />
            Delete
          </button>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium transition-all flex items-center gap-2"
          >
            <FiX size={16} />
            Cancel
          </button>
        </div>
      </div>

      {/* Post Info Banner */}
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-5">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold ${
                post.state === 'published' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' :
                post.state === 'draft' ? 'bg-amber-100 text-amber-700 border border-amber-200' :
                'bg-purple-100 text-purple-700 border border-purple-200'
              }`}>
                {post.state === 'published' && <FiCheckCircle size={10} />}
                {post.state === 'draft' && <FiFileText size={10} />}
                {post.state === 'scheduled' && <FiClock size={10} />}
                {post.state.charAt(0).toUpperCase() + post.state.slice(1)}
              </span>
              {post.featured && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-100 text-amber-700 border border-amber-200 rounded-md text-xs font-semibold">
                  <FiStar size={10} />
                  Featured
                </span>
              )}
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <FiEye size={14} />
                {post.views.toLocaleString()} views
              </span>
              <span className="flex items-center gap-1">
                <FiClock size={14} />
                Updated {new Date(post.updatedAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </span>
              <span className="flex items-center gap-1">
                <FiActivity size={14} />
                {post.revisions?.length || 0} revisions
              </span>
            </div>
          </div>
        </div>
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
                        placeholder="Write your content in markdown..."
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
                          {watchTitle || post.title}
                        </p>
                        <p className="text-sm text-emerald-600">
                          yoursite.com › blog › {watch('slug') || post.slug}
                        </p>
                        <p className="text-sm text-gray-600">
                          {watch('metaDescription') || watch('excerpt') || post.excerpt || 'Your post description will appear here...'}
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
                Update
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
                    Update Post
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
              <h3 className="text-base font-semibold text-gray-900 mb-4">Post Stats</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Views</span>
                  <span className="font-semibold text-gray-900">
                    {post.views.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Word Count</span>
                  <span className="font-semibold text-gray-900">
                    {watchContent ? watchContent.split(' ').length : post.content.split(' ').length}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Reading Time</span>
                  <span className="font-semibold text-gray-900">
                    {watchContent ? Math.ceil(watchContent.split(' ').length / 200) : Math.ceil(post.content.split(' ').length / 200)} min
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Revisions</span>
                  <span className="font-semibold text-gray-900">
                    {post.revisions?.length || 0}
                  </span>
                </div>
              </div>
            </div>

            {/* Revision History */}
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <FiActivity className="text-emerald-600" size={16} />
                Recent Activity
              </h3>
              <div className="space-y-2">
                <div className="text-sm">
                  <p className="text-gray-600">Created by <span className="font-medium text-gray-900">{post.authorName}</span></p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {new Date(post.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                <div className="text-sm pt-2 border-t border-gray-200">
                  <p className="text-gray-600">Last updated</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {new Date(post.updatedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-5">
              <h3 className="text-base font-semibold text-red-900 mb-3 flex items-center gap-2">
                <FiAlertCircle size={16} />
                Danger Zone
              </h3>
              <p className="text-sm text-red-700 mb-4">
                Deleting this post is permanent and cannot be undone.
              </p>
              <button
                type="button"
                onClick={handleDelete}
                className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-all flex items-center justify-center gap-2"
              >
                <FiTrash2 size={16} />
                Delete Post
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
