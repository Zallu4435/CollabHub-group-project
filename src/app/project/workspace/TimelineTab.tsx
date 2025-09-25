// src/components/projects/workspace/TimelineTab.tsx
import React, { useMemo, useState } from 'react';
import { Project, Task, Milestone } from '../types';
import { mockMilestones, mockTasks, mockActivities } from '../data';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';

interface TimelineTabProps {
  project: Project;
}

type EventType = 'milestone' | 'task' | 'activity' | 'release' | 'note';

type TimelineEvent = {
  id: string;
  type: EventType;
  title: string;
  description?: string;
  date: string; // ISO
  status?: 'planned' | 'in-progress' | 'completed' | 'redo' | 'review';
  meta?: Record<string, unknown>;
};

export const TimelineTab: React.FC<TimelineTabProps> = ({ project }) => {
  const [typeFilter, setTypeFilter] = useState<EventType | 'all'>('all');
  const [rangeFilter, setRangeFilter] = useState<'upcoming' | 'past' | 'all'>('all');
  const [search, setSearch] = useState('');
  const [showMilestoneModal, setShowMilestoneModal] = useState(false);
  const [milestoneForm, setMilestoneForm] = useState<{ title: string; description: string; dueDate: string }>({ title: '', description: '', dueDate: '' });
  const [milestones, setMilestones] = useState<Milestone[]>(mockMilestones);

  // Determine current user's role
  const currentUser = { id: 5, name: 'Regular User', role: (project.currentUserRole || 'user') as 'owner' | 'admin' | 'editor' | 'viewer' | 'user' };
  const canWrite = ['owner', 'admin', 'editor'].includes(currentUser.role);

  // Build timeline events from milestones, tasks, and activities
  const baseEvents: TimelineEvent[] = useMemo(() => {
    const milestoneEvents: TimelineEvent[] = milestones.map(m => ({
      id: `m-${m.id}`,
      type: 'milestone',
      title: m.title,
      description: m.description,
      date: new Date(m.dueDate).toISOString(),
      status: m.completed ? 'completed' : 'planned',
      meta: { milestoneId: m.id, dueDate: m.dueDate }
    }));

    const taskEvents: TimelineEvent[] = (mockTasks as Task[]).map(t => ({
      id: `t-${t.id}`,
      type: 'task',
      title: t.title,
      description: t.description,
      date: new Date(t.updatedAt || t.createdAt).toISOString(),
      status: (t.status === 'done' ? 'completed' : t.status === 'review' ? 'review' : t.status === 'redo' ? 'redo' : 'in-progress') as any,
      meta: { taskId: t.id, assignee: t.assignee?.name, priority: t.priority, redoFeedback: t.redoFeedback, dueDate: t.dueDate }
    }));

    const activityEvents: TimelineEvent[] = mockActivities.map(a => ({
      id: `a-${a.id}`,
      type: 'activity',
      title: a.description,
      description: a.user.name,
      date: new Date(a.timestamp).toISOString(),
      status: 'in-progress',
      meta: { user: a.user.name, activityType: a.type }
    }));

    return [...milestoneEvents, ...taskEvents, ...activityEvents].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [milestones]);

  const filteredEvents = useMemo(() => {
    const now = new Date();
    return baseEvents.filter(ev => {
      const byType = typeFilter === 'all' ? true : ev.type === typeFilter;
      const byRange = rangeFilter === 'all' ? true : rangeFilter === 'upcoming' ? new Date(ev.date) >= now : new Date(ev.date) < now;
      const bySearch = search.trim() ? (ev.title + ' ' + (ev.description || '')).toLowerCase().includes(search.toLowerCase()) : true;
      return byType && byRange && bySearch;
    });
  }, [baseEvents, typeFilter, rangeFilter, search]);

  const exportJson = () => {
    const dataStr = encodeURIComponent(JSON.stringify(filteredEvents, null, 2));
    const a = document.createElement('a');
    a.href = 'data:application/json;charset=utf-8,' + dataStr;
    a.download = `timeline-${project.id}.json`;
    a.click();
  };

  const createMilestone = () => {
    if (!canWrite) return;
    const t = (milestoneForm.title || '').trim();
    if (!t) return;
    // Create a real local milestone entry
    const nextId = Math.max(0, ...milestones.map(m => m.id)) + 1;
    const newMilestone: Milestone = {
      id: nextId,
      title: t,
      description: (milestoneForm.description || '').trim(),
      dueDate: milestoneForm.dueDate || new Date().toISOString().slice(0, 10),
      completed: false,
      tasks: []
    };
    setMilestones(prev => [newMilestone, ...prev]);
    setShowMilestoneModal(false);
    setMilestoneForm({ title: '', description: '', dueDate: '' });
  };

  const [detailModal, setDetailModal] = useState<{ open: boolean; ev?: TimelineEvent }>({ open: false });
  const allEvents = useMemo(() => {
    const merged = [...baseEvents];
    return merged.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [baseEvents]);

  const getMilestoneIdFromEvent = (ev: TimelineEvent): number | undefined => {
    const metaId = (ev.meta as any)?.milestoneId as number | undefined;
    if (metaId != null) return metaId;
    const parts = String(ev.id).split('-');
    const parsed = parseInt(parts[1], 10);
    return Number.isFinite(parsed) ? parsed : undefined;
  };

  // Mini-Gantt: next 6 weeks buckets
  const weekBuckets = useMemo(() => {
    const start = new Date();
    const day = start.getDay();
    const diffToMonday = (day + 6) % 7; // 0=Sun -> 6, 1=Mon -> 0
    const monday = new Date(start);
    monday.setDate(start.getDate() - diffToMonday);
    monday.setHours(0, 0, 0, 0);
    const buckets: Array<{ label: string; start: Date; end: Date; counts: { milestones: number; tasks: number; activity: number } }> = [];
    for (let i = 0; i < 6; i++) {
      const s = new Date(monday);
      s.setDate(monday.getDate() + i * 7);
      const e = new Date(s);
      e.setDate(s.getDate() + 6);
      e.setHours(23, 59, 59, 999);
      const label = `${s.toLocaleDateString()} - ${e.toLocaleDateString()}`;
      const counts = { milestones: 0, tasks: 0, activity: 0 };
      allEvents.forEach(ev => {
        const d = new Date(ev.date);
        if (d >= s && d <= e) {
          if (ev.type === 'milestone') counts.milestones += 1;
          else if (ev.type === 'task') counts.tasks += 1;
          else counts.activity += 1;
        }
      });
      buckets.push({ label, start: s, end: e, counts });
    }
    return buckets;
  }, [allEvents]);

  const visible = useMemo(() => {
    const now = new Date();
    return allEvents.filter(ev => {
      const byType = typeFilter === 'all' ? true : ev.type === typeFilter;
      const byRange = rangeFilter === 'all' ? true : rangeFilter === 'upcoming' ? new Date(ev.date) >= now : new Date(ev.date) < now;
      const bySearch = search.trim() ? (ev.title + ' ' + (ev.description || '')).toLowerCase().includes(search.toLowerCase()) : true;
      return byType && byRange && bySearch;
    });
  }, [allEvents, typeFilter, rangeFilter, search]);

  const statusBadge = (ev: TimelineEvent) => {
    switch (ev.status) {
      case 'completed':
        return <Badge variant="success" size="sm">Completed</Badge>;
      case 'in-progress':
        return <Badge variant="warning" size="sm">In Progress</Badge>;
      case 'redo':
        return <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 border border-rose-200">Redo</span>;
      case 'review':
        return <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 border border-amber-200">Review</span>;
      default:
        return <Badge variant="default" size="sm">Planned</Badge>;
    }
  };

  // 30-day schedule (Gantt-like) for tasks/milestones
  const scheduleStart = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);
  const scheduleDays = 30;
  const dayMillis = 24 * 60 * 60 * 1000;
  const scheduleItems = useMemo(() => {
    const items = allEvents
      .filter(e => e.type === 'task' || e.type === 'milestone')
      .slice(0, 12) // cap rows for readability
      .map(ev => {
        const start = ev.type === 'task'
          ? new Date(((ev.meta as any)?.createdAt as string) || ev.date)
          : new Date(((ev.meta as any)?.dueDate as string) || ev.date);
        const end = ev.type === 'task'
          ? new Date(((ev.meta as any)?.dueDate as string) || ev.date)
          : new Date(((ev.meta as any)?.dueDate as string) || ev.date);
        const startIdx = Math.max(0, Math.floor((start.getTime() - scheduleStart.getTime()) / dayMillis));
        const endIdx = Math.min(scheduleDays - 1, Math.max(startIdx, Math.floor((end.getTime() - scheduleStart.getTime()) / dayMillis)));
        return { ev, startIdx, endIdx };
      });
    return items;
  }, [allEvents, scheduleStart]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold text-black">Project Timeline</h2>
          <div className="hidden md:flex items-center gap-2 ml-2">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as EventType | 'all')}
              className="px-2 py-1 border border-gray-300 rounded bg-white text-black text-sm"
            >
              <option value="all">All Types</option>
              <option value="milestone">Milestones</option>
              <option value="task">Tasks</option>
              <option value="activity">Activity</option>
              <option value="release">Releases</option>
              <option value="note">Notes</option>
            </select>
            <select
              value={rangeFilter}
              onChange={(e) => setRangeFilter(e.target.value as 'upcoming' | 'past' | 'all')}
              className="px-2 py-1 border border-gray-300 rounded bg-white text-black text-sm"
            >
              <option value="all">All</option>
              <option value="upcoming">Upcoming</option>
              <option value="past">Past</option>
            </select>
            <div className="relative">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search timeline..."
                className="pl-8 pr-3 py-1 border border-gray-300 rounded text-black text-sm"
              />
              <svg className="w-4 h-4 text-gray-500 absolute left-2 top-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={exportJson}>Export</Button>
          {canWrite && (
            <Button size="sm" onClick={() => setShowMilestoneModal(true)}>Add Milestone</Button>
          )}
        </div>
      </div>

      {/* Mini-Gantt overview (next 6 weeks) */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="text-sm font-semibold text-black mb-3">Next 6 Weeks Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {weekBuckets.map((w, idx) => (
            <div key={idx} className="border border-gray-200 rounded-lg p-3">
              <div className="text-xs text-gray-700 mb-2">{w.label}</div>
              <div className="flex items-center gap-2 text-[11px]">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-200">M {w.counts.milestones}</span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">T {w.counts.tasks}</span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-50 text-gray-700 border border-gray-200">A {w.counts.activity}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Schedule (30 days) */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 overflow-auto">
        <h3 className="text-sm font-semibold text-black mb-3">Schedule (Next 30 Days)</h3>
        <div className="min-w-[900px]">
          <div className="grid" style={{ gridTemplateColumns: `200px repeat(${scheduleDays}, minmax(20px, 1fr))` }}>
            {/* Header */}
            <div></div>
            {Array.from({ length: scheduleDays }).map((_, i) => (
              <div key={i} className="text-[10px] text-gray-500 text-center">
                {new Date(scheduleStart.getTime() + i * dayMillis).toLocaleDateString(undefined, { month: 'numeric', day: 'numeric' })}
              </div>
            ))}
            {/* Today marker row */}
            <div className="col-span-1"></div>
            {Array.from({ length: scheduleDays }).map((_, i) => {
              const isToday = (new Date(scheduleStart.getTime() + i * dayMillis)).toDateString() === new Date().toDateString();
              return (
                <div key={`tm-${i}`} className={`h-[2px] ${isToday ? 'bg-indigo-500' : 'bg-transparent'}`}></div>
              );
            })}
            {/* Rows */}
            {scheduleItems.map(({ ev, startIdx, endIdx }, row) => (
              <React.Fragment key={`row-${row}`}>
                <div key={`lbl-${row}`} className="text-xs text-black pr-2 py-2 flex items-center border-t border-gray-100">
                  <span className="truncate" title={ev.title}>{ev.title}</span>
                </div>
                {Array.from({ length: scheduleDays }).map((_, i) => (
                  <div key={`cell-${row}-${i}`} className="relative h-8 border-t border-gray-100">
                    {i === startIdx && (
                      <div
                        className={`absolute top-1 left-0 h-6 rounded ${ev.type === 'milestone' ? 'bg-green-500' : ev.status === 'redo' ? 'bg-rose-500' : ev.status === 'review' ? 'bg-amber-500' : 'bg-blue-500'} cursor-pointer`}
                        style={{ width: `${(endIdx - startIdx + 1) * 100}%`, insetInlineEnd: 'auto' }}
                        title={`${ev.title}`}
                        onClick={() => setDetailModal({ open: true, ev })}
                      />
                    )}
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline List */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6">
          {visible.length === 0 ? (
            <div className="text-sm text-gray-700 text-center py-10">No timeline events</div>
          ) : (
            <ul className="space-y-4">
              {visible.map(ev => (
                <li key={ev.id} className="flex items-start gap-3 p-4 rounded-lg border border-gray-200 hover:border-gray-300 cursor-pointer" onClick={() => setDetailModal({ open: true, ev })}>
                  <div className="w-2 h-2 mt-1.5 rounded-full bg-indigo-500" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 min-w-0">
                        <h4 className="text-sm font-semibold text-black truncate">{ev.title}</h4>
                        {statusBadge(ev)}
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 border border-gray-200 capitalize">{ev.type}</span>
                      </div>
                      <span className="text-xs text-gray-500">{new Date(ev.date).toLocaleString()}</span>
                    </div>
                    {ev.description && (
                      <p className="text-xs text-gray-700 mt-1">{ev.description}</p>
                    )}
                    {(ev.type === 'task' && ((ev.meta as any)?.priority != null)) && (
                      <div className="mt-2">
                        {
                          // Compute once, then render Badge directly
                        }
                        <Badge
                          variant={(String((ev.meta as any)?.priority || '') === 'high' ? 'error' : String((ev.meta as any)?.priority || '') === 'medium' ? 'warning' : 'success') as any}
                          size="sm"
                        >
                          Priority: {String((ev.meta as any)?.priority || '')}
                        </Badge>
                      </div>
                    )}
                    {(ev.type === 'task' && ev.status === 'redo' && (ev.meta as any)?.redoFeedback) && (
                      <div className="mt-2 px-3 py-2 rounded bg-rose-50 border border-rose-200">
                        <div className="text-[11px] font-semibold text-rose-700 mb-1">Redo Feedback</div>
                        <div className="text-xs text-rose-700">{String((ev.meta as any).redoFeedback)}</div>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Event Details Modal */}
      {detailModal.open && detailModal.ev && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-black">Timeline Event</h3>
              <button onClick={() => setDetailModal({ open: false })} className="text-gray-500 hover:text-black">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-semibold text-black">{detailModal.ev.title}</h4>
                {statusBadge(detailModal.ev)}
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 border border-gray-200 capitalize">{detailModal.ev.type}</span>
              </div>
              <div className="text-xs text-gray-500">{new Date(detailModal.ev.date).toLocaleString()}</div>
              {detailModal.ev.description && (
                <p className="text-sm text-gray-800">{detailModal.ev.description}</p>
              )}
              {detailModal.ev.type === 'task' && (detailModal.ev.meta as any)?.redoFeedback && (
                <div className="px-3 py-2 rounded bg-rose-50 border border-rose-200">
                  <div className="text-[11px] font-semibold text-rose-700 mb-1">Redo Feedback</div>
                  <div className="text-xs text-rose-700">{String((detailModal.ev.meta as any).redoFeedback)}</div>
                </div>
              )}
            </div>
            <div className="flex items-center justify-end gap-2 mt-6">
              {canWrite && detailModal.ev.type === 'milestone' && (
                <>
                  <Button
                    variant="outline"
                    onClick={() => {
                      const id = getMilestoneIdFromEvent(detailModal.ev!);
                      if (id == null) return;
                      setMilestones(prev => prev.map(m => m.id === id ? { ...m, completed: true } : m));
                      setDetailModal(dm => dm.ev ? { open: true, ev: { ...dm.ev, status: 'completed' } } : dm);
                    }}
                  >
                    Mark Completed
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      const id = getMilestoneIdFromEvent(detailModal.ev!);
                      if (id == null) return;
                      setMilestones(prev => prev.map(m => m.id === id ? { ...m, completed: false } : m));
                      setDetailModal(dm => dm.ev ? { open: true, ev: { ...dm.ev, status: 'planned' } } : dm);
                    }}
                  >
                    Mark In Progress
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      const id = getMilestoneIdFromEvent(detailModal.ev!);
                      if (id == null) return;
                      setMilestones(prev => prev.filter(m => m.id !== id));
                      setDetailModal({ open: false });
                    }}
                  >
                    Remove
                  </Button>
                </>
              )}
              <Button variant="outline" onClick={() => setDetailModal({ open: false })}>Close</Button>
            </div>
            {detailModal.ev.type !== 'milestone' && (
              <div className="text-[11px] text-gray-500 mt-2">
                To update status, please use the Tasks tab or relevant section.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Add Milestone Modal */}
      {showMilestoneModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-black">Add Milestone</h3>
              <button onClick={() => setShowMilestoneModal(false)} className="text-gray-500 hover:text-black">
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
                  value={milestoneForm.title}
                  onChange={(e) => setMilestoneForm(f => ({ ...f, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-black"
                  placeholder="Milestone title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-1">Description</label>
                <textarea
                  rows={3}
                  value={milestoneForm.description}
                  onChange={(e) => setMilestoneForm(f => ({ ...f, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-black"
                  placeholder="Milestone description"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-1">Due Date</label>
                <input
                  type="date"
                  value={milestoneForm.dueDate}
                  onChange={(e) => setMilestoneForm(f => ({ ...f, dueDate: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-black"
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setShowMilestoneModal(false)}>Cancel</Button>
              <Button onClick={createMilestone} disabled={!milestoneForm.title.trim()}>Create</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
