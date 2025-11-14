'use client';

import React from 'react';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

const FOOTER_LINKS = {
  explore: [
    { label: 'Live Sessions', href: '/collab/sessions' },
    { label: 'Quizzes', href: '/collab/quizzes' },
    { label: 'Calendar', href: '/collab/calendar' },
    { label: 'Omega', href: '/collab/omega' },
    { label: 'Scheduling', href: '/collab/scheduling' }
  ],
  platform: [
    { label: 'Blog', href: '/blog' },
    { label: 'Projects', href: '/project' },
    { label: 'Q&A', href: '/qa' },
    { label: 'Marketplace', href: '/marketplace' }
  ],
  company: [
    { label: 'About', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact', href: '/contact' },
    { label: 'Privacy', href: '/privacy' }
  ]
};

const SOCIAL_LINKS = [
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Mail, href: '#', label: 'Email' }
];

export default function CollabFooter() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center font-bold shadow-lg">
                CH
              </div>
              <span className="font-bold text-xl">Collab Hub</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              The all-in-one platform for real-time collaboration: live video, chat, Q&A, quizzes,
              scheduling, and AI-powered moderation.
            </p>
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-700 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-xs">
            © 2025 Collab Hub. All rights reserved. Built with ❤️ for collaboration.
          </p>
          <div className="flex items-center gap-6 text-xs text-gray-400">
            <a href="/terms" className="hover:text-white transition-colors">
              Terms
            </a>
            <a href="/privacy" className="hover:text-white transition-colors">
              Privacy
            </a>
            <a href="/cookies" className="hover:text-white transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
