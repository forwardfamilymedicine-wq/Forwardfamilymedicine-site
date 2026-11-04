/**
 * related.ts
 * The "related reading" rail on an article, per the board and the build
 * prompt: automatic, with a frontmatter override for curated lists.
 *
 * Blog posts
 *   relatedPosts in frontmatter  -> "Mentioned in this post": the listed
 *       posts (a slug, or a site path such as /meet-the-team/<slug>/ or
 *       /lifestyle/<slug>/), in that order.
 *   author is a physician who is accepting new patients
 *                                -> "More from Dr. <Last>": that author's
 *       three most recent other posts.
 *   otherwise                    -> "More in <Category>": the category's
 *       three most recent other posts.
 *   A physician whose panel is full is not put forward by name, so his posts
 *   take the category rail.
 *
 * Library entries
 *   "More in <Section>": the section's other articles, in title order. An
 *   article lists three; a section hub lists every article in its section.
 */
import type { CollectionEntry } from 'astro:content';
import { authorSlug } from './authors';
import { getAvailability } from './availability';
import { blogCategoryLabel } from '../data/blogCategories';
import { isLibraryHub, libraryCategoryLabel, libraryCategoryOf, libraryHref, librarySlug } from '../data/libraryCategories';

type Post = CollectionEntry<'blog'>;
type Lib = CollectionEntry<'lifestyle'>;
type Provider = CollectionEntry<'providers'>;

export interface RelatedItem { href: string; title: string; meta: string }
export interface RelatedRail { heading: string; items: RelatedItem[] }

export const postSlug = (e: Post): string => e.id.replace(/\.mdx?$/, '');
export const postHref = (e: Post): string => `/blog/${postSlug(e)}/`;
const postTime = (e: Post): number => (e.data.date ? new Date(e.data.date).getTime() : 0);
const published = (posts: Post[]): Post[] => posts.filter(p => !p.data.draft);
const byDateDesc = (a: Post, b: Post) => postTime(b) - postTime(a);

const postItem = (p: Post): RelatedItem => ({
  href: postHref(p),
  title: p.data.title,
  meta: blogCategoryLabel(p.data.category) ?? 'Blog',
});

function resolveCurated(ref: string, posts: Post[], providers: Provider[], library: Lib[]): RelatedItem | null {
  const path = ref.startsWith('/') ? ref.replace(/\/?$/, '/') : `/blog/${ref}/`;
  const post = posts.find(p => postHref(p) === path);
  if (post) return postItem(post);
  const provider = providers.find(p => `/meet-the-team/${p.data.slug}/` === path);
  if (provider) return { href: path, title: `Dr. ${provider.data.name}, ${provider.data.credentials}`, meta: 'Physician profile' };
  const lib = library.find(l => libraryHref(l) === path);
  if (lib) return { href: path, title: lib.data.title, meta: 'Library' };
  return null;
}

export function blogRelated(input: { entry: Post; posts: Post[]; providers: Provider[]; library: Lib[] }): RelatedRail {
  const { entry, providers, library } = input;
  const posts = published(input.posts);
  const curated = (entry.data as { relatedPosts?: string[] }).relatedPosts ?? [];
  if (curated.length) {
    const items = curated.map(ref => resolveCurated(ref, posts, providers, library)).filter((x): x is RelatedItem => Boolean(x));
    if (items.length) return { heading: 'Mentioned in this post', items };
  }
  const others = posts.filter(p => p.id !== entry.id).sort(byDateDesc);
  const slug = authorSlug(entry.data.author);
  const provider = slug ? providers.find(p => p.data.slug === slug) : undefined;
  if (provider && getAvailability(provider.data).status === 'accepting') {
    const mine = others.filter(p => authorSlug(p.data.author) === slug).slice(0, 3);
    if (mine.length) {
      const last = provider.data.name.trim().split(/\s+/).pop();
      return { heading: `More from Dr. ${last}`, items: mine.map(postItem) };
    }
  }
  const category = entry.data.category;
  const same = (category ? others.filter(p => p.data.category === category) : others).slice(0, 3);
  return { heading: `More in ${blogCategoryLabel(category) ?? 'Blog'}`, items: same.map(postItem) };
}

export function libraryRelated(input: { entry: Lib; entries: Lib[] }): RelatedRail {
  const { entry } = input;
  const dir = libraryCategoryOf(entry);
  const siblings = input.entries
    .filter(e => !e.data.draft && e.id !== entry.id && libraryCategoryOf(e) === dir && !isLibraryHub(e))
    .sort((a, b) => a.data.title.localeCompare(b.data.title));
  const items = (isLibraryHub(entry) ? siblings : siblings.slice(0, 3))
    .map(e => ({ href: `/lifestyle/${librarySlug(e)}/`, title: e.data.title, meta: 'Library' }));
  return { heading: `More in ${libraryCategoryLabel(dir)}`, items };
}
