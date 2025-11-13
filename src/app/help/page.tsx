'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

interface FaqItem {
  q: string;
  a: string;
  tags: string[];
}

const FAQS: FaqItem[] = [
  { q: 'How do I create a new project?', a: 'Go to Project → New. Fill details and save. You can later invite collaborators from the workspace Settings tab.', tags: ['project','getting-started'] },
  { q: 'How do I report a bug?', a: 'Use the floating help button → Give Feedback, select Bug and describe what happened.', tags: ['bug','support'] },
  { q: 'Where can I see recent updates?', a: 'Open the What\'s New page from Help or visit /updates to see the changelog.', tags: ['updates','changelog'] },
  { q: 'How can I change my currency?', a: 'Use the currency selector in the marketplace header or the global currency widget.', tags: ['marketplace','currency'] },
  { q: 'How do I manage teams?', a: 'Navigate to Blog → Settings → Teams to create and manage teams.', tags: ['teams','blog'] },
];

const HelpPage: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  useEffect(() => {
    const initial = searchParams?.get('q') || '';
    if (initial && initial !== query) setQuery(initial);
  }, [searchParams, query]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return FAQS;
    return FAQS.filter(item =>
      item.q.toLowerCase().includes(q) ||
      item.a.toLowerCase().includes(q) ||
      item.tags.some(t => t.includes(q))
    );
  }, [query]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50/30">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700">
        {/* Decorative Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-300 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white text-sm font-medium transition-all duration-200 border border-white/20 mb-8"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </button>

          {/* Hero Content */}
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                How can we help?
              </h1>
            </div>
            <p className="text-lg text-indigo-100 mb-8">
              Find answers, product guides, and ways to contact our support team
            </p>

            {/* Search Bar */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <div className="relative flex items-center gap-3 bg-white rounded-2xl shadow-2xl p-2 pr-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for help articles, topics, or keywords..."
                  className="flex-1 text-gray-900 placeholder-gray-400 py-3 bg-transparent focus:outline-none text-base"
                />
                {query && (
                  <button
                    onClick={() => setQuery('')}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Popular Searches */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-sm text-indigo-200">Popular:</span>
              {['project', 'bug', 'marketplace', 'getting-started'].map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white text-sm font-medium transition-all duration-200 border border-white/10"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Main Column */}
          <div className="lg:col-span-8 space-y-8">
            {/* Browse by Category */}
            {!query && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by category</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { icon: '🚀', title: 'Getting started', desc: 'Create your first project and invite teammates', q: 'getting-started', color: 'from-blue-500 to-cyan-500' },
                    { icon: '👤', title: 'Account & billing', desc: 'Manage profile, security, and payments', q: 'account', color: 'from-purple-500 to-pink-500' },
                    { icon: '📂', title: 'Projects & workspace', desc: 'Organize work, tasks, and settings', q: 'project', color: 'from-orange-500 to-red-500' },
                    { icon: '🛒', title: 'Marketplace', desc: 'Buying, selling, and currency', q: 'marketplace', color: 'from-green-500 to-emerald-500' },
                    { icon: '🧩', title: 'Integrations', desc: 'Connect tools and automate', q: 'integration', color: 'from-indigo-500 to-purple-500' },
                    { icon: '🛠️', title: 'Troubleshooting', desc: 'Fix common issues and bugs', q: 'bug', color: 'from-amber-500 to-orange-500' }
                  ].map((c) => (
                    <button
                      key={c.title}
                      onClick={() => setQuery(c.q)}
                      className="group relative text-left p-6 rounded-2xl bg-white border border-gray-200 hover:border-transparent hover:shadow-xl transition-all duration-300 overflow-hidden"
                    >
                      {/* Gradient Background on Hover */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${c.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                      
                      <div className="relative flex items-start gap-4">
                        <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center text-2xl shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                          {c.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors">
                            {c.title}
                          </h3>
                          <p className="text-sm text-gray-600 leading-relaxed">{c.desc}</p>
                        </div>
                        <svg className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 transform group-hover:translate-x-1 transition-all flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Search Results / FAQs */}
            <div>
              {query && (
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {filtered.length} {filtered.length === 1 ? 'result' : 'results'} for "{query}"
                  </h2>
                </div>
              )}

              {filtered.length > 0 ? (
                <div className="space-y-3">
                  {filtered.map((item, idx) => (
                    <div
                      key={idx}
                      className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300"
                    >
                      <button
                        onClick={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
                        className="w-full text-left p-6 flex items-start gap-4 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center transform group-hover:scale-110 transition-transform">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors mb-1">
                            {item.q}
                          </h3>
                          {expandedIndex !== idx && (
                            <p className="text-sm text-gray-500 line-clamp-1">{item.a}</p>
                          )}
                        </div>
                        <svg
                          className={`w-5 h-5 text-gray-400 flex-shrink-0 transform transition-transform duration-200 ${expandedIndex === idx ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      {expandedIndex === idx && (
                        <div className="px-6 pb-6 pt-2 border-t border-gray-100 bg-gray-50/50">
                          <p className="text-gray-700 leading-relaxed mb-4">{item.a}</p>
                          <div className="flex flex-wrap gap-2">
                            {item.tags.map(tag => (
                              <button
                                key={tag}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setQuery(tag);
                                  setExpandedIndex(null);
                                }}
                                className="px-3 py-1 text-xs font-medium rounded-lg bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition-colors"
                              >
                                #{tag}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No results found</h3>
                  <p className="text-gray-600 mb-6">
                    We couldn't find anything matching "{query}". Try different keywords or browse by category.
                  </p>
                  <button
                    onClick={() => setQuery('')}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium hover:shadow-lg transition-shadow"
                  >
                    Clear search
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Contact Support Card */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 p-6 shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center mb-4 border border-white/20">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Still need help?</h3>
                <p className="text-indigo-100 text-sm mb-4">
                  Can't find what you're looking for? Our support team is here to help.
                </p>
                <div className="space-y-2">
                  <button
                    onClick={() => window.dispatchEvent(new Event('open-feedback'))}
                    className="w-full px-4 py-3 rounded-xl bg-white text-indigo-600 font-medium hover:bg-indigo-50 transition-colors shadow-lg"
                  >
                    Give Feedback
                  </button>
                  <Link
                    href="/contact"
                    className="block text-center w-full px-4 py-3 rounded-xl border-2 border-white/30 text-white font-medium hover:bg-white/10 transition-colors backdrop-blur-sm"
                  >
                    Contact Support
                  </Link>
                </div>
              </div>
            </div>

            {/* Popular Articles */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                </svg>
                <h3 className="font-semibold text-gray-900">Popular articles</h3>
              </div>
              <ul className="space-y-3">
                {[
                  { title: 'Create your first project', icon: '📂' },
                  { title: 'Invite and manage teammates', icon: '👥' },
                  { title: 'Report a bug with context', icon: '🐛' },
                  { title: 'Change currency in marketplace', icon: '💱' },
                ].map((article, i) => (
                  <li key={i}>
                    <button
                      onClick={() => setQuery(article.title.split(' ')[0].toLowerCase())}
                      className="group flex items-center gap-3 w-full text-left p-3 rounded-xl hover:bg-indigo-50 transition-colors"
                    >
                      <span className="text-xl">{article.icon}</span>
                      <span className="text-sm text-gray-700 group-hover:text-indigo-600 transition-colors">
                        {article.title}
                      </span>
                      <svg className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 ml-auto transform group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <h3 className="font-semibold text-gray-900">Quick links</h3>
              </div>
              <ul className="space-y-2">
                {[
                  { href: '/updates', label: 'What\'s New', icon: '✨' },
                  { href: '/community', label: 'Community', icon: '💬' },
                  { href: '/project', label: 'Projects', icon: '📋' },
                  { href: '/marketplace', label: 'Marketplace', icon: '🛍️' },
                ].map((link, i) => (
                  <li key={i}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-lg">{link.icon}</span>
                      <span className="text-sm text-gray-700 group-hover:text-indigo-600 transition-colors">
                        {link.label}
                      </span>
                      <svg className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
