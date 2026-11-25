---
# The page behind Dr. Bigley's video ads, second version, from David's spec
# of 2026-11-24: his own words carry the trust in him over to Dr. Landi and
# Dr. Lieberman, who are accepting new patients. The copy is David's; every
# benefit and FAQ claim was checked against the Membership page, the FAQ and
# the meet and greet pages. The credential lines are the providers
# collection's, not the spec's "Family Medicine | ..." lines, and Dr. Landi's
# second line is written as a certification (never "practitioner").
# /lp/v1/ is untouched; this entry is its own page.
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
    bio: "Dr. Lieberman is board-certified in both Family Medicine and Lifestyle Medicine. With a background in Culinary Arts and Nutrition Science and experience as a U.S. Navy primary care physician, he brings a practical, whole-person approach to helping patients improve their health and build lasting habits."
    focus:
      - "Lifestyle Medicine"
      - "Nutrition"
      - "Prevention"
      - "Comprehensive primary care"
# The URL: /lp/v2/. Opaque on purpose; change it here and nowhere else.
code: v2
# No one physician: the GA4 `physician` parameter of lp_view is "team".
physicianKey: team
topic: bigley-video-ad
# The sheet's source. GA4 gets the page code, v2.
source: lp-bigley-videos-v2
# No office fixed: the form offers Wayne or Malvern, and the footer lists both.
# Draft: renders on `astro dev` only until David approves the built page.
draft: true
todo:
  - "David's review of the built page. The cards heading is his wording as written."
  - "Credential lines are the providers collection's, not the spec's 'Family Medicine | ...' lines; Dr. Landi's second line reads 'Menopause Society certification (MSCP)'."
hero:
  headline: "Primary care with more time, more attention, and a physician who knows you."
  supporting: "I founded Forward Family Medicine to offer a more personal kind of primary care. While I'm not currently accepting new patients, Dr. Brian Landi in Malvern and Dr. Philip Lieberman in Wayne are welcoming new members and share the philosophy that shaped this practice."
  ctaLabel: "Schedule a Free Meet & Greet"
  # Dr. Bigley's portrait from the providers collection, compact; the role
  # line is the caption's second line.
  portrait:
    physician: david-bigley-do
    role: "Founder, Forward Family Medicine"
# The body is Dr. Bigley's note, in the hero beside his portrait.
noteFrom: david-bigley-do
notePlacement: hero
cardsHeading: "Choose the physician you'd like to work together with."
membership:
  heading: "Primary care without the usual barriers."
  intro: "One predictable monthly membership gives you ongoing access to your physician without copays, insurance billing, or the pressure of fitting everything into a short appointment."
  benefits:
    - "Unlimited office visits with no copays."
    - "Longer appointments, often one to two hours."
    - "Direct phone, text, and secure messaging with your physician."
    - "Access to same-day and next-day appointments."
    - "Preventive and chronic disease management."
    - "Telehealth and specialist coordination."
    - "Lifestyle Medicine integrated into primary care."
  separate: "Labs, imaging, and medications are separate expenses."
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
seo:
  title: "Free Meet & Greet | Forward Family Medicine"
  description: "A free 60-minute meet and greet at our Wayne or Malvern office, with no obligation."
---

I started Forward Family Medicine because I believe good primary care takes time: time to listen, think carefully, and understand the person behind the symptoms. I'm proud to work alongside Dr. Brian Landi and Dr. Philip Lieberman, who share that philosophy and the commitment to giving patients the kind of thoughtful, personalized care that inspired me to build FFM.
