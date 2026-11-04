/**
 * leadSource.ts
 * The `?source=` value a meet-and-greet CTA carries for a given page, so a
 * lead stays attributed to the page it came from. Values already in use
 * (clarity, membership, locations-*, wellness-collective, services, menopause,
 * local-page, lifestyle-medicine, direct-primary-care, concierge-medicine)
 * are kept exactly for GA4 continuity; the redesign's new pages get the
 * values from the boards. Pages not listed get no source, as today.
 *
 * Used by the header's Services-panel card ("the dropdown's card button uses
 * the current page's source"). Page bodies keep their own literal hrefs.
 */
const EXACT: Record<string, string> = {
  '/about/': 'about',
  '/careers/': 'careers',
  '/clarity/': 'clarity',
  '/concierge-medicine/': 'concierge-medicine',
  '/direct-primary-care/': 'direct-primary-care',
  '/faq/': 'faq',
  '/lifestyle-medicine/': 'lifestyle-medicine',
  '/locations/': 'locations',
  '/locations/wayne/': 'locations-wayne',
  '/locations/malvern/': 'locations-malvern',
  '/locations/west-chester/': 'locations-west-chester',
  '/meet-the-team/brian-landi-do/': 'landi',
  '/meet-the-team/philip-lieberman-md/': 'lieberman',
  '/membership/': 'membership',
  '/menopause/': 'menopause',
  '/services/': 'services',
  '/wellness-collective/': 'wellness-collective',
};

const PREFIX: Array<[string, string]> = [
  ['/blog/', 'blog'],
  ['/lifestyle/', 'library'],
  ['/local/', 'local-page'],
];

export function leadSourceForPath(pathname: string): string | undefined {
  const path = pathname.endsWith('/') ? pathname : `${pathname}/`;
  if (EXACT[path]) return EXACT[path];
  for (const [prefix, source] of PREFIX) {
    if (path.startsWith(prefix)) return source;
  }
  return undefined;
}

/** `/contact/` with the page's source appended when it has one. */
export function contactHrefForPath(pathname: string): string {
  const source = leadSourceForPath(pathname);
  return source ? `/contact/?source=${source}` : '/contact/';
}
