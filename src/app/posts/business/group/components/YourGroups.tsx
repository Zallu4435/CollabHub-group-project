import React from 'react';

interface Group {
  id: string;
  name: string;
  members: string;
  logo: string;
}

export default function YourGroups() {
  const groups: Group[] = [
    {
      id: '1',
      name: 'SRM UNIVERSITY',
      members: '8,241 members',
      logo: 'bg-blue-100',
    },
    {
      id: '2',
      name: 'Drupal',
      members: '41,092 members',
      logo: 'bg-blue-500',
    },
    {
      id: '3',
      name: 'Drupal Jobs',
      members: '14,298 members',
      logo: 'bg-blue-600',
    },
  ];

  return (
    <div className="divide-y divide-gray-300">
      {groups.map((group) => (
        <div
          key={group.id}
          className="flex items-center justify-between p-4 hover:bg-gray-50 transition-all cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 ${group.logo} rounded flex-shrink-0`}></div>
            <div>
              <h3 className="font-semibold text-gray-900 hover:text-blue-600 hover:underline">
                {group.name}
              </h3>
              <p className="text-sm text-gray-600">{group.members}</p>
            </div>
          </div>
          <button className="text-gray-600 hover:bg-gray-100 p-2 rounded-full">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}
