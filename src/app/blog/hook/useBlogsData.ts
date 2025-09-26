"use client";

import { useMemo, useState } from "react";
import { blogData } from "../data";
import { BlogPost } from "../types";

export type BlogFilters = {
  query?: string;
  categorySlug?: string;
  tagSlug?: string;
  authorUsername?: string;
  year?: number;
  month?: number; // 1-12
};

export function useBlogsData(initialFilters?: BlogFilters) {
  const [filters, setFilters] = useState<BlogFilters>(initialFilters ?? {});

  const filteredPosts: BlogPost[] = useMemo(() => {
    const { query, categorySlug, tagSlug, authorUsername, year, month } = filters;
    return blogData.posts.filter((post) => {
      const categoryOk = categorySlug
        ? post.categoryIds.some((cId) => blogData.categories.find((c) => c.id === cId)?.slug === categorySlug)
        : true;
      const tagOk = tagSlug
        ? post.tagIds.some((tId) => blogData.tags.find((t) => t.id === tId)?.slug === tagSlug)
        : true;
      const authorOk = authorUsername
        ? blogData.authors.find((a) => a.id === post.authorId)?.username === authorUsername
        : true;
      const date = new Date(post.publishedAt);
      const yearOk = year ? date.getUTCFullYear() === year : true;
      const monthOk = month ? date.getUTCMonth() + 1 === month : true;
      const queryOk = query
        ? (post.title + " " + post.excerpt + " " + post.content).toLowerCase().includes(query.toLowerCase())
        : true;
      return categoryOk && tagOk && authorOk && yearOk && monthOk && queryOk;
    }).sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  }, [filters]);

  return {
    data: blogData,
    posts: filteredPosts,
    filters,
    setFilters,
  } as const;
}


