'use client';

import { useState } from 'react';
import EventCard from '../_components/events/EventCard';
import { events } from '../_data/events';
import EmptyState from '../_components/common/EmptyState';
import Link from 'next/link';

const categories = ['All Events', 'Online', 'In-Person', 'Hybrid'];
const filters = ['Upcoming', 'This Week', 'This Month', 'Past Events'];

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All Events');
  const [selectedFilter, setSelectedFilter] = useState('Upcoming');
  const [searchQuery, setSearchQuery] = useState('');

  const hasEvents = events.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Discover Events</h1>
            <p className="text-gray-600">Find and join amazing events in your community</p>
          </div>
          <Link
            href="/community/events/create"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create Event
          </Link>
        </div>

        {/* Search and Filters */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search events by name, location, or organizer..."
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-[15px]"
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Time Filters */}
          <div className="flex gap-2 mt-4 flex-wrap">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedFilter === filter
                    ? 'bg-blue-50 text-blue-700 border-2 border-blue-200'
                    : 'text-gray-600 hover:bg-gray-50 border-2 border-transparent'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        {hasEvents ? (
          <>
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600 text-sm">
                <span className="font-semibold text-gray-900">{events.length}</span> events found
              </p>
              <select className="px-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm font-medium">
                <option>Sort by: Date</option>
                <option>Sort by: Popularity</option>
                <option>Sort by: Name</option>
              </select>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((e) => (
                <EventCard key={e.id} {...e} />
              ))}
            </div>
          </>
        ) : (
          <EmptyState
            title="No upcoming events"
            description="Create your first event and invite the community."
            action={{ label: 'Create Event', onClick: () => (window.location.href = '/community/events/create') }}
          />
        )}
      </div>
    </div>
  );
}
