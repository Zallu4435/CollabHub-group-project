"use client";

import React, { createContext, useContext, useMemo, useState } from 'react';

export type PermissionKey =
  | 'view_project'
  | 'edit_project'
  | 'invite_members'
  | 'remove_members'
  | 'manage_roles'
  | 'create_tasks'
  | 'edit_tasks'
  | 'delete_tasks'
  | 'upload_files'
  | 'delete_files'
  | 'view_analytics'
  | 'manage_integrations'
  | 'manage_webhooks'
  | 'manage_notifications'
  | 'manage_payments'
  | 'delete_project';

export interface RoleDefinition {
  id: string; // e.g., owner, admin, editor, viewer, custom-xyz
  label: string;
  system?: boolean; // cannot delete if true
  permissions: Record<PermissionKey, boolean>;
  rank: number; // higher means more authority for tie-breaks (owner highest)
}

interface PermissionsContextValue {
  roles: RoleDefinition[];
  addRole: (role: Omit<RoleDefinition, 'id' | 'system' | 'rank'> & { id?: string; rank?: number }) => void;
  updateRole: (id: string, updates: Partial<Omit<RoleDefinition, 'id'>>) => void;
  deleteRole: (id: string) => void;
  getRole: (id: string) => RoleDefinition | undefined;
  listPermissions: () => PermissionKey[];
}

const defaultPermissions: PermissionKey[] = [
  'view_project',
  'edit_project',
  'invite_members',
  'remove_members',
  'manage_roles',
  'create_tasks',
  'edit_tasks',
  'delete_tasks',
  'upload_files',
  'delete_files',
  'view_analytics',
  'manage_integrations',
  'manage_webhooks',
  'manage_notifications',
  'manage_payments',
  'delete_project'
];

function allowAll(): Record<PermissionKey, boolean> {
  return defaultPermissions.reduce((acc, k) => { acc[k] = true; return acc; }, {} as Record<PermissionKey, boolean>);
}

function allowSome(keys: PermissionKey[]): Record<PermissionKey, boolean> {
  const map = defaultPermissions.reduce((acc, k) => { acc[k] = false; return acc; }, {} as Record<PermissionKey, boolean>);
  keys.forEach(k => { map[k] = true; });
  return map;
}

const defaultRoles: RoleDefinition[] = [
  {
    id: 'owner',
    label: 'Owner',
    system: true,
    rank: 100,
    permissions: allowAll()
  },
  {
    id: 'admin',
    label: 'Admin',
    system: true,
    rank: 80,
    permissions: allowSome([
      'view_project','edit_project','invite_members','remove_members','manage_roles',
      'create_tasks','edit_tasks','delete_tasks','upload_files','delete_files',
      'view_analytics','manage_integrations','manage_webhooks','manage_notifications','manage_payments'
    ])
  },
  {
    id: 'editor',
    label: 'Editor',
    system: true,
    rank: 50,
    permissions: allowSome([
      'view_project','create_tasks','edit_tasks','upload_files','view_analytics'
    ])
  },
  {
    id: 'viewer',
    label: 'Viewer',
    system: true,
    rank: 10,
    permissions: allowSome(['view_project','view_analytics'])
  }
];

const PermissionsContext = createContext<PermissionsContextValue | null>(null);

export const PermissionsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [roles, setRoles] = useState<RoleDefinition[]>(defaultRoles);

  const addRole: PermissionsContextValue['addRole'] = (role) => {
    const id = role.id || `custom-${Math.random().toString(36).slice(2, 8)}`;
    const rank = role.rank ?? 30;
    setRoles(prev => [...prev, { id, label: role.label, permissions: role.permissions, rank }]);
  };

  const updateRole: PermissionsContextValue['updateRole'] = (id, updates) => {
    setRoles(prev => prev.map(r => r.id === id ? { ...r, ...updates } : r));
  };

  const deleteRole: PermissionsContextValue['deleteRole'] = (id) => {
    const target = roles.find(r => r.id === id);
    if (target?.system) return;
    setRoles(prev => prev.filter(r => r.id !== id));
  };

  const getRole = (id: string) => roles.find(r => r.id === id);
  const listPermissions = () => defaultPermissions;

  const value = useMemo(() => ({ roles, addRole, updateRole, deleteRole, getRole, listPermissions }), [roles]);

  return (
    <PermissionsContext.Provider value={value}>{children}</PermissionsContext.Provider>
  );
};

export function usePermissions(): PermissionsContextValue {
  const ctx = useContext(PermissionsContext);
  if (!ctx) throw new Error('usePermissions must be used within PermissionsProvider');
  return ctx;
}


