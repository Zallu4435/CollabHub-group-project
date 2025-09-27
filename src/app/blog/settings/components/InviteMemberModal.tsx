"use client";

import { useState } from "react";
import { BlogTeam, BlogTeamRole } from "../../types";

interface InviteMemberModalProps {
  team: BlogTeam;
  isOpen: boolean;
  onClose: () => void;
  onInvite: (email: string, role: BlogTeamRole) => void;
  showSkip?: boolean;
}

export default function InviteMemberModal({ team, isOpen, onClose, onInvite, showSkip = false }: InviteMemberModalProps) {
  const [inviteMethod, setInviteMethod] = useState<'email' | 'link' | 'search'>('email');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<BlogTeamRole>('contributor');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Array<{id: string, name: string, email: string, avatar?: string}>>([]);

  // Mock user search results
  const mockUsers = [
    { id: 'user_1', name: 'John Doe', email: 'john@example.com', avatar: '/avatars/john.jpg' },
    { id: 'user_2', name: 'Jane Smith', email: 'jane@example.com', avatar: '/avatars/jane.jpg' },
    { id: 'user_3', name: 'Mike Johnson', email: 'mike@example.com', avatar: '/avatars/mike.jpg' },
    { id: 'user_4', name: 'Sarah Wilson', email: 'sarah@example.com', avatar: '/avatars/sarah.jpg' },
    { id: 'user_5', name: 'Alex Brown', email: 'alex@example.com', avatar: '/avatars/alex.jpg' },
  ];

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      onInvite(email.trim(), role);
      setEmail('');
      onClose();
    }
  };

  const handleSearchUsers = (query: string) => {
    setSearchQuery(query);
    if (query.length > 2) {
      const results = mockUsers.filter(user => 
        user.name.toLowerCase().includes(query.toLowerCase()) ||
        user.email.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleInviteUser = (user: {id: string, name: string, email: string}) => {
    onInvite(user.email, role);
    setSearchQuery('');
    setSearchResults([]);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-black">Invite Member to {team.name}</h3>
          {showSkip && (
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Skip for now
            </button>
          )}
        </div>
        
        {/* Method Selection */}
        <div className="flex space-x-2 mb-6">
          <button
            type="button"
            onClick={() => setInviteMethod('email')}
            className={`flex-1 p-3 rounded-lg border text-sm font-medium transition-colors ${
              inviteMethod === 'email' 
                ? 'border-blue-500 bg-blue-50 text-blue-700' 
                : 'border-gray-300 hover:border-gray-400 text-black'
            }`}
          >
            📧 Email
          </button>
          <button
            type="button"
            onClick={() => setInviteMethod('search')}
            className={`flex-1 p-3 rounded-lg border text-sm font-medium transition-colors ${
              inviteMethod === 'search' 
                ? 'border-blue-500 bg-blue-50 text-blue-700' 
                : 'border-gray-300 hover:border-gray-400 text-black'
            }`}
          >
            🔍 Search
          </button>
          <button
            type="button"
            onClick={() => setInviteMethod('link')}
            className={`flex-1 p-3 rounded-lg border text-sm font-medium transition-colors ${
              inviteMethod === 'link' 
                ? 'border-blue-500 bg-blue-50 text-blue-700' 
                : 'border-gray-300 hover:border-gray-400 text-black'
            }`}
          >
            🔗 Link
          </button>
        </div>

        {/* Email Invitation */}
        {inviteMethod === 'email' && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-black mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black bg-white"
                placeholder="member@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-2">Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as BlogTeamRole)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black bg-white"
              >
                <option value="contributor" className="text-black">Contributor</option>
                <option value="editor" className="text-black">Editor</option>
                <option value="viewer" className="text-black">Viewer</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Contributors can create drafts and submit for review. Editors can publish directly.
              </p>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Send Invitation
              </button>
            </div>
          </form>
        )}

        {/* User Search */}
        {inviteMethod === 'search' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-black mb-2">Search Users</label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchUsers(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black bg-white"
                placeholder="Search by name or email..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-black mb-2">Role for Selected Users</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as BlogTeamRole)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black bg-white"
              >
                <option value="contributor" className="text-black">Contributor</option>
                <option value="editor" className="text-black">Editor</option>
                <option value="viewer" className="text-black">Viewer</option>
              </select>
            </div>

            {/* Search Results */}
            {searchResults.length > 0 && (
              <div className="border border-gray-200 rounded-lg max-h-48 overflow-y-auto">
                <div className="p-2 bg-gray-50 border-b border-gray-200">
                  <p className="text-sm text-gray-600">Click on a user to invite them</p>
                </div>
                {searchResults.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
                    onClick={() => handleInviteUser(user)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-white">{user.name[0]}</span>
                      </div>
                      <div>
                        <div className="font-medium text-black">{user.name}</div>
                        <div className="text-sm text-gray-600">{user.email}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">as {role}</span>
                      <span className="text-blue-600 text-sm font-medium">Invite</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {searchQuery.length > 2 && searchResults.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>No users found matching "{searchQuery}"</p>
              </div>
            )}

            {searchQuery.length <= 2 && searchQuery.length > 0 && (
              <div className="text-center py-4 text-gray-500">
                <p>Type at least 3 characters to search</p>
              </div>
            )}

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Invite Link */}
        {inviteMethod === 'link' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-black mb-2">Invite Link</label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={`https://app.example.com/join/${team.slug}`}
                  readOnly
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm text-black"
                />
                <button
                  type="button"
                  onClick={() => navigator.clipboard.writeText(`https://app.example.com/join/${team.slug}`)}
                  className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  Copy
                </button>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-black mb-2">Default Role for Link Invites</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as BlogTeamRole)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black bg-white"
              >
                <option value="contributor" className="text-black">Contributor</option>
                <option value="editor" className="text-black">Editor</option>
                <option value="viewer" className="text-black">Viewer</option>
              </select>
            </div>

            <div className="flex items-center space-x-4 text-sm">
              <label className="flex items-center text-black">
                <input type="checkbox" defaultChecked className="mr-2" />
                Require approval
              </label>
              <label className="flex items-center text-black">
                <input type="checkbox" defaultChecked className="mr-2" />
                Expires in 7 days
              </label>
            </div>

            <p className="text-xs text-gray-500">
              Share this link with anyone you want to invite. They can join directly or request approval.
            </p>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
