---
title: "Local SEO Internal Linking Plan"
description: "Internal linking architecture for all hyper-local landing pages — location pages to pillar pages, cross-linking between page types, and hub page strategy."
draft: true
date: "2026-01-01"
author: "Forward Family Medicine"
---

# Internal Linking Plan — Local SEO Pages

## Overview

42 local landing pages (14 towns × 3 page types) form the hyper-local SEO layer of the site. Each page links outward to core pillar pages, and the pages collectively reinforce the site's topical authority for DPC, concierge medicine, and lifestyle medicine on the Philadelphia Main Line.

---

## Page Types and Their Pillar Links

### Type 1: `direct-primary-care-[town]-pa.md`

Each DPC location page links to:
- `/direct-primary-care` — the main DPC explainer (primary destination)
- `/membership` — pricing and enrollment
- `/become-a-patient` — conversion CTA
- `/services` — service menu (inline reference)

### Type 2: `concierge-doctor-[town]-pa.md`

Each concierge location page links to:
- `/concierge-medicine` — the main concierge vs. DPC comparison page (primary destination)
- `/membership` — pricing and enrollment
- `/become-a-patient` — conversion CTA
- `/services` — service menu (inline reference)

### Type 3: `lifestyle-medicine-[town]-pa.md`

Each lifestyle location page links to:
- `/lifestyle-medicine` — the main lifestyle medicine pillar page (primary destination)
- `/membership` — pricing and enrollment
- `/become-a-patient` — conversion CTA
- `/services` — service menu (inline reference)

---

## Complete Location File Index

| Town | DPC Slug | Concierge Slug | Lifestyle Slug | Distance |
|------|----------|----------------|----------------|----------|
| Wayne | `/direct-primary-care-wayne-pa` | `/concierge-doctor-wayne-pa` | `/lifestyle-medicine-wayne-pa` | Practice location |
| Villanova | `/direct-primary-care-villanova-pa` | `/concierge-doctor-villanova-pa` | `/lifestyle-medicine-villanova-pa` | ~1 mi east |
| Radnor | `/direct-primary-care-radnor-pa` | `/concierge-doctor-radnor-pa` | `/lifestyle-medicine-radnor-pa` | ~2 mi east |
| Berwyn | `/direct-primary-care-berwyn-pa` | `/concierge-doctor-berwyn-pa` | `/lifestyle-medicine-berwyn-pa` | ~3 mi west |
| Devon | `/direct-primary-care-devon-pa` | `/concierge-doctor-devon-pa` | `/lifestyle-medicine-devon-pa` | ~3 mi west |
| Bryn Mawr | `/direct-primary-care-bryn-mawr-pa` | `/concierge-doctor-bryn-mawr-pa` | `/lifestyle-medicine-bryn-mawr-pa` | ~5 mi east |
| Haverford | `/direct-primary-care-haverford-pa` | `/concierge-doctor-haverford-pa` | `/lifestyle-medicine-haverford-pa` | ~5–6 mi east |
| Ardmore | `/direct-primary-care-ardmore-pa` | `/concierge-doctor-ardmore-pa` | `/lifestyle-medicine-ardmore-pa` | ~6 mi east |
| Paoli | `/direct-primary-care-paoli-pa` | `/concierge-doctor-paoli-pa` | `/lifestyle-medicine-paoli-pa` | ~6 mi west |
| King of Prussia | `/direct-primary-care-king-of-prussia-pa` | `/concierge-doctor-king-of-prussia-pa` | `/lifestyle-medicine-king-of-prussia-pa` | ~7 mi north |
| Newtown Square | `/direct-primary-care-newtown-square-pa` | `/concierge-doctor-newtown-square-pa` | `/lifestyle-medicine-newtown-square-pa` | ~7–8 mi south |
| Malvern | `/direct-primary-care-malvern-pa` | `/concierge-doctor-malvern-pa` | `/lifestyle-medicine-malvern-pa` | ~10 mi west |
| Media | `/direct-primary-care-media-pa` | `/concierge-doctor-media-pa` | `/lifestyle-medicine-media-pa` | ~12 mi south |
| West Chester | `/direct-primary-care-west-chester-pa` | `/concierge-doctor-west-chester-pa` | `/lifestyle-medicine-west-chester-pa` | ~14 mi west |

---

## Outbound Links from Each Page

Every local page includes these mandatory outbound links (via `linksTo` frontmatter and inline markdown links):

| Link Target | Purpose | Pages That Link To It |
|-------------|---------|----------------------|
| `/membership` | Conversion path — pricing, tiers, enrollment | All 42 local pages |
| `/become-a-patient` | Primary CTA — Meet & Greet scheduling | All 42 local pages |
| `/direct-primary-care` | DPC pillar page | All 14 DPC pages |
| `/concierge-medicine` | Concierge pillar page | All 14 concierge pages |
| `/lifestyle-medicine` | Lifestyle pillar page | All 14 lifestyle pages |
| `/services` | Service detail page | All 42 local pages (inline) |

---

## Inbound Links to Local Pages

Local pages should be linked from:

1. **`/direct-primary-care`** — "We serve patients from across the Main Line" section with links to nearby town DPC pages
2. **`/concierge-medicine`** — Regional availability section linking to concierge pages
3. **`/lifestyle-medicine`** — Local access section linking to lifestyle pages
4. **`/membership`** — "Patients from across the region" section
5. **`/become-a-patient`** — "Serving these communities" list with links
6. **Blog posts** — Posts about DPC, Main Line, or Chester/Delaware/Montgomery County should link to relevant local pages
7. **`/services`** — "Our service area" note with links to key town pages

---

## Cross-Linking Between Page Types (Same Town)

Each set of three town pages should cross-link to each other where relevant:

**Example for Malvern:**
- `direct-primary-care-malvern-pa.md` mentions lifestyle medicine → links to `lifestyle-medicine-malvern-pa.md`
- `concierge-doctor-malvern-pa.md` mentions lifestyle medicine integration → links to `lifestyle-medicine-malvern-pa.md`
- `lifestyle-medicine-malvern-pa.md` "See full membership" → links to `direct-primary-care-malvern-pa.md`

This cross-linking strengthens topical clusters around each town name and increases pages-per-session for visitors who arrived via one local query.

---

## "Communities We Serve" Hub Page

**Recommended: Create `/communities` or a section on `/become-a-patient`**

A hub page or section should:
- List all 14 towns with brief descriptions and links to their DPC pages
- Group by proximity (within 5 miles, 5–10 miles, 10+ miles)
- Include SEPTA information and telehealth note for distant towns
- Link back from all local pages ("See all communities we serve →")

This creates a hub-and-spoke structure that:
1. Passes authority from a single indexed hub to all 42 spokes
2. Helps crawlers discover all local pages systematically
3. Provides a useful reference page for potential patients

---

## Telehealth Emphasis by Distance

| Distance Range | Telehealth Emphasis | Recommended Framing |
|----------------|--------------------|--------------------|
| 0–3 miles (Wayne, Villanova, Radnor, Berwyn) | Low — in-person is easy | "Minutes from Wayne" |
| 3–6 miles (Devon, Paoli, Bryn Mawr, Ardmore, Haverford) | Medium — mention as option | "Easy drive; telehealth also available" |
| 7–10 miles (KOP, Newtown Square, Malvern) | High — telehealth primary for routine | "Telehealth for routine care; in-person when needed" |
| 10+ miles (West Chester, Media) | Very high — telehealth strongly recommended | "Telehealth makes distance irrelevant for most care" |

---

## Canonical URL Structure

All local pages use the pattern:
```
https://forwardfamilymedicine.com/[page-type]-[town-slug]-pa
```

Examples:
- `https://forwardfamilymedicine.com/direct-primary-care-wayne-pa`
- `https://forwardfamilymedicine.com/concierge-doctor-bryn-mawr-pa`
- `https://forwardfamilymedicine.com/lifestyle-medicine-west-chester-pa`

No trailing slash. Canonical declared in frontmatter and rendered in `<link rel="canonical">` via the SEO component.

---

## Sitemap Inclusion

All 42 local pages should be included in `sitemap.xml` with:
- `<changefreq>monthly</changefreq>`
- `<priority>0.6</priority>` (lower than pillar pages at 0.8, higher than blog posts at 0.4)

---

## Schema Markup

All local pages use `schemaType: "MedicalOrganization"` — the SEO component should render a `MedicalOrganization` JSON-LD block with:
- `name`: "Forward Family Medicine"
- `url`: the canonical URL
- `address`: Wayne, PA practice address
- `areaServed`: the specific town (e.g., "King of Prussia, PA")
- `description`: the page's meta description

This signals to Google that the practice serves each specific geography.
