// market/src/components/user/SellerProfile.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Seller } from '../../types/project';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Rating } from '../ui/Rating';

interface SellerProfileProps {
  seller: Seller;
  onContact?: () => void;
  onFollow?: () => void;
  className?: string;
}

export const SellerProfile: React.FC<SellerProfileProps> = ({
  seller,
  onContact,
  onFollow,
  className = ''
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
  };

  const getBadgeColor = (badge: string) => {
    switch (badge.toLowerCase()) {
      case 'top rated':
        return 'success';
      case 'pro seller':
        return 'warning';
      case 'verified':
        return 'info';
      case 'rising talent':
        return 'default';
      default:
        return 'default';
    }
  };

  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <div className="flex items-start space-x-4">
            {/* Avatar */}
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden">
                {seller.avatar && (
                  <Image
                    src={seller.avatar}
                    alt={seller.displayName || seller.name || 'Seller'}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              {seller.verified && (
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>

            {/* Seller Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-black mb-1">
                    {seller.displayName || seller.name}
                  </h1>
                  <p className="text-black mb-2">@{seller.username}</p>
                  {seller.bio && (
                    <p className="text-black mb-3">{seller.bio}</p>
                  )}
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                {(seller.badges || []).map((badge, index) => (
                  <Badge
                    key={index}
                    variant={getBadgeColor(badge)}
                    size="sm"
                  >
                    {badge}
                  </Badge>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-black">
                    {(seller.rating || 0).toFixed(1)}
                  </div>
                  <div className="text-sm text-black">Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-black">
                    {(seller.salesCount || seller.totalSales || 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-black">Sales</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-black">
                    {(seller.reviewCount || 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-black">Reviews</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-black">
                    {(seller.followerCount || 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-black">Followers</div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-3">
                <Button onClick={onContact}>
                  <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Contact
                </Button>
                <Button variant="outline" onClick={onFollow}>
                  <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  Follow
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {/* Additional Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Location & Join Date */}
            <div>
              <h3 className="font-medium text-black mb-3">About</h3>
              <div className="space-y-2 text-sm">
                {seller.location && (
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-black">{seller.location}</span>
                  </div>
                )}
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-black">
                    Joined {formatDate(seller.joinedAt || seller.joinDate || new Date().toISOString())}
                  </span>
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-black">
                    Last active {formatDate(seller.lastActiveAt || new Date().toISOString())}
                  </span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="font-medium text-black mb-3">Connect</h3>
              <div className="space-y-2">
                {seller.website && (
                  <a
                    href={seller.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Website
                  </a>
                )}
                {(seller.github || seller.socialLinks?.github) && (
                  <a
                    href={seller.github || `https://github.com/${seller.socialLinks?.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                  >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    GitHub
                  </a>
                )}
                {(seller.twitter || seller.socialLinks?.twitter) && (
                  <a
                    href={seller.twitter || `https://twitter.com/${seller.socialLinks?.twitter?.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                  >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                    Twitter
                  </a>
                )}
                {(seller.linkedin || seller.socialLinks?.linkedin) && (
                  <a
                    href={seller.linkedin || `https://linkedin.com/in/${seller.socialLinks?.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                  >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn
                  </a>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Compact version for project cards
interface SellerProfileCompactProps {
  seller: Seller;
  showStats?: boolean;
  className?: string;
}

export const SellerProfileCompact: React.FC<SellerProfileCompactProps> = ({
  seller,
  showStats = true,
  className = ''
}) => {
  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
        {seller.avatar && (
          <Image
            src={seller.avatar}
            alt={seller.displayName || seller.name || 'Seller'}
            width={40}
            height={40}
            className="w-full h-full object-cover"
          />
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <Link href={`/marketplace/seller/${seller.id}`}>
          <h4 className="font-medium text-black hover:text-blue-600 truncate">
            {seller.displayName || seller.name}
          </h4>
        </Link>
        <div className="flex items-center space-x-2">
          <Rating rating={seller.rating || 0} size="sm" showNumber={false} />
          <span className="text-sm text-black">
            ({seller.reviewCount || 0})
          </span>
          {seller.verified && (
            <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </div>
        {showStats && (
          <div className="flex items-center space-x-3 text-xs text-black mt-1">
            <span>{seller.salesCount || seller.totalSales || 0} sales</span>
            <span>•</span>
            <span>{seller.followerCount || 0} followers</span>
          </div>
        )}
      </div>
    </div>
  );
};
