"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { QMS_PLATFORM_MODULES } from "@/content/qmsModules";

const MODULE_ICONS = {
  "01": "M6 4h8v12H6V4Zm2 2v2h4V6H8Zm0 4v4h4v-4H8Z",
  "02": "M7 5h6v2H7V5Zm-1 4h8v1H6V9Zm1 2h6v1H7v-1Zm-1 2h8v1H6v-1Z",
  "03": "M10 4 14 9H12v7H8V9H6L10 4Zm0 11a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z",
  "04": "M6 6h8v9H6V6Zm2 2v1h4V8H8Zm0 2v3h4v-3H8Zm6-2h1v7h-1V8Z",
  "05": "M10 4 12 7h3l-2.5 2 1 3L10 10.5 7.5 12l1-3L6 7h3L10 4Z",
  "06": "M7 5h6v10H7V5Zm1 2v1h4V7H8Zm0 2v4h4V9H8Zm-1 3h6v1H7v-1Z",
  "07": "M10 5c2.5 0 4 1.8 4 4.2 0 2.8-3.2 6.3-4 7.3-.8-1-4-4.5-4-7.3C6 6.8 7.5 5 10 5Zm0 2.2a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6Z",
};

function ModuleIcon({ id, className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 20 20" className={className} aria-hidden>
      <path d={MODULE_ICONS[id]} fill="currentColor" />
    </svg>
  );
}

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
  const [activeIndex, setActiveIndex] = useState(0);
  const [detailTab, setDetailTab] = useState("pain");
  const [isAnimating, setIsAnimating] = useState(false);
  const detailRef = useRef(null);
  const active = QMS_PLATFORM_MODULES[activeIndex];
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
                Platform Modules
              </p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
                <span className="block">ครบทุกโมดูล</span>
                <span className="mt-1 block bg-[linear-gradient(90deg,#0b639b,#62e5da)] bg-clip-text text-transparent">
                  สำหรับการบริหารคุณภาพ
                </span>
              </h2>
              <p className="mt-3 text-base leading-8 text-slate-500">
                เลือกโมดูลเพื่อดู Painpoint และ Benefits — ออกแบบให้ทีมเข้าใจปัญหาและคุณค่าของแต่ละระบบได้ชัดเจน
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-4 rounded-2xl border border-slate-200/80 bg-white px-5 py-4 shadow-sm">
              <div className="text-center">
                <p className="text-3xl font-extrabold tabular-nums tracking-tight text-slate-900">{total}</p>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">โมดูล</p>
              </div>
              <div className="h-10 w-px bg-slate-200" />
              <div className="min-w-[120px]">
                <p className="text-xs font-medium text-slate-500">กำลังดู</p>
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

        {/* Mobile nav — sticky pills */}
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
            aria-label="เลือกโมดูล"
          >
            <p className="mb-3 px-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
              โมดูลทั้งหมด
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
                        "group relative flex w-full items-start gap-3 rounded-2xl px-3 py-3.5 text-left transition duration-200",
                        isActive
                          ? "bg-white shadow-[0_4px_20px_rgba(11,99,155,0.1)] ring-1 ring-cyan-200/60"
                          : "hover:bg-white/80",
                      ].join(" ")}
                    >
                      {isActive ? (
                        <span className="absolute left-0 top-3 bottom-3 w-1 rounded-r-full bg-[linear-gradient(180deg,#0b639b,#62e5da)]" />
                      ) : null}
                      <span
                        className={[
                          "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition",
                          isActive
                            ? "bg-[linear-gradient(135deg,#0b639b,#62e5da)] text-white shadow-md"
                            : "bg-white text-cyan-700 ring-1 ring-slate-200/80 group-hover:ring-cyan-200",
                        ].join(" ")}
                      >
                        <ModuleIcon id={mod.id} />
                      </span>
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
            <p className="mt-4 px-2 text-[11px] leading-5 text-slate-400">
              ใช้ปุ่ม ← → บนคีย์บอร์ดเพื่อสลับโมดูล
            </p>
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
              <div className="relative overflow-hidden border-b border-slate-100 px-6 py-7 md:px-8 md:py-8">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(98,229,218,0.12),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(11,99,155,0.06),transparent_45%)]" />
                <div className="relative flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex gap-4">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#0b639b,#62e5da)] text-white shadow-lg shadow-cyan-500/20">
                      <ModuleIcon id={active.id} className="h-7 w-7" />
                    </span>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-cyan-600/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-cyan-800">
                          Module {active.id}
                        </span>
                        <span className="rounded-full border border-slate-200 bg-white/80 px-2.5 py-1 text-xs text-slate-500">
                          {active.painpoints.length} Painpoints · {active.benefits.length} Benefits
                        </span>
                      </div>
                      <h3 className="mt-2 text-xl font-bold leading-snug tracking-tight text-slate-900 md:text-2xl">
                        {active.title}
                      </h3>
                    </div>
                  </div>
                  <div className="flex gap-2 sm:shrink-0">
                    <button
                      type="button"
                      onClick={goPrev}
                      disabled={activeIndex === 0}
                      aria-label="โมดูลก่อนหน้า"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 disabled:opacity-35"
                    >
                      <NavArrow direction="prev" />
                    </button>
                    <button
                      type="button"
                      onClick={goNext}
                      disabled={activeIndex === total - 1}
                      aria-label="โมดูลถัดไป"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 disabled:opacity-35"
                    >
                      <NavArrow direction="next" />
                    </button>
                  </div>
                </div>
                <p className="relative mt-5 max-w-3xl text-base leading-8 text-slate-600">
                  {active.description}
                </p>
              </div>

              {/* Mobile tab switcher */}
              <div className="flex gap-2 border-b border-slate-100 px-4 py-3 lg:hidden">
                {[
                  { id: "pain", label: "Painpoint", count: active.painpoints.length },
                  { id: "benefit", label: "Benefits", count: active.benefits.length },
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
                  <div className="mb-6 flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-100 to-orange-50 text-amber-700 ring-1 ring-amber-200/60">
                      <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" aria-hidden>
                        <path d="M10 6v5M10 14h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                        <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
                      </svg>
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-amber-900">Painpoint</h4>
                      <p className="text-xs text-amber-700/70">ปัญหาที่พบบ่อยในการทำงาน</p>
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
                  <div className="mb-6 flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-100 to-teal-50 text-emerald-700 ring-1 ring-emerald-200/60">
                      <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" aria-hidden>
                        <path
                          d="M5.5 10.2 8.2 12.9 14.5 6.6"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-emerald-900">Benefits</h4>
                      <p className="text-xs text-emerald-700/70">คุณค่าที่ได้จากระบบ</p>
                    </div>
                  </div>
                  <div className="rounded-[20px] bg-gradient-to-b from-emerald-50/80 to-teal-50/30 p-1 ring-1 ring-emerald-100/80">
                    <BulletList items={active.benefits} variant="benefit" />
                  </div>
                </div>
              </div>

              {/* Footer stepper */}
              <div className="flex flex-col gap-4 border-t border-slate-100 bg-slate-50/50 px-6 py-5 sm:flex-row sm:items-center sm:justify-between md:px-8">
                <div className="flex items-center gap-1.5">
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
                <div className="flex items-center justify-between gap-3 sm:justify-end">
                  <span className="text-xs font-medium text-slate-500">
                    {activeIndex + 1} / {total}
                  </span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={goPrev}
                      disabled={activeIndex === 0}
                      className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-300 disabled:opacity-40"
                    >
                      <NavArrow direction="prev" />
                      ก่อนหน้า
                    </button>
                    <button
                      type="button"
                      onClick={goNext}
                      disabled={activeIndex === total - 1}
                      className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-300 disabled:opacity-40"
                    >
                      ถัดไป
                      <NavArrow direction="next" />
                    </button>
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
