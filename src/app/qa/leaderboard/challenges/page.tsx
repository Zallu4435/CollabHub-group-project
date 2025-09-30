'use client'
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Search, Filter, Clock, Users, Award, ChevronRight } from 'lucide-react'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { challenges as seed } from '../../lib/dummy-data/challenges'

export default function AllChallengesPage() {
  const searchParams = useSearchParams()
  const [query, setQuery] = useState('')
  const [type, setType] = useState<'all' | 'daily' | 'weekly' | 'monthly'>('all')
  const [sort, setSort] = useState<'popular' | 'ending' | 'newest'>('popular')
  const [showHistory, setShowHistory] = useState(false)

  useEffect(() => {
    const view = searchParams?.get('view')
    if (view === 'history') setShowHistory(true)
  }, [searchParams])

  const counts = useMemo(() => {
    return {
      all: seed.length,
      daily: seed.filter(c => c.type === 'daily').length,
      weekly: seed.filter(c => c.type === 'weekly').length,
      monthly: seed.filter(c => c.type === 'monthly').length
    }
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const base = seed.filter(c => {
      const matchesQ = !q || c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)
      const matchesType = type === 'all' || c.type === type
      return matchesQ && matchesType
    })
    const sorted = [...base]
    if (sort === 'popular') {
      sorted.sort((a, b) => b.participants - a.participants)
    } else if (sort === 'ending') {
      sorted.sort((a, b) => (a.timeLeft || '').localeCompare(b.timeLeft || ''))
    } else {
      sorted.sort((a, b) => Number(b.id) - Number(a.id))
    }
    return sorted
  }, [query, type, sort])

  const history = [
    { id: 'h1', title: 'September Helper', participants: 234, badge: 'Monthly Contributor', date: 'Sep 2024' },
    { id: 'h2', title: 'Code Review Week', participants: 89, badge: 'Code Reviewer', date: 'Aug 2024' },
    { id: 'h3', title: 'Knowledge Seeker', participants: 245, badge: 'Seeker', date: 'Apr 2024' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">All Challenges</h1>
              <p className="text-sm text-gray-600">Browse active challenges and historical archives</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search challenges..."
                  className="pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="hidden md:flex bg-gray-100 rounded-lg p-1">
                {([
                  { id: 'all', label: 'All', count: counts.all },
                  { id: 'daily', label: 'Daily', count: counts.daily },
                  { id: 'weekly', label: 'Weekly', count: counts.weekly },
                  { id: 'monthly', label: 'Monthly', count: counts.monthly }
                ] as Array<{ id: 'all' | 'daily' | 'weekly' | 'monthly'; label: string; count: number }>).map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => { setType(opt.id); setShowHistory(false) }}
                    className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${type === opt.id && !showHistory ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-800'}`}
                  >
                    {opt.label}
                    <span className="ml-2 inline-block text-xs bg-gray-200 rounded-full px-2 py-0.5">{opt.count}</span>
                  </button>
                ))}
                <button
                  onClick={() => setShowHistory(true)}
                  className={`ml-1 px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${showHistory ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-800'}`}
                >
                  History
                </button>
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <select
                  value={sort}
                  onChange={e => setSort(e.target.value as any)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="popular">Most popular</option>
                  <option value="ending">Ending soon</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-gray-600">{filtered.length} challenge{filtered.length !== 1 ? 's' : ''} found</div>
          {!showHistory && (
            <Link href="/qa/leaderboard/challenges?view=history" className="text-sm text-blue-600 hover:text-blue-800">View all history</Link>
          )}
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map(c => (
            <Card key={c.id} className="p-5 hover:shadow-md transition-shadow relative">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-gray-900">{c.title}</h3>
                <Badge variant={c.type === 'daily' ? 'primary' : c.type === 'weekly' ? 'secondary' : 'warning'} size="sm">
                  {c.type}
                </Badge>
              </div>
              <p className="text-sm text-gray-700 mb-4 line-clamp-3">{c.description}</p>
              <div className="grid grid-cols-2 gap-3 text-xs text-gray-600 mb-4">
                <div className="flex items-center gap-1"><Clock className="w-3 h-3" />{c.timeLeft} left</div>
                <div className="flex items-center gap-1"><Users className="w-3 h-3" />{c.participants} joined</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-yellow-600" />
                  <span className="text-sm font-medium text-gray-900">{c.reward.badge}</span>
                  <Badge variant="warning" size="sm">+{c.reward.reputation}</Badge>
                </div>
                <Link href={`/qa/leaderboard/challenge/${c.id}`} className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors">
                  View full challenge
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </Card>
          ))}
        </div>

        {showHistory && (
          <div className="mt-12">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">History</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {history.map(h => (
                <Card key={h.id} className="p-4 hover:shadow-sm transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900 text-sm">{h.title}</h4>
                    <div className="text-xs text-gray-500">{h.date}</div>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1 text-gray-600"><Users className="w-3 h-3" />{h.participants} users</div>
                    <div className="flex items-center gap-1 text-blue-600"><Award className="w-3 h-3" />{h.badge}</div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}


