'use client';

import { useState } from 'react';
import SearchBar from '../common/SearchBar';
import FilterDropdown from '../common/FilterDropdown';

interface AdvancedSearchProps {
  onSearch: (filters: SearchFilters) => void;
}

interface SearchFilters {
  query: string;
  type: string[];
  dateRange: string;
  sortBy: string;
}

export default function AdvancedSearch({ onSearch }: AdvancedSearchProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    type: [],
    dateRange: 'all',
    sortBy: 'relevance'
  });

  const contentTypes = [
    { value: 'posts', label: 'Posts' },
    { value: 'people', label: 'People' },
    { value: 'groups', label: 'Groups' },
    { value: 'events', label: 'Events' }
  ];

  const dateRanges = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'year', label: 'This Year' }
  ];

  const sortOptions = [
    { value: 'relevance', label: 'Most Relevant' },
    { value: 'recent', label: 'Most Recent' },
    { value: 'popular', label: 'Most Popular' }
  ];

  const handleSearch = (query: string) => {
    const newFilters = { ...filters, query };
    setFilters(newFilters);
    onSearch(newFilters);
  };

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onSearch(newFilters);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Search</h2>

      <div className="space-y-4">
        <SearchBar
          placeholder="Search for posts, people, groups, events..."
          onSearch={handleSearch}
        />

        <div className="flex flex-wrap gap-3">
          <FilterDropdown
            title="Content Type"
            options={contentTypes}
            selected={filters.type}
            onChange={(value) => handleFilterChange('type', value)}
            multiple
          />

          <select
            value={filters.dateRange}
            onChange={(e) => handleFilterChange('dateRange', e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            {dateRanges.map(range => (
              <option key={range.value} value={range.value}>{range.label}</option>
            ))}
          </select>

          <select
            value={filters.sortBy}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        {(filters.query || filters.type.length > 0 || filters.dateRange !== 'all' || filters.sortBy !== 'relevance') && (
          <button
            onClick={() => {
              const resetFilters = { query: '', type: [], dateRange: 'all', sortBy: 'relevance' };
              setFilters(resetFilters);
              onSearch(resetFilters);
            }}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            Clear all filters
          </button>
        )}
      </div>
    </div>
  );
}
