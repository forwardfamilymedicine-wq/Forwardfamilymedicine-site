/**
 * authors.ts
 * Frontmatter author strings (and their aliases) -> the physician's slug in the
 * providers collection. The author box and the Article structured data both
 * read it, so a post's author links to the same bio in both places.
 */
const AUTHOR_SLUGS: Record<string, string> = {
  'Dr. David Bigley': 'david-bigley-do',
  'David Bigley, DO': 'david-bigley-do',
  'Dr. Philip Lieberman': 'philip-lieberman-md',
  'Philip Lieberman, MD': 'philip-lieberman-md',
  'Dr. Brian Landi': 'brian-landi-do',
  'Brian Landi, DO': 'brian-landi-do',
};

/** The physician's slug for an author string, or undefined when the author is not one of our physicians. */
export const authorSlug = (author?: string): string | undefined => (author ? AUTHOR_SLUGS[author] : undefined);
