/**
 * reviews.ts
 * The one place a patient review's text is read. Every page that quotes a
 * review (homepage marquee, physician profiles, Lifestyle Medicine, Menopause,
 * the Wayne concierge page) asks for it here by reviewer initials, so a quote
 * has a single copy in src/data/reviews.json.
 *
 * Rule for a quote's text: it may leave out text only at a sentence boundary at
 * its start or end (no ellipsis needed there); any omission inside it is marked
 * with "…". Typo fixes only otherwise.
 */
import reviews from '../data/reviews.json';

export interface Review { who: string; text: string }
export const allReviews = reviews as Review[];

export function reviewBy(who: string): Review {
  const r = allReviews.find(x => x.who === who);
  if (!r) throw new Error(`[reviews] no review from ${who} in src/data/reviews.json.`);
  return r;
}
