'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useChat } from '../store/collabStore.jsx';

export default function ChatPanel({ roomId, user }) {
  const [activeTab, setActiveTab] = useState('chat'); // chat | qna | polls
  const [questionList, setQuestionList] = useState([]);
  const [polls, setPolls] = useState([
    { id: 'poll-1', question: 'How is the audio quality?', options: ['Great', 'Okay', 'Bad'], votes: [5, 2, 1] },
  ]);
  const inputRef = useRef(null);
  const endRef = useRef(null);
  const isHost = user?.role === 'host' || user?.role === 'cohost';
  const { messages, send, del, timeoutUser, timeouts } = useChat(roomId, user, isHost);
  const [pickerOpen, setPickerOpen] = useState(false);
  const EMOJIS = ['👍','👏','🎉','❤️','😂','😮','🤔','✅'];

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const sendMessage = () => {
    const text = inputRef.current.value.trim();
    if (!text) return;
    send(text);
    inputRef.current.value = '';
  };

  const askQuestion = () => {
    const text = inputRef.current.value.trim();
    if (!text) return;
    setQuestionList(prev => [...prev, { id: `q-${prev.length+1}`, author: user?.name || 'You', text, answers: [] }]);
    inputRef.current.value = '';
  };

  const vote = (pollId, index) => {
    setPolls(prev => prev.map(p => p.id === pollId ? { ...p, votes: p.votes.map((v, i) => i === index ? v + 1 : v) } : p));
  };

  // simple markdown-lite: **bold**, *italic*, `code`, and links
  const renderText = (text) => {
    let t = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code class="px-1 py-0.5 bg-gray-100 rounded">$1</code>')
      .replace(/(https?:\/\/\S+)/g, '<a href="$1" target="_blank" class="text-blue-600 underline">$1<\/a>');
    return { __html: t };
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden h-full flex flex-col">
      <div className="px-4 py-2 border-b flex items-center gap-2 text-sm">
        {['chat','qna','polls'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-3 py-1 rounded ${activeTab===tab ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}>
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-auto p-3">
        {activeTab === 'chat' && (
          <div className="space-y-3">
            {messages.length === 0 && <div className="text-sm text-gray-500">No messages yet. Say hello!</div>}
            {messages.map(m => (
              <div key={m.id} className="flex items-start gap-2 group">
                <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-xs">{(m.authorName||'U')?.[0]}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-gray-500 flex items-center gap-2">
                    <span className="truncate max-w-[140px]">{m.authorName}</span>
                    <span>•</span>
                    <span>{new Date(m.ts).toLocaleTimeString()}</span>
                    {isHost && (
                      <span className="opacity-0 group-hover:opacity-100 transition flex items-center gap-2">
                        <button className="text-red-600 hover:underline" onClick={() => del(m.id)}>Delete</button>
                        <button className="text-amber-600 hover:underline" onClick={() => timeoutUser(m.authorId, 60)}>Timeout 60s</button>
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-900 break-words" dangerouslySetInnerHTML={renderText(m.text)} />
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>
        )}

        {activeTab === 'qna' && (
          <div className="space-y-3">
            {questionList.length === 0 && <div className="text-sm text-gray-500">No questions asked yet.</div>}
            {questionList.map(q => (
              <div key={q.id} className="border border-gray-200 rounded-lg p-2">
                <div className="text-xs text-gray-500">{q.author}</div>
                <div className="text-sm text-gray-900">{q.text}</div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'polls' && (
          <div className="space-y-4">
            {polls.map(p => (
              <div key={p.id} className="border border-gray-200 rounded-lg p-2">
                <div className="font-medium text-gray-900 text-sm mb-2">{p.question}</div>
                <div className="space-y-2">
                  {p.options.map((opt, i) => {
                    const total = p.votes.reduce((a,b)=>a+b,0) || 1;
                    const pct = Math.round((p.votes[i] / total) * 100);
                    return (
                      <button key={opt} onClick={() => vote(p.id, i)} className="w-full text-left">
                        <div className="text-xs text-gray-700">{opt}</div>
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500" style={{ width: `${pct}%` }} />
                        </div>
                        <div className="text-[10px] text-gray-500">{pct}%</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="p-2 border-t flex items-center gap-2">
        <input ref={inputRef} placeholder={activeTab==='chat'?'Type a message...':activeTab==='qna'?'Ask a question...':'Suggest a poll...'} className="flex-1 border rounded-lg px-3 py-2" />
        {activeTab === 'chat' && (
          <>
            <button onClick={() => setPickerOpen(v=>!v)} className="px-3 py-2 border rounded-lg">😊</button>
            {pickerOpen && (
              <div className="absolute bottom-14 right-4 bg-white border rounded-lg p-2 shadow">
                <div className="grid grid-cols-4 gap-1">
                  {EMOJIS.map(e => (
                    <button key={e} onClick={() => { inputRef.current.value += ` ${e}`; setPickerOpen(false); }} className="px-2 py-1 text-xl hover:bg-gray-100 rounded">{e}</button>
                  ))}
                </div>
              </div>
            )}
            <button onClick={sendMessage} className="px-3 py-2 bg-blue-600 text-white rounded-lg">Send</button>
          </>
        )}
        {activeTab === 'qna' && <button onClick={askQuestion} className="px-3 py-2 bg-blue-600 text-white rounded-lg">Ask</button>}
        {activeTab === 'polls' && <button onClick={() => { /* no-op for now */ }} className="px-3 py-2 bg-gray-200 text-gray-800 rounded-lg">New Poll</button>}
      </div>
    </div>
  );
}
