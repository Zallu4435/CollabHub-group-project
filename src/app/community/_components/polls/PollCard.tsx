'use client';

import { useState } from 'react';
import Avatar from '../common/Avatar';
import Link from 'next/link';

interface PollOption {
  id: string;
  text: string;
  votes: number;
}

interface PollCardProps {
  id: string;
  question: string;
  options: PollOption[];
  createdBy: {
    id: string;
    name: string;
    avatar: string;
  };
  createdAt: string;
  expiresAt: string;
  totalVotes: number;
  hasVoted: boolean;
  userVote?: string;
  allowMultiple?: boolean;
}

export default function PollCard({
  id,
  question,
  options,
  createdBy,
  createdAt,
  expiresAt,
  totalVotes: initialTotalVotes,
  hasVoted: initialHasVoted,
  userVote,
  allowMultiple = false
}: PollCardProps) {
  const [hasVoted, setHasVoted] = useState(initialHasVoted);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(userVote ? [userVote] : []);
  const [currentVotes, setCurrentVotes] = useState(options);
  const [totalVotes, setTotalVotes] = useState(initialTotalVotes);

  const isExpired = new Date(expiresAt) < new Date();
  const timeLeft = new Date(expiresAt).getTime() - new Date().getTime();
  const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60));
  const daysLeft = Math.floor(hoursLeft / 24);

  const handleOptionClick = (optionId: string) => {
    if (hasVoted || isExpired) return;

    if (allowMultiple) {
      if (selectedOptions.includes(optionId)) {
        setSelectedOptions(selectedOptions.filter(id => id !== optionId));
      } else {
        setSelectedOptions([...selectedOptions, optionId]);
      }
    } else {
      setSelectedOptions([optionId]);
    }
  };

  const handleVote = () => {
    if (selectedOptions.length === 0) return;

    setHasVoted(true);
    setTotalVotes(totalVotes + 1);
    console.log(`Voted on poll ${id} with options:`, selectedOptions);

    const updatedVotes = currentVotes.map(option => ({
      ...option,
      votes: selectedOptions.includes(option.id) ? option.votes + 1 : option.votes
    }));
    setCurrentVotes(updatedVotes);
  };

  const getPercentage = (votes: number) => {
    return totalVotes > 0 ? ((votes / totalVotes) * 100).toFixed(1) : 0;
  };

  const leadingOption = currentVotes.reduce((max, option) => 
    option.votes > max.votes ? option : max, currentVotes[0]
  );

  return (
    <article className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start gap-3 mb-4">
          <Link href={`/community/profiles/${createdBy.id}`} className="flex-shrink-0">
            <Avatar src={createdBy.avatar} alt={createdBy.name} size="md" />
          </Link>

          <div className="flex-1 min-w-0">
            <Link
              href={`/community/profiles/${createdBy.id}`}
              className="font-semibold text-gray-900 hover:text-blue-600 transition-colors"
            >
              {createdBy.name}
            </Link>
            <p className="text-sm text-gray-500 flex items-center gap-2 mt-0.5">
              <span>
                {new Date(createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: '2-digit'
                })}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {isExpired ? (
                  <span className="text-red-600 font-medium">Ended</span>
                ) : daysLeft > 0 ? (
                  `${daysLeft} day${daysLeft !== 1 ? 's' : ''} left`
                ) : (
                  `${hoursLeft} hour${hoursLeft !== 1 ? 's' : ''} left`
                )}
              </span>
            </p>
          </div>

          {!isExpired && (
            <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-3 py-1.5 rounded-full text-xs font-bold border border-blue-200">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              ACTIVE
            </span>
          )}
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight">{question}</h3>
      </div>

      {/* Poll Options */}
      <div className="px-6 pb-4">
        <div className="space-y-3">
          {currentVotes.map((option) => {
            const percentage = getPercentage(option.votes);
            const isSelected = selectedOptions.includes(option.id);
            const showResults = hasVoted || isExpired;
            const isLeading = showResults && option.id === leadingOption.id && totalVotes > 0;
            const isUserVote = userVote === option.id;

            return (
              <button
                key={option.id}
                onClick={() => handleOptionClick(option.id)}
                disabled={hasVoted || isExpired}
                className={`w-full text-left transition-all ${
                  hasVoted || isExpired ? 'cursor-default' : 'cursor-pointer hover:scale-[1.02]'
                }`}
              >
                <div
                  className={`relative p-4 rounded-xl border-2 overflow-hidden transition-all ${
                    isSelected && !hasVoted
                      ? 'border-blue-500 bg-blue-50 shadow-md'
                      : showResults && isUserVote
                      ? 'border-green-500 bg-green-50'
                      : showResults
                      ? 'border-gray-200 bg-white'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                  }`}
                >
                  {showResults && (
                    <div
                      className={`absolute inset-0 transition-all duration-500 ${
                        isLeading ? 'bg-gradient-to-r from-blue-100 to-blue-50' : 'bg-gray-100'
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  )}

                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      {!showResults && (
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                          isSelected ? 'border-blue-600 bg-blue-600' : 'border-gray-300'
                        }`}>
                          {isSelected && (
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      )}
                      {showResults && isUserVote && (
                        <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                      <span className={`font-medium truncate ${showResults ? 'text-gray-900' : 'text-gray-800'}`}>
                        {option.text}
                      </span>
                    </div>
                    
                    {showResults && (
                      <div className="flex items-center gap-3 flex-shrink-0 ml-4">
                        {isLeading && (
                          <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        )}
                        <div className="text-right">
                          <span className="text-lg font-bold text-gray-900">{percentage}%</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span className="flex items-center gap-1.5 font-medium">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            {totalVotes} {totalVotes === 1 ? 'vote' : 'votes'}
          </span>
          {allowMultiple && (
            <>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Multiple choice
              </span>
            </>
          )}
        </div>

        {!hasVoted && !isExpired && (
          <button
            onClick={handleVote}
            disabled={selectedOptions.length === 0}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-sm hover:shadow-md transition-all flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Vote Now
          </button>
        )}

        {hasVoted && !isExpired && (
          <Link 
            href={`/community/polls/${id}`}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
          >
            View Results
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        )}

        {isExpired && (
          <Link 
            href={`/community/polls/${id}`}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 font-medium transition-all text-sm"
          >
            View Final Results
          </Link>
        )}
      </div>
    </article>
  );
}
