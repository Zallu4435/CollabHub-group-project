"use client";

import React, { useState } from 'react';
import Link from 'next/link';

const MarketplaceLandingPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // Mock data for categories
  const categories = [
    {
      id: 'tech',
      name: 'Technology',
      icon: '💻',
      description: 'Apps, websites, and digital solutions',
      itemCount: 2847,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'design',
      name: 'Design & Creative',
      icon: '🎨',
      description: 'Graphics, logos, and creative assets',
      itemCount: 3921,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'learning',
      name: 'Learning & Courses',
      icon: '📚',
      description: 'Educational content and tutorials',
      itemCount: 1534,
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'services',
      name: 'Services',
      icon: '🛠️',
      description: 'Professional services and consulting',
      itemCount: 2156,
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'marketing',
      name: 'Marketing',
      icon: '📢',
      description: 'Digital marketing and growth tools',
      itemCount: 1823,
      color: 'from-indigo-500 to-blue-500'
    },
    {
      id: 'business',
      name: 'Business Tools',
      icon: '💼',
      description: 'Templates, tools, and resources',
      itemCount: 2467,
      color: 'from-teal-500 to-green-500'
    }
  ];

  // Mock data for featured listings
  const featuredListings = [
    {
      id: 1,
      title: 'Complete React Dashboard Template',
      description: 'Modern, responsive admin dashboard with 50+ components',
      price: 89,
      originalPrice: 129,
      image: '/marketplace/dashboard.jpg',
      seller: {
        name: 'TechCrafters',
        avatar: '/avatars/techcrafters.jpg',
        level: 'Pro Seller',
        verified: true
      },
      rating: 4.9,
      reviews: 234,
      sales: 1847,
      tags: ['React', 'Dashboard', 'Admin'],
      badge: 'Best Seller',
      featured: true
    },
    {
      id: 2,
      title: 'Logo Design Service - Premium Package',
      description: '3 concepts, unlimited revisions, full ownership rights',
      price: 149,
      originalPrice: null,
      image: '/marketplace/logo-design.jpg',
      seller: {
        name: 'DesignMaster',
        avatar: '/avatars/designmaster.jpg',
        level: 'Top Rated',
        verified: true
      },
      rating: 5.0,
      reviews: 567,
      sales: 892,
      tags: ['Logo', 'Branding', 'Design'],
      badge: 'Choice',
      featured: true
    },
    {
      id: 3,
      title: 'Complete SEO Audit & Strategy',
      description: 'Comprehensive SEO analysis with actionable recommendations',
      price: 299,
      originalPrice: 399,
      image: '/marketplace/seo-audit.jpg',
      seller: {
        name: 'SEO Experts',
        avatar: '/avatars/seoexperts.jpg',
        level: 'Expert',
        verified: true
      },
      rating: 4.8,
      reviews: 123,
      sales: 445,
      tags: ['SEO', 'Marketing', 'Analysis'],
      badge: 'New',
      featured: true
    },
    {
      id: 4,
      title: 'Mobile App UI Kit - iOS & Android',
      description: '200+ screens, 15 app categories, Figma & Sketch files',
      price: 79,
      originalPrice: 119,
      image: '/marketplace/ui-kit.jpg',
      seller: {
        name: 'UICreative',
        avatar: '/avatars/uicreative.jpg',
        level: 'Rising Talent',
        verified: false
      },
      rating: 4.7,
      reviews: 89,
      sales: 267,
      tags: ['UI Kit', 'Mobile', 'Design'],
      badge: null,
      featured: false
    }
  ];

  // Mock data for top sellers
  const topSellers = [
    {
      id: 1,
      name: 'Alex Rodriguez',
      avatar: '/avatars/alex-seller.jpg',
      specialty: 'Full Stack Development',
      rating: 4.9,
      completedOrders: 2847,
      badges: ['Top Rated Plus', 'Pro Verified'],
      earning: 'Earned $50K+ this year'
    },
    {
      id: 2,
      name: 'Sarah Kim',
      avatar: '/avatars/sarah-seller.jpg',
      specialty: 'UI/UX Design',
      rating: 5.0,
      completedOrders: 1923,
      badges: ['Design Expert', 'Verified'],
      earning: 'Earned $35K+ this year'
    },
    {
      id: 3,
      name: 'Michael Chen',
      avatar: '/avatars/michael-seller.jpg',
      specialty: 'Digital Marketing',
      rating: 4.8,
      completedOrders: 3156,
      badges: ['Marketing Pro', 'Verified'],
      earning: 'Earned $42K+ this year'
    }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="text-xl font-semibold text-gray-900">MarketHub</span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/browse" className="text-gray-600 hover:text-gray-900 font-medium">Browse</Link>
              <Link href="/sell" className="text-gray-600 hover:text-gray-900 font-medium">Start Selling</Link>
              <Link href="/how-it-works" className="text-gray-600 hover:text-gray-900 font-medium">How it Works</Link>
              <Link href="/support" className="text-gray-600 hover:text-gray-900 font-medium">Support</Link>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Discover. <span className="text-yellow-300">Trade.</span> Grow.
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-purple-100">
            The marketplace where creativity meets opportunity. Buy and sell digital products, services, and more.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mb-8">
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-12 pr-4 py-4 border-0 rounded-2xl text-gray-900 placeholder-gray-500 text-lg focus:ring-4 focus:ring-white focus:ring-opacity-25 shadow-xl"
                placeholder="Search projects, products, or services..."
              />
              <button
                type="submit"
                className="absolute inset-y-0 right-0 flex items-center pr-4"
              >
                <div className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-xl font-semibold transition-colors">
                  Search
                </div>
              </button>
            </div>
          </form>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/sell">
              <button className="px-8 py-4 bg-yellow-400 text-purple-900 font-bold text-lg rounded-2xl hover:bg-yellow-300 transform hover:scale-105 transition-all duration-200 shadow-xl">
                Start Selling Today
              </button>
            </Link>
            <Link href="/browse">
              <button className="px-8 py-4 bg-white bg-opacity-20 text-white font-semibold text-lg rounded-2xl hover:bg-opacity-30 backdrop-blur-sm transition-all duration-200 border border-white border-opacity-30">
                Browse Marketplace
              </button>
            </Link>
          </div>

          <div className="mt-8 flex items-center justify-center space-x-8 text-sm text-purple-100">
            <div className="flex items-center">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              50K+ Active Listings
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2 animate-pulse"></span>
              15K+ Sellers Worldwide
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></span>
              $2M+ in Sales Monthly
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Showcase */}
        <div className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Explore Categories</h2>
            <p className="text-lg text-gray-600">Find exactly what you're looking for in our diverse marketplace</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link key={category.id} href={`/category/${category.id}`}>
                <div className="group bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 cursor-pointer">
                  <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 mb-3">{category.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{category.itemCount.toLocaleString()} items</span>
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Featured Listings */}
        <div className="py-16 bg-white rounded-3xl shadow-sm mb-16">
          <div className="px-8">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Featured Listings</h2>
                <p className="text-lg text-gray-600">Top-rated products and services from our marketplace</p>
              </div>
              <Link href="/featured">
                <button className="px-6 py-3 border border-purple-200 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors">
                  View All Featured
                </button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredListings.map((listing) => (
                <div key={listing.id} className="group bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="relative">
                    <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                      {listing.badge && (
                        <div className={`absolute top-3 left-3 px-2 py-1 text-xs font-semibold rounded-full z-10 ${
                          listing.badge === 'Best Seller' ? 'bg-orange-100 text-orange-800' :
                          listing.badge === 'Choice' ? 'bg-purple-100 text-purple-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {listing.badge}
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                    <button className="absolute top-3 right-3 p-2 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100 transition-all">
                      <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                      <div>
                        <div className="flex items-center space-x-1">
                          <span className="text-sm font-medium text-gray-900">{listing.seller.name}</span>
                          {listing.seller.verified && (
                            <svg className="w-3 h-3 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <span className="text-xs text-gray-500">{listing.seller.level}</span>
                      </div>
                    </div>

                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
                      {listing.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{listing.description}</p>

                    <div className="flex items-center space-x-1 mb-3">
                      <div className="flex items-center">
                        <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-sm font-medium text-gray-900 ml-1">{listing.rating}</span>
                      </div>
                      <span className="text-sm text-gray-500">({listing.reviews})</span>
                      <span className="text-sm text-gray-400">•</span>
                      <span className="text-sm text-gray-500">{listing.sales} sales</span>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {listing.tags.slice(0, 2).map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {listing.originalPrice && (
                          <span className="text-sm text-gray-400 line-through">${listing.originalPrice}</span>
                        )}
                        <span className="text-lg font-bold text-gray-900">${listing.price}</span>
                      </div>
                      <button className="px-4 py-2 bg-purple-600 text-white text-sm font-semibold rounded-lg hover:bg-purple-700 transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Seller Highlights */}
        <div className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Top Sellers</h2>
            <p className="text-lg text-gray-600">Meet our most successful creators and service providers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {topSellers.map((seller) => (
              <div key={seller.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 text-center hover:shadow-lg transition-all duration-300">
                <div className="relative inline-block mb-4">
                  <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto"></div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{seller.name}</h3>
                <p className="text-gray-600 mb-3">{seller.specialty}</p>
                
                <div className="flex items-center justify-center space-x-1 mb-3">
                  <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-900">{seller.rating}</span>
                  <span className="text-sm text-gray-500">({seller.completedOrders} orders)</span>
                </div>
                
                <div className="flex flex-wrap justify-center gap-1 mb-3">
                  {seller.badges.map((badge, index) => (
                    <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full font-medium">
                      {badge}
                    </span>
                  ))}
                </div>
                
                <p className="text-sm text-green-600 font-medium mb-4">{seller.earning}</p>
                
                <button className="w-full py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                  View Profile
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Trust & Security Section */}
        <div className="py-16 bg-gray-100 rounded-3xl mb-16">
          <div className="px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose MarketHub?</h2>
            <p className="text-lg text-gray-600 mb-12">Your security and success are our top priorities</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure Payments</h3>
                <p className="text-gray-600">Protected transactions with escrow service and money-back guarantee</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Verified Sellers</h3>
                <p className="text-gray-600">All sellers go through identity verification and skill assessment</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 110 19.5 9.75 9.75 0 010-19.5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">24/7 Support</h3>
                <p className="text-gray-600">Round-the-clock customer support to help resolve any issues</p>
              </div>
            </div>

            <div className="mt-12 flex items-center justify-center space-x-8">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-200 rounded"></div>
                <span className="text-sm text-gray-600">SSL Secured</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-200 rounded"></div>
                <span className="text-sm text-gray-600">GDPR Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-200 rounded"></div>
                <span className="text-sm text-gray-600">PCI DSS</span>
              </div>
            </div>
          </div>
        </div>

        {/* Flash Sales Section */}
        <div className="py-16">
          <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-3xl p-8 text-white text-center relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm font-semibold">
              ⏰ Limited Time
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Flash Sale - 48 Hours Only!</h2>
            <p className="text-xl mb-6 text-red-100">Up to 70% off on premium digital products and services</p>
            
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold">23</div>
                <div className="text-sm">Hours</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold">45</div>
                <div className="text-sm">Minutes</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold">12</div>
                <div className="text-sm">Seconds</div>
              </div>
            </div>
            
            <button className="px-8 py-4 bg-white text-red-600 font-bold text-lg rounded-2xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-xl">
              Shop Flash Sale
            </button>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Ready to Join MarketHub?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Whether you're looking to buy amazing products or start selling your own creations, we've got everything you need to succeed.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link href="/register/buyer">
              <button className="px-8 py-4 bg-purple-600 text-white font-semibold text-lg rounded-2xl hover:bg-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg">
                Start Buying
              </button>
            </Link>
            <Link href="/register/seller">
              <button className="px-8 py-4 bg-yellow-400 text-purple-900 font-semibold text-lg rounded-2xl hover:bg-yellow-300 transform hover:scale-105 transition-all duration-200 shadow-lg">
                Start Selling
              </button>
            </Link>
          </div>
          
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-600">
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Free to join
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              No listing fees
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Secure payments
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Global reach
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceLandingPage;
