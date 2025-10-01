import React from 'react';

interface Person {
  id: string;
  name: string;
  headline: string;
  mutualConnections: number;
  mutualNames: string;
  avatar: string;
  banner: string;
  verified?: boolean;
  badge?: string;
}

export default function PeopleYouMayKnow() {
  const people: Person[] = [
    {
      id: '1',
      name: 'Emil Shiju',
      headline: 'Mern Stack Developer | Node | React | Express...',
      mutualConnections: 475,
      mutualNames: 'Shamshad',
      avatar: 'from-gray-600 to-gray-800',
      banner: 'bg-gradient-to-r from-gray-700 to-gray-800',
    },
    {
      id: '2',
      name: 'Shallque Rahman',
      headline: 'Backend Developer | Python, Django, Redis...',
      mutualConnections: 19,
      mutualNames: 'Muhammed',
      avatar: 'from-yellow-500 to-orange-600',
      banner: 'bg-gradient-to-r from-green-700 to-yellow-600',
      verified: true,
    },
    {
      id: '3',
      name: 'Akhil EM',
      headline: 'Immediate joiner for MERN roles. Node js ...',
      mutualConnections: 60,
      mutualNames: 'THANVEERA',
      avatar: 'from-gray-700 to-gray-900',
      banner: 'bg-gradient-to-r from-purple-900 to-blue-900',
      badge: 'OPEN TO WORK',
      verified: true,
    },
    {
      id: '4',
      name: 'SIVA SANKAR J',
      headline: 'Structural Engineer | Concrete Design | Steel...',
      mutualConnections: 0,
      mutualNames: '',
      avatar: 'from-blue-400 to-cyan-500',
      banner: 'bg-gradient-to-r from-blue-200 to-cyan-200',
      badge: 'OPEN TO WORK',
      verified: true,
    },
    {
      id: '5',
      name: 'Umar Muqthar',
      headline: 'Helping Tech Companies Hire Skilled...',
      mutualConnections: 386,
      mutualNames: 'Nandana',
      avatar: 'from-purple-400 to-pink-500',
      banner: 'bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-600',
      verified: true,
    },
    {
      id: '6',
      name: 'SANJAY JC',
      headline: 'Software Engineer | Engineering Scalable ...',
      mutualConnections: 14,
      mutualNames: 'Roshan',
      avatar: 'from-gray-600 to-gray-900',
      banner: 'bg-gray-800',
    },
    {
      id: '7',
      name: 'Sharoon Kp',
      headline: 'Software Engineer @Skills-agency | Node ...',
      mutualConnections: 150,
      mutualNames: 'Muhammed',
      avatar: 'from-green-500 to-teal-600',
      banner: 'bg-gradient-to-r from-green-600 to-teal-500',
      verified: true,
      badge: 'EXPLORING',
    },
    {
      id: '8',
      name: 'VIJILESH T K',
      headline: 'Product Design Engineer @ JW ...',
      mutualConnections: 0,
      mutualNames: '',
      avatar: 'from-green-600 to-emerald-700',
      banner: 'bg-gradient-to-r from-teal-800 to-emerald-900',
      verified: true,
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          People you may know based on your recent activity
        </h2>
        <button className="text-sm font-semibold text-gray-600 hover:text-blue-600">
          Show all
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {people.map((person) => (
          <div
            key={person.id}
            className="bg-white border border-gray-300 rounded-lg overflow-hidden hover:shadow-lg transition-all group relative"
          >
            {/* Dismiss button */}
            <button className="absolute top-2 right-2 w-8 h-8 bg-gray-900 bg-opacity-70 hover:bg-opacity-100 text-white rounded-full flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>

            {/* Banner */}
            <div className={`h-16 ${person.banner} relative`}>
              {person.badge && (
                <div className="absolute bottom-2 right-2 bg-green-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {person.badge}
                </div>
              )}
            </div>

            {/* Avatar */}
            <div className="relative -mt-10 px-4">
              <div className={`w-20 h-20 bg-gradient-to-br ${person.avatar} rounded-full border-4 border-white`}></div>
            </div>

            {/* Content */}
            <div className="px-4 pt-2 pb-4">
              <div className="flex items-center gap-1 mb-1">
                <h3 className="font-semibold text-gray-900 text-sm truncate">{person.name}</h3>
                {person.verified && (
                  <svg className="w-4 h-4 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                )}
              </div>
              <p className="text-xs text-gray-700 line-clamp-2 mb-2">{person.headline}</p>
              {person.mutualConnections > 0 && (
                <div className="flex items-center gap-1 text-xs text-gray-600 mb-3">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                  </svg>
                  <span className="line-clamp-1">
                    {person.mutualNames} and {person.mutualConnections} other mutual...
                  </span>
                </div>
              )}
              {person.mutualConnections === 0 && (
                <p className="text-xs text-gray-500 mb-3">Based on your profile</p>
              )}
              <button className="w-full px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-full font-semibold text-sm hover:bg-blue-50 transition-all flex items-center justify-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                </svg>
                Connect
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
