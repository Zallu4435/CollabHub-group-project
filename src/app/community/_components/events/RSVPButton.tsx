'use client';

import { useState } from 'react';

interface RSVPButtonProps {
  eventId: string;
  isRSVPed: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  size?: 'sm' | 'md';
}

export default function RSVPButton({ 
  eventId, 
  isRSVPed: initialRSVPed,
  disabled = false,
  fullWidth = false,
  size = 'md'
}: RSVPButtonProps) {
  const [isRSVPed, setIsRSVPed] = useState(initialRSVPed);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (disabled) return;
    setIsRSVPed(!isRSVPed);
    console.log(`${isRSVPed ? 'Canceling RSVP' : 'RSVPing'} for event ${eventId}`);
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-[15px]'
  };

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={disabled}
      className={`${sizeClasses[size]} ${fullWidth ? 'w-full' : ''} rounded-xl font-semibold transition-all ${
        disabled
          ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
          : isRSVPed
          ? 'bg-green-100 text-green-700 hover:bg-red-100 hover:text-red-700 border-2 border-green-200 hover:border-red-200 shadow-sm'
          : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg'
      }`}
    >
      {disabled ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          Event Full
        </span>
      ) : isRSVPed ? (
        <span className="flex items-center justify-center gap-2">
          {isHovered ? (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Cancel RSVP
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              You're Going
            </>
          )}
        </span>
      ) : (
        <span className="flex items-center justify-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          RSVP Now
        </span>
      )}
    </button>
  );
}
