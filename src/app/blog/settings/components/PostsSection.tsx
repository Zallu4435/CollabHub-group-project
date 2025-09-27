"use client";

import { useMemo, useState } from "react";
import BlogCard from "../../components/BlogCard";
import PostEditModal from "../../components/PostEditModal";
import { BlogPost } from "../../types";
import { LocationData } from "../../components/LocationInput";

type PostUpdates = {
  location?: LocationData | undefined;
  isLocked?: boolean;
};

interface PostsSectionProps {
  posts: BlogPost[];
}

export default function PostsSection({ posts }: PostsSectionProps) {
  // Search and filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "title" | "most_liked" | "most_commented">("newest");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");
  const [showLocked, setShowLocked] = useState(true);
  
  // Modal states
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Filter and search posts
  const filteredPosts = useMemo(() => {
    let filtered = posts;

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter(post => 
        post.categoryIds.includes(selectedCategory)
      );
    }

    // Tag filter
    if (selectedTag) {
      filtered = filtered.filter(post => 
        post.tagIds.includes(selectedTag)
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(post => post.status === statusFilter);
    }

    // Locked posts filter (only in settings view)
    if (!showLocked) {
      filtered = filtered.filter(post => !post.isLocked);
    }

    // Sort posts
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
        case "oldest":
          return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
        case "title":
          return a.title.localeCompare(b.title);
        case "most_liked":
          return (b.likesCount || 0) - (a.likesCount || 0);
        case "most_commented":
          return (b.commentsCount || 0) - (a.commentsCount || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [posts, searchQuery, selectedCategory, selectedTag, sortBy, statusFilter]);

  // Get unique categories and tags from posts
  const availableCategories = useMemo(() => {
    const categoryIds = new Set<string>();
    posts.forEach(post => {
      post.categoryIds.forEach((id: string) => categoryIds.add(id));
    });
    return Array.from(categoryIds);
  }, [posts]);

  const availableTags = useMemo(() => {
    const tagIds = new Set<string>();
    posts.forEach(post => {
      post.tagIds.forEach((id: string) => tagIds.add(id));
    });
    return Array.from(tagIds);
  }, [posts]);

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setIsEditModalOpen(true);
  };

  const handleSavePost = (postId: string, updates: PostUpdates) => {
    // In a real app, this would make an API call to update the post
    console.log('Saving post updates:', { postId, updates });
    // For demo purposes, we'll just close the modal
    setIsEditModalOpen(false);
    setEditingPost(null);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setEditingPost(null);
  };

  const handleOpenEditor = (post: BlogPost) => {
    // Navigate to the editor with the post ID
    window.open(`/blog/poster?draftId=${post.id}&edit=true`, '_blank');
  };

  const handleRemovePost = (post: BlogPost) => {
    if (confirm(`Are you sure you want to remove "${post.title}"? This action cannot be undone.`)) {
      // In a real app, this would make an API call to delete the post
      console.log('Removing post:', post.id);
      alert('Post removed successfully! (Demo only)');
    }
  };

  const handleToggleLock = (post: BlogPost) => {
    const action = post.isLocked ? 'unlock' : 'lock';
    const message = post.isLocked 
      ? `Are you sure you want to unlock "${post.title}"? It will be visible to everyone.`
      : `Are you sure you want to lock "${post.title}"? It will be hidden from public view.`;
    
    if (confirm(message)) {
      // In a real app, this would make an API call to update the post
      console.log(`${action} post:`, post.id);
      alert(`Post ${action}ed successfully! (Demo only)`);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Your Posts</h2>
        <p className="text-sm text-gray-500">Manage and search through all your posts</p>
      </div>

      {posts.length > 0 ? (
        <>
          {/* Search and Filter Controls */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search Input */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Search Posts</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                    placeholder="Search by title, excerpt, or content..."
                  />
                </div>
              </div>

              {/* Sort Dropdown */}
              <div className="lg:w-48">
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as "newest" | "oldest" | "title" | "most_liked" | "most_commented")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black bg-white"
                >
                  <option value="newest" className="text-black">Newest First</option>
                  <option value="oldest" className="text-black">Oldest First</option>
                  <option value="title" className="text-black">Title A-Z</option>
                  <option value="most_liked" className="text-black">Most Liked</option>
                  <option value="most_commented" className="text-black">Most Commented</option>
                </select>
              </div>
            </div>

            {/* Category, Tag, and Status Filters */}
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Category Filter */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black bg-white"
                >
                  <option value="" className="text-black">All Categories</option>
                  {availableCategories.map(categoryId => (
                    <option key={categoryId} value={categoryId} className="text-black">
                      {categoryId.replace('c_', '').replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tag Filter */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Tag</label>
                <select
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black bg-white"
                >
                  <option value="" className="text-black">All Tags</option>
                  {availableTags.map(tagId => (
                    <option key={tagId} value={tagId} className="text-black">
                      {tagId.replace('t_', '').replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div className="lg:w-48">
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as "all" | "published" | "draft")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black bg-white"
                >
                  <option value="all" className="text-black">All Posts</option>
                  <option value="published" className="text-black">Published</option>
                  <option value="draft" className="text-black">Drafts</option>
                </select>
              </div>

              {/* Show Locked Posts Toggle */}
              <div className="lg:w-48">
                <label className="block text-sm font-medium text-gray-700 mb-2">Visibility</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="showLocked"
                    checked={showLocked}
                    onChange={(e) => setShowLocked(e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="showLocked" className="text-sm text-gray-700">
                    Show locked posts
                  </label>
                </div>
              </div>
            </div>

            {/* Active Filters Display */}
            {(searchQuery || selectedCategory || selectedTag || statusFilter !== "all" || !showLocked) && (
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-gray-200">
                <span className="text-sm text-gray-600">Active filters:</span>
                {searchQuery && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Search: "{searchQuery}"
                    <button
                      onClick={() => setSearchQuery("")}
                      className="ml-1 hover:text-blue-600"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                )}
                {selectedCategory && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Category: {selectedCategory.replace('c_', '').replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    <button
                      onClick={() => setSelectedCategory("")}
                      className="ml-1 hover:text-green-600"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                )}
                {selectedTag && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    Tag: {selectedTag.replace('t_', '').replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    <button
                      onClick={() => setSelectedTag("")}
                      className="ml-1 hover:text-purple-600"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                )}
                {statusFilter !== "all" && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                    Status: {statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
                    <button
                      onClick={() => setStatusFilter("all")}
                      className="ml-1 hover:text-orange-600"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                )}
                {!showLocked && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    Hiding locked posts
                    <button
                      onClick={() => setShowLocked(true)}
                      className="ml-1 hover:text-red-600"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                )}
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("");
                    setSelectedTag("");
                    setStatusFilter("all");
                    setShowLocked(true);
                  }}
                  className="text-sm text-gray-500 hover:text-gray-700 underline"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Results Summary */}
            <div className="text-sm text-gray-600">
              Showing {filteredPosts.length} of {posts.length} posts
            </div>
          </div>

          {/* Posts List */}
          {filteredPosts.length > 0 ? (
            <div className="space-y-6">
              {filteredPosts.map((post) => (
                <div key={post.id} className="relative">
                  <BlogCard post={post} />
                  
                  {/* Action buttons */}
                  <div className="absolute top-4 right-4 flex items-center space-x-2">
                    {/* Status badges */}
                    <div className="flex items-center space-x-2">
                      {post.status === "draft" && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Draft
                        </span>
                      )}
                      
                      {post.isLocked && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                          Locked
                        </span>
                      )}
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => handleOpenEditor(post)}
                        className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-green-50 text-green-600 hover:bg-green-100 transition-colors duration-150"
                        title="Open in Editor"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </button>
                      
                      <button
                        onClick={() => handleEditPost(post)}
                        className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors duration-150"
                        title="Edit Settings"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </button>
                      
                      <button
                        onClick={() => handleToggleLock(post)}
                        className={`inline-flex items-center justify-center w-7 h-7 rounded-md transition-colors duration-150 ${
                          post.isLocked 
                            ? 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100' 
                            : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                        }`}
                        title={post.isLocked ? "Unlock Post" : "Lock Post"}
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </button>
                      
                      <button
                        onClick={() => handleRemovePost(post)}
                        className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-red-50 text-red-600 hover:bg-red-100 transition-colors duration-150"
                        title="Remove Post"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("");
                    setSelectedTag("");
                    setStatusFilter("all");
                    setShowLocked(true);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
          <p className="text-gray-500 mb-4">Start writing your first blog post</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
            Write Your First Post
          </button>
        </div>
      )}

      {/* Edit Modal */}
      {editingPost && (
        <PostEditModal
          post={editingPost}
          isOpen={isEditModalOpen}
          onClose={handleCloseModal}
          onSave={handleSavePost}
        />
      )}
    </div>
  );
}
