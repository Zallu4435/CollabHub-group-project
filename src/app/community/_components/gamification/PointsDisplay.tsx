'use client';

interface PointsDisplayProps {
  currentPoints: number;
  level: number;
  pointsToNextLevel: number;
  totalPointsForNextLevel: number;
}

export default function PointsDisplay({ 
  currentPoints, 
  level, 
  pointsToNextLevel,
  totalPointsForNextLevel 
}: PointsDisplayProps) {
  const progress = ((totalPointsForNextLevel - pointsToNextLevel) / totalPointsForNextLevel) * 100;

  return (
    <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white shadow-2xl overflow-hidden">
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-24 -translate-x-24"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-white/80 text-sm font-medium mb-1">Your Level</p>
            <div className="flex items-center gap-3">
              <div className="text-6xl font-black">{level}</div>
              <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-bold">
                Level Up!
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-white/80 text-sm font-medium mb-1">Total Points</p>
            <div className="text-3xl font-bold">{currentPoints.toLocaleString()}</div>
            <p className="text-white/60 text-xs">XP</p>
          </div>
        </div>

        {/* Progress to Next Level */}
        <div className="space-y-3 mb-6">
          <div className="flex justify-between items-center text-sm">
            <span className="font-semibold">Progress to Level {level + 1}</span>
            <span className="font-bold">{pointsToNextLevel.toLocaleString()} XP to go</span>
          </div>
          <div className="relative w-full bg-white/20 backdrop-blur-sm rounded-full h-4 overflow-hidden shadow-inner">
            <div 
              className="absolute h-full bg-gradient-to-r from-white to-yellow-300 rounded-full transition-all duration-500 shadow-lg"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
            </div>
          </div>
          <div className="flex justify-between text-xs text-white/70">
            <span>{(totalPointsForNextLevel - pointsToNextLevel).toLocaleString()} XP earned</span>
            <span>{totalPointsForNextLevel.toLocaleString()} XP total</span>
          </div>
        </div>

        {/* Earn Rates */}
        <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/20">
          <div className="text-center">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <div className="text-2xl font-bold">+50</div>
            <div className="text-xs text-white/80">Per Post</div>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-2">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
              </svg>
            </div>
            <div className="text-2xl font-bold">+10</div>
            <div className="text-xs text-white/80">Per Like</div>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-2">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="text-2xl font-bold">+100</div>
            <div className="text-xs text-white/80">Per Badge</div>
          </div>
        </div>
      </div>
    </div>
  );
}
