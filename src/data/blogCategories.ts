/**
 * blogCategories.ts
 * Blog category slug -> display label, in tab order. One copy for the index,
 * the category pages, the cards and the article template.
 */
export const BLOG_CATEGORY_LABELS: Record<string, string> = {
  'direct-primary-care': 'Direct Primary Care',
  'lifestyle-medicine': 'Lifestyle Medicine',
  'preventive-medicine': 'Preventive Care',
  'patient-experience': 'Patient Experience',
  'concierge-medicine': 'Concierge Medicine',
};

export const blogCategoryLabel = (slug?: string): string | null =>
  slug ? (BLOG_CATEGORY_LABELS[slug] ?? slug) : null;
