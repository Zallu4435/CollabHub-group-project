// market/src/app/marketplace/licensing/[type]/page.tsx
'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { CheckoutPrice } from '@/components/ui/PriceDisplay';

interface LicenseType {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  originalPrice?: number;
  popular?: boolean;
  recommended?: boolean;
  features: {
    included: string[];
    excluded: string[];
  };
  usageRights: {
    personalUse: boolean;
    commercialUse: boolean;
    clientProjects: boolean;
    resale: boolean;
    redistribution: boolean;
    modification: boolean;
    attribution: boolean;
    support: string;
    updates: string;
    domains: string | number;
    projects: string | number;
    endUsers: string | number;
  };
  restrictions: string[];
  examples: {
    allowed: string[];
    notAllowed: string[];
  };
  faqs: {
    question: string;
    answer: string;
  }[];
}

const LICENSE_TYPES: Record<string, LicenseType> = {
  personal: {
    id: 'personal',
    name: 'Personal License',
    tagline: 'Perfect for personal projects and learning',
    description: 'Ideal for individual developers working on personal projects, portfolios, or learning new technologies.',
    price: 29,
    features: {
      included: [
        'Use in personal projects',
        'Modify source code',
        'Basic documentation',
        '6 months of updates',
        'Community support',
        'Single developer use'
      ],
      excluded: [
        'Commercial use',
        'Client projects',
        'Resale rights',
        'Premium support',
        'Extended updates'
      ]
    },
    usageRights: {
      personalUse: true,
      commercialUse: false,
      clientProjects: false,
      resale: false,
      redistribution: false,
      modification: true,
      attribution: true,
      support: 'Community forum',
      updates: '6 months',
      domains: 'Unlimited personal',
      projects: 'Unlimited personal',
      endUsers: 'Personal only'
    },
    restrictions: [
      'Cannot be used for commercial purposes',
      'Cannot be used for client work',
      'Cannot be resold or redistributed',
      'Attribution to original author required',
      'No premium support included'
    ],
    examples: {
      allowed: [
        'Personal portfolio website',
        'Learning and educational projects',
        'Open source contributions',
        'Personal blog or documentation',
        'Hobby projects and experiments'
      ],
      notAllowed: [
        'Client websites or applications',
        'Commercial products or services',
        'Selling or licensing to others',
        'Corporate or business use',
        'Generating revenue from the project'
      ]
    },
    faqs: [
      {
        question: 'Can I use this for my portfolio website?',
        answer: 'Yes! Personal licenses are perfect for portfolio websites and personal projects.'
      },
      {
        question: 'What if I want to show this to potential employers?',
        answer: 'Absolutely fine! Showcasing your work to employers falls under personal use.'
      },
      {
        question: 'Can I modify the code?',
        answer: 'Yes, you can modify, customize, and adapt the code for your personal needs.'
      }
    ]
  },
  commercial: {
    id: 'commercial',
    name: 'Commercial License',
    tagline: 'For business use and client projects',
    description: 'Perfect for freelancers and agencies working on client projects and commercial applications.',
    price: 79,
    originalPrice: 99,
    popular: true,
    features: {
      included: [
        'Commercial use rights',
        'Client project usage',
        'Modify source code',
        'Complete documentation',
        '12 months of updates',
        'Email support',
        'Multiple developers',
        'Remove attribution'
      ],
      excluded: [
        'Resale as standalone product',
        'White-label rights',
        'Premium support',
        'Extended warranty'
      ]
    },
    usageRights: {
      personalUse: true,
      commercialUse: true,
      clientProjects: true,
      resale: false,
      redistribution: false,
      modification: true,
      attribution: false,
      support: 'Email support',
      updates: '12 months',
      domains: 'Unlimited',
      projects: 'Unlimited',
      endUsers: 'Unlimited'
    },
    restrictions: [
      'Cannot resell as a standalone product',
      'Cannot redistribute source code',
      'Cannot create derivative templates for sale',
      'One license per organization'
    ],
    examples: {
      allowed: [
        'Client websites and web applications',
        'Commercial products and services',
        'Corporate websites and intranets',
        'SaaS applications and platforms',
        'E-commerce websites and stores'
      ],
      notAllowed: [
        'Selling the template as-is',
        'Creating competing template products',
        'Mass distribution to multiple clients',
        'Licensing to other developers'
      ]
    },
    faqs: [
      {
        question: 'Can I use this for multiple client projects?',
        answer: 'Yes! One commercial license covers unlimited client projects for your organization.'
      },
      {
        question: 'Do I need to keep attribution?',
        answer: 'No, commercial licenses allow you to remove attribution requirements.'
      },
      {
        question: 'Can my team use this license?',
        answer: 'Yes, your entire team/organization can use this under one commercial license.'
      }
    ]
  },
  extended: {
    id: 'extended',
    name: 'Extended License',
    tagline: 'Maximum flexibility for large organizations',
    description: 'Comprehensive licensing for large teams, multiple organizations, and complex commercial use cases.',
    price: 199,
    originalPrice: 249,
    recommended: true,
    features: {
      included: [
        'All Commercial features',
        'Multi-organization use',
        'Sublicensing rights',
        'Priority support',
        'Lifetime updates',
        'Phone support',
        'Custom modifications',
        'Extended warranty',
        'Consulting hours included'
      ],
      excluded: [
        'Full resale rights',
        'Source code redistribution'
      ]
    },
    usageRights: {
      personalUse: true,
      commercialUse: true,
      clientProjects: true,
      resale: true,
      redistribution: false,
      modification: true,
      attribution: false,
      support: 'Priority + Phone',
      updates: 'Lifetime',
      domains: 'Unlimited',
      projects: 'Unlimited',
      endUsers: 'Unlimited'
    },
    restrictions: [
      'Cannot redistribute source code publicly',
      'Cannot create competing template marketplaces',
      'Sublicensing limited to end-product integration'
    ],
    examples: {
      allowed: [
        'Large enterprise applications',
        'Multi-tenant SaaS platforms',
        'Products with integrated templates',
        'Agency white-label solutions',
        'Complex commercial integrations'
      ],
      notAllowed: [
        'Creating template marketplaces',
        'Selling raw source code',
        'Unlimited sublicensing rights'
      ]
    },
    faqs: [
      {
        question: 'What does sublicensing rights mean?',
        answer: 'You can integrate this into products you sell, where the end users get the benefits but not the source code.'
      },
      {
        question: 'Can I use this across multiple companies?',
        answer: 'Yes, extended licenses allow use across multiple organizations under your control.'
      },
      {
        question: 'What kind of support do I get?',
        answer: 'Priority email support, phone support, and included consulting hours for implementation.'
      }
    ]
  },
  'white-label': {
    id: 'white-label',
    name: 'White Label License',
    tagline: 'Complete ownership and branding rights',
    description: 'Full rights to rebrand, customize, and distribute as your own product with complete ownership.',
    price: 499,
    originalPrice: 599,
    features: {
      included: [
        'All Extended features',
        'Full rebranding rights',
        'Source code ownership',
        'Redistribution rights',
        'Create derivative products',
        'Sell as your own product',
        'Remove all original branding',
        'Custom licensing terms',
        'Dedicated support manager',
        'Custom development hours'
      ],
      excluded: []
    },
    usageRights: {
      personalUse: true,
      commercialUse: true,
      clientProjects: true,
      resale: true,
      redistribution: true,
      modification: true,
      attribution: false,
      support: 'Dedicated manager',
      updates: 'Lifetime + Custom',
      domains: 'Unlimited',
      projects: 'Unlimited',
      endUsers: 'Unlimited'
    },
    restrictions: [
      'Cannot claim original authorship',
      'Must maintain code quality standards',
      'Responsible for end-user support'
    ],
    examples: {
      allowed: [
        'Selling as your own template product',
        'Creating competing marketplace products',
        'Full rebranding and customization',
        'Building business around the product',
        'Any commercial use imaginable'
      ],
      notAllowed: [
        'Claiming original creation/authorship',
        'Violating intellectual property laws'
      ]
    },
    faqs: [
      {
        question: 'Can I sell this as my own product?',
        answer: 'Yes! White label licenses give you full rights to rebrand and sell as your own product.'
      },
      {
        question: 'Do I get the source code?',
        answer: 'Yes, you get complete access to source code with full modification and distribution rights.'
      },
      {
        question: 'What about support for my customers?',
        answer: 'You become responsible for customer support, but we provide you with dedicated support for implementation.'
      }
    ]
  }
};

export default function LicenseTypePage() {
  const params = useParams();
  const licenseType = params.type as string;
  const [calculatorProjects, setCalculatorProjects] = useState(1);
  const [calculatorDomains, setCalculatorDomains] = useState(1);

  const license = LICENSE_TYPES[licenseType];
  const allLicenses = Object.values(LICENSE_TYPES);
  const otherLicenses = allLicenses.filter(l => l.id !== licenseType);

  if (!license) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">License Type Not Found</h1>
          <p className="text-gray-600 mb-6">The requested license type does not exist.</p>
          <Link href="/marketplace/licensing">
            <Button>View All Licenses</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleChooseLicense = () => {
    // Redirect to project selection or checkout
    console.log('Choosing license:', license.id);
  };


  const calculatePrice = () => {
    let basePrice = license.price;
    
    // Simple pricing calculation based on projects and domains
    if (license.id === 'personal') {
      return basePrice; // Fixed price for personal
    }
    
    if (calculatorProjects > 5) {
      basePrice *= 1.2;
    }
    if (calculatorDomains > 10) {
      basePrice *= 1.3;
    }
    
    return Math.round(basePrice);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <Link href="/marketplace" className="hover:text-blue-600">Marketplace</Link>
          <span>/</span>
          <Link href="/marketplace/licensing" className="hover:text-blue-600">Licensing</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">{license.name}</span>
        </nav>

        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-xl p-8 mb-8">
          <div className="max-w-4xl">
            <div className="flex items-center space-x-4 mb-4">
              <h1 className="text-4xl font-bold">{license.name}</h1>
              {license.popular && (
                <Badge className="bg-yellow-500 text-yellow-900">Most Popular</Badge>
              )}
              {license.recommended && (
                <Badge className="bg-green-500 text-green-900">Recommended</Badge>
              )}
            </div>
            <p className="text-xl text-blue-100 mb-6">{license.tagline}</p>
            <p className="text-lg text-blue-50 leading-relaxed mb-6">
              {license.description}
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <CheckoutPrice 
                  amount={license.price} 
                  originalCurrency="USD"
                  showOriginalPrice={!!license.originalPrice}
                  showDiscount={!!license.originalPrice}
                  discountPercentage={license.originalPrice ? Math.round(((license.originalPrice - license.price) / license.originalPrice) * 100) : 0}
                  className="text-white"
                />
              </div>
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-blue-50"
                onClick={handleChooseLicense}
              >
                Choose This License
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Features Section */}
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-bold text-gray-900">What's Included</h2>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Included Features
                    </h3>
                    <ul className="space-y-2">
                      {license.features.included.map((feature, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <svg className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {license.features.excluded.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-red-800 mb-4 flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Not Included
                      </h3>
                      <ul className="space-y-2">
                        {license.features.excluded.map((feature, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <svg className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Usage Rights */}
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-bold text-gray-900">Usage Rights & Permissions</h2>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">Personal Use</span>
                      <span className={license.usageRights.personalUse ? 'text-green-600' : 'text-red-600'}>
                        {license.usageRights.personalUse ? '✓ Allowed' : '✗ Not Allowed'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">Commercial Use</span>
                      <span className={license.usageRights.commercialUse ? 'text-green-600' : 'text-red-600'}>
                        {license.usageRights.commercialUse ? '✓ Allowed' : '✗ Not Allowed'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">Client Projects</span>
                      <span className={license.usageRights.clientProjects ? 'text-green-600' : 'text-red-600'}>
                        {license.usageRights.clientProjects ? '✓ Allowed' : '✗ Not Allowed'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">Resale Rights</span>
                      <span className={license.usageRights.resale ? 'text-green-600' : 'text-red-600'}>
                        {license.usageRights.resale ? '✓ Allowed' : '✗ Not Allowed'}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="text-sm font-medium text-blue-900 mb-1">Support Level</div>
                      <div className="text-blue-700">{license.usageRights.support}</div>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="text-sm font-medium text-blue-900 mb-1">Updates Period</div>
                      <div className="text-blue-700">{license.usageRights.updates}</div>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="text-sm font-medium text-blue-900 mb-1">Domain Usage</div>
                      <div className="text-blue-700">{license.usageRights.domains}</div>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="text-sm font-medium text-blue-900 mb-1">Project Limit</div>
                      <div className="text-blue-700">{license.usageRights.projects}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Examples */}
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-bold text-gray-900">Usage Examples</h2>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-green-800 mb-4">✓ What You Can Do</h3>
                    <ul className="space-y-2">
                      {license.examples.allowed.map((example, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <svg className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-700">{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-red-800 mb-4">✗ What You Cannot Do</h3>
                    <ul className="space-y-2">
                      {license.examples.notAllowed.map((example, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <svg className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          <span className="text-gray-700">{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FAQ Section */}
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {license.faqs.map((faq, index) => (
                    <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">{faq.question}</h3>
                      <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pricing Calculator */}
            <Card>
              <CardHeader>
                <h3 className="text-xl font-bold text-gray-900">Pricing Calculator</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Projects
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={calculatorProjects}
                      onChange={(e) => setCalculatorProjects(parseInt(e.target.value) || 1)}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Domains
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={calculatorDomains}
                      onChange={(e) => setCalculatorDomains(parseInt(e.target.value) || 1)}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between text-lg font-bold">
                      <span>Estimated Price:</span>
                      <CheckoutPrice amount={calculatePrice()} size="sm" showSymbol={true} showCode={false} />
                    </div>
                  </div>
                  <Button className="w-full" onClick={handleChooseLicense}>
                    Get This License
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Other License Types */}
            <Card>
              <CardHeader>
                <h3 className="text-xl font-bold text-gray-900">Other License Types</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {otherLicenses.map((otherLicense) => (
                    <Link key={otherLicense.id} href={`/marketplace/licensing/${otherLicense.id}`}>
                      <div className="p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors cursor-pointer">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-gray-900">{otherLicense.name}</h4>
                          <CheckoutPrice amount={otherLicense.price} size="sm" showSymbol={true} showCode={false} />
                        </div>
                        <p className="text-sm text-gray-600">{otherLicense.tagline}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Contact Support */}
            <Card>
              <CardHeader>
                <h3 className="text-xl font-bold text-gray-900">Need Help?</h3>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Have questions about licensing? Our team is here to help you choose the right option.
                </p>
                <div className="space-y-2">
                  <Link href="/contact">
                    <Button variant="outline" className="w-full">
                      Contact Support
                    </Button>
                  </Link>
                  <Link href="/marketplace/licensing">
                    <Button variant="outline" className="w-full">
                      Compare All Licenses
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
