'use client';

import Link from 'next/link';
import Image from 'next/image';
import RSVPButton from './RSVPButton';

interface EventCardProps {
  id: string;
  title: string;
  description: string;
  coverImage?: string;
  type: 'online' | 'in-person' | 'hybrid';
  startDate: string;
  endDate: string;
  location: string;
  organizerId: string;
  organizerName: string;
  groupId?: string;
  groupName?: string;
  attendeeCount: number;
  maxAttendees?: number;
  isRSVPed: boolean;
  tags: string[];
}

export default function EventCard({
  id,
  title,
  description,
  coverImage,
  type,
  startDate,
  endDate,
  location,
  organizerName,
  groupName,
  attendeeCount,
  maxAttendees,
  isRSVPed,
  tags
}: EventCardProps) {
  const typeIcons = {
    online: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
    'in-person': (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    hybrid: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    )
  };

  const typeColors = {
    online: 'bg-blue-600 text-white',
    'in-person': 'bg-green-600 text-white',
    hybrid: 'bg-purple-600 text-white'
  };

  const isSoldOut = maxAttendees ? attendeeCount >= maxAttendees : false;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 group">
      <Link href={`/community/events/${id}`}>
        <div className="relative h-52 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 overflow-hidden">
          {coverImage ? (
            <Image
              src={coverImage}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-16 h-16 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg ${typeColors[type]}`}>
              {typeIcons[type]}
              {type}
            </span>
            {isSoldOut && (
              <span className="bg-red-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg">
                Sold Out
              </span>
            )}
          </div>

          {/* Date Badge */}
          <div className="absolute bottom-4 left-4">
            <div className="bg-white rounded-xl px-4 py-2 shadow-lg">
              <div className="text-xs font-semibold text-gray-600 uppercase">
                {new Date(startDate).toLocaleDateString('en-US', { month: 'short' })}
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {new Date(startDate).getDate()}
              </div>
            </div>
          </div>
        </div>
      </Link>

      <div className="p-5">
        {/* Title */}
        <Link 
          href={`/community/events/${id}`}
          className="block font-bold text-lg text-gray-900 hover:text-blue-600 line-clamp-2 mb-3 leading-tight transition-colors"
        >
          {title}
        </Link>

        {/* Time and Location */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium">
              {new Date(startDate).toLocaleTimeString('en-US', { 
                hour: 'numeric', 
                minute: '2-digit' 
              })}
              {' - '}
              {new Date(endDate).toLocaleTimeString('en-US', { 
                hour: 'numeric', 
                minute: '2-digit' 
              })}
            </span>
          </div>

          <div className="flex items-start gap-2 text-sm text-gray-600">
            <svg className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {type === 'online' ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              )}
            </svg>
            <span className="line-clamp-1">{location}</span>
          </div>
        </div>

        {/* Attendees and Organizer */}
        <div className="flex items-center justify-between py-3 border-t border-gray-100 mb-4">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 border-2 border-white"></div>
              ))}
            </div>
            <span className="text-sm text-gray-600">
              <span className="font-semibold text-gray-900">{attendeeCount}</span> attending
            </span>
          </div>
          
          {maxAttendees && (
            <span className="text-xs text-gray-500">
              {maxAttendees - attendeeCount} spots left
            </span>
          )}
        </div>

        {/* Organizer/Group */}
        {groupName ? (
          <p className="text-sm text-gray-600 mb-4">
            By <span className="font-semibold text-blue-600">{groupName}</span>
          </p>
        ) : (
          <p className="text-sm text-gray-600 mb-4">
            By <span className="font-semibold text-gray-900">{organizerName}</span>
          </p>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* RSVP Button */}
        <RSVPButton 
          eventId={id} 
          isRSVPed={isRSVPed} 
          disabled={isSoldOut && !isRSVPed}
          fullWidth 
        />
      </div>
    </div>
  );
}
