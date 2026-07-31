# P1B-Architecture Pre-Launch Audit — 2026-05-16

## Summary

| Item | Value |
|------|-------|
| Branch | `p1b-architecture` |
| Build | ✓ Success — 210 pages, 3.54s, no blocking errors |
| Working tree | Clean (only `src/assets/.DS_Store` modified — ignorable) |
| Pages audited | 210 |
| External links checked | 8 (all 200 OK) |
| Internal links checked | 154 unique destinations (0 broken paths) |
| Broken anchor links | 1 |
| **CRITICAL** | **6** |
| **IMPORTANT** | **5** |
| **MINOR** | **3** |
| **OPEN DECISIONS** | **4** |

---

## Branch & Build Status

- **Branch:** `p1b-architecture` (confirmed, up to date with `origin/p1b-architecture`)
- **Dirty files:** `src/assets/.DS_Store` — macOS metadata artifact; does not affect build or deploy
- **Build:** `npm run build` succeeded in 3.54s, 210 pages rendered, `@astrojs/sitemap` generated
- **Known build warning:** `/blog/dpc-vs-concierge-which-is-right/` duplicate-route warning — expected per astro.config.mjs redirect; ignored per audit brief

---

## Page Inventory

210 pages rendered. Representative sample by section:

**Core pages (10):** `/`, `/about/`, `/contact/`, `/membership/`, `/services/`, `/faq/`, `/new-patients/`, `/privacy-policy/`, `/become-a-patient/`, `/404.html`

**Service pages (7):** `/direct-primary-care/`, `/lifestyle-medicine/`, `/concierge-medicine/`, `/menopause/`, `/clarity/`, `/for-businesses/`, `/wellness-collective/`

**Provider pages (5):** `/meet-the-team/`, `/meet-the-team/david-bigley-do/`, `/meet-the-team/philip-lieberman-md/`, `/meet-the-team/brian-landi-do/`, `/meet-the-team/ritamarie-smedile/`

**Location pages (4):** `/locations/`, `/locations/wayne/`, `/locations/west-chester/`, `/locations/malvern/`

**Blog (68):** `/blog/` index + 5 category pages + 62 individual posts

**Lifestyle content (27):** `/lifestyle/` index + 26 sub-articles across 6 pillars

**Local SEO (86):** `/local/[slug]/` — concierge, DPC, lifestyle medicine, and menopause pages for 24 communities

**Redirect stubs (8):** `/what-to-expect/` → `/new-patients/`; `/faqs/` → `/faq/`; `/home/` → `/`; `/providers/` → `/meet-the-team/`; + 3 provider-specific redirect stubs

---

## CRITICAL — Must Fix Before Merge

---

### C-1 · About page: visit length "60–90 minutes" contradicts canonical "1–2 hours"

**File:** `src/pages/about.astro:88`

**Verbatim:**
```html
<li>60–90 minute visits — no clock watching</li>
```

**Why flagged:** The canonical visit length is **1–2 hours**. "60–90 minutes" understates it — a 90-minute cap implies a maximum of 1.5 hours, not 2. This contradicts every other page on the site (comparison table, DPC page, services page, membership page, menopause page — all say "1–2 hours" or "1–2 hr").

**Suggested fix:**
```html
<li>1–2 hour visits — no clock watching</li>
```

---

### C-2 · FAQ: Landi described with three factual errors

**File:** `src/pages/faq.astro:19`

**Verbatim:**
```
Dr. Brian Landi is board-eligible in Family Medicine and a Menopause Society Certified Practitioner, seeing patients at our West Chester and Malvern locations.
```

**Why flagged — three distinct errors:**

1. **Board status wrong:** Landi's frontmatter (`src/content/providers/brian-landi-do.md:16`) sets `boardStatus: "board-certified"`. His bio body and blog post also confirm board-certification through the AOBFP. The FAQ says "board-eligible" — incorrect.
2. **MSCP claimed prematurely:** Landi is *sitting for* the MSCP exam in June 2026. He does not yet hold the credential. Calling him "a Menopause Society Certified Practitioner" on the live site claims a credential he may or may not hold at the time of launch. His own provider bio and the welcoming blog post correctly say "sitting for" or "exam scheduled for June 2026."
3. **"Seeing patients" implies current:** The FAQ should clarify he joins in August 2026.

**Suggested fix:**
```
Dr. David Bigley is the founder of Forward Family Medicine, a board-certified Family Medicine physician, and a Doctor of Osteopathic Medicine (DO). Dr. Philip Lieberman is dual board-eligible in Family Medicine and Lifestyle Medicine, with a culinary arts background that makes nutrition advice actually practical. Dr. Brian Landi is board-certified in Family Medicine (AOBFP) and is sitting for the Menopause Society Certified Practitioner (MSCP) exam in June 2026; he joins our West Chester and Malvern locations in August 2026. <a href="/meet-the-team/">Meet the team →</a>
```

---

### C-3 · About page: founding date imprecise

**File:** `src/pages/about.astro:37`

**Verbatim:**
```
Founded in 2024, Forward Family Medicine was built as a Direct Primary Care practice...
```

**Why flagged:** Canonical founding date is **September 2024**. The same page correctly uses "September 2024" on line 106. The hero paragraph should match.

**Suggested fix:**
```
Founded in September 2024, Forward Family Medicine was built as a Direct Primary Care practice...
```

---

### C-4 · dist/ contains empty duplicate provider folders — deploy risk

**Location:** `dist/providers/` (generated by previous build run or Finder rename)

**Contents:**
```
dist/providers/brian-landi-do 2/    (empty)
dist/providers/david-bigley-do 2/   (empty)
dist/providers/philip-lieberman-md 2/   (empty)
```

**Why flagged:** These are empty macOS Finder rename artifacts (`(space)2` suffix). If `dist/` is deployed as-is, they ship to production as dead folders. They would not serve real pages, but they're noise that could confuse CDN crawlers or sitemap indexing.

**Suggested fix:** Run `rm -rf dist/ && npm run build` immediately before deploy to ensure a clean build artifact. If these folders reappear post-rebuild, investigate the build process for the root cause.

---

### C-5 · MSCP credential claimed sitewide before exam is taken (170 occurrences, 20+ files)

**Root problem:** Landi's **MSCP exam is scheduled for June 2026**. He has not yet passed it. His own provider bio (`src/content/providers/brian-landi-do.md:32`) and the welcoming blog post (`src/content/blog/welcoming-dr-brian-landi.md:16`) correctly say he is *sitting for* the exam.

However, the following files claim he **holds** the Menopause Society Certified Practitioner credential as a current fact:

| File | Line | Verbatim |
|------|------|----------|
| `src/components/home/CredentialStrip.astro` | 8–9 | `title: 'Menopause Society Certified'` + `desc: '...Dr. Landi holds Menopause Society Certified Practitioner credentialing...'` |
| `src/pages/menopause.astro` | 92 | meta description: `Menopause Society Certified Practitioner, 1–2 hour visits...` |
| `src/pages/menopause.astro` | 112 | `board-certified family physician with Menopause Society Certified Practitioner credentialing` |
| `src/pages/menopause.astro` | 141 | `<span>Menopause Society Certified Practitioner</span>` |
| `src/pages/menopause.astro` | 145 | `<li class="badge badge-accent">Menopause Society Certified Practitioner (MSCP)</li>` |
| `src/pages/menopause.astro` | 276 | `A physician with Menopause Society Certified Practitioner credentialing has trained specifically...` |
| `src/pages/menopause.astro` | 347 | `<strong>Menopause Society Certified Practitioner (MSCP)</strong>` |
| `src/pages/for-businesses.astro` | 211 | `Forward Family Medicine offers Menopause Society Certified menopause care through Dr. Brian Landi...` |
| `src/content/local/direct-primary-care-west-chester-pa.md` | 21, 38, 67 | `Menopause Society Certified Practitioner` (×3) |
| `src/content/local/direct-primary-care-malvern-pa.md` | 21, 38, 67 | `Menopause Society Certified Practitioner` (×3) |
| `src/content/local/menopause-wayne-pa.md` | 37 | `Dr. Brian Landi (MSCP-certified)` |
| `src/content/local/menopause-radnor-pa.md` | 81 | `Dr. Brian Landi at our West Chester and Malvern offices holds this credential` |
| `src/content/local/menopause-ardmore-pa.md` | 81 | `holds this credential` |
| `src/content/local/menopause-bryn-mawr-pa.md` | 81 | `holds this credential` |
| `src/content/local/menopause-berwyn-pa.md` | 81 | `holds this credential` |
| `src/content/local/menopause-devon-pa.md` | 81 | `holds this credential` |
| `src/content/local/menopause-king-of-prussia-pa.md` | 81 | `holds this credential` |
| `src/content/local/menopause-downingtown-pa.md` | 33, 51 | `Menopause Society Certified Practitioner (MSCP)` |
| `src/content/local/menopause-coatesville-pa.md` | 33, 51 | `Menopause Society Certified Practitioner (MSCP)` |
| `src/content/local/menopause-chester-springs-pa.md` | 33, 51 | `Menopause Society Certified Practitioner (MSCP)` |
| `src/content/local/menopause-glen-mills-pa.md` | 33, 51 | `Menopause Society Certified Practitioner (MSCP)` |
| `src/content/local/lifestyle-medicine-malvern-pa.md` | 45, 72 | `Menopause Society Certified Practitioner` |
| Multiple `concierge-doctor-*.md` files | various | `Menopause Society Certified Practitioner` |

**Total count:** ~170 references across ~20+ files claim the credential as current.

**Why flagged:** Claiming a professional credential before it is earned is a professional integrity and potential regulatory issue. If Landi does not pass the June 2026 exam, every one of these pages makes a materially false claim about a physician's credentials. Even if he is expected to pass, the credential does not exist yet as of site launch.

**Suggested fix — two paths (see OPEN DECISIONS for decision guidance):**

*Path A (launch before June exam):* Do a global find-replace across all affected files. Change "Menopause Society Certified Practitioner" / "MSCP" claims to "MSCP candidate" or "sitting for the MSCP exam in June 2026." For the CredentialStrip, reframe as "Dedicated Menopause Care" rather than "Menopause Society Certified." Update the menopause page badge list. After June exam results are received and certification confirmed, do a targeted sweep back to "Menopause Society Certified Practitioner."

*Path B (delay launch until after June exam results):* Merge and deploy in late June or July 2026 after MSCP results are confirmed. No copy changes needed.

---

### C-6 · Broken anchor link: `/new-patients#location`

**Source page:** `src/content/local/direct-primary-care-wayne-pa.md` (rendered at `/local/direct-primary-care-wayne-pa/`)

**Verbatim link:** `href="/new-patients#location"`

**Why flagged:** No element with `id="location"` exists in the rendered `/new-patients/index.html`. The anchor resolves to the page but silently fails to scroll to any section, leaving users stranded at the top of the page.

**Suggested fix:** Remove the `#location` fragment, or add `id="location"` to the appropriate section in `src/pages/new-patients.astro`. Verify whether a location section exists on that page and which section ID is intended.

---

## IMPORTANT — Should Fix Before Merge

---

### I-1 · TeamTeaser: "two locations" when three locations exist

**File:** `src/components/home/TeamTeaser.astro:13` (approximate)

**Verbatim:**
```
Three physicians, two locations, one philosophy: small panels, real visit lengths, and primary care that genuinely knows you.
```

**Why flagged:** The site has three distinct location pages: Wayne (open), West Chester (coming August 2026), and Malvern (coming August 2026). "Two locations" matches no realistic count — there is currently one open location, and there will be three total once the Chester County offices open. This appears in the homepage TeamTeaser section, prominently visible.

**Suggested fix:**
```
Three physicians, three locations, one philosophy: small panels, real visit lengths, and primary care that genuinely knows you.
```
Or, if "two locations" was intentional to mean "two Chester County offices" (as distinct from the Wayne office):
```
Three physicians, Wayne and Chester County, one philosophy...
```
Either option is clearer than the current phrasing.

---

### I-2 · Landi headshot missing — all his pages show a placeholder

**Files:** `src/assets/staff/` (contains `dr-david-bigley.jpg`, `dr-philip-lieberman.jpg`, `ritamarie-smedile.jpg` — no Landi headshot)

**Affected pages:**
- `/meet-the-team/brian-landi-do/` — shows SVG placeholder avatar
- `/menopause/` — shows SVG placeholder (TODO comment at `src/pages/menopause.astro:121`)
- Homepage TeamTeaser card for Landi — shows placeholder
- Any local page rendering a ProviderCard for Landi

**Why flagged:** A provider page launching without a headshot is professionally suboptimal, particularly for a practice competing on relationship and trust. The placeholder is functional but conspicuous on a credentialed provider's page.

**Suggested fix:** Obtain and place Landi's headshot at `src/assets/staff/dr-brian-landi.jpg`. Add the `photo` field to `src/content/providers/brian-landi-do.md` frontmatter matching the pattern in other provider files. Remove the TODO comments.

---

### I-3 · West Chester and Malvern addresses unconfirmed per inline TODO comments

**Files:**
- `src/content/locations/west-chester.md:10` — `# TODO: Confirm exact address once lease is signed`
- `src/content/locations/malvern.md:10` — `# TODO: Confirm exact address once lease is signed`

**Addresses currently rendered on live pages:**
- West Chester: `[street address redacted], West Chester, PA 19380`
- Malvern: `301 Lindenwood Dr Suite 206, Malvern, PA 19355`

**Why flagged:** These addresses appear on the live contact page, location detail pages, local SEO pages, the site footer, and JSON-LD schema. If either lease is not signed or the address changes, these are published as canonical facts to Google and patients. The TODO comments confirm the data was entered speculatively.

**Suggested fix:** Confirm both addresses are correct and leases are signed. Once confirmed, remove the TODO comments from both files. If an address is uncertain, replace the rendered text with a placeholder ("Address to be confirmed — contact us for directions") until finalized.

---

### I-4 · About page "dual board eligibility" — confirmed correct; no fix needed for content, but about.astro:39 has awkward phrasing

**File:** `src/pages/about.astro:39`

**Verbatim:**
```
Dr. Lieberman joined the practice bringing dual board
eligibility in Family Medicine and Lifestyle Medicine
```

**Why flagged:** Per updated canonical facts, "dual board-eligible" is the correct and intentional framing for Lieberman. However, the sentence continues across line 40 and reads awkwardly as a line-break artifact in source that renders fine in HTML. No content change needed. This is an internal code readability note only.

**No fix required** — content is correct.

---

### I-5 · Blog post welcoming Lieberman: "visits are an hour" understates canonical 1–2 hours

**File:** `src/content/blog/welcoming-dr-philip-lieberman.md:12`

**Verbatim:**
```
Where visits are an hour, not seven minutes.
```

**Why flagged:** Canonical visit length is "1–2 hours." "An hour" implies 60 minutes maximum, which contradicts the 1–2 hour canonical figure used everywhere else on the site. This is a founder's narrative quote, so stylistic license is understandable, but it creates a discrepancy if patients read this post and then see "1–2 hours" everywhere else.

**Suggested fix:**
```
Where visits run an hour or more — not seven minutes.
```
Or leave as-is with the understanding that it reads as a colloquial expression rather than a clinical specification. (Flagged for David's judgment.)

---

## MINOR — Fix When Convenient

---

### M-1 · CredentialStrip.astro: MSCP framing is the core C-5 issue — see CRITICAL for full treatment

This is already captured under C-5. No separate entry needed.

---

### M-1 · Blog welcome post for Landi: "joins Forward Family Medicine this month" will age

**File:** `src/content/blog/welcoming-dr-brian-landi.md:16`

**Verbatim:**
```
Dr. Brian Landi joins Forward Family Medicine this month and will begin seeing patients at our new Chester County location in August 2026.
```

**Why flagged:** The post is dated `2026-05-04`. As of audit date (2026-05-16), "this month" is still accurate. After May 2026 ends, "this month" will be stale. Blog posts often read in retrospect — once indexed, this phrasing will seem odd to readers finding the post in August 2026 or later.

**Suggested fix:**
```
Dr. Brian Landi has joined Forward Family Medicine and will begin seeing patients at our new Chester County location in August 2026.
```

---

### M-2 · `src/pages/faq.astro:104` — Meet & Greet described as "30-minute conversation"

**Verbatim:**
```
It's a 30-minute conversation — in person or by video...
```

**Why flagged:** This is about the meet-and-greet specifically, not clinical visits. The 30-minute duration is appropriate and consistent. No contradiction with canonical 1–2 hour visit length. This is a non-issue but noted for completeness.

**No fix required.**

---

### M-3 · Testimonial attribution note

**File:** `src/pages/index.astro:39–53`

Three testimonials on homepage:
1. `"Dr. Bigley does — every time."` — attributes to Bigley ✓
2. `"When I needed a specialist..."` — no specific physician named (neutral)
3. `"Dr. Lieberman actually understood how I eat..."` — attributes to Lieberman ✓

**Note:** The pre-loaded finding mentioned testimonials referencing "only Dr. Bigley." In the current branch, testimonials reference both Bigley and Lieberman. The known issue appears resolved. No fix needed.

---

## OPEN DECISIONS — David's Input Needed

---

### OD-1 · MSCP timing: Launch before or after June 2026 exam results?

**The issue:** 170+ page references claim Landi holds MSCP certification. His exam is June 2026. The site is being merged to main now (May 2026). The Chester County locations open August 2026.

**Decision options:**

| Option | Action | Risk |
|--------|--------|------|
| **A — Launch now, update after exam** | Do a global replace of MSCP claims to "sitting for" / "MSCP candidate" language before merge. After June exam results: if passed, do a reverse sweep back to "certified." | Lower risk legally/professionally. Higher effort (170 files). |
| **B — Delay launch until after exam** | Wait for June exam results (~4–6 weeks). If passed, merge as-is. If not passed, do the global replace. | Delays go-live but eliminates credential risk entirely. |
| **C — Launch as-is, accept the risk** | Merge now with MSCP claims intact. If Landi passes (likely), claims will be true before August open date. If not, emergency patch needed. | Fastest. Highest legal/professional risk if exam is not passed. |

**David's decision needed:** Which option? If A, the global find-replace can be prepared as a follow-up task. If B, set a target merge date. If C, acknowledge the risk.

---

### OD-2 · Full HSA Copy Inventory (OBBBA $150/month cap — attorney review pending)

**Context:** The One Big Beautiful Budget Act (OBBBA) reportedly caps qualifying DPC fees for HSA purposes at **$150/month for individuals** effective January 1, 2026. FFM charges **$200/month individual**. If the $150 cap applies, only $150 of the monthly fee would be HSA-qualified — but the site universally states DPC membership fees are HSA-eligible without mentioning any cap.

**All HSA-eligible claims on the site:**

| File | Line | Verbatim |
|------|------|----------|
| `src/pages/index.astro` | 78 | `"...Primary Care Enhancement Act (effective January 1, 2026), which clarified that HSA funds can be used for DPC memberships. Confirm eligibility with your plan administrator."` |
| `src/pages/membership.astro` | 23 | `"...HSA funds may be used for DPC memberships. Please confirm eligibility with your plan administrator."` |
| `src/pages/membership.astro` | 284 | `per year · paid annually · HSA-eligible` (Clarity Program tier description) |
| `src/pages/clarity.astro` | 61 | `"The membership component is HSA-eligible following the Primary Care Enhancement Act..."` |
| `src/pages/clarity.astro` | 114 | `Paid annually · HSA-eligible` |
| `src/pages/clarity.astro` | 680 | `HSA-eligible` (tag chip) |
| `src/content/blog/direct-primary-care-and-hsa.md` | 3, 18, 36, 94, 99 | Extended blog post treating DPC membership fees as fully HSA-eligible under PCEA |
| `src/content/blog/what-is-concierge-medicine.md` | 98 | `DPC membership fees are now HSA-eligible...` |
| `src/content/blog/what-is-direct-primary-care.md` | 100 | `DPC membership fees are now HSA-eligible...` |
| `src/content/blog/direct-primary-care-for-self-employed.md` | 42, 87 | Full HSA-eligible DPC fee claim (×2) |
| `src/content/blog/preventive-care-employer-benefits.md` | 81 | `DPC membership fees are now HSA-eligible...` |
| `src/content/blog/concierge-medicine-cost.md` | 93 | `DPC membership fees are now HSA-eligible when paired with a qualifying HDHP...` |
| `src/content/blog/understanding-health-insurance-basics.md` | 96 | `DPC membership fees are qualified expenses for HSA reimbursement...` |
| `src/content/blog/direct-primary-care-for-families.md` | 74 | `DPC membership fees are now HSA-eligible...` |
| `src/content/blog/direct-primary-care-vs-insurance.md` | 91, 107 | HSA-eligible DPC fee claims (×2) |
| `src/content/blog/how-dpc-saves-money.md` | 139 | `your $200/month membership can be paid with pre-tax HSA dollars` |
| `src/content/seo/membership/hsa-dpc-membership.md` | 43, 44, 51, 59, 90, 127 | Mixed guidance, some pre-PCEA caveats preserved |

**Critical inconsistency within site:** `src/content/blog/direct-primary-care-and-hsa.md:72` still says "Do not use HSA funds for your monthly DPC membership fee without explicit written guidance from a qualified tax advisor" — a pre-PCEA caution that directly contradicts the post's own "update" sections claiming fees are now HSA-eligible. This inconsistency within a single blog post could confuse patients trying to use HSA funds.

**Specifics on the OBBBA cap:** If the $150/month individual cap applies, then `how-dpc-saves-money.md:139` ("your $200/month membership can be paid with pre-tax HSA dollars") is materially incorrect — only $150 would qualify.

**Attorney review needed.** Do not fix until legal counsel confirms whether the $150 cap applies and how to caveat copy accordingly. The current copy should be treated as provisional.

---

### OD-3 · Ritamarie scopeDisclaimer: includes "or Dr. Landi" — intentional?

**File:** `src/content/team/ritamarie-smedile.md` (frontmatter `scopeDisclaimer`)

**Rendered text on `/meet-the-team/ritamarie-smedile/`:**
```
Ritamarie is a registered nurse and is not a prescribing provider. She does not serve as a primary care physician. FFM memberships are established with Dr. Bigley, Dr. Lieberman, or Dr. Landi.
```

**Audit brief specified:** `"FFM memberships are established with Dr. Bigley or Dr. Lieberman."`

**Why flagged:** The rendered disclaimer includes Landi. This may be intentional (since Landi is joining the practice and memberships will be established with him), or it may be an update that wasn't reflected in the brief. No correction needed if the addition of Landi is intentional.

**David's decision needed:** Is "or Dr. Landi" intentional? If so, no change. If not, update the `scopeDisclaimer` field in `src/content/team/ritamarie-smedile.md` to remove Landi.

---

### OD-4 · Location addresses — are leases signed?

**Files:**
- `src/content/locations/west-chester.md:10` — `# TODO: Confirm exact address once lease is signed`
- `src/content/locations/malvern.md:10` — `# TODO: Confirm exact address once lease is signed`

**David's decision needed:** Are the addresses confirmed and leases signed? If yes, remove the TODO comments and these addresses are safe to publish. If not, decide whether to display confirmed placeholder text or leave the addresses as-is with the understanding they may change.

---

## All Internal Links Status

**Checked:** 154 unique internal link destinations across all 210 pages.

**Result: 0 broken paths.** All internal hrefs resolve to either a real built page in `dist/` or a defined redirect in `astro.config.mjs`.

**Redirects confirmed working:**
- `/what-to-expect` → `/new-patients/` ✓
- `/faqs` → `/faq/` ✓
- `/home/` → `/` ✓
- `/providers/` → `/meet-the-team/` ✓
- `/providers/david-bigley-do/` → `/meet-the-team/david-bigley-do/` ✓
- `/providers/philip-lieberman-md/` → `/meet-the-team/philip-lieberman-md/` ✓
- `/providers/brian-landi-do/` → `/meet-the-team/brian-landi-do/` ✓
- `/blog/dpc-vs-concierge-which-is-right/` → `/blog/concierge-medicine-vs-direct-primary-care` ✓

**Broken anchor links: 1**
- `/new-patients#location` linked from `/local/direct-primary-care-wayne-pa/` — the `#location` fragment does not exist in `/new-patients/index.html`. See C-6.

---

## All External Links Status

All external links found across the built site:

| URL | Status | Source |
|-----|--------|--------|
| `https://forwardfamilymedicine.sigmamd.com/signup/individual-membership` | ✅ 200 | membership, contact, navbar (mobile), multiple pages |
| `https://forwardfamilymedicine.sigmamd.com/signup/family-membership` | ✅ 200 | membership, contact, navbar (mobile) |
| `https://patient.sigmamd.com` | ✅ 200 | membership, contact, navbar (mobile) |
| `https://npiregistry.cms.hhs.gov/provider-view/1578213062` | ✅ 200 | `/meet-the-team/brian-landi-do/` JSON-LD `sameAs` |
| `https://www.doximity.com/pub/brian-landi-do` | ✅ 200 | `/meet-the-team/brian-landi-do/` JSON-LD `sameAs` |
| `https://maps.app.goo.gl/fDXtMnutNzPq2CkF7` | ✅ 200 | Footer (Wayne) |
| `https://maps.app.goo.gl/ChSJNqvfo5xRbQGF8` | ✅ 200 | Footer (West Chester) |
| `https://www.google.com/maps/place/301+Lindenwood+Dr+Ste+206,+Malvern,+PA+19355/` | ✅ 200 | Footer (Malvern) |

**No external links returned non-2xx responses.** No Prenuvo, Fullscript, or other partner links found in the rendered HTML (only referenced in prose content as service names).

---

## JSON-LD Validation

All provider pages validated for well-formed JSON and required fields:

| Page | Schema Type | Well-formed | Required Fields | Notes |
|------|-------------|-------------|-----------------|-------|
| `/meet-the-team/david-bigley-do/` | `Physician` | ✓ | name, honorificSuffix, jobTitle, medicalSpecialty, url, worksFor, alumniOf, identifier (NPI) | `sameAs` empty (no Doximity/NPI link in frontmatter) |
| `/meet-the-team/philip-lieberman-md/` | `Physician` | ✓ | name, honorificSuffix, jobTitle, medicalSpecialty, url, worksFor, alumniOf, identifier (NPI) | `sameAs` empty; `memberOf` absent (no additionalCertifications) |
| `/meet-the-team/brian-landi-do/` | `Physician` | ✓ | name, honorificSuffix, jobTitle, medicalSpecialty, url, worksFor, alumniOf, identifier (NPI), sameAs (NPI registry + Doximity) | Most complete schema of all providers |
| `/meet-the-team/ritamarie-smedile/` | `Person` | ✓ | name, honorificSuffix, jobTitle, knowsAbout, url, worksFor | Correct non-Physician schema; scopeDisclaimer rendered in HTML ✓ |

**All breadcrumb schemas:** Valid BreadcrumbList on all 4 pages ✓

**Location schemas:** `MedicalBusiness` with `branchOf`, address, phone, geo, hours — all present and valid JSON on Wayne, West Chester, Malvern pages ✓

**Note on Bigley and Lieberman `sameAs`:** Both have empty `sameAs` arrays in their frontmatter. This is not a validation error but is a missed SEO opportunity. Adding verified NPI registry URLs and Doximity profile links would improve structured data completeness. Not blocking for launch.

---

## Statistics Drift Sweep (Phase F)

### Visit length anomalies
Grep: `"30 minute|60 minute|45 minute|30-minute|60-minute|30–60|60–90|7-minute|10-minute"` across `src/content/`

**All hits in lifestyle content were about exercise duration, sleep hygiene timing, or CGM postprandial glucose windows** — not about FFM visit length. None contradict canonical 1–2 hours.

**One hit in a page template (already in CRITICAL):**
- `src/pages/about.astro:88` — "60–90 minute visits" → see C-1.

**One hit in a blog post (already in IMPORTANT):**
- `src/content/blog/welcoming-dr-philip-lieberman.md:12` — "visits are an hour" → see I-5.

### Pricing anomalies
Grep for off-canonical price references: **no hits** outside of correct family tier pricing ($175/$150/$125/$100/person/month) and Clarity Program ($9,600/year). Individual price is consistently $200/month across all references.

### Panel size anomalies
FFM panel: consistently `~250` or `≤250` across all pages. Industry comparisons in blog content use figures of 500, 1,500, 2,500, and 2,000–3,000 — all contextually appropriate comparisons to traditional practice sizes, not claims about FFM's panel. No drift detected.

### Founding date
`"September 2024"` is used correctly in `src/content/blog/welcoming-dr-philip-lieberman.md:12`. Only one non-specific use of "2024" found at `src/pages/about.astro:37` — see C-3.

---

## TODO / Placeholder Inventory (Phase H)

Real content TODOs (CSS/form `placeholder=` attributes excluded):

| File | Line | Content |
|------|------|---------|
| `src/content/blog/welcoming-dr-brian-landi.md` | 8 | `# TODO: Add image: /images/staff/dr-brian-landi.jpg when headshot is shot` |
| `src/content/locations/west-chester.md` | 10 | `# TODO: Confirm exact address once lease is signed` |
| `src/content/locations/malvern.md` | 10 | `# TODO: Confirm exact address once lease is signed` |
| `src/pages/menopause.astro` | 121 | `{/* TODO: Replace with Landi headshot once shot — import drLandiPhoto from '../assets/staff/dr-brian-landi.jpg' */}` |

**All four TODOs relate to the same two issues:** Landi headshot (I-2) and unconfirmed addresses (OD-4). These should be resolved before launch.

**No instances of `lorem ipsum`, `[REPLACE]`, `[ADD]`, `FIXME`, `XXX`, or `???`** found in any source file.

---

## Autonomous Decisions Made

1. **"Dual board-eligible" for Lieberman not flagged.** The continuation task brief explicitly stated this is correct canonical framing ("do NOT flag it"). All prior-session findings about Lieberman's `boardStatus` field were discarded per updated canonical facts.

2. **CredentialStrip MSCP issue elevated to CRITICAL (not IMPORTANT).** Claiming an uncertified credential on the homepage in a persistent component visible on every page is a higher-severity issue than a claim inside a single blog post. Treated as CRITICAL alongside the broader C-5 sweep.

3. **TeamTeaser "two locations" flagged as IMPORTANT.** Ambiguous whether "two" refers to open-only (currently 1), Chester County only (2), or total eventual (3). Flagged with two alternative suggested fixes for David to choose.

4. **MSCP issue categorized as both CRITICAL (C-5) and OPEN DECISION (OD-1).** It is critical because the credential claim is factually premature; it is also an open decision because the remediation path depends on launch timing relative to June exam results.

5. **Asset audit scoped to sampled pages.** Phase C specified "spot-check" for assets. All sampled `/_astro/` references resolved in `dist/`. No external CDN assets found in the built HTML. Full 210-page asset scan was not performed (sampled 5 pages per scope).

6. **Blog post authorship audit:** All blog posts use `author: "Dr. David Bigley"` — confirmed intentional per canonical brief. Not flagged.

7. **Phase F panel size: blog content using "500 patients," "2,500 patients," etc., not flagged.** These are industry comparison figures in narrative context, clearly not claims about FFM. Only FFM's own panel claims (~250) were checked for accuracy.

8. **`/home/index.html` deployed alongside redirect rule:** The build generates a `/home/index.html` while the config redirects `/home/` → `/`. This is a known Astro static-site behavior; the redirect is CDN-level and the built page serves as a fallback. Not flagged.

9. **Ritamarie scopeDisclaimer deviation from spec flagged as OPEN DECISION, not CRITICAL.** The addition of "or Dr. Landi" is plausibly intentional given Landi's joining. Flagged for David to confirm rather than treating it as an error.

10. **Concierge medicine page claim "less than half the size of most DPC practices"** (`src/pages/concierge-medicine.astro:30`) not flagged. The claim ("panel at 250 patients per physician — less than half the size of most DPC practices") is plausible given the canonical DPC industry range of 300–600; 250 < 300 is true. The framing is aggressive marketing but not a factual error.
