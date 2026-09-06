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

// Exclude planning/reference docs that have no frontmatter. Shared across
// collections. index.md is deliberately NOT here: it was previously excluded
// globally on the assumption every index.md is a planning doc, which broke
// the lifestyle collection's 7 real category-hub pages (nutrition/index.md
// etc. are genuine content, not planning notes). The blog collection
// excludes index.md on its own, below, since blog/index.md really is one.
const EXCLUDE = [
  '!**/README.md',
  '!**/content-map.md',
  '!**/internal-linking-plan.md',
  '!**/page-stubs-manifest.md',
  '!**/keyword-matrix.md',
  '!**/faq-jsonld-snippets.md',
  '!**/sitemap-architecture.md',
];

const blog = defineCollection({
  loader: glob({ pattern: ['**/*.{md,mdx}', ...EXCLUDE, '!**/index.md'], base: './src/content/blog' }),
  schema: baseSchema.extend({
    category: z.string().optional(),
  }),
});

const local = defineCollection({
  loader: glob({ pattern: ['**/*.{md,mdx}', ...EXCLUDE], base: './src/content/local' }),
  schema: baseSchema.extend({
    location: z.string().optional(),
    // Drives physician routing on the hero card (src/utils/physicianRouting.ts).
    // Required: a missing or misspelled value must fail the build, not fall
    // back silently to the team card.
    category: z.enum(['concierge', 'direct-primary-care', 'lifestyle-medicine', 'menopause']),
    localNote: z.string().optional(),
    nearbyNeighborhoods: z.string().optional(),
    mapEmbedUrl: z.string().optional(),
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

const educationEntry = z.object({
  degree: z.string().optional(),
  field: z.string().optional(),
  residency: z.string().optional(),
  institution: z.string(),
  year: z.number().nullable().optional(),
});

const providers = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/providers' }),
  schema: ({ image }) => z.object({
    name: z.string(),
    credentials: z.string(),
    slug: z.string(),
    title: z.string(),
    photo: image().optional(),
    photoAlt: z.string(),
    specialties: z.array(z.string()),
    locations: z.array(z.string()),
    boardStatus: z.enum(['board-certified', 'board-eligible']),
    boardSpecialties: z.array(z.string()),
    additionalCertifications: z.array(z.object({
      name: z.string(),
      organization: z.string(),
    })).optional().default([]),
    education: z.array(educationEntry).optional().default([]),
    npi: z.string().optional().default(''),
    sameAs: z.array(z.string()).optional().default([]),
    acceptingNewPatients: z.boolean(),
    acceptingNewPatientsStartDate: z.string().optional(),
    acceptingNewPatientsNote: z.string().optional(),
    notableExperience: z.array(z.object({
      label: z.string(),
      description: z.string().optional(),
    })).optional(),
    displayOrder: z.number(),
  }),
});

const locations = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/locations' }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    status: z.enum(['open', 'coming-soon']),
    openingDate: z.string().optional(),
    addressStreet: z.string(),
    addressCity: z.string(),
    addressState: z.string(),
    addressZip: z.string(),
    phone: z.string().optional().default(''),
    hours: z.array(z.object({
      day: z.string(),
      open: z.string(),
      close: z.string(),
    })).optional().default([]),
    photos: z.array(z.string()).optional().default([]),
    photoAlts: z.array(z.string()).optional().default([]),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    mapEmbedUrl: z.string().optional(),
    providers: z.array(z.string()).optional().default([]),
    description: z.string(),
    displayOrder: z.number(),
  }),
});

const team = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/team' }),
  schema: ({ image }) => z.object({
    name: z.string(),
    credentials: z.string(),
    slug: z.string(),
    title: z.string(),
    photo: image().optional(),
    photoAlt: z.string().optional(),
    specialties: z.array(z.string()).optional().default([]),
    locations: z.array(z.string()).optional().default([]),
    education: z.array(educationEntry).optional().default([]),
    notableExperience: z.array(z.object({
      label: z.string(),
      description: z.string().optional(),
    })).optional(),
    acceptingNewClients: z.boolean().optional(),
    acceptingNewClientsNote: z.string().optional(),
    scopeDisclaimer: z.string().optional(),
    displayOrder: z.number(),
  }),
});

export const collections = { blog, local, seo, lifestyle, providers, locations, team };
