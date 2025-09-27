"use client";

import Link from "next/link";
import { BlogPost } from "../types";
import { blogData, getTeamById } from "../data";
import { useBlogUserState } from "../hook/useBlogUserState";

type Props = { post: BlogPost };

export default function BlogCard({ post }: Props) {
  const author = blogData.authors.find(a => a.id === post.authorId);
  const team = post.teamId ? getTeamById(post.teamId) : null;
  const date = new Date(post.publishedAt);
  const user = useBlogUserState();
  const isLiked = user.isLiked(post.id);
  const isArchived = user.isArchived(post.id);
  return (
    <article className="group text-black">
      <Link href={`/blog/${post.slug}`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                {team ? (
                  <span className="text-sm">👥</span>
                ) : (
                  <span className="text-sm font-semibold">{author?.name?.[0]}</span>
                )}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-900">
                    {team ? team.name : author?.name}
                  </span>
                  {team && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
                      Team
                    </span>
                  )}
                  {post.status === 'pending_review' && (
                    <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full font-medium">
                      Pending Review
                    </span>
                  )}
                </div>
                <div className="text-sm text-gray-500">
                  <div>{date.toDateString()}</div>
                  {post.location && (
                    <div className="text-xs text-gray-600 mt-1 flex items-center">
                      <span className="mr-1">📍</span>
                      <span>{post.location.displayText}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <h2 className="text-xl md:text-2xl font-serif font-bold text-black group-hover:text-black transition-colors leading-tight">
              {post.title}
            </h2>
            <p className="text-black leading-relaxed line-clamp-3">{post.excerpt}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-black">
                <span>{post.readingMinutes} min read</span>
                <div className="flex items-center space-x-2">
                  {post.tagIds.slice(0, 2).map((tagId) => {
                    const tag = blogData.tags.find(t => t.id === tagId);
                    if (!tag) return null;
                    return (
                      <span key={tag.id} className="bg-gray-100 px-2 py-1 rounded text-xs text-black">{tag.name}</span>
                    );
                  })}
                </div>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-700">
                <button
                  type="button"
                  onClick={(e) => { e.preventDefault(); user.toggleLike(post.id); }}
                  className={`px-2 py-1 rounded-md border ${isLiked?"bg-red-50 border-red-200 text-red-600":"border-gray-200 hover:bg-gray-50"}`}
                  aria-pressed={isLiked}
                >
                  ❤ {post.likesCount ?? 0}{isLiked?"+":""}
                </button>
                <span aria-label="comments">💬 {post.commentsCount ?? 0}</span>
                <button
                  type="button"
                  onClick={(e) => { e.preventDefault(); user.toggleArchive(post.id); }}
                  className={`px-2 py-1 rounded-md border ${isArchived?"bg-gray-900 text-white border-gray-900":"border-gray-200 hover:bg-gray-50"}`}
                  aria-pressed={isArchived}
                >
                  {isArchived?"Archived":"Archive"}
                </button>
                <span aria-label="share">↗ Share</span>
              </div>
            </div>
          </div>
          <div className="md:col-span-1">
            <div className="aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300" />
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}


