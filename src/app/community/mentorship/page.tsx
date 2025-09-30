"use client";

import MentorDiscovery from '../_components/mentorship/MentorDiscovery';
import MentorshipDashboard from '../_components/mentorship/MentorshipDashboard';
import { mentors, upcomingSessions } from '../_data/mentors';
import Link from 'next/link';

export default function MentorshipPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Mentorship Hub</h1>
              <p className="text-gray-600 mt-1">Connect with experienced mentors and accelerate your growth</p>
            </div>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <Link href="/community/mentorship" className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 text-sm font-semibold transition-all">
                Find Mentor
              </Link>
              <Link href="/community/mentorship/be-a-mentor" className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 text-sm font-semibold shadow-md transition-all">
                Be a Mentor
              </Link>
              <Link href="/community/mentorship/my-mentors" className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 text-sm font-semibold transition-all">
                My Mentors
              </Link>
              <Link href="/community/mentorship/my-mentees" className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 text-sm font-semibold transition-all">
                My Mentees
              </Link>
            </div>
          </div>
          <div className="md:hidden grid grid-cols-2 gap-2 mt-3">
            <Link href="/community/mentorship" className="px-3 py-2 border-2 border-gray-300 text-gray-700 rounded-xl text-sm font-semibold text-center">
              Find Mentor
            </Link>
            <Link href="/community/mentorship/be-a-mentor" className="px-3 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl text-sm font-semibold text-center">
              Be a Mentor
            </Link>
            <Link href="/community/mentorship/my-mentors" className="px-3 py-2 border-2 border-gray-300 text-gray-700 rounded-xl text-sm font-semibold text-center">
              My Mentors
            </Link>
            <Link href="/community/mentorship/my-mentees" className="px-3 py-2 border-2 border-gray-300 text-gray-700 rounded-xl text-sm font-semibold text-center">
              My Mentees
            </Link>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <MentorDiscovery mentors={mentors} />
          </div>
          <div>
            <MentorshipDashboard 
              stats={{ activeMentees: 2, totalSessions: 18, hoursSpent: 24, rating: 4.8 }}
              upcomingSessions={upcomingSessions}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
