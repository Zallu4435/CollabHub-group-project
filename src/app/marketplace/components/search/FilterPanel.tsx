// market/src/components/search/FilterPanel.tsx
import React, { useState } from 'react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { ProjectFilter } from '../../types/project';
import { CurrencySelector } from '@/components/ui/CurrencySelector';

interface FilterPanelProps {
  filters: ProjectFilter;
  onFiltersChange: (filters: ProjectFilter) => void;
  onClearFilters: () => void;
  isOpen?: boolean;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onFiltersChange,
  onClearFilters,
  isOpen = true
}) => {
  const categories = [
    { id: 'web-templates', name: 'Web Templates', count: 245 },
    { id: 'mobile-apps', name: 'Mobile Apps', count: 156 },
    { id: 'backend-apis', name: 'Backend APIs', count: 98 },
    { id: 'ui-ux-kits', name: 'UI/UX Kits', count: 167 },
    { id: 'dashboard', name: 'Dashboards', count: 134 },
    { id: 'landing-pages', name: 'Landing Pages', count: 89 },
    { id: 'ecommerce', name: 'E-commerce', count: 76 },
    { id: 'portfolio', name: 'Portfolio', count: 54 }
  ];

  const techStacks = [
    'React', 'Vue.js', 'Angular', 'Next.js', 'Nuxt.js', 'Svelte',
    'TypeScript', 'JavaScript', 'Node.js', 'Python', 'PHP',
    'React Native', 'Flutter', 'Ionic', 'Laravel', 'Django',
    'MongoDB', 'PostgreSQL', 'MySQL', 'Firebase', 'Supabase',
    'Tailwind CSS', 'Bootstrap', 'Material UI', 'Chakra UI'
  ];

  const priceRanges = [
    { label: 'Free', value: [0, 0] as [number, number] },
    { label: 'Under $25', value: [0, 25] as [number, number] },
    { label: '$25 - $50', value: [25, 50] as [number, number] },
    { label: '$50 - $100', value: [50, 100] as [number, number] },
    { label: '$100+', value: [100, 999] as [number, number] }
  ];

  const licenseTypes = [
    { value: 'personal', label: 'Personal Use' },
    { value: 'commercial', label: 'Commercial Use' },
    { value: 'extended', label: 'Extended License' },
    { value: 'white-label', label: 'White Label' }
  ];

  const handleCategoryChange = (category: string) => {
    onFiltersChange({
      ...filters,
      category: filters.category === category ? undefined : category
    });
  };

  const handleTechStackChange = (tech: string) => {
    const currentTechStack = filters.techStack || [];
    const newTechStack = currentTechStack.includes(tech)
      ? currentTechStack.filter(t => t !== tech)
      : [...currentTechStack, tech];
    
    onFiltersChange({
      ...filters,
      techStack: newTechStack.length > 0 ? newTechStack : undefined
    });
  };

  const handlePriceRangeChange = (range: [number, number]) => {
    onFiltersChange({
      ...filters,
      priceRange: filters.priceRange && 
        filters.priceRange[0] === range[0] && 
        filters.priceRange[1] === range[1] ? undefined : range
    });
  };

  const handleLicenseChange = (license: string) => {
    onFiltersChange({
      ...filters,
      licenseType: filters.licenseType === license ? undefined : license as any
    });
  };

  const activeFiltersCount = [
    filters.category,
    filters.techStack?.length,
    filters.priceRange,
    filters.licenseType,
    filters.rating
  ].filter(Boolean).length;

  if (!isOpen) return null;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-black">Filters</h3>
        <button
          onClick={onClearFilters}
          disabled={activeFiltersCount === 0}
          className="flex items-center gap-1 px-3 py-1.5 text-xs rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <svg className="w-3.5 h-3.5 mr-1 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
          Clear Filters{activeFiltersCount > 0 ? ` (${activeFiltersCount})` : ''}
        </button>
      </div>

      {/* Categories */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-black mb-3">Category</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category.id} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={filters.category === category.id}
                onChange={() => handleCategoryChange(category.id)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-3 text-sm text-black flex-1">
                {category.name}
              </span>
              <span className="text-xs text-black">({category.count})</span>
            </label>
          ))}
        </div>
      </div>

      {/* Tech Stack */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-black mb-3">Technology</h4>
        <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto">
          {techStacks.map((tech) => (
            <button
              key={tech}
              onClick={() => handleTechStackChange(tech)}
              className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                filters.techStack?.includes(tech)
                  ? 'bg-blue-100 border-blue-300 text-blue-700'
                  : 'bg-gray-50 border-gray-300 text-black hover:bg-gray-100'
              }`}
            >
              {tech}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-black mb-3">Price Range</h4>
        <div className="space-y-2">
          {priceRanges.map((range) => (
            <label key={range.label} className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="priceRange"
                checked={filters.priceRange && 
                  filters.priceRange[0] === range.value[0] && 
                  filters.priceRange[1] === range.value[1]}
                onChange={() => handlePriceRangeChange(range.value)}
                className="border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-3 text-sm text-black">{range.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* License Type */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-black mb-3">License</h4>
        <div className="space-y-2">
          {licenseTypes.map((license) => (
            <label key={license.value} className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="licenseType"
                checked={filters.licenseType === license.value}
                onChange={() => handleLicenseChange(license.value)}
                className="border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-3 text-sm text-black">{license.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div>
        <h4 className="text-sm font-medium text-black mb-3">Minimum Rating</h4>
        <div className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <label key={rating} className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="rating"
                checked={filters.rating === rating}
                onChange={() => onFiltersChange({
                  ...filters,
                  rating: filters.rating === rating ? undefined : rating
                })}
                className="border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <div className="ml-3 flex items-center">
                {Array.from({ length: 5 }, (_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${
                      i < rating ? 'text-yellow-400' : 'text-black'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-2 text-sm text-black">& up</span>
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};
