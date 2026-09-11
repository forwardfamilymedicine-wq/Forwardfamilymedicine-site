/**
 * localPracticalLabels.ts
 * Allowlists for the hand-typed "Practical Information" block on markdown
 * /local/ pages rendered through the composed path. A label on neither list
 * fails the build rather than being silently dropped. Shared by
 * utils/localCompose.ts and scripts/check-local-content.mjs so the build and
 * the content-preservation check agree on what was deliberately discarded.
 */

/** Supplied by the data layer now, so the hand-typed line is dropped. */
export const DROP_LABELS = [
  'Location', 'Office location', 'Phone', 'Fax', 'Email', 'Office hours', 'Parking',
  'Status', 'Other FFM locations',
  'Primary care location', 'Currently accepting new patients with',
];

/** Town-specific prose with no data home: passed through as extras. Prefix match. */
export const KEEP_LABELS = [
  'Telehealth', 'Distance', 'Drive time', 'SEPTA', 'Closest', 'Also convenient',
  'Also available', 'Wayne option', 'Specialty menopause consultation', 'Chester Valley Trail',
];

/**
 * On the six towns whose real nearest office is West Chester, these lines
 * contradict the Malvern address above them; the town map's travel phrase
 * replaces them.
 */
export const REASSIGNED_DROP = ['Closest', 'Also convenient', 'Also available', 'Wayne option'];

/**
 * Kept labels that describe the drive to the assigned office. They render
 * ahead of any secondary-office row (see `Town.secondary`), so the block
 * reads assigned office first, other office second, then telehealth.
 */
export const TRAVEL_LABELS = ['Distance', 'Drive time', 'SEPTA', 'Closest', 'Also convenient', 'Also available', 'Wayne option'];

export const labelMatches = (label: string, list: string[]): boolean =>
  list.some(l => label === l || label.startsWith(l + ' '));
