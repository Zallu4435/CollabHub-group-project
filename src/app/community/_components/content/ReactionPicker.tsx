'use client';

interface ReactionPickerProps {
  onSelect: (reaction: string) => void;
}

const reactions = [
  { emoji: '👍', name: 'like', label: 'Like' },
  { emoji: '❤️', name: 'love', label: 'Love' },
  { emoji: '🎉', name: 'celebrate', label: 'Celebrate' },
  { emoji: '💡', name: 'insightful', label: 'Insightful' },
  { emoji: '😂', name: 'funny', label: 'Funny' },
  { emoji: '🤔', name: 'curious', label: 'Curious' }
];

export default function ReactionPicker({ onSelect }: ReactionPickerProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-2 flex gap-1">
      {reactions.map((reaction) => (
        <button
          key={reaction.name}
          onClick={() => onSelect(reaction.name)}
          className="relative group p-2 hover:bg-gray-100 rounded-lg transition-colors"
          title={reaction.label}
        >
          <span className="text-2xl">{reaction.emoji}</span>
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {reaction.label}
          </span>
        </button>
      ))}
    </div>
  );
}
