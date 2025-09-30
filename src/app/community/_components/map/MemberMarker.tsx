'use client';

import { useState } from 'react';
import Avatar from '../common/Avatar';
import Link from 'next/link';

interface MemberMarkerProps {
  member: {
    id: string;
    name: string;
    avatar: string;
    city: string;
    country: string;
  };
}

export default function MemberMarker({ member }: MemberMarkerProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative">
      <button
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="relative transform transition-all duration-200 hover:scale-110"
      >
        <div className="w-12 h-12 rounded-full ring-4 ring-white shadow-xl hover:ring-blue-500 transition-all">
          <Avatar src={member.avatar} alt={member.name} size="lg" className="w-full h-full" />
        </div>
        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full animate-pulse"></div>
      </button>

      {showTooltip && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-20 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="bg-white border border-gray-200 rounded-xl shadow-2xl p-4 min-w-[200px]">
            <Link
              href={`/community/profiles/${member.id}`}
              className="flex items-center gap-3 group"
            >
              <Avatar src={member.avatar} alt={member.name} size="md" />
              <div className="flex-1">
                <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {member.name}
                </p>
                <p className="text-sm text-gray-600 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  {member.city}, {member.country}
                </p>
              </div>
            </Link>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full">
              <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
