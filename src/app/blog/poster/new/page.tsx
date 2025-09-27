"use client";

import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { BlogTeam, BlogTeamRole } from '../../types';
import { getTeamById, getUserRoleInTeam, canUserPublishInTeam } from '../../data';
import LocationInput, { LocationData } from '../../components/LocationInput';

export default function NewPosterPage() {
  const searchParams = useSearchParams();
  const [title, setTitle] = React.useState<string>("");
  const [tags, setTags] = React.useState<string>("");
  const [draftId, setDraftId] = React.useState<string | null>(null);
  const [contentPreview, setContentPreview] = React.useState<string>("");
  const [location, setLocation] = React.useState<LocationData | undefined>(undefined);
  
  // Team-related state
  const [blogType, setBlogType] = React.useState<'solo' | 'team'>('solo');
  const [selectedTeam, setSelectedTeam] = React.useState<BlogTeam | null>(null);
  const [userRole, setUserRole] = React.useState<BlogTeamRole | null>(null);
  const [canPublish, setCanPublish] = React.useState<boolean>(true);

  // Mock current user - in real app, get from auth context
  const currentUserId = 'a_sarah';

  // Initialize blog type and team from URL params
  React.useEffect(() => {
    const solo = searchParams.get('solo');
    const teamId = searchParams.get('teamId');
    
    if (solo === 'true') {
      setBlogType('solo');
      setCanPublish(true);
    } else if (teamId) {
      setBlogType('team');
      const team = getTeamById(teamId);
      if (team) {
        setSelectedTeam(team);
        const role = getUserRoleInTeam(currentUserId, teamId);
        if (role) {
          setUserRole(role.role);
          setCanPublish(canUserPublishInTeam(currentUserId, teamId));
        }
      }
    }
  }, [searchParams, currentUserId]);

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
    let url = `/blog/poster?draftId=${encodeURIComponent(id)}&returnTo=${returnTo}`;
    
    // Add team context if this is a team blog
    if (blogType === 'team' && selectedTeam) {
      url += `&teamId=${encodeURIComponent(selectedTeam.id)}&teamName=${encodeURIComponent(selectedTeam.name)}`;
    } else if (blogType === 'solo') {
      url += `&solo=true`;
    }
    
    window.location.href = url;
  };

  const handlePublish = () => {
    if (blogType === 'solo') {
      // Solo blog - immediate publish
      alert("Frontend-only demo: Solo blog published successfully!");
    } else if (blogType === 'team' && selectedTeam) {
      if (canPublish) {
        // User has permission to publish directly
        alert(`Frontend-only demo: Team blog published for ${selectedTeam.name}!`);
      } else {
        // User needs to submit for review
        alert(`Frontend-only demo: Blog submitted for review to ${selectedTeam.name} team.`);
      }
    }
  };

  const getPublishButtonText = () => {
    if (blogType === 'solo') {
      return 'Publish';
    } else if (blogType === 'team' && selectedTeam) {
      return canPublish ? 'Publish' : 'Submit for Review';
    }
    return 'Publish';
  };

  const getPublishButtonStyle = () => {
    if (blogType === 'team' && !canPublish) {
      return 'px-4 py-2 text-sm bg-orange-600 text-white rounded-full hover:bg-orange-700';
    }
    return 'px-4 py-2 text-sm bg-gray-900 text-white rounded-full hover:bg-black';
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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-serif font-bold">
                {blogType === 'team' && selectedTeam ? `New Post for ${selectedTeam.name}` : 'New Post'}
              </h1>
              <p className="text-sm text-gray-700 mt-2">
                {blogType === 'team' && selectedTeam 
                  ? `Write in the editor, then review and ${canPublish ? 'publish' : 'submit for review'} here.`
                  : 'Write in the editor, then review and publish here.'
                }
              </p>
            </div>
            {blogType === 'team' && selectedTeam && (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center">
                    <span className="text-lg">👥</span>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-lg">{selectedTeam.name}</div>
                    <div className="text-sm text-gray-600">Your role: <span className="font-medium text-green-700 capitalize">{userRole}</span></div>
                  </div>
                </div>
                {!canPublish && (
                  <div className="px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium border border-orange-200">
                    ⏳ Review Required
                  </div>
                )}
                {canPublish && (
                  <div className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium border border-green-200">
                    ✅ Can Publish
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Editor info panel */}
        <div className="rounded-2xl border border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 mb-8 shadow-sm">
          {blogType === 'team' && selectedTeam ? (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center">
                  <span className="text-lg">👥</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Team Collaboration Mode</h3>
                  <p className="text-sm text-gray-600">Writing for <span className="font-semibold text-green-700">{selectedTeam.name}</span></p>
                </div>
              </div>
              <div className="bg-white/60 rounded-lg p-4">
                <p className="text-sm font-medium text-gray-900 mb-3">How to use the editor:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-start space-x-2">
                    <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-blue-600">1</span>
                    </div>
                    <span>Click <span className="font-semibold text-blue-700">Open in Editor</span> to write content</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-green-600">2</span>
                    </div>
                    <span>Editor <span className="font-semibold text-green-700">autosaves</span> to your browser</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-purple-600">3</span>
                    </div>
                    <span>Use <span className="font-semibold text-purple-700">Save & Return</span> to come back here</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-5 h-5 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-orange-600">4</span>
                    </div>
                    <span>Content appears as <span className="font-semibold text-orange-700">live preview</span></span>
                  </div>
                </div>
                <div className="mt-3 p-2 bg-green-50 rounded-md border border-green-200">
                  <p className="text-sm text-green-800 font-medium">✨ Team members can collaborate on this post</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Rich Text Editor</h3>
                  <p className="text-sm text-gray-600">Create beautiful content with our powerful editor</p>
                </div>
              </div>
              <div className="bg-white/60 rounded-lg p-4">
                <p className="text-sm font-medium text-gray-900 mb-3">How to use the editor:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-start space-x-2">
                    <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-blue-600">1</span>
                    </div>
                    <span>Click <span className="font-semibold text-blue-700">Open in Editor</span> to write content</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-green-600">2</span>
                    </div>
                    <span>Editor <span className="font-semibold text-green-700">autosaves</span> to your browser</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-purple-600">3</span>
                    </div>
                    <span>Use <span className="font-semibold text-purple-700">Save & Return</span> to come back here</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-5 h-5 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-orange-600">4</span>
                    </div>
                    <span>Content appears as <span className="font-semibold text-orange-700">live preview</span></span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Meta form */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
              {/* Header */}
              <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">Post Details</h2>
                    <p className="text-sm text-gray-600 mt-1">Add basic information for your post</p>
                  </div>
                  {blogType === 'team' && selectedTeam && (
                    <div className="flex items-center space-x-2 bg-green-50 border border-green-200 rounded-lg px-3 py-1.5">
                      <span className="text-sm">👥</span>
                      <span className="text-sm font-medium text-green-700">{selectedTeam.name}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Form Fields */}
              <div className="p-6 space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-900">Title</label>
                  <input
                    className="w-full h-11 border border-gray-300 rounded-lg px-4 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter a compelling title"
                  />
                  <p className="text-xs text-gray-500">If empty, we'll use the first heading from the editor</p>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-900">Tags</label>
                  <input
                    className="w-full h-11 border border-gray-300 rounded-lg px-4 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="design, tutorial, web-development"
                  />
                  <p className="text-xs text-gray-500">Separate tags with commas</p>
                </div>

                <div className="space-y-2">
                  <LocationInput
                    value={location}
                    onChange={setLocation}
                    placeholder="Add location (optional)"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="px-6 py-5 border-t border-gray-100 bg-gray-50/50">
                <div className="flex flex-col space-y-3">
                  {/* Primary Actions */}
                  <div className="flex space-x-3">
                    <button
                      className="flex-1 px-4 py-3 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                      onClick={handleOpenInEditor}
                    >
                      <span className="flex items-center justify-center space-x-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        <span>{draftId ? 'Edit in Editor' : 'Open in Editor'}</span>
                      </span>
                    </button>
                    <button
                      className={`flex-1 px-4 py-3 text-sm font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${getPublishButtonStyle()}`}
                      onClick={handlePublish}
                    >
                      <span className="flex items-center justify-center space-x-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                        <span>{getPublishButtonText()}</span>
                      </span>
                    </button>
                  </div>

                  {/* Secondary Actions */}
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-2">
                    {draftId && (
                      <button
                          className="px-3 py-2 text-xs font-medium bg-red-50 text-red-700 rounded-md hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
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
                    </div>
                    <button
                      className="px-3 py-2 text-xs font-medium text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 rounded-md transition-colors"
                      onClick={() => window.history.back()}
                    >
                      Cancel
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
              <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-gradient-to-br from-gray-50 to-white flex items-center justify-center h-80">
                <div className="text-center max-w-md">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to Start Writing?</h3>
                  <p className="text-gray-600 mb-6">Click "Open in Editor" to begin creating your post. Your content preview will appear here as you write.</p>
                  <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span>Auto-save enabled</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span>Rich text editor</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      <span>Live preview</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Single preview shown above; removed duplicate below */}
      </div>
    </div>
  );
}


