"use client";

import { BlogTeamMember, BlogTeamRole } from "../../types";

interface TeamMemberCardProps {
  member: BlogTeamMember;
  canManage: boolean;
  onRoleChange: (memberId: string, newRole: BlogTeamRole) => void;
  onRemove: (memberId: string) => void;
}

export default function TeamMemberCard({ member, canManage, onRoleChange, onRemove }: TeamMemberCardProps) {
  const getRoleBadgeColor = (role: BlogTeamRole) => {
    switch (role) {
      case 'owner': return 'bg-red-100 text-red-800';
      case 'editor': return 'bg-blue-100 text-blue-800';
      case 'contributor': return 'bg-green-100 text-green-800';
      case 'viewer': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:shadow-sm transition-all duration-200">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
          <span className="text-sm font-semibold text-white">U</span>
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <span className="font-medium text-gray-900">User {member.userId}</span>
            <span className={`px-2 py-1 text-xs rounded-full font-medium ${getRoleBadgeColor(member.role)}`}>
              {member.role}
            </span>
            <span className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusBadgeColor(member.status)}`}>
              {member.status}
            </span>
          </div>
          <p className="text-sm text-gray-500">
            Joined {new Date(member.joinedAt).toLocaleDateString()}
          </p>
        </div>
      </div>
      
      {canManage && member.role !== 'owner' && (
        <div className="flex items-center space-x-2">
          <select
            value={member.role}
            onChange={(e) => onRoleChange(member.id, e.target.value as BlogTeamRole)}
            className="text-sm border border-gray-300 rounded px-2 py-1"
          >
            <option value="editor">Editor</option>
            <option value="contributor">Contributor</option>
            <option value="viewer">Viewer</option>
          </select>
          <button
            onClick={() => onRemove(member.id)}
            className="p-1 text-red-600 hover:text-red-700 transition-colors"
            title="Remove member"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
