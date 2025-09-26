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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="mb-10 text-center lg:text-left">
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
          <h1 className="text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-3">
            New Post
          </h1>
          <p className="text-base text-gray-600 max-w-2xl mx-auto lg:mx-0">
            Write in the editor, then review and publish here.
          </p>
        </div>

        {/* Editor Info Panel */}
        <div className="rounded-3xl border border-gray-200 bg-white p-8 mb-10 shadow-sm">
          <div className="max-w-4xl">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">How it works</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-blue-600 text-xs font-bold">1</span>
                </div>
                <p>Click <span className="font-semibold text-gray-900">Open in Editor</span> to write content.</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-green-600 text-xs font-bold">2</span>
                </div>
                <p>Editor <span className="font-semibold text-gray-900">autosaves</span> to your browser for this draft.</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-purple-600 text-xs font-bold">3</span>
                </div>
                <p>Use <span className="font-semibold text-gray-900">Save & Return</span> in the editor to come back here.</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-orange-600 text-xs font-bold">4</span>
                </div>
                <p>Your content appears below as a live preview.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Left Sidebar: Meta Form */}
          <div className="xl:col-span-1">
            <div className="sticky top-6 space-y-6">
              {/* Post Settings Card */}
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200 p-6 shadow-lg shadow-gray-100">
                <div className="flex items-center space-x-2 mb-6">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm font-bold">⚙️</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Post Settings</h3>
                </div>
                
                <div className="space-y-5">
                  {/* Title Input */}
                  <div className="group">
                    <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">
                      <span className="w-4 h-4 bg-blue-100 rounded flex items-center justify-center">
                        <span className="text-blue-600 text-xs">📝</span>
                      </span>
                      <span>Title</span>
                    </label>
                    <div className="relative">
                      <input
                        className="w-full bg-white border-2 border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 group-hover:border-gray-300"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter your amazing title..."
                      />
                      {title && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Tags Input */}
                  <div className="group">
                    <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">
                      <span className="w-4 h-4 bg-green-100 rounded flex items-center justify-center">
                        <span className="text-green-600 text-xs">#</span>
                      </span>
                      <span>Tags</span>
                    </label>
                    <div className="relative">
                      <input
                        className="w-full bg-white border-2 border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-200 group-hover:border-gray-300"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        placeholder="design, tutorial, tips"
                      />
                      {tags && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1.5 flex items-center space-x-1">
                      <span>💡</span>
                      <span>Separate with commas for best results</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions Card */}
              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  {/* Left group */}
                  <div className="flex flex-wrap items-center gap-2">
                    {draftId && (
                      <button
                        className="px-4 py-2 text-sm bg-white text-red-600 border border-red-200 rounded-full hover:bg-red-50"
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
                      className="px-4 py-2 text-sm bg-gray-100 text-gray-900 rounded-full hover:bg-gray-200"
                      onClick={() => window.history.back()}
                    >
                      Cancel
                    </button>
                  </div>
                  {/* Right group stacked */}
                  <div className="flex flex-col items-end gap-2">
                    <button
                      className="px-4 py-2 text-sm bg-black text-white rounded-full hover:bg-gray-900"
                      onClick={handleOpenInEditor}
                    >
                      {draftId ? 'Continue Editing' : 'Open in Editor'}
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

              {/* Status Card */}
              {draftId && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-blue-900">Draft Status</span>
                  </div>
                  <p className="text-xs text-blue-700 mb-2">ID: {draftId.slice(0, 8)}...</p>
                  <p className="text-xs text-blue-600">✅ Auto-saved locally</p>
                </div>
              )}
            </div>
          </div>

          {/* Right: Content Preview */}
          <div className="xl:col-span-3">
            {draftId ? (
              <div className="rounded-3xl border border-gray-200 bg-white overflow-hidden shadow-sm">
                {/* Preview Header */}
                <div className="flex items-center justify-between bg-gray-50 px-8 py-4 border-b border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-900">Live Preview</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-xs text-gray-500 bg-gray-200 px-3 py-1 rounded-full">
                      Draft: {draftId.slice(0, 8)}...
                    </div>
                    <button
                      className="px-3 py-1.5 text-xs font-medium bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-200"
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
                      🔄 Refresh
                    </button>
                  </div>
                </div>
                
                {/* Preview Content */}
                <div className="bg-white">
                  <div className="max-w-4xl mx-auto px-8 py-12">
                    {(() => {
                      const plain = contentPreview.replace(/<[^>]*>/g, '').trim();
                      if (!plain) {
                        return (
                          <div className="rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-10 text-center text-sm text-gray-600">
                            No content yet. Open the editor and write something, then Save & Return.
                          </div>
                        );
                      }
                      return (
                        <div 
                          className="prose prose-lg prose-gray max-w-none" 
                          dangerouslySetInnerHTML={{ __html: contentPreview }} 
                        />
                      );
                    })()}
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-3xl border-2 border-dashed border-gray-300 bg-white p-16 text-center shadow-sm">
                <div className="max-w-md mx-auto">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl">📄</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Ready to start writing?
                  </h3>
                  <p className="text-sm text-gray-600 mb-6">
                    Open the editor to start creating your post. Your preview will appear here as you write.
                  </p>
                  <button
                    className="px-6 py-3 text-sm font-medium bg-gray-900 text-white rounded-xl hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
                    onClick={handleOpenInEditor}
                  >
                    📝 Get Started
                  </button>
                </div>  
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}