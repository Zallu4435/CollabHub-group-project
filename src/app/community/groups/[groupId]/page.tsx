import Link from 'next/link';
import Image from 'next/image';
import JoinGroupButton from '../../_components/groups/JoinGroupButton';

export default function GroupPage({ params }: { params: { groupId: string } }) {
  const { groupId } = params;

  // Mock data - replace with actual data fetching
  const group = {
    id: groupId,
    name: 'JavaScript Developers',
    description: 'A thriving community for JavaScript developers to share knowledge, collaborate on projects, and grow together.',
    coverImage: '/groups/js-cover.jpg',
    privacy: 'public' as const,
    memberCount: 1247,
    category: 'Technology',
    isJoined: false,
    stats: {
      posts: 3421,
      events: 23,
      projects: 15
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center gap-2 text-sm">
            <li>
              <Link href="/community/groups" className="text-blue-600 hover:text-blue-700 font-medium">
                Groups
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-600 truncate">{group.name}</li>
          </ol>
        </nav>

        {/* Cover Image */}
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg mb-6">
          <div className="relative h-64 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
            {group.coverImage && (
              <Image
                src={group.coverImage}
                alt={group.name}
                fill
                className="object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Group Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2">{group.name}</h1>
                  <div className="flex items-center gap-4 text-white/90 text-sm">
                    <span className="flex items-center gap-1.5">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      {group.memberCount.toLocaleString()} members
                    </span>
                    <span>•</span>
                    <span className="capitalize">{group.privacy}</span>
                    <span>•</span>
                    <span>{group.category}</span>
                  </div>
                </div>
                <div className="w-full md:w-auto">
                  <JoinGroupButton groupId={groupId} isJoined={group.isJoined} fullWidth />
                </div>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 divide-x divide-gray-200 bg-gray-50">
            <div className="p-4 text-center">
              <p className="text-2xl font-bold text-gray-900">{group.stats.posts.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Posts</p>
            </div>
            <div className="p-4 text-center">
              <p className="text-2xl font-bold text-gray-900">{group.stats.events}</p>
              <p className="text-sm text-gray-600">Events</p>
            </div>
            <div className="p-4 text-center">
              <p className="text-2xl font-bold text-gray-900">{group.stats.projects}</p>
              <p className="text-sm text-gray-600">Projects</p>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3">About this group</h2>
          <p className="text-gray-700 leading-relaxed">{group.description}</p>
        </div>

        {/* Navigation Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href={`/community/groups/${groupId}/members`}
            className="group bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-blue-500 hover:shadow-xl transition-all"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
              <svg className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">Members</h3>
            <p className="text-sm text-gray-600">View all group members</p>
          </Link>

          <Link
            href={`/community/groups/${groupId}/events`}
            className="group bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-green-500 hover:shadow-xl transition-all"
          >
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-600 transition-colors">
              <svg className="w-6 h-6 text-green-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 mb-1 group-hover:text-green-600 transition-colors">Events</h3>
            <p className="text-sm text-gray-600">Upcoming group events</p>
          </Link>

          <Link
            href={`/community/groups/${groupId}/projects`}
            className="group bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-purple-500 hover:shadow-xl transition-all"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-600 transition-colors">
              <svg className="w-6 h-6 text-purple-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 mb-1 group-hover:text-purple-600 transition-colors">Projects</h3>
            <p className="text-sm text-gray-600">Collaborative work</p>
          </Link>

          <Link
            href={`/community/groups/${groupId}/chat`}
            className="group bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-orange-500 hover:shadow-xl transition-all"
          >
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-orange-600 transition-colors">
              <svg className="w-6 h-6 text-orange-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 mb-1 group-hover:text-orange-600 transition-colors">Chat</h3>
            <p className="text-sm text-gray-600">Real-time discussion</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
