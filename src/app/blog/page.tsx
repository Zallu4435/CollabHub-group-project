"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const BlogHomepage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const featuredPost = {
    id: 1,
    title: "The Future of Web Development: What's Next in 2025",
    excerpt: "Exploring the latest trends and technologies that are shaping the future of web development, from AI-powered coding to advanced frameworks.",
    author: {
      name: "Sarah Johnson",
      avatar: "/avatars/sarah.jpg",
      verified: true
    },
    publishDate: "Dec 15, 2024",
    readTime: "8 min read",
    image: "/blog/featured-post.jpg",
    tags: ["Technology", "Web Development", "AI"],
    featured: true
  };

  const posts = [
    {
      id: 2,
      title: "Building Scalable React Applications with Clean Architecture",
      excerpt: "Learn how to structure your React applications for maintainability and scalability using clean architecture principles.",
      author: {
        name: "Michael Chen",
        avatar: "/avatars/michael.jpg"
      },
      publishDate: "Dec 14, 2024",
      readTime: "6 min read",
      image: "/blog/react-architecture.jpg",
      tags: ["React", "Architecture", "JavaScript"]
    },
    {
      id: 3,
      title: "The Art of Minimalist Design in Digital Products",
      excerpt: "Discover how minimalism can enhance user experience and create more effective digital products.",
      author: {
        name: "Emma Wilson",
        avatar: "/avatars/emma.jpg"
      },
      publishDate: "Dec 13, 2024",
      readTime: "5 min read",
      image: "/blog/minimalist-design.jpg",
      tags: ["Design", "UX", "Minimalism"]
    },
    // Add more posts...
  ];

  const categories = ['All', 'Technology', 'Design', 'Programming', 'AI', 'Startups'];

  return (
    <div className="min-h-screen bg-white">
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
              <Link href="/categories" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
                Categories
              </Link>
              <Link href="/search" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
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
            {/* Featured Article */}
            <div className="mb-12">
              <div className="relative overflow-hidden rounded-2xl bg-gray-100 aspect-[16/9]">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white z-20">
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                      Featured
                    </span>
                    <span className="text-sm opacity-90">{featuredPost.readTime}</span>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4 leading-tight">
                    {featuredPost.title}
                  </h1>
                  <p className="text-lg opacity-90 mb-4 line-clamp-2">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full"></div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{featuredPost.author.name}</span>
                        {featuredPost.author.verified && (
                          <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <span className="text-sm opacity-75">{featuredPost.publishDate}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-1 mb-8 overflow-x-auto pb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category.toLowerCase())}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    activeCategory === category.toLowerCase()
                      ? 'bg-black text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Posts Grid */}
            <div className="space-y-8">
              {posts.map((post) => (
                <article key={post.id} className="group cursor-pointer">
                  <Link href={`/blog/${post.id}`}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="md:col-span-2 space-y-3">
                        {/* Author Info */}
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                          <div>
                            <span className="text-sm font-medium text-gray-900">{post.author.name}</span>
                            <span className="text-sm text-gray-500 ml-2">{post.publishDate}</span>
                          </div>
                        </div>

                        {/* Title */}
                        <h2 className="text-xl md:text-2xl font-serif font-bold text-gray-900 group-hover:text-gray-700 transition-colors leading-tight">
                          {post.title}
                        </h2>

                        {/* Excerpt */}
                        <p className="text-gray-600 leading-relaxed line-clamp-3">
                          {post.excerpt}
                        </p>

                        {/* Meta */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>{post.readTime}</span>
                            <div className="flex items-center space-x-2">
                              {post.tags.slice(0, 2).map((tag, index) => (
                                <span key={index} className="bg-gray-100 px-2 py-1 rounded text-xs">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                          <button className="text-gray-400 hover:text-gray-600 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* Featured Image */}
                      <div className="md:col-span-1">
                        <div className="aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden">
                          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300"></div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
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
                  {['JavaScript', 'React', 'Design', 'AI', 'Startup', 'Productivity'].map((tag) => (
                    <Link
                      key={tag}
                      href={`/tags/${tag.toLowerCase()}`}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors"
                    >
                      {tag}
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

