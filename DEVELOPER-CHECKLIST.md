# Developer Implementation Checklist
## Forward Family Medicine — Astro Site

This checklist walks a developer from a fresh Astro scaffold to a fully wired, SEO-ready site.

---

## Phase 1 — Project Setup

- [ ] Initialize Astro project: `npm create astro@latest forwardfamilymedicine-site`
- [ ] Choose starter: "Empty" or "Blog" (blog starter is fine; we'll customize)
- [ ] Install dependencies:
  ```bash
  npm install @astrojs/sitemap
  npm install @astrojs/tailwind   # if using Tailwind
  npm install astro-seo           # optional SEO helper
  ```
- [ ] Configure `astro.config.mjs`:
  ```js
  import { defineConfig } from 'astro/config'; 
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://forwardfamilymedicine.com',
  integrations: [sitemap()],
  server: {
    host: true,
    allowedHosts: 'all',
  },
});
  ```
- [ ] Confirm TypeScript is configured (`tsconfig.json` with `"strict": true`)
- [ ] Set up `.env` file for any environment variables (e.g., scheduling widget keys)

---

## Phase 2 — Content Collections Setup

- [ ] Create `src/content/config.ts` to define content collection schemas:
  ```typescript
  import { defineCollection, z } from 'astro:content';

  const pages = defineCollection({
    type: 'content',
    schema: z.object({
      title: z.string(),
      description: z.string(),
      keywords: z.array(z.string()).optional(),
      canonical: z.string().url(),
      date: z.string(),
      author: z.string(),
      schemaType: z.string(),
      draft: z.boolean().optional().default(false),
    }),
  });

  const blog = defineCollection({
    type: 'content',
    schema: z.object({
      title: z.string(),
      description: z.string(),
      keywords: z.array(z.string()).optional(),
      canonical: z.string().url(),
      date: z.string(),
      author: z.string(),
      schemaType: z.string(),
      pillar: z.string().optional(),
      relatedPosts: z.array(z.string()).optional(),
      image: z.string().optional(),
      imageAlt: z.string().optional(),
      draft: z.boolean().optional().default(false),
    }),
  });

  export const collections = { pages, blog };
  ```

- [ ] Verify all `.md` files in `src/content/pages/` and `src/content/blog/` pass schema validation
- [ ] Exclude `sitemap-architecture.md` from page generation (uses `draft: true`)

---

## Phase 3 — Layouts

- [ ] Create `src/layouts/BaseLayout.astro`:
  - Accepts `title`, `description`, `canonical`, `keywords`, `schemaType` props
  - Includes `<SEO />` component in `<head>`
  - Includes `<SchemaMedicalOrg />` (site-wide, in layout)
  - Includes `<SchemaBreadcrumb />` slot
  - Includes navigation and footer

- [ ] Create `src/layouts/PageLayout.astro` (extends BaseLayout):
  - For all `/src/content/pages/` content
  - Renders markdown body via `<slot />`
  - Conditionally renders `<SchemaFAQ />` and `<SchemaArticle />` based on `schemaType`

- [ ] Create `src/layouts/BlogLayout.astro` (extends BaseLayout):
  - For all `/src/content/blog/` posts
  - Renders article header, author, date, featured image
  - Renders `<SchemaArticle />` with type `BlogPosting`
  - Renders `<SchemaBreadcrumb />` with blog path
  - Renders `<SchemaFAQ />` if post contains FAQ section

---

## Phase 4 — Page Routes

Create an Astro page file for each content page. Use `getCollection` to pull from the content collection.

### Static pages (one-to-one):

- [ ] `src/pages/index.astro` → renders `pages/home.md`
- [ ] `src/pages/about.astro` → renders `pages/about.md`
- [ ] `src/pages/membership.astro` → renders `pages/membership.md`
- [ ] `src/pages/direct-primary-care.astro` → renders `pages/direct-primary-care.md`
- [ ] `src/pages/concierge-medicine.astro` → renders `pages/concierge-medicine.md`
- [ ] `src/pages/lifestyle-medicine.astro` → renders `pages/lifestyle-medicine.md`
- [ ] `src/pages/services.astro` → renders `pages/services.md`
- [ ] `src/pages/patient-experience.astro` → renders `pages/patient-experience.md`
- [ ] `src/pages/faq.astro` → renders `pages/faq.md`
- [ ] `src/pages/become-a-patient.astro` → renders `pages/become-a-patient.md`

**Pattern for each static page:**
```astro
---
import { getEntry } from 'astro:content';
import PageLayout from '../layouts/PageLayout.astro';

const page = await getEntry('pages', 'home');  // change slug per page
const { Content } = await page.render();
---
<PageLayout {...page.data}>
  <Content />
</PageLayout>
```

### Dynamic blog routes:

- [ ] `src/pages/blog/index.astro` — blog listing page (render `blog/index.md` + list all non-draft posts)
- [ ] `src/pages/blog/[slug].astro` — dynamic route for blog posts:
  ```astro
  ---
  import { getCollection } from 'astro:content';
  import BlogLayout from '../../layouts/BlogLayout.astro';

  export async function getStaticPaths() {
    const posts = await getCollection('blog', ({ data }) => !data.draft);
    return posts.map(post => ({
      params: { slug: post.slug },
      props: { post },
    }));
  }

  const { post } = Astro.props;
  const { Content } = await post.render();
  ---
  <BlogLayout {...post.data}>
    <Content />
  </BlogLayout>
  ```

---

## Phase 5 — SEO Components

Build each component described in `src/components/seo/README.md`:

- [ ] `src/components/seo/SEO.astro` — meta tags, OG, Twitter
- [ ] `src/components/seo/JsonLd.astro` — generic JSON-LD injector
- [ ] `src/components/seo/SchemaMedicalOrg.astro` — site-wide org schema
- [ ] `src/components/seo/SchemaFAQ.astro` — FAQPage schema
- [ ] `src/components/seo/SchemaArticle.astro` — Article/BlogPosting schema
- [ ] `src/components/seo/SchemaPhysician.astro` — Physician schema for /about
- [ ] `src/components/seo/SchemaBreadcrumb.astro` — BreadcrumbList schema

**Validation:** After building, use [Google Rich Results Test](https://search.google.com/test/rich-results) to validate each schema type.

---

## Phase 6 — Navigation & Footer

- [ ] Build `src/components/Nav.astro`:
  - Logo → `/`
  - About → `/about`
  - How It Works → `/direct-primary-care` or `/membership`
  - Services → `/services`
  - Blog → `/blog`
  - Become a Patient → `/become-a-patient` (primary CTA button style)

- [ ] Build `src/components/Footer.astro`:
  - Practice name, address, phone, email
  - Navigation links
  - Links: Privacy Policy, Terms, Sitemap
  - Copyright
  - Disclaimer: *"Forward Family Medicine is a Direct Primary Care practice. DPC membership is not insurance."*

---

## Phase 7 — Image Assets

Replace all placeholder image paths with real assets:

- [ ] `/src/assets/stock/home-hero.jpg` — Homepage hero image
- [ ] `/src/assets/stock/concierge-visit.jpg`
- [ ] `/src/assets/stock/lifestyle-consult.jpg`
- [ ] `/src/assets/stock/patient-visit-warmth.jpg`
- [ ] `/src/assets/stock/family-visit.jpg`
- [ ] `/src/assets/stock/og-default.jpg` (1200×630 for social sharing)
- [ ] `/src/assets/staff/dr-forward-headshot.jpg`
- [ ] `/src/assets/staff/dr-forward-office.jpg`
- [ ] `/src/assets/staff/team-photo.jpg`
- [ ] `/src/assets/local/wayne-pa-main-line.jpg`
- [ ] `/src/assets/logo/logo.svg`
- [ ] `/src/assets/logo/logo-white.svg`
- [ ] `/src/assets/logo/favicon.ico`

Use Astro's `<Image />` component (built-in, Astro 3+) for all images for automatic optimization.

---

## Phase 8 — Content Placeholders to Replace Before Launch

Search for all `[placeholder]` strings in content files and replace with real information:

- [ ] `Dr. [Name]` → real physician name throughout all `.md` files
- [ ] `[Full Name]` → physician full name (about.md, SchemaPhysician.astro)
- [ ] `[phone number placeholder]` → real phone number
- [ ] `[email placeholder]` → real email address
- [ ] `[address placeholder]` / `[Street Address]` / `[Zip Code]` → real address
- [ ] `[X]/month` pricing → real membership pricing
- [ ] `[X] years` experience → real years
- [ ] `[School]`, `[Program]`, `[Year]` → medical school and residency details
- [ ] `[LAT]`, `[LNG]` → GPS coordinates for schema
- [ ] `[Google Business Profile URL]` → real GBP URL
- [ ] `[Facebook URL]`, `[LinkedIn URL]` → real social URLs
- [ ] Office hours → real hours
- [ ] Scheduling widget → embed real Calendly or practice EHR widget
- [ ] Map embed → real Google Maps iframe

---

## Phase 9 — Pre-Launch Checklist

### Technical SEO
- [ ] `robots.txt` created at `public/robots.txt` — allow all, point to sitemap
- [ ] `sitemap.xml` auto-generated by `@astrojs/sitemap` — verify all pages included
- [ ] Canonical URLs verified on every page (no duplicate content)
- [ ] All `draft: true` pages excluded from sitemap and routes
- [ ] 404 page created at `src/pages/404.astro`
- [ ] Redirect rules: if migrating from an existing site, add 301 redirects in `public/_redirects` (Netlify) or `astro.config.mjs`

### Performance
- [ ] All images using `<Image />` component (lazy loading, WebP conversion)
- [ ] Google Fonts or web fonts: use `font-display: swap` and preload critical fonts
- [ ] No render-blocking scripts
- [ ] Lighthouse score ≥ 90 on Performance, Accessibility, Best Practices, SEO

### Structured Data
- [ ] Validate MedicalOrganization schema via Google Rich Results Test
- [ ] Validate FAQPage schema on `/faq` and other FAQ pages
- [ ] Validate Article schema on blog posts and explainer pages
- [ ] Validate Physician schema on `/about`
- [ ] Submit to Google Search Console after launch

### Local SEO
- [ ] Google Business Profile claimed and verified
- [ ] GBP name/address/phone (NAP) exactly matches website and schema
- [ ] Request initial patient reviews to GBP after launch

### Analytics
- [ ] Google Analytics 4 or privacy-first alternative (Plausible, Fathom) installed
- [ ] Google Search Console property verified
- [ ] Conversion tracking: "Schedule Meet & Greet" form/button clicks

---

## Phase 10 — Blog Launch Plan

The blog is intentionally left empty at launch — populate incrementally.

**Recommended first five posts (launch with these):**

1. `what-is-direct-primary-care.md` — foundational DPC explainer
2. `dpc-vs-insurance.md` — high intent comparison
3. `direct-primary-care-wayne-pa.md` — local SEO anchor
4. `lifestyle-medicine-explained.md` — lifestyle medicine pillar support
5. `doctor-who-spends-more-time-with-patients.md` — long-tail keyword

Publish 1–2 posts per month. Prioritize the clusters in `src/content/blog/index.md`.

---

## File Structure Reference

```
forwardfamilymedicine-site/
├── public/
│   ├── robots.txt
│   └── favicon.ico
├── src/
│   ├── assets/
│   │   ├── logo/
│   │   ├── staff/
│   │   ├── stock/
│   │   └── local/
│   ├── components/
│   │   ├── seo/
│   │   │   ├── README.md              ← component specs
│   │   │   ├── SEO.astro
│   │   │   ├── JsonLd.astro
│   │   │   ├── SchemaMedicalOrg.astro
│   │   │   ├── SchemaFAQ.astro
│   │   │   ├── SchemaArticle.astro
│   │   │   ├── SchemaPhysician.astro
│   │   │   └── SchemaBreadcrumb.astro
│   │   ├── Nav.astro
│   │   └── Footer.astro
│   ├── content/
│   │   ├── config.ts                  ← collection schema definitions
│   │   ├── pages/
│   │   │   ├── home.md
│   │   │   ├── about.md
│   │   │   ├── membership.md
│   │   │   ├── direct-primary-care.md
│   │   │   ├── concierge-medicine.md
│   │   │   ├── lifestyle-medicine.md
│   │   │   ├── services.md
│   │   │   ├── patient-experience.md
│   │   │   ├── faq.md
│   │   │   ├── become-a-patient.md
│   │   │   └── sitemap-architecture.md  ← draft: true, internal only
│   │   └── blog/
│   │       └── index.md               ← editorial guidance
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   ├── PageLayout.astro
│   │   └── BlogLayout.astro
│   └── pages/
│       ├── index.astro
│       ├── about.astro
│       ├── membership.astro
│       ├── direct-primary-care.astro
│       ├── concierge-medicine.astro
│       ├── lifestyle-medicine.astro
│       ├── services.astro
│       ├── patient-experience.astro
│       ├── faq.astro
│       ├── become-a-patient.astro
│       ├── 404.astro
│       └── blog/
│           ├── index.astro
│           └── [slug].astro
├── astro.config.mjs
├── tsconfig.json
├── package.json
└── DEVELOPER-CHECKLIST.md            ← this file
```
