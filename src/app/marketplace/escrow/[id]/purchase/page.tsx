// market/src/app/escrow/[id]/purchase/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { escrowService } from '../../../lib/services/escrowService';
import { EscrowProject, PurchaseEscrowRequest } from '../../../types/escrow';
import { CheckoutPrice } from '@/components/ui/PriceDisplay';

export default function EscrowPurchasePage() {
  const params = useParams();
  const router = useRouter();
  const escrowId = params.id as string;
  
  const [escrow, setEscrow] = useState<EscrowProject | null>(null);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);
  const [formData, setFormData] = useState({
    paymentMethod: 'card' as const,
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });

  useEffect(() => {
    loadEscrow();
  }, [escrowId]);

  const loadEscrow = async () => {
    try {
      setLoading(true);
      const escrowData = await escrowService.getEscrow(escrowId);
      setEscrow(escrowData);
    } catch (error) {
      console.error('Failed to load escrow:', error);
      alert('Failed to load escrow details');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePurchase = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!escrow) return;

    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'address', 'city', 'state', 'zipCode'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      alert(`Please fill in: ${missingFields.join(', ')}`);
      return;
    }

    if (formData.paymentMethod === 'card') {
      const cardFields = ['cardNumber', 'expiryDate', 'cvv', 'nameOnCard'];
      const missingCardFields = cardFields.filter(field => !formData[field as keyof typeof formData]);
      
      if (missingCardFields.length > 0) {
        alert(`Please fill in card details: ${missingCardFields.join(', ')}`);
        return;
      }
    }

    try {
      setPurchasing(true);
      
      const purchaseRequest: PurchaseEscrowRequest = {
        escrowId: escrow.id,
        paymentMethod: formData.paymentMethod,
        billingAddress: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          company: formData.company || undefined,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country
        },
        cardDetails: formData.paymentMethod === 'card' ? {
          number: formData.cardNumber,
          expiryDate: formData.expiryDate,
          cvv: formData.cvv,
          nameOnCard: formData.nameOnCard
        } : undefined
      };

      // Initiate purchase
      await escrowService.purchaseEscrow(purchaseRequest, 'buyer_1');
      
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Confirm payment
      await escrowService.confirmPayment(escrowId);
      
      // Show success message with buyer details
      alert(`Purchase successful! Project has been released to you.\n\nBuyer Details:\nName: ${formData.firstName} ${formData.lastName}\nEmail: ${formData.email}\n\nYou can now download the project files.`);
      router.push(`/marketplace/escrow/${escrowId}`);
      
    } catch (error) {
      console.error('Purchase failed:', error);
      alert('Purchase failed. Please try again.');
    } finally {
      setPurchasing(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading escrow details...</p>
        </div>
      </div>
    );
  }

  if (!escrow) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardContent className="p-12 text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Escrow Not Found</h2>
            <p className="text-gray-600">The escrow you're looking for doesn't exist or has been removed.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (escrow.state !== 'pending_payment') {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardContent className="p-12 text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Escrow Not Available</h2>
            <p className="text-gray-600">This escrow is no longer available for purchase.</p>
            <Badge className="mt-4">{escrow.state.replace('_', ' ')}</Badge>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Purchase Project</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Project Details */}
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <CardHeader>
              <h2 className="text-xl font-semibold">{escrow.projectTitle}</h2>
              <p className="text-gray-600">by {escrow.sellerName}</p>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">{escrow.projectDescription}</p>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">License Type:</span>
                  <Badge variant="info" className="capitalize">{escrow.licenseType}</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Tech Stack:</span>
                  <div className="flex flex-wrap gap-1">
                    {escrow.projectMetadata.techStack.map((tech, index) => (
                      <Badge key={index} variant="secondary" size="sm">{tech}</Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Mobile Responsive:</span>
                  <span className={escrow.projectMetadata.mobileResponsive ? 'text-green-600' : 'text-red-600'}>
                    {escrow.projectMetadata.mobileResponsive ? 'Yes' : 'No'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Payment Deadline:</span>
                  <span className="text-red-600 font-medium">
                    {new Date(escrow.paymentDeadline).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Form */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Payment Information</h2>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePurchase} className="space-y-6">
                {/* Payment Method */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Payment Method *
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => handleInputChange('paymentMethod', 'card')}
                      className={`p-4 border rounded-lg flex items-center justify-center ${
                        formData.paymentMethod === 'card'
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
                      type="button"
                      onClick={() => handleInputChange('paymentMethod', 'paypal')}
                      className={`p-4 border rounded-lg flex items-center justify-center ${
                        formData.paymentMethod === 'paypal'
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

                {/* Billing Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Billing Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address *
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State *
                      </label>
                      <input
                        type="text"
                        value={formData.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ZIP Code *
                      </label>
                      <input
                        type="text"
                        value={formData.zipCode}
                        onChange={(e) => handleInputChange('zipCode', e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Credit Card Details */}
                {formData.paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Card Details</h3>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Card Number *
                      </label>
                      <input
                        type="text"
                        value={formData.cardNumber}
                        onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                        placeholder="1234 5678 9012 3456"
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Name on Card *
                      </label>
                      <input
                        type="text"
                        value={formData.nameOnCard}
                        onChange={(e) => handleInputChange('nameOnCard', e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Expiry Date *
                        </label>
                        <input
                          type="text"
                          value={formData.expiryDate}
                          onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                          placeholder="MM/YY"
                          className="w-full border border-gray-300 rounded-md px-3 py-2"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CVV *
                        </label>
                        <input
                          type="text"
                          value={formData.cvv}
                          onChange={(e) => handleInputChange('cvv', e.target.value)}
                          placeholder="123"
                          className="w-full border border-gray-300 rounded-md px-3 py-2"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Terms */}
                <div>
                  <label className="flex items-start">
                    <input type="checkbox" className="mt-1 mr-3" required />
                    <span className="text-sm text-gray-700">
                      I agree to the{' '}
                      <a href="/terms" className="text-blue-600 hover:underline">Terms of Service</a>{' '}
                      and{' '}
                      <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>
                    </span>
                  </label>
                </div>

                {/* Submit */}
                <div className="flex justify-end">
                  <Button type="submit" disabled={purchasing} size="lg">
                    {purchasing ? 'Processing...' : `Complete Purchase - $${escrow.price.toFixed(2)}`}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <h2 className="text-xl font-semibold">Order Summary</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-16 h-12 bg-gray-100 rounded-md flex items-center justify-center">
                    <span className="text-2xl">📦</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 truncate">
                      {escrow.projectTitle}
                    </h4>
                    <p className="text-xs text-gray-600">by {escrow.sellerName}</p>
                    <Badge variant="info" size="sm" className="mt-1 capitalize">
                      {escrow.licenseType}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2 pt-4 border-t">
                  <div className="flex justify-between text-sm">
                    <span>Project Price</span>
                    <CheckoutPrice amount={escrow.price} size="sm" showSymbol={true} showCode={false} />
                  </div>
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Platform Fee</span>
                    <span>${escrow.platformFee.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <CheckoutPrice amount={escrow.price + escrow.platformFee} size="sm" showSymbol={true} showCode={false} />
                    </div>
                  </div>
                </div>

                <div className="text-xs text-gray-500 pt-2 border-t">
                  <p>• Project will be released immediately after payment</p>
                  <p>• You'll receive download access via email</p>
                  <p>• 30-day money-back guarantee</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
