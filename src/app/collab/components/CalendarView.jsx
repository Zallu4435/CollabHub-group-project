'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useCalendar, useQuizQueue } from '../store/collabStore.jsx';
import { CAL_EVENTS } from '../_data/calendarEvents.js';

const COLORS = { quiz: 'bg-blue-50 border-blue-200', omega: 'bg-purple-50 border-purple-200', session: 'bg-green-50 border-green-200' };

export default function CalendarView({ user }) {
  const { events, loadEvents } = useCalendar();
  const { enroll } = useQuizQueue(user);
  const [now, setNow] = useState(Date.now());
  useEffect(()=>{ loadEvents(CAL_EVENTS); }, [loadEvents]);
  useEffect(()=>{ const t = setInterval(()=>setNow(Date.now()), 1000); return ()=>clearInterval(t); }, []);

  const grouped = useMemo(() => {
    const byDay = {};
    for (const e of events) {
      const d = new Date(e.startsAt).toDateString();
      byDay[d] = byDay[d] || [];
      byDay[d].push(e);
    }
    return Object.entries(byDay).sort((a,b)=> new Date(a[0]).getTime() - new Date(b[0]).getTime());
  }, [events]);

  const fmt = (ts) => new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="space-y-6">
      {grouped.map(([day, items]) => (
        <div key={day} className="space-y-2">
          <div className="text-sm font-semibold text-gray-900">{day}</div>
          <div className="grid md:grid-cols-2 gap-2">
            {items.sort((a,b)=>a.startsAt-b.startsAt).map(e => (
              <div key={e.id} className={`border rounded-lg p-3 ${COLORS[e.type] || 'bg-gray-50 border-gray-200'}`}>
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-gray-900">{e.title}</div>
                  <div className="text-xs text-gray-600">{fmt(e.startsAt)} - {fmt(e.endsAt)}</div>
                </div>
                {e.type === 'quiz' && (
                  <div className="mt-2">
                    <button onClick={()=> enroll(e.meta.sessionId)} className="px-3 py-1.5 rounded bg-blue-600 text-white text-xs">Enroll</button>
                    <a href="/collab/quizzes" className="ml-2 text-xs underline">Details</a>
                  </div>
                )}
                {e.type === 'omega' && (
                  <div className="mt-2">
                    <a href="/collab/omega" className="px-3 py-1.5 rounded bg-purple-600 text-white text-xs">Open Omega</a>
                  </div>
                )}
                {e.type === 'session' && (
                  <div className="mt-2 text-xs text-gray-600">Room: {e.meta.roomId}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
