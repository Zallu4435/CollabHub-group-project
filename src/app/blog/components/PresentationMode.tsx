"use client";
import React from "react";
import { marked } from "marked";
import { Presentation } from "lucide-react";
import SlidesModal from "../poster/components/SlidesModal";

type Props = { content: string };

function splitMarkdownSlides(md: string): string[] {
  // Split on slide separators with better regex
  const raw = md.split(/\n\s*---+\s*\n/).map(s => s.trim()).filter(Boolean);
  return raw.length > 1 ? raw : [md];
}

function markdownChunksToHtmlSlides(chunks: string[]): string[] {
  return chunks.map(chunk => {
    try {
      const html = marked(chunk, {
        breaks: true,
        gfm: true,
      });
      return typeof html === "string" ? html : html.toString();
    } catch {
      return chunk
        .split("\n")
        .map(line => `<p>${line.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>`) 
        .join("");
    }
  });
}

export default function PresentationMode({ content }: Props) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [slideIndex, setSlideIndex] = React.useState(0);

  const slides = React.useMemo(() => {
    if (!content?.trim()) return [];
    const chunks = splitMarkdownSlides(content);
    return markdownChunksToHtmlSlides(chunks);
  }, [content]);

  if (!slides.length) return null;

  const slideCount = slides.length;

  return (
    <>
      <button 
        className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg 
                   bg-white hover:bg-gray-50 border border-gray-300 hover:border-gray-400
                   text-sm font-medium text-gray-700 hover:text-gray-900
                   transition-all duration-200 shadow-sm hover:shadow
                   active:scale-95"
        onClick={() => { 
          setIsOpen(true); 
          setSlideIndex(0); 
        }}
        title={`Start presentation (${slideCount} slide${slideCount !== 1 ? 's' : ''})`}
      >
        <Presentation className="w-4 h-4" />
        <span>Present</span>
        {slideCount > 1 && (
          <span className="text-xs text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
            {slideCount}
          </span>
        )}
      </button>
      
      <SlidesModal
        slides={slides}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        slideIndex={slideIndex}
        setSlideIndex={setSlideIndex}
      />
    </>
  );
}
