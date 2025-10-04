import type { Role } from '../types/blog-admin';

export type Ability =
  | 'post:create' | 'post:edit' | 'post:delete' | 'post:publish'
  | 'author:manage' | 'moderation:review' | 'seo:manage'
  | 'taxonomy:manage' | 'media:manage' | 'comment:moderate'
  | 'distribution:manage' | 'settings:manage' | 'analytics:view';

const roleAbilities: Record<Role, Ability[]> = {
  admin: ['post:create', 'post:edit', 'post:delete', 'post:publish', 'author:manage', 'moderation:review', 'seo:manage', 'taxonomy:manage', 'media:manage', 'comment:moderate', 'distribution:manage', 'settings:manage', 'analytics:view'],
  editor: ['post:create', 'post:edit', 'post:publish', 'moderation:review', 'seo:manage', 'taxonomy:manage', 'comment:moderate', 'analytics:view'],
  contributor: ['post:create', 'post:edit', 'analytics:view'],
  analyst: ['analytics:view'],
};

export const can = (role: Role, ability: Ability): boolean => {
  return roleAbilities[role]?.includes(ability) ?? false;
};

export const useRole = () => {
  return 'admin' as Role;
};

export const useCan = () => {
  const role = useRole();
  return (ability: Ability) => can(role, ability);
};
