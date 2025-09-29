// market/src/app/categories/[category]/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Rating } from '../../components/ui/Rating';

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  thumbnail: string;
  images: string[];
  category: string;
  subcategories: string[];
  techStack: string[];
  sellerId: string;
  sellerName: string;
  sellerAvatar: string;
  isFeatured: boolean;
  isNew: boolean;
  sales: number;
  createdAt: string;
  updatedAt: string;
  demoUrl?: string;
  tags: string[];
}

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

  const [products, setProducts] = useState<Product[]>([]);
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
  const mockProducts: Product[] = [
    {
      id: '1',
      title: 'Modern React Dashboard Template',
      description: 'A comprehensive admin dashboard built with React, TypeScript, and Tailwind CSS. Features responsive design, dark mode, and 50+ components.',
      price: 79.99,
      originalPrice: 99.99,
      rating: 4.8,
      reviewCount: 124,
      thumbnail: '/images/products/react-dashboard-thumb.jpg',
      images: ['/images/products/react-dashboard-1.jpg', '/images/products/react-dashboard-2.jpg'],
      category: 'web-templates',
      subcategories: ['react', 'dashboard'],
      techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
      sellerId: 'seller1',
      sellerName: 'Sarah Johnson',
      sellerAvatar: '/images/avatars/sarah.jpg',
      isFeatured: true,
      isNew: false,
      sales: 456,
      createdAt: '2024-01-15',
      updatedAt: '2024-03-10',
      demoUrl: 'https://demo.example.com/react-dashboard',
      tags: ['dashboard', 'admin', 'responsive', 'dark-mode']
    },
    {
      id: '2',
      title: 'E-commerce Mobile App UI Kit',
      description: 'Complete mobile app design with 80+ screens for iOS and Android. Built with React Native and Expo.',
      price: 129.99,
      rating: 4.9,
      reviewCount: 89,
      thumbnail: '/images/products/mobile-ecommerce-thumb.jpg',
      images: ['/images/products/mobile-ecommerce-1.jpg'],
      category: 'mobile-apps',
      subcategories: ['react-native', 'ecommerce'],
      techStack: ['React Native', 'Expo', 'TypeScript'],
      sellerId: 'seller2',
      sellerName: 'Alex Chen',
      sellerAvatar: '/images/avatars/alex.jpg',
      isFeatured: false,
      isNew: true,
      sales: 234,
      createdAt: '2024-03-01',
      updatedAt: '2024-03-12',
      demoUrl: 'https://demo.example.com/mobile-ecommerce',
      tags: ['mobile', 'ecommerce', 'ui-kit', 'shopping']
    },
    // Add more mock products as needed...
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
        product.subcategories.includes(categorySlug)
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
            product.subcategories.includes(sub) || 
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
            return b.sales - a.sales;
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

    router.push(`/categories/${categorySlug}${params.toString() ? `?${params.toString()}` : ''}`);
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
    <div className="min-h-screen bg-gray-50">
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
                      <Badge variant="info" className="cursor-pointer" onClick={() => setSearchQuery('')}>
                        Search: {searchQuery} ×
                      </Badge>
                    )}
                    {selectedSubcategories.map(sub => (
                      <Badge key={sub} variant="info" className="cursor-pointer" onClick={() => handleSubcategoryChange(sub, false)}>
                        {categoryInfo.subcategories.find(s => s.id === sub)?.name} ×
                      </Badge>
                    ))}
                    {selectedTechStack.map(tech => (
                      <Badge key={tech} variant="info" className="cursor-pointer" onClick={() => handleTechStackChange(tech, false)}>
                        {tech} ×
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-1 text-sm"
                  >
                    <option value="popularity">Popularity</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="name">Name: A-Z</option>
                  </select>
                </div>
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
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <div className="aspect-video bg-gray-200 rounded-t-lg"></div>
                    <CardContent className="p-4">
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded mb-4"></div>
                      <div className="flex items-center justify-between">
                        <div className="h-4 bg-gray-200 rounded w-16"></div>
                        <div className="h-4 bg-gray-200 rounded w-12"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your filters or search terms to find what you're looking for.
                </p>
                <Button variant="outline" onClick={clearFilters}>
                  Clear All Filters
                </Button>
              </div>
            ) : (
              <>
                <div className={viewMode === 'grid' 
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
                  : 'space-y-4'
                }>
                  {paginatedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} viewMode={viewMode} />
                  ))}
                </div>

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
                            variant={currentPage === page ? "default" : "outline"}
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
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Product Card Component
interface ProductCardProps {
  product: Product;
  viewMode: 'grid' | 'list';
}

const ProductCard: React.FC<ProductCardProps> = ({ product, viewMode }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const formatCurrency = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log('Added to cart:', product.id);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsWishlisted(!isWishlisted);
  };

  if (viewMode === 'list') {
    return (
      <Card className="hover:shadow-lg transition-shadow">
        <CardContent className="p-0">
          <div className="flex">
            <div className="w-48 h-32 relative">
              <Image
                src={product.thumbnail}
                alt={product.title}
                fill
                className="object-cover rounded-l-lg"
              />
              {product.isNew && (
                <Badge className="absolute top-2 left-2" variant="success">New</Badge>
              )}
              {product.isFeatured && (
                <Badge className="absolute top-2 right-2" variant="warning">Featured</Badge>
              )}
            </div>
            <div className="flex-1 p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <Link href={`/project/${product.id}`}>
                    <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 mb-1">
                      {product.title}
                    </h3>
                  </Link>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-2">
                    {product.description}
                  </p>
                  <div className="flex items-center space-x-2 mb-2">
                    <Link href={`/marketplace/seller/${product.sellerId}`}>
                      <div className="flex items-center space-x-2 hover:text-blue-600">
                        <Image
                          src={product.sellerAvatar}
                          alt={product.sellerName}
                          width={20}
                          height={20}
                          className="rounded-full"
                        />
                        <span className="text-sm text-gray-600">{product.sellerName}</span>
                      </div>
                    </Link>
                    <div className="flex items-center space-x-1">
                      <Rating rating={product.rating} size="sm" showNumber={false} />
                      <span className="text-sm text-gray-600">({product.reviewCount})</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {product.techStack.slice(0, 3).map((tech) => (
                      <Badge key={tech} variant="default" size="sm">
                        {tech}
                      </Badge>
                    ))}
                    {product.techStack.length > 3 && (
                      <Badge variant="default" size="sm">
                        +{product.techStack.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="text-right ml-4">
                  <div className="mb-2">
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through mr-2">
                        {formatCurrency(product.originalPrice)}
                      </span>
                    )}
                    <span className="text-lg font-bold text-gray-900">
                      {formatCurrency(product.price)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button size="sm" onClick={handleAddToCart}>
                      Add to Cart
                    </Button>
                    <button
                      onClick={handleToggleWishlist}
                      className={`p-2 rounded-full ${
                        isWishlisted ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                      }`}
                    >
                      <svg className="w-4 h-4" fill={isWishlisted ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                    {product.demoUrl && (
                      <Link href={product.demoUrl} target="_blank">
                        <Button variant="outline" size="sm">
                          <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          Preview
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-200">
      <div className="relative">
        <div className="aspect-video relative overflow-hidden rounded-t-lg">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-200"
          />
          {product.isNew && (
            <Badge className="absolute top-2 left-2" variant="success">New</Badge>
          )}
          {product.isFeatured && (
            <Badge className="absolute top-2 right-2" variant="warning">Featured</Badge>
          )}
          
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-2">
              <Link href={`/project/${product.id}`}>
                <Button size="sm" className="bg-white text-gray-900 hover:bg-gray-100">
                  View Details
                </Button>
              </Link>
              {product.demoUrl && (
                <Link href={product.demoUrl} target="_blank">
                  <Button variant="outline" size="sm" className="bg-white border-white text-gray-900 hover:bg-gray-100">
                    Preview
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
        
        <button
          onClick={handleToggleWishlist}
          className={`absolute top-2 right-2 p-2 rounded-full bg-white shadow-sm ${
            isWishlisted ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
          } transition-colors`}
        >
          <svg className="w-4 h-4" fill={isWishlisted ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>
      
      <CardContent className="p-4">
        <div className="mb-2">
          <Link href={`/project/${product.id}`}>
            <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 mb-1 line-clamp-1">
              {product.title}
            </h3>
          </Link>
          <p className="text-gray-600 text-sm line-clamp-2 mb-2">
            {product.description}
          </p>
        </div>

        <div className="flex items-center space-x-2 mb-3">
          <Link href={`/marketplace/seller/${product.sellerId}`}>
            <div className="flex items-center space-x-2 hover:text-blue-600">
              <Image
                src={product.sellerAvatar}
                alt={product.sellerName}
                width={20}
                height={20}
                className="rounded-full"
              />
              <span className="text-sm text-gray-600">{product.sellerName}</span>
            </div>
          </Link>
        </div>

        <div className="flex items-center space-x-2 mb-3">
          <Rating rating={product.rating} size="sm" showNumber={false} />
          <span className="text-sm text-gray-600">({product.reviewCount})</span>
          <span className="text-sm text-gray-400">•</span>
          <span className="text-sm text-gray-600">{product.sales} sales</span>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {product.techStack.slice(0, 2).map((tech) => (
            <Badge key={tech} variant="default" size="sm">
              {tech}
            </Badge>
          ))}
          {product.techStack.length > 2 && (
            <Badge variant="default" size="sm">
              +{product.techStack.length - 2}
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through mr-2">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
            <span className="text-lg font-bold text-gray-900">
              {formatCurrency(product.price)}
            </span>
          </div>
          <Button size="sm" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
