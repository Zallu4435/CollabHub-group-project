'use client';

import React, { useState } from 'react';
import { CollabProvider } from '../store/collabStore.jsx';
import CalendarView from '../components/CalendarView.jsx';
import {
  Calendar,
  Bell,
  Filter,
  Download,
  Grid3x3,
  List,
  Clock,
  Users,
  CheckCircle,
  Video,
  Brain,
  Sparkles,
  TrendingUp
} from 'lucide-react';

function CalendarInner() {
  const user = { id: 'me', name: 'You', role: 'participant' };
  const [viewMode, setViewMode] = useState('list'); // list | grid
  const [filterType, setFilterType] = useState('all'); // all | sessions | quizzes | omega

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border-2 border-amber-200 shadow-md mb-4">
                <Calendar className="w-4 h-4 text-amber-600" />
                <span className="text-sm font-bold text-amber-900">Your Schedule</span>
              </div>
              <h1 className="text-5xl font-extrabold text-gray-900 mb-3">
                Event Calendar
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl">
                All your sessions, quizzes, and Omega pairing slots in one organized view
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              {/* View Mode Toggle */}
              <div className="flex items-center gap-2 p-1 bg-white border-2 border-gray-200 rounded-xl">
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === 'list'
                      ? 'bg-amber-600 text-white shadow-md'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  title="List view"
                >
                  <List className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === 'grid'
                      ? 'bg-amber-600 text-white shadow-md'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  title="Grid view"
                >
                  <Grid3x3 className="w-5 h-5" />
                </button>
              </div>

              <button className="px-4 py-2.5 rounded-xl border-2 border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-semibold flex items-center gap-2 transition-all shadow-sm">
                <Filter className="w-4 h-4" />
                <span className="hidden sm:inline">Filter</span>
              </button>

              <button className="px-4 py-2.5 rounded-xl border-2 border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-semibold flex items-center gap-2 transition-all shadow-sm">
                <Bell className="w-4 h-4" />
                <span className="hidden sm:inline">Reminders</span>
              </button>

              <button className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold flex items-center gap-2 transition-all shadow-md hover:shadow-lg">
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export</span>
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-2xl p-6 border-2 border-blue-200 shadow-md hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <Video className="w-6 h-6 text-white" />
                </div>
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">12</div>
              <div className="text-sm text-gray-600">This Week</div>
            </div>

            <div className="bg-white rounded-2xl p-6 border-2 border-green-200 shadow-md hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">3</div>
              <div className="text-sm text-gray-600">Live Now</div>
            </div>

            <div className="bg-white rounded-2xl p-6 border-2 border-purple-200 shadow-md hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">8</div>
              <div className="text-sm text-gray-600">Enrolled</div>
            </div>

            <div className="bg-white rounded-2xl p-6 border-2 border-amber-200 shadow-md hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <Sparkles className="w-5 h-5 text-amber-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">47</div>
              <div className="text-sm text-gray-600">Total Events</div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {[
              { id: 'all', label: 'All Events', icon: Calendar, color: 'gray' },
              { id: 'sessions', label: 'Sessions', icon: Video, color: 'blue' },
              { id: 'quizzes', label: 'Quizzes', icon: Brain, color: 'purple' },
              { id: 'omega', label: 'Omega', icon: Sparkles, color: 'fuchsia' }
            ].map((filter) => {
              const Icon = filter.icon;
              const isActive = filterType === filter.id;
              return (
                <button
                  key={filter.id}
                  onClick={() => setFilterType(filter.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? `bg-${filter.color}-600 text-white shadow-lg`
                      : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Calendar Content */}
        <div className="bg-white rounded-3xl border-2 border-gray-200 p-8 shadow-xl">
          {/* Quick Actions Bar */}
          <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-50 border border-blue-200">
                <div className="w-3 h-3 rounded-full bg-blue-600" />
                <span className="text-xs font-semibold text-blue-900">Sessions</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-purple-50 border border-purple-200">
                <div className="w-3 h-3 rounded-full bg-purple-600" />
                <span className="text-xs font-semibold text-purple-900">Quizzes</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-fuchsia-50 border border-fuchsia-200">
                <div className="w-3 h-3 rounded-full bg-fuchsia-600" />
                <span className="text-xs font-semibold text-fuchsia-900">Omega</span>
              </div>
            </div>

            <div className="text-sm text-gray-600">
              <Clock className="w-4 h-4 inline-block mr-1" />
              <span className="font-semibold">{new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
          </div>

          {/* Calendar View Component */}
          <CalendarView user={user} />
        </div>

        {/* Upcoming Quick View */}
        <div className="mt-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border-2 border-blue-200 p-6 shadow-lg">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            Coming Up Next
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                  <Video className="w-4 h-4 text-white" />
                </div>
                <div className="text-xs text-gray-500">In 30 minutes</div>
              </div>
              <div className="font-semibold text-gray-900 text-sm mb-1">Design Review</div>
              <div className="text-xs text-gray-600">Frontend team sync</div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center">
                  <Brain className="w-4 h-4 text-white" />
                </div>
                <div className="text-xs text-gray-500">Tomorrow, 10 AM</div>
              </div>
              <div className="font-semibold text-gray-900 text-sm mb-1">React Quiz</div>
              <div className="text-xs text-gray-600">15 questions, 20 min</div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-fuchsia-600 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div className="text-xs text-gray-500">Friday, 3 PM</div>
              </div>
              <div className="font-semibold text-gray-900 text-sm mb-1">Omega Pairing</div>
              <div className="text-xs text-gray-600">Random dev match</div>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-8 bg-white rounded-2xl border-2 border-gray-200 p-6 shadow-md">
          <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
            <Bell className="w-4 h-4 text-amber-600" />
            Pro Tips
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span>Enable browser notifications to never miss an event</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span>Sync with Google Calendar for seamless scheduling</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span>Set reminders 5-10 minutes before sessions start</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function CalendarPage() {
  return (
    <CollabProvider>
      <CalendarInner />
    </CollabProvider>
  );
}
