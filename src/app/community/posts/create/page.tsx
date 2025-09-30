'use client';

import CreatePostForm from '../../_components/content/CreatePostForm';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CreatePostPage() {
  const router = useRouter();

  const handleSubmit = (data: any) => {
    console.log('Creating post:', data);
    router.push('/community/feed');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/community/feed" 
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-4 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Feed
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Create Post</h1>
          <p className="text-gray-600">Share your thoughts with the community</p>
        </div>

        {/* Post Form */}
        <CreatePostForm 
          userAvatar="/avatars/john.jpg" 
          userName="John Doe" 
          onSubmit={handleSubmit} 
        />

        {/* Tips */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-2xl p-6">
          <div className="flex gap-3">
            <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div className="text-sm text-blue-800">
              <p className="font-semibold mb-2">Tips for great posts:</p>
              <ul className="space-y-1 list-disc list-inside">
                <li>Be authentic and share your genuine thoughts</li>
                <li>Add relevant images or videos to increase engagement</li>
                <li>Use hashtags to help others discover your content</li>
                <li>Keep it respectful and follow community guidelines</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
