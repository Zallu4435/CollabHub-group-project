'use client';

import { useState } from 'react';

interface JoinGroupButtonProps {
  groupId: string;
  isJoined: boolean;
  fullWidth?: boolean;
  size?: 'sm' | 'md';
}

export default function JoinGroupButton({ 
  groupId, 
  isJoined: initialJoined,
  fullWidth = false,
  size = 'md'
}: JoinGroupButtonProps) {
  const [isJoined, setIsJoined] = useState(initialJoined);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    setIsJoined(!isJoined);
    console.log(`${isJoined ? 'Leaving' : 'Joining'} group ${groupId}`);
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
      className={`${sizeClasses[size]} ${fullWidth ? 'w-full' : ''} rounded-xl font-semibold transition-all ${
        isJoined
          ? 'bg-green-100 text-green-700 hover:bg-red-100 hover:text-red-700 border-2 border-green-200 hover:border-red-200 shadow-sm'
          : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg'
      } flex items-center justify-center gap-2`}
    >
      {isJoined ? (
        <>
          {isHovered ? (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Leave Group
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Joined
            </>
          )}
        </>
      ) : (
        <>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
          Join Group
        </>
      )}
    </button>
  );
}
