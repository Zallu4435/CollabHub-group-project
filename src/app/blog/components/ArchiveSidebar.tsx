"use client";

import { useMemo } from "react";
import { useBlogsData } from "../hook/useBlogsData";

type Props = {
  query: string;
  onQueryChange: (value: string) => void;
  onTagChange: (slug?: string) => void;
  onReadingTimeChange: (range?: string) => void;
  onBlogTypeChange: (type?: string) => void;
  onStatusChange: (status?: string) => void;
  onSortChange: (sort?: "newest" | "oldest" | "most_liked" | "most_commented") => void;
  onLocationChange: (location?: string) => void;
  onClearAll: () => void;
  active: {
    tagSlug?: string;
    readingTime?: string;
    blogType?: string;
    status?: string;
    sortBy?: "newest" | "oldest" | "most_liked" | "most_commented";
    location?: string;
  };
};

export default function ArchiveSidebar({
  query,
  onQueryChange,
  onTagChange,
  onReadingTimeChange,
  onBlogTypeChange,
  onStatusChange,
  onSortChange,
  onLocationChange,
  onClearAll,
  active
}: Props) {
  const { data } = useBlogsData();
  const tags = data.tags;

  const sortOptions = useMemo(
    () => [
      { value: "newest", label: "Newest" },
      { value: "oldest", label: "Oldest" },
      { value: "most_liked", label: "Most liked" },
      { value: "most_commented", label: "Most commented" }
    ],
    []
  );

  return (
    <aside className="bg-white border border-gray-200 rounded-xl p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        <button 
          onClick={onClearAll} 
          className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          Clear all
        </button>
      </div>

      {/* Search */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Search</label>
        <input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Search posts..."
        />
      </div>

      {/* Location */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Location</label>
        <input
          value={active.location ?? ""}
          onChange={(e) => onLocationChange(e.target.value || undefined)}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Filter by location..."
        />
      </div>

      {/* Tags */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-gray-700">Tags</label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onTagChange(undefined)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              !active.tagSlug 
                ? "bg-gray-900 text-white" 
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            All
          </button>
          {tags.map((t) => (
            <button
              key={t.id}
              onClick={() => onTagChange(t.slug)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                active.tagSlug === t.slug 
                  ? "bg-gray-900 text-white" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>
      </div>

      {/* Filter Grid */}
      <div className="grid grid-cols-1 gap-4">
        {/* Reading Time */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Reading Time</label>
          <select
            className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={active.readingTime ?? ""}
            onChange={(e) => onReadingTimeChange(e.target.value || undefined)}
          >
            <option value="">Any length</option>
            <option value="short">Quick read (1-3 min)</option>
            <option value="medium">Medium (4-7 min)</option>
            <option value="long">Long read (8+ min)</option>
          </select>
        </div>

        {/* Blog Type */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Blog Type</label>
          <select
            className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={active.blogType ?? ""}
            onChange={(e) => onBlogTypeChange(e.target.value || undefined)}
          >
            <option value="">All types</option>
            <option value="solo">Solo blogs</option>
            <option value="team">Team blogs</option>
          </select>
        </div>

        {/* Status */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Status</label>
          <select
            className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={active.status ?? ""}
            onChange={(e) => onStatusChange(e.target.value || undefined)}
          >
            <option value="">All status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="pending_review">Pending Review</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        {/* Sort */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Sort by</label>
          <select
            className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={active.sortBy ?? "newest"}
            onChange={(e) => onSortChange((e.target.value as Props["active"]["sortBy"]) || "newest")}
          >
            {sortOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>
    </aside>
  );
}


