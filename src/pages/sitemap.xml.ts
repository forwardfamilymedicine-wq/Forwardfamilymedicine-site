/**
 * sitemap.xml.ts
 * Dynamic sitemap endpoint. Astro will call getStaticPaths and render
 * this at /sitemap.xml at build time.
 *
 * ALTERNATIVE: Use the official @astrojs/sitemap integration instead.
 * Run: npx astro add sitemap
 * Then configure in astro.config.mjs:
 *   import sitemap from '@astrojs/sitemap';
 *   export default defineConfig({
 *     site: 'https://www.forwardfamilymedicine.com',
 *     integrations: [sitemap()],
 *   });
 *
 * Use THIS file only if you need fine-grained priority/changefreq control.
 */

import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { SITE } from "../data/siteConfig";

// Priority and changefreq by content type
const PRIORITIES = {
  core: "1.0",
  pillar: "0.8",
  seo: "0.7",
  local: "0.6",
  blog: "0.5",
  cluster: "0.6",
};

const CHANGEFREQ = {
  core: "monthly",
  pillar: "monthly",
  seo: "monthly",
  local: "monthly",
  blog: "weekly",
  cluster: "monthly",
};

// Core static pages (not in content collections)
const corePages = [
  { slug: "", priority: PRIORITIES.core, changefreq: CHANGEFREQ.core },
  { slug: "about", priority: PRIORITIES.core, changefreq: CHANGEFREQ.core },
  { slug: "membership", priority: PRIORITIES.core, changefreq: CHANGEFREQ.core },
  { slug: "direct-primary-care", priority: PRIORITIES.core, changefreq: CHANGEFREQ.core },
  { slug: "concierge-medicine", priority: PRIORITIES.core, changefreq: CHANGEFREQ.core },
  { slug: "lifestyle-medicine", priority: PRIORITIES.core, changefreq: CHANGEFREQ.core },
  { slug: "services", priority: PRIORITIES.core, changefreq: CHANGEFREQ.core },
  { slug: "patient-experience", priority: PRIORITIES.core, changefreq: CHANGEFREQ.core },
  { slug: "faq", priority: PRIORITIES.core, changefreq: CHANGEFREQ.core },
  { slug: "new-patients", priority: PRIORITIES.core, changefreq: CHANGEFREQ.core },
  { slug: "blog", priority: "0.7", changefreq: "weekly" },
];

function xmlDate(dateStr?: string): string {
  return dateStr
    ? new Date(dateStr).toISOString().split("T")[0]
    : new Date().toISOString().split("T")[0];
}

export const GET: APIRoute = async () => {
  const [localEntries, lifestyleEntries, seoEntries, blogEntries] =
    await Promise.all([
      getCollection("local").catch(() => []),
      getCollection("lifestyle").catch(() => []),
      getCollection("seo").catch(() => []),
      getCollection("blog").catch(() => []),
    ]);

  // Filter out draft pages
  const localPages = localEntries.filter((e) => !e.data.draft);
  const lifestylePages = lifestyleEntries.filter((e) => !e.data.draft);
  const seoPages = seoEntries.filter((e) => !e.data.draft);
  const blogPages = blogEntries.filter((e) => !e.data.draft);

  const urlEntries: string[] = [];

  // Core static pages
  corePages.forEach(({ slug, priority, changefreq }) => {
    const url = slug ? `${SITE.url}/${slug}` : SITE.url;
    urlEntries.push(`
  <url>
    <loc>${url}</loc>
    <lastmod>${xmlDate()}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`);
  });

  // Local pages: /direct-primary-care-wayne-pa etc.
  localPages.forEach((entry) => {
    const canonical = entry.data.canonical as string | undefined;
    const loc = canonical ?? `${SITE.url}/${entry.id}`;
    urlEntries.push(`
  <url>
    <loc>${loc}</loc>
    <lastmod>${xmlDate(entry.data.date as string)}</lastmod>
    <changefreq>${CHANGEFREQ.local}</changefreq>
    <priority>${PRIORITIES.local}</priority>
  </url>`);
  });

  // Lifestyle knowledge library: /lifestyle/metabolic-health/how-to-reverse-prediabetes
  lifestylePages.forEach((entry) => {
    const canonical = entry.data.canonical as string | undefined;
    const loc = canonical ?? `${SITE.url}/lifestyle/${entry.id}`;
    const isIndex = entry.id.endsWith("index.md");
    const priority = isIndex ? PRIORITIES.pillar : PRIORITIES.cluster;
    urlEntries.push(`
  <url>
    <loc>${loc}</loc>
    <lastmod>${xmlDate(entry.data.date as string)}</lastmod>
    <changefreq>${CHANGEFREQ.cluster}</changefreq>
    <priority>${priority}</priority>
  </url>`);
  });

  // SEO content pages
  seoPages.forEach((entry) => {
    const canonical = entry.data.canonical as string | undefined;
    const loc = canonical ?? `${SITE.url}/${entry.id}`;
    urlEntries.push(`
  <url>
    <loc>${loc}</loc>
    <lastmod>${xmlDate(entry.data.date as string)}</lastmod>
    <changefreq>${CHANGEFREQ.seo}</changefreq>
    <priority>${PRIORITIES.seo}</priority>
  </url>`);
  });

  // Blog posts
  blogPages.forEach((entry) => {
    const canonical = entry.data.canonical as string | undefined;
    const loc = canonical ?? `${SITE.url}/blog/${entry.id}`;
    urlEntries.push(`
  <url>
    <loc>${loc}</loc>
    <lastmod>${xmlDate(entry.data.date as string)}</lastmod>
    <changefreq>${CHANGEFREQ.blog}</changefreq>
    <priority>${PRIORITIES.blog}</priority>
  </url>`);
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
    http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
>${urlEntries.join("")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
};
