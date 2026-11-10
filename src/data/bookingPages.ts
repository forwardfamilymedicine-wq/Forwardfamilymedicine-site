/**
 * bookingPages.ts
 * Google Calendar appointment-schedule pages for meet and greets, keyed by
 * physician code (the CRM's J column). Both values per physician come from
 * Google's sharing options for that page: `shareUrl` is the booking page
 * link, and `embedSrc` is the src of the inline-embed snippet, exactly as
 * Google gives it. Neither is ever derived from the other.
 *
 * Leaving either value empty for either physician turns self-scheduling off,
 * and the Meet & Greet form's success state stays as it was.
 */

export type PhysicianCode = 'BL' | 'PL';

export interface BookingPage {
  code: PhysicianCode;
  /** Card title, e.g. "Dr. Brian Landi · Malvern" */
  cardTitle: string;
  /** Card subline, e.g. "Family Medicine and Menopause Care" */
  cardSubline: string;
  /** Button label, e.g. "Book with Dr. Landi" */
  bookLabel: string;
  /** The office this physician sees meet-and-greet patients at; matches the
   *  form's "Preferred office" values, so that choice can order the cards. */
  office: 'wayne' | 'malvern';
  /** Analytics value for the physician parameter of the meetgreet_* events. */
  eventKey: 'landi' | 'lieberman';
  /** Booking page share link, used for the "open in a new tab" link. */
  shareUrl: string;
  /** The src of Google's inline-embed iframe snippet, used as given. */
  embedSrc: string;
}

/** In display order: Dr. Landi first, then Dr. Lieberman. */
export const BOOKING_PAGES: BookingPage[] = [
  {
    code: 'BL',
    cardTitle: 'Dr. Brian Landi · Malvern',
    cardSubline: 'Family Medicine and Menopause Care',
    bookLabel: 'Book with Dr. Landi',
    office: 'malvern',
    eventKey: 'landi',
    shareUrl: 'https://calendar.app.google/byvHf4dTyqVfpVWw9',
    embedSrc: 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ3z_348-rTAgqKq9ZKyYf2Nk16oCiZy-_Hj7zC5LykJFUY57Sj3boJQfNXwDWfJW43Bh7AxGKNB?gv=true',
  },
  {
    code: 'PL',
    cardTitle: 'Dr. Philip Lieberman · Wayne',
    cardSubline: 'Family Medicine and Lifestyle Medicine',
    bookLabel: 'Book with Dr. Lieberman',
    office: 'wayne',
    eventKey: 'lieberman',
    shareUrl: 'https://calendar.app.google/cFzhZWL4te6zgBcG9',
    embedSrc: 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ2Rl8gp9wQjO6JOZw0M2NCtYDQeANBqJKtb6aJTwxa0WVh5za35DU_2s_tw9tawegFYqhSHcKrQ?gv=true',
  },
];

/** True only when every physician has both a share link and an embed src. */
export function bookingEnabled(): boolean {
  return BOOKING_PAGES.length > 0
    && BOOKING_PAGES.every((p) => p.shareUrl.trim() !== '' && p.embedSrc.trim() !== '');
}
