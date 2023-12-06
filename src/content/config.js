import { z, defineCollection } from 'astro:content';

export const collections = {
  posts: defineCollection({
    type: 'content',
    schema: z.object({
      type: z.string(),
      title: z.string(),
      tags: z.array(z.string()).optional(),
      date: z.date(),
      author: z.string(),
      featuredImage: z.string(),
    }),
  }),
  articles: defineCollection({
    type: 'content',
    schema: z.object({
      type: z.string(),
      title: z.string(),
      tags: z.array(z.string()).optional(),
      date: z.date(),
      url: z.string(),
      canonical: z.string().optional(),
      publication: z.string(),
      author: z.string(),
      logo: z.string(),
    }),
  }),
  streams: defineCollection({
    type: 'content',
    schema: z.object({
      type: z.string(),
      title: z.string(),
      tags: z.array(z.string()).optional(),
      date: z.date(),
      url: z.string(),
      show: z.string(),
      role: z.string(),
      logo: z.string(),
    }),
  }),
  demos: defineCollection({
    type: 'content',
    schema: z.object({
      type: z.string(),
      title: z.string(),
      tags: z.array(z.string()).optional(),
      date: z.date(),
      author: z.string(),
      featuredImage: z.string(),
    }),
  }),
  opensource: defineCollection({
    type: 'content',
    schema: z.object({
      type: z.string(),
      title: z.string(),
      tags: z.array(z.string()).optional(),
      date: z.date(),
      author: z.string(),
      featuredImage: z.string(),
    }),
  }),
};
