'use client';

import { useState } from 'react';

interface ProfileBioProps {
  bio: string;
  editable?: boolean;
  onSave?: (bio: string) => void;
}

export default function ProfileBio({ bio: initialBio, editable = false, onSave }: ProfileBioProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState(initialBio);

  const handleSave = () => {
    onSave?.(bio);
    setIsEditing(false);
  };

  if (!editable || !isEditing) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Bio</h2>
          {editable && (
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Edit
            </button>
          )}
        </div>
        <p className="text-gray-700 whitespace-pre-wrap">{bio || 'No bio added yet.'}</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-4">Edit Bio</h2>
      <textarea
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        maxLength={500}
        rows={6}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
        placeholder="Tell us about yourself..."
      />
      <div className="flex justify-between items-center mt-3">
        <span className="text-sm text-gray-500">{bio.length}/500</span>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setBio(initialBio);
              setIsEditing(false);
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
