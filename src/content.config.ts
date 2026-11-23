import { defineCollection, reference, z } from 'astro:content';
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
  // A post's image is an asset, not a public/ path, so its card and og:image
  // are generated at the sizes they are shown at.
  schema: ({ image }) => baseSchema.extend({
    category: z.string().optional(),
    image: image().optional(),
    // Curated related reading for the article rail: post slugs or site paths
    // (see src/utils/related.ts). Without it the rail is automatic.
    relatedPosts: z.array(z.string()).optional(),
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
    // Hero lede on the composed editorial path. Falls back to `description`
    // with dates and em dashes removed (utils/localCompose.ts ledeFrom).
    lede: z.string().optional(),
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
    // Deliberately its own field: additionalCertifications feeds the provider
    // card and physician routing, and notableExperience feeds the local-page
    // spotlight. An award belongs on the bio page only.
    awards: z.array(z.object({
      name: z.string(),
      organization: z.string(),
      year: z.number(),
      image: image().optional(),
      imageAlt: z.string().optional(),
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
      // Profile timeline only. `inTimeline: false` prints the label as a plain line under the
      // timeline; `beforeStep` places the step ahead of the education step with that title.
      inTimeline: z.boolean().optional(),
      beforeStep: z.string().optional(),
    })).optional(),
    displayOrder: z.number(),
  }),
});

const locations = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/locations' }),
  schema: ({ image }) => z.object({
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
    // How to find the office once in the building; shown in Visit Us for an open office.
    arrivalNote: z.string().optional(),
    // The office's Google Business Profile name, exactly; its structured-data name.
    listingName: z.string().optional(),
    // A real photo of the office, for its structured-data image only; it is not
    // rendered on the page (that is `photos`). Leave it out rather than use a
    // stock or unrelated photo.
    listingImage: image().optional(),
    providers: z.array(z.string()).optional().default([]),
    description: z.string(),
    displayOrder: z.number(),
  }).superRefine((d, ctx) => {
    if (d.status === 'open' && !d.listingName) {
      ctx.addIssue({ code: 'custom', path: ['listingName'], message: 'an open office needs its Google Business Profile name' });
    }
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

// Paid-ad landing pages, one entry per page, rendered by
// src/pages/lp/[code].astro at /lp/<code>/ (for example /lp/k4/).
// Frontmatter is the page's whole configuration; the body is the physician's
// note in their own voice. A draft renders on `astro dev` only, so a page can
// be built and reviewed before it exists in production. The URL, title and
// description are what an ad platform receives when the page is visited or
// shared, so `code` is opaque and `seo` names neither the physician nor a
// condition (the route checks this at build); the condition-level `topic` is
// first-party only.
const landing = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/landing' }),
  schema: ({ image }) => z.object({
    physician: reference('providers'),
    /**
     * The URL: /lp/<code>/. Two to eight lowercase letters and digits, starting
     * with a letter, unique across entries (checked at build). Opaque on
     * purpose: it is also the GA4 `lp` parameter of the landing events.
     */
    code: z.string().regex(/^[a-z][a-z0-9]{1,7}$/),
    /** The physician's short key: checked against the provider's slug at build; the GA4 `physician` parameter. */
    physicianKey: z.enum(['landi', 'lieberman', 'bigley']),
    /** What the page is about, for the intake sheet and the team; not rendered, not in the URL. */
    topic: z.string(),
    /** The form's hidden source value and the GA4 `source` parameter; `lp-` plus the key. */
    source: z.string().regex(/^lp-[a-z0-9-]+$/),
    /** The physician the form books with (src/data/bookingPages.ts). Required when the chooser is skipped. */
    bookingPhysician: z.enum(['BL', 'PL']).optional(),
    /** The open office this page sends people to; its address is in the footer. */
    office: z.enum(['wayne', 'malvern']),
    draft: z.boolean().default(true),
    /** Open items shown on the page in dev. A page cannot publish while any remain. */
    todo: z.array(z.string()).default([]),
    hero: z.object({
      eyebrow: z.string().optional(),
      headline: z.string(),
      supporting: z.string(),
      ctaLabel: z.string().default('Schedule a Free Meet & Greet'),
      /** One plain line under the button, e.g. the length and the places it can happen. */
      ctaNote: z.string().optional(),
      /** Card photo in place of the physician's portrait (an office, for instance). */
      image: image().optional(),
      imageAlt: z.string().optional(),
    }),
    /** What the care includes: a ruled list of a bold line and an optional plain one. */
    experience: z.object({
      heading: z.string(),
      intro: z.string().optional(),
      items: z.array(z.object({ title: z.string(), body: z.string().optional() })).min(3).max(8),
    }),
    /** Why people come: two to four titled rows. */
    gap: z.object({
      heading: z.string(),
      rows: z.array(z.object({ title: z.string(), body: z.string() })).min(2).max(4),
    }),
    /** How care works here: two to four titled items. */
    approach: z.object({
      heading: z.string(),
      items: z.array(z.object({ title: z.string(), body: z.string() })).min(2).max(4),
    }),
    /** Heading over the physician's note (the markdown body). Default "A note from Dr. X". */
    noteHeading: z.string().optional(),
    /** Links into the main site. */
    services: z.array(z.object({ label: z.string(), href: z.string() })).max(6).default([]),
    faqs: z.array(z.object({ q: z.string(), a: z.string() })).max(8).default([]),
    /** Reviewer initials from src/data/reviews.json. Empty leaves the section out. */
    reviews: z.array(z.string()).max(2).default([]),
    form: z.object({
      heading: z.string().optional(),
      subline: z.string().optional(),
      /** Book with `bookingPhysician` straight after the form, no physician step. */
      skipChooser: z.boolean().default(true),
      /** Preselect and hide the Preferred office field. */
      lockOffice: z.boolean().default(true),
    }).default({ skipChooser: true, lockOffice: true }),
    closing: z.object({
      headline: z.string().optional(),
      subhead: z.string().optional(),
    }).default({}),
    seo: z.object({
      title: z.string(),
      description: z.string(),
      ogImage: image().optional(),
    }),
  }).superRefine((d, ctx) => {
    if (d.form.skipChooser && !d.bookingPhysician) {
      ctx.addIssue({ code: 'custom', path: ['bookingPhysician'], message: 'skipChooser needs bookingPhysician (BL or PL)' });
    }
    if (!d.draft && d.todo.length > 0) {
      ctx.addIssue({ code: 'custom', path: ['todo'], message: 'a published page cannot have open todo items' });
    }
    if (!d.draft && /\bTODO\b/.test(JSON.stringify(d))) {
      ctx.addIssue({ code: 'custom', path: ['draft'], message: 'a published page cannot contain "TODO"' });
    }
  }),
});

export const collections = { blog, local, seo, lifestyle, providers, locations, team, landing };
