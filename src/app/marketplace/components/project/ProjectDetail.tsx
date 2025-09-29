// market/src/components/project/ProjectDetail.tsx
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Project } from '../../types/project';
import { Card, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Rating } from '../ui/Rating';
import { TechStackTags } from './TechStackTags';
import { ContactSellerButton } from '../messaging/ContactSellerButton';
import { ProductPrice } from '@/components/ui/PriceDisplay';

interface ProjectDetailProps {
  project: Project;
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ project }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const licenseFeatures = {
    personal: ['Personal projects', 'Non-commercial use', 'Email support'],
    commercial: ['Commercial projects', 'Client work allowed', 'Priority support', 'Future updates'],
    extended: ['Multiple commercial projects', 'SaaS applications', 'Resale rights', 'Premium support'],
    'white-label': ['Remove attribution', 'Rebrand completely', 'Unlimited projects', 'Source code access']
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Demo */}
          <div className="lg:col-span-2">
            {/* Main Image */}
            <div className="relative aspect-video mb-6 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-2xl">
              <Image
                src={project.screenshots[selectedImage] || '/images/placeholder.jpg'}
                alt={project.title}
                fill
                className="object-cover transition-all duration-300"
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              
              {/* Demo Overlay */}
              {project.demoUrl && (
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-all duration-300 bg-gradient-to-br from-black/60 to-purple/40 backdrop-blur-sm">
                  <Link href={project.demoUrl} target="_blank">
                    <Button 
                      size="lg"
                      className="bg-white text-gray-900 hover:bg-gray-100 font-bold shadow-xl transform hover:scale-105 transition-all duration-200 px-8 py-4"
                    >
                      <svg className="w-6 h-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m-6-8h8a2 2 0 012 2v8a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2z" />
                      </svg>
                      View Live Demo
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {project.screenshots.length > 1 && (
              <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
                {project.screenshots.map((screenshot, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative flex-shrink-0 w-24 h-16 rounded-xl overflow-hidden border-3 transition-all duration-300 transform hover:scale-105 ${
                      selectedImage === index 
                        ? 'border-blue-500 shadow-lg ring-2 ring-blue-200' 
                        : 'border-gray-200 hover:border-gray-300 shadow-md'
                    }`}
                  >
                    <Image
                      src={screenshot}
                      alt={`Screenshot ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Project Info */}
            <Card className="shadow-2xl border-0 rounded-2xl bg-white">
              <CardContent className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      {project.featured && (
                        <Badge variant="warning" className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold shadow-lg">
                          ⭐ Featured
                        </Badge>
                      )}
                      {project.trending && (
                        <Badge variant="error" className="bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold shadow-lg animate-pulse">
                          🔥 Trending
                        </Badge>
                      )}
                      {project.isNew && (
                        <Badge variant="success" className="bg-gradient-to-r from-green-400 to-emerald-500 text-white font-semibold shadow-lg">
                          ✨ New
                        </Badge>
                      )}
                      {project.isRequestOnly && (
                        <Badge variant="info" className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow-lg">
                          📝 Request Only
                        </Badge>
                      )}
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">{project.title}</h1>
                    <p className="text-gray-700 text-lg leading-relaxed">{project.shortDescription}</p>
                  </div>
                  <div className="text-right ml-6 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
                    <ProductPrice amount={project.price} size="lg" showSymbol={true} showCode={false} />
                    <div className="text-sm text-gray-600 capitalize font-medium mt-2">{project.licenseType} license</div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-100">
                  <div className="text-center">
                    <Rating rating={project.rating} />
                    <p className="text-xs text-gray-600 mt-1 font-medium">
                      {project.reviewCount} reviews
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-gray-700">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                      </svg>
                      <span className="font-semibold">{project.views.toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">views</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-gray-700">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd"/>
                      </svg>
                      <span className="font-semibold">{project.downloads.toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">downloads</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl">⚡</div>
                    <p className="text-xs text-gray-600 mt-1">Premium</p>
                  </div>
                </div>

                {/* Request Stats (for request-only projects) */}
                {project.isRequestOnly && project.totalRequests > 0 && (
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl mb-8 border border-purple-100 shadow-lg">
                    <h4 className="font-bold text-purple-900 mb-4 text-lg flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
                      </svg>
                      Request Statistics
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-white rounded-lg shadow-sm border border-purple-100">
                        <div className="font-bold text-2xl text-purple-900">{project.totalRequests}</div>
                        <div className="text-purple-700 font-medium">Total Requests</div>
                      </div>
                      <div className="text-center p-4 bg-white rounded-lg shadow-sm border border-yellow-100">
                        <div className="font-bold text-2xl text-yellow-700">{project.pendingRequests}</div>
                        <div className="text-purple-700 font-medium">Pending</div>
                      </div>
                      <div className="text-center p-4 bg-white rounded-lg shadow-sm border border-green-100">
                        <div className="font-bold text-2xl text-green-700">{project.approvedRequests}</div>
                        <div className="text-purple-700 font-medium">Approved</div>
                      </div>
                      <div className="text-center p-4 bg-white rounded-lg shadow-sm border border-blue-100">
                        <div className="font-bold text-2xl text-blue-700">{project.completedRequests}</div>
                        <div className="text-purple-700 font-medium">Completed</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tech Stack */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4 text-gray-900 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                    </svg>
                    Technology Stack
                  </h3>
                  <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-xl border border-gray-100">
                    <TechStackTags techStack={project.techStack} />
                  </div>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4 text-gray-900 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z" clipRule="evenodd"/>
                    </svg>
                    Description
                  </h3>
                  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <div className="prose max-w-none">
                      <p className="text-gray-700 leading-relaxed text-base">
                        {showFullDescription ? project.description : `${project.description.slice(0, 300)}...`}
                      </p>
                      {project.description.length > 300 && (
                        <button
                          onClick={() => setShowFullDescription(!showFullDescription)}
                          className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold mt-4 transition-colors duration-200"
                        >
                          {showFullDescription ? (
                            <>
                              <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                              </svg>
                              Show Less
                            </>
                          ) : (
                            <>
                              <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                              Read More
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Technical Specifications */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-4 text-gray-900 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
                    </svg>
                    Technical Specifications
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                      <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                        <svg className="w-4 h-4 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm2 0v10h12V5H4z" clipRule="evenodd"/>
                        </svg>
                        Framework
                      </h4>
                      <p className="text-gray-700 font-medium">{project.framework || 'Not specified'}</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                      <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                        <svg className="w-4 h-4 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 11-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 11-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 112 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 110 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 110-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15.586 13H14a1 1 0 01-1-1z" clipRule="evenodd"/>
                        </svg>
                        Database
                      </h4>
                      <p className="text-gray-700 font-medium">{project.database || 'Not specified'}</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                      <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                        <svg className="w-4 h-4 mr-2 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 11-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd"/>
                        </svg>
                        Deployment
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.deployment.map(deploy => (
                          <Badge key={deploy} variant="default" size="sm" className="bg-gradient-to-r from-orange-50 to-red-50 text-orange-700 border border-orange-200">
                            {deploy}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                      <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                        <svg className="w-4 h-4 mr-2 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd"/>
                        </svg>
                        Browser Support
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.browserCompat.map(browser => (
                          <Badge key={browser} variant="info" size="sm" className="bg-gradient-to-r from-indigo-50 to-blue-50 text-indigo-700 border border-indigo-200">
                            {browser}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Purchase & Seller Info */}
          <div className="lg:col-span-1">
            {/* Purchase Card */}
            <Card className="sticky top-4 mb-6 shadow-2xl border-0 rounded-2xl bg-white z-10">
              <CardContent className="p-6">
                <div className="text-center mb-6 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
                  <ProductPrice amount={project.price} size="lg" showSymbol={true} showCode={false} />
                  <div className="text-sm text-gray-600 capitalize font-medium mt-2">{project.licenseType} License</div>
                </div>

                <div className="space-y-3 mb-6">
                  {project.isRequestOnly ? (
                    <>
                      <Link href={`/marketplace/requests/submit?projectId=${project.id}`}>
                        <Button 
                          className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200" 
                          size="lg"
                        >
                          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          Request Purchase
                        </Button>
                      </Link>
                      <div className="text-center bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-100">
                        <div className="flex items-center justify-center mb-2">
                          <svg className="w-5 h-5 text-purple-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clipRule="evenodd"/>
                          </svg>
                          <p className="font-bold text-purple-900">Request-Based Purchase</p>
                        </div>
                        <p className="text-sm text-purple-700">Submit a request to purchase this project. The seller will review and approve your request.</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <Button 
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200" 
                        size="lg"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m8.5-8v8a2 2 0 01-2 2H9a2 2 0 01-2-2v-8m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v.93" />
                        </svg>
                        Add to Cart
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full border-2 border-blue-200 hover:border-blue-300 text-blue-700 hover:text-blue-800 font-semibold hover:shadow-md transition-all duration-200"
                        size="lg"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Buy Now
                      </Button>
                    <Link href={`/marketplace/project/${project.id}/reviews`}>
                      <Button 
                        variant="outline" 
                        className="w-full border-2 border-gray-200 hover:border-gray-300 text-gray-700 hover:text-gray-900 font-semibold"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.449a1 1 0 00-.364 1.118l1.286 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.449a1 1 0 00-1.175 0l-3.37 2.449c-.784.57-1.838-.197-1.539-1.118l1.286-3.957a1 1 0 00-.364-1.118L4.063 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
                        </svg>
                        View Reviews
                      </Button>
                    </Link>
                    </>
                  )}
                  
                  {/* Coin Earning Info */}
                  {!project.isRequestOnly && (
                    <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-200 rounded-xl p-4 shadow-sm">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-md">
                          <span className="text-white text-lg font-bold">🪙</span>
                        </div>
                        <div>
                          <p className="font-bold text-yellow-800">Earn Coins</p>
                          <p className="text-sm text-yellow-700">
                            You'll earn <strong className="text-yellow-900">50 coins</strong> when you purchase!
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {project.demoUrl && (
                    <Link href={project.demoUrl} target="_blank">
                      <Button 
                        variant="ghost" 
                        className="w-full border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 hover:text-gray-900 font-semibold transition-all duration-200"
                        size="lg"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        View Live Demo
                      </Button>
                    </Link>
                  )}
                </div>

                {/* License Features */}
                <div className="border-t border-gray-100 pt-6">
                  <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    What's Included:
                  </h4>
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border border-green-100">
                    <ul className="space-y-3">
                      {licenseFeatures[project.licenseType]?.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <svg className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-700 font-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Additional Actions */}
                <div className="border-t border-gray-100 pt-6 mt-6">
                  <div className="grid grid-cols-2 gap-3">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="border border-gray-200 text-gray-700 hover:border-red-300 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      Wishlist
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="border border-gray-200 text-gray-700 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      Share
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Seller Info */}
            <Card className="shadow-2xl border-0 rounded-2xl bg-white relative z-20 mt-6">
              <CardContent className="p-6">
                <div className="flex items-center mb-6 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-100">
                  <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 mr-4 ring-4 ring-white shadow-lg">
                    {project.sellerAvatar && (
                      <Image
                        src={project.sellerAvatar}
                        alt={project.sellerName}
                        width={64}
                        height={64}
                        className="rounded-full object-cover"
                      />
                    )}
                    {/* Online indicator */}
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-3 border-white rounded-full shadow-lg"></div>
                  </div>
                  <div className="flex-1">
                    <Link href={`/marketplace/seller/${project.sellerId}`}>
                      <h3 className="font-bold text-gray-900 hover:text-blue-600 text-lg transition-colors duration-200">
                        {project.sellerName}
                      </h3>
                    </Link>
                    <p className="text-sm text-gray-600 font-medium">Premium Developer</p>
                    <div className="flex items-center mt-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                      <span className="text-xs text-green-600 font-medium">Online now</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 mb-6">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700 font-medium">Total Sales:</span>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 text-blue-600 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                        </svg>
                        <span className="font-bold text-blue-900">1,234</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-xl border border-yellow-100">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700 font-medium">Rating:</span>
                      <div className="flex items-center">
                        <Rating rating={4.9} size="sm" />
                        <span className="ml-2 font-bold text-orange-900">(4.9)</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-100">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700 font-medium">Response Time:</span>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 text-green-600 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                        </svg>
                        <span className="font-bold text-green-900">&lt; 2 hours</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link href={`/marketplace/seller/${project.sellerId}`}>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full border-2 border-gray-200 hover:border-gray-300 text-gray-700 hover:text-gray-900 font-semibold transition-all duration-200 hover:shadow-md"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      View Profile
                    </Button>
                  </Link>
                  <ContactSellerButton
                    seller={{
                      id: project.sellerId,
                      name: project.sellerName,
                      avatar: project.sellerAvatar || '/images/placeholder-avatar.jpg',
                      responseTime: '< 2 hours',
                      rating: 4.8,
                      isOnline: true
                    }}
                    project={{
                      id: project.id,
                      title: project.title,
                      thumbnail: project.screenshots[0] || '/images/placeholder.jpg',
                      price: project.price
                    }}
                    variant="ghost"
                    size="sm"
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};