"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Reveal, RevealSection } from "@/components/GavalonReveal";
import mockupAi from "@/assets/img/gavalon/mockups/gvl-AI-z2YET9fL.webp";
import mockupDashboard from "@/assets/img/gavalon/mockups/gvl-Dashbard-CCiTqFfy.webp";
import mockupDatabase from "@/assets/img/gavalon/mockups/gvl-Database-BRrXi2AU.webp";
import mockupEditable from "@/assets/img/gavalon/mockups/gvl-Editable-C0mrSiAw.webp";
import mockupSearch from "@/assets/img/gavalon/mockups/gvl-Search-CvViLm15.webp";
import mockupConsultant from "@/assets/img/gavalon/mockups/gvl-consultant-C4JtleyC.webp";

const MOCKUPS = [
  { id: "database", src: mockupDatabase, altKey: "database", className: "gvl-ov-mock gvl-ov-mock--1" },
  { id: "dashboard", src: mockupDashboard, altKey: "dashboard", className: "gvl-ov-mock gvl-ov-mock--2" },
  { id: "search", src: mockupSearch, altKey: "search", className: "gvl-ov-mock gvl-ov-mock--3" },
  { id: "ai", src: mockupAi, altKey: "ai", className: "gvl-ov-mock gvl-ov-mock--4" },
  { id: "editable", src: mockupEditable, altKey: "editable", className: "gvl-ov-mock gvl-ov-mock--5" },
  { id: "consultant", src: mockupConsultant, altKey: "consultant", className: "gvl-ov-mock gvl-ov-mock--6" },
];

const DEFAULT_ALTS = {
  database: "GAVALON Legal Database",
  dashboard: "GAVALON Dashboard",
  search: "GAVALON Legal Search",
  ai: "GAVALON AI",
  editable: "GAVALON Editable Workspace",
  consultant: "GAVALON Consultant",
};

/** Circle geometry in viewBox 640×640 — left arc only, clear of mockups */
const CIRCLE = { cx: 348, cy: 320, r: 198 };

/** Degrees: 0 = right, CCW. Wider left arc for more spacing between points. */
const POINT_ANGLES = [-118, -142, -166, -194, -218, -242];

const POINT_POS = POINT_ANGLES.map((deg) => {
  const rad = (deg * Math.PI) / 180;
  return {
    top: `${((CIRCLE.cy + CIRCLE.r * Math.sin(rad)) / 640) * 100}%`,
    left: `${((CIRCLE.cx + CIRCLE.r * Math.cos(rad)) / 640) * 100}%`,
  };
});

function arcLabelLines(label) {
  if (Array.isArray(label)) return label.filter(Boolean);
  return String(label ?? "").split("\n").filter(Boolean);
}

function ArcLabel({ label, className = "" }) {
  const lines = arcLabelLines(label);
  return (
    <span className={`inline-flex flex-col ${className}`}>
      {lines.map((line, i) => (
        <span key={`${i}-${line}`} className="block whitespace-nowrap">
          {line}
        </span>
      ))}
    </span>
  );
}

function SpotlightCircle({ children, className = "", onActiveChange }) {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, active: false });
  const onActiveChangeRef = useRef(onActiveChange);
  onActiveChangeRef.current = onActiveChange;

  const onMouseMove = useCallback((event) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    setTilt((prev) => {
      if (!prev.active) onActiveChangeRef.current?.(true);
      return {
        rx: py * -18,
        ry: px * 18,
        active: true,
      };
    });
  }, []);

  const onMouseLeave = useCallback(() => {
    setTilt({ rx: 0, ry: 0, active: false });
    onActiveChangeRef.current?.(false);
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`pointer-events-auto relative flex h-14 w-14 shrink-0 cursor-pointer items-center justify-center ${className}`}
      style={{
        perspective: "500px",
        zIndex: tilt.active ? 5 : 1,
      }}
    >
      <div
        className="flex h-11 w-11 items-center justify-center rounded-full border-[3px] border-white bg-[linear-gradient(135deg,#0b639b,#4fc3f7)] text-white shadow-[0_10px_24px_rgba(11,99,155,0.28)] transition-[transform,box-shadow] duration-200 ease-out will-change-transform"
        style={{
          transform: tilt.active
            ? `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(1.28) translateZ(8px)`
            : "rotateX(0deg) rotateY(0deg) scale(1) translateZ(0)",
          boxShadow: tilt.active
            ? "0 16px 36px rgba(11,99,155,0.38), 0 0 0 4px rgba(79,195,247,0.22)"
            : "0 10px 24px rgba(11,99,155,0.28)",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function CirclePointItem({ label, index, top, left, floatClass, delay = 0 }) {
  const [active, setActive] = useState(false);

  return (
    <Reveal
      delay={delay}
      variant="fade"
      className={`gvl-ov-float absolute ${floatClass}`}
      style={{ top, left }}
    >
      <div className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2">
        <SpotlightCircle onActiveChange={setActive}>
          <PointIcon index={index} />
        </SpotlightCircle>
      </div>
      <div
        className="absolute right-[1.65rem] top-0 flex origin-right items-center gap-2 transition-[transform,color] duration-200 ease-out"
        style={{
          transform: active ? "translateY(-50%) scale(1.12)" : "translateY(-50%) scale(1)",
        }}
      >
        <ArcLabel
          label={label}
          className={`pointer-events-none text-right text-[13px] font-semibold leading-snug transition-colors duration-200 xl:text-sm ${
            active ? "text-[#0b639b]" : "text-slate-700"
          }`}
        />
        <span
          className={`pointer-events-none h-px shrink-0 border-t border-dashed transition-[width,border-color] duration-200 ${
            active ? "w-5 border-[#4fc3f7]" : "w-3.5 border-slate-300"
          }`}
        />
      </div>
    </Reveal>
  );
}

function PointIcon({ index }) {
  const common = { viewBox: "0 0 24 24", fill: "none", className: "h-5 w-5", "aria-hidden": true };
  if (index === 0) {
    return (
      <svg {...common}>
        <path d="M12 5v14M8 9l4-4 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 19h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }
  if (index === 1) {
    return (
      <svg {...common}>
        <circle cx="9" cy="9" r="3.5" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="15.5" cy="15.5" r="3.5" stroke="currentColor" strokeWidth="1.8" />
        <path d="M11.5 11.5l2 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }
  if (index === 2) {
    return (
      <svg {...common}>
        <path d="M5 6h14M5 12h10M5 18h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="18" cy="12" r="2.2" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    );
  }
  if (index === 3) {
    return (
      <svg {...common}>
        <path d="M5 8.5c0-1.4 1.6-2.5 4-2.5s4 1.1 4 2.5-1.6 2.5-4 2.5H8l-2.2 2V11" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12.5 14.5c.6-.4 1.5-.7 2.5-.7 2 0 3.5.9 3.5 2s-1.5 2-3.5 2h-.7L12 19.5V16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (index === 4) {
    return (
      <svg {...common}>
        <path d="M12 3l8 4v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V7l8-4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M9.5 12.2l1.8 1.8 3.5-3.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M4 19V5M4 19h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M8 15l3.5-4.5 3 3L19 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MockupLightbox({ items, index, onClose, onPrev, onNext, closeLabel, prevLabel, nextLabel }) {
  const titleId = useId();
  const item = items[index];
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onPrev, onNext]);

  if (!mounted || !item) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur-sm sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={onClose}
    >
      <button
        type="button"
        className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
        onClick={onClose}
        aria-label={closeLabel}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      <button
        type="button"
        className="absolute left-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20 md:left-6"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label={prevLabel}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
          <path d="M14.5 6L9 12l5.5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <button
        type="button"
        className="absolute right-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20 md:right-6"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label={nextLabel}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
          <path d="M9.5 6L15 12l-5.5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div
        className="relative flex max-h-[88vh] w-full max-w-6xl flex-col items-center gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <p id={titleId} className="text-sm font-semibold tracking-wide text-white/85">
          {item.alt}
          <span className="ml-3 text-white/45">
            {index + 1} / {items.length}
          </span>
        </p>
        <img
          src={item.src}
          alt={item.alt}
          className="max-h-[78vh] w-auto max-w-full rounded-xl border border-white/10 object-contain shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
        />
        <div className="flex gap-3 sm:hidden">
          <button
            type="button"
            className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white"
            onClick={onPrev}
          >
            {prevLabel}
          </button>
          <button
            type="button"
            className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white"
            onClick={onNext}
          >
            {nextLabel}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default function GavalonOverviewSection({ sectionX = "", overview = {} }) {
  const points = overview.arcPoints ?? [];
  const alts = overview.mockupAlts ?? DEFAULT_ALTS;
  const lightboxCopy = overview.lightbox ?? {};
  const [activeIndex, setActiveIndex] = useState(null);
  const [focusIndex, setFocusIndex] = useState(0);
  const [cyclePaused, setCyclePaused] = useState(false);

  const gallery = MOCKUPS.map((m) => ({
    id: m.id,
    src: m.src.src,
    alt: alts[m.altKey] ?? DEFAULT_ALTS[m.altKey] ?? m.id,
    className: m.className,
  }));

  const closeLightbox = useCallback(() => setActiveIndex(null), []);
  const openLightbox = useCallback((index) => setActiveIndex(index), []);
  const showPrev = useCallback(() => {
    setActiveIndex((i) => (i == null ? i : (i - 1 + gallery.length) % gallery.length));
  }, [gallery.length]);
  const showNext = useCallback(() => {
    setActiveIndex((i) => (i == null ? i : (i + 1) % gallery.length));
  }, [gallery.length]);

  useEffect(() => {
    if (cyclePaused || activeIndex != null || gallery.length < 2) return undefined;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }
    const id = window.setInterval(() => {
      setFocusIndex((i) => (i + 1) % gallery.length);
    }, 2600);
    return () => window.clearInterval(id);
  }, [cyclePaused, activeIndex, gallery.length]);

  return (
    <RevealSection
      as="section"
      id="overview"
      threshold={0.35}
      rootMargin="0px 0px -38% 0px"
      className={`relative overflow-hidden bg-white ${sectionX} py-20 md:py-28`}
    >
      <div
        className="pointer-events-none absolute left-6 top-10 h-40 w-40 opacity-[0.35] md:left-16"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(11,99,155,0.22) 1px, transparent 1.2px)",
          backgroundSize: "14px 14px",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-10 right-8 h-48 w-48 opacity-[0.28]"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(11,99,155,0.2) 1px, transparent 1.2px)",
          backgroundSize: "14px 14px",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.62fr_1.38fr] lg:gap-4 xl:gap-8">
        <div className="relative z-10 max-w-sm lg:max-w-[20rem] xl:max-w-sm">
          <Reveal delay={0} variant="left">
            <h2 className="text-3xl font-extrabold leading-[1.08] tracking-tight text-slate-900 md:text-4xl xl:text-5xl">
              {overview.title}
              {overview.highlight ? (
                <span className="mt-1 block bg-[linear-gradient(90deg,#0b639b,#4fc3f7,#62e5da)] bg-clip-text text-transparent">
                  {overview.highlight}
                </span>
              ) : null}
            </h2>
          </Reveal>
          <Reveal delay={100} variant="fade">
            <div className="mt-6 h-[3px] w-14 rounded-full bg-[linear-gradient(90deg,#0b639b,#62e5da)]" />
          </Reveal>
          {(overview.points ?? []).length > 0 ? (
            <div className="mt-8 space-y-5 text-base leading-8 text-slate-600 md:text-[17px]">
              {(overview.points ?? []).map((point, i) => (
                <Reveal key={point.slice(0, 40)} delay={180 + i * 100} variant="up" as="p">
                  {point}
                </Reveal>
              ))}
            </div>
          ) : null}
        </div>

        <div className="relative mx-auto w-full max-w-[720px] lg:max-w-none">
          <ul className="mb-8 space-y-3 lg:hidden">
            {points.map((label, i) => (
              <Reveal
                key={arcLabelLines(label).join(" ")}
                as="li"
                delay={200 + i * 90}
                variant="up"
                className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white px-4 py-3 shadow-[0_8px_24px_rgba(15,23,42,0.05)]"
              >
                <SpotlightCircle>
                  <PointIcon index={i} />
                </SpotlightCircle>
                <ArcLabel label={label} className="text-sm font-semibold leading-snug text-slate-800" />
              </Reveal>
            ))}
          </ul>

          <div className="gvl-ov-stage relative mx-auto aspect-[1/1.05] w-full min-h-[420px] sm:min-h-[500px] lg:min-h-[560px]">
            <div
              className="pointer-events-none absolute right-[4%] top-[12%] h-[68%] w-[62%] rounded-full bg-[radial-gradient(circle,rgba(79,195,247,0.28),rgba(11,99,155,0.08)_55%,transparent_72%)] blur-2xl"
              aria-hidden="true"
            />

            <Reveal delay={160} variant="scale" className="pointer-events-none absolute inset-0 z-[12] hidden lg:block">
              <svg
                className="h-full w-full"
                viewBox="0 0 640 640"
                fill="none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="gvlArcGrad" x1="80" y1="80" x2="480" y2="560" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#0b639b" />
                    <stop offset="0.45" stopColor="#4fc3f7" />
                    <stop offset="1" stopColor="#62e5da" />
                  </linearGradient>
                  <filter id="gvlArcGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="4" result="b" />
                    <feMerge>
                      <feMergeNode in="b" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <circle
                  cx={CIRCLE.cx}
                  cy={CIRCLE.cy}
                  r={CIRCLE.r}
                  stroke="url(#gvlArcGrad)"
                  strokeWidth="26"
                  fill="none"
                  filter="url(#gvlArcGlow)"
                  opacity="0.92"
                />
              </svg>
            </Reveal>

            <div
              className="gvl-ov-comet pointer-events-none absolute z-[13] hidden -translate-x-1/2 -translate-y-1/2 lg:block"
              style={{
                left: `${(CIRCLE.cx / 640) * 100}%`,
                top: `${(CIRCLE.cy / 640) * 100}%`,
                width: `${((CIRCLE.r * 2) / 640) * 100}%`,
                height: `${((CIRCLE.r * 2) / 640) * 100}%`,
              }}
              aria-hidden="true"
            >
              <Reveal delay={240} variant="fade" className="absolute inset-0">
                <div className="gvl-ov-comet-bloom" />
                <div className="gvl-ov-comet-band" />
              </Reveal>
            </div>

            <div className="pointer-events-none absolute inset-0 z-40 hidden lg:block">
              {points.map((label, i) => {
                const pos = POINT_POS[i] ?? POINT_POS[0];
                const key = arcLabelLines(label).join(" ");
                return (
                  <CirclePointItem
                    key={key}
                    label={label}
                    index={i}
                    top={pos.top}
                    left={pos.left}
                    floatClass={`gvl-ov-float--${(i % 6) + 1}`}
                    delay={380 + i * 90}
                  />
                );
              })}
            </div>

            <div
              className="gvl-ov-mocks absolute inset-y-[2%] right-0 z-30 w-[70%] sm:w-[64%] lg:w-[48%]"
              onMouseEnter={() => setCyclePaused(true)}
              onMouseLeave={() => setCyclePaused(false)}
            >
              {gallery.map((mock, index) => (
                <Reveal
                  key={mock.id}
                  as="button"
                  type="button"
                  delay={420 + index * 100}
                  variant="fade"
                  className={`${mock.className} group cursor-zoom-in focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0b639b]${
                    focusIndex === index ? " is-focus" : ""
                  }`}
                  onClick={() => openLightbox(index)}
                  aria-label={`${lightboxCopy.viewLarge ?? "View larger"}: ${mock.alt}`}
                >
                  <img
                    src={mock.src}
                    alt={mock.alt}
                    className="h-full w-full object-cover object-top transition duration-300 group-hover:brightness-[1.03]"
                    loading="lazy"
                  />
                  <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/25 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                  <span className="pointer-events-none absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-slate-700 opacity-0 shadow-md transition group-hover:opacity-100">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
                      <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.8" />
                      <path d="M16 16l4 4M11 8v6M8 11h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  </span>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>

      {activeIndex != null ? (
        <MockupLightbox
          items={gallery}
          index={activeIndex}
          onClose={closeLightbox}
          onPrev={showPrev}
          onNext={showNext}
          closeLabel={lightboxCopy.close ?? "Close"}
          prevLabel={lightboxCopy.prev ?? "Previous"}
          nextLabel={lightboxCopy.next ?? "Next"}
        />
      ) : null}
    </RevealSection>
  );
}
