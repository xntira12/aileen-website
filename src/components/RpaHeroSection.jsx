"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import rpaProcessImage from "@/assets/img/RPA/rpa-process.png";
import AnimatedBg from "./AnimatedBgFlux";
import { useLocale } from "../i18n/LocaleProvider";
import { getServiceContent } from "../i18n/messages";

export default function RpaHeroSection() {
  const { locale } = useLocale();
  const hero = getServiceContent(locale, "rpa").hero ?? {};
  const sectionRef = useRef(null);
  const targetRef = useRef({ x: 50, y: 50 });
  const currentRef = useRef({ x: 50, y: 50 });

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return undefined;

    let rafId;

    const tick = () => {
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * 0.045;
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * 0.045;

      const { x, y } = currentRef.current;
      const rotateX = (50 - y) * 0.035;
      const rotateY = (x - 50) * 0.045;
      const floatX = (x - 50) * 0.08;
      const floatY = (y - 50) * 0.08;

      element.style.setProperty("--mx", `${x}%`);
      element.style.setProperty("--my", `${y}%`);
      element.style.setProperty("--rx", rotateX.toFixed(2));
      element.style.setProperty("--ry", rotateY.toFixed(2));
      element.style.setProperty("--fx", floatX.toFixed(2));
      element.style.setProperty("--fy", floatY.toFixed(2));

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const handleMouseMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    targetRef.current = {
      x: ((event.clientX - bounds.left) / bounds.width) * 100,
      y: ((event.clientY - bounds.top) / bounds.height) * 100,
    };
  };

  const handleMouseLeave = () => {
    targetRef.current = { x: 50, y: 50 };
  };

  return (
    <section
      ref={sectionRef}
      className="relative isolate min-h-[92vh] overflow-hidden bg-[#041824] px-6  pt-32 text-white md:min-h-[78vh] md:px-10 md:pb-20 md:pt-32 lg:pb-20 lg:pt-[190px]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        "--mx": "50%",
        "--my": "50%",
        "--rx": "0",
        "--ry": "0",
        "--fx": "0",
        "--fy": "0",
      }}
    >
      <div className="absolute inset-0 opacity-95">
        <AnimatedBg side="left" />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.28)_0%,rgba(2,6,23,0.08)_28%,rgba(2,6,23,0.18)_100%)]" />
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(circle at var(--mx) var(--my), rgba(56,189,248,0.08), transparent 18%), radial-gradient(circle at calc(100% - var(--mx)) calc(var(--my) * 0.8), rgba(16,185,129,0.07), transparent 24%)",
        }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rpa-hero__copy max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-100">
            <span className="h-2 w-2 rounded-full bg-emerald-300" />
            {hero.badge}
          </span>

          <h1 className="mt-6 text-4xl font-black leading-[0.96] tracking-tight md:text-6xl">
            {hero.titleLine1}
            <span className="mt-2 block bg-gradient-to-r from-sky-300 via-cyan-200 to-emerald-300 bg-clip-text text-transparent">
              {hero.titleLine2}
            </span>
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-100/80 md:text-base">
            {hero.description}
          </p>

          {/* <div className="rpa-hero__tag mt-8 max-w-3xl rounded-[26px] border border-white/10 bg-white/[0.05] p-2 backdrop-blur-xl">
            <div className="grid gap-2 md:grid-cols-3">
              {heroHighlights.map((item, index) => (
                <div
                  key={item.title}
                  className="rounded-[20px] border border-white/8 bg-slate-950/10 px-4 py-3"
                  style={{ animationDelay: `${120 + index * 90}ms` }}
                >
                  <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-100/52">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-300/90" />
                    {item.eyebrow}
                  </div>
                  <p className="mt-2 text-[15px] font-semibold leading-6 text-white/90">{item.title}</p>
                </div>
              ))}
            </div>
          </div> */}

          <div className="mt-9 flex flex-wrap gap-4">
           
            <a
              href="/contact"
              className="btn-fancy group relative inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/5 px-7 py-3 text-sm font-semibold text-white backdrop-blur transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-500/15"
            >
              <span className="relative z-10">{hero.contactUs}</span>
              <svg className="w-3.5 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
              </svg>
            </a>
          </div>
        </div>

        
      </div>

      <style>{`
        @keyframes rpaHeroReveal {
          from {
            opacity: 0;
            transform: translateY(-24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes rpaVisualFloat {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-12px);
          }
        }

        .rpa-hero__copy {
          animation: rpaHeroReveal 0.82s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .rpa-hero__visual {
          animation: rpaHeroReveal 0.96s cubic-bezier(0.22, 1, 0.36, 1) 0.08s both;
        }

        .rpa-hero__tag {
          animation: rpaHeroReveal 0.72s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .rpa-hero__orb {
          animation: rpaVisualFloat 8s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
