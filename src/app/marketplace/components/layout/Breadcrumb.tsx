// market/src/components/layout/Breadcrumb.tsx
import React from 'react';
import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  className = ''
}) => {
  return (
    <nav className={`flex ${className}`} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <svg
                className="w-4 h-4 text-black mx-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            )}
            
            {item.current ? (
              <span className="text-sm font-medium text-black" aria-current="page">
                {item.label}
              </span>
            ) : item.href ? (
              <Link
                href={item.href}
                className="text-sm font-medium text-black hover:text-black transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-sm font-medium text-black">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

// Compact version for mobile
interface BreadcrumbCompactProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const BreadcrumbCompact: React.FC<BreadcrumbCompactProps> = ({
  items,
  className = ''
}) => {
  const currentItem = items[items.length - 1];
  const parentItem = items[items.length - 2];

  return (
    <nav className={`flex items-center ${className}`}>
      {parentItem && (
        <>
          <Link
            href={parentItem.href!}
            className="text-sm text-black hover:text-black transition-colors"
          >
            {parentItem.label}
          </Link>
          <svg
            className="w-4 h-4 text-black mx-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </>
      )}
      <span className="text-sm font-medium text-black">
        {currentItem.label}
      </span>
    </nav>
  );
};
