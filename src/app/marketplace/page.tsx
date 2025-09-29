'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/app/marketplace/components/ui/Button';
import { ProjectGrid } from '@/app/marketplace/components/project/ProjectGrid';
import { projectsApi } from '@/app/marketplace/lib/utils/api';
import { Project } from '@/app/marketplace/types/project';

export default function MarketplacePage() {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [trendingProjects, setTrendingProjects] = useState<Project[]>([]);
  const [newProjects, setNewProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        const [featuredResponse, trendingResponse, newResponse] = await Promise.all([
          projectsApi.getFeatured(),
          projectsApi.getTrending(),
          projectsApi.getAll({ sort: 'newest', limit: 8 })
        ]);
        
        setFeaturedProjects(featuredResponse.data);
        setTrendingProjects(trendingResponse.data);
        setNewProjects(newResponse.data.projects);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              The Developer Marketplace
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Buy and sell high-quality code templates, projects, and developer resources. 
              From React apps to mobile templates, find everything you need to build faster.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/marketplace/browse">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Browse Projects
              </Button>
            </Link>
            <Link href="/marketplace/sell">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                Start Selling
              </Button>
            </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-black">2.5K+</div>
              <div className="text-black">Projects</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-black">850+</div>
              <div className="text-black">Developers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-black">15K+</div>
              <div className="text-black">Downloads</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-black">4.9★</div>
              <div className="text-black">Avg Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-black">Featured Projects</h2>
              <p className="text-black mt-2">Hand-picked premium templates and projects</p>
            </div>
            <Link href="/marketplace/browse?featured=true">
              <Button variant="outline">View All Featured</Button>
            </Link>
          </div>
          <ProjectGrid 
            projects={featuredProjects} 
            loading={loading}
            onProjectClick={(project) => {
              window.location.href = `/marketplace/project/${project.id}`;
            }}
          />
        </div>
      </section>

      {/* Trending Projects */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-black">🔥 Trending This Week</h2>
              <p className="text-black mt-2">Most popular projects among developers</p>
            </div>
            <Link href="/marketplace/browse?trending=true">
              <Button variant="outline">View All Trending</Button>
            </Link>
          </div>
          <ProjectGrid 
            projects={trendingProjects} 
            loading={loading}
            onProjectClick={(project) => {
              window.location.href = `/marketplace/project/${project.id}`;
            }}
          />
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black">Browse by Category</h2>
            <p className="text-black mt-2">Find exactly what you're looking for</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { name: 'Web Templates', icon: '🌐', href: '/marketplace/categories/web-templates', count: '245' },
              { name: 'Mobile Apps', icon: '📱', href: '/marketplace/categories/mobile-apps', count: '156' },
              { name: 'Backend APIs', icon: '⚙️', href: '/marketplace/categories/backend-apis', count: '98' },
              { name: 'UI/UX Kits', icon: '🎨', href: '/marketplace/categories/ui-ux-kits', count: '167' },
              { name: 'Full Stack', icon: '🚀', href: '/marketplace/categories/full-stack', count: '134' }
            ].map((category) => (
              <Link key={category.name} href={category.href}>
                <div className="bg-white rounded-lg border border-gray-200 p-6 text-center hover:shadow-lg transition-shadow group">
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <h3 className="font-semibold text-black group-hover:text-blue-600">
                    {category.name}
                  </h3>
                  <p className="text-sm text-black mt-1">{category.count} projects</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* New Projects */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-black">✨ New Arrivals</h2>
              <p className="text-black mt-2">Fresh projects added this month</p>
            </div>
            <Link href="/marketplace/browse?new=true">
              <Button variant="outline">View All New</Button>
            </Link>
          </div>
          <ProjectGrid 
            projects={newProjects} 
            loading={loading}
            onProjectClick={(project) => {
              window.location.href = `/marketplace/project/${project.id}`;
            }}
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Selling Your Projects?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of developers earning money from their code. 
            Upload your project and start earning today.
          </p>
          <Link href="/marketplace/sell">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Start Selling Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
