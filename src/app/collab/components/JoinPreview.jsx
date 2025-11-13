'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useRoom } from '../store/collabStore.jsx';

const mockCams = ['FaceTime HD (Built‑in)', 'Logitech C920', 'Virtual Camera'];
const mockMics = ['MacBook Microphone', 'Yeti Nano', 'AirPods'];

export default function JoinPreview({ roomId, user, onJoin }) {
  const { room } = useRoom(roomId, roomId);
  const [camera, setCamera] = useState(mockCams[0]);
  const [microphone, setMicrophone] = useState(mockMics[0]);
  const [micLevel, setMicLevel] = useState(0);
  const [testing, setTesting] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!testing) return;
    timerRef.current = setInterval(() => {
      setMicLevel(Math.floor(Math.random() * 100));
    }, 120);
    return () => clearInterval(timerRef.current);
  }, [testing]);

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
      <div className="px-5 py-4 border-b">
        <h2 className="text-lg font-semibold text-gray-900">Join Preview</h2>
        <p className="text-sm text-gray-600 mt-1">Room: <span className="font-mono">{room?.id}</span></p>
      </div>

      <div className="p-5 grid md:grid-cols-2 gap-6">
        <div>
          <div className="aspect-video rounded-xl bg-gray-100 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-200"></div>
            <div className="relative text-gray-500 text-sm">Camera preview ({camera})</div>
          </div>
          <div className="mt-4">
            <label className="block text-sm text-gray-600 mb-1">Camera</label>
            <select value={camera} onChange={(e) => setCamera(e.target.value)} className="w-full border rounded-lg px-3 py-2">
              {mockCams.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="mt-4">
            <label className="block text-sm text-gray-600 mb-1">Microphone</label>
            <select value={microphone} onChange={(e) => setMicrophone(e.target.value)} className="w-full border rounded-lg px-3 py-2">
              {mockMics.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
        </div>

        <div>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600">Name</div>
                <div className="font-medium text-gray-900">{user?.name || 'You'}</div>
              </div>
              <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-700">{user?.role || 'participant'}</span>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-gray-800">Mic Test</div>
                <button onClick={() => setTesting(v => !v)} className={`text-xs px-2 py-1 rounded border ${testing ? 'bg-red-50 text-red-700 border-red-200' : 'bg-white text-gray-700 border-gray-200'}`}>
                  {testing ? 'Stop' : 'Test'}
                </button>
              </div>
              <div className="mt-3 h-3 w-full bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 transition-all" style={{ width: `${micLevel}%` }} />
              </div>
              <div className="mt-2 text-xs text-gray-500">Input level: {micLevel}%</div>
            </div>

            <div className="mt-6">
              <button onClick={onJoin} className="w-full px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700">Join Session</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
