'use client';

import React, { useState } from 'react';
import { CollabProvider } from './store/collabStore.jsx';
import JoinPreview from './components/JoinPreview.jsx';
import RoomWidget from './components/RoomWidget.jsx';

export default function CollabLandingPage() {
  const [showJoin, setShowJoin] = useState(false);
  const [joined, setJoined] = useState(false);
  const [roomId, setRoomId] = useState('project:123:standup');
  const [user, setUser] = useState({ id: 'me', name: 'You', role: 'host' });

  if (joined) {
    return (
      <CollabProvider>
        <div className="min-h-screen bg-white">
          <RoomWidget roomId={roomId} user={user} onLeave={() => { setJoined(false); setShowJoin(false); }} />
        </div>
      </CollabProvider>
    );
  }

  return (
    <CollabProvider>
      <div className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-gradient-to-br from-violet-50 to-fuchsia-50 border-b">
          <div className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">Collab Hub</h1>
              <p className="mt-4 text-lg text-gray-700">Real-time collaboration platform with live sessions, quizzes, pairing, and scheduling.</p>
              <div className="mt-6 flex items-center gap-3">
                <button onClick={() => setShowJoin(true)} className="px-5 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700">Start a Session</button>
                <a href="/collab/quizzes" className="px-5 py-3 rounded-lg border font-medium hover:shadow">Browse Quizzes</a>
              </div>
            </div>
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop" alt="Team collaboration" className="rounded-2xl shadow-xl"/>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Everything you need to collaborate</h2>
            <p className="mt-2 text-gray-600">Powerful features for teams, educators, and communities</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Live Sessions */}
            <div className="border rounded-2xl p-6 hover:shadow-lg transition">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4 text-2xl">🎥</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Live Sessions</h3>
              <p className="text-gray-600 text-sm mb-4">Browse and join live sessions or create your own. Public rooms with real-time collaboration.</p>
              <a href="/collab/sessions" className="text-blue-600 text-sm font-medium hover:underline">Browse Sessions →</a>
            </div>

            {/* Quizzes */}
            <div className="border rounded-2xl p-6 hover:shadow-lg transition">
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-4 text-2xl">📝</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Live Quizzes</h3>
              <p className="text-gray-600 text-sm mb-4">Create MCQ, true/false, and coding quizzes with timers, scoring, and leaderboards.</p>
              <a href="/collab/quizzes" className="text-purple-600 text-sm font-medium hover:underline">Browse Quizzes →</a>
            </div>

            {/* Omega Pairing */}
            <div className="border rounded-2xl p-6 hover:shadow-lg transition">
              <div className="w-12 h-12 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center mb-4 text-2xl">🤝</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Omega Pairing</h3>
              <p className="text-gray-600 text-sm mb-4">Random developer pairing based on skills and interests for 5-10 minute sessions.</p>
              <a href="/collab/omega" className="text-pink-600 text-sm font-medium hover:underline">Find a Partner →</a>
            </div>

            {/* Whiteboard */}
            <div className="border rounded-2xl p-6 hover:shadow-lg transition">
              <div className="w-12 h-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center mb-4 text-2xl">🎨</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Whiteboard</h3>
              <p className="text-gray-600 text-sm mb-4">Collaborative drawing with presence cursors, pen/eraser tools, and local CRDT sync.</p>
              <button onClick={() => setShowJoin(true)} className="text-green-600 text-sm font-medium hover:underline">Try Whiteboard →</button>
            </div>

            {/* Calendar */}
            <div className="border rounded-2xl p-6 hover:shadow-lg transition">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mb-4 text-2xl">📅</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Calendar</h3>
              <p className="text-gray-600 text-sm mb-4">View upcoming sessions, quizzes, and Omega slots with enrollment and reminders.</p>
              <a href="/collab/calendar" className="text-amber-600 text-sm font-medium hover:underline">View Calendar →</a>
            </div>

            {/* Scheduling Polls */}
            <div className="border rounded-2xl p-6 hover:shadow-lg transition">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4 text-2xl">🗳️</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Scheduling Polls</h3>
              <p className="text-gray-600 text-sm mb-4">Create polls for topics/times with ranked-choice voting and auto-schedule winners.</p>
              <a href="/collab/scheduling" className="text-indigo-600 text-sm font-medium hover:underline">Create Poll →</a>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-gray-50 border-y">
          <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-gray-900">9+</div>
              <div className="text-sm text-gray-600 mt-1">Features</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">Real-time</div>
              <div className="text-sm text-gray-600 mt-1">Collaboration</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">Local-first</div>
              <div className="text-sm text-gray-600 mt-1">No Backend</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">UI Simulation</div>
              <div className="text-sm text-gray-600 mt-1">Demo Ready</div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-7xl mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900">Ready to collaborate?</h2>
          <p className="mt-2 text-gray-600">Start a session in seconds. No signup required.</p>
          <button onClick={() => setShowJoin(true)} className="mt-6 px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700">Start Your First Session</button>
        </section>

        {/* Join Modal */}
        {showJoin && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-auto">
              <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Start or Join a Session</h2>
                <button onClick={() => setShowJoin(false)} className="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
              </div>
              <div className="p-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <JoinPreview roomId={roomId} user={user} onJoin={() => setJoined(true)} />
                  </div>
                  <div className="md:col-span-1">
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                      <h3 className="font-semibold text-gray-900 mb-3">Room Settings</h3>
                      <label className="block text-sm text-gray-600 mb-1">Room ID</label>
                      <input value={roomId} onChange={(e) => setRoomId(e.target.value)} className="w-full border rounded-lg px-3 py-2 mb-4"/>
                      <label className="block text-sm text-gray-600 mb-1">Your Name</label>
                      <input value={user.name} onChange={(e) => setUser(prev => ({...prev, name: e.target.value}))} className="w-full border rounded-lg px-3 py-2 mb-4"/>
                      <label className="block text-sm text-gray-600 mb-1">Role</label>
                      <select value={user.role} onChange={(e) => setUser(prev => ({...prev, role: e.target.value}))} className="w-full border rounded-lg px-3 py-2">
                        <option value="host">Host</option>
                        <option value="cohost">Co-host</option>
                        <option value="participant">Participant</option>
                        <option value="viewer">Viewer</option>
                      </select>
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
