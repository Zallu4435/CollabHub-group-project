"use client"

import { useState } from 'react'
import { FileDown, BarChart2, Calendar, Filter, Download, Mail, TrendingUp, PieChart, Clock, CheckCircle2, AlertTriangle, FileSpreadsheet, Settings } from 'lucide-react'
import { Card } from '../../../qa/components/ui/Card'
import { Button } from '../../../qa/components/ui/Button'

export default function ReportsPanel() {
  const [range, setRange] = useState<'week' | 'month' | 'quarter'>('week')
  const [format, setFormat] = useState<'csv' | 'json' | 'xlsx'>('csv')

  const presets = [
    { id: 'weekly-kpis', name: 'Weekly KPIs' },
    { id: 'moderation-load', name: 'Moderation Load' },
    { id: 'unanswered-cohort', name: 'Unanswered Cohort' },
  ] as const

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-600">Generate exports and schedule recurring reports</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm"><Mail className="w-4 h-4 mr-1" /> Schedule</Button>
          <Button variant="primary" size="sm"><Download className="w-4 h-4 mr-1" /> Export</Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Reports Generated</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">128</p>
            </div>
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
          </div>
          <p className="text-xs text-green-600 mt-2 inline-flex items-center gap-1"><TrendingUp className="w-3 h-3" /> +12% this month</p>
        </Card>
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Scheduled Reports</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">7</p>
            </div>
            <div className="p-2 rounded-lg bg-purple-50 text-purple-600">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Next: Fri, 9:00 AM</p>
        </Card>
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Last Export</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">Success</p>
            </div>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2 inline-flex items-center gap-1"><Clock className="w-3 h-3" /> 12 min ago</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6 lg:col-span-2">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-blue-600" /> Preset Reports
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {presets.map((p) => (
              <Card key={p.id} className="p-5 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                    <PieChart className="w-4 h-4" />
                  </div>
                  <div className="text-sm font-medium text-gray-900">{p.name}</div>
                </div>
                <div className="text-xs text-gray-600">Click to preview and export</div>
              </Card>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Filter className="w-5 h-5 text-yellow-600" /> Parameters
          </h3>
          <div className="space-y-4 text-sm">
            <div>
              <div className="text-gray-700 mb-1">Date Range</div>
              <div className="flex gap-2">
                {(['week','month','quarter'] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => setRange(r)}
                    className={`px-3 py-1.5 rounded border text-sm ${range === r ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300'}`}
                  >{r}</button>
                ))}
              </div>
            </div>
            <div>
              <div className="text-gray-700 mb-1">Format</div>
              <div className="flex gap-2">
                {(['csv','json','xlsx'] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFormat(f)}
                    className={`px-3 py-1.5 rounded border text-sm ${format === f ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300'}`}
                  >{f.toUpperCase()}</button>
                ))}
              </div>
            </div>
            <div>
              <div className="text-gray-700 mb-1">Columns</div>
              <div className="grid grid-cols-2 gap-2">
                {[ 'Title', 'Owner', 'Status', 'Created', 'Updated', 'Tags' ].map((c) => (
                  <label key={c} className="inline-flex items-center gap-2 text-gray-700">
                    <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                    <span className="text-xs">{c}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <div className="text-gray-700 mb-1">Destination</div>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option>Download</option>
                <option>Email to me</option>
                <option>Send to Slack</option>
              </select>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <Card className="p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-purple-600" /> Scheduled Reports
          </h3>
          <div className="space-y-3 text-sm">
            {[
              { name: 'Weekly KPIs', cadence: 'Every Monday, 9:00 AM', target: 'ops@company.com' },
              { name: 'Moderation Load', cadence: 'Daily, 8:00 AM', target: '#moderation' },
              { name: 'Unanswered Cohort', cadence: 'First of month, 7:00 AM', target: 'analytics@company.com' },
            ].map((r, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">{r.name}</div>
                  <div className="text-xs text-gray-600">{r.cadence} • {r.target}</div>
                </div>
                <button className="px-2.5 py-1 text-xs border border-gray-200 rounded-lg hover:bg-gray-100">Manage</button>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <FileDown className="w-5 h-5 text-green-600" /> Recent Exports
            </h3>
            <button className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 inline-flex items-center gap-2"><Settings className="w-4 h-4" /> Configure</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-3 py-2">Report</th>
                  <th className="px-3 py-2">Format</th>
                  <th className="px-3 py-2">Created</th>
                  <th className="px-3 py-2">Status</th>
                  <th className="px-3 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Weekly KPIs', format: 'CSV', created: 'Today 09:12', status: 'success' },
                  { name: 'Moderation Load', format: 'XLSX', created: 'Yesterday 17:45', status: 'success' },
                  { name: 'Unanswered Cohort', format: 'JSON', created: '2 days ago', status: 'warning' },
                ].map((row, idx) => (
                  <tr key={idx} className="border-b last:border-b-0">
                    <td className="px-3 py-2 text-gray-900">{row.name}</td>
                    <td className="px-3 py-2">{row.format}</td>
                    <td className="px-3 py-2 text-gray-600">{row.created}</td>
                    <td className="px-3 py-2">
                      <span className={`px-2 py-0.5 rounded text-xs font-semibold inline-flex items-center gap-1 ${row.status === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>
                        {row.status === 'success' ? <CheckCircle2 className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                        {row.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-3 py-2">
                      <button className="px-2 py-1 border border-gray-200 rounded-lg text-xs hover:bg-gray-50">Download</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  )
}


