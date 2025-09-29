// market/src/components/search/SearchBar.tsx
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface SearchBarProps {
  placeholder?: string;
  initialValue?: string;
  onSearch?: (query: string) => void;
  showSuggestions?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search projects, templates...",
  initialValue = '',
  onSearch,
  showSuggestions = true
}) => {
  const [query, setQuery] = useState(initialValue);
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  const suggestions = [
    'React dashboard',
    'Vue landing page',
    'Mobile app template',
    'E-commerce website',
    'Node.js API',
    'Next.js blog',
    'Flutter app',
    'WordPress theme'
  ];

  const handleSearch = (searchQuery: string = query) => {
    if (searchQuery.trim()) {
      if (onSearch) {
        onSearch(searchQuery);
      } else {
        router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      }
      setShowDropdown(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="relative w-full">
      <div className="relative bg-white border border-gray-200 rounded-xl shadow-sm focus-within:shadow-md transition-shadow">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
          placeholder={placeholder}
          className="w-full pl-12 pr-28 py-3 rounded-xl bg-transparent focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-black placeholder:text-black"
        />

        <div className="absolute inset-y-0 right-0 pr-2 flex items-center gap-2">
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
              aria-label="Clear"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          <button
            onClick={() => handleSearch()}
            className="px-3 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 shadow"
          >
            Search
          </button>
        </div>
      </div>

      {showSuggestions && showDropdown && query.length === 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
          <div className="p-2">
            <div className="text-xs font-medium text-gray-700 mb-2 px-2">Popular Searches</div>
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => handleSearch(suggestion)}
                className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-gray-100"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
