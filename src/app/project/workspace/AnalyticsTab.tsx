// src/components/projects/workspace/AnalyticsTab.tsx
import React, { useMemo } from 'react';
import { Project, Task } from '../types';
import { mockTasks, mockActivities } from '../data';

interface AnalyticsTabProps {
  project: Project;
}

const formatPercent = (n: number) => `${Math.round(n)}%`;

export const AnalyticsTab: React.FC<AnalyticsTabProps> = ({ project }) => {
  const tasks = mockTasks as Task[];
  const currentRole = (project.currentUserRole || 'user') as 'owner' | 'admin' | 'editor' | 'viewer' | 'user';
  const canExport = ['owner', 'admin', 'editor'].includes(currentRole);

  const totals = useMemo(() => ({
    total: tasks.length,
    done: tasks.filter(t => t.status === 'done').length,
    review: tasks.filter(t => t.status === 'review').length,
    redo: tasks.filter(t => (t as any).status === 'redo').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    todo: tasks.filter(t => t.status === 'todo').length,
  }), [tasks]);

  const completionRate = totals.total ? (totals.done / totals.total) * 100 : 0;

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

  const activityCount7d = useMemo(() => {
    const now = new Date();
    const start = new Date(now);
    start.setDate(now.getDate() - 6);
    const counts: Record<string, number> = {};
    for (let i = 0; i < 7; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      counts[d.toISOString().slice(0, 10)] = 0;
    }
    mockActivities.forEach(a => {
      const key = a.timestamp.slice(0, 10);
      if (counts[key] != null) counts[key] += 1;
    });
    return counts;
  }, []);

  const exportJson = () => {
    const data = {
      projectId: project.id,
      completionRate,
      totals,
      throughput7d,
      avgLeadTimeDays,
      activityCount7d,
    };
    const a = document.createElement('a');
    a.href = 'data:application/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, null, 2));
    a.download = `analytics-${project.id}.json`;
    a.click();
  };

  const donutSegments = [
    { label: 'Done', value: totals.done, color: '#16a34a' },
    { label: 'Review', value: totals.review, color: '#f59e0b' },
    { label: 'Redo', value: totals.redo, color: '#f43f5e' },
    { label: 'In Progress', value: totals.inProgress, color: '#3b82f6' },
    { label: 'To Do', value: totals.todo, color: '#6b7280' },
  ];
  const donutTotal = donutSegments.reduce((a, s) => a + s.value, 0) || 1;
  let donutAccum = 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-black">Analytics</h2>
          <p className="text-sm text-gray-600">Insights for {project.title}</p>
        </div>
        {canExport && (
          <button onClick={exportJson} className="text-sm px-3 py-1.5 rounded border border-gray-300 hover:bg-gray-50">Export JSON</button>
        )}
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-500">Completion Rate</h3>
          <p className="text-3xl font-bold text-black mt-2">{formatPercent(completionRate)}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-500">Avg Lead Time</h3>
          <p className="text-3xl font-bold text-black mt-2">{avgLeadTimeDays} d</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-500">Tasks (7d)</h3>
          <p className="text-3xl font-bold text-black mt-2">{throughput7d.reduce((a, d) => a + d.created, 0)}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-500">Completed (7d)</h3>
          <p className="text-3xl font-bold text-black mt-2">{throughput7d.reduce((a, d) => a + d.done, 0)}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Donut: Status Distribution */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-black mb-4">Task Status Distribution</h3>
          <div className="flex items-center gap-6">
            <svg viewBox="0 0 36 36" className="w-40 h-40 -rotate-90">
              {donutSegments.map((seg, i) => {
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
            <div className="space-y-2">
              {donutSegments.map(seg => (
                <div key={seg.label} className="flex items-center gap-2 text-sm text-black">
                  <span className="w-3 h-3 rounded" style={{ backgroundColor: seg.color }} />
                  <span>{seg.label}</span>
                  <span className="text-gray-600">{seg.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Line: Throughput 7d */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-black mb-4">7-Day Throughput</h3>
          <div className="h-56">
            <svg viewBox="0 0 300 160" className="w-full h-full">
              {/* axes */}
              <line x1="30" y1="10" x2="30" y2="140" stroke="#e5e7eb" />
              <line x1="30" y1="140" x2="290" y2="140" stroke="#e5e7eb" />
              {/* scale */}
              {throughput7d.map((d, i) => {
                const x = 30 + i * ((260) / 6);
                const maxY = Math.max(1, ...throughput7d.map(t => Math.max(t.created, t.done)));
                const yCreated = 140 - (d.created / maxY) * 120;
                const yDone = 140 - (d.done / maxY) * 120;
                return (
                  <g key={d.date}>
                    <circle cx={x} cy={yCreated} r="3" fill="#3b82f6" />
                    <circle cx={x} cy={yDone} r="3" fill="#16a34a" />
                    <text x={x} y={150} fontSize="8" textAnchor="middle" fill="#6b7280">{d.date.slice(5)}</text>
                  </g>
                );
              })}
              {/* lines */}
              {throughput7d.slice(1).map((d, i) => {
                const maxY = Math.max(1, ...throughput7d.map(t => Math.max(t.created, t.done)));
                const x1 = 30 + i * (260 / 6);
                const x2 = 30 + (i + 1) * (260 / 6);
                const y1c = 140 - (throughput7d[i].created / maxY) * 120;
                const y2c = 140 - (d.created / maxY) * 120;
                const y1d = 140 - (throughput7d[i].done / maxY) * 120;
                const y2d = 140 - (d.done / maxY) * 120;
                return (
                  <g key={`l-${i}`}>
                    <line x1={x1} y1={y1c} x2={x2} y2={y2c} stroke="#3b82f6" />
                    <line x1={x1} y1={y1d} x2={x2} y2={y2d} stroke="#16a34a" />
                  </g>
                );
              })}
            </svg>
          </div>
          <div className="flex items-center gap-4 mt-2 text-xs text-gray-600">
            <div className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-blue-500" /> Created</div>
            <div className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-green-600" /> Done</div>
          </div>
        </div>
      </div>

      {/* Activity Summary */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-black mb-3">Activity (7 days)</h3>
        <div className="grid grid-cols-7 gap-2">
          {Object.entries(activityCount7d).map(([date, count]) => (
            <div key={date} className="text-center">
              <div className={`mx-auto w-8 h-8 rounded ${count === 0 ? 'bg-gray-100' : 'bg-indigo-100'} flex items-center justify-center text-xs text-black`}>{count}</div>
              <div className="text-[10px] text-gray-600 mt-1">{date.slice(5)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
