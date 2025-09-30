'use client';

import { useState } from 'react';
import Avatar from '../common/Avatar';

interface Idea {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  votes: number;
  color: string;
  position: { x: number; y: number };
}

interface IdeaBoardProps {
  boardId: string;
  ideas: Idea[];
}

export default function IdeaBoard({ ideas: initialIdeas }: IdeaBoardProps) {
  const [ideas, setIdeas] = useState(initialIdeas);
  const [newIdea, setNewIdea] = useState('');
  const [selectedColor, setSelectedColor] = useState('#FFF59D');

  const colors = [
    '#FFF59D', // Yellow
    '#FFCCBC', // Orange
    '#F8BBD0', // Pink
    '#E1BEE7', // Purple
    '#C5CAE9', // Blue
    '#B2DFDB', // Teal
    '#C5E1A5'  // Green
  ];

  const handleAddIdea = () => {
    if (!newIdea.trim()) return;

    const idea: Idea = {
      id: Date.now().toString(),
      content: newIdea,
      author: {
        id: 'current-user',
        name: 'You',
        avatar: ''
      },
      votes: 0,
      color: selectedColor,
      position: {
        x: Math.random() * 70,
        y: Math.random() * 70
      }
    };

    setIdeas([...ideas, idea]);
    setNewIdea('');
  };

  const handleVote = (ideaId: string) => {
    setIdeas(ideas.map(idea =>
      idea.id === ideaId ? { ...idea, votes: idea.votes + 1 } : idea
    ));
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-4">Idea Board</h3>
        
        <div className="flex gap-2">
          <textarea
            value={newIdea}
            onChange={(e) => setNewIdea(e.target.value)}
            placeholder="Add your idea..."
            rows={2}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
          />
          <div className="flex flex-col gap-2">
            <div className="flex gap-1">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-6 h-6 rounded border-2 transition-all ${
                    selectedColor === color ? 'border-gray-900 scale-110' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <button
              onClick={handleAddIdea}
              disabled={!newIdea.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add
            </button>
          </div>
        </div>
      </div>

      <div className="relative h-[600px] bg-gray-50 overflow-hidden">
        {ideas.map((idea) => (
          <div
            key={idea.id}
            className="absolute w-64 p-4 rounded-lg shadow-lg cursor-move hover:shadow-xl transition-shadow"
            style={{
              backgroundColor: idea.color,
              left: `${idea.position.x}%`,
              top: `${idea.position.y}%`
            }}
          >
            <div className="flex items-start gap-2 mb-2">
              <Avatar src={idea.author.avatar} alt={idea.author.name} size="xs" />
              <span className="text-xs font-medium text-gray-700">{idea.author.name}</span>
            </div>
            
            <p className="text-sm text-gray-900 mb-3">{idea.content}</p>
            
            <div className="flex items-center justify-between">
              <button
                onClick={() => handleVote(idea.id)}
                className="flex items-center gap-1 text-sm text-gray-700 hover:text-blue-600"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
                <span className="font-medium">{idea.votes}</span>
              </button>

              <button className="text-gray-500 hover:text-gray-700">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
