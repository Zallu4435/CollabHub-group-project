'use client';

import React, { useMemo, useState } from 'react';
import { OMEGA_POOL } from '../../_data/omegaPool.js';
import { useOmegaMatch } from '../../store/collabStore.jsx';
import {
  Sparkles,
  Code,
  Tag,
  Clock,
  Users,
  Zap,
  Search,
  Filter,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

const ALL_SKILLS = Array.from(new Set(OMEGA_POOL.flatMap((p) => p.skills))).sort();
const ALL_TAGS = Array.from(new Set(OMEGA_POOL.flatMap((p) => p.tags))).sort();

export default function OmegaMatchForm({ user }) {
  const { omega, find } = useOmegaMatch(user);
  const [skills, setSkills] = useState([]);
  const [tags, setTags] = useState([]);
  const [duration, setDuration] = useState(5);
  const [searching, setSearching] = useState(false);

  const filtered = useMemo(() => {
    return OMEGA_POOL.filter(
      (p) =>
        (skills.length === 0 || skills.some((s) => p.skills.includes(s))) &&
        (tags.length === 0 || tags.some((t) => p.tags.includes(t)))
    );
  }, [skills, tags]);

  const toggle = (list, setter, val) =>
    setter(list.includes(val) ? list.filter((x) => x !== val) : [...list, val]);

  const start = () => {
    if (filtered.length === 0) return;
    setSearching(true);
    setTimeout(() => {
      const pick = filtered[Math.floor(Math.random() * filtered.length)];
      find({ partner: pick }, duration);
      setSearching(false);
    }, 2000); // Simulate matching delay
  };

  const hasMatch = omega.current?.status === 'matched';
  const isFinding = omega.current?.status === 'finding' || searching;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
      {/* Header */}
      <div className="px-6 py-5 bg-gradient-to-r from-purple-50 via-fuchsia-50 to-pink-50 border-b">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-fuchsia-600 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold text-gray-900 mb-1">Omega Pairing</h2>
            <p className="text-sm text-gray-600">
              Random developer matching based on skills and interests
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-purple-200">
            <Users className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-semibold text-gray-900">{OMEGA_POOL.length} online</span>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Match Status */}
        {hasMatch && (
          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 animate-fadeIn">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-green-900 mb-1">Match Found! 🎉</div>
                <div className="text-sm text-green-800 mb-3">
                  You've been paired with{' '}
                  <span className="font-semibold">{omega.current.match?.partner?.name}</span>
                </div>
                <a
                  href="/collab/omega/room"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm font-semibold transition-colors shadow-md"
                >
                  Enter Omega Room
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Finding Status */}
        {isFinding && (
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 animate-fadeIn">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center animate-pulse">
                <Search className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-blue-900 mb-1">
                  Finding your match...
                </div>
                <div className="text-xs text-blue-700">
                  Searching through {filtered.length} potential{' '}
                  {filtered.length === 1 ? 'partner' : 'partners'}
                </div>
              </div>
            </div>
            <div className="mt-3 h-2 bg-blue-200 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 animate-[loading_1.5s_ease-in-out_infinite]" />
            </div>
          </div>
        )}

        {/* Skills Selection */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <Code className="w-4 h-4 text-purple-600" />
              Select Skills
            </label>
            {skills.length > 0 && (
              <button
                onClick={() => setSkills([])}
                className="text-xs text-purple-600 hover:underline"
              >
                Clear all
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {ALL_SKILLS.map((s) => {
              const selected = skills.includes(s);
              return (
                <button
                  key={s}
                  onClick={() => toggle(skills, setSkills, s)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    selected
                      ? 'bg-purple-600 text-white shadow-md hover:bg-purple-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                  }`}
                >
                  {s}
                </button>
              );
            })}
          </div>
          <div className="mt-2 text-xs text-gray-500">
            {skills.length === 0 ? 'Select skills to find matching partners' : `${skills.length} selected`}
          </div>
        </div>

        {/* Tags Selection */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <Tag className="w-4 h-4 text-fuchsia-600" />
              Select Interests
            </label>
            {tags.length > 0 && (
              <button
                onClick={() => setTags([])}
                className="text-xs text-fuchsia-600 hover:underline"
              >
                Clear all
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {ALL_TAGS.map((t) => {
              const selected = tags.includes(t);
              return (
                <button
                  key={t}
                  onClick={() => toggle(tags, setTags, t)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    selected
                      ? 'bg-fuchsia-600 text-white shadow-md hover:bg-fuchsia-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>
          <div className="mt-2 text-xs text-gray-500">
            {tags.length === 0 ? 'Select interests to refine matching' : `${tags.length} selected`}
          </div>
        </div>

        {/* Duration Selector */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" />
              Session Duration
            </label>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="5"
                max="60"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-32 h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="w-16 px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-center text-sm font-semibold text-gray-900">
                {duration}m
              </div>
            </div>
          </div>
          <div className="text-xs text-gray-600">
            Recommended: 5-10 minutes for quick pairing sessions
          </div>
        </div>

        {/* Match Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-3">
            <div className="text-xs text-purple-600 font-semibold mb-1">Total Pool</div>
            <div className="text-2xl font-bold text-purple-900">{OMEGA_POOL.length}</div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
            <div className="text-xs text-blue-600 font-semibold mb-1">Matched</div>
            <div className="text-2xl font-bold text-blue-900">{filtered.length}</div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-3">
            <div className="text-xs text-green-600 font-semibold mb-1">Success Rate</div>
            <div className="text-2xl font-bold text-green-900">
              {filtered.length > 0 ? '100%' : '0%'}
            </div>
          </div>
        </div>

        {/* Find Match Button */}
        <button
          onClick={start}
          disabled={filtered.length === 0 || isFinding || hasMatch}
          className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white font-bold text-base transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
        >
          {isFinding ? (
            <>
              <Search className="w-5 h-5 animate-spin" />
              Searching for match...
            </>
          ) : hasMatch ? (
            <>
              <CheckCircle className="w-5 h-5" />
              Match Found
            </>
          ) : (
            <>
              <Zap className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Find Omega Match
            </>
          )}
        </button>

        {filtered.length === 0 && (skills.length > 0 || tags.length > 0) && (
          <div className="text-center text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg py-3 px-4">
            <Filter className="w-5 h-5 inline-block mr-2" />
            No matches found. Try adjusting your filters.
          </div>
        )}
      </div>
    </div>
  );
}
