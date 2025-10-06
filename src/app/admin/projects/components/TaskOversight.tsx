'use client';

import { useState } from 'react';
import { Task, TaskStatus, TaskPriority } from '../types/project-admin';
import toast from 'react-hot-toast';
import { 
  FiCheckSquare,
  FiClock,
  FiAlertCircle,
  FiUser,
  FiFolder,
  FiEye,
  FiCheck,
  FiX,
  FiTrash2,
  FiSearch,
  FiRefreshCw,
  FiCalendar,
  FiTag,
  FiTrendingUp,
  FiAlertTriangle,
  FiMessageSquare
} from 'react-icons/fi';

// Mock tasks
const mockTasks: Task[] = [
  {
    id: 'task-1',
    projectId: 'proj-1',
    projectName: 'E-Commerce Platform',
    title: 'Implement payment gateway integration',
    description: 'Integrate Stripe payment API for secure transactions',
    status: 'in-progress',
    priority: 'high',
    assignedTo: 'user-1',
    assignedToName: 'John Doe',
    createdBy: 'user-2',
    createdByName: 'Jane Smith',
    createdAt: new Date(2025, 9, 1).toISOString(),
    updatedAt: new Date(2025, 9, 4, 10, 30).toISOString(),
    deadline: new Date(2025, 9, 10).toISOString(),
    labels: ['backend', 'payment', 'critical'],
    redoCount: 0,
    timeSpent: 180,
    history: [
      { action: 'Created', by: 'Jane Smith', timestamp: new Date(2025, 9, 1).toISOString(), details: 'Task created' },
      { action: 'Assigned', by: 'Jane Smith', timestamp: new Date(2025, 9, 1, 1, 0).toISOString(), details: 'Assigned to John Doe' },
    ],
  },
  {
    id: 'task-2',
    projectId: 'proj-2',
    projectName: 'Mobile Banking App',
    title: 'Design user authentication flow',
    description: 'Create wireframes for biometric login',
    status: 'review',
    priority: 'high',
    assignedTo: 'user-3',
    assignedToName: 'Mike Johnson',
    createdBy: 'user-2',
    createdByName: 'Jane Smith',
    createdAt: new Date(2025, 9, 2).toISOString(),
    updatedAt: new Date(2025, 9, 4, 9, 15).toISOString(),
    deadline: new Date(2025, 9, 8).toISOString(),
    labels: ['design', 'ui/ux', 'security'],
    redoCount: 1,
    timeSpent: 240,
    history: [
      { action: 'Created', by: 'Jane Smith', timestamp: new Date(2025, 9, 2).toISOString(), details: 'Task created' },
      { action: 'Completed', by: 'Mike Johnson', timestamp: new Date(2025, 9, 3).toISOString(), details: 'Submitted for review' },
      { action: 'Redo Requested', by: 'Jane Smith', timestamp: new Date(2025, 9, 3, 12, 0).toISOString(), details: 'Need accessibility improvements' },
      { action: 'Resubmitted', by: 'Mike Johnson', timestamp: new Date(2025, 9, 4, 9, 0).toISOString(), details: 'Fixed accessibility issues' },
    ],
  },
  {
    id: 'task-3',
    projectId: 'proj-1',
    projectName: 'E-Commerce Platform',
    title: 'Fix cart calculation bug',
    description: 'Cart total not updating correctly with discounts',
    status: 'redo',
    priority: 'critical',
    assignedTo: 'user-1',
    assignedToName: 'John Doe',
    createdBy: 'user-4',
    createdByName: 'Sarah Williams',
    createdAt: new Date(2025, 9, 3).toISOString(),
    updatedAt: new Date(2025, 9, 4, 8, 30).toISOString(),
    deadline: new Date(2025, 9, 5).toISOString(),
    labels: ['bug', 'frontend', 'urgent'],
    redoCount: 2,
    timeSpent: 320,
    history: [
      { action: 'Created', by: 'Sarah Williams', timestamp: new Date(2025, 9, 3).toISOString(), details: 'Bug reported' },
      { action: 'Fixed', by: 'John Doe', timestamp: new Date(2025, 9, 3, 14, 0).toISOString(), details: 'Initial fix submitted' },
      { action: 'Redo', by: 'Sarah Williams', timestamp: new Date(2025, 9, 3, 16, 0).toISOString(), details: 'Issue still persists' },
      { action: 'Fixed Again', by: 'John Doe', timestamp: new Date(2025, 9, 4, 8, 0).toISOString(), details: 'Applied different approach' },
    ],
  },
  {
    id: 'task-4',
    projectId: 'proj-3',
    projectName: 'AI Chatbot Integration',
    title: 'Train chatbot on FAQ dataset',
    description: 'Fine-tune model with company FAQ data',
    status: 'done',
    priority: 'medium',
    assignedTo: 'user-3',
    assignedToName: 'Mike Johnson',
    createdBy: 'user-3',
    createdByName: 'Mike Johnson',
    createdAt: new Date(2025, 8, 28).toISOString(),
    updatedAt: new Date(2025, 9, 2).toISOString(),
    labels: ['ai', 'training', 'nlp'],
    redoCount: 0,
    timeSpent: 480,
    history: [
      { action: 'Created', by: 'Mike Johnson', timestamp: new Date(2025, 8, 28).toISOString(), details: 'Task created' },
      { action: 'Started', by: 'Mike Johnson', timestamp: new Date(2025, 8, 29).toISOString(), details: 'Training initiated' },
      { action: 'Completed', by: 'Mike Johnson', timestamp: new Date(2025, 9, 2).toISOString(), details: 'Model training completed' },
    ],
  },
];

export default function TaskOversight() {
  const [tasks, setTasks] = useState(mockTasks);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'all'>('all');
  const [priorityFilter, setPriorityFilter] = useState<TaskPriority | 'all'>('all');
  const [projectFilter, setProjectFilter] = useState('all');
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);

  const filteredTasks = tasks.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         t.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || t.priority === priorityFilter;
    const matchesProject = projectFilter === 'all' || t.projectId === projectFilter;
    return matchesSearch && matchesStatus && matchesPriority && matchesProject;
  });

  // Remove duplicate project ids from the projects array
  const projects = Array.from(
    new Map(tasks.map(t => [t.projectId, { id: t.projectId, name: t.projectName }])).values()
  );

  const handleApprove = (taskId: string) => {
    setTasks(tasks.map(t => 
      t.id === taskId ? { ...t, status: 'done', updatedAt: new Date().toISOString() } : t
    ));
    toast.success('Task approved and marked as done');
  };

  const handleReject = (taskId: string, reason: string) => {
    setTasks(tasks.map(t => 
      t.id === taskId ? { 
        ...t, 
        status: 'redo', 
        redoCount: t.redoCount + 1,
        updatedAt: new Date().toISOString(),
        history: [...t.history, {
          action: 'Redo Requested',
          by: 'Admin',
          timestamp: new Date().toISOString(),
          details: reason,
        }]
      } : t
    ));
    toast.success('Task sent back for rework');
  };

  const handleReassign = (taskId: string, newAssignee: string) => {
    setTasks(tasks.map(t => 
      t.id === taskId ? { ...t, assignedTo: newAssignee, updatedAt: new Date().toISOString() } : t
    ));
    toast.success('Task reassigned');
  };

  const handleDelete = (taskId: string) => {
    if (confirm('Delete this task?')) {
      setTasks(tasks.filter(t => t.id !== taskId));
      toast.success('Task deleted');
    }
  };

  const handleBulkAction = (action: 'approve' | 'delete') => {
    if (action === 'approve') {
      setTasks(tasks.map(t => 
        selectedTasks.includes(t.id) ? { ...t, status: 'done' } : t
      ));
      toast.success(`${selectedTasks.length} tasks approved`);
    } else {
      if (confirm(`Delete ${selectedTasks.length} tasks?`)) {
        setTasks(tasks.filter(t => !selectedTasks.includes(t.id)));
        toast.success(`${selectedTasks.length} tasks deleted`);
      }
    }
    setSelectedTasks([]);
  };

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case 'todo': return 'bg-gray-50 text-gray-700 border-gray-200';
      case 'in-progress': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'review': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'redo': return 'bg-red-50 text-red-700 border-red-200';
      case 'done': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    }
  };

  const getPriorityColor = (priority: TaskPriority) => {
    switch (priority) {
      case 'low': return 'text-gray-600 bg-gray-500';
      case 'medium': return 'text-blue-600 bg-blue-500';
      case 'high': return 'text-orange-600 bg-orange-500';
      case 'critical': return 'text-red-600 bg-red-500';
    }
  };

  const getPriorityIcon = (priority: TaskPriority) => {
    switch (priority) {
      case 'critical': return <FiAlertTriangle size={14} />;
      default: return <FiAlertCircle size={14} />;
    }
  };

  const isOverdue = (deadline?: string) => {
    if (!deadline) return false;
    return new Date(deadline) < new Date();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Task Oversight & Moderation</h1>
          <p className="text-sm text-gray-500 mt-1">
            Monitor and moderate all tasks across projects
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <StatCard
          title="Total Tasks"
          value={tasks.length}
          icon={<FiCheckSquare size={20} />}
          iconBg="bg-gray-50"
          iconColor="text-gray-600"
        />
        <StatCard
          title="In Progress"
          value={tasks.filter(t => t.status === 'in-progress').length}
          icon={<FiClock size={20} />}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
        />
        <StatCard
          title="Review"
          value={tasks.filter(t => t.status === 'review').length}
          icon={<FiEye size={20} />}
          iconBg="bg-amber-50"
          iconColor="text-amber-600"
        />
        <StatCard
          title="Redo"
          value={tasks.filter(t => t.status === 'redo').length}
          icon={<FiRefreshCw size={20} />}
          iconBg="bg-red-50"
          iconColor="text-red-600"
        />
        <StatCard
          title="Done"
          value={tasks.filter(t => t.status === 'done').length}
          icon={<FiCheck size={20} />}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
        />
      </div>

      {/* Productivity Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Avg Completion Time</h3>
            <div className="p-2 bg-blue-50 rounded-lg">
              <FiClock className="text-blue-600" size={16} />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {(tasks.reduce((acc, t) => acc + t.timeSpent, 0) / tasks.length / 60).toFixed(1)}h
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">High Redo Tasks</h3>
            <div className="p-2 bg-red-50 rounded-lg">
              <FiRefreshCw className="text-red-600" size={16} />
            </div>
          </div>
          <p className="text-2xl font-bold text-red-600">
            {tasks.filter(t => t.redoCount >= 2).length}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Overdue Tasks</h3>
            <div className="p-2 bg-orange-50 rounded-lg">
              <FiAlertTriangle className="text-orange-600" size={16} />
            </div>
          </div>
          <p className="text-2xl font-bold text-orange-600">
            {tasks.filter(t => isOverdue(t.deadline)).length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm"
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium"
          >
            <option value="all">All Status</option>
            <option value="todo">To-Do</option>
            <option value="in-progress">In Progress</option>
            <option value="review">Review</option>
            <option value="redo">Redo</option>
            <option value="done">Done</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value as any)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium"
          >
            <option value="all">All Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>

          <select
            value={projectFilter}
            onChange={(e) => setProjectFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium"
          >
            <option value="all">All Projects</option>
            {projects.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedTasks.length > 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-blue-900 flex items-center gap-2">
              <FiCheck size={16} />
              {selectedTasks.length} selected
            </span>
            <button
              onClick={() => handleBulkAction('approve')}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm font-medium transition-all flex items-center gap-2"
            >
              <FiCheck size={14} />
              Approve All
            </button>
            <button
              onClick={() => handleBulkAction('delete')}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-medium transition-all flex items-center gap-2"
            >
              <FiTrash2 size={14} />
              Delete All
            </button>
            <button
              onClick={() => setSelectedTasks([])}
              className="ml-auto px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium transition-all"
            >
              Clear Selection
            </button>
          </div>
        </div>
      )}

      {/* Tasks List */}
      <div className="space-y-4">
        {filteredTasks.map(task => (
          <div key={task.id} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <input
                type="checkbox"
                checked={selectedTasks.includes(task.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedTasks([...selectedTasks, task.id]);
                  } else {
                    setSelectedTasks(selectedTasks.filter(id => id !== task.id));
                  }
                }}
                className="mt-1 rounded border-gray-300"
              />

              <div className="flex-1 min-w-0">
                <div className="flex items-center flex-wrap gap-2 mb-3">
                  <h3 className="text-lg font-bold text-gray-900">{task.title}</h3>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold capitalize border ${getStatusColor(task.status)}`}>
                    {task.status.replace('-', ' ')}
                  </span>
                  <span className={`inline-flex items-center gap-1 text-xs font-medium ${getPriorityColor(task.priority).split(' ')[0]}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${getPriorityColor(task.priority).split(' ')[1]}`}></span>
                    {task.priority}
                  </span>
                  {task.redoCount > 0 && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-red-50 text-red-700 border border-red-200 rounded-md text-xs font-semibold">
                      <FiRefreshCw size={10} />
                      Redo: {task.redoCount}
                    </span>
                  )}
                  {isOverdue(task.deadline) && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-orange-50 text-orange-700 border border-orange-200 rounded-md text-xs font-semibold">
                      <FiAlertTriangle size={10} />
                      Overdue
                    </span>
                  )}
                </div>

                <p className="text-sm text-gray-600 mb-4">{task.description}</p>

                <div className="flex items-center flex-wrap gap-4 text-sm text-gray-600 mb-4">
                  <span className="flex items-center gap-1">
                    <FiFolder size={14} />
                    {task.projectName}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiUser size={14} />
                    {task.assignedToName}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiClock size={14} />
                    {Math.floor(task.timeSpent / 60)}h {task.timeSpent % 60}m
                  </span>
                  {task.deadline && (
                    <span className="flex items-center gap-1">
                      <FiCalendar size={14} />
                      Due: {new Date(task.deadline).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {task.labels.map(label => (
                    <span key={label} className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-50 text-gray-700 border border-gray-200 rounded-md text-xs font-medium">
                      <FiTag size={10} />
                      {label}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedTask(task)}
                    className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-all flex items-center gap-1.5"
                  >
                    <FiEye size={14} />
                    Details
                  </button>
                  
                  {task.status === 'review' && (
                    <>
                      <button
                        onClick={() => handleApprove(task.id)}
                        className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm font-medium transition-all flex items-center gap-1.5"
                      >
                        <FiCheck size={14} />
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(task.id, 'Needs improvement')}
                        className="px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-medium transition-all flex items-center gap-1.5"
                      >
                        <FiX size={14} />
                        Request Redo
                      </button>
                    </>
                  )}

                  <button
                    onClick={() => handleDelete(task.id)}
                    className="ml-auto px-3 py-1.5 bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-100 text-sm font-medium transition-all flex items-center gap-1.5"
                  >
                    <FiTrash2 size={14} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredTasks.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiCheckSquare size={24} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No tasks found</h3>
          <p className="text-sm text-gray-500">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Task Details Modal */}
      {selectedTask && (
        <TaskDetailsModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      )}
    </div>
  );
}

function StatCard({ title, value, icon, iconBg, iconColor }: any) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className={`${iconBg} ${iconColor} p-2.5 rounded-lg`}>
          {icon}
        </div>
      </div>
      <p className="text-sm text-gray-600 font-medium">{title}</p>
      <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
    </div>
  );
}

function TaskDetailsModal({ task, onClose, onApprove, onReject }: any) {
  const [rejectReason, setRejectReason] = useState('');

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-xl border border-gray-200 max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-slideUp">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FiCheckSquare className="text-blue-600" size={20} />
              </div>
              <h2 className="text-xl font-bold text-gray-900">{task.title}</h2>
            </div>
            <button 
              onClick={onClose} 
              className="p-2 text-gray-500 hover:bg-white hover:text-gray-700 rounded-lg transition-all"
            >
              <FiX size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="space-y-6">
            {/* Description */}
            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600">{task.description}</p>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
                <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                  <FiFolder size={12} />
                  Project
                </p>
                <p className="font-bold text-gray-900">{task.projectName}</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-lg">
                <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                  <FiUser size={12} />
                  Assigned To
                </p>
                <p className="font-bold text-gray-900">{task.assignedToName}</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg">
                <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                  <FiUser size={12} />
                  Created By
                </p>
                <p className="font-bold text-gray-900">{task.createdByName}</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-lg">
                <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                  <FiClock size={12} />
                  Time Spent
                </p>
                <p className="font-bold text-gray-900">{Math.floor(task.timeSpent / 60)}h {task.timeSpent % 60}m</p>
              </div>
            </div>

            {/* Task History */}
            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <FiMessageSquare className="text-purple-600" size={16} />
                Task History
              </h3>
              <div className="space-y-2">
                {task.history.map((entry: any, idx: number) => (
                  <div key={idx} className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                    <div className="flex items-start justify-between mb-1">
                      <p className="font-medium text-gray-900">{entry.action}</p>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <FiClock size={10} />
                        {new Date(entry.timestamp).toLocaleString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{entry.details}</p>
                    <p className="text-xs text-gray-500 mt-1">by {entry.by}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Moderation Actions */}
            {task.status === 'review' && (
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-3">Moderation Actions</h3>
                <textarea
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="Reason for rejection (if applicable)..."
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm"
                />
                <div className="flex gap-3 mt-3">
                  <button
                    onClick={() => {
                      onApprove(task.id);
                      onClose();
                    }}
                    className="flex-1 px-4 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium transition-all flex items-center justify-center gap-2"
                  >
                    <FiCheck size={16} />
                    Approve Task
                  </button>
                  <button
                    onClick={() => {
                      if (rejectReason.trim()) {
                        onReject(task.id, rejectReason);
                        onClose();
                      } else {
                        toast.error('Please provide a reason for rejection');
                      }
                    }}
                    className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-all flex items-center justify-center gap-2"
                  >
                    <FiX size={16} />
                    Request Redo
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
