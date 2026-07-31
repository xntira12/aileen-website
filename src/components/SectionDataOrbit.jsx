"use client";
import { useEffect, useRef, useState } from "react";
import { useLocale } from "../i18n/LocaleProvider";

const CHIP_TONES = [
  { tone: "slate", className: "text-slate-700 bg-slate-50 ring-slate-200" },
  { tone: "blue", className: "text-blue-700 bg-blue-50 ring-blue-200" },
  { tone: "emerald", className: "text-emerald-700 bg-emerald-50 ring-emerald-200" },
  { tone: "blue", className: "text-blue-700 bg-blue-50 ring-blue-200" },
  { tone: "slate", className: "text-slate-700 bg-slate-50 ring-slate-200" },
  { tone: "emerald", className: "text-emerald-700 bg-emerald-50 ring-emerald-200" },
];

const ORBIT_CHIP_CONFIG = [
  { tone: "slate", style: { left: "-35%", top: "48%" }, activeIndex: 5 },
  { tone: "blue", style: { left: "-5%", top: "15%" }, activeIndex: 0 },
  { tone: "emerald", style: { left: "55%", top: "10%" }, activeIndex: 1 },
  { tone: "blue", style: { left: "77%", top: "40%" }, activeIndex: 2 },
  { tone: "slate", style: { left: "62%", top: "74%" }, activeIndex: 3 },
  { tone: "emerald", style: { left: "5%", top: "75%" }, activeIndex: 4 },
];

const OrbitChip = ({ style, title, tooltip, tone = "blue", isActive = false, inView = false, revealDelay = 0 }) => {
  const toneMap = {
    blue: "bg-blue-50 text-blue-700 ring-blue-200",
    emerald: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    violet: "bg-violet-50 text-violet-700 ring-violet-200",
    slate: "bg-slate-50 text-slate-700 ring-slate-200",
  };
  return (
    <div
      className={[
        "orbit-chip group absolute flex items-center rounded-full px-4 py-2 text-sm font-semibold shadow-sm ring-1",
        toneMap[tone],
        isActive ? "is-active" : "",
        `orb-rv ${inView ? "on" : ""}`,
      ].join(" ")}
      style={{ ...style, animationDelay: `${revealDelay}ms` }}
    >
      <span className="whitespace-nowrap">{title}</span>
      {tooltip && (
        <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-[115%] w-64 rounded-xl bg-white px-4 py-2 text-sm leading-relaxed border border-slate-200 text-slate-600 shadow-xs backdrop-blur-md opacity-0 transition duration-200 group-hover:opacity-90 mt-[150px]">
          {tooltip}
        </div>
      )}
    </div>
  );
};

export default function SectionDataOrbit() {
  const { messages } = useLocale();
  const copy = messages.home?.dataOrbit ?? {};
  const chips = copy.chips ?? [];

  const sequence = [1, 2, 3, 4, 5, 0];
  const [seqIndex, setSeqIndex] = useState(0);
  const active = sequence[seqIndex];
  const STEP_MS = 5200;

  const [inView, setInView] = useState(false);
  const secRef = useRef(null);

  useEffect(() => {
    const el = secRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setInView(true);
    }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const t = setInterval(() => setSeqIndex((i) => (i + 1) % sequence.length), STEP_MS);
    return () => clearInterval(t);
  }, [inView]);

  const ORBIT_DUR_S = (STEP_MS * 6) / 1000;

  return (
    <section ref={secRef} className="relative overflow-x-hidden overflow-y-visible bg-white isolate">
      <div className="pt-[96px] pb-[60px] sm:pt-[120px] sm:pb-[60px]">
        <div className="mx-auto z-10 grid max-w-6xl items-center gap-10 px-6 md:grid-cols-2">
          <div className="relative mx-auto w-full max-w-md">
            <div className="relative aspect-square hidden md:block">
              <div className="absolute inset-0 grid place-items-center">
                <div className={`h-[78%] w-[78%] rounded-full border border-slate-200/70 orb-rg ${inView ? "on" : ""}`} style={{ animationDelay: "200ms" }} />
              </div>
              <div className="absolute inset-0 grid place-items-center">
                <div className={`h-[58%] w-[58%] rounded-full border border-slate-200/70 orb-rg ${inView ? "on" : ""}`} style={{ animationDelay: "350ms" }} />
              </div>
              <div className="absolute inset-0 grid place-items-center">
                <div className={`h-[38%] w-[38%] rounded-full border border-slate-200/70 orb-rg ${inView ? "on" : ""}`} style={{ animationDelay: "500ms" }} />
              </div>
              <div className="absolute inset-0 grid place-items-center">
                <div className={`orbit-float grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-blue-600 to-emerald-500 shadow-xl shadow-emerald-500/20 ring-1 ring-white/40 orb-sc ${inView ? "on" : ""}`} style={{ animationDelay: "400ms" }}>
                  <span className="text-sm font-black text-white">AILEEN</span>
                </div>
              </div>
              <div className="orbit-static absolute inset-0">
                {ORBIT_CHIP_CONFIG.map((cfg, idx) => {
                  const chip = chips[cfg.activeIndex];
                  if (!chip) return null;
                  return (
                    <OrbitChip
                      key={chip.title}
                      tone={cfg.tone}
                      title={chip.title}
                      style={cfg.style}
                      isActive={active === cfg.activeIndex}
                      tooltip={chip.tooltip}
                      inView={inView}
                      revealDelay={600 + idx * 100}
                    />
                  );
                })}
                <span className="orbit-track orbit-track-outer orbit-dot-run-1" style={{ "--dur": `${ORBIT_DUR_S}s`, "--delay": "0s", opacity: inView ? 1 : 0, transition: "opacity 0.5s ease 1.3s" }}><span className="orbit-dot" /></span>
                <span className="orbit-track orbit-track-outer orbit-dot-run-2" style={{ "--dur": `${ORBIT_DUR_S}s`, "--delay": `-${ORBIT_DUR_S / 6}s`, opacity: inView ? 1 : 0, transition: "opacity 0.5s ease 1.4s" }}><span className="orbit-dot" /></span>
                <span className="orbit-track orbit-track-mid orbit-dot-run-3" style={{ "--dur": `${ORBIT_DUR_S}s`, "--delay": `-${(ORBIT_DUR_S * 2) / 6}s`, opacity: inView ? 1 : 0, transition: "opacity 0.5s ease 1.5s" }}><span className="orbit-dot" /></span>
                <span className="orbit-track orbit-track-mid orbit-dot-run-4" style={{ "--dur": `${ORBIT_DUR_S}s`, "--delay": `-${(ORBIT_DUR_S * 3) / 6}s`, opacity: inView ? 1 : 0, transition: "opacity 0.5s ease 1.6s" }}><span className="orbit-dot" /></span>
              </div>
            </div>
          </div>

          <div className="relative px-2">
            <span className={`inline-flex items-center gap-2 rounded-full text-slate-600 border border-slate-400 bg-white/5 px-4 py-2 text-xs tracking-widest backdrop-blur orb-sr ${inView ? "on" : ""}`} style={{ animationDelay: "300ms" }}>
              <span className="h-2 w-2 rounded-full bg-cyan-600" />
              {copy.eyebrow}
            </span>
            <div className={`mt-5 grid gap-3 md:grid-cols-[78px_minmax(0,1fr)] md:items-center md:gap-4 lg:grid-cols-[86px_minmax(0,1fr)] orb-sr ${inView ? "on" : ""}`} style={{ animationDelay: "500ms" }}>
              <div className="flex items-center justify-start md:justify-center">
                <span
                  className="inline-block select-none text-[58px] font-black leading-[0.8] tracking-[-0.09em] text-transparent md:text-[72px] lg:text-[80px]"
                  style={{
                    background: "linear-gradient(135deg, rgba(37,99,235,0.95), rgba(16,185,129,0.92))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    textShadow: "0 14px 32px rgba(16, 185, 129, 0.16)",
                  }}
                >
                  AI
                </span>
              </div>
              <h3 className="relative z-10 text-[2rem] font-extrabold leading-[1.04] tracking-tight text-slate-900 md:text-[1.58rem] lg:text-[1.8rem]">
                <span className="block md:whitespace-nowrap">{copy.titleLine1}</span>
                <span className="block bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent md:whitespace-nowrap">
                  {copy.titleLine2}
                </span>
              </h3>
            </div>
            <p className={`relative z-10 mt-4 max-w-xl text-sm leading-relaxed text-slate-600 md:text-base orb-sr ${inView ? "on" : ""}`} style={{ animationDelay: "700ms" }}>
              {copy.description}
            </p>
            <div className="md:hidden mt-6">
              <ul className="space-y-2">
                {chips.map((chip, idx) => (
                  <li
                    key={chip.title}
                    className={[
                      "flex items-start gap-3 rounded-full px-4 py-3 ring-1 bg-white/60 backdrop-blur",
                      CHIP_TONES[idx]?.className ?? CHIP_TONES[0].className,
                      `orb-rv ${inView ? "on" : ""}`,
                    ].join(" ")}
                    style={{ animationDelay: `${900 + idx * 90}ms` }}
                  >
                    <span className="mt-[6px] h-2 w-2 shrink-0 rounded-full bg-current opacity-70" />
                    <span className="text-sm font-semibold leading-snug">{chip.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
