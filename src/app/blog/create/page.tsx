"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BlogTeam, BlogTeamRole } from '../types';
import { getUserTeams } from '../data';

export default function CreateBlogPage() {
  const router = useRouter();
  const [blogType, setBlogType] = useState<'solo' | 'team' | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<string>('');
  const [showCreateTeam, setShowCreateTeam] = useState(false);
  const [newTeamData, setNewTeamData] = useState({
    name: '',
    description: '',
    defaultRole: 'contributor' as BlogTeamRole
  });

  // Mock current user - in real app, get from auth context
  const currentUserId = 'a_sarah';
  const userTeams = getUserTeams(currentUserId);

  const handleBlogTypeSelect = (type: 'solo' | 'team') => {
    setBlogType(type);
    if (type === 'solo') {
      // For solo blogs, proceed directly to post creation
      router.push('/blog/poster/new?solo=true');
    }
  };

  const handleTeamSelect = (teamId: string) => {
    setSelectedTeam(teamId);
    // Proceed to post creation with team context
    router.push(`/blog/poster/new?teamId=${teamId}`);
  };

  const handleCreateTeam = () => {
    // In real app, create team via API
    console.log('Creating team:', newTeamData);
    // For demo, simulate team creation
    const newTeamId = `team_${Date.now()}`;
    router.push(`/blog/poster/new?teamId=${newTeamId}&newTeam=true`);
  };

  const handleBack = () => {
    if (blogType === null) {
      router.push('/blog');
    } else {
      setBlogType(null);
      setSelectedTeam('');
      setShowCreateTeam(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-4">
            <Link
              href="/blog"
              className="inline-flex items-center text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
              <span className="mr-2">←</span>
              <span>Back to Blog</span>
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            {blogType === null ? 'Create New Blog Post' : 
             blogType === 'solo' ? 'Solo Blog Post' : 
             'Team Blog Post'}
          </h1>
          <p className="text-gray-600 mt-2">
            {blogType === null ? 'Choose whether to create a solo or team-based blog post' :
             blogType === 'solo' ? 'Create a personal blog post' :
             'Select a team or create a new one for your blog post'}
          </p>
        </div>

        {/* Blog Type Selection */}
        {blogType === null && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Writing Mode</h2>
              <p className="text-gray-600">Select how you want to create your blog post</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Solo Blog Option */}
              <div 
                className="group border-2 border-gray-200 rounded-2xl p-8 cursor-pointer hover:border-blue-500 hover:shadow-xl transition-all duration-300 bg-white hover:bg-blue-50/30"
                onClick={() => handleBlogTypeSelect('solo')}
              >
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl">👤</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Solo Writing</h3>
                  <p className="text-gray-600 mb-6 text-lg">
                    Create a personal blog post with full creative control
                  </p>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-center space-x-2 text-gray-600">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      <span>Full control over content</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 text-gray-600">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      <span>Immediate publishing</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 text-gray-600">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      <span>No approval needed</span>
                    </div>
                  </div>
                  <div className="mt-6">
                    <span className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      Perfect for personal content
                    </span>
                  </div>
                </div>
              </div>

              {/* Team Blog Option */}
              <div 
                className="group border-2 border-gray-200 rounded-2xl p-8 cursor-pointer hover:border-green-500 hover:shadow-xl transition-all duration-300 bg-white hover:bg-green-50/30"
                onClick={() => handleBlogTypeSelect('team')}
              >
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl">👥</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Team Collaboration</h3>
                  <p className="text-gray-600 mb-6 text-lg">
                    Create collaborative content with your team members
                  </p>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-center space-x-2 text-gray-600">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span>Role-based permissions</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 text-gray-600">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span>Team collaboration</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 text-gray-600">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span>Review workflow</span>
                    </div>
                  </div>
                  <div className="mt-6">
                    <span className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      Great for team projects
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Team Selection */}
        {blogType === 'team' && !showCreateTeam && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Team</h2>
              <p className="text-gray-600">Select a team to collaborate on this blog post</p>
            </div>

            {userTeams.length > 0 ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">Your Teams</h3>
                  <button
                    onClick={() => setShowCreateTeam(true)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                  >
                    <span>+</span>
                    <span>Create New Team</span>
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {userTeams.map((team) => (
                    <div
                      key={team.id}
                      className="group border-2 border-gray-200 rounded-xl p-6 cursor-pointer hover:border-green-500 hover:shadow-lg transition-all duration-300 bg-white hover:bg-green-50/30"
                      onClick={() => handleTeamSelect(team.id)}
                    >
                      <div className="flex items-start space-x-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <span className="text-2xl">👥</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{team.name}</h3>
                          <p className="text-gray-600 mb-4">{team.description}</p>
                          <div className="flex items-center space-x-6 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                              <span>{team.memberCount} members</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                              <span>{team.blogCount} posts</span>
                            </div>
                          </div>
                          <div className="mt-4">
                            <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                              Click to select
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">👥</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">No Teams Yet</h3>
                <p className="text-gray-600 mb-8 text-lg">Create your first team to start collaborative blogging with your colleagues.</p>
                <button
                  onClick={() => setShowCreateTeam(true)}
                  className="px-8 py-4 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors text-lg font-medium"
                >
                  Create Your First Team
                </button>
              </div>
            )}
          </div>
        )}

        {/* Create Team Form */}
        {showCreateTeam && (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Create New Team</h2>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Team Name
                  </label>
                  <input
                    type="text"
                    value={newTeamData.name}
                    onChange={(e) => setNewTeamData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter team name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={newTeamData.description}
                    onChange={(e) => setNewTeamData(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                    placeholder="Describe your team's purpose"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Default Role for New Members
                  </label>
                  <select
                    value={newTeamData.defaultRole}
                    onChange={(e) => setNewTeamData(prev => ({ ...prev, defaultRole: e.target.value as BlogTeamRole }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="contributor">Contributor</option>
                    <option value="editor">Editor</option>
                    <option value="viewer">Viewer</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    Contributors can create drafts and submit for review. Editors can publish directly.
                  </p>
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowCreateTeam(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateTeam}
                  disabled={!newTeamData.name.trim()}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Create Team
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Back Button */}
        {blogType !== null && (
          <div className="mt-8">
            <button
              onClick={handleBack}
              className="inline-flex items-center text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
              <span className="mr-2">←</span>
              <span>Back</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
