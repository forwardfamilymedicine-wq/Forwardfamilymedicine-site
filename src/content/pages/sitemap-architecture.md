---
title: "Site Architecture & Sitemap — Forward Family Medicine"
description: "Internal planning document: URL structure, H1/H2 outlines, schema types, and internal linking map for the Forward Family Medicine Astro site."
date: "2026-01-01"
author: "Forward Family Medicine"
schemaType: "none"
draft: true
---

# Site Architecture & Sitemap
> **Developer note:** This is an internal planning document. Set `draft: true` and exclude from sitemap and page generation.

---

## URL Structure Overview

| Page | URL Slug | Priority | Schema Type |
|---|---|---|---|
| Home | `/` | 1.0 | MedicalOrganization |
| About | `/about` | 0.8 | MedicalOrganization + Physician |
| Membership | `/membership` | 0.9 | MedicalOrganization + Offer |
| Direct Primary Care | `/direct-primary-care` | 0.9 | Article + FAQPage |
| Concierge Medicine | `/concierge-medicine` | 0.8 | Article + FAQPage |
| Lifestyle Medicine | `/lifestyle-medicine` | 0.8 | Article + FAQPage |
| Services | `/services` | 0.8 | MedicalOrganization |
| Patient Experience | `/patient-experience` | 0.7 | Article + FAQPage |
| FAQ | `/faq` | 0.8 | FAQPage |
| Become a Patient | `/become-a-patient` | 0.9 | MedicalOrganization |
| Blog Index | `/blog` | 0.7 | Blog |
| Blog Posts | `/blog/[slug]` | 0.6–0.8 | BlogPosting / Article |

---

## Page H1 / H2 Outlines

### `/` — Home
- **H1:** Forward Family Medicine — Primary Care Built Around You
- H2: What We Offer
- H2: How Membership Works
- H2: Services Snapshot
- H2: Why Patients Choose Forward Family Medicine
- H2: Serving Wayne, PA and the Philadelphia Main Line
- H2: Meet Your Doctor
- H2: What Our Members Say
- H2: Frequently Asked Questions

### `/about` — About
- **H1:** About Forward Family Medicine
- H2: Our Story
- H2: Meet Dr. Bigley and Dr. Lieberman
- H2: Meet the Team
- H2: Our Approach to Care
- H2: Our Practice Philosophy
- H2: Why Wayne, PA?
- H2: Frequently Asked Questions

### `/membership` — Membership
- **H1:** Membership at Forward Family Medicine
- H2: What Membership Includes
- H2: Membership Tiers
- H2: How Membership Works
- H2: Membership vs. Traditional Insurance
- H2: Is Membership Tax-Deductible?
- H2: Why Patients Choose Membership
- H2: Frequently Asked Questions

### `/direct-primary-care` — DPC Explainer
- **H1:** What Is Direct Primary Care?
- H2: The Short Answer
- H2: Why Does DPC Exist?
- H2: What DPC Covers at Forward Family Medicine
- H2: How DPC Is Different from Traditional Primary Care
- H2: DPC vs. Concierge Medicine
- H2: Do I Still Need Health Insurance?
- H2: Is DPC Right for You?
- H2: DPC on the Philadelphia Main Line
- H2: Frequently Asked Questions

### `/concierge-medicine` — Concierge Medicine
- **H1:** Concierge Medicine in Wayne, PA
- H2: What Is Concierge Medicine?
- H2: Concierge Medicine vs. Direct Primary Care
- H2: The Concierge Experience at Forward Family Medicine
- H2: Who Benefits Most?
- H2: Serving the Philadelphia Main Line
- H2: Frequently Asked Questions

### `/lifestyle-medicine` — Lifestyle Medicine
- **H1:** Lifestyle Medicine at Forward Family Medicine
- H2: What Is Lifestyle Medicine?
- H2: Why Lifestyle Medicine Belongs in Primary Care
- H2: How We Use Lifestyle Medicine
- H2: Conditions We Address
- H2: Our Approach to Nutrition
- H2: Physical Activity as Medicine
- H2: Sleep as a Clinical Priority
- H2: Stress and the Body
- H2: Frequently Asked Questions

### `/services` — Services
- **H1:** Primary Care Services at Forward Family Medicine
- H2: Preventive Care & Wellness
- H2: Acute & Urgent Care
- H2: Chronic Disease Management
- H2: Women's Health
- H2: Men's Health
- H2: Mental Health & Behavioral Health
- H2: Lifestyle Medicine
- H2: Minor In-Office Procedures
- H2: Lab & Diagnostic Testing
- H2: Care Coordination & Referrals
- H2: Telehealth & Remote Care
- H2: Services Not Included
- H2: Frequently Asked Questions

### `/patient-experience` — Patient Experience
- **H1:** The Patient Experience at Forward Family Medicine
- H2: From the First Conversation
- H2: Becoming a Member
- H2: Your First Comprehensive Visit
- H2: Day-to-Day Membership
- H2: Appointments That Feel Different
- H2: For Families
- H2: For People with Chronic Conditions
- H2: Real Member Experiences
- H2: The Difference a Real Relationship Makes
- H2: Frequently Asked Questions

### `/faq` — FAQ
- **H1:** Frequently Asked Questions
- H2: About Forward Family Medicine
- H2: About Direct Primary Care
- H2: Membership & Pricing
- H2: Insurance
- H2: Appointments & Access
- H2: Services & Scope
- H2: Lifestyle Medicine
- H2: Getting Started

### `/become-a-patient` — Become a Patient
- **H1:** Become a Patient at Forward Family Medicine
- H2: How to Get Started
- H2: Membership Plans at a Glance
- H2: What to Expect at Your Meet & Greet
- H2: Transitioning from Another Doctor
- H2: Serving Wayne, PA and the Main Line
- H2: Practice Location & Directions
- H2: For Employers
- H2: Contact Us
- H2: Frequently Asked Questions

---

## Internal Linking Map

### Pages That Receive the Most Internal Links (High Authority Targets)

| Target Page | Links From |
|---|---|
| `/become-a-patient` | All pages (primary CTA) |
| `/membership` | All pages (secondary CTA) |
| `/direct-primary-care` | home, faq, concierge-medicine, blog cluster |
| `/lifestyle-medicine` | home, about, membership, services, faq, blog cluster |
| `/services` | home, membership, direct-primary-care |
| `/faq` | All pages ("have more questions" links) |

### Blog → Pillar Linking Rules
- Lifestyle medicine blog posts → `/lifestyle-medicine`
- DPC explainer posts → `/direct-primary-care`
- Concierge medicine posts → `/concierge-medicine`
- Local Wayne/Main Line posts → `/` (home)
- All blog posts → `/become-a-patient` (CTA)

---

## Image Asset Manifest

All image paths referenced in content files. Replace placeholders with actual files before launch.

### `/src/assets/stock/`
- `home-hero.jpg` — Homepage hero (physician + patient, welcoming)
- `concierge-visit.jpg` — Concierge/patient experience page
- `lifestyle-consult.jpg` — Lifestyle medicine page
- `patient-visit-warmth.jpg` — Patient experience page
- `family-visit.jpg` — Patient experience page (family)
- `og-default.jpg` — Default Open Graph share image (1200×630)

### `/src/assets/staff/`
- `dr-forward-headshot.jpg` — Dr. Bigley and Dr. Lieberman professional headshot
- `dr-forward-office.jpg` — Dr. Bigley and Dr. Lieberman in office setting
- `team-photo.jpg` — Full team photo

### `/src/assets/local/`
- `wayne-pa-main-line.jpg` — Exterior of Wayne, PA downtown or landmark

### `/src/assets/logo/`
- `logo.svg` — Primary logo (SVG preferred)
- `logo-white.svg` — White/inverse logo for dark backgrounds
- `favicon.ico` — Favicon

---

## Astro Route Configuration

Map each content file to its Astro route:

```
src/content/pages/home.md            → pages/index.astro     → /
src/content/pages/about.md           → pages/about.astro     → /about
src/content/pages/membership.md      → pages/membership.astro → /membership
src/content/pages/direct-primary-care.md → pages/direct-primary-care.astro → /direct-primary-care
src/content/pages/concierge-medicine.md  → pages/concierge-medicine.astro  → /concierge-medicine
src/content/pages/lifestyle-medicine.md → pages/lifestyle-medicine.astro   → /lifestyle-medicine
src/content/pages/services.md        → pages/services.astro  → /services
src/content/pages/patient-experience.md → pages/patient-experience.astro  → /patient-experience
src/content/pages/faq.md             → pages/faq.astro       → /faq
src/content/pages/become-a-patient.md → pages/become-a-patient.astro → /become-a-patient
src/content/blog/index.md            → pages/blog/index.astro → /blog
src/content/blog/*.md                → pages/blog/[slug].astro → /blog/[slug]
```
