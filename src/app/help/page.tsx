'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';

interface FaqItem {
  q: string;
  a: string;
  tags: string[];
}

const FAQS: FaqItem[] = [
  { q: 'How do I create a new project?', a: 'Go to Project → New. Fill details and save. You can later invite collaborators from the workspace Settings tab.', tags: ['project','getting-started'] },
  { q: 'How do I report a bug?', a: 'Use the floating help button → Give Feedback, select Bug and describe what happened.', tags: ['bug','support'] },
  { q: 'Where can I see recent updates?', a: 'Open the What’s New page from Help or visit /updates to see the changelog.', tags: ['updates','changelog'] },
  { q: 'How can I change my currency?', a: 'Use the currency selector in the marketplace header or the global currency widget.', tags: ['marketplace','currency'] },
  { q: 'How do I manage teams?', a: 'Navigate to Blog → Settings → Teams to create and manage teams.', tags: ['teams','blog'] },
];

const HelpPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return FAQS;
    return FAQS.filter(item =>
      item.q.toLowerCase().includes(q) ||
      item.a.toLowerCase().includes(q) ||
      item.tags.some(t => t.includes(q))
    );
  }, [query]);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-100 bg-white">
        <div className="px-8 py-10 bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white">
          <h1 className="text-3xl font-extrabold tracking-tight">Support Center</h1>
          <p className="text-indigo-100 mt-2">Find answers, guides, and ways to contact us</p>
          <div className="mt-6 flex items-center gap-3 bg-white/20 rounded-full p-1">
            <span className="pl-4 text-xl">🔎</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search FAQs..."
              className="flex-1 bg-transparent text-white placeholder-indigo-200 py-2 pr-4 focus:outline-none"
            />
          </div>
        </div>

        <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {filtered.map((item, idx) => (
              <details key={idx} className="group border border-gray-100 rounded-2xl p-5 hover:shadow-sm transition bg-white">
                <summary className="cursor-pointer list-none flex items-start gap-3">
                  <span className="text-xl">💡</span>
                  <span className="font-semibold text-gray-900">{item.q}</span>
                </summary>
                <div className="mt-3 pl-9 text-gray-700 leading-relaxed">{item.a}</div>
                <div className="mt-3 pl-9 flex gap-2 flex-wrap">
                  {item.tags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600">#{tag}</span>
                  ))}
                </div>
              </details>
            ))}
            {filtered.length === 0 && (
              <div className="text-gray-500">No results. Try different keywords.</div>
            )}
          </div>

          <aside className="space-y-4">
            <div className="p-5 border border-gray-100 rounded-2xl bg-gradient-to-br from-indigo-50 to-white">
              <h3 className="font-semibold text-gray-900">Still need help?</h3>
              <p className="text-sm text-gray-600 mt-1">Contact us or send feedback.</p>
              <div className="mt-3 space-y-2">
                <button
                  onClick={() => window.dispatchEvent(new Event('open-feedback'))}
                  className="w-full px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white hover:opacity-90"
                >Give Feedback</button>
                <a href="mailto:support@example.com" className="block text-center w-full px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50">Email Support</a>
              </div>
            </div>

            <div className="p-5 border border-gray-100 rounded-2xl">
              <h3 className="font-semibold text-gray-900">Quick links</h3>
              <ul className="mt-2 space-y-2 text-sm">
                <li><Link className="text-indigo-600 hover:underline" href="/updates">What’s New</Link></li>
                <li><Link className="text-indigo-600 hover:underline" href="/community">Community</Link></li>
                <li><Link className="text-indigo-600 hover:underline" href="/project">Projects</Link></li>
                <li><Link className="text-indigo-600 hover:underline" href="/marketplace">Marketplace</Link></li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;


