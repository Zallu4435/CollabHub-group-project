'use client';

import React, { useRef, useState } from 'react';
import { useQnA } from '../store/collabStore.jsx';

export default function QnA({ roomId, user }) {
  const isHost = user?.role === 'host' || user?.role === 'cohost';
  const { publicQueue, reviewQueue, submit, publish, reject } = useQnA(roomId, user, isHost);
  const inputRef = useRef(null);
  const [activeTab, setActiveTab] = useState('public'); // public | review

  const add = () => {
    const text = inputRef.current.value.trim();
    if (!text) return;
    submit(text);
    inputRef.current.value = '';
    setActiveTab(isHost ? 'review' : 'public');
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
      <div className="px-4 py-2 border-b flex items-center gap-2 text-sm">
        <button onClick={() => setActiveTab('public')} className={`px-3 py-1 rounded ${activeTab==='public'?'bg-blue-600 text-white':'bg-gray-100'}`}>Public</button>
        <button onClick={() => setActiveTab('review')} className={`px-3 py-1 rounded ${activeTab==='review'?'bg-blue-600 text-white':'bg-gray-100'}`}>Review</button>
      </div>
      <div className="p-3 space-y-3">
        {activeTab === 'public' && (
          <div className="space-y-2">
            {publicQueue.length === 0 && <div className="text-sm text-gray-500">No approved questions yet.</div>}
            {publicQueue.map(q => (
              <div key={q.id} className="border border-gray-200 rounded p-2">
                <div className="text-xs text-gray-500">{q.authorName} • {new Date(q.ts).toLocaleTimeString()}</div>
                <div className="text-sm text-gray-900">{q.text}</div>
              </div>
            ))}
          </div>
        )}
        {activeTab === 'review' && (
          <div className="space-y-2">
            {reviewQueue.length === 0 && <div className="text-sm text-gray-500">No questions in review.</div>}
            {reviewQueue.map(q => (
              <div key={q.id} className="border border-gray-200 rounded p-2 flex items-start justify-between">
                <div>
                  <div className="text-xs text-gray-500">{q.authorName} • {new Date(q.ts).toLocaleTimeString()}</div>
                  <div className="text-sm text-gray-900">{q.text}</div>
                </div>
                {isHost && (
                  <div className="flex items-center gap-2">
                    <button onClick={() => publish(q.id)} className="text-xs px-2 py-1 rounded bg-green-600 text-white">Publish</button>
                    <button onClick={() => reject(q.id)} className="text-xs px-2 py-1 rounded border">Reject</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="p-2 border-t flex items-center gap-2">
        <input ref={inputRef} placeholder="Ask a question..." className="flex-1 border rounded px-3 py-2"/>
        <button onClick={add} className="px-3 py-2 rounded bg-blue-600 text-white">Submit</button>
      </div>
    </div>
  );
}
