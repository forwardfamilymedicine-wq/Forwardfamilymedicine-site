/**
 * localRollout.ts
 * Which markdown /local/ entries render through the composed editorial path.
 * Temporary: batch 4 moves the pages over in waves, and everything not listed
 * here keeps the generic markdown path unchanged. Delete this file and the
 * generic path together when the last wave lands.
 */
const WAVE_1 = [
  'direct-primary-care-wayne-pa',
  'lifestyle-medicine-wayne-pa',
  'concierge-doctor-ardmore-pa',
  'concierge-doctor-avondale-pa',
  'lifestyle-medicine-devon-pa',
];

export function isComposed(slug: string): boolean {
  return slug.startsWith('menopause-') || WAVE_1.includes(slug);
}
