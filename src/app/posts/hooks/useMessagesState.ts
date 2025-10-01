"use client";

import { useCallback, useEffect, useMemo, useState } from 'react';
import { messagesSeed, type ConversationItem, type MessageItem, type MessageUser } from "../_data/messagesSeed";

const STORAGE_KEY = 'messages_state_v1';

export interface MessagesApi {
  me: MessageUser;
  conversations: ConversationItem[];
  messagesByConversation: Record<string, MessageItem[]>;
  sendMessage: (conversationId: string, content: string) => void;
}

export function useMessagesState(): MessagesApi {
  const [me] = useState<MessageUser>(messagesSeed.me);
  const [conversations, setConversations] = useState<ConversationItem[]>([]);
  const [messages, setMessages] = useState<MessageItem[]>([]);

  useEffect(() => {
    const saved = typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEY) : null;
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setConversations(parsed.conversations ?? messagesSeed.conversations);
        setMessages(parsed.messages ?? messagesSeed.messages);
      } catch {
        setConversations(messagesSeed.conversations);
        setMessages(messagesSeed.messages);
      }
    } else {
      setConversations(messagesSeed.conversations);
      setMessages(messagesSeed.messages);
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ conversations, messages }));
  }, [conversations, messages]);

  const sendMessage = useCallback((conversationId: string, content: string) => {
    if (!content.trim()) return;
    const msg: MessageItem = {
      id: `msg_${Date.now()}`,
      conversationId,
      senderId: me.id,
      content: content.trim(),
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, msg]);
    setConversations((prev) => prev.map((c) => c.id === conversationId ? { ...c, lastMessageAt: msg.createdAt } : c));
  }, [me.id]);

  const messagesByConversation = useMemo(() => {
    return messages.reduce<Record<string, MessageItem[]>>((acc, m) => {
      (acc[m.conversationId] = acc[m.conversationId] || []).push(m);
      return acc;
    }, {});
  }, [messages]);

  return { me, conversations, messagesByConversation, sendMessage };
}


