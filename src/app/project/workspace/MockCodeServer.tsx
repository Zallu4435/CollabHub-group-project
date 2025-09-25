import React, { useState } from 'react';

interface MockCodeServerProps {
  project: { title: string; description: string };
}

const MockCodeServer: React.FC<MockCodeServerProps> = ({ project }) => {
  const [selectedFile, setSelectedFile] = useState<string>('src/app/page.tsx');
  const [fileContent, setFileContent] = useState<string>(`import React from 'react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold text-center py-20">
        Welcome to ${project.title}
      </h1>
    </div>
  );
}`);

  const files = [
    { name: 'src/app/page.tsx', type: 'file', language: 'typescript' },
    { name: 'src/app/layout.tsx', type: 'file', language: 'typescript' },
    { name: 'src/components/Header.tsx', type: 'file', language: 'typescript' },
    { name: 'package.json', type: 'file', language: 'json' },
    { name: 'README.md', type: 'file', language: 'markdown' },
  ];

  const getLanguageFromExtension = (fileName: string): string => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'tsx':
      case 'ts':
        return 'typescript';
      case 'jsx':
      case 'js':
        return 'javascript';
      case 'json':
        return 'json';
      case 'md':
        return 'markdown';
      case 'css':
        return 'css';
      case 'html':
        return 'html';
      default:
        return 'plaintext';
    }
  };

  return (
    <div className="h-full flex bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 border-r border-gray-700">
        <div className="p-4 border-b border-gray-700">
          <h3 className="text-sm font-medium text-gray-300">EXPLORER</h3>
        </div>
        <div className="p-2">
          {files.map((file) => (
            <div
              key={file.name}
              className={`flex items-center py-1 px-2 rounded cursor-pointer ${
                selectedFile === file.name
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
              onClick={() => setSelectedFile(file.name)}
            >
              <span className="mr-2 text-sm">
                {file.type === 'file' ? '📄' : '📁'}
              </span>
              <span className="text-sm">{file.name.split('/').pop()}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Editor Area */}
      <div className="flex-1 flex flex-col">
        {/* Tab Bar */}
        <div className="bg-gray-800 border-b border-gray-700 flex">
          <div className="flex items-center px-4 py-2 bg-gray-700 border-r border-gray-600">
            <span className="text-sm">{selectedFile.split('/').pop()}</span>
            <button className="ml-2 text-gray-400 hover:text-white">
              ×
            </button>
          </div>
        </div>

        {/* Editor */}
        <div className="flex-1 bg-gray-900">
          <div className="h-full p-4">
            <div className="text-sm text-gray-400 mb-2">
              {getLanguageFromExtension(selectedFile).toUpperCase()} • VS Code Mock
            </div>
            <textarea
              value={fileContent}
              onChange={(e) => setFileContent(e.target.value)}
              className="w-full h-full bg-gray-900 text-white font-mono text-sm resize-none outline-none"
              style={{ fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace' }}
            />
          </div>
        </div>

        {/* Status Bar */}
        <div className="bg-gray-800 border-t border-gray-700 px-4 py-1 flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center space-x-4">
            <span>Ln 1, Col 1</span>
            <span>UTF-8</span>
            <span>{getLanguageFromExtension(selectedFile)}</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>VS Code Mock</span>
            <span>Ready</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MockCodeServer;
