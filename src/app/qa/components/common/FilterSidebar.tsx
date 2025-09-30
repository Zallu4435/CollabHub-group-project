// qa/components/common/FilterSidebar.tsx
'use client'
import { useState } from 'react'
import { Filter, ChevronDown, ChevronUp } from 'lucide-react'
import { Badge } from '../ui/Badge'
import { Card } from '../ui/Card'
import TagChip from './TagChip'
import { tags } from '../../lib/dummy-data/questions'

interface FilterSidebarProps {
  onFilterChange?: (filters: FilterOptions) => void
  className?: string
}

interface FilterOptions {
  status: string[]
  timeRange: string
  sortBy: string
  tags: string[]
}

export default function FilterSidebar({ onFilterChange, className = '' }: FilterSidebarProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    status: [],
    timeRange: 'all',
    sortBy: 'newest',
    tags: []
  })
  
  const [expandedSections, setExpandedSections] = useState({
    status: true,
    timeRange: true,
    tags: true,
    sortBy: true
  })

  const statusOptions = [
    { id: 'unanswered', label: 'Unanswered', count: 23 },
    { id: 'answered', label: 'Answered', count: 156 },
    { id: 'accepted', label: 'Has Accepted Answer', count: 89 },
    { id: 'bounty', label: 'Has Bounty', count: 12 }
  ]

  const timeRangeOptions = [
    { id: 'today', label: 'Today' },
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' },
    { id: 'year', label: 'This Year' },
    { id: 'all', label: 'All Time' }
  ]

  const sortOptions = [
    { id: 'newest', label: 'Newest' },
    { id: 'active', label: 'Most Active' },
    { id: 'votes', label: 'Most Votes' },
    { id: 'views', label: 'Most Views' },
    { id: 'answers', label: 'Most Answers' }
  ]

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const handleStatusChange = (statusId: string) => {
    const newStatus = filters.status.includes(statusId)
      ? filters.status.filter(s => s !== statusId)
      : [...filters.status, statusId]
    
    const newFilters = { ...filters, status: newStatus }
    setFilters(newFilters)
    onFilterChange?.(newFilters)
  }

  const handleTimeRangeChange = (range: string) => {
    const newFilters = { ...filters, timeRange: range }
    setFilters(newFilters)
    onFilterChange?.(newFilters)
  }

  const handleSortChange = (sort: string) => {
    const newFilters = { ...filters, sortBy: sort }
    setFilters(newFilters)
    onFilterChange?.(newFilters)
  }

  const handleTagToggle = (tagId: string) => {
    const newTags = filters.tags.includes(tagId)
      ? filters.tags.filter(t => t !== tagId)
      : [...filters.tags, tagId]
    
    const newFilters = { ...filters, tags: newTags }
    setFilters(newFilters)
    onFilterChange?.(newFilters)
  }

  const clearAllFilters = () => {
    const newFilters = {
      status: [],
      timeRange: 'all',
      sortBy: 'newest',
      tags: []
    }
    setFilters(newFilters)
    onFilterChange?.(newFilters)
  }

  const hasActiveFilters = filters.status.length > 0 || 
                          filters.timeRange !== 'all' || 
                          filters.sortBy !== 'newest' || 
                          filters.tags.length > 0

  return (
    <div className={className}>
      <Card>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-600" />
            <h3 className="font-semibold text-gray-900">Filters</h3>
          </div>
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Clear All
            </button>
          )}
        </div>

        <div className="space-y-6">
          {/* Sort By */}
          <div>
            <button
              onClick={() => toggleSection('sortBy')}
              className="flex items-center justify-between w-full mb-3"
            >
              <h4 className="font-medium text-gray-800">Sort By</h4>
              {expandedSections.sortBy ? (
                <ChevronUp className="w-4 h-4 text-gray-500" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-500" />
              )}
            </button>
            {expandedSections.sortBy && (
              <div className="space-y-2">
                {sortOptions.map(option => (
                  <label key={option.id} className="flex items-center">
                    <input
                      type="radio"
                      name="sortBy"
                      value={option.id}
                      checked={filters.sortBy === option.id}
                      onChange={() => handleSortChange(option.id)}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Status */}
          <div>
            <button
              onClick={() => toggleSection('status')}
              className="flex items-center justify-between w-full mb-3"
            >
              <h4 className="font-medium text-gray-800">Status</h4>
              {expandedSections.status ? (
                <ChevronUp className="w-4 h-4 text-gray-500" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-500" />
              )}
            </button>
            {expandedSections.status && (
              <div className="space-y-2">
                {statusOptions.map(option => (
                  <label key={option.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.status.includes(option.id)}
                        onChange={() => handleStatusChange(option.id)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{option.label}</span>
                    </div>
                    <Badge variant="secondary" size="sm">
                      {option.count}
                    </Badge>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Time Range */}
          <div>
            <button
              onClick={() => toggleSection('timeRange')}
              className="flex items-center justify-between w-full mb-3"
            >
              <h4 className="font-medium text-gray-800">Time Range</h4>
              {expandedSections.timeRange ? (
                <ChevronUp className="w-4 h-4 text-gray-500" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-500" />
              )}
            </button>
            {expandedSections.timeRange && (
              <div className="space-y-2">
                {timeRangeOptions.map(option => (
                  <label key={option.id} className="flex items-center">
                    <input
                      type="radio"
                      name="timeRange"
                      value={option.id}
                      checked={filters.timeRange === option.id}
                      onChange={() => handleTimeRangeChange(option.id)}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Popular Tags */}
          <div>
            <button
              onClick={() => toggleSection('tags')}
              className="flex items-center justify-between w-full mb-3"
            >
              <h4 className="font-medium text-gray-800">Popular Tags</h4>
              {expandedSections.tags ? (
                <ChevronUp className="w-4 h-4 text-gray-500" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-500" />
              )}
            </button>
            {expandedSections.tags && (
              <div className="space-y-2">
                {tags.slice(0, 8).map(tag => (
                  <div key={tag.id} className="flex items-center justify-between">
                    <div
                      onClick={() => handleTagToggle(tag.id)}
                      role="button"
                      tabIndex={0}
                      className={`
                        flex items-center gap-2 p-2 rounded-lg transition-colors cursor-pointer
                        ${filters.tags.includes(tag.id) 
                          ? 'bg-blue-50 border border-blue-200' 
                          : 'hover:bg-gray-50'
                        }
                      `}
                    >
                      <TagChip tag={tag} size="sm" showCount />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}
