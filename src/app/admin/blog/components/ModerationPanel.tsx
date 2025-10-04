'use client';

import { useState, useMemo } from 'react';
import { mockDb } from '../lib/mockDb';
import type { Comment } from '../types/blog-admin';
import { useCan } from '../lib/rbac';
import toast from 'react-hot-toast';

export default function ModerationPanel() {
  const [comments, setComments] = useState(mockDb.getComments());
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'spam'>('pending');
  const can = useCan();

  const filteredComments = useMemo(() => {
    return comments.filter(c => c.status === activeTab);
  }, [comments, activeTab]);

  const handleAction = (commentId: string, action: 'approve' | 'spam' | 'delete') => {
    if (!can('comment:moderate')) {
      toast.error('You do not have permission to moderate comments');
      return;
    }

    const comment = comments.find(c => c.id === commentId);
    if (!comment) return;

    switch (action) {
      case 'approve':
        mockDb.updateComment(commentId, 'approved');
        toast.success('Comment approved');
        break;
      case 'spam':
        mockDb.updateComment(commentId, 'spam');
        toast.success('Marked as spam');
        break;
      case 'delete':
        if (confirm('Delete this comment?')) {
          toast.success('Comment deleted');
        }
        break;
    }
    
    setComments([...mockDb.getComments()]);
  };

  const counts = {
    pending: comments.filter(c => c.status === 'pending').length,
    approved: comments.filter(c => c.status === 'approved').length,
    spam: comments.filter(c => c.status === 'spam').length,
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Content Moderation</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Review and moderate user comments
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="flex border-b dark:border-gray-700">
          {(['pending', 'approved', 'spam'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 px-4 py-3 font-medium ${
                activeTab === tab
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)} ({counts[tab]})
            </button>
          ))}
        </div>

        {/* Comments List */}
        <div className="divide-y dark:divide-gray-700">
          {filteredComments.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No {activeTab} comments
            </div>
          ) : (
            filteredComments.map(comment => (
              <div key={comment.id} className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold">{comment.authorName}</h3>
                    <p className="text-sm text-gray-500">{comment.authorEmail}</p>
                    <p className="text-sm text-gray-500">
                      On: <span className="font-medium">{comment.postTitle}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {comment.flagged && (
                      <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs">
                        Flagged
                      </span>
                    )}
                    {comment.spamScore !== undefined && comment.spamScore > 50 && (
                      <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-xs">
                        Spam Score: {comment.spamScore}%
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-gray-700 dark:text-gray-300 mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded">
                  {comment.content}
                </p>

                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <span>{new Date(comment.createdAt).toLocaleString()}</span>
                </div>

                {can('comment:moderate') && (
                  <div className="flex gap-2 mt-4">
                    {activeTab === 'pending' && (
                      <>
                        <button
                          onClick={() => handleAction(comment.id, 'approve')}
                          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                          ✓ Approve
                        </button>
                        <button
                          onClick={() => handleAction(comment.id, 'spam')}
                          className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
                        >
                          🚫 Spam
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => handleAction(comment.id, 'delete')}
                      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
