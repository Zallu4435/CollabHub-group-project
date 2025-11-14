'use client';

import React, { useEffect, useState } from 'react';
import { useQuiz } from '../../store/collabStore.jsx';
import { QUIZ_BANK } from '../../_data/quizBank.js';
import {
  Brain,
  Play,
  Clock,
  CheckSquare,
  Filter,
  Settings,
  AlertCircle,
  Layers
} from 'lucide-react';

export default function QuizLauncher({ roomId, user }) {
  const isHost = user?.role === 'host' || user?.role === 'cohost';
  const { bank, loadBank, start } = useQuiz(roomId, user);
  const [selected, setSelected] = useState([]);
  const [perSec, setPerSec] = useState(20);
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    loadBank(QUIZ_BANK);
  }, [loadBank]);

  const toggle = (id) =>
    setSelected((arr) => (arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id]));

  const begin = () => {
    if (!isHost) return;
    const questions = (bank || QUIZ_BANK).filter((q) => selected.includes(q.id));
    if (questions.length === 0) return;
    start(questions, perSec);
  };

  if (!isHost) return null;

  const filteredBank =
    filterType === 'all'
      ? bank || QUIZ_BANK
      : (bank || QUIZ_BANK).filter((q) => q.type === filterType);

  const questionTypes = [...new Set((bank || QUIZ_BANK).map((q) => q.type))];

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
      {/* Header */}
      <div className="px-5 py-4 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-b">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900">Quiz Launcher</h3>
            <p className="text-xs text-gray-600">Host-only control panel</p>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-4">
        {/* Question Type Filter */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
            <Filter className="w-4 h-4 text-indigo-600" />
            Filter by Type
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                filterType === 'all'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
              }`}
            >
              All ({(bank || QUIZ_BANK).length})
            </button>
            {questionTypes.map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-3 py-2 rounded-lg text-xs font-semibold capitalize transition-all ${
                  filterType === type
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                }`}
              >
                {type} ({(bank || QUIZ_BANK).filter((q) => q.type === type).length})
              </button>
            ))}
          </div>
        </div>

        {/* Question Selection */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-blue-600" />
              Select Questions
            </label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelected(filteredBank.map((q) => q.id))}
                className="text-xs text-blue-600 hover:underline"
              >
                Select All
              </button>
              <span className="text-gray-300">|</span>
              <button
                onClick={() => setSelected([])}
                className="text-xs text-blue-600 hover:underline"
              >
                Clear
              </button>
            </div>
          </div>

          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <div className="max-h-64 overflow-auto divide-y divide-gray-100">
              {filteredBank.length === 0 && (
                <div className="p-4 text-sm text-gray-500 text-center">
                  No questions match this filter
                </div>
              )}
              {filteredBank.map((q) => {
                const isSelected = selected.includes(q.id);
                return (
                  <label
                    key={q.id}
                    className={`flex items-start gap-3 p-3 cursor-pointer transition-colors ${
                      isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggle(q.id)}
                      className="mt-1 w-4 h-4 rounded accent-blue-600"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            q.type === 'mcq'
                              ? 'bg-green-100 text-green-700'
                              : q.type === 'tf'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-purple-100 text-purple-700'
                          }`}
                        >
                          {q.type}
                        </span>
                      </div>
                      <div className="text-sm text-gray-900 leading-snug">{q.question}</div>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="mt-2 text-xs text-gray-600 flex items-center justify-between">
            <span>{selected.length} questions selected</span>
            {selected.length > 0 && (
              <span className="text-blue-600 font-semibold">
                ~{selected.length * perSec}s total time
              </span>
            )}
          </div>
        </div>

        {/* Timer Settings */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
          <label className="block text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Clock className="w-4 h-4 text-orange-600" />
            Time Per Question
          </label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min="10"
              max="60"
              value={perSec}
              onChange={(e) => setPerSec(Number(e.target.value))}
              className="flex-1 h-2 bg-orange-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
            />
            <div className="w-20 px-3 py-2 rounded-lg border border-gray-200 bg-white text-center text-sm font-bold text-gray-900">
              {perSec}s
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-600">
            Recommended: 15-30 seconds for multiple choice
          </div>
        </div>

        {/* Start Button */}
        <button
          onClick={begin}
          disabled={selected.length === 0}
          className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white font-bold text-base transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
        >
          {selected.length === 0 ? (
            <>
              <AlertCircle className="w-5 h-5" />
              Select questions to start
            </>
          ) : (
            <>
              <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Start Quiz ({selected.length} questions)
            </>
          )}
        </button>
      </div>
    </div>
  );
}
