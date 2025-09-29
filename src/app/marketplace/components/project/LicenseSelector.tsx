// market/src/components/project/LicenseSelector.tsx
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
  popular?: boolean;
}

interface LicenseSelectorProps {
  licenses: License[];
  selectedLicenseId: string;
  onLicenseSelect: (licenseId: string) => void;
  onPurchase: (licenseId: string) => void;
  className?: string;
}

const DEFAULT_LICENSES: License[] = [
  {
    id: 'personal',
    name: 'Personal License',
    description: 'Perfect for personal projects and learning',
    price: 29,
    features: [
      'Personal use only',
      'Modify and customize',
      'No attribution required',
      'Lifetime updates',
      'Email support'
    ],
    restrictions: [
      'Cannot use commercially',
      'Cannot resell or distribute',
      'Cannot use for client work'
    ],
    commercialUse: false,
    modification: true,
    distribution: false,
    attribution: false
  },
  {
    id: 'commercial',
    name: 'Commercial License',
    description: 'Ideal for commercial projects and client work',
    price: 89,
    features: [
      'Commercial use allowed',
      'Modify and customize',
      'Use in client projects',
      'Lifetime updates',
      'Priority support',
      'No attribution required'
    ],
    restrictions: [
      'Cannot resell the template',
      'Cannot redistribute source code'
    ],
    commercialUse: true,
    modification: true,
    distribution: false,
    attribution: false,
    popular: true
  },
  {
    id: 'extended',
    name: 'Extended License',
    description: 'For resale and distribution rights',
    price: 199,
    features: [
      'Commercial use allowed',
      'Modify and customize',
      'Resale rights included',
      'Distribution allowed',
      'Lifetime updates',
      'Priority support',
      'White-label rights'
    ],
    restrictions: [
      'Cannot resell as template',
      'Must be integrated into larger project'
    ],
    commercialUse: true,
    modification: true,
    distribution: true,
    attribution: false
  },
  {
    id: 'white-label',
    name: 'White Label License',
    description: 'Complete ownership and resale rights',
    price: 399,
    features: [
      'Commercial use allowed',
      'Modify and customize',
      'Full resale rights',
      'White-label distribution',
      'Remove all branding',
      'Lifetime updates',
      'Priority support',
      'Source code ownership'
    ],
    restrictions: [],
    commercialUse: true,
    modification: true,
    distribution: true,
    attribution: false
  }
];

export const LicenseSelector: React.FC<LicenseSelectorProps> = ({
  licenses = DEFAULT_LICENSES,
  selectedLicenseId,
  onLicenseSelect,
  onPurchase,
  className = ''
}) => {
  const selectedLicense = licenses.find(license => license.id === selectedLicenseId);

  return (
    <div className={className}>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-black mb-2">Choose Your License</h3>
        <p className="text-black">
          Select the license that best fits your needs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {licenses.map((license) => (
          <Card
            key={license.id}
            className={`cursor-pointer transition-all duration-200 ${
              selectedLicenseId === license.id
                ? 'ring-2 ring-blue-500 border-blue-500'
                : 'hover:border-gray-300 hover:shadow-md'
            } ${license.popular ? 'relative' : ''}`}
            onClick={() => onLicenseSelect(license.id)}
          >
            {license.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge variant="warning" className="px-3 py-1">
                  Most Popular
                </Badge>
              </div>
            )}

            <CardHeader className="text-center pb-4">
              <h4 className="font-semibold text-black">{license.name}</h4>
              <div className="text-2xl font-bold text-black">
                ${license.price}
              </div>
              <p className="text-sm text-black">{license.description}</p>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="space-y-3">
                <div>
                  <h5 className="text-sm font-medium text-black mb-2">Includes:</h5>
                  <ul className="space-y-1">
                    {license.features.slice(0, 4).map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-black">
                        <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                    {license.features.length > 4 && (
                      <li className="text-sm text-black">
                        +{license.features.length - 4} more features
                      </li>
                    )}
                  </ul>
                </div>

                {license.restrictions.length > 0 && (
                  <div>
                    <h5 className="text-sm font-medium text-black mb-2">Restrictions:</h5>
                    <ul className="space-y-1">
                      {license.restrictions.slice(0, 2).map((restriction, index) => (
                        <li key={index} className="flex items-center text-sm text-black">
                          <svg className="w-4 h-4 text-red-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                          {restriction}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Selected License Details */}
      {selectedLicense && (
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-semibold text-black">
                  {selectedLicense.name}
                </h4>
                <p className="text-black">{selectedLicense.description}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-black">
                  ${selectedLicense.price}
                </div>
                <div className="text-sm text-black">One-time payment</div>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-medium text-black mb-3">What's Included</h5>
                <ul className="space-y-2">
                  {selectedLicense.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-black">
                      <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="font-medium text-black mb-3">Usage Rights</h5>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-black">Commercial Use</span>
                    <span className={selectedLicense.commercialUse ? 'text-green-600' : 'text-red-600'}>
                      {selectedLicense.commercialUse ? '✓ Allowed' : '✗ Not Allowed'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-black">Modification</span>
                    <span className={selectedLicense.modification ? 'text-green-600' : 'text-red-600'}>
                      {selectedLicense.modification ? '✓ Allowed' : '✗ Not Allowed'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-black">Distribution</span>
                    <span className={selectedLicense.distribution ? 'text-green-600' : 'text-red-600'}>
                      {selectedLicense.distribution ? '✓ Allowed' : '✗ Not Allowed'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-black">Attribution Required</span>
                    <span className={selectedLicense.attribution ? 'text-yellow-600' : 'text-green-600'}>
                      {selectedLicense.attribution ? '✓ Required' : '✗ Not Required'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {selectedLicense.restrictions.length > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h5 className="font-medium text-black mb-3">Important Restrictions</h5>
                <ul className="space-y-2">
                  {selectedLicense.restrictions.map((restriction, index) => (
                    <li key={index} className="flex items-start text-sm text-black">
                      <svg className="w-4 h-4 text-red-500 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {restriction}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Purchase Button */}
      <div className="flex justify-center">
        <Button
          size="lg"
          onClick={() => onPurchase(selectedLicenseId)}
          className="px-8 py-3"
        >
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
          </svg>
          Purchase {selectedLicense?.name} - ${selectedLicense?.price}
        </Button>
      </div>
    </div>
  );
};
