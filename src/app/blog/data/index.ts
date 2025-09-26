import { BlogAuthor, BlogCategory, BlogData, BlogPost, BlogSeries, BlogTag } from "../types";

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
    content: "# Future of Web 2025\n\nAI coding, edge compute, and typed contracts will define modern apps...",
    coverImageUrl: "/blog/featured-post.jpg",
    authorId: "a_sarah",
    categoryIds: ["c_tech", "c_ai"],
    tagIds: ["t_ai"],
    seriesId: "s_build_in_public",
    linkedProjectIds: ["proj_1"],
    publishedAt: "2024-12-15T09:00:00.000Z",
    readingMinutes: 8
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
    readingMinutes: 6
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
    readingMinutes: 5
  }
];

export const blogData: BlogData = {
  authors,
  categories,
  tags,
  series,
  posts
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


