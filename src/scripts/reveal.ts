/**
 * reveal.ts
 * One IntersectionObserver for every `[data-reveal]` element on the page.
 * When about 30% of an element is visible it gets the class `on`, once, and a
 * `reveal` event is dispatched on it so a component can start a script-driven
 * animation (the homepage dot field counts down on it). A numeric
 * `data-reveal="0.4"` overrides the threshold for that element.
 *
 * Reduced motion: the end state is what matters, so `on` is added to every
 * target on load and global.css turns transitions off under `[data-reveal]`.
 *
 * Tall elements: a fixed fraction of a block taller than the viewport can
 * never be visible at once (a 3,000px grid on a phone), so the effective
 * threshold is capped at 30% of the viewport height divided by the element's
 * height, with a floor of 0.02.
 * Called once from MainLayout; safe to call again for a subtree.
 */
export function initReveal(root: ParentNode = document): void {
  const targets = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'));
  if (!targets.length) return;

  const fire = (el: HTMLElement) => {
    el.classList.add('on');
    el.dispatchEvent(new CustomEvent('reveal'));
  };

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced || !('IntersectionObserver' in window)) {
    targets.forEach(fire);
    return;
  }

  const byThreshold = new Map<number, HTMLElement[]>();
  for (const el of targets) {
    const t = Number.parseFloat(el.dataset.reveal || '');
    const wanted = Number.isFinite(t) && t > 0 && t <= 1 ? t : 0.3;
    const height = el.getBoundingClientRect().height;
    const cap = height > 0 ? (window.innerHeight * 0.3) / height : wanted;
    const threshold = Math.round(Math.max(0.02, Math.min(wanted, cap)) * 100) / 100;
    const list = byThreshold.get(threshold) || [];
    list.push(el);
    byThreshold.set(threshold, list);
  }

  for (const [threshold, els] of byThreshold) {
    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        fire(entry.target as HTMLElement);
        io.unobserve(entry.target);
      }
    }, { threshold });
    els.forEach((el) => io.observe(el));
  }
}
