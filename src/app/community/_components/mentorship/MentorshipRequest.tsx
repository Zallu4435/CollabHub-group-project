'use client';

import { useState } from 'react';
import Avatar from '../common/Avatar';

interface MentorshipRequestProps {
  mentorId: string;
  mentorName: string;
  mentorAvatar: string;
  onSubmit: (data: RequestData) => void;
  onCancel: () => void;
}

interface RequestData {
  goals: string;
  expectations: string;
  commitment: string;
  background: string;
}

export default function MentorshipRequest({ 
  mentorName, 
  mentorAvatar, 
  onSubmit, 
  onCancel 
}: MentorshipRequestProps) {
  const [formData, setFormData] = useState<RequestData>({
    goals: '',
    expectations: '',
    commitment: '',
    background: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const isFormValid = formData.goals && formData.expectations && formData.commitment && formData.background;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-50 via-blue-50 to-purple-50 px-8 py-6 border-b border-gray-200">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            <Avatar src={mentorAvatar} alt={mentorName} size="xl" />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center border-2 border-white">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Request Mentorship</h2>
            <p className="text-gray-600 mt-1">from <span className="font-semibold text-gray-900">{mentorName}</span></p>
          </div>
        </div>
        <div className="bg-blue-100 border border-blue-200 rounded-xl p-4">
          <div className="flex gap-3">
            <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <p className="text-sm text-blue-800">
              Take your time to fill out this form thoughtfully. The mentor will review your request and respond within 2-3 business days.
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-8 space-y-8">
        {/* Goals */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <div>
              <label className="block text-lg font-bold text-gray-900">
                What are your goals? <span className="text-red-500">*</span>
              </label>
              <p className="text-sm text-gray-600">Be specific about what you want to achieve</p>
            </div>
          </div>
          <textarea
            value={formData.goals}
            onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
            required
            rows={4}
            placeholder="Example: I want to transition into a senior developer role within the next year and need guidance on technical leadership skills..."
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none text-[15px] leading-relaxed transition-all"
          />
        </div>

        {/* Expectations */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <div>
              <label className="block text-lg font-bold text-gray-900">
                What do you expect from your mentor? <span className="text-red-500">*</span>
              </label>
              <p className="text-sm text-gray-600">Describe the kind of support you're looking for</p>
            </div>
          </div>
          <textarea
            value={formData.expectations}
            onChange={(e) => setFormData({ ...formData, expectations: e.target.value })}
            required
            rows={4}
            placeholder="Example: I'm looking for bi-weekly code reviews, career advice, and help preparing for technical interviews..."
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none text-[15px] leading-relaxed transition-all"
          />
        </div>

        {/* Time Commitment */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <label className="block text-lg font-bold text-gray-900">
                Time commitment <span className="text-red-500">*</span>
              </label>
              <p className="text-sm text-gray-600">How much time can you dedicate?</p>
            </div>
          </div>
          <select
            value={formData.commitment}
            onChange={(e) => setFormData({ ...formData, commitment: e.target.value })}
            required
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-[15px] transition-all"
          >
            <option value="">Select your availability</option>
            <option value="1-2 hours/week">1-2 hours per week</option>
            <option value="3-4 hours/week">3-4 hours per week</option>
            <option value="5+ hours/week">5+ hours per week</option>
            <option value="flexible">Flexible schedule</option>
          </select>
        </div>

        {/* Background */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <label className="block text-lg font-bold text-gray-900">
                Tell us about your background <span className="text-red-500">*</span>
              </label>
              <p className="text-sm text-gray-600">Share your experience and current situation</p>
            </div>
          </div>
          <textarea
            value={formData.background}
            onChange={(e) => setFormData({ ...formData, background: e.target.value })}
            required
            rows={4}
            placeholder="Example: I'm a mid-level developer with 3 years of React experience. Currently working at a startup and looking to level up my skills..."
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none text-[15px] leading-relaxed transition-all"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            Send Request
          </button>
        </div>
      </form>
    </div>
  );
}
