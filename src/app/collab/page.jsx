'use client';

import React, { useState } from 'react';
import { CollabProvider } from './store/collabStore.jsx';
import JoinPreview from './components/JoinPreview.jsx';
import RoomWidget from './components/RoomWidget.jsx';
import {
  Video,
  Brain,
  Users,
  Palette,
  Calendar,
  BarChart3,
  Sparkles,
  ArrowRight,
  Play,
  CheckCircle,
  X
} from 'lucide-react';

const FEATURES = [
  {
    icon: Video,
    title: 'Live Sessions',
    description: 'Real-time video, voice, and screen sharing with up to 100 participants.',
    color: 'blue',
    href: '/collab/sessions',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Brain,
    title: 'Live Quizzes',
    description: 'Interactive MCQ, true/false, and code challenges with leaderboards.',
    color: 'purple',
    href: '/collab/quizzes',
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    icon: Sparkles,
    title: 'Omega Pairing',
    description: 'Random developer matching based on skills for quick collaboration.',
    color: 'fuchsia',
    href: '/collab/omega',
    gradient: 'from-fuchsia-500 to-pink-500'
  },
  {
    icon: Palette,
    title: 'Whiteboard',
    description: 'Collaborative drawing with real-time cursor presence and CRDT sync.',
    color: 'green',
    href: '#',
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    icon: Calendar,
    title: 'Smart Calendar',
    description: 'View and manage upcoming sessions with enrollment and reminders.',
    color: 'amber',
    href: '/collab/calendar',
    gradient: 'from-amber-500 to-orange-500'
  },
  {
    icon: BarChart3,
    title: 'Scheduling Polls',
    description: 'Create ranked-choice polls that auto-schedule winning options.',
    color: 'indigo',
    href: '/collab/scheduling',
    gradient: 'from-indigo-500 to-purple-500'
  }
];

const STATS = [
  { value: '9+', label: 'Collaboration Tools' },
  { value: '<100ms', label: 'Real-time Latency' },
  { value: '100%', label: 'Client-Side Demo' },
  { value: '∞', label: 'Scalability' }
];

export default function CollabLandingPage() {
  const [showJoin, setShowJoin] = useState(false);
  const [joined, setJoined] = useState(false);
  const [roomId, setRoomId] = useState('project:123:standup');
  const [user, setUser] = useState({ id: 'me', name: 'You', role: 'host' });

  if (joined) {
    return (
      <CollabProvider>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
          <RoomWidget
            roomId={roomId}
            user={user}
            onLeave={() => {
              setJoined(false);
              setShowJoin(false);
            }}
          />
        </div>
      </CollabProvider>
    );
  }

  return (
    <CollabProvider>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-violet-50 via-fuchsia-50 to-pink-50">
          {/* Decorative Elements */}
          <div className="absolute inset-0 bg-grid-pattern opacity-5" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-fuchsia-400/20 to-pink-400/20 rounded-full blur-3xl" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Column */}
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-purple-200 shadow-lg">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-semibold text-purple-900">
                    Real-time Collaboration Platform
                  </span>
                </div>

                <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
                  Collaborate in
                  <span className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 bg-clip-text text-transparent">
                    {' '}
                    Real-Time
                  </span>
                </h1>

                <p className="text-xl text-gray-700 leading-relaxed max-w-2xl">
                  Live sessions, interactive quizzes, smart pairing, and collaborative tools—all in
                  one platform. Built for teams, educators, and developer communities.
                </p>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <button
                    onClick={() => setShowJoin(true)}
                    className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-lg shadow-xl hover:shadow-2xl transition-all flex items-center gap-2"
                  >
                    <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    Start a Session
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <a
                    href="/collab/sessions"
                    className="px-8 py-4 rounded-2xl border-2 border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50 text-gray-900 font-semibold transition-all flex items-center gap-2"
                  >
                    Browse Sessions
                  </a>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8">
                  {STATS.map((stat, idx) => (
                    <div key={idx} className="text-center">
                      <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                      <div className="text-xs text-gray-600 mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column - Hero Image */}
              <div className="relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50 backdrop-blur-sm">
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop&q=80"
                    alt="Team collaboration"
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>

                {/* Floating Cards */}
                <div className="absolute -top-6 -right-6 px-4 py-3 rounded-xl bg-white shadow-lg border border-gray-200 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="text-sm">
                    <div className="font-semibold text-gray-900">Live Now</div>
                    <div className="text-gray-600">48 active sessions</div>
                  </div>
                </div>

                <div className="absolute -bottom-6 -left-6 px-4 py-3 rounded-xl bg-white shadow-lg border border-gray-200 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="text-sm">
                    <div className="font-semibold text-gray-900">1,234+</div>
                    <div className="text-gray-600">Active participants</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 lg:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 mb-4">
                <Sparkles className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-semibold text-gray-700">Powerful Features</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Everything You Need to Collaborate
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Built for teams, educators, and communities who need real-time collaboration tools
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {FEATURES.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={idx}
                    className="group relative bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-gray-300 hover:shadow-xl transition-all duration-300"
                  >
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{feature.description}</p>

                    <a
                      href={feature.href}
                      className={`inline-flex items-center gap-2 text-sm font-semibold text-${feature.color}-600 hover:gap-3 transition-all`}
                    >
                      Explore
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Ready to Start Collaborating?</h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Create your first session in seconds. No signup required—just jump in and start
              working together.
            </p>
            <button
              onClick={() => setShowJoin(true)}
              className="px-10 py-5 rounded-2xl bg-white text-blue-600 font-bold text-lg hover:bg-blue-50 shadow-2xl hover:shadow-3xl transition-all inline-flex items-center gap-3"
            >
              <Play className="w-6 h-6" />
              Launch Your First Session
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </section>

        {/* Join Modal */}
        {showJoin && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
            <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-auto shadow-2xl">
              <div className="sticky top-0 bg-white border-b px-6 py-5 flex items-center justify-between z-10">
                <h2 className="text-2xl font-bold text-gray-900">Start or Join a Session</h2>
                <button
                  onClick={() => setShowJoin(false)}
                  className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              <div className="p-6">
                <div className="grid lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <JoinPreview
                      roomId={roomId}
                      user={user}
                      onJoin={() => setJoined(true)}
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-2xl p-6">
                      <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Video className="w-5 h-5 text-blue-600" />
                        Session Settings
                      </h3>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Room ID
                          </label>
                          <input
                            value={roomId}
                            onChange={(e) => setRoomId(e.target.value)}
                            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Your Name
                          </label>
                          <input
                            value={user.name}
                            onChange={(e) =>
                              setUser((prev) => ({ ...prev, name: e.target.value }))
                            }
                            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Role
                          </label>
                          <select
                            value={user.role}
                            onChange={(e) =>
                              setUser((prev) => ({ ...prev, role: e.target.value }))
                            }
                            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="host">Host</option>
                            <option value="cohost">Co-host</option>
                            <option value="participant">Participant</option>
                            <option value="viewer">Viewer</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
                      <h4 className="text-sm font-semibold text-blue-900 mb-2">Quick Tips</h4>
                      <ul className="text-xs text-blue-800 space-y-1">
                        <li>• Test your audio/video before joining</li>
                        <li>• Hosts can moderate and launch quizzes</li>
                        <li>• Use whiteboard for visual collaboration</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </CollabProvider>
  );
}
