import Avatar from '../common/Avatar';
import Link from 'next/link';

interface MutualConnection {
  id: string;
  name: string;
  avatar: string;
}

interface MutualConnectionsProps {
  connections: MutualConnection[];
  totalCount: number;
}

export default function MutualConnections({ connections, totalCount }: MutualConnectionsProps) {
  if (totalCount === 0) return null;

  return (
    <div className="flex items-center gap-2 text-sm text-gray-600">
      <div className="flex -space-x-2">
        {connections.slice(0, 3).map((connection) => (
          <Link
            key={connection.id}
            href={`/community/profiles/${connection.id}`}
            className="ring-2 ring-white rounded-full hover:z-10"
          >
            <Avatar src={connection.avatar} alt={connection.name} size="xs" />
          </Link>
        ))}
      </div>
      <span>
        Followed by{' '}
        {connections.length > 0 && (
          <Link 
            href={`/community/profiles/${connections[0].id}`}
            className="font-medium hover:underline"
          >
            {connections[0].name}
          </Link>
        )}
        {totalCount > 1 && (
          <span> and {totalCount - 1} other{totalCount > 2 ? 's' : ''} you follow</span>
        )}
      </span>
    </div>
  );
}
