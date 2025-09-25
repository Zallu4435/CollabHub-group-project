"use client";

import React, { useEffect, useMemo, useState } from 'react';

interface PersonalTask {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
}

const STORAGE_KEY = 'personal_todo_tasks_v1';

export default function PersonalTodoPage() {
  const [tasks, setTasks] = useState<PersonalTask[]>([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  useEffect(() => {
    try {
      const raw = typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEY) : null;
      if (raw) setTasks(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
      }
    } catch {}
  }, [tasks]);

  const visible = useMemo(() => {
    if (filter === 'active') return tasks.filter(t => !t.completed);
    if (filter === 'completed') return tasks.filter(t => t.completed);
    return tasks;
  }, [tasks, filter]);

  const addTask = () => {
    const title = input.trim();
    if (!title) return;
    setTasks(prev => [
      {
        id: Math.max(0, ...prev.map(t => t.id)) + 1,
        title,
        completed: false,
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ]);
    setInput('');
  };

  const toggleTask = (id: number) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: number) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const clearCompleted = () => setTasks(prev => prev.filter(t => !t.completed));

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-black mb-6">My Personal To‑Do</h1>

      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <div className="flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') addTask(); }}
            placeholder="Add a new personal task..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-black"
          />
          <button
            onClick={addTask}
            className="px-3 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700"
          >
            Add
          </button>
        </div>
        <div className="flex items-center gap-2 mt-3 text-sm">
          <button
            className={`px-2 py-1 rounded ${filter === 'all' ? 'bg-gray-200 text-black' : 'text-black hover:bg-gray-100'}`}
            onClick={() => setFilter('all')}
          >All</button>
          <button
            className={`px-2 py-1 rounded ${filter === 'active' ? 'bg-gray-200 text-black' : 'text-black hover:bg-gray-100'}`}
            onClick={() => setFilter('active')}
          >Active</button>
          <button
            className={`px-2 py-1 rounded ${filter === 'completed' ? 'bg-gray-200 text-black' : 'text-black hover:bg-gray-100'}`}
            onClick={() => setFilter('completed')}
          >Completed</button>
          <div className="ml-auto" />
          <button onClick={clearCompleted} className="text-black hover:underline">Clear completed</button>
        </div>
      </div>

      <div className="space-y-2">
        {visible.length === 0 && (
          <div className="text-center text-gray-700 bg-white border border-dashed border-gray-300 rounded-lg py-10">No tasks</div>
        )}
        {visible.map(task => (
          <div key={task.id} className="bg-white border border-gray-200 rounded-lg p-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className="w-4 h-4"
              />
              <span className={`text-black ${task.completed ? 'line-through text-gray-500' : ''}`}>{task.title}</span>
            </div>
            <button onClick={() => deleteTask(task.id)} className="text-gray-600 hover:text-black">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}


