"use client";

import React, { useState } from 'react';

export default function ServicesMarketplacePage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const services = [
    {
      id: 1,
      title: 'Professional Website Development',
      provider: 'Tech Solutions Inc',
      rating: 4.9,
      reviews: 127,
      price: '$2,500',
      category: 'web',
      image: 'from-blue-400 to-cyan-500',
    },
    {
      id: 2,
      title: 'Brand Identity & Logo Design',
      provider: 'Creative Studio',
      rating: 4.8,
      reviews: 94,
      price: '$500',
      category: 'design',
      image: 'from-purple-400 to-pink-500',
    },
    {
      id: 3,
      title: 'Digital Marketing Strategy',
      provider: 'Growth Marketing Co',
      rating: 4.7,
      reviews: 156,
      price: '$1,200',
      category: 'marketing',
      image: 'from-green-400 to-emerald-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="bg-white rounded-lg border border-gray-300 p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Services Marketplace</h1>
          <p className="text-gray-600 mb-4">Find trusted professionals to help grow your business</p>
          
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search services..."
              className="w-full px-4 py-3 pl-12 border border-gray-400 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {[
            { id: 'all', label: 'All Services' },
            { id: 'web', label: 'Web Development' },
            { id: 'design', label: 'Design' },
            { id: 'marketing', label: 'Marketing' },
            { id: 'consulting', label: 'Consulting' },
            { id: 'writing', label: 'Writing' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full font-semibold text-sm whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? 'bg-green-100 text-green-700'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service.id} className="bg-white rounded-lg border border-gray-300 overflow-hidden hover:shadow-lg transition-all cursor-pointer">
              <div className={`h-40 bg-gradient-to-br ${service.image}`}></div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 hover:text-blue-600">{service.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{service.provider}</p>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                    </svg>
                    <span className="text-sm font-semibold text-gray-900 ml-1">{service.rating}</span>
                  </div>
                  <span className="text-sm text-gray-600">({service.reviews} reviews)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900">{service.price}</span>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-all text-sm">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
