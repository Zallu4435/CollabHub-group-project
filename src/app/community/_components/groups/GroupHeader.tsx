import Image from 'next/image';
import JoinGroupButton from './JoinGroupButton';
import Link from 'next/link';

interface GroupHeaderProps {
  id: string;
  name: string;
  description: string;
  coverImage?: string;
  privacy: 'public' | 'private' | 'invite-only';
  memberCount: number;
  category: string;
  tags: string[];
  createdBy: string;
  createdAt: string;
  isJoined: boolean;
  isAdmin?: boolean;
}

export default function GroupHeader({
  id,
  name,
  description,
  coverImage,
  privacy,
  memberCount,
  category,
  tags,
  createdAt,
  isJoined,
  isAdmin = false
}: GroupHeaderProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600">
        {coverImage && (
          <Image
            src={coverImage}
            alt={name}
            fill
            className="object-cover"
          />
        )}
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-2xl font-bold text-gray-900">{name}</h1>
              <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs capitalize">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {privacy === 'public' ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  )}
                </svg>
                {privacy.replace('-', ' ')}
              </span>
            </div>
            <p className="text-gray-700 mb-3">{description}</p>
            
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span className="font-medium">{memberCount.toLocaleString()} members</span>
              <span>•</span>
              <span>{category}</span>
              <span>•</span>
              <span>Created {new Date(createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
            </div>
          </div>

          <div className="flex gap-2">
            {isAdmin ? (
              <Link
                href={`/community/groups/${id}/settings`}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
              >
                Manage Group
              </Link>
            ) : (
              <JoinGroupButton groupId={id} isJoined={isJoined} />
            )}
          </div>
        </div>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
