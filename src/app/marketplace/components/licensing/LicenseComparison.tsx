// market/src/components/licensing/LicenseComparison.tsx
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

interface LicenseComparisonProps {
  licenses: License[];
  selectedLicenseId?: string;
  onSelect?: (licenseId: string) => void;
  onPurchase?: (licenseId: string) => void;
  className?: string;
}

export const LicenseComparison: React.FC<LicenseComparisonProps> = ({
  licenses,
  selectedLicenseId,
  onSelect,
  onPurchase,
  className = ''
}) => {
  const handleSelect = (licenseId: string) => {
    onSelect?.(licenseId);
  };

  const handlePurchase = (licenseId: string) => {
    onPurchase?.(licenseId);
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

  const getUsageRightIcon = (value: boolean) => {
    return value ? '✓' : '✗';
  };

  const getUsageRightColor = (value: boolean) => {
    return value ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className={className}>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-black mb-2">License Comparison</h2>
        <p className="text-black">Compare different license options to find the best fit for your needs</p>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-full">
          {/* Header Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="hidden md:block"></div>
            {licenses.map((license) => (
              <Card
                key={license.id}
                className={`cursor-pointer transition-all duration-200 ${
                  selectedLicenseId === license.id
                    ? 'ring-2 ring-blue-500 border-blue-500'
                    : 'hover:border-gray-300 hover:shadow-md'
                }`}
                onClick={() => handleSelect(license.id)}
              >
                <CardHeader className="text-center">
                  <div className="relative">
                    <h3 className="text-lg font-semibold text-black mb-2">{license.name}</h3>
                    {license.popular && (
                      <Badge variant="warning" size="sm" className="absolute -top-2 -right-2">
                        Popular
                      </Badge>
                    )}
                    {license.recommended && (
                      <Badge variant="success" size="sm" className="absolute -top-2 -right-2">
                        Recommended
                      </Badge>
                    )}
                  </div>
                  <div className="text-3xl font-bold text-black mb-2">${license.price}</div>
                  <p className="text-sm text-black">{license.description}</p>
                </CardHeader>
                <CardContent>
                  <Button
                    className="w-full mb-4"
                    variant={selectedLicenseId === license.id ? 'default' : 'outline'}
                    onClick={() => handleSelect(license.id)}
                  >
                    {selectedLicenseId === license.id ? 'Selected' : 'Select'}
                  </Button>
                  <Button
                    className="w-full"
                    onClick={() => handlePurchase(license.id)}
                  >
                    Purchase
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Features Comparison */}
          <Card className="mb-6">
            <CardHeader>
              <h3 className="text-lg font-semibold text-black">Features Comparison</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {licenses[0]?.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="flex items-center text-sm font-medium text-black">
                      <span className="mr-2">{getFeatureIcon(feature)}</span>
                      {feature}
                    </div>
                    {licenses.map((license) => (
                      <div key={license.id} className="flex items-center justify-center">
                        <span className={`text-lg ${getUsageRightColor(license.features.includes(feature))}`}>
                          {getUsageRightIcon(license.features.includes(feature))}
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Usage Rights Comparison */}
          <Card className="mb-6">
            <CardHeader>
              <h3 className="text-lg font-semibold text-black">Usage Rights</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { key: 'commercialUse', label: 'Commercial Use' },
                  { key: 'modification', label: 'Modification' },
                  { key: 'distribution', label: 'Distribution' },
                  { key: 'attribution', label: 'Attribution Required' },
                  { key: 'resale', label: 'Resale Rights' },
                  { key: 'whiteLabel', label: 'White Label' }
                ].map((right) => (
                  <div key={right.key} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="flex items-center text-sm font-medium text-black">
                      {right.label}
                    </div>
                    {licenses.map((license) => (
                      <div key={license.id} className="flex items-center justify-center">
                        <span className={`text-lg ${getUsageRightColor(license[right.key as keyof License] as boolean)}`}>
                          {getUsageRightIcon(license[right.key as keyof License] as boolean)}
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Support & Updates Comparison */}
          <Card className="mb-6">
            <CardHeader>
              <h3 className="text-lg font-semibold text-black">Support & Updates</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="flex items-center text-sm font-medium text-black">
                    <span className="mr-2">🛠️</span>
                    Support
                  </div>
                  {licenses.map((license) => (
                    <div key={license.id} className="flex items-center justify-center">
                      <span className="text-sm text-black text-center">
                        {license.support}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="flex items-center text-sm font-medium text-black">
                    <span className="mr-2">🔄</span>
                    Updates
                  </div>
                  {licenses.map((license) => (
                    <div key={license.id} className="flex items-center justify-center">
                      <span className="text-sm text-black text-center">
                        {license.updates}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Restrictions Comparison */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-black">Restrictions</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {licenses.map((license) => (
                  <div key={license.id} className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-black mb-2">{license.name}</h4>
                    {license.restrictions.length > 0 ? (
                      <ul className="space-y-1">
                        {license.restrictions.map((restriction, index) => (
                          <li key={index} className="flex items-start text-sm text-black">
                            <span className="mr-2 text-red-500">⚠️</span>
                            <span>{restriction}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-black">No restrictions</p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
