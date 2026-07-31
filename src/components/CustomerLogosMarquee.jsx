"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CUSTOMER_LOGOS } from "../content/customerLogos";
import CustomerLogoItem from "./CustomerLogoItem";

/** Hero bottom curve: M0,0 Q720,150 1440,0 (viewBox height 160) */
const HERO_CURVE_RATIO = 150 / 1440;
const FOCUS_INTERVAL_MS = 2800;
/** Optical center tweak — negative shifts the whole row left */
const HERO_X_OFFSET = -20;

function getCurveY(centerX, referenceWidth, mode) {
  const t = Math.max(0, Math.min(1, centerX / referenceWidth));
  const depth = mode === "hero"
    ? referenceWidth * HERO_CURVE_RATIO
    : referenceWidth * 0.11;
  return 4 * t * (1 - t) * depth;
}

function applyCurve(viewportEl, trackEl, mode) {
  if (!viewportEl || !trackEl) return;
  const refWidth = mode === "hero" ? window.innerWidth : viewportEl.getBoundingClientRect().width;
  if (!refWidth) return;

  trackEl.querySelectorAll("[data-curve-slot]").forEach((slot) => {
    const sRect = slot.getBoundingClientRect();
    const cx = mode === "hero"
      ? sRect.left + sRect.width / 2
      : sRect.left + sRect.width / 2 - viewportEl.getBoundingClientRect().left;
    const y = getCurveY(cx, refWidth, mode);
    slot.style.transform = `translate3d(0, ${y}px, 0)`;
  });
}

function applyFocus(viewportEl, slots) {
  if (!viewportEl) return;
  const vRect = viewportEl.getBoundingClientRect();
  const centerX = vRect.left + vRect.width / 2;
  const half = vRect.width / 2;

  slots.forEach((slot) => {
    if (!slot) return;
    const sRect = slot.getBoundingClientRect();
    const cx = sRect.left + sRect.width / 2;
    const dist = Math.min(1, Math.abs(cx - centerX) / half);
    const focus = Math.max(0, 1 - dist * 0.72);
    const scale = 0.8 + focus * 0.2;
    const opacity = 0.38 + focus * 0.62;
    slot.style.opacity = String(opacity);
    const inner = slot.querySelector("[data-curve-inner]");
    if (inner) inner.style.transform = `scale(${scale})`;
  });
}

/* ── Hero: center-focus carousel along curve ── */
function HeroLogosFocus({ logos, active }) {
  const count = logos.length;
  const extended = useMemo(() => [...logos, ...logos, ...logos], [logos]);
  const startIndex = count + Math.floor(count / 2);

  const [index, setIndex] = useState(startIndex);
  const [paused, setPaused] = useState(false);

  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const slotRefs = useRef([]);
  const skipTransitionRef = useRef(false);

  const layout = useCallback(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const slot = slotRefs.current[index];
    if (!viewport || !track || !slot) return;

    if (skipTransitionRef.current) {
      track.style.transition = "none";
    }

    const x = viewport.clientWidth / 2 - (slot.offsetLeft + slot.offsetWidth / 2) + HERO_X_OFFSET;
    track.style.transform = `translate3d(${x}px, 0, 0)`;
    applyFocus(viewport, slotRefs.current);
    applyCurve(viewport, track, "hero");

    if (skipTransitionRef.current) {
      track.offsetHeight;
      track.style.transition = "";
      skipTransitionRef.current = false;
    }
  }, [index]);

  const snapIfNeeded = useCallback((i) => {
    if (i >= count * 2) return count + (i % count);
    if (i < count) return count + ((i % count) + count) % count;
    return i;
  }, [count]);

  useEffect(() => {
    layout();
    const id = requestAnimationFrame(() => requestAnimationFrame(layout));
    const onResize = () => layout();
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", onResize);
    };
  }, [layout]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onEnd = (e) => {
      if (e.propertyName !== "transform") return;
      const next = snapIfNeeded(index);
      if (next !== index) {
        skipTransitionRef.current = true;
        setIndex(next);
      }
    };
    track.addEventListener("transitionend", onEnd);
    return () => track.removeEventListener("transitionend", onEnd);
  }, [index, snapIfNeeded]);

  useEffect(() => {
    if (!active) return;
    let raf = 0;
    const tick = () => {
      applyFocus(viewportRef.current, slotRefs.current);
      applyCurve(viewportRef.current, trackRef.current, "hero");
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, index]);

  useEffect(() => {
    if (!active || paused) return;
    const id = setInterval(() => setIndex((i) => i + 1), FOCUS_INTERVAL_MS);
    return () => clearInterval(id);
  }, [active, paused]);

  const go = (dir) => setIndex((i) => i + dir);

  const onPointerDown = useRef({ x: 0, t: 0 });
  const handlePointerDown = (e) => {
    onPointerDown.current = { x: e.clientX, t: Date.now() };
  };
  const handlePointerUp = (e) => {
    const dx = e.clientX - onPointerDown.current.x;
    const dt = Date.now() - onPointerDown.current.t;
    if (dt < 600 && Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
  };

  return (
    <div className="cm-marquee-curve cm-marquee-curve--hero w-full">
      <div
        ref={viewportRef}
        className="cm-marquee-viewport cm-marquee-viewport--hero relative mx-auto w-full select-none"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        style={{ cursor: "grab" }}
      >
        <div ref={trackRef} className="cm-focus-track flex items-start gap-8 sm:gap-12 md:gap-14">
          {extended.map((l, idx) => (
            <div
              key={`${l.alt}-${idx}`}
              ref={(el) => { slotRefs.current[idx] = el; }}
              data-curve-slot
              className="shrink-0 will-change-transform transition-opacity duration-500"
            >
              <div data-curve-inner className="cm-focus-inner transition-transform duration-500">
                <CustomerLogoItem
                  src={l.src}
                  alt={l.alt}
                  imgClass={l.imgClass}
                  idx={idx % count}
                  total={count}
                  revealed
                  animate={false}
                  wrapperClassName="group relative flex h-12 w-28 shrink-0 items-center justify-center overflow-visible sm:h-14 sm:w-32"
                  imgClassName="cm-logo-item max-h-10 w-auto opacity-90 sm:max-h-11"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Default: infinite marquee ── */
function LogosMarquee({ logos, revealed, active, imgClassName, containerClassName }) {
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const rafRef = useRef(null);
  const posRef = useRef(0);
  const draggingRef = useRef(false);
  const lastXRef = useRef(0);
  const [paused, setPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const normalizePos = (pos, halfWidth) => {
    if (!halfWidth) return 0;
    return -(((-pos % halfWidth) + halfWidth) % halfWidth);
  };

  useEffect(() => {
    if (!active) return;
    const tick = () => {
      rafRef.current = requestAnimationFrame(tick);
      const track = trackRef.current;
      if (!track) return;
      const halfWidth = track.scrollWidth / 2;
      if (halfWidth && !paused && !draggingRef.current) posRef.current -= 0.65;
      if (halfWidth) posRef.current = normalizePos(posRef.current, halfWidth);
      track.style.transform = `translate3d(${posRef.current}px, 0, 0)`;
      applyCurve(viewportRef.current, track, "default");
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [paused, active]);

  useEffect(() => {
    const onResize = () => applyCurve(viewportRef.current, trackRef.current, "default");
    window.addEventListener("resize", onResize, { passive: true });
    onResize();
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const onPointerDown = (e) => {
    draggingRef.current = true;
    setIsDragging(true);
    lastXRef.current = e.clientX;
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e) => {
    if (!draggingRef.current) return;
    const track = trackRef.current;
    if (!track) return;
    const halfWidth = track.scrollWidth / 2;
    if (!halfWidth) return;
    const dx = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;
    posRef.current += dx;
    posRef.current = normalizePos(posRef.current, halfWidth);
    track.style.transform = `translate3d(${posRef.current}px, 0, 0)`;
    applyCurve(viewportRef.current, track, "default");
  };
  const onPointerUp = () => { draggingRef.current = false; setIsDragging(false); };

  const img = imgClassName ?? "cm-logo-item max-h-14 w-auto opacity-70 group-hover:opacity-100 sm:max-h-16";
  const wrap = containerClassName ?? "mx-auto w-full max-w-7xl px-6";

  return (
    <div className={`cm-marquee-curve ${wrap}`}>
      <div
        ref={viewportRef}
        className="cm-marquee-viewport relative select-none"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
      >
        <div ref={trackRef} className="flex items-start gap-10 will-change-transform sm:gap-14 md:gap-16">
          {logos.map((l, idx) => (
            <div key={`a-${idx}`} data-curve-slot className="shrink-0 will-change-transform">
              <CustomerLogoItem {...l} idx={idx} total={logos.length} revealed={revealed} animate wrapperClassName="group relative flex h-14 w-32 shrink-0 items-center justify-center overflow-visible sm:h-16 sm:w-36" imgClassName={img} />
            </div>
          ))}
          {logos.map((l, idx) => (
            <div key={`b-${idx}`} data-curve-slot className="shrink-0 will-change-transform">
              <CustomerLogoItem {...l} idx={idx} total={logos.length} revealed={revealed} animate={false} wrapperClassName="group relative flex h-14 w-32 shrink-0 items-center justify-center overflow-visible sm:h-16 sm:w-36" imgClassName={img} />
            </div>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-white via-white/80 to-transparent sm:w-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-white via-white/80 to-transparent sm:w-10" />
      </div>
    </div>
  );
}

export default function CustomerLogosMarquee({
  revealed = false,
  active = true,
  className = "",
  variant = "default",
  containerClassName,
  imgClassName,
  logos = CUSTOMER_LOGOS,
}) {
  const list = useMemo(() => logos, [logos]);

  if (variant === "hero") {
    return <HeroLogosFocus logos={list} active={active} />;
  }

  return (
    <LogosMarquee
      logos={list}
      revealed={revealed}
      active={active}
      imgClassName={imgClassName}
      containerClassName={[containerClassName, className].filter(Boolean).join(" ") || undefined}
    />
  );
}
