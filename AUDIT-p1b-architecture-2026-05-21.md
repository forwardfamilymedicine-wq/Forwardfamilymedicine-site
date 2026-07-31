# FFM `p1b-architecture` Content Audit
Generated: 2026-05-21
Auditor: Claude Code (claude-sonnet-4-6)
Branch: p1b-architecture
Working tree status: Clean (one untracked binary: `src/assets/staff/ffm-team.jpg`)

---

## Summary
- **Total findings:** 36
- **Critical:** 8
- **High:** 11
- **Medium:** 7
- **Low:** 3
- **Legal/compliance holds (flagged, not edited):** 7

---

## Critical findings

> Anything that would make the site factually wrong on launch, misrepresent a credential, or trigger compliance/legal risk.

---

- **src/pages/clarity.astro:583** — Lieberman described as having "board **certification**" in Lifestyle Medicine
  - Current: `"This is where Dr. Lieberman's board certification in Lifestyle Medicine and culinary background become clinically meaningful."`
  - Issue: Lieberman is **dual board-eligible**, not board-certified. "Board certification" is a materially different and higher credential status that he does not yet hold.
  - Suggested fix: `"Dr. Lieberman's dual board eligibility in Lifestyle Medicine and culinary background"`

- **src/pages/faq.astro:19** — Landi described as a current Menopause Society Certified Practitioner
  - Current: `"Dr. Brian Landi is board-certified in Family Medicine and a Menopause Society Certified Practitioner, joining our West Chester and Malvern locations in August 2026."`
  - Issue: Landi is sitting for the MSCP exam in June 2026 — he is not yet credentialed. Presenting this as an already-held credential before the exam result is credential misrepresentation.
  - Suggested fix: `"Dr. Brian Landi is board-certified in Family Medicine (AOBFP) and sitting for his Menopause Society Certified Practitioner (MSCP) exam in June 2026, joining our West Chester and Malvern locations in August 2026."`

- **src/pages/menopause.astro:92** — Meta description presents MSCP as already held
  - Current: `description="Evidence-based menopause care in West Chester and Malvern, PA. Menopause Society Certified Practitioner, 1–2 hour visits, included in DPC membership."`
  - Issue: "Menopause Society Certified Practitioner" in the description implies Landi already holds this credential. Per reference facts, all MSCP claims must be future-tense or launch-gated until certification is conferred.
  - Suggested fix: `"Evidence-based menopause care in West Chester and Malvern, PA — led by Dr. Landi (MSCP candidate, exam June 2026). Included in DPC membership, launching August 2026."`

- **src/pages/menopause.astro:112–113, 140, 144** — Hero and badges present MSCP as currently held
  - Current (line 112–113): `"board-certified family physician with Menopause Society Certified Practitioner credentialing — across visits long enough to actually walk through what's happening"`
  - Current (line 140): `<span>Menopause Society Certified Practitioner</span>`
  - Current (line 144): `<li class="badge badge-accent">Menopause Society Certified Practitioner (MSCP)</li>`
  - Issue: "with MSCP credentialing" and the two badges present the credential as currently active. These must be future-gated until post-exam.
  - Suggested fix: Reword to "sitting for MSCP certification (exam June 2026)" and change badges to "MSCP Candidate (June 2026)".

- **src/components/home/CredentialStrip.astro:7–9** — Home page credential strip says Landi "holds" MSCP (home page)
  - Current: `title: 'Menopause Society Certified',` and `desc: 'Dr. Landi holds Menopause Society Certified Practitioner credentialing — evidence-based midlife women\'s health, integrated directly into primary care.'`
  - Issue: "holds" is present tense and unambiguously claims the credential is already in hand. This appears on the home page.
  - Suggested fix: Change title to "Menopause Care Specialist" and desc to "Dr. Landi is sitting for the Menopause Society Certified Practitioner (MSCP) exam in June 2026 — evidence-based midlife women's health care, launching August 2026 at our West Chester and Malvern locations."

- **src/pages/about.astro:43** — About page implies Landi's MSCP is already held
  - Current: `"Dr. Landi expanded the practice to Chester County in 2026, bringing Menopause Society Certified Practitioner credentialing and a clinical focus on midlife women's health."`
  - Issue: "bringing MSCP credentialing" is ambiguous but reads as if the credential is active. Combined with the page's past-present framing it reads as already-held.
  - Suggested fix: `"Dr. Landi is joining the practice in August 2026, and is sitting for Menopause Society Certified Practitioner (MSCP) credentialing (exam June 2026), with a clinical focus on midlife women's health."`

- **src/content/local/ — 50+ files** — Landi described as an already-certified MSCP across all local content pages
  - Current (representative sample):
    - `src/content/local/menopause-west-chester-pa.md:35`: `"Dr. Brian Landi is a Menopause Society Certified Practitioner (MSCP)"`
    - `src/content/local/menopause-wayne-pa.md:37`: `"Dr. Brian Landi (MSCP-certified)"`
    - `src/content/local/direct-primary-care-west-chester-pa.md:67`: `"a Menopause Society Certified Practitioner"`
    - Similar language found in: all 24 menopause-\*.md files, all Chester County DPC/concierge local files (avondale, chester-springs, coatesville, concordville, downingtown, exton, glen-mills, kennett-square, lionville, malvern, phoenixville, west-chester — both concierge-doctor and direct-primary-care variants), lifestyle-medicine-malvern-pa.md, lifestyle-medicine-west-chester-pa.md (≥50 files total, 217 occurrences across local content)
  - Issue: Every file presents MSCP as a credential Landi currently holds. None use future-tense or "sitting for" language. This is a systemic generation error across the entire local content layer.
  - Suggested fix: Replace all instances with "MSCP candidate (sitting for exam June 2026)" or equivalent future-tense framing. After July 2026 (when results are expected), update to confirmed-credential language if the exam is passed. Coordinate with David before doing a mass-update.

- **src/pages/menopause.astro:77 (FAQ answer)** — FAQ exposes unconfirmed lease addresses for West Chester and Malvern to patients
  - Current: `"Dr. Landi sees patients at our Chester County locations — West Chester ([street address redacted]) and Malvern (301 Lindenwood Dr Ste 206)."`
  - Issue: Both addresses are in location content files with explicit `# TODO: Confirm exact address once lease is signed` comments. Presenting unconfirmed suite numbers to patients creates a wrong-address risk.
  - Suggested fix: Use city-only references until lease is finalized: `"West Chester and Malvern, PA (addresses confirmed upon lease signing, opening August 2026)."`

---

## High findings

---

- **src/content/blog/direct-primary-care-panel-size.md:3** — Blog post meta description shows wrong DPC industry panel cap
  - Current: `description: "Traditional doctors manage 2,000–3,000 patients each. DPC doctors cap at 400–600."`
  - Issue: Reference facts state DPC industry panel is **300–600**. The description says "400–600," which is incorrect and inconsistent with every other page on the site.
  - Suggested fix: `"DPC doctors cap at 300–600."`

- **src/pages/membership.astro:130–133** — Family pricing schedule is fully published; reference says it should not be
  - Current: Four explicit per-person monthly rates ($175, $150, $125, $100) are rendered in a visible pricing table.
  - Issue: Reference facts state "Family pricing: tiered, scaling down per-person — **no fixed family schedule published**." The current page contradicts this explicitly.
  - Suggested fix: Discuss with David. Options: (a) remove explicit rates and replace with "Contact us for family pricing," (b) confirm rates are finalized and update the reference fact. Do not resolve unilaterally.

- **src/content/locations/west-chester.md:7** — Unconfirmed West Chester address with suite number published in content
  - Current: `addressStreet: "[street address redacted]"` (with `# TODO: Confirm exact address once lease is signed` comment on line 10)
  - Issue: The audit instruction requires West Chester address/lease copy be "appropriately vague (no fabricated suite numbers)." A specific suite number from an unconfirmed lease is published in content and renders in JSON-LD, FAQ answers, and menopause page.
  - Suggested fix: Replace with `addressStreet: ""` (or omit field) until lease is signed. Remove suite numbers from all page copy and FAQ answers.

- **src/content/locations/malvern.md:7** — Unconfirmed Malvern address with suite number published in content
  - Current: `addressStreet: "301 Lindenwood Dr Suite #206"` (with `# TODO: Confirm exact address once lease is signed` comment on line 10)
  - Issue: Same as West Chester — specific unconfirmed suite number is published and renders in JSON-LD and page copy.
  - Suggested fix: Remove suite/street field until lease is signed.

- **src/content/providers/david-bigley-do.md** — No AOBFP reference anywhere in Bigley's content entry or bio
  - Current: `additionalCertifications: []` (empty); no AOBFP mention in body text or notableExperience
  - Issue: Reference facts say "AOBFP reference for Bigley — confirm it's present where his certifications appear." Bigley's `boardStatus: "board-certified"` and `boardSpecialties: ["Family Medicine"]` render the correct badge, but the specific AOBFP (American Osteopathic Board of Family Physicians) body name is never surfaced — unlike Landi, who has it in `notableExperience`.
  - Suggested fix: Add a `notableExperience` entry: `{ label: "Board-Certified through the American Osteopathic Board of Family Physicians (AOBFP)" }` — or note it in the bio body.

- **src/pages/meet-the-team/[slug].astro:31** — Meta description hardcodes "in Wayne, PA" for ALL providers including West Chester/Malvern-only Landi
  - Current: `\`Meet ${credentialedName}, ${d.title} at Forward Family Medicine in Wayne, PA.\`` (applies to every provider including Landi)
  - Issue: Dr. Landi's bio page meta description will read "Meet Brian Landi, DO, Family Medicine Physician at Forward Family Medicine **in Wayne, PA**." Landi practices in West Chester and Malvern, not Wayne.
  - Suggested fix: Derive location from `d.locations` array — if it contains "wayne," use Wayne; otherwise join the location slugs into readable city names.

- **src/pages/locations/[slug].astro:28** — Page title hardcodes "Wayne PA DPC Practice" for all location pages
  - Current: `const pageTitle = \`${locationName} | Wayne PA DPC Practice\`;`
  - Issue: For West Chester and Malvern, the rendered title will be "Forward Family Medicine — West Chester | Wayne PA DPC Practice" and "Forward Family Medicine — Malvern | Wayne PA DPC Practice" — incorrect and misleading for SEO and user intent.
  - Suggested fix: Replace the suffix with a generic "| Direct Primary Care" or derive from `data.addressCity`.

- **src/content/blog/welcoming-dr-brian-landi.md:5** — Author format inconsistent with all other blog posts
  - Current: `author: "Dr. David Bigley"`
  - Issue: Every other blog post uses `author: "David Bigley, DO"`. The welcoming post (and `welcoming-dr-philip-lieberman.md:5`) use a different format. The audit instruction requires all posts attributed to Dr. Bigley in a consistent format.
  - Suggested fix: `author: "David Bigley, DO"`

- **src/content/blog/welcoming-dr-philip-lieberman.md:5** — Same author format inconsistency
  - Current: `author: "Dr. David Bigley"`
  - Issue: Same as above.
  - Suggested fix: `author: "David Bigley, DO"`

- **src/content/blog/index.md:110** — Author field assigns post to two physicians, not solely Dr. Bigley
  - Current: `author: "Dr. Bigley and Dr. Lieberman, Forward Family Medicine"`
  - Issue: The audit instruction requires all blog posts attributed to Dr. Bigley alone. This internal planning file includes a future post concept attributed to both physicians, which will fail schema validation if ever published.
  - Suggested fix: Revise planning entry to `author: "David Bigley, DO"` or flag as a planning note only, never to be published with dual-author attribution.

- **src/pages/about.astro:43** — Mentions Lieberman "dual board eligibility" but no AOBFP for Bigley in this summary (consistency)
  - Current: `"Dr. Philip Lieberman joined in late 2025, bringing dual board eligibility in Family Medicine and Lifestyle Medicine."` — correctly says board eligibility for Lieberman ✓ — but Bigley paragraph uses only generic "founded" language, not his AOBFP.
  - Issue: Low-severity companion to the AOBFP finding above; the about page omits Bigley's AOBFP credential from the brief team mention section.
  - Suggested fix: Append "Dr. Bigley is board-certified in Family Medicine through the American Osteopathic Board of Family Physicians (AOBFP)." to the practice-story paragraph.

---

## Medium findings

---

- **src/pages/menopause.astro JSON-LD (lines 36–55)** — JSON-LD workLocation uses unconfirmed West Chester and Malvern addresses
  - Current: JSON-LD `workLocation` blocks hard-code `"[street address redacted]"` (West Chester) and `"301 Lindenwood Dr Suite 206"` (Malvern)
  - Issue: These are the same unconfirmed lease addresses. JSON-LD is indexed by Google and difficult to retract after indexing.
  - Suggested fix: Remove `streetAddress` fields from both `workLocation` objects until leases are confirmed. Keep city/state/postal code.

- **src/content/blog/welcoming-dr-brian-landi.md:34** — Visit length for new patients described as "typically an hour" rather than "1–2 hours"
  - Current: `"appointments long enough to actually talk through what's going on (typically an hour for a new patient visit)"`
  - Issue: Reference fact: visit length is "1–2 hours." "Typically an hour" understates what the practice promises.
  - Suggested fix: `"appointments long enough to actually talk through what's going on (typically 1–2 hours for a new patient visit)"`

- **src/pages/clarity.astro:718** — Clarity page close CTA references a "30-minute meet and greet"
  - Current: `<h2 class="clarity-h2 clarity-h2--white">Start with a 30-minute meet and greet.</h2>`
  - Issue: Not a clinical visit length claim, but "30 minutes" may create a mental model mismatch. The standard practice elsewhere is to not specify the meet-and-greet duration — `blog/new-patient-meet-and-greet.md:73` also says "30-minute conversation." David should confirm if the meet-and-greet duration is intentionally distinct from clinical visits or should match the "1–2 hour" framing.
  - Suggested fix: Discuss with David. If the meet-and-greet is genuinely 30 minutes, this is correct and the reference-fact rule (1–2 hours) applies only to clinical visits. Flag for review.

- **src/content/blog/new-patient-meet-and-greet.md:73** — Same 30-minute meet-and-greet language
  - Current: `"The Forward Family Medicine meet-and-greet is a free, 30-minute conversation"`
  - Issue: Same as above — confirm whether "30 minutes" is intended for meet-and-greet vs the "1–2 hour" clinical visit standard.
  - Suggested fix: Confirm with David; if intentional, add a note distinguishing it from clinical visit length.

- **src/pages/menopause.astro:275** — MSCP described with "physician with Menopause Society Certified Practitioner credentialing" implying Landi holds it (lower-severity instance)
  - Current: `"A physician with Menopause Society Certified Practitioner credentialing has trained specifically in evidence-based menopause management"`
  - Issue: This sentence is educational about what MSCP means in general, but in context it implies Landi has the credential now. Audit duty: flag, don't fix without instruction.
  - Suggested fix: Rephrase as: "A physician who has completed Menopause Society Certified Practitioner training..." or add temporal context "(Dr. Landi is sitting for the exam in June 2026)."

- **src/pages/menopause.astro:346** — Additional MSCP badge in a lower section of the page
  - Current: `<strong>Menopause Society Certified Practitioner (MSCP)</strong>` (used as a credential badge lower on the page)
  - Issue: Same as the hero badges — presents credential as already held.
  - Suggested fix: "MSCP Candidate — exam June 2026"

- **src/pages/services.astro:242** — Services page lists "Menopause Society Certified Practitioner credentialing" as a current offering
  - Current: `<li>Menopause Society Certified Practitioner credentialing</li>`
  - Issue: In a list of current services, this line implies the credential is currently available. Needs launch-gating.
  - Suggested fix: `<li>Menopause Society Certified Practitioner expertise — Dr. Landi joining August 2026 (MSCP exam June 2026)</li>`

---

## Low findings

---

- **src/pages/faq.astro:15** — FAQ location answer only lists Wayne address, not expanding locations
  - Current: `"We are located in Wayne, Pennsylvania, on the Philadelphia Main Line at 295 Old Eagle School Road, Wayne, PA 19087."`
  - Issue: With West Chester and Malvern opening August 2026, this answer is incomplete. Low priority since expansion is forthcoming, not current.
  - Suggested fix: Append: `"We are expanding to West Chester and Malvern, PA in August 2026."` (and update to include confirmed addresses once leases are signed.)

- **src/content/blog/index.md:164** — Internal blog planning voice note references two-physician authorship
  - Current: `"Voice: Warm, direct, physician-led. Write as if Dr. Bigley and Dr. Lieberman is explaining this to a patient in the office."`
  - Issue: Minor grammatical error ("Dr. Bigley and Dr. Lieberman **is**" → "**are**") and references dual-physician voice for what should be Bigley-attributed posts. Not rendered on the site (internal planning doc), but confusing for future content editors.
  - Suggested fix: Correct the grammar and clarify that posts are attributed to Dr. Bigley individually.

- **src/content/blog/concierge-medicine-vs-direct-primary-care.md:45** — Concierge cost expressed as annual range, not per-month
  - Current: `"Traditional concierge can run $3,000 to $6,000 per year just for the retainer"`
  - Issue: Reference fact is "$400+/month" as the comparison point. $3,000–$6,000/year = $250–$500/month — this range is in the right ballpark but the lower bound ($3,000/yr = $250/mo) is below the "$400+/month" reference figure. Not wrong but slightly inconsistent framing.
  - Suggested fix: Consider adding "or $250–$500+/month" or anchoring to the "$400+/month or more" language used consistently elsewhere.

---

## Legal/compliance holds — DO NOT EDIT WITHOUT CLEARANCE

> Flagged for visibility only. No source files were modified. Attorney review pending before any changes.

---

- **src/content/blog/direct-primary-care-and-hsa.md** (full file, 94 lines) — Entire post covers DPC-HSA eligibility including Primary Care Enhancement Act claims. Key lines:
  - Line 3: `description: "As of January 1, 2026, DPC membership fees are HSA-eligible under the Primary Care Enhancement Act."`
  - Line 18: `"As of January 1, 2026, the Primary Care Enhancement Act clarified that HSA funds may be used for DPC membership fees"`
  - Lines 34, 36, 68, 94: Repeated references to the Primary Care Enhancement Act as already in effect
  - Line 72: `"Do not use HSA funds for your monthly DPC membership fee without explicit written guidance from a qualified tax advisor"`
  - Issue: HSA/DPC eligibility claims pending attorney review. The Act's applicability, safe harbor status, and specific wording require legal sign-off.

- **src/content/blog/what-is-direct-primary-care.md:99–100** — HSA eligibility claim for DPC
  - Current: `"Following the Primary Care Enhancement Act (effective January 1, 2026), DPC membership fees are now HSA-eligible when paired with a qualifying HDHP."`
  - Issue: Same legal hold as above.

- **src/content/blog/what-is-concierge-medicine.md:97–98** — HSA eligibility claim
  - Current: `"Following the Primary Care Enhancement Act (effective January 1, 2026), DPC membership fees are now HSA-eligible when paired with a qualifying high-deductible health plan."`
  - Issue: Same legal hold.

- **src/content/blog/direct-primary-care-for-self-employed.md:42, 70, 87** — HSA/DPC strategy content
  - Line 42: `"Following the Primary Care Enhancement Act (effective January 1, 2026), DPC membership fees are now HSA-eligible"`
  - Lines 70, 87: Additional HSA contribution limit and DPC-HSA strategy claims
  - Issue: Same legal hold.

- **src/content/blog/preventive-care-employer-benefits.md:80–81** — HSA employer benefit claim
  - Current: `"Following the Primary Care Enhancement Act (effective January 1, 2026), DPC membership fees are now HSA-eligible when paired with a qualifying HDHP."`
  - Issue: Same legal hold.

- **src/pages/membership.astro:22–23, 284** — HSA eligibility mentioned in membership FAQ and Clarity tier
  - Line 22–23: `"In many cases, yes — particularly following the Primary Care Enhancement Act (effective January 1, 2026), which clarified that HSA funds may be used for DPC memberships."`
  - Line 284: `"Paid annually · HSA-eligible"` (Clarity tier pricing badge)
  - Issue: Same legal hold. The Clarity HSA-eligible badge is a particularly visible claim that sits in the pricing box.

- **src/pages/clarity.astro:61, 114** — Clarity Program listed as "HSA-eligible"
  - Line 61: `a: 'The membership component is HSA-eligible following the Primary Care Enhancement Act...'`
  - Line 114: `<p class="clarity-sidebar__period">Paid annually · HSA-eligible</p>`
  - Issue: Same legal hold. Additionally, competitor brands named in the Clarity comparison section (lines 661–669):
    - `"Fountain Life / Human Longevity / Next Health"` (longevity clinic comparison card)
    - `"Function Health / InsideTracker / Lifeforce"` (DIY testing platform comparison card)
  - Issue: Naming competitor brands directly. This is the "competitor naming" legal hold flagged in the audit instructions. Do not edit without legal clearance.

---

## Cross-page consistency table

| Fact | File:Line | Exact Wording | Status |
|---|---|---|---|
| Individual membership price | `src/pages/membership.astro:98` | `$200/month` | ✓ Consistent |
| Individual membership price | `src/content/blog/concierge-medicine-vs-direct-primary-care.md:31` | `$200/month` | ✓ Consistent |
| Individual membership price | `src/content/blog/what-is-concierge-medicine.md:41` | `$200/month` | ✓ Consistent |
| Individual membership price | `src/content/blog/concierge-medicine-cost.md:18` | `$200/month` | ✓ Consistent |
| FFM panel cap | `src/pages/membership.astro:119` | `~250 patients per physician` | ✓ Consistent |
| FFM panel cap | `src/pages/meet-the-team/index.astro:46` | `about 250 patients each` | ✓ Consistent |
| FFM panel cap | `src/content/blog/direct-primary-care-panel-size.md:53` | `~250 patients per physician` | ✓ Consistent |
| FFM panel cap | `src/components/home/ComparisonTable.astro:9` | `~250 patients per physician` | ✓ Consistent |
| DPC industry panel | `src/content/blog/direct-primary-care-panel-size.md:3` (description) | `400–600` | **⚠ WRONG — should be 300–600** |
| DPC industry panel | `src/content/blog/direct-primary-care-panel-size.md:53` | `300–600` | ✓ Correct (body text) |
| DPC industry panel | `src/components/home/ComparisonTable.astro:9` | `300–600 patients` | ✓ Consistent |
| Traditional panel | `src/content/blog/concierge-medicine-vs-direct-primary-care.md:37` | `2,000–3,000` | ✓ Consistent |
| Traditional panel | `src/content/blog/what-is-direct-primary-care.md:53` | `2,000 to 3,000` | ✓ Consistent |
| Traditional panel | `src/components/home/ComparisonTable.astro:9` | `2,000–3,000` | ✓ Consistent |
| Visit length | `src/pages/about.astro:89` | `1–2 hour visits` | ✓ Consistent |
| Visit length | `src/pages/membership.astro:104` | `Visits: 1–2 hours` | ✓ Consistent |
| Visit length | `src/components/home/ComparisonTable.astro:3` | `1–2 hours` | ✓ Consistent |
| Visit length | `src/content/blog/concierge-medicine-vs-direct-primary-care.md:51` | `1–2 hour visits` | ✓ Consistent |
| Wayne address | `src/content/locations/wayne.md:5–8` | `295 Old Eagle School Road, Wayne, PA 19087` | ✓ Correct |
| Wayne address | `src/pages/faq.astro:15` | `295 Old Eagle School Road, Wayne, PA 19087` | ✓ Correct |
| Wayne address | `src/pages/clarity.astro:24–29` (JSON-LD) | `295 Old Eagle School Road, Wayne, PA 19087` | ✓ Correct |
| Founder vs Co-founder | `src/content/providers/david-bigley-do.md:5` | `"Founder & Family Medicine Physician"` | ✓ Consistent as "Founder" |
| Founder vs Co-founder | `src/pages/about.astro:37` | `"Founded in September 2024"` | ✓ Consistent |
| Founder vs Co-founder | `src/pages/faq.astro:19` | `"the founder of Forward Family Medicine"` | ✓ Consistent — "co-founder" not used anywhere |
| Lieberman credential | `src/content/providers/philip-lieberman-md.md:3` | `credentials: "MD"` | ✓ Correct |
| Lieberman credential | `src/content/blog/welcoming-dr-philip-lieberman.md:18` | `"Dr. Philip Lieberman, MD"` | ✓ Correct |
| Lieberman board status | `src/content/providers/philip-lieberman-md.md:14` | `boardStatus: "board-eligible"` | ✓ Correct |
| Lieberman board status | `src/pages/lifestyle-medicine.astro:20` | `"board-eligible in it by the American College of Lifestyle Medicine"` | ✓ Correct |
| Lieberman board status | **`src/pages/clarity.astro:583`** | `"Dr. Lieberman's board certification in Lifestyle Medicine"` | **⚠ WRONG — should be board eligibility** |
| Number of locations | `src/pages/locations/index.astro:63` | `3 locations (Wayne, West Chester, Malvern)` | ✓ Consistent |
| Number of physicians | `src/components/home/TeamTeaser.astro:17` | `"Three physicians, three locations"` | ✓ Consistent |
| Concierge cost benchmark | `src/content/blog/what-is-direct-primary-care.md:47` | `"$400+/month or more"` | ✓ Matches reference fact |
| Concierge cost benchmark | `src/components/home/ComparisonTable.astro:7` | `"$400+/month retainer"` | ✓ Matches reference fact |

---

## Build output notes

- **Build result:** Clean — `210 page(s) built in 7.55s`, no errors, no warnings.
- **Known duplicate-route `/blog/dpc-vs-concierge-which-is-right/`:** This route is now generated from the redirect in `astro.config.mjs`:
  ```
  '/blog/dpc-vs-concierge-which-is-right/': '/blog/concierge-medicine-vs-direct-primary-care',
  ```
  The redirect generates a static redirect HTML page at that path. No duplicate-content warning is emitted — the prior dual-file issue appears resolved. Both the redirect page and the canonical blog page build cleanly. Document that the "pre-existing duplicate-route warning" from prior sessions no longer fires; it appears to have been cleaned up.
- **No 404 links detected** in the build output. All redirects defined in `astro.config.mjs` build successfully.
- **`/providers/` redirect pages** generated: `/providers/index.html`, `/providers/david-bigley-do/index.html`, `/providers/philip-lieberman-md/index.html`, `/providers/brian-landi-do/index.html` — all correctly redirect to `/meet-the-team/` equivalents. ✓

---

## Architecture rule check results

| Rule | Status | Notes |
|---|---|---|
| `src/content/providers/` = physicians only | ✓ PASS | Bigley, Lieberman, Landi only |
| `src/content/team/` = non-physicians only | ✓ PASS | Ritamarie only |
| All bio pages at `/meet-the-team/[slug]/` | ✓ PASS | Confirmed in build output |
| Old `/providers/[slug]/` redirects to `/meet-the-team/[slug]/` | ✓ PASS | 4 redirects in `astro.config.mjs` |
| `/about/` = practice story only, no full bios duplicated | ✓ PASS | Only a 2-paragraph team mention with link |
| `become-a-patient` → `new-patients` redirect | ✓ PASS (via page) | Handled by `src/pages/become-a-patient.astro` using `Astro.redirect('/new-patients', 301)` — NOT in `astro.config.mjs` redirects block. Functions correctly but deviates from stated convention. |
| Sitemap excludes `/become-a-patient/` | ✓ PASS | `!page.endsWith('/become-a-patient/')` in sitemap filter |
| All blog posts attributed to Dr. Bigley | ⚠ PARTIAL | 2 welcoming posts use `"Dr. David Bigley"` format; 1 index planning entry uses dual-author. See High findings. |
| `acceptingNewPatients` drives badge rendering | ✓ PASS | Bigley: `false` → "Panel Full" ✓; Lieberman: `true` → "Now Accepting" ✓; Landi: `true` + `acceptingNewPatientsStartDate: "2026-08-01"` → "Joining August 2026" ✓ |

---

## scopeDisclaimer check (Task 2)

- **src/content/team/ritamarie-smedile.md:23** — `scopeDisclaimer` field is present in frontmatter (not body markdown). ✓
- Exact text: `"Ritamarie is a registered nurse and is not a prescribing provider. She does not serve as a primary care physician. FFM memberships are established with Dr. Bigley, Dr. Lieberman, or Dr. Landi."`
- Includes "Dr. Landi" ✓
- Wording matches the specified reference exactly ✓

---

## JSON-LD schema check (Task 7)

| Provider | JSON-LD Type | Notes |
|---|---|---|
| David Bigley, DO | `Physician` | ✓ Correct type |
| Philip Lieberman, MD | `Physician` | ✓ Correct type |
| Brian Landi, DO | `Physician` | ✓ Correct type — rendered in Wayne, PA per hardcoded template (see High finding) |
| Ritamarie Smedile, PhD RN | `Person` | ✓ Correct type — NOT Physician |

- All four bio pages use `worksFor: { "@type": "MedicalBusiness", "name": "Forward Family Medicine" }` for physicians and `"Organization"` for Ritamarie. ✓
- `medicalSpecialty` is populated from the `specialties` array for all physicians. ✓
- `identifier` (NPI) is present for all three physicians. ✓
- **Issue**: Landi's JSON-LD has no `additionalCertifications` entries (MSCP is not in JSON-LD as credential — good, since it's not yet earned). ✓
- **Issue**: Lieberman's JSON-LD `medicalSpecialty` will render `["Family Medicine", "Lifestyle Medicine", "Direct Primary Care"]` — reasonable, none of these claim board-certification status directly in JSON-LD. ✓
- **Issue**: The menopause.astro page has a separate `physicianSchema` for Landi with specific unconfirmed west-chester/malvern addresses — see Critical finding #8 and Medium finding #1.

---

## Image alt text and file existence (Task 14)

| Image | Location | alt text | File exists? |
|---|---|---|---|
| Dr. David Bigley headshot | `src/assets/staff/dr-david-bigley.jpg` | "Dr. David Bigley, DO — Founder, Forward Family Medicine" | ✓ |
| Dr. Philip Lieberman headshot | `src/assets/staff/dr-philip-lieberman.jpg` | "Dr. Philip Lieberman, MD — Family Medicine & Lifestyle Medicine, Forward Family Medicine" | ✓ |
| Dr. Brian Landi headshot | `src/assets/staff/dr-brian-landi.jpg` | "Dr. Brian Landi, DO — Family Medicine Physician, Forward Family Medicine" | ✓ |
| Ritamarie Smedile | `src/assets/staff/ritamarie-smedile.jpg` | "Ritamarie Smedile, PhD, RN — Clinical Operations & Wellness, Forward Family Medicine" | ✓ |
| FFM team photo (hero) | `src/assets/staff/ffm-team.jpg` | "The Forward Family Medicine team at our Wayne, PA practice — Dr. David Bigley, Dr. Philip Lieberman, Dr. Brian Landi, and Ritamarie Smedile PhD RN" | ✓ |
| Public staff photos (locations page) | `public/images/staff/*.jpg` | Used in location cards: alt = provider name | All 4 individual photos ✓; ffm-team.jpg absent from public/images/staff/ (not needed there — hero uses Astro-bundled import) ✓ |

- No empty or missing alt text detected on any team photo. ✓
- Landi's headshot is present in **both** `src/assets/staff/dr-brian-landi.jpg` AND `public/images/staff/dr-brian-landi.jpg`. ✓

---

## Files audited

### `src/content/`
- `src/content/config.ts` — NOT FOUND (schema definition not in this file; schema inferred from frontmatter structure across content files)
- `src/content/providers/david-bigley-do.md`
- `src/content/providers/philip-lieberman-md.md`
- `src/content/providers/brian-landi-do.md`
- `src/content/team/ritamarie-smedile.md`
- `src/content/locations/wayne.md`
- `src/content/locations/west-chester.md`
- `src/content/locations/malvern.md`
- `src/content/blog/index.md` (planning file)
- `src/content/blog/welcoming-dr-brian-landi.md`
- `src/content/blog/welcoming-dr-philip-lieberman.md`
- `src/content/blog/direct-primary-care-panel-size.md`
- `src/content/blog/concierge-medicine-vs-direct-primary-care.md`
- `src/content/blog/what-is-concierge-medicine.md`
- `src/content/blog/what-is-direct-primary-care.md`
- `src/content/blog/direct-primary-care-and-hsa.md`
- `src/content/blog/direct-primary-care-for-self-employed.md`
- `src/content/blog/preventive-care-employer-benefits.md`
- `src/content/blog/new-patient-meet-and-greet.md`
- `src/content/blog/concierge-medicine-cost.md`
- `src/content/blog/annual-physical-what-to-expect.md`
- `src/content/local/menopause-wayne-pa.md` (sampled)
- `src/content/local/menopause-west-chester-pa.md` (sampled)
- `src/content/local/direct-primary-care-west-chester-pa.md` (sampled)
- `src/content/local/direct-primary-care-avondale-pa.md` (sampled)
- *(All 50+ local files scanned via grep — 217 MSCP references verified)*

### `src/pages/`
- `src/pages/index.astro`
- `src/pages/about.astro`
- `src/pages/membership.astro`
- `src/pages/clarity.astro`
- `src/pages/faq.astro`
- `src/pages/menopause.astro`
- `src/pages/lifestyle-medicine.astro` (partial)
- `src/pages/services.astro` (grep + partial read)
- `src/pages/become-a-patient.astro`
- `src/pages/meet-the-team/index.astro`
- `src/pages/meet-the-team/[slug].astro`
- `src/pages/locations/index.astro`
- `src/pages/locations/[slug].astro` (partial)
- `src/pages/blog/[slug].astro` (via build output verification)
- `src/pages/404.astro` (via build output)

### `src/components/`
- `src/components/home/HeroSection.astro`
- `src/components/home/ComparisonTable.astro`
- `src/components/home/TeamTeaser.astro`
- `src/components/home/CredentialStrip.astro`
- `src/components/shared/ProviderCard.astro`

### `src/layouts/`
- `src/layouts/MainLayout.astro` (via component imports; not read directly)

### Config
- `astro.config.mjs`
