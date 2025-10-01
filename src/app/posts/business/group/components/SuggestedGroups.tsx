import React from 'react';

interface SuggestedGroup {
  id: string;
  name: string;
  members: string;
  logo: string;
}

export default function SuggestedGroups() {
  const groups: SuggestedGroup[] = [
    {
      id: '1',
      name: 'Full Stack Developer Community | Tech | HR | Remote Job\'s | AI ML | Web3 Crypto',
      members: '135,010 members',
      logo: 'bg-blue-600',
    },
    {
      id: '2',
      name: 'JavaScript',
      members: '1,502,839 members',
      logo: 'bg-yellow-500',
    },
    {
      id: '3',
      name: 'GeeksforGeeks- Official Group',
      members: '705,130 members',
      logo: 'bg-green-600',
    },
    {
      id: '4',
      name: 'Python Developers Community (moderated)',
      members: '2,703,899 members',
      logo: 'bg-gradient-to-br from-blue-500 to-yellow-500',
    },
    {
      id: '5',
      name: 'Internship Group',
      members: '1,542,230 members',
      logo: 'bg-gray-300',
    },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-300 overflow-hidden sticky top-20">
      <div className="p-4 border-b border-gray-300">
        <h2 className="font-semibold text-gray-900">Groups you might be interested in</h2>
      </div>

      <div className="divide-y divide-gray-300">
        {groups.map((group) => (
          <div key={group.id} className="p-4 hover:bg-gray-50 transition-all">
            <div className="flex items-start gap-3 mb-3">
              <div className={`w-14 h-14 ${group.logo} rounded flex-shrink-0`}></div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2 hover:text-blue-600 hover:underline cursor-pointer">
                  {group.name}
                </h3>
                <p className="text-xs text-gray-600">{group.members}</p>
              </div>
            </div>
            <button className="w-full px-4 py-2 border-2 border-gray-600 text-gray-900 rounded-full font-semibold hover:bg-gray-100 transition-all text-sm">
              Join
            </button>
          </div>
        ))}
      </div>

      <div className="p-4 text-center border-t border-gray-300">
        <button className="text-sm text-gray-700 hover:text-blue-600 font-semibold flex items-center justify-center gap-1 w-full">
          Show all
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
