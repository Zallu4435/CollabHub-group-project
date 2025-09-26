"use client";

import React from 'react';
import { Users, Circle } from 'lucide-react';

interface User {
  name: string;
  color: string;
  isVoiceConnected?: boolean;
}

interface MembersListProps {
  users: User[];
  currentUserName: string;
}

export const MembersList: React.FC<MembersListProps> = ({ users, currentUserName }) => {
  // Add current user to the list if not already present
  const allUsers = users.some(user => user.name === currentUserName) 
    ? users 
    : [...users, { name: currentUserName, color: '#4ECDC4' }];

  return (
    <div className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm">
      <div className="flex items-center space-x-2 mb-3">
        <Users className="w-4 h-4 text-gray-600" />
        <h3 className="text-sm font-medium text-gray-700">Members ({allUsers.length})</h3>
      </div>

      <div className="space-y-2">
        {allUsers.map((user, index) => (
          <div key={`${user.name}-${index}`} className="flex items-center space-x-3">
            <div className="relative">
              <Circle 
                className="w-3 h-3" 
                style={{ color: user.color }}
                fill="currentColor"
              />
              {user.isVoiceConnected && (
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full border border-white"></div>
              )}
            </div>
            <span className="text-sm text-gray-700 flex-1 truncate">
              {user.name}
              {user.name === currentUserName && (
                <span className="text-xs text-gray-500 ml-1">(you)</span>
              )}
            </span>
            {user.isVoiceConnected && (
              <div className="flex items-center space-x-1">
                <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-600">Voice</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {allUsers.length === 0 && (
        <div className="text-center text-gray-500 py-4">
          <Users className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">No other members connected</p>
        </div>
      )}

      {/* Connection Info */}
      <div className="mt-4 pt-3 border-t border-gray-200">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Room: collaborative-editing</span>
          <span>Real-time sync</span>
        </div>
      </div>
    </div>
  );
};
