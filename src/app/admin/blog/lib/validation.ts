import { z } from 'zod';

export const postSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Invalid slug format'),
  excerpt: z.string().max(500, 'Excerpt too long').optional(),
  content: z.string().min(1, 'Content is required'),
  categoryId: z.string().optional(),
  tagIds: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  state: z.enum(['draft', 'scheduled', 'published']),
  scheduledAt: z.string().optional(),
  metaTitle: z.string().max(60, 'Meta title too long').optional(),
  metaDescription: z.string().max(160, 'Meta description too long').optional(),
});

export const seoSchema = z.object({
  metaTitle: z.string().min(1).max(60),
  metaDescription: z.string().min(1).max(160),
  canonicalUrl: z.string().url().optional(),
  robots: z.enum(['index,follow', 'noindex,nofollow']),
  keywords: z.array(z.string()).optional(),
});

export type PostFormData = z.infer<typeof postSchema>;
export type SeoFormData = z.infer<typeof seoSchema>;
