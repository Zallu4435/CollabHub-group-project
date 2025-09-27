"use client";

import { useMemo, useState } from "react";
import { blogData } from "../data";
import { BlogPost } from "../types";

export type BlogFilters = {
  query?: string;
  tagSlug?: string;
  readingTime?: string; // "short" | "medium" | "long"
  blogType?: string; // "solo" | "team"
  status?: string; // "published" | "draft" | "pending_review" | "archived"
  year?: number;
  month?: number; // 1-12
  sortBy?: "newest" | "oldest" | "most_liked" | "most_commented";
  location?: string; // Location filter for city, state, or country
};

export function useBlogsData(initialFilters?: BlogFilters) {
  const [filters, setFilters] = useState<BlogFilters>(initialFilters ?? {});

  const filteredPosts: BlogPost[] = useMemo(() => {
    const { query, tagSlug, readingTime, blogType, status, year, month, sortBy, location } = filters;
    const result = blogData.posts.filter((post) => {
      const tagOk = tagSlug
        ? post.tagIds.some((tId) => blogData.tags.find((t) => t.id === tId)?.slug === tagSlug)
        : true;
      const readingTimeOk = readingTime
        ? (readingTime === "short" && post.readingMinutes <= 3) ||
          (readingTime === "medium" && post.readingMinutes >= 4 && post.readingMinutes <= 7) ||
          (readingTime === "long" && post.readingMinutes >= 8)
        : true;
      const blogTypeOk = blogType
        ? post.blogType === blogType
        : true;
      const statusOk = status
        ? post.status === status
        : true;
      const date = new Date(post.publishedAt);
      const yearOk = year ? date.getUTCFullYear() === year : true;
      const monthOk = month ? date.getUTCMonth() + 1 === month : true;
      const queryOk = query
        ? (post.title + " " + post.excerpt + " " + post.content).toLowerCase().includes(query.toLowerCase())
        : true;
      const locationOk = location
        ? post.location && (
            post.location.city?.toLowerCase().includes(location.toLowerCase()) ||
            post.location.state?.toLowerCase().includes(location.toLowerCase()) ||
            post.location.country?.toLowerCase().includes(location.toLowerCase()) ||
            post.location.displayText.toLowerCase().includes(location.toLowerCase())
          )
        : true;
      const notLockedOk = !post.isLocked; // Exclude locked posts from public view
      return tagOk && readingTimeOk && blogTypeOk && statusOk && yearOk && monthOk && queryOk && locationOk && notLockedOk;
    });

    const sorted = [...result].sort((a, b) => {
      switch (sortBy) {
        case "oldest":
          return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
        case "most_liked":
          return (b.likesCount ?? 0) - (a.likesCount ?? 0);
        case "most_commented":
          return (b.commentsCount ?? 0) - (a.commentsCount ?? 0);
        case "newest":
        default:
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      }
    });

    return sorted;
  }, [filters]);

  return {
    data: blogData,
    posts: filteredPosts,
    filters,
    setFilters,
  } as const;
}


