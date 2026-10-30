/**
 * physicianSchema.ts
 * Each physician's structured data, built from the providers and locations
 * collections. A physician is an IndividualPhysician whose full node lives on
 * their bio page under a stable @id; other pages refer to that node rather than
 * repeating it. Collections are read here, not in a layout (see
 * practiceSchema.ts).
 */
import { getCollection, type CollectionEntry } from 'astro:content';
import { getImage } from 'astro:assets';
import { SITE_URL, ORG_ID, isListedOffice, officeRef, postalAddress } from './practiceSchema';
import { getAvailability } from './availability';

type Provider = CollectionEntry<'providers'>;

export const bioUrl = (slug: string) => `${SITE_URL}/meet-the-team/${slug}/`;
export const physicianId = (slug: string) => `${bioUrl(slug)}#physician`;

/** The bio-page headshot's sizes. The page renders it with these; structured data points at the largest. */
export const HEADSHOT = { width: 320, widths: [320, 640, 960], format: 'webp' as const, quality: 82 };

/** An award in its own words, "Organization Name, Year". Never paraphrased. */
export const awardLabel = (a: { organization: string; name: string; year: number }) => `${a.organization} ${a.name}, ${a.year}`;

// Collection specialty -> schema.org MedicalSpecialty member. A specialty with
// no member here (Lifestyle Medicine, Menopause Care, Direct Primary Care) goes
// to knowsAbout, as written.
const MEDICAL_SPECIALTY: Record<string, string> = { 'Family Medicine': 'PrimaryCare' };

/** The largest headshot the bio page serves, as an absolute URL. */
export async function headshotUrl(photo: ImageMetadata) {
  const img = await getImage({ src: photo, ...HEADSHOT });
  return `${SITE_URL}${img.srcSet.values.at(-1)?.url ?? img.src}`;
}

// Credentials exactly as the collection has them. A board specialty that no
// listed certification covers is named from boardStatus, with no issuer: the
// collection gives none.
function credentials(d: Provider['data']) {
  const certs = d.additionalCertifications;
  const covered = (s: string) => certs.some(c => c.name.includes(s) || c.organization.includes(s));
  return [
    ...certs.map(c => ({
      "@type": "EducationalOccupationalCredential",
      "name": c.name,
      "recognizedBy": { "@type": "Organization", "name": c.organization },
    })),
    ...(d.boardStatus === 'board-certified' ? d.boardSpecialties.filter(s => !covered(s)) : []).map(s => ({
      "@type": "EducationalOccupationalCredential",
      "name": `Board-Certified, ${s}`,
    })),
  ];
}

/** The physician's full node, for their bio page. */
export async function physicianNode(p: Provider) {
  const d = p.data;
  const locations = await getCollection('locations');
  // Offices the physician practises at now: a planned office is left out.
  const offices = d.locations
    .map(slug => locations.find(l => l.data.slug === slug))
    .filter((l): l is CollectionEntry<'locations'> => !!l && isListedOffice(l));
  const specialties = [...new Set(d.specialties.filter(s => s in MEDICAL_SPECIALTY).map(s => MEDICAL_SPECIALTY[s]))];
  const knowsAbout = d.specialties.filter(s => !(s in MEDICAL_SPECIALTY));
  const addresses = offices.map(postalAddress);
  return {
    "@context": "https://schema.org",
    "@type": "IndividualPhysician",
    "@id": physicianId(d.slug),
    "name": `${d.name}, ${d.credentials}`,
    "url": bioUrl(d.slug),
    ...(d.photo ? { "image": await headshotUrl(d.photo) } : {}),
    ...(specialties.length > 0 ? { "medicalSpecialty": specialties.length === 1 ? specialties[0] : specialties } : {}),
    ...(knowsAbout.length > 0 ? { "knowsAbout": knowsAbout } : {}),
    "hasCredential": credentials(d),
    "practicesAt": offices.map(officeRef),
    ...(addresses.length > 0 ? { "address": addresses.length === 1 ? addresses[0] : addresses } : {}),
    "isAcceptingNewPatients": getAvailability(d).status === 'accepting',
    "memberOf": { "@id": ORG_ID },
    ...(d.awards.length > 0 ? { "award": d.awards.map(awardLabel) } : {}),
    ...(d.npi ? { "identifier": { "@type": "PropertyValue", "propertyID": "NPI", "value": d.npi } } : {}),
    ...(d.sameAs.length > 0 ? { "sameAs": d.sameAs } : {}),
  };
}

/** A reference to the physician's node on their bio page: identity only, no details repeated. */
export function physicianRef(p: Provider) {
  const d = p.data;
  return {
    "@context": "https://schema.org",
    "@type": "IndividualPhysician",
    "@id": physicianId(d.slug),
    "name": `${d.name}, ${d.credentials}`,
    "url": bioUrl(d.slug),
  };
}
