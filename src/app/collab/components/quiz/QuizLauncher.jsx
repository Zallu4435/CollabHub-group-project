'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useQuiz } from '../../store/collabStore.jsx';
import { QUIZ_BANK } from '../../_data/quizBank.js';

export default function QuizLauncher({ roomId, user }) {
  const isHost = user?.role === 'host' || user?.role === 'cohost';
  const { bank, loadBank, start } = useQuiz(roomId, user);
  const [selected, setSelected] = useState([]);
  const [perSec, setPerSec] = useState(20);

  useEffect(() => { loadBank(QUIZ_BANK); }, [loadBank]);

  const toggle = (id) => setSelected((arr) => arr.includes(id) ? arr.filter(x=>x!==id) : [...arr, id]);
  const begin = () => {
    if (!isHost) return;
    const questions = (bank || QUIZ_BANK).filter(q => selected.includes(q.id));
    if (questions.length === 0) return;
    start(questions, perSec);
  };

  if (!isHost) return null;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
      <div className="px-4 py-3 border-b text-sm font-semibold">Live Quiz</div>
      <div className="p-3 space-y-3">
        <div className="text-sm text-gray-700">Pick questions</div>
        <div className="grid grid-cols-1 gap-2 max-h-48 overflow-auto">
          {(bank || QUIZ_BANK).map(q => (
            <label key={q.id} className="flex items-start gap-2 text-sm border rounded p-2">
              <input type="checkbox" checked={selected.includes(q.id)} onChange={()=>toggle(q.id)} />
              <span>
                <span className="font-medium">[{q.type.toUpperCase()}]</span> {q.question}
              </span>
            </label>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm">Timer per question</span>
          <input type="number" min="10" value={perSec} onChange={(e)=>setPerSec(Number(e.target.value)||20)} className="w-20 border rounded px-2 py-1 text-sm"/> sec
        </div>
        <button onClick={begin} className="px-3 py-2 rounded bg-blue-600 text-white text-sm">Start Quiz</button>
      </div>
    </div>
  );
}
