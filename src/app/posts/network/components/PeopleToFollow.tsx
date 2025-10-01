import React from 'react';

interface PersonToFollow {
  id: string;
  name: string;
  headline: string;
  followers: string;
  avatar: string;
  banner: string;
  verified?: boolean;
}

export default function PeopleToFollow() {
  const people: PersonToFollow[] = [
    {
      id: '1',
      name: 'Shradha Khapra',
      headline: 'Co-Founder, Apna College | 6Million+ YT | Ex-SDE Microsoft ...',
      followers: '',
      avatar: 'from-pink-400 to-red-500',
      banner: 'bg-gradient-to-r from-yellow-400 to-orange-500',
    },
    {
      id: '2',
      name: 'Mahima Mahendru',
      headline: 'SWE-2 @Google| Ex-SDE @Goldman Sachs | Ex- SDE Inter...',
      followers: '',
      avatar: 'from-orange-400 to-pink-500',
      banner: 'bg-gradient-to-r from-blue-500 to-purple-600',
      verified: true,
    },
    {
      id: '3',
      name: 'Tamanna Verma',
      headline: 'Software Engineer 2 @Microsoft || Prev: Walmart || Mentor ...',
      followers: '',
      avatar: 'from-blue-400 to-cyan-500',
      banner: 'bg-gradient-to-r from-gray-100 to-gray-300',
      verified: true,
    },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-300 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            People to follow based on your activity
          </h2>
          <button className="text-sm font-semibold text-gray-600 hover:text-blue-600">
            Show all
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {people.map((person) => (
            <div
              key={person.id}
              className="border border-gray-300 rounded-lg overflow-hidden hover:shadow-lg transition-all group relative"
            >
              {/* Dismiss button */}
              <button className="absolute top-2 right-2 w-8 h-8 bg-gray-900 bg-opacity-70 hover:bg-opacity-100 text-white rounded-full flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              </button>

              {/* Banner with content preview */}
              <div className={`h-24 ${person.banner} relative overflow-hidden`}>
                {/* Add screenshot/content image here if available */}
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
                <p className="text-xs text-gray-700 line-clamp-2 mb-3">{person.headline}</p>
                <button className="w-full px-4 py-2 border-2 border-gray-600 text-gray-900 rounded-full font-semibold text-sm hover:bg-gray-100 transition-all flex items-center justify-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                  </svg>
                  Follow
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
