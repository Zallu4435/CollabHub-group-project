import Link from 'next/link';
import Avatar from '../common/Avatar';
import FollowButton from './FollowButton';

interface ProfileCardProps {
  id: string;
  username: string;
  name: string;
  avatar: string;
  bio?: string;
  followerCount: number;
  isMentor?: boolean;
  isFollowing?: boolean;
  compact?: boolean;
}

export default function ProfileCard({
  id,
  username,
  name,
  avatar,
  bio,
  followerCount,
  isMentor = false,
  isFollowing = false,
  compact = false
}: ProfileCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3">
        <Link href={`/community/profiles/${id}`}>
          <Avatar src={avatar} alt={name} size={compact ? 'md' : 'lg'} />
        </Link>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <Link 
                href={`/community/profiles/${id}`}
                className="font-semibold text-gray-900 hover:text-blue-600 truncate block"
              >
                {name}
              </Link>
              <p className="text-sm text-gray-600">@{username}</p>
            </div>
            <FollowButton isFollowing={isFollowing} userId={id} size="sm" />
          </div>

          {!compact && bio && (
            <p className="text-sm text-gray-700 mt-2 line-clamp-2">{bio}</p>
          )}

          <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
            <span className="font-medium">{followerCount.toLocaleString()} followers</span>
            {isMentor && (
              <span className="inline-flex items-center gap-1 bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full text-xs">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
                Mentor
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
