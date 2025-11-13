'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useQuizQueue } from '../store/collabStore.jsx';

export default function QuizSessionCard({ session, user }) {
  const { enroll, withdraw, promote, setStatus, delay } = useQuizQueue(user);
  const [now, setNow] = useState(Date.now());
  useEffect(() => { const t = setInterval(()=>setNow(Date.now()), 1000); return ()=>clearInterval(t); }, []);

  const openIn = Math.max(0, session.enrollmentOpenAt - now);
  const closeIn = Math.max(0, session.enrollmentCloseAt - now);
  const startsIn = Math.max(0, session.startAt - now);
  const enrolled = (session.enrolledIds||[]).includes(user?.id || 'me');
  const waitlisted = (session.waitlistIds||[]).includes(user?.id || 'me');
  const full = (session.enrolledIds?.length || 0) >= (session.capacity || 0);

  const fmt = (ms) => {
    const s = Math.ceil(ms/1000); const m = Math.floor(s/60); const r = s%60; return `${m}m ${r}s`;
  };

  return (
    <div className="border rounded-2xl p-4 bg-white flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-500">Capacity {session.enrolledIds?.length||0}/{session.capacity}</div>
          <div className="text-lg font-semibold text-gray-900">{session.title}</div>
        </div>
        <span className="text-xs px-2 py-1 rounded border bg-gray-50">{session.status}</span>
      </div>
      <div className="text-xs text-gray-600">Opens in: {fmt(openIn)} • Closes in: {fmt(closeIn)} • Starts in: {fmt(startsIn)}</div>

      <div className="flex items-center gap-2 mt-2">
        {openIn === 0 && closeIn > 0 && !enrolled && !waitlisted && (
          <button onClick={()=>enroll(session.id)} className="px-3 py-2 rounded bg-blue-600 text-white text-sm">Enroll</button>
        )}
        {enrolled && <span className="px-2 py-1 rounded bg-green-50 text-green-700 text-xs">Enrolled</span>}
        {waitlisted && <span className="px-2 py-1 rounded bg-amber-50 text-amber-700 text-xs">Waitlisted</span>}
        {enrolled && startsIn > 0 && (
          <a href="/collab" className="px-3 py-2 rounded border text-sm">Get Ready</a>
        )}
        {enrolled && startsIn === 0 && <a href="/collab" className="px-3 py-2 rounded bg-purple-600 text-white text-sm">Join Now</a>}
      </div>

      {(user?.role === 'host' || user?.role === 'cohost') && (
        <div className="mt-2 flex items-center gap-2 text-xs">
          <button onClick={()=>setStatus(session.id, session.status==='paused'?'scheduled':'paused')} className="px-2 py-1 rounded border">{session.status==='paused'?'Resume':'Pause'}</button>
          <button onClick={()=>delay(session.id, 5)} className="px-2 py-1 rounded border">Delay 5m</button>
          <button onClick={()=>setStatus(session.id, 'ended')} className="px-2 py-1 rounded border">Stop</button>
        </div>
      )}
    </div>
  );
}
