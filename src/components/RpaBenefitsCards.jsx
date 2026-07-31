"use client";

import { useEffect, useRef, useState } from "react";

export default function RpaBenefitsCards({
  benefits,
  eyebrow,
  title,
  subtitle,
  description,
}) {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="benefits"
      ref={sectionRef}
      className="relative bg-white px-6 py-24 md:px-10"
    >
      
      <div className="mx-auto max-w-6xl">
        <div className="relative">
        

          <div
            className={`relative mx-auto max-w-2xl text-center transition-all duration-700 ease-out ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-200/80 bg-white/90 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-700 shadow-[0_10px_24px_rgba(14,165,233,0.08)]">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              {eyebrow}
            </span>
            <h2 className="mt-6 text-3xl font-extrabold leading-[1.05] tracking-tight text-slate-900 md:text-5xl">
              {title}
              {subtitle ? (
                <span className="mt-1 block bg-[linear-gradient(90deg,#0b639b,#62e5da)] bg-clip-text text-transparent">
                  {subtitle}
                </span>
              ) : null}
            </h2>
            {description ? <p className="mt-5 text-base leading-8 text-slate-600">{description}</p> : null}
          </div>

          <div className="relative mx-auto mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3 mb-20">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                className={`transition-all duration-700 ease-out ${
                  isVisible ? "translate-y-0 scale-100 opacity-100" : "translate-y-10 scale-[0.98] opacity-0"
                }`}
                style={{ transitionDelay: `${120 + index * 90}ms` }}
              >
                <div
                  className={`rpa-benefit-pill group relative h-full overflow-hidden rounded-[15px] border px-8 py-10 shadow-[0_4px_12px_rgba(15,23,42,0.02)] ${
                    index % 3 === 0
                      ? "border-cyan-100 bg-[linear-gradient(180deg,#f4fcff_0%,#ffffff_100%)]"
                      : index % 3 === 1
                        ? "border-slate-200/80 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbfe_100%)]"
                      : "border-emerald-100 bg-[linear-gradient(180deg,#f7fffc_0%,#ffffff_100%)]"
                  } ${index === 1 || index === 4 ? "xl:translate-y-8" : ""}`}
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-700/80">
                    {benefit.eyebrow}
                  </p>
                  <h3 className="mt-3 text-lg font-semibold leading-7 tracking-tight text-slate-900">
                    {benefit.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600 md:text-[14px]">
                    {benefit.body}
                  </p>
                
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .rpa-benefit-pill {
          transition:
            transform 520ms cubic-bezier(0.22, 1, 0.36, 1),
            opacity 520ms cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 240ms ease,
            filter 240ms ease;
          will-change: transform, opacity;
        }

        .rpa-benefit-pill:hover {
          transform: translateY(-0.5px);
          box-shadow: 0 8px 18px rgba(15, 23, 42, 0.035);
          filter: none;
        }
      `}</style>
    </section>
  );
}
