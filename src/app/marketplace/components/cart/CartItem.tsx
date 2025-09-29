// market/src/components/cart/CartItem.tsx
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CartItem as CartItemType, LicenseOption } from '../../types/cart';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { CartPrice } from '@/components/ui/PriceDisplay';
import { Rating } from '../ui/Rating';

interface CartItemProps {
  item: CartItemType;
  onRemove: (itemId: string) => void;
  onUpdateLicense?: (itemId: string, newLicense: string) => void;
}

export const CartItem: React.FC<CartItemProps> = ({
  item,
  onRemove,
  onUpdateLicense
}) => {
  const [showDetails, setShowDetails] = useState(false);

  const licenseOptions: LicenseOption[] = [
    { 
      value: 'personal', 
      label: 'Personal', 
      multiplier: 1,
      description: 'For personal projects only',
      features: ['Personal use', '1 project', 'No commercial use'],
      restrictions: ['No resale', 'No redistribution']
    },
    { 
      value: 'commercial', 
      label: 'Commercial', 
      multiplier: 1.5,
      description: 'For commercial projects',
      features: ['Commercial use', 'Unlimited projects', 'Client work'],
      restrictions: ['No resale', 'No redistribution']
    },
    { 
      value: 'extended', 
      label: 'Extended', 
      multiplier: 2.5,
      description: 'Extended commercial rights',
      features: ['Commercial use', 'Resale rights', 'White-label'],
      restrictions: ['No source code redistribution']
    },
    { 
      value: 'white-label', 
      label: 'White Label', 
      multiplier: 4,
      description: 'Full white-label rights',
      features: ['All rights', 'Source code', 'Resale rights', 'Custom branding'],
      restrictions: []
    }
  ];

  const currentLicense = licenseOptions.find(l => l.value === item.licenseType);
  const displayPrice = item.price * (currentLicense?.multiplier || 1);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="border border-gray-200 rounded-lg p-6 mb-4 bg-white hover:shadow-md transition-shadow">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Thumbnail and Basic Info */}
        <div className="flex gap-4 flex-1">
          {/* Thumbnail */}
          <div className="flex-shrink-0">
            <Link href={`/project/${item.projectId}`}>
              <div className="w-24 h-20 relative rounded-lg overflow-hidden bg-gray-100 group cursor-pointer">
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
              </div>
            </Link>
          </div>

          {/* Product Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1 min-w-0">
                <Link href={`/project/${item.projectId}`}>
                  <h3 className="text-lg font-semibold text-black hover:text-blue-600 line-clamp-2">
                    {item.title}
                  </h3>
                </Link>
                <p className="text-sm text-black mt-1 line-clamp-2">
                  {item.description}
                </p>
              </div>
            </div>

            {/* Seller Info */}
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 bg-gray-300 rounded-full flex-shrink-0"></div>
              <Link href={`/marketplace/seller/${item.sellerId}`} className="text-sm text-black hover:text-blue-600">
                by {item.sellerName}
              </Link>
              <div className="flex items-center gap-1 ml-2">
                <Rating rating={item.rating} size="sm" showNumber={false} />
                <span className="text-xs text-black">({item.reviewCount})</span>
              </div>
            </div>

            {/* Tech Stack and Tags */}
            <div className="flex flex-wrap gap-1 mb-3">
              {item.techStack.slice(0, 3).map((tech, index) => (
                <Badge key={index} variant="info" size="sm">
                  {tech}
                </Badge>
              ))}
              {item.techStack.length > 3 && (
                <Badge variant="default" size="sm">
                  +{item.techStack.length - 3} more
                </Badge>
              )}
            </div>

            {/* Additional Info */}
            <div className="flex items-center gap-4 text-xs text-black">
              <span>📁 {item.fileSize}</span>
              <span>🔄 Updated {formatDate(item.lastUpdated)}</span>
              <span>📂 {item.category}</span>
            </div>
          </div>
        </div>

        {/* License and Pricing */}
        <div className="lg:w-80 flex flex-col gap-4">
          {/* License Selection */}
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              License Type
            </label>
            {onUpdateLicense ? (
              <select
                value={item.licenseType}
                onChange={(e) => onUpdateLicense(item.id, e.target.value)}
                className="w-full text-sm border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {licenseOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label} - ${(item.price * option.multiplier).toFixed(2)}
                  </option>
                ))}
              </select>
            ) : (
              <Badge variant="info" className="capitalize">
                {item.licenseType} License
              </Badge>
            )}
          </div>

          {/* Quantity controls removed by design */}

          {/* Price */}
          <div className="text-right">
            <CartPrice amount={displayPrice} showSymbol={true} showCode={false} />
            {currentLicense && currentLicense.multiplier > 1 && (
              <div className="text-sm text-gray-500">
                Base: <CartPrice amount={item.price} showSymbol={true} showCode={false} /> × {currentLicense.multiplier}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowDetails(!showDetails)}
              className="flex-1"
            >
              {showDetails ? 'Hide' : 'Show'} Details
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRemove(item.id)}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              Remove
            </Button>
          </div>
        </div>
      </div>

      {/* Expanded Details */}
      {showDetails && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* License Features */}
            <div>
              <h4 className="font-medium text-black mb-3">License Features</h4>
              <div className="space-y-2">
                {currentLicense?.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Project Info */}
            <div>
              <h4 className="font-medium text-black mb-3">Project Information</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-black">File Size:</span>
                  <span>{item.fileSize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black">Last Updated:</span>
                  <span>{formatDate(item.lastUpdated)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black">Category:</span>
                  <span className="capitalize">{item.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black">Added to Cart:</span>
                  <span>{formatDate(item.addedAt)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-6 flex flex-wrap gap-2">
            {item.demoUrl && (
              <Link href={item.demoUrl} target="_blank">
                <Button variant="outline" size="sm">
                  🎮 View Demo
                </Button>
              </Link>
            )}
            {item.previewUrl && (
              <Link href={item.previewUrl} target="_blank">
                <Button variant="outline" size="sm">
                  👁️ Preview
                </Button>
              </Link>
            )}
            {item.documentationUrl && (
              <Link href={item.documentationUrl} target="_blank">
                <Button variant="outline" size="sm">
                  📚 Documentation
                </Button>
              </Link>
            )}
            <Link href={`/project/${item.projectId}`}>
              <Button variant="outline" size="sm">
                🔍 View Project
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
