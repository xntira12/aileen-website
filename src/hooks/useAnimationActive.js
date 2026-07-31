"use client";

import { useEffect, useState } from "react";

/**
 * Returns true when the element is in (or near) the viewport and the tab is visible.
 * Use to pause RAF / canvas loops off-screen without changing visuals on-screen.
 */
export function useAnimationActive(ref, { rootMargin = "120px", threshold = 0, initialVisible = false } = {}) {
  const [inView, setInView] = useState(initialVisible);
  const [tabVisible, setTabVisible] = useState(
    typeof document === "undefined" ? true : document.visibilityState === "visible",
  );

  useEffect(() => {
    const onVis = () => setTabVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin, threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, rootMargin, threshold]);

  return inView && tabVisible;
}
