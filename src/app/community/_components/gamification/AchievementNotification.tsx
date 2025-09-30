'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface AchievementNotificationProps {
  achievement: {
    name: string;
    description: string;
    icon: string;
    rarity: 'common' | 'rare' | 'epic' | 'legendary';
    points: number;
  };
  isVisible: boolean;
  onClose: () => void;
}

export default function AchievementNotification({ 
  achievement, 
  isVisible, 
  onClose 
}: AchievementNotificationProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        setTimeout(onClose, 300);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const rarityConfig = {
    common: {
      gradient: 'from-gray-400 to-gray-600',
      bg: 'from-gray-50 to-gray-100',
      border: 'border-gray-300',
      badge: 'bg-gray-100 text-gray-700'
    },
    rare: {
      gradient: 'from-blue-400 to-blue-600',
      bg: 'from-blue-50 to-blue-100',
      border: 'border-blue-300',
      badge: 'bg-blue-100 text-blue-700'
    },
    epic: {
      gradient: 'from-purple-400 to-purple-600',
      bg: 'from-purple-50 to-purple-100',
      border: 'border-purple-300',
      badge: 'bg-purple-100 text-purple-700'
    },
    legendary: {
      gradient: 'from-yellow-400 to-orange-600',
      bg: 'from-yellow-50 to-orange-100',
      border: 'border-yellow-300',
      badge: 'bg-yellow-100 text-yellow-700'
    }
  };

  const config = rarityConfig[achievement.rarity];

  return (
    <div className={`transition-all duration-500 ${
      show ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
    }`}>
      <div className={`bg-gradient-to-br ${config.bg} border-2 ${config.border} rounded-2xl shadow-2xl p-6 relative overflow-hidden`}>
        {/* Decorative Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12"></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-start gap-4 mb-4">
            {/* Icon */}
            <div className={`relative w-20 h-20 flex-shrink-0 rounded-2xl bg-gradient-to-br ${config.gradient} p-1 shadow-lg`}>
              <div className="w-full h-full bg-white rounded-xl flex items-center justify-center">
                <Image
                  src={achievement.icon}
                  alt={achievement.name}
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full text-xs font-bold text-gray-900 shadow-sm">
                  🎉 Achievement Unlocked!
                </span>
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-1">{achievement.name}</h3>
              <p className="text-sm text-gray-700 leading-relaxed mb-3">{achievement.description}</p>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 bg-yellow-100 text-yellow-700 px-3 py-1.5 rounded-full text-xs font-bold border border-yellow-200">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  +{achievement.points} XP
                </span>
                <span className={`px-3 py-1.5 rounded-full text-xs font-bold capitalize border ${config.badge} ${config.border}`}>
                  {achievement.rarity}
                </span>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => {
                setShow(false);
                setTimeout(onClose, 300);
              }}
              className="flex-shrink-0 p-2 text-gray-400 hover:text-gray-600 hover:bg-white/50 rounded-lg transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
