// market/src/components/escrow/EscrowCard.tsx
'use client';

import React from 'react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { EscrowProject, EscrowState } from '../../types/escrow';
import { CheckoutPrice } from '@/components/ui/PriceDisplay';

interface EscrowCardProps {
  escrow: EscrowProject;
  userRole: 'seller' | 'buyer';
  onViewDetails: (escrowId: string) => void;
  onTakeAction: (escrowId: string, action: string) => void;
  className?: string;
}

const getStateColor = (state: EscrowState): string => {
  switch (state) {
    case 'pending_payment':
      return 'bg-yellow-100 text-yellow-800';
    case 'released':
      return 'bg-green-100 text-green-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    case 'on_hold':
      return 'bg-orange-100 text-orange-800';
    case 'disputed':
      return 'bg-purple-100 text-purple-800';
    case 'expired':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStateLabel = (state: EscrowState): string => {
  switch (state) {
    case 'pending_payment':
      return 'Pending Payment';
    case 'released':
      return 'Released';
    case 'cancelled':
      return 'Cancelled';
    case 'on_hold':
      return 'On Hold';
    case 'disputed':
      return 'Disputed';
    case 'expired':
      return 'Expired';
    default:
      return 'Unknown';
  }
};

const getAvailableActions = (escrow: EscrowProject, userRole: 'seller' | 'buyer') => {
  const actions = [];
  
  if (userRole === 'seller') {
    switch (escrow.state) {
      case 'pending_payment':
        // Check if payment deadline has passed
        const now = new Date();
        const deadline = new Date(escrow.paymentDeadline);
        if (now > deadline) {
          actions.push({ label: 'Reclaim Project', action: 'reclaim' });
        }
        break;
      case 'released':
        actions.push({ label: 'View Details', action: 'view' });
        break;
      case 'disputed':
        actions.push({ label: 'View Dispute', action: 'dispute' });
        break;
    }
  } else if (userRole === 'buyer') {
    switch (escrow.state) {
      case 'pending_payment':
        actions.push({ label: 'Complete Purchase', action: 'purchase' });
        break;
      case 'released':
        actions.push({ label: 'Download Project', action: 'download' });
        actions.push({ label: 'Raise Dispute', action: 'dispute' });
        break;
      case 'disputed':
        actions.push({ label: 'View Dispute', action: 'dispute' });
        break;
    }
  }
  
  return actions;
};

export const EscrowCard: React.FC<EscrowCardProps> = ({
  escrow,
  userRole,
  onViewDetails,
  onTakeAction,
  className = ''
}) => {
  const availableActions = getAvailableActions(escrow, userRole);
  const isExpired = new Date() > new Date(escrow.paymentDeadline) && escrow.state === 'pending_payment';
  
  return (
    <Card className={`hover:shadow-lg transition-shadow ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {escrow.projectTitle}
            </h3>
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
              {escrow.projectDescription}
            </p>
          </div>
          <Badge className={`ml-3 ${getStateColor(escrow.state)}`}>
            {getStateLabel(escrow.state)}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-3">
          {/* Project Details */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">License:</span>
            <Badge variant="info" size="sm" className="capitalize">
              {escrow.licenseType}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Price:</span>
            <CheckoutPrice amount={escrow.price} showSymbol={true} showCode={false} />
          </div>
          
          {userRole === 'seller' && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Your Payout:</span>
              <CheckoutPrice amount={escrow.sellerPayout} showSymbol={true} showCode={false} />
            </div>
          )}
          
          {/* Timeline */}
          <div className="text-sm text-gray-600">
            <div>Created: {new Date(escrow.createdAt).toLocaleDateString()}</div>
            {escrow.state === 'pending_payment' && (
              <div className={isExpired ? 'text-red-600 font-medium' : ''}>
                Payment Deadline: {new Date(escrow.paymentDeadline).toLocaleDateString()}
                {isExpired && ' (Expired)'}
              </div>
            )}
            {escrow.releasedAt && (
              <div>Released: {new Date(escrow.releasedAt).toLocaleDateString()}</div>
            )}
          </div>
          
          {/* Counterparty Info */}
          <div className="text-sm text-gray-600">
            {userRole === 'seller' ? (
              escrow.buyerName ? (
                <div>Buyer: {escrow.buyerName}</div>
              ) : (
                <div>Awaiting buyer...</div>
              )
            ) : (
              <div>Seller: {escrow.sellerName}</div>
            )}
          </div>
          
          {/* Actions */}
          <div className="flex flex-wrap gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewDetails(escrow.id)}
            >
              View Details
            </Button>
            
            {availableActions.map((action, index) => (
              <Button
                key={index}
                variant={action.action === 'reclaim' ? 'secondary' : 'primary'}
                size="sm"
                onClick={() => onTakeAction(escrow.id, action.action)}
              >
                {action.label}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
