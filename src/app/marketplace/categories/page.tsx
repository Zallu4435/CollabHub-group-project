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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-black mb-4">
          Browse by Category
        </h1>
        <p className="text-xl text-black max-w-3xl mx-auto">
          Discover high-quality projects and templates organized by category. 
          Find exactly what you need for your next development project.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Card key={category.name} hover className="h-full">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <span className="text-3xl">{category.icon}</span>
                <div>
                  <h3 className="text-xl font-semibold text-black">
                    {category.name}
                  </h3>
                  <p className="text-sm text-black">
                    {category.count} projects
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-black mb-4">
                {category.description}
              </p>
              
              {category.subcategories && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-black mb-2">
                    Popular subcategories:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {category.subcategories.map((sub) => (
                      <span
                        key={sub}
                        className="px-2 py-1 text-xs bg-gray-100 text-black rounded-full"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              <Link href={category.href}>
                <Button className="w-full">
                  Browse {category.name}
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Stats Section */}
      <div className="mt-16 bg-gray-50 rounded-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-black mb-2">
            Marketplace Statistics
          </h2>
          <p className="text-black">
            Join thousands of developers who trust our marketplace
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">337</div>
            <div className="text-sm text-black">Total Projects</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">1.2K+</div>
            <div className="text-sm text-black">Active Developers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">4.8</div>
            <div className="text-sm text-black">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">98%</div>
            <div className="text-sm text-black">Satisfaction Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
}

