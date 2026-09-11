/**
 * towns.ts
 * Which office is nearest to each town a /local/ page is written for, and a
 * short travel phrase in the practice's voice. 21 of the 24 towns have no
 * `locations` entry of their own, so PracticalInfo and the nearest-office
 * physician spotlight read this map instead.
 *
 * Wayne figures were lifted from travel claims already published on the
 * town's pages (batch 4, stage 1 review). Every Malvern figure, and the Media
 * and Newtown Square times to Wayne, were checked against a map (batch 6).
 * Nothing is estimated: a town with no stated figure has an empty phrase.
 * Opening status is never stated here; it comes from the `locations`
 * collection.
 *
 * West Chester is assigned only to its own town while its street address is
 * unconfirmed. The six towns marked "reassigned" are geographically nearest
 * to West Chester and point at Malvern as a temporary state pending that
 * address.
 */
export type OfficeSlug = 'wayne' | 'malvern' | 'west-chester';

export interface Town {
  slug: string;
  name: string;
  /** Nearest office for PracticalInfo and the spotlight physician on team-card pages. */
  office: OfficeSlug;
  /** Short travel phrase to that office. Empty when no figure is stated in the source pages. */
  travel: string;
  /** True where the nearest office is really West Chester and Malvern stands in for it. */
  reassigned?: boolean;
  /**
   * Travel phrases to offices other than the assigned one, keyed by office
   * slug. Each renders as its own practical-block row labelled
   * "{Office} office", with an opening note taken from the `locations`
   * collection while that office is not yet open.
   */
  secondary?: Partial<Record<OfficeSlug, string>>;
}

export const towns: Town[] = [
  { slug: 'ardmore',         name: 'Ardmore',         office: 'wayne',   travel: 'About 6 miles west on Lancaster Avenue, or four to five stops from Ardmore Station to Wayne on the Paoli–Thorndale line.',
    secondary: { malvern: '15 miles, about 28 to 30 minutes.' } },
  { slug: 'avondale',        name: 'Avondale',        office: 'malvern', travel: '23 miles, about 35 minutes.', reassigned: true },
  { slug: 'berwyn',          name: 'Berwyn',          office: 'wayne',   travel: 'About 3 miles east on Route 30, or three stops from Berwyn Station to Wayne on the Paoli–Thorndale line.',
    secondary: { malvern: '5 miles, about 10 to 12 minutes.' } },
  { slug: 'bryn-mawr',       name: 'Bryn Mawr',       office: 'wayne',   travel: 'About 5 miles west on Lancaster Avenue, or about four stops from Bryn Mawr Station to Wayne on the Paoli–Thorndale line.',
    secondary: { malvern: '13 miles, about 25 minutes.' } },
  { slug: 'chester-springs', name: 'Chester Springs', office: 'malvern', travel: 'About 15–20 minutes via PA-401 east to PA-29 south.' },
  { slug: 'coatesville',     name: 'Coatesville',     office: 'malvern', travel: '17 miles, about 25 to 28 minutes.', reassigned: true },
  { slug: 'concordville',    name: 'Concordville',    office: 'malvern', travel: '18 miles, about 25 minutes.', reassigned: true },
  { slug: 'devon',           name: 'Devon',           office: 'wayne',   travel: 'About 3 miles east on Route 30, or two stops from Devon Station to Wayne on the Paoli–Thorndale line.',
    secondary: { malvern: '6 miles, about 12 to 15 minutes.' } },
  { slug: 'downingtown',     name: 'Downingtown',     office: 'malvern', travel: '9 miles, about 15 to 18 minutes.', reassigned: true },
  { slug: 'exton',           name: 'Exton',           office: 'malvern', travel: 'About 10 minutes via local routes.' },
  { slug: 'glen-mills',      name: 'Glen Mills',      office: 'malvern', travel: '15 miles, about 25 to 28 minutes.', reassigned: true },
  { slug: 'haverford',       name: 'Haverford',       office: 'wayne',   travel: 'About 5–6 miles west on Lancaster Avenue, or four to five stops from Haverford Station to Wayne on the Paoli–Thorndale line.',
    secondary: { malvern: '14 miles, about 25 to 28 minutes.' } },
  { slug: 'kennett-square',  name: 'Kennett Square',  office: 'malvern', travel: '20 miles, about 30 to 35 minutes.', reassigned: true },
  { slug: 'king-of-prussia', name: 'King of Prussia', office: 'wayne',   travel: 'About 7 miles south via Route 202, roughly 15–20 minutes depending on traffic. No direct rail, so telehealth suits routine care.',
    secondary: { malvern: '10 miles, about 18 to 20 minutes.' } },
  { slug: 'lionville',       name: 'Lionville',       office: 'malvern', travel: 'About 10–12 minutes via PA-100 south.' },
  { slug: 'malvern',         name: 'Malvern',         office: 'malvern', travel: '' },
  { slug: 'media',           name: 'Media',           office: 'wayne',   travel: 'About 12 miles north via Route 252, roughly 20 minutes. The Media/Elwyn line does not connect to Wayne, so telehealth suits routine care.',
    secondary: { malvern: '16 miles, about 28 to 32 minutes.' } },
  { slug: 'newtown-square',  name: 'Newtown Square',  office: 'wayne',   travel: 'About 7–8 miles north via Route 252, roughly 15 minutes. No direct rail, so telehealth suits routine care.',
    secondary: { malvern: '12 miles, about 22 to 25 minutes.' } },
  { slug: 'paoli',           name: 'Paoli',           office: 'wayne',   travel: 'About 6 miles east on Route 30, or about six stops from Paoli Station to Wayne on the Paoli–Thorndale line.',
    secondary: { malvern: '3 miles, about 8 minutes.' } },
  { slug: 'phoenixville',    name: 'Phoenixville',    office: 'malvern', travel: 'About 12–15 minutes via PA-29 south.' },
  { slug: 'radnor',          name: 'Radnor',          office: 'wayne',   travel: 'Our Wayne office is within Radnor Township, about 10 minutes from most Radnor neighborhoods.',
    secondary: { malvern: '10 miles, about 20 minutes.' } },
  { slug: 'villanova',       name: 'Villanova',       office: 'wayne',   travel: 'About 1 mile from Villanova, or one stop from Villanova Station to Wayne on the Paoli–Thorndale line.',
    secondary: { malvern: '11 miles, about 25 minutes.' } },
  { slug: 'wayne',           name: 'Wayne',           office: 'wayne',   travel: 'Our office is on Old Eagle School Road, about half a mile from Wayne Station on the Paoli–Thorndale line.',
    secondary: { malvern: '8 miles, about 15 to 18 minutes.' } },
  { slug: 'west-chester',    name: 'West Chester',    office: 'west-chester', travel: '' },
];

export function findTown(slug: string): Town | undefined {
  return towns.find(t => t.slug === slug);
}
