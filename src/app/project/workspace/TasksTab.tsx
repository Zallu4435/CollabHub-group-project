// src/components/projects/workspace/TasksTab.tsx
import React, { useMemo, useState } from 'react';
import { Project } from '../types';
import { mockTasks } from '../data';
import { Task } from '../types';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { formatDueDate } from '../utils/dateUtils';
import Link from 'next/link';

interface TasksTabProps {
  project: Project;
}

type TaskView = 'kanban' | 'list' | 'calendar';
type TaskStatus = 'todo' | 'in-progress' | 'review' | 'done' | 'redo';

export const TasksTab: React.FC<TasksTabProps> = ({ project }) => {
  const [view, setView] = useState<TaskView>('kanban');
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'all'>('all');
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'low' | 'medium' | 'high'>('all');
  const [search, setSearch] = useState('');
  const [personalCount, setPersonalCount] = useState<number>(0);
  const [scope, setScope] = useState<'assigned' | 'submitted' | 'all'>('all');
  const [redoModal, setRedoModal] = useState<{ open: boolean; task?: Task; feedback: string }>({ open: false, feedback: '' });
  const [resubmitModal, setResubmitModal] = useState<{ open: boolean; task?: Task; note: string }>({ open: false, note: '' });
  const [activities, setActivities] = useState<Array<{ id: number; message: string; timestamp: string }>>([]);
  const [historyModal, setHistoryModal] = useState<{ open: boolean; task?: Task }>({ open: false });

  // Determine current user's role from project
  const currentUser = { id: 5, name: 'Regular User', role: (project.currentUserRole || 'user') as 'owner' | 'admin' | 'editor' | 'viewer' | 'user' };

  // Load personal todo count from localStorage
  React.useEffect(() => {
    const STORAGE_KEY = 'personal_todo_tasks_v1';
    const load = () => {
      try {
        const raw = typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEY) : null;
        if (!raw) { setPersonalCount(0); return; }
        const list = JSON.parse(raw) as Array<{ completed: boolean }>;
        setPersonalCount(Array.isArray(list) ? list.length : 0);
      } catch {
        setPersonalCount(0);
      }
    };
    load();
    const onFocus = () => load();
    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, []);

  // Filter tasks based on role
  const visibleTasks = useMemo(() => {
    if (['owner', 'admin', 'editor'].includes(currentUser.role)) {
      return tasks;
    }
    return tasks.filter(t => t.assignee && t.assignee.id === currentUser.id);
  }, [tasks, currentUser]);

  // Privileges
  const canCreate = ['owner', 'admin', 'editor'].includes(currentUser.role);
  const canEditAll = ['owner', 'admin', 'editor'].includes(currentUser.role);
  const canEditOwn = currentUser.role === 'user';
  const canDeleteAll = ['owner', 'admin'].includes(currentUser.role);

  const columns: { id: TaskStatus; title: string; color: string }[] = [
    { id: 'todo', title: 'To Do', color: 'bg-gray-100' },
    { id: 'in-progress', title: 'In Progress', color: 'bg-blue-100' },
    { id: 'review', title: 'Review', color: 'bg-yellow-100' },
    { id: 'redo', title: 'Redo Required', color: 'bg-rose-100' },
    { id: 'done', title: 'Done', color: 'bg-green-100' }
  ];

  const filteredTasks = useMemo(() => {
    const byScope = (t: Task) => {
      if (scope === 'all') return true;
      if (scope === 'assigned') return !!t.assignee && t.assignee.id === currentUser.id;
      // submitted: tasks created by current user (provenance)
      return t.createdBy === currentUser.id;
    };
    return visibleTasks.filter((t) => {
      const byStatus = statusFilter === 'all' ? true : t.status === statusFilter;
      const byPriority = priorityFilter === 'all' ? true : t.priority === priorityFilter;
      const bySearch = search.trim()
        ? (t.title + ' ' + t.description).toLowerCase().includes(search.toLowerCase())
        : true;
      return byStatus && byPriority && bySearch && byScope(t);
    });
  }, [visibleTasks, statusFilter, priorityFilter, search, scope]);

  const getTasksByStatus = (status: TaskStatus) => {
    return filteredTasks.filter(task => task.status === status);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  const addActivity = (message: string) => {
    setActivities(prev => [
      { id: Math.max(0, ...prev.map(a => a.id)) + 1, message, timestamp: new Date().toISOString() },
      ...prev
    ]);
  };
  const addTaskHistory = (taskId: number, event: { type: 'created' | 'submitted' | 'redo_requested' | 'acknowledged' | 'status_changed' | 'deleted'; message: string }) => {
    setTasks(prev => prev.map(t => t.id === taskId ? {
      ...t,
      history: [
        { id: Math.max(0, ...(t.history || []).map(h => h.id)) + 1, type: event.type, message: event.message, actor: { id: currentUser.id, name: currentUser.name }, timestamp: new Date().toISOString() },
        ...((t.history) || [])
      ]
    } : t));
  };

  const updateTaskStatus = (taskId: number, status: TaskStatus) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status } : t));
    addActivity(`Status changed to ${status} for task #${taskId}`);
    addTaskHistory(taskId, { type: 'status_changed', message: `Status changed to ${status}` });
  };

  const submitTaskAsDone = (taskId: number, note?: string) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: 'review', submittedForReview: true, redoRequired: false, redoFeedback: '' } : t));
    if (note && note.trim()) {
      setTasks(prev => prev.map(t => t.id === taskId ? {
        ...t,
        comments: [
          ...t.comments,
          { id: Math.max(0, ...t.comments.map(c => c.id)) + 1, content: note.trim(), author: { id: currentUser.id, name: currentUser.name, avatar: '' }, createdAt: new Date().toISOString() }
        ]
      } : t));
    }
    addActivity(`Task #${taskId} submitted for review${note && note.trim() ? ' with note' : ''}`);
    addTaskHistory(taskId, { type: 'submitted', message: `Submitted for review${note && note.trim() ? `: ${note.trim()}` : ''}` });
  };

  const deleteTask = (taskId: number) => {
    if (!canDeleteAll) return;
    setTasks(prev => prev.filter(t => t.id !== taskId));
    addActivity(`Task #${taskId} deleted`);
    // no per-task history since task is removed
  };

  const openRedo = (task: Task) => setRedoModal({ open: true, task, feedback: '' });
  const sendRedo = () => {
    if (!redoModal.task) return;
    const feedback = redoModal.feedback.trim();
    setTasks(prev => prev.map(t => t.id === redoModal.task!.id ? { ...t, status: 'redo', redoRequired: true, redoFeedback: feedback } : t));
    setRedoModal({ open: false, task: undefined, feedback: '' });
    addActivity(`Redo requested for task #${redoModal.task.id}${feedback ? ': ' + feedback : ''}`);
    addTaskHistory(redoModal.task.id, { type: 'redo_requested', message: feedback ? feedback : 'Redo requested' });
  };
  const cancelRedo = () => setRedoModal({ open: false, task: undefined, feedback: '' });

  const openResubmit = (task: Task) => setResubmitModal({ open: true, task, note: '' });
  const sendResubmit = () => {
    if (!resubmitModal.task) return;
    submitTaskAsDone(resubmitModal.task.id, resubmitModal.note);
    setResubmitModal({ open: false, task: undefined, note: '' });
  };
  const cancelResubmit = () => setResubmitModal({ open: false, task: undefined, note: '' });

  const acknowledgeRedo = (taskId: number) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, redoRequired: false } : t));
    addActivity(`Redo feedback acknowledged for task #${taskId}`);
    addTaskHistory(taskId, { type: 'acknowledged', message: 'Assignee acknowledged redo feedback' });
  };

  const CreateTaskModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [form, setForm] = useState<Partial<Task>>({
      title: '',
      description: '',
      status: 'todo',
      priority: 'medium',
      tags: []
    });

    const canSave = (form.title || '').trim().length > 0;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl w-full max-w-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-black">Create Task</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-black">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-black mb-1">Title</label>
              <input
                type="text"
                value={form.title || ''}
                onChange={(e) => setForm(f => ({ ...f, title: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-black"
                placeholder="Task title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-1">Description</label>
              <textarea
                rows={3}
                value={form.description || ''}
                onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-black"
                placeholder="Task description"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-black mb-1">Status</label>
                <select
                  value={form.status as TaskStatus}
                  onChange={(e) => setForm(f => ({ ...f, status: e.target.value as TaskStatus }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-black"
                >
                  <option value="todo">To Do</option>
                  <option value="in-progress">In Progress</option>
                  <option value="review">Review</option>
                  <option value="done">Done</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-1">Priority</label>
                <select
                  value={form.priority as 'low' | 'medium' | 'high'}
                  onChange={(e) => setForm(f => ({ ...f, priority: e.target.value as 'low' | 'medium' | 'high' }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-black"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-1">Due Date</label>
                <input
                  type="date"
                  value={form.dueDate || ''}
                  onChange={(e) => setForm(f => ({ ...f, dueDate: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-black"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-3 mt-6">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button
              disabled={!canSave}
              onClick={() => {
                const newTask: Task = {
                  id: Math.max(0, ...tasks.map(t => t.id)) + 1,
                  title: form.title || 'Untitled',
                  description: form.description || '',
                  status: (form.status as TaskStatus) || 'todo',
                  priority: (form.priority as 'low' | 'medium' | 'high') || 'medium',
                  assignee: undefined,
                  dueDate: form.dueDate,
                  tags: [],
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                  comments: [],
                  attachments: [],
                  createdBy: currentUser.id
                };
                setTasks(prev => [newTask, ...prev]);
                onClose();
              }}
            >
              Create
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const TaskCard: React.FC<{ task: Task }> = ({ task }) => {
    const dueInfo = task.dueDate ? formatDueDate(task.dueDate) : null;
    const showHistory = () => setHistoryModal({ open: true, task });

    return (
      <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between mb-2">
          <h4 className="font-semibold text-black text-sm line-clamp-2">{task.title}</h4>
          <div className="flex items-center gap-2">
            {task.status === 'redo' && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 border border-rose-200">Redo Required</span>
            )}
            {task.submittedForReview && task.status === 'review' && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 border border-amber-200">Submitted</span>
            )}
            <Badge variant={getPriorityColor(task.priority)} size="sm">
              {task.priority}
            </Badge>
          </div>
        </div>

        <p className="text-xs text-gray-800 mb-3 line-clamp-2">{task.description}</p>

        {task.redoRequired && task.redoFeedback && (
          <div className="mb-3 px-3 py-2 rounded-lg bg-rose-50 border border-rose-200">
            <div className="text-[11px] font-semibold text-rose-700 mb-1">Feedback</div>
            <div className="text-xs text-rose-700">{task.redoFeedback}</div>
            {canEditOwn && task.assignee && task.assignee.id === currentUser.id && (
              <div className="mt-2">
                <Button variant="outline" size="sm" onClick={() => acknowledgeRedo(task.id)}>Acknowledge</Button>
              </div>
            )}
          </div>
        )}

        <div className="flex flex-wrap gap-1 mb-3">
          {task.tags.slice(0, 2).map((tag: string, index: number) => (
            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
              {tag}
            </span>
          ))}
          {task.tags.length > 2 && (
            <span className="px-2 py-1 text-xs text-gray-700">+{task.tags.length - 2}</span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {task.assignee && (
              <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-xs font-medium text-gray-800">
                {task.assignee.name.charAt(0)}
              </div>
            )}
            {task.comments.length > 0 && (
              <div className="flex items-center text-xs text-gray-700">
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                {task.comments.length}
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            {dueInfo && (
              <span className={`text-xs px-2 py-1 rounded-full ${
                dueInfo.isOverdue ? 'bg-red-100 text-red-800' :
                dueInfo.isUpcoming ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {dueInfo.text}
              </span>
            )}
            {canEditAll ? (
              <select
                value={task.status}
                onChange={(e) => updateTaskStatus(task.id, e.target.value as TaskStatus)}
                className="text-xs px-2 py-1 border border-gray-300 rounded bg-white text-black"
              >
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="review">Review</option>
                <option value="redo">Redo Required</option>
                <option value="done">Done</option>
              </select>
            ) : (canEditOwn && task.assignee && task.assignee.id === currentUser.id) ? (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openResubmit(task)}
                  disabled={task.status === 'review' || (task as any).submittedForReview}
                >
                  {(task.status === 'review' || (task as any).submittedForReview) ? 'Submitted' : 'Submit for Review'}
                </Button>
              </div>
            ) : null}
            {canEditAll && task.status !== 'redo' && (
              <Button variant="ghost" size="sm" onClick={() => openRedo(task)} title="Send for Redo">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v6h6M20 20v-6h-6M20 8a8 8 0 10-16 0 8 8 0 0016 0z" />
                </svg>
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={showHistory} title="View history">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </Button>
            {canDeleteAll && (
              <Button variant="ghost" size="sm" onClick={() => deleteTask(task.id)} title="Delete task">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const KanbanView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {columns.map((column) => {
        const columnTasks = getTasksByStatus(column.id);
        return (
          <div key={column.id} className="flex flex-col">
            <div className={`${column.color} rounded-lg p-3 mb-4`}>
              <h3 className="font-semibold text-black flex items-center justify-between">
                {column.title}
                <span className="bg-white rounded-full px-2 py-1 text-xs font-medium text-black">
                  {columnTasks.length}
                </span>
              </h3>
            </div>
            <div className="space-y-3 flex-1">
              {columnTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
              {columnTasks.length === 0 && (
                <div className="text-xs text-gray-700 text-center py-4 border border-dashed border-gray-300 rounded-lg bg-white">No tasks</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );

  const ListView = () => (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="grid grid-cols-12 gap-4 text-xs font-semibold text-black uppercase tracking-wider">
          <div className="col-span-4">Task</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2">Priority</div>
          <div className="col-span-2">Assignee</div>
          <div className="col-span-2">Due Date</div>
        </div>
      </div>
      <div className="divide-y divide-gray-200">
        {filteredTasks.map((task) => {
          const dueInfo = task.dueDate ? formatDueDate(task.dueDate) : null;
          const canEdit = ['owner', 'admin', 'editor'].includes(currentUser.role);
          return (
            <div key={task.id} className="px-6 py-4 hover:bg-gray-50">
              <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-4">
                  <h4 className="font-semibold text-black text-sm">{task.title}</h4>
                  <p className="text-xs text-gray-800 mt-1 line-clamp-1">{task.description}</p>
                  {task.redoRequired && task.redoFeedback && (
                    <div className="mt-2 px-3 py-2 rounded bg-rose-50 border border-rose-200">
                      <div className="text-[11px] font-semibold text-rose-700 mb-1">Feedback</div>
                      <div className="text-xs text-rose-700">{task.redoFeedback}</div>
                      {canEditOwn && task.assignee && task.assignee.id === currentUser.id && (
                        <div className="mt-2">
                          <Button variant="outline" size="sm" onClick={() => acknowledgeRedo(task.id)}>Acknowledge</Button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className="col-span-2">
                  {canEdit ? (
                    <select
                      value={task.status}
                      onChange={(e) => updateTaskStatus(task.id, e.target.value as TaskStatus)}
                      className="text-xs px-2 py-1 border border-gray-300 rounded bg-white text-black"
                    >
                      <option value="todo">To Do</option>
                      <option value="in-progress">In Progress</option>
                      <option value="review">Review</option>
                      <option value="redo">Redo Required</option>
                      <option value="done">Done</option>
                    </select>
                  ) : (canEditOwn && task.assignee && task.assignee.id === currentUser.id) ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openResubmit(task)}
                      disabled={task.status === 'review' || (task as any).submittedForReview}
                    >
                      {(task.status === 'review' || (task as any).submittedForReview) ? 'Submitted' : 'Submit for Review'}
                    </Button>
                  ) : (
                    <span className="text-xs text-gray-700 capitalize">{task.status.replace('-', ' ')}</span>
                  )}
                </div>
                <div className="col-span-2">
                  <Badge variant={getPriorityColor(task.priority)} size="sm">
                    {task.priority}
                  </Badge>
                </div>
                <div className="col-span-2">
                  {task.assignee ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-xs font-medium text-gray-800">
                        {task.assignee.name.charAt(0)}
                      </div>
                      <span className="text-sm text-black">{task.assignee.name}</span>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-700">Unassigned</span>
                  )}
                </div>
                <div className="col-span-2 flex items-center justify-between">
                  {dueInfo ? (
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      dueInfo.isOverdue ? 'bg-red-100 text-red-800' :
                      dueInfo.isUpcoming ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {dueInfo.text}
                    </span>
                  ) : (
                    <span className="text-sm text-gray-700">No due date</span>
                  )}
                  <div className="flex items-center gap-1">
                    {canEdit && task.status !== 'redo' && (
                      <Button variant="ghost" size="sm" onClick={() => openRedo(task)} title="Send for Redo">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v6h6M20 20v-6h-6M20 8a8 8 0 10-16 0 8 8 0 0016 0z" />
                        </svg>
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" onClick={() => setHistoryModal({ open: true, task })} title="View history">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </Button>
                    {canDeleteAll && (
                      <Button variant="ghost" size="sm" onClick={() => deleteTask(task.id)} title="Delete task">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const CalendarView = () => {
    const tasksByDate = filteredTasks.reduce<Record<string, Task[]>>((acc, t) => {
      if (!t.dueDate) return acc;
      acc[t.dueDate] = acc[t.dueDate] || [];
      acc[t.dueDate].push(t);
      return acc;
    }, {});

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const firstDay = new Date(year, month, 1);
    const startDay = firstDay.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const cells: Array<{ day: number | null; dateKey?: string }> = [];
    for (let i = 0; i < startDay; i++) cells.push({ day: null });
    for (let d = 1; d <= daysInMonth; d++) {
      const dateKey = new Date(year, month, d).toISOString().slice(0, 10);
      cells.push({ day: d, dateKey });
    }

    return (
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="grid grid-cols-7 gap-2 text-xs font-semibold text-black mb-2">
          {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => (
            <div key={d} className="text-center">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {cells.map((c, idx) => (
            <div key={idx} className="min-h-[90px] border border-gray-200 rounded p-1">
              {c.day !== null && (
                <div>
                  <div className="text-xs font-semibold text-black">{c.day}</div>
                  <div className="space-y-1 mt-1">
                    {(c.dateKey && tasksByDate[c.dateKey] ? tasksByDate[c.dateKey] : []).slice(0, 3).map(t => (
                      <div key={t.id} className="px-1 py-0.5 rounded bg-indigo-50 text-[10px] text-black truncate">
                        {t.title}
                      </div>
                    ))}
                    {c.dateKey && tasksByDate[c.dateKey] && tasksByDate[c.dateKey].length > 3 && (
                      <div className="text-[10px] text-gray-700">+{tasksByDate[c.dateKey].length - 3} more</div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold text-black">Tasks</h2>
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setView('kanban')}
              className={`px-3 py-1 text-sm font-medium rounded transition-all ${
                view === 'kanban' ? 'bg-white shadow-sm text-black' : 'hover:bg-gray-200 text-black'
              }`}
            >
              Kanban
            </button>
            <button
              onClick={() => setView('list')}
              className={`px-3 py-1 text-sm font-medium rounded transition-all ${
                view === 'list' ? 'bg-white shadow-sm text-black' : 'hover:bg-gray-200 text-black'
              }`}
            >
              List
            </button>
            <button
              onClick={() => setView('calendar')}
              className={`px-3 py-1 text-sm font-medium rounded transition-all ${
                view === 'calendar' ? 'bg-white shadow-sm text-black' : 'hover:bg-gray-200 text-black'
              }`}
            >
              Calendar
            </button>
          </div>
          <div className="hidden md:flex items-center gap-2 ml-2">
            <span className="text-xs text-gray-700">Scope:</span>
            <select
              value={scope}
              onChange={(e) => setScope(e.target.value as 'assigned' | 'submitted' | 'all')}
              className="px-2 py-1 border border-gray-300 rounded bg-white text-black text-sm"
            >
              <option value="all">All</option>
              <option value="assigned">Assigned to me</option>
              <option value="submitted">Submitted by me</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as TaskStatus | 'all')}
              className="px-2 py-1 border border-gray-300 rounded bg-white text-black text-sm"
            >
              <option value="all">All Statuses</option>
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="review">Review</option>
              <option value="redo">Redo Required</option>
              <option value="done">Done</option>
            </select>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value as 'all' | 'low' | 'medium' | 'high')}
              className="px-2 py-1 border border-gray-300 rounded bg-white text-black text-sm"
            >
              <option value="all">All Priorities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <div className="relative">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search tasks..."
                className="pl-8 pr-3 py-1 border border-gray-300 rounded text-black text-sm"
              />
              <svg className="w-4 h-4 text-gray-500 absolute left-2 top-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <Button variant="outline" size="sm">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filter
          </Button>
          <Link href="/todo">
            <Button variant="outline" size="sm">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v8m4-4H8" />
              </svg>
              Personal To‑Do
              {personalCount > 0 && (
                <span className="ml-2 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-indigo-600 text-white text-[10px]">
                  {personalCount}
                </span>
              )}
            </Button>
          </Link>
          {canCreate && (
            <Button size="sm" onClick={() => setShowCreateTaskModal(true)}>
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              New Task
            </Button>
          )}
        </div>
      </div>

      {view === 'kanban' && <KanbanView />}
      {view === 'list' && <ListView />}
      {view === 'calendar' && <CalendarView />}

      {showCreateTaskModal && (
        <CreateTaskModal onClose={() => setShowCreateTaskModal(false)} />)
      }

      {redoModal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-black">Send Redo Request</h3>
              <button onClick={cancelRedo} className="text-gray-500 hover:text-black">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-black mb-1">Feedback / What to improve</label>
                <textarea
                  rows={4}
                  value={redoModal.feedback}
                  onChange={(e) => setRedoModal(m => ({ ...m, feedback: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 text-black"
                  placeholder="Explain what needs to be corrected before resubmission"
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 mt-6">
              <Button variant="outline" onClick={cancelRedo}>Cancel</Button>
              <Button onClick={sendRedo} disabled={!redoModal.feedback.trim()}>Send Redo</Button>
            </div>
          </div>
        </div>
      )}

      {resubmitModal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-black">Submit Task for Review</h3>
              <button onClick={cancelResubmit} className="text-gray-500 hover:text-black">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-black mb-1">Optional note to reviewer</label>
                <textarea
                  rows={3}
                  value={resubmitModal.note}
                  onChange={(e) => setResubmitModal(m => ({ ...m, note: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-black"
                  placeholder="Describe what you changed or any context"
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 mt-6">
              <Button variant="outline" onClick={cancelResubmit}>Cancel</Button>
              <Button onClick={sendResubmit}>Submit</Button>
            </div>
          </div>
        </div>
      )}

      {/* Activity Panel */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-sm font-semibold text-black">Activity</h3>
        </div>
        <div className="p-6">
          {activities.length === 0 ? (
            <div className="text-sm text-gray-700">No recent activity</div>
          ) : (
            <ul className="space-y-3">
              {activities.slice(0, 20).map(a => (
                <li key={a.id} className="flex items-start gap-3">
                  <div className="w-2 h-2 mt-1.5 rounded-full bg-indigo-500" />
                  <div>
                    <div className="text-sm text-black">{a.message}</div>
                    <div className="text-xs text-gray-500">{new Date(a.timestamp).toLocaleString()}</div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {historyModal.open && historyModal.task && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl w-full max-w-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-black">Task History</h3>
              <button onClick={() => setHistoryModal({ open: false })} className="text-gray-500 hover:text-black">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-3 max-h-[60vh] overflow-auto">
              {(!historyModal.task.history || historyModal.task.history.length === 0) ? (
                <div className="text-sm text-gray-700">No history yet</div>
              ) : (
                <ul className="space-y-2">
                  {historyModal.task.history.map((h) => (
                    <li key={h.id} className="flex items-start gap-3">
                      <div className="w-2 h-2 mt-1.5 rounded-full bg-gray-400" />
                      <div>
                        <div className="text-sm text-black">{h.message}</div>
                        <div className="text-xs text-gray-500">{h.actor.name} • {new Date(h.timestamp).toLocaleString()}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="flex items-center justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setHistoryModal({ open: false })}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
