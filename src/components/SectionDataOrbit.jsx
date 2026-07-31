"use client";
import { useEffect, useRef, useState } from "react";

/* ── OrbitChip ── */
const OrbitChip = ({ style, title, tooltip, tone = "blue", isActive = false, inView = false, revealDelay = 0 }) => {
  const toneMap = {
    blue:    "bg-blue-50 text-blue-700 ring-blue-200",
    emerald: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    violet:  "bg-violet-50 text-violet-700 ring-violet-200",
    slate:   "bg-slate-50 text-slate-700 ring-slate-200",
  };
  return (
    <div
      className={["orbit-chip group absolute flex items-center rounded-full px-4 py-2 text-sm font-semibold shadow-sm ring-1", toneMap[tone], isActive ? "is-active" : "", `orb-rv ${inView ? "on" : ""}`].join(" ")}
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
  const sequence = [1, 2, 3, 4, 5, 0];
  const [seqIndex, setSeqIndex] = useState(0);
  const active = sequence[seqIndex];
  const STEP_MS = 5200;

  const [inView, setInView] = useState(false);
  const secRef = useRef(null);

  useEffect(() => {
    const el = secRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const t = setInterval(() => setSeqIndex((i) => (i + 1) % sequence.length), STEP_MS);
    return () => clearInterval(t);
  }, [inView]);

  const ORBIT_DUR_S = (STEP_MS * 6) / 1000;

  const mobileItems = [
    { tone: "text-blue-700 bg-blue-50 ring-blue-200",       title: "Software Development" },
    { tone: "text-emerald-700 bg-emerald-50 ring-emerald-200", title: "AI & Intelligent Automation" },
    { tone: "text-blue-700 bg-blue-50 ring-blue-200",       title: "Systems Integration" },
    { tone: "text-slate-700 bg-slate-50 ring-slate-200",    title: "Low-Code Platforms" },
    { tone: "text-emerald-700 bg-emerald-50 ring-emerald-200", title: "Enterprise Platforms" },
    { tone: "text-slate-700 bg-slate-50 ring-slate-200",    title: "Business Process & Workflows" },
  ];

  return (
    <section
      ref={secRef}
      className="relative overflow-x-hidden overflow-y-visible bg-white cursor-gradient isolate"
    >
      <div className="cursor-gradient__layer pointer-events-none absolute inset-0 -z-20" />

      {/* ── ORBIT SECTION ── */}
      <div className="py-[60px]">
        <div className="mx-auto z-10 grid max-w-6xl items-center gap-10 px-6 md:grid-cols-2">
          {/* LEFT */}
          <div className="relative mx-auto w-full max-w-md">
            <div className="relative aspect-square hidden md:block">
              {/* rings */}
              <div className="absolute inset-0 grid place-items-center">
                <div className={`h-[78%] w-[78%] rounded-full border border-slate-200/70 orb-rg ${inView ? "on" : ""}`} style={{ animationDelay: "200ms" }} />
              </div>
              <div className="absolute inset-0 grid place-items-center">
                <div className={`h-[58%] w-[58%] rounded-full border border-slate-200/70 orb-rg ${inView ? "on" : ""}`} style={{ animationDelay: "350ms" }} />
              </div>
              <div className="absolute inset-0 grid place-items-center">
                <div className={`h-[38%] w-[38%] rounded-full border border-slate-200/70 orb-rg ${inView ? "on" : ""}`} style={{ animationDelay: "500ms" }} />
              </div>
              {/* center */}
              <div className="absolute inset-0 grid place-items-center">
                <div className={`orbit-float grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-blue-600 to-emerald-500 shadow-xl shadow-emerald-500/20 ring-1 ring-white/40 orb-sc ${inView ? "on" : ""}`} style={{ animationDelay: "400ms" }}>
                  <span className="text-sm font-black text-white">AILEEN</span>
                </div>
              </div>
              {/* chips */}
              <div className="orbit-static absolute inset-0">
                <OrbitChip tone="slate"    title="Business Process & Workflows"  style={{ left: "-35%", top: "48%" }} isActive={active === 5} tooltip="ออกแบบและจัดการกระบวนการทำงาน ให้เป็นระบบเดียวที่ชัดเจนและตรวจสอบได้"                                           inView={inView} revealDelay={600} />
                <OrbitChip tone="blue"     title="Software Development"           style={{ left: "-5%",  top: "15%" }} isActive={active === 0} tooltip="พัฒนาซอฟต์แวร์เฉพาะทางที่ออกแบบให้สอดคล้องกับกระบวนการธุรกิจองค์กร"                                             inView={inView} revealDelay={700} />
                <OrbitChip tone="emerald"  title="AI & Intelligent Automation"    style={{ left: "55%",  top: "10%" }} isActive={active === 1} tooltip="ใช้ AI และระบบอัตโนมัติ ลดงานซ้ำ เพิ่มประสิทธิภาพและความแม่นยำ เพิ่มขีดความสามารถของทีมงาน"                    inView={inView} revealDelay={800} />
                <OrbitChip tone="blue"     title="Systems Integration"            style={{ left: "77%",  top: "40%" }} isActive={active === 2} tooltip="เชื่อมต่อระบบและข้อมูลจากหลายแหล่ง ให้ทำงานร่วมกันอย่างไร้รอยต่อและมีเสถียรภาพ"                               inView={inView} revealDelay={900} />
                <OrbitChip tone="slate"    title="Low-Code Platforms"             style={{ left: "62%",  top: "74%" }} isActive={active === 3} tooltip="พัฒนาระบบและแอปพลิเคชันได้รวดเร็ว ด้วยแพลตฟอร์ม Low-Code ที่ยืดหยุ่นตรงตามความต้องการขององค์กร"             inView={inView} revealDelay={1000} />
                <OrbitChip tone="emerald"  title="Enterprise Platforms"           style={{ left: "5%",   top: "75%" }} isActive={active === 4} tooltip="แพลตฟอร์มระดับองค์กรที่รองรับการใช้งานขนาดใหญ่ ปลอดภัย และขยายต่อได้ รองรับการเติบโตของธุรกิจ"               inView={inView} revealDelay={1100} />
                {/* dots */}
                <span className="orbit-track orbit-track-outer orbit-dot-run-1" style={{ "--dur": `${ORBIT_DUR_S}s`, "--delay": "0s", opacity: inView ? 1 : 0, transition: "opacity 0.5s ease 1.3s" }}><span className="orbit-dot" /></span>
                <span className="orbit-track orbit-track-outer orbit-dot-run-2" style={{ "--dur": `${ORBIT_DUR_S}s`, "--delay": `-${ORBIT_DUR_S / 6}s`, opacity: inView ? 1 : 0, transition: "opacity 0.5s ease 1.4s" }}><span className="orbit-dot" /></span>
                <span className="orbit-track orbit-track-mid orbit-dot-run-3"   style={{ "--dur": `${ORBIT_DUR_S}s`, "--delay": `-${(ORBIT_DUR_S * 2) / 6}s`, opacity: inView ? 1 : 0, transition: "opacity 0.5s ease 1.5s" }}><span className="orbit-dot" /></span>
                <span className="orbit-track orbit-track-mid orbit-dot-run-4"   style={{ "--dur": `${ORBIT_DUR_S}s`, "--delay": `-${(ORBIT_DUR_S * 3) / 6}s`, opacity: inView ? 1 : 0, transition: "opacity 0.5s ease 1.6s" }}><span className="orbit-dot" /></span>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative px-2">
            <span className={`inline-flex items-center gap-2 rounded-full text-slate-600 border border-slate-400 bg-white/5 px-4 py-2 text-xs tracking-widest backdrop-blur orb-sr ${inView ? "on" : ""}`} style={{ animationDelay: "300ms" }}>
              <span className="h-2 w-2 rounded-full bg-cyan-600" />
              WHAT WE DO ?
            </span>
            <div
              className={`mt-5 grid gap-3 md:grid-cols-[78px_minmax(0,1fr)] md:items-center md:gap-4 lg:grid-cols-[86px_minmax(0,1fr)] orb-sr ${inView ? "on" : ""}`}
              style={{ animationDelay: "500ms" }}
            >
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
                <span className="block md:whitespace-nowrap">Integrated digital solutions to</span>
                <span className="block bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent md:whitespace-nowrap">enhance operational efficiency</span>
              </h3>
            </div>
            <p className={`relative z-10 mt-4 max-w-xl text-sm leading-relaxed text-slate-600 md:text-base orb-sr ${inView ? "on" : ""}`} style={{ animationDelay: "700ms" }}>
              เราส่งมอบโซลูชั่นซอฟต์แวร์ที่เชื่อถือได้ บริการที่วางใจได้ และการให้คำปรึกษาจากทีมมากประสบการณ์ ครอบคลุมตั้งแต่การบริหารจัดการกระบวนการและคุณภาพ ไปจนถึงการทำ Automation และ Ai ที่เสริมศักยภาพ สู่การเติบโตอย่างมีประสิทธิภาพและยั่งยืนของอค์กร
            </p>
            {/* mobile list */}
            <div className="md:hidden mt-6">
              <ul className="space-y-2">
                {mobileItems.map((it, idx) => (
                  <li key={it.title} className={["flex items-start gap-3 rounded-full px-4 py-3 ring-1 bg-white/60 backdrop-blur", it.tone, `orb-rv ${inView ? "on" : ""}`].join(" ")} style={{ animationDelay: `${900 + idx * 90}ms` }}>
                    <span className="mt-[6px] h-2 w-2 shrink-0 rounded-full bg-current opacity-70" />
                    <span className="text-sm font-semibold leading-snug">{it.title}</span>
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
