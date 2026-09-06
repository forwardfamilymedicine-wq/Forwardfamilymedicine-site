/**
 * availability.ts
 * Single source of truth for a physician's new-patient availability state.
 *
 * Both ProviderCard.astro and the meet-the-team/[slug].astro bio route render
 * from this helper. The date comparison and the "October 2026" month-year
 * formatting live here and nowhere else — do not re-derive them inline.
 *
 * Only the `providers` collection has these fields; `team` entries use the
 * separate acceptingNewClients flag and never reach this helper.
 */

export type AvailabilityStatus = 'accepting' | 'future' | 'full';

export interface Availability {
  /**
   * 'accepting' — taking new patients now.
   * 'future'    — taking new patients from a start date still ahead of us.
   * 'full'      — panel closed.
   */
  status: AvailabilityStatus;
  /** e.g. "October 2026". Present whenever a start date is set. */
  startLabel?: string;
  /** Verbatim frontmatter note; each call site decides whether to render it. */
  note?: string;
}

export interface ProviderAvailabilityData {
  acceptingNewPatients: boolean;
  acceptingNewPatientsStartDate?: string;
  acceptingNewPatientsNote?: string;
}

/**
 * Parse "YYYY-MM-DD" as local midnight. Deliberately not `new Date(string)`,
 * which parses bare dates as UTC and can shift them a day backwards.
 */
function parseLocalDate(value: string): Date {
  const [y, m, d] = value.split('-').map(Number);
  return new Date(y, m - 1, d);
}

/** "2026-10-01" -> "October 2026". Exported for physicianRouting.ts, which
 *  renders office opening months on local-page hero cards. */
export function formatMonthYear(value: string): string {
  const [y, m] = value.split('-').map(Number);
  return new Date(y, m - 1, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

export function getAvailability(data: ProviderAvailabilityData): Availability {
  const startDate = data.acceptingNewPatientsStartDate;

  const base = {
    startLabel: startDate ? formatMonthYear(startDate) : undefined,
    note: data.acceptingNewPatientsNote,
  };

  if (!data.acceptingNewPatients) {
    return { status: 'full', ...base };
  }
  if (startDate && parseLocalDate(startDate) > new Date()) {
    return { status: 'future', ...base };
  }
  return { status: 'accepting', ...base };
}
