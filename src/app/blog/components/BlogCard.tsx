"use client";

import Link from "next/link";
import { BlogPost } from "../types";
import { blogData } from "../data";

type Props = { post: BlogPost };

export default function BlogCard({ post }: Props) {
  const author = blogData.authors.find(a => a.id === post.authorId);
  const date = new Date(post.publishedAt);
  return (
    <article className="group text-black">
      <Link href={`/blog/${post.slug}`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-300 rounded-full" />
              <div>
                <span className="text-sm font-medium text-gray-900">{author?.name}</span>
                <span className="text-sm text-gray-500 ml-2">{date.toDateString()}</span>
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


