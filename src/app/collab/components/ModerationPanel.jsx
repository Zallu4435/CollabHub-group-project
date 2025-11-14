'use client';

import React from 'react';
import { useModeration } from '../store/collabStore.jsx';
import { Shield, AlertTriangle, Settings, Activity, CheckCircle } from 'lucide-react';

export default function ModerationPanel({ roomId, user }) {
  const isHost = user?.role === 'host' || user?.role === 'cohost';
  const { settings, flags, audit, setSettings, warnUser, muteUser, resolveFlag } =
    useModeration(roomId, user, isHost);

  if (!isHost) return null;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
      <div className="px-5 py-4 border-b bg-gradient-to-r from-red-50 to-orange-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900">AI Moderation</h3>
            <p className="text-xs text-gray-600">Automated content monitoring</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4 max-h-[600px] overflow-auto">
        {/* Settings */}
        <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
          <div className="flex items-center gap-2 mb-4">
            <Settings className="w-4 h-4 text-gray-600" />
            <div className="text-sm font-semibold text-gray-900">Policy Settings</div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="flex items-center justify-between text-sm text-gray-700 mb-2">
                <span>Sensitivity</span>
                <span className="font-semibold text-blue-600">
                  {Math.round(settings.sensitivity * 100)}%
                </span>
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={settings.sensitivity}
                onChange={(e) => setSettings({ sensitivity: parseFloat(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
              <label className="text-sm text-gray-700 font-medium">Auto Warn</label>
              <input
                type="checkbox"
                checked={settings.autoWarn}
                onChange={(e) => setSettings({ autoWarn: e.target.checked })}
                className="w-5 h-5 rounded accent-blue-600"
              />
            </div>

            <div className="p-3 bg-white rounded-lg border border-gray-200 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm text-gray-700 font-medium">Auto Mute</label>
                <input
                  type="checkbox"
                  checked={settings.autoMute}
                  onChange={(e) => setSettings({ autoMute: e.target.checked })}
                  className="w-5 h-5 rounded accent-blue-600"
                />
              </div>
              {settings.autoMute && (
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="10"
                    value={settings.muteSeconds}
                    onChange={(e) => setSettings({ muteSeconds: Number(e.target.value) })}
                    className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm"
                  />
                  <span className="text-xs text-gray-600">seconds</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Flags */}
        <div className="border border-red-200 rounded-xl p-4 bg-red-50">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-red-600" />
            <div className="text-sm font-semibold text-red-900">Active Flags</div>
            <span className="ml-auto px-2 py-0.5 rounded-full bg-red-600 text-white text-xs font-bold">
              {flags.length}
            </span>
          </div>

          <div className="space-y-2 max-h-64 overflow-auto">
            {flags.length === 0 && (
              <div className="text-sm text-gray-500 text-center py-4">No flags yet</div>
            )}
            {flags.map((f) => (
              <div key={f.id} className="border border-red-200 rounded-lg p-3 bg-white">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-gray-900">{f.userName}</span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      f.score > 0.8
                        ? 'bg-red-600 text-white'
                        : f.score > 0.6
                        ? 'bg-orange-600 text-white'
                        : 'bg-yellow-600 text-white'
                    }`}
                  >
                    {Math.round(f.score * 100)}%
                  </span>
                </div>
                <div className="text-sm text-gray-900 mb-1">{f.text}</div>
                <div className="text-xs text-gray-600 mb-2">{f.reason}</div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => warnUser(f.userId, 8)}
                    className="flex-1 px-3 py-1.5 rounded-lg border border-orange-200 text-orange-700 hover:bg-orange-50 text-xs font-medium transition-colors"
                  >
                    Warn
                  </button>
                  <button
                    onClick={() => muteUser(f.userId)}
                    className="flex-1 px-3 py-1.5 rounded-lg border border-red-200 text-red-700 hover:bg-red-50 text-xs font-medium transition-colors"
                  >
                    Timeout
                  </button>
                  <button
                    onClick={() => resolveFlag(f.id)}
                    className="flex-1 px-3 py-1.5 rounded-lg bg-green-600 hover:bg-green-700 text-white text-xs font-medium transition-colors flex items-center justify-center gap-1"
                  >
                    <CheckCircle className="w-3 h-3" />
                    Resolve
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Audit Log */}
        <div className="border border-gray-200 rounded-xl p-4 bg-white">
          <div className="flex items-center gap-2 mb-3">
            <Activity className="w-4 h-4 text-gray-600" />
            <div className="text-sm font-semibold text-gray-900">Audit Log</div>
          </div>
          <div className="space-y-1 max-h-48 overflow-auto text-xs text-gray-700 font-mono">
            {audit.length === 0 && <div className="text-gray-500">No actions yet</div>}
            {audit
              .slice()
              .reverse()
              .map((a) => (
                <div key={a.id} className="py-1">
                  <span className="text-gray-500">
                    {new Date(a.ts).toLocaleTimeString()}
                  </span>{' '}
                  • <span className="font-semibold">{a.action}</span> • target: {a.targetId}
                  {a.meta && ` • ${JSON.stringify(a.meta)}`}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
