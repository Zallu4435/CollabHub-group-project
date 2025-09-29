import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-black">Loading Marketplace</h2>
          <p className="text-sm text-black">Please wait while we load the content...</p>
        </div>
      </div>
    </div>
  );
}
