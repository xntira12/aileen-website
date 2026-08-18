"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import epvWeb from "../assets/img/News/enterprise-process-visibility/epv-web.png";
import epvRecapHero from "../assets/img/News/enterprise-process-visibility/20260709_120808.jpg";

const BANNERS = [
  {
    id: 1,
    image: epvRecapHero.src,
    accent: "#f97316",
    eyebrow: "Seminar Recap",
    heading: "Enterprise Process Visibility",
    tagline: "ยกระดับกระบวนการสู่การเติบโตอย่างยั่งยืน",
    subtitle: "9 กรกฎาคม 2026 • Hotel Nikko Amata City, Chonburi • ห้อง Trusu 2",
    cta: {
      label: "อ่านสรุปงาน",
      href: "/news/aileen-nintex-enterprise-process-visibility-seminar-2026",
    },
  },
  {
    id: 2,
    image: epvWeb.src,
    accent: "#f97316",
    eyebrow: "Seminar",
    heading: "Enterprise Process Visibility",
    tagline: "เพราะกระบวนการที่ดี คือรากฐานของความยั่งยืน",
    subtitle: "9 กรกฎาคม 2026 • Hotel Nikko Amata City, Chonburi • ห้อง Trusu 2",
    cta: {
      label: "อ่านรายละเอียด",
      href: "/news/enterprise-process-visibility-sustainable-operations-2026",
    },
  },
];

const INTERVAL = 5500;

function slideAnim(transitioning, dir) {
  if (transitioning) {
    return dir === "next"
      ? "hlBannerOutLeft 0.4s cubic-bezier(0.4,0,0.2,1) forwards"
      : "hlBannerOutRight 0.4s cubic-bezier(0.4,0,0.2,1) forwards";
  }
  return dir === "next"
    ? "hlBannerInRight 0.4s cubic-bezier(0.4,0,0.2,1) forwards"
    : "hlBannerInLeft 0.4s cubic-bezier(0.4,0,0.2,1) forwards";
}

export default function NewsHighlightCarousel() {
  const [active, setActive] = useState(0);
  const [animDir, setAnimDir] = useState("next");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef(null);
  const progressRef = useRef(null);
  const startAt = useRef(Date.now());
  const total = BANNERS.length;

  const startTimer = useCallback(() => {
    clearInterval(timerRef.current);
    clearInterval(progressRef.current);
    startAt.current = Date.now();
    setProgress(0);

    progressRef.current = setInterval(() => {
      const pct = Math.min(((Date.now() - startAt.current) / INTERVAL) * 100, 100);
      setProgress(pct);
    }, 40);

    timerRef.current = setInterval(() => go("next"), INTERVAL);
  }, []);

  useEffect(() => {
    startTimer();
    return () => {
      clearInterval(timerRef.current);
      clearInterval(progressRef.current);
    };
  }, [startTimer]);

  function go(dir) {
    if (isTransitioning) return;
    clearInterval(timerRef.current);
    clearInterval(progressRef.current);
    setAnimDir(dir);
    setIsTransitioning(true);
    setTimeout(() => {
      setActive((prev) => (dir === "next" ? (prev + 1) % total : (prev - 1 + total) % total));
      setIsTransitioning(false);
      startTimer();
    }, 400);
  }

  function goTo(index) {
    if (index === active || isTransitioning) return;
    go(index > active ? "next" : "prev");
    setTimeout(() => setActive(index), 0);
  }

  const banner = BANNERS[active];

  return (
    <section className="w-full bg-gradient-to-b from-transparent to-white pb-10 pt-0">
      <div className="mx-auto max-w-7xl px-4">
        <div className="relative h-[440px] overflow-hidden rounded-2xl border border-white/[0.06] shadow-[0_-4px_24px_rgba(0,0,0,0.12),0_16px_56px_rgba(0,0,0,0.55)]">
          <div
            key={active}
            className="absolute inset-0"
            style={{ animation: slideAnim(isTransitioning, animDir) }}
          >
            {/* Dark base */}
            <div className="absolute inset-0 bg-[#060f1d]" />

            {/* Dot texture */}
            <div
              className="absolute inset-0 opacity-[0.018]"
              style={{
                backgroundImage: "radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />

            {/* Left accent glow */}
            <div
              className="absolute -left-24 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full opacity-[0.12] blur-[90px]"
              style={{ background: banner.accent }}
            />

            {/* Right: image panel — wider so image reaches further left */}
            {banner.image ? (
              <div className="pointer-events-none absolute bottom-0 right-0 top-0 w-[72%]">
                <img
                  src={banner.image}
                  alt=""
                  className="h-full w-full object-cover"
                  style={{
                    objectPosition: banner.imageObjectPosition || "left top",
                    ...(banner.imageScale
                      ? {
                          transform: `scale(${banner.imageScale})`,
                          transformOrigin: banner.imageObjectPosition || "left top",
                        }
                      : {}),
                  }}
                />
                {/* wide gradient: image colours bleed into left text area */}
                <div className="absolute inset-y-0 left-0 w-[55%] bg-gradient-to-r from-[#060f1d] via-[#060f1d]/60 to-transparent" />
                {/* bottom fade for progress bar */}
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#060f1d]/70 to-transparent" />
              </div>
            ) : (
              /* No-image: decorative rings */
              <div className="pointer-events-none absolute bottom-0 right-0 top-0 flex w-[46%] items-center justify-center overflow-hidden">
                <div className="absolute h-[280px] w-[280px] rounded-full opacity-[0.09] blur-2xl" style={{ background: banner.accent }} />
                <div className="absolute h-[380px] w-[380px] rounded-full" style={{ border: `1px solid ${banner.accent}18` }} />
                <div className="absolute h-[280px] w-[280px] rounded-full" style={{ border: `1px solid ${banner.accent}28` }} />
                <div className="absolute h-[180px] w-[180px] rounded-full" style={{ border: `1px solid ${banner.accent}38`, background: `${banner.accent}06` }} />
                <div className="absolute h-2 w-2 rounded-full" style={{ background: banner.accent, boxShadow: `0 0 18px 4px ${banner.accent}80` }} />
                <div className="absolute h-px w-48 opacity-20" style={{ background: `linear-gradient(to right, transparent, ${banner.accent}, transparent)` }} />
                <div className="absolute h-48 w-px opacity-20" style={{ background: `linear-gradient(to bottom, transparent, ${banner.accent}, transparent)` }} />
              </div>
            )}

            {/* Text content — left side */}
            <div className="relative z-10 flex h-full flex-col justify-center px-10 lg:max-w-[48%] lg:px-14">
              {/* Eyebrow */}
              <div
                className="mb-5 inline-flex w-fit items-center gap-2 rounded-full px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em]"
                style={{
                  background: `${banner.accent}16`,
                  border: `1px solid ${banner.accent}38`,
                  color: banner.accent,
                }}
              >
                <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: banner.accent }} />
                {banner.eyebrow}
              </div>

              {/* Title */}
              <h3 className="whitespace-nowrap text-[1.6rem] font-bold leading-tight tracking-tight text-white md:text-[1.9rem] lg:text-[2.2rem]">
                {banner.heading ?? banner.title}
              </h3>
              {banner.tagline ? (
                <p className="mt-1 text-base font-medium text-white/70 lg:text-lg">
                  {banner.tagline}
                </p>
              ) : null}

              {/* Subtitle */}
              <div className="mt-5 flex items-start gap-3">
                <div
                  className="mt-[6px] h-[18px] w-[3px] shrink-0 rounded-full"
                  style={{ background: banner.accent }}
                />
                <p className="text-sm leading-relaxed text-white/50">{banner.subtitle}</p>
              </div>

              {/* CTA */}
              {banner.cta ? (
                <Link
                  href={banner.cta.href}
                  className="mt-8 inline-flex w-fit items-center gap-2.5 rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-200 hover:scale-[1.03]"
                  style={{
                    background: banner.accent,
                    color: "#fff",
                    boxShadow: `0 4px 24px ${banner.accent}55`,
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.filter = "brightness(1.12)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.filter = ""; }}
                >
                  {banner.cta.label}
                  <svg className="w-3.5" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                  </svg>
                </Link>
              ) : null}
            </div>
          </div>

          {/* Prev / Next — hidden when only one banner */}
          {total > 1 ? (
            <>
              <button
                onClick={() => go("prev")}
                aria-label="Previous"
                className="absolute left-4 top-1/2 z-30 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white/30 backdrop-blur-sm transition-all hover:border-white/30 hover:bg-black/60 hover:text-white/80"
              >
                <svg viewBox="0 0 8 12" fill="none" className="h-3 w-2">
                  <path d="M6.5 1L1.5 6L6.5 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                onClick={() => go("next")}
                aria-label="Next"
                className="absolute right-4 top-1/2 z-30 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white/30 backdrop-blur-sm transition-all hover:border-white/30 hover:bg-black/60 hover:text-white/80"
              >
                <svg viewBox="0 0 8 12" fill="none" className="h-3 w-2">
                  <path d="M1.5 1L6.5 6L1.5 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* Progress bar */}
              <div className="absolute bottom-0 left-0 right-0 z-30 flex items-center gap-3 px-10 pb-5 lg:px-14">
                {BANNERS.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => goTo(index)}
                    aria-label={`Go to slide ${index + 1}`}
                    className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-white/10 transition-colors hover:bg-white/20"
                  >
                    {index === active ? (
                      <span
                        className="absolute left-0 top-0 h-full rounded-full"
                        style={{ width: `${progress}%`, background: banner.accent, transition: "width 40ms linear" }}
                      />
                    ) : null}
                    {index < active ? (
                      <span className="absolute inset-0 rounded-full" style={{ background: banner.accent, opacity: 0.45 }} />
                    ) : null}
                  </button>
                ))}
              </div>
            </>
          ) : null}
        </div>
      </div>

      <style>{`
        @keyframes hlBannerInRight  { from{opacity:0;transform:translateX(36px)} to{opacity:1;transform:translateX(0)} }
        @keyframes hlBannerOutLeft  { from{opacity:1;transform:translateX(0)}    to{opacity:0;transform:translateX(-36px)} }
        @keyframes hlBannerInLeft   { from{opacity:0;transform:translateX(-36px)} to{opacity:1;transform:translateX(0)} }
        @keyframes hlBannerOutRight { from{opacity:1;transform:translateX(0)}    to{opacity:0;transform:translateX(36px)} }
      `}</style>
    </section>
  );
}
