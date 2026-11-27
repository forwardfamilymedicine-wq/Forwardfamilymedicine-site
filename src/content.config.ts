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
// Frontmatter is the page's whole configuration; the body is a physician's
// note in their own voice. The page has one job, a meet and greet request,
// and its shape is fixed here in one of two variants:
//   one physician (`physician`): hero with the portrait, exactly three proof
//     tiles, up to four "what you get" sentences, the note, pricing, the
//     form booking with that physician, up to three FAQs (/lp/k4/);
//   two physicians (`cards`): hero without a portrait, two physician cards
//     with a button each to the form, the optional note from `noteFrom`,
//     pricing, the form with the physician chooser, up to three FAQs.
// A draft renders on `astro dev` only, so a page can be built and reviewed
// before it exists in production. The URL, title and description are what an
// ad platform receives when the page is visited or shared, so `code` is
// opaque and `seo` names neither the physician nor a condition (the route
// checks this at build); the condition-level `topic` is first-party only.
const landing = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/landing' }),
  schema: ({ image }) => z.object({
    /** The page's one physician: the hero portrait, the note's voice, the form's booking. Absent on a two-physician page. */
    physician: reference('providers').optional(),
    /**
     * The two-physician variant: a card each, in this order. The physician's
     * photo, name, role and status line come from the providers and
     * locations collections; the credential lines and the two- or
     * three-sentence bio are written here, from the same sources.
     */
    cards: z.array(z.object({
      physician: reference('providers'),
      /** One to three lines, as the site already states them. */
      credentials: z.array(z.string().min(1)).min(1).max(3),
      bio: z.string().min(1),
      /** Areas of focus, at most four short labels, shown as quiet tags under the bio. */
      focus: z.array(z.string().min(1)).max(4).optional(),
    })).length(2).optional(),
    /**
     * The URL: /lp/<code>/. Two to eight lowercase letters and digits, starting
     * with a letter, unique across entries (checked at build). Opaque on
     * purpose: it is also the GA4 `lp` parameter of the landing events.
     */
    code: z.string().regex(/^[a-z][a-z0-9]{1,7}$/),
    /** The physician's short key, checked against the provider's slug at build, or `team` on a two-physician page; the GA4 `physician` parameter. */
    physicianKey: z.enum(['landi', 'lieberman', 'bigley', 'team']),
    /** What the page is about, for the intake sheet and the team; not rendered, not in the URL. */
    topic: z.string(),
    /** The form's hidden source value and the GA4 `source` parameter; `lp-` plus the key. */
    source: z.string().regex(/^lp-[a-z0-9-]+$/),
    /** The physician the form books with (src/data/bookingPages.ts). Required when the chooser is skipped. */
    bookingPhysician: z.enum(['BL', 'PL']).optional(),
    /** The open office this page sends people to; its address is in the footer. Absent, the footer lists every open office. */
    office: z.enum(['wayne', 'malvern']).optional(),
    draft: z.boolean().default(true),
    /** Open items shown on the page in dev. A page cannot publish while any remain. */
    todo: z.array(z.string()).default([]),
    /** The hero: a headline (two lines at desktop), one supporting sentence, the button. The photo is the physician's, or `portrait`'s. */
    hero: z.object({
      headline: z.string(),
      supporting: z.string(),
      ctaLabel: z.string().default('Schedule a Free Meet & Greet'),
      /**
       * A two-physician page's hero portrait (the founder's), with the role
       * line under the name in the caption. The photo is the provider's.
       */
      portrait: z.object({ physician: reference('providers'), role: z.string().min(1) }).optional(),
    }),
    /** Exactly three proof tiles: a short serif phrase and one small line each. Facts already on the site only. Required with `physician`. */
    tiles: z.array(z.object({ phrase: z.string().min(1), line: z.string().min(1) })).length(3).optional(),
    /** "What you get": one sentence per item, at most four. Required with `physician`. */
    whatYouGet: z.array(z.string().min(1)).min(1).max(4).optional(),
    /** One short sentence under the "What you get" heading, desktop only; one line, so at most 60 characters. */
    whatYouGetLead: z.string().min(1).max(60).optional(),
    /** Whose note the markdown body is, when not the page's `physician` (a two-physician page's founder note). */
    noteFrom: reference('providers').optional(),
    /** Heading over the note (the markdown body). Default "A note from Dr. X". */
    noteHeading: z.string().optional(),
    /** Where the note renders: its own section after the cards, or inside the hero beside the portrait (a two-physician page's founder note). */
    notePlacement: z.enum(['section', 'hero']).default('section'),
    /** The heading over the cards, when not the template's "Choose the physician you'd like to meet." */
    cardsHeading: z.string().min(1).optional(),
    /** One line under the cards heading. */
    cardsLead: z.string().min(1).optional(),
    /**
     * A short contrast right after the hero: two columns of paired lines
     * (row n of one answers row n of the other), side by side at desktop,
     * stacked on a phone. Facts already on the site only.
     */
    contrast: z.object({
      them: z.object({ label: z.string().min(1), items: z.array(z.string().min(1)).min(2).max(4) }),
      us: z.object({ label: z.string().min(1), items: z.array(z.string().min(1)).min(2).max(4) }),
    }).refine((c) => c.them.items.length === c.us.items.length, { message: 'the two contrast columns pair up, so they have the same number of lines' }).optional(),
    /** An offices block after the FAQ: each office the page sends people to, from the locations collection. */
    locations: z.boolean().default(false),
    /**
     * The membership section's copy, when not the template's: a heading in
     * place of "What membership costs", an intro in place of the price line,
     * the benefits as a ruled list (at most eight, one short sentence each)
     * in place of the included line, and the line that says what is separate.
     * The figures stay src/data/membershipPricing.ts.
     */
    membership: z.object({
      heading: z.string().min(1).optional(),
      intro: z.string().min(1).optional(),
      benefits: z.array(z.string().min(1)).min(1).max(8).optional(),
      separate: z.string().min(1).optional(),
    }).optional(),
    /** At most four. */
    faqs: z.array(z.object({ q: z.string(), a: z.string() })).max(4).default([]),
    form: z.object({
      heading: z.string().optional(),
      subline: z.string().optional(),
      /** Book with `bookingPhysician` straight after the form, no physician step. */
      skipChooser: z.boolean().default(true),
      /** Preselect and hide the Preferred office field. */
      lockOffice: z.boolean().default(true),
      /**
       * A "Preferred physician" field in step 1 (two-physician pages): the
       * cards' buttons preselect it, the visitor can change it, and the form
       * books with the chosen physician straight after step 1. Needs `cards`
       * and no `skipChooser`.
       */
      physicianChoice: z.boolean().default(false),
      /** The click-to-call link beside the form's two-step line, and the step line set heavier. */
      stepperCall: z.boolean().default(false),
    }).default({ skipChooser: true, lockOffice: true, physicianChoice: false, stepperCall: false }),
    seo: z.object({
      title: z.string(),
      description: z.string(),
      ogImage: image().optional(),
    }),
  }).superRefine((d, ctx) => {
    // One variant or the other: a page names one physician or two card physicians.
    if (!d.physician === !d.cards) {
      ctx.addIssue({ code: 'custom', path: ['physician'], message: 'an entry has either `physician` (one-physician page) or `cards` (two-physician page), not both and not neither' });
    }
    if (d.physician) {
      if (!d.tiles) ctx.addIssue({ code: 'custom', path: ['tiles'], message: 'a one-physician page has exactly three tiles' });
      if (!d.whatYouGet) ctx.addIssue({ code: 'custom', path: ['whatYouGet'], message: 'a one-physician page has one to four "what you get" items' });
      if (d.physicianKey === 'team') ctx.addIssue({ code: 'custom', path: ['physicianKey'], message: 'a one-physician page names its physician\'s key' });
      if (d.hero.portrait) ctx.addIssue({ code: 'custom', path: ['hero', 'portrait'], message: 'a one-physician page\'s hero shows that physician; `portrait` is for a two-physician page' });
    }
    if (d.cards) {
      if (d.physicianKey !== 'team') ctx.addIssue({ code: 'custom', path: ['physicianKey'], message: 'a two-physician page uses physicianKey "team"' });
      if (d.cards[0].physician.id === d.cards[1].physician.id) ctx.addIssue({ code: 'custom', path: ['cards'], message: 'the two cards name two different physicians' });
    }
    if (d.form.physicianChoice && (!d.cards || d.form.skipChooser)) {
      ctx.addIssue({ code: 'custom', path: ['form', 'physicianChoice'], message: 'physicianChoice is for a two-physician page whose form does not skip the chooser' });
    }
    if (d.notePlacement === 'hero' && !d.hero.portrait) {
      ctx.addIssue({ code: 'custom', path: ['notePlacement'], message: 'a note in the hero sits beside `hero.portrait`' });
    }
    if (d.form.skipChooser && !d.physician) {
      ctx.addIssue({ code: 'custom', path: ['form', 'skipChooser'], message: 'skipChooser needs the page\'s `physician`' });
    }
    if (d.form.skipChooser && !d.bookingPhysician) {
      ctx.addIssue({ code: 'custom', path: ['bookingPhysician'], message: 'skipChooser needs bookingPhysician (BL or PL)' });
    }
    if (d.form.lockOffice && !d.office) {
      ctx.addIssue({ code: 'custom', path: ['form', 'lockOffice'], message: 'lockOffice needs `office`' });
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
