// qa/components/common/SearchBar.tsx
'use client'
import { useState, useEffect } from 'react'
import { Search, X, Clock, TrendingUp, Hash } from 'lucide-react'
import { useDebounce } from '../../lib/hooks/useDebounce'

interface Suggestion {
  text: string
  category: string
  matches: number
}

interface SearchBarProps {
  placeholder?: string
  onSearch?: (query: string) => void
  className?: string
  showRecentSearches?: boolean
}

export default function SearchBar({ 
  placeholder = "Search questions, topics, or keywords...", 
  onSearch,
  className = "",
  showRecentSearches = true
}: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  
  const debouncedQuery = useDebounce(query, 300)

  // Enhanced mock suggestions with categories
  const mockSuggestions: Suggestion[] = [
    { text: "How to implement authentication in Next.js", category: "Next.js", matches: 234 },
    { text: "Best practices for TypeScript interfaces", category: "TypeScript", matches: 89 },
    { text: "React state management patterns", category: "React", matches: 156 },
    { text: "Database design for Q&A platforms", category: "Database", matches: 45 },
    { text: "JavaScript async/await vs promises", category: "JavaScript", matches: 312 },
    { text: "CSS Grid vs Flexbox layout", category: "CSS", matches: 78 }
  ]

  const popularTags = ["javascript", "react", "typescript", "next.js", "css", "node.js"]

  useEffect(() => {
    const saved = localStorage.getItem('qa-recent-searches')
    if (saved) {
      setRecentSearches(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    if (debouncedQuery.length > 1) {
      const filtered = mockSuggestions.filter(s => 
        s.text.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        s.category.toLowerCase().includes(debouncedQuery.toLowerCase())
      )
      setSuggestions(filtered.slice(0, 6))
    } else {
      setSuggestions([])
    }
  }, [debouncedQuery])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    setShowDropdown(true)
  }

  const handleSearch = (searchQuery: string = query) => {
    if (searchQuery.trim()) {
      onSearch?.(searchQuery)
      
      const newRecent = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 8)
      setRecentSearches(newRecent)
      localStorage.setItem('qa-recent-searches', JSON.stringify(newRecent))
      
      setShowDropdown(false)
      setQuery(searchQuery)
    }
  }

  const clearSearch = () => {
    setQuery('')
    setShowDropdown(false)
    onSearch?.('')
  }

  const clearRecentSearches = () => {
    setRecentSearches([])
    localStorage.removeItem('qa-recent-searches')
  }

  return (
    <div className={`relative ${className}`}>
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => {
            setIsFocused(true)
            setShowDropdown(true)
          }}
          onBlur={() => {
            setIsFocused(false)
            setTimeout(() => setShowDropdown(false), 200)
          }}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder={placeholder}
          className="w-full pl-12 pr-12 py-2.5 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none text-gray-900 placeholder-gray-500 bg-white transition-all duration-200 text-base"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Enhanced Search Dropdown */}
      {showDropdown && (query.length > 0 || isFocused) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-gray-100 rounded-xl shadow-2xl z-50 max-h-96 overflow-hidden">
          {/* Search Suggestions */}
          {suggestions.length > 0 && (
            <div className="border-b border-gray-100">
              <div className="px-5 py-3 bg-gray-50 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                    Search Suggestions
                  </span>
                </div>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onMouseDown={() => handleSearch(suggestion.text)}
                    className="w-full text-left px-5 py-4 hover:bg-blue-50 transition-colors border-b border-gray-50 last:border-b-0 group"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Search className="w-4 h-4 text-gray-400 group-hover:text-blue-500 flex-shrink-0" />
                          <span className="text-gray-900 font-medium group-hover:text-blue-700 truncate">
                            {suggestion.text}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 ml-6">
                          <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full font-medium">
                            {suggestion.category}
                          </span>
                          <span className="text-xs text-gray-500">
                            {suggestion.matches} questions
                          </span>
                        </div>
                      </div>
                      <TrendingUp className="w-4 h-4 text-gray-300 group-hover:text-blue-400 flex-shrink-0" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Popular Tags (when no query) */}
          {query.length === 0 && (
            <div className="border-b border-gray-100">
              <div className="px-5 py-3 bg-gray-50 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Hash className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                    Popular Tags
                  </span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex flex-wrap gap-2">
                  {popularTags.map(tag => (
                    <button
                      key={tag}
                      onMouseDown={() => handleSearch(`[${tag}]`)}
                      className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors"
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Recent Searches */}
          {showRecentSearches && recentSearches.length > 0 && query.length === 0 && (
            <div>
              <div className="flex items-center justify-between px-5 py-3 bg-gray-50 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                    Recent Searches
                  </span>
                </div>
                <button
                  onClick={clearRecentSearches}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  Clear all
                </button>
              </div>
              <div className="max-h-48 overflow-y-auto">
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    onMouseDown={() => handleSearch(search)}
                    className="w-full text-left px-5 py-3 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-b-0 group flex items-center gap-3"
                  >
                    <Clock className="w-4 h-4 text-gray-400 group-hover:text-blue-500 flex-shrink-0" />
                    <span className="text-gray-700 group-hover:text-blue-700 flex-1 truncate">
                      {search}
                    </span>
                    <X className="w-3 h-3 text-gray-300 opacity-0 group-hover:opacity-100 hover:text-red-500 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* No Results */}
          {query.length > 2 && suggestions.length === 0 && (
            <div className="px-5 py-8 text-center">
              <Search className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p className="text-gray-600 mb-3">No suggestions found for "{query}"</p>
              <button
                onMouseDown={() => handleSearch()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Search anyway
              </button>
            </div>
          )}

          {/* Search Tips */}
          {query.length === 0 && (
            <div className="px-5 py-4 bg-gradient-to-r from-blue-50 to-purple-50 border-t border-gray-100">
              <div className="text-xs text-gray-600 space-y-1">
                <div className="font-medium text-gray-700 mb-2">Search Tips:</div>
                <div>• Use <code className="bg-white px-1 rounded text-blue-600">[tag]</code> to search by tag</div>
                <div>• Use <code className="bg-white px-1 rounded text-green-600">user:username</code> to find posts by user</div>
                <div>• Use <code className="bg-white px-1 rounded text-purple-600">is:question</code> or <code className="bg-white px-1 rounded text-purple-600">is:answer</code></div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
