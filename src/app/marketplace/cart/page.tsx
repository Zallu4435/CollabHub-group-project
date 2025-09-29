// market/src/app/cart/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { CartItem } from '../components/cart/CartItem';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { CartItem as CartItemType, Cart } from '../types/cart';
import { CartPrice } from '@/components/ui/PriceDisplay';

export default function CartPage() {
  const [cart, setCart] = useState<Cart>({
    items: [
      {
        id: '1',
        projectId: '1',
        title: 'Modern E-commerce Dashboard',
        description: 'A comprehensive e-commerce dashboard built with React, TypeScript, and Tailwind CSS. Features include analytics, order management, inventory tracking, and customer insights.',
        price: 79.99,
        licenseType: 'commercial',
        thumbnail: '/images/projects/dashboard-1.jpg',
        sellerId: 'seller1',
        sellerName: 'Sarah Johnson',
        sellerAvatar: '/avatars/sarah.jpg',
        addedAt: new Date().toISOString(),
        quantity: 1,
        techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Chart.js', 'Node.js'],
        category: 'dashboard',
        rating: 4.8,
        reviewCount: 127,
        tags: ['ecommerce', 'dashboard', 'analytics', 'admin'],
        fileSize: '2.4 MB',
        lastUpdated: '2024-01-15T10:30:00Z',
        previewUrl: 'https://demo.example.com/dashboard',
        demoUrl: 'https://demo.example.com/dashboard',
        documentationUrl: 'https://docs.example.com/dashboard',
        supportIncluded: true,
        updatesIncluded: true,
        commercialUse: true,
        resaleRights: false,
        customizationRights: true
      },
      {
        id: '2',
        projectId: '2',
        title: 'React Native Food Delivery App',
        description: 'Complete food delivery mobile app with real-time tracking, payment integration, and admin panel. Built with React Native, Firebase, and Stripe.',
        price: 149.99,
        licenseType: 'extended',
        thumbnail: '/images/projects/food-app-1.jpg',
        sellerId: 'seller2',
        sellerName: 'Mike Chen',
        sellerAvatar: '/avatars/mike.jpg',
        addedAt: new Date().toISOString(),
        quantity: 1,
        techStack: ['React Native', 'Firebase', 'Stripe', 'Redux', 'Google Maps'],
        category: 'mobile-apps',
        rating: 4.9,
        reviewCount: 89,
        tags: ['food-delivery', 'mobile', 'react-native', 'firebase'],
        fileSize: '15.2 MB',
        lastUpdated: '2024-01-10T14:20:00Z',
        previewUrl: 'https://preview.example.com/food-app',
        demoUrl: 'https://demo.example.com/food-app',
        documentationUrl: 'https://docs.example.com/food-app',
        supportIncluded: true,
        updatesIncluded: true,
        commercialUse: true,
        resaleRights: true,
        customizationRights: true
      }
    ],
    total: 0,
    subtotal: 0,
    tax: 0,
    discount: 0,
    platformFee: 0,
    estimatedDelivery: 'Instant',
    currency: 'USD'
  });

  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  // Calculate totals
  useEffect(() => {
    const licenseMultipliers: Record<string, number> = {
      personal: 1,
      commercial: 1.5,
      extended: 2.5,
      'white-label': 4
    };

    const subtotal = cart.items.reduce((sum, item) => {
      const multiplier = licenseMultipliers[item.licenseType] || 1;
      return sum + (item.price * multiplier * item.quantity);
    }, 0);

    const platformFee = subtotal * 0.05; // 5% platform fee
    const discount = promoApplied ? subtotal * 0.1 : 0; // 10% discount
    const tax = (subtotal + platformFee - discount) * 0.08; // 8% tax
    const total = subtotal + platformFee - discount + tax;

    setCart(prev => ({
      ...prev,
      subtotal,
      platformFee,
      discount,
      tax,
      total
    }));
  }, [cart.items, promoApplied]);

  const handleRemoveItem = (itemId: string) => {
    setCart(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== itemId)
    }));
  };

  const handleUpdateLicense = (itemId: string, newLicense: string) => {
    setCart(prev => ({
      ...prev,
      items: prev.items.map(item =>
        item.id === itemId ? { ...item, licenseType: newLicense } : item
      )
    }));
  };

  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    setCart(prev => ({
      ...prev,
      items: prev.items.map(item =>
        item.id === itemId ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    }));
  };

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === 'save10') {
      setPromoApplied(true);
    }
  };

  if (cart.items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
          <svg className="w-12 h-12 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6.5M7 13l-1.5-6.5m0 0h15M17 21a2 2 0 100-4 2 2 0 000 4zM9 21a2 2 0 100-4 2 2 0 000 4z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-black mb-4">Your cart is empty</h2>
        <p className="text-black mb-8">
          Discover amazing projects and templates to kickstart your next development project.
        </p>
        <Link href="/marketplace/browse">
          <Button size="lg">Browse Projects</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-black mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-black mb-2">
              Shopping Cart ({cart.items.length} {cart.items.length === 1 ? 'item' : 'items'})
            </h2>
            <p className="text-black">
              Review your selected projects and customize your licenses before checkout.
            </p>
          </div>

          <div className="space-y-4">
            {cart.items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onRemove={handleRemoveItem}
                onUpdateLicense={handleUpdateLicense}
              />
            ))}
          </div>

          {/* Continue Shopping */}
          <div className="mt-6">
            <Link href="/marketplace/browse">
              <Button variant="outline">
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <h2 className="text-xl font-semibold text-black">Order Summary</h2>
              <p className="text-sm text-black mt-1">
                {cart.estimatedDelivery} • {cart.currency}
              </p>
            </CardHeader>
            <CardContent>
              {/* Order Items Summary */}
              <div className="mb-6">
                <h3 className="font-medium text-black mb-3">Items in Cart</h3>
                <div className="space-y-2">
                  {cart.items.map((item) => {
                    const licenseMultipliers: Record<string, number> = {
                      personal: 1,
                      commercial: 1.5,
                      extended: 2.5,
                      'white-label': 4
                    };
                    const multiplier = licenseMultipliers[item.licenseType] || 1;
                    const itemTotal = item.price * multiplier * item.quantity;
                    
                    return (
                      <div key={item.id} className="flex justify-between text-sm">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-black truncate">{item.title}</p>
                          <p className="text-black">
                            {item.licenseType} × {item.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <CartPrice amount={itemTotal} showSymbol={true} showCode={false} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Promo Code */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-black mb-2">
                  Promo Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter code"
                    className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={promoApplied}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleApplyPromo}
                    disabled={promoApplied || !promoCode}
                  >
                    Apply
                  </Button>
                </div>
                {promoApplied && (
                  <p className="text-sm text-green-600 mt-1 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Promo code applied!
                  </p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm text-black">
                  <span>Subtotal</span>
                  <span>${cart.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-black">
                  <span>Platform Fee (5%)</span>
                  <span>${cart.platformFee.toFixed(2)}</span>
                </div>
                {cart.discount > 0 && (
                  <div className="flex justify-between text-sm text-black">
                    <span>Discount</span>
                    <span>-${cart.discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm text-black">
                  <span>Tax (8%)</span>
                  <span>${cart.tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-semibold text-black">
                    <span>Total</span>
                    <span>${cart.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <Link href="/marketplace/cart/checkout">
                <Button className="w-full" size="lg">
                  Proceed to Checkout
                </Button>
              </Link>

              {/* Payment Methods */}
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <h4 className="text-sm font-medium text-black mb-2">Accepted Payment Methods</h4>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">V</div>
                  <div className="w-8 h-5 bg-red-600 rounded text-white text-xs flex items-center justify-center font-bold">M</div>
                  <div className="w-8 h-5 bg-blue-500 rounded text-white text-xs flex items-center justify-center font-bold">A</div>
                  <div className="w-8 h-5 bg-orange-500 rounded text-white text-xs flex items-center justify-center font-bold">P</div>
                </div>
              </div>

              {/* Security Notice */}
                <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center text-sm text-black">
                  <svg className="w-4 h-4 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Secure checkout with 256-bit SSL encryption
                </div>
              </div>

              {/* Support Info */}
              <div className="mt-4 text-center">
                <p className="text-xs text-black">
                  Need help? <Link href="/marketplace/help" className="text-blue-600 hover:text-blue-700">Contact Support</Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}