"use client";

import Avatar from '../common/Avatar';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface AudioRoomCardProps {
  id: string;
  name: string;
  topic: string;
  host: {
    id: string;
    name: string;
    avatar: string;
  };
  participants: number;
  maxParticipants: number;
  isLive: boolean;
  tags: string[];
}

export default function AudioRoomCard({
  id,
  name,
  topic,
  host,
  participants,
  maxParticipants,
  isLive,
  tags
}: AudioRoomCardProps) {
  const isFull = participants >= maxParticipants;
  const fillPercentage = (participants / maxParticipants) * 100;
  const router = useRouter();

  return (
    <article className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group">
      {/* Header with Wave Animation */}
      <div className="relative h-24 bg-gradient-to-br from-blue-500 via-cyan-500 to-blue-600 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.3),transparent)]"></div>
        </div>
        {isLive && (
          <div className="absolute top-3 right-3 flex items-center gap-2 bg-red-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg animate-pulse">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            LIVE
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-12 h-12 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
        </div>
      </div>

      <div className="p-6">
        {/* Title and Topic */}
        <div className="mb-4">
          <h3 className="font-bold text-xl text-gray-900 mb-2 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
            {name}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">{topic}</p>
        </div>

        {/* Host Info */}
        <Link href={`/community/profiles/${host.id}`} className="flex items-center gap-3 mb-4 group/host">
          <Avatar src={host.avatar} alt={host.name} size="md" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 group-hover/host:text-blue-600 transition-colors truncate">
              {host.name}
            </p>
            <p className="text-xs text-gray-600">Host</p>
          </div>
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" clipRule="evenodd" />
            </svg>
          </div>
        </Link>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-medium"
              >
                #{tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="text-xs text-gray-500 px-2 py-1 font-medium">
                +{tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Participants Progress */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2 text-sm">
            <span className="text-gray-600">Participants</span>
            <span className="font-bold text-gray-900">
              {participants} / {maxParticipants}
            </span>
          </div>
          <div className="relative w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className={`absolute h-full rounded-full transition-all duration-500 ${
                fillPercentage >= 90 ? 'bg-red-500' : fillPercentage >= 70 ? 'bg-yellow-500' : 'bg-blue-500'
              }`}
              style={{ width: `${fillPercentage}%` }}
            />
          </div>
        </div>

        {/* Join Button */}
        <button
          disabled={isFull && !isLive}
          className={`w-full py-3 rounded-xl font-semibold text-[15px] transition-all flex items-center justify-center gap-2 ${
            isFull && !isLive
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700 shadow-md hover:shadow-lg'
          }`}
          onClick={() => {
            if (isFull && !isLive) return;
            router.push(`/community/hangouts/${id}?mode=audio`);
          }}
        >
          {isFull ? (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Room Full
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
              Join Audio Room
            </>
          )}
        </button>
      </div>
    </article>
  );
}
