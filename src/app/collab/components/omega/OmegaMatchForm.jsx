'use client';

import React, { useMemo, useState } from 'react';
import { OMEGA_POOL } from '../../_data/omegaPool.js';
import { useOmegaMatch } from '../../store/collabStore.jsx';

const ALL_SKILLS = Array.from(new Set(OMEGA_POOL.flatMap(p => p.skills))).sort();
const ALL_TAGS = Array.from(new Set(OMEGA_POOL.flatMap(p => p.tags))).sort();

export default function OmegaMatchForm({ user }) {
  const { omega, find } = useOmegaMatch(user);
  const [skills, setSkills] = useState([]);
  const [tags, setTags] = useState([]);
  const [duration, setDuration] = useState(5);

  const filtered = useMemo(() => {
    return OMEGA_POOL.filter(p =>
      (skills.length === 0 || skills.some(s => p.skills.includes(s))) &&
      (tags.length === 0 || tags.some(t => p.tags.includes(t)))
    );
  }, [skills, tags]);

  const toggle = (list, setter, val) => setter(list.includes(val) ? list.filter(x=>x!==val) : [...list, val]);

  const start = () => {
    if (filtered.length === 0) return;
    const pick = filtered[Math.floor(Math.random() * filtered.length)];
    find({ partner: pick }, duration);
  };

  return (
    <div className="bg-white border rounded-2xl p-4 space-y-4">
      <div>
        <div className="text-lg font-semibold">Omega — Developer Random Pairing</div>
        <div className="text-sm text-gray-600">Pick skills/interests and find a match.</div>
      </div>

      <div>
        <div className="text-sm font-medium mb-1">Skills</div>
        <div className="flex flex-wrap gap-2">
          {ALL_SKILLS.map(s => (
            <button key={s} onClick={()=>toggle(skills, setSkills, s)} className={`px-2 py-1 rounded border text-sm ${skills.includes(s)?'bg-blue-600 text-white':'bg-white'}`}>{s}</button>
          ))}
        </div>
      </div>
      <div>
        <div className="text-sm font-medium mb-1">Tags</div>
        <div className="flex flex-wrap gap-2">
          {ALL_TAGS.map(t => (
            <button key={t} onClick={()=>toggle(tags, setTags, t)} className={`px-2 py-1 rounded border text-sm ${tags.includes(t)?'bg-blue-600 text-white':'bg-white'}`}>{t}</button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm">Duration</span>
        <input type="number" min="5" max="10" value={duration} onChange={(e)=>setDuration(Number(e.target.value)||5)} className="w-20 border rounded px-2 py-1 text-sm"/> min
      </div>

      <div>
        <button onClick={start} className="px-3 py-2 rounded bg-purple-600 text-white text-sm">Find Match</button>
      </div>

      {omega.current?.status === 'finding' && (
        <div className="text-sm text-gray-700">Finding a great match for you…</div>
      )}
      {omega.current?.status === 'matched' && (
        <div className="text-sm text-green-700">Matched with {omega.current.match?.partner?.name}! <a href="/collab/omega" className="underline">Enter Room</a></div>
      )}
    </div>
  );
}
