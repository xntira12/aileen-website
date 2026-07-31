"use client";
import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useLocale } from "../i18n/LocaleProvider";
const cubeImg = "/img/home/cube.png";
const consultIco = "/img/home/icon/consult.svg";
const experienceIco = "/img/home/icon/experience.svg";
const heartIco = "/img/home/icon/heart.svg";
const platformIco = "/img/home/icon/platform.svg";
const rapidlyIco = "/img/home/icon/rapidly.svg";
const simplifyIco = "/img/home/icon/simplify.svg";

const STRENGTH_ICONS = {
  simplicity: simplifyIco,
  rapidly: rapidlyIco,
  experience: experienceIco,
  platform: platformIco,
  services: heartIco,
  consulting: consultIco,
};

function EC({ item, dir = "left", dl = 0, on = false }) {
  return (
    <div
      className={`st-ec ${on ? (dir === "left" ? "st-cl" : "st-cr") : ""}`}
      style={{ animationDelay: `${dl}ms`, opacity: on ? undefined : 0, animationFillMode: "forwards" }}
    >
      <div className={`st-ico ${on ? "st-ring" : ""}`}>
        <img src={item.icon} alt="" className="h-8 w-8 select-none" draggable={false} />
      </div>
      <div>
        <div className="st-ec-title font-semibold text-[.95rem]">{item.title}</div>
        <div className="st-ec-desc mt-1 text-sm leading-relaxed">{item.tooltip}</div>
      </div>
    </div>
  );
}

function MobileKeysList({ items, inV = false }) {
  return (
    <div className="md:hidden space-y-3">
      {items.map((it, idx) => (
        <div key={it.id} className={`st-mCard p-4 st-mu ${inV ? "on" : ""}`} style={{ animationDelay: `${180 + idx * 90}ms` }}>
          <div className="relative z-[1] flex items-start gap-3">
            <div className="mt-[2px] grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 bg-white/5 shadow-sm">
              <img src={it.icon} alt="" className="h-5 w-5 select-none" draggable={false} />
            </div>
            <div className="min-w-0">
              <div className="text-[.95rem] font-semibold text-white">{it.title}</div>
              <div className="mt-1 text-sm leading-relaxed text-white/65">{it.tooltip}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function SectionStrengths() {
  const { messages } = useLocale();
  const copy = messages.home?.strengths ?? {};
  const [view, setView] = useState("full");
  const [inV, setInV] = useState(false);
  const [vk, setVk] = useState(0);
  const secRef = useRef(null);

  useEffect(() => {
    const el = secRef.current;
    if (!el) return;
    const o = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setInV(true);
    }, { threshold: 0.18 });
    o.observe(el);
    return () => o.disconnect();
  }, []);

  const go = useCallback((v) => {
    setView(v);
    setVk((k) => k + 1);
  }, []);

  const keys = useMemo(
    () =>
      (copy.keys ?? []).map((k) => ({
        ...k,
        icon: STRENGTH_ICONS[k.id] ?? simplifyIco,
      })),
    [copy.keys],
  );

  const trustC = useMemo(() => [keys[0], keys[1], keys[2]].filter(Boolean), [keys]);
  const provC = useMemo(() => [keys[3], keys[4], keys[5]].filter(Boolean), [keys]);
  const mobileView = view === "center" || view === "full" ? "trust" : view;

  return (
    <section id="strengths" ref={secRef} className="relative" style={{ contain: "paint" }}>
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-4 pb-28 md:pt-6 md:pb-32">
        <div
          className="flex flex-col items-center text-center"
          style={{
            opacity: inV ? 1 : 0,
            transform: inV ? "translateY(0)" : "translateY(24px)",
            transition: "opacity .7s ease, transform .7s ease",
          }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/[0.07] px-4 py-2 text-xs tracking-widest text-white/85 backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            {copy.eyebrow}
          </span>
          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-white md:text-4xl">
            {copy.title}{" "}
            <span className="bg-gradient-to-r from-sky-300 to-emerald-300 bg-clip-text text-transparent">
              {copy.titleHighlight}
            </span>
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white md:text-base">{copy.description}</p>
        </div>

        <div className="md:hidden mt-8 flex justify-center st-mobileTabsWrap">
          <div className="st-mTabs inline-flex rounded-full p-1">
            <button type="button" onClick={() => go("trust")} className={`st-mTab ${mobileView === "trust" ? "is-active" : ""}`}>
              {copy.trustByTab}
            </button>
            <button type="button" onClick={() => go("provide")} className={`st-mTab ${mobileView === "provide" ? "is-active" : ""}`}>
              {copy.provideToTab}
            </button>
          </div>
        </div>

        <div className="mt-10 md:mt-14 relative">
          <div className="md:hidden">
            <div className="flex justify-center mb-5">
              {mobileView === "trust" ? (
                <span className="st-mCue inline-flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-xs text-white/80">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  {copy.trustByLabel}
                </span>
              ) : (
                <span className="st-mCue inline-flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-xs text-white/80">
                  <span className="h-2 w-2 rounded-full bg-sky-400" />
                  {copy.provideToLabel}
                </span>
              )}
            </div>
            {mobileView === "trust" ? (
              <MobileKeysList key="m-trust" items={trustC} inV={inV} />
            ) : (
              <MobileKeysList key="m-provide" items={provC} inV={inV} />
            )}
          </div>

          <div className={`strength-stage hidden md:block ${view === "full" ? "is-show" : "is-hide"}`}>
            <div className="relative mx-auto max-w-7xl" key={`f${vk}`}>
              <div className="grid md:grid-cols-[minmax(300px,1fr)_280px_minmax(300px,1fr)] gap-8 mb-6">
                <div className="flex justify-center">
                  <span className="st-bdg inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-emerald-400/30 bg-emerald-500/10 px-5 py-2 text-sm font-medium text-emerald-200">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    {copy.trustByLabel}
                  </span>
                </div>
                <div />
                <div className="flex justify-center">
                  <span className="st-bdg inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-sky-400/30 bg-sky-500/10 px-5 py-2 text-sm font-medium text-sky-200">
                    <span className="h-2 w-2 rounded-full bg-sky-400 animate-pulse" />
                    {copy.provideToLabel}
                  </span>
                </div>
              </div>
              <div className="grid md:grid-cols-[minmax(300px,1fr)_280px_minmax(300px,1fr)] items-stretch gap-8">
                <div className="flex flex-col gap-4">
                  {trustC.map((it, i) => (
                    <EC key={it.id} item={it} dir="left" dl={i * 120} on={view === "full"} />
                  ))}
                </div>
                <div className="flex items-center justify-center" style={{ minHeight: 340 }}>
                  <img
                    src={cubeImg}
                    alt="Cube"
                    className={`w-[240px] select-none ${inV ? "st-cube-anim" : ""}`}
                    draggable={false}
                    style={{ filter: "drop-shadow(0 8px 24px rgba(56,224,208,.2))" }}
                  />
                </div>
                <div className="flex flex-col gap-4">
                  {provC.map((it, i) => (
                    <EC key={it.id} item={it} dir="right" dl={i * 120} on={view === "full"} />
                  ))}
                </div>
              </div>
              <div className="flex justify-center items-center gap-3 mt-10">
                <button className="st-ip" onClick={() => go("trust")} type="button">
                  <span className="a ab">‹</span> {copy.trustByTab}
                </button>
                <button className="st-ip" onClick={() => go("provide")} type="button">
                  {copy.provideToTab} <span className="a af">›</span>
                </button>
              </div>
            </div>
          </div>

          <div className={`strength-stage hidden md:block ${view === "trust" ? "is-show" : "is-hide"}`}>
            {view === "trust" && (
              <div className="flex justify-center mb-8">
                <span className="st-bdg inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-emerald-400/30 bg-emerald-500/10 px-5 py-2 text-sm font-medium text-emerald-200">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  {copy.trustByLabel}
                </span>
              </div>
            )}
            <div className="relative mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-2" key={`t${vk}`}>
              <div className="space-y-4">
                {trustC.map((it, i) => (
                  <EC key={it.id} item={it} dir="left" dl={i * 140} on={view === "trust"} />
                ))}
              </div>
              <div className="relative flex flex-col items-center gap-8">
                <img
                  src={cubeImg}
                  alt="Cube"
                  className={`w-[300px] select-none ${inV ? "st-cube-anim" : ""}`}
                  draggable={false}
                  style={{ filter: "drop-shadow(0 8px 24px rgba(56,224,208,.2))" }}
                />
                <div className="flex items-center gap-3">
                  <button className="st-ip" onClick={() => go("full")} type="button">
                    <span style={{ fontSize: "1rem", marginRight: "2px" }}>↩</span> {copy.return}
                  </button>
                  <button className="st-ip" onClick={() => go("provide")} type="button">
                    {copy.provideToTab} <span className="a af">›</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className={`strength-stage hidden md:block ${view === "provide" ? "is-show" : "is-hide"}`}>
            {view === "provide" && (
              <div className="flex justify-center mb-8">
                <span className="st-bdg inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-sky-400/30 bg-sky-500/10 px-5 py-2 text-sm font-medium text-sky-200">
                  <span className="h-2 w-2 rounded-full bg-sky-400 animate-pulse" />
                  {copy.provideToLabel}
                </span>
              </div>
            )}
            <div className="relative mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-2" key={`p${vk}`}>
              <div className="relative flex flex-col items-center gap-8">
                <img
                  src={cubeImg}
                  alt="Cube"
                  className={`w-[300px] select-none ${inV ? "st-cube-anim" : ""}`}
                  draggable={false}
                  style={{ filter: "drop-shadow(0 8px 24px rgba(56,224,208,.2))" }}
                />
                <div className="flex items-center gap-3">
                  <button className="st-ip" onClick={() => go("trust")} type="button">
                    <span className="a ab">‹</span> {copy.trustByTab}
                  </button>
                  <button className="st-ip" onClick={() => go("full")} type="button">
                    <span style={{ fontSize: "1rem", marginRight: "2px" }}>↩</span> {copy.return}
                  </button>
                </div>
              </div>
              <div className="space-y-4">
                {provC.map((it, i) => (
                  <EC key={it.id} item={it} dir="right" dl={i * 140} on={view === "provide"} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
