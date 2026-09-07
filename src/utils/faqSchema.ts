/**
 * faqSchema.ts
 * Plain-text answer for FAQPage JSON-LD. The rendered accordion keeps the
 * answer HTML; only the structured-data copy is flattened here.
 *
 * An anchor whose label ends in an arrow glyph ("More →", "See pricing →") is
 * navigation, not answer content, so it is removed together with its label;
 * otherwise answers end in stranded text. Any other anchor keeps its text,
 * so an inline reference such as "take place at Wayne DEXA" survives intact.
 * Remaining tags are stripped, entities decoded, whitespace collapsed, and
 * trailing arrow glyphs plus the punctuation they leave behind are trimmed.
 *
 * Ported from the generic /local/ route so every FAQPage on the site emits
 * the same answer text for the same answer HTML.
 */

const ARROWS = '→›»';

function stripTags(s: string): string {
  return s.replace(/<[^>]+>/g, '');
}

function decodeEntities(s: string): string {
  return s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&nbsp;/g, ' ');
}

export function faqAnswerText(html: string): string {
  const withoutNavLinks = html.replace(
    /<a\b[^>]*>([\s\S]*?)<\/a>/g,
    (full, label: string) => (new RegExp(`[${ARROWS}]\\s*$`).test(stripTags(label).trim()) ? '' : full),
  );
  return decodeEntities(stripTags(withoutNavLinks))
    .replace(/\s+/g, ' ')
    .replace(new RegExp(`[\\s${ARROWS}]+$`, 'g'), '')
    .trim();
}
