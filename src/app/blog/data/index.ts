import { BlogAuthor, BlogCategory, BlogData, BlogPost, BlogSeries, BlogTag, BlogTeam, BlogTeamMember, BlogInvitation } from "../types";

function buildLongContent(): string {
  const lines: string[] = [];
  lines.push("# Future of Web 2025");
  lines.push("");
  lines.push(
    "AI-assisted coding, edge runtimes, and typed contracts are reshaping how teams ship reliable software. This article outlines what matters now and how to prepare your stack."
  );
  lines.push("");
  lines.push("## Overview");
  lines.push(
    "Teams are moving to smaller, composable services with clear boundaries. Observability and performance budgets are becoming table stakes, not afterthoughts."
  );
  lines.push("");
  lines.push("## Typed APIs");
  lines.push(
    "End-to-end types reduce breakage and speed up refactors. Whether you use tRPC, OpenAPI, or GraphQL, the key is a single source of truth shared by client and server."
  );
  lines.push("");
  lines.push("## Demo media");
  lines.push(
    "Here is a short talk that illustrates the shift toward typed contracts and edge runtimes:"
  );
  lines.push("");
  lines.push("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
  lines.push("");
  lines.push("```ts");
  lines.push("export type Contract<T> = {");
  lines.push("  parse(input: unknown): T");
  lines.push("  serialize(value: T): unknown");
  lines.push("}");
  lines.push("```");
  lines.push("");
  lines.push("## Edge & Realtime");
  lines.push(
    "Edge functions bring latency down for read-heavy paths, while websockets and server-sent events unlock collaborative UX. Cache invalidation strategies become crucial."
  );
  lines.push("");
  lines.push("```poll");
  lines.push("Which trend will impact your team the most in 2025?");
  lines.push("- AI copilots");
  lines.push("- Edge runtimes");
  lines.push("- Typed APIs");
  lines.push("- Realtime collaboration");
  lines.push("```");
  lines.push("");
  lines.push("## DX & Tooling");
  lines.push(
    "AI copilots now assist code review, tests, and migrations. Keep them inside guardrails: linting, type checks, and CI remain the source of truth."
  );
  lines.push("");
  lines.push("## Case Studies");
  lines.push(
    "We migrated a legacy REST service to a typed contract shared with the frontend. Deploy times improved 2x and on-call pages dropped by 35%."
  );
  lines.push("");
  lines.push("---");
  lines.push("### Key Takeaways");
  lines.push("- Share contracts across boundaries");
  lines.push("- Prefer edge for read latency");
  lines.push("- Keep CI as the arbiter of truth");
  lines.push("");
  lines.push("## Conclusion");
  lines.push(
    "The pragmatic path forward blends type-safe boundaries, ergonomic developer experience, and user-first realtime features. Start small, measure, iterate."
  );
  return lines.join("\n");
}

const authors: BlogAuthor[] = [
  {
    id: "a_sarah",
    username: "sarah",
    name: "Sarah Johnson",
    avatarUrl: "/avatars/sarah.jpg",
    bio: "Designer-turned-developer. Writing about design systems and UX engineering.",
    twitter: "sarah_designs",
    github: "sarahj-dev"
  },
  {
    id: "a_michael",
    username: "michael",
    name: "Michael Chen",
    avatarUrl: "/avatars/michael.jpg",
    bio: "Full‑stack engineer. Performance, architecture, and DX.",
    twitter: "mike_codes",
    github: "mike-chen"
  },
  {
    id: "a_emma",
    username: "emma",
    name: "Emma Wilson",
    avatarUrl: "/avatars/emma.jpg",
    bio: "Product thinker. Minimalism, UX, and research.",
    twitter: "emma_writes",
    github: "emmawilson"
  }
];

const categories: BlogCategory[] = [
  { id: "c_tech", slug: "technology", name: "Technology" },
  { id: "c_design", slug: "design", name: "Design" },
  { id: "c_programming", slug: "programming", name: "Programming" },
  { id: "c_ai", slug: "ai", name: "AI" },
  { id: "c_startups", slug: "startups", name: "Startups" }
];

const tags: BlogTag[] = [
  { id: "t_react", slug: "react", name: "React" },
  { id: "t_architecture", slug: "architecture", name: "Architecture" },
  { id: "t_minimalism", slug: "minimalism", name: "Minimalism" },
  { id: "t_ai", slug: "ai", name: "AI" },
  { id: "t_ux", slug: "ux", name: "UX" },
  { id: "t_startup", slug: "startup", name: "Startup" }
];

const series: BlogSeries[] = [
  { id: "s_build_in_public", slug: "build-in-public", title: "Build in Public" }
];

const posts: BlogPost[] = [
  {
    id: "p_future_web_2025",
    slug: "future-of-web-2025",
    title: "The Future of Web Development: What's Next in 2025",
    excerpt: "Trends shaping web dev: AI-assisted coding, edge runtimes, and typed APIs.",
    content: buildLongContent(),
    coverImageUrl: "/blog/featured-post.jpg",
    authorId: "a_sarah",
    categoryIds: ["c_tech", "c_ai"],
    tagIds: ["t_ai"],
    seriesId: "s_build_in_public",
    linkedProjectIds: ["proj_1"],
    publishedAt: "2024-12-15T09:00:00.000Z",
    readingMinutes: 8,
    likesCount: 124,
    commentsCount: 37,
    blogType: "solo",
    status: "published",
    location: {
      city: "San Francisco",
      state: "California",
      country: "United States",
      displayText: "San Francisco, California, United States"
    }
  },
  {
    id: "p_react_clean_arch",
    slug: "react-clean-architecture",
    title: "Building Scalable React Apps with Clean Architecture",
    excerpt: "Structure React apps for maintainability: features, boundaries, and contracts.",
    content: "# Clean Architecture\n\nA pragmatic guide to feature-driven structure and DX...",
    coverImageUrl: "/blog/react-architecture.jpg",
    authorId: "a_michael",
    categoryIds: ["c_programming"],
    tagIds: ["t_react", "t_architecture"],
    publishedAt: "2024-12-14T12:00:00.000Z",
    readingMinutes: 6,
    likesCount: 89,
    commentsCount: 22,
    blogType: "solo",
    status: "published",
    location: {
      city: "New York",
      state: "New York",
      country: "United States",
      displayText: "New York, New York, United States"
    }
  },
  {
    id: "p_minimalist_design",
    slug: "minimalist-design-digital-products",
    title: "The Art of Minimalist Design in Digital Products",
    excerpt: "How minimalism enhances UX and communicates intent with less.",
    content: "# Minimalist Design\n\nPrinciples, examples, and trade-offs...",
    coverImageUrl: "/blog/minimalist-design.jpg",
    authorId: "a_emma",
    categoryIds: ["c_design"],
    tagIds: ["t_minimalism", "t_ux"],
    publishedAt: "2024-12-13T10:00:00.000Z",
    readingMinutes: 5,
    likesCount: 64,
    commentsCount: 15,
    blogType: "solo",
    status: "published",
    location: {
      city: "London",
      country: "United Kingdom",
      displayText: "London, United Kingdom"
    }
  },
  {
    id: "p_team_collaboration",
    slug: "team-collaboration-best-practices",
    title: "Best Practices for Team Collaboration in Remote Work",
    excerpt: "How to build effective remote teams and maintain productivity across time zones.",
    content: "# Team Collaboration\n\nRemote work best practices and tools...",
    coverImageUrl: "/blog/team-collaboration.jpg",
    authorId: "a_sarah",
    categoryIds: ["c_tech"],
    tagIds: ["t_startup"],
    publishedAt: "2024-12-12T14:00:00.000Z",
    readingMinutes: 7,
    likesCount: 45,
    commentsCount: 12,
    blogType: "team",
    teamId: "team_alpha",
    status: "published",
    location: {
      city: "Bangalore",
      state: "Karnataka",
      country: "India",
      displayText: "Bangalore, Karnataka, India"
    }
  },
  {
    id: "p_locked_demo",
    slug: "locked-demo-post",
    title: "This is a Locked Post (Demo)",
    excerpt: "This post is locked and should not be visible in public views.",
    content: "# Locked Post\n\nThis is a demo of a locked post that should be hidden from public view.",
    coverImageUrl: "/blog/locked-demo.jpg",
    authorId: "a_sarah",
    categoryIds: ["c_tech"],
    tagIds: ["t_ai"],
    publishedAt: "2024-12-10T10:00:00.000Z",
    readingMinutes: 3,
    likesCount: 0,
    commentsCount: 0,
    blogType: "solo",
    status: "published",
    isLocked: true,
    location: {
      city: "Seattle",
      state: "Washington",
      country: "United States",
      displayText: "Seattle, Washington, United States"
    }
  }
];

// Mock team data
const teams: BlogTeam[] = [
  {
    id: "team_alpha",
    name: "Alpha Development Team",
    description: "A collaborative team focused on modern web development practices",
    slug: "alpha-dev-team",
    avatarUrl: "/avatars/team-alpha.jpg",
    createdAt: "2024-01-15T10:00:00.000Z",
    createdBy: "a_sarah",
    memberCount: 4,
    blogCount: 1,
    settings: {
      allowMemberInvites: true,
      requireApprovalForPosts: true,
      defaultRole: "contributor"
    }
  },
  {
    id: "team_beta",
    name: "Beta Design Collective",
    description: "Design-focused team sharing insights on UX and visual design",
    slug: "beta-design-collective",
    avatarUrl: "/avatars/team-beta.jpg",
    createdAt: "2024-02-20T14:30:00.000Z",
    createdBy: "a_emma",
    memberCount: 3,
    blogCount: 0,
    settings: {
      allowMemberInvites: false,
      requireApprovalForPosts: false,
      defaultRole: "editor"
    }
  }
];

const teamMembers: BlogTeamMember[] = [
  {
    id: "tm_1",
    userId: "a_sarah",
    teamId: "team_alpha",
    role: "owner",
    joinedAt: "2024-01-15T10:00:00.000Z",
    status: "active"
  },
  {
    id: "tm_2",
    userId: "a_michael",
    teamId: "team_alpha",
    role: "editor",
    joinedAt: "2024-01-20T09:00:00.000Z",
    invitedBy: "a_sarah",
    status: "active"
  },
  {
    id: "tm_3",
    userId: "a_emma",
    teamId: "team_alpha",
    role: "contributor",
    joinedAt: "2024-02-01T11:00:00.000Z",
    invitedBy: "a_sarah",
    status: "active"
  },
  {
    id: "tm_4",
    userId: "user_4",
    teamId: "team_alpha",
    role: "viewer",
    joinedAt: "2024-02-10T16:00:00.000Z",
    invitedBy: "a_michael",
    status: "active"
  },
  {
    id: "tm_5",
    userId: "a_emma",
    teamId: "team_beta",
    role: "owner",
    joinedAt: "2024-02-20T14:30:00.000Z",
    status: "active"
  }
];

const invitations: BlogInvitation[] = [
  {
    id: "inv_1",
    teamId: "team_alpha",
    email: "newmember@example.com",
    role: "contributor",
    invitedBy: "a_sarah",
    invitedAt: "2024-12-10T10:00:00.000Z",
    expiresAt: "2024-12-17T10:00:00.000Z",
    status: "pending",
    token: "abc123def456"
  }
];

export const blogData: BlogData = {
  authors,
  categories,
  tags,
  series,
  posts,
  teams,
  teamMembers,
  invitations
};

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find(p => p.slug === slug);
}

export function getAuthorByUsername(username: string): BlogAuthor | undefined {
  return authors.find(a => a.username === username);
}

export function getCategoryBySlug(slug: string): BlogCategory | undefined {
  return categories.find(c => c.slug === slug);
}

export function getTagBySlug(slug: string): BlogTag | undefined {
  return tags.find(t => t.slug === slug);
}

export function getRelatedPosts(postId: string, limit = 3): BlogPost[] {
  const current = posts.find(p => p.id === postId);
  if (!current) return posts.slice(0, limit);
  const related = posts
    .filter(p => p.id !== postId)
    .map(p => ({
      post: p,
      score:
        (p.tagIds.filter(t => current.tagIds.includes(t)).length * 2) +
        (p.categoryIds.filter(c => current.categoryIds.includes(c)).length) +
        (p.linkedProjectIds?.filter(id => current.linkedProjectIds?.includes(id ?? "") ?? false).length || 0)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(x => x.post);
  return related;
}

// Team-related helper functions
export function getTeamById(teamId: string): BlogTeam | undefined {
  return teams.find(t => t.id === teamId);
}

export function getTeamBySlug(slug: string): BlogTeam | undefined {
  return teams.find(t => t.slug === slug);
}

export function getTeamMembers(teamId: string): BlogTeamMember[] {
  return teamMembers.filter(tm => tm.teamId === teamId && tm.status === 'active');
}

export function getUserTeams(userId: string): BlogTeam[] {
  const userTeamIds = teamMembers
    .filter(tm => tm.userId === userId && tm.status === 'active')
    .map(tm => tm.teamId);
  return teams.filter(t => userTeamIds.includes(t.id));
}

export function getUserRoleInTeam(userId: string, teamId: string): BlogTeamMember | undefined {
  return teamMembers.find(tm => tm.userId === userId && tm.teamId === teamId && tm.status === 'active');
}

export function getTeamPosts(teamId: string): BlogPost[] {
  return posts.filter(p => p.teamId === teamId);
}

export function canUserPublishInTeam(userId: string, teamId: string): boolean {
  const member = getUserRoleInTeam(userId, teamId);
  if (!member) return false;
  return ['owner', 'editor'].includes(member.role);
}

export function canUserManageTeam(userId: string, teamId: string): boolean {
  const member = getUserRoleInTeam(userId, teamId);
  if (!member) return false;
  return member.role === 'owner';
}


