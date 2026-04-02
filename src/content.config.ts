import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const baseSchema = z.object({
  title: z.string(),
  description: z.string(),
  keywords: z.array(z.string()).optional(),
  canonical: z.string().optional(),
  date: z.string().optional(),
  author: z.string().optional(),
  draft: z.boolean().optional().default(false),
  noindex: z.boolean().optional().default(false),
  schemaType: z.string().optional(),
  image: z.string().optional(),
  imageAlt: z.string().optional(),
  imageWidth: z.number().optional(),
  imageHeight: z.number().optional(),
  linksTo: z.array(z.string()).optional(),
});

// Exclude planning/reference docs that have no frontmatter
const EXCLUDE = [
  '!**/README.md',
  '!**/index.md',           // blog index is a planning doc
  '!**/content-map.md',
  '!**/internal-linking-plan.md',
  '!**/page-stubs-manifest.md',
  '!**/keyword-matrix.md',
  '!**/faq-jsonld-snippets.md',
  '!**/sitemap-architecture.md',
];

const pages = defineCollection({
  loader: glob({ pattern: ['**/*.md', ...EXCLUDE], base: './src/content/pages' }),
  schema: baseSchema,
});

const blog = defineCollection({
  loader: glob({ pattern: ['**/*.{md,mdx}', ...EXCLUDE], base: './src/content/blog' }),
  schema: baseSchema.extend({
    category: z.string().optional(),
  }),
});

const local = defineCollection({
  loader: glob({ pattern: ['**/*.md', ...EXCLUDE], base: './src/content/local' }),
  schema: baseSchema.extend({
    location: z.string().optional(),
    category: z.string().optional(),
    localNote: z.string().optional(),
    nearbyNeighborhoods: z.string().optional(),
  }),
});

const seo = defineCollection({
  loader: glob({ pattern: ['**/*.md', ...EXCLUDE], base: './src/content/seo' }),
  schema: baseSchema.extend({
    category: z.string().optional(),
    references: z.array(z.string()).optional(),
  }),
});

const lifestyle = defineCollection({
  loader: glob({ pattern: ['**/*.md', ...EXCLUDE], base: './src/content/lifestyle' }),
  schema: baseSchema.extend({
    category: z.string().optional(),
    references: z.array(z.string()).optional(),
  }),
});

export const collections = { pages, blog, local, seo, lifestyle };
