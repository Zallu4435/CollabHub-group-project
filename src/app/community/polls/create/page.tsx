'use client';

import CreatePollModal from '../../_components/polls/CreatePollModal';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CreatePollPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/community/polls" 
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-4 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Polls
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Create New Poll</h1>
          <p className="text-gray-600">Engage your community with a quick poll or survey</p>
        </div>

        <CreatePollModal
          isOpen={true}
          onClose={() => router.push('/community/polls')}
          onSubmit={(data) => {
            console.log('Creating poll:', data);
            router.push('/community/polls');
          }}
        />
      </div>
    </div>
  );
}
