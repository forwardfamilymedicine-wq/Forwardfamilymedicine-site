---
title: "FAQ JSON-LD Schema Snippets — Top 10 Pages"
description: "Ready-to-implement FAQPage JSON-LD schema for the 10 highest-priority SEO pages. Drop these into SchemaFAQ.astro or directly into page head."
date: "2026-01-01"
draft: true
---

# FAQ JSON-LD Snippets — Top 10 Pages
> **Internal document.** `draft: true`. These are copy-paste ready for `SchemaFAQ.astro`.
> Each snippet maps to a page. Pass the `items` array as props to the component.

---

## 1. `/` — Homepage

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is Direct Primary Care?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Direct Primary Care (DPC) is a membership-based model of primary care in which patients pay a flat monthly fee directly to their physician — with no insurance billing for primary care services. Members receive unlimited visits, direct physician access, and longer appointments. Forward Family Medicine is a DPC practice in Wayne, PA."
      }
    },
    {
      "@type": "Question",
      "name": "What is included in a Forward Family Medicine membership?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Membership includes unlimited primary care visits (in-person, phone, and video), same-day or next-day appointments, direct physician access by phone and text, annual physicals, preventive screenings, chronic disease management, lifestyle medicine counseling, and minor in-office procedures. Labs and medications are available at wholesale pricing."
      }
    },
    {
      "@type": "Question",
      "name": "Do I still need health insurance if I join Forward Family Medicine?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Your DPC membership covers primary care, but you should maintain health insurance for hospital stays, emergency care, specialist visits, and surgery. Most members pair DPC membership with a high-deductible health plan (HDHP) for comprehensive coverage at lower total cost."
      }
    },
    {
      "@type": "Question",
      "name": "How quickly can I get an appointment?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Members typically get same-day or next-day appointments for acute concerns. Many questions are resolved the same day by phone or message without requiring an in-person visit."
      }
    },
    {
      "@type": "Question",
      "name": "How do I get started with Forward Family Medicine?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Schedule a free, no-obligation Meet & Greet with Dr. Bigley and Dr. Lieberman — a 20-minute conversation to ask questions and see if the practice is the right fit. Visit forwardfamilymedicine.com/new-patients to schedule."
      }
    }
  ]
}
```

---

## 2. `/direct-primary-care` — DPC Explainer

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What does 'direct' mean in Direct Primary Care?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "'Direct' refers to the direct financial relationship between patient and physician — you pay your doctor a flat monthly fee directly, without an insurance company in the middle for primary care services. This removes administrative overhead and aligns the physician's incentives with patient health rather than billing volume."
      }
    },
    {
      "@type": "Question",
      "name": "How is Direct Primary Care different from traditional primary care?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In traditional primary care, physicians see 20–30 patients per day because revenue is based on visit volume. In DPC, revenue comes from monthly memberships, so physicians see 8–12 patients per day. This results in same-day access, appointments up to 1–2 hours, direct physician contact, and proactive preventive care."
      }
    },
    {
      "@type": "Question",
      "name": "Is Direct Primary Care the same as concierge medicine?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "They are related but distinct. Both offer smaller patient panels, direct access, and longer visits. DPC does not bill insurance for primary care and typically charges $70–150/month. Traditional concierge medicine may still bill insurance and charges higher annual retainers ($1,500–$6,000+/year)."
      }
    },
    {
      "@type": "Question",
      "name": "Is Direct Primary Care covered by Medicare?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "DPC membership fees are not covered by Medicare. However, Medicare beneficiaries can join a DPC practice as self-pay members. Medicare continues to cover specialist visits, hospital care, and emergency services."
      }
    },
    {
      "@type": "Question",
      "name": "How do I know if Direct Primary Care is right for me?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "DPC works well for patients who value access, relationship, and prevention — especially those with chronic conditions, families, and self-employed individuals. The best way to evaluate fit is a free Meet & Greet with the physician. Schedule one at forwardfamilymedicine.com/new-patients."
      }
    }
  ]
}
```

---

## 3. `/membership` — Membership Page

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What does the Forward Family Medicine membership include?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Membership includes unlimited primary care visits (in-person, phone, video), direct physician access by phone and text, same-day or next-day appointments, annual physicals, preventive screenings, chronic disease management, lifestyle medicine counseling, and minor in-office procedures. Labs and medications are available at wholesale pricing separately."
      }
    },
    {
      "@type": "Question",
      "name": "Are there copays or per-visit fees for members?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Once you are a member, there are no additional charges for covered primary care visits. The only additional costs are for labs, medications, and immunizations — all priced at cost."
      }
    },
    {
      "@type": "Question",
      "name": "Can I use my HSA for the DPC membership fee?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Under current IRS rules, DPC membership fees are generally not HSA-eligible because they are structured as access fees rather than payment for specific medical services. However, separately billed services at DPC practices (labs, medications, procedures) are typically HSA-eligible. Consult a tax advisor for your specific situation."
      }
    },
    {
      "@type": "Question",
      "name": "Is there a long-term commitment?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Forward Family Medicine offers both month-to-month and annual membership options. Month-to-month plans require 30 days' written notice to cancel. Annual plans include a modest discount."
      }
    },
    {
      "@type": "Question",
      "name": "Does Forward Family Medicine offer family plans?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Family plans are available covering two adults and children. Having one physician who knows every family member is one of the key benefits of a DPC practice. Contact us for family plan pricing."
      }
    }
  ]
}
```

---

## 4. `/faq` — FAQ Page

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is Forward Family Medicine?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Forward Family Medicine is a Direct Primary Care (DPC) practice in Wayne, PA. Members pay a flat monthly fee and receive unlimited primary care visits, direct physician access, same-day appointments, and wholesale lab pricing — with no copays or insurance billing for covered services."
      }
    },
    {
      "@type": "Question",
      "name": "Is Direct Primary Care legal?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Direct Primary Care is legal in all 50 states. Many states have passed specific legislation affirming that DPC membership agreements are not insurance products and do not require an insurance license to operate."
      }
    },
    {
      "@type": "Question",
      "name": "How many patients does the physician see per day?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "On a typical day, Dr. Bigley and Dr. Lieberman sees 6–12 patients — compared to 20–30 in a traditional practice. This is what enables longer appointments, same-day access, and genuine follow-through on care."
      }
    },
    {
      "@type": "Question",
      "name": "What happens if I need to see a specialist?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Your DPC physician coordinates specialist referrals, communicates with consulting physicians, and stays in the loop on your care. Specialist visits and procedures are billed separately through your health insurance."
      }
    },
    {
      "@type": "Question",
      "name": "Does Forward Family Medicine see children?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Forward Family Medicine cares for patients of all ages, from newborns through older adults. Children can be added to a parent's family membership plan."
      }
    },
    {
      "@type": "Question",
      "name": "What does a DPC visit cost without insurance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "DPC members pay no per-visit fees. Your monthly membership covers all included primary care visits. For patients without insurance, the DPC membership replaces per-visit charges entirely — and labs are available at wholesale pricing."
      }
    }
  ]
}
```

---

## 5. `/dpc/is-direct-primary-care-worth-it`

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is Direct Primary Care worth it for healthy people?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes — DPC is valuable even for healthy patients. The membership ensures you have same-day access and a physician who knows you when something does come up. Many patients who 'rarely use it' describe the value clearly when an unexpected situation arises. For healthy patients, DPC membership typically costs less than annual primary care copays plus the cost of a single urgent care visit."
      }
    },
    {
      "@type": "Question",
      "name": "What is the biggest financial benefit of DPC?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The biggest financial benefit is predictability combined with wholesale lab pricing. Members know exactly what primary care costs each month — no copay surprises — and labs ordered through a DPC practice typically cost 80–90% less than standard billed rates. Pairing DPC with a high-deductible plan often reduces total annual healthcare costs vs. a traditional PPO."
      }
    },
    {
      "@type": "Question",
      "name": "Is DPC worth it for patients with chronic conditions?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "DPC is especially well-suited to chronic conditions like diabetes, hypertension, and thyroid disease. Unlimited visits mean ongoing management is genuinely accessible, and the direct physician relationship allows for faster medication adjustments, proactive monitoring, and lifestyle support — all without additional per-visit charges."
      }
    }
  ]
}
```

---

## 6. `/patient-experience/why-are-doctor-visits-only-10-minutes`

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Why are primary care visits so short?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Primary care visit times are short because insurance-based practices must see 20–30 patients per day to cover overhead costs. With Medicare and insurance reimbursement averaging $70–90 per visit, physicians need high visit volume to sustain the practice financially. This structural constraint limits appointments to 10–15 minutes on average."
      }
    },
    {
      "@type": "Question",
      "name": "How does Direct Primary Care give physicians more time with patients?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In a DPC practice, revenue comes from monthly membership fees rather than per-visit billing. This allows the physician to maintain a smaller patient panel (400–600 vs. 2,000+) and see 8–12 patients per day instead of 25+. The result is structurally more time per patient — typically 1–2 hours when needed."
      }
    },
    {
      "@type": "Question",
      "name": "What is a normal appointment length at a DPC practice?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "At a DPC practice like Forward Family Medicine, appointments are scheduled to fit the clinical need — not a billing clock. A simple medication refill might take 10–15 minutes; a new diagnosis or complex chronic disease review might take 45–60 minutes. The physician decides the appropriate length, not the schedule template."
      }
    }
  ]
}
```

---

## 7. `/lifestyle-medicine` — Lifestyle Medicine Pillar

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is lifestyle medicine?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Lifestyle medicine is a branch of conventional medicine that uses evidence-based behavioral interventions — changes in nutrition, physical activity, sleep, stress management, social connection, and avoidance of risky substances — as clinical tools to prevent and treat chronic disease. It is practiced by licensed physicians using the same evidence standards as any medical specialty."
      }
    },
    {
      "@type": "Question",
      "name": "Is lifestyle medicine included in Forward Family Medicine's DPC membership?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Lifestyle medicine counseling is integrated into every Forward Family Medicine membership at no additional cost. Nutrition, physical activity, sleep, and stress management are addressed as clinical tools in every patient's care plan."
      }
    },
    {
      "@type": "Question",
      "name": "Can lifestyle changes replace medication for chronic diseases?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For some patients with some conditions — particularly prediabetes, mild hypertension, and early metabolic syndrome — lifestyle interventions can achieve results comparable to or better than medication. For others, lifestyle and medication work together. A lifestyle medicine physician doesn't withhold needed medication, but treats behavioral intervention as first-line where evidence supports it."
      }
    },
    {
      "@type": "Question",
      "name": "What conditions does lifestyle medicine help with?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Lifestyle medicine is most effective for conditions driven by behavioral factors: type 2 diabetes and prediabetes, hypertension, high cholesterol, obesity and metabolic syndrome, cardiovascular disease prevention, anxiety, insomnia, chronic fatigue, and fatty liver disease. These conditions are strongly influenced by nutrition, physical activity, sleep, and stress."
      }
    }
  ]
}
```

---

## 8. `/concierge-medicine` — Concierge Medicine Pillar

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is concierge medicine?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Concierge medicine (also called boutique medicine or retainer medicine) is primary care in which patients pay a membership or retainer fee for enhanced access to their physician — including smaller patient panels, same-day appointments, longer visits, and direct physician contact. Forward Family Medicine delivers concierge-style care through the Direct Primary Care model at an accessible monthly membership fee."
      }
    },
    {
      "@type": "Question",
      "name": "How much does concierge medicine cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Traditional concierge medicine retainers typically cost $1,500–$6,000+ per year. Direct Primary Care practices, which deliver the same core concierge-style experience, typically charge $70–$150 per month — making the model accessible to a much wider range of patients."
      }
    },
    {
      "@type": "Question",
      "name": "Does concierge medicine accept insurance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Traditional concierge practices sometimes bill insurance for visit services in addition to charging a retainer. DPC-style concierge practices like Forward Family Medicine do not bill insurance for primary care services — the monthly membership fee is the only charge for covered visits."
      }
    }
  ]
}
```

---

## 9. `/lifestyle/can-you-reverse-prediabetes`

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Can prediabetes be reversed?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. The Diabetes Prevention Program (DPP) trial showed that intensive lifestyle intervention — modest weight loss (5–7% of body weight) plus 150 minutes of moderate physical activity per week — reduced progression from prediabetes to type 2 diabetes by 58%. Many patients with prediabetes can return to normal blood sugar levels with sustained lifestyle changes."
      }
    },
    {
      "@type": "Question",
      "name": "How long does it take to reverse prediabetes?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most people see meaningful A1C improvement within 3–6 months of consistent lifestyle changes — weight loss, dietary improvement, and regular physical activity. Returning to the normal A1C range (below 5.7%) depends on starting values and the degree of lifestyle change. Regular lab monitoring tracks progress."
      }
    },
    {
      "@type": "Question",
      "name": "What lifestyle changes reverse prediabetes most effectively?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The most effective interventions for reversing prediabetes are: weight loss (5–7% of body weight), regular aerobic exercise (150 min/week moderate intensity), reduction of refined carbohydrates and ultra-processed foods, and increased dietary fiber. Sleep optimization and stress reduction provide additional metabolic benefit."
      }
    },
    {
      "@type": "Question",
      "name": "Is medication needed to reverse prediabetes?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Medication is not required for most patients with prediabetes. Lifestyle intervention outperforms metformin (the most commonly used medication for prediabetes) in clinical trials — achieving 58% vs. 31% risk reduction in the DPP study. Medication may be added if lifestyle changes alone are insufficient, particularly for patients with higher starting A1C values."
      }
    }
  ]
}
```

---

## 10. `/new-patients` — Conversion Page

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is a doctor Meet and Greet?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A doctor Meet & Greet is a free, 20-minute, no-obligation conversation with the physician where prospective patients can ask questions, learn about the practice and DPC model, and decide if it's the right fit — before committing to membership. Forward Family Medicine offers free Meet & Greets in person or by video."
      }
    },
    {
      "@type": "Question",
      "name": "How do I become a patient at Forward Family Medicine?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The first step is a free Meet & Greet. After that, enrollment takes about 10 minutes online. You'll complete a health history, set up monthly billing, and schedule your first comprehensive visit — typically within 1–2 weeks of enrollment."
      }
    },
    {
      "@type": "Question",
      "name": "Is Forward Family Medicine currently accepting new patients?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes — Forward Family Medicine is currently accepting new members in Wayne, PA. Because the practice intentionally limits its patient panel, prospective patients are encouraged to schedule a Meet & Greet soon."
      }
    },
    {
      "@type": "Question",
      "name": "How long does enrollment take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Online enrollment takes approximately 10 minutes. Your first comprehensive visit is typically scheduled within 1–2 weeks of enrollment, depending on record transfer timing."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need to bring anything to my first appointment?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bring a list of your current medications and supplements, any recent lab results or medical records you have, and your questions and health concerns. We will have reviewed your submitted health history before you arrive."
      }
    }
  ]
}
```

---

## Implementation Notes

### Using with `SchemaFAQ.astro`
Pass the FAQ items array from the appropriate section above. In Astro:

```astro
---
import SchemaFAQ from '../../components/seo/SchemaFAQ.astro';

const faqs = [
  {
    question: "What is Direct Primary Care?",
    answer: "Direct Primary Care (DPC) is a membership-based model..."
  },
  // ...
];
---
<SchemaFAQ items={faqs} />
```

### Priority Order for Implementation
1. `/faq` — FAQPage schema is the entire point of the page
2. `/` — Homepage FAQs improve AI search answer sourcing
3. `/membership` — High conversion page; FAQ schema boosts SERPs
4. `/direct-primary-care` — Core educational page; FAQ schema captures voice search
5. `/lifestyle-medicine` — Blog traffic driver
6. `/new-patients` — Conversion page; FAQ schema addresses last-minute objections
7. All cluster SEO pages — implement after core pages

### Validation
Test each implementation at:
- Google Rich Results Test: search.google.com/test/rich-results
- Schema.org Validator: validator.schema.org
