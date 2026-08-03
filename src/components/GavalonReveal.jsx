"use client";

import {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const RevealCtx = createContext(false);

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Observes when a section enters the viewport, then staggers child <Reveal /> items.
 * - immediate: play entrance on mount (hero) after a paint so CSS transitions run
 * - stricter defaults so the next section does not fire while still viewing the previous one
 */
export function RevealSection({
  as: Tag = "div",
  children,
  className = "",
  threshold = 0.28,
  rootMargin = "0px 0px -32% 0px",
  immediate = false,
  ...props
}) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setOn(true);
      return undefined;
    }

    // Hero / first section: start hidden, then flip on after paint so animations play
    if (immediate) {
      let cancelled = false;
      const t = window.setTimeout(() => {
        if (!cancelled) setOn(true);
      }, 80);
      return () => {
        cancelled = true;
        window.clearTimeout(t);
      };
    }

    const el = ref.current;
    if (!el) return undefined;

    const obs = new IntersectionObserver(
      ([entry]) => {
        // Require meaningful visibility so the next section does not animate early
        if (entry.isIntersecting && entry.intersectionRatio >= Math.min(threshold, 0.2)) {
          setOn(true);
          obs.disconnect();
        }
      },
      { threshold: [0, 0.15, 0.28, 0.4, 0.55], rootMargin },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [immediate, threshold, rootMargin]);

  return (
    <RevealCtx.Provider value={on}>
      <Tag ref={ref} className={className} {...props}>
        {children}
      </Tag>
    </RevealCtx.Provider>
  );
}

/**
 * Single element reveal. Delay in ms for stagger (e.g. 0, 80, 160…).
 * Variants: up | left | right | scale | fade
 */
export const Reveal = forwardRef(function Reveal(
  {
    as: Tag = "div",
    children,
    className = "",
    delay = 0,
    variant = "up",
    style,
    ...props
  },
  ref,
) {
  const on = useContext(RevealCtx);
  return (
    <Tag
      ref={ref}
      className={`gvl-rv gvl-rv--${variant}${on ? " on" : ""}${className ? ` ${className}` : ""}`}
      style={{ "--gvl-delay": `${delay}ms`, ...style }}
      {...props}
    >
      {children}
    </Tag>
  );
});
