'use client';

import React, { useState } from 'react';
import { CollabProvider } from './store/collabStore.jsx';
import JoinPreview from './components/JoinPreview.jsx';
import RoomWidget from './components/RoomWidget.jsx';

export default function CollabLandingPage() {
  const [joined, setJoined] = useState(false);
  const [roomId, setRoomId] = useState('project:123:standup');
  const [user, setUser] = useState({ id: 'me', name: 'You', role: 'host' });

  return (
    <CollabProvider>
      <div className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-gradient-to-br from-violet-50 to-fuchsia-50 border-b">
          <div className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">Collab Hub</h1>
              <p className="mt-4 text-lg text-gray-700">Room-based collaboration: live video/voice UI simulation, chat, reactions, whiteboard, Q&A, quizzes, calendar, Omega pairing, and scheduling polls.</p>
              <div className="mt-6 flex items-center gap-3">
                <a href="#join" className="px-5 py-3 rounded-lg bg-blue-600 text-white font-medium">Start a Room</a>
                <a href="/collab/quizzes" className="px-5 py-3 rounded-lg border font-medium">Explore Quizzes</a>
              </div>
            </div>
            <div className="bg-white border rounded-2xl p-4">
              <div className="text-sm text-gray-600 mb-2">What’s inside</div>
              <div className="grid sm:grid-cols-2 gap-3 text-sm">
                <a href="/collab#join" className="border rounded-xl p-3 hover:shadow">Live Session</a>
                <a href="/collab/quizzes" className="border rounded-xl p-3 hover:shadow">Quizzes</a>
                <a href="/collab/omega" className="border rounded-xl p-3 hover:shadow">Omega Pairing</a>
                <a href="/collab/calendar" className="border rounded-xl p-3 hover:shadow">Calendar</a>
                <a href="/collab/scheduling" className="border rounded-xl p-3 hover:shadow">Scheduling Polls</a>
              </div>
            </div>
          </div>
        </section>

        {/* Join Section */}
        <section id="join" className="max-w-7xl mx-auto px-6 py-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Start or Join a Session</h2>
            <p className="text-gray-600">Preview your mic/camera, then jump into the room.</p>
          </div>
          {!joined ? (
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
          ) : (
            <RoomWidget roomId={roomId} user={user} onLeave={() => setJoined(false)} />
          )}
        </section>
      </div>
    </CollabProvider>
  );
}
