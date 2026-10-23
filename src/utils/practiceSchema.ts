/**
 * practiceSchema.ts
 * The practice's structured data, built from the `locations` collection so
 * every page tells search engines the same thing about the same offices.
 *
 * The practice is one MedicalOrganization with no address of its own: it is
 * not one place. Each office is a MedicalClinic with its own @id, address,
 * coordinates, phone and hours, linked to the practice with
 * parentOrganization / subOrganization. Only an open office with a street
 * address is listed, so a planned office never appears and a new office
 * appears by itself once its status is "open".
 */
import { getCollection, type CollectionEntry } from 'astro:content';
import { PRACTICE_EMAIL, PRACTICE_FAX } from './localCompose';

type Location = CollectionEntry<'locations'>;

export const SITE_URL = 'https://www.forwardfamilymedicine.com';
export const ORG_ID = `${SITE_URL}/#organization`;
export const officeId = (slug: string) => `${SITE_URL}/locations/${slug}/#office`;

export const isListedOffice = (l: Location) => l.data.status === 'open' && l.data.addressStreet.trim().length > 0;

/** A reference to a listed office's node, which the site-wide graph on the same page defines. */
export function officeRef(l: Location) {
  if (!isListedOffice(l)) throw new Error(`[practiceSchema] locations/${l.data.slug} is not an open office with a street address.`);
  return { "@id": officeId(l.data.slug) };
}

const e164 = (phone: string) => `+1${phone.replace(/\D/g, '').replace(/^1(?=\d{10}$)/, '')}`;

// "7:30 AM" -> "07:30". Structured data wants hh:mm.
function to24h(t: string): string {
  const m = t.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!m) throw new Error(`[practiceSchema] unreadable time "${t}".`);
  const h = (Number(m[1]) % 12) + (m[3].toUpperCase() === 'PM' ? 12 : 0);
  return `${String(h).padStart(2, '0')}:${m[2]}`;
}

// Days with the same hours share one OpeningHoursSpecification.
function openingHours(hours: Location['data']['hours']) {
  const groups = new Map<string, string[]>();
  for (const h of hours) {
    const key = `${to24h(h.open)}-${to24h(h.close)}`;
    groups.set(key, [...(groups.get(key) ?? []), `https://schema.org/${h.day}`]);
  }
  return [...groups].map(([key, days]) => {
    const [opens, closes] = key.split('-');
    return { "@type": "OpeningHoursSpecification", "dayOfWeek": days, "opens": opens, "closes": closes };
  });
}

function officeNode(l: Location) {
  const d = l.data;
  return {
    "@type": "MedicalClinic",
    "@id": officeId(d.slug),
    // The office's Google Business Profile name, exactly.
    "name": d.listingName,
    "url": `${SITE_URL}/locations/${d.slug}/`,
    "parentOrganization": { "@id": ORG_ID },
    ...(d.phone ? { "telephone": e164(d.phone) } : {}),
    "address": {
      "@type": "PostalAddress",
      "streetAddress": d.addressStreet,
      "addressLocality": d.addressCity,
      "addressRegion": d.addressState,
      "postalCode": d.addressZip,
      "addressCountry": "US",
    },
    ...(d.latitude != null && d.longitude != null ? {
      "geo": { "@type": "GeoCoordinates", "latitude": d.latitude, "longitude": d.longitude },
    } : {}),
    ...(d.hours.length > 0 ? { "openingHoursSpecification": openingHours(d.hours) } : {}),
    "medicalSpecialty": "PrimaryCare",
  };
}

// The practice, then each listed office in display order.
function practiceGraph(locations: Location[]) {
  const offices = locations.filter(isListedOffice).sort((a, b) => a.data.displayOrder - b.data.displayOrder);
  // The practice's number is the one its offices share. If they ever differ,
  // the practice-wide number is a decision to make, not one to guess.
  const phones = [...new Set(offices.map(l => l.data.phone).filter(Boolean))];
  if (phones.length > 1) throw new Error(`[practiceSchema] listed offices have different phones (${phones.join(', ')}); choose the practice-wide number.`);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalOrganization",
        "@id": ORG_ID,
        "name": "Forward Family Medicine",
        "url": SITE_URL,
        ...(phones.length === 1 ? { "telephone": e164(phones[0]) } : {}),
        "faxNumber": e164(PRACTICE_FAX),
        "email": PRACTICE_EMAIL,
        "medicalSpecialty": "PrimaryCare",
        "knowsAbout": ["Direct Primary Care", "Lifestyle Medicine", "Concierge Medicine"],
        "subOrganization": offices.map(l => ({ "@id": officeId(l.data.slug) })),
        "sameAs": [],
      },
      ...offices.map(officeNode),
    ],
  };
}

/**
 * The site-wide graph, read from the collection here rather than in
 * MainLayout: a layout that imports astro:content itself changes the order of
 * every page's stylesheets in <head>.
 */
export async function sitePracticeGraph() {
  return practiceGraph(await getCollection('locations'));
}
