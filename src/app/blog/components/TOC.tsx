"use client";
import React from "react";

type Heading = {
  id: string;
  text: string;
  level: number;
};

type Props = {
  headings: Heading[];
};

export default function TOC({ headings }: Props) {
  const [activeId, setActiveId] = React.useState<string>("");

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0% -35% 0%",
        threshold: 0
      }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  if (!headings.length) {
    return null;
  }

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className="sticky top-28">
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
          <h3 className="text-sm font-semibold text-gray-900 flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            Table of Contents
          </h3>
        </div>
        <div className="px-2 py-3 max-h-96 overflow-y-auto">
          <ul className="space-y-1">
            {headings.map((heading) => {
              const isActive = activeId === heading.id;
              const paddingLeft = Math.max(0, heading.level - 1) * 12 + 8;
              
              return (
                <li key={heading.id}>
                  <button
                    onClick={() => scrollToHeading(heading.id)}
                    className={`w-full text-left px-2 py-1.5 text-sm rounded-md transition-all duration-150 hover:bg-gray-50 ${
                      isActive
                        ? "bg-blue-50 text-blue-700 font-medium border-l-2 border-blue-500"
                        : "text-gray-700 hover:text-gray-900"
                    }`}
                    style={{ paddingLeft: `${paddingLeft}px` }}
                    title={heading.text}
                  >
                    <span className="block truncate">{heading.text}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        {headings.length > 8 && (
          <div className="px-4 py-2 border-t border-gray-200 bg-gray-50">
            <p className="text-xs text-gray-500 text-center">
              {headings.length} sections
            </p>
          </div>
        )}
      </div>
    </nav>
  );
}