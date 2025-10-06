'use client';

import React, { useState } from 'react';
import { 
  FiUsers, 
  FiUserPlus, 
  FiShield, 
  FiKey,
  FiEye,
  FiEdit,
  FiTrash2,
  FiSearch,
  FiRefreshCw,
  FiDownload,
  FiAward,
  FiTrendingUp,
  FiBarChart2,
  FiClock,
  FiCheckCircle,
  FiAlertTriangle,
  FiLock,
  FiTarget,
  FiPlus,
} from 'react-icons/fi';

// Types
interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  role: 'super_admin' | 'admin' | 'project_manager' | 'developer' | 'designer' | 'viewer' | 'guest';
  status: 'active' | 'inactive' | 'suspended' | 'pending';
  joinDate: string;
  lastActive: string;
  timezone: string;
  language: string;
  department?: string;
  position?: string;
  manager?: string;
  skills: string[];
  certifications: string[];
  projects: {
    id: string;
    name: string;
    role: string;
    status: string;
  }[];
  permissions: {
    id: string;
    name: string;
    resource: string;
    action: string;
    granted: boolean;
    grantedBy: string;
    grantedAt: string;
    expiresAt?: string;
  }[];
  activity: {
    loginCount: number;
    lastLogin: string;
    sessionDuration: number;
    actionsPerformed: number;
    filesUploaded: number;
    messagesSent: number;
    tasksCompleted: number;
  };
  security: {
    twoFactorEnabled: boolean;
    passwordLastChanged: string;
    failedLoginAttempts: number;
    lastFailedLogin?: string;
    ipWhitelist: string[];
    deviceTrusted: boolean;
  };
  performance: {
    productivityScore: number;
    collaborationScore: number;
    qualityScore: number;
    punctualityScore: number;
    overallRating: number;
  };
}

interface Role {
  id: string;
  name: string;
  description: string;
  level: number;
  permissions: string[];
  isSystem: boolean;
  userCount: number;
  createdAt: string;
  createdBy: string;
}

interface Permission {
  id: string;
  name: string;
  resource: string;
  action: string;
  description: string;
  category: string;
  isDangerous: boolean;
}

// Mock data
const mockUsers: User[] = [
  {
    id: 'user-1',
    username: 'john.doe',
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    avatar: '/avatars/john.jpg',
    role: 'project_manager',
    status: 'active',
    joinDate: '2023-08-15T00:00:00Z',
    lastActive: '2024-01-15T09:30:00Z',
    timezone: 'UTC-5',
    language: 'en',
    department: 'Engineering',
    position: 'Senior Project Manager',
    manager: 'admin-1',
    skills: ['Project Management', 'Agile', 'Leadership', 'Communication'],
    certifications: ['PMP', 'Scrum Master'],
    projects: [
      { id: 'proj-1', name: 'E-Commerce Platform', role: 'Project Manager', status: 'active' },
      { id: 'proj-2', name: 'Mobile Banking App', role: 'Project Manager', status: 'completed' }
    ],
    permissions: [
      { id: 'perm-1', name: 'Create Projects', resource: 'projects', action: 'create', granted: true, grantedBy: 'admin-1', grantedAt: '2023-08-15T00:00:00Z' },
      { id: 'perm-2', name: 'Manage Teams', resource: 'teams', action: 'manage', granted: true, grantedBy: 'admin-1', grantedAt: '2023-08-15T00:00:00Z' }
    ],
    activity: {
      loginCount: 245,
      lastLogin: '2024-01-15T09:30:00Z',
      sessionDuration: 480,
      actionsPerformed: 1250,
      filesUploaded: 89,
      messagesSent: 456,
      tasksCompleted: 234
    },
    security: {
      twoFactorEnabled: true,
      passwordLastChanged: '2024-01-01T00:00:00Z',
      failedLoginAttempts: 0,
      deviceTrusted: true,
      ipWhitelist: ['192.168.1.100', '10.0.0.50']
    },
    performance: {
      productivityScore: 92,
      collaborationScore: 88,
      qualityScore: 95,
      punctualityScore: 90,
      overallRating: 91
    }
  },
  {
    id: 'user-2',
    username: 'sarah.chen',
    email: 'sarah.chen@example.com',
    firstName: 'Sarah',
    lastName: 'Chen',
    avatar: '/avatars/sarah.jpg',
    role: 'developer',
    status: 'active',
    joinDate: '2023-09-01T00:00:00Z',
    lastActive: '2024-01-15T08:45:00Z',
    timezone: 'UTC-8',
    language: 'en',
    department: 'Engineering',
    position: 'Senior Developer',
    manager: 'user-1',
    skills: ['React', 'Node.js', 'TypeScript', 'Python', 'AWS'],
    certifications: ['AWS Developer', 'React Certified'],
    projects: [
      { id: 'proj-1', name: 'E-Commerce Platform', role: 'Lead Developer', status: 'active' },
      { id: 'proj-3', name: 'AI Chatbot System', role: 'Developer', status: 'active' }
    ],
    permissions: [
      { id: 'perm-3', name: 'Edit Code', resource: 'code', action: 'edit', granted: true, grantedBy: 'user-1', grantedAt: '2023-09-01T00:00:00Z' },
      { id: 'perm-4', name: 'Deploy Applications', resource: 'deployments', action: 'create', granted: true, grantedBy: 'admin-1', grantedAt: '2023-09-01T00:00:00Z' }
    ],
    activity: {
      loginCount: 189,
      lastLogin: '2024-01-15T08:45:00Z',
      sessionDuration: 420,
      actionsPerformed: 2100,
      filesUploaded: 156,
      messagesSent: 234,
      tasksCompleted: 189
    },
    security: {
      twoFactorEnabled: true,
      passwordLastChanged: '2023-12-15T00:00:00Z',
      failedLoginAttempts: 1,
      lastFailedLogin: '2024-01-10T14:30:00Z',
      deviceTrusted: true,
      ipWhitelist: ['192.168.1.101']
    },
    performance: {
      productivityScore: 95,
      collaborationScore: 85,
      qualityScore: 98,
      punctualityScore: 88,
      overallRating: 92
    }
  }
];

const mockRoles: Role[] = [
  {
    id: 'role-1',
    name: 'Super Admin',
    description: 'Full system access and control',
    level: 100,
    permissions: ['*'],
    isSystem: true,
    userCount: 2,
    createdAt: '2023-01-01T00:00:00Z',
    createdBy: 'system'
  },
  {
    id: 'role-2',
    name: 'Project Manager',
    description: 'Manage projects and teams',
    level: 80,
    permissions: ['projects:create', 'projects:edit', 'teams:manage', 'tasks:assign'],
    isSystem: false,
    userCount: 5,
    createdAt: '2023-01-01T00:00:00Z',
    createdBy: 'admin-1'
  },
  {
    id: 'role-3',
    name: 'Developer',
    description: 'Develop and maintain applications',
    level: 60,
    permissions: ['code:edit', 'files:upload', 'tasks:complete'],
    isSystem: false,
    userCount: 12,
    createdAt: '2023-01-01T00:00:00Z',
    createdBy: 'admin-1'
  }
];

const mockPermissions: Permission[] = [
  {
    id: 'perm-1',
    name: 'Create Projects',
    resource: 'projects',
    action: 'create',
    description: 'Create new projects',
    category: 'Project Management',
    isDangerous: false
  },
  {
    id: 'perm-2',
    name: 'Delete Projects',
    resource: 'projects',
    action: 'delete',
    description: 'Delete projects permanently',
    category: 'Project Management',
    isDangerous: true
  },
  {
    id: 'perm-3',
    name: 'Manage Users',
    resource: 'users',
    action: 'manage',
    description: 'Add, edit, and remove users',
    category: 'User Management',
    isDangerous: true
  },
  {
    id: 'perm-4',
    name: 'System Administration',
    resource: 'system',
    action: 'admin',
    description: 'Full system administration access',
    category: 'System',
    isDangerous: true
  }
];

export default function AdvancedUserManagement() {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'roles' | 'permissions' | 'security' | 'analytics'>('overview');
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [roles, setRoles] = useState<Role[]>(mockRoles);
  const [permissions, setPermissions] = useState<Permission[]>(mockPermissions);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [showAddUser, setShowAddUser] = useState(false);
  const [showAddRole, setShowAddRole] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const StatCard = ({ title, value, icon, iconBg, iconColor, trend, trendValue, subtitle }: {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    iconBg: string;
    iconColor: string;
    trend?: 'up' | 'down' | 'neutral';
    trendValue?: string;
    subtitle?: string;
  }) => (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
          {trend && trendValue && (
            <div className={`flex items-center mt-2 text-sm ${
              trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600'
            }`}>
              <FiTrendingUp className={`mr-1 ${trend === 'down' ? 'rotate-180' : ''}`} size={14} />
              {trendValue}
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${iconBg}`}>
          <div className={iconColor}>{icon}</div>
        </div>
      </div>
    </div>
  );

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={users.length}
          icon={<FiUsers size={24} />}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
          trend="up"
          trendValue="+12.5%"
          subtitle={`${users.filter(u => u.status === 'active').length} active`}
        />
        <StatCard
          title="Roles"
          value={roles.length}
          icon={<FiShield size={24} />}
          iconBg="bg-green-50"
          iconColor="text-green-600"
          trend="neutral"
          trendValue="0%"
          subtitle="Permission levels"
        />
        <StatCard
          title="Avg Performance"
          value={`${Math.round(users.reduce((sum, u) => sum + u.performance.overallRating, 0) / users.length)}%`}
          icon={<FiTarget size={24} />}
          iconBg="bg-purple-50"
          iconColor="text-purple-600"
          trend="up"
          trendValue="+3.1%"
          subtitle="User rating"
        />
        <StatCard
          title="Security Score"
          value="94%"
          icon={<FiLock size={24} />}
          iconBg="bg-orange-50"
          iconColor="text-orange-600"
          trend="up"
          trendValue="+2.1%"
          subtitle="System security"
        />
      </div>

      {/* User Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Users by Role</h3>
          <div className="space-y-3">
            {roles.map((role) => (
              <div key={role.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-3 ${
                    role.level >= 80 ? 'bg-red-500' :
                    role.level >= 60 ? 'bg-orange-500' :
                    role.level >= 40 ? 'bg-yellow-500' :
                    'bg-green-500'
                  }`}></div>
                  <span className="text-sm font-medium text-gray-900">{role.name}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{role.userCount}</div>
                  <div className="text-xs text-gray-500">Level {role.level}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {users.slice(0, 5).map((user) => (
              <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <img className="h-8 w-8 rounded-full" src={user.avatar} alt={user.username} />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{user.firstName} {user.lastName}</p>
                    <p className="text-xs text-gray-500">{user.activity.actionsPerformed} actions today</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-900">{user.performance.overallRating}%</p>
                  <p className="text-xs text-gray-500">Performance</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Roles</option>
            <option value="super_admin">Super Admin</option>
            <option value="admin">Admin</option>
            <option value="project_manager">Project Manager</option>
            <option value="developer">Developer</option>
            <option value="designer">Designer</option>
            <option value="viewer">Viewer</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
            <option value="pending">Pending</option>
          </select>
        </div>
        <button
          onClick={() => setShowAddUser(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <FiUserPlus size={16} />
          Add User
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Active
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Security
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img className="h-10 w-10 rounded-full mr-4" src={user.avatar} alt={user.username} />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{user.firstName} {user.lastName}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      user.role === 'super_admin' ? 'bg-red-100 text-red-800' :
                      user.role === 'admin' ? 'bg-orange-100 text-orange-800' :
                      user.role === 'project_manager' ? 'bg-blue-100 text-blue-800' :
                      user.role === 'developer' ? 'bg-green-100 text-green-800' :
                      user.role === 'designer' ? 'bg-purple-100 text-purple-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {user.role.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      user.status === 'active' ? 'bg-green-100 text-green-800' :
                      user.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                      user.status === 'suspended' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(user.lastActive).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className={`h-2 rounded-full ${
                            user.performance.overallRating >= 90 ? 'bg-green-600' :
                            user.performance.overallRating >= 80 ? 'bg-blue-600' :
                            user.performance.overallRating >= 70 ? 'bg-yellow-600' :
                            'bg-red-600'
                          }`}
                          style={{ width: `${user.performance.overallRating}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-900">{user.performance.overallRating}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {user.security.twoFactorEnabled && (
                        <FiShield className="text-green-600" size={16} title="2FA Enabled" />
                      )}
                      {user.security.deviceTrusted && (
                        <FiCheckCircle className="text-green-600" size={16} title="Trusted Device" />
                      )}
                      {user.security.failedLoginAttempts > 0 && (
                        <FiAlertTriangle className="text-yellow-600" size={16} title="Failed Logins" />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => setSelectedUser(user)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <FiEye size={16} />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <FiEdit size={16} />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderRoles = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Role Management</h2>
        <button
          onClick={() => setShowAddRole(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <FiPlus size={16} />
          Create Role
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roles.map((role) => (
          <div key={role.id} className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{role.name}</h3>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                role.level >= 80 ? 'bg-red-100 text-red-800' :
                role.level >= 60 ? 'bg-orange-100 text-orange-800' :
                role.level >= 40 ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                Level {role.level}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-4">{role.description}</p>
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Users</span>
                <span className="font-medium text-gray-900">{role.userCount}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Permissions</span>
                <span className="font-medium text-gray-900">{role.permissions.length}</span>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="flex-1 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 text-sm">
                <FiEdit size={14} className="inline mr-1" />
                Edit
              </button>
              <button className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm">
                <FiEye size={14} className="inline mr-1" />
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPermissions = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Permission Management</h2>
      
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Permission
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Resource
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Risk Level
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {permissions.map((permission) => (
                <tr key={permission.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{permission.name}</div>
                      <div className="text-sm text-gray-500">{permission.description}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {permission.resource}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {permission.action}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {permission.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      permission.isDangerous ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {permission.isDangerous ? 'High Risk' : 'Low Risk'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <FiEdit size={16} />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <FiEye size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderSecurity = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Security Management</h2>
      
      {/* Security Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="2FA Enabled"
          value={`${users.filter(u => u.security.twoFactorEnabled).length}/${users.length}`}
          icon={<FiShield size={24} />}
          iconBg="bg-green-50"
          iconColor="text-green-600"
          trend="up"
          trendValue="+5.2%"
        />
        <StatCard
          title="Trusted Devices"
          value={`${users.filter(u => u.security.deviceTrusted).length}/${users.length}`}
          icon={<FiCheckCircle size={24} />}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
          trend="up"
          trendValue="+8.1%"
        />
        <StatCard
          title="Failed Logins"
          value={users.reduce((sum, u) => sum + u.security.failedLoginAttempts, 0)}
          icon={<FiAlertTriangle size={24} />}
          iconBg="bg-yellow-50"
          iconColor="text-yellow-600"
          trend="down"
          trendValue="-12.3%"
        />
        <StatCard
          title="Security Score"
          value="94%"
          icon={<FiLock size={24} />}
          iconBg="bg-purple-50"
          iconColor="text-purple-600"
          trend="up"
          trendValue="+2.1%"
        />
      </div>

      {/* Security Settings */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Policies</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Password Policy</h4>
              <p className="text-sm text-gray-500">Minimum 8 characters, mixed case, numbers, symbols</p>
            </div>
            <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 text-sm">
              Configure
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Session Timeout</h4>
              <p className="text-sm text-gray-500">Auto-logout after 8 hours of inactivity</p>
            </div>
            <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 text-sm">
              Configure
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">IP Whitelist</h4>
              <p className="text-sm text-gray-500">Restrict access to specific IP addresses</p>
            </div>
            <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 text-sm">
              Configure
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">User Analytics</h2>
      
      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Avg Productivity"
          value={`${Math.round(users.reduce((sum, u) => sum + u.performance.productivityScore, 0) / users.length)}%`}
          icon={<FiTarget size={24} />}
          iconBg="bg-green-50"
          iconColor="text-green-600"
          trend="up"
          trendValue="+3.2%"
        />
        <StatCard
          title="Avg Collaboration"
          value={`${Math.round(users.reduce((sum, u) => sum + u.performance.collaborationScore, 0) / users.length)}%`}
          icon={<FiUsers size={24} />}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
          trend="up"
          trendValue="+1.8%"
        />
        <StatCard
          title="Avg Quality"
          value={`${Math.round(users.reduce((sum, u) => sum + u.performance.qualityScore, 0) / users.length)}%`}
          icon={<FiAward size={24} />}
          iconBg="bg-purple-50"
          iconColor="text-purple-600"
          trend="up"
          trendValue="+2.5%"
        />
        <StatCard
          title="Avg Punctuality"
          value={`${Math.round(users.reduce((sum, u) => sum + u.performance.punctualityScore, 0) / users.length)}%`}
          icon={<FiClock size={24} />}
          iconBg="bg-orange-50"
          iconColor="text-orange-600"
          trend="down"
          trendValue="-0.8%"
        />
      </div>

      {/* Top Performers */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performers</h3>
        <div className="space-y-3">
          {users
            .sort((a, b) => b.performance.overallRating - a.performance.overallRating)
            .slice(0, 5)
            .map((user, index) => (
              <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                    {index + 1}
                  </div>
                  <img className="h-8 w-8 rounded-full" src={user.avatar} alt={user.username} />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{user.firstName} {user.lastName}</p>
                    <p className="text-xs text-gray-500">{user.role.replace('_', ' ')}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{user.performance.overallRating}%</p>
                  <p className="text-xs text-gray-500">Overall Rating</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Advanced User Management</h1>
          <p className="text-sm text-gray-500 mt-1">
            Comprehensive user administration with role-based access control
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
            <FiRefreshCw size={16} />
            Refresh
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
            <FiDownload size={16} />
            Export Report
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'overview', label: 'Overview', icon: <FiBarChart2 size={16} /> },
            { id: 'users', label: 'Users', icon: <FiUsers size={16} /> },
            { id: 'roles', label: 'Roles', icon: <FiShield size={16} /> },
            { id: 'permissions', label: 'Permissions', icon: <FiKey size={16} /> },
            { id: 'security', label: 'Security', icon: <FiLock size={16} /> },
            { id: 'analytics', label: 'Analytics', icon: <FiTrendingUp size={16} /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'users' && renderUsers()}
      {activeTab === 'roles' && renderRoles()}
      {activeTab === 'permissions' && renderPermissions()}
      {activeTab === 'security' && renderSecurity()}
      {activeTab === 'analytics' && renderAnalytics()}
    </div>
  );
}
