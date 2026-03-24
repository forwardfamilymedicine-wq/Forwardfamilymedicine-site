# SEO Content Library — Forward Family Medicine

This directory contains the full SEO knowledge library and long-tail keyword expansion system for Forward Family Medicine.

---

## Directory Structure

```
src/content/seo/
├── keyword-matrix.md          ← Full 80+ keyword matrix with intent, slugs, meta copy (draft:true)
├── faq-jsonld-snippets.md     ← Ready JSON-LD FAQ schema for top 10 pages (draft:true)
├── page-stubs-manifest.md     ← Structured outlines for ~50 remaining pages (draft:true)
├── README.md                  ← This file
│
├── dpc/                       ← Direct Primary Care cluster
│   ├── is-direct-primary-care-worth-it.md          ✅ Full content
│   ├── how-much-does-direct-primary-care-cost.md   ✅ Full content
│   ├── can-i-use-insurance-with-direct-primary-care.md ✅ Full content
│   ├── direct-primary-care-pros-cons.md            🔲 Stub in manifest
│   ├── direct-primary-care-vs-urgent-care.md       🔲 Stub in manifest
│   ├── direct-primary-care-for-families.md         🔲 Stub in manifest
│   ├── direct-primary-care-and-medicare.md         🔲 Stub in manifest
│   ├── dpc-and-health-sharing.md                   🔲 Stub in manifest
│   ├── how-direct-primary-care-works.md            🔲 Stub in manifest
│   └── how-to-become-dpc-patient.md                🔲 Stub in manifest
│
├── concierge/                 ← Concierge Medicine cluster
│   ├── how-much-does-concierge-medicine-cost.md    ✅ Full content
│   ├── is-concierge-medicine-worth-it.md           🔲 Stub in manifest
│   ├── concierge-medicine-vs-direct-primary-care.md 🔲 Stub in manifest
│   ├── benefits-of-concierge-medicine.md           🔲 Stub in manifest
│   ├── concierge-medicine-and-insurance.md         🔲 Stub in manifest
│   └── concierge-medicine-for-seniors.md           🔲 Stub in manifest
│
├── patient-experience/        ← Patient Experience cluster
│   ├── why-are-doctor-visits-only-10-minutes.md    ✅ Full content
│   ├── find-doctor-who-spends-more-time-with-patients.md ✅ Full content
│   ├── same-day-doctor-appointment.md              ✅ Full content
│   ├── what-is-a-doctor-meet-and-greet.md          ✅ Full content
│   ├── find-doctor-who-listens.md                  🔲 Stub in manifest
│   ├── direct-access-to-your-doctor.md             🔲 Stub in manifest
│   ├── how-to-switch-primary-care-doctors.md       🔲 Stub in manifest
│   └── longer-doctor-appointments.md               🔲 Stub in manifest
│
├── membership/                ← Membership / Conversion cluster
│   ├── what-does-membership-medicine-include.md    ✅ Full content
│   ├── hsa-dpc-membership.md                       ✅ Full content
│   ├── direct-primary-care-self-employed.md        ✅ Full content
│   ├── dpc-employer-benefit.md                     ✅ Full content
│   ├── is-monthly-doctor-fee-worth-it.md           🔲 Stub in manifest
│   ├── do-i-need-insurance-with-dpc.md             🔲 Stub in manifest
│   ├── primary-care-without-insurance.md           🔲 Stub in manifest
│   └── dpc-for-small-businesses.md                 🔲 Stub in manifest
│
├── lifestyle/                 ← Lifestyle Medicine cluster
│   ├── can-you-reverse-prediabetes.md              ✅ Full content
│   ├── lifestyle-changes-lower-blood-pressure.md   ✅ Full content
│   ├── what-is-a-lifestyle-medicine-doctor.md      ✅ Full content
│   ├── lower-cholesterol-without-medication.md     🔲 Stub in manifest
│   ├── sleep-and-chronic-disease.md                🔲 Stub in manifest
│   ├── exercise-as-medicine.md                     🔲 Stub in manifest
│   └── weight-loss-primary-care.md                 🔲 Stub in manifest
│
├── conditions/                ← Condition-specific pages
│   ├── diabetes-management-primary-care.md         🔲 Stub in manifest
│   ├── hypertension-treatment-options.md           🔲 Stub in manifest
│   ├── insomnia-without-medication.md              🔲 Stub in manifest
│   ├── anxiety-treatment-primary-care.md           🔲 Stub in manifest
│   └── chronic-fatigue-causes-treatment.md         🔲 Stub in manifest
│
├── local/                     ← Local SEO pages
│   ├── primary-care-wayne-pa.md                    ✅ Full content
│   ├── family-doctor-wayne-pa.md                   🔲 Stub in manifest
│   ├── direct-primary-care-main-line.md            🔲 Stub in manifest
│   ├── doctor-accepting-new-patients-wayne-pa.md   🔲 Stub in manifest
│   ├── lifestyle-medicine-main-line.md             🔲 Stub in manifest
│   └── best-primary-care-doctor-wayne-pa.md        🔲 Stub in manifest
│
└── preventive/                ← Preventive health pages
    ├── what-to-expect-annual-physical.md           🔲 Stub in manifest
    ├── preventive-screenings-by-age.md             🔲 Stub in manifest
    └── telehealth-primary-care.md                  🔲 Stub in manifest
```

---

## Content Status Summary

| Status | Count |
|---|---|
| ✅ Full content pages (700–1,200 words) | 14 |
| 🔲 Stubs in page-stubs-manifest.md | ~50 |
| 📋 Internal planning docs (draft:true) | 4 |
| **Total mapped pages** | **~83** |

---

## Astro Collection Config

Add `seo` to your content collections in `src/content/config.ts`:

```typescript
const seo = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    keywords: z.array(z.string()).optional(),
    canonical: z.string().url(),
    date: z.string(),
    author: z.string().default('Forward Family Medicine'),
    category: z.string(),
    schemaType: z.string(),
    linksTo: z.array(z.string()).optional(),
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = { pages, blog, seo };
```

## Routing

Create dynamic route: `src/pages/[...slug].astro` or cluster-specific routes:
- `src/pages/dpc/[slug].astro`
- `src/pages/concierge/[slug].astro`
- etc.

Or use a flat dynamic route that maps `seo` collection entries to their canonical paths.

## Writing Priority Order

Complete stubs in this order for maximum SEO impact:

**Highest priority (complete first):**
1. `dpc/direct-primary-care-pros-cons.md`
2. `dpc/direct-primary-care-for-families.md`
3. `dpc/how-direct-primary-care-works.md`
4. `concierge/is-concierge-medicine-worth-it.md`
5. `concierge/concierge-medicine-vs-direct-primary-care.md`
6. `membership/is-monthly-doctor-fee-worth-it.md`
7. `local/family-doctor-wayne-pa.md`
8. `local/direct-primary-care-main-line.md`
9. `lifestyle/exercise-as-medicine.md`
10. `conditions/diabetes-management-primary-care.md`
