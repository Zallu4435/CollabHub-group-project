// market/src/app/cart/checkout/page.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader } from '@/app/marketplace/components/ui/Card';
import { Button } from '@/app/marketplace/components/ui/Button';
import { Badge } from '@/app/marketplace/components/ui/Badge';
import Image from 'next/image';
import { CheckoutPrice } from '@/components/ui/PriceDisplay';
import CoinRedemptionModal from '@/app/marketplace/components/coin/CoinRedemptionModal';
import { coinService } from '@/app/marketplace/lib/services/coinService';
import type { CoinBalance } from '@/app/marketplace/types/coin';
import { CurrencySelector } from '@/components/ui/CurrencySelector';

interface CheckoutForm {
  email: string;
  firstName: string;
  lastName: string;
  company?: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  paymentMethod: 'card' | 'paypal';
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  nameOnCard: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [coinBalance, setCoinBalance] = useState<CoinBalance | null>(null);
  const [showCoinModal, setShowCoinModal] = useState(false);
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [coinsUsed, setCoinsUsed] = useState(0);
  const [form, setForm] = useState<CheckoutForm>({
    email: '',
    firstName: '',
    lastName: '',
    company: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    paymentMethod: 'card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });

  // Mock cart data
  const cartItems = [
    {
      id: '1',
      projectId: '1',
      title: 'Modern E-commerce Dashboard',
      price: 79.99,
      licenseType: 'commercial',
      thumbnail: '/images/projects/dashboard-1.jpg',
      sellerName: 'Sarah Johnson'
    },
    {
      id: '2',
      projectId: '2',
      title: 'React Native Food Delivery App',
      price: 149.99,
      licenseType: 'extended',
      thumbnail: '/images/projects/food-app-1.jpg',
      sellerName: 'Mike Chen'
    }
  ];

  const subtotal = 299.97;
  const discount = 29.99;
  const tax = 21.60;
  const coinDiscount = appliedDiscount;
  const finalTotal = 291.58 - coinDiscount;

  const steps = [
    { id: 1, name: 'Information', completed: currentStep > 1 },
    { id: 2, name: 'Payment', completed: currentStep > 2 },
    { id: 3, name: 'Review', completed: false }
  ];

  // Load coin balance on component mount
  React.useEffect(() => {
    const loadCoinBalance = async () => {
      try {
        const balance = await coinService.getBalance('user_1');
        setCoinBalance(balance);
      } catch (error) {
        console.error('Failed to load coin balance:', error);
      }
    };
    loadCoinBalance();
  }, []);

  const handleInputChange = (field: keyof CheckoutForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleApplyCoinDiscount = (discountAmount: number, coinsUsedAmount: number) => {
    setAppliedDiscount(discountAmount);
    setCoinsUsed(coinsUsedAmount);
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmitOrder = async () => {
    setLoading(true);
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      router.push('/marketplace/cart/success');
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-black mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center">
              {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                  <div className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        step.completed
                          ? 'bg-green-500 text-white'
                          : currentStep === step.id
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-200 text-black'
                      }`}
                    >
                      {step.completed ? (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        step.id
                      )}
                    </div>
                    <span className={`ml-2 text-sm font-medium ${
                      currentStep === step.id ? 'text-blue-600' : 'text-black'
                    }`}>
                      {step.name}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="flex-1 h-px bg-gray-200 mx-4" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Step 1: Information */}
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold">Contact & Billing Information</h2>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-black mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      placeholder="your@email.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      value={form.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      value={form.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-black mb-2">
                      Company (Optional)
                    </label>
                    <input
                      type="text"
                      value={form.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-black mb-2">
                      Address *
                    </label>
                    <input
                      type="text"
                      value={form.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      value={form.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      State *
                    </label>
                    <input
                      type="text"
                      value={form.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      ZIP Code *
                    </label>
                    <input
                      type="text"
                      value={form.zipCode}
                      onChange={(e) => handleInputChange('zipCode', e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      Country *
                    </label>
                    <select
                      value={form.country}
                      onChange={(e) => handleInputChange('country', e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                    >
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="UK">United Kingdom</option>
                      <option value="AU">Australia</option>
                      <option value="DE">Germany</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex justify-end mt-8">
                  <Button onClick={handleNextStep}>
                    Continue to Payment
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Payment */}
          {currentStep === 2 && (
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold">Payment Method</h2>
              </CardHeader>
              <CardContent>
                {/* Payment Method Selection */}
                <div className="mb-6">
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => handleInputChange('paymentMethod', 'card')}
                      className={`p-4 border rounded-lg flex items-center justify-center ${
                        form.paymentMethod === 'card'
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-300'
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-2xl mb-2">💳</div>
                        <div className="font-medium">Credit Card</div>
                      </div>
                    </button>
                    
                    <button
                      onClick={() => handleInputChange('paymentMethod', 'paypal')}
                      className={`p-4 border rounded-lg flex items-center justify-center ${
                        form.paymentMethod === 'paypal'
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-300'
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-2xl mb-2">🅿️</div>
                        <div className="font-medium">PayPal</div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Credit Card Form */}
                {form.paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-black mb-2">
                        Card Number *
                      </label>
                      <input
                        type="text"
                        value={form.cardNumber}
                        onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                        placeholder="1234 5678 9012 3456"
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-black mb-2">
                        Name on Card *
                      </label>
                      <input
                        type="text"
                        value={form.nameOnCard}
                        onChange={(e) => handleInputChange('nameOnCard', e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-black mb-2">
                          Expiry Date *
                        </label>
                        <input
                          type="text"
                          value={form.expiryDate}
                          onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                          placeholder="MM/YY"
                          className="w-full border border-gray-300 rounded-md px-3 py-2"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-black mb-2">
                          CVV *
                        </label>
                        <input
                          type="text"
                          value={form.cvv}
                          onChange={(e) => handleInputChange('cvv', e.target.value)}
                          placeholder="123"
                          className="w-full border border-gray-300 rounded-md px-3 py-2"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* PayPal */}
                {form.paymentMethod === 'paypal' && (
                  <div className="text-center py-8">
                    <div className="text-6xl mb-4">🅿️</div>
                    <p className="text-black mb-4">
                      You will be redirected to PayPal to complete your payment.
                    </p>
                    <div className="text-sm text-black">
                      Click "Review Order" to continue with PayPal
                    </div>
                  </div>
                )}

                {/* Coin Redemption Section */}
                <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">🪙</span>
                      <h3 className="font-semibold text-gray-900">Use Coins</h3>
                      {coinBalance && (
                        <span className="text-sm text-gray-600">
                          ({coinBalance.activeCoins} available)
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => setShowCoinModal(true)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      {appliedDiscount > 0 ? 'Change' : 'Apply Discount'}
                    </button>
                  </div>

                  {appliedDiscount > 0 ? (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-green-600">✓</span>
                        <span className="text-sm text-green-800">
                          Applied discount: ${appliedDiscount.toFixed(2)} ({coinsUsed} coins)
                        </span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-600">
                      Use your coins to get discounts on this order
                    </p>
                  )}
                </div>
                
                <div className="flex justify-between mt-8">
                  <Button variant="outline" onClick={handlePreviousStep}>
                    Back to Information
                  </Button>
                  <Button onClick={handleNextStep}>
                    Review Order
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Review */}
          {currentStep === 3 && (
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold">Review Your Order</h2>
              </CardHeader>
              <CardContent>
                {/* Contact Info */}
                <div className="mb-6">
                  <h3 className="font-medium text-black mb-2">Contact Information</h3>
                  <p className="text-black">{form.email}</p>
                </div>

                {/* Billing Address */}
                <div className="mb-6">
                  <h3 className="font-medium text-black mb-2">Billing Address</h3>
                  <p className="text-black">
                    {form.firstName} {form.lastName}<br />
                    {form.company && `${form.company}\n`}
                    {form.address}<br />
                    {form.city}, {form.state} {form.zipCode}<br />
                    {form.country}
                  </p>
                </div>

                {/* Payment Method */}
                <div className="mb-6">
                  <h3 className="font-medium text-black mb-2">Payment Method</h3>
                  <p className="text-black">
                    {form.paymentMethod === 'card' 
                      ? `Credit Card ending in ${form.cardNumber.slice(-4)}`
                      : 'PayPal'
                    }
                  </p>
                </div>

                {/* Terms */}
                <div className="mb-6">
                  <label className="flex items-start">
                    <input type="checkbox" className="mt-1 mr-3" />
                    <span className="text-sm text-black">
                      I agree to the{' '}
                      <a href="/terms" className="text-blue-600 hover:underline">Terms of Service</a>{' '}
                      and{' '}
                      <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>
                    </span>
                  </label>
                </div>
                
                <div className="flex justify-between">
                  <Button variant="outline" onClick={handlePreviousStep}>
                    Back to Payment
                  </Button>
                  <Button onClick={handleSubmitOrder} disabled={loading}>
                    {loading ? 'Processing...' : `Complete Order - $${finalTotal.toFixed(2)}`}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Order Summary</h2>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Currency:</span>
                  <CurrencySelector 
                    variant="compact" 
                    size="sm" 
                    showFlag={true}
                    showSymbol={true}
                    showName={false}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Cart Items */}
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <div className="w-16 h-12 relative rounded-md overflow-hidden bg-gray-100">
                      <Image
                        src={item.thumbnail}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-black truncate">
                        {item.title}
                      </h4>
                      <p className="text-xs text-black">by {item.sellerName}</p>
                      <Badge variant="info" size="sm" className="mt-1 capitalize">
                        {item.licenseType}
                      </Badge>
                    </div>
                    <div className="text-sm font-medium text-black">
                      <CheckoutPrice amount={item.price} showSymbol={true} showCode={false} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 pt-4 border-t">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-green-600">
                  <span>Discount</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
                {coinDiscount > 0 && (
                  <div className="flex justify-between text-sm text-yellow-600">
                    <span>Coin Discount</span>
                    <span>-${coinDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>${finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Coin Redemption Modal */}
      <CoinRedemptionModal
        isOpen={showCoinModal}
        onClose={() => setShowCoinModal(false)}
        userId="user_1"
        orderTotal={subtotal}
        onApplyDiscount={handleApplyCoinDiscount}
      />
    </div>
  );
}
