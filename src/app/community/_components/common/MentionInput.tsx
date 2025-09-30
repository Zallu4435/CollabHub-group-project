'use client';

import { useState } from 'react';
import Avatar from './Avatar';

interface MentionInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  suggestions?: Array<{ id: string; name: string; avatar: string }>;
}

export default function MentionInput({ 
  value, 
  onChange, 
  placeholder = 'Type @ to mention someone...',
  suggestions = []
}: MentionInputProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState(suggestions);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    onChange(newValue);

    // Check if user typed @
    const words = newValue.split(' ');
    const lastWord = words[words.length - 1];
    
    if (lastWord.startsWith('@')) {
      const query = lastWord.slice(1).toLowerCase();
      const filtered = suggestions.filter(s => 
        s.name.toLowerCase().includes(query)
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const selectMention = (name: string) => {
    const words = value.split(' ');
    words[words.length - 1] = `@${name}`;
    onChange(words.join(' ') + ' ');
    setShowSuggestions(false);
  };

  return (
    <div className="relative">
      <textarea
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        rows={3}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
      />
      
      {showSuggestions && filteredSuggestions.length > 0 && (
        <div className="absolute bottom-full mb-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto z-10">
          {filteredSuggestions.map((suggestion) => (
            <button
              key={suggestion.id}
              onClick={() => selectMention(suggestion.name)}
              className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 text-left"
            >
              <Avatar src={suggestion.avatar} alt={suggestion.name} size="sm" />
              <span className="font-medium">{suggestion.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
