"use client";

import Link from 'next/link';

type ActiveChat = {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar: string;
  participantOnline: boolean;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
};

// For now, mirror the messages mock by creating a minimal list here.
const mockActiveChats: ActiveChat[] = [
  {
    id: 'c1',
    participantId: '101',
    participantName: 'John Doe',
    participantAvatar: '/avatars/john.jpg',
    participantOnline: true,
    lastMessage: 'Great! Let me know if you need help.',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    unreadCount: 1
  },
  {
    id: 'c2',
    participantId: '102',
    participantName: 'Jane Smith',
    participantAvatar: '/avatars/jane.jpg',
    participantOnline: false,
    lastMessage: 'Are you joining the event tomorrow?',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    unreadCount: 0
  }
];

export default function ActiveChats() {
  const chats = mockActiveChats;

  return (
    <aside className="bg-white border border-gray-200 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-900">Active chats</h3>
        <Link href="/community/messages" className="text-xs text-blue-600 hover:text-blue-700 font-medium">Open inbox</Link>
      </div>
      <ul className="space-y-3">
        {chats.map(c => (
          <li key={c.id} className="flex items-center gap-3">
            <div className="relative">
              <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-200">
                <img src={c.participantAvatar} alt={c.participantName} className="w-full h-full object-cover" />
              </div>
              {c.participantOnline && <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full" />}
            </div>
            <div className="min-w-0 flex-1">
              <Link href={`/community/messages`} className="block text-sm font-medium text-gray-900 truncate">
                {c.participantName}
              </Link>
              <p className="text-xs text-gray-600 truncate">{c.lastMessage}</p>
            </div>
            {c.unreadCount > 0 && (
              <span className="ml-2 bg-blue-600 text-white text-xs font-bold rounded-full px-2 py-0.5 flex-shrink-0">
                {c.unreadCount}
              </span>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
}


