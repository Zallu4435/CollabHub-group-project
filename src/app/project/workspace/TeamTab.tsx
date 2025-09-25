// src/components/projects/workspace/TeamTab.tsx
import React, { useEffect, useMemo, useState } from 'react';
import { Project } from '../types';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { formatRelativeTime } from '../utils/dateUtils';
import { usePermissions } from './PermissionsContext';

interface TeamTabProps {
  project: Project;
  openInvite?: boolean;
  onInviteConsumed?: () => void;
}

interface TeamMember {
  id: number;
  name: string;
  email: string;
  avatar: string;
  role: 'owner' | 'admin' | 'editor' | 'viewer' | string;
  joinedAt: string;
  lastActive: string;
  status: 'active' | 'away' | 'offline';
}

// Extended mock team data
const mockTeamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: '/avatars/john.jpg',
    role: 'owner',
    joinedAt: '2024-08-01T10:00:00Z',
    lastActive: '2024-09-01T14:30:00Z',
    status: 'active'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    avatar: '/avatars/jane.jpg',
    role: 'admin',
    joinedAt: '2024-08-05T09:30:00Z',
    lastActive: '2024-09-01T12:15:00Z',
    status: 'active'
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    avatar: '/avatars/mike.jpg',
    role: 'editor',
    joinedAt: '2024-08-10T15:20:00Z',
    lastActive: '2024-08-31T18:45:00Z',
    status: 'away'
  },
  {
    id: 4,
    name: 'Sarah Wilson',
    email: 'sarah.wilson@example.com',
    avatar: '/avatars/sarah.jpg',
    role: 'editor',
    joinedAt: '2024-08-15T11:10:00Z',
    lastActive: '2024-08-30T16:20:00Z',
    status: 'offline'
  }
];

export const TeamTab: React.FC<TeamTabProps> = ({ project, openInvite, onInviteConsumed }) => {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [team, setTeam] = useState<TeamMember[]>(mockTeamMembers);
  const [search, setSearch] = useState('');
  const [invite, setInvite] = useState<{ name: string; email: string; role: TeamMember['role'] }>({ name: '', email: '', role: 'viewer' });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [roleModalFor, setRoleModalFor] = useState<TeamMember | null>(null);
  const [pendingRole, setPendingRole] = useState<string>('viewer');
  const [activeTeamTab, setActiveTeamTab] = useState<'members' | 'permissions'>('members');

  const { roles, listPermissions } = usePermissions();
  const currentUser = { id: 5, name: 'Regular User', role: (project.currentUserRole || 'user') as 'owner' | 'admin' | 'editor' | 'viewer' | 'user' };
  const roleDef = roles.find(r => r.id === currentUser.role) || roles.find(r => r.id === 'viewer')!;
  const canInvite = !!roleDef.permissions.invite_members;
  const canChangeRoles = !!roleDef.permissions.manage_roles;
  // Remove permissions: owner can remove anyone except owner; admin cannot remove owner/admin
  const canRemove = (member: TeamMember) => {
    if (currentUser.role === 'owner') return member.role !== 'owner';
    if (currentUser.role === 'admin') return member.role !== 'owner' && member.role !== 'admin';
    return false;
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'owner': return 'error';
      case 'admin': return 'warning';
      case 'editor': return 'success';
      case 'viewer': return 'default';
      default: return 'default';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const filtered = useMemo(() => {
    if (!search.trim()) return team;
    const q = search.toLowerCase();
    return team.filter(m => (m.name + ' ' + m.email).toLowerCase().includes(q));
  }, [team, search]);

  const updateMemberRole = (id: number, role: TeamMember['role']) => {
    if (!canChangeRoles) return;
    setTeam(prev => prev.map(m => m.id === id ? { ...m, role } : m));
    setEditingId(null);
  };

  const removeMember = (id: number) => {
    const m = team.find(x => x.id === id);
    if (!m) return;
    if (!canRemove(m)) return;
    setTeam(prev => prev.filter(member => member.id !== id));
  };

  const inviteMember = () => {
    if (!canInvite) return;
    if (!invite.email.trim() || !invite.name.trim()) return;
    const newMember: TeamMember = {
      id: Math.max(0, ...team.map(m => m.id)) + 1,
      name: invite.name.trim(),
      email: invite.email.trim(),
      avatar: '/avatars/user.jpg',
      role: invite.role,
      joinedAt: new Date().toISOString(),
      lastActive: new Date().toISOString(),
      status: 'active'
    };
    setTeam(prev => [newMember, ...prev]);
    setInvite({ name: '', email: '', role: 'viewer' });
    setShowInviteModal(false);
  };

  const openRoleModal = (member: TeamMember) => {
    setRoleModalFor(member);
    setPendingRole(member.role);
  };
  const applyRoleChange = () => {
    if (!roleModalFor) return;
    updateMemberRole(roleModalFor.id, pendingRole as TeamMember['role']);
    setRoleModalFor(null);
  };

  // Build permissions matrix from the full permission catalog
  const permissionKeys = listPermissions();
  const permissionLabel = (key: string) => key.replace(/_/g, ' ');
  const sortedRoles = [...roles].sort((a, b) => b.rank - a.rank);

  // Open invite modal when triggered externally
  useEffect(() => {
    if (openInvite && canInvite) {
      setShowInviteModal(true);
      onInviteConsumed && onInviteConsumed();
    }
  }, [openInvite, canInvite, onInviteConsumed]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-black">Team Members</h2>
          <p className="text-sm text-gray-600 mt-1">{filtered.length} members</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or email..."
              className="pl-3 pr-3 py-1.5 border border-gray-300 rounded text-sm text-black"
            />
          </div>
          {canInvite && (
            <Button size="sm" onClick={() => setShowInviteModal(true)}>
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              Invite Members
            </Button>
          )}
        </div>
      </div>

      {/* Team sub-tabs */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 text-sm">
        {[
          { id: 'members', label: 'Members' },
          { id: 'permissions', label: 'Permissions' },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTeamTab(t.id as 'members' | 'permissions')}
            className={`px-3 py-1.5 rounded-md ${activeTeamTab === t.id ? 'bg-white text-indigo-700 shadow' : 'text-gray-700 hover:text-gray-900'}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Team Members List */}
      {activeTeamTab === 'members' && (
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="grid grid-cols-12 gap-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
            <div className="col-span-4">Member</div>
            <div className="col-span-2">Role</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2">Last Active</div>
            <div className="col-span-2">Actions</div>
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          {filtered.map((member) => (
            <div key={member.id} className="px-6 py-4 hover:bg-gray-50">
              <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-4 flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-sm font-medium text-gray-600">
                      {member.name.charAt(0)}
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(member.status)}`}></div>
                  </div>
                  <div>
                    <p className="font-medium text-black">{member.name}</p>
                    <p className="text-sm text-gray-600">{member.email}</p>
                  </div>
                </div>
                <div className="col-span-2">
                  <Badge variant={getRoleColor(member.role)} size="sm">
                    {roles.find(r => r.id === member.role)?.label || (member.role.charAt(0).toUpperCase() + member.role.slice(1))}
                  </Badge>
                </div>
                <div className="col-span-2">
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(member.status)}`}></div>
                    <span className="text-sm text-gray-600 capitalize">{member.status}</span>
                  </div>
                </div>
                <div className="col-span-2">
                  <span className="text-sm text-gray-600">{formatRelativeTime(member.lastActive)}</span>
                </div>
                <div className="col-span-2">
                  <div className="flex items-center space-x-2">
                    {canChangeRoles && member.role !== 'owner' && (
                      <button className="text-gray-400 hover:text-indigo-600" onClick={() => openRoleModal(member)} title="Change role">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                    )}
                    {canRemove(member) && (
                      <button className="text-gray-400 hover:text-red-600" onClick={() => removeMember(member.id)} title="Remove">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      )}

      {/* Permissions Matrix */}
      {activeTeamTab === 'permissions' && (
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-black">Permissions</h3>
          <p className="text-sm text-gray-600 mt-1">These reflect the role settings from Access Control.</p>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Permission</th>
                  {sortedRoles.map(r => (
                    <th key={r.id} className="text-center text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">{r.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="space-y-2">
                {permissionKeys.map((key, index) => (
                  <tr key={String(key)} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="py-2 px-2 text-sm text-black capitalize">{permissionLabel(String(key))}</td>
                    {sortedRoles.map(r => (
                      <td key={r.id} className="py-2 px-2 text-center">
                        {r.permissions[key] ? (
                          <svg className="w-5 h-5 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        ) : (
                          <svg className="w-5 h-5 text-gray-300 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      )}

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-black">Invite Member</h3>
              <button onClick={() => setShowInviteModal(false)} className="text-gray-500 hover:text-black">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-black mb-1">Name</label>
                <input value={invite.name} onChange={(e) => setInvite(i => ({ ...i, name: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-black" placeholder="Full name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-1">Email</label>
                <input value={invite.email} onChange={(e) => setInvite(i => ({ ...i, email: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-black" placeholder="email@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-1">Role</label>
                <select value={invite.role} onChange={(e) => setInvite(i => ({ ...i, role: e.target.value as TeamMember['role'] }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-black">
                  {roles.filter(r => r.id !== 'owner').map(r => (
                    <option key={r.id} value={r.id}>{r.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setShowInviteModal(false)}>Cancel</Button>
              <Button onClick={inviteMember} disabled={!invite.email.trim() || !invite.name.trim()}>Send Invite</Button>
            </div>
          </div>
        </div>
      )}

      {/* Role Change Modal */}
      {roleModalFor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-black">Change Role</h3>
              <button onClick={() => setRoleModalFor(null)} className="text-gray-500 hover:text-black">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>
            <div className="space-y-4">
              <div className="text-sm text-gray-700">{roleModalFor.name} ({roleModalFor.email})</div>
              <div>
                <label className="block text-sm font-medium text-black mb-1">Select Role</label>
                <select value={pendingRole} onChange={(e) => setPendingRole(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-black">
                  {roles.filter(r => r.id !== 'owner').map(r => (
                    <option key={r.id} value={r.id}>{r.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setRoleModalFor(null)}>Cancel</Button>
              <Button onClick={applyRoleChange}>Change</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
