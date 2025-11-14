'use client';

import React, { useMemo, useState } from 'react';
import { useHandRaise, useParticipants } from '../../store/collabStore.jsx';
import {
  Hand,
  Clock,
  Mic,
  UserCheck,
  X,
  ChevronDown,
  Timer,
  Users
} from 'lucide-react';

export default function HandRaiseQueue({ roomId, user }) {
  const {
    queue,
    dequeue,
    callOn
  } = useHandRaise(roomId, user, user?.role === 'host' || user?.role === 'cohost');
  const { participants } = useParticipants(roomId);
  const isHost = user?.role === 'host' || user?.role === 'cohost';
  const [expanded, setExpanded] = useState(true);

  const items = useMemo(
    () => queue.map((id) => participants.find((p) => p.id === id)).filter(Boolean),
    [queue, participants]
  );

  // Calculate wait times (mock for demo)
  const getWaitTime = (index) => {
    return `${index + 1}m`;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
      {/* Header */}
      <div className="px-5 py-4 bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-600 flex items-center justify-center">
              <Hand className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900">Hand Raise Queue</h3>
              <p className="text-xs text-gray-600 flex items-center gap-1">
                <Users className="w-3 h-3" />
                {items.length} {items.length === 1 ? 'person' : 'people'} waiting
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {items.length > 0 && (
              <span className="px-2 py-1 rounded-full bg-amber-600 text-white text-xs font-bold">
                {items.length}
              </span>
            )}
            <button
              onClick={() => setExpanded(!expanded)}
              className="p-2 rounded-lg hover:bg-amber-100 transition-colors"
              title={expanded ? 'Collapse' : 'Expand'}
            >
              <ChevronDown
                className={`w-4 h-4 text-gray-600 transition-transform ${
                  expanded ? '' : 'rotate-180'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Queue List */}
      {expanded && (
        <div className="max-h-[400px] overflow-auto">
          {items.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center px-4">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                <Hand className="w-6 h-6 text-gray-400" />
              </div>
              <p className="text-sm font-medium text-gray-500">No hands raised</p>
              <p className="text-xs text-gray-400 mt-1">
                Participants can raise their hand to speak
              </p>
            </div>
          )}

          <div className="divide-y divide-gray-100">
            {items.map((p, index) => (
              <div
                key={p.id}
                className={`px-5 py-4 hover:bg-gray-50 transition-colors ${
                  index === 0 ? 'bg-amber-50/50' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* Queue Position Badge */}
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-sm ${
                      index === 0
                        ? 'bg-amber-600 text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {index + 1}
                  </div>

                  {/* Avatar */}
                  <div className="relative">
                    <img
                      src={p.avatarUrl}
                      alt={p.name}
                      className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                    />
                    {index === 0 && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-amber-500 rounded-full flex items-center justify-center border-2 border-white">
                        <Hand className="w-2.5 h-2.5 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Participant Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-semibold text-gray-900 truncate">
                        {p.name}
                      </div>
                      {index === 0 && (
                        <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-700 text-[10px] font-bold uppercase">
                          Next
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-gray-500 capitalize">{p.role}</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Waiting {getWaitTime(index)}
                      </span>
                    </div>
                  </div>

                  {/* Host Actions */}
                  {isHost && (
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={() => callOn(p.id, 90)}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors shadow-sm"
                        title="Give 90 seconds to speak"
                      >
                        <Mic className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Call (90s)</span>
                      </button>
                      <button
                        onClick={() => dequeue(p.id)}
                        className="p-2 rounded-lg border border-gray-200 hover:bg-red-50 hover:border-red-200 text-gray-600 hover:text-red-600 transition-colors"
                        title="Remove from queue"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                {/* On-Stage Timer (if called on) */}
                {p.onStageUntil && p.onStageUntil > Date.now() && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="flex items-center gap-2 text-xs">
                      <Timer className="w-3.5 h-3.5 text-blue-600" />
                      <span className="font-semibold text-blue-900">
                        Speaking time remaining:{' '}
                        {Math.ceil((p.onStageUntil - Date.now()) / 1000)}s
                      </span>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-600 transition-all"
                          style={{
                            width: `${
                              ((p.onStageUntil - Date.now()) / (90 * 1000)) * 100
                            }%`
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Quick Actions Footer (Host Only) */}
          {isHost && items.length > 0 && (
            <div className="px-5 py-3 border-t bg-gray-50 flex items-center justify-between">
              <div className="text-xs text-gray-600">Host Actions</div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => items.forEach((p) => dequeue(p.id))}
                  className="px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-white text-xs font-medium text-gray-700 transition-colors"
                >
                  Clear All
                </button>
                {items[0] && (
                  <button
                    onClick={() => callOn(items[0].id, 90)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors"
                  >
                    <UserCheck className="w-3.5 h-3.5" />
                    Call Next
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
