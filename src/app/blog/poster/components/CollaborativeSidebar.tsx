"use client";

import React, { useState } from 'react';
import { Users, Mic, MicOff, ChevronLeft, ChevronRight } from 'lucide-react';
import { VoiceChat } from './VoiceChat';
import { MembersList } from './MembersList';

interface User {
  name: string;
  color: string;
  isVoiceConnected?: boolean;
}

interface CollaborativeSidebarProps {
  roomId: string;
  userName: string;
  onUsersChange?: (users: User[]) => void;
  collaborativeUsersExternal?: User[];
}

export const CollaborativeSidebar: React.FC<CollaborativeSidebarProps> = ({
  roomId,
  userName,
  onUsersChange,
  collaborativeUsersExternal
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [collaborativeUsers, setCollaborativeUsers] = useState<User[]>([]);
  const [voiceUsers, setVoiceUsers] = useState<User[]>([]);

  // Sync external collaborative users from parent (WordEditor) with change check
  const lastExternalRef = React.useRef<string>('');
  const externalSerialized = React.useMemo(() => {
    try { return JSON.stringify(collaborativeUsersExternal ?? []); } catch { return '[]'; }
  }, [collaborativeUsersExternal]);
  React.useEffect(() => {
    if (!collaborativeUsersExternal) return;
    if (externalSerialized !== lastExternalRef.current) {
      lastExternalRef.current = externalSerialized;
      // Only update if shallow different length or any element differs by name/color
      const prev = collaborativeUsers;
      const next = collaborativeUsersExternal;
      const shallowSame = prev.length === next.length && prev.every((u, i) => u.name === next[i].name && u.color === next[i].color && !!u.isVoiceConnected === !!next[i].isVoiceConnected);
      if (!shallowSame) setCollaborativeUsers(next);
    }
  }, [externalSerialized, collaborativeUsersExternal, collaborativeUsers]);

  // Combine users from both collaborative editing and voice chat
  const allUsers = React.useMemo(() => {
    const userMap = new Map<string, User>();
    
    // Add collaborative users
    collaborativeUsers.forEach(user => {
      userMap.set(user.name, { ...user, isVoiceConnected: false });
    });
    
    // Add voice users (merge with existing or add new)
    voiceUsers.forEach(user => {
      const existing = userMap.get(user.name);
      if (existing) {
        existing.isVoiceConnected = true;
      } else {
        userMap.set(user.name, { ...user, isVoiceConnected: true });
      }
    });
    
    return Array.from(userMap.values());
  }, [collaborativeUsers, voiceUsers]);

  // Notify parent component of user changes only when list actually changes
  const lastUsersRef = React.useRef<string>('');
  React.useEffect(() => {
    try {
      const serialized = JSON.stringify(allUsers);
      if (serialized !== lastUsersRef.current) {
        lastUsersRef.current = serialized;
        onUsersChange?.(allUsers);
      }
    } catch {
      // If serialization fails, avoid spamming parent
    }
  }, [allUsers, onUsersChange]);

  const handleCollaborativeUsersChange = React.useCallback((users: User[]) => {
    setCollaborativeUsers(users);
  }, []);

  const handleVoiceUsersChange = React.useCallback((users: User[]) => {
    setVoiceUsers(users);
  }, []);

  if (isCollapsed) {
    return (
      <div className="fixed right-4 top-1/2 -translate-y-1/2 w-10 bg-white border border-gray-300 rounded-l-lg rounded-r-md shadow-md z-40 flex flex-col items-center py-3 space-y-3">
        <button
          onClick={() => setIsCollapsed(false)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          title="Expand collaboration panel"
        >
          <ChevronLeft className="w-4 h-4 text-gray-600" />
        </button>
        
        <div className="flex flex-col items-center space-y-3">
          <div className="relative">
            <Users className="w-5 h-5 text-gray-600" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center">
              {allUsers.length}
            </div>
          </div>
          
          <div className="relative">
            <Mic className="w-5 h-5 text-gray-600" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 text-white text-xs rounded-full flex items-center justify-center">
              {voiceUsers.length}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 h-[520px] w-80 bg-white border border-gray-300 rounded-xl z-40 flex flex-col shadow-lg overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">Collaboration</h2>
          <button
            onClick={() => setIsCollapsed(true)}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
            title="Collapse panel"
          >
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-1">Real-time editing & voice chat</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Members List */}
        <MembersList 
          users={allUsers} 
          currentUserName={userName}
        />

        {/* Voice Chat */}
        <VoiceChat 
          roomId={roomId}
          userName={userName}
          onUsersChange={handleVoiceUsersChange}
        />
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="text-xs text-gray-500 space-y-1">
          <div className="flex items-center justify-between">
            <span>Room ID:</span>
            <span className="font-mono">{roomId}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Status:</span>
            <span className="text-green-600">Connected</span>
          </div>
        </div>
      </div>
    </div>
  );
};
