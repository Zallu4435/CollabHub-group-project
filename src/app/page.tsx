'use client';

import React from 'react';
import Header from '../components/Header';
import { 
  Users, 
  Rocket, 
  ShoppingCart, 
  FileText, 
  HelpCircle, 
  MessageSquare, 
  Video,
  Sparkles,
  TrendingUp,
  CheckCircle,
  Shield,
  Zap,
  Globe,
  Heart,
  Mail,
  ArrowRight,
  Star
} from 'lucide-react';

const CommunityPlatformPage: React.FC = () => {
  const stats = [
    { icon: Users, value: '10K+', label: 'Active Users', color: 'blue' },
    { icon: Rocket, value: '5K+', label: 'Projects Shared', color: 'purple' },
    { icon: FileText, value: '25K+', label: 'Posts & Articles', color: 'green' },
    { icon: HelpCircle, value: '15K+', label: 'Questions Solved', color: 'orange' },
  ];

  const services = [
    {
      icon: FileText,
      title: 'Blog',
      subtitle: 'Share Your Stories',
      description: 'Create engaging content, tutorials, and stories. Build your audience and share knowledge with the community.',
      href: '/blog',
      gradient: 'from-indigo-500 to-purple-600',
      action: 'Explore'
    },
    {
      icon: Rocket,
      title: 'Projects',
      subtitle: 'Showcase Your Work',
      description: 'Display your portfolio, get feedback, collaborate with others, and find inspiration from amazing creators.',
      href: '/project',
      gradient: 'from-pink-500 to-rose-500',
      action: 'Discover'
    },
    {
      icon: ShoppingCart,
      title: 'Marketplace',
      subtitle: 'Buy & Sell Services',
      description: 'Buy and sell digital products, hire freelancers, or offer your services to a global community.',
      href: '/marketplace',
      gradient: 'from-blue-500 to-cyan-500',
      action: 'Browse'
    },
    {
      icon: MessageSquare,
      title: 'Posts',
      subtitle: 'Share Your Thoughts',
      description: 'Share your thoughts, updates, and experiences with the community. Engage with others through meaningful posts.',
      href: '/posts',
      gradient: 'from-green-500 to-emerald-500',
      action: 'Post Now'
    },
    {
      icon: HelpCircle,
      title: 'Q&A',
      subtitle: 'Knowledge Sharing',
      description: 'Get help from experts, share your knowledge, and build reputation through meaningful contributions.',
      href: '/qa',
      gradient: 'from-amber-500 to-orange-500',
      action: 'Ask Now'
    },
    {
      icon: Users,
      title: 'Community',
      subtitle: 'Discussion Hub',
      description: 'Participate in community discussions, collaborate on projects, and stay updated with announcements.',
      href: '/community',
      gradient: 'from-teal-400 to-cyan-400',
      action: 'Join'
    },
    {
      icon: Video,
      title: 'Collab Hub',
      subtitle: 'Live Sessions',
      description: 'Join room-based live sessions with voice/video UI simulation, reactions, chat, and more — now available as a shared experience.',
      href: '/collab',
      gradient: 'from-violet-500 to-purple-600',
      action: 'Start Session'
    },
  ];

  const features = [
    {
      number: 1,
      icon: Globe,
      title: 'All-in-One Platform',
      description: 'Everything you need in one place - no need to juggle multiple platforms.',
      color: 'blue'
    },
    {
      number: 2,
      icon: Users,
      title: 'Active Community',
      description: 'Connect with like-minded individuals and grow your network.',
      color: 'green'
    },
    {
      number: 3,
      icon: Zap,
      title: 'Easy to Use',
      description: 'Intuitive design that makes navigation and interaction seamless.',
      color: 'orange'
    },
    {
      number: 4,
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Your data and privacy are our top priorities with enterprise-grade security.',
      color: 'red'
    },
  ];

  const testimonials = [
    {
      initials: 'SJ',
      name: 'Sarah Johnson',
      role: 'Full Stack Developer',
      quote: 'This platform has transformed how I showcase my projects and connect with other developers. Amazing community!',
      rating: 5
    },
    {
      initials: 'MR',
      name: 'Michael Rodriguez',
      role: 'Digital Entrepreneur',
      quote: "The marketplace feature helped me scale my business. I've found great clients and collaborators here!",
      rating: 5
    },
    {
      initials: 'AL',
      name: 'Anna Lee',
      role: 'Content Creator',
      quote: 'Love how I can blog, share projects, and engage with my audience all in one place. Highly recommended!',
      rating: 5
    },
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-24 lg:py-32 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute top-1/2 -left-40 w-80 h-80 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 max-w-xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-indigo-200 shadow-sm">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span className="text-sm font-semibold text-indigo-900">New Feature: Collab Hub Live Sessions</span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-extrabold text-indigo-900 leading-tight">
                Your Ultimate <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Community Hub</span>
              </h1>
              
              <p className="text-2xl text-gray-700 font-medium">
                Connect, Create, Collaborate, and Grow Together
              </p>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                Join thousands of creators, developers, and entrepreneurs in our thriving community platform. Share knowledge, showcase projects, trade services, and build meaningful connections.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <a
                  href="/auth/register"
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="#features"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-indigo-600 text-indigo-600 rounded-full font-bold hover:bg-indigo-50 transition-all"
                >
                  Learn More
                </a>
              </div>

              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 border-2 border-white"></div>
                  ))}
                </div>
                <div className="text-sm">
                  <div className="font-bold text-gray-900">10,000+ creators</div>
                  <div className="text-gray-600">joined this month</div>
                </div>
              </div>
            </div>

            {/* Hero Illustration - Enhanced */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-96 h-96 lg:w-[450px] lg:h-[450px]">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
                <div className="relative w-full h-full bg-white/60 backdrop-blur-sm rounded-full shadow-2xl flex items-center justify-center border border-white/40">
                  {/* Animated nodes */}
                  {[
                    { top: '20%', left: '30%', color: 'bg-indigo-500', size: 'w-16 h-16' },
                    { top: '20%', right: '30%', color: 'bg-pink-500', size: 'w-16 h-16' },
                    { bottom: '25%', left: '50%', color: 'bg-blue-500', size: 'w-16 h-16', transform: '-translate-x-1/2' },
                    { bottom: '25%', left: '30%', color: 'bg-green-500', size: 'w-14 h-14' },
                    { bottom: '25%', right: '30%', color: 'bg-purple-500', size: 'w-14 h-14' },
                  ].map((node, i) => (
                    <div
                      key={i}
                      className={`absolute ${node.top ? `top-[${node.top}]` : ''} ${node.bottom ? `bottom-[${node.bottom}]` : ''} ${node.left ? `left-[${node.left}]` : ''} ${node.right ? `right-[${node.right}]` : ''} ${node.transform || ''} ${node.size} ${node.color} rounded-full shadow-lg animate-pulse`}
                      style={{ animationDelay: `${i * 0.2}s` }}
                    ></div>
                  ))}
                  
                  {/* Connection lines */}
                  <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
                    <line x1="30%" y1="30%" x2="50%" y2="50%" stroke="rgba(99, 102, 241, 0.3)" strokeWidth="2" />
                    <line x1="70%" y1="30%" x2="50%" y2="50%" stroke="rgba(99, 102, 241, 0.3)" strokeWidth="2" />
                    <line x1="50%" y1="75%" x2="50%" y2="50%" stroke="rgba(99, 102, 241, 0.3)" strokeWidth="2" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Enhanced */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map(({ icon: Icon, value, label, color }) => (
              <div key={label} className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border border-gray-100">
                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-${color}-100 to-${color}-50 rounded-bl-full opacity-50`}></div>
                <div className="relative">
                  <div className={`w-14 h-14 bg-gradient-to-br from-${color}-500 to-${color}-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-md`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div className={`text-5xl font-extrabold bg-gradient-to-r from-${color}-600 to-${color}-700 bg-clip-text text-transparent mb-2`}>
                    {value}
                  </div>
                  <div className="text-gray-600 font-semibold">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section - Enhanced */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span className="text-sm font-bold text-indigo-900">Platform Features</span>
            </div>
            <h2 className="text-5xl font-extrabold text-gray-900 mb-6">Explore Our Platform</h2>
            <p className="text-xl text-gray-600">
              Discover all the amazing features our community has to offer
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map(({ icon: Icon, title, subtitle, description, href, gradient, action }) => (
              <div
                key={title}
                className="group bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-2 border border-gray-100"
              >
                <div className={`relative p-8 bg-gradient-to-br ${gradient} text-white overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full"></div>
                  <div className="relative flex items-center gap-4">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-extrabold mb-1">{title}</h3>
                      <p className="text-white/90 font-semibold">{subtitle}</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-8">
                  <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>
                  <a
                    href={href}
                    className={`group/btn inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${gradient} text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all`}
                  >
                    {action}
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - Enhanced */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-extrabold text-gray-900 mb-6">Why Choose Our Platform?</h2>
            <p className="text-xl text-gray-600">Built for creators, by creators</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {features.map(({ number, icon: Icon, title, description, color }) => (
              <div key={number} className="flex items-start gap-6 group">
                <div className={`relative w-16 h-16 bg-${color}-100 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                  <div className={`absolute inset-0 bg-gradient-to-br from-${color}-500 to-${color}-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                  <Icon className={`relative w-8 h-8 text-${color}-600 group-hover:text-white transition-colors z-10`} />
                  <div className={`absolute -top-2 -right-2 w-8 h-8 bg-${color}-600 rounded-full text-white text-sm font-bold flex items-center justify-center shadow-lg`}>
                    {number}
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">{title}</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section - Enhanced */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-extrabold text-gray-900 mb-6">What Our Community Says</h2>
            <p className="text-xl text-gray-600">Join thousands of satisfied creators</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map(({ initials, name, role, quote, rating }) => (
              <div key={initials} className="group bg-white rounded-3xl shadow-lg p-8 hover:shadow-2xl transition-all hover:-translate-y-2 border border-gray-100">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-xl">{initials}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">{name}</h4>
                    <p className="text-sm text-gray-600">{role}</p>
                  </div>
                </div>
                
                <p className="text-gray-700 leading-relaxed mb-6 italic">"{quote}"</p>
                
                <div className="flex gap-1">
                  {[...Array(rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced */}
      <section className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
            <CheckCircle className="w-4 h-4 text-white" />
            <span className="text-sm font-bold text-white">No Credit Card Required</span>
          </div>

          <h2 className="text-5xl lg:text-6xl font-extrabold text-white mb-6">
            Ready to Join Our Community?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Start your journey today and connect with thousands of creators worldwide
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <a
              href="/auth/register"
              className="group inline-flex items-center gap-2 px-10 py-5 bg-white text-indigo-600 rounded-full font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
            >
              Join Free Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="/auth/login"
              className="inline-flex items-center gap-2 px-10 py-5 bg-transparent border-2 border-white text-white rounded-full font-bold hover:bg-white hover:text-indigo-600 transition-all"
            >
              Sign In
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-white/90">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span className="font-semibold">Free to join</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span className="font-semibold">No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span className="font-semibold">Full access to all features</span>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section - Enhanced */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 rounded-full mb-6">
            <Mail className="w-4 h-4 text-indigo-600" />
            <span className="text-sm font-bold text-indigo-900">Newsletter</span>
          </div>
          
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Stay Updated</h2>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            Get the latest news, updates, and community highlights delivered to your inbox
          </p>

          <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-6 py-4 rounded-full border-2 border-gray-300 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:border-transparent text-lg"
            />
            <button
              type="submit"
              className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-bold hover:shadow-lg transition-all whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Footer - Enhanced */}
      <footer className="bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-5 gap-12 mb-16">
            <div className="md:col-span-2">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-extrabold text-2xl">CP</span>
                </div>
                <span className="text-2xl font-extrabold">Community Platform</span>
              </div>
              <p className="text-gray-400 leading-relaxed mb-8 max-w-sm">
                Building connections, fostering creativity, and empowering communities worldwide.
              </p>

              <div className="flex gap-4">
                {[
                  { name: 'Twitter', icon: 'T', color: 'from-blue-400 to-blue-600' },
                  { name: 'Facebook', icon: 'F', color: 'from-blue-500 to-blue-700' },
                  { name: 'Instagram', icon: 'IG', color: 'from-pink-500 to-purple-600' },
                  { name: 'LinkedIn', icon: 'in', color: 'from-blue-600 to-blue-800' },
                  { name: 'YouTube', icon: 'YT', color: 'from-red-500 to-red-700' },
                ].map(({ name, icon, color }) => (
                  <a
                    key={name}
                    href="#"
                    aria-label={name}
                    className={`w-12 h-12 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center hover:scale-110 transition-transform shadow-lg`}
                  >
                    <span className="text-white font-bold">{icon}</span>
                  </a>
                ))}
              </div>
            </div>

            {[
              {
                title: 'Platform',
                links: [
                  { label: 'Blog', href: '/blog' },
                  { label: 'Projects', href: '/project' },
                  { label: 'Marketplace', href: '/marketplace' },
                  { label: 'Posts', href: '/posts' },
                  { label: 'Q&A', href: '/qa' },
                  { label: 'Community', href: '/community' },
                  { label: 'Collab Hub', href: '/collab' },
                ],
              },
              {
                title: 'Company',
                links: [
                  { label: 'About Us', href: '/about' },
                  { label: 'Careers', href: '#' },
                  { label: 'Press', href: '#' },
                  { label: 'Contact', href: '/contact' },
                ],
              },
              {
                title: 'Resources',
                links: [
                  { label: 'Help Center', href: '#' },
                  { label: 'Documentation', href: '#' },
                  { label: 'API', href: '#' },
                  { label: 'Status', href: '#' },
                  { label: 'Privacy Policy', href: '#' },
                  { label: 'Terms of Service', href: '#' },
                ],
              },
            ].map(({ title, links }) => (
              <div key={title}>
                <h3 className="text-lg font-bold mb-6">{title}</h3>
                <ul className="space-y-3">
                  {links.map(({ label, href }) => (
                    <li key={label}>
                      <a href={href} className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">
                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -ml-6 group-hover:ml-0 transition-all" />
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-800 pt-10 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400">
            <p>© 2025 Community Platform. All rights reserved.</p>
            <div className="flex items-center gap-2">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              <span>for creators worldwide</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CommunityPlatformPage;