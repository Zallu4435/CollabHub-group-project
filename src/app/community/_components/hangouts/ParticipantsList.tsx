import Avatar from '../common/Avatar';
import Link from 'next/link';

interface Participant {
  id: string;
  name: string;
  username: string;
  avatar: string;
  isMuted: boolean;
  isHost: boolean;
  isSpeaking: boolean;
}

interface ParticipantsListProps {
  participants: Participant[];
  currentUserId: string;
  isHost: boolean;
}

export default function ParticipantsList({ participants, currentUserId, isHost }: ParticipantsListProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg">
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-semibold text-gray-900">
          Participants ({participants.length})
        </h3>
      </div>

      <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
        {participants.map((participant) => {
          const isCurrentUser = participant.id === currentUserId;

          return (
            <div
              key={participant.id}
              className={`p-4 flex items-center gap-3 ${
                participant.isSpeaking ? 'bg-green-50' : 'hover:bg-gray-50'
              }`}
            >
              <div className="relative">
                <Avatar src={participant.avatar} alt={participant.name} size="md" />
                {participant.isSpeaking && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <Link
                    href={`/community/profiles/${participant.id}`}
                    className="font-medium text-gray-900 hover:text-blue-600 truncate"
                  >
                    {participant.name}
                  </Link>
                  {participant.isHost && (
                    <span className="bg-purple-100 text-purple-700 text-xs px-2 py-0.5 rounded-full">
                      Host
                    </span>
                  )}
                  {isCurrentUser && (
                    <span className="text-xs text-gray-500">(You)</span>
                  )}
                </div>
                <p className="text-sm text-gray-600 truncate">@{participant.username}</p>
              </div>

              <div className="flex items-center gap-2">
                {participant.isMuted ? (
                  <div className="text-red-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                    </svg>
                  </div>
                ) : (
                  <div className="text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                  </div>
                )}

                {isHost && !participant.isHost && (
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
