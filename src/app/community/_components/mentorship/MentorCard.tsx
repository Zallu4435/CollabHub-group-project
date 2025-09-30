import Link from 'next/link';
import Avatar from '../common/Avatar';

interface MentorCardProps {
  id: string;
  name: string;
  username: string;
  avatar: string;
  title: string;
  expertise: string[];
  bio: string;
  mentees: number;
  rating: number;
  availability: 'available' | 'limited' | 'unavailable';
}

export default function MentorCard({
  id,
  name,
  username,
  avatar,
  title,
  expertise,
  bio,
  mentees,
  rating,
  availability
}: MentorCardProps) {
  const availabilityConfig = {
    available: {
      color: 'bg-green-100 text-green-700 border-green-200',
      icon: (
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      ),
      label: 'Available'
    },
    limited: {
      color: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      icon: (
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
      ),
      label: 'Limited Slots'
    },
    unavailable: {
      color: 'bg-red-100 text-red-700 border-red-200',
      icon: (
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
        </svg>
      ),
      label: 'Unavailable'
    }
  };

  const config = availabilityConfig[availability];

  return (
    <article className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start gap-4 mb-4">
          <Link href={`/community/profiles/${id}`} className="flex-shrink-0 relative">
            <Avatar src={avatar} alt={name} size="xl" />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center border-2 border-white">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          </Link>

          <div className="flex-1 min-w-0">
            <Link
              href={`/community/profiles/${id}`}
              className="font-bold text-xl text-gray-900 hover:text-blue-600 transition-colors block mb-1 leading-tight"
            >
              {name}
            </Link>
            <p className="text-sm text-gray-600 mb-1">@{username}</p>
            <p className="text-sm text-gray-700 font-semibold">{title}</p>
          </div>

          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${config.color}`}>
            {config.icon}
            {config.label}
          </span>
        </div>

        <p className="text-[15px] text-gray-700 leading-relaxed line-clamp-2 mb-4">{bio}</p>

        {/* Expertise Tags */}
        <div>
          <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">Expertise</h4>
          <div className="flex flex-wrap gap-2">
            {expertise.slice(0, 4).map((skill, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-medium"
              >
                {skill}
              </span>
            ))}
            {expertise.length > 4 && (
              <span className="text-xs text-gray-500 px-2 py-1 font-medium">
                +{expertise.length - 4} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1.5">
              <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="font-bold text-gray-900">{rating.toFixed(1)}</span>
            </div>
            <span className="text-gray-400">•</span>
            <div className="flex items-center gap-1.5 text-gray-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <span className="font-semibold">{mentees}</span> mentees
            </div>
          </div>

          <Link
            href={`/community/mentorship/${id}/request`}
            className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center gap-2 ${
              availability === 'available'
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Request
          </Link>
        </div>
      </div>
    </article>
  );
}
