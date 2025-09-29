// market/src/components/cart/OrderSummary.tsx
import React from 'react';
import { Order } from '../../types/cart';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { CartPrice } from '@/components/ui/PriceDisplay';
import { Badge } from '../ui/Badge';

interface OrderSummaryProps {
  order: Order;
  onDownload?: (itemId: string) => void;
  onContactSeller?: (sellerId: string) => void;
  className?: string;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  order,
  onDownload,
  onContactSeller,
  className = ''
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'processing':
        return 'warning';
      case 'pending':
        return 'default';
      case 'cancelled':
        return 'error';
      case 'refunded':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-black">Order #{order.id}</h2>
            <Badge variant={getStatusColor(order.status)}>
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </Badge>
          </div>
          <p className="text-sm text-black">
            Placed on {formatDate(order.createdAt)}
          </p>
        </CardHeader>

        <CardContent>
          {/* Order Items */}
          <div className="space-y-4 mb-6">
            <h3 className="font-medium text-black">Items</h3>
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                <div className="w-16 h-12 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-black truncate">{item.title}</h4>
                  <p className="text-sm text-black">
                    by {item.sellerName}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant="info" size="sm" className="capitalize">
                      {item.licenseType} License
                    </Badge>
                    <span className="text-sm text-black">
                      Qty: {item.quantity}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <CartPrice amount={item.price} showSymbol={true} showCode={false} />
                  {item.downloadUrl && (
                    <Button
                      size="sm"
                      onClick={() => onDownload?.(item.id)}
                      className="mt-2"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Download
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Order Details */}
          <div className="space-y-3 mb-6">
            <h3 className="font-medium text-black">Order Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-black">Subtotal</span>
                <CartPrice amount={order.total * 0.95} showSymbol={true} showCode={false} />
              </div>
              <div className="flex justify-between">
                <span className="text-black">Platform fee (5%)</span>
                <CartPrice amount={order.total * 0.05} showSymbol={true} showCode={false} />
              </div>
              <div className="border-t border-gray-200 pt-2">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <CartPrice amount={order.total} showSymbol={true} showCode={false} />
                </div>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="space-y-3 mb-6">
            <h3 className="font-medium text-black">Payment Information</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-black">Payment Method</span>
                <span className="font-medium capitalize">{order.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-black">Payment Status</span>
                <Badge variant={order.paymentStatus === 'paid' ? 'success' : 'warning'}>
                  {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                </Badge>
              </div>
              {order.completedAt && (
                <div className="flex justify-between">
                  <span className="text-black">Completed</span>
                  <span className="font-medium">{formatDate(order.completedAt)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2">
            <Button className="w-full">
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download All Files
            </Button>
            
            <Link href="/contact">
              <Button variant="outline" className="w-full">
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Contact Support
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Compact version for order history
interface OrderSummaryCompactProps {
  order: Order;
  onViewDetails: (orderId: string) => void;
  className?: string;
}

export const OrderSummaryCompact: React.FC<OrderSummaryCompactProps> = ({
  order,
  onViewDetails,
  className = ''
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'processing':
        return 'warning';
      case 'pending':
        return 'default';
      case 'cancelled':
        return 'error';
      case 'refunded':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <div className={`p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="font-medium text-black">Order #{order.id}</h3>
          <p className="text-sm text-black">{formatDate(order.createdAt)}</p>
        </div>
        <div className="text-right">
          <Badge variant={getStatusColor(order.status)} className="mb-1">
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </Badge>
          <div className="text-lg font-semibold text-black">
            ${order.total.toFixed(2)}
          </div>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        {order.items.slice(0, 2).map((item) => (
          <div key={item.id} className="flex items-center space-x-3">
            <div className="w-12 h-8 bg-gray-100 rounded overflow-hidden flex-shrink-0">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-black truncate">
                {item.title}
              </p>
              <p className="text-xs text-black">
                {item.licenseType} License
              </p>
            </div>
          </div>
        ))}
        {order.items.length > 2 && (
          <p className="text-sm text-black">
            +{order.items.length - 2} more items
          </p>
        )}
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={() => onViewDetails(order.id)}
        className="w-full"
      >
        View Details
      </Button>
    </div>
  );
};
