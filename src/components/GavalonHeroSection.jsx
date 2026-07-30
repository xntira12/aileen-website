"use client";

import { useCallback, useEffect, useRef } from "react";
import AnimatedBg from "./AnimatedBgFlux";

export default function GavalonHeroSection() {
  const sectionRef = useRef(null);
  const targetRef = useRef({ x: 50, y: 50 });
  const currentRef = useRef({ x: 50, y: 50 });
  const rafRef = useRef(null);

  const scheduleUpdate = useCallback(() => {
    if (rafRef.current) return;

    const tick = () => {
      const element = sectionRef.current;
      if (!element) {
        rafRef.current = null;
        return;
      }

      const dx = targetRef.current.x - currentRef.current.x;
      const dy = targetRef.current.y - currentRef.current.y;

      currentRef.current.x += dx * 0.055;
      currentRef.current.y += dy * 0.055;

      const { x, y } = currentRef.current;
      element.style.setProperty("--mx", `${x.toFixed(1)}%`);
      element.style.setProperty("--my", `${y.toFixed(1)}%`);
      element.style.setProperty("--rx", ((50 - y) * 0.035).toFixed(2));
      element.style.setProperty("--ry", ((x - 50) * 0.045).toFixed(2));

      if (Math.abs(dx) > 0.05 || Math.abs(dy) > 0.05) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        rafRef.current = null;
      }
    };

    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleMouseMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    targetRef.current = {
      x: ((event.clientX - bounds.left) / bounds.width) * 100,
      y: ((event.clientY - bounds.top) / bounds.height) * 100,
    };
    scheduleUpdate();
  };

  const handleMouseLeave = () => {
    targetRef.current = { x: 50, y: 50 };
    scheduleUpdate();
  };

  return (
    <section
      ref={sectionRef}
      className="relative isolate min-h-[92vh] overflow-hidden bg-[#07131f] px-6 pb-10 pt-32 text-white md:min-h-[78vh] md:px-10 md:pb-20 md:pt-32 lg:pb-20 lg:pt-[190px]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ "--mx": "50%", "--my": "50%", "--rx": "0", "--ry": "0" }}
    >
      <div className="absolute inset-0 opacity-95">
        <AnimatedBg side="left" />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.34)_0%,rgba(2,6,23,0.08)_30%,rgba(2,6,23,0.18)_100%)]" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at var(--mx) var(--my), rgba(56,189,248,0.10), transparent 22%), radial-gradient(circle at calc(100% - var(--mx)) calc(var(--my) * 0.8), rgba(16,185,129,0.08), transparent 24%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="gavalon-hero__copy max-w-4xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-100">
            <span className="h-2 w-2 rounded-full bg-emerald-300" />
            Legal & Compliance Platform
          </span>

          <h1 className="mt-6 text-4xl font-black leading-[0.96] tracking-tight md:text-6xl">
            GAVALON
            <span className="mt-3 block text-2xl font-bold leading-tight text-slate-100/90 md:text-3xl">
              Enterprise Legal &amp; Regulatory Management Platform
            </span>
          </h1>

          <p className="mt-6 max-w-3xl text-lg font-medium leading-8 text-slate-100/90 md:text-xl">
            เปลี่ยนเรื่องกฎหมายที่ซับซ้อน ให้เป็นข้อมูลที่ค้นหา เข้าใจ และนำไปปฏิบัติได้อย่างเป็นระบบ
          </p>

          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-100/75 md:text-base">
            GAVALON แพลตฟอร์มบริหารจัดการกฎหมายและข้อกำหนดสำหรับองค์กร ช่วยรวบรวมข้อมูลกฎหมาย
            ติดตามข้อกำหนดที่เกี่ยวข้อง และสนับสนุนการปฏิบัติตามกฎหมายผ่านระบบดิจิทัล เพื่อให้องค์กรเข้าถึงข้อมูลที่ถูกต้อง
            ลดความซ้ำซ้อนในการทำงาน และบริหารความเสี่ยงด้านการปฏิบัติตามกฎหมายได้อย่างมีประสิทธิภาพ
          </p>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300/75">
            พัฒนาขึ้นจากความร่วมมือระหว่าง Aileen Solutions ผู้เชี่ยวชาญด้าน Enterprise Software, Digital Process
            และ AI กับ NPC S&amp;E ผู้เชี่ยวชาญด้านความปลอดภัย อาชีวอนามัย สิ่งแวดล้อม และระบบมาตรฐานสำหรับภาคอุตสาหกรรม
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href="/contact"
              className="btn-fancy group relative inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/5 px-7 py-3 text-sm font-semibold text-white backdrop-blur transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-500/15"
            >
              <span className="relative z-10">Contact Us</span>
              <svg className="w-3.5 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes gavalonHeroReveal {
          from { opacity: 0; transform: translateY(-24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .gavalon-hero__copy {
          animation: gavalonHeroReveal 0.82s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
      `}</style>
    </section>
  );
}
