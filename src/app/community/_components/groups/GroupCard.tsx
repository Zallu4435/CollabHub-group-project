import Link from 'next/link';
import Image from 'next/image';
import JoinGroupButton from './JoinGroupButton';

interface GroupCardProps {
  id: string;
  name: string;
  description: string;
  coverImage?: string;
  privacy: 'public' | 'private' | 'invite-only';
  memberCount: number;
  category: string;
  tags: string[];
  isJoined: boolean;
}

export default function GroupCard({
  id,
  name,
  description,
  coverImage,
  privacy,
  memberCount,
  category,
  tags,
  isJoined
}: GroupCardProps) {
  const privacyConfig = {
    public: {
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'bg-green-100 text-green-700 border-green-200'
    },
    private: {
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      color: 'bg-orange-100 text-orange-700 border-orange-200'
    },
    'invite-only': {
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      color: 'bg-purple-100 text-purple-700 border-purple-200'
    }
  };

  return (
    <article className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 group">
      {/* Cover Image */}
      <Link href={`/community/groups/${id}`}>
        <div className="relative h-40 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 overflow-hidden">
          {coverImage ? (
            <Image
              src={coverImage}
              alt={name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-16 h-16 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          )}
          
          {/* Privacy Badge */}
          <div className="absolute top-3 right-3">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${privacyConfig[privacy].color} backdrop-blur-sm`}>
              {privacyConfig[privacy].icon}
              {privacy === 'invite-only' ? 'Invite Only' : privacy.charAt(0).toUpperCase() + privacy.slice(1)}
            </span>
          </div>

          {/* Member Count Overlay */}
          <div className="absolute bottom-3 left-3">
            <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full text-white text-sm font-medium">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              {memberCount.toLocaleString()}
            </div>
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="p-5">
        {/* Title and Category */}
        <div className="mb-3">
          <Link href={`/community/groups/${id}`}>
            <h3 className="font-bold text-lg text-gray-900 hover:text-blue-600 transition-colors mb-2 line-clamp-2 leading-tight">
              {name}
            </h3>
          </Link>
          <span className="inline-flex items-center px-2.5 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
            {category}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">{description}</p>

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
            {tags.length > 3 && (
              <span className="text-xs text-gray-500 px-2 py-1 font-medium">
                +{tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Action Button */}
        <JoinGroupButton groupId={id} isJoined={isJoined} fullWidth />
      </div>
    </article>
  );
}
