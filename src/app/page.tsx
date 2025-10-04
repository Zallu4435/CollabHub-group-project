import React from 'react';
import Header from '../components/Header';

const CommunityPlatformPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-blue-100 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 max-w-xl">
              <h1 className="text-5xl font-extrabold text-indigo-900 leading-snug">
                Your Ultimate Community Hub
              </h1>
              <p className="text-2xl text-gray-700 font-medium">
                Connect, Create, Collaborate, and Grow Together
              </p>
              <div className="space-y-3 text-gray-600 text-lg leading-relaxed">
                <p>
                  Join thousands of creators, developers, and entrepreneurs in our thriving community platform.
                </p>
                <p>
                  Share knowledge, showcase projects, trade services, and build meaningful connections.
                </p>
              </div>

              <div className="flex space-x-6 pt-6">
                <a
                  href="/auth/register"
                  className="px-10 py-4 bg-gradient-to-b from-orange-400 to-orange-500 text-white rounded-full font-semibold shadow-lg hover:from-orange-500 hover:to-orange-600 transition"
                >
                  Get Started Free
                </a>
                <a
                  href="/auth/login"
                  className="px-8 py-4 bg-white border-2 border-blue-600 text-blue-600 rounded-full font-semibold hover:bg-blue-50 transition"
                >
                  Learn More
                </a>
              </div>
            </div>

            {/* Hero Illustration */}
            <div className="flex justify-center">
              <div className="relative w-96 h-96 bg-white bg-opacity-80 rounded-full shadow-2xl flex items-center justify-center">
                <div className="absolute top-20 left-24 w-14 h-14 bg-indigo-500 rounded-full"></div>
                <div className="absolute top-20 right-24 w-14 h-14 bg-pink-400 rounded-full"></div>
                <div className="absolute bottom-28 left-1/2 transform -translate-x-1/2 w-14 h-14 bg-blue-400 rounded-full"></div>
                <div className="absolute bottom-28 left-24 w-12 h-12 bg-green-400 rounded-full"></div>
                <div className="absolute bottom-28 right-24 w-12 h-12 bg-pink-500 rounded-full"></div>
                {/* Connection Lines */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-44 h-1 bg-gray-300 rotate-45"></div>
                  <div className="w-44 h-1 bg-gray-300 -rotate-45 absolute"></div>
                  <div className="w-32 h-1 bg-gray-300 absolute"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { value: '10K+', label: 'Active Users' },
              { value: '5K+', label: 'Projects Shared' },
              { value: '25K+', label: 'Posts & Articles' },
              { value: '15K+', label: 'Questions Solved' },
            ].map(({ value, label }) => (
              <div key={label} className="border rounded-lg p-8 bg-white shadow-md hover:shadow-lg transition">
                <div className="text-5xl font-extrabold text-blue-600 mb-3">{value}</div>
                <div className="text-gray-600 font-medium text-lg">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-extrabold text-gray-800 mb-5">Explore Our Platform</h2>
            <p className="text-lg text-gray-600 font-medium">
              Discover all the amazing features our community has to offer
            </p>
          </div>

          {/* Service Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              {
                icon: '📝',
                title: 'Blog',
                subtitle: 'Share Your Stories',
                description:
                  'Create engaging content, tutorials, and stories. Build your audience and share knowledge with the community.',
                href: '/blog',
                bgGradient: 'from-indigo-500 to-purple-600',
                textColor: 'text-indigo-100',
              },
              {
                icon: '🚀',
                title: 'Projects',
                subtitle: 'Showcase Your Work',
                description:
                  'Display your portfolio, get feedback, collaborate with others, and find inspiration from amazing creators.',
                href: '/project',
                bgGradient: 'from-pink-400 to-red-500',
                textColor: 'text-pink-100',
              },
              {
                icon: '🛒',
                title: 'Marketplace',
                subtitle: 'Buy & Sell Services',
                description:
                  'Buy and sell digital products, hire freelancers, or offer your services to a global community.',
                href: '/marketplace',
                bgGradient: 'from-blue-400 to-cyan-400',
                textColor: 'text-blue-100',
              },
              {
                icon: '📄',
                title: 'Posts',
                subtitle: 'Share Your Thoughts',
                description:
                  'Share your thoughts, updates, and experiences with the community. Engage with others through meaningful posts.',
                href: '/posts',
                bgGradient: 'from-green-400 to-teal-400',
                textColor: 'text-green-100',
              },
              {
                icon: '❓',
                title: 'Q&A',
                subtitle: 'Knowledge Sharing',
                description:
                  'Get help from experts, share your knowledge, and build reputation through meaningful contributions.',
                href: '/qa',
                bgGradient: 'from-pink-500 to-yellow-400',
                textColor: 'text-pink-100',
              },
              {
                icon: '👥',
                title: 'Community',
                subtitle: 'Discussion Hub',
                description:
                  'Participate in community discussions, collaborate on projects, and stay updated with announcements.',
                href: '/community',
                bgGradient: 'from-teal-300 to-pink-300',
                textColor: 'text-gray-700',
                iconBgOpacity: 'bg-opacity-50',
                iconTextColor: 'text-gray-800',
              },
            ].map(
              ({
                icon,
                title,
                subtitle,
                description,
                href,
                bgGradient,
                textColor,
                iconBgOpacity,
                iconTextColor,
              }) => (
                <div
                  key={title}
                  className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow"
                >
                  <div className={`p-7 text-white bg-gradient-to-br ${bgGradient}`}>
                    <div className="flex items-center space-x-5">
                      <div
                        className={`w-14 h-14 bg-white ${iconBgOpacity || 'bg-opacity-30'} rounded-full flex items-center justify-center text-2xl ${
                          iconTextColor || 'text-white'
                        }`}
                      >
                        {icon}
                      </div>
                      <div>
                        <h3 className="text-3xl font-extrabold">{title}</h3>
                        <p className={`${textColor} text-lg font-semibold`}>{subtitle}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-8">
                    <h4 className="text-xl font-semibold text-gray-800 mb-4">{title} Features</h4>
                    <p className="text-gray-600 mb-8 leading-relaxed">{description}</p>
                    <a
                      href={href}
                      className={`px-8 py-3 rounded-full text-sm font-semibold text-white bg-gradient-to-br ${bgGradient} hover:from-opacity-90 hover:to-opacity-90 transition`}
                    >
                      {title === 'Q&A' ? 'Ask Now' : title === 'Blog' ? 'Explore' : 'Discover'}
                    </a>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <h2 className="text-4xl font-extrabold text-gray-800">Why Choose Our Platform?</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-16 max-w-4xl mx-auto">
            {[
              {
                number: 1,
                title: 'All-in-One Platform',
                description: 'Everything you need in one place - no need to juggle multiple platforms.',
                bgColor: 'bg-blue-100',
                textColor: 'bg-blue-600',
              },
              {
                number: 2,
                title: 'Active Community',
                description: 'Connect with like-minded individuals and grow your network.',
                bgColor: 'bg-green-100',
                textColor: 'bg-green-600',
              },
              {
                number: 3,
                title: 'Easy to Use',
                description: 'Intuitive design that makes navigation and interaction seamless.',
                bgColor: 'bg-orange-100',
                textColor: 'bg-orange-600',
              },
              {
                number: 4,
                title: 'Secure & Reliable',
                description: 'Your data and privacy are our top priorities with enterprise-grade security.',
                bgColor: 'bg-red-100',
                textColor: 'bg-red-600',
              },
            ].map(({ number, title, description, bgColor, textColor }) => (
              <div key={number} className="flex items-start space-x-6">
                <div
                  className={`w-14 h-14 ${bgColor} rounded-full flex items-center justify-center flex-shrink-0`}
                >
                  <span
                    className={`w-8 h-8 ${textColor} rounded-full text-white text-lg font-bold flex items-center justify-center`}
                  >
                    {number}
                  </span>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-3">{title}</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <h2 className="text-4xl font-extrabold text-gray-800">What Our Community Says</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {[
              {
                initials: 'JS',
                name: 'Sarah Johnson',
                role: 'Full Stack Developer',
                quote:
                  'This platform has transformed how I showcase my projects and connect with other developers. Amazing community',
              },
              {
                initials: 'MR',
                name: 'Michael Rodriguez',
                role: 'Digital Entrepreneur',
                quote:
                  "The marketplace feature helped me scale my business. I've found great clients and collaborators here!",
              },
              {
                initials: 'AL',
                name: 'Anna Lee',
                role: 'Content Creator',
                quote:
                  'Love how I can blog, share projects, and engage with my audience all in one place. Highly recommended!',
              },
            ].map(({ initials, name, role, quote }) => (
              <div key={initials} className="bg-white rounded-3xl shadow-lg p-8 transition hover:shadow-2xl">
                <div className="flex items-center space-x-5 mb-6">
                  <div className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 font-bold text-lg">{initials}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-xl">{name}</h4>
                    <p className="text-sm text-gray-600">{role}</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed mb-6">{`"${quote}"`}</p>
                <div className="flex space-x-1 text-yellow-400 text-lg">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>⭐</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-blue-50 to-blue-100 py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-6">Ready to Join Our Community?</h2>
          <p className="text-lg text-gray-600 mb-10 max-w-xl mx-auto">
            Start your journey today and connect with thousands of creators worldwide
          </p>

          <div className="flex justify-center space-x-6 mb-8">
            <a
              href="/auth/register"
              className="px-10 py-4 bg-gradient-to-b from-orange-400 to-orange-500 text-white rounded-full font-semibold shadow-lg hover:from-orange-500 hover:to-orange-600 transition"
            >
              Join Free Now
            </a>
            <a
              href="/auth/login"
              className="px-10 py-4 bg-white border-2 border-blue-600 text-blue-600 rounded-full font-semibold hover:bg-blue-50 transition"
            >
              Learn More
            </a>
          </div>

          <p className="text-gray-600 text-md font-medium">
            ✓ Free to join &nbsp;&nbsp;✓ No credit card required &nbsp;&nbsp;✓ Full access to all features
          </p>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-4">Stay Updated</h2>
          <p className="text-gray-600 mb-10 max-w-lg mx-auto">
            Get the latest news, updates, and community highlights delivered to your inbox
          </p>

          <form className="flex justify-center max-w-md mx-auto">
            <input
              type="email"
              aria-label="Email address"
              placeholder="Enter your email address"
              className="flex-1 px-5 py-4 rounded-l-full border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:border-transparent text-lg"
            />
            <button
              type="submit"
              className="px-8 py-4 bg-gradient-to-b from-orange-400 to-orange-500 text-white rounded-r-full font-semibold hover:from-orange-500 hover:to-orange-600 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-5 gap-12">
            {/* Logo & Description */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-14 h-14 bg-white bg-opacity-10 rounded-full flex items-center justify-center">
                  <span className="text-white font-extrabold text-xl">CP</span>
                </div>
                <span className="text-2xl font-extrabold">Community Platform</span>
              </div>
              <p className="text-gray-400 leading-relaxed mb-8 max-w-sm">
                Building connections, fostering creativity, and empowering communities worldwide.
              </p>

              {/* Social Media */}
              <div className="flex space-x-5">
                {['T', 'F', 'IG', 'in', 'YT'].map((icon) => (
                  <div
                    key={icon}
                    className={`w-11 h-11 rounded-full flex items-center justify-center cursor-pointer transition-colors ${
                      icon === 'T'
                        ? 'bg-blue-500 hover:bg-blue-600'
                        : icon === 'F'
                        ? 'bg-blue-600 hover:bg-blue-700'
                        : icon === 'IG'
                        ? 'bg-pink-500 hover:bg-pink-600'
                        : icon === 'in'
                        ? 'bg-blue-700 hover:bg-blue-800'
                        : 'bg-red-500 hover:bg-red-600'
                    }`}
                  >
                    <span className="text-white text-lg font-bold">{icon}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Platform Links */}
            <div>
              <h3 className="text-lg font-semibold mb-5">Platform</h3>
              <ul className="space-y-3 text-gray-400 text-md">
                {[
                  { label: 'Blog', href: '/blog' },
                  { label: 'Projects', href: '/project' },
                  { label: 'Marketplace', href: '/marketplace' },
                  { label: 'Posts', href: '/posts' },
                  { label: 'Q&A', href: '/qa' },
                  { label: 'Community', href: '/community' },
                ].map(({ label, href }) => (
                  <li key={label}>
                    <a href={href} className="hover:text-white transition">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="text-lg font-semibold mb-5">Company</h3>
              <ul className="space-y-3 text-gray-400 text-md">
                {[
                  { label: 'About Us', href: '/about' },
                  { label: 'Careers', href: '#' },
                  { label: 'Press', href: '#' },
                  { label: 'Contact', href: '/contact' },
                ].map(({ label, href }) => (
                  <li key={label}>
                    <a href={href} className="hover:text-white transition">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support & Legal */}
            <div>
              <h3 className="text-lg font-semibold mb-5">Support</h3>
              <ul className="space-y-3 text-gray-400 mb-8 text-md">
                {['Help Center', 'Documentation', 'API', 'Status'].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white transition">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>

              <h3 className="text-lg font-semibold mb-5">Legal</h3>
              <ul className="space-y-3 text-gray-400 text-md">
                {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR'].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white transition">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-gray-700 mt-16 pt-10 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
            <p>© 2025 Community Platform. All rights reserved.</p>
            <p className="mt-3 md:mt-0">Made with ❤️ for creators worldwide</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CommunityPlatformPage;
