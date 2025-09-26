"use client";

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownPreviewProps {
  content: string;
  className?: string;
}

export const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({ content, className = "" }) => {
  return (
    <div className={`markdown-preview ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => <h1 className="text-2xl font-bold mb-4 text-gray-900">{children}</h1>,
          h2: ({ children }) => <h2 className="text-xl font-bold mb-3 text-gray-900">{children}</h2>,
          h3: ({ children }) => <h3 className="text-lg font-bold mb-2 text-gray-900">{children}</h3>,
          h4: ({ children }) => <h4 className="text-base font-bold mb-2 text-gray-900">{children}</h4>,
          h5: ({ children }) => <h5 className="text-sm font-bold mb-1 text-gray-900">{children}</h5>,
          h6: ({ children }) => <h6 className="text-xs font-bold mb-1 text-gray-900">{children}</h6>,
          p: ({ children }) => <p className="mb-3 text-gray-800 leading-relaxed">{children}</p>,
          ul: ({ children }) => <ul className="mb-3 ml-4 list-disc text-gray-800">{children}</ul>,
          ol: ({ children }) => <ol className="mb-3 ml-4 list-decimal text-gray-800">{children}</ol>,
          li: ({ children }) => <li className="mb-1">{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-700 mb-3">
              {children}
            </blockquote>
          ),
          code: ({ children, className }) => {
            const isInline = !className;
            if (isInline) {
              return (
                <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono text-gray-800">
                  {children}
                </code>
              );
            }
            return (
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-3">
                <code className={className}>{children}</code>
              </pre>
            );
          },
          pre: ({ children }) => (
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-3">
              {children}
            </pre>
          ),
          a: ({ children, href }) => (
            <a 
              href={href} 
              className="text-blue-600 hover:text-blue-800 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto mb-3">
              <table className="min-w-full border border-gray-300 rounded-lg">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-gray-50">{children}</thead>
          ),
          tbody: ({ children }) => (
            <tbody className="bg-white">{children}</tbody>
          ),
          tr: ({ children }) => (
            <tr className="border-b border-gray-200">{children}</tr>
          ),
          th: ({ children }) => (
            <th className="px-4 py-2 text-left font-semibold text-gray-900 border-r border-gray-300 last:border-r-0">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-2 text-gray-800 border-r border-gray-300 last:border-r-0">
              {children}
            </td>
          ),
          hr: () => <hr className="my-4 border-gray-300" />,
          strong: ({ children }) => <strong className="font-bold text-gray-900">{children}</strong>,
          em: ({ children }) => <em className="italic text-gray-800">{children}</em>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownPreview;
