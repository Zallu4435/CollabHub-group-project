import Image from 'next/image';
import Link from 'next/link';
import Avatar from '../common/Avatar';
import RSVPButton from './RSVPButton';

interface EventDetailsProps {
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
  organizerAvatar: string;
  groupId?: string;
  groupName?: string;
  attendeeCount: number;
  maxAttendees?: number;
  isRSVPed: boolean;
  tags: string[];
  agenda?: string;
  requirements?: string[];
}

export default function EventDetails({
  id,
  title,
  description,
  coverImage,
  type,
  startDate,
  endDate,
  location,
  organizerId,
  organizerName,
  organizerAvatar,
  groupId,
  groupName,
  attendeeCount,
  maxAttendees,
  isRSVPed,
  tags,
  agenda,
  requirements = []
}: EventDetailsProps) {
  const typeColors = {
    online: 'bg-blue-100 text-blue-700',
    'in-person': 'bg-green-100 text-green-700',
    hybrid: 'bg-purple-100 text-purple-700'
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      {coverImage && (
        <div className="relative h-64">
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${typeColors[type]}`}>
                {type}
              </span>
              {maxAttendees && attendeeCount >= maxAttendees && (
                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                  Full
                </span>
              )}
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
            {groupName && (
              <Link 
                href={`/community/groups/${groupId}`}
                className="text-blue-600 hover:underline"
              >
                Hosted by {groupName}
              </Link>
            )}
          </div>

          <RSVPButton 
            eventId={id} 
            isRSVPed={isRSVPed}
            disabled={maxAttendees ? attendeeCount >= maxAttendees && !isRSVPed : false}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-gray-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <div>
                <p className="font-medium text-gray-900">Date & Time</p>
                <p className="text-gray-600">
                  {new Date(startDate).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
                <p className="text-gray-600">
                  {new Date(startDate).toLocaleTimeString('en-US', { 
                    hour: 'numeric', 
                    minute: '2-digit' 
                  })}
                  {' - '}
                  {new Date(endDate).toLocaleTimeString('en-US', { 
                    hour: 'numeric', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-gray-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {type === 'online' ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                )}
              </svg>
              <div>
                <p className="font-medium text-gray-900">Location</p>
                <p className="text-gray-600">{location}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-gray-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <div>
                <p className="font-medium text-gray-900">Attendees</p>
                <p className="text-gray-600">
                  {attendeeCount} going
                  {maxAttendees && ` • ${maxAttendees - attendeeCount} spots left`}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Organizer</h3>
            <Link 
              href={`/community/profiles/${organizerId}`}
              className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded-lg transition-colors"
            >
              <Avatar src={organizerAvatar} alt={organizerName} size="lg" />
              <div>
                <p className="font-medium text-gray-900">{organizerName}</p>
                <p className="text-sm text-gray-600">Event Organizer</p>
              </div>
            </Link>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">About this event</h2>
            <p className="text-gray-700 whitespace-pre-wrap">{description}</p>
          </div>

          {agenda && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Agenda</h2>
              <p className="text-gray-700 whitespace-pre-wrap">{agenda}</p>
            </div>
          )}

          {requirements.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Requirements</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
          )}

          {tags.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
