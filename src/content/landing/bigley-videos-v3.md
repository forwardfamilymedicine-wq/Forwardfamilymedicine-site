---
# The third version behind Dr. Bigley's video ads, from the brief of
# 2026-11-27: v2's structure, form and founder note, a new hero line, a short
# contrast of traditional primary care and this practice under the hero, the
# offices from the locations collection after the FAQ. Every claim is one the
# site already makes; the hero lines, the contrast, the benefits and Dr.
# Lieberman's Navy sentence are drafts for David (see todo). The founder note
# (the body), the FAQ, the credentials, the focus tags, Dr. Landi's bio and
# the form copy are v2's, word for word. /lp/v1/ and /lp/v2/ are untouched.
cards:
  - physician: brian-landi-do
    credentials:
      - "Board Certified, American Osteopathic Board of Family Physicians"
      - "Menopause Society certification (MSCP)"
    bio: "Dr. Landi is a board-certified family physician who served as Chief Resident during his training at ChristianaCare. He believes good medicine starts with time, attention, and trust, and is particularly passionate about helping patients navigate midlife health and menopause with thoughtful, evidence-based care."
    focus:
      - "Midlife health"
      - "Menopause"
      - "Comprehensive primary care"
  - physician: philip-lieberman-md
    credentials:
      - "Board Certified, American Board of Family Medicine"
      - "Diplomate, American Board of Lifestyle Medicine"
    bio: "Dr. Lieberman is board-certified in both Family Medicine and Lifestyle Medicine. With a background in Culinary Arts and Nutrition Science, and after serving as a primary care physician in the U.S. Navy, he brings a practical, whole-person approach to helping patients improve their health and build lasting habits."
    focus:
      - "Lifestyle Medicine"
      - "Nutrition"
      - "Prevention"
      - "Comprehensive primary care"
# The URL: /lp/v3/. Opaque on purpose; change it here and nowhere else.
code: v3
# No one physician: the GA4 `physician` parameter of lp_view is "team".
physicianKey: team
topic: bigley-video-ad
# The sheet's source. GA4 gets the page code, v3.
source: lp-bigley-videos-v3
# No office fixed: the form offers Wayne or Malvern, the footer and the
# offices block list both.
# Draft: renders on `astro dev` only until David approves every todo item.
draft: true
todo:
  - "Headline: draft, for David to approve."
  - "Supporting line: draft, for David to approve."
  - "Comparison under the hero: draft, from the site's own wording (About, Careers, Menopause, Services, Concierge pages), for David to approve. 'Feeling like a number' is not on the site, so the third pair is panel size."
  - "Membership benefits: draft, reworded from the Membership and FAQ pages as answers to the comparison, for David to approve."
  - "Dr. Lieberman's bio: v2's text with the Navy wording from his bio page ('serving as a primary care physician in the U.S. Navy'), for David to approve."
hero:
  headline: "Primary care without the rush, the copays, or the insurance billing."
  supporting: "Dr. Bigley's panel is currently full. Dr. Brian Landi in Malvern and Dr. Philip Lieberman in Wayne are accepting new members now, with the same membership and the same philosophy of unhurried care from a physician who knows you."
  ctaLabel: "Schedule a Free Meet & Greet"
  # Dr. Bigley's portrait from the providers collection, compact; the role
  # line is the caption's second line.
  portrait:
    physician: david-bigley-do
    role: "Founder, Forward Family Medicine"
# The body is Dr. Bigley's note (v2's), in the hero under the button.
noteFrom: david-bigley-do
notePlacement: hero
contrast:
  them:
    label: "Traditional primary care"
    items:
      - "Rushed visits, often less than fifteen minutes."
      - "Copays, insurance billing, and unpredictable bills."
      - "Panels of 2,000 to 3,000 patients per doctor."
  us:
    label: "Forward Family Medicine"
    items:
      - "Visits of one to two hours, with no clock watching."
      - "One flat monthly membership, with no copays and no insurance billing."
      - "Panels capped at about 250 patients, so your physician knows you by name and history."
cardsHeading: "Choose the physician you'd like to work with."
cardsLead: "Dr. Bigley founded Forward Family Medicine and his panel is full, so you'll choose between Dr. Landi and Dr. Lieberman."
# The membership section keeps the template's heading and price line (both
# from src/data/membershipPricing.ts); the benefits answer the comparison.
membership:
  benefits:
    - "Visits of one to two hours."
    - "Unlimited office visits with no copays and no insurance billing."
    - "Same-day and next-day appointments."
    - "Direct phone, text, and email access to your physician."
    - "Telehealth by phone and video."
    - "Preventive care, chronic disease management, and Lifestyle Medicine."
  separate: "Labs, imaging, and medications are separate expenses."
# Wayne and Malvern after the FAQ, from the locations collection.
locations: true
faqs:
  - q: "Is Dr. Bigley accepting new patients?"
    a: "Dr. Bigley's patient panel is currently full, and he is not accepting new memberships at this time. However, Dr. Brian Landi in Malvern and Dr. Philip Lieberman in Wayne are welcoming new patients. Both practice within the same Direct Primary Care model and share the philosophy behind Forward Family Medicine."
  - q: "What happens at the meet and greet?"
    a: "You'll have a free, approximately 60-minute conversation with your prospective physician, either in person at our Wayne or Malvern office or by video. It's an opportunity to get to know each other, ask questions, and understand how membership works. There is no obligation to join."
  - q: "What does the membership include?"
    a: "Your membership includes unlimited office visits with no copays, longer appointments, direct access to your physician by phone, text, and secure messaging, preventive care, chronic disease management, telehealth, and coordination with specialists. Lifestyle Medicine is also integrated into our approach to primary care. Labs, imaging, and medications are separate expenses, with labs at wholesale pricing and medications at cost."
  - q: "Can I contact my doctor between visits?"
    a: "Yes. Members have direct access to their own physician by phone, text, and secure messaging. You won't have to navigate an answering service or a traditional nurse triage line to reach your primary care physician."
form:
  heading: "Find out whether Forward Family Medicine is right for you."
  subline: "Meet your prospective physician, learn how membership works, and ask anything that's on your mind. It's a relaxed conversation with no pressure or commitment."
  skipChooser: false
  lockOffice: false
  physicianChoice: true
  stepperCall: true
seo:
  title: "Free Meet & Greet | Forward Family Medicine"
  description: "A free 60-minute meet and greet at our Wayne or Malvern office, with no obligation."
---

I started Forward Family Medicine because I believe good primary care takes time: time to listen, think carefully, and understand the person behind the symptoms. I'm proud to work alongside Dr. Brian Landi and Dr. Philip Lieberman, who share that philosophy and the commitment to giving patients the kind of thoughtful, personalized care that inspired me to build FFM.
