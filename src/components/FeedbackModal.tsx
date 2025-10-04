'use client';

import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

type FeedbackType = 'bug' | 'feature' | 'general';
type Severity = 'low' | 'medium' | 'high';

interface ScreenshotPreview {
  name: string;
  dataUrl: string;
}

const FeedbackModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [feedbackType, setFeedbackType] = useState<FeedbackType>('bug');
  const [severity, setSeverity] = useState<Severity>('medium');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [includeContext, setIncludeContext] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [screenshot, setScreenshot] = useState<ScreenshotPreview | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-feedback', handleOpen as EventListener);
    return () => window.removeEventListener('open-feedback', handleOpen as EventListener);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', onClickOutside);
      return () => document.removeEventListener('mousedown', onClickOutside);
    }
  }, [isOpen]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setScreenshot({ name: file.name, dataUrl: String(reader.result) });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (!message.trim()) return;
    setIsSubmitting(true);
    // Simulate latency
    await new Promise(r => setTimeout(r, 900));
    // Store to localStorage as a stand-in for backend
    try {
      const existing = JSON.parse(localStorage.getItem('feedback:submissions') || '[]');
      const payload = {
        id: Date.now().toString(),
        feedbackType,
        severity,
        message: message.trim(),
        email: email.trim() || null,
        context: includeContext ? {
          url: typeof window !== 'undefined' ? window.location.href : '',
          userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : ''
        } : null,
        screenshot,
        createdAt: new Date().toISOString()
      };
      localStorage.setItem('feedback:submissions', JSON.stringify([payload, ...existing]));
    } catch (_) {}

    setIsSubmitting(false);
    setIsOpen(false);
    setMessage('');
    setEmail('');
    setScreenshot(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-end md:items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div
        ref={dialogRef}
        className="w-full md:max-w-2xl rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-gradient-to-br from-white to-gray-50"
      >
        <div className="px-6 py-5 bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">💬</div>
            <div className="flex-1">
              <h3 className="text-lg font-bold">Share Feedback</h3>
              <p className="text-indigo-100 text-sm">Tell us what to improve or what you love</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/90 hover:text-white">✕</button>
          </div>
        </div>

        <div className="px-6 py-5 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <div className="flex gap-2">
                {(['bug','feature','general'] as FeedbackType[]).map(t => (
                  <button
                    key={t}
                    onClick={() => setFeedbackType(t)}
                    className={clsx(
                      'px-3 py-1.5 rounded-full text-sm border transition',
                      feedbackType === t ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                    )}
                  >
                    {t === 'bug' ? '🐞 Bug' : t === 'feature' ? '✨ Feature' : '💡 General'}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Severity</label>
              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value as Severity)}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email (optional)</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              placeholder="Describe the issue or idea with as much detail as possible..."
              className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                <input type="checkbox" checked={includeContext} onChange={(e) => setIncludeContext(e.target.checked)} />
                Include page context
              </label>
              <div>
                <label className="text-sm text-gray-700 mr-2">Add screenshot</label>
                <input type="file" accept="image/*" onChange={handleFileChange} />
              </div>
            </div>
            {screenshot && (
              <div className="flex items-center gap-2">
                <img src={screenshot.dataUrl} alt={screenshot.name} className="w-14 h-14 object-cover rounded-lg border" />
                <button className="text-sm text-gray-500 hover:text-gray-700" onClick={() => setScreenshot(null)}>Remove</button>
              </div>
            )}
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
          <button onClick={() => setIsOpen(false)} className="px-4 py-2 rounded-xl border border-gray-200 bg-white text-gray-700 hover:bg-gray-50">Cancel</button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !message.trim()}
            className={clsx(
              'px-5 py-2 rounded-xl text-white shadow-lg transition',
              isSubmitting || !message.trim() ? 'bg-indigo-300 cursor-not-allowed' : 'bg-gradient-to-r from-indigo-600 to-fuchsia-600 hover:opacity-90'
            )}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;


