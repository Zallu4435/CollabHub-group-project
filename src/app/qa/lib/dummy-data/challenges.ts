// qa/lib/dummy-data/challenges.ts
export interface Challenge {
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

export const challenges: Challenge[] = [
  {
    id: '1',
    title: 'Daily Helper',
    description: 'Answer 3 unanswered questions today',
    type: 'daily',
    target: 3,
    current: 1,
    participants: 45,
    timeLeft: '14h 32m',
    reward: { badge: 'Daily Helper', reputation: 50 },
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
    reward: { badge: 'Quality Week', reputation: 100 },
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
    reward: { badge: 'Curious Mind', reputation: 150 },
    isParticipating: false
  }
]


