import Avatar from '../common/Avatar';
import Link from 'next/link';

interface PollOption {
  id: string;
  text: string;
  votes: number;
  voters: Array<{
    id: string;
    name: string;
    avatar: string;
  }>;
}

interface PollResultsProps {
  question: string;
  options: PollOption[];
  totalVotes: number;
  createdAt: string;
  expiresAt: string;
  createdBy: {
    id: string;
    name: string;
    avatar: string;
  };
}

export default function PollResults({ question, options, totalVotes, createdAt, expiresAt, createdBy }: PollResultsProps) {
  const sortedOptions = [...options].sort((a, b) => b.votes - a.votes);
  const winningOption = sortedOptions[0];

  const getPercentage = (votes: number) => {
    return totalVotes > 0 ? ((votes / totalVotes) * 100).toFixed(1) : 0;
  };

  const isExpired = new Date(expiresAt) < new Date();

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 px-8 py-6 border-b border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <Link href={`/community/profiles/${createdBy.id}`}>
            <Avatar src={createdBy.avatar} alt={createdBy.name} size="lg" />
          </Link>
          <div>
            <Link
              href={`/community/profiles/${createdBy.id}`}
              className="font-semibold text-gray-900 hover:text-blue-600 transition-colors"
            >
              {createdBy.name}
            </Link>
            <p className="text-sm text-gray-600">Poll Creator</p>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">{question}</h1>
        
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-600">
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Started {new Date(createdAt).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })}
          </span>
          <span>•</span>
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {isExpired ? 'Ended' : 'Ends'} {new Date(expiresAt).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })}
          </span>
          <span>•</span>
          <span className="font-semibold text-gray-900 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            {totalVotes} total {totalVotes === 1 ? 'vote' : 'votes'}
          </span>
        </div>
      </div>

      {/* Results */}
      <div className="p-8">
        <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          Vote Distribution
        </h2>

        <div className="space-y-6">
          {sortedOptions.map((option, index) => {
            const percentage = getPercentage(option.votes);
            const isWinner = option.id === winningOption.id && totalVotes > 0;

            return (
              <div key={option.id} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {index === 0 && isWinner ? (
                      <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-100 to-orange-100 px-3 py-1.5 rounded-full border border-yellow-300">
                        <span className="text-xl">🏆</span>
                        <span className="text-sm font-bold text-orange-700">Winner</span>
                      </div>
                    ) : (
                      <span className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-700 text-sm">
                        {index + 1}
                      </span>
                    )}
                    <h3 className="font-semibold text-gray-900 text-lg">{option.text}</h3>
                  </div>
                  <div className="text-right flex items-center gap-3">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">{percentage}%</span>
                      <p className="text-sm text-gray-600">
                        {option.votes} {option.votes === 1 ? 'vote' : 'votes'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="relative w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ${
                      isWinner 
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                        : 'bg-gradient-to-r from-blue-500 to-blue-600'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                {option.voters.length > 0 && (
                  <div className="flex items-center gap-3 ml-11">
                    <div className="flex -space-x-2">
                      {option.voters.slice(0, 5).map((voter) => (
                        <Link
                          key={voter.id}
                          href={`/community/profiles/${voter.id}`}
                          className="ring-2 ring-white rounded-full hover:z-10 hover:scale-110 transition-transform"
                          title={voter.name}
                        >
                          <Avatar src={voter.avatar} alt={voter.name} size="sm" />
                        </Link>
                      ))}
                    </div>
                    {option.voters.length > 5 && (
                      <span className="text-sm text-gray-600 font-medium">
                        and {option.voters.length - 5} other{option.voters.length - 5 !== 1 ? 's' : ''}
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="px-8 py-6 bg-gray-50 border-t border-gray-200 flex flex-wrap gap-3 justify-center">
        <button className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-semibold transition-all">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          Share Results
        </button>
        <Link href="/community/polls">
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-semibold transition-all">
            View All Polls
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </Link>
      </div>
    </div>
  );
}
