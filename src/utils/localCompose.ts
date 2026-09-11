/**
 * localCompose.ts
 * Turns a markdown /local/ entry into the view model the composed editorial
 * path renders (components/editorial/ComposedLocalPage.astro).
 *
 * The body markdown is the source of the prose. Everything else is data:
 * the hero physician from physicianRouting, the nearest office from
 * data/towns, address and hours from the `locations` collection, the
 * spotlight physician from `providers`, nearby links from the collection.
 * The two hand-typed information blocks stop rendering: "Contact & Practice
 * Information" entirely, and "Practical Information" is parsed into extras
 * with an explicit allowlist. A label on neither list fails the build.
 */
import type { CollectionEntry } from 'astro:content';
import type { ImageMetadata } from 'astro';
import { credentialLine, practiceNote, type HeroResult, type LocalCategory } from './physicianRouting';
import { getAvailability, formatMonthYear } from './availability';
import { findTown, type Town } from '../data/towns';
import { scenarios, type Scenario } from '../data/localScenarios';
import { DROP_LABELS, KEEP_LABELS, REASSIGNED_DROP, TRAVEL_LABELS, labelMatches } from '../data/localPracticalLabels';

type Provider = CollectionEntry<'providers'>;
type Location = CollectionEntry<'locations'>;
type LocalEntry = CollectionEntry<'local'>;

// Practice-wide constants that no collection holds yet (siteConfig still has placeholders).
export const PRACTICE_FAX = '(215) 449-8854';
export const PRACTICE_EMAIL = 'information@forwardfamilymedicine.com';
const OFFICE_EXTRAS: Record<string, { label: string; value: string }[]> = {
  wayne: [{ label: 'Parking', value: 'Free parking available on site' }],
};

export const CATEGORY_COPY: Record<LocalCategory, { eyebrow: string; short: string }> = {
  'concierge':           { eyebrow: 'Concierge-style Direct Primary Care', short: 'Concierge medicine' },
  'direct-primary-care': { eyebrow: 'Direct Primary Care',                 short: 'Direct Primary Care' },
  'lifestyle-medicine':  { eyebrow: 'Lifestyle Medicine',                  short: 'Lifestyle medicine' },
  'menopause':           { eyebrow: 'Menopause Care',                      short: 'Menopause care' },
};

const DEFAULT_CTA_SUBHEAD = 'Start with a free, no-obligation meet and greet. Ask every question you have, and decide at your own pace.';

// ── HTML helpers ─────────────────────────────────────────────────────────────
export function stripTags(s: string): string { return s.replace(/<[^>]+>/g, ''); }
export function decodeEntities(s: string): string {
  return s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&nbsp;/g, ' ');
}
export function plainText(html: string): string {
  return decodeEntities(stripTags(html)).replace(/\s+/g, ' ').trim();
}
function trimArrow(s: string): string { return s.replace(/[\s→›»]+$/g, '').trim(); }
function anchors(html: string): { href: string; label: string; html: string }[] {
  return [...html.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)]
    .map(m => ({ href: decodeEntities(m[1]), label: trimArrow(plainText(m[2])), html: m[0] }));
}
function paragraphs(html: string): string[] {
  return [...html.matchAll(/<p>([\s\S]*?)<\/p>/g)].map(m => m[1]);
}

// ── Segmentation at <h2> boundaries (shared with the generic path) ───────────
// Every <h2> carries an id equal to its heading slug (rehypeHeadingIds), so
// cutting the pre-rendered string at `<h2 id="{slug}">` groups "everything
// between two h2s" without re-rendering any markdown.
export interface RawSection { text: string; headingHtml: string; bodyHtml: string }
export interface Heading { depth: number; slug: string; text: string }

export function segmentSections(html: string, headings: Heading[], slug: string): { heroHtml: string; sections: RawSection[] } {
  const h2s = headings.filter(h => h.depth === 2);
  const h2Count = (html.match(/<h2[\s>]/g) ?? []).length;
  if (h2Count !== h2s.length) {
    throw new Error(`[local/${slug}] ${h2Count} <h2> elements in HTML but ${h2s.length} depth-2 headings; a heading is nested or unslugged and the page cannot be segmented safely.`);
  }
  const cuts: number[] = [];
  let from = 0;
  for (const h of h2s) {
    const idx = html.indexOf(`<h2 id="${h.slug}">`, from);
    if (idx === -1) throw new Error(`[local/${slug}] heading "${h.text}" (#${h.slug}) not found in rendered HTML; cannot segment.`);
    cuts.push(idx);
    from = idx + 1;
  }
  const heroHtml = html.slice(0, cuts[0] ?? html.length);
  const sections = h2s.map((h, i) => {
    const seg = html.slice(cuts[i], cuts[i + 1] ?? html.length);
    const close = seg.indexOf('</h2>');
    return { text: h.text, headingHtml: seg.slice(0, close + 5), bodyHtml: seg.slice(close + 5) };
  });
  return { heroHtml, sections };
}

// ── Classifier for the composed path ─────────────────────────────────────────
// Same wording tests as the generic path, plus "What's Included", which the
// Chester County concierge pages use for their services block.
export type Kind = 'about' | 'why' | 'services' | 'info' | 'faq' | 'cta' | 'explainer';
export function classifyComposed(text: string): Kind {
  // Headings arrive typographically quoted ("What’s Included"); compare on straight quotes.
  const t = decodeEntities(text).toLowerCase().trim().replace(/[\u2018\u2019]/g, "'");
  if (t.startsWith('about '))                                              return 'about';
  if (t.startsWith('why '))                                                return 'why';
  if (t.includes('service') || t === "what's included")                    return 'services';
  if (t.includes('practical') || t.includes('contact & practice') || t === 'contact') return 'info';
  if (t.includes('frequently asked') || t === 'faq')                      return 'faq';
  if (t.includes('get started') || t.includes('ready to') ||
      t.includes('take the first') || t.includes('start living') ||
      /^experience /.test(t))                                              return 'cta';
  return 'explainer';
}

// ── FAQ pairs: each <p> whose first element child is <strong>…?</strong> ─────
export function extractFaqs(bodyHtml: string): { q: string; a: string }[] {
  const out: { q: string; a: string }[] = [];
  for (const inner of paragraphs(bodyHtml)) {
    const m = inner.match(/^([^<]*)<strong>([\s\S]*?)<\/strong>([\s\S]*)$/);
    if (!m) continue;
    const q = plainText(m[2]);
    if (!q.endsWith('?')) continue;
    out.push({ q, a: (m[1] + m[3]).replace(/^\s*\n?\s*/, '') });
  }
  return out;
}

// ── Services: dot-separated line or bullet list, one group ───────────────────
export interface ServiceModel { intro?: string; items: string[]; more?: { label: string; href: string }; noteHtml?: string }

export function parseServices(bodyHtml: string, slug: string): ServiceModel {
  const items: string[] = [...bodyHtml.matchAll(/<li>([\s\S]*?)<\/li>/g)].map(m => plainText(m[1]));
  const more = anchors(bodyHtml).find(a => /^\/services\/?$/.test(a.href));
  let intro: string | undefined;
  const notes: string[] = [];
  for (const p of paragraphs(bodyHtml)) {
    const withoutLinks = p.replace(/<a\b[^>]*>[\s\S]*?<\/a>/g, '');
    const text = plainText(withoutLinks);
    if (!/[A-Za-z0-9]/.test(text)) continue;                      // a bare link row
    if (!p.startsWith('<strong>') && p.includes(' · ') && items.length === 0) {
      items.push(...text.split('·').map(s => s.trim()).filter(Boolean));
      continue;
    }
    if (items.length > 0 && text.endsWith(':') && notes.length === 0 && p.indexOf('<') === -1) { intro = text; continue; }
    // Pricing line or a trailing sentence. Keep its HTML, minus the link that became `more`.
    let note = more ? p.replace(more.html, '') : p;
    note = note.replace(/^\s*\|\s*/, '').replace(/\s*\|\s*$/, '').replace(/^\s*\n/, '').trim().replace(/\n/g, '<br>');
    if (/[A-Za-z0-9]/.test(plainText(note))) notes.push(note);
  }
  if (items.length === 0) throw new Error(`[local/${slug}] services section has neither a dot-separated line nor a list.`);
  return { intro, items, more: more ? { label: more.label, href: more.href } : undefined, noteHtml: notes.length ? notes.join('<br>') : undefined };
}

// ── Practical information: label allowlists (src/data/localPracticalLabels.ts) ──
const startsWithAny = labelMatches;

export interface Extra { label: string; value: string }

export function parsePractical(bodyHtml: string, slug: string, town: Town): { kept: Extra[]; dropped: string[] } {
  const kept: Extra[] = [];
  const dropped: string[] = [];
  for (const p of paragraphs(bodyHtml)) {
    for (const rawLine of p.split('\n')) {
      const line = rawLine.trim();
      if (!line) continue;
      const m = line.match(/^<strong>([^<]+?):<\/strong>\s*([\s\S]*)$/);
      if (!m || m[2].includes('<strong>')) {
        throw new Error(`[local/${slug}] malformed Practical Information line (expected one "**Label:** value" per line): ${plainText(line).slice(0, 80)}`);
      }
      const label = decodeEntities(m[1]).trim();
      const value = plainText(m[2]);
      if (startsWithAny(label, DROP_LABELS)) { dropped.push(label); continue; }
      if (town.reassigned && startsWithAny(label, REASSIGNED_DROP)) { dropped.push(label); continue; }
      if (startsWithAny(label, KEEP_LABELS)) { kept.push({ label, value }); continue; }
      throw new Error(`[local/${slug}] Practical Information label "${label}" is on neither the keep list nor the drop list.`);
    }
  }
  return { kept, dropped };
}

/**
 * One practical-block row per office in `town.secondary`, labelled
 * "{Office} office". The opening note comes from the `locations` collection,
 * so it disappears by itself once that office's status flips to open.
 */
export function secondaryExtras(town: Town, locations: Location[]): Extra[] {
  const out: Extra[] = [];
  for (const [slug, phrase] of Object.entries(town.secondary ?? {})) {
    if (!phrase || slug === town.office) continue;
    const loc = locations.find(l => l.data.slug === slug);
    if (!loc) throw new Error(`[local/${town.slug}] secondary office "${slug}" has no locations entry.`);
    const opening = loc.data.status !== 'open' && loc.data.openingDate ? ` Opens ${formatMonthYear(loc.data.openingDate)}.` : '';
    out.push({ label: `${loc.data.name} office`, value: `${phrase}${opening}` });
  }
  return out;
}

// ── Hero lede from the meta description ──────────────────────────────────────
// Sentences carrying a date go, since they stale; em dashes become commas.
const MONTHS = 'January|February|March|April|May|June|July|August|September|October|November|December';
export function ledeFrom(description: string): string {
  const dated = new RegExp(`\\b(?:${MONTHS})\\s+\\d{4}\\b|\\b20\\d{2}\\b`);
  return description
    .split(/(?<=[.!?])\s+/)
    .filter(s => !dated.test(s))
    .join(' ')
    .replace(/\s*—\s*/g, ', ')
    .replace(/\s+([,.])/g, '$1')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

// ── The view model ───────────────────────────────────────────────────────────
export interface ProseBlock { kind: 'prose'; label?: string; title: string; html: string }
export interface ServicesBlock { kind: 'services'; label: string; title: string; model: ServiceModel }
export type Block = ProseBlock | ServicesBlock;

export interface ComposedPage {
  location: string;
  town: Town;
  hero: {
    eyebrow: string; title: string; lede: string;
    cta: { label: string; href: string }; secondary: { label: string; href: string };
    photo: ImageMetadata | null; photoAlt: string;
    physician: { name: string; credential: string; note?: string; href: string; linkLabel: string };
  };
  stats: { value: string; label: string }[];
  before: Block[];
  spotlight: {
    label: string; title: string; name: string; credential: string; note: string; href: string;
    photo: ImageMetadata; photoAlt: string; facts: string[]; bioHtml: string;
  };
  after: Block[];
  local: { label: string; title: string; paragraphs: string[]; showWaynePhoto: boolean } | null;
  scenario: Scenario | null;
  practical: {
    title: string; officeName: string;
    address: { street: string; city: string; state: string; zip: string };
    phone?: string; fax: string; email: string;
    hours: { day: string; open: string; close: string }[];
    extras: Extra[]; mapHref?: string; detailsHref: string;
    /** "October 2026" while the office is coming soon; undefined once open. */
    opening?: string;
    droppedLabels: string[];
  };
  faq: { headline: string; faqs: { q: string; a: string }[] } | null;
  cta: { headline: string; subhead: string; btnText: string; btnHref: string; btn2Text?: string; btn2Href?: string };
  nearby: { id: string; summary: string; ariaLabel: string; links: { href: string; label: string }[] };
}

export interface ComposeInput {
  entry: LocalEntry;
  slug: string;
  html: string;
  headings: Heading[];
  hero: HeroResult;
  locationSlug: string;
  providers: Provider[];
  locations: Location[];
  siblings: { slug: string; label: string; category: LocalCategory }[];
}

export function composeLocalPage(input: ComposeInput): ComposedPage {
  const { entry, slug, html, headings, hero, locationSlug, providers, locations, siblings } = input;
  const category = entry.data.category;
  const location = entry.data.location;
  if (!location) throw new Error(`[local/${slug}] composed path needs a location.`);
  const town = findTown(locationSlug);
  if (!town) throw new Error(`[local/${slug}] no towns entry for "${locationSlug}"; add it to src/data/towns.ts.`);
  const office = locations.find(l => l.data.slug === town.office);
  if (!office) throw new Error(`[local/${slug}] town "${town.slug}" points at office "${town.office}" but no locations entry has that slug.`);

  const { heroHtml, sections } = segmentSections(html, headings, slug);

  // Hero
  const h1 = heroHtml.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/);
  if (!h1) throw new Error(`[local/${slug}] no <h1> before the first <h2>.`);
  const copy = CATEGORY_COPY[category];
  const heroPhysician = hero.kind === 'physician'
    ? {
        photo: hero.provider.data.photo ?? null,
        photoAlt: hero.provider.data.photoAlt,
        physician: { name: hero.credentialedName, credential: hero.credentialLine, note: hero.note, href: hero.bioHref, linkLabel: `Meet ${hero.shortName}` },
      }
    : {
        photo: null,
        photoAlt: 'Forward Family Medicine physician team',
        physician: { name: 'Our Physicians', credential: 'Direct Primary Care · Wayne · Malvern · West Chester', href: '/meet-the-team/', linkLabel: 'Meet the team' },
      };

  // Spotlight: the hero physician, or the physician at the nearest office.
  let spotlightProvider: Provider;
  let spotlightNote: string;
  let spotlightLabel: string;
  let spotlightTitle: string;
  if (hero.kind === 'physician') {
    spotlightProvider = hero.provider;
    spotlightNote = hero.note;
    spotlightLabel = 'Meet your physician';
    spotlightTitle = 'The physician you would actually see';
  } else {
    const eligible = providers.filter(p => p.data.locations.includes(town.office) && getAvailability(p.data).status === 'accepting');
    if (eligible.length !== 1) {
      throw new Error(`[local/${slug}] nearest office "${town.office}" has ${eligible.length} accepting physicians; the spotlight needs exactly one.`);
    }
    spotlightProvider = eligible[0];
    spotlightNote = practiceNote(spotlightProvider, locationSlug, locations);
    spotlightLabel = 'Nearest office';
    spotlightTitle = `The physician at our ${office.data.name} office`;
  }
  if (!spotlightProvider.data.photo) throw new Error(`[local/${slug}] provider ${spotlightProvider.data.slug} has no photo.`);

  // Body sections
  const before: Block[] = [];
  const after: Block[] = [];
  let faq: ComposedPage['faq'] = null;
  let cta: ComposedPage['cta'] | null = null;
  let practicalSection: RawSection | null = null;
  let seenWhy = false;
  for (const s of sections) {
    const kind = classifyComposed(s.text);
    const title = decodeEntities(s.text);
    switch (kind) {
      case 'about':
      case 'explainer':
      case 'why': {
        if (kind === 'why') seenWhy = true;
        const block: ProseBlock = { kind: 'prose', title, html: s.bodyHtml.trim(), label: kind === 'about' ? 'About' : kind === 'why' ? 'Why patients choose us' : undefined };
        (seenWhy ? after : before).push(block);
        break;
      }
      case 'services':
        seenWhy = true;
        after.push({ kind: 'services', label: 'Services', title, model: parseServices(s.bodyHtml, slug) });
        break;
      case 'info':
        if (s.text.toLowerCase().includes('practical')) practicalSection = s;
        // "Contact & Practice Information" is not rendered: the locations collection supplies it.
        break;
      case 'faq':
        faq = { headline: title, faqs: extractFaqs(s.bodyHtml) };
        break;
      case 'cta': {
        const links = anchors(s.bodyHtml);
        if (links.length === 0) throw new Error(`[local/${slug}] CTA section "${s.text}" has no links.`);
        if (links.length > 2) {
          const extra = links.slice(2);
          for (const l of extra) {
            if (!l.href.startsWith('/meet-the-team/')) throw new Error(`[local/${slug}] CTA has a third link that is not a physician bio: ${l.href}`);
          }
        }
        const sub = paragraphs(s.bodyHtml).filter(p => !/<a\b/.test(p)).map(plainText).filter(Boolean).join(' ');
        cta = {
          headline: title,
          subhead: sub || DEFAULT_CTA_SUBHEAD,
          btnText: links[0].label, btnHref: links[0].href,
          btn2Text: links[1]?.label, btn2Href: links[1]?.href,
        };
        break;
      }
    }
  }
  if (!cta) throw new Error(`[local/${slug}] no CTA section found.`);

  // Practical information
  const { kept, dropped } = practicalSection ? parsePractical(practicalSection.bodyHtml, slug, town) : { kept: [], dropped: [] };
  // Order: parking, the drive to the assigned office, any other office, then
  // telehealth and the rest, so the block reads nearest office first.
  const isTravel = (x: Extra) => startsWithAny(x.label, TRAVEL_LABELS);
  const extras: Extra[] = [];
  extras.push(...(OFFICE_EXTRAS[town.office] ?? []));
  if (town.reassigned && town.travel) extras.push({ label: `From ${town.name}`, value: town.travel });
  extras.push(...kept.filter(isTravel));
  extras.push(...secondaryExtras(town, locations));
  extras.push(...kept.filter(x => !isTravel(x)));
  const d = office.data;
  const mapHref = d.addressStreet
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${d.addressStreet}, ${d.addressCity}, ${d.addressState} ${d.addressZip}`)}`
    : undefined;

  // Local context from frontmatter
  const localParagraphs = [
    entry.data.localNote,
    entry.data.nearbyNeighborhoods ? `Also serving patients from ${entry.data.nearbyNeighborhoods}.` : undefined,
  ].filter((p): p is string => Boolean(p));

  // Scenario
  const make = scenarios[category];
  const physicianOffices = hero.kind === 'physician'
    ? hero.provider.data.locations.map(slugOf => {
        const l = locations.find(x => x.data.slug === slugOf);
        if (!l) throw new Error(`[local/${slug}] ${hero.provider.data.slug} lists location "${slugOf}" but no locations entry has that slug.`);
        return { name: l.data.name, open: l.data.status === 'open' };
      })
    : [];
  const scenario = make
    ? make({
        town: town.name,
        physician: hero.kind === 'physician' ? hero.shortName : 'your physician',
        office: office.data.name,
        officeOpen: office.data.status === 'open',
        // A team-card page has no named physician, so "your physician" is at the nearest office by definition.
        physicianPractisesHere: hero.kind === 'physician' ? hero.provider.data.locations.includes(town.office) : true,
        physicianOffices,
      })
    : null;

  // Nearby: every other page of the same category.
  const links = siblings
    .filter(s => s.category === category && s.slug !== slug)
    .map(s => ({ href: `/local/${s.slug}/`, label: s.label.replace(/,\s*PA$/, '') }))
    .sort((a, b) => a.label.localeCompare(b.label));

  return {
    location,
    town,
    hero: {
      eyebrow: `${location} · ${copy.eyebrow}`,
      title: plainText(h1[1]),
      lede: entry.data.lede ?? ledeFrom(entry.data.description),
      cta: { label: 'Schedule a free meet and greet', href: '/contact/?source=local-page' },
      secondary: { label: 'See membership plans', href: '/membership' },
      ...heroPhysician,
    },
    stats: [
      { value: '~250', label: 'Max patients per physician' },
      { value: '1–2 hr', label: 'Visit length' },
      { value: '$200/mo', label: 'Individual membership' },
    ],
    before,
    spotlight: {
      label: spotlightLabel,
      title: spotlightTitle,
      name: `Dr. ${spotlightProvider.data.name}, ${spotlightProvider.data.credentials}`,
      credential: credentialLine(spotlightProvider),
      note: spotlightNote,
      href: `/meet-the-team/${spotlightProvider.data.slug}/`,
      photo: spotlightProvider.data.photo,
      photoAlt: spotlightProvider.data.photoAlt,
      facts: (spotlightProvider.data.notableExperience ?? []).map(x => x.label),
      bioHtml: spotlightProvider.rendered?.html ?? '',
    },
    after,
    local: localParagraphs.length
      ? { label: `${town.name}, up close`, title: `How we serve ${town.name}`, paragraphs: localParagraphs, showWaynePhoto: town.office === 'wayne' }
      : null,
    scenario,
    practical: {
      title: practicalSection ? decodeEntities(practicalSection.text) : 'Practical Information',
      officeName: d.name,
      address: { street: d.addressStreet, city: d.addressCity, state: d.addressState, zip: d.addressZip },
      phone: d.phone || undefined,
      fax: PRACTICE_FAX,
      email: PRACTICE_EMAIL,
      hours: d.hours,
      extras,
      mapHref,
      detailsHref: `/locations/${town.office}/`,
      opening: office.data.status !== 'open' && office.data.openingDate ? formatMonthYear(office.data.openingDate) : undefined,
      droppedLabels: dropped,
    },
    faq,
    cta,
    nearby: {
      id: `${category}-near-you`,
      summary: `${copy.short} pages for towns near ${town.name}`,
      ariaLabel: `${copy.short} pages for nearby towns`,
      links,
    },
  };
}
