'use client';

import { useState } from 'react';
import TagInput from '../common/TagInput';

interface ProfileSkillsProps {
  skills: string[];
  interests: string[];
  editable?: boolean;
  onSave?: (skills: string[], interests: string[]) => void;
}

export default function ProfileSkills({ 
  skills: initialSkills, 
  interests: initialInterests,
  editable = false, 
  onSave 
}: ProfileSkillsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [skills, setSkills] = useState(initialSkills);
  const [interests, setInterests] = useState(initialInterests);

  const handleSave = () => {
    onSave?.(skills, interests);
    setIsEditing(false);
  };

  if (!editable || !isEditing) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Skills & Interests</h2>
          {editable && (
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Edit
            </button>
          )}
        </div>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Skills</h3>
            {initialSkills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {initialSkills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No skills added yet.</p>
            )}
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Interests</h3>
            {initialInterests.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {initialInterests.map((interest, index) => (
                  <span
                    key={index}
                    className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No interests added yet.</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-4">Edit Skills & Interests</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Skills
          </label>
          <TagInput
            tags={skills}
            onChange={setSkills}
            placeholder="Add a skill (press Enter)"
            maxTags={15}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Interests
          </label>
          <TagInput
            tags={interests}
            onChange={setInterests}
            placeholder="Add an interest (press Enter)"
            maxTags={15}
          />
        </div>
      </div>

      <div className="flex gap-2 justify-end mt-6">
        <button
          onClick={() => {
            setSkills(initialSkills);
            setInterests(initialInterests);
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
  );
}
