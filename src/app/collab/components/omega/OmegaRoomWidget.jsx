'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useOmegaMatch } from '../../store/collabStore.jsx';

export default function OmegaRoomWidget({ user }) {
  const { omega, end, feedback } = useOmegaMatch(user);
  const cur = omega.current;
  const [remaining, setRemaining] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    const t = setInterval(() => {
      if (!cur?.endsAt) return;
      setRemaining(Math.max(0, Math.ceil((cur.endsAt - Date.now())/1000)));
      if (Date.now() >= cur.endsAt) {
        setShowFeedback(true);
      }
    }, 500);
    return () => clearInterval(t);
  }, [cur?.endsAt]);

  if (!cur || cur.status !== 'matched') return null;

  const leave = () => setShowFeedback(true);
  const submitFeedback = () => {
    feedback(cur.roomId, { rating: 5, note: textRef.current?.value || '' });
    end();
    window.location.href = '/collab/omega';
  };

  return (
    <div className="bg-white border rounded-2xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-500">Paired with</div>
          <div className="text-lg font-semibold">{cur.match?.partner?.name}</div>
        </div>
        <div className="text-sm px-2 py-1 rounded bg-gray-100">{remaining}s left</div>
      </div>

      <div className="grid md:grid-cols-3 gap-3">
        <div className="md:col-span-2">
          <div className="aspect-video rounded-xl bg-gray-100 flex items-center justify-center text-gray-500">Voice/Video (simulated)</div>
          <div className="mt-2 flex items-center gap-2">
            <button className="px-3 py-1.5 rounded border text-sm">Mute</button>
            <button className="px-3 py-1.5 rounded border text-sm">Chat</button>
            <button onClick={leave} className="ml-auto px-3 py-1.5 rounded bg-red-600 text-white text-sm">Leave</button>
          </div>
        </div>
        <div className="md:col-span-1">
          <div className="bg-gray-50 border rounded-xl p-3 text-sm">
            <div className="font-medium mb-2">Partner</div>
            <div>Name: {cur.match?.partner?.name}</div>
            <div>Skills: {(cur.match?.partner?.skills||[]).join(', ')}</div>
            <div>Tags: {(cur.match?.partner?.tags||[]).join(', ')}</div>
            <div>Timezone: {cur.match?.partner?.timezone}</div>
          </div>
          <div className="mt-3 text-xs text-gray-600">
            Use the time wisely; when the timer ends, you’ll be prompted for feedback.
          </div>
        </div>
      </div>

      {showFeedback && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-4 w-full max-w-md space-y-3">
            <div className="text-lg font-semibold">Quick Feedback</div>
            <textarea ref={textRef} className="w-full h-24 border rounded p-2 text-sm" placeholder="How was the pairing?" />
            <div className="flex items-center justify-between">
              <button onClick={()=>setShowFeedback(false)} className="px-3 py-2 rounded border text-sm">Cancel</button>
              <button onClick={submitFeedback} className="px-3 py-2 rounded bg-blue-600 text-white text-sm">Submit</button>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Report: This is a stub. Add details in your note if needed.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
