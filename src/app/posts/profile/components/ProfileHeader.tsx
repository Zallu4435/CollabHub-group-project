import React from 'react';

interface ProfileHeaderProps {
  name: string;
  headline: string;
  location?: string;
  bannerUrl?: string;
  connections?: number;
  profileViews?: number;
}

export default function ProfileHeader({ 
  name, 
  headline, 
  location, 
  bannerUrl,
  connections = 500,
  profileViews = 142
}: ProfileHeaderProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-300 overflow-hidden">
      {/* Banner with edit button */}
      <div className="relative">
        <div 
          className="h-48 bg-gradient-to-r from-blue-400 via-blue-500 to-purple-600"
          style={bannerUrl ? { backgroundImage: `url(${bannerUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
        />
        <button className="absolute top-4 right-4 p-2 bg-white rounded-full hover:bg-gray-100 transition-all shadow-md">
          <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
          </svg>
        </button>
      </div>

      {/* Profile content */}
      <div className="px-6 pb-4">
        {/* Avatar with camera button */}
        <div className="relative -mt-20 mb-4">
          <div className="w-40 h-40 rounded-full bg-gradient-to-br from-green-400 to-green-600 border-4 border-white">
            {/* Add image here */}
          </div>
          <button className="absolute bottom-2 right-2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-all border-2 border-white">
            <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 4V1h2v3h3v2H5v3H3V6H0V4h3zm3 6V7h3V4h7l1.83 2H21c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V10h3zm7 9c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-3.2-5c0 1.77 1.43 3.2 3.2 3.2s3.2-1.43 3.2-3.2-1.43-3.2-3.2-3.2-3.2 1.43-3.2 3.2z"/>
            </svg>
          </button>
        </div>

        {/* Name and headline */}
        <div className="mb-2">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-0.5">{name}</h1>
              <div className="text-gray-900 text-base mb-1">{headline}</div>
              {location && (
                <p className="text-sm text-gray-600">
                  {location} • <button className="text-blue-600 hover:underline font-semibold">Contact info</button>
                </p>
              )}
              <button className="text-sm text-blue-600 hover:underline font-semibold mt-1">
                {connections}+ connections
              </button>
            </div>

            {/* Edit button in header area */}
            <button className="text-gray-600 hover:bg-gray-100 p-2 rounded">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Tagline with badge */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-gray-900 text-sm italic">"{headline}"</span>
          <button className="flex items-center gap-1 px-3 py-1 border border-blue-600 text-blue-600 rounded-full text-xs font-semibold hover:bg-blue-50">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
            Add verification badge
          </button>
        </div>

        {/* Company info */}
        <div className="text-sm text-gray-600 mb-3">
          Kannur, Kerala, India • <button className="text-blue-600 hover:underline">Contact info</button>
        </div>
        <div className="text-sm text-blue-600 font-semibold hover:underline cursor-pointer mb-4">
          500+ connections
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 mb-4">
          <button className="px-5 py-1.5 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 text-sm">
            Open to
          </button>
          <button className="px-5 py-1.5 border-2 border-blue-600 text-blue-600 rounded-full font-semibold hover:bg-blue-50 text-sm">
            Add section
          </button>
          <button className="px-5 py-1.5 border-2 border-gray-600 text-gray-700 rounded-full font-semibold hover:bg-gray-50 text-sm">
            Enhance profile
          </button>
          <button className="p-1.5 hover:bg-gray-100 rounded-full">
            <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
          </button>
        </div>

        {/* Open to work banner */}
        <div className="bg-gray-800 text-white rounded-lg p-4 flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold mb-1">Open to work</h3>
            <p className="text-sm text-gray-300 mb-2">Software Engineer roles</p>
            <button className="text-sm text-blue-400 hover:underline font-semibold">Show details</button>
          </div>
          <button className="text-gray-400 hover:text-white">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
