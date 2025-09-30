'use client';

import { useMemo, useState } from 'react';
import MessageList from '../_components/messages/MessageList';
import ChatWindow from '../_components/messages/ChatWindow';

type Conversation = {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar: string;
  participantOnline: boolean;
  messages: Array<{
    id: string;
    senderId: string;
    content: string;
    timestamp: string;
    isRead: boolean;
  }>;
};

const currentUserId = 'me-1';

export default function MessagesPage() {
  const [selectedConversationId, setSelectedConversationId] = useState<string | undefined>(undefined);

  const conversations: Conversation[] = useMemo(() => [
    {
      id: 'c1',
      participantId: '101',
      participantName: 'John Doe',
      participantAvatar: '/avatars/john.jpg',
      participantOnline: true,
      messages: [
        { id: 'm1', senderId: '101', content: 'Hey! How are you?', timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(), isRead: true },
        { id: 'm2', senderId: currentUserId, content: "I'm good, thanks! Working on the project.", timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(), isRead: true },
        { id: 'm3', senderId: '101', content: 'Great! Let me know if you need help.', timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), isRead: false },
      ]
    },
    {
      id: 'c2',
      participantId: '102',
      participantName: 'Jane Smith',
      participantAvatar: '/avatars/jane.jpg',
      participantOnline: false,
      messages: [
        { id: 'm4', senderId: '102', content: 'Are you joining the event tomorrow?', timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(), isRead: true },
        { id: 'm5', senderId: currentUserId, content: 'Yes! See you there.', timestamp: new Date(Date.now() - 1000 * 60 * 110).toISOString(), isRead: true },
      ]
    }
  ], []);

  const messageListData = useMemo(() => {
    return conversations.map((c) => {
      const last = c.messages[c.messages.length - 1];
      const unreadCount = c.messages.filter((m) => m.senderId !== currentUserId && !m.isRead).length;
      return {
        id: c.id,
        conversationId: c.id,
        senderId: c.participantId,
        senderName: c.participantName,
        senderAvatar: c.participantAvatar,
        lastMessage: last?.content ?? '',
        lastMessageTime: last?.timestamp ?? new Date().toISOString(),
        unreadCount,
        isOnline: c.participantOnline,
      };
    });
  }, [conversations]);

  const activeConversation = useMemo(() => {
    return conversations.find((c) => c.id === selectedConversationId) ?? conversations[0];
  }, [conversations, selectedConversationId]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-[1400px] mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-6">
          {/* Message List Sidebar */}
          <div className="lg:col-span-4 xl:col-span-3 h-[calc(100vh-7rem)]">
            <MessageList
              messages={messageListData}
              selectedConversationId={activeConversation?.id}
              onSelectConversation={setSelectedConversationId}
            />
          </div>

          {/* Chat Window */}
          <div className="lg:col-span-8 xl:col-span-9 h-[calc(100vh-7rem)]">
            {activeConversation ? (
              <ChatWindow
                conversationId={activeConversation.id}
                recipientId={activeConversation.participantId}
                recipientName={activeConversation.participantName}
                recipientAvatar={activeConversation.participantAvatar}
                recipientOnline={activeConversation.participantOnline}
                messages={activeConversation.messages}
                currentUserId={currentUserId}
              />
            ) : (
              <div className="bg-white border border-gray-200 rounded-2xl shadow-sm h-full flex flex-col items-center justify-center text-gray-500">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Your Messages</h3>
                <p className="text-sm text-gray-500">Select a conversation to start chatting</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
