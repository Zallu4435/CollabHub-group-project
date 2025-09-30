import Link from 'next/link';
import Avatar from '../common/Avatar';
import FollowButton from '../profiles/FollowButton';

interface SpotlightMember {
  id: string;
  username: string;
  name: string;
  avatar: string;
  bio: string;
  reason: string;
  stats: {
    posts: number;
    followers: number;
    contributions: number;
  };
  isFollowing: boolean;
}

interface MemberSpotlightProps {
  member: SpotlightMember;
}

export default function MemberSpotlight({ member }: MemberSpotlightProps) {
  return (
    <div className="bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 border-2 border-yellow-200 rounded-2xl overflow-hidden shadow-lg">
      {/* Header Badge */}
      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 px-6 py-3">
        <div className="flex items-center gap-2">
          <svg className="w-6 h-6 text-white animate-pulse" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <h3 className="font-bold text-white text-lg">Member Spotlight</h3>
        </div>
      </div>

      <div className="p-6">
        <div className="flex flex-col md:flex-row items-start gap-6">
          {/* Avatar */}
          <Link href={`/community/profiles/${member.id}`} className="flex-shrink-0">
            <div className="relative">
              <Avatar src={member.avatar} alt={member.name} size="2xl" />
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
          </Link>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <Link
              href={`/community/profiles/${member.id}`}
              className="font-bold text-2xl text-gray-900 hover:text-blue-600 transition-colors block mb-1"
            >
              {member.name}
            </Link>
            <p className="text-sm text-gray-600 mb-3">@{member.username}</p>
            
            <p className="text-[15px] text-gray-700 leading-relaxed mb-4">{member.bio}</p>

            {/* Spotlight Reason */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 mb-4 border border-yellow-200">
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-1">Why they're featured</p>
                  <p className="text-sm text-gray-700">{member.reason}</p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-5">
              <div className="bg-white/80 rounded-xl p-3 text-center border border-gray-200">
                <p className="text-2xl font-bold text-gray-900">{member.stats.posts}</p>
                <p className="text-xs text-gray-600 font-medium">Posts</p>
              </div>
              <div className="bg-white/80 rounded-xl p-3 text-center border border-gray-200">
                <p className="text-2xl font-bold text-gray-900">{member.stats.followers}</p>
                <p className="text-xs text-gray-600 font-medium">Followers</p>
              </div>
              <div className="bg-white/80 rounded-xl p-3 text-center border border-gray-200">
                <p className="text-2xl font-bold text-gray-900">{member.stats.contributions}</p>
                <p className="text-xs text-gray-600 font-medium">Contributions</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              <FollowButton userId={member.id} isFollowing={member.isFollowing} size="md" />
              <Link
                href={`/community/profiles/${member.id}`}
                className="px-6 py-2.5 bg-white border-2 border-gray-300 text-gray-700 rounded-xl hover:border-blue-500 hover:text-blue-600 font-semibold transition-all flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                View Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
