// qa/components/activity/ActivityStreak.tsx
import { Calendar, Flame, Trophy, Target, TrendingUp } from 'lucide-react'
import { Card } from '../ui/Card'
import { Badge } from '../ui/Badge'

export default function ActivityStreak() {
  const currentStreak = 7
  const longestStreak = 23
  const todayActive = true
  const monthlyGoal = 20
  const monthlyProgress = 18

  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
  const weekActivity = [true, true, false, true, true, true, true] // Mock data
  const monthActivity = Array.from({ length: 30 }, (_, i) => Math.random() > 0.3) // Mock data

  const getStreakLevel = (streak: number) => {
    if (streak >= 30) return { level: 'Legendary', color: 'text-purple-600', bg: 'bg-purple-100' }
    if (streak >= 14) return { level: 'Expert', color: 'text-blue-600', bg: 'bg-blue-100' }
    if (streak >= 7) return { level: 'Advanced', color: 'text-green-600', bg: 'bg-green-100' }
    if (streak >= 3) return { level: 'Intermediate', color: 'text-yellow-600', bg: 'bg-yellow-100' }
    return { level: 'Beginner', color: 'text-gray-600', bg: 'bg-gray-100' }
  }

  const streakLevel = getStreakLevel(currentStreak)

  return (
    <Card className="p-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg">
          <Flame className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 text-lg">Activity Streak</h3>
          <p className="text-sm text-gray-600">Keep the momentum going!</p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Current Streak */}
        <div className="text-center py-4">
          <div className="relative">
            <div className="text-5xl font-bold text-orange-600 mb-2">{currentStreak}</div>
            <div className="text-base text-gray-600 mb-3">day streak</div>
            <Badge className={`${streakLevel.bg} ${streakLevel.color} border-0 px-3 py-1`}>
              {streakLevel.level}
            </Badge>
          </div>
        </div>

        {/* Week View */}
        <div>
          <h4 className="text-base font-medium text-gray-900 mb-4">This Week</h4>
          <div className="grid grid-cols-7 gap-3">
            {weekDays.map((day, index) => (
              <div key={index} className="text-center">
                <div className="text-sm text-gray-500 mb-3">{day}</div>
                <div 
                  className={`
                    w-10 h-10 rounded-lg mx-auto flex items-center justify-center text-sm font-medium
                    ${weekActivity[index] 
                      ? 'bg-gradient-to-r from-orange-400 to-red-500 text-white shadow-md' 
                      : 'bg-gray-200 text-gray-500'
                    }
                  `}
                >
                  {index === 6 && todayActive ? '🔥' : index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Progress */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-base font-medium text-gray-900">Monthly Goal</h4>
            <span className="text-sm text-gray-600 font-medium">{monthlyProgress}/{monthlyGoal} days</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
            <div 
              className="bg-gradient-to-r from-orange-400 to-red-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${(monthlyProgress / monthlyGoal) * 100}%` }}
            />
          </div>
          <div className="text-sm text-gray-500">
            {monthlyGoal - monthlyProgress} more days to reach your goal
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <Trophy className="w-6 h-6 mx-auto mb-2 text-yellow-600" />
            <div className="text-xl font-bold text-gray-900">{longestStreak}</div>
            <div className="text-sm text-gray-600">Best Streak</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <Target className="w-6 h-6 mx-auto mb-2 text-blue-600" />
            <div className="text-xl font-bold text-gray-900">{monthlyProgress}</div>
            <div className="text-sm text-gray-600">This Month</div>
          </div>
        </div>

        {/* Motivational Message */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-orange-600" />
            <span className="text-base font-medium text-orange-800">Keep it up!</span>
          </div>
          <p className="text-sm text-orange-700">
            {currentStreak >= 7 
              ? "You're on fire! 🔥 Maintain this streak to reach Expert level."
              : currentStreak >= 3
              ? "Great progress! Keep going to reach Advanced level."
              : "Every day counts! Build your streak to unlock achievements."
            }
          </p>
        </div>
      </div>
    </Card>
  )
}
