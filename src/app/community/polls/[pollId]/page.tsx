import PollResults from '../../_components/polls/PollResults';
import { polls } from '../../_data/polls';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default function PollDetailPage({ params }: { params: { pollId: string } }) {
  const poll = polls.find(p => p.id === params.pollId);

  if (!poll) {
    notFound();
  }

  const resultsData = {
    question: poll.question,
    options: poll.options.map(opt => ({
      ...opt,
      voters: [] // Would be populated from actual data
    })),
    totalVotes: poll.totalVotes,
    createdAt: poll.createdAt,
    expiresAt: poll.expiresAt,
    createdBy: poll.createdBy
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center gap-2 text-sm">
            <li>
              <Link href="/community/polls" className="text-blue-600 hover:text-blue-700 font-medium">
                Polls
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-600 truncate">Poll Results</li>
          </ol>
        </nav>

        <PollResults {...resultsData} />
      </div>
    </div>
  );
}
