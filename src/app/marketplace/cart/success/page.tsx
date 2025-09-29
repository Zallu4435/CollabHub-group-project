// market/src/app/cart/success/page.tsx
'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/app/marketplace/components/ui/Button';
import { Card, CardContent } from '@/app/marketplace/components/ui/Card';
import { Badge } from '@/app/marketplace/components/ui/Badge';
import CoinEarningNotification from '@/app/marketplace/components/coin/CoinEarningNotification';

export default function SuccessPage() {
  const orderId = 'ORD-2025-001234';
  const orderDate = new Date().toLocaleDateString();

  const purchasedItems = [
    {
      id: '1',
      title: 'Modern E-commerce Dashboard',
      licenseType: 'commercial',
      downloadUrl: '/downloads/ecommerce-dashboard.zip',
      documentation: '/docs/ecommerce-dashboard'
    },
    {
      id: '2',
      title: 'React Native Food Delivery App',
      licenseType: 'extended',
      downloadUrl: '/downloads/food-delivery-app.zip',
      documentation: '/docs/food-delivery-app'
    }
  ];

  // Confetti animation effect
  useEffect(() => {
    // Simple confetti effect (you can replace with a proper library)
    const duration = 3000;
    const end = Date.now() + duration;

    (function frame() {
      if (Date.now() < end) {
        // Simple confetti simulation
        requestAnimationFrame(frame);
      }
    }());
  }, []);

  const handleDownload = (downloadUrl: string, title: string) => {
    // Simulate download
    console.log(`Downloading: ${title} from ${downloadUrl}`);
    // In a real app, this would trigger the actual download
    alert(`Downloading ${title}...`);
  };

  const handleViewDocumentation = (docUrl: string, title: string) => {
    // Simulate opening documentation
    console.log(`Opening documentation for ${title}: ${docUrl}`);
    // In a real app, this would open the documentation
    alert(`Opening documentation for ${title}...`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-8">
        {/* Success Icon */}
        <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
          <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-4xl font-bold text-black mb-4">
          🎉 Order Successful!
        </h1>
        <p className="text-xl text-black mb-2">
          Thank you for your purchase!
        </p>
        <p className="text-black">
          Order #{orderId} • {orderDate}
        </p>
      </div>

      {/* Order Details */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold mb-6">Your Downloads</h2>
          
          <div className="space-y-6">
            {purchasedItems.map((item) => (
              <div key={item.id} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-black mb-2">
                      {item.title}
                    </h3>
                    <Badge variant="success" className="capitalize">
                      {item.licenseType} License
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl">✅</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button 
                    className="w-full"
                    onClick={() => handleDownload(item.downloadUrl, item.title)}
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-4-4m4 4l4-4m-6 2h8" />
                    </svg>
                    Download Project
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleViewDocumentation(item.documentation, item.title)}
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    View Documentation
                  </Button>
                </div>

                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-700">
                    💡 <strong>Pro Tip:</strong> Save these download links! You can access them anytime from your{' '}
                    <Link href="/marketplace/dashboard/downloads" className="underline font-medium">
                      downloads dashboard
                    </Link>.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">What's Next?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-4-4m4 4l4-4m-6 2h8" />
                </svg>
              </div>
              <h3 className="font-medium text-black mb-2">Download & Extract</h3>
              <p className="text-sm text-black">
                Download your projects and extract the files to get started.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="font-medium text-black mb-2">Read Documentation</h3>
              <p className="text-sm text-black">
                Follow the setup guides for smooth installation and customization.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 bg-purple-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="font-medium text-black mb-2">Get Support</h3>
              <p className="text-sm text-black">
                Need help? Contact the sellers or reach out to our support team.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="text-center space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/marketplace/dashboard/downloads">
            <Button size="lg">
              View My Downloads
            </Button>
          </Link>
          
          <Link href={`/marketplace/dashboard/invoice/${orderId}`}>
            <Button variant="outline" size="lg">
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Receipt
            </Button>
          </Link>
          
          <Link href="/marketplace/browse">
            <Button variant="outline" size="lg">
              Browse More Projects
            </Button>
          </Link>
        </div>

        <div className="text-sm text-black">
          <p>
            Questions about your order?{' '}
            <Link href="/contact" className="text-blue-600 hover:underline">
              Contact Support
            </Link>
          </p>
        </div>
      </div>

      {/* Email Confirmation Notice */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg text-center">
        <p className="text-sm text-black">
          📧 A confirmation email with your receipt and download links has been sent to your email address.
        </p>
      </div>

      {/* Coin Earning Notification */}
      <CoinEarningNotification 
        userId="user_1" 
        action="purchase" 
        onEarned={(coins) => console.log(`Earned ${coins} coins from purchase!`)}
      />
    </div>
  );
}
