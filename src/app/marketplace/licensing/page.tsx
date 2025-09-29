// market/src/app/licensing/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

const licenseTypes = [
  {
    name: 'Personal License',
    description: 'Perfect for individual developers and personal projects',
    href: '/marketplace/licensing/personal',
    icon: '👤',
    price: '1x',
    features: [
      'Use in personal projects',
      'Single developer license',
      'No redistribution rights',
      'Commercial use prohibited',
      'Lifetime updates'
    ],
    color: 'blue'
  },
  {
    name: 'Commercial License',
    description: 'Ideal for businesses and commercial applications',
    href: '/marketplace/licensing/commercial',
    icon: '🏢',
    price: '1.5x',
    features: [
      'Commercial use allowed',
      'Up to 5 developers',
      'Client projects included',
      'Redistribution rights',
      'Priority support'
    ],
    color: 'green'
  },
  {
    name: 'Extended License',
    description: 'For agencies and large-scale deployments',
    href: '/marketplace/licensing/extended',
    icon: '🚀',
    price: '2.5x',
    features: [
      'Unlimited commercial use',
      'Unlimited developers',
      'White-label rights',
      'Resale rights',
      '24/7 support'
    ],
    color: 'purple'
  },
  {
    name: 'White Label License',
    description: 'Complete ownership and resale rights',
    href: '/marketplace/licensing/white-label',
    icon: '🏷️',
    price: '4x',
    features: [
      'Complete ownership',
      'Resale rights',
      'Remove attribution',
      'Modify and rebrand',
      'Enterprise support'
    ],
    color: 'orange'
  }
];

const faqs = [
  {
    question: 'What is the difference between Personal and Commercial licenses?',
    answer: 'Personal licenses are for individual use only, while Commercial licenses allow you to use the project in client work and commercial applications.'
  },
  {
    question: 'Can I upgrade my license later?',
    answer: 'Yes! You can upgrade from any lower-tier license to a higher-tier license by paying the difference in price.'
  },
  {
    question: 'Do I get lifetime updates with all licenses?',
    answer: 'Yes, all licenses include lifetime updates for the specific version you purchase. Major version updates may require a new license.'
  },
  {
    question: 'What happens if I violate the license terms?',
    answer: 'License violations may result in termination of your license and legal action. We recommend reviewing the license terms carefully before purchase.'
  }
];

export default function LicensingPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-black mb-4">
          Licensing Options
        </h1>
        <p className="text-xl text-black max-w-3xl mx-auto">
          Choose the right license for your project needs. All licenses include lifetime updates 
          and come with our satisfaction guarantee.
        </p>
      </div>

      {/* License Types */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {licenseTypes.map((license) => (
          <Card key={license.name} hover className="h-full">
            <CardHeader>
              <div className="text-center">
                <span className="text-4xl mb-2 block">{license.icon}</span>
                <h3 className="text-xl font-semibold text-black mb-2">
                  {license.name}
                </h3>
                <div className="text-2xl font-bold text-black mb-2">
                  {license.price}
                </div>
                <p className="text-sm text-black">
                  {license.description}
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-6">
                {license.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-black">
                    <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link href={license.href}>
                <Button className="w-full">
                  Learn More
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* License Comparison */}
      <div className="mb-12">
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-semibold text-center">License Comparison</h2>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-black">Feature</th>
                    <th className="text-center py-3 px-4 font-medium text-black">Personal</th>
                    <th className="text-center py-3 px-4 font-medium text-black">Commercial</th>
                    <th className="text-center py-3 px-4 font-medium text-black">Extended</th>
                    <th className="text-center py-3 px-4 font-medium text-black">White Label</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="py-3 px-4 text-sm text-black">Personal Use</td>
                    <td className="text-center py-3 px-4">✅</td>
                    <td className="text-center py-3 px-4">✅</td>
                    <td className="text-center py-3 px-4">✅</td>
                    <td className="text-center py-3 px-4">✅</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-sm text-black">Commercial Use</td>
                    <td className="text-center py-3 px-4">❌</td>
                    <td className="text-center py-3 px-4">✅</td>
                    <td className="text-center py-3 px-4">✅</td>
                    <td className="text-center py-3 px-4">✅</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-sm text-black">Client Projects</td>
                    <td className="text-center py-3 px-4">❌</td>
                    <td className="text-center py-3 px-4">✅</td>
                    <td className="text-center py-3 px-4">✅</td>
                    <td className="text-center py-3 px-4">✅</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-sm text-black">Resale Rights</td>
                    <td className="text-center py-3 px-4">❌</td>
                    <td className="text-center py-3 px-4">❌</td>
                    <td className="text-center py-3 px-4">✅</td>
                    <td className="text-center py-3 px-4">✅</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-sm text-black">White Label</td>
                    <td className="text-center py-3 px-4">❌</td>
                    <td className="text-center py-3 px-4">❌</td>
                    <td className="text-center py-3 px-4">❌</td>
                    <td className="text-center py-3 px-4">✅</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* FAQ Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Frequently Asked Questions</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index}>
                  <h3 className="font-medium text-black mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-sm text-black">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Need Help?</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-black">
                Not sure which license is right for you? Our team is here to help you choose the perfect license for your project.
              </p>
              <div className="space-y-3">
                <Link href="/contact">
                  <Button className="w-full">
                    Contact Support
                  </Button>
                </Link>
                <Link href="/marketplace/licensing/commercial">
                  <Button className="w-full" variant="outline">
                    View All Licenses
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

