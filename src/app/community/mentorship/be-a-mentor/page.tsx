'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import TagInput from '../../_components/common/TagInput';
import Link from 'next/link';

export default function BeAMentorPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    expertise: [] as string[],
    availability: 'limited',
    maxMentees: 5,
    bio: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Becoming a mentor:', formData);
    router.push('/community/mentorship');
  };

  const isFormValid = formData.expertise.length > 0 && formData.bio.trim();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center gap-2 text-sm">
            <li>
              <Link href="/community/mentorship" className="text-blue-600 hover:text-blue-700 font-medium">
                Mentorship
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-600">Become a Mentor</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Become a Mentor</h1>
              <p className="text-gray-600 mt-1">Share your knowledge and help others grow in their journey</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
          <div className="p-8 space-y-8">
            {/* Expertise */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <label className="block text-lg font-bold text-gray-900">
                    Areas of Expertise <span className="text-red-500">*</span>
                  </label>
                  <p className="text-sm text-gray-600">Add skills you can mentor others in</p>
                </div>
              </div>
              <TagInput
                tags={formData.expertise}
                onChange={(expertise) => setFormData({ ...formData, expertise })}
                placeholder="Type and press Enter to add (e.g., React, Python, Career Development)..."
              />
            </div>

            {/* Bio */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <label className="block text-lg font-bold text-gray-900">
                    Mentor Bio <span className="text-red-500">*</span>
                  </label>
                  <p className="text-sm text-gray-600">Tell potential mentees about yourself</p>
                </div>
              </div>
              <textarea
                required
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                rows={5}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none text-[15px] leading-relaxed transition-all"
                placeholder="Share your experience, background, and what you can help mentees with. Be authentic and welcoming..."
              />
              <p className="text-sm text-gray-500 mt-2">{formData.bio.length}/1000 characters</p>
            </div>

            {/* Availability */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <label className="block text-lg font-bold text-gray-900">
                    Availability <span className="text-red-500">*</span>
                  </label>
                  <p className="text-sm text-gray-600">Current mentoring capacity</p>
                </div>
              </div>
              <select
                value={formData.availability}
                onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-[15px] transition-all"
              >
                <option value="available">Available - Accepting new mentees</option>
                <option value="limited">Limited Slots - Few spots remaining</option>
                <option value="unavailable">Currently Unavailable</option>
              </select>
            </div>

            {/* Max Mentees */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <label className="block text-lg font-bold text-gray-900">
                    Maximum Mentees
                  </label>
                  <p className="text-sm text-gray-600">How many can you effectively mentor?</p>
                </div>
              </div>
              <input
                type="number"
                min="1"
                max="20"
                value={formData.maxMentees}
                onChange={(e) => setFormData({ ...formData, maxMentees: parseInt(e.target.value) })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-[15px] transition-all"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="px-8 py-6 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-semibold transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isFormValid}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Become a Mentor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
