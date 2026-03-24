# Technical SEO & AI-Discoverability Guide
## Forward Family Medicine — forwardfamilymedicine.com

---

## 1. File Overview

| File | Purpose |
|------|---------|
| `src/data/siteConfig.ts` | Central site constants — NAP, geo, hours, images. Edit once, propagates everywhere. |
| `src/data/physicians.ts` | Physician data — board certification, education, images, NPI. |
| `src/components/seo/SEO.astro` | Master head component: `<title>`, meta, OG, Twitter Card, robots. |
| `src/components/seo/MedicalOrganizationSchema.astro` | Practice-level JSON-LD. Render on every page via BaseLayout. |
| `src/components/seo/PhysicianSchema.astro` | Physician JSON-LD. Render on /about and bio pages. |
| `src/components/seo/MedicalClinicSchema.astro` | Physical location JSON-LD. Render on every page via BaseLayout. |
| `src/components/seo/LocalBusinessSchema.astro` | Location-targeted JSON-LD. Render on local/* pages only. |
| `src/components/seo/ArticleSchema.astro` | Article / MedicalWebPage JSON-LD for blog, seo, lifestyle content. |
| `src/components/seo/FAQSchema.astro` | FAQPage JSON-LD. Render on any page with Q&A section. |
| `src/components/seo/ImageObjectSchema.astro` | ImageObject JSON-LD for logo, physicians, clinic images. |
| `src/pages/sitemap.xml.ts` | Dynamic sitemap generator with priority/changefreq control. |
| `public/robots.txt` | Crawl directives. |

---

## 2. BaseLayout.astro — Recommended Structure

```astro
---
// src/layouts/BaseLayout.astro
import SEO from "../components/seo/SEO.astro";
import MedicalOrganizationSchema from "../components/seo/MedicalOrganizationSchema.astro";
import MedicalClinicSchema from "../components/seo/MedicalClinicSchema.astro";
import ImageObjectSchema from "../components/seo/ImageObjectSchema.astro";

const { frontmatter = {} } = Astro.props;
---

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />

  <!-- SEO meta tags -->
  <SEO
    title={frontmatter.title ?? "Forward Family Medicine"}
    description={frontmatter.description ?? ""}
    canonical={frontmatter.canonical}
    image={frontmatter.image}
    imageAlt={frontmatter.imageAlt}
    imageWidth={frontmatter.imageWidth}
    imageHeight={frontmatter.imageHeight}
    keywords={frontmatter.keywords}
    schemaType={frontmatter.schemaType}
    noindex={frontmatter.draft}
    datePublished={frontmatter.date}
  />

  <!-- Site-wide JSON-LD (every page) -->
  <MedicalOrganizationSchema />
  <MedicalClinicSchema areaServed={frontmatter.location} />
  <ImageObjectSchema emitLogo />

  <!-- Favicon -->
  <link rel="icon" type="image/png" href="/favicon.png" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
</head>
<body>
  <slot />
</body>
</html>
```

---

## 3. Page-Level Schema by Page Type

### Home Page (`/`)
```astro
<!-- In src/pages/index.astro -->
<MedicalOrganizationSchema />
<MedicalClinicSchema />
<FAQSchema faqs={homepageFaqs} pageUrl="https://forwardfamilymedicine.com" />
```

### About Page (`/about`)
```astro
<PhysicianSchema all />
<ImageObjectSchema emitPhysicianImages />
```

### Local Landing Pages (`/direct-primary-care-wayne-pa` etc.)
```astro
<LocalBusinessSchema
  areaServed={frontmatter.location}
  pageUrl={frontmatter.canonical}
/>
<FAQSchema faqs={frontmatter.faq} pageUrl={frontmatter.canonical} />
```

### Blog / SEO Articles (`/blog/...`, `/seo/...`)
```astro
<ArticleSchema
  title={frontmatter.title}
  description={frontmatter.description}
  canonical={frontmatter.canonical}
  datePublished={frontmatter.date}
  author={frontmatter.author}
  image={frontmatter.image}
  imageAlt={frontmatter.imageAlt}
  isMedical={false}
/>
<FAQSchema faqs={frontmatter.faq} />
```

### Lifestyle Knowledge Library (`/lifestyle/...`)
```astro
<ArticleSchema
  title={frontmatter.title}
  description={frontmatter.description}
  canonical={frontmatter.canonical}
  datePublished={frontmatter.date}
  category={frontmatter.category}
  isMedical={true}   <!-- Uses MedicalWebPage type -->
/>
<FAQSchema faqs={frontmatter.faq} />
```

### FAQ Page (`/faq`)
```astro
<FAQSchema faqs={allFaqs} pageUrl="https://forwardfamilymedicine.com/faq" />
```

---

## 4. Frontmatter Schema — Complete Field Reference

Every `.md` content file should include this frontmatter. Fields marked `*` are required for SEO components to function.

```yaml
---
# Required
title: "Page Title | Forward Family Medicine"        # * Appears in <title> and OG:title
description: "150–160 char meta description"          # * Appears in meta desc and OG:description
canonical: "https://forwardfamilymedicine.com/slug"   # * Canonical URL
date: "2026-01-01"                                     # * ISO date for Article schema

# SEO
keywords:                                              # Used in <meta name="keywords">
  - keyword one
  - keyword two
author: "Forward Family Medicine"                      # Defaults to SITE.name

# Schema selection
schemaType: "MedicalOrganization"                      # Options: see table below
category: "lifestyle"                                  # Used in ArticleSchema articleSection

# Local pages only
location: "King of Prussia, PA"                        # Passed to LocalBusinessSchema.areaServed

# Images (optional but recommended for OG and ImageObject)
image: "/images/article-hero.jpg"                      # Relative to public/ or absolute
imageAlt: "Descriptive alt text"
imageWidth: 1200
imageHeight: 630

# Draft control
draft: false                                           # true = noindex + excluded from sitemap

# Internal linking (not consumed by schema components — used by dev for navigation)
linksTo:
  - "/membership"
  - "/become-a-patient"

# FAQ (optional — renders FAQSchema if present)
faq:
  - question: "Do patients from King of Prussia come to Forward Family Medicine?"
    answer: "Yes — King of Prussia is about 7 miles from Wayne via Route 202."
  - question: "Is Forward Family Medicine accepting new patients?"
    answer: "Yes. Schedule a free Meet & Greet at forwardfamilymedicine.com/become-a-patient"
---
```

### schemaType Values by Page

| Page Type | schemaType | Components to Render |
|-----------|-----------|---------------------|
| Home | `MedicalOrganization` | MedicalOrganizationSchema, MedicalClinicSchema, FAQSchema |
| About | `Physician` | PhysicianSchema (all), ImageObjectSchema (physicians) |
| Membership | `MedicalOrganization` | MedicalOrganizationSchema, FAQSchema |
| DPC, Concierge, Lifestyle | `MedicalOrganization` | MedicalOrganizationSchema, FAQSchema |
| Services | `MedicalOrganization` | MedicalOrganizationSchema |
| FAQ | `FAQPage` | FAQSchema |
| Become a Patient | `MedicalOrganization` | MedicalOrganizationSchema, FAQSchema |
| Local pages | `MedicalOrganization` | LocalBusinessSchema, MedicalClinicSchema, FAQSchema |
| Blog posts | `Article` | ArticleSchema (isMedical=false), FAQSchema |
| SEO content pages | `Article` | ArticleSchema (isMedical=false), FAQSchema |
| Lifestyle library pages | `MedicalWebPage` | ArticleSchema (isMedical=true), FAQSchema |

---

## 5. Sitemap Strategy

### Option A (Recommended): @astrojs/sitemap Integration

```bash
npx astro add sitemap
```

`astro.config.mjs`:
```javascript
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://forwardfamilymedicine.com',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/draft/'),
      customPages: [],
      changefreq: 'monthly',
      priority: 0.7,
      lastmod: new Date(),
    }),
  ],
});
```

### Option B: Custom `src/pages/sitemap.xml.ts` (already created)

The provided `sitemap.xml.ts` gives fine-grained priority control:

| Content Type | Priority | Changefreq |
|-------------|----------|------------|
| Core pages (home, about, membership, etc.) | 1.0 | monthly |
| Lifestyle pillar pages | 0.8 | monthly |
| SEO content pages | 0.7 | monthly |
| Local landing pages | 0.6 | monthly |
| Lifestyle cluster articles | 0.6 | monthly |
| Blog posts | 0.5 | weekly |

**Submit to Google Search Console:** `https://forwardfamilymedicine.com/sitemap.xml`

---

## 6. robots.txt

Already created at `public/robots.txt`. Key directives:
- `Allow: /` — all crawlers allowed by default
- `Disallow: /draft/` — prevents indexing of any draft routes
- `Crawl-delay: 10` for known aggressive crawlers (Ahrefs, Semrush)
- `Sitemap:` directive pointing to `/sitemap.xml`

No other disallows needed — do not block CSS/JS resources as Google uses them for rendering.

---

## 7. Image SEO Guidelines

### File Naming
```
# Good
dr-david-bigley-forward-family-medicine-wayne-pa.jpg
direct-primary-care-wayne-pa-clinic.jpg

# Avoid
IMG_4392.jpg
photo1.jpg
```

### Required Alt Text Pattern
- **Physician images:** `"Dr. [Name] — Family Medicine Physician, Forward Family Medicine Wayne PA"`
- **Clinic images:** `"Forward Family Medicine clinic — Direct Primary Care in Wayne, PA"`
- **Article hero images:** Describe the specific health topic depicted
- **Logo:** `"Forward Family Medicine logo"`

### Format and Size
| Use | Format | Max Size | Dimensions |
|-----|--------|----------|------------|
| Hero/OG images | WebP (JPEG fallback) | 200KB | 1200×630 |
| Physician headshots | WebP (JPEG fallback) | 80KB | 800×800 |
| Logo (site) | PNG or SVG | 20KB | 400×120 |
| Inline article images | WebP | 100KB | 800×450 |

### Serving WebP in Astro
```astro
---
import { Image } from 'astro:assets';
import drBigley from '../assets/dr-david-bigley.jpg';
---

<Image
  src={drBigley}
  alt="Dr. David Bigley — Family Medicine Physician, Forward Family Medicine Wayne PA"
  width={800}
  height={800}
  format="webp"
  quality={80}
/>
```

Astro's built-in `<Image>` component handles WebP conversion and generates `srcset` automatically.

---

## 8. Performance Recommendations

### Canonical URLs
- Every page must declare `<link rel="canonical">` — handled by SEO.astro
- Trailing slash policy: choose one (no trailing slash preferred) and configure in `astro.config.mjs`:
  ```javascript
  trailingSlash: 'never'
  ```
- Avoid duplicate URLs (with/without www, http/https) — handle via Netlify/Vercel redirect rules

### Core Web Vitals Targets
| Metric | Target |
|--------|--------|
| LCP (Largest Contentful Paint) | < 2.5s |
| FID / INP (Interaction to Next Paint) | < 200ms |
| CLS (Cumulative Layout Shift) | < 0.1 |

### JS Minimization
- Astro ships zero JS by default — maintain this for content pages
- Only hydrate interactive components: `client:load` for booking widgets, `client:visible` for below-fold components
- Avoid client-side schema injection — always use `<script type="application/ld+json">` (server-rendered)

### Caching Headers (Netlify `_headers` or Vercel `vercel.json`)
```
/images/*
  Cache-Control: public, max-age=31536000, immutable

/sitemap.xml
  Cache-Control: public, max-age=86400

/*.css
  Cache-Control: public, max-age=31536000, immutable

/*.js
  Cache-Control: public, max-age=31536000, immutable
```

### Preload Key Assets
```html
<!-- In BaseLayout.astro <head> -->
<link rel="preload" as="image" href="/images/logo.png" />
<link rel="preload" as="font" href="/fonts/[font-file].woff2" crossorigin />
```

---

## 9. Internal Linking Map

### High-Priority Link Flows

```
Homepage
├── → /membership           (primary conversion)
├── → /become-a-patient     (primary CTA)
├── → /direct-primary-care  (education)
├── → /lifestyle-medicine   (education)
└── → /faq                  (objection handling)

/direct-primary-care
├── → /membership
├── → /become-a-patient
├── → /concierge-medicine   (comparison)
├── → /seo/dpc/is-dpc-worth-it
└── → [local pages] (communities served section)

/lifestyle-medicine
├── → /lifestyle/lifestyle-medicine       (knowledge hub)
├── → /lifestyle/metabolic-health
├── → /lifestyle/cardiovascular-prevention
├── → /membership
└── → /become-a-patient

/membership
├── → /become-a-patient
├── → /direct-primary-care
├── → /services
└── → /faq

/become-a-patient
├── → /membership
├── → /direct-primary-care
└── → /faq

Local pages (/direct-primary-care-[town]-pa)
├── → /direct-primary-care (pillar)
├── → /membership
└── → /become-a-patient

Lifestyle library clusters
├── → Parent pillar (required)
├── → Related pillar (cross-link)
├── → /membership
└── → /become-a-patient
```

### Orphan Page Prevention

Every content file has a `linksTo` frontmatter array. During development, run this check to detect orphans:

```bash
# Find pages with no inbound links (requires custom script)
# All local pages must appear in at least one of:
#   - /become-a-patient "communities" section
#   - /direct-primary-care "area served" section
#   - /lifestyle-medicine "near you" section
```

---

## 10. AI Search Optimization (LLM Discoverability)

These practices are already built into the knowledge library but should be maintained across all content:

### Extractable Answer Patterns
- **Bold "Quick answer" under every H1** — AI systems (Google SGE, Perplexity, ChatGPT) extract first substantive paragraph
- **H2 headings as questions** — "How to Lower Blood Pressure Naturally" rather than "Interventions"
- **First paragraph = definition or direct answer** — do not bury the answer
- **Consistent entity mentions** — "Forward Family Medicine", "Wayne, PA", "Direct Primary Care" in consistent forms

### FAQ Schema for AI Extraction
FAQPage JSON-LD is one of the most reliably extracted schema types by LLMs. Every page with Q&A should use FAQSchema.astro.

### E-E-A-T Signals
| Signal | Implementation |
|--------|----------------|
| Experience | Physician bylines on clinical content; "composite case" stories |
| Expertise | ACLM membership, board certification in PhysicianSchema |
| Authoritativeness | References to NIH, CDC, NEJM, JAMA, ACLM in every lifestyle article |
| Trustworthiness | Canonical URLs, HTTPS, no intrusive interstitials, real contact info |

### LLM Citation Signals
AI systems are more likely to cite and excerpt:
1. Pages with clear `<title>` containing the query keyword
2. Pages with `<meta name="description">` that directly answers the query
3. Pages with FAQPage schema
4. Pages with physician attribution and credentials
5. Pages that cite peer-reviewed research

---

## 11. Implementation Checklist

### Phase 1: Foundation (before launch)
- [ ] Fill in all `[PLACEHOLDER]` values in `src/data/siteConfig.ts`
- [ ] Fill in physician education, NPI, residency details in `src/data/physicians.ts`
- [ ] Add social profile URLs to `siteConfig.ts` as profiles are created
- [ ] Add actual geo coordinates for the Wayne, PA office location
- [ ] Create `src/layouts/BaseLayout.astro` using the template in Section 2
- [ ] Verify `<MedicalOrganizationSchema />` and `<MedicalClinicSchema />` render on every page
- [ ] Verify `<SEO />` renders correct `<title>`, `<meta name="description">`, and `<link rel="canonical">` for every page

### Phase 2: Content Pages
- [ ] Create page templates for each content collection (pages, local, lifestyle, seo, blog)
- [ ] Ensure `<ArticleSchema isMedical={true} />` renders on all lifestyle library pages
- [ ] Ensure `<FAQSchema />` renders on any page with a FAQ section
- [ ] Ensure `<LocalBusinessSchema />` renders on all `/local/` pages
- [ ] Ensure `<PhysicianSchema all />` renders on `/about`

### Phase 3: Images
- [ ] Convert all .jpg assets to WebP at build time (use Astro's `<Image>` component)
- [ ] Verify all images have descriptive alt text matching the patterns in Section 7
- [ ] Add actual physician photo dimensions to `physicians.ts` after final images are chosen
- [ ] Create `/images/og-default.jpg` (1200×630) for pages without a specific image
- [ ] Create `/images/clinic-exterior.jpg` for MedicalOrganization and MedicalClinic schema

### Phase 4: Verification
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Run all pages through Google's Rich Results Test
- [ ] Validate JSON-LD with Schema.org validator
- [ ] Check Core Web Vitals in PageSpeed Insights
- [ ] Verify no orphan pages (every page reachable within 3 clicks from homepage)
- [ ] Confirm `draft: true` pages return 404 or noindex

### Phase 5: Ongoing
- [ ] Update `dateModified` in frontmatter when content is significantly revised
- [ ] Monitor Search Console for schema errors and crawl issues
- [ ] Add FAQ items to frontmatter as patient questions accumulate
- [ ] Update physician data if credentials, certifications, or affiliations change
