/**
 * address.ts
 * Keeps a suite or unit number with its label ("STE 2", "Suite 206") so a
 * wrapped street line never leaves the number alone on the next line. Only the
 * space between the label and the number becomes a no-break space; the text is
 * otherwise unchanged.
 */
export function keepUnit(street: string): string {
  return street.replace(/\b(STE|Ste|Suite|Unit|Apt) (?=\w)/, '$1 ');
}
