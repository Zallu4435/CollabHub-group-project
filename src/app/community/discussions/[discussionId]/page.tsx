import CommentSection from '../../_components/content/CommentSection';
import Avatar from '../../_components/common/Avatar';
import Link from 'next/link';

export default function DiscussionDetailPage({ params }: { params: { discussionId: string } }) {
  const discussion = {
    id: params.discussionId,
    title: 'Best practices for React performance optimization',
    content: 'What are your go-to strategies for optimizing React applications? I\'m particularly interested in:\n\n1. Component rendering optimization\n2. State management best practices\n3. Code splitting strategies\n4. Lazy loading techniques\n\nWould love to hear your experiences and recommendations!',
    author: {
      id: '1',
      name: 'John Doe',
      username: 'johndoe',
      avatar: '/avatars/john.jpg'
    },
    category: 'Programming',
    createdAt: '2024-09-28T10:00:00Z',
    views: 1234,
    replies: 45,
    likes: 78
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center gap-2 text-sm">
            <li>
              <Link href="/community/discussions" className="text-blue-600 hover:text-blue-700 font-medium">
                Discussions
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-600 truncate">{discussion.title}</li>
          </ol>
        </nav>

        {/* Main Discussion Card */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm mb-6 overflow-hidden">
          {/* Header */}
          <div className="px-6 py-5 border-b border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
                {discussion.category}
              </span>
              <span className="text-sm text-gray-500 flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                {discussion.views} views
              </span>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-6 leading-tight">{discussion.title}</h1>

            {/* Author Info */}
            <div className="flex items-center justify-between">
              <Link href={`/community/profiles/${discussion.author.id}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <Avatar src={discussion.author.avatar} alt={discussion.author.name} size="md" />
                <div>
                  <p className="font-semibold text-gray-900">{discussion.author.name}</p>
                  <p className="text-sm text-gray-600">
                    @{discussion.author.username} · Posted{' '}
                    {new Date(discussion.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </Link>

              <button className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-colors flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
                Follow
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-6">
            <div className="prose max-w-none">
              <p className="text-gray-800 text-[15px] whitespace-pre-wrap leading-relaxed">{discussion.content}</p>
            </div>
          </div>

          {/* Actions Footer */}
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-white rounded-lg transition-all">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                  <span className="font-medium">{discussion.likes}</span>
                </button>

                <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-white rounded-lg transition-all">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span className="font-medium">{discussion.replies} Replies</span>
                </button>

                <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-white rounded-lg transition-all">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  <span className="font-medium">Share</span>
                </button>
              </div>

              <button className="p-2 text-gray-500 hover:bg-white rounded-lg transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="5" r="1.5"/>
                  <circle cx="12" cy="12" r="1.5"/>
                  <circle cx="12" cy="19" r="1.5"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            {discussion.replies} {discussion.replies === 1 ? 'Reply' : 'Replies'}
          </h2>
          <CommentSection postId={params.discussionId} />
        </div>
      </div>
    </div>
  );
}
