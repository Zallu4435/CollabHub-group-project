"use client";

import { useEffect, useMemo, useState } from "react";
import { BlogTeamRole } from "../../types";

interface CreateTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (
    name: string,
    description: string,
    defaultRole: BlogTeamRole,
    invites?: Array<{ email: string; role: BlogTeamRole }>
  ) => void;
  defaultName?: string;
  defaultDescription?: string;
  contextNote?: string;
  projectMemberNames?: string[];
  projectMemberEmails?: string[];
}

export default function CreateTeamModal({
  isOpen,
  onClose,
  onCreate,
  defaultName,
  defaultDescription,
  contextNote,
  projectMemberNames = [],
  projectMemberEmails = [],
}: CreateTeamModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [defaultRole, setDefaultRole] = useState<BlogTeamRole>("contributor");
  const [inviteMethod, setInviteMethod] = useState<"email" | "search" | "link">("email");
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<BlogTeamRole>("contributor");
  const [searchQuery, setSearchQuery] = useState("");
  const [pendingInvites, setPendingInvites] = useState<
    Array<{ email: string; role: BlogTeamRole }>
  >([]);

  const mockUsers = useMemo(
    () => [
      { id: "user_1", name: "John Doe", email: "john@example.com", avatar: "/avatars/john.jpg" },
      { id: "user_2", name: "Jane Smith", email: "jane@example.com", avatar: "/avatars/jane.jpg" },
      { id: "user_3", name: "Mike Johnson", email: "mike@example.com", avatar: "/avatars/mike.jpg" },
      { id: "user_4", name: "Sarah Wilson", email: "sarah@example.com", avatar: "/avatars/sarah.jpg" },
      { id: "user_5", name: "Alex Brown", email: "alex@example.com", avatar: "/avatars/alex.jpg" },
    ],
    []
  );

  const filteredUsers = useMemo(() => {
    if (searchQuery.length < 3) return [] as typeof mockUsers;
    return mockUsers.filter(
      (u) =>
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, mockUsers]);

  const isPending = (email: string) => pendingInvites.some((p) => p.email === email);

  useEffect(() => {
    if (!isOpen) return;
    if (!projectMemberNames || projectMemberNames.length === 0) return;
    setPendingInvites((prev) => {
      const existing = new Set(prev.map((p) => p.email));
      const additions = (projectMemberEmails.length > 0
        ? projectMemberEmails
        : projectMemberNames.map((n) => `${n}@example.com`)
      )
        .filter((email) => !existing.has(email))
        .map((email) => ({ email, role: defaultRole }));
      return additions.length ? [...prev, ...additions] : prev;
    });
  }, [isOpen, projectMemberNames, defaultRole, projectMemberEmails]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const effectiveName = (name || defaultName || "").trim();
    const effectiveDescription = (description || defaultDescription || "").trim();
    if (effectiveName) {
      onCreate(effectiveName, effectiveDescription, defaultRole, pendingInvites);
      setName("");
      setDescription("");
      setDefaultRole("contributor");
      setPendingInvites([]);
      setInviteEmail("");
      setSearchQuery("");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-2xl mx-4 rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 overflow-hidden">
        {/* Fixed header */}
        <div className="sticky top-0 z-10 flex items-start justify-between px-6 py-4 border-b border-gray-100 bg-white">
          <h3 className="text-xl font-semibold text-gray-900">Create New Team</h3>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Scrollable body with max height */}
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="px-6 py-5 space-y-6 overflow-y-auto"
               style={{ maxHeight: "65vh" }}>
            {/* Team Name */}
            <div className="grid grid-cols-1 gap-2">
              <label className="text-sm font-medium text-gray-800">Team Name</label>
              <input
                type="text"
                value={name || defaultName || ""}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100"
                placeholder="Enter team name"
                required
              />
            </div>

            {/* Project members */}
            {projectMemberNames.length > 0 && (
              <div className="rounded-xl border border-gray-200 bg-white">
                <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100">
                  <div className="text-xs font-medium text-gray-600">Project members</div>
                </div>
                <div className="max-h-56 overflow-y-auto divide-y divide-gray-100">
                  {projectMemberNames.map((nm, idx) => {
                    const email = projectMemberEmails[idx] ?? `${nm}@example.com`;
                    const pending = isPending(email);
                    return (
                      <div key={`${nm}-${idx}`} className="flex items-center justify-between px-3 py-2.5">
                        <div className="min-w-0">
                          <div className="truncate text-sm font-medium text-gray-900">{nm}</div>
                          <div className="truncate text-xs text-gray-500">{email}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <select
                            className="rounded-md border border-gray-300 bg-white px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                            onChange={() => {/* no-op */}}
                            defaultValue={inviteRole}
                            disabled={pending}
                          >
                            <option value="contributor">Contributor</option>
                            <option value="editor">Editor</option>
                            <option value="viewer">Viewer</option>
                          </select>
                          {!pending ? (
                            <button
                              type="button"
                              onClick={() =>
                                setPendingInvites((prev) =>
                                  prev.find((p) => p.email === email)
                                    ? prev
                                    : [...prev, { email, role: inviteRole }]
                                )
                              }
                              className="px-2.5 py-1.5 rounded-md border border-gray-300 text-sm text-gray-800 hover:bg-gray-50"
                            >
                              Add
                            </button>
                          ) : (
                            <span className="px-2.5 py-1.5 rounded-md bg-green-50 text-xs font-medium text-green-700 border border-green-200">
                              Added
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Invite method tabs */}
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-800">Invite Members (optional)</label>
              <div className="flex gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setInviteMethod("email")}
                  className={`px-2 py-1 rounded-md border transition ${
                    inviteMethod === "email"
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Email
                </button>
                <button
                  type="button"
                  onClick={() => setInviteMethod("search")}
                  className={`px-2 py-1 rounded-md border transition ${
                    inviteMethod === "search"
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Search
                </button>
                <button
                  type="button"
                  onClick={() => setInviteMethod("link")}
                  className={`px-2 py-1 rounded-md border transition ${
                    inviteMethod === "link"
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Link
                </button>
              </div>
            </div>

            {/* Email invite */}
            {inviteMethod === "email" && (
              <div className="grid grid-cols-1 gap-2 rounded-xl border border-gray-200 p-3">
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100"
                  placeholder="member@example.com"
                />
                <div className="flex items-center gap-2">
                  <select
                    value={inviteRole}
                    onChange={(e) => setInviteRole(e.target.value as BlogTeamRole)}
                    className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="contributor">Contributor</option>
                    <option value="editor">Editor</option>
                    <option value="viewer">Viewer</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => {
                      const email = inviteEmail.trim();
                      if (email) {
                        setPendingInvites((prev) =>
                          prev.some((p) => p.email === email) ? prev : [...prev, { email, role: inviteRole }]
                        );
                        setInviteEmail("");
                      }
                    }}
                    className="px-3 py-2 rounded-lg bg-gray-900 text-white text-sm hover:bg-black"
                  >
                    Add
                  </button>
                </div>
              </div>
            )}

            {/* Search invite */}
            {inviteMethod === "search" && (
              <div className="space-y-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100"
                  placeholder="Search by name or email..."
                />
                {searchQuery.length > 0 && searchQuery.length < 3 && (
                  <div className="text-xs text-gray-500">Type at least 3 characters to search</div>
                )}
                {filteredUsers.length > 0 && (
                  <div className="rounded-xl border border-gray-200">
                    <div className="max-h-44 overflow-y-auto divide-y divide-gray-100">
                      {filteredUsers.map((u) => {
                        const pending = isPending(u.email);
                        return (
                          <div key={u.id} className="flex items-center justify-between p-2 hover:bg-gray-50">
                            <div className="min-w-0">
                              <div className="truncate text-sm text-gray-900">{u.name}</div>
                              <div className="truncate text-xs text-gray-600">{u.email}</div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="text-xs text-gray-500">as {inviteRole}</div>
                              {!pending ? (
                                <button
                                  type="button"
                                  onClick={() =>
                                    setPendingInvites((prev) =>
                                      prev.find((p) => p.email === u.email)
                                        ? prev
                                        : [...prev, { email: u.email, role: inviteRole }]
                                    )
                                  }
                                  className="px-2.5 py-1.5 rounded-md border border-gray-300 text-sm text-gray-800 hover:bg-gray-50"
                                >
                                  Add
                                </button>
                              ) : (
                                <span className="px-2.5 py-1.5 rounded-md bg-green-50 text-xs font-medium text-green-700 border border-green-200">
                                  Added
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Link invite */}
            {inviteMethod === "link" && (
              <div className="space-y-2 rounded-xl border border-gray-200 p-3">
                <div className="text-sm text-gray-700">Invite link</div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={`https://app.example.com/join/${(name || defaultName || "new-team")
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                    className="flex-1 rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-gray-900"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      navigator.clipboard.writeText(
                        `https://app.example.com/join/${(name || defaultName || "new-team")
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`
                      )
                    }
                    className="px-3 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700"
                  >
                    Copy
                  </button>
                </div>
                <div className="text-xs text-gray-500">
                  Share this link. They will join with default role "{defaultRole}".
                </div>
              </div>
            )}

            {/* Pending invites */}
            {pendingInvites.length > 0 && (
              <div className="rounded-xl border border-gray-200">
                <div className="px-3 py-2 text-xs font-medium text-gray-600 border-b border-gray-100">
                  Pending invites
                </div>
                <div className="divide-y divide-gray-100">
                  {pendingInvites.map((inv, idx) => (
                    <div key={`${inv.email}-${idx}`} className="flex items-center justify-between px-3 py-2.5 text-sm">
                      <div className="min-w-0">
                        <div className="truncate text-gray-900">{inv.email}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-600">{inv.role}</span>
                        <button
                          type="button"
                          onClick={() => setPendingInvites((prev) => prev.filter((_, i) => i !== idx))}
                          className="text-red-600 hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            <div className="grid grid-cols-1 gap-2">
              <label className="text-sm font-medium text-gray-800">Description</label>
              <textarea
                value={description || defaultDescription || ""}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100"
                rows={3}
                placeholder="Describe your team's purpose"
              />
            </div>

            {/* Default role */}
            <div className="grid grid-cols-1 gap-2">
              <label className="text-sm font-medium text-gray-800">Default Role for New Members</label>
              <select
                value={defaultRole}
                onChange={(e) => setDefaultRole(e.target.value as BlogTeamRole)}
                className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100"
              >
                <option value="contributor">Contributor</option>
                <option value="editor">Editor</option>
                <option value="viewer">Viewer</option>
              </select>
              <p className="text-xs text-gray-500">
                Contributors can create drafts and submit for review. Editors can publish directly.
              </p>
            </div>
          </div>

          {/* Sticky footer actions */}
          <div className="sticky bottom-0 z-10 flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-white">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-gray-600 hover:text-gray-800 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              Create Team
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
