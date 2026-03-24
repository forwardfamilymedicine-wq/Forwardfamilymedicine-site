/**
 * physicians.ts
 * Structured physician data used in PhysicianSchema.astro and
 * About page components. Keep in sync with Google Business Profile
 * and NPI registry information.
 */

import { SITE } from "./siteConfig";

export interface Physician {
  id: string;
  name: string;
  givenName: string;
  familyName: string;
  honorificPrefix: string;
  jobTitle: string;
  description: string;
  medicalSpecialty: string[];
  boardCertification: string[];
  medicalEducation: {
    degree: string;
    institution: string;
    year?: string;
  }[];
  residency?: {
    program: string;
    institution: string;
    year?: string;
  };
  fellowship?: {
    program: string;
    institution: string;
    year?: string;
  };
  memberOf: string[];
  npi?: string;                    // National Provider Identifier
  image: {
    url: string;
    width: number;
    height: number;
    alt: string;
  };
  sameAs: string[];                // LinkedIn, Doximity, etc.
  telephone: string;
  email: string;
  worksAt: string;                 // URL of practice
}

export const physicians: Physician[] = [
  {
    id: "david-bigley",
    name: "Dr. David Bigley",
    givenName: "David",
    familyName: "Bigley",
    honorificPrefix: "Dr.",
    jobTitle: "Family Medicine Physician",
    description:
      "Dr. David Bigley is a board-certified family medicine physician and founder of Forward Family Medicine, a Direct Primary Care practice in Wayne, PA. He specializes in preventive care, holistic medicine, lifestyle medicine, and chronic disease management.",
    medicalSpecialty: [
      "Family Medicine",
      "Lifestyle Medicine",
      "Holistic Medicine",
      "Preventive Medicine",
    ],
    boardCertification: [
      "American Osteopathic Board of Family Physicians",
    ],
    medicalEducation: [
      {
        degree: "Doctor of Osteopathic Medicine (DO)",
        institution: "Philadelphia College of Osteopathic Medicine",   
        year: "2021",
      },
    ],
    residency: {
      program: "Family Medicine Residency",
      institution: "Christiana Care Family Medicine Residency",  
      year: "2024",
    },
    memberOf: [
      "American Academy of Family Physicians (AAFP)",
      "American College of Lifestyle Medicine (ACLM)",
      "Pennsylvania Medical Society"
      "Direct Primary Care Alliance (DPCA)",
    ],
    npi: "109-339-1021",
    image: {
      url: "https://forwardfamilymedicine.com/images/dr-david-bigley.jpg",
      width: 800,
      height: 800,
      alt: "Dr. David Bigley — Family Medicine Physician, Forward Family Medicine Wayne PA",
    },
    sameAs: [
      // "https://www.linkedin.com/in/david-bigley-00144b316",
      // "https://www.doximity.com/pub/david-bigley-do-254097bd",
    ],
    telephone: SITE.phone,
    email: SITE.email,
    worksAt: SITE.url,
  },
  {
    id: "philip-lieberman",
    name: "Dr. Philip Lieberman",
    givenName: "Philip",
    familyName: "Lieberman",
    honorificPrefix: "Dr.",
    jobTitle: "Family Medicine Physician",
    description:
      "Dr. Philip Lieberman is a board-certified family medicine physician at Forward Family Medicine, a Direct Primary Care practice in Wayne, PA. He focuses on relationship-based primary care, lifestyle medicine, and whole-person health.",
    medicalSpecialty: [
      "Family Medicine",
      "Lifestyle Medicine",
      "Preventive Medicine",
    ],
    boardCertification: [
      "American Board of Family Medicine",
      "American Board of Lifestyle Medicine", 
    ],
    medicalEducation: [
      {
        degree: "Doctor of Medicine (MD)",
        institution: "Thomas Jefferson University ",   
        year: "[Year]",
      },
    ],
    residency: {
      program: "Family Medicine Residency",
      institution: "Abington Family Medicine Residency",    
      year: "2026",
    },
    memberOf: [
      "American Academy of Family Physicians (AAFP)",
      "American College of Lifestyle Medicine (ACLM)",
      "Direct Primary Care Alliance (DPCA)",
    ],
    npi: "166-997-9316",
    image: {
      url: "https://forwardfamilymedicine.com/images/dr-philip-lieberman.jpg",
      width: 800,
      height: 800,
      alt: "Dr. Philip Lieberman — Family Medicine Physician, Forward Family Medicine Wayne PA",
    },
    sameAs: [
      // "https://www.linkedin.com/in/philip-lieberman-8835a9298",
    ],
    telephone: SITE.phone,
    email: SITE.email,
    worksAt: SITE.url,
  },
];

/** Convenience lookup by ID */
export function getPhysician(id: string): Physician | undefined {
  return physicians.find((p) => p.id === id);
}
