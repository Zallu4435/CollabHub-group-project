// market/src/components/messaging/ContactSellerButton.tsx
'use client';

import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { ContactSellerModal } from './ContactSellerModal';

interface ContactSellerButtonProps {
  seller: {
    id: string;
    name: string;
    avatar: string;
    responseTime: string;
    rating: number;
    isOnline: boolean;
  };
  project?: {
    id: string;
    title: string;
    thumbnail: string;
    price: number;
  };
  orderId?: string;
  className?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const ContactSellerButton: React.FC<ContactSellerButtonProps> = ({
  seller,
  project,
  orderId,
  className = '',
  variant = 'default',
  size = 'md'
}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button
        variant={variant}
        size={size}
        className={className}
        onClick={() => setShowModal(true)}
      >
        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        Contact Seller
      </Button>

      <ContactSellerModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        seller={seller}
        project={project}
        orderId={orderId}
      />
    </>
  );
};
