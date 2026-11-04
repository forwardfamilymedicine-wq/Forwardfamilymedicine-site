/**
 * libraryCategories.ts
 * The Lifestyle Library's eight sections, keyed by content directory, in the
 * order the index lists them. An entry's section is its directory; the
 * `category` frontmatter field is "lifestyle" on every entry and is not used.
 * `<dir>/index.md` is the section's hub page.
 */
import type { CollectionEntry } from 'astro:content';

export const LIBRARY_CATEGORY_LABELS: Record<string, string> = {
  'cardiovascular-prevention': 'Cardiovascular Prevention',
  'lifestyle-medicine':        'Lifestyle Medicine',
  'menopause':                 'Menopause',
  'metabolic-health':          'Metabolic Health',
  'nutrition':                 'Nutrition',
  'physical-activity':         'Physical Activity',
  'sleep-hormones':            'Sleep & Hormones',
  'stress-mental-health':      'Stress & Mental Health',
};

export const LIBRARY_CATEGORY_ORDER = Object.keys(LIBRARY_CATEGORY_LABELS);

type Entry = CollectionEntry<'lifestyle'>;

/**
 * The loader gives "nutrition/reading-food-labels" for an article and plain
 * "nutrition" for the section's index.md, so a hub is an id with no slash and
 * every entry's section is its first segment.
 */
export const librarySlug = (e: Entry): string => e.id.replace(/\.mdx?$/, '').replace(/\/index$/, '');
export const libraryHref = (e: Entry): string => `/lifestyle/${librarySlug(e)}/`;
export const libraryCategoryOf = (e: Entry): string => librarySlug(e).split('/')[0];
export const isLibraryHub = (e: Entry): boolean => !librarySlug(e).includes('/');
export const libraryCategoryLabel = (dir: string): string => LIBRARY_CATEGORY_LABELS[dir] ?? dir;
