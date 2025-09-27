"use client";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Props = {
  content: string;
  onStat?: (stats: { words: number; minutes: number }) => void;
};

function getReadingStats(text: string) {
  const words = (text.trim().match(/\S+/g) || []).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return { words, minutes };
}

function isYouTube(url: string) {
  return /youtu\.be\/.+|youtube\.com\/(watch\?v=|embed\/)\w+/i.test(url);
}

function YouTubeEmbed({ url }: { url: string }) {
  const idMatch =
    url.match(/[?&]v=([^&]+)/) || url.match(/youtu\.be\/([^?&#]+)/) || url.match(/embed\/([^?&#]+)/);
  const id = idMatch?.[1];
  if (!id) return <a href={url} target="_blank" rel="noreferrer" className="text-blue-600 underline">{url}</a>;
  return (
    <div className="my-6 aspect-video w-full overflow-hidden rounded-lg border border-gray-200">
      <iframe
        className="h-full w-full"
        src={`https://www.youtube.com/embed/${id}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

function TwitterEmbed({ url }: { url: string }) {
  // Use blockquote fallback; Twitter script can enhance if present
  return (
    <blockquote className="twitter-tweet my-6">
      <a href={url} className="text-blue-600 underline">{url}</a>
    </blockquote>
  );
}

function GistEmbed({ url }: { url: string }) {
  return (
    <iframe className="w-full h-96 my-6 rounded border" src={`${url}.pibb`} title="gist" />
  );
}

function SmartLink({ href, children }: { href?: string; children: React.ReactNode }) {
  if (!href) return <>{children}</>;
  if (isYouTube(href)) return <YouTubeEmbed url={href} />;
  if (/twitter\.com\/.+\/status\//i.test(href)) return <TwitterEmbed url={href} />;
  if (/gist\.github\.com\//i.test(href)) return <GistEmbed url={href} />;
  return (
    <a href={href} target="_blank" rel="noreferrer" className="text-blue-600 underline">
      {children}
    </a>
  );
}

// Simple poll/quiz fenced block: ```poll\nQ?\n- A\n- B\n```
function parsePoll(content: string) {
  const lines = content.split(/\r?\n/);
  const question = lines[0] || "";
  const options = lines.slice(1).map(l => l.replace(/^[-*]\s*/, "")).filter(Boolean);
  return { question, options };
}

export default function RichPostRenderer({ content, onStat }: Props) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [selectionText, setSelectionText] = React.useState<string>("");
  const [tooltip, setTooltip] = React.useState<{ top: number; left: number } | null>(null);
  const [showShareOptions, setShowShareOptions] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    const stats = getReadingStats(content);
    onStat?.(stats);
  }, [content, onStat]);

  React.useEffect(() => {
    function updateFromSelection() {
      try {
        const sel = window.getSelection();
        if (!sel || sel.rangeCount === 0) {
          setSelectionText("");
          setTooltip(null);
          setShowShareOptions(false);
          return;
        }
        const text = sel.toString().trim();
        if (!text) {
          setSelectionText("");
          setTooltip(null);
          setShowShareOptions(false);
          return;
        }
        const range = sel.getRangeAt(0);
        const container = containerRef.current;
        if (!container) return;
        // Ensure selection is within our container
        const commonAncestor = range.commonAncestorContainer as Node;
        if (!container.contains(commonAncestor.nodeType === 1 ? (commonAncestor as Element) : commonAncestor.parentElement)) {
          setSelectionText("");
          setTooltip(null);
          setShowShareOptions(false);
          return;
        }
        const rect = range.getBoundingClientRect();
        const hostRect = container.getBoundingClientRect();
        const top = rect.top - hostRect.top - 8; // place slightly above selection
        const left = rect.left - hostRect.left + rect.width / 2; // center horizontally
        setSelectionText(text);
        setTooltip({ top: Math.max(0, top), left: Math.max(0, left) });
      } catch {
        // noop
      }
    }

    function clearOnScroll() {
      setTooltip(null);
      setSelectionText("");
      setShowShareOptions(false);
    }

    document.addEventListener("selectionchange", updateFromSelection);
    window.addEventListener("resize", updateFromSelection);
    window.addEventListener("scroll", clearOnScroll, true);
    return () => {
      document.removeEventListener("selectionchange", updateFromSelection);
      window.removeEventListener("resize", updateFromSelection);
      window.removeEventListener("scroll", clearOnScroll, true);
    };
  }, []);

  const onCopy = async () => {
    try {
      await navigator.clipboard?.writeText(selectionText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {}
  };

  const onShare = async () => {
    const shareData = { text: selectionText, url: typeof window !== 'undefined' ? window.location.href : undefined, title: typeof document !== 'undefined' ? document.title : undefined } as ShareData;
    if (typeof navigator !== 'undefined' && (navigator as any).share) {
      try {
        await (navigator as any).share(shareData);
        return;
      } catch {}
    }
    setShowShareOptions(prev => !prev);
  };

  const openTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent('"' + selectionText + '"')}&url=${encodeURIComponent(window.location.href)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const openLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}&summary=${encodeURIComponent(selectionText)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="prose prose-gray max-w-none relative" ref={containerRef}>
      {tooltip && selectionText && (
        <div
          className="absolute z-20 -translate-x-1/2 -translate-y-full"
          style={{ top: tooltip.top, left: tooltip.left }}
        >
          <div className="relative rounded-lg border border-gray-200 bg-white shadow-lg">
            <div className="flex items-center divide-x divide-gray-200">
              <button
                className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50 transition-colors"
                onClick={onCopy}
                title="Copy"
                aria-label="Copy"
              >
                <svg className="w-4 h-4 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                <span className="min-w-[62px] text-gray-900">{copied ? "Copied!" : "Copy"}</span>
              </button>
              <button
                className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50 transition-colors"
                onClick={onShare}
                title="Share"
                aria-label="Share"
              >
                <svg className="w-4 h-4 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="18" cy="5" r="3"></circle>
                  <circle cx="6" cy="12" r="3"></circle>
                  <circle cx="18" cy="19" r="3"></circle>
                  <path d="M8.59 13.51l6.83 3.98"></path>
                  <path d="M15.41 6.51l-6.82 3.98"></path>
                </svg>
                <span className="text-gray-900">Share</span>
              </button>
            </div>
            {showShareOptions && (
              <div className="border-t border-gray-200 p-2">
                <div className="flex items-center gap-2">
                  <button
                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-md border border-gray-200 hover:bg-gray-50 text-sm"
                    onClick={openTwitter}
                    title="Share to X/Twitter"
                    aria-label="Share to X/Twitter"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M18.244 2H21.5l-7.5 8.573L23 22h-6.373l-4.987-6.07L5.8 22H2.5l8.02-9.163L2 2h6.5l4.52 5.742L18.244 2Zm-1.117 18h1.886L7.01 4h-2L17.127 20Z" />
                    </svg>
                    <span>X</span>
                  </button>
                  <button
                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-md border border-gray-200 hover:bg-gray-50 text-sm"
                    onClick={openLinkedIn}
                    title="Share to LinkedIn"
                    aria-label="Share to LinkedIn"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V23h-4V8.5zM8.5 8.5h3.8v1.98h.06c.53-1 1.84-2.06 3.78-2.06 4.04 0 4.78 2.66 4.78 6.12V23h-4v-6.56c0-1.56-.03-3.56-2.17-3.56-2.17 0-2.5 1.7-2.5 3.45V23h-4V8.5z" />
                    </svg>
                    <span>LinkedIn</span>
                  </button>
                </div>
              </div>
            )}
            <div className="absolute left-1/2 bottom-0 translate-y-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-white border-l border-t border-gray-200 rotate-45" />
          </div>
        </div>
      )}
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a(props) {
            const { href, children } = props;
            return (
              <a href={href as string} target="_blank" rel="noreferrer" className="text-blue-600 underline">
                {children}
              </a>
            );
          },
          code(props) {
            const { inline, className, children, ...rest } = props as any;
            const txt = String(children ?? "");
            if (!inline) {
              const lang = (className || "").replace(/^language-/, "");
              if (lang === "poll") {
                const { question, options } = parsePoll(txt);
                return (
                  <div className="my-6 rounded-lg border p-4">
                    <div className="mb-3 font-semibold">{question}</div>
                    <Poll options={options} />
                  </div>
                );
              }
              if (lang === "quiz") {
                const { question, options } = parsePoll(txt);
                return (
                  <div className="my-6 rounded-lg border p-4">
                    <div className="mb-3 font-semibold">{question}</div>
                    <Quiz options={options} />
                  </div>
                );
              }
            }
            return inline ? (
              <code className="px-1 py-0.5 rounded bg-gray-100 text-gray-800" {...rest}>{children}</code>
            ) : (
              <pre className="rounded-lg bg-gray-900 text-gray-100 p-4 overflow-x-auto"><code className={className}>{children}</code></pre>
            );
          },
          p({ node, children }: any) {
            try {
              const first = node?.children?.[0];
              const isOnlyLink = node?.children?.length === 1 && first?.tagName === 'a';
              const href: string | undefined = isOnlyLink ? (first?.properties?.href as string | undefined) : undefined;
              if (href) {
                if (isYouTube(href)) return <YouTubeEmbed url={href} />;
                if (/twitter\.com\/.+\/status\//i.test(href)) return <TwitterEmbed url={href} />;
                if (/gist\.github\.com\//i.test(href)) return <GistEmbed url={href} />;
              }
            } catch {}
            return <p>{children}</p>;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

function useLocalReaction(key: string) {
  const [counts, setCounts] = React.useState<Record<string, number>>(() => {
    if (typeof window === "undefined") return {};
    try {
      return JSON.parse(localStorage.getItem(key) || "{}");
    } catch {
      return {};
    }
  });
  const react = React.useCallback((emoji: string) => {
    setCounts(prev => {
      const next = { ...prev, [emoji]: (prev[emoji] || 0) + 1 };
      if (typeof window !== "undefined") localStorage.setItem(key, JSON.stringify(next));
      return next;
    });
  }, [key]);
  return { counts, react };
}

function ParagraphWithReactions({ children }: { children: React.ReactNode }) {
  const idRef = React.useRef<string>(Math.random().toString(36).slice(2, 10));
  const storageKey = `post-react-${idRef.current}`;
  const { counts, react } = useLocalReaction(storageKey);
  const [highlight, setHighlight] = React.useState<string | null>(null);

  const onMouseUp = React.useCallback(() => {
    if (typeof window === "undefined") return;
    const sel = window.getSelection();
    const text = sel?.toString().trim();
    setHighlight(text && text.length > 0 ? text : null);
  }, []);

  return (
    <div className="group relative" onMouseUp={onMouseUp}>
      <p>{children}</p>
      <div className="mt-1 hidden gap-2 group-hover:flex">
        {['❤️','🔥','😂','👍','🎉'].map(e => (
          <button key={e} className="text-sm" onClick={() => react(e)} aria-label={`React ${e}`}>
            {e} <span className="text-xs text-gray-500">{counts[e] || 0}</span>
          </button>
        ))}
      </div>
      {highlight ? (
        <div className="absolute -top-8 left-0 flex items-center gap-2 rounded border bg-white px-2 py-1 text-xs shadow">
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent('"' + highlight + '"')}`}
            target="_blank" rel="noreferrer" className="underline"
          >Share</a>
          <button onClick={() => {
            if (navigator?.clipboard) navigator.clipboard.writeText(highlight);
          }}
          >Copy</button>
        </div>
      ) : null}
    </div>
  );
}

function Poll({ options }: { options: string[] }) {
  const [selected, setSelected] = React.useState<string | null>(null);
  const [results, setResults] = React.useState<Record<string, number>>(() => Object.fromEntries(options.map(o => [o, 0])));
  return (
    <div>
      <div className="space-y-2">
        {options.map(o => (
          <label key={o} className={`flex items-center gap-2 rounded border px-3 py-2 ${selected === o ? 'border-blue-500 bg-blue-50' : ''}`}>
            <input type="radio" name="poll" value={o} onChange={() => setSelected(o)} />
            <span>{o}</span>
          </label>
        ))}
      </div>
      <div className="mt-3 flex gap-2">
        <button
          className="rounded bg-blue-600 px-3 py-1 text-white"
          onClick={() => {
            if (!selected) return;
            setResults(prev => ({ ...prev, [selected]: (prev[selected] || 0) + 1 }));
          }}
        >Vote</button>
        <button className="rounded border px-3 py-1" onClick={() => { setSelected(null); }}>Clear</button>
      </div>
      <div className="mt-3 grid grid-cols-1 gap-2">
        {options.map(o => (
          <div key={o} className="text-sm text-gray-600">{o}: {results[o] || 0}</div>
        ))}
      </div>
    </div>
  );
}

function Quiz({ options }: { options: string[] }) {
  const [selected, setSelected] = React.useState<string | null>(null);
  const [revealed, setRevealed] = React.useState(false);
  // Convention: prefix correct answer with *
  const cleaned = options.map(o => o.replace(/^\*\s*/, ""));
  const correctIndex = options.findIndex(o => /^\*\s*/.test(o));
  return (
    <div>
      <div className="space-y-2">
        {cleaned.map((o, i) => (
          <label key={o} className={`flex items-center gap-2 rounded border px-3 py-2 ${selected === o ? 'border-blue-500 bg-blue-50' : ''} ${revealed && i === correctIndex ? 'border-green-500' : ''}`}>
            <input type="radio" name="quiz" value={o} onChange={() => setSelected(o)} />
            <span>{o}</span>
          </label>
        ))}
      </div>
      <div className="mt-3 flex gap-2">
        <button className="rounded bg-blue-600 px-3 py-1 text-white" onClick={() => setRevealed(true)}>Check</button>
        <button className="rounded border px-3 py-1" onClick={() => { setSelected(null); setRevealed(false); }}>Reset</button>
      </div>
    </div>
  );
}


