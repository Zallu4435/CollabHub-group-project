"use client";

import { useMemo } from "react";
import { useBlogsData } from "../hook/useBlogsData";

type Props = {
  query: string;
  onQueryChange: (value: string) => void;
  onTagChange: (slug?: string) => void;
  onAuthorChange: (username?: string) => void;
  onSortChange: (sort?: "newest" | "oldest" | "most_liked" | "most_commented") => void;
  active: {
    tagSlug?: string;
    authorUsername?: string;
    sortBy?: "newest" | "oldest" | "most_liked" | "most_commented";
  };
};

export default function ArchiveControls({
  query,
  onQueryChange,
  onTagChange,
  onAuthorChange,
  onSortChange,
  active
}: Props) {
  const { data } = useBlogsData();

  const tags = data.tags;
  const authors = data.authors;

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
    <div className="space-y-4">
      <input
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        className="w-full px-4 py-3 border border-gray-200 rounded-lg"
        placeholder="Search posts..."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <select
          className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-white"
          value={active.tagSlug ?? ""}
          onChange={(e) => onTagChange(e.target.value || undefined)}
        >
          <option value="">All tags</option>
          {tags.map((t) => (
            <option key={t.id} value={t.slug}>{t.name}</option>
          ))}
        </select>

        <select
          className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-white"
          value={active.authorUsername ?? ""}
          onChange={(e) => onAuthorChange(e.target.value || undefined)}
        >
          <option value="">All authors</option>
          {authors.map((a) => (
            <option key={a.id} value={a.username}>{a.name}</option>
          ))}
        </select>

        <select
          className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-white"
          value={active.sortBy ?? "newest"}
          onChange={(e) => onSortChange((e.target.value as Props["active"]["sortBy"]) || "newest")}
        >
          {sortOptions.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
}


