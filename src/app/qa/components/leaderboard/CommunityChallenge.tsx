// qa/components/leaderboard/CommunityChallenge.tsx
"use client"

import { useMemo, useState } from 'react'
import { Target, Clock, Users, Award, ChevronRight } from 'lucide-react'
import { Card } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { questions } from '../../lib/dummy-data/questions'
import Link from 'next/link'

interface Challenge {
  id: string
  title: string
  description: string
  type: 'daily' | 'weekly' | 'monthly'
  target: number
  current: number
  participants: number
  timeLeft: string
  reward: {
    badge: string
    reputation: number
  }
  isParticipating: boolean
}

const mockChallenges: Challenge[] = [
  {
    id: '1',
    title: 'Daily Helper',
    description: 'Answer 3 unanswered questions today',
    type: 'daily',
    target: 3,
    current: 1,
    participants: 45,
    timeLeft: '14h 32m',
    reward: {
      badge: 'Daily Helper',
      reputation: 50
    },
    isParticipating: true
  },
  {
    id: '2',
    title: 'Quality Contributor',
    description: 'Get 10 upvotes on your answers this week',
    type: 'weekly',
    target: 10,
    current: 7,
    participants: 123,
    timeLeft: '3d 8h',
    reward: {
      badge: 'Quality Week',
      reputation: 100
    },
    isParticipating: true
  },
  {
    id: '3',
    title: 'Knowledge Seeker',
    description: 'Ask 5 well-researched questions this month',
    type: 'monthly',
    target: 5,
    current: 2,
    participants: 67,
    timeLeft: '12d 15h',
    reward: {
      badge: 'Curious Mind',
      reputation: 150
    },
    isParticipating: false
  }
]

export default function CommunityChallenge({ className = '' }: { className?: string }) {
  const [challenges, setChallenges] = useState(mockChallenges)
  const [justJoinedId, setJustJoinedId] = useState<string | null>(null)
  const [selectedChallengeId, setSelectedChallengeId] = useState<string | null>(null)

  // Personal progress for the current user (dummy, local state only)
  const [userProgress, setUserProgress] = useState<Record<string, number>>(() => {
    const map: Record<string, number> = {}
    for (const c of mockChallenges) map[c.id] = Math.min(c.current, c.target)
    return map
  })
  const [completed, setCompleted] = useState<Record<string, boolean>>({})
  const [claimed, setClaimed] = useState<Record<string, boolean>>({})
  const [completionRef, setCompletionRef] = useState<Record<string, string>>({})
  const [attempts, setAttempts] = useState<Record<string, Array<{ id: string; questionId: string; url?: string; note?: string; status: 'pending' | 'approved' }>>>({})
  const [newAttempt, setNewAttempt] = useState<{ questionId: string; url: string; note: string }>({ questionId: '', url: '', note: '' })

  const generateCompletionRef = (challengeId: string) => {
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, '')
    return `CHLG-${challengeId}-${date}`
  }

  const selectedChallenge = useMemo(() => challenges.find(c => c.id === selectedChallengeId) || null, [challenges, selectedChallengeId])
  const selectedProgress = selectedChallenge ? userProgress[selectedChallenge.id] || 0 : 0

  const handleJoinChallenge = (challengeId: string) => {
    setChallenges(prev => 
      prev.map(challenge =>
        challenge.id === challengeId
          ? { ...challenge, isParticipating: true, participants: challenge.participants + 1 }
          : challenge
      )
    )
    setJustJoinedId(challengeId)
    setTimeout(() => setJustJoinedId(current => (current === challengeId ? null : current)), 2500)
    setSelectedChallengeId(challengeId)
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'daily': return 'primary'
      case 'weekly': return 'secondary'
      case 'monthly': return 'warning'
      default: return 'default'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'daily': return '🌅'
      case 'weekly': return '📅'
      case 'monthly': return '🗓️'
      default: return '🎯'
    }
  }

  const openDetails = (challengeId: string) => {
    // navigation handled via link on card
    setSelectedChallengeId(challengeId)
  }

  const incrementProgress = (challengeId: string, amount: number = 1) => {
    const challenge = challenges.find(c => c.id === challengeId)
    if (!challenge) return
    setUserProgress(prev => {
      const next = { ...prev }
      const currentValue = next[challengeId] || 0
      next[challengeId] = Math.min(currentValue + amount, challenge.target)
      return next
    })
    // Optionally reflect some global progress to make the bar move
    setChallenges(prev => prev.map(c => c.id === challengeId
      ? { ...c, current: Math.min(c.current + amount, c.target) }
      : c
    ))
    // Mark completed if reached target
    const nextValue = Math.min((userProgress[challengeId] || 0) + amount, challenge.target)
    if (nextValue >= challenge.target) {
      setCompleted(prev => ({ ...prev, [challengeId]: true }))
      setCompletionRef(prev => prev[challengeId] ? prev : ({ ...prev, [challengeId]: generateCompletionRef(challengeId) }))
    }
  }

  const completeChallenge = (challengeId: string) => {
    const challenge = challenges.find(c => c.id === challengeId)
    if (!challenge) return
    setUserProgress(prev => ({ ...prev, [challengeId]: challenge.target }))
    setChallenges(prev => prev.map(c => c.id === challengeId ? { ...c, current: c.target } : c))
    setCompleted(prev => ({ ...prev, [challengeId]: true }))
    setCompletionRef(prev => prev[challengeId] ? prev : ({ ...prev, [challengeId]: generateCompletionRef(challengeId) }))
  }

  const claimReward = (challengeId: string) => {
    if (!completed[challengeId]) return
    setClaimed(prev => ({ ...prev, [challengeId]: true }))
  }

  const addAttempt = (challengeId: string) => {
    if (!selectedChallenge) return
    const pickedId = newAttempt.questionId || ''
    const enteredUrl = newAttempt.url?.trim()
    if (!pickedId && !enteredUrl) return
    const id = `att-${Date.now()}`
    setAttempts(prev => {
      const list = prev[challengeId] || []
      return { ...prev, [challengeId]: [...list, { id, questionId: pickedId, url: enteredUrl, note: newAttempt.note || '', status: 'pending' }] }
    })
    // For demo, count each submission as progress +1
    incrementProgress(challengeId, 1)
    setNewAttempt({ questionId: '', url: '', note: '' })
  }

  const getSpecsForChallenge = (challenge: Challenge) => {
    // Dummy specifications by type
    if (challenge.type === 'daily') {
      return {
        objective: 'Answer 3 unanswered questions today',
        howToEarn: [
          'Post helpful, original answers',
          'Focus on questions with no accepted answer',
          'Avoid low-effort or copied content'
        ],
        rules: [
          'Only actions within today count',
          'Edits or comments do not count as answers',
          'Spam or duplicated content is disqualified'
        ],
        checklist: [
          'Find an unanswered question',
          'Write a clear and detailed solution',
          'Format code and cite references',
          'Post and monitor for feedback'
        ]
      }
    }
    if (challenge.type === 'weekly') {
      return {
        objective: 'Get 10 upvotes on your answers this week',
        howToEarn: [
          'Provide high-quality, well-explained answers',
          'Add references and runnable snippets',
          'Answer trending topics where you have expertise'
        ],
        rules: [
          'Only upvotes received this week count',
          'Self-votes or coordinated voting are not allowed',
          'Edits do not change vote counting rules'
        ],
        checklist: [
          'Pick questions you can answer expertly',
          'Explain the why, not only the how',
          'Add code and edge cases',
          'Follow up with clarifications'
        ]
      }
    }
    return {
      objective: 'Ask 5 well-researched questions this month',
      howToEarn: [
        'Include context, attempts, and expected outcomes',
        'Tag properly so experts can find your question',
        'Keep one problem per question'
      ],
      rules: [
        'Questions must follow community guidelines',
        'Low-effort or off-topic posts do not count',
        'Edits within the month are allowed'
      ],
      checklist: [
        'Describe the problem with examples',
        'Share minimal reproducible code (if relevant)',
        'List what you tried and errors seen',
        'Select accurate tags'
      ]
    }
  }

  const getCtaForChallenge = (challenge: Challenge) => {
    if (challenge.type === 'daily') {
      return { label: 'Answer Questions', href: '/qa' }
    }
    if (challenge.type === 'weekly') {
      return { label: 'Find Questions to Answer', href: '/qa' }
    }
    return { label: 'Ask a Question', href: '/qa/ask' }
  }

  return (
    <div className={className}>
      {/* Active Challenges */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {challenges.map(challenge => (
          <Card key={challenge.id} className="relative overflow-hidden">
            {justJoinedId === challenge.id && (
              <div className="absolute inset-x-0 top-0 z-20">
                <div className="m-3 rounded-lg bg-green-50 border border-green-200 px-3 py-2 text-sm text-green-800 shadow-sm">
                  You’ve joined this challenge! Progress will update as you contribute.
                </div>
              </div>
            )}
            {/* Challenge Type Badge */}
            <div className="absolute top-4 right-4 z-10">
              <Badge variant={getTypeColor(challenge.type)} size="sm">
                {getTypeIcon(challenge.type)} {challenge.type}
              </Badge>
            </div>

            {/* Header */}
            <div className="mb-6">
              <h3 className="font-bold text-lg text-gray-900 mb-2 pr-20">
                {challenge.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {challenge.description}
              </p>
            </div>

            {/* Progress Section */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-sm mb-3">
                <span className="text-gray-600 font-medium">Progress</span>
                <span className="font-bold text-gray-900">
                  {challenge.current}/{challenge.target}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((challenge.current / challenge.target) * 100, 100)}%` }}
                />
              </div>
              <div className="text-xs text-gray-500">
                {Math.round((challenge.current / challenge.target) * 100)}% complete
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <Users className="w-5 h-5 mx-auto mb-1 text-blue-600" />
                <div className="text-lg font-bold text-gray-900">{challenge.participants}</div>
                <div className="text-xs text-gray-600">participants</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <Clock className="w-5 h-5 mx-auto mb-1 text-orange-600" />
                <div className="text-lg font-bold text-gray-900">{challenge.timeLeft}</div>
                <div className="text-xs text-gray-600">time left</div>
              </div>
            </div>

            {/* Reward Section */}
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-5 h-5 text-yellow-600" />
                <span className="text-sm font-bold text-yellow-800">Rewards</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-yellow-700">
                  <span className="text-lg">🏆</span>
                  <span>{challenge.reward.badge} badge</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-yellow-700">
                  <span className="text-lg">⭐</span>
                  <span>+{challenge.reward.reputation} reputation points</span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            {challenge.isParticipating ? (
              <div className="flex items-center justify-between">
                <Badge variant="success" size="md" className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Participating
                </Badge>
                <Link
                  href={`/qa/leaderboard/challenge/${challenge.id}`}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <span>View full challenge</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              <Button
                variant="primary"
                size="md"
                onClick={() => handleJoinChallenge(challenge.id)}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
              >
                Join Challenge
              </Button>
            )}
          </Card>
        ))}
      </div>

      {/* Historical Challenges */}
      <div className="mt-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Previous Challenges</h3>
            <p className="text-sm text-gray-600">Completed community challenges and their achievements</p>
          </div>
          <Link href="/qa/leaderboard/challenges?view=history" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
            View All History
          </Link>
        </div>
        
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: 'September Helper', completed: 234, badge: 'Monthly Contributor', date: 'Sep 2024' },
            { title: 'Code Review Week', completed: 89, badge: 'Code Reviewer', date: 'Aug 2024' },
            { title: 'Beginner Mentor', completed: 156, badge: 'Mentor', date: 'Jul 2024' },
            { title: 'Quality Answers', completed: 312, badge: 'Quality Expert', date: 'Jun 2024' },
            { title: 'Community Builder', completed: 178, badge: 'Builder', date: 'May 2024' },
            { title: 'Knowledge Seeker', completed: 245, badge: 'Seeker', date: 'Apr 2024' }
          ].map((challenge, index) => (
            <Card key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">{challenge.title}</h4>
                  <p className="text-xs text-gray-600">{challenge.date}</p>
                </div>
                <div className="text-2xl">🏅</div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">Completed by</span>
                  <span className="font-semibold text-gray-900">{challenge.completed} users</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">Badge earned</span>
                  <span className="font-medium text-blue-600">{challenge.badge}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Details are now shown on the dedicated page */}
    </div>
  )
}
