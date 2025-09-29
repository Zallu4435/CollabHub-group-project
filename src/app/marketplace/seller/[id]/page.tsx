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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-black">Loading seller profile...</p>
        </div>
      </div>
    );
  }

  if (error || !seller) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-lg font-medium mb-4">{error}</div>
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumb items={breadcrumbItems} />
                  </div>
              </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SellerProfile seller={seller} />
        
        {/* Tabs */}
        <div className="mt-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('projects')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'projects'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-black hover:text-black hover:border-gray-300'
                }`}
              >
                Projects ({projects.length})
              </button>
              <button
                onClick={() => setActiveTab('about')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'about'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-black hover:text-black hover:border-gray-300'
                }`}
              >
                About
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'reviews'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-black hover:text-black hover:border-gray-300'
                }`}
              >
                Reviews
              </button>
            </nav>
                </div>

          {/* Tab Content */}
          <div className="mt-8">
            {activeTab === 'projects' && (
                  <div>
                <h3 className="text-lg font-semibold text-black mb-6">
                  {(seller.displayName || seller.name)}'s Projects
                </h3>
                <ProjectGrid
                  projects={projects}
                  loading={false}
                />
              </div>
            )}

            {activeTab === 'about' && (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-black mb-4">About {seller.displayName || seller.name}</h3>
                <div className="prose max-w-none">
                  <p className="text-black mb-4">{seller.bio}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <h4 className="font-medium text-black mb-2">Location</h4>
                      <p className="text-black">{seller.location}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-black mb-2">Member Since</h4>
                      <p className="text-black">
                        {new Date(seller.joinDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-black mb-2">Languages</h4>
                      <div className="flex flex-wrap gap-2">
                        {(seller.languages || []).map((lang: string) => (
                          <span
                            key={lang}
                            className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                          >
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-black mb-2">Specialties</h4>
                      <div className="flex flex-wrap gap-2">
                        {(seller.specialties || []).map((specialty: string) => (
                          <span
                            key={specialty}
                            className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded-full"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {seller.website && (
                    <div className="mt-6">
                      <h4 className="font-medium text-black mb-2">Website</h4>
                      <a
                        href={seller.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        {seller.website}
                      </a>
                    </div>
                  )}
          </div>
        </div>
      )}

      {activeTab === 'reviews' && (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-black mb-4">Reviews</h3>
                <p className="text-black">Reviews for {seller.displayName || seller.name}'s projects will be displayed here.</p>
              </div>
            )}
          </div>
        </div>
        </div>
    </div>
  );
}