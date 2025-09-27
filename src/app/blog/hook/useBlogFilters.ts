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

  const setReadingTime = useCallback((readingTime?: string) => {
    setFilters((prev) => ({ ...prev, readingTime }));
  }, [setFilters]);

  const setBlogType = useCallback((blogType?: string) => {
    setFilters((prev) => ({ ...prev, blogType }));
  }, [setFilters]);

  const setStatus = useCallback((status?: string) => {
    setFilters((prev) => ({ ...prev, status }));
  }, [setFilters]);

  const setArchive = useCallback((year?: number, month?: number) => {
    setFilters((prev) => ({ ...prev, year, month }));
  }, [setFilters]);

  const setSortBy = useCallback((sortBy?: BlogFilters["sortBy"]) => {
    setFilters((prev) => ({ ...prev, sortBy }));
  }, [setFilters]);

  const setLocation = useCallback((location?: string) => {
    setFilters((prev) => ({ ...prev, location }));
  }, [setFilters]);

  return { setQuery, setTag, setReadingTime, setBlogType, setStatus, setArchive, setSortBy, setLocation } as const;
}


