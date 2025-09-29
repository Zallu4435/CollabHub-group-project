'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { sellersApi, projectsApi } from '../../lib/utils/api';
import { Project } from '../../types/project';
import { SellerProfile } from '../../components/user/SellerProfile';
import { ProjectGrid } from '../../components/project/ProjectGrid';
import { Breadcrumb } from '../../components/layout/Breadcrumb';

export default function SellerProfilePage() {
  const params = useParams();
  const sellerId = params.id as string;
  
  const [seller, setSeller] = useState<any>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'projects' | 'about' | 'reviews'>('projects');

  const fetchSeller = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await sellersApi.getProfile(sellerId);
      setSeller(response.data);
    } catch (err) {
      setError('Seller not found');
      console.error('Error fetching seller:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSellerProjects = async () => {
    try {
      const response = await sellersApi.getProjects(sellerId);
      setProjects(response.data);
    } catch (err) {
      console.error('Error fetching seller projects:', err);
    }
  };

  useEffect(() => {
    if (sellerId) {
      fetchSeller();
      fetchSellerProjects();
    }
  }, [sellerId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 mx-auto"></div>
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent absolute top-0 left-1/2 transform -translate-x-1/2"></div>
          </div>
          <p className="mt-6 text-gray-600 font-medium">Loading seller profile...</p>
        </div>
      </div>
    );
  }

  if (error || !seller) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg max-w-md mx-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Seller Not Found</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Marketplace', href: '/marketplace' },
    { label: 'Sellers', href: '/marketplace/sellers' },
    { label: seller.displayName || seller.name, href: `/marketplace/seller/${seller.id}` }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Enhanced Breadcrumb Section */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Enhanced Seller Profile Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <SellerProfile seller={seller} />
        </div>
        
        {/* Enhanced Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="border-b border-gray-200 bg-gray-50">
            <nav className="flex space-x-0">
              {[
                { key: 'projects', label: `Projects (${projects.length})`, icon: '📁' },
                { key: 'about', label: 'About', icon: '👤' },
                { key: 'reviews', label: 'Reviews', icon: '⭐' }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`flex-1 py-4 px-6 text-center font-medium text-sm transition-all duration-300 relative ${
                    activeTab === tab.key
                      ? 'bg-white text-blue-600 shadow-sm border-b-2 border-blue-500'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <span className="inline-flex items-center space-x-2">
                    <span className="text-lg">{tab.icon}</span>
                    <span>{tab.label}</span>
                  </span>
                </button>
              ))}
            </nav>
          </div>

          {/* Enhanced Tab Content */}
          <div className="p-8">
            {activeTab === 'projects' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {(seller.displayName || seller.name)}'s Projects
                    </h3>
                    <p className="text-gray-600 mt-1">
                      Explore {projects.length} amazing project{projects.length !== 1 ? 's' : ''} 
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <span>Grid View</span>
                  </div>
                </div>
                
                <div className="border-t border-gray-100 pt-6">
                  <ProjectGrid
                    projects={projects}
                    loading={false}
                  />
                </div>
              </div>
            )}

            {activeTab === 'about' && (
              <div className="space-y-8">
                <div className="text-center pb-8 border-b border-gray-100">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    About {seller.displayName || seller.name}
                  </h3>
                  <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
                    {seller.bio}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Personal Information Card */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                    <h4 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                      <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </span>
                      Personal Information
                    </h4>
                    
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-5 h-5 text-gray-400 mt-0.5">
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">Location</p>
                          <p className="text-gray-900">{seller.location}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="w-5 h-5 text-gray-400 mt-0.5">
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4M3 13.188V6a1 1 0 011-1h16a1 1 0 011 1v7.188a2 2 0 01-.586 1.414L12 21l-8.414-6.398A2 2 0 013 13.188z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">Member Since</p>
                          <p className="text-gray-900">
                            {new Date(seller.joinDate).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                      
                      {seller.website && (
                        <div className="flex items-start space-x-3">
                          <div className="w-5 h-5 text-gray-400 mt-0.5">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700">Website</p>
                            <a
                              href={seller.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 font-medium hover:underline transition-colors"
                            >
                              {seller.website}
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Skills & Expertise Card */}
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
                    <h4 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                      <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </span>
                      Skills & Expertise
                    </h4>
                    
                    <div className="space-y-6">
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-3">Languages</p>
                        <div className="flex flex-wrap gap-2">
                          {(seller.languages || ['English']).map((lang: string) => (
                            <span
                              key={lang}
                              className="px-3 py-1.5 bg-blue-100 text-blue-800 text-sm font-medium rounded-full border border-blue-200"
                            >
                              {lang}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-3">Specialties</p>
                        <div className="flex flex-wrap gap-2">
                          {(seller.specialties || ['General']).map((specialty: string) => (
                            <span
                              key={specialty}
                              className="px-3 py-1.5 bg-green-100 text-green-800 text-sm font-medium rounded-full border border-green-200"
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Reviews Coming Soon</h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  Reviews and ratings for {seller.displayName || seller.name}'s projects will be displayed here once available.
                </p>
                <div className="mt-6">
                  <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-lg">
                    Be the First to Review
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
