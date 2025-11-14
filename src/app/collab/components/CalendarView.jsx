'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useCalendar, useQuizQueue } from '../store/collabStore.jsx';
import { CAL_EVENTS } from '../_data/calendarEvents.js';
import { Calendar, Clock, Users, Video, Brain, Sparkles } from 'lucide-react';

const EVENT_STYLES = {
  quiz: {
    bg: 'bg-gradient-to-br from-blue-50 to-blue-100',
    border: 'border-blue-200',
    badge: 'bg-blue-600',
    icon: Brain,
    textColor: 'text-blue-700'
  },
  omega: {
    bg: 'bg-gradient-to-br from-purple-50 to-purple-100',
    border: 'border-purple-200',
    badge: 'bg-purple-600',
    icon: Sparkles,
    textColor: 'text-purple-700'
  },
  session: {
    bg: 'bg-gradient-to-br from-green-50 to-green-100',
    border: 'border-green-200',
    badge: 'bg-green-600',
    icon: Video,
    textColor: 'text-green-700'
  }
};

export default function CalendarView({ user }) {
  const { events, loadEvents } = useCalendar();
  const { enroll } = useQuizQueue(user);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    loadEvents(CAL_EVENTS);
  }, [loadEvents]);

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 60000); // Update every minute
    return () => clearInterval(timer);
  }, []);

  const grouped = useMemo(() => {
    const byDay = {};
    for (const e of events) {
      const d = new Date(e.startsAt).toDateString();
      byDay[d] = byDay[d] || [];
      byDay[d].push(e);
    }
    return Object.entries(byDay).sort((a, b) => new Date(a[0]) - new Date(b[0]));
  }, [events]);

  const formatTime = (ts) =>
    new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
  };

  const isLive = (e) => now >= e.startsAt && now <= e.endsAt;
  const isUpcoming = (e) => now < e.startsAt;

  return (
    <div className="space-y-8">
      {grouped.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <Calendar className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No events scheduled</h3>
          <p className="text-sm text-gray-500 max-w-sm">
            Check back later for upcoming sessions, quizzes, and events.
          </p>
        </div>
      )}

      {grouped.map(([day, items]) => {
        const dayLabel = formatDate(day);
        return (
          <div key={day} className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
              <div className="px-4 py-1.5 rounded-full bg-gray-100 text-sm font-semibold text-gray-700">
                {dayLabel}
              </div>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {items
                .sort((a, b) => a.startsAt - b.startsAt)
                .map((e) => {
                  const style = EVENT_STYLES[e.type] || EVENT_STYLES.session;
                  const Icon = style.icon;
                  const live = isLive(e);
                  const upcoming = isUpcoming(e);

                  return (
                    <div
                      key={e.id}
                      className={`relative border-2 rounded-2xl p-5 transition-all duration-200 hover:shadow-lg hover:scale-[1.02] ${style.bg} ${style.border} ${
                        live ? 'ring-2 ring-offset-2 ring-red-500 animate-pulse' : ''
                      }`}
                    >
                      {live && (
                        <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-1 rounded-full bg-red-600 text-white text-xs font-medium">
                          <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                          LIVE
                        </div>
                      )}

                      <div className="flex items-start gap-3 mb-3">
                        <div className={`w-10 h-10 rounded-xl ${style.badge} flex items-center justify-center flex-shrink-0`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 text-base truncate">
                            {e.title}
                          </h3>
                          <div className="flex items-center gap-1.5 mt-1 text-xs text-gray-600">
                            <Clock className="w-3.5 h-3.5" />
                            <span>
                              {formatTime(e.startsAt)} - {formatTime(e.endsAt)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {e.meta?.description && (
                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                          {e.meta.description}
                        </p>
                      )}

                      {e.type === 'quiz' && (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => enroll(e.meta.sessionId)}
                            className="flex-1 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors shadow-sm"
                          >
                            Enroll Now
                          </button>
                          <a
                            href="/collab/quizzes"
                            className="px-4 py-2 rounded-xl border-2 border-blue-200 hover:bg-blue-50 text-blue-700 text-sm font-medium transition-colors"
                          >
                            Details
                          </a>
                        </div>
                      )}

                      {e.type === 'omega' && (
                        <a
                          href="/collab/omega"
                          className="block w-full px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium text-center transition-colors shadow-sm"
                        >
                          Open Omega Space
                        </a>
                      )}

                      {e.type === 'session' && (
                        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                          <div className="flex items-center gap-2 text-xs text-gray-600">
                            <Users className="w-3.5 h-3.5" />
                            <span>Room: {e.meta.roomId}</span>
                          </div>
                          {upcoming && (
                            <a
                              href={`/collab/sessions/${e.meta.roomId}`}
                              className="px-3 py-1.5 rounded-lg bg-green-600 hover:bg-green-700 text-white text-xs font-medium transition-colors"
                            >
                              Join
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
