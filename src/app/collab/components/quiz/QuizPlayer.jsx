'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useQuiz } from '../../store/collabStore.jsx';

export default function QuizPlayer({ roomId, user }) {
  const { session, answers, scores, leaderboard, answer, score, next } = useQuiz(roomId, user);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [remaining, setRemaining] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!session) return;
    setSelected(null); setFeedback(null);
    const tick = () => setRemaining(Math.max(0, Math.ceil((session.endsAt - Date.now())/1000)));
    tick();
    clearInterval(timerRef.current);
    timerRef.current = setInterval(tick, 250);
    return () => clearInterval(timerRef.current);
  }, [session?.idx, session?.endsAt]);

  if (!session) return null;

  const q = session.questions[session.idx];
  const isOver = session.idx >= session.questions.length;
  if (isOver) {
    return (
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        <div className="px-4 py-3 border-b text-sm font-semibold">Quiz Results</div>
        <div className="p-4">
          <ol className="text-sm space-y-1">
            {leaderboard.map((l, i) => (
              <li key={l.userId} className={`flex items-center justify-between ${i===0?'font-semibold':''}`}>
                <span>#{i+1} {l.userId}</span>
                <span>Score: {l.score} • Streak: {l.streak}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }

  const submit = () => {
    if (selected == null) return;
    answer(q.id, selected);
    const correct = q.type === 'code' ? (String(selected).toLowerCase().includes((q.keyword||'').toLowerCase())) : (selected === q.answer);
    score(user?.id || 'me', correct);
    setFeedback(correct ? 'Correct!' : `Wrong. Answer: ${q.answer}`);
  };

  const nextQ = () => { setSelected(null); setFeedback(null); next(); };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
      <div className="px-4 py-3 border-b text-sm font-semibold flex items-center justify-between">
        <span>Question {session.idx + 1} / {session.questions.length}</span>
        <span className="text-xs text-gray-600">{remaining}s</span>
      </div>
      <div className="p-4 space-y-4">
        <div className="text-sm font-medium">{q.question}</div>
        {q.type !== 'code' ? (
          <div className="grid grid-cols-1 gap-2">
            {q.options.map(opt => (
              <label key={opt} className={`border rounded p-2 text-sm cursor-pointer ${selected===opt?'bg-blue-50 border-blue-400':'bg-white'}`}>
                <input type="radio" name="opt" className="mr-2" checked={selected===opt} onChange={()=>setSelected(opt)} />
                {opt}
              </label>
            ))}
          </div>
        ) : (
          <textarea value={selected||''} onChange={(e)=>setSelected(e.target.value)} className="w-full h-24 border rounded p-2 text-sm" placeholder="Type your answer..." />
        )}

        {feedback && (
          <div className={`px-3 py-2 rounded text-sm ${feedback.startsWith('Correct')?'bg-green-50 text-green-800 border border-green-200':'bg-red-50 text-red-800 border border-red-200'}`}>
            {feedback}
          </div>
        )}

        <div className="flex items-center gap-2">
          <button onClick={submit} className="px-3 py-2 rounded bg-blue-600 text-white text-sm">Submit</button>
          <button onClick={nextQ} className="px-3 py-2 rounded border text-sm">Next</button>
        </div>
      </div>
    </div>
  );
}
