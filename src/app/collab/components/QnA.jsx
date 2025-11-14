'use client';

import React, { useRef, useState } from 'react';
import { useQnA } from '../store/collabStore.jsx';
import {
  MessageSquare,
  Clock,
  CheckCircle,
  XCircle,
  Send,
  AlertCircle,
  ThumbsUp
} from 'lucide-react';

export default function QnA({ roomId, user }) {
  const isHost = user?.role === 'host' || user?.role === 'cohost';
  const { publicQueue, reviewQueue, submit, publish, reject } = useQnA(
    roomId,
    user,
    isHost
  );
  const inputRef = useRef(null);
  const [activeTab, setActiveTab] = useState('public');

  const add = () => {
    const text = inputRef.current.value.trim();
    if (!text) return;
    submit(text);
    inputRef.current.value = '';
    setActiveTab(isHost ? 'review' : 'public');
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
      {/* Header with Tabs */}
      <div className="px-5 py-4 border-b bg-gradient-to-r from-indigo-50 to-purple-50">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900">Q&A Panel</h3>
              <p className="text-xs text-gray-600">Ask and answer questions</p>
            </div>
          </div>
          {isHost && (
            <span className="px-2 py-1 rounded-full bg-purple-600 text-white text-xs font-semibold">
              {reviewQueue.length} pending
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('public')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'public'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            <CheckCircle className="w-4 h-4" />
            Public ({publicQueue.length})
          </button>
          <button
            onClick={() => setActiveTab('review')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'review'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            <Clock className="w-4 h-4" />
            Review ({reviewQueue.length})
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 space-y-3 max-h-[500px] overflow-auto bg-gray-50/50">
        {activeTab === 'public' && (
          <div className="space-y-3">
            {publicQueue.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                  <MessageSquare className="w-6 h-6 text-gray-400" />
                </div>
                <p className="text-sm text-gray-500">No approved questions yet.</p>
                <p className="text-xs text-gray-400 mt-1">Be the first to ask!</p>
              </div>
            )}
            {publicQueue.map((q) => (
              <div
                key={q.id}
                className="border border-gray-200 rounded-xl p-4 bg-white hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-xs font-semibold">
                    {(q.authorName || 'A')[0].toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-gray-900 truncate">
                      {q.authorName}
                    </div>
                    <div className="text-[10px] text-gray-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(q.ts).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                  <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                    <ThumbsUp className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
                <p className="text-sm text-gray-800 leading-relaxed">{q.text}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'review' && (
          <div className="space-y-3">
            {reviewQueue.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                  <Clock className="w-6 h-6 text-gray-400" />
                </div>
                <p className="text-sm text-gray-500">No questions awaiting review.</p>
              </div>
            )}
            {reviewQueue.map((q) => (
              <div
                key={q.id}
                className="border-2 border-amber-200 rounded-xl p-4 bg-amber-50 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-xs font-semibold">
                        {(q.authorName || 'A')[0].toUpperCase()}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900">
                          {q.authorName}
                        </div>
                        <div className="text-[10px] text-gray-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(q.ts).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-800 leading-relaxed">{q.text}</p>
                  </div>

                  {isHost && (
                    <div className="flex flex-col gap-2 flex-shrink-0">
                      <button
                        onClick={() => publish(q.id)}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white text-xs font-medium transition-colors shadow-sm"
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        Publish
                      </button>
                      <button
                        onClick={() => reject(q.id)}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg border-2 border-red-200 hover:bg-red-50 text-red-700 text-xs font-medium transition-colors"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t bg-white">
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            placeholder="Ask a question..."
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                add();
              }
            }}
            className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <button
            onClick={add}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium text-sm flex items-center gap-2 transition-colors shadow-sm"
          >
            <Send className="w-4 h-4" />
            Submit
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          {isHost
            ? 'Questions will appear in Review tab for moderation'
            : 'Your question will be reviewed before appearing publicly'}
        </p>
      </div>
    </div>
  );
}
