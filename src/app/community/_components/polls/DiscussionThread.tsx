'use client';

import { useState } from 'react';
import Avatar from '../common/Avatar';
import Link from 'next/link';

interface Reply {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  createdAt: string;
  likes: number;
}

interface DiscussionThreadProps {
  topicId: string;
  topic: string;
  description: string;
  createdBy: {
    id: string;
    name: string;
    avatar: string;
  };
  createdAt: string;
  replies: Reply[];
  totalReplies: number;
}

export default function DiscussionThread({
  topic,
  description,
  createdBy,
  createdAt,
  replies: initialReplies,
  totalReplies
}: DiscussionThreadProps) {
  const [replies, setReplies] = useState(initialReplies);
  const [newReply, setNewReply] = useState('');
  const [showAll, setShowAll] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReply.trim()) return;

    const reply: Reply = {
      id: Date.now().toString(),
      userId: 'current-user',
      userName: 'You',
      userAvatar: '',
      content: newReply,
      createdAt: new Date().toISOString(),
      likes: 0
    };

    setReplies([...replies, reply]);
    setNewReply('');
  };

  const displayedReplies = showAll ? replies : replies.slice(0, 3);

  return (
    <div className="bg-white border border-gray-200 rounded-lg">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-start gap-3 mb-4">
          <Link href={`/community/profiles/${createdBy.id}`}>
            <Avatar src={createdBy.avatar} alt={createdBy.name} size="lg" />
          </Link>

          <div className="flex-1 min-w-0">
            <Link
              href={`/community/profiles/${createdBy.id}`}
              className="font-semibold text-gray-900 hover:text-blue-600"
            >
              {createdBy.name}
            </Link>
            <p className="text-sm text-gray-600">
              {new Date(createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit'
              })}
            </p>
          </div>
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-2">{topic}</h2>
        <p className="text-gray-700">{description}</p>

        <div className="flex items-center gap-4 mt-4 text-sm text-gray-600">
          <span>{totalReplies} replies</span>
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {displayedReplies.map((reply) => (
          <div key={reply.id} className="p-6">
            <div className="flex items-start gap-3">
              <Link href={`/community/profiles/${reply.userId}`}>
                <Avatar src={reply.userAvatar} alt={reply.userName} size="md" />
              </Link>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Link
                    href={`/community/profiles/${reply.userId}`}
                    className="font-semibold text-gray-900 hover:text-blue-600"
                  >
                    {reply.userName}
                  </Link>
                  <span className="text-sm text-gray-600">
                    {new Date(reply.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
                <p className="text-gray-700 whitespace-pre-wrap">{reply.content}</p>

                <div className="flex items-center gap-4 mt-2">
                  <button className="text-sm text-gray-600 hover:text-blue-600 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                    <span>{reply.likes}</span>
                  </button>
                  <button className="text-sm text-gray-600 hover:text-blue-600">Reply</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {replies.length > 3 && !showAll && (
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={() => setShowAll(true)}
            className="w-full text-blue-600 hover:text-blue-700 font-medium"
          >
            View {replies.length - 3} more replies
          </button>
        </div>
      )}

      <div className="p-6 border-t border-gray-200">
        <form onSubmit={handleSubmit}>
          <div className="flex gap-3">
            <Avatar src="" alt="You" size="md" />
            <div className="flex-1">
              <textarea
                value={newReply}
                onChange={(e) => setNewReply(e.target.value)}
                placeholder="Write a reply..."
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
              />
              <div className="flex justify-end mt-2">
                <button
                  type="submit"
                  disabled={!newReply.trim()}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Reply
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
