import React from 'react';

interface Invitation {
  id: string;
  name: string;
  headline: string;
  mutualConnections: number;
  mutualNames?: string;
  avatar: string;
  verified?: boolean;
}

export default function InvitationsSection() {
  const invitations: Invitation[] = [
    {
      id: '1',
      name: 'Nyawah Petro',
      headline: 'Student at Taita Taveta University',
      mutualConnections: 27,
      mutualNames: 'Gokul S Kaimal',
      avatar: 'from-orange-400 to-red-500',
    },
    {
      id: '2',
      name: 'Muhammed Anshad p',
      headline: 'BBA (Finance) Graduate | Pursuing PG in Logistics & Supply Chain ...',
      mutualConnections: 8,
      mutualNames: 'Prakash G',
      avatar: 'from-blue-400 to-cyan-500',
      verified: true,
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Invitations ({invitations.length})
        </h2>
        <button className="text-sm font-semibold text-gray-600 hover:text-blue-600">
          Show all
        </button>
      </div>

      <div className="space-y-4">
        {invitations.map((invitation) => (
          <div
            key={invitation.id}
            className="flex items-start justify-between p-4 border border-gray-300 rounded-lg hover:shadow-md transition-all"
          >
            <div className="flex gap-3 flex-1">
              <div className={`w-14 h-14 bg-gradient-to-br ${invitation.avatar} rounded-full flex-shrink-0`}></div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-900 truncate">{invitation.name}</h3>
                  {invitation.verified && (
                    <svg className="w-4 h-4 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  )}
                </div>
                <p className="text-sm text-gray-700 line-clamp-2">{invitation.headline}</p>
                <div className="flex items-center gap-1 text-xs text-gray-600 mt-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                  </svg>
                  <span>{invitation.mutualNames} and {invitation.mutualConnections} other mutual connections</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 ml-4">
              <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-full font-semibold text-sm transition-all">
                Ignore
              </button>
              <button className="px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-full font-semibold text-sm hover:bg-blue-50 transition-all">
                Accept
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
