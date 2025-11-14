'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRoom } from '../store/collabStore.jsx';
import { Video, Mic, Settings, CheckCircle, AlertCircle } from 'lucide-react';

const mockCams = ['FaceTime HD (Built‑in)', 'Logitech C920', 'Virtual Camera'];
const mockMics = ['MacBook Microphone', 'Yeti Nano', 'AirPods'];

export default function JoinPreview({ roomId, user, onJoin }) {
  const { room } = useRoom(roomId, roomId);
  const [camera, setCamera] = useState(mockCams[0]);
  const [microphone, setMicrophone] = useState(mockMics[0]);
  const [micLevel, setMicLevel] = useState(0);
  const [testing, setTesting] = useState(false);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!testing) return;
    timerRef.current = setInterval(() => {
      setMicLevel(Math.floor(Math.random() * 100));
    }, 120);
    return () => clearInterval(timerRef.current);
  }, [testing]);

  return (
    <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-xl max-w-5xl mx-auto">
      {/* Header */}
      <div className="px-6 py-5 border-b bg-gradient-to-r from-blue-50 to-purple-50">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Video className="w-6 h-6 text-blue-600" />
          Setup & Preview
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Room: <span className="font-mono font-semibold text-gray-900">{room?.id || roomId}</span>
        </p>
      </div>

      <div className="p-6 grid lg:grid-cols-2 gap-8">
        {/* Video Preview */}
        <div className="space-y-4">
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-900 shadow-lg">
            {videoEnabled ? (
              <div className="absolute inset-0 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 flex items-center justify-center">
                <div className="text-gray-400 text-sm">Live camera preview ({camera})</div>
              </div>
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <Video className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <div className="text-sm text-gray-500">Camera Off</div>
                </div>
              </div>
            )}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-center gap-3">
              <button
                onClick={() => setVideoEnabled(!videoEnabled)}
                className={`p-3 rounded-xl ${
                  videoEnabled ? 'bg-white/90 text-gray-900' : 'bg-red-600 text-white'
                } shadow-lg transition-colors`}
              >
                <Video className="w-5 h-5" />
              </button>
              <button
                onClick={() => setAudioEnabled(!audioEnabled)}
                className={`p-3 rounded-xl ${
                  audioEnabled ? 'bg-white/90 text-gray-900' : 'bg-red-600 text-white'
                } shadow-lg transition-colors`}
              >
                <Mic className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Device Selection */}
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Video className="w-4 h-4" />
                Camera
              </label>
              <select
                value={camera}
                onChange={(e) => setCamera(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                {mockCams.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Mic className="w-4 h-4" />
                Microphone
              </label>
              <select
                value={microphone}
                onChange={(e) => setMicrophone(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                {mockMics.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Settings & Info */}
        <div className="space-y-6">
          {/* User Info */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-100 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Your Name</div>
                <div className="font-bold text-lg text-gray-900">{user?.name || 'You'}</div>
              </div>
              <span className="px-3 py-1.5 text-xs font-semibold rounded-full bg-blue-600 text-white uppercase tracking-wide">
                {user?.role || 'participant'}
              </span>
            </div>

            {/* Microphone Test */}
            <div className="pt-4 border-t border-blue-200">
              <div className="flex items-center justify-between mb-3">
                <div className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                  <Mic className="w-4 h-4" />
                  Microphone Test
                </div>
                <button
                  onClick={() => setTesting((v) => !v)}
                  className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
                    testing
                      ? 'bg-red-600 text-white shadow-md'
                      : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {testing ? 'Stop Test' : 'Start Test'}
                </button>
              </div>
              <div className="relative h-3 w-full bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-green-500 to-green-600 transition-all duration-100"
                  style={{ width: `${micLevel}%` }}
                />
              </div>
              <div className="mt-2 text-xs text-gray-600 flex items-center justify-between">
                <span>Input level: {micLevel}%</span>
                {micLevel > 60 && (
                  <span className="flex items-center gap-1 text-green-600">
                    <CheckCircle className="w-3 h-3" />
                    Good signal
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Connection Check */}
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">
            <div className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Connection Status
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Network</span>
                <span className="flex items-center gap-1 text-green-600 font-medium">
                  <CheckCircle className="w-4 h-4" />
                  Stable
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Camera Access</span>
                <span className="flex items-center gap-1 text-green-600 font-medium">
                  <CheckCircle className="w-4 h-4" />
                  Granted
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Microphone Access</span>
                <span className="flex items-center gap-1 text-green-600 font-medium">
                  <CheckCircle className="w-4 h-4" />
                  Granted
                </span>
              </div>
            </div>
          </div>

          {/* Join Button */}
          <button
            onClick={onJoin}
            className="w-full px-6 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-[1.02]"
          >
            Join Session Now
          </button>
        </div>
      </div>
    </div>
  );
}
