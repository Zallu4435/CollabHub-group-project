"use client";

import { useMemo, useState } from "react";
import { useBlogsData } from "../../hook/useBlogsData";
import { useBlogUserState } from "../../hook/useBlogUserState";
import BlogCard from "../../components/BlogCard";

export default function ArchivesSection() {
  const { posts } = useBlogsData({ sortBy: "newest" });
  const user = useBlogUserState();
  
  // Search and filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBlogType, setSelectedBlogType] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "title">("newest");

  const archivedPosts = useMemo(() => {
    return posts.filter(p => user.archives.includes(p.id));
  }, [posts, user.archives]);

  // Filter and search archived posts
  const filteredArchivedPosts = useMemo(() => {
    let filtered = archivedPosts;

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query)
      );
    }

      // Blog type filter
    if (selectedBlogType) {
      filtered = filtered.filter(post => 
        post.blogType === selectedBlogType
      );
    }

    // Tag filter
    if (selectedTag) {
      filtered = filtered.filter(post => 
        post.tagIds.includes(selectedTag)
      );
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
        default:
          return 0;
      }
    });

    return filtered;
  }, [archivedPosts, searchQuery, selectedBlogType, selectedTag, sortBy]);

  // Group filtered archived posts by month/year
  const groupedArchives = useMemo(() => {
    const groups: { [key: string]: any[] } = {};
    
    filteredArchivedPosts.forEach(post => {
      const date = new Date(post.publishedAt);
      const monthYear = date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long' 
      });
      
      if (!groups[monthYear]) {
        groups[monthYear] = [];
      }
      groups[monthYear].push(post);
    });

    // Sort groups by date (newest first)
    return Object.entries(groups)
      .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
      .map(([monthYear, posts]) => ({
        monthYear,
        posts: posts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      }));
  }, [filteredArchivedPosts]);

  // Get unique blog types from archived posts
  const availableBlogTypes = useMemo(() => {
    const blogTypes = new Set<string>();
    archivedPosts.forEach(post => {
      blogTypes.add(post.blogType);
    });
    return Array.from(blogTypes);
  }, [archivedPosts]);

  const availableTags = useMemo(() => {
    const tagIds = new Set<string>();
    archivedPosts.forEach(post => {
      post.tagIds.forEach(id => tagIds.add(id));
    });
    return Array.from(tagIds);
  }, [archivedPosts]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Archives</h2>
        <p className="text-sm text-gray-500">Browse and search your archived posts</p>
      </div>

      {archivedPosts.length > 0 ? (
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
                  onChange={(e) => setSortBy(e.target.value as "newest" | "oldest" | "title")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black bg-white"
                >
                  <option value="newest" className="text-black">Newest First</option>
                  <option value="oldest" className="text-black">Oldest First</option>
                  <option value="title" className="text-black">Title A-Z</option>
                </select>
              </div>
            </div>

            {/* Blog Type and Tag Filters */}
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Blog Type Filter */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Blog Type</label>
                <select
                  value={selectedBlogType}
                  onChange={(e) => setSelectedBlogType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black bg-white"
                >
                  <option value="" className="text-black">All Types</option>
                  {availableBlogTypes.map(blogType => (
                    <option key={blogType} value={blogType} className="text-black">
                      {blogType === 'solo' ? 'Solo Blogs' : 'Team Blogs'}
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
            </div>

            {/* Active Filters Display */}
            {(searchQuery || selectedBlogType || selectedTag) && (
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
                {selectedBlogType && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Type: {selectedBlogType === 'solo' ? 'Solo Blogs' : 'Team Blogs'}
                    <button
                      onClick={() => setSelectedBlogType("")}
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
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedBlogType("");
                    setSelectedTag("");
                  }}
                  className="text-sm text-gray-500 hover:text-gray-700 underline"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Results Summary */}
            <div className="text-sm text-gray-600">
              Showing {filteredArchivedPosts.length} of {archivedPosts.length} archived posts
            </div>
          </div>

          {/* Archived Posts */}
          {filteredArchivedPosts.length > 0 ? (
            <div className="space-y-8">
              {groupedArchives.map(({ monthYear, posts }) => (
                <div key={monthYear} className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-lg font-semibold text-gray-900">{monthYear}</h3>
                    <div className="flex-1 h-px bg-gray-200"></div>
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {posts.length} post{posts.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    {posts.map((post) => (
                      <div key={post.id} className="relative">
                        <BlogCard post={post} />
                        <div className="absolute top-4 right-4">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8l6 6 6-6" />
                            </svg>
                            Archived
                          </span>
                        </div>
                      </div>
                    ))}
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
                    setSelectedBlogType("");
                    setSelectedTag("");
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
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No archived posts yet</h3>
            <p className="text-gray-500">Archive posts to organize and save them for later reference</p>
          </div>
        </div>
      )}
    </div>
  );
}
