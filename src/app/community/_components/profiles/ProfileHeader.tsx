import Avatar from '../common/Avatar';
import CoverPhoto from '../common/CoverPhoto';
import FollowButton from './FollowButton';
import Link from 'next/link';

interface ProfileHeaderProps {
  id: string;
  username: string;
  name: string;
  avatar: string;
  coverPhoto?: string;
  bio?: string;
  location?: string;
  joinedDate: string;
  followerCount: number;
  followingCount: number;
  isFollowing?: boolean;
  isOwnProfile?: boolean;
}

export default function ProfileHeader({
  id,
  username,
  name,
  avatar,
  coverPhoto,
  bio,
  location,
  joinedDate,
  followerCount,
  followingCount,
  isFollowing = false,
  isOwnProfile = false
}: ProfileHeaderProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <CoverPhoto 
        src={coverPhoto} 
        alt={`${name}'s cover`} 
        height="h-64"
        editable={isOwnProfile}
      />
      
      <div className="px-6 pb-6">
        <div className="flex items-end justify-between -mt-16 mb-4">
          <div className="relative">
            <div className="ring-4 ring-white rounded-full">
              <Avatar src={avatar} alt={name} size="xl" className="w-32 h-32" />
            </div>
          </div>
          
          <div className="mb-4">
            {isOwnProfile ? (
              <Link
                href={`/community/profiles/${id}/edit`}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
              >
                Edit Profile
              </Link>
            ) : (
              <div className="flex gap-2">
                <FollowButton userId={id} isFollowing={isFollowing} />
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  Message
                </button>
              </div>
            )}
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-bold text-gray-900">{name}</h1>
          <p className="text-gray-600">@{username}</p>
        </div>

        {bio && (
          <p className="mt-3 text-gray-700">{bio}</p>
        )}

        <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600">
          {location && (
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {location}
            </div>
          )}
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Joined {new Date(joinedDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </div>
        </div>

        <div className="flex gap-6 mt-4">
          <Link 
            href={`/community/profiles/${id}/followers`}
            className="hover:underline"
          >
            <span className="font-semibold text-gray-900">{followerCount.toLocaleString()}</span>
            <span className="text-gray-600 ml-1">Followers</span>
          </Link>
          <Link 
            href={`/community/profiles/${id}/following`}
            className="hover:underline"
          >
            <span className="font-semibold text-gray-900">{followingCount.toLocaleString()}</span>
            <span className="text-gray-600 ml-1">Following</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
