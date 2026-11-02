/**
 * stickyFit.ts
 * A `[data-sticky-fit]` element is pinned under the header (global.css adds
 * `position: sticky; top: calc(var(--header-h) + 24px)` to `.is-sticky`) only
 * when the whole element fits in the viewport below that offset, so a tall
 * rail or index is never cut off while stuck. Re-evaluated on resize and once
 * the fonts have loaded. Called once from MainLayout; a page with no such
 * element pays nothing.
 */
export function initStickyFit(root: ParentNode = document): void {
  const targets = Array.from(root.querySelectorAll<HTMLElement>('[data-sticky-fit]'));
  if (!targets.length) return;

  const headerHeight = (): number => {
    const v = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h'));
    return Number.isFinite(v) ? v : 81;
  };

  const apply = () => {
    // Room below the header offset, less a little clearance at the bottom.
    const room = window.innerHeight - headerHeight() - 24 - 16;
    for (const el of targets) {
      el.classList.toggle('is-sticky', el.getBoundingClientRect().height <= room);
    }
  };

  apply();
  let timer: number | undefined;
  window.addEventListener('resize', () => {
    window.clearTimeout(timer);
    timer = window.setTimeout(apply, 120);
  });
  document.fonts?.ready.then(apply);
}
