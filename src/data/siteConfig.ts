/**
 * siteConfig.ts
 * Central source of truth for site-wide constants used across SEO components,
 * schema markup, and page templates. Update here; it propagates everywhere.
 */

export const SITE = {
  name: "Forward Family Medicine",
  tagline: "Direct Primary Care on the Philadelphia Main Line",
  url: "https://www.forwardfamilymedicine.com",
  description:
    "Forward Family Medicine is a Direct Primary Care practice in Wayne, PA serving patients across the Philadelphia Main Line with same-day access, direct physician contact, and lifestyle medicine-integrated care.",

  // Contact
  phone: "[PHONE]",                   // e.g. "+16105551234"
  phoneDisplay: "[(610) 555-1234]",   // Human-readable
  email: "[EMAIL]",

  // Address (NAP — must match Google Business Profile exactly)
  address: {
    street: "295 Old Eagle School Road",
    city: "Wayne",
    state: "PA",
    zip: "19087",
    country: "US",
    full: "295 Old Eagle School Road, Wayne, PA 19087",
  },

  // Geo coordinates for MedicalClinic schema
  geo: {
    latitude: 40.0631,    // approximate — replace with exact
    longitude: -75.4056,  // approximate — replace with exact
  },

  // Opening hours (ISO 8601 format for schema)
  openingHours: [
    "Mo-Fr 08:00-17:00",
    // Add telehealth hours if different
  ],

  // Practice metadata
  medicalSpecialty: "Family Medicine",
  priceRange: "$$",           // LocalBusiness schema
  currenciesAccepted: "USD",
  paymentAccepted: "Membership fee, credit card, HSA/FSA for eligible services",

  // Social profiles (used in sameAs arrays)
  social: {
    linkedin: "",   // Add when available
    facebook: "",
    instagram: "",
    twitter: "",
  },

  // Images
  logo: {
    url: "https://www.forwardfamilymedicine.com/logo.png",
    width: 2411,
    height: 1071,
    alt: "Forward Family Medicine logo",
  },

  clinicImage: {
    url: "https://www.forwardfamilymedicine.com/images/clinic-exterior.jpg",
    width: 1200,
    height: 630,
    alt: "Forward Family Medicine clinic in Wayne, PA",
  },

  // Default OG image for pages without a specific image
  defaultOGImage: {
    url: "https://www.forwardfamilymedicine.com/logo.png",
    width: 2411,
    height: 1071,
    alt: "Forward Family Medicine — Direct Primary Care in Wayne, PA",
  },

  // Ahrefs/Google Search Console verification (add when available)
  verificationMeta: {
    google: "",
    bing: "",
  },
} as const;

export const COLLECTIONS = {
  pages: "pages",
  blog: "blog",
  seo: "seo",
  local: "local",
  lifestyle: "lifestyle",
} as const;
