"use client";

import { useEffect, useState } from "react";

function clamp(value, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

/**
 * Scroll-linked progress (0→1) as the element moves through the viewport.
 */
export function useElementScrollProgress(ref, { start = 0.9, end = 0.38 } = {}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(1);
      return;
    }

    let raf = 0;

    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const startY = vh * start;
      const endY = vh * end;
      const range = startY - endY || 1;
      setProgress(clamp((startY - rect.top) / range));
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref, start, end]);

  return progress;
}

export function easeOutCubic(t) {
  return 1 - (1 - clamp(t)) ** 3;
}

/** Two-side card entrance tied to scroll progress. */
export function scrollRevealTransform(progress, side = "left", stagger = 0) {
  const p = clamp((progress - stagger) / Math.max(0.2, 1 - stagger));
  const eased = easeOutCubic(p);
  const inv = 1 - eased;

  const slideX =
    side === "left" ? inv * -100 :
    side === "right" ? inv * 100 :
    0;
  const slideY = side === "up" ? inv * 52 : inv * 18;
  const rotate =
    side === "left" ? inv * -2.5 :
    side === "right" ? inv * 2.5 :
    0;
  const blur = inv * 7;
  const scale = 0.88 + eased * 0.12;

  return {
    opacity: 0.06 + eased * 0.94,
    transform: `translate3d(${slideX}px, ${slideY}px, 0) scale(${scale}) rotate(${rotate}deg)`,
    filter: blur > 0.4 ? `blur(${blur}px)` : "none",
    willChange: "transform, opacity, filter",
  };
}
