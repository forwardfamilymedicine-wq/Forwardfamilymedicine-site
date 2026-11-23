/**
 * pricingCheck.ts
 * Build-time guard: every figure in src/data/membershipPricing.ts must match
 * what /membership/ (src/pages/membership.astro) and MembershipRates.astro
 * show. Runs in the frontmatter of each landing page, so a price changed in
 * one place and not the others stops the build with the differences listed.
 */
import { INDIVIDUAL_MONTHLY, FAMILY_TIERS } from '../data/membershipPricing';
// The two sources as text, bundled by Vite at build time (no file reads at
// render time, so this works the same in dev, in the build and in CI).
import membershipPageSource from '../pages/membership.astro?raw';
import membershipRatesSource from '../components/shared/MembershipRates.astro?raw';

interface Found { individual: number[]; family: Record<string, number[]> }

const SOURCES: Record<string, string> = {
  'membership.astro': membershipPageSource,
  'MembershipRates.astro': membershipRatesSource,
};

function figuresIn(text: string): Found {
  const found: Found = { individual: [], family: {} };
  // "$200<span class="plan-unit">/month" on /membership/, "rate-unit" in MembershipRates.
  for (const m of text.matchAll(/\$(\d+)<span class="(?:plan|rate)-unit">\/month/g)) found.individual.push(Number(m[1]));
  // ['2 members', '$175/person/month'] on /membership/; { size: '2 members', rate: '$175/person/month' } in MembershipRates.
  for (const m of text.matchAll(/'(\d\+?) members',\s*(?:rate:\s*)?'\$(\d+)\/person\/month'/g)) {
    (found.family[m[1]] ??= []).push(Number(m[2]));
  }
  return found;
}

/**
 * Throws when a figure differs or is missing. Returns one line per source
 * file describing what was checked, for a log or a report.
 */
export function assertPricingMatchesMembershipPage(): string[] {
  const problems: string[] = [];
  const checked: string[] = [];
  for (const [name, text] of Object.entries(SOURCES)) {
    const f = figuresIn(text);
    if (f.individual.length === 0) problems.push(`${name}: no individual monthly price found`);
    for (const v of f.individual) if (v !== INDIVIDUAL_MONTHLY) problems.push(`${name}: individual $${v}/month, data file says $${INDIVIDUAL_MONTHLY}`);
    for (const t of FAMILY_TIERS) {
      const key = 'andUp' in t && t.andUp ? `${t.members}+` : String(t.members);
      const vals = f.family[key] ?? [];
      if (vals.length === 0) problems.push(`${name}: no family rate found for ${key} members`);
      for (const v of vals) if (v !== t.perPerson) problems.push(`${name}: ${key} members $${v}/person/month, data file says $${t.perPerson}`);
    }
    checked.push(`${name}: individual ${f.individual.map((v) => `$${v}`).join(', ')}; family ${Object.entries(f.family).map(([k, v]) => `${k}: $${v.join('/')}`).join(', ')}`);
  }
  if (problems.length) {
    throw new Error(`[pricing] src/data/membershipPricing.ts differs from the Membership page:\n  ${problems.join('\n  ')}`);
  }
  return checked;
}
