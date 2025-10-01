export interface MessageUser {
  id: string;
  name: string;
  avatarUrl?: string;
}

export interface MessageItem {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  createdAt: string;
}

export interface ConversationItem {
  id: string;
  participants: MessageUser[];
  lastMessageAt: string;
}

export interface MessagesSeedPayload {
  me: MessageUser;
  conversations: ConversationItem[];
  messages: MessageItem[];
}

export const messagesSeed: MessagesSeedPayload = {
  me: { id: 'u_me', name: 'John Doe' },
  conversations: [
    { id: 'cv1', participants: [{ id: 'u_me', name: 'John Doe' }, { id: 'u_sarah', name: 'Sarah Johnson' }], lastMessageAt: new Date(Date.now() - 30 * 60 * 1000).toISOString() },
    { id: 'cv2', participants: [{ id: 'u_me', name: 'John Doe' }, { id: 'u_maria', name: 'Maria Gomez' }], lastMessageAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() },
  ],
  messages: [
    { id: 'm1', conversationId: 'cv1', senderId: 'u_sarah', content: 'Hey John! Congrats on the launch 🎉', createdAt: new Date(Date.now() - 32 * 60 * 1000).toISOString() },
    { id: 'm2', conversationId: 'cv1', senderId: 'u_me', content: 'Thanks Sarah! Appreciate it 🙏', createdAt: new Date(Date.now() - 31 * 60 * 1000).toISOString() },
    { id: 'm3', conversationId: 'cv2', senderId: 'u_maria', content: 'Can you share the new dashboard assets?', createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString() },
  ],
};


