"use client";

import { useEffect, useMemo, useState } from "react";
import BlogCard from "../components/BlogCard";
import { useBlogFilters } from "../hook/useBlogFilters";
import { useBlogsData } from "../hook/useBlogsData";
import ArchiveSidebar from "../components/ArchiveSidebar";
import BlogHeader from "../components/BlogHeader";
import { useSearchParams, useRouter } from "next/navigation";

const PAGE_SIZE = 10;

export default function ExplorePage() {
  const { posts, setFilters, filters } = useBlogsData({ sortBy: "newest" });
  const { setQuery, setTag, setReadingTime, setBlogType, setStatus, setSortBy, setLocation } = useBlogFilters(setFilters);
  const [visible, setVisible] = useState(PAGE_SIZE);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    // Initialize from URL only once on mount
    const q = searchParams.get("q") ?? undefined;
    const tag = searchParams.get("tag") ?? undefined;
    const readingTime = searchParams.get("readingTime") ?? undefined;
    const blogType = searchParams.get("blogType") ?? undefined;
    const status = searchParams.get("status") ?? undefined;
    const yearStr = searchParams.get("year");
    const monthStr = searchParams.get("month");
    const sort = (searchParams.get("sort") as any) ?? undefined;
    const location = searchParams.get("location") ?? undefined;

    setFilters((prev) => ({
      ...prev,
      query: q,
      tagSlug: tag,
      readingTime: readingTime,
      blogType: blogType,
      status: status,
      year: yearStr ? Number(yearStr) : undefined,
      month: monthStr ? Number(monthStr) : undefined,
      sortBy: sort || prev.sortBy,
      location: location,
    }));
    // reset pagination
    setVisible(PAGE_SIZE);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const title = useMemo(() => {
    if (filters.tagSlug) return `Posts tagged: ${filters.tagSlug}`;
    if (filters.blogType) return `${filters.blogType === 'team' ? 'Team' : 'Solo'} Blogs`;
    if (filters.status) return `${filters.status.charAt(0).toUpperCase() + filters.status.slice(1)} Posts`;
    if (filters.year && filters.month) return `Archive: ${filters.year}/${String(filters.month).padStart(2, "0")}`;
    if (filters.year) return `Archive: ${filters.year}`;
    return "All Blogs";
  }, [filters.tagSlug, filters.blogType, filters.status, filters.year, filters.month]);

  const visiblePosts = posts.slice(0, visible);
  const canLoadMore = visible < posts.length;

  return (
    <div className="min-h-screen bg-white text-black">
      <BlogHeader />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-4">
          <h1 className="text-2xl font-semibold">{title}</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="space-y-10">
              {visiblePosts.map((p) => (
                <BlogCard key={p.id} post={p} />
              ))}
            </div>

            {canLoadMore && (
              <div className="mt-8 flex justify-center">
                <button
                  onClick={() => setVisible((v) => v + PAGE_SIZE)}
                  className="px-5 py-2.5 rounded-md border border-gray-200 bg-white text-gray-800 hover:bg-gray-50"
                >
                  Load more
                </button>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <ArchiveSidebar
                query={filters.query ?? ""}
                onQueryChange={(v) => { setQuery(v); setVisible(PAGE_SIZE); }}
                onTagChange={(slug) => { setTag(slug); setVisible(PAGE_SIZE); }}
                onReadingTimeChange={(range) => { setReadingTime(range); setVisible(PAGE_SIZE); }}
                onBlogTypeChange={(type) => { setBlogType(type); setVisible(PAGE_SIZE); }}
                onStatusChange={(status) => { setStatus(status); setVisible(PAGE_SIZE); }}
                onSortChange={(s) => { setSortBy(s); setVisible(PAGE_SIZE); }}
                onLocationChange={(location) => { setLocation(location); setVisible(PAGE_SIZE); }}
                onClearAll={() => { setQuery(""); setTag(undefined); setReadingTime(undefined); setBlogType(undefined); setStatus(undefined); setSortBy("newest"); setLocation(undefined); setVisible(PAGE_SIZE); }}
                active={{
                  tagSlug: filters.tagSlug,
                  readingTime: filters.readingTime,
                  blogType: filters.blogType,
                  status: filters.status,
                  sortBy: filters.sortBy,
                  location: filters.location
                }}
              />
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
}


