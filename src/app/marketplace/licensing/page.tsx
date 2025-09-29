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
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Licensing Options</h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
            Choose the right license for your project. Every license includes lifetime updates and a satisfaction guarantee.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Link href="#licenses">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">View Licenses</Button>
            </Link>
            <Link href="/marketplace/contact">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">Speak to Sales</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* License Types */}
      <section id="licenses" className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {licenseTypes.map((license) => (
              <Card 
                key={license.name} 
                hover 
                className="h-full overflow-hidden group border-0 shadow-lg hover:shadow-2xl transition-all duration-300 rounded-xl"
              >
                <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-blue-50 group-hover:bg-blue-100 transition-colors" />
                <CardHeader>
                  <div className="text-center">
                    <div className="mx-auto mb-3 h-12 w-12 rounded-2xl flex items-center justify-center text-2xl bg-blue-600/10 text-blue-600">
                      {license.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-black mb-1">
                      {license.name}
                    </h3>
                    <div className="inline-flex items-center justify-center px-3 py-1 rounded-full text-sm font-semibold bg-gray-100 text-black mb-2">
                      Multiplier: {license.price}
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
                        <svg className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href={license.href}>
                    <Button className="w-full group-hover:translate-y-[-1px] transition-transform">Learn More</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* License Comparison */}
      <section className="pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-semibold text-center">License Comparison</h2>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="text-left py-3 px-4 font-medium text-black">Feature</th>
                      <th className="text-center py-3 px-4 font-medium text-black">Personal</th>
                      <th className="text-center py-3 px-4 font-medium text-black">Commercial</th>
                      <th className="text-center py-3 px-4 font-medium text-black">Extended</th>
                      <th className="text-center py-3 px-4 font-medium text-black">White Label</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-black">Personal Use</td>
                      <td className="text-center py-3 px-4">✅</td>
                      <td className="text-center py-3 px-4">✅</td>
                      <td className="text-center py-3 px-4">✅</td>
                      <td className="text-center py-3 px-4">✅</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-black">Commercial Use</td>
                      <td className="text-center py-3 px-4">❌</td>
                      <td className="text-center py-3 px-4">✅</td>
                      <td className="text-center py-3 px-4">✅</td>
                      <td className="text-center py-3 px-4">✅</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-black">Client Projects</td>
                      <td className="text-center py-3 px-4">❌</td>
                      <td className="text-center py-3 px-4">✅</td>
                      <td className="text-center py-3 px-4">✅</td>
                      <td className="text-center py-3 px-4">✅</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-black">Resale Rights</td>
                      <td className="text-center py-3 px-4">❌</td>
                      <td className="text-center py-3 px-4">❌</td>
                      <td className="text-center py-3 px-4">✅</td>
                      <td className="text-center py-3 px-4">✅</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
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
      </section>

      {/* FAQ Section */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
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
      </section>

      {/* CTA */}
      <section className="py-12 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">Need a custom license?</h2>
          <p className="text-xl text-blue-100 mb-8">We can tailor license terms for enterprise, OEM, or volume needs.</p>
          <Link href="/marketplace/contact">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">Talk to us</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

