#!/usr/bin/env node
/**
 * check-local-content.mjs
 * Content-preservation check for the composed /local/ pages (batch 4).
 *
 * The expected set is derived from the source markdown, never from old HTML.
 * For every markdown entry it asserts, against the built page in dist/:
 *
 *   links        every href in the body and in `linksTo` appears (by href)
 *   faq          every question and answer appears in the accordion, and in
 *                the FAQPage JSON-LD as flattened text
 *   prose        the h1, every h2 outside the two info blocks, and every
 *                paragraph and list item outside them, appear as text
 *   replacement  the dropped info blocks are replaced from data: street,
 *                city line, phone, fax, email and hours of the office
 *   extras       every kept Practical Information line appears verbatim
 *   allowlist    every discarded Practical Information label is on the drop
 *                list (or the reassigned-town list); anything else fails
 *   frontmatter  localNote and the nearby-neighbourhoods sentence appear
 *   secondary    every secondary-office phrase in the town map appears
 *
 * A `linksTo` entry for the West Chester office page is an allowed drop on
 * the six reassigned towns. There is deliberately no snapshot comparison:
 * every page is composed, so any content or template change is supposed to
 * change the output, and the assertions above are what must hold.
 *
 * Usage: node scripts/check-local-content.mjs [--verbose]
 * Exit code 1 on any failure.
 */
import { readFileSync, readdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const verbose = args.includes('--verbose');

const { towns } = await import(`${ROOT}/src/data/towns.ts`);
const { DROP_LABELS, REASSIGNED_DROP, labelMatches } = await import(`${ROOT}/src/data/localPracticalLabels.ts`);
const { faqAnswerText } = await import(`${ROOT}/src/utils/faqSchema.ts`);

// ── Normalisation shared by both sides ───────────────────────────────────────
const decode = s => s
  .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
  .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
  .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&nbsp;/g, ' ');
const norm = s => decode(s)
  .replace(/[‘’ʼ]/g, "'").replace(/[“”]/g, '"')
  .replace(/[—–−]/g, '-').replace(/…/g, '...')
  .replace(/[→›»]/g, '')
  .replace(/\s+/g, ' ').replace(/\s+([,.;:!?])/g, '$1').trim();
const stripTags = s => s.replace(/<[^>]+>/g, ' ');
const stripHref = h => h.replace(/\/$/, '');

// ── Markdown side ────────────────────────────────────────────────────────────
function frontmatter(src) {
  const m = src.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  const fm = {}; let key = null;
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^([A-Za-z]+):\s*(.*)$/);
    if (kv) { key = kv[1]; const v = kv[2].trim(); fm[key] = v.startsWith('"') ? v.replace(/^"|"$/g, '') : v === '' ? [] : v; continue; }
    const li = line.match(/^\s+-\s+"?([^"]*)"?\s*$/);
    if (li && key) (fm[key] = Array.isArray(fm[key]) ? fm[key] : []).push(li[1]);
  }
  return { fm, body: m[2] };
}
function classify(text) {
  const t = text.toLowerCase().trim().replace(/[‘’]/g, "'");
  if (t.startsWith('about ')) return 'about';
  if (t.startsWith('why ')) return 'why';
  if (t.includes('service') || t === "what's included") return 'services';
  if (t.includes('practical')) return 'practical';
  if (t.includes('contact & practice') || t === 'contact') return 'contact';
  if (t.includes('frequently asked') || t === 'faq') return 'faq';
  if (t.includes('get started') || t.includes('ready to') || t.includes('take the first') || t.includes('start living') || /^experience /.test(t)) return 'cta';
  return 'explainer';
}
const inlineText = md => norm(md
  .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
  .replace(/\*\*([^*]+)\*\*/g, '$1').replace(/\*([^*]+)\*/g, '$1').replace(/`([^`]+)`/g, '$1'));
/** Inline markdown → text the way the FAQPage schema flattens it: arrow-labelled links vanish. */
const schemaText = md => norm(faqAnswerText(md
  .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
  .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')));
const isLinkRow = line => !/[A-Za-z0-9]/.test(line.replace(/\[[^\]]*\]\([^)]*\)/g, '').replace(/\*\*/g, ''));

function expectations(slug, src) {
  const { fm, body } = frontmatter(src);
  const town = towns.find(t => t.slug === (fm.location ?? '').toLowerCase().replace(/,\s*pa$/, '').trim().replace(/\s+/g, '-'));
  const parts = body.split(/^## (.*)$/m);
  const h1 = (parts[0].match(/^# (.*)$/m) ?? [])[1];
  const exp = { slug, town, hrefs: new Set(), texts: [], faqs: [], practical: [], contact: [], frontmatterTexts: [] };
  for (const m of body.matchAll(/\]\(([^)]+)\)/g)) exp.hrefs.add(stripHref(m[1]));
  for (const l of fm.linksTo ?? []) exp.hrefs.add(stripHref(l));
  if (h1) exp.texts.push(['h1', inlineText(h1)]);
  for (let i = 1; i < parts.length; i += 2) {
    const heading = parts[i].trim(), kind = classify(heading), sec = parts[i + 1];
    const lines = sec.split('\n').map(l => l.trim()).filter(Boolean);
    if (kind === 'practical' || kind === 'contact') {
      for (const l of lines) { const lm = l.match(/^\*\*([^*]+?):\*\*\s*(.*)$/); if (lm) exp[kind].push({ label: lm[1], value: inlineText(lm[2]) }); }
      continue;
    }
    exp.texts.push(['h2', inlineText(heading)]);
    if (kind === 'faq') {
      const qa = sec.match(/^\*\*[^*]+\?\*\*\n.*$/gm) ?? [];
      for (const block of qa) { const [q, ...a] = block.split('\n'); exp.faqs.push({ q: inlineText(q.replace(/\*\*/g, '')), a: inlineText(a.join(' ')), aSchema: schemaText(a.join(' ')) }); }
      continue;
    }
    for (const l of lines) {
      if (isLinkRow(l)) continue;                                    // hrefs are checked separately
      if (l.startsWith('- ')) { exp.texts.push(['li', inlineText(l.slice(2))]); continue; }
      if (kind === 'services' && l.includes(' · ') && !l.startsWith('**')) {
        for (const item of l.replace(/\[[^\]]*\]\([^)]*\)/g, '').split('·')) if (item.trim()) exp.texts.push(['service', inlineText(item)]);
        continue;
      }
      // In the services block the /services link is lifted out of its paragraph
      // into the list's "more" link, so the paragraph is compared without link labels.
      exp.texts.push(['p', inlineText(kind === 'services' ? l.replace(/\[[^\]]*\]\([^)]*\)/g, '') : l)]);
    }
  }
  if (fm.localNote) exp.frontmatterTexts.push(norm(fm.localNote));
  if (fm.nearbyNeighborhoods) exp.frontmatterTexts.push(norm(`Also serving patients from ${fm.nearbyNeighborhoods}.`));
  return exp;
}

// ── Locations (for the replacement assertion) ────────────────────────────────
function loadLocations() {
  const out = {};
  for (const f of readdirSync(`${ROOT}/src/content/locations`)) {
    const { fm } = frontmatter(readFileSync(`${ROOT}/src/content/locations/${f}`, 'utf8'));
    const hours = [...readFileSync(`${ROOT}/src/content/locations/${f}`, 'utf8').matchAll(/- day: "([^"]+)"\n\s+open: "([^"]+)"\n\s+close: "([^"]+)"/g)].map(m => ({ day: m[1], open: m[2], close: m[3] }));
    out[fm.slug] = { ...fm, hours };
  }
  return out;
}
function hourLines(hours) {
  const runs = [];
  for (const h of hours) { const last = runs[runs.length - 1]; if (last && last.open === h.open && last.close === h.close) last.to = h.day; else runs.push({ from: h.day, to: h.day, open: h.open, close: h.close }); }
  return runs.map(r => `${r.from === r.to ? r.from : `${r.from} to ${r.to}`}, ${r.open} to ${r.close}`);
}

// ── Page side ────────────────────────────────────────────────────────────────
function pageFacts(html) {
  const ld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap(m => { try { const j = JSON.parse(m[1]); return Array.isArray(j) ? j : [j]; } catch { return []; } });
  const faqLd = ld.find(o => o['@type'] === 'FAQPage');
  const bodyHtml = html.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ');
  return {
    text: norm(stripTags(bodyHtml)),
    hrefs: new Set([...bodyHtml.matchAll(/href="([^"]+)"/g)].map(m => stripHref(decode(m[1])))),
    accordion: [...bodyHtml.matchAll(/<div class="faq-answer"[^>]*>\s*<p[^>]*>([\s\S]*?)<\/p>/g)].map(m => norm(stripTags(m[1]))),
    schemaQ: (faqLd?.mainEntity ?? []).map(q => ({ q: norm(q.name), a: norm(q.acceptedAnswer.text) })),
  };
}

// ── Run ──────────────────────────────────────────────────────────────────────
const locations = loadLocations();
const contentDir = `${ROOT}/src/content/local`;
const dist = `${ROOT}/dist/local`;
let failures = 0;
const report = [];

for (const file of readdirSync(contentDir).filter(f => f.endsWith('.md')).sort()) {
  const slug = file.replace(/\.md$/, '');
  // Mirror the collection: planning docs (no category) and drafts never build.
  const head = frontmatter(readFileSync(`${contentDir}/${file}`, 'utf8')).fm;
  if (!head.category || head.draft === 'true') continue;
  const html = readFileSync(`${dist}/${slug}/index.html`, 'utf8');
  const exp = expectations(slug, readFileSync(`${contentDir}/${file}`, 'utf8'));
  const page = pageFacts(html);
  const problems = [];
  const counts = {};

  // links
  // On a reassigned town the practical block points at Malvern in place of
  // West Chester, so a `linksTo` entry for the West Chester office page is a
  // deliberate drop (stage 1 decision), not a lost link.
  const allowedDrop = h => exp.town?.reassigned && h === '/locations/west-chester';
  const missingLinks = [...exp.hrefs].filter(h => !page.hrefs.has(h) && !allowedDrop(h));
  const droppedLinks = [...exp.hrefs].filter(h => !page.hrefs.has(h) && allowedDrop(h));
  counts.links = `${exp.hrefs.size - missingLinks.length - droppedLinks.length}/${exp.hrefs.size}${droppedLinks.length ? ` (${droppedLinks.length} allowed drop)` : ''}`;
  for (const h of missingLinks) problems.push(`link missing: ${h}`);

  // faq
  let faqOk = 0;
  for (const f of exp.faqs) {
    const inAccordion = page.text.includes(f.q) && page.accordion.some(a => a === f.a);
    const inSchema = page.schemaQ.some(s => s.q === f.q && s.a === f.aSchema);
    if (inAccordion && inSchema) faqOk++;
    else problems.push(`faq ${inAccordion ? '' : 'accordion '}${inSchema ? '' : 'schema '}missing: ${f.q}`);
  }
  counts.faq = `${faqOk}/${exp.faqs.length}`;

  // prose
  let proseOk = 0;
  for (const [kind, t] of exp.texts) { if (page.text.includes(t)) proseOk++; else problems.push(`${kind} missing: ${t.slice(0, 90)}`); }
  counts.prose = `${proseOk}/${exp.texts.length}`;

  // replacement from data
  const office = locations[exp.town?.office];
  if (!office) problems.push(`no office for town ${exp.town?.slug}`);
  else {
    const want = [];
    if (office.addressStreet) want.push(office.addressStreet);
    want.push(`${office.addressCity}, ${office.addressState} ${office.addressZip}`);
    if (office.phone) want.push(office.phone);
    want.push('(215) 449-8854', 'information@forwardfamilymedicine.com', ...hourLines(office.hours));
    let ok = 0;
    for (const w of want) { if (page.text.includes(norm(w))) ok++; else problems.push(`replacement missing: ${w}`); }
    counts.replacement = `${ok}/${want.length}`;
  }

  // practical extras and allowlist
  let keptOk = 0, kept = 0;
  const discarded = [];
  for (const { label, value } of exp.practical) {
    const dropped = labelMatches(label, DROP_LABELS) || (exp.town?.reassigned && labelMatches(label, REASSIGNED_DROP));
    if (dropped) { discarded.push(label); continue; }
    kept++;
    if (page.text.includes(value)) keptOk++; else problems.push(`extra missing (${label}): ${value.slice(0, 80)}`);
  }
  counts.extras = `${keptOk}/${kept}`;
  counts.discarded = `${discarded.length} practical + ${exp.contact.length} contact`;

  // secondary offices from the town map (Town.secondary)
  const secondary = Object.entries(exp.town?.secondary ?? {});
  let secOk = 0;
  for (const [office, phrase] of secondary) {
    if (page.text.includes(norm(phrase))) secOk++; else problems.push(`secondary office missing (${office}): ${phrase}`);
  }
  counts.secondary = secondary.length ? `${secOk}/${secondary.length}` : '-';

  // frontmatter prose
  for (const t of exp.frontmatterTexts) if (!page.text.includes(t)) problems.push(`frontmatter text missing: ${t.slice(0, 80)}`);

  if (problems.length) failures++;
  report.push({ slug, ok: problems.length === 0, counts, problems, discarded });
}

// ── Report ───────────────────────────────────────────────────────────────────
for (const r of report) {
  const c = r.counts;
  console.log(`${r.ok ? 'ok  ' : 'FAIL'} ${r.slug.padEnd(38)} links ${c.links}  faq ${c.faq}  prose ${c.prose}  replacement ${c.replacement}  extras ${c.extras}  secondary ${c.secondary}  discarded ${c.discarded}`);
  if (verbose && r.discarded.length) console.log(`       discarded labels: ${r.discarded.join(', ')}`);
  for (const p of r.problems) console.log(`       ${p}`);
}
console.log(`\n${report.length} composed pages checked, ${failures} failure(s)`);
process.exit(failures ? 1 : 0);
