/**
 * attribution.ts
 * First-party ad attribution: what the site remembers about how a visitor
 * arrived, where it is kept, and for how long. Read by
 * src/components/Attribution.astro (the inline capture script in both layouts)
 * and src/components/shared/MeetGreetForm.astro (the hidden fields and the
 * payload keys). Nothing here reaches a third party: the values go to the
 * practice's own Meet & Greet sheet with the form, and nowhere else.
 */

/**
 * THE ONE SWITCH. When the stored record may be written:
 *   'necessary'  Option A of the privacy draft: kept as a strictly necessary,
 *                first-party record of how an inquiry reached the practice,
 *                disclosed in the privacy policy, written whether or not the
 *                analytics banner has been answered.
 *   'consent'    Option B: written only once the visitor has accepted the
 *                analytics banner (cookie ffm_consent = accepted). Until then
 *                the values from the current URL still reach a form on the
 *                same page; they are just not remembered for a later one.
 * Counsel decides. Change this value and nothing else.
 */
export const ATTR_STORAGE: 'necessary' | 'consent' = 'necessary';

/** localStorage key of the stored record. */
export const ATTR_KEY = 'ffm_attr';

/** Days a stored record stands before a new arrival may replace it (first touch). */
export const ATTR_TTL_DAYS = 30;

/** Query parameters captured from the URL, in sheet order. */
export const ATTR_URL_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid', 'gclid'] as const;

/**
 * Hidden fields the form carries and the keys the payload sends, in sheet
 * order (intake columns R to Y of the Meet & Greet Requests tab). The first
 * seven are the URL parameters; the last two are where the visitor first
 * landed with them and the referrer of that first page view.
 */
export const ATTR_FIELDS = [...ATTR_URL_PARAMS, 'landing_page', 'first_referrer'] as const;
export type AttrField = (typeof ATTR_FIELDS)[number];

/**
 * Kept in the stored record but outside ATTR_FIELDS, so the hidden fields and
 * columns R to Y stay as they are: the landing entry's form source
 * ("lp-...") and the physician code its form books with (BL or PL), written
 * only when a record is written at all (an ad parameter was present) and
 * only from a landing page; empty strings otherwise. The main-site form fills
 * its own source and physician from them (MeetGreetForm.astro), so an inquiry
 * that starts on a landing page and ends on /contact/ reaches the sheet under
 * the landing page's source. The topic is never stored.
 */
export const ATTR_LP_FIELDS = ['lp_source', 'lp_physician'] as const;
