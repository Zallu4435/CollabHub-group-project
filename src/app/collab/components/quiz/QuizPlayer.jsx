'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useQuiz } from '../../store/collabStore.jsx';
import {
  CheckCircle,
  XCircle,
  Clock,
  Send,
  Trophy,
  Zap,
  Brain,
  ArrowRight,
  PartyPopper
} from 'lucide-react';

export default function QuizPlayer({ roomId, user }) {
  const { session, answer, score, next, leaderboard } = useQuiz(roomId, user);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [remaining, setRemaining] = useState(0);
  const [answered, setAnswered] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!session) return;
    setSelected(null);
    setFeedback(null);
    setAnswered(false);

    const tick = () =>
      setRemaining(Math.max(0, Math.ceil((session.endsAt - Date.now()) / 1000)));
    tick();
    clearInterval(timerRef.current);
    timerRef.current = setInterval(tick, 250);
    return () => clearInterval(timerRef.current);
  }, [session?.idx, session?.endsAt]);

  if (!session) return null;

  const q = session.questions[session.idx];
  const isOver = session.idx >= session.questions.length;

  if (isOver) {
    const myScore =
      leaderboard.find((l) => l.userId === (user?.id || 'me'))?.score || 0;
    const myRank =
      leaderboard.findIndex((l) => l.userId === (user?.id || 'me')) + 1;

    return (
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg animate-fadeIn">
        <div className="px-6 py-5 bg-gradient-to-r from-yellow-50 via-amber-50 to-orange-50 border-b">
          <div className="flex items-center justify-center gap-3">
            <PartyPopper className="w-8 h-8 text-amber-600" />
            <h2 className="text-2xl font-bold text-gray-900">Quiz Complete!</h2>
            <PartyPopper className="w-8 h-8 text-amber-600" />
          </div>
        </div>

        <div className="p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 mb-4">
              <Trophy className="w-10 h-10 text-white" />
            </div>
            <div className="text-5xl font-bold text-gray-900 mb-2">{myScore}</div>
            <div className="text-sm text-gray-600 mb-4">Your Final Score</div>
            {myRank > 0 && (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-900 font-semibold">
                Rank #{myRank} of {leaderboard.length}
              </div>
            )}
          </div>

          <div className="border-t border-gray-200 pt-6">
            <div className="text-sm font-semibold text-gray-900 mb-3 text-center">
              Final Standings
            </div>
            <div className="space-y-2 max-h-64 overflow-auto">
              {leaderboard.slice(0, 5).map((l, i) => (
                <div
                  key={l.userId}
                  className={`flex items-center justify-between p-3 rounded-xl ${
                    i === 0
                      ? 'bg-yellow-50 border-2 border-yellow-300'
                      : 'bg-gray-50 border border-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
                        i === 0
                          ? 'bg-yellow-500 text-white'
                          : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      #{i + 1}
                    </div>
                    <span className="text-sm font-semibold text-gray-900">
                      {l.userId}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="font-bold text-gray-900">{l.score}</span>
                    <span className="text-gray-500">{l.streak}x</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const submit = () => {
    if (selected == null || answered) return;
    setAnswered(true);
    answer(q.id, selected);

    const correct =
      q.type === 'code'
        ? String(selected).toLowerCase().includes((q.keyword || '').toLowerCase())
        : selected === q.answer;

    score(user?.id || 'me', correct);
    setFeedback(
      correct
        ? { type: 'correct', message: 'Correct! Well done! 🎉' }
        : { type: 'wrong', message: `Wrong. Answer: ${q.answer}` }
    );
  };

  const nextQ = () => {
    next();
  };

  const progress = ((session.idx + 1) / session.questions.length) * 100;
  const isLowTime = remaining < 5;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg">
      {/* Header with Progress */}
      <div className="px-6 py-4 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-b">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-sm font-bold text-gray-900">
                Question {session.idx + 1} of {session.questions.length}
              </div>
              <div className="text-xs text-gray-600">
                {q.type.toUpperCase()} Question
              </div>
            </div>
          </div>

          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
              isLowTime
                ? 'bg-red-100 border-2 border-red-300 animate-pulse'
                : 'bg-white border-2 border-blue-200'
            }`}
          >
            <Clock
              className={`w-5 h-5 ${isLowTime ? 'text-red-600' : 'text-blue-600'}`}
            />
            <span
              className={`text-lg font-bold ${
                isLowTime ? 'text-red-900' : 'text-blue-900'
              }`}
            >
              {remaining}s
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="p-6 space-y-5">
        {/* Question */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-xl p-5">
          <div className="text-lg font-semibold text-gray-900 leading-relaxed">
            {q.question}
          </div>
        </div>

        {/* Answer Options */}
        {q.type !== 'code' ? (
          <div className="space-y-3">
            {q.options.map((opt, idx) => {
              const isSelected = selected === opt;
              const showCorrect = answered && opt === q.answer;
              const showWrong = answered && isSelected && opt !== q.answer;

              return (
                <button
                  key={opt}
                  onClick={() => !answered && setSelected(opt)}
                  disabled={answered}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                    showCorrect
                      ? 'bg-green-50 border-green-500 ring-2 ring-green-200'
                      : showWrong
                      ? 'bg-red-50 border-red-500 ring-2 ring-red-200'
                      : isSelected
                      ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-200'
                      : 'bg-white border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                  } ${answered ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0 ${
                        showCorrect
                          ? 'bg-green-500 text-white'
                          : showWrong
                          ? 'bg-red-500 text-white'
                          : isSelected
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <span className="flex-1 text-sm font-medium text-gray-900">{opt}</span>
                    {showCorrect && <CheckCircle className="w-5 h-5 text-green-600" />}
                    {showWrong && <XCircle className="w-5 h-5 text-red-600" />}
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Your Answer
            </label>
            <textarea
              value={selected || ''}
              onChange={(e) => !answered && setSelected(e.target.value)}
              disabled={answered}
              className="w-full h-32 border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none disabled:bg-gray-50 disabled:cursor-not-allowed"
              placeholder="Type your code answer here..."
            />
          </div>
        )}

        {/* Feedback */}
        {feedback && (
          <div
            className={`px-5 py-4 rounded-xl border-2 animate-fadeIn ${
              feedback.type === 'correct'
                ? 'bg-green-50 border-green-300'
                : 'bg-red-50 border-red-300'
            }`}
          >
            <div className="flex items-start gap-3">
              {feedback.type === 'correct' ? (
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <div
                  className={`font-bold text-base mb-1 ${
                    feedback.type === 'correct' ? 'text-green-900' : 'text-red-900'
                  }`}
                >
                  {feedback.type === 'correct' ? 'Correct!' : 'Incorrect'}
                </div>
                <div
                  className={`text-sm ${
                    feedback.type === 'correct' ? 'text-green-800' : 'text-red-800'
                  }`}
                >
                  {feedback.message}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {!answered ? (
            <button
              onClick={submit}
              disabled={selected == null}
              className="flex-1 px-6 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white font-bold text-base transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              Submit Answer
            </button>
          ) : (
            <button
              onClick={nextQ}
              className="flex-1 px-6 py-4 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold text-base transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              Next Question
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
