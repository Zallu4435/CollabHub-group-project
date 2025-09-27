"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

type UserState = {
  likes: string[]; // post ids
  archives: string[]; // post ids
};

const STORAGE_KEY = "blog.user.state";

function loadState(): UserState {
  if (typeof window === "undefined") return { likes: [], archives: [] };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Return default data for demo purposes
      return { 
        likes: ["p_future_web_2025", "p_react_clean_arch"], 
        archives: ["p_minimalist_design", "p_team_collaboration"] 
      };
    }
    const parsed = JSON.parse(raw) as Partial<UserState>;
    // If the stored data is empty, return default data for demo
    if ((!parsed.likes || parsed.likes.length === 0) && (!parsed.archives || parsed.archives.length === 0)) {
      return { 
        likes: ["p_future_web_2025", "p_react_clean_arch"], 
        archives: ["p_minimalist_design", "p_team_collaboration"] 
      };
    }
    return { likes: parsed.likes ?? [], archives: parsed.archives ?? [] };
  } catch {
    return { likes: [], archives: [] };
  }
}

function saveState(state: UserState) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}

export function useBlogUserState() {
  const [state, setState] = useState<UserState>(() => {
    // Initialize with default data for demo
    return { 
      likes: ["p_future_web_2025", "p_react_clean_arch"], 
      archives: ["p_minimalist_design", "p_team_collaboration"] 
    };
  });

  useEffect(() => {
    // For demo purposes, always use default data
    const defaultState = { 
      likes: ["p_future_web_2025", "p_react_clean_arch"], 
      archives: ["p_minimalist_design", "p_team_collaboration"] 
    };
    setState(defaultState);
  }, []);

  const like = useCallback((postId: string) => {
    setState((prev) => {
      if (prev.likes.includes(postId)) return prev;
      return { ...prev, likes: [...prev.likes, postId] };
    });
  }, []);

  const unlike = useCallback((postId: string) => {
    setState((prev) => ({ ...prev, likes: prev.likes.filter((id) => id !== postId) }));
  }, []);

  const toggleLike = useCallback((postId: string) => {
    setState((prev) => (
      prev.likes.includes(postId)
        ? { ...prev, likes: prev.likes.filter((id) => id !== postId) }
        : { ...prev, likes: [...prev.likes, postId] }
    ));
  }, []);

  const archive = useCallback((postId: string) => {
    setState((prev) => {
      if (prev.archives.includes(postId)) return prev;
      return { ...prev, archives: [...prev.archives, postId] };
    });
  }, []);

  const unarchive = useCallback((postId: string) => {
    setState((prev) => ({ ...prev, archives: prev.archives.filter((id) => id !== postId) }));
  }, []);

  const toggleArchive = useCallback((postId: string) => {
    setState((prev) => (
      prev.archives.includes(postId)
        ? { ...prev, archives: prev.archives.filter((id) => id !== postId) }
        : { ...prev, archives: [...prev.archives, postId] }
    ));
  }, []);

  const value = useMemo(() => ({
    likes: state.likes,
    archives: state.archives,
    isLiked: (postId: string) => state.likes.includes(postId),
    isArchived: (postId: string) => state.archives.includes(postId),
    like,
    unlike,
    toggleLike,
    archive,
    unarchive,
    toggleArchive,
  }), [state, like, unlike, toggleLike, archive, unarchive, toggleArchive]);

  return value;
}


