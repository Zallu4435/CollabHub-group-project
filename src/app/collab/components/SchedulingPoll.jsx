'use client';

import React, { useMemo, useRef, useState } from 'react';
import { useSchedulingPoll, useCalendar } from '../store/collabStore.jsx';

function OptionInput({ onAdd }) {
  const ref = useRef(null);
  return (
    <div className="flex items-center gap-2">
      <input ref={ref} placeholder="Add option (topic or time)" className="flex-1 border rounded px-2 py-1 text-sm"/>
      <button onClick={()=>{ const v = ref.current.value.trim(); if(!v) return; onAdd(v); ref.current.value=''; }} className="px-2 py-1 rounded border text-sm">Add</button>
    </div>
  );
}

function AntiBrigadeBadge({ role='participant' }) {
  const style = role==='host' || role==='cohost' ? 'bg-purple-600' : role==='viewer' ? 'bg-gray-500' : 'bg-blue-600';
  const label = role==='host' ? 'Host' : role==='cohost' ? 'Co' : role==='viewer' ? 'View' : 'User';
  return <span className={`px-1.5 py-0.5 rounded text-white text-[10px] ${style}`}>{label}</span>;
}

export default function SchedulingPoll({ user }) {
  const isHost = user?.role === 'host' || user?.role === 'cohost';
  const { polls, create, vote, close } = useSchedulingPoll(user);
  const { createEvent } = useCalendar();
  const [title, setTitle] = useState('Next Collaboration Topic');
  const [description, setDescription] = useState('Vote on what to schedule next');
  const [ranked, setRanked] = useState(false);
  const [options, setOptions] = useState(['Pair programming', 'Code review', 'UI polish']);

  const submitCreate = () => {
    if (!title.trim() || options.length<2) return;
    create({ title, description, options, ranked });
    setTitle(''); setDescription(''); setRanked(false); setOptions([]);
  };

  const computeWinner = (p) => {
    if (p.ranked) {
      // Borda-like: rank 1 = highest points
      const points = Object.values(p.votes||{}).reduce((acc, arr) => {
        if (!Array.isArray(arr)) return acc;
        const n = arr.length;
        arr.forEach((optId, idx) => {
          acc[optId] = (acc[optId]||0) + (n-idx);
        });
        return acc;
      }, {});
      const top = Object.entries(points).sort((a,b)=>b[1]-a[1])[0];
      if (!top) return null;
      return p.options.find(o => o.id === top[0]);
    } else {
      // single choice: count
      const counts = p.options.map(o => ({ id:o.id, n:(o.votes||[]).length }));
      counts.sort((a,b)=>b.n-a.n);
      const top = counts[0];
      return p.options.find(o => o.id === (top?.id));
    }
  };

  const closeAndSchedule = (poll) => {
    close(poll.id);
    const winner = computeWinner(poll);
    if (winner) {
      const startsAt = Date.now() + 30*60*1000; // +30m for demo
      const endsAt = startsAt + 60*60*1000; // +1h length
      createEvent({ id: `evt-${Date.now()}`, type: 'session', title: `${poll.title}: ${winner.label}`, startsAt, endsAt, meta: { sourcePoll: poll.id } });
      alert(`Session created: ${poll.title} — ${winner.label}`);
    }
  };

  return (
    <div className="bg-white border rounded-2xl p-4 space-y-4">
      <div>
        <div className="text-lg font-semibold">Scheduling Polls</div>
        <div className="text-sm text-gray-600">Create a poll for topics/times; votes are visual-only (no auth).</div>
      </div>

      {/* Create */}
      {isHost && (
        <div className="border rounded-xl p-3 space-y-2">
          <div className="text-sm font-medium">Create Poll</div>
          <input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Title" className="w-full border rounded px-2 py-1 text-sm"/>
          <input value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Description" className="w-full border rounded px-2 py-1 text-sm"/>
          <div className="space-y-2">
            {options.map((o,i)=>(
              <div key={i} className="flex items-center gap-2 text-sm">
                <span className="px-2 py-1 rounded border">{o}</span>
                <button onClick={()=>setOptions(opts=>opts.filter((_,idx)=>idx!==i))} className="text-xs underline">Remove</button>
              </div>
            ))}
            <OptionInput onAdd={(v)=>setOptions(opts=>[...opts,v])}/>
          </div>
          <label className="text-sm flex items-center gap-2">
            <input type="checkbox" checked={ranked} onChange={(e)=>setRanked(e.target.checked)}/>
            Use ranked-choice voting
          </label>
          <button onClick={submitCreate} className="px-3 py-2 rounded bg-blue-600 text-white text-sm">Create Poll</button>
        </div>
      )}

      {/* List polls */}
      <div className="space-y-3">
        {polls.length === 0 && <div className="text-sm text-gray-500">No polls yet.</div>}
        {polls.map(p => (
          <div key={p.id} className="border rounded-xl p-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold">{p.title}</div>
                <div className="text-xs text-gray-600">{p.description}</div>
              </div>
              <span className="text-xs px-2 py-1 rounded border bg-gray-50">{p.ranked ? 'Ranked' : 'Single'}</span>
            </div>

            {/* Vote UI */}
            {!p.ranked ? (
              <div className="grid grid-cols-1 gap-2 mt-2">
                {p.options.map(o => (
                  <button key={o.id} onClick={()=>vote(p.id, o.id)} className="text-left border rounded p-2 text-sm flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AntiBrigadeBadge role={user?.role}/>
                      <span>{o.label}</span>
                    </div>
                    <span className="text-xs text-gray-600">{o.votes?.length || 0} votes</span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="mt-2 text-sm">
                <div className="text-xs text-gray-600 mb-1">Click options in preference order (1, 2, 3...)</div>
                <div className="flex flex-wrap gap-2">
                  {p.options.map(o => (
                    <button key={o.id} onClick={()=>{
                      // build ranked list by clicking
                      const mine = p.votes?.[user?.id || 'me'] || [];
                      const next = mine.includes(o.id) ? mine.filter(id=>id!==o.id) : [...mine, o.id];
                      vote(p.id, next);
                    }} className={`px-2 py-1 rounded border ${ (p.votes?.[user?.id||'me']||[]).includes(o.id) ? 'bg-blue-600 text-white' : 'bg-white' }`}>
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="mt-3 flex items-center gap-2">
              {(p.status !== 'closed' && isHost) && (
                <button onClick={()=>closeAndSchedule(p)} className="px-2 py-1 rounded bg-green-600 text-white text-xs">Close & Create Session</button>
              )}
              {p.status === 'closed' && (
                <span className="text-xs px-2 py-1 rounded border bg-gray-50">Closed</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
