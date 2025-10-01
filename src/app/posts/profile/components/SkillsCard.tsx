import React from 'react';
import { SkillItem } from "../_data/profileSeed";

export default function SkillsCard({ items }: { items: SkillItem[] }) {
  const displayedSkills = items.slice(0, 9);
  const remainingCount = items.length - 9;

  return (
    <div className="bg-white rounded-xl border border-gray-300 shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Skills</h2>
        <div className="flex gap-2">
          <button className="text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-all">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            </svg>
          </button>
          <button className="text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-all">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
            </svg>
          </button>
        </div>
      </div>
      <div className="space-y-4">
        {displayedSkills.map((skill) => (
          <div key={skill.id} className="border-b border-gray-200 pb-4 last:border-0">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">{skill.name}</h3>
              <button className="text-blue-600 hover:bg-blue-50 px-3 py-1 rounded-full text-sm font-semibold transition-all">
                Endorse
              </button>
            </div>
            <div className="text-xs text-gray-600 mt-1">{skill.endorsements} endorsements</div>
          </div>
        ))}
      </div>
      {remainingCount > 0 && (
        <button className="mt-4 w-full text-center py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-semibold transition-all">
          Show all {items.length} skills →
        </button>
      )}
    </div>
  );
}
