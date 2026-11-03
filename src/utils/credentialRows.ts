/**
 * credentialRows.ts
 * The credential lines shown for a physician: the profile hero lists all of
 * them, the Team and office-page cards the first two (what the boards show).
 * Board certification first, then the named certifications as written in the
 * providers collection. Awards are added by the caller (awardLabel).
 */

// Approved wording for a DO board-certified in Family Medicine. Dr. Lieberman's
// board lines are already in his additionalCertifications as written.
export const DO_BOARD_LINE = 'Board Certified, American Osteopathic Board of Family Physicians';

export function physicianCredentialRows(d: any): string[] {
  return [
    ...(d.boardStatus === 'board-certified'
      ? (d.credentials === 'DO' && d.boardSpecialties.includes('Family Medicine') ? [DO_BOARD_LINE] : [])
      : [`Board-Eligible: ${d.boardSpecialties.join(', ')}`]),
    ...d.additionalCertifications.map((c: any) => c.name),
  ];
}

/**
 * The open office a physician sees patients at, for the "Accepting new
 * patients · Wayne" status line. A planned office never counts (it is not
 * somewhere anyone practises); offices are taken in displayOrder.
 */
export function openOfficeName(d: any, allLocations: any[]): string | undefined {
  return (d.locations ?? [])
    .map((slug: string) => allLocations.find(l => l.data.slug === slug))
    .filter(Boolean)
    .sort((a: any, b: any) => a.data.displayOrder - b.data.displayOrder)
    .find((l: any) => l.data.status === 'open')?.data.name;
}
