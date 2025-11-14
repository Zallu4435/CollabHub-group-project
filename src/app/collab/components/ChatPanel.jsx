'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useChat } from '../store/collabStore.jsx';
import {
  MessageCircle,
  HelpCircle,
  BarChart3,
  Send,
  Smile,
  Trash2,
  Clock,
  ChevronDown
} from 'lucide-react';

const TABS = [
  { id: 'chat', label: 'Chat', icon: MessageCircle },
  { id: 'qna', label: 'Q&A', icon: HelpCircle },
  { id: 'polls', label: 'Polls', icon: BarChart3 }
];

const EMOJIS = ['👍', '👏', '🎉', '❤️', '😂', '😮', '🤔', '✅', '🔥', '💯', '🙌', '🚀'];

export default function ChatPanel({ roomId, user }) {
  const [activeTab, setActiveTab] = useState('chat');
  const [questionList, setQuestionList] = useState([]);
  const [polls, setPolls] = useState([
    {
      id: 'poll-1',
      question: 'How is the audio quality?',
      options: ['Great', 'Okay', 'Bad'],
      votes: [5, 2, 1]
    }
  ]);
  const [pickerOpen, setPickerOpen] = useState(false);
  const inputRef = useRef(null);
  const endRef = useRef(null);
  const isHost = user?.role === 'host' || user?.role === 'cohost';
  const { messages, send, del, timeoutUser } = useChat(roomId, user, isHost);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    const text = inputRef.current.value.trim();
    if (!text) return;
    send(text);
    inputRef.current.value = '';
  };

  const askQuestion = () => {
    const text = inputRef.current.value.trim();
    if (!text) return;
    setQuestionList((prev) => [
      ...prev,
      { id: `q-${Date.now()}`, author: user?.name || 'You', text, upvotes: 0, answers: [] }
    ]);
    inputRef.current.value = '';
  };

  const upvoteQuestion = (id) => {
    setQuestionList((prev) =>
      prev.map((q) => (q.id === id ? { ...q, upvotes: q.upvotes + 1 } : q))
    );
  };

  const vote = (pollId, index) => {
    setPolls((prev) =>
      prev.map((p) =>
        p.id === pollId
          ? { ...p, votes: p.votes.map((v, i) => (i === index ? v + 1 : v)) }
          : p
      )
    );
  };

  const renderText = (text) => {
    let t = text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      .replace(/`(.*?)`/g, '<code class="px-1.5 py-0.5 bg-gray-100 rounded text-xs font-mono">$1</code>')
      .replace(
        /(https?:\/\/\S+)/g,
        '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">$1</a>'
      );
    return { __html: t };
  };

  const ActiveIcon = TABS.find((t) => t.id === activeTab)?.icon || MessageCircle;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden h-full flex flex-col shadow-sm">
      {/* Tab Navigation */}
      <div className="px-4 py-3 border-b bg-gradient-to-r from-gray-50 to-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <span className="hidden sm:inline">Live</span>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto p-4 bg-gray-50/50">
        {/* Chat Tab */}
        {activeTab === 'chat' && (
          <div className="space-y-4">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                  <MessageCircle className="w-6 h-6 text-gray-400" />
                </div>
                <p className="text-sm text-gray-500">No messages yet. Start the conversation!</p>
              </div>
            )}
            {messages.map((m) => (
              <div key={m.id} className="flex items-start gap-3 group animate-fadeIn">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                  {(m.authorName || 'U')[0].toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm text-gray-900 truncate max-w-[140px]">
                      {m.authorName}
                    </span>
                    <span className="text-[10px] text-gray-400">•</span>
                    <span className="text-[10px] text-gray-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(m.ts).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  <div
                    className="text-sm text-gray-700 break-words leading-relaxed"
                    dangerouslySetInnerHTML={renderText(m.text)}
                  />
                  {isHost && (
                    <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => del(m.id)}
                        className="flex items-center gap-1 text-xs text-red-600 hover:underline"
                      >
                        <Trash2 className="w-3 h-3" />
                        Delete
                      </button>
                      <button
                        onClick={() => timeoutUser(m.authorId, 60)}
                        className="flex items-center gap-1 text-xs text-amber-600 hover:underline"
                      >
                        <Clock className="w-3 h-3" />
                        Timeout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>
        )}

        {/* Q&A Tab */}
        {activeTab === 'qna' && (
          <div className="space-y-3">
            {questionList.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                  <HelpCircle className="w-6 h-6 text-gray-400" />
                </div>
                <p className="text-sm text-gray-500">No questions asked yet.</p>
              </div>
            )}
            {questionList
              .sort((a, b) => b.upvotes - a.upvotes)
              .map((q) => (
                <div
                  key={q.id}
                  className="border border-gray-200 rounded-xl p-4 bg-white hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => upvoteQuestion(q.id)}
                      className="flex flex-col items-center gap-1 px-2 py-1 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <ChevronDown className="w-5 h-5 text-gray-400 rotate-180" />
                      <span className="text-sm font-semibold text-gray-700">{q.upvotes}</span>
                    </button>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-gray-500 mb-1">{q.author}</div>
                      <div className="text-sm text-gray-900 font-medium">{q.text}</div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* Polls Tab */}
        {activeTab === 'polls' && (
          <div className="space-y-4">
            {polls.map((p) => {
              const total = p.votes.reduce((a, b) => a + b, 0) || 1;
              return (
                <div
                  key={p.id}
                  className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm"
                >
                  <div className="font-semibold text-gray-900 text-sm mb-3 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-blue-600" />
                    {p.question}
                  </div>
                  <div className="space-y-2">
                    {p.options.map((opt, i) => {
                      const pct = Math.round((p.votes[i] / total) * 100);
                      return (
                        <button
                          key={opt}
                          onClick={() => vote(p.id, i)}
                          className="w-full text-left group"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-gray-700 font-medium">{opt}</span>
                            <span className="text-xs text-gray-500 font-semibold">{pct}%</span>
                          </div>
                          <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300 group-hover:from-blue-600 group-hover:to-blue-700"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  <div className="mt-3 text-xs text-gray-500">{total} total votes</div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-3 border-t bg-white flex items-center gap-2 relative">
        <input
          ref={inputRef}
          placeholder={
            activeTab === 'chat'
              ? 'Type a message...'
              : activeTab === 'qna'
              ? 'Ask a question...'
              : 'Suggest a poll...'
          }
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              activeTab === 'chat' ? sendMessage() : askQuestion();
            }
          }}
          className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {activeTab === 'chat' && (
          <>
            <button
              onClick={() => setPickerOpen((v) => !v)}
              className="p-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <Smile className="w-5 h-5 text-gray-600" />
            </button>
            {pickerOpen && (
              <div className="absolute bottom-16 right-4 bg-white border border-gray-200 rounded-2xl p-3 shadow-lg z-10">
                <div className="grid grid-cols-6 gap-2">
                  {EMOJIS.map((e) => (
                    <button
                      key={e}
                      onClick={() => {
                        inputRef.current.value += ` ${e}`;
                        setPickerOpen(false);
                        inputRef.current.focus();
                      }}
                      className="w-9 h-9 text-xl hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      {e}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <button
              onClick={sendMessage}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium text-sm flex items-center gap-2 transition-colors shadow-sm"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Send</span>
            </button>
          </>
        )}
        {activeTab === 'qna' && (
          <button
            onClick={askQuestion}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium text-sm transition-colors shadow-sm"
          >
            Ask
          </button>
        )}
        {activeTab === 'polls' && (
          <button className="px-4 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl font-medium text-sm transition-colors">
            New Poll
          </button>
        )}
      </div>
    </div>
  );
}
