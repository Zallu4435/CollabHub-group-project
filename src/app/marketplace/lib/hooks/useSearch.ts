// market/src/lib/hooks/useSearch.ts
import { useState, useEffect, useMemo } from 'react';
import { Project } from '../../types/project';
import { ProjectFilter } from '../../types/project';

interface SearchResult {
  projects: Project[];
  total: number;
  hasMore: boolean;
}

interface UseSearchProps {
  initialQuery?: string;
  initialFilters?: ProjectFilter;
  projects: Project[];
}

export const useSearch = ({ initialQuery = '', initialFilters = {}, projects }: UseSearchProps) => {
  const [query, setQuery] = useState(initialQuery);
  const [filters, setFilters] = useState<ProjectFilter>(initialFilters);
  const [sortBy, setSortBy] = useState<'newest' | 'popular' | 'price-low' | 'price-high' | 'rating'>('newest');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const itemsPerPage = 12;

  // Filter and search projects
  const filteredProjects = useMemo(() => {
    let filtered = [...projects];

    // Text search
    if (query.trim()) {
      const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0);
      filtered = filtered.filter(project => {
        const searchableText = [
          project.title,
          project.description,
          project.shortDescription,
          ...project.techStack,
          ...project.tags,
          project.category,
          project.subcategory || '',
          project.sellerName
        ].join(' ').toLowerCase();

        return searchTerms.every(term => searchableText.includes(term));
      });
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(project => project.category === filters.category);
    }

    // Tech stack filter
    if (filters.techStack && filters.techStack.length > 0) {
      filtered = filtered.filter(project =>
        filters.techStack!.some(tech => project.techStack.includes(tech))
      );
    }

    // Price range filter
    if (filters.priceRange) {
      const [minPrice, maxPrice] = filters.priceRange;
      filtered = filtered.filter(project => {
        if (maxPrice === 0) return project.price === 0; // Free only
        if (maxPrice === 999) return project.price >= minPrice; // Above min price
        return project.price >= minPrice && project.price <= maxPrice;
      });
    }

    // License type filter
    if (filters.licenseType) {
      filtered = filtered.filter(project => project.licenseType === filters.licenseType);
    }

    // Rating filter
    if (filters.rating) {
      filtered = filtered.filter(project => project.rating >= filters.rating!);
    }

    return filtered;
  }, [projects, query, filters]);

  // Sort projects
  const sortedProjects = useMemo(() => {
    const sorted = [...filteredProjects];

    switch (sortBy) {
      case 'newest':
        return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      case 'popular':
        return sorted.sort((a, b) => b.downloads - a.downloads);
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      default:
        return sorted;
    }
  }, [filteredProjects, sortBy]);

  // Paginate results
  const paginatedProjects = useMemo(() => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedProjects.slice(startIndex, endIndex);
  }, [sortedProjects, page, itemsPerPage]);

  // Search suggestions
  const suggestions = useMemo(() => {
    const allTerms = new Set<string>();
    
    projects.forEach(project => {
      // Add tech stack terms
      project.techStack.forEach(tech => allTerms.add(tech));
      
      // Add category terms
      allTerms.add(project.category);
      if (project.subcategory) {
        allTerms.add(project.subcategory);
      }
      
      // Add tags
      project.tags.forEach(tag => allTerms.add(tag));
    });

    return Array.from(allTerms)
      .filter(term => term.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 8);
  }, [projects, query]);

  // Update search query
  const updateQuery = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
  };

  // Update filters
  const updateFilters = (newFilters: Partial<ProjectFilter>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setPage(1);
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({});
    setPage(1);
  };

  // Update sort
  const updateSort = (newSortBy: typeof sortBy) => {
    setSortBy(newSortBy);
    setPage(1);
  };

  // Pagination
  const goToPage = (newPage: number) => {
    setPage(newPage);
  };

  const nextPage = () => {
    if (hasNextPage) {
      setPage(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (hasPrevPage) {
      setPage(prev => prev - 1);
    }
  };

  // Computed values
  const total = filteredProjects.length;
  const totalPages = Math.ceil(total / itemsPerPage);
  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;
  const hasResults = total > 0;

  // Active filters count
  const activeFiltersCount = Object.values(filters).filter(value => {
    if (Array.isArray(value)) return value.length > 0;
    return value !== undefined && value !== null && value !== '';
  }).length;

  return {
    // State
    query,
    filters,
    sortBy,
    page,
    isLoading,
    
    // Results
    projects: paginatedProjects,
    total,
    totalPages,
    hasNextPage,
    hasPrevPage,
    hasResults,
    
    // Suggestions
    suggestions,
    
    // Actions
    updateQuery,
    updateFilters,
    clearFilters,
    updateSort,
    goToPage,
    nextPage,
    prevPage,
    
    // Computed
    activeFiltersCount
  };
};
