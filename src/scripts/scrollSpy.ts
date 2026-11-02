/**
 * scrollSpy.ts
 * Marks the link in `nav` whose hash matches the section heading most recently
 * scrolled into the top band of the viewport (`aria-current="true"` plus the
 * class `cur`). Used by the article "In this article" rail and the Library
 * section index. One IntersectionObserver; nothing moves, so reduced motion
 * needs no special case.
 */
export function initScrollSpy(nav: Element | null, targets: Element[]): void {
  if (!nav || !targets.length || !('IntersectionObserver' in window)) return;
  const links = Array.from(nav.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'));
  if (!links.length) return;

  const mark = (id: string) => {
    for (const link of links) {
      const on = link.getAttribute('href') === `#${id}`;
      link.classList.toggle('cur', on);
      if (on) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    }
  };

  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) mark((entry.target as HTMLElement).id);
    }
  }, { rootMargin: '-10% 0px -80% 0px' });
  targets.forEach((t) => io.observe(t));
}
