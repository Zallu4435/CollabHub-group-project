"use client"

import { useState } from 'react'
import { Shield, Key, Lock, EyeOff, AlertTriangle, Globe, GitBranch } from 'lucide-react'
import { Card } from '../../../qa/components/ui/Card'
import { Button } from '../../../qa/components/ui/Button'

export default function SecuritySettings() {
  const [enforce2FA, setEnforce2FA] = useState<boolean>(false)
  const [rateLimit, setRateLimit] = useState<number>(60)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Security</h1>
          <p className="text-gray-600">Roles, permissions, auth providers and protections</p>
        </div>
        <Button variant="primary" size="sm">Save changes</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6 lg:col-span-2">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-600" /> Access Controls
          </h3>
          <div className="space-y-4 text-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">Enforce 2FA</div>
                <div className="text-gray-600">Require two-factor authentication for moderators and above</div>
              </div>
              <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={enforce2FA} onChange={(e) => setEnforce2FA(e.target.checked)} />
                <div className="w-10 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 transition-colors relative">
                  <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${enforce2FA ? 'translate-x-4' : ''}`} />
                </div>
              </label>
            </div>

            <div>
              <div className="font-medium text-gray-900 mb-1">Role & Permission Matrix</div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border">
                  <thead className="bg-gray-50">
                    <tr>
                      {['Permission','Member','Trusted','Moderator','Admin'].map(h => (
                        <th key={h} className="px-3 py-2 text-gray-600 font-medium border-b">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Create Question','✓','✓','✓','✓'],
                      ['Delete Question','—','—','✓','✓'],
                      ['Suspend User','—','—','✓','✓'],
                      ['Edit Settings','—','—','—','✓'],
                    ].map((row, i) => (
                      <tr key={i} className="odd:bg-white even:bg-gray-50">
                        {row.map((cell, j) => (
                          <td key={j} className="px-3 py-2 border-b text-gray-700">{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Key className="w-5 h-5 text-yellow-600" /> Authentication
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between"><span className="text-gray-600">Providers</span><span className="font-medium">Email, Google, GitHub</span></div>
            <div className="flex items-center justify-between"><span className="text-gray-600">SSO</span><span className="font-medium">Disabled</span></div>
            <div className="flex items-center justify-between"><span className="text-gray-600">Session Strategy</span><span className="font-medium">JWT</span></div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <Card className="p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Lock className="w-5 h-5 text-purple-600" /> Rate Limits
          </h3>
          <div className="space-y-4 text-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">Requests per minute</div>
                <div className="text-gray-600">Anonymous/IP baseline</div>
              </div>
              <input type="number" value={rateLimit} onChange={(e) => setRateLimit(parseInt(e.target.value || '0', 10))} className="w-24 px-3 py-2 border rounded-lg" />
            </div>
            <div className="text-xs text-gray-500">Separate roles can override these defaults.</div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <EyeOff className="w-5 h-5 text-red-600" /> Abuse Protection
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between"><span className="text-gray-600">IP Bans</span><span className="font-medium">3 active</span></div>
            <div className="flex items-center justify-between"><span className="text-gray-600">Word Filters</span><span className="font-medium">Enabled</span></div>
            <div className="flex items-center justify-between"><span className="text-gray-600">Device Fingerprints</span><span className="font-medium">Enabled</span></div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-600" /> Audit Hooks
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between"><span className="text-gray-600">Log Admin Actions</span><span className="font-medium">Enabled</span></div>
            <div className="flex items-center justify-between"><span className="text-gray-600">Retention</span><span className="font-medium">90 days</span></div>
            <div className="flex items-center justify-between"><span className="text-gray-600">Export</span><span className="font-medium">CSV/JSON</span></div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <Card className="p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5 text-teal-600" /> CORS & Origins
          </h3>
          <div className="text-sm text-gray-700">Allowed: https://example.com, https://admin.example.com</div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-gray-700" /> Webhooks
          </h3>
          <div className="text-sm text-gray-700">Events: question.created, answer.accepted, user.suspended</div>
        </Card>
      </div>
    </div>
  )
}


