// market/src/components/cart/CartSummary.tsx
import React from 'react';
import { CartItem as CartItemType } from '../../types/cart';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

interface CartSummaryProps {
  items: CartItemType[];
  onCheckout: () => void;
  onClearCart: () => void;
  className?: string;
}

export const CartSummary: React.FC<CartSummaryProps> = ({
  items,
  onCheckout,
  onClearCart,
  className = ''
}) => {
  const subtotal = items.reduce((sum, item) => {
    const licenseMultiplier = {
      personal: 1,
      commercial: 1.5,
      extended: 2.5,
      'white-label': 4
    }[item.licenseType] || 1;
    
    return sum + (item.price * licenseMultiplier);
  }, 0);

  const platformFee = subtotal * 0.05; // 5% platform fee
  const total = subtotal + platformFee;

  const itemCount = items.length;
  const uniqueSellers = new Set(items.map(item => item.sellerId)).size;

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-black">Order Summary</h3>
          {items.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearCart}
              className="text-red-600 hover:text-red-700"
            >
              Clear Cart
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent>
        {items.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
              </svg>
            </div>
            <h4 className="text-lg font-medium text-black mb-2">Your cart is empty</h4>
            <p className="text-black mb-4">Add some projects to get started</p>
            <Button onClick={() => window.location.href = '/browse'}>
              Browse Projects
            </Button>
          </div>
        ) : (
          <>
            {/* Cart Items Count */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-black">
                  {itemCount} {itemCount === 1 ? 'item' : 'items'}
                </span>
                <Badge variant="info" size="sm">
                  {uniqueSellers} {uniqueSellers === 1 ? 'seller' : 'sellers'}
                </Badge>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="space-y-3 mb-6">
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

            {/* Checkout Button */}
            <Button
              onClick={onCheckout}
              className="w-full mb-4"
              size="lg"
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
              </svg>
              Proceed to Checkout
            </Button>

            {/* Security Badge */}
            <div className="flex items-center justify-center space-x-2 text-xs text-black">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>Secure checkout with SSL encryption</span>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

// Compact version for mobile
interface CartSummaryCompactProps {
  items: CartItemType[];
  onCheckout: () => void;
  className?: string;
}

export const CartSummaryCompact: React.FC<CartSummaryCompactProps> = ({
  items,
  onCheckout,
  className = ''
}) => {
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

  if (items.length === 0) {
    return null;
  }

  return (
    <div className={`bg-white border-t border-gray-200 p-4 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-lg font-semibold text-black">
            ${total.toFixed(2)}
          </div>
          <div className="text-sm text-black">
            {items.length} {items.length === 1 ? 'item' : 'items'}
          </div>
        </div>
        <Button onClick={onCheckout} size="lg">
          Checkout
        </Button>
      </div>
    </div>
  );
};
