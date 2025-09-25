// src/components/projects/workspace/OverviewTab.tsx
import React, { useMemo } from 'react';
import { Project } from '../types';
import { Badge } from '../components/Badge';
import { formatRelativeTime, formatDueDate } from '../utils/dateUtils';
import { mockTasks, mockActivities, mockMilestones } from '../data';

interface OverviewTabProps {
  project: Project;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ project }) => {
  const currentRole = (project.currentUserRole || 'user') as 'owner' | 'admin' | 'editor' | 'viewer' | 'user';
  const tasks = mockTasks;
  const completedTasks = tasks.filter(task => task.status === 'done').length;
  const totalTasks = tasks.length;
  const completionRate = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const avgLeadTimeDays = useMemo(() => {
    const durations: number[] = [];
    tasks.forEach(t => {
      if (t.createdAt && t.updatedAt && t.status === 'done') {
        const ms = new Date(t.updatedAt).getTime() - new Date(t.createdAt).getTime();
        if (ms > 0) durations.push(ms / (1000 * 60 * 60 * 24));
      }
    });
    if (!durations.length) return 0;
    return Math.round((durations.reduce((a, b) => a + b, 0) / durations.length) * 10) / 10;
  }, [tasks]);

  const upcomingDeadlines = tasks.filter(task => {
    if (!task.dueDate) return false;
    const dueDate = new Date(task.dueDate);
    const today = new Date();
    const diffDays = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && diffDays >= 0;
  });

  const statusTotals = useMemo(() => ({
    done: tasks.filter(t => t.status === 'done').length,
    review: tasks.filter(t => t.status === 'review').length,
    redo: tasks.filter(t => (t as any).status === 'redo').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    todo: tasks.filter(t => t.status === 'todo').length,
  }), [tasks]);
  const donutSegments = [
    { label: 'Done', value: statusTotals.done, color: '#16a34a' },
    { label: 'Review', value: statusTotals.review, color: '#f59e0b' },
    { label: 'Redo', value: statusTotals.redo, color: '#f43f5e' },
    { label: 'In Progress', value: statusTotals.inProgress, color: '#3b82f6' },
    { label: 'To Do', value: statusTotals.todo, color: '#6b7280' },
  ];
  const donutTotal = donutSegments.reduce((a, s) => a + s.value, 0) || 1;
  let donutAccum = 0;

  const throughput7d = useMemo(() => {
    const now = new Date();
    const start = new Date(now);
    start.setDate(now.getDate() - 6);
    const days: Array<{ date: string; done: number; created: number }> = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      const key = d.toISOString().slice(0, 10);
      days.push({ date: key, done: 0, created: 0 });
    }
    tasks.forEach(t => {
      const c = (t.createdAt || '').slice(0, 10);
      const d = (t.updatedAt || '').slice(0, 10);
      const cd = days.find(x => x.date === c);
      if (cd) cd.created += 1;
      if (t.status === 'done') {
        const dd = days.find(x => x.date === d);
        if (dd) dd.done += 1;
      }
    });
    return days;
  }, [tasks]);

  return (
    <div className="space-y-8">
      {/* Project Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-8 w-8 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Tasks Complete</p>
              <p className="text-2xl font-semibold text-black">{completedTasks}/{totalTasks}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-8 w-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Progress</p>
              <p className="text-2xl font-semibold text-black">{project.progress || 0}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-8 w-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Team Members</p>
              <p className="text-2xl font-semibold text-black">{project.teamMembers?.length || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-8 w-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Due This Week</p>
              <p className="text-2xl font-semibold text-black">{upcomingDeadlines.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-8 w-8 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v8m4-4H8" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Completion Rate</p>
              <p className="text-2xl font-semibold text-black">{completionRate}%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg border border-gray-200 lg:col-span-2">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-black">Recent Activity</h3>
          </div>
          <div className="p-6">
            <div className="flow-root">
              <ul className="-mb-8">
                {mockActivities.slice(0, 6).map((activity, index) => (
                  <li key={activity.id}>
                    <div className="relative pb-8">
                      {index !== mockActivities.slice(0, 6).length - 1 && (
                        <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                      )}
                      <div className="relative flex space-x-3">
                        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-xs font-medium text-gray-600">
                          {activity.user.name.charAt(0)}
                        </div>
                        <div className="min-w-0 flex-1 pt-1.5">
                          <div>
                            <p className="text-sm text-gray-600">
                              <span className="font-medium text-black">{activity.user.name}</span>{' '}
                              {activity.description}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">{formatRelativeTime(activity.timestamp)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Status & Trend */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-black mb-4">Status & Trend</h3>
          <div className="flex items-center gap-4">
            <svg viewBox="0 0 36 36" className="w-28 h-28 -rotate-90">
              {donutSegments.map((seg) => {
                const val = seg.value / donutTotal;
                const circumference = 2 * Math.PI * 16;
                const length = val * circumference;
                const circle = (
                  <circle key={seg.label}
                    cx="18" cy="18" r="16" fill="transparent"
                    stroke={seg.color} strokeWidth="4"
                    strokeDasharray={`${length} ${circumference - length}`}
                    strokeDashoffset={-donutAccum * circumference}
                    strokeLinecap="butt"
                  />
                );
                donutAccum += val;
                return circle;
              })}
            </svg>
            <div className="flex-1">
              <div className="flex items-center gap-2 text-xs text-gray-700 flex-wrap">
                {donutSegments.map(s => (
                  <div key={s.label} className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded" style={{ backgroundColor: s.color }} />
                    <span>{s.label}</span>
                    <span className="text-gray-500">{s.value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <svg viewBox="0 0 200 50" className="w-full h-12">
                  <polyline fill="none" stroke="#3b82f6" strokeWidth="2" points={throughput7d.map((d, i) => {
                    const maxY = Math.max(1, ...throughput7d.map(t => Math.max(t.created, t.done)));
                    const x = 0 + i * (200 / 6);
                    const y = 45 - (d.created / maxY) * 40;
                    return `${x},${y}`;
                  }).join(' ')} />
                  <polyline fill="none" stroke="#16a34a" strokeWidth="2" points={throughput7d.map((d, i) => {
                    const maxY = Math.max(1, ...throughput7d.map(t => Math.max(t.created, t.done)));
                    const x = 0 + i * (200 / 6);
                    const y = 45 - (d.done / maxY) * 40;
                    return `${x},${y}`;
                  }).join(' ')} />
                </svg>
                <div className="flex items-center gap-3 text-[10px] text-gray-600 mt-1">
                  <div className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-blue-500" /> Created</div>
                  <div className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-green-600" /> Done</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Deadlines */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-black">Upcoming Deadlines</h3>
        </div>
        <div className="p-6">
          {upcomingDeadlines.length === 0 ? (
            <p className="text-gray-600 text-center py-8">No upcoming deadlines</p>
          ) : (
            <div className="space-y-4">
              {upcomingDeadlines.map((task) => {
                const dueInfo = formatDueDate(task.dueDate!);
                return (
                  <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-black truncate">{task.title}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant={task.priority === 'high' ? 'error' : task.priority === 'medium' ? 'warning' : 'default'} size="sm">{task.priority}</Badge>
                        {task.assignee && (
                          <span className="text-xs text-gray-600">Assigned to {task.assignee.name}</span>
                        )}
                        {(task as any).submittedForReview && (
                          <span className="text-[10px] px-2 py-0.5 rounded bg-amber-100 text-amber-700 border border-amber-200">Submitted</span>
                        )}
                        {(task as any).redoRequired && (
                          <span className="text-[10px] px-2 py-0.5 rounded bg-rose-100 text-rose-700 border border-rose-200">Redo</span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`text-xs px-2 py-1 rounded-full ${dueInfo.isUpcoming ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-600'}`}>{dueInfo.text}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Project Description & Milestones */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Project Description */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-black">Project Description</h3>
          </div>
          <div className="p-6">
            <p className="text-gray-700 leading-relaxed">{project.description}</p>
            <div className="mt-4">
              <h4 className="text-sm font-medium text-black mb-2">Technologies</h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, index) => (
                  <Badge key={index} variant="default" size="sm">{tag}</Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Milestones */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-black">Milestones</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {mockMilestones.map((milestone) => (
                <div key={milestone.id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className={`w-4 h-4 rounded-full ${milestone.completed ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className={`text-sm font-medium ${milestone.completed ? 'text-green-900 line-through' : 'text-gray-900'}`}>{milestone.title}</h4>
                    <p className="text-xs text-gray-500 mt-1">{milestone.description}</p>
                    <p className="text-xs text-gray-400 mt-1">Due: {new Date(milestone.dueDate).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
