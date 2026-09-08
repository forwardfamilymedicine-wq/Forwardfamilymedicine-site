/**
 * localScenarios.ts
 * One patient scenario per service type for the composed /local/ pages,
 * parameterised on town, physician and nearest office so a single text
 * serves every town. The copy stays inside what the practice already
 * publishes about access and visit length: no clinical outcomes, and no
 * claim that a physician sees patients in an office that has not opened.
 */
import type { LocalCategory } from '../utils/physicianRouting';

export interface ScenarioParams {
  town: string;
  /** "Dr. Landi", or "your physician" on pages with no named physician. */
  physician: string;
  /** Nearest office display name, e.g. "Malvern". */
  office: string;
  officeOpen: boolean;
  /** True when the named physician sees patients at the nearest office. */
  physicianPractisesHere: boolean;
  /** Offices where the named physician does see patients, in the provider's order. */
  physicianOffices: { name: string; open: boolean }[];
}

export interface Scenario {
  title: string;
  situation: string;
  /** Paragraphs of plain text. */
  response: string[];
}

function joinAnd(items: string[]): string {
  if (items.length <= 1) return items[0] ?? '';
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(', ')}, and ${items[items.length - 1]}`;
}

/**
 * Where in-person care happens. When the named physician does not see
 * patients at the nearest office (a Main Line town reading about Dr. Landi,
 * whose offices are in Chester County), the sentence must say so, or two
 * paragraphs about the physician followed by "our Wayne office" read as
 * though the physician practises there.
 */
function inPersonSentence(p: Pick<ScenarioParams, 'physician' | 'office' | 'officeOpen' | 'physicianPractisesHere' | 'physicianOffices'>): string {
  if (p.physicianPractisesHere) return `In-person visits are at our ${p.office} office${p.officeOpen ? '' : ' once it opens'}.`;
  const open = p.physicianOffices.filter(o => o.open);
  const where = open.length ? joinAnd(open.map(o => o.name)) : joinAnd(p.physicianOffices.map(o => o.name));
  const clause = open.length ? '' : (p.physicianOffices.length > 1 ? ' once they open' : ' once it opens');
  return `In-person primary care is at our ${p.office} office. ${p.physician}'s in-person visits are at ${where}${clause}.`;
}

/** "your physician" -> "Your physician"; "Dr. Landi" unchanged. */
const cap = (s: string): string => s.charAt(0).toUpperCase() + s.slice(1);

// Logged for a later wave, not built: two more situations keyed to the
// nearest-office group, so no scenario text is shared by more than about
// eight pages. One scenario per category ships by decision (wave 1 for
// menopause, wave 2 for the other three).
export const scenarios: Partial<Record<LocalCategory, (p: ScenarioParams) => Scenario>> = {
  concierge: ({ town, physician, office, officeOpen }) => ({
    title: `A Tuesday morning in ${town}`,
    situation: 'You wake up with a fever and a sore throat, and you have a meeting at eleven.',
    response: [
      `You message ${physician} directly at 7:15, before the office opens, and get an answer with a few questions. ${officeOpen
        ? `Between you, you settle on a same-day video visit from your kitchen, or an appointment at our ${office} office if you would rather be seen in person.`
        : `Between you, you settle on a same-day video visit from your kitchen. Once our ${office} office opens, that can be an in-person visit instead.`}`,
      'If a prescription is needed, it is sent during that visit. There is no copay and no bill afterward, because visits are included in membership. The next day, a message checks in on how you are feeling.',
      'The way in is a free meet and greet, in person or by video: twenty minutes to ask every question you have and see whether this is the practice for you.',
    ],
  }),
  'direct-primary-care': ({ town, physician, office, officeOpen, physicianPractisesHere, physicianOffices }) => ({
    title: `A refill and a question in ${town}`,
    situation: 'Your blood pressure medication runs out next week, and the last two home readings were higher than usual.',
    response: [
      `You send ${physician} the readings by message. ${cap(physician)} reads them the same day, and the refill is handled the same way.`,
      `If the readings deserve a closer look, you get a visit that week, by video or in person, long enough to go through what has changed and adjust the plan together. All of it is included in membership, with no copay and no separate bill. ${inPersonSentence({ physician, office, officeOpen, physicianPractisesHere, physicianOffices })}`,
      'Membership starts with a free meet and greet, in person or by video: twenty minutes, no obligation, to see whether the practice fits.',
    ],
  }),
  'lifestyle-medicine': ({ town, physician, office, officeOpen, physicianPractisesHere, physicianOffices }) => ({
    title: `A first visit from ${town}`,
    situation: 'Your cholesterol has been creeping up for two years, you sleep badly, and every appointment so far has ended with a handout.',
    response: [
      `Your first visit with ${physician} runs one to two hours. Food, movement, sleep and stress are part of the history alongside the exam and the labs, because here lifestyle medicine is part of primary care rather than a separate referral.`,
      `You leave with a plan you helped write: what to change first, how you will both know whether it is working, and when to look at the numbers again. Follow-ups happen by phone or video whenever a question comes up, and you message ${physician} directly.`,
      `${inPersonSentence({ physician, office, officeOpen, physicianPractisesHere, physicianOffices })} The way in is a free meet and greet, in person or by video: twenty minutes to ask what you want to ask and decide at your own pace.`,
    ],
  }),
  menopause: ({ town, physician, office, officeOpen, physicianPractisesHere, physicianOffices }) => ({
    title: `Three in the morning in ${town}`,
    situation: 'You are awake again, hot and wide awake, and your last physical covered it in ninety seconds.',
    response: [
      `Menopause care at Forward Family Medicine starts with time. Your first visit with ${physician} runs one to two hours, by phone or video from ${town}. ${physician} goes through your history, your sleep and your symptoms, and lays out the options, hormonal and non-hormonal, so you can decide together.`,
      `After that, follow-ups happen by phone or video whenever a question comes up, and you message ${physician} directly. All of it sits inside one monthly membership, with no copay and no separate specialist bill. ${inPersonSentence({ physician, office, officeOpen, physicianPractisesHere, physicianOffices })}`,
      `The way in is a free meet and greet with ${physician}, a Menopause Society Certified Practitioner, by phone or video. It is a real conversation about what has changed, what you have already tried, and what you want the next year to feel like.`,
    ],
  }),
};
