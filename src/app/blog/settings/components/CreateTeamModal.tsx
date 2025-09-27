"use client";

import { useState } from "react";
import { BlogTeamRole } from "../../types";

interface CreateTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (name: string, description: string, defaultRole: BlogTeamRole) => void;
}

export default function CreateTeamModal({ isOpen, onClose, onCreate }: CreateTeamModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [defaultRole, setDefaultRole] = useState<BlogTeamRole>('contributor');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onCreate(name.trim(), description.trim(), defaultRole);
      // Reset form
      setName('');
      setDescription('');
      setDefaultRole('contributor');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
        <h3 className="text-lg font-semibold text-black mb-4">Create New Team</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-black mb-2">Team Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
              placeholder="Enter team name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
              rows={3}
              placeholder="Describe your team's purpose"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black mb-2">Default Role for New Members</label>
            <select
              value={defaultRole}
              onChange={(e) => setDefaultRole(e.target.value as BlogTeamRole)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
            >
              <option value="contributor">Contributor</option>
              <option value="editor">Editor</option>
              <option value="viewer">Viewer</option>
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
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create Team
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
