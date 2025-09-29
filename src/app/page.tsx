import React from 'react';
import Header from '../components/Header';

const CommunityPlatformPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-blue-100 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl font-bold text-indigo-900 leading-tight">
                Your Ultimate Community Hub
              </h1>
              <p className="text-xl text-gray-700">
                Connect, Create, Collaborate, and Grow Together
              </p>
              <div className="space-y-2">
                <p className="text-gray-600">
                  Join thousands of creators, developers, and entrepreneurs in our thriving community platform.
                </p>
                <p className="text-gray-600">
                  Share knowledge, showcase projects, trade services, and build meaningful connections.
                </p>
              </div>

              <div className="flex space-x-4 pt-4">
                <a href="/auth/register" className="px-8 py-3 bg-gradient-to-b from-orange-400 to-orange-500 text-white rounded-full font-semibold hover:from-orange-500 hover:to-orange-600 transition-all shadow-lg">
                  Get Started Free
                </a>
                <a href="/auth/login" className="px-6 py-3 bg-white border-2 border-blue-600 text-blue-600 rounded-full font-semibold hover:bg-blue-50 transition-all">
                  Learn More
                </a>
              </div>
            </div>

            {/* Hero Illustration */}
            <div className="flex justify-center">
              <div className="relative w-80 h-80 bg-white bg-opacity-80 rounded-full shadow-xl flex items-center justify-center">
                <div className="absolute top-16 left-20 w-10 h-10 bg-indigo-500 rounded-full"></div>
                <div className="absolute top-16 right-20 w-10 h-10 bg-pink-400 rounded-full"></div>
                <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-blue-400 rounded-full"></div>
                <div className="absolute bottom-20 left-20 w-8 h-8 bg-green-400 rounded-full"></div>
                <div className="absolute bottom-20 right-20 w-8 h-8 bg-pink-500 rounded-full"></div>
                {/* Connection lines */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-0.5 bg-gray-300 rotate-45"></div>
                  <div className="w-32 h-0.5 bg-gray-300 -rotate-45 absolute"></div>
                  <div className="w-24 h-0.5 bg-gray-300 absolute"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">10K+</div>
              <div className="text-gray-600">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">5K+</div>
              <div className="text-gray-600">Projects Shared</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">25K+</div>
              <div className="text-gray-600">Posts & Articles</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">15K+</div>
              <div className="text-gray-600">Questions Solved</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Explore Our Platform</h2>
            <p className="text-lg text-gray-600">Discover all the amazing features our community has to offer</p>
          </div>

          {/* Service Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Blog Card */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 text-white">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white bg-opacity-30 rounded-full flex items-center justify-center">
                    📝
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Blog</h3>
                    <p className="text-indigo-100">Share Your Stories</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">Write & Share Articles</h4>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Create engaging content, tutorials, and stories. Build your audience and share knowledge with the community.
                </p>
                <a href="/blog" className="px-6 py-2 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-full text-sm font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all">
                  Explore
                </a>
              </div>
            </div>

            {/* Projects Card */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-br from-pink-400 to-red-500 p-6 text-white">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white bg-opacity-30 rounded-full flex items-center justify-center">
                    🚀
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Projects</h3>
                    <p className="text-pink-100">Showcase Your Work</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">Upload & Manage Projects</h4>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Display your portfolio, get feedback, collaborate with others, and find inspiration from amazing creators.
                </p>
                <a href="/project" className="px-6 py-2 bg-gradient-to-br from-pink-400 to-red-500 text-white rounded-full text-sm font-semibold hover:from-pink-500 hover:to-red-600 transition-all">
                  Discover
                </a>
              </div>
            </div>

            {/* Marketplace Card */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-br from-blue-400 to-cyan-400 p-6 text-white">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white bg-opacity-30 rounded-full flex items-center justify-center">
                    🛒
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Marketplace</h3>
                    <p className="text-blue-100">Buy & Sell Services</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">Trade Products & Services</h4>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Buy and sell digital products, hire freelancers, or offer your services to a global community.
                </p>
                <a href="/marketplace" className="px-6 py-2 bg-gradient-to-br from-blue-400 to-cyan-400 text-white rounded-full text-sm font-semibold hover:from-blue-500 hover:to-cyan-500 transition-all">
                  Browse
                </a>
              </div>
            </div>

            {/* Posts Card */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-br from-green-400 to-teal-400 p-6 text-white">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white bg-opacity-30 rounded-full flex items-center justify-center">
                    📄
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Posts</h3>
                    <p className="text-green-100">Share Your Thoughts</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">Create & Share Posts</h4>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Share your thoughts, updates, and experiences with the community. Engage with others through meaningful posts.
                </p>
                <a href="/posts" className="px-6 py-2 bg-gradient-to-br from-green-400 to-teal-400 text-white rounded-full text-sm font-semibold hover:from-green-500 hover:to-teal-500 transition-all">
                  View Posts
                </a>
              </div>
            </div>

            {/* Q&A Card */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-br from-pink-500 to-yellow-400 p-6 text-white">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white bg-opacity-30 rounded-full flex items-center justify-center">
                    ❓
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Q&A</h3>
                    <p className="text-pink-100">Knowledge Sharing</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">Ask & Answer Questions</h4>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Get help from experts, share your knowledge, and build reputation through meaningful contributions.
                </p>
                <a href="/qa" className="px-6 py-2 bg-gradient-to-br from-pink-500 to-yellow-400 text-white rounded-full text-sm font-semibold hover:from-pink-600 hover:to-yellow-500 transition-all">
                  Ask Now
                </a>
              </div>
            </div>

            {/* Community Card */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-br from-teal-300 to-pink-300 p-6 text-gray-800">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white bg-opacity-50 rounded-full flex items-center justify-center">
                    👥
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Community</h3>
                    <p className="text-gray-700">Discussion Hub</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">Join Discussions & Forums</h4>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Participate in community discussions, collaborate on projects, and stay updated with announcements.
                </p>
                <a href="/community" className="px-6 py-2 bg-gradient-to-br from-teal-300 to-pink-300 text-gray-800 rounded-full text-sm font-semibold hover:from-teal-400 hover:to-pink-400 transition-all">
                  Join Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800">Why Choose Our Platform?</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="w-6 h-6 bg-blue-600 rounded-full text-white text-sm font-bold flex items-center justify-center">1</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">All-in-One Platform</h3>
                <p className="text-gray-600">Everything you need in one place - no need to juggle multiple platforms.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="w-6 h-6 bg-green-600 rounded-full text-white text-sm font-bold flex items-center justify-center">2</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Active Community</h3>
                <p className="text-gray-600">Connect with like-minded individuals and grow your network.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="w-6 h-6 bg-orange-600 rounded-full text-white text-sm font-bold flex items-center justify-center">3</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Easy to Use</h3>
                <p className="text-gray-600">Intuitive design that makes navigation and interaction seamless.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="w-6 h-6 bg-red-600 rounded-full text-white text-sm font-bold flex items-center justify-center">4</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Secure & Reliable</h3>
                <p className="text-gray-600">Your data and privacy are our top priorities with enterprise-grade security.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800">What Our Community Says</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 font-bold">JS</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Sarah Johnson</h4>
                  <p className="text-sm text-gray-600">Full Stack Developer</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                &quot;This platform has transformed how I showcase my projects and connect with other developers. Amazing community&quot;
              </p>
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">⭐</span>
                ))}
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 font-bold">MR</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Michael Rodriguez</h4>
                  <p className="text-sm text-gray-600">Digital Entrepreneur</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                &quot;The marketplace feature helped me scale my business. I&apos;ve found great clients and collaborators here!&quot;
              </p>
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">⭐</span>
                ))}
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 font-bold">AL</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Anna Lee</h4>
                  <p className="text-sm text-gray-600">Content Creator</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                &quot;Love how I can blog, share projects, and engage with my audience all in one place. Highly recommended!&quot;
              </p>
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">⭐</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-blue-50 to-blue-100 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Ready to Join Our Community?</h2>
          <p className="text-lg text-gray-600 mb-8">Start your journey today and connect with thousands of creators worldwide</p>

          <div className="flex justify-center space-x-4 mb-6">
            <a href="/auth/register" className="px-8 py-3 bg-gradient-to-b from-orange-400 to-orange-500 text-white rounded-full font-semibold hover:from-orange-500 hover:to-orange-600 transition-all shadow-lg">
              Join Free Now
            </a>
            <a href="/auth/login" className="px-8 py-3 bg-white border-2 border-blue-600 text-blue-600 rounded-full font-semibold hover:bg-blue-50 transition-all">
              Learn More
            </a>
          </div>

          <p className="text-gray-600">
            ✓ Free to join  ✓ No credit card required  ✓ Full access to all features
          </p>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Stay Updated</h2>
          <p className="text-gray-600 mb-8">Get the latest news, updates, and community highlights delivered to your inbox</p>

          <div className="flex justify-center">
            <div className="flex w-full max-w-md">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-l-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="px-6 py-3 bg-gradient-to-b from-orange-400 to-orange-500 text-white rounded-r-full font-semibold hover:from-orange-500 hover:to-orange-600 transition-all">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-5 gap-8">
            {/* Logo & Description */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-white bg-opacity-10 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">CP</span>
                </div>
                <span className="text-xl font-bold">Community Platform</span>
              </div>
              <p className="text-gray-400 mb-4">
                Building connections, fostering creativity, and empowering communities worldwide.
              </p>

              {/* Social Media */}
              <div className="flex space-x-3">
                <div className="w-9 h-9 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                  <span className="text-white text-xs font-bold">T</span>
                </div>
                <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors cursor-pointer">
                  <span className="text-white text-xs font-bold">F</span>
                </div>
                <div className="w-9 h-9 bg-pink-500 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors cursor-pointer">
                  <span className="text-white text-xs font-bold">IG</span>
                </div>
                <div className="w-9 h-9 bg-blue-700 rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors cursor-pointer">
                  <span className="text-white text-xs font-bold">in</span>
                </div>
                <div className="w-9 h-9 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer">
                  <span className="text-white text-xs font-bold">YT</span>
                </div>
              </div>
            </div>

            {/* Platform Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/blog" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="/project" className="hover:text-white transition-colors">Projects</a></li>
                <li><a href="/marketplace" className="hover:text-white transition-colors">Marketplace</a></li>
                <li><a href="/posts" className="hover:text-white transition-colors">Posts</a></li>
                <li><a href="/qa" className="hover:text-white transition-colors">Q&A</a></li>
                <li><a href="/community" className="hover:text-white transition-colors">Community</a></li>
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
                <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Support & Legal */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400 mb-6">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>

              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">GDPR</a></li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2025 Community Platform. All rights reserved.</p>
            <p className="text-gray-400 text-sm mt-2 md:mt-0">Made with ❤️ for creators worldwide</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CommunityPlatformPage;
