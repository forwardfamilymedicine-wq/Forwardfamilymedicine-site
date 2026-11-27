/**
 * officeLines.ts
 * How an office's phone number and hours read on the landing pages, from a
 * locations entry: the landing footer (LpFooter.astro) and the offices block
 * (LpLocations.astro) both use these, so the two never disagree.
 */

export interface OfficeHours { day: string; open: string; close: string }

/** The office's number as written, and a tel: link for it; the practice number when empty. */
export function officePhone(phone?: string): { text: string; href: string } {
  const text = (phone ?? '').trim() || '(215) 645-7044';
  const digits = text.replace(/\D/g, '');
  return { text, href: digits.length === 10 ? `tel:+1${digits}` : 'tel:+12156457044' };
}

/**
 * Hours as the entry gives them, with runs of consecutive entries that share
 * the same times collapsed into one line ("Monday to Friday: 7:30 AM to
 * 5:30 PM"). Nothing is added: an entry with no hours prints no hours.
 */
export function hoursLines(hours: OfficeHours[] = []): string[] {
  const lines: string[] = [];
  for (let i = 0; i < hours.length; ) {
    let j = i;
    while (j + 1 < hours.length && hours[j + 1].open === hours[i].open && hours[j + 1].close === hours[i].close) j++;
    const days = i === j ? hours[i].day : `${hours[i].day} to ${hours[j].day}`;
    lines.push(`${days}: ${hours[i].open} to ${hours[i].close}`);
    i = j + 1;
  }
  return lines;
}
