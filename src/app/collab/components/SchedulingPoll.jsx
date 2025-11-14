'use client';

import React, { useRef, useState } from 'react';
import { useSchedulingPoll, useCalendar } from '../store/collabStore.jsx';
import {
  CalendarCheck,
  Plus,
  X,
  TrendingUp,
  CheckCircle,
  Crown,
  Trophy
} from 'lucide-react';

function OptionInput({ onAdd }) {
  const ref = useRef(null);
  return (
    <div className="flex items-center gap-2">
      <input
        ref={ref}
        placeholder="Add option (topic or time slot)"
        className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={() => {
          const v = ref.current.value.trim();
          if (!v) return;
          onAdd(v);
          ref.current.value = '';
        }}
        className="px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors flex items-center gap-1"
      >
        <Plus className="w-4 h-4" />
        Add
      </button>
    </div>
  );
}

function RoleBadge({ role = 'participant' }) {
  const config = {
    host: { bg: 'bg-purple-600', label: 'Host' },
    cohost: { bg: 'bg-indigo-600', label: 'Co-host' },
    viewer: { bg: 'bg-gray-500', label: 'Viewer' },
    participant: { bg: 'bg-blue-600', label: 'User' }
  };
  const { bg, label } = config[role] || config.participant;

  return (
    <span className={`px-2 py-0.5 rounded text-white text-[10px] font-semibold ${bg}`}>
      {label}
    </span>
  );
}

export default function SchedulingPoll({ user }) {
  const isHost = user?.role === 'host' || user?.role === 'cohost';
  const { polls, create, vote, close } = useSchedulingPoll(user);
  const { createEvent } = useCalendar();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ranked, setRanked] = useState(false);
  const [options, setOptions] = useState([]);
  const [showCreate, setShowCreate] = useState(false);

  const submitCreate = () => {
    if (!title.trim() || options.length < 2) return;
    create({ title, description, options, ranked });
    setTitle('');
    setDescription('');
    setRanked(false);
    setOptions([]);
    setShowCreate(false);
  };

  const computeWinner = (p) => {
    if (p.ranked) {
      const points = Object.values(p.votes || {}).reduce((acc, arr) => {
        if (!Array.isArray(arr)) return acc;
        const n = arr.length;
        arr.forEach((optId, idx) => {
          acc[optId] = (acc[optId] || 0) + (n - idx);
        });
        return acc;
      }, {});
      const top = Object.entries(points).sort((a, b) => b[1] - a[1])[0];
      if (!top) return null;
      return p.options.find((o) => o.id === top[0]);
    } else {
      const counts = p.options.map((o) => ({ id: o.id, n: (o.votes || []).length }));
      counts.sort((a, b) => b.n - a.n);
      const top = counts[0];
      return p.options.find((o) => o.id === top?.id);
    }
  };

  const closeAndSchedule = (poll) => {
    close(poll.id);
    const winner = computeWinner(poll);
    if (winner) {
      const startsAt = Date.now() + 30 * 60 * 1000;
      const endsAt = startsAt + 60 * 60 * 1000;
      createEvent({
        id: `evt-${Date.now()}`,
        type: 'session',
        title: `${poll.title}: ${winner.label}`,
        startsAt,
        endsAt,
        meta: { sourcePoll: poll.id }
      });
      alert(`Session created: ${poll.title} — ${winner.label}`);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
      {/* Header */}
      <div className="px-5 py-4 border-b bg-gradient-to-r from-teal-50 to-cyan-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center">
              <CalendarCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900">Scheduling Polls</h3>
              <p className="text-xs text-gray-600">Vote on topics and times</p>
            </div>
          </div>
          {isHost && (
            <button
              onClick={() => setShowCreate(!showCreate)}
              className="px-3 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium flex items-center gap-2 transition-colors shadow-md"
            >
              <Plus className="w-4 h-4" />
              Create Poll
            </button>
          )}
        </div>
      </div>

      <div className="p-4 space-y-4 max-h-[600px] overflow-auto">
        {/* Create Poll Form */}
        {isHost && showCreate && (
          <div className="border-2 border-teal-200 rounded-xl p-4 bg-teal-50 space-y-3 animate-fadeIn">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-gray-900">Create New Poll</h4>
              <button
                onClick={() => setShowCreate(false)}
                className="p-1 rounded-lg hover:bg-teal-100 transition-colors"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Poll title (e.g., Next session topic)"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description (optional)"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />

            <div>
              <div className="text-xs font-semibold text-gray-700 mb-2">Options</div>
              <div className="space-y-2 mb-2">
                {options.map((o, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 p-2 bg-white border border-gray-200 rounded-lg"
                  >
                    <span className="flex-1 text-sm text-gray-900">{o}</span>
                    <button
                      onClick={() => setOptions((opts) => opts.filter((_, idx) => idx !== i))}
                      className="p-1 rounded hover:bg-red-50 text-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              <OptionInput onAdd={(v) => setOptions((opts) => [...opts, v])} />
            </div>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={ranked}
                onChange={(e) => setRanked(e.target.checked)}
                className="w-4 h-4 rounded accent-teal-600"
              />
              <span className="text-gray-700">Use ranked-choice voting</span>
            </label>

            <button
              onClick={submitCreate}
              disabled={!title.trim() || options.length < 2}
              className="w-full px-4 py-2.5 rounded-lg bg-teal-600 hover:bg-teal-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors shadow-md"
            >
              Create Poll
            </button>
          </div>
        )}

        {/* Poll List */}
        <div className="space-y-4">
          {polls.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                <CalendarCheck className="w-6 h-6 text-gray-400" />
              </div>
              <p className="text-sm text-gray-500">No scheduling polls yet.</p>
            </div>
          )}
          {polls.map((p) => {
            const winner = computeWinner(p);
            return (
              <div
                key={p.id}
                className="border-2 border-gray-200 rounded-xl p-4 bg-white hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-base font-bold text-gray-900 mb-1">{p.title}</h4>
                    {p.description && (
                      <p className="text-xs text-gray-600 mb-2">{p.description}</p>
                    )}
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-lg ${
                          p.ranked
                            ? 'bg-purple-100 text-purple-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {p.ranked ? 'Ranked Choice' : 'Single Vote'}
                      </span>
                      {p.status === 'closed' && (
                        <span className="px-2 py-1 text-xs font-semibold rounded-lg bg-gray-100 text-gray-700">
                          Closed
                        </span>
                      )}
                    </div>
                  </div>
                  {winner && (
                    <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-amber-100 border border-amber-200">
                      <Trophy className="w-4 h-4 text-amber-600" />
                      <span className="text-xs font-semibold text-amber-900">Winner</span>
                    </div>
                  )}
                </div>

                {/* Voting UI */}
                {!p.ranked ? (
                  <div className="space-y-2 mb-3">
                    {p.options
                      .map((o) => ({
                        ...o,
                        voteCount: o.votes?.length || 0
                      }))
                      .sort((a, b) => b.voteCount - a.voteCount)
                      .map((o, idx) => {
                        const totalVotes = p.options.reduce(
                          (sum, opt) => sum + (opt.votes?.length || 0),
                          0
                        );
                        const percentage = totalVotes > 0 ? (o.voteCount / totalVotes) * 100 : 0;
                        const isWinner = winner?.id === o.id;

                        return (
                          <button
                            key={o.id}
                            onClick={() => p.status !== 'closed' && vote(p.id, o.id)}
                            disabled={p.status === 'closed'}
                            className={`w-full text-left p-3 rounded-xl border-2 transition-all ${
                              isWinner
                                ? 'border-amber-400 bg-amber-50'
                                : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                            } ${p.status === 'closed' ? 'cursor-not-allowed opacity-60' : ''}`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                {idx === 0 && !isWinner && (
                                  <TrendingUp className="w-4 h-4 text-green-600" />
                                )}
                                {isWinner && <Crown className="w-4 h-4 text-amber-600" />}
                                <span className="font-semibold text-gray-900">{o.label}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <RoleBadge role={user?.role} />
                                <span className="text-sm font-bold text-gray-700">
                                  {o.voteCount} votes
                                </span>
                              </div>
                            </div>
                            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {percentage.toFixed(1)}%
                            </div>
                          </button>
                        );
                      })}
                  </div>
                ) : (
                  <div className="mb-3">
                    <div className="text-xs text-gray-600 mb-2 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      Click options in order of preference (1st, 2nd, 3rd...)
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {p.options.map((o, idx) => {
                        const mine = p.votes?.[user?.id || 'me'] || [];
                        const selected = mine.includes(o.id);
                        const rank = mine.indexOf(o.id) + 1;
                        const isWinner = winner?.id === o.id;

                        return (
                          <button
                            key={o.id}
                            onClick={() => {
                              if (p.status === 'closed') return;
                              const next = selected
                                ? mine.filter((id) => id !== o.id)
                                : [...mine, o.id];
                              vote(p.id, next);
                            }}
                            disabled={p.status === 'closed'}
                            className={`relative px-4 py-2 rounded-lg border-2 font-medium text-sm transition-all ${
                              isWinner
                                ? 'border-amber-400 bg-amber-100 text-amber-900'
                                : selected
                                ? 'border-blue-600 bg-blue-600 text-white'
                                : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300'
                            } ${p.status === 'closed' ? 'cursor-not-allowed opacity-60' : ''}`}
                          >
                            {selected && (
                              <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">
                                {rank}
                              </span>
                            )}
                            {isWinner && <Crown className="w-3 h-3 inline mr-1 text-amber-600" />}
                            {o.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Actions */}
                {isHost && p.status !== 'closed' && (
                  <button
                    onClick={() => closeAndSchedule(p)}
                    className="w-full px-4 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white text-sm font-semibold transition-colors shadow-md flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Close Poll & Create Session
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
