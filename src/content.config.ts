import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    category: z.string().default('Général'),
    categorySlug: z.string().default('general'),
    tags: z.array(z.string()).default([]),
    takeaways: z.array(z.string()).default([]),
    faq: z
      .array(z.object({ question: z.string(), answer: z.string() }))
      .default([]),
    readingTime: z.number().optional(),
    sourceId: z.number().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
