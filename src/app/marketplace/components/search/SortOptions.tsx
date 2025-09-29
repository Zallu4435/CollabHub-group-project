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
    { value: 'newest', label: 'Newest First' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'downloads', label: 'Most Downloaded' }
  ];

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="text-sm text-black">
        {resultCount !== undefined && (
          <span>{resultCount.toLocaleString()} projects found</span>
        )}
      </div>
      
      <div className="flex items-center space-x-4">
        <label htmlFor="sort" className="text-sm font-medium text-black">
          Sort by:
        </label>
        <select
          id="sort"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
