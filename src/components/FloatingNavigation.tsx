'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import clsx from 'clsx';

interface SectionItem {
  name: string;
  href: string;
  icon: string;
  description: string;
  color: string;
}

const FloatingNavigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const sections: SectionItem[] = [
    {
      name: 'Blog',
      href: '/blog',
      icon: '📝',
      description: 'Stories',
      color: 'from-purple-500 to-blue-500'
    },
    {
      name: 'Projects',
      href: '/project',
      icon: '🚀',
      description: 'Showcase',
      color: 'from-pink-500 to-red-500'
    },
    {
      name: 'Marketplace',
      href: '/marketplace',
      icon: '🛒',
      description: 'Services',
      color: 'from-cyan-400 to-cyan-600'
    },
    {
      name: 'Q&A',
      href: '/qa',
      icon: '❓',
      description: 'Knowledge',
      color: 'from-pink-500 to-orange-500'
    },
    {
      name: 'Posts',
      href: '/posts',
      icon: '📄',
      description: 'Thoughts',
      color: 'from-green-500 to-teal-500'
    },
    {
      name: 'Community',
      href: '/community',
      icon: '👥',
      description: 'Discussions',
      color: 'from-blue-400 to-pink-400'
    }
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-[9999]" ref={dropdownRef}>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          "w-14 h-14 bg-gradient-to-r from-gray-800 to-gray-700 text-white rounded-full shadow-xl flex items-center justify-center transition-all duration-300 focus:outline-none",
          "hover:scale-110 hover:shadow-2xl",
          isOpen ? "rotate-45 bg-gradient-to-r from-pink-500 to-red-500" : "animate-pulse"
        )}
      >
        <span className="text-2xl font-bold">N</span>
      </button>

      {/* Dropdown / Menu */}
      <div
        className={clsx(
          "absolute bottom-20 right-0 w-64 rounded-xl shadow-2xl border border-gray-200 overflow-hidden",
          "backdrop-blur-lg bg-white/90 dark:bg-gray-900/90",
          "transform transition-all duration-300 origin-bottom-right",
          isOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-4 pointer-events-none"
        )}
      >
        {/* Home shortcut */}
        <Link
          href="/"
          onClick={() => setIsOpen(false)}
          className="flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold hover:opacity-90 transition"
        >
          <span className="text-xl">🏠</span>
          <span>Home</span>
        </Link>

        {/* Sections grid */}
        <div className="p-3 grid grid-cols-2 gap-3">
          {sections.map((section, index) => (
            <Link
              key={section.name}
              href={section.href}
              onClick={() => setIsOpen(false)}
              className={clsx(
                "group flex flex-col items-center justify-center text-center p-3 rounded-lg border border-gray-100 bg-white dark:bg-gray-800 transition-all duration-200",
                "hover:scale-105 hover:shadow-md"
              )}
              style={{ animation: isOpen ? `fadeInUp 0.25s ease ${index * 0.05 + 0.1}s both` : "none" }}
            >
              <div
                className={`w-10 h-10 rounded-lg bg-gradient-to-br ${section.color} flex items-center justify-center text-white text-lg mb-1`}
              >
                {section.icon}
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{section.name}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">{section.description}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default FloatingNavigation;
