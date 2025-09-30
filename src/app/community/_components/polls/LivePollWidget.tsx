'use client';

import { useState, useEffect } from 'react';

interface LivePollOption {
  id: string;
  text: string;
  votes: number;
}

interface LivePollWidgetProps {
  pollId: string;
  question: string;
  options: LivePollOption[];
  totalVotes: number;
  hasVoted: boolean;
}

export default function LivePollWidget({
  pollId,
  question,
  options: initialOptions,
  totalVotes: initialTotal,
  hasVoted: initialHasVoted
}: LivePollWidgetProps) {
  const [options, setOptions] = useState(initialOptions);
  const [totalVotes, setTotalVotes] = useState(initialTotal);
  const [hasVoted, setHasVoted] = useState(initialHasVoted);
  const [selectedOption, setSelectedOption] = useState<string>('');

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // In real app, this would be WebSocket updates
      setOptions(prev => prev.map(opt => ({
        ...opt,
        votes: opt.votes + Math.floor(Math.random() * 3)
      })));
      setTotalVotes(prev => prev + Math.floor(Math.random() * 5));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleVote = () => {
    if (!selectedOption) return;

    setHasVoted(true);
    setOptions(prev => prev.map(opt =>
      opt.id === selectedOption ? { ...opt, votes: opt.votes + 1 } : opt
    ));
    setTotalVotes(prev => prev + 1);
    console.log(`Voted on live poll ${pollId} with option: ${selectedOption}`);
  };

  const getPercentage = (votes: number) => {
    return totalVotes > 0 ? ((votes / totalVotes) * 100).toFixed(1) : 0;
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-300 rounded-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
        </span>
        <h3 className="text-sm font-semibold text-purple-700 uppercase">Live Poll</h3>
      </div>

      <h4 className="text-lg font-bold text-gray-900 mb-4">{question}</h4>

      <div className="space-y-3 mb-4">
        {options.map((option) => {
          const percentage = getPercentage(option.votes);
          const isSelected = selectedOption === option.id;

          return (
            <div key={option.id}>
              {!hasVoted ? (
                <button
                  onClick={() => setSelectedOption(option.id)}
                  className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                    isSelected
                      ? 'border-purple-500 bg-purple-100'
                      : 'border-gray-300 hover:border-purple-300 bg-white'
                  }`}
                >
                  <span className="font-medium text-gray-900">{option.text}</span>
                </button>
              ) : (
                <div className="relative">
                  <div className="p-3 rounded-lg border-2 border-gray-300 overflow-hidden">
                    <div
                      className="absolute inset-0 bg-purple-200 transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                    <div className="relative flex items-center justify-between">
                      <span className="font-medium text-gray-900">{option.text}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-purple-700">{percentage}%</span>
                        <span className="text-sm text-gray-600">({option.votes})</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-300">
        <p className="text-sm text-gray-600 flex items-center gap-2">
          <svg className="w-4 h-4 animate-pulse text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          {totalVotes} live votes
        </p>

        {!hasVoted && (
          <button
            onClick={handleVote}
            disabled={!selectedOption}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Vote Now
          </button>
        )}
      </div>
    </div>
  );
}
