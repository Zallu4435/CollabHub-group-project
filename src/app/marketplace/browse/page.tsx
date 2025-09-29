'use client';

import { useState, useEffect, useRef } from 'react';
import { projectsApi } from '../lib/utils/api';
import { Project } from '../types/project';
import { ProjectGrid } from '../components/project/ProjectGrid';
import { SearchBar } from '../components/search/SearchBar';
import { FilterPanel } from '../components/search/FilterPanel';
import { SortOptions } from '../components/search/SortOptions';
import { CurrencySelector } from '@/components/ui/CurrencySelector';
import { Breadcrumb } from '../components/layout/Breadcrumb';

export default function BrowsePage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    minPrice: undefined as number | undefined,
    maxPrice: undefined as number | undefined,
    license: '',
    rating: undefined as number | undefined,
    sort: 'newest'
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0
  });
  const [showFilters, setShowFilters] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const fetchProjects = async (append = false) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await projectsApi.getAll({
        page: pagination.page,
        limit: pagination.limit,
        ...filters
      });
      
      setProjects(prev => append ? [...prev, ...response.data.projects] : response.data.projects);
      setPagination(prev => ({
        ...prev,
        total: response.data.total,
        totalPages: response.data.totalPages
      }));
    } catch (err) {
      setError('Failed to load projects');
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects(false);
  }, [filters]);

  useEffect(() => {
    if (pagination.page === 1) return; // first load handled by filters effect
    fetchProjects(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.page]);

  const handleFilterChange = (newFilters: Partial<typeof filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (page: number) => {
    setPagination(prev => ({ ...prev, page }));
  };

  // Infinite scroll observer
  useEffect(() => {
    if (!sentinelRef.current) return;
    const node = sentinelRef.current;
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting && !loading && !isLoadingMore && pagination.page < pagination.totalPages) {
        setIsLoadingMore(true);
        setPagination(prev => ({ ...prev, page: prev.page + 1 }));
      }
    }, { rootMargin: '400px' });

    observer.observe(node);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, isLoadingMore, pagination.page, pagination.totalPages]);

  useEffect(() => {
    if (isLoadingMore && !loading) {
      setIsLoadingMore(false);
    }
  }, [loading, isLoadingMore]);

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Marketplace', href: '/marketplace' },
    { label: 'Browse Projects', href: '/marketplace/browse' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Breadcrumb items={breadcrumbItems} />
          
          <div className="mt-6">
            <h1 className="text-3xl font-bold text-black">Browse Projects</h1>
            <p className="mt-2 text-black">
              Discover amazing projects, templates, and resources from talented developers
            </p>
          </div>

          {/* Search, Sort and Controls */}
          <div className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
              <div className="lg:col-span-7 flex items-center gap-4">
                <SearchBar
                  initialValue={filters.search}
                  onSearch={(value) => handleFilterChange({ search: value })}
                  placeholder="Search projects, templates, or developers..."
                />
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="ml-2 px-4 py-2 rounded-lg bg-gradient-to-r from-gray-900 to-gray-700 text-white shadow hover:from-black hover:to-gray-800 transition-colors whitespace-nowrap"
                >
                  {showFilters ? 'Hide Filters' : 'Show Filters'}
                </button>
              </div>

              <div className="lg:col-span-5 flex items-center justify-end gap-4">
                {/* Currency Selector */}
                <div className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg bg-white">
                  <span className="text-sm text-gray-600">Currency:</span>
                  <CurrencySelector 
                    variant="compact" 
                    size="sm" 
                    showFlag={true}
                    showSymbol={true}
                    showName={false}
                  />
                </div>
                <div className="min-w-[240px]">
                  <SortOptions
                    sortBy={filters.sort}
                    onSortChange={(value) => handleFilterChange({ sort: value })}
                    resultCount={undefined}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error ? (
          <div className="text-center py-12">
            <div className="text-red-600 text-lg font-medium">{error}</div>
            <button
              onClick={() => fetchProjects(false)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className={`grid grid-cols-1 ${showFilters ? 'lg:grid-cols-12 gap-8 items-start' : ''}`}>
            {showFilters && (
              <aside className="lg:col-span-3">
                <div className="sticky top-24">
                  <div className="max-h-[calc(100vh-6rem)] overflow-y-auto pr-2">
                    <FilterPanel
                      filters={filters as any}
                      onFiltersChange={(f) => handleFilterChange(f as any)}
                      onClearFilters={() => setFilters({
                        search: '',
                        category: '',
                        minPrice: undefined,
                        maxPrice: undefined,
                        license: '',
                        rating: undefined,
                        sort: 'newest'
                      })}
                      isOpen
                    />
                  </div>
                </div>
              </aside>
            )}

            <section className={`${showFilters ? 'lg:col-span-9' : ''}`}>
              {/* Results Header */}
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-black">
                      {pagination.total} projects found
                    </h2>
                    {filters.search && (
                      <p className="text-black mt-1">
                        Results for "{filters.search}"
                      </p>
                    )}
                  </div>
                  
                  <div className="text-sm text-black">
                    Page {pagination.page} of {pagination.totalPages}
                  </div>
                </div>
              </div>

              {/* Projects Grid */}
              <ProjectGrid
                projects={projects}
                loading={loading}
                columns={showFilters ? 2 : 3}
              />

              {/* Infinite scroll sentinel */}
              <div ref={sentinelRef} className="mt-12 flex justify-center">
                {pagination.page < pagination.totalPages ? (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <circle cx="12" cy="12" r="10" strokeOpacity="0.25" strokeWidth="4"></circle>
                      <path d="M22 12a10 10 0 00-10-10" strokeWidth="4"></path>
                    </svg>
                    Loading more projects...
                  </div>
                ) : (
                  <div className="text-sm text-gray-500">You have reached the end</div>
                )}
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}