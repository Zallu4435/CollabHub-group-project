// market/src/app/categories/[category]/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Rating } from '../../components/ui/Rating';
import { Project } from '../../types/project';
import { ProjectGrid } from '../../components/project/ProjectGrid';
import { SortOptions } from '../../components/search/SortOptions';

interface CategoryInfo {
  id: string;
  name: string;
  description: string;
  icon: string;
  subcategories: {
    id: string;
    name: string;
    count: number;
  }[];
}

const CATEGORIES: Record<string, CategoryInfo> = {
  'web-templates': {
    id: 'web-templates',
    name: 'Web Templates',
    description: 'Professional website templates and themes',
    icon: '🌐',
    subcategories: [
      { id: 'react', name: 'React', count: 245 },
      { id: 'vue', name: 'Vue.js', count: 189 },
      { id: 'angular', name: 'Angular', count: 156 },
      { id: 'html-css', name: 'HTML/CSS', count: 312 },
      { id: 'next-js', name: 'Next.js', count: 203 },
      { id: 'svelte', name: 'Svelte', count: 78 }
    ]
  },
  'mobile-apps': {
    id: 'mobile-apps',
    name: 'Mobile Apps',
    description: 'Native and cross-platform mobile applications',
    icon: '📱',
    subcategories: [
      { id: 'react-native', name: 'React Native', count: 134 },
      { id: 'flutter', name: 'Flutter', count: 198 },
      { id: 'ionic', name: 'Ionic', count: 89 },
      { id: 'native-ios', name: 'Native iOS', count: 156 },
      { id: 'native-android', name: 'Native Android', count: 167 },
      { id: 'xamarin', name: 'Xamarin', count: 45 }
    ]
  },
  'ecommerce': {
    id: 'ecommerce',
    name: 'E-commerce',
    description: 'Online store and shopping cart solutions',
    icon: '🛒',
    subcategories: [
      { id: 'shopify', name: 'Shopify', count: 123 },
      { id: 'woocommerce', name: 'WooCommerce', count: 167 },
      { id: 'magento', name: 'Magento', count: 78 },
      { id: 'custom', name: 'Custom Solutions', count: 234 },
      { id: 'marketplace', name: 'Marketplace', count: 89 }
    ]
  },
  'portfolio': {
    id: 'portfolio',
    name: 'Portfolio',
    description: 'Personal and professional portfolio websites',
    icon: '💼',
    subcategories: [
      { id: 'creative', name: 'Creative', count: 189 },
      { id: 'developer', name: 'Developer', count: 234 },
      { id: 'designer', name: 'Designer', count: 156 },
      { id: 'photography', name: 'Photography', count: 123 },
      { id: 'agency', name: 'Agency', count: 98 }
    ]
  },
  'ui-ux-kits': {
    id: 'ui-ux-kits',
    name: 'UI/UX Kits',
    description: 'Design systems and component libraries',
    icon: '🎨',
    subcategories: [
      { id: 'figma', name: 'Figma', count: 267 },
      { id: 'sketch', name: 'Sketch', count: 134 },
      { id: 'adobe-xd', name: 'Adobe XD', count: 89 },
      { id: 'component-lib', name: 'Component Libraries', count: 198 },
      { id: 'design-tokens', name: 'Design Tokens', count: 67 }
    ]
  },
  'wordpress': {
    id: 'wordpress',
    name: 'WordPress',
    description: 'WordPress themes and plugins',
    icon: '📝',
    subcategories: [
      { id: 'themes', name: 'Themes', count: 345 },
      { id: 'plugins', name: 'Plugins', count: 234 },
      { id: 'blocks', name: 'Gutenberg Blocks', count: 123 },
      { id: 'child-themes', name: 'Child Themes', count: 78 }
    ]
  },
  'full-stack': {
    id: 'full-stack',
    name: 'Full Stack',
    description: 'Complete application solutions',
    icon: '⚡',
    subcategories: [
      { id: 'mern', name: 'MERN Stack', count: 156 },
      { id: 'mean', name: 'MEAN Stack', count: 89 },
      { id: 'jamstack', name: 'JAMstack', count: 123 },
      { id: 'django', name: 'Django', count: 98 },
      { id: 'laravel', name: 'Laravel', count: 134 }
    ]
  },
  'landing-pages': {
    id: 'landing-pages',
    name: 'Landing Pages',
    description: 'High-converting landing page templates',
    icon: '🎯',
    subcategories: [
      { id: 'saas', name: 'SaaS', count: 189 },
      { id: 'app-landing', name: 'App Landing', count: 156 },
      { id: 'business', name: 'Business', count: 234 },
      { id: 'startup', name: 'Startup', count: 123 },
      { id: 'coming-soon', name: 'Coming Soon', count: 67 }
    ]
  },
  'backend-apis': {
    id: 'backend-apis',
    name: 'Backend APIs',
    description: 'REST APIs and backend services',
    icon: '🔧',
    subcategories: [
      { id: 'node-js', name: 'Node.js', count: 234 },
      { id: 'python', name: 'Python', count: 189 },
      { id: 'php', name: 'PHP', count: 156 },
      { id: 'go', name: 'Go', count: 89 },
      { id: 'rust', name: 'Rust', count: 45 },
      { id: 'microservices', name: 'Microservices', count: 123 }
    ]
  }
};

export default function CategoryPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const categorySlug = params.category as string;

  const [products, setProducts] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState(searchParams?.get('search') || '');
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>(
    searchParams?.get('subcategories')?.split(',').filter(Boolean) || []
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([
    parseInt(searchParams?.get('minPrice') || '0'),
    parseInt(searchParams?.get('maxPrice') || '1000')
  ]);
  const [minRating, setMinRating] = useState(parseFloat(searchParams?.get('rating') || '0'));
  const [selectedTechStack, setSelectedTechStack] = useState<string[]>(
    searchParams?.get('tech')?.split(',').filter(Boolean) || []
  );
  const [sortBy, setSortBy] = useState(searchParams?.get('sort') || 'popularity');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams?.get('page') || '1'));
  const [itemsPerPage] = useState(12);

  const categoryInfo = CATEGORIES[categorySlug];

  // Mock products data
  const mockProducts: Project[] = [
    {
      id: '1',
      title: 'Modern React Dashboard Template',
      description: 'A comprehensive admin dashboard built with React, TypeScript, and Tailwind CSS. Features responsive design, dark mode, and 50+ components.',
      shortDescription: 'React + TS admin dashboard with 50+ components and dark mode.',
      sellerId: 'seller1',
      sellerName: 'Sarah Johnson',
      sellerAvatar: '/images/avatars/sarah.jpg',
      techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
      framework: 'React',
      deployment: ['Vercel', 'Netlify'],
      browserCompat: ['Chrome', 'Firefox', 'Safari'],
      mobileResponsive: true,
      screenshots: ['/images/products/react-dashboard-1.jpg', '/images/products/react-dashboard-2.jpg'],
      demoUrl: 'https://demo.example.com/react-dashboard',
      price: 79.99,
      originalPrice: 99.99,
      discountPercentage: 20,
      licenseType: 'commercial',
      category: 'web-templates',
      subcategory: 'react',
      tags: ['dashboard', 'admin', 'responsive', 'dark-mode'],
      downloads: 1234,
      views: 15234,
      rating: 4.8,
      reviewCount: 124,
      featured: true,
      trending: false,
      isNew: false,
      isRequestOnly: false,
      state: 'available_for_request',
      requiresApproval: false,
      autoApprove: true,
      maxRequestsPerBuyer: 0,
      totalRequests: 0,
      pendingRequests: 0,
      approvedRequests: 0,
      rejectedRequests: 0,
      completedRequests: 0,
      createdAt: '2024-01-15',
      updatedAt: '2024-03-10'
    },
    {
      id: '2',
      title: 'E-commerce Mobile App UI Kit',
      description: 'Complete mobile app design with 80+ screens for iOS and Android. Built with React Native and Expo.',
      shortDescription: 'Mobile UI kit for React Native with 80+ screens.',
      sellerId: 'seller2',
      sellerName: 'Alex Chen',
      sellerAvatar: '/images/avatars/alex.jpg',
      techStack: ['React Native', 'Expo', 'TypeScript'],
      framework: 'React Native',
      deployment: ['Expo'],
      browserCompat: [],
      mobileResponsive: true,
      screenshots: ['/images/products/mobile-ecommerce-1.jpg'],
      demoUrl: 'https://demo.example.com/mobile-ecommerce',
      price: 129.99,
      licenseType: 'commercial',
      category: 'mobile-apps',
      subcategory: 'react-native',
      tags: ['mobile', 'ecommerce', 'ui-kit', 'shopping'],
      downloads: 2345,
      views: 10234,
      rating: 4.9,
      reviewCount: 89,
      featured: false,
      trending: true,
      isNew: true,
      isRequestOnly: false,
      state: 'available_for_request',
      requiresApproval: false,
      autoApprove: true,
      maxRequestsPerBuyer: 0,
      totalRequests: 0,
      pendingRequests: 0,
      approvedRequests: 0,
      rejectedRequests: 0,
      completedRequests: 0,
      createdAt: '2024-03-01',
      updatedAt: '2024-03-12'
    }
  ];

  useEffect(() => {
    loadProducts();
  }, [categorySlug, searchQuery, selectedSubcategories, priceRange, minRating, selectedTechStack, sortBy, currentPage]);

  const loadProducts = async () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      let filtered = mockProducts.filter(product => 
        product.category === categorySlug || 
        product.subcategory === categorySlug
      );

      // Apply filters
      if (searchQuery) {
        filtered = filtered.filter(product =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        );
      }

      if (selectedSubcategories.length > 0) {
        filtered = filtered.filter(product =>
          selectedSubcategories.some(sub => 
            (product.subcategory && product.subcategory === sub) || 
            product.techStack.some(tech => tech.toLowerCase().includes(sub.toLowerCase()))
          )
        );
      }

      if (priceRange[0] > 0 || priceRange[1] < 1000) {
        filtered = filtered.filter(product =>
          product.price >= priceRange[0] && product.price <= priceRange[1]
        );
      }

      if (minRating > 0) {
        filtered = filtered.filter(product => product.rating >= minRating);
      }

      if (selectedTechStack.length > 0) {
        filtered = filtered.filter(product =>
          selectedTechStack.some(tech =>
            product.techStack.some(productTech =>
              productTech.toLowerCase().includes(tech.toLowerCase())
            )
          )
        );
      }

      // Apply sorting
      filtered.sort((a, b) => {
        switch (sortBy) {
          case 'price-low':
            return a.price - b.price;
          case 'price-high':
            return b.price - a.price;
          case 'rating':
            return b.rating - a.rating;
          case 'newest':
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          case 'oldest':
            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          case 'name':
            return a.title.localeCompare(b.title);
          default: // popularity
            return b.downloads - a.downloads;
        }
      });

      setProducts(filtered);
      setLoading(false);
    }, 500);
  };

  const updateURL = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('search', searchQuery);
    if (selectedSubcategories.length > 0) params.set('subcategories', selectedSubcategories.join(','));
    if (priceRange[0] > 0) params.set('minPrice', priceRange[0].toString());
    if (priceRange[1] < 1000) params.set('maxPrice', priceRange[1].toString());
    if (minRating > 0) params.set('rating', minRating.toString());
    if (selectedTechStack.length > 0) params.set('tech', selectedTechStack.join(','));
    if (sortBy !== 'popularity') params.set('sort', sortBy);
    if (currentPage > 1) params.set('page', currentPage.toString());

    router.push(`/marketplace/categories/${categorySlug}${params.toString() ? `?${params.toString()}` : ''}`);
  };

  const handleSubcategoryChange = (subcategoryId: string, checked: boolean) => {
    if (checked) {
      setSelectedSubcategories(prev => [...prev, subcategoryId]);
    } else {
      setSelectedSubcategories(prev => prev.filter(id => id !== subcategoryId));
    }
  };

  const handleTechStackChange = (tech: string, checked: boolean) => {
    if (checked) {
      setSelectedTechStack(prev => [...prev, tech]);
    } else {
      setSelectedTechStack(prev => prev.filter(t => t !== tech));
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedSubcategories([]);
    setPriceRange([0, 1000]);
    setMinRating(0);
    setSelectedTechStack([]);
    setSortBy('popularity');
    setCurrentPage(1);
  };

  const formatCurrency = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(products.length / itemsPerPage);

  if (!categoryInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Category Not Found</h1>
          <p className="text-gray-600 mb-6">The requested category does not exist.</p>
          <Link href="/">
            <Button>Go Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <Link href="/marketplace" className="hover:text-blue-600">Marketplace</Link>
          <span>/</span>
          <Link href="/marketplace/categories" className="hover:text-blue-600">Categories</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">{categoryInfo.name}</span>
        </nav>

        {/* Category Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <span className="text-4xl">{categoryInfo.icon}</span>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{categoryInfo.name}</h1>
              <p className="text-gray-600 mt-1">{categoryInfo.description}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-64 space-y-6">
            <Card>
              <div className="p-4">
                {/* Search */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Search in {categoryInfo.name}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search products..."
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Subcategories */}
                {categoryInfo.subcategories.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Subcategories</h3>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {categoryInfo.subcategories.map((sub) => (
                        <label key={sub.id} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedSubcategories.includes(sub.id)}
                            onChange={(e) => handleSubcategoryChange(sub.id, e.target.checked)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm text-gray-600">
                            {sub.name} ({sub.count})
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Price Range */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Price Range</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                        placeholder="Min"
                        className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                      <span className="text-gray-500">to</span>
                      <input
                        type="number"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 1000])}
                        placeholder="Max"
                        className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Minimum Rating</h3>
                  <div className="space-y-2">
                    {[4, 3, 2, 1].map((rating) => (
                      <label key={rating} className="flex items-center">
                        <input
                          type="radio"
                          name="rating"
                          checked={minRating === rating}
                          onChange={() => setMinRating(rating)}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <div className="ml-2 flex items-center">
                          <Rating rating={rating} size="sm" showNumber={false} />
                          <span className="ml-1 text-sm text-gray-600">& up</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Technology Stack */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Technology Stack</h3>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {['React', 'Vue.js', 'Angular', 'Node.js', 'TypeScript', 'JavaScript', 'Python', 'PHP', 'Laravel', 'Django'].map((tech) => (
                      <label key={tech} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedTechStack.includes(tech)}
                          onChange={(e) => handleTechStackChange(tech, e.target.checked)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-600">{tech}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <Button variant="outline" onClick={clearFilters} className="w-full">
                  Clear All Filters
                </Button>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  {products.length} products found
                </span>
                {(searchQuery || selectedSubcategories.length > 0 || selectedTechStack.length > 0) && (
                  <div className="flex flex-wrap gap-2">
                    {searchQuery && (
                      <button className="cursor-pointer" onClick={() => setSearchQuery('')}>
                        <span className="inline-flex items-center rounded-full bg-blue-100 text-blue-800 px-3 py-1 text-sm">
                          Search: {searchQuery} ×
                        </span>
                      </button>
                    )}
                    {selectedSubcategories.map(sub => (
                      <button key={sub} className="cursor-pointer" onClick={() => handleSubcategoryChange(sub, false)}>
                        <span className="inline-flex items-center rounded-full bg-blue-100 text-blue-800 px-3 py-1 text-sm">
                          {categoryInfo.subcategories.find(s => s.id === sub)?.name} ×
                        </span>
                      </button>
                    ))}
                    {selectedTechStack.map(tech => (
                      <button key={tech} className="cursor-pointer" onClick={() => handleTechStackChange(tech, false)}>
                        <span className="inline-flex items-center rounded-full bg-blue-100 text-blue-800 px-3 py-1 text-sm">
                          {tech} ×
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-4">
                <SortOptions sortBy={sortBy} onSortChange={setSortBy as (v: string) => void} resultCount={products.length} />
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            <ProjectGrid 
              projects={paginatedProducts}
              loading={loading}
              variant={viewMode === 'grid' ? 'default' : 'compact'}
              columns={2}
            />

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2 mt-8">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                
                {[...Array(totalPages)].map((_, i) => {
                  const page = i + 1;
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 2 && page <= currentPage + 2)
                  ) {
                    return (
                      <Button
                        key={page}
                        variant={currentPage === page ? "primary" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </Button>
                    );
                  } else if (page === currentPage - 3 || page === currentPage + 3) {
                    return <span key={page} className="px-2 text-gray-500">...</span>;
                  }
                  return null;
                })}
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
 
