// market/src/components/licensing/LicenseCard.tsx
import React from 'react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

interface License {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  restrictions: string[];
  commercialUse: boolean;
  modification: boolean;
  distribution: boolean;
  attribution: boolean;
  resale: boolean;
  whiteLabel: boolean;
  support: string;
  updates: string;
  popular?: boolean;
  recommended?: boolean;
}

interface LicenseCardProps {
  license: License;
  selected?: boolean;
  onSelect?: (licenseId: string) => void;
  onPurchase?: (licenseId: string) => void;
  variant?: 'default' | 'compact' | 'detailed';
  className?: string;
}

export const LicenseCard: React.FC<LicenseCardProps> = ({
  license,
  selected = false,
  onSelect,
  onPurchase,
  variant = 'default',
  className = ''
}) => {
  const handleSelect = () => {
    onSelect?.(license.id);
  };

  const handlePurchase = () => {
    onPurchase?.(license.id);
  };

  const getFeatureIcon = (feature: string) => {
    if (feature.includes('Commercial') || feature.includes('commercial')) {
      return '💼';
    } else if (feature.includes('Modify') || feature.includes('modify')) {
      return '✏️';
    } else if (feature.includes('Distribute') || feature.includes('distribute')) {
      return '📤';
    } else if (feature.includes('Support') || feature.includes('support')) {
      return '🛠️';
    } else if (feature.includes('Update') || feature.includes('update')) {
      return '🔄';
    } else if (feature.includes('Resale') || feature.includes('resale')) {
      return '💰';
    } else if (feature.includes('White Label') || feature.includes('white label')) {
      return '🏷️';
    } else if (feature.includes('Attribution') || feature.includes('attribution')) {
      return '📝';
    }
    return '✅';
  };

  if (variant === 'compact') {
    return (
      <Card
        className={`cursor-pointer transition-all duration-200 ${
          selected ? 'ring-2 ring-blue-500 border-blue-500' : 'hover:border-gray-300 hover:shadow-md'
        } ${className}`}
        onClick={handleSelect}
      >
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-semibold text-black">{license.name}</h3>
              <p className="text-sm text-black">{license.description}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-black">${license.price}</div>
              {license.popular && (
                <Badge variant="warning" size="sm" className="mt-1">
                  Popular
                </Badge>
              )}
            </div>
          </div>

          <div className="space-y-2">
            {license.features.slice(0, 3).map((feature, index) => (
              <div key={index} className="flex items-center text-sm text-black">
                <span className="mr-2">{getFeatureIcon(feature)}</span>
                <span>{feature}</span>
              </div>
            ))}
            {license.features.length > 3 && (
              <div className="text-sm text-black">
                +{license.features.length - 3} more features
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (variant === 'detailed') {
    return (
      <Card
        className={`cursor-pointer transition-all duration-200 ${
          selected ? 'ring-2 ring-blue-500 border-blue-500' : 'hover:border-gray-300 hover:shadow-md'
        } ${className}`}
        onClick={handleSelect}
      >
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h3 className="text-xl font-semibold text-black">{license.name}</h3>
                {license.popular && (
                  <Badge variant="warning" size="sm">Popular</Badge>
                )}
                {license.recommended && (
                  <Badge variant="success" size="sm">Recommended</Badge>
                )}
              </div>
              <p className="text-black mb-4">{license.description}</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-black">${license.price}</div>
              <div className="text-sm text-black">One-time payment</div>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-6">
            {/* Features */}
            <div>
              <h4 className="font-medium text-black mb-3">What's Included</h4>
              <div className="space-y-2">
                {license.features.map((feature, index) => (
                  <div key={index} className="flex items-center text-sm text-black">
                    <span className="mr-3">{getFeatureIcon(feature)}</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Usage Rights */}
            <div>
              <h4 className="font-medium text-black mb-3">Usage Rights</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-black">Commercial Use</span>
                  <span className={license.commercialUse ? 'text-green-600' : 'text-red-600'}>
                    {license.commercialUse ? '✓ Allowed' : '✗ Not Allowed'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-black">Modification</span>
                  <span className={license.modification ? 'text-green-600' : 'text-red-600'}>
                    {license.modification ? '✓ Allowed' : '✗ Not Allowed'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-black">Distribution</span>
                  <span className={license.distribution ? 'text-green-600' : 'text-red-600'}>
                    {license.distribution ? '✓ Allowed' : '✗ Not Allowed'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-black">Attribution</span>
                  <span className={license.attribution ? 'text-yellow-600' : 'text-green-600'}>
                    {license.attribution ? '✓ Required' : '✗ Not Required'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-black">Resale Rights</span>
                  <span className={license.resale ? 'text-green-600' : 'text-red-600'}>
                    {license.resale ? '✓ Allowed' : '✗ Not Allowed'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-black">White Label</span>
                  <span className={license.whiteLabel ? 'text-green-600' : 'text-red-600'}>
                    {license.whiteLabel ? '✓ Allowed' : '✗ Not Allowed'}
                  </span>
                </div>
              </div>
            </div>

            {/* Support & Updates */}
            <div>
              <h4 className="font-medium text-black mb-3">Support & Updates</h4>
              <div className="space-y-2 text-sm text-black">
                <div className="flex items-center">
                  <span className="mr-2">🛠️</span>
                  <span>{license.support}</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">🔄</span>
                  <span>{license.updates}</span>
                </div>
              </div>
            </div>

            {/* Restrictions */}
            {license.restrictions.length > 0 && (
              <div>
                <h4 className="font-medium text-black mb-3">Important Restrictions</h4>
                <ul className="space-y-2">
                  {license.restrictions.map((restriction, index) => (
                    <li key={index} className="flex items-start text-sm text-black">
                      <span className="mr-2 text-red-500">⚠️</span>
                      <span>{restriction}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Default variant
  return (
    <Card
      className={`cursor-pointer transition-all duration-200 ${
        selected ? 'ring-2 ring-blue-500 border-blue-500' : 'hover:border-gray-300 hover:shadow-md'
      } ${className}`}
      onClick={handleSelect}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-black">{license.name}</h3>
            <p className="text-sm text-black">{license.description}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-black">${license.price}</div>
            {license.popular && (
              <Badge variant="warning" size="sm" className="mt-1">
                Popular
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          <div className="space-y-2">
            {license.features.slice(0, 4).map((feature, index) => (
              <div key={index} className="flex items-center text-sm text-black">
                <span className="mr-2">{getFeatureIcon(feature)}</span>
                <span>{feature}</span>
              </div>
            ))}
            {license.features.length > 4 && (
              <div className="text-sm text-black">
                +{license.features.length - 4} more features
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-black">
                {license.commercialUse ? 'Commercial Use ✓' : 'Personal Use Only'}
              </div>
              <Button size="sm" onClick={handlePurchase}>
                Select
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
