"use client";

import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import SectionContactFooter from "../components/SectionContactFooter";
import CustomerLogoItem from "../components/CustomerLogoItem";
import { useLocale } from "../i18n/LocaleProvider";
import logoPttlng from "../assets/img/home/customers/logo-pttlng.png";

function useInView(threshold = 0.14) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}

const CUSTOMER_PAGE_LOGOS = [
  { src: "/img/home/customers/egat.png", alt: "EGAT" },
  { src: "/img/home/customers/GC.webp", alt: "GC" },
  { src: "/img/home/customers/ptt.png", alt: "PTT" },
  { src: "/img/home/customers/ggc.png", alt: "GGC" },
  { src: "/img/home/customers/bangchak.svg", alt: "Bangchak" },
  { src: logoPttlng.src, alt: "PTTLNG" },
  { src: "/img/home/customers/HMC.png", alt: "HMC Polymers" },
  { src: "/img/home/customers/AGC.png", alt: "AGC" },
  { src: "/img/home/customers/ptt-digital.png", alt: "PTT Digital" },
  { src: "/img/home/customers/Tex.png", alt: "Thai Ethoxylate (TEX)" },
  { src: "/img/home/customers/npc.png", alt: "NPC" },
  { src: "/img/home/customers/NOK.png", alt: "THAI NOK" },
];

export default function Customers() {
  const { messages } = useLocale();
  const copy = messages.customers ?? {};
  const [heroRef, heroInView] = useInView(0.12);
  const [gridRef, gridInView] = useInView(0.1);

  return (
    <div className="min-h-screen bg-[#07101c] text-white">
      <Navbar />

      <main className="overflow-hidden">
        <section
          ref={heroRef}
          className="relative isolate flex min-h-screen items-center overflow-hidden px-6 pb-16 pt-28 md:px-10 md:pt-24"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(16,185,129,0.42),transparent_28%),radial-gradient(circle_at_85%_20%,rgba(34,211,238,0.18),transparent_22%),radial-gradient(circle_at_76%_74%,rgba(16,185,129,0.14),transparent_24%),linear-gradient(140deg,#07111f_0%,#0d2240_46%,#0a1525_100%)]" />
          <div className="pointer-events-none absolute -left-20 top-20 h-72 w-72 rounded-full border border-white/8 bg-white/[0.03] blur-3xl" />
          <div className="pointer-events-none absolute right-[-8%] top-[16%] h-[28rem] w-[28rem] rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="pointer-events-none absolute bottom-[-10%] left-[40%] h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="pointer-events-none absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:84px_84px]" />
          <div className="pointer-events-none absolute -left-[20%] top-1/3 h-px w-[70%] rotate-[18deg] bg-gradient-to-r from-transparent via-cyan-300/35 to-transparent" />
          <div className="pointer-events-none absolute right-[-15%] top-[18%] h-px w-[52%] -rotate-[24deg] bg-gradient-to-r from-transparent via-white/28 to-transparent" />

          <div className="relative mx-auto max-w-7xl">
            <div className="relative overflow-hidden rounded-[38px] border border-white/10 bg-white/[0.04] px-6 py-8 shadow-[0_26px_90px_rgba(2,12,27,0.44)] backdrop-blur-xl md:px-8 md:py-10 lg:px-10">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.1),transparent_22%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.12),transparent_24%)]" />

              <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="relative z-10 max-w-2xl">
                  <span
                    className={`inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-100 transition-all duration-700 ${
                      heroInView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                    }`}
                  >
                    <span className="h-2 w-2 rounded-full bg-emerald-300" />
                    {copy.eyebrow}
                  </span>

                  <h1
                    className={`mt-6 text-4xl font-black leading-[0.96] tracking-tight md:text-6xl transition-all duration-700 ${
                      heroInView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                    }`}
                    style={{ transitionDelay: "80ms" }}
                  >
                    {copy.title}
                    <span className="mt-2 block bg-gradient-to-r from-sky-300 via-cyan-200 to-emerald-300 bg-clip-text text-transparent">
                      {copy.titleHighlight}
                    </span>
                  </h1>

                  <p
                    className={`mt-6 max-w-3xl text-base leading-8 text-slate-100/80 md:text-lg transition-all duration-700 ${
                      heroInView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                    }`}
                    style={{ transitionDelay: "160ms" }}
                  >
                    {copy.description}
                  </p>

                  <div
                    className={`mt-9 transition-all duration-700 ${
                      heroInView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                    }`}
                    style={{ transitionDelay: "240ms" }}
                  >
                    <a
                      href="/contact"
                      className="btn-fancy group relative inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/5 px-7 py-3 text-sm font-semibold text-white backdrop-blur transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-500/15"
                    >
                      <span className="relative z-10">{copy.contactUs}</span>
                      <svg className="w-3.5 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                      </svg>
                    </a>
                  </div>
                </div>

                <div
                  ref={gridRef}
                  className={`relative z-10 transition-all duration-700 ${
                    heroInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                  }`}
                  style={{ transitionDelay: "220ms" }}
                >
                  <div className="rounded-[30px] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.09),rgba(255,255,255,0.03))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_28px_60px_rgba(2,12,27,0.3)] md:p-5">
                    <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4 md:p-5">
                      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
                        {CUSTOMER_PAGE_LOGOS.map((customer, idx) => (
                          <CustomerLogoItem
                            key={customer.alt}
                            src={customer.src}
                            alt={customer.alt}
                            idx={idx}
                            total={CUSTOMER_PAGE_LOGOS.length}
                            revealed={gridInView}
                            mode="grid"
                            cols={4}
                            showTooltip={false}
                            wrapperClassName="group relative flex min-h-[110px] w-full shrink-0 items-center justify-center overflow-hidden rounded-[22px] border border-slate-200/80 bg-[linear-gradient(180deg,#f8fbff_0%,#eef5fb_100%)] px-5 py-4 shadow-[0_14px_28px_rgba(15,23,42,0.18)] transition hover:-translate-y-1 hover:shadow-[0_18px_32px_rgba(37,99,235,0.22)]"
                            imgClassName="relative z-10 max-h-12 w-auto object-contain transition duration-300 group-hover:scale-[1.03] md:max-h-14"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SectionContactFooter />
    </div>
  );
}
