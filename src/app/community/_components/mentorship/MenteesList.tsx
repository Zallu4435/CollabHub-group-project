import Avatar from '../common/Avatar';
import Link from 'next/link';

interface Mentee {
  id: string;
  name: string;
  username: string;
  avatar: string;
  goals: string;
  startDate: string;
  progress: number;
  status: 'active' | 'paused' | 'completed';
}

interface MenteesListProps {
  mentees: Mentee[];
}

export default function MenteesList({ mentees }: MenteesListProps) {
  const statusColors = {
    active: 'bg-green-100 text-green-700',
    paused: 'bg-yellow-100 text-yellow-700',
    completed: 'bg-blue-100 text-blue-700'
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">My Mentees</h2>
        <p className="text-sm text-gray-600">People you're currently mentoring</p>
      </div>

      <div className="divide-y divide-gray-200">
        {mentees.map((mentee) => (
          <div key={mentee.id} className="p-6 hover:bg-gray-50 transition-colors">
            <div className="flex items-start gap-4">
              <Link href={`/community/profiles/${mentee.id}`}>
                <Avatar src={mentee.avatar} alt={mentee.name} size="lg" />
              </Link>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Link
                    href={`/community/profiles/${mentee.id}`}
                    className="font-semibold text-gray-900 hover:text-blue-600"
                  >
                    {mentee.name}
                  </Link>
                  <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${statusColors[mentee.status]}`}>
                    {mentee.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">@{mentee.username}</p>
                <p className="text-sm text-gray-700 mb-3 line-clamp-2">
                  <span className="font-medium">Goals:</span> {mentee.goals}
                </p>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium text-gray-900">{mentee.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${mentee.progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500">
                    Mentoring since {new Date(mentee.startDate).toLocaleDateString('en-US', {
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                  Message
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {mentees.length === 0 && (
        <div className="p-12 text-center text-gray-500">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <p>You don't have any mentees yet</p>
        </div>
      )}
    </div>
  );
}
