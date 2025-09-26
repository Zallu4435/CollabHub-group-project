"use client";

import React from 'react';
import Link from 'next/link';
import BlogCard from './components/BlogCard';
import Filters from './components/Filters';
import { useBlogsData } from './hook/useBlogsData';
import { blogData } from './data';

const BlogHomepage: React.FC = () => {
  const { posts, setFilters } = useBlogsData();

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Navigation */}
      <nav className="border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur-sm z-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">B</span>
              </div>
              <span className="text-xl font-serif font-bold text-gray-900">BlogSpace</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
                Home
              </Link>
              <Link href="/blog" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
                Categories
              </Link>
              <Link href="/blog/search" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
                Search
              </Link>
              <Link href="/blog/poster" className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
                Write
              </Link>
              <Link href="/profile">
                <div className="w-8 h-8 bg-gray-300 rounded-full cursor-pointer hover:ring-2 hover:ring-gray-200 transition-all"></div>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>  
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Featured Article (first post) */}
            {posts[0] && (
              <div className="mb-12">
                <div className="relative overflow-hidden rounded-2xl bg-gray-100 aspect-[16/9]">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white z-20">
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                        Featured
                      </span>
                      <span className="text-sm opacity-90">{posts[0].readingMinutes} min read</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4 leading-tight">
                      {posts[0].title}
                    </h1>
                    <p className="text-lg opacity-90 mb-4 line-clamp-2">
                      {posts[0].excerpt}
                    </p>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-white/20 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Category Filter */}
            <Filters onSelectCategory={(slug) => setFilters((prev) => ({ ...prev, categorySlug: slug }))} />

            {/* Posts Grid */}
            <div className="space-y-8">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-50 transition-colors">
                Load More Articles
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              {/* Featured Authors */}
              <div>
                <h3 className="text-lg font-serif font-bold text-gray-900 mb-4">Featured Writers</h3>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">Writer Name</h4>
                        <p className="text-sm text-gray-600">Brief description</p>
                      </div>
                      <button className="text-sm bg-black text-white px-3 py-1 rounded-full hover:bg-gray-800 transition-colors">
                        Follow
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Popular Tags */}
              <div>
                <h3 className="text-lg font-serif font-bold text-gray-900 mb-4">Popular Topics</h3>
                <div className="flex flex-wrap gap-2">
                  {['react', 'ai', 'ux', 'minimalism', 'architecture'].map((tag) => (
                    <Link
                      key={tag}
                      href={`/blog/tag/${tag.toLowerCase()}`}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors"
                    >
                      {tag[0].toUpperCase() + tag.slice(1)}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-gray-50 p-6 rounded-2xl">
                <h3 className="text-lg font-serif font-bold text-gray-900 mb-2">Stay Updated</h3>
                <p className="text-gray-600 text-sm mb-4">Get the latest articles delivered to your inbox.</p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                  <button className="w-full bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogHomepage;

