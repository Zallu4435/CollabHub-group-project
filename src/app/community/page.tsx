"use client";

import Link from 'next/link';
import { useState } from 'react';

export default function CommunityPage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-24 text-center">
          <div className="mb-6 inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-semibold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            15,240 members online
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
            Welcome to Your
            <br />
            <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              Community Hub
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-10 leading-relaxed">
            Connect with thousands of passionate members. Share ideas, grow together, and make an impact.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/community/feed"
              className="px-8 py-4 bg-white text-purple-600 rounded-xl font-bold text-lg shadow-2xl hover:shadow-white/20 hover:-translate-y-1 transition-all flex items-center gap-2 group"
            >
              Explore Community
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="/community/groups"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-xl font-bold text-lg hover:bg-white/20 transition-all"
            >
              Browse Groups
            </Link>
          </div>
          
          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { label: 'Active Members', value: '50K+' },
              { label: 'Groups', value: '1,200+' },
              { label: 'Events', value: '500+' },
              { label: 'Countries', value: '80+' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-black text-white mb-2">{stat.value}</div>
                <div className="text-sm text-white/80 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Sections */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        {/* Quick Access Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {[
            {
              id: 'feed',
              title: 'Community Feed',
              description: 'Stay updated with the latest posts, discussions, and trending content from the community',
              icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              ),
              gradient: 'from-blue-500 to-cyan-500',
              href: '/community/feed'
            },
            {
              id: 'events',
              title: 'Upcoming Events',
              description: 'Join workshops, webinars, and networking events happening this week',
              icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              ),
              gradient: 'from-purple-500 to-pink-500',
              href: '/community/events'
            },
            {
              id: 'groups',
              title: 'Interest Groups',
              description: 'Find and join groups based on your interests, skills, and passions',
              icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              ),
              gradient: 'from-green-500 to-emerald-500',
              href: '/community/groups'
            }
          ].map((card) => (
            <Link
              key={card.id}
              href={card.href}
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className="group relative bg-white border-2 border-gray-200 rounded-3xl p-8 hover:border-transparent hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
              
              <div className={`w-16 h-16 bg-gradient-to-br ${card.gradient} rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg group-hover:scale-110 transition-transform`}>
                {card.icon}
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all">
                {card.title}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">{card.description}</p>
              
              <div className="flex items-center text-blue-600 font-semibold group-hover:gap-2 transition-all">
                Explore now
                <svg className="w-5 h-5 ml-1 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* All Features Grid */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3 text-center">Explore Everything</h2>
          <p className="text-gray-600 text-center mb-12 text-lg">All the tools and features you need in one place</p>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'Discover', icon: '🔍', href: '/community/discover', color: 'cyan' },
              { name: 'Profiles', icon: '👤', href: '/community/profiles', color: 'purple' },
              { name: 'Hangouts', icon: '🎙️', href: '/community/hangouts', color: 'teal' },
              { name: 'Mentorship', icon: '🎓', href: '/community/mentorship', color: 'indigo' },
              { name: 'Discussions', icon: '💬', href: '/community/discussions', color: 'orange' },
              { name: 'Polls', icon: '📊', href: '/community/polls', color: 'pink' },
              { name: 'Leaderboard', icon: '🏆', href: '/community/leaderboard', color: 'yellow' },
              { name: 'Gamification', icon: '🎮', href: '/community/gamification', color: 'amber' },
              { name: 'Map', icon: '🗺️', href: '/community/map', color: 'emerald' },
              { name: 'Analytics', icon: '📈', href: '/community/analytics', color: 'gray' }
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`group bg-white border border-gray-200 rounded-2xl p-6 hover:border-${item.color}-500 hover:shadow-lg transition-all duration-300 text-center`}
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{item.icon}</div>
                <div className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{item.name}</div>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative mt-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-center overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full translate-x-32 -translate-y-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-32 translate-y-32"></div>
          </div>
          
          <div className="relative z-10">
            <h2 className="text-4xl font-black text-white mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join our thriving community today and connect with amazing people
            </p>
            <Link
              href="/community/feed"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-600 rounded-xl font-bold text-lg shadow-2xl hover:shadow-white/20 hover:-translate-y-1 transition-all"
            >
              Join Now - It's Free
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
