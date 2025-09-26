"use client";

import React from 'react';
import Link from 'next/link';

export default function NewPosterPage() {
  const [title, setTitle] = React.useState<string>("");
  const [tags, setTags] = React.useState<string>("");
  const [draftId, setDraftId] = React.useState<string | null>(null);
  const [contentPreview, setContentPreview] = React.useState<string>("");

  // On mount: capture draftId from query and load preview content
  React.useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const existingDraftId = params.get("draftId");
      if (existingDraftId) {
        setDraftId(existingDraftId);
        const stored = localStorage.getItem(`poster:draft:${existingDraftId}`);
        if (stored) {
          const parsed = JSON.parse(stored) as { html?: string };
          setContentPreview(parsed?.html ?? "");
          // If title is empty, try to extract first H1 from content
          if (!title && parsed?.html) {
            try {
              const div = document.createElement('div');
              div.innerHTML = parsed.html;
              const h1 = div.querySelector('h1');
              if (h1 && h1.textContent) setTitle(h1.textContent.trim());
            } catch {}
          }
        }
      }
    } catch {}
  }, []);

  // Refresh preview when returning focus to this tab/page
  React.useEffect(() => {
    const handler = () => {
      if (!draftId) return;
      try {
        const stored = localStorage.getItem(`poster:draft:${draftId}`);
        if (stored) {
          const parsed = JSON.parse(stored) as { html?: string };
          setContentPreview(parsed?.html ?? "");
        }
      } catch {}
    };
    document.addEventListener('visibilitychange', handler);
    window.addEventListener('focus', handler);
    return () => {
      document.removeEventListener('visibilitychange', handler);
      window.removeEventListener('focus', handler);
    };
  }, [draftId]);

  const ensureDraftId = (): string => {
    if (draftId) return draftId;
    const id = crypto.randomUUID();
    setDraftId(id);
    return id;
  };

  const handleOpenInEditor = () => {
    const id = ensureDraftId();
    const returnTo = encodeURIComponent("/blog/poster/new");
    const url = `/blog/poster?draftId=${encodeURIComponent(id)}&returnTo=${returnTo}`;
    window.location.href = url;
  };

  const handlePublish = () => {
    alert("Frontend-only demo: implement backend publish later.");
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="mb-8">
          <div className="mb-3">
            <Link
              href="/blog"
              className="inline-flex items-center text-sm text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-full px-3 py-1.5 transition-colors"
              aria-label="Back to Blog"
            >
              <span className="mr-2">←</span>
              <span>Back to Blog</span>
            </Link>
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold">New Post</h1>
          <p className="text-sm text-gray-700 mt-2">Write in the editor, then review and publish here.</p>
        </div>

        {/* Editor info panel */}
        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5 mb-8">
          <div className="text-sm">
            <p className="mb-2">This form works with the rich editor:</p>
            <ul className="list-disc ml-5 space-y-1">
              <li>Click <span className="font-semibold">Open in Editor</span> to write content.</li>
              <li>Editor <span className="font-semibold">autosaves</span> to your browser for this draft.</li>
              <li>Use <span className="font-semibold">Save & Return</span> in the editor to come back here.</li>
              <li>Your content appears below as a live preview.</li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Meta form */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl border border-gray-200 bg-white">
              <div className="px-5 py-4 border-b border-gray-100">
                <h2 className="text-base font-medium">Post details</h2>
                <p className="text-xs text-gray-600 mt-1">Add basic info for your post.</p>
              </div>
              <div className="p-5 space-y-5">
                <div>
                  <label className="block text-sm text-black mb-1">Title</label>
                  <input
                    className="w-full h-10 border border-gray-300 rounded-lg px-3 text-sm text-black focus:outline-none focus:ring-2 focus:ring-black/10"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter title"
                  />
                  <p className="mt-1 text-xs text-gray-600">If empty, we’ll try to use the first heading from the editor.</p>
                </div>
                <div>
                  <label className="block text-sm text-black mb-1">Tags</label>
                  <input
                    className="w-full h-10 border border-gray-300 rounded-lg px-3 text-sm text-black focus:outline-none focus:ring-2 focus:ring-black/10"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="design, tutorial"
                  />
                </div>
              </div>
              <div className="px-5 py-4 border-t border-gray-100">
                <div className="flex items-start justify-between gap-3">
                  {/* Left group: Clear + Cancel */}
                  <div className="flex flex-wrap items-center gap-2">
                    {draftId && (
                      <button
                        className="px-4 py-2 text-sm bg-red-50 text-red-700 rounded-full hover:bg-red-100"
                        onClick={() => {
                          try {
                            localStorage.removeItem(`poster:draft:${draftId}`);
                            setContentPreview("");
                          } catch {}
                        }}
                      >
                        Clear Draft
                      </button>
                    )}
                    <button
                      className="px-4 py-2 text-sm bg-gray-100 text-black rounded-full hover:bg-gray-200"
                      onClick={() => window.history.back()}
                    >
                      Cancel
                    </button>
                  </div>

                  {/* Right group: Edit on top, Publish below aligned right */}
                  <div className="flex flex-col items-end gap-2">
                    <button
                      className="px-4 py-2 text-sm bg-black text-white rounded-full hover:bg-gray-900"
                      onClick={handleOpenInEditor}
                    >
                      {draftId ? 'Edit in Editor' : 'Open in Editor'}
                    </button>
                    <button
                      className="px-4 py-2 text-sm bg-gray-900 text-white rounded-full hover:bg-black"
                      onClick={handlePublish}
                    >
                      Publish
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Content preview */}
          <div className="lg:col-span-2">
            {draftId && (
              <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
                <div className="flex items-center justify-between bg-gray-50 px-4 py-2">
                  <div className="text-sm">Editor output</div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs">Draft: {draftId}</span>
                    <button
                      className="px-2 py-1 text-xs bg-gray-100 text-black rounded hover:bg-gray-200"
                      onClick={() => {
                        if (!draftId) return;
                        try {
                          const stored = localStorage.getItem(`poster:draft:${draftId}`);
                          if (stored) {
                            const parsed = JSON.parse(stored) as { html?: string };
                            setContentPreview(parsed?.html ?? "");
                            if (!title && parsed?.html) {
                              const div = document.createElement('div');
                              div.innerHTML = parsed.html;
                              const h1 = div.querySelector('h1');
                              if (h1 && h1.textContent) setTitle(h1.textContent.trim());
                            }
                          }
                        } catch {}
                      }}
                    >
                      Refresh
                    </button>
                  </div>
                </div>
                <div className="p-0">
                  <div className="flex justify-center py-6">
                    <div className="w-full max-w-3xl">
                      <div className="bg-white p-8">
                        {(() => {
                          const plain = contentPreview.replace(/<[^>]*>/g, '').trim();
                          if (!plain) {
                            return (
                              <div className="rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-10 text-center text-sm text-gray-600">
                                No content yet. Open the editor and write something, then Save & Return.
                              </div>
                            );
                          }
                          return <div className="prose max-w-none text-black" dangerouslySetInnerHTML={{ __html: contentPreview }} />;
                        })()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {!draftId && (
              <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center text-sm text-gray-600">
                Open the editor to start writing. Your preview will appear here.
              </div>
            )}
          </div>
        </div>

        {/* Single preview shown above; removed duplicate below */}
      </div>
    </div>
  );
}


