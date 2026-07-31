"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLocale } from "../i18n/LocaleProvider";
import { getServiceContent } from "../i18n/messages";

function BulletList({ items, variant }) {
  const isPain = variant === "pain";

  return (
    <ul className="space-y-3.5">
      {items.map((item, i) => (
        <li
          key={item}
          className="flex gap-3.5 rounded-2xl border border-white/60 bg-white/70 p-3.5 text-sm leading-7 text-slate-600 shadow-[0_1px_0_rgba(255,255,255,0.8)_inset]"
        >
          <span
            className={[
              "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[11px] font-bold tabular-nums",
              isPain
                ? "bg-amber-100/90 text-amber-700"
                : "bg-emerald-100/90 text-emerald-700",
            ].join(" ")}
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="pt-0.5">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function NavArrow({ direction }) {
  return direction === "prev" ? (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden>
      <path d="M12 5 7 10l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ) : (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden>
      <path d="M8 5l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function QmsModulesSection() {
  const { locale } = useLocale();
  const modulesContent = getServiceContent(locale, "qms").modules ?? {};
  const labels = modulesContent.labels ?? {};
  const QMS_PLATFORM_MODULES = modulesContent.items ?? [];

  const [activeIndex, setActiveIndex] = useState(0);
  const [detailTab, setDetailTab] = useState("pain");
  const [isAnimating, setIsAnimating] = useState(false);
  const detailRef = useRef(null);
  const active = QMS_PLATFORM_MODULES[activeIndex] ?? QMS_PLATFORM_MODULES[0] ?? {};
  const total = QMS_PLATFORM_MODULES.length;

  const selectModule = useCallback((index) => {
    if (index === activeIndex || index < 0 || index >= total) return;

    setIsAnimating(true);
    setActiveIndex(index);
    setDetailTab("pain");

    window.setTimeout(() => setIsAnimating(false), 280);

    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      requestAnimationFrame(() => {
        detailRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      });
    }
  }, [activeIndex, total]);

  const goPrev = useCallback(() => selectModule(activeIndex - 1), [activeIndex, selectModule]);
  const goNext = useCallback(() => selectModule(activeIndex + 1), [activeIndex, selectModule]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goPrev, goNext]);

  return (
    <section id="modules" className="relative z-10 -mt-12 px-6 md:px-10">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[32px] border border-slate-200/80 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
        {/* Header */}
        <div className="border-b border-slate-100 bg-[linear-gradient(180deg,#f8fcff_0%,#ffffff_100%)] px-6 py-8 md:px-10 md:py-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-700">
                {labels.eyebrow}
              </p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
                <span className="block">{labels.titleLine1}</span>
                <span className="mt-1 block bg-[linear-gradient(90deg,#0b639b,#62e5da)] bg-clip-text text-transparent">
                  {labels.titleHighlight}
                </span>
              </h2>
              <p className="mt-3 text-base leading-8 text-slate-500">
                {labels.description}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-4 rounded-2xl border border-slate-200/80 bg-white px-5 py-4 shadow-sm">
              <div className="text-center">
                <p className="text-3xl font-extrabold tabular-nums tracking-tight text-slate-900">{total}</p>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">{labels.modulesLabel}</p>
              </div>
              <div className="h-10 w-px bg-slate-200" />
              <div className="min-w-[120px]">
                <p className="text-xs font-medium text-slate-500">{labels.viewingLabel}</p>
                <p className="mt-0.5 text-sm font-semibold text-cyan-800">
                  Module {active.id}
                </p>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-[linear-gradient(90deg,#0b639b,#62e5da)] transition-all duration-500 ease-out"
                    style={{ width: `${((activeIndex + 1) / total) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile nav sticky pills */}
        <div className="sticky top-[72px] z-20 border-b border-slate-100 bg-white/95 px-4 py-3 backdrop-blur-md lg:hidden">
          <div className="flex gap-2 overflow-x-auto pb-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {QMS_PLATFORM_MODULES.map((mod, index) => {
              const isActive = activeIndex === index;
              return (
                <button
                  key={mod.id}
                  type="button"
                  onClick={() => selectModule(index)}
                  aria-pressed={isActive}
                  className={[
                    "flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-2 text-left transition duration-200",
                    isActive
                      ? "border-cyan-400/50 bg-gradient-to-r from-cyan-50 to-sky-50 text-cyan-900 shadow-sm"
                      : "border-slate-200 bg-white text-slate-600 hover:border-slate-300",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "flex h-7 w-7 items-center justify-center rounded-lg text-[10px] font-bold",
                      isActive ? "bg-[linear-gradient(135deg,#0b639b,#62e5da)] text-white" : "bg-slate-100 text-slate-500",
                    ].join(" ")}
                  >
                    {mod.id}
                  </span>
                  <span className="max-w-[120px] truncate text-xs font-semibold">{mod.shortTitle}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main: sidebar + detail */}
        <div className="grid lg:grid-cols-[minmax(260px,300px)_minmax(0,1fr)]">
          {/* Desktop sidebar nav */}
          <nav
            className="hidden border-r border-slate-100 bg-slate-50/40 p-4 lg:block lg:p-5"
            aria-label={labels.selectModuleAria}
          >
            <p className="mb-3 px-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
              {labels.allModules}
            </p>
            <ul className="space-y-1">
              {QMS_PLATFORM_MODULES.map((mod, index) => {
                const isActive = activeIndex === index;
                return (
                  <li key={mod.id}>
                    <button
                      type="button"
                      onClick={() => selectModule(index)}
                      aria-current={isActive ? "true" : undefined}
                      className={[
                        "group relative flex w-full items-start rounded-2xl px-3 py-3.5 text-left transition duration-200",
                        isActive
                          ? "bg-white shadow-[0_4px_20px_rgba(11,99,155,0.1)] ring-1 ring-cyan-200/60"
                          : "hover:bg-white/80",
                      ].join(" ")}
                    >
                      {isActive ? (
                        <span className="absolute left-0 top-3 bottom-3 w-1 rounded-r-full bg-[linear-gradient(180deg,#0b639b,#62e5da)]" />
                      ) : null}
                      <span className="min-w-0 flex-1 pt-0.5">
                        <span className="flex items-center gap-2">
                          <span
                            className={[
                              "text-[10px] font-bold tabular-nums tracking-wider",
                              isActive ? "text-cyan-700" : "text-slate-400",
                            ].join(" ")}
                          >
                            {mod.id}
                          </span>
                        </span>
                        <span
                          className={[
                            "mt-0.5 block text-sm font-semibold leading-snug",
                            isActive ? "text-slate-900" : "text-slate-700",
                          ].join(" ")}
                        >
                          {mod.shortTitle}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          
          </nav>

          {/* Detail panel */}
          <div
            ref={detailRef}
            id="module-detail"
            className="scroll-mt-24 min-h-[480px] bg-white"
          >
            <div
              key={active.id}
              className={[
                "transition-all duration-300 ease-out",
                isAnimating ? "translate-y-2 opacity-0" : "translate-y-0 opacity-100",
              ].join(" ")}
            >
              {/* Module hero */}
              <div className="relative overflow-hidden border-b border-slate-100 px-6 py-5 md:px-8 md:py-6">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(98,229,218,0.12),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(11,99,155,0.06),transparent_45%)]" />
                <div className="relative">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-cyan-600/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-cyan-800">
                      Module {active.id}
                    </span>
                    <span className="rounded-full border border-slate-200 bg-white/80 px-2.5 py-1 text-xs text-slate-500">
                      {active.painpoints.length} Painpoints · {active.benefits.length} Benefits
                    </span>
                  </div>
                  <h3 className="mt-5 text-xl font-bold leading-snug tracking-tight text-slate-900 md:mt-8 md:text-2xl">
                    {active.title}
                  </h3>
                </div>
                <p className="relative  max-w-3xl text-sm  text-slate-500 mt-2">
                  {active.description}
                </p>
              </div>

              {/* Mobile tab switcher */}
              <div className="flex gap-2 border-b border-slate-100 px-4 py-3 lg:hidden">
                {[
                  { id: "pain", label: labels.painpoint, count: active.painpoints?.length ?? 0 },
                  { id: "benefit", label: labels.benefits, count: active.benefits?.length ?? 0 },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setDetailTab(tab.id)}
                    className={[
                      "flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition",
                      detailTab === tab.id
                        ? tab.id === "pain"
                          ? "bg-amber-50 text-amber-900 ring-1 ring-amber-200/80"
                          : "bg-emerald-50 text-emerald-900 ring-1 ring-emerald-200/80"
                        : "text-slate-500 hover:bg-slate-50",
                    ].join(" ")}
                  >
                    {tab.label}
                    <span className="rounded-full bg-white/80 px-2 py-0.5 text-[10px] font-bold tabular-nums opacity-80">
                      {tab.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Pain + Benefits */}
              <div className="grid gap-0 lg:grid-cols-2">
                <div
                  className={[
                    "border-b border-slate-100 p-6 md:p-8 lg:border-b-0 lg:border-r",
                    detailTab !== "pain" ? "hidden lg:block" : "",
                  ].join(" ")}
                >
                  <div className="mb-6">
                    <div>
                      <h4 className="text-sm font-bold text-amber-900">{labels.painpoint}</h4>
                      <p className="text-xs text-amber-700/70">{labels.painpointDesc}</p>
                    </div>
                  </div>
                  <div className="rounded-[20px] bg-gradient-to-b from-amber-50/80 to-orange-50/30 p-1 ring-1 ring-amber-100/80">
                    <BulletList items={active.painpoints} variant="pain" />
                  </div>
                </div>

                <div
                  className={[
                    "p-6 md:p-8",
                    detailTab !== "benefit" ? "hidden lg:block" : "",
                  ].join(" ")}
                >
                  <div className="mb-6">
                    <div>
                      <h4 className="text-sm font-bold text-emerald-900">{labels.benefits}</h4>
                      <p className="text-xs text-emerald-700/70">{labels.benefitsDesc}</p>
                    </div>
                  </div>
                  <div className="rounded-[20px] bg-gradient-to-b from-emerald-50/80 to-teal-50/30 p-1 ring-1 ring-emerald-100/80">
                    <BulletList items={active.benefits} variant="benefit" />
                  </div>
                </div>
              </div>

              {/* Footer stepper */}
              <div className="border-t border-slate-100 bg-slate-50/50 px-6 py-5 md:px-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center justify-center gap-1.5 sm:justify-start">
                    {QMS_PLATFORM_MODULES.map((mod, i) => (
                      <button
                        key={mod.id}
                        type="button"
                        onClick={() => selectModule(i)}
                        aria-label={`Module ${mod.id}: ${mod.shortTitle}`}
                        className={[
                          "h-2 rounded-full transition-all duration-300",
                          i === activeIndex
                            ? "w-8 bg-[linear-gradient(90deg,#0b639b,#62e5da)]"
                            : "w-2 bg-slate-200 hover:bg-slate-300",
                        ].join(" ")}
                      />
                    ))}
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
                    <span className="text-center text-xs font-medium text-slate-500 sm:text-left">
                      {activeIndex + 1} / {total}
                    </span>
                    <div className="grid grid-cols-2 gap-2 sm:flex">
                      <button
                        type="button"
                        onClick={goPrev}
                        disabled={activeIndex === 0}
                        className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 disabled:opacity-40"
                      >
                        <NavArrow direction="prev" />
                        {labels.prev}
                      </button>
                      <button
                        type="button"
                        onClick={goNext}
                        disabled={activeIndex === total - 1}
                        className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 disabled:opacity-40"
                      >
                        {labels.next}
                        <NavArrow direction="next" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
