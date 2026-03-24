# Internal Linking Map — Forward Family Medicine

**Purpose:** Concentrate link equity on the four high-authority conversion/pillar pages, ensure every content page participates in the link graph, and guide anchor text selection for consistency and SEO signal clarity.

**Four Authority Pages (link targets to protect):**

| Priority | Page | URL | Goal |
|----------|------|-----|------|
| 1 | Membership | `/membership` | Primary conversion — enroll |
| 2 | Direct Primary Care | `/direct-primary-care` | Highest search volume pillar |
| 3 | Concierge Medicine | `/concierge-medicine` | Secondary search pillar |
| 4 | Lifestyle Medicine | `/lifestyle-medicine` | Content authority / differentiation |

---

## 1. Link Hierarchy Overview

```
Homepage
├── → /membership (primary CTA)
├── → /direct-primary-care
├── → /concierge-medicine
├── → /lifestyle-medicine
├── → /become-a-patient
└── → /about, /services, /faq, /patient-experience

Core Pages (about, services, faq, patient-experience, become-a-patient)
├── → /membership (every page)
├── → /direct-primary-care (every page)
├── → /concierge-medicine (where relevant)
└── → /lifestyle-medicine (where relevant)

Local Pages (42 pages)
├── → /membership (every page)
├── → /direct-primary-care (every page)
├── → /become-a-patient (every page)
└── → /lifestyle-medicine (lifestyle-medicine-*.md only)

SEO Cluster Pages (19 pages, src/content/seo/)
├── → /membership (every page)
├── → /direct-primary-care (DPC and patient-experience topics)
├── → /concierge-medicine (concierge topics)
└── → /lifestyle-medicine (lifestyle topics)

Lifestyle Knowledge Library (38 pages, src/content/lifestyle/)
├── → /lifestyle-medicine (every page — connects library to pillar)
├── → /membership (every page)
└── → /direct-primary-care (index/pillar pages only)

Blog Articles (60 pages, src/content/blog/)
├── → /membership (every article — conversion CTA in "How FFM Helps")
├── → /direct-primary-care (DPC, concierge, patient-experience articles)
├── → /concierge-medicine (concierge articles)
└── → /lifestyle-medicine (lifestyle, preventive, health optimization articles)
```

---

## 2. Inbound Link Count Per Authority Page

The table below shows how many pages in the site should link to each authority page.

| Authority Page | Core Pages | Local Pages | SEO Pages | Lifestyle Library | Blog Articles | **Total Inbound** |
|----------------|-----------|-------------|-----------|-------------------|---------------|-------------------|
| `/membership` | 6 | 42 | 19 | 38 | 60 | **165+** |
| `/direct-primary-care` | 6 | 42 | 12 | 7 (pillars only) | 45 | **112+** |
| `/concierge-medicine` | 4 | 14 (concierge local pages) | 4 | 0 | 15 | **37+** |
| `/lifestyle-medicine` | 4 | 14 (lifestyle local pages) | 7 | 38 | 30 | **93+** |

---

## 3. Anchor Text Guidelines

Use varied but consistent anchor text. Avoid over-optimized exact-match repetition.

### `/membership`

**Primary anchors (use most):**
- "our membership"
- "Forward Family Medicine membership"
- "learn about membership"
- "membership plans"

**Variation anchors:**
- "join as a member"
- "see what's included in membership"
- "enroll as a patient"
- "monthly membership"

**Contextual CTAs (in "How FFM Helps" sections):**
- "explore our membership options"
- "contact us to learn about membership"

**Never use:** "click here," "learn more" (without context), bare URL

---

### `/direct-primary-care`

**Primary anchors:**
- "direct primary care"
- "our DPC model"
- "how direct primary care works"

**Variation anchors:**
- "DPC practice"
- "direct primary care membership"
- "the direct primary care difference"
- "why we practice direct primary care"

---

### `/concierge-medicine`

**Primary anchors:**
- "concierge medicine"
- "concierge-style primary care"
- "our concierge approach"

**Variation anchors:**
- "what concierge medicine means"
- "concierge doctor"
- "concierge primary care"

---

### `/lifestyle-medicine`

**Primary anchors:**
- "lifestyle medicine"
- "our lifestyle medicine approach"
- "evidence-based lifestyle medicine"

**Variation anchors:**
- "lifestyle-based care"
- "lifestyle medicine at Forward"
- "the lifestyle medicine difference"

---

## 4. Page-by-Page Linking Rules

### Homepage (`/`)

Links out to:
- `/membership` — hero CTA + footer CTA (2 links minimum, prominent)
- `/direct-primary-care` — "How it works" section
- `/concierge-medicine` — navigation or "our approach" section
- `/lifestyle-medicine` — pillar section
- `/about` — physician intro section
- `/services` — service list section
- `/faq` — FAQ section preview
- `/become-a-patient` — secondary CTA
- `/blog` — featured articles

---

### Core Pages

#### `/about`
→ `/membership` ("Ready to join? See membership options")
→ `/direct-primary-care` ("Learn how our DPC model works")
→ `/lifestyle-medicine` ("See our lifestyle medicine approach")
→ `/become-a-patient`

#### `/services`
→ `/membership` (every service section should note "included in membership")
→ `/direct-primary-care` ("how DPC makes this possible")
→ `/lifestyle-medicine` (lifestyle services section)
→ `/become-a-patient`

#### `/faq`
→ `/membership` (questions about pricing, enrollment)
→ `/direct-primary-care` (questions about the DPC model)
→ `/concierge-medicine` (comparison questions)
→ `/lifestyle-medicine` (care philosophy questions)
→ `/become-a-patient`

#### `/patient-experience`
→ `/membership` ("what's included")
→ `/direct-primary-care` ("why DPC enables this experience")
→ `/lifestyle-medicine` ("our whole-person approach")
→ `/become-a-patient`

#### `/become-a-patient`
→ `/membership` (enrollment and pricing)
→ `/direct-primary-care` ("understand the model before you enroll")
→ `/faq` ("questions before you join")

---

### Local Pages (`src/content/local/`)

**All 42 location pages must link to:**
- `/membership` — "Learn about membership options for [Town] residents"
- `/direct-primary-care` — "See how our direct primary care model works"
- `/become-a-patient` — primary CTA

**`direct-primary-care-*.md` pages also link to:**
- `/concierge-medicine` — "We also offer concierge-style access"

**`concierge-doctor-*.md` pages also link to:**
- `/concierge-medicine` — links to pillar for full explanation
- `/direct-primary-care` — "How DPC powers our concierge approach"

**`lifestyle-medicine-*.md` pages also link to:**
- `/lifestyle-medicine` — links to pillar
- `/membership` — "Lifestyle medicine is included in every membership"

**Cross-links between local pages (same town):**
Each town's 3 pages should cross-link to each other:
- `direct-primary-care-wayne-pa.md` ↔ `concierge-doctor-wayne-pa.md` ↔ `lifestyle-medicine-wayne-pa.md`

---

### SEO Pages (`src/content/seo/`)

| File | Links to |
|------|----------|
| `dpc/is-direct-primary-care-worth-it.md` | `/membership`, `/direct-primary-care`, `/patient-experience`, `/become-a-patient` |
| `dpc/how-much-does-direct-primary-care-cost.md` | `/membership`, `/direct-primary-care` |
| `dpc/can-i-use-insurance-with-direct-primary-care.md` | `/direct-primary-care`, `/membership` |
| `patient-experience/why-are-doctor-visits-only-10-minutes.md` | `/direct-primary-care`, `/membership` |
| `patient-experience/find-doctor-who-spends-more-time-with-patients.md` | `/direct-primary-care`, `/membership`, `/become-a-patient` |
| `patient-experience/what-is-a-doctor-meet-and-greet.md` | `/become-a-patient`, `/membership`, `/direct-primary-care` |
| `patient-experience/same-day-doctor-appointment.md` | `/direct-primary-care`, `/membership` |
| `concierge/how-much-does-concierge-medicine-cost.md` | `/concierge-medicine`, `/membership`, `/direct-primary-care` |
| `membership/what-does-membership-medicine-include.md` | `/membership`, `/direct-primary-care`, `/become-a-patient` |
| `membership/hsa-dpc-membership.md` | `/membership`, `/direct-primary-care` |
| `membership/direct-primary-care-self-employed.md` | `/membership`, `/direct-primary-care` |
| `membership/dpc-employer-benefit.md` | `/membership`, `/direct-primary-care` |
| `lifestyle/can-you-reverse-prediabetes.md` | `/lifestyle-medicine`, `/membership` |
| `lifestyle/lifestyle-changes-lower-blood-pressure.md` | `/lifestyle-medicine`, `/membership` |
| `lifestyle/what-is-a-lifestyle-medicine-doctor.md` | `/lifestyle-medicine`, `/direct-primary-care`, `/membership` |
| `local/primary-care-wayne-pa.md` | `/membership`, `/direct-primary-care`, `/become-a-patient` |

---

### Lifestyle Knowledge Library (`src/content/lifestyle/`)

**Every page links to:**
- `/lifestyle-medicine` — connects the library to the pillar
- `/membership` — conversion CTA

**Pillar index pages (7) additionally link to:**
- `/direct-primary-care` — "DPC enables this kind of care"
- All 4–6 cluster articles within their category

**Cluster articles additionally link to:**
- Their parent pillar page (e.g., `metabolic-health/how-to-reverse-prediabetes.md` → `metabolic-health/index.md`)
- 1–2 relevant cross-pillar pages (e.g., sleep article → `/lifestyle/stress-mental-health`)

**Cross-pillar linking rules:**
| From pillar | Link to |
|-------------|---------|
| Metabolic Health | Nutrition, Physical Activity, Sleep & Hormones |
| Cardiovascular Prevention | Nutrition, Physical Activity, Metabolic Health |
| Sleep & Hormones | Stress & Mental Health, Metabolic Health |
| Stress & Mental Health | Sleep & Hormones, Physical Activity |
| Nutrition | Metabolic Health, Cardiovascular Prevention |
| Physical Activity | Metabolic Health, Cardiovascular Prevention, Sleep & Hormones |
| Lifestyle Medicine (hub) | All six subcategory pillars |

---

### Blog Articles (`src/content/blog/`)

**Every blog article links to:**
- `/membership` — in "How Forward Family Medicine Helps" section

**By category:**

| Category | Required links | Optional links |
|----------|---------------|----------------|
| `direct-primary-care` | `/direct-primary-care`, `/membership` | `/concierge-medicine`, `/become-a-patient` |
| `concierge-medicine` | `/concierge-medicine`, `/membership` | `/direct-primary-care` |
| `lifestyle-medicine` | `/lifestyle-medicine`, `/membership` | Relevant `/lifestyle/[pillar]` page |
| `preventive-medicine` | `/membership`, `/direct-primary-care` | `/lifestyle-medicine` |
| `patient-experience` | `/direct-primary-care`, `/membership` | `/concierge-medicine`, `/become-a-patient` |

**Blog-to-blog cross-links (implement in Astro as "Related Articles"):**

| Article | Suggested related articles |
|---------|---------------------------|
| `what-is-direct-primary-care.md` | `direct-primary-care-vs-insurance.md`, `how-dpc-saves-money.md`, `direct-primary-care-panel-size.md` |
| `how-dpc-saves-money.md` | `direct-primary-care-and-hsa.md`, `direct-primary-care-for-self-employed.md`, `understanding-health-insurance-basics.md` |
| `what-is-concierge-medicine.md` | `concierge-medicine-vs-direct-primary-care.md`, `concierge-medicine-cost.md`, `dpc-vs-concierge-which-is-right.md` |
| `lifestyle-medicine-for-type-2-diabetes.md` | `lifestyle-medicine-for-hypertension.md`, `anti-inflammatory-foods.md`, `exercise-as-medicine.md` |
| `sleep-and-weight-gain.md` | `stress-and-chronic-disease.md`, `exercise-as-medicine.md`, `fiber-and-gut-health.md` |
| `preventive-care-worth-it.md` | `annual-physical-what-to-expect.md`, `preventive-screenings-age-40.md`, `proactive-vs-reactive-medicine.md` |
| `mental-health-and-primary-care.md` | `dpc-for-mental-health.md`, `stress-and-chronic-disease.md`, `social-connection-and-health.md` |

---

## 5. Orphan Prevention Rules

Every page must have at least **2 inbound links** from other pages. The following page types are at risk of being orphaned and need explicit attention:

| Page type | Risk | Fix |
|-----------|------|-----|
| `/src/content/seo/page-stubs-manifest.md` | Draft-only, no public URL — OK to exclude from sitemap | Set `draft: true` |
| `/src/content/lifestyle/content-map.md` | Planning doc — exclude from public routes | Set `draft: true` |
| `/src/content/local/internal-linking-plan.md` | Planning doc — exclude from public routes | Set `draft: true` |
| `/src/content/pages/sitemap-architecture.md` | Planning doc | Set `draft: true` |
| Lifestyle cluster articles | Linked from pillar, not from blog | Add 1–2 blog articles that link to each cluster |

---

## 6. Authority Page Self-Linking Rules

The four authority pages should also link to each other where contextually appropriate:

| From | To | Context |
|------|----|---------|
| `/direct-primary-care` | `/membership` | "See what's included in membership" |
| `/direct-primary-care` | `/concierge-medicine` | "The concierge experience DPC makes possible" |
| `/direct-primary-care` | `/lifestyle-medicine` | "Lifestyle medicine is part of every membership" |
| `/concierge-medicine` | `/membership` | Pricing and enrollment |
| `/concierge-medicine` | `/direct-primary-care` | "Powered by the DPC model" |
| `/lifestyle-medicine` | `/membership` | "Included in every membership plan" |
| `/lifestyle-medicine` | `/direct-primary-care` | "DPC gives us the time to practice lifestyle medicine" |
| `/membership` | `/direct-primary-care` | "Learn how our model works" |
| `/membership` | `/become-a-patient` | Enrollment CTA |

---

## 7. Implementation Checklist for Astro

```
[ ] BaseLayout.astro — global nav links to /membership, /direct-primary-care,
    /concierge-medicine, /lifestyle-medicine on every page

[ ] BaseLayout.astro — global footer links to all four authority pages
    + /about, /services, /faq, /become-a-patient

[ ] Blog post layout — "How Forward Family Medicine Helps" section always
    renders with /membership and category-appropriate pillar link

[ ] Local page layout — bottom CTA block always links /membership
    and /direct-primary-care

[ ] Lifestyle library layout — breadcrumb links to parent pillar;
    sidebar links to /lifestyle-medicine and /membership

[ ] RelatedArticles.astro component — renders 2–3 related blog articles
    by category tag at bottom of each blog post

[ ] Sitemap — exclude pages with draft: true
    (content-map.md, internal-linking-plan.md, sitemap-architecture.md,
    page-stubs-manifest.md)
```

---

## 8. Link Equity Flow Diagram

```
                        [Homepage]
                            |
          ┌─────────────────┼─────────────────┐
          ↓                 ↓                 ↓
   [/membership]  [/direct-primary-care]  [/lifestyle-medicine]
          ↑                 ↑                 ↑
          |                 |                 |
    ┌─────┴──────┐    ┌─────┴──────┐    ┌─────┴──────┐
    │ 42 local   │    │ 60 blog    │    │ 38 lifestyle│
    │ pages      │    │ articles   │    │ library     │
    └────────────┘    └────────────┘    │ pages       │
                                        └────────────┘
                              ↑
                        ┌─────┴──────┐
                        │ 19 SEO     │
                        │ pages      │
                        └────────────┘
                              ↑
                        ┌─────┴──────┐
                        │ 6 core     │
                        │ pages      │
                        └────────────┘

[/concierge-medicine] receives inbound from:
  - Homepage
  - Core pages (about, services, faq)
  - 14 concierge local pages
  - Concierge SEO pages
  - ~15 blog articles
  - /direct-primary-care (cross-link)
```

---

## 9. Quick Reference: Required Links by File Pattern

Use this as a developer reference when building Astro layouts and components.

| File glob | Must link to | Should link to |
|-----------|-------------|----------------|
| `src/content/pages/*.md` | `/membership` | `/direct-primary-care`, `/lifestyle-medicine` |
| `src/content/blog/*.md` | `/membership` | Category-appropriate pillar |
| `src/content/local/direct-primary-care-*.md` | `/membership`, `/direct-primary-care` | `/become-a-patient` |
| `src/content/local/concierge-doctor-*.md` | `/membership`, `/concierge-medicine` | `/direct-primary-care` |
| `src/content/local/lifestyle-medicine-*.md` | `/membership`, `/lifestyle-medicine` | `/direct-primary-care` |
| `src/content/seo/**/*.md` | `/membership` | Topic-appropriate pillar |
| `src/content/lifestyle/*/index.md` | `/lifestyle-medicine`, `/membership` | `/direct-primary-care` |
| `src/content/lifestyle/**/*.md` (clusters) | Parent pillar, `/lifestyle-medicine`, `/membership` | Cross-pillar where relevant |
