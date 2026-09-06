/**
 * physicianRouting.ts
 * Single source of truth for which physician fronts a local page's hero card.
 *
 * Specialty pages route by credential; general-care pages route by location.
 *
 *   menopause            -> the accepting Menopause Society Certified Practitioner
 *   lifestyle-medicine   -> the accepting physician board-certified in Lifestyle Medicine
 *   concierge            -> the single accepting physician whose `locations`
 *   direct-primary-care     include this town; otherwise the team card
 *
 * A physician whose panel is full never fronts a page. Where the rule yields
 * zero or more than one eligible physician the result is the team card (and a
 * build warning for the more-than-one case, which needs a human decision).
 *
 * The note under the credential line states where the physician actually
 * practices, so a card never implies an office that does not exist in the
 * town being read about. Opening months come from the `locations` collection.
 */
import type { CollectionEntry } from 'astro:content';
import { getAvailability, formatMonthYear } from './availability';

export type LocalCategory = 'concierge' | 'direct-primary-care' | 'lifestyle-medicine' | 'menopause';
type Provider = CollectionEntry<'providers'>;
type Location = CollectionEntry<'locations'>;

export interface HeroPhysician {
  kind: 'physician';
  provider: Provider;
  slug: string;
  /** "Dr. Brian Landi" */
  displayName: string;
  /** "Dr. Landi" */
  shortName: string;
  /** "Dr. Brian Landi, DO" */
  credentialedName: string;
  /** "DO. Board-certified in Family Medicine. Menopause Society Certified Practitioner." */
  credentialLine: string;
  /** Where the physician practices, relative to the town on the page. */
  note: string;
  /** True when the physician's `locations` include this page's town. */
  practicesHere: boolean;
  bioHref: string;
}
export interface HeroTeam { kind: 'team' }
export type HeroResult = HeroPhysician | HeroTeam;

export interface ResolveInput {
  category: LocalCategory;
  /** "wayne", "king-of-prussia", or "" when the entry has no location. */
  locationSlug: string;
  providers: Provider[];
  locations: Location[];
  warn?: (message: string) => void;
}

const MENOPAUSE_PRACTITIONER = /menopause society certified practitioner/i;
const LIFESTYLE_MEDICINE = /lifestyle medicine/i;

/** Accepting or full only. A future start date is not supported here. */
function isAccepting(p: Provider): boolean {
  const a = getAvailability(p.data);
  if (a.status === 'future') {
    throw new Error(
      `[physicianRouting] ${p.data.slug} has acceptingNewPatientsStartDate set. ` +
      `Future availability is not supported on local-page hero cards; ` +
      `extend resolveHeroPhysician before shipping a start date.`,
    );
  }
  return a.status === 'accepting';
}

function candidates(category: LocalCategory, locationSlug: string, providers: Provider[]): Provider[] {
  switch (category) {
    case 'menopause':
      return providers.filter(p => p.data.additionalCertifications.some(c => MENOPAUSE_PRACTITIONER.test(c.name)));
    case 'lifestyle-medicine':
      return providers.filter(p => p.data.boardSpecialties.some(s => LIFESTYLE_MEDICINE.test(s)));
    case 'concierge':
    case 'direct-primary-care':
      return locationSlug ? providers.filter(p => p.data.locations.includes(locationSlug)) : [];
  }
}

function joinAnd(items: string[]): string {
  if (items.length <= 1) return items[0] ?? '';
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(', ')}, and ${items[items.length - 1]}`;
}

/**
 * Credential line. Board specialties are one claim; other certifications are
 * separate sentences, never folded into the board-certification clause.
 * Certifications issued by a specialty board are skipped because they restate
 * a board specialty already named.
 */
export function credentialLine(p: Provider): string {
  const status = p.data.boardStatus === 'board-certified' ? 'Board-certified' : 'Board-eligible';
  const parts = [`${p.data.credentials}.`, `${status} in ${joinAnd(p.data.boardSpecialties)}.`];
  for (const cert of p.data.additionalCertifications) {
    const restatesBoard = /^(board[ -]certified|diplomate)\b/i.test(cert.name) || /\bboard of\b/i.test(cert.organization);
    if (!restatesBoard) parts.push(`${cert.name}.`);
  }
  return parts.join(' ');
}

/** The practice note for a physician on a page about `locationSlug`. */
export function practiceNote(p: Provider, locationSlug: string, locations: Location[]): string {
  const offices = p.data.locations.map(slug => {
    const loc = locations.find(l => l.data.slug === slug);
    if (!loc) throw new Error(`[physicianRouting] ${p.data.slug} lists location "${slug}" but no locations entry has that slug.`);
    return loc;
  });
  const here = offices.find(l => l.data.slug === locationSlug);

  if (here) {
    if (here.data.status === 'open') return `Accepting new patients in ${here.data.name}.`;
    return `Accepting new patients now. The ${here.data.name} office opens ${openingMonth(here)}.`;
  }

  const open = offices.filter(l => l.data.status === 'open');
  const coming = offices.filter(l => l.data.status !== 'open');
  const parts: string[] = ['Accepting new patients now.'];
  if (open.length) {
    parts.push(`Sees patients at our ${joinAnd(open.map(l => l.data.name))} ${open.length > 1 ? 'offices' : 'office'}.`);
  }
  // Group offices that open in the same month so one date is never stretched
  // across offices that open at different times.
  const byMonth = new Map<string, Location[]>();
  for (const l of coming) {
    const m = openingMonth(l);
    byMonth.set(m, [...(byMonth.get(m) ?? []), l]);
  }
  for (const [month, group] of byMonth) {
    parts.push(`${joinAnd(group.map(l => l.data.name))} ${group.length > 1 ? 'offices open' : 'office opens'} ${month}.`);
  }
  return parts.join(' ');
}

function openingMonth(l: Location): string {
  if (!l.data.openingDate) {
    throw new Error(`[physicianRouting] locations/${l.data.slug} is "${l.data.status}" but has no openingDate.`);
  }
  return formatMonthYear(l.data.openingDate);
}

export function resolveHeroPhysician(input: ResolveInput): HeroResult {
  const { category, locationSlug, providers, locations, warn } = input;
  const eligible = candidates(category, locationSlug, providers).filter(isAccepting);

  if (eligible.length === 0) return { kind: 'team' };
  if (eligible.length > 1) {
    warn?.(
      `[physicianRouting] ${category} in "${locationSlug || '(no location)'}": ` +
      `${eligible.map(p => p.data.slug).join(', ')} are all eligible; showing the team card until a tiebreak is decided.`,
    );
    return { kind: 'team' };
  }

  const p = eligible[0];
  const lastName = p.data.name.trim().split(/\s+/).pop() ?? p.data.name;
  return {
    kind: 'physician',
    provider: p,
    slug: p.data.slug,
    displayName: `Dr. ${p.data.name}`,
    shortName: `Dr. ${lastName}`,
    credentialedName: `Dr. ${p.data.name}, ${p.data.credentials}`,
    credentialLine: credentialLine(p),
    note: practiceNote(p, locationSlug, locations),
    practicesHere: p.data.locations.includes(locationSlug),
    bioHref: `/meet-the-team/${p.data.slug}/`,
  };
}
