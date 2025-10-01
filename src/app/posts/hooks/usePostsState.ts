"use client";

import { useCallback, useEffect, useMemo, useState } from 'react';
import type { PostItem, ReactionType, CommentItem, UserSummary } from "../types";
import { seedData } from "../_data/seed";

export interface DraftPost {
  id: string;
  content: string;
  mediaUrls: string[];
  visibility: 'public' | 'connections' | 'private';
  poll?: { question: string; options: string[]; endsAt?: string };
  createdAt: string;
  updatedAt: string;
}

export interface ScheduledPost extends DraftPost {
  scheduledFor: string; // ISO date string
}

export interface PostsStateApi {
  currentUser: UserSummary;
  posts: PostItem[];
  comments: CommentItem[];
  isPosting: boolean;
  createPost: (data: { content: string; mediaUrls?: string[]; visibility: 'public' | 'connections' | 'private'; poll?: { question: string; options: string[]; endsAt?: string } }) => Promise<void>;
  reactToPost: (postId: string, type: ReactionType) => void;
  commentOnPost: (postId: string, content: string, parentId?: string) => void;
  savedPostIds: string[];
  toggleSavePost: (postId: string) => void;
  isPostSaved: (postId: string) => boolean;
  voteOnPoll: (postId: string, optionId: string) => void;
  userPollVotes: Record<string, string>; // postId -> optionId
  drafts: DraftPost[];
  scheduledPosts: ScheduledPost[];
  saveDraft: (draft: Omit<DraftPost, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateDraft: (id: string, updates: Partial<Omit<DraftPost, 'id' | 'createdAt' | 'updatedAt'>>) => void;
  deleteDraft: (id: string) => void;
  schedulePost: (draftId: string, scheduledFor: string) => void;
  publishDraft: (draftId: string) => Promise<void>;
  hidePost: (postId: string) => void;
  deletePost: (postId: string) => void;
  toggleComments: (postId: string) => void;
  updatePostContent: (postId: string, content: string) => void;
}

export function usePostsState(): PostsStateApi {
  const [currentUser] = useState<UserSummary>(seedData.currentUser);
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [isPosting, setIsPosting] = useState(false);
  const [savedPostIds, setSavedPostIds] = useState<string[]>([]);
  const [userPollVotes, setUserPollVotes] = useState<Record<string, string>>({});
  const [drafts, setDrafts] = useState<DraftPost[]>([]);
  const [scheduledPosts, setScheduledPosts] = useState<ScheduledPost[]>([]);
  
  // Initialize from seed data only (no persistence)
  useEffect(() => {
    setPosts(seedData.posts);
    setComments(seedData.comments);
    setSavedPostIds([]);
    setUserPollVotes({});
    setDrafts([]);
    setScheduledPosts([]);
  }, []);

  const createPost = useCallback(async (data: { content: string; mediaUrls?: string[]; visibility: 'public' | 'connections' | 'private'; poll?: { question: string; options: string[]; endsAt?: string } }) => {
    setIsPosting(true);
    await new Promise((r) => setTimeout(r, 600));
    
    const pollData = data.poll ? {
      question: data.poll.question,
      options: data.poll.options.map((text, i) => ({ id: `opt_${i}`, text, votes: 0 })),
      endsAt: data.poll.endsAt,
    } : undefined;

    setPosts((prev) => [
      {
        id: `p_${Date.now()}`,
        author: currentUser,
        content: data.content,
        createdAt: new Date().toISOString(),
        visibility: data.visibility,
        media: (data.mediaUrls ?? []).map((url, i) => ({ id: `m_${i}`, type: 'image', url })),
        poll: pollData,
        metrics: { views: Math.floor(300 + Math.random() * 700), comments: 0, reactionsByType: { like: 0 } },
        entities: { hashtags: [], mentions: [] },
      },
      ...prev,
    ]);
    setIsPosting(false);
  }, [currentUser]);

  const reactToPost = useCallback((postId: string, type: ReactionType) => {
    setPosts((prev) => prev.map((p) => {
      if (p.id !== postId) return p;
      const current = p.metrics?.reactionsByType?.[type] ?? 0;
      return {
        ...p,
        metrics: {
          views: p.metrics?.views ?? 0,
          comments: p.metrics?.comments ?? 0,
          reactionsByType: { ...(p.metrics?.reactionsByType ?? {}), [type]: current + 1 },
        },
      };
    }));
  }, []);

  const commentOnPost = useCallback((postId: string, content: string, parentId?: string) => {
    const newComment: CommentItem = {
      id: `c_${Date.now()}`,
      postId,
      parentId,
      author: currentUser,
      content,
      createdAt: new Date().toISOString(),
    };
    setComments((prev) => [...prev, newComment]);
    setPosts((prev) => prev.map((p) => p.id === postId ? { ...p, metrics: { views: p.metrics?.views ?? 0, reactionsByType: p.metrics?.reactionsByType ?? {}, comments: (p.metrics?.comments ?? 0) + 1 } } : p));
  }, [currentUser]);

  const toggleSavePost = useCallback((postId: string) => {
    setSavedPostIds((prev) => prev.includes(postId) ? prev.filter((id) => id !== postId) : [postId, ...prev]);
  }, []);

  const isPostSaved = useCallback((postId: string) => savedPostIds.includes(postId), [savedPostIds]);

  const voteOnPoll = useCallback((postId: string, optionId: string) => {
    setUserPollVotes(prev => ({ ...prev, [postId]: optionId }));
    setPosts(prev => prev.map(p => {
      if (p.id !== postId || !p.poll) return p;
      const newOptions = p.poll.options.map(opt => 
        opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
      );
      return { ...p, poll: { ...p.poll, options: newOptions } };
    }));
  }, []);

  const saveDraft = useCallback((draft: Omit<DraftPost, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newDraft: DraftPost = {
      ...draft,
      id: `draft_${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setDrafts(prev => [newDraft, ...prev]);
  }, []);

  const updateDraft = useCallback((id: string, updates: Partial<Omit<DraftPost, 'id' | 'createdAt' | 'updatedAt'>>) => {
    setDrafts(prev => prev.map(draft => 
      draft.id === id 
        ? { ...draft, ...updates, updatedAt: new Date().toISOString() }
        : draft
    ));
  }, []);

  const deleteDraft = useCallback((id: string) => {
    setDrafts(prev => prev.filter(draft => draft.id !== id));
  }, []);

  const schedulePost = useCallback((draftId: string, scheduledFor: string) => {
    const draft = drafts.find(d => d.id === draftId);
    if (!draft) return;
    
    const scheduledPost: ScheduledPost = {
      ...draft,
      scheduledFor,
    };
    
    setScheduledPosts(prev => [scheduledPost, ...prev]);
    setDrafts(prev => prev.filter(d => d.id !== draftId));
  }, [drafts]);

  const publishDraft = useCallback(async (draftId: string) => {
    const draft = drafts.find(d => d.id === draftId);
    if (!draft) return;
    
    await createPost({
      content: draft.content,
      mediaUrls: draft.mediaUrls,
      visibility: draft.visibility,
      poll: draft.poll,
    });
    
    setDrafts(prev => prev.filter(d => d.id !== draftId));
  }, [drafts, createPost]);

  const hidePost = useCallback((postId: string) => {
    setPosts(prev => prev.map(p => p.id === postId ? { ...p, hidden: true } : p));
  }, []);

  const deletePost = useCallback((postId: string) => {
    setPosts(prev => prev.filter(p => p.id !== postId));
  }, []);

  const toggleComments = useCallback((postId: string) => {
    setPosts(prev => prev.map(p => p.id === postId ? { ...p, allowComments: p.allowComments === false ? true : false } : p));
  }, []);

  const updatePostContent = useCallback((postId: string, content: string) => {
    setPosts(prev => prev.map(p => p.id === postId ? { ...p, content, edited: true } : p));
  }, []);

  return useMemo(
    () => ({ 
      currentUser, posts, comments, isPosting, createPost, reactToPost, commentOnPost, 
      savedPostIds, toggleSavePost, isPostSaved, voteOnPoll, userPollVotes,
      drafts, scheduledPosts, saveDraft, updateDraft, deleteDraft, schedulePost, publishDraft,
      hidePost, deletePost, toggleComments, updatePostContent
    }),
    [commentOnPost, comments, createPost, currentUser, isPosting, posts, reactToPost, savedPostIds, isPostSaved, toggleSavePost, voteOnPoll, userPollVotes, drafts, scheduledPosts, saveDraft, updateDraft, deleteDraft, schedulePost, publishDraft, hidePost, deletePost, toggleComments, updatePostContent]
  );
}


