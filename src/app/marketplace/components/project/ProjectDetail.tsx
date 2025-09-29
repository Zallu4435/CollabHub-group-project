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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Images and Demo */}
        <div className="lg:col-span-2">
          {/* Main Image */}
          <div className="relative aspect-video mb-4 rounded-lg overflow-hidden bg-gray-100">
            <Image
              src={project.screenshots[selectedImage] || '/images/placeholder.jpg'}
              alt={project.title}
              fill
              className="object-cover"
            />
            
            {/* Demo Overlay */}
            {project.demoUrl && (
              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/50">
                <Link href={project.demoUrl} target="_blank">
                  <Button size="lg">
                    <svg className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
            <div className="flex gap-2 mb-6 overflow-x-auto">
              {project.screenshots.map((screenshot, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative flex-shrink-0 w-20 h-12 rounded-md overflow-hidden border-2 ${
                    selectedImage === index ? 'border-blue-500' : 'border-gray-200'
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
          <Card>
            <CardContent>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    {project.featured && <Badge variant="warning">Featured</Badge>}
                    {project.trending && <Badge variant="error">🔥 Trending</Badge>}
                    {project.isNew && <Badge variant="success">✨ New</Badge>}
                    {project.isRequestOnly && <Badge variant="info">📝 Request Only</Badge>}
                  </div>
                  <h1 className="text-3xl font-bold text-black mb-2">{project.title}</h1>
                  <p className="text-black mb-4">{project.shortDescription}</p>
                </div>
                <div className="text-right">
                  <ProductPrice amount={project.price} size="lg" showSymbol={true} showCode={false} />
                  <div className="text-sm text-black capitalize">{project.licenseType} license</div>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-6 mb-6">
                <Rating rating={project.rating} />
                <span className="text-sm text-black">
                  {project.reviewCount} reviews
                </span>
                <span className="text-sm text-black">
                  👁 {project.views.toLocaleString()} views
                </span>
                <span className="text-sm text-black">
                  ⬇ {project.downloads.toLocaleString()} downloads
                </span>
              </div>

              {/* Request Stats (for request-only projects) */}
              {project.isRequestOnly && project.totalRequests > 0 && (
                <div className="bg-purple-50 p-4 rounded-lg mb-6">
                  <h4 className="font-semibold text-purple-900 mb-2">Request Statistics</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="text-center">
                      <div className="font-semibold text-purple-900">{project.totalRequests}</div>
                      <div className="text-purple-700">Total Requests</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-yellow-700">{project.pendingRequests}</div>
                      <div className="text-purple-700">Pending</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-green-700">{project.approvedRequests}</div>
                      <div className="text-purple-700">Approved</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-blue-700">{project.completedRequests}</div>
                      <div className="text-purple-700">Completed</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tech Stack */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Technology Stack</h3>
                <TechStackTags techStack={project.techStack} />
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Description</h3>
                <div className="prose max-w-none">
                  <p className="text-black leading-relaxed">
                    {showFullDescription ? project.description : `${project.description.slice(0, 300)}...`}
                  </p>
                  {project.description.length > 300 && (
                    <button
                      onClick={() => setShowFullDescription(!showFullDescription)}
                      className="text-blue-600 hover:text-blue-700 font-medium mt-2"
                    >
                      {showFullDescription ? 'Show Less' : 'Read More'}
                    </button>
                  )}
                </div>
              </div>

              {/* Technical Specifications */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold text-black mb-2">Framework</h4>
                  <p className="text-black">{project.framework || 'Not specified'}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-black mb-2">Database</h4>
                  <p className="text-black">{project.database || 'Not specified'}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-black mb-2">Deployment</h4>
                  <div className="flex flex-wrap gap-1">
                    {project.deployment.map(deploy => (
                      <Badge key={deploy} variant="default" size="sm">{deploy}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-black mb-2">Browser Support</h4>
                  <div className="flex flex-wrap gap-1">
                    {project.browserCompat.map(browser => (
                      <Badge key={browser} variant="info" size="sm">{browser}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Purchase & Seller Info */}
        <div className="lg:col-span-1">
          {/* Purchase Card */}
          <Card className="sticky top-4 mb-6">
            <CardContent>
              <div className="text-center mb-6">
                <ProductPrice amount={project.price} size="lg" showSymbol={true} showCode={false} />
                <div className="text-sm text-black capitalize">{project.licenseType} License</div>
              </div>

              <div className="space-y-3 mb-6">
                {project.isRequestOnly ? (
                  <>
                    <Link href={`/marketplace/requests/submit?projectId=${project.id}`}>
                      <Button className="w-full bg-purple-600 hover:bg-purple-700" size="lg">
                        Request Purchase
                      </Button>
                    </Link>
                    <div className="text-center text-sm text-gray-600 bg-purple-50 p-3 rounded-lg">
                      <p className="font-medium mb-1">📝 Request-Based Purchase</p>
                      <p>Submit a request to purchase this project. The seller will review and approve your request.</p>
                    </div>
                  </>
                ) : (
                  <>
                    <Button className="w-full" size="lg">
                      Add to Cart
                    </Button>
                    <Button variant="outline" className="w-full">
                      Buy Now
                    </Button>
                  </>
                )}
                
                {/* Coin Earning Info */}
                {!project.isRequestOnly && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-yellow-600 text-lg">🪙</span>
                      <div>
                        <p className="font-medium text-yellow-800">Earn Coins</p>
                        <p className="text-sm text-yellow-700">
                          You'll earn <strong>50 coins</strong> when you purchase this project!
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                {project.demoUrl && (
                  <Link href={project.demoUrl} target="_blank">
                    <Button variant="ghost" className="w-full">
                      View Live Demo
                    </Button>
                  </Link>
                )}
              </div>

              {/* License Features */}
              <div className="border-t pt-4">
                <h4 className="font-semibold text-black mb-3">What's Included:</h4>
                <ul className="space-y-2 text-sm text-black">
                  {licenseFeatures[project.licenseType]?.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Additional Actions */}
              <div className="border-t pt-4 mt-4">
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" className="flex-1">
                    <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    Wishlist
                  </Button>
                  <Button variant="ghost" size="sm" className="flex-1">
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
          <Card>
            <CardContent>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-300 mr-4">
                  {project.sellerAvatar && (
                    <Image
                      src={project.sellerAvatar}
                      alt={project.sellerName}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                  )}
                </div>
                <div>
                  <Link href={`/marketplace/seller/${project.sellerId}`}>
                    <h3 className="font-semibold text-black hover:text-blue-600">
                      {project.sellerName}
                    </h3>
                  </Link>
                  <p className="text-sm text-black">Developer</p>
                </div>
              </div>

              <div className="space-y-2 text-sm text-black mb-4">
                <div className="flex justify-between">
                  <span>Total Sales:</span>
                  <span className="font-medium">1,234</span>
                </div>
                <div className="flex justify-between">
                  <span>Rating:</span>
                  <Rating rating={4.9} size="sm" />
                </div>
                <div className="flex justify-between">
                  <span>Response Time:</span>
                  <span className="font-medium">&lt; 2 hours</span>
                </div>
              </div>

              <div className="space-y-2">
                <Link href={`/marketplace/seller/${project.sellerId}`}>
                  <Button variant="outline" size="sm" className="w-full">
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
                  className="w-full"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
