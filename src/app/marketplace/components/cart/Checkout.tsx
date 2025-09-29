// market/src/components/cart/Checkout.tsx
import React, { useState } from 'react';
import { CartItem as CartItemType } from '../../types/cart';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';

interface CheckoutProps {
  items: CartItemType[];
  onComplete: (orderData: OrderData) => void;
  onBack: () => void;
  className?: string;
}

interface OrderData {
  paymentMethod: string;
  billingAddress: BillingAddress;
  notes?: string;
}

interface BillingAddress {
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export const Checkout: React.FC<CheckoutProps> = ({
  items,
  onComplete,
  onBack,
  className = ''
}) => {
  const [step, setStep] = useState<'billing' | 'payment' | 'review'>('billing');
  const [loading, setLoading] = useState(false);
  
  const [billingAddress, setBillingAddress] = useState<BillingAddress>({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US'
  });
  
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [notes, setNotes] = useState('');

  const subtotal = items.reduce((sum, item) => {
    const licenseMultiplier = {
      personal: 1,
      commercial: 1.5,
      extended: 2.5,
      'white-label': 4
    }[item.licenseType] || 1;
    
    return sum + (item.price * licenseMultiplier);
  }, 0);

  const platformFee = subtotal * 0.05;
  const total = subtotal + platformFee;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    onComplete({
      paymentMethod,
      billingAddress,
      notes
    });
    
    setLoading(false);
  };

  const isBillingValid = billingAddress.firstName && 
    billingAddress.lastName && 
    billingAddress.email && 
    billingAddress.address && 
    billingAddress.city && 
    billingAddress.state && 
    billingAddress.zipCode;

  return (
    <div className={className}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">Checkout</h1>
          <p className="text-black">Complete your purchase securely</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit}>
              {/* Billing Information */}
              {step === 'billing' && (
                <Card className="mb-6">
                  <CardHeader>
                    <h2 className="text-xl font-semibold text-black">Billing Information</h2>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="First Name"
                        value={billingAddress.firstName}
                        onChange={(e) => setBillingAddress(prev => ({ ...prev, firstName: e.target.value }))}
                        required
                      />
                      <Input
                        label="Last Name"
                        value={billingAddress.lastName}
                        onChange={(e) => setBillingAddress(prev => ({ ...prev, lastName: e.target.value }))}
                        required
                      />
                      <Input
                        label="Email"
                        type="email"
                        value={billingAddress.email}
                        onChange={(e) => setBillingAddress(prev => ({ ...prev, email: e.target.value }))}
                        required
                      />
                      <Input
                        label="Company (Optional)"
                        value={billingAddress.company}
                        onChange={(e) => setBillingAddress(prev => ({ ...prev, company: e.target.value }))}
                      />
                      <div className="md:col-span-2">
                        <Input
                          label="Address"
                          value={billingAddress.address}
                          onChange={(e) => setBillingAddress(prev => ({ ...prev, address: e.target.value }))}
                          required
                        />
                      </div>
                      <Input
                        label="City"
                        value={billingAddress.city}
                        onChange={(e) => setBillingAddress(prev => ({ ...prev, city: e.target.value }))}
                        required
                      />
                      <Input
                        label="State"
                        value={billingAddress.state}
                        onChange={(e) => setBillingAddress(prev => ({ ...prev, state: e.target.value }))}
                        required
                      />
                      <Input
                        label="ZIP Code"
                        value={billingAddress.zipCode}
                        onChange={(e) => setBillingAddress(prev => ({ ...prev, zipCode: e.target.value }))}
                        required
                      />
                      <div>
                        <label className="block text-sm font-medium text-black mb-2">Country</label>
                        <select
                          value={billingAddress.country}
                          onChange={(e) => setBillingAddress(prev => ({ ...prev, country: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="US">United States</option>
                          <option value="CA">Canada</option>
                          <option value="GB">United Kingdom</option>
                          <option value="AU">Australia</option>
                          <option value="DE">Germany</option>
                          <option value="FR">France</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Payment Method */}
              {step === 'payment' && (
                <Card className="mb-6">
                  <CardHeader>
                    <h2 className="text-xl font-semibold text-black">Payment Method</h2>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-black mb-3">Select Payment Method</label>
                        <div className="space-y-3">
                          {[
                            { id: 'card', name: 'Credit/Debit Card', icon: '💳' },
                            { id: 'paypal', name: 'PayPal', icon: '🅿️' },
                            { id: 'stripe', name: 'Stripe', icon: '💳' },
                            { id: 'crypto', name: 'Cryptocurrency', icon: '₿' }
                          ].map((method) => (
                            <label key={method.id} className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-gray-300">
                              <input
                                type="radio"
                                name="paymentMethod"
                                value={method.id}
                                checked={paymentMethod === method.id}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                className="mr-3"
                              />
                              <span className="text-2xl mr-3">{method.icon}</span>
                              <span className="font-medium">{method.name}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {paymentMethod === 'card' && (
                        <div className="space-y-4">
                          <Input
                            label="Card Number"
                            placeholder="1234 5678 9012 3456"
                            required
                          />
                          <div className="grid grid-cols-2 gap-4">
                            <Input
                              label="Expiry Date"
                              placeholder="MM/YY"
                              required
                            />
                            <Input
                              label="CVV"
                              placeholder="123"
                              required
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Review Order */}
              {step === 'review' && (
                <Card className="mb-6">
                  <CardHeader>
                    <h2 className="text-xl font-semibold text-black">Review Your Order</h2>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium text-black mb-2">Order Items</h3>
                        <div className="space-y-3">
                          {items.map((item) => (
                            <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div>
                                <h4 className="font-medium text-black">{item.title}</h4>
                                <p className="text-sm text-black">
                                  {item.licenseType} License
                                </p>
                              </div>
                              <div className="text-right">
                                <div className="font-medium">${item.price.toFixed(2)}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="font-medium text-black mb-2">Billing Address</h3>
                        <div className="p-3 bg-gray-50 rounded-lg text-sm">
                          <div>{billingAddress.firstName} {billingAddress.lastName}</div>
                          <div>{billingAddress.email}</div>
                          <div>{billingAddress.address}</div>
                          <div>{billingAddress.city}, {billingAddress.state} {billingAddress.zipCode}</div>
                          <div>{billingAddress.country}</div>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-medium text-black mb-2">Payment Method</h3>
                        <div className="p-3 bg-gray-50 rounded-lg text-sm">
                          {paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1)}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-black mb-2">
                          Order Notes (Optional)
                        </label>
                        <textarea
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Any special instructions or notes..."
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    if (step === 'billing') {
                      onBack();
                    } else if (step === 'payment') {
                      setStep('billing');
                    } else if (step === 'review') {
                      setStep('payment');
                    }
                  }}
                >
                  Back
                </Button>

                {step === 'billing' && (
                  <Button
                    type="button"
                    onClick={() => setStep('payment')}
                    disabled={!isBillingValid}
                  >
                    Continue to Payment
                  </Button>
                )}

                {step === 'payment' && (
                  <Button
                    type="button"
                    onClick={() => setStep('review')}
                  >
                    Review Order
                  </Button>
                )}

                {step === 'review' && (
                  <Button
                    type="submit"
                    disabled={loading}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {loading ? 'Processing...' : 'Complete Purchase'}
                  </Button>
                )}
              </div>
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <h3 className="text-lg font-semibold text-black">Order Summary</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-black">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-black">Platform fee (5%)</span>
                    <span className="font-medium">${platformFee.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-black">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span>Secure SSL encryption</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Instant download after payment</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span>30-day money-back guarantee</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
