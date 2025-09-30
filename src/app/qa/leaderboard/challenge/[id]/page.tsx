'use client'
import { useMemo, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Award, Clock, Users, CheckCircle2 } from 'lucide-react'
import { Card } from '../../../components/ui/Card'
import { Badge } from '../../../components/ui/Badge'
import { Button } from '../../../components/ui/Button'
import { questions } from '../../../lib/dummy-data/questions'

// Local dummy model in this page (kept minimal to avoid deep imports)
interface Challenge {
  id: string
  title: string
  description: string
  type: 'daily' | 'weekly' | 'monthly'
  target: number
  current: number
  participants: number
  timeLeft: string
  reward: { badge: string; reputation: number }
}

const mock: Challenge[] = [
  { id: '1', title: 'Daily Helper', description: 'Answer 3 unanswered questions today', type: 'daily', target: 3, current: 1, participants: 45, timeLeft: '14h 32m', reward: { badge: 'Daily Helper', reputation: 50 } },
  { id: '2', title: 'Quality Contributor', description: 'Get 10 upvotes on your answers this week', type: 'weekly', target: 10, current: 7, participants: 123, timeLeft: '3d 8h', reward: { badge: 'Quality Week', reputation: 100 } },
  { id: '3', title: 'Knowledge Seeker', description: 'Ask 5 well-researched questions this month', type: 'monthly', target: 5, current: 2, participants: 67, timeLeft: '12d 15h', reward: { badge: 'Curious Mind', reputation: 150 } }
]

export default function ChallengeDetailPage() {
  const router = useRouter()
  const { id } = useParams<{ id: string }>()
  const challenge = useMemo(() => mock.find(c => c.id === id) || mock[0], [id])

  const [progress, setProgress] = useState(0)
  const [completed, setCompleted] = useState(false)
  const [claimed, setClaimed] = useState(false)
  const [completionRef, setCompletionRef] = useState<string | null>(null)
  const [attempts, setAttempts] = useState<Array<{ id: string; questionId: string; url?: string; note?: string; status: 'pending' | 'approved' }>>([])
  const [newAttempt, setNewAttempt] = useState<{ questionId: string; url: string; note: string }>({ questionId: '', url: '', note: '' })

  const percent = Math.min((progress / challenge.target) * 100, 100)

  const increment = (n: number) => {
    setProgress(prev => {
      const next = Math.min(prev + n, challenge.target)
      if (next >= challenge.target) setCompleted(true)
      return next
    })
  }

  const claim = () => {
    if (!completed) return
    setClaimed(true)
    if (!completionRef) {
      const date = new Date().toISOString().slice(0, 10).replace(/-/g, '')
      setCompletionRef(`CHLG-${challenge.id}-${date}`)
    }
  }

  const submitAttempt = () => {
    const pickedId = newAttempt.questionId || ''
    const enteredUrl = newAttempt.url?.trim()
    if (!pickedId && !enteredUrl) return
    const idGen = `att-${Date.now()}`
    setAttempts(prev => [...prev, { id: idGen, questionId: pickedId, url: enteredUrl, note: newAttempt.note || '', status: 'pending' }])
    setNewAttempt({ questionId: '', url: '', note: '' })
    increment(1)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button onClick={() => router.back()} className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-blue-700">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <div className="mt-3 flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{challenge.title}</h1>
              <div className="mt-1 flex items-center gap-3 text-sm text-gray-600">
                <span className="capitalize">{challenge.type}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{challenge.timeLeft} left</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Users className="w-4 h-4" />{challenge.participants} joined</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-500">Reward</div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-600" />
                <span className="text-sm font-semibold text-gray-900">{challenge.reward.badge}</span>
                <Badge variant="warning" size="sm">+{challenge.reward.reputation} rep</Badge>
              </div>
              <div className="mt-3">
                <Link href="/qa/leaderboard/challenges" className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800">
                  View all challenges
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h3 className="font-semibold text-gray-900 mb-2">Overview</h3>
            <p className="text-gray-700 mb-4">{challenge.description}</p>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-1">
              <div className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600" style={{ width: `${percent}%` }} />
            </div>
            <div className="text-xs text-gray-600">Your progress: {progress}/{challenge.target}</div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold text-gray-900 mb-3">What to do</h3>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              <li>Follow the objective and rules shown on the challenge card</li>
              <li>Perform qualifying actions within the time window</li>
              <li>Quality matters: low-effort posts may not count</li>
            </ul>
            <div className="mt-4 flex items-center gap-2">
              {challenge.type === 'monthly' ? (
                <Link href="/qa/ask" className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium">Ask a Question</Link>
              ) : (
                <Link href="/qa" className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium">Find Questions to Answer</Link>
              )}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold text-gray-900 mb-3">Submit proof</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Pick question</label>
                <select
                  value={newAttempt.questionId}
                  onChange={(e) => setNewAttempt(prev => ({ ...prev, questionId: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select from dummy list</option>
                  {questions.slice(0, 8).map(q => (
                    <option key={q.id} value={q.id}>{q.title.slice(0, 50)}{q.title.length > 50 ? '…' : ''}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Or provide link</label>
                <input
                  value={newAttempt.url}
                  onChange={(e) => setNewAttempt(prev => ({ ...prev, url: e.target.value }))}
                  placeholder="https://example.com/your-post"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Note (optional)</label>
                <input
                  value={newAttempt.note}
                  onChange={(e) => setNewAttempt(prev => ({ ...prev, note: e.target.value }))}
                  placeholder="Short note"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <Button variant="primary" size="sm" onClick={submitAttempt}>Submit</Button>
              <div className="text-xs text-gray-500">Choose a question or paste a link. Each submission counts toward progress in this demo.</div>
            </div>
            <div className="mt-4">
              <h5 className="text-xs font-semibold text-gray-700 mb-2">Your submissions</h5>
              <div className="space-y-2">
                {attempts.length === 0 ? (
                  <div className="text-xs text-gray-500">No submissions yet.</div>
                ) : (
                  attempts.map(a => (
                    <div key={a.id} className="flex items-center justify-between text-sm bg-gray-50 border border-gray-200 rounded-md px-3 py-2">
                      <div className="min-w-0">
                        <div className="font-medium text-gray-900 truncate">
                          {a.url ? a.url : (questions.find(q => q.id === a.questionId)?.title || 'Question')}
                        </div>
                        {a.note ? (
                          <div className="text-xs text-gray-600 truncate">{a.note}</div>
                        ) : null}
                      </div>
                      <Badge variant={a.status === 'approved' ? 'success' : 'secondary'} size="sm">
                        {a.status}
                      </Badge>
                    </div>
                  ))
                )}
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold text-gray-900 mb-3">Demo: simulate progress</h3>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => increment(1)}>+1</Button>
              <Button variant="ghost" size="sm" onClick={() => increment(2)}>+2</Button>
              <Button variant="primary" size="sm" onClick={() => increment(challenge.target)}>Complete</Button>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="font-semibold text-gray-900 mb-3">Status</h3>
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">Completed</div>
              {completed ? (
                <Badge variant="success" size="sm" className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> Yes</Badge>
              ) : (
                <Badge variant="secondary" size="sm">No</Badge>
              )}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold text-gray-900 mb-3">Claim Reward</h3>
            <p className="text-sm text-gray-600 mb-3">Once completed, claim your badge and reputation.</p>
            <Button variant="primary" size="sm" disabled={!completed || claimed} onClick={claim}>
              {claimed ? 'Reward Claimed' : 'Claim Reward'}
            </Button>
            {claimed && completionRef && (
              <div className="mt-3 text-xs text-gray-700 flex items-center gap-2">
                <span>Reference:</span>
                <code className="px-2 py-0.5 bg-gray-100 rounded text-gray-800">{completionRef}</code>
                <button className="text-blue-600 hover:text-blue-800" onClick={() => navigator.clipboard?.writeText(completionRef)}>Copy</button>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}


