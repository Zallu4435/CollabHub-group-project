'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import TagInput from '../../_components/common/TagInput';
import Link from 'next/link';

export default function CreateHangoutPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    topic: '',
    type: 'audio',
    maxParticipants: 50,
    isPrivate: false,
    tags: [] as string[]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating hangout:', formData);
    router.push('/community/hangouts');
  };

  const isFormValid = formData.name.trim() && formData.topic.trim();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center gap-2 text-sm">
            <li>
              <Link href="/community/hangouts" className="text-blue-600 hover:text-blue-700 font-medium">
                Hangouts
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-600">Create Room</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Create Hangout Room</h1>
              <p className="text-gray-600 mt-1">Set up your audio or video room</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
          <div className="p-8 space-y-8">
            {/* Room Type */}
            <div>
              <label className="block text-lg font-bold text-gray-900 mb-4">
                Room Type <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, type: 'audio' })}
                  className={`p-6 border-2 rounded-2xl transition-all ${
                    formData.type === 'audio'
                      ? 'border-blue-500 bg-blue-50 shadow-lg'
                      : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                  }`}
                >
                  <div className={`w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center ${
                    formData.type === 'audio' ? 'bg-blue-600' : 'bg-gray-200'
                  }`}>
                    <svg className={`w-6 h-6 ${formData.type === 'audio' ? 'text-white' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                  </div>
                  <p className="font-bold text-gray-900 mb-1">Audio Room</p>
                  <p className="text-sm text-gray-600">Voice-only conversation</p>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, type: 'video' })}
                  className={`p-6 border-2 rounded-2xl transition-all ${
                    formData.type === 'video'
                      ? 'border-purple-500 bg-purple-50 shadow-lg'
                      : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                  }`}
                >
                  <div className={`w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center ${
                    formData.type === 'video' ? 'bg-purple-600' : 'bg-gray-200'
                  }`}>
                    <svg className={`w-6 h-6 ${formData.type === 'video' ? 'text-white' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="font-bold text-gray-900 mb-1">Video Room</p>
                  <p className="text-sm text-gray-600">Face-to-face meeting</p>
                </button>
              </div>
            </div>

            {/* Room Name */}
            <div>
              <label className="block text-lg font-bold text-gray-900 mb-3">
                Room Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-[15px] transition-all"
                placeholder="Enter a catchy room name..."
              />
            </div>

            {/* Topic */}
            <div>
              <label className="block text-lg font-bold text-gray-900 mb-3">
                Topic <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                value={formData.topic}
                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none text-[15px] leading-relaxed transition-all"
                placeholder="What will you discuss in this room?"
              />
            </div>

            {/* Max Participants */}
            <div>
              <label className="block text-lg font-bold text-gray-900 mb-3">
                Maximum Participants
              </label>
              <input
                type="number"
                min="2"
                max="100"
                value={formData.maxParticipants}
                onChange={(e) => setFormData({ ...formData, maxParticipants: parseInt(e.target.value) })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-[15px] transition-all"
              />
              <p className="text-sm text-gray-600 mt-2">Recommended: 2-50 participants</p>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-lg font-bold text-gray-900 mb-3">
                Tags
              </label>
              <TagInput
                tags={formData.tags}
                onChange={(tags) => setFormData({ ...formData, tags })}
                placeholder="Add relevant tags (e.g., JavaScript, Design, Career)..."
              />
            </div>

            {/* Privacy Toggle */}
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
              <label className="flex items-start gap-4 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isPrivate}
                  onChange={(e) => setFormData({ ...formData, isPrivate: e.target.checked })}
                  className="mt-1 w-5 h-5 text-blue-600 rounded"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-bold text-gray-900">Private Room</p>
                    <span className="px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full text-xs font-bold">
                      Invite Only
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">Only people you invite can join this room</p>
                </div>
              </label>
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
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Create Room
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
