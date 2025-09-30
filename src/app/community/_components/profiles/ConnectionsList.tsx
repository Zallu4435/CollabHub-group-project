import Avatar from '../common/Avatar';
import FollowButton from './FollowButton';
import Link from 'next/link';

interface Connection {
  id: string;
  username: string;
  name: string;
  avatar: string;
  bio?: string;
  isFollowing: boolean;
}

interface ConnectionsListProps {
  connections: Connection[];
  title: string;
  emptyMessage?: string;
}

export default function ConnectionsList({ 
  connections, 
  title,
  emptyMessage = 'No connections yet.' 
}: ConnectionsListProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      
      <div className="divide-y divide-gray-200">
        {connections.length > 0 ? (
          connections.map((connection) => (
            <div key={connection.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start gap-4">
                <Link href={`/community/profiles/${connection.id}`}>
                  <Avatar src={connection.avatar} alt={connection.name} size="lg" />
                </Link>
                
                <div className="flex-1 min-w-0">
                  <Link 
                    href={`/community/profiles/${connection.id}`}
                    className="font-semibold text-gray-900 hover:text-blue-600"
                  >
                    {connection.name}
                  </Link>
                  <p className="text-sm text-gray-600">@{connection.username}</p>
                  {connection.bio && (
                    <p className="text-sm text-gray-700 mt-2 line-clamp-2">{connection.bio}</p>
                  )}
                </div>

                <FollowButton 
                  userId={connection.id} 
                  isFollowing={connection.isFollowing}
                  size="sm"
                />
              </div>
            </div>
          ))
        ) : (
          <div className="p-12 text-center text-gray-500">
            {emptyMessage}
          </div>
        )}
      </div>
    </div>
  );
}
