// qa/lib/dummy-data/users.ts
import { User } from '../types/common.types'

export const users: User[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    avatar: '/images/avatars/sarah.jpg',
    reputation: 2847,
    joinDate: '2023-01-15',
    badges: [
      {
        id: 'top-contributor',
        name: 'Top Contributor',
        description: 'Answered 50+ questions',
        icon: 'trophy',
        color: 'gold',
        earnedDate: '2024-03-20'
      }
    ],
    isOnline: true
  },
  {
    id: '2',
    name: 'Alex Chen',
    email: 'alex@example.com',
    reputation: 1543,
    joinDate: '2023-05-08',
    badges: [],
    isOnline: false
  },
  {
    id: '3',
    name: 'Maria Garcia',
    email: 'maria@example.com',
    reputation: 3921,
    joinDate: '2022-11-12',
    badges: [
      {
        id: 'problem-solver',
        name: 'Problem Solver',
        description: 'Solved 25+ difficult questions',
        icon: 'puzzle',
        color: 'purple',
        earnedDate: '2024-01-15'
      }
    ],
    isOnline: true
  }
]
