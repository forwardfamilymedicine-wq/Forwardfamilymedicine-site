# SEO Components — Forward Family Medicine

This directory contains the recommended Astro SEO component files for the Forward Family Medicine site. Each component listed below should be created as an Astro `.astro` file in this directory.

---

## Component Index

### 1. `SEO.astro` — Base SEO Head Component

**Purpose:** Injects `<title>`, `<meta>`, canonical, Open Graph, and Twitter Card tags into `<head>` for every page.

**Props:**
```typescript
interface Props {
  title: string;
  description: string;
  canonical: string;
  keywords?: string[];
  ogImage?: string;         // default: /src/assets/stock/og-default.jpg
  ogType?: string;          // default: "website"
  noindex?: boolean;        // default: false
}
```

**Usage in layout:**
```astro
---
import SEO from '../components/seo/SEO.astro';
const { title, description, canonical, keywords } = Astro.props;
---
<head>
  <SEO
    title={title}
    description={description}
    canonical={canonical}
    keywords={keywords}
  />
</head>
```

**Template output:**
```html
<title>{title} | Forward Family Medicine</title>
<meta name="description" content={description} />
<meta name="keywords" content={keywords.join(', ')} />
<link rel="canonical" href={canonical} />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:url" content={canonical} />
<meta property="og:type" content={ogType} />
<meta property="og:image" content={ogImage} />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />
```

---

### 2. `JsonLd.astro` — Generic JSON-LD Injector

**Purpose:** Renders any structured data object as a `<script type="application/ld+json">` tag. Used by all schema-specific components.

**Props:**
```typescript
interface Props {
  schema: Record<string, unknown>;
}
```

**Usage:**
```astro
---
import JsonLd from '../components/seo/JsonLd.astro';
---
<JsonLd schema={mySchemaObject} />
```

**Template:**
```astro
---
const { schema } = Astro.props;
---
<script type="application/ld+json" set:html={JSON.stringify(schema)} />
```

---

### 3. `SchemaMedicalOrg.astro` — MedicalOrganization + LocalBusiness Schema

**Purpose:** Emits the site-wide `MedicalOrganization` and `LocalBusiness` structured data. Should be included in the root layout so it appears on every page.

**Static data (hardcode in component):**
```json
{
  "@context": "https://schema.org",
  "@type": ["MedicalOrganization", "LocalBusiness"],
  "name": "Forward Family Medicine",
  "url": "https://www.forwardfamilymedicine.com",
  "telephone": "[PHONE]",
  "email": "[EMAIL]",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[ADDRESS]",
    "addressLocality": "Wayne",
    "addressRegion": "PA",
    "postalCode": "[ZIP]",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "[LAT]",
    "longitude": "[LNG]"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
      "opens": "08:00",
      "closes": "17:00"
    }
  ],
  "medicalSpecialty": ["Family Medicine", "Preventive Medicine", "Lifestyle Medicine"],
  "priceRange": "$",
  "image": "https://www.forwardfamilymedicine.com/assets/staff/dr-forward-headshot.jpg",
  "sameAs": [
    "[Google Business Profile URL]",
    "[Facebook URL]",
    "[LinkedIn URL]"
  ]
}
```

---

### 4. `SchemaFAQ.astro` — FAQPage Schema

**Purpose:** Renders `FAQPage` structured data from an array of Q&A pairs. Use on faq.md, and on any page with a FAQ section.

**Props:**
```typescript
interface FAQItem {
  question: string;
  answer: string;
}
interface Props {
  items: FAQItem[];
}
```

**Usage in page:**
```astro
---
import SchemaFAQ from '../components/seo/SchemaFAQ.astro';

const faqs = [
  {
    question: "What is Direct Primary Care?",
    answer: "Direct Primary Care is a membership-based model..."
  },
  // ...
];
---
<SchemaFAQ items={faqs} />
```

**Output schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is Direct Primary Care?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Direct Primary Care is a membership-based model..."
      }
    }
  ]
}
```

**Pages that should use this component:**
- `/faq` (all Q&A content)
- `/direct-primary-care` (FAQ section)
- `/membership` (FAQ section)
- `/concierge-medicine` (FAQ section)
- `/lifestyle-medicine` (FAQ section)
- `/become-a-patient` (FAQ section)
- `/home` (short FAQ section)

---

### 5. `SchemaArticle.astro` — Article / BlogPosting Schema

**Purpose:** Emits `Article` or `BlogPosting` structured data for content pages and blog posts.

**Props:**
```typescript
interface Props {
  title: string;
  description: string;
  url: string;
  datePublished: string;    // ISO 8601: "2026-01-01"
  dateModified?: string;
  authorName?: string;      // default: "Dr. Bigley and Dr. Lieberman, Forward Family Medicine"
  image?: string;
  type?: "Article" | "BlogPosting" | "MedicalWebPage";  // default: "Article"
}
```

**Pages that should use this component:**
- All `/blog/` posts (type: "BlogPosting")
- `/direct-primary-care` (type: "Article")
- `/concierge-medicine` (type: "Article")
- `/lifestyle-medicine` (type: "Article")
- `/patient-experience` (type: "Article")

---

### 6. `SchemaPhysician.astro` — Physician Person Schema

**Purpose:** Emits `Physician` (Person) structured data for Dr. Bigley and Dr. Lieberman. Include on the `/about` page.

**Static data:**
```json
{
  "@context": "https://schema.org",
  "@type": "Physician",
  "name": "Dr. [Full Name]",
  "jobTitle": "Family Physician",
  "affiliation": {
    "@type": "MedicalOrganization",
    "name": "Forward Family Medicine",
    "url": "https://www.forwardfamilymedicine.com"
  },
  "medicalSpecialty": "Family Medicine",
  "alumniOf": "[Medical School]",
  "image": "https://www.forwardfamilymedicine.com/assets/staff/dr-forward-headshot.jpg",
  "url": "https://www.forwardfamilymedicine.com/about"
}
```

---

### 7. `SchemaBreadcrumb.astro` — BreadcrumbList Schema

**Purpose:** Emits `BreadcrumbList` structured data for navigation context. Particularly important for blog posts and interior pages.

**Props:**
```typescript
interface BreadcrumbItem {
  name: string;
  url: string;
}
interface Props {
  items: BreadcrumbItem[];  // ordered from root to current page
}
```

**Example usage on a blog post:**
```astro
<SchemaBreadcrumb items={[
  { name: "Home", url: "https://www.forwardfamilymedicine.com/" },
  { name: "Blog", url: "https://www.forwardfamilymedicine.com/blog" },
  { name: "What Is Direct Primary Care?", url: "https://www.forwardfamilymedicine.com/blog/what-is-direct-primary-care" }
]} />
```

---

## Component Usage by Page

| Page | SEO | MedicalOrg | FAQ | Article | Physician | Breadcrumb |
|---|---|---|---|---|---|---|
| All pages (layout) | ✅ | ✅ | — | — | — | — |
| `/about` | ✅ | — | — | — | ✅ | ✅ |
| `/faq` | ✅ | — | ✅ | — | — | ✅ |
| `/direct-primary-care` | ✅ | — | ✅ | ✅ | — | ✅ |
| `/concierge-medicine` | ✅ | — | ✅ | ✅ | — | ✅ |
| `/lifestyle-medicine` | ✅ | — | ✅ | ✅ | — | ✅ |
| `/membership` | ✅ | — | ✅ | — | — | ✅ |
| `/services` | ✅ | — | ✅ | — | — | ✅ |
| `/patient-experience` | ✅ | — | ✅ | ✅ | — | ✅ |
| `/become-a-patient` | ✅ | — | ✅ | — | — | ✅ |
| `/blog/[slug]` | ✅ | — | ✅ | ✅ (BlogPosting) | — | ✅ |

---

## AI Search (LLM) Optimization Notes

Beyond structured data, these practices improve discoverability in ChatGPT, Perplexity, and Google SGE:

1. **Answer-first headings:** H2s should be natural questions ("What is Direct Primary Care?") and the first paragraph should directly answer them — this is how LLMs surface content.

2. **Short answer blocks:** Add a `> **Short answer:**` blockquote near the top of explainer pages for AI snippet targeting.

3. **Clear entity definitions:** Define "Direct Primary Care," "DPC," "concierge medicine," and "lifestyle medicine" in plain language on their respective pages — LLMs reward definitional clarity.

4. **Consistent NAP (Name, Address, Phone):** Identical across all pages, schema, and Google Business Profile — critical for local AI search.

5. **Authoritative author attribution:** Every piece of content attributed to a named physician improves E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) signals.

6. **Internal link density:** The more internal links point to a pillar page, the more authoritative it appears to both search engines and LLM crawlers.

---

## Recommended Third-Party Packages

```bash
# Astro SEO helper (optional but useful)
npm install astro-seo

# Sitemap generation
npm install @astrojs/sitemap

# Image optimization
npm install @astrojs/image
# or use Astro's built-in <Image /> component (Astro 3+)
```

Add to `astro.config.mjs`:
```js
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.forwardfamilymedicine.com',
  integrations: [sitemap()],
});
```
