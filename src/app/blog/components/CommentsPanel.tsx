"use client";
import React from "react";

type Comment = {
  id: string;
  name: string;
  message: string;
  at: number;
  likes: number;
  dislikes: number;
  replies?: Comment[];
};

type Props = { storageKey: string };

type SortMode = "top" | "newest";

export default function CommentsPanel({ storageKey }: Props) {
  const [comments, setComments] = React.useState<Comment[]>([]);
  const [name, setName] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [sort, setSort] = React.useState<SortMode>("top");
  const [openReplyFor, setOpenReplyFor] = React.useState<string | null>(null);

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      const existing = raw ? (JSON.parse(raw) as Comment[]) : [];
      if (existing.length > 0) {
        setComments(existing);
        return;
      }
      const seeded: Comment[] = [
        {
          id: "c1",
          name: "Alex P.",
          message: "Loved the part about typed contracts. Helped our team a ton.",
          at: Date.now() - 1000 * 60 * 60 * 6,
          likes: 14,
          dislikes: 1,
          replies: [
            {
              id: "c1r1",
              name: "Dev R.",
              message: "Same here. Cut our regressions noticeably.",
              at: Date.now() - 1000 * 60 * 60 * 5,
              likes: 6,
              dislikes: 0,
            },
          ],
        },
        {
          id: "c2",
          name: "Jamie",
          message: "Edge functions + cache invalidation = chef's kiss.",
          at: Date.now() - 1000 * 60 * 60 * 24,
          likes: 9,
          dislikes: 0,
        },
        {
          id: "c3",
          name: "Riya",
          message: "Would you recommend tRPC over GraphQL for small teams?",
          at: Date.now() - 1000 * 60 * 90,
          likes: 3,
          dislikes: 0,
        },
      ];
      setComments(seeded);
      localStorage.setItem(storageKey, JSON.stringify(seeded));
    } catch {}
  }, [storageKey]);

  const save = (next: Comment[]) => {
    setComments(next);
    try { localStorage.setItem(storageKey, JSON.stringify(next)); } catch {}
  };

  const timeAgo = (at: number) => {
    const diff = Math.max(1, Math.floor((Date.now() - at) / 1000));
    if (diff < 60) return `${diff}s ago`;
    const m = Math.floor(diff / 60);
    if (m < 60) return `${m}m ago`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h ago`;
    const d = Math.floor(h / 24);
    return `${d}d ago`;
  };

  const addRoot = () => {
    if (!message.trim()) return;
    const displayName = name.trim() || "Anonymous";
    const c: Comment = {
      id: Math.random().toString(36).slice(2, 10),
      name: displayName,
      message: message.trim(),
      at: Date.now(),
      likes: 0,
      dislikes: 0,
      replies: []
    };
    save([c, ...comments]);
    setMessage("");
  };

  function updateById(list: Comment[], id: string, updater: (c: Comment) => Comment): Comment[] {
    return list.map(c => {
      if (c.id === id) return updater(c);
      if (c.replies && c.replies.length) {
        return { ...c, replies: updateById(c.replies, id, updater) };
      }
      return c;
    });
  }

  const like = (id: string) => {
    save(updateById(comments, id, c => ({ ...c, likes: (c.likes || 0) + 1 })));
  };

  const dislike = (id: string) => {
    save(updateById(comments, id, c => ({ ...c, dislikes: (c.dislikes || 0) + 1 })));
  };

  const addReply = (parentId: string, replyText: string) => {
    if (!replyText.trim()) return;
    const displayName = name.trim() || "Anonymous";
    const reply: Comment = {
      id: Math.random().toString(36).slice(2, 10),
      name: displayName,
      message: replyText.trim(),
      at: Date.now(),
      likes: 0,
      dislikes: 0,
      replies: []
    };
    const next = updateById(comments, parentId, c => ({ ...c, replies: [...(c.replies || []), reply] }));
    save(next);
  };

  const clearAll = () => {
    save([]);
  };

  const sorted = React.useMemo(() => {
    const score = (c: Comment): number => (c.likes - c.dislikes) + (c.replies?.reduce((acc, r) => acc + Math.max(0, r.likes - r.dislikes), 0) || 0);
    const base = comments.slice();
    if (sort === "newest") return base.sort((a, b) => b.at - a.at);
    return base.sort((a, b) => score(b) - score(a));
  }, [comments, sort]);

  const CommentItem: React.FC<{ c: Comment; depth?: number }> = ({ c, depth = 0 }) => {
    const [replyText, setReplyText] = React.useState("");
    const open = openReplyFor === c.id;
    const initials = (c.name || "?")
      .split(/\s+/)
      .map(s => s[0]?.toUpperCase())
      .slice(0, 2)
      .join("");

    return (
      <div className="flex gap-3">
        <div className="flex-shrink-0">
          <div className="h-8 w-8 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center text-xs font-medium">
            {initials || "?"}
          </div>
        </div>
        <div className="flex-1">
          <div className="text-sm">
            <span className="font-medium text-gray-900">{c.name}</span>
            <span className="ml-2 text-xs text-gray-500">{timeAgo(c.at)}</span>
          </div>
          <div className="mt-1 text-sm whitespace-pre-wrap text-gray-900">{c.message}</div>
          <div className="mt-2 flex items-center gap-2 text-xs text-gray-600">
            <button className="px-2 py-1 rounded hover:bg-gray-100" onClick={() => like(c.id)} aria-label="Like">
              👍 {c.likes || 0}
            </button>
            <button className="px-2 py-1 rounded hover:bg-gray-100" onClick={() => dislike(c.id)} aria-label="Dislike">
              👎 {c.dislikes || 0}
            </button>
            <button
              className="px-2 py-1 rounded hover:bg-gray-100"
              onClick={() => setOpenReplyFor(open ? null : c.id)}
            >
              Reply
            </button>
          </div>
          {open && (
            <div className="mt-2">
              <textarea
                value={replyText}
                onChange={e => setReplyText(e.target.value)}
                rows={2}
                placeholder="Add a reply..."
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="mt-2 flex gap-2">
                <button
                  className="px-3 py-1.5 rounded bg-blue-600 text-white text-sm disabled:opacity-50"
                  disabled={!replyText.trim()}
                  onClick={() => {
                    addReply(c.id, replyText);
                    setReplyText("");
                    setOpenReplyFor(null);
                  }}
                >
                  Reply
                </button>
                <button
                  className="px-3 py-1.5 rounded border text-sm"
                  onClick={() => { setReplyText(""); setOpenReplyFor(null); }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
          {c.replies && c.replies.length > 0 && (
            <div className="mt-3 ml-6 space-y-3">
              {c.replies
                .slice()
                .sort((a, b) => (sort === "newest" ? b.at - a.at : (b.likes - b.dislikes) - (a.likes - a.dislikes)))
                .map(r => (
                  <div key={r.id} className="">
                    <CommentItem c={r} depth={depth + 1} />
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 text-gray-900">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="font-semibold">Comments</div>
          <div className="text-sm text-gray-600">{comments.length}</div>
        </div>
        <div className="flex items-center gap-2">
          {comments.length > 0 && (
            <select
              value={sort}
              onChange={e => setSort(e.target.value as SortMode)}
              className="rounded border border-gray-300 px-2 py-1 text-xs"
              title="Sort comments"
            >
              <option value="top">Top</option>
              <option value="newest">Newest</option>
            </select>
          )}
          {comments.length > 0 && (
            <button className="text-xs text-gray-600 hover:text-gray-900" onClick={clearAll} title="Clear local comments">
              Clear
            </button>
          )}
        </div>
      </div>

      <div className="mb-4 space-y-2">
        <input
          type="text"
          placeholder="Your name (optional)"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          placeholder="Add a public comment..."
          value={message}
          onChange={e => setMessage(e.target.value)}
          rows={3}
          className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex justify-end">
          <button
            className="px-3 py-1.5 rounded bg-blue-600 text-white text-sm disabled:opacity-50"
            onClick={addRoot}
            disabled={!message.trim()}
          >Comment</button>
        </div>
      </div>

      {comments.length > 0 ? (
        <div className="space-y-4">
          {sorted.map(c => (
            <div key={c.id} className="">
              <CommentItem c={c} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-sm text-gray-600">No comments yet. Be the first to comment.</div>
      )}
    </div>
  );
}

