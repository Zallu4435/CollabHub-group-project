"use client";

import { useState } from "react";
import BlogCard from "../components/BlogCard";
import { useBlogsData } from "../hook/useBlogsData";

export default function SearchPage() {
  const [q, setQ] = useState("");
  const { posts, setFilters } = useBlogsData();
  return (
    <div className="min-h-screen bg-white text-black">
      <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <input
          value={q}
          onChange={(e) => {
            const value = e.target.value;
            setQ(value);
            setFilters((prev) => ({ ...prev, query: value }));
          }}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg"
          placeholder="Search posts..."
        />
      </div>
      <div className="space-y-8">
        {posts.map((p) => (
          <BlogCard key={p.id} post={p} />
        ))}
      </div>
      </div>
    </div>
  );
}


