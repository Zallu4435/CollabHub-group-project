'use client';

import React from 'react';
import { useModeration } from '../store/collabStore.jsx';

export default function ModerationPanel({ roomId, user }) {
  const isHost = user?.role === 'host' || user?.role === 'cohost';
  const { settings, flags, audit, warnings, setSettings, warnUser, muteUser, resolveFlag } = useModeration(roomId, user, isHost);
  if (!isHost) return null;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
      <div className="px-4 py-3 border-b">
        <div className="text-sm font-semibold text-gray-900">AI Moderation (Stub)</div>
      </div>
      <div className="p-3 space-y-4">
        <div className="border border-gray-200 rounded p-2">
          <div className="text-sm font-semibold mb-2">Policy Settings</div>
          <div className="flex items-center gap-3 mb-2">
            <label className="text-sm w-28">Sensitivity</label>
            <input type="range" min="0" max="1" step="0.05" value={settings.sensitivity} onChange={(e)=>setSettings({ sensitivity: parseFloat(e.target.value) })} className="flex-1"/>
            <span className="text-xs text-gray-600">{Math.round(settings.sensitivity*100)}%</span>
          </div>
          <div className="flex items-center gap-3 mb-2">
            <label className="text-sm w-28">Auto Warn</label>
            <input type="checkbox" checked={settings.autoWarn} onChange={(e)=>setSettings({ autoWarn: e.target.checked })} />
          </div>
          <div className="flex items-center gap-3 mb-2">
            <label className="text-sm w-28">Auto Mute</label>
            <input type="checkbox" checked={settings.autoMute} onChange={(e)=>setSettings({ autoMute: e.target.checked })} />
            <input type="number" min="10" value={settings.muteSeconds} onChange={(e)=>setSettings({ muteSeconds: Number(e.target.value) })} className="w-20 border rounded px-2 py-1 text-sm" />
            <span className="text-xs text-gray-600">seconds</span>
          </div>
        </div>

        <div className="border border-gray-200 rounded p-2">
          <div className="text-sm font-semibold mb-2">Flags</div>
          <div className="space-y-2 max-h-40 overflow-auto">
            {flags.length === 0 && <div className="text-sm text-gray-500">No flags yet.</div>}
            {flags.map(f => (
              <div key={f.id} className="border rounded p-2">
                <div className="text-xs text-gray-500">{f.userName} • score {Math.round(f.score*100)}% • {new Date(f.ts).toLocaleTimeString()}</div>
                <div className="text-sm text-gray-900">{f.text}</div>
                <div className="text-xs text-gray-600">{f.reason}</div>
                <div className="mt-1 flex items-center gap-2">
                  <button onClick={()=>warnUser(f.userId, 8)} className="text-xs px-2 py-1 rounded border">Warn</button>
                  <button onClick={()=>muteUser(f.userId)} className="text-xs px-2 py-1 rounded border">Timeout</button>
                  <button onClick={()=>resolveFlag(f.id)} className="text-xs px-2 py-1 rounded bg-green-600 text-white">Resolve</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border border-gray-200 rounded p-2">
          <div className="text-sm font-semibold mb-2">Audit Log</div>
          <div className="space-y-1 max-h-40 overflow-auto text-xs text-gray-700">
            {audit.length === 0 && <div className="text-gray-500">No actions yet.</div>}
            {audit.slice().reverse().map(a => (
              <div key={a.id}>
                {new Date(a.ts).toLocaleTimeString()} • {a.action} • target: {a.targetId} {a.meta ? `• ${JSON.stringify(a.meta)}` : ''}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
