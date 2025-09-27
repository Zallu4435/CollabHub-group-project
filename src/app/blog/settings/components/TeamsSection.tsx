"use client";

import { useState } from "react";
import { BlogTeam, BlogTeamMember, BlogTeamRole } from "../../types";
import { getUserTeams, getTeamMembers, getUserRoleInTeam, canUserManageTeam } from "../../data";
import TeamMemberCard from "./TeamMemberCard";
import InviteMemberModal from "./InviteMemberModal";
import CreateTeamModal from "./CreateTeamModal";

interface TeamsSectionProps {
  currentUserId: string;
}

export default function TeamsSection({ currentUserId }: TeamsSectionProps) {
  const [selectedTeam, setSelectedTeam] = useState<BlogTeam | null>(null);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showCreateTeamForm, setShowCreateTeamForm] = useState(false);
  const [showSkipInInvite, setShowSkipInInvite] = useState(false);
  const [view, setView] = useState<'list' | 'details'>('list');
  const [searchQuery, setSearchQuery] = useState("");

  const userTeams = getUserTeams(currentUserId);

  // Filter teams based on search query
  const filteredTeams = userTeams.filter(team =>
    team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (team.description && team.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleInviteMember = (email: string, role: BlogTeamRole) => {
    if (selectedTeam) {
      console.log(`Inviting ${email} to ${selectedTeam.name} as ${role}`);
      // In real app, call API to send invitation
    }
  };

  const handleRoleChange = (memberId: string, newRole: BlogTeamRole) => {
    console.log(`Changing role for member ${memberId} to ${newRole}`);
    // In real app, call API to update role
  };

  const handleRemoveMember = (memberId: string) => {
    console.log(`Removing member ${memberId}`);
    // In real app, call API to remove member
  };

  const handleCreateTeam = (name: string, description: string, defaultRole: BlogTeamRole) => {
    console.log('Creating team:', { name, description, defaultRole });
    // In real app, call API to create team
    // For demo, simulate team creation
    const newTeam: BlogTeam = {
      id: `team_${Date.now()}`,
      name: name,
      description: description,
      slug: name.toLowerCase().replace(/\s+/g, '-'),
      createdAt: new Date().toISOString(),
      createdBy: currentUserId,
      memberCount: 1,
      blogCount: 0,
      settings: {
        allowMemberInvites: true,
        requireApprovalForPosts: true,
        defaultRole: defaultRole
      }
    };
    
    // In real app, you would update the teams list here
    console.log('Team created:', newTeam);
    
    // Close create team modal and open invite modal for the new team
    setShowCreateTeamForm(false);
    setSelectedTeam(newTeam);
    setShowSkipInInvite(true); // Show skip button for newly created teams
    setShowInviteModal(true);
  };

  // Show team details view
  if (view === 'details' && selectedTeam) {
  return (
    <div className="space-y-6">
        {/* Back button and header */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => {
              setView('list');
              setSelectedTeam(null);
            }}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back to Teams</span>
          </button>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{selectedTeam.name} Management</h3>
              <p className="text-sm text-gray-500">{selectedTeam.description}</p>
            </div>
            {canUserManageTeam(currentUserId, selectedTeam.id) && (
              <button
                onClick={() => {
                  setShowSkipInInvite(false);
                  setShowInviteModal(true);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Invite Member
              </button>
            )}
          </div>

          {/* Team Members */}
          <div className="mb-6">
            <h4 className="font-medium text-gray-900 mb-3">Team Members</h4>
            <div className="space-y-3">
              {getTeamMembers(selectedTeam.id).map((member) => (
                <TeamMemberCard
                  key={member.id}
                  member={member}
                  canManage={canUserManageTeam(currentUserId, selectedTeam.id)}
                  onRoleChange={handleRoleChange}
                  onRemove={handleRemoveMember}
                />
              ))}
            </div>
          </div>

          {/* Team Settings */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Team Settings</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <span className="text-sm font-medium text-gray-900">Allow member invites</span>
                  <p className="text-xs text-gray-500">Members can invite others to the team</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                  selectedTeam.settings.allowMemberInvites ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {selectedTeam.settings.allowMemberInvites ? 'Enabled' : 'Disabled'}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <span className="text-sm font-medium text-gray-900">Require approval for posts</span>
                  <p className="text-xs text-gray-500">Posts need approval before publishing</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                  selectedTeam.settings.requireApprovalForPosts ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {selectedTeam.settings.requireApprovalForPosts ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            </div>
          </div>
        </div>

      {/* Modals */}
        <InviteMemberModal
          team={selectedTeam}
          isOpen={showInviteModal}
          onClose={() => {
            setShowInviteModal(false);
            setShowSkipInInvite(false);
          }}
          onInvite={handleInviteMember}
          showSkip={showSkipInInvite}
        />
      </div>
    );
  }

  // Show teams list view
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Teams</h2>
          <p className="text-sm text-gray-500">Manage your teams and collaborations</p>
        </div>
        <button
          onClick={() => setShowCreateTeamForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          Create New Team
        </button>
      </div>

      {/* Search */}
      {userTeams.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
              placeholder="Search teams by name or description..."
            />
          </div>
          {searchQuery && (
            <div className="mt-2 text-sm text-gray-600">
              Showing {filteredTeams.length} of {userTeams.length} teams
            </div>
          )}
        </div>
      )}

      {/* Teams List */}
      {userTeams.length > 0 ? (
        filteredTeams.length > 0 ? (
          <div className="w-full space-y-4">
            {filteredTeams.map((team) => {
            const userRole = getUserRoleInTeam(currentUserId, team.id);
            return (
              <div
                key={team.id}
                className={`p-6 border rounded-xl cursor-pointer transition-all duration-200 ${
                  selectedTeam?.id === team.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                }`}
                onClick={() => {
                  setSelectedTeam(team);
                  setView('details');
                }}
              >
                {/* Header with team info and role badge */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">{team.name.charAt(0)}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-lg">{team.name}</h3>
                      <p className="text-sm text-gray-500">Created {new Date(team.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      userRole?.role === 'owner' 
                        ? 'bg-purple-100 text-purple-800' 
                        : userRole?.role === 'editor'
                        ? 'bg-blue-100 text-blue-800'
                        : userRole?.role === 'contributor'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {userRole?.role}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{team.description}</p>

                {/* Team stats and settings indicators */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span>{team.memberCount} members</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span>{team.blogCount} posts</span>
                    </div>
                  </div>
                  
                  {/* Settings indicators */}
                  <div className="flex items-center space-x-2">
                    {team.settings.allowMemberInvites && (
                      <div className="flex items-center space-x-1 text-xs text-green-600">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>Invites</span>
                      </div>
                    )}
                    {team.settings.requireApprovalForPosts && (
                      <div className="flex items-center space-x-1 text-xs text-orange-600">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <span>Approval</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Team members avatars */}
                <div className="flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {getTeamMembers(team.id).slice(0, 5).map((member) => (
                      <div key={member.id} className="w-8 h-8 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center text-xs font-bold text-gray-700 border-2 border-white">
                        {member.userId.charAt(0).toUpperCase()}
                      </div>
                    ))}
                    {getTeamMembers(team.id).length > 5 && (
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-xs font-bold text-gray-500 border-2 border-white">
                        +{getTeamMembers(team.id).length - 5}
                      </div>
                    )}
                  </div>
                  
                  {/* Last activity or creation info */}
                  <div className="text-xs text-gray-400">
                    {team.blogCount > 0 ? 'Active' : 'New team'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No teams found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your search criteria</p>
              <button
                onClick={() => setSearchQuery("")}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Clear Search
              </button>
            </div>
          </div>
        )
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">👥</span>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No teams yet</h3>
          <p className="text-gray-500 mb-4">Create your first team to start collaborating</p>
          <button
            onClick={() => setShowCreateTeamForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Create Your First Team
          </button>
        </div>
      )}


      {/* Modals */}
      <CreateTeamModal
        isOpen={showCreateTeamForm}
        onClose={() => setShowCreateTeamForm(false)}
        onCreate={handleCreateTeam}
      />
    </div>
  );
}
