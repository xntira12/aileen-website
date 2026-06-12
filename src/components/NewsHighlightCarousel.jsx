"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";

// ─── ใส่ banner ของคุณที่นี่ ──────────────────────────────────────────────
const BANNERS = [
  {
    id: 1,
    image: "/img/banners/banner-1.jpg",
    accent: "#10b981",          // emerald
    eyebrow: "Conference",
    title: "พบกับ Aileen Solutions ในงาน TNChE Asia 2026",
    subtitle: "9–11 มิถุนายน 2026 • Dusit Thani Pattaya • Booth A8",
    cta: { label: "อ่านรายละเอียด", href: "/news/aileen-solutions-at-tnche-asia-2026" },
  },
  {
    id: 2,
    image: "/img/banners/banner-2.jpg",
    accent: "#0ea5e9",          // sky
    eyebrow: "Event Highlight",
    title: "Safety Together: สร้างวัฒนธรรมความปลอดภัยอย่างยั่งยืน",
    subtitle: "12 พฤษภาคม 2026 • การไฟฟ้าฝ่ายผลิตแห่งประเทศไทย (EGAT)",
    cta: { label: "อ่านรายละเอียด", href: "/news/safety-together-sustainable-safety-culture" },
  },
  {
    id: 3,
    image: "/img/banners/banner-3.jpg",
    accent: "#f59e0b",          // amber
    eyebrow: "Seminar",
    title: "AI-Driven Automation: ขับเคลื่อนองค์กรอุตสาหกรรมสู่ยุคอัจฉริยะ",
    subtitle: "จังหวัดระยอง",
    cta: { label: "อ่านรายละเอียด", href: "/news/ai-driven-automation-rayong-industrial-seminar" },
  },
];
// ─────────────────────────────────────────────────────────────────────────────

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
  const [active, setActive]               = useState(0);
  const [animDir, setAnimDir]             = useState("next");
  const [isTransitioning, setIsTransitioning]  = useState(false);
  const [progress, setProgress]           = useState(0);
  const timerRef    = useRef(null);
  const progressRef = useRef(null);
  const startAt     = useRef(Date.now());
  const total       = BANNERS.length;

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    startTimer();
    return () => { clearInterval(timerRef.current); clearInterval(progressRef.current); };
  }, [startTimer]);

  function go(dir) {
    if (isTransitioning) return;
    clearInterval(timerRef.current);
    clearInterval(progressRef.current);
    setAnimDir(dir);
    setIsTransitioning(true);
    setTimeout(() => {
      setActive(prev =>
        dir === "next" ? (prev + 1) % total : (prev - 1 + total) % total
      );
      setIsTransitioning(false);
      startTimer();
    }, 400);
  }

  function goTo(i) {
    if (i === active || isTransitioning) return;
    go(i > active ? "next" : "prev");
    setTimeout(() => setActive(i), 0);
  }

  const banner = BANNERS[active];

  return (
    <section className="w-full bg-white py-8">
      <div className="max-w-6xl mx-auto px-6">

        {/* ── card ── */}
        <div className="relative h-[300px] rounded-2xl overflow-hidden border border-white/[0.07] shadow-[0_4px_40px_rgba(0,0,0,0.5)]">

          {/* animated slide */}
          <div
            key={active}
            className="absolute inset-0"
            style={{ animation: slideAnim(isTransitioning, animDir) }}
          >
            {/* background image */}
            {banner.image && (
              <img
                src={banner.image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-35 scale-105"
                style={{ transition: "transform 6s ease" }}
              />
            )}

            {/* fallback gradient + noise */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0c1e35] via-[#081528] to-[#050d1c]" />

            {/* accent glow */}
            <div
              className="absolute -top-16 -left-16 h-64 w-64 rounded-full opacity-20 blur-3xl"
              style={{ background: banner.accent }}
            />
            <div
              className="absolute bottom-0 right-0 h-48 w-96 opacity-10 blur-3xl"
              style={{ background: banner.accent }}
            />

            {/* subtle grid */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)",
                backgroundSize: "48px 48px",
              }}
            />

            {/* left gradient overlay — keeps text readable */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#050d1c]/95 via-[#050d1c]/60 to-transparent" />

            {/* ── content ── */}
            <div className="relative z-10 flex h-full flex-col justify-center pl-8 pr-32 md:pr-64 lg:pr-80">
              {/* eyebrow badge */}
              <div
                className="mb-3 inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-[10px] font-bold tracking-[0.18em] uppercase"
                style={{
                  background: `${banner.accent}18`,
                  border: `1px solid ${banner.accent}40`,
                  color: banner.accent,
                }}
              >
                <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: banner.accent }} />
                {banner.eyebrow}
              </div>

              {/* title */}
              <h3 className="text-xl font-bold text-white leading-snug line-clamp-2 md:text-2xl lg:text-[1.6rem]">
                {banner.title}
              </h3>

              {/* subtitle */}
              <p className="mt-2 text-xs text-white/40 truncate">{banner.subtitle}</p>

              {/* CTA */}
              {banner.cta && (
                <Link
                  href={banner.cta.href}
                  className="mt-5 inline-flex w-fit items-center gap-2 rounded-full px-5 py-2 text-xs font-semibold transition-all duration-200"
                  style={{
                    background: `${banner.accent}22`,
                    border: `1px solid ${banner.accent}50`,
                    color: banner.accent,
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = `${banner.accent}35`; }}
                  onMouseLeave={e => { e.currentTarget.style.background = `${banner.accent}22`; }}
                >
                  {banner.cta.label}
                  <svg className="w-3" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                  </svg>
                </Link>
              )}
            </div>
          </div>

          {/* ── arrows ── */}
          <button
            onClick={() => go("prev")}
            aria-label="Previous"
            className="absolute left-4 top-1/2 z-30 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white/30 backdrop-blur-sm hover:text-white/80 hover:border-white/30 hover:bg-black/60 transition-all"
          >
            <svg viewBox="0 0 8 12" fill="none" className="h-3 w-2">
              <path d="M6.5 1L1.5 6L6.5 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={() => go("next")}
            aria-label="Next"
            className="absolute right-4 top-1/2 z-30 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white/30 backdrop-blur-sm hover:text-white/80 hover:border-white/30 hover:bg-black/60 transition-all"
          >
            <svg viewBox="0 0 8 12" fill="none" className="h-3 w-2">
              <path d="M1.5 1L6.5 6L1.5 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* ── progress bar + dots ── */}
          <div className="absolute bottom-0 left-0 right-0 z-30 flex items-center gap-3 px-6 pb-4">
            {BANNERS.map((b, i) => (
              <button
                key={b.id}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className="relative flex-1 h-[3px] rounded-full overflow-hidden bg-white/10 hover:bg-white/20 transition-colors"
              >
                {i === active && (
                  <span
                    className="absolute left-0 top-0 h-full rounded-full"
                    style={{ width: `${progress}%`, background: banner.accent, transition: "width 40ms linear" }}
                  />
                )}
                {i < active && (
                  <span className="absolute inset-0 rounded-full" style={{ background: banner.accent, opacity: 0.5 }} />
                )}
              </button>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        @keyframes hlBannerInRight  { from{opacity:0;transform:translateX(40px)} to{opacity:1;transform:translateX(0)} }
        @keyframes hlBannerOutLeft  { from{opacity:1;transform:translateX(0)}    to{opacity:0;transform:translateX(-40px)} }
        @keyframes hlBannerInLeft   { from{opacity:0;transform:translateX(-40px)} to{opacity:1;transform:translateX(0)} }
        @keyframes hlBannerOutRight { from{opacity:1;transform:translateX(0)}    to{opacity:0;transform:translateX(40px)} }
      `}</style>
    </section>
  );
}
