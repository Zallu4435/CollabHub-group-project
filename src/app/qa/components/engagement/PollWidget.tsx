// qa/components/engagement/PollWidget.tsx
'use client'

import { useEffect, useMemo, useState } from 'react'
import { Check, BarChart2 } from 'lucide-react'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'

export type PollOption = { id: string; label: string; votes: number }

export interface PollWidgetProps {
  pollId: string
  question?: string
  options: PollOption[]
  allowMultiple?: boolean
  className?: string
}

export default function PollWidget({
  pollId,
  question,
  options,
  allowMultiple = false,
  className = ''
}: PollWidgetProps) {
  const storageKey = `qa_poll_vote_${pollId}`
  const [selected, setSelected] = useState<string[]>([])
  const [results, setResults] = useState<PollOption[]>(options)
  const totalVotes = useMemo(() => results.reduce((s, o) => s + o.votes, 0), [results])
  const hasVoted = useMemo(() => selected.length === 0 && typeof window !== 'undefined' && !!localStorage.getItem(storageKey), [selected, storageKey])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const saved = localStorage.getItem(storageKey)
    if (saved) {
      try {
        const ids = JSON.parse(saved) as string[]
        setSelected(ids)
      } catch {}
    }
  }, [storageKey])

  const toggle = (id: string) => {
    if (hasVoted) return
    setSelected(prev => {
      if (allowMultiple) {
        return prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
      }
      return prev.includes(id) ? [] : [id]
    })
  }

  const submit = () => {
    if (selected.length === 0) return
    const updated = results.map(o => ({
      ...o,
      votes: selected.includes(o.id) ? o.votes + 1 : o.votes
    }))
    setResults(updated)
    if (typeof window !== 'undefined') localStorage.setItem(storageKey, JSON.stringify(selected))
    setSelected([])
  }

  return (
    <Card className={`p-4 ${className}`}>
      <div className="flex items-center gap-2 mb-3">
        <BarChart2 className="w-4 h-4 text-blue-600" />
        <span className="text-sm font-semibold text-gray-900">Quick Poll</span>
      </div>
      {question && <div className="text-sm text-gray-800 mb-3">{question}</div>}

      <div className="space-y-2">
        {results.map(option => {
          const pct = totalVotes === 0 ? 0 : Math.round((option.votes / totalVotes) * 100)
          const isChosen = selected.includes(option.id)
          return (
            <button
              key={option.id}
              onClick={() => toggle(option.id)}
              className={`w-full text-left relative border rounded-lg p-2 transition-colors ${
                isChosen ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'
              }`}
              disabled={hasVoted}
            >
              <div className="flex items-center justify-between gap-2 relative z-10">
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center justify-center w-4 h-4 rounded-sm border ${isChosen ? 'bg-blue-600 border-blue-600' : 'border-gray-300'}`}>
                    {isChosen && <Check className="w-3 h-3 text-white" />}
                  </span>
                  <span className="text-sm text-gray-800">{option.label}</span>
                </div>
                <span className="text-xs text-gray-600">{pct}% ({option.votes})</span>
              </div>
              <div className="absolute inset-0 rounded-lg overflow-hidden">
                <div className="h-full bg-blue-100" style={{ width: `${pct}%` }} />
              </div>
            </button>
          )
        })}
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div className="text-xs text-gray-500">{totalVotes} vote{totalVotes !== 1 ? 's' : ''}</div>
        {!hasVoted && (
          <Button size="sm" variant="secondary" onClick={submit} disabled={selected.length === 0}>
            Submit vote
          </Button>
        )}
      </div>
    </Card>
  )
}
