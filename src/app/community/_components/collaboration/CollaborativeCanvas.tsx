'use client';

import { useState } from 'react';

interface CanvasObject {
  id: string;
  type: 'rectangle' | 'circle' | 'text' | 'arrow';
  position: { x: number; y: number };
  size: { width: number; height: number };
  color: string;
  text?: string;
}

interface CollaborativeCanvasProps {
  canvasId: string;
  objects: CanvasObject[];
}

export default function CollaborativeCanvas({ objects: initialObjects }: CollaborativeCanvasProps) {
  const [objects, setObjects] = useState(initialObjects);
  const [selectedTool, setSelectedTool] = useState<'rectangle' | 'circle' | 'text' | 'arrow' | 'select'>('select');

  const tools = [
    { id: 'select', label: 'Select', icon: '👆' },
    { id: 'rectangle', label: 'Rectangle', icon: '⬜' },
    { id: 'circle', label: 'Circle', icon: '⭕' },
    { id: 'arrow', label: 'Arrow', icon: '➡️' },
    { id: 'text', label: 'Text', icon: 'T' }
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">Collaborative Canvas</h3>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
              Undo
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
              Redo
            </button>
          </div>
        </div>

        <div className="flex gap-2">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => setSelectedTool(tool.id as any)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedTool === tool.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span className="mr-2">{tool.icon}</span>
              {tool.label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative h-[600px] bg-gray-50">
        <svg className="absolute inset-0 w-full h-full">
          {objects.map((obj) => {
            if (obj.type === 'rectangle') {
              return (
                <rect
                  key={obj.id}
                  x={obj.position.x}
                  y={obj.position.y}
                  width={obj.size.width}
                  height={obj.size.height}
                  fill={obj.color}
                  stroke="#000"
                  strokeWidth="2"
                  className="cursor-pointer hover:opacity-80"
                />
              );
            }
            if (obj.type === 'circle') {
              return (
                <circle
                  key={obj.id}
                  cx={obj.position.x + obj.size.width / 2}
                  cy={obj.position.y + obj.size.height / 2}
                  r={Math.min(obj.size.width, obj.size.height) / 2}
                  fill={obj.color}
                  stroke="#000"
                  strokeWidth="2"
                  className="cursor-pointer hover:opacity-80"
                />
              );
            }
            return null;
          })}
        </svg>

        {/* Grid overlay */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage: 'linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}
        />
      </div>

      <div className="p-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
        <span className="text-sm text-gray-600">
          {objects.length} objects • 3 collaborators active
        </span>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
          Export as Image
        </button>
      </div>
    </div>
  );
}
