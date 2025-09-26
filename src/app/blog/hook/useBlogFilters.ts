"use client";

import { useCallback } from "react";
import { BlogFilters } from "./useBlogsData";

export function useBlogFilters(setFilters: (updater: (prev: BlogFilters) => BlogFilters) => void) {
  const setQuery = useCallback((query: string) => {
    setFilters((prev) => ({ ...prev, query }));
  }, [setFilters]);

  const setCategory = useCallback((categorySlug?: string) => {
    setFilters((prev) => ({ ...prev, categorySlug }));
  }, [setFilters]);

  const setTag = useCallback((tagSlug?: string) => {
    setFilters((prev) => ({ ...prev, tagSlug }));
  }, [setFilters]);

  const setAuthor = useCallback((authorUsername?: string) => {
    setFilters((prev) => ({ ...prev, authorUsername }));
  }, [setFilters]);

  const setArchive = useCallback((year?: number, month?: number) => {
    setFilters((prev) => ({ ...prev, year, month }));
  }, [setFilters]);

  return { setQuery, setCategory, setTag, setAuthor, setArchive } as const;
}


