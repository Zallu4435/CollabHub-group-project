// market/src/components/search/SortOptions.tsx
import React from 'react';

interface SortOptionsProps {
  sortBy: string;
  onSortChange: (sortBy: string) => void;
  resultCount?: number;
}

export const SortOptions: React.FC<SortOptionsProps> = ({
  sortBy,
  onSortChange,
  resultCount
}) => {
  const sortOptions = [
    { value: 'all', label: 'All' },
    { value: 'newest', label: 'Newest First' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'downloads', label: 'Most Downloaded' }
  ];

  return (
    <div className="flex items-center">
      <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-3 py-2 shadow-sm">
        <label htmlFor="sort" className="text-sm font-medium text-black">
          Sort by
        </label>
        <div className="relative">
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="appearance-none border border-gray-200 rounded-lg pl-3 pr-8 py-1.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-black"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-400">
            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
