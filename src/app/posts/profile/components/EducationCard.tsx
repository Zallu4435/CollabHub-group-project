import React from 'react';
import { EducationItem } from "../_data/profileSeed";

export default function EducationCard({ items }: { items: EducationItem[] }) {
  return (
    <div className="bg-white rounded-xl border border-gray-300 shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Education</h2>
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
      <div className="space-y-6">
        {items.map((edu, index) => (
          <div key={edu.id}>
            <div className="flex gap-3">
              <div className="w-12 h-12 rounded bg-gray-200 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{edu.school}</h3>
                <div className="text-sm text-gray-900">{[edu.degree, edu.field].filter(Boolean).join(', ')}</div>
                <div className="text-xs text-gray-600 mt-1">
                  {edu.startDate ? new Date(edu.startDate).toLocaleDateString('en-US', { year: 'numeric' }) : ''}
                  {edu.endDate ? ` — ${new Date(edu.endDate).toLocaleDateString('en-US', { year: 'numeric' })}` : ''}
                </div>
              </div>
            </div>
            {index < items.length - 1 && <div className="mt-6 border-t border-gray-300"></div>}
          </div>
        ))}
      </div>
    </div>
  );
}
