'use client';

import React, { useEffect, useState } from 'react';
import { useQuizQueue } from '../store/collabStore.jsx';
import {
  Users,
  Clock,
  Play,
  Pause,
  StopCircle,
  CheckCircle,
  AlertCircle,
  Calendar
} from 'lucide-react';

export default function QuizSessionCard({ session, user }) {
  const { enroll, withdraw, setStatus, delay } = useQuizQueue(user);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const openIn = Math.max(0, session.enrollmentOpenAt - now);
  const closeIn = Math.max(0, session.enrollmentCloseAt - now);
  const startsIn = Math.max(0, session.startAt - now);
  const enrolled = (session.enrolledIds || []).includes(user?.id || 'me');
  const waitlisted = (session.waitlistIds || []).includes(user?.id || 'me');
  const full = (session.enrolledIds?.length || 0) >= (session.capacity || 0);
  const isHost = user?.role === 'host' || user?.role === 'cohost';

  const formatTime = (ms) => {
    const s = Math.ceil(ms / 1000);
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const r = s % 60;
    if (h > 0) return `${h}h ${m}m`;
    if (m > 0) return `${m}m ${r}s`;
    return `${r}s`;
  };

  const getStatusColor = () => {
    if (session.status === 'live') return 'bg-green-100 text-green-700 border-green-200';
    if (session.status === 'paused') return 'bg-amber-100 text-amber-700 border-amber-200';
    if (session.status === 'ended') return 'bg-gray-100 text-gray-700 border-gray-200';
    return 'bg-blue-100 text-blue-700 border-blue-200';
  };

  return (
    <div className="border-2 border-gray-200 rounded-2xl p-5 bg-white hover:shadow-lg transition-all duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-gray-900 mb-1 truncate">
            {session.title}
          </h3>
          <div className="flex items-center gap-2">
            <span
              className={`px-2 py-1 text-xs font-semibold rounded-lg border ${getStatusColor()}`}
            >
              {session.status.toUpperCase()}
            </span>
            <div className="flex items-center gap-1 text-xs text-gray-600">
              <Users className="w-3.5 h-3.5" />
              <span className="font-semibold">
                {session.enrolledIds?.length || 0}/{session.capacity}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Timing Info */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
          <div className="text-[10px] text-blue-600 uppercase tracking-wide font-semibold mb-1">
            Opens In
          </div>
          <div className="text-sm font-bold text-blue-900">{formatTime(openIn)}</div>
        </div>
        <div className="bg-orange-50 rounded-lg p-3 border border-orange-100">
          <div className="text-[10px] text-orange-600 uppercase tracking-wide font-semibold mb-1">
            Closes In
          </div>
          <div className="text-sm font-bold text-orange-900">{formatTime(closeIn)}</div>
        </div>
        <div className="bg-purple-50 rounded-lg p-3 border border-purple-100">
          <div className="text-[10px] text-purple-600 uppercase tracking-wide font-semibold mb-1">
            Starts In
          </div>
          <div className="text-sm font-bold text-purple-900">{formatTime(startsIn)}</div>
        </div>
      </div>

      {/* Status Badges */}
      <div className="flex items-center gap-2 mb-4">
        {enrolled && (
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-100 text-green-700 text-xs font-semibold border border-green-200">
            <CheckCircle className="w-3.5 h-3.5" />
            Enrolled
          </span>
        )}
        {waitlisted && (
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-100 text-amber-700 text-xs font-semibold border border-amber-200">
            <AlertCircle className="w-3.5 h-3.5" />
            Waitlisted
          </span>
        )}
        {full && !enrolled && (
          <span className="px-3 py-1.5 rounded-lg bg-red-100 text-red-700 text-xs font-semibold border border-red-200">
            Full
          </span>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        {openIn === 0 && closeIn > 0 && !enrolled && !waitlisted && (
          <button
            onClick={() => enroll(session.id)}
            className="flex-1 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors shadow-md hover:shadow-lg"
          >
            Enroll Now
          </button>
        )}
        {enrolled && startsIn > 0 && (
          <a
            href="/collab"
            className="flex-1 px-4 py-2.5 rounded-xl border-2 border-blue-200 hover:bg-blue-50 text-blue-700 text-sm font-semibold text-center transition-colors"
          >
            Get Ready
          </a>
        )}
        {enrolled && startsIn === 0 && (
          <a
            href="/collab"
            className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white text-sm font-semibold text-center transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4" />
            Join Now
          </a>
        )}
      </div>

      {/* Host Controls */}
      {isHost && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-2">
            Host Controls
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                setStatus(session.id, session.status === 'paused' ? 'scheduled' : 'paused')
              }
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-xs font-medium transition-colors"
            >
              {session.status === 'paused' ? (
                <>
                  <Play className="w-3.5 h-3.5" />
                  Resume
                </>
              ) : (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  Pause
                </>
              )}
            </button>
            <button
              onClick={() => delay(session.id, 5)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-xs font-medium transition-colors"
            >
              <Calendar className="w-3.5 h-3.5" />
              Delay 5m
            </button>
            <button
              onClick={() => setStatus(session.id, 'ended')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-200 text-red-700 hover:bg-red-50 text-xs font-medium transition-colors"
            >
              <StopCircle className="w-3.5 h-3.5" />
              End
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
