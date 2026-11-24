/**
 * membershipPricing.ts
 * The membership fees, in one place. Read by the landing pages
 * (src/pages/lp/[code].astro); /membership/ and MembershipRates.astro still
 * carry their own copies, and src/utils/pricingCheck.ts stops the build when
 * any figure here differs from theirs. Change a price here and there together
 * until those two read from this file as well.
 */

/** Individual membership, dollars per month. */
export const INDIVIDUAL_MONTHLY = 200;

/** Family membership, dollars per person per month, by household size. */
export const FAMILY_TIERS = [
  { members: 2, perPerson: 175 },
  { members: 3, perPerson: 150 },
  { members: 4, perPerson: 125 },
  { members: 5, perPerson: 100, andUp: true },
] as const;

/** The landing page's table: one row per household size. */
export const PRICING_ROWS: { label: string; price: string }[] = [
  { label: '1 person', price: `$${INDIVIDUAL_MONTHLY} per month` },
  ...FAMILY_TIERS.map((t) => ({
    label: 'andUp' in t && t.andUp ? `${t.members} or more` : `${t.members} people`,
    price: `$${t.perPerson} each`,
  })),
];
