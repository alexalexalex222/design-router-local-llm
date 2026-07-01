Ship this motion system as real code, not as prose instructions.

The JS provides two behaviors: (1) a scroll-aware header that hides on scroll-down and reveals on scroll-up using requestAnimationFrame with a 20px direction-change threshold, and (2) an IntersectionObserver that adds `.in-view` to `.reveal-on-scroll` elements as they enter the viewport.

The CSS provides the transition tokens, header transform state, entrance animation base, and a `prefers-reduced-motion` fallback.

Motion is enhancement-only. Sections marked `.reveal-on-scroll` must remain visible and readable in first render, static screenshots, full-page captures, reduced-motion mode, and no-JS conditions. Do not hide the page behind `opacity: 0` while waiting for scroll.

Adopt the JS and CSS directly. Do not rewrite them as prose instructions. Do not skip the header hide/reveal. Add `.reveal-on-scroll` to every major section below the hero, but keep those sections visible by default in static proof.
