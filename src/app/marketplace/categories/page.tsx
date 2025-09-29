// market/src/app/categories/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

const categories = [
  {
    name: 'Web Templates',
    description: 'Modern, responsive website templates',
    href: '/marketplace/categories/web-templates',
    icon: '🌐',
    count: 45,
    subcategories: ['React', 'Vue', 'Angular']
  },
  {
    name: 'Mobile Apps',
    description: 'Cross-platform mobile applications',
    href: '/marketplace/categories/mobile-apps',
    icon: '📱',
    count: 32,
    subcategories: ['React Native', 'Flutter']
  },
  {
    name: 'Backend APIs',
    description: 'RESTful APIs and microservices',
    href: '/marketplace/categories/backend-apis',
    icon: '⚙️',
    count: 28,
    subcategories: ['Node.js', 'Python', 'Go']
  },
  {
    name: 'WordPress',
    description: 'Themes and plugins for WordPress',
    href: '/marketplace/categories/wordpress',
    icon: '📝',
    count: 67,
    subcategories: ['Themes', 'Plugins']
  },
  {
    name: 'UI/UX Kits',
    description: 'Design systems and component libraries',
    href: '/marketplace/categories/ui-ux-kits',
    icon: '🎨',
    count: 23,
    subcategories: ['Figma', 'Sketch', 'Adobe XD']
  },
  {
    name: 'Full Stack',
    description: 'Complete web applications',
    href: '/marketplace/categories/full-stack',
    icon: '🚀',
    count: 19,
    subcategories: ['MERN', 'LAMP', 'JAMstack']
  },
  {
    name: 'Landing Pages',
    description: 'High-converting landing page designs',
    href: '/marketplace/categories/landing-pages',
    icon: '🎯',
    count: 41,
    subcategories: ['SaaS', 'E-commerce', 'Portfolio']
  },
  {
    name: 'E-commerce',
    description: 'Online store solutions',
    href: '/marketplace/categories/ecommerce',
    icon: '🛒',
    count: 35,
    subcategories: ['Shopify', 'WooCommerce', 'Custom']
  },
  {
    name: 'Portfolio',
    description: 'Personal and professional portfolios',
    href: '/marketplace/categories/portfolio',
    icon: '💼',
    count: 18,
    subcategories: ['Personal', 'Agency', 'Creative']
  }
];

export default function CategoriesPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Browse by Category</h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
              Discover high‑quality projects and templates organized by category. Find exactly
              what you need for your next build.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <Link href="/marketplace/browse">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">Browse Projects</Button>
              </Link>
              <Link href="/marketplace/sell">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">Start Selling</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Toolbar */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-3 py-4">
            <span className="text-sm text-black">Quick filters:</span>
            {['All', 'Popular', 'New', 'Top Rated', 'On Sale'].map((f) => (
              <button key={f} className="px-3 py-1.5 text-sm rounded-full border border-gray-200 text-black hover:border-blue-300 hover:text-blue-600">
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Card key={category.name} hover className="h-full relative overflow-hidden group">
              {/* Accent background blob */}
              <div className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-blue-50 group-hover:bg-blue-100 transition-colors" />
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center text-2xl">
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-black group-hover:text-blue-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-black">{category.count} projects</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-black mb-4">
                  {category.description}
                </p>
                {category.subcategories && (
                  <div className="mb-5">
                    <p className="text-sm font-medium text-black mb-2">Popular subcategories:</p>
                    <div className="flex flex-wrap gap-2">
                      {category.subcategories.map((sub) => (
                        <span key={sub} className="px-2.5 py-1 text-xs bg-gray-100 text-black rounded-full">
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <Link href={category.href}>
                  <Button className="w-full group-hover:translate-y-[-1px] transition-transform">Browse {category.name}</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-gray-50 rounded-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-black mb-2">Marketplace Statistics</h2>
            <p className="text-black">Join thousands of developers who trust our marketplace</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-1">337</div>
              <div className="text-sm text-black">Total Projects</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-1">1.2K+</div>
              <div className="text-sm text-black">Active Developers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-1">4.8</div>
              <div className="text-sm text-black">Average Rating</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-1">98%</div>
              <div className="text-sm text-black">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

