export type BlogCategory = {
  id: string;
  slug: string;
  name: string;
  description?: string;
};

export type BlogTag = {
  id: string;
  slug: string;
  name: string;
};

export type BlogAuthor = {
  id: string;
  username: string;
  name: string;
  avatarUrl?: string;
  bio?: string;
  websiteUrl?: string;
  twitter?: string;
  github?: string;
};

export type BlogSeries = {
  id: string;
  slug: string;
  title: string;
  description?: string;
};

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // markdown for now
  coverImageUrl?: string;
  authorId: string;
  categoryIds: string[];
  tagIds: string[];
  seriesId?: string;
  linkedProjectIds?: string[]; // integrate with project section
  publishedAt: string; // ISO string
  readingMinutes: number;
};

export type BlogData = {
  authors: BlogAuthor[];
  categories: BlogCategory[];
  tags: BlogTag[];
  series: BlogSeries[];
  posts: BlogPost[];
};


