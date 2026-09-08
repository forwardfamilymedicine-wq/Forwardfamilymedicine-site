/**
 * towns.ts
 * Which office is nearest to each town a /local/ page is written for, and a
 * short travel phrase in the practice's voice. 21 of the 24 towns have no
 * `locations` entry of their own, so PracticalInfo and the nearest-office
 * physician spotlight read this map instead.
 *
 * Every figure here was lifted from a travel claim already published on the
 * town's pages (batch 4, stage 1 review). Nothing is estimated: a town with
 * no stated figure has an empty phrase. Opening status is never stated here;
 * it comes from the `locations` collection.
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
}

export const towns: Town[] = [
  { slug: 'ardmore',         name: 'Ardmore',         office: 'wayne',   travel: 'About 6 miles west on Lancaster Avenue, or four to five stops from Ardmore Station to Wayne on the Paoli–Thorndale line.' },
  { slug: 'avondale',        name: 'Avondale',        office: 'malvern', travel: 'About 30–35 minutes from Avondale.', reassigned: true },
  { slug: 'berwyn',          name: 'Berwyn',          office: 'wayne',   travel: 'About 3 miles east on Route 30, or three stops from Berwyn Station to Wayne on the Paoli–Thorndale line.' },
  { slug: 'bryn-mawr',       name: 'Bryn Mawr',       office: 'wayne',   travel: 'About 5 miles west on Lancaster Avenue, or about four stops from Bryn Mawr Station to Wayne on the Paoli–Thorndale line.' },
  { slug: 'chester-springs', name: 'Chester Springs', office: 'malvern', travel: 'About 15–20 minutes via PA-401 east to PA-29 south.' },
  { slug: 'coatesville',     name: 'Coatesville',     office: 'malvern', travel: 'About 25–30 minutes via US-30 east.', reassigned: true },
  { slug: 'concordville',    name: 'Concordville',    office: 'malvern', travel: 'About 15–20 minutes via US-202 north.', reassigned: true },
  { slug: 'devon',           name: 'Devon',           office: 'wayne',   travel: 'About 3 miles east on Route 30, or two stops from Devon Station to Wayne on the Paoli–Thorndale line.' },
  { slug: 'downingtown',     name: 'Downingtown',     office: 'malvern', travel: 'About 15–18 minutes via US-30 east.', reassigned: true },
  { slug: 'exton',           name: 'Exton',           office: 'malvern', travel: 'About 10 minutes via local routes.' },
  { slug: 'glen-mills',      name: 'Glen Mills',      office: 'malvern', travel: 'About 15–18 minutes via US-202 north to Boot Road.', reassigned: true },
  { slug: 'haverford',       name: 'Haverford',       office: 'wayne',   travel: 'About 5–6 miles west on Lancaster Avenue, or four to five stops from Haverford Station to Wayne on the Paoli–Thorndale line.' },
  { slug: 'kennett-square',  name: 'Kennett Square',  office: 'malvern', travel: 'About 25–30 minutes from Kennett Square.', reassigned: true },
  { slug: 'king-of-prussia', name: 'King of Prussia', office: 'wayne',   travel: 'About 7 miles south via Route 202, roughly 15–20 minutes depending on traffic. No direct rail, so telehealth suits routine care.' },
  { slug: 'lionville',       name: 'Lionville',       office: 'malvern', travel: 'About 10–12 minutes via PA-100 south.' },
  { slug: 'malvern',         name: 'Malvern',         office: 'malvern', travel: '' },
  { slug: 'media',           name: 'Media',           office: 'wayne',   travel: 'About 12 miles north via Route 252, roughly 25–30 minutes. The Media/Elwyn line does not connect to Wayne, so telehealth suits routine care.' },
  { slug: 'newtown-square',  name: 'Newtown Square',  office: 'wayne',   travel: 'About 7–8 miles north via Route 252, roughly 18–22 minutes. No direct rail, so telehealth suits routine care.' },
  { slug: 'paoli',           name: 'Paoli',           office: 'wayne',   travel: 'About 6 miles east on Route 30, or about six stops from Paoli Station to Wayne on the Paoli–Thorndale line.' },
  { slug: 'phoenixville',    name: 'Phoenixville',    office: 'malvern', travel: 'About 12–15 minutes via PA-29 south.' },
  { slug: 'radnor',          name: 'Radnor',          office: 'wayne',   travel: 'Our Wayne office is within Radnor Township, about 10 minutes from most Radnor neighborhoods.' },
  { slug: 'villanova',       name: 'Villanova',       office: 'wayne',   travel: 'About 1 mile from Villanova, or one stop from Villanova Station to Wayne on the Paoli–Thorndale line.' },
  { slug: 'wayne',           name: 'Wayne',           office: 'wayne',   travel: 'Our office is on Old Eagle School Road, about half a mile from Wayne Station on the Paoli–Thorndale line.' },
  { slug: 'west-chester',    name: 'West Chester',    office: 'west-chester', travel: '' },
];

export function findTown(slug: string): Town | undefined {
  return towns.find(t => t.slug === slug);
}
