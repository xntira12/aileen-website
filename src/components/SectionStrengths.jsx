"use client";
import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
const cubeImg = "/img/home/cube.png";
const stBg = "/img/home/st-bg.jpg";
const consultIco    = "/img/home/icon/consult.svg";
const experienceIco = "/img/home/icon/experience.svg";
const heartIco      = "/img/home/icon/heart.svg";
const platformIco   = "/img/home/icon/platform.svg";
const rapidlyIco    = "/img/home/icon/rapidly.svg";
const simplifyIco   = "/img/home/icon/simplify.svg";

function Particles({ n = 16 }) {
  const d = useMemo(() => Array.from({ length: n }, () => ({
    l:`${Math.random()*100}%`, b:`${Math.random()*25}%`,
    d:`${7+Math.random()*7}s`, dl:`${Math.random()*5}s`, s:`${2+Math.random()*2.5}px`,
  })), [n]);
  return <>{d.map((p,i) => <div key={i} className="st-p" style={{ left:p.l, bottom:p.b, width:p.s, height:p.s, "--d":p.d, "--dl":p.dl }} />)}</>;
}

function EC({ item, dir="left", dl=0, on=false }) {
  return (
    <div className={`st-ec ${on?(dir==="left"?"st-cl":"st-cr"):""}`}
      style={{ animationDelay:`${dl}ms`, opacity:on?undefined:0, animationFillMode:"forwards" }}>
      <div className={`st-ico ${on?"st-ring":""}`}>
        <img src={item.icon} alt="" className="h-8 w-8 select-none" draggable={false} />
      </div>
      <div>
        <div className="font-semibold text-white text-[.95rem]">{item.title}</div>
        <div className="mt-1 text-sm leading-relaxed text-white/65">{item.tooltip}</div>
      </div>
    </div>
  );
}

function MobileKeysList({ items, inV=false }) {
  return (
    <div className="md:hidden space-y-3">
      {items.map((it,idx) => (
        <div key={it.id} className={`st-mCard p-4 st-mu ${inV?"on":""}`} style={{ animationDelay:`${180+idx*90}ms` }}>
          <div className="relative z-[1] flex items-start gap-3">
            <div className="mt-[2px] grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/15 bg-white/10 shadow-sm">
              <img src={it.icon} alt="" className="h-5 w-5 select-none" draggable={false} />
            </div>
            <div className="min-w-0">
              <div className="text-[.95rem] font-semibold text-white/90">{it.title}</div>
              <div className="mt-1 text-sm leading-relaxed text-white/70">{it.tooltip}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function SectionStrengths() {
  const [view, setView] = useState("full");
  const [inV,  setInV]  = useState(false);
  const [vk,   setVk]   = useState(0);
  const secRef = useRef(null);
  const bgRef  = useRef(null);
  const tgt = useRef({ x:50, y:50 });
  const cur = useRef({ x:50, y:50 });

  useEffect(() => {
    const el = secRef.current; if (!el) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInV(true); }, { threshold:0.18 });
    o.observe(el); return () => o.disconnect();
  }, []);

  const onM = (e) => {
    const r = e.currentTarget.getBoundingClientRect(), s = 0.35;
    tgt.current.x = 50+(((e.clientX-r.left)/r.width)*100-50)*s;
    tgt.current.y = 50+(((e.clientY-r.top)/r.height)*100-50)*s;
  };

  useEffect(() => {
    const el = bgRef.current; if (!el) return;
    let raf = 0;
    const lr = (a,b,t) => a+(b-a)*t;
    const tk = () => {
      cur.current.x = lr(cur.current.x, tgt.current.x, 0.08);
      cur.current.y = lr(cur.current.y, tgt.current.y, 0.08);
      el.style.setProperty("--mx", `${cur.current.x}%`);
      el.style.setProperty("--my", `${cur.current.y}%`);
      raf = requestAnimationFrame(tk);
    };
    raf = requestAnimationFrame(tk);
    return () => cancelAnimationFrame(raf);
  }, []);

  const go = useCallback((v) => { setView(v); setVk(k=>k+1); }, []);

  const keys = useMemo(() => [
    { id:"simplicity", title:"Simplicity", icon:simplifyIco,   tooltip:"เราเชื่อในระบบที่ใช้งานง่าย ช่วยให้ผู้ใช้เข้าใจ กระบวนการ และทำงานได้ด้วยตนเอง อย่างมีประสิทธิภาพ" },
    { id:"rapidly",    title:"Rapidly",    icon:rapidlyIco,    tooltip:"ให้ความสำคัญและตอบรับกับการเปลี่ยนแปลง ทางธุรกิจที่เป็นไปอย่างรวดเร็วในปัจจุบัน" },
    { id:"experience", title:"Experience", icon:experienceIco, tooltip:"เรานำเสนอโซลูชั่น ที่มีคุณภาพ เหมาะสมกับความต้องการ ตอบโจทย์ผู้ใช้งานได้อย่างตรงจุด และคุ้มค่า กับการลงทุน" },
    { id:"platform",   title:"Platform",   icon:platformIco,   tooltip:"แพลตฟอร์มที่เชื่อถือได้และยืดหยุ่น รองรับโซลูชั่นหลากหลาย เพิ่มคุณภาพการทำงานและขยายศักยภาพทางธุรกิจ" },
    { id:"services",   title:"Services",   icon:heartIco,      tooltip:"บริการครบวงจร ครอบคลุมการบูรณาการเทคโนโลยี เพื่อยกระดับการทำงานในองค์กร และตอบโจทย์ ทางธุรกิจ" },
    { id:"consulting", title:"Consulting", icon:consultIco,    tooltip:"ที่ปรึกษามืออาชีพ ให้คำแนะนำ รวมทั้งช่วยวางแผน และขับเคลื่อน กลยุทธ์ด้วยความมั่นใจ" },
  ], []);

  const trustC = useMemo(() => [keys[0],keys[1],keys[2]], [keys]);
  const provC  = useMemo(() => [keys[3],keys[4],keys[5]], [keys]);
  const mobileView = (view==="center"||view==="full") ? "trust" : view;

  return (
    <section ref={secRef} className="relative isolate overflow-hidden py-20 strength-dark" onMouseMove={onM}>
      <img src={stBg} alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 -z-30 h-full w-full object-cover opacity-60" />
      <div ref={bgRef} className="strength-dark__bg pointer-events-none absolute inset-0 -z-20" />
      {inV && <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"><Particles /></div>}

      <div className="relative z-10 mx-auto max-w-6xl px-6 mt-20 mb-20">
        {/* Header */}
        <div className="flex flex-col items-center text-center"
          style={{ opacity:inV?1:0, transform:inV?"translateY(0)":"translateY(24px)", transition:"opacity .7s ease, transform .7s ease" }}>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs tracking-widest text-white/70 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-emerald-300" />OUR STRENGTHS
          </span>
          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-white md:text-4xl">
            Why Businesses Choose{" "}
            <span className="bg-gradient-to-r from-sky-300 to-emerald-300 bg-clip-text text-transparent">Aileen Solutions</span>
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/70 md:text-base">
            6 Keys to Value — เราเชื่อมั่นในสิ่งที่ทำ และมุ่งส่งมอบคุณค่าให้กับองค์กร ผ่านโซลูชั่น แพลตฟอร์ม บริการ และการให้คำปรึกษาที่เชื่อถือได้
          </p>
        </div>

        {/* Mobile tabs */}
        <div className="md:hidden mt-8 flex justify-center st-mobileTabsWrap">
          <div className="st-mTabs inline-flex rounded-full p-1">
            <button type="button" onClick={()=>go("trust")} className={`st-mTab ${mobileView==="trust"?"is-active":""}`}>Trust By</button>
            <button type="button" onClick={()=>go("provide")} className={`st-mTab ${mobileView==="provide"?"is-active":""}`}>Provide To</button>
          </div>
        </div>

        {/* Stages */}
        <div className="mt-10 md:mt-14 relative">
          {/* Mobile content */}
          <div className="md:hidden">
            <div className="flex justify-center mb-5">
              {mobileView==="trust"
                ? <span className="st-mCue inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs text-white/80"><span className="h-2 w-2 rounded-full bg-emerald-300"/>Trust By — สิ่งที่เรายึดมั่น</span>
                : <span className="st-mCue inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs text-white/80"><span className="h-2 w-2 rounded-full bg-sky-300"/>Provide To — สิ่งที่เราส่งมอบ</span>}
            </div>
            {mobileView==="trust"
              ? <MobileKeysList key="m-trust"   items={trustC} inV={inV} />
              : <MobileKeysList key="m-provide" items={provC}  inV={inV} />}
          </div>

          {/* Desktop: Full */}
          <div className={`strength-stage hidden md:block ${view==="full"?"is-show":"is-hide"}`}>
            <div className="relative mx-auto max-w-6xl" key={`f${vk}`}>
              <div className="grid md:grid-cols-[1fr_280px_1fr] gap-8 mb-6">
                <div className="flex justify-center">
                  <span className="st-bdg inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-5 py-2 text-sm font-medium text-emerald-300 backdrop-blur-sm">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"/>Trust By — สิ่งที่เรายึดมั่น
                  </span>
                </div>
                <div />
                <div className="flex justify-center">
                  <span className="st-bdg inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/5 px-5 py-2 text-sm font-medium text-sky-300 backdrop-blur-sm" style={{animationDelay:"0.1s"}}>
                    <span className="h-2 w-2 rounded-full bg-sky-400 animate-pulse"/>Provide To — สิ่งที่เราส่งมอบ
                  </span>
                </div>
              </div>
              <div className="grid md:grid-cols-[1fr_280px_1fr] items-stretch gap-8">
                <div className="flex flex-col gap-4">{trustC.map((it,i)=><EC key={it.id} item={it} dir="left"  dl={i*120} on={view==="full"}/>)}</div>
                <div className="flex items-center justify-center" style={{minHeight:340}}>
                  <img src={cubeImg} alt="Cube" className={`w-[240px] select-none ${inV?"st-cube-anim":""}`} draggable={false} style={{filter:"drop-shadow(0 0 24px rgba(56,224,208,.25))"}}/>
                </div>
                <div className="flex flex-col gap-4">{provC.map((it,i)=><EC key={it.id} item={it} dir="right" dl={i*120} on={view==="full"}/>)}</div>
              </div>
              <div className="flex justify-center items-center gap-3 mt-10">
                <button className="st-ip" onClick={()=>go("trust")}   type="button"><span className="a ab">‹</span> Trust By</button>
                <button className="st-ip" onClick={()=>go("provide")} type="button">Provide To <span className="a af">›</span></button>
              </div>
            </div>
          </div>

          {/* Desktop: Trust */}
          <div className={`strength-stage hidden md:block ${view==="trust"?"is-show":"is-hide"}`}>
            {view==="trust" && (
              <div className="flex justify-center mb-8">
                <span className="st-bdg inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-5 py-2 text-sm font-medium text-emerald-300 backdrop-blur-sm">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"/>Trust By — สิ่งที่เรายึดมั่น
                </span>
              </div>
            )}
            <div className="relative mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-2" key={`t${vk}`}>
              <div className="space-y-4">{trustC.map((it,i)=><EC key={it.id} item={it} dir="left" dl={i*140} on={view==="trust"}/>)}</div>
              <div className="relative flex flex-col items-center gap-8">
                <img src={cubeImg} alt="Cube" className={`w-[300px] select-none ${inV?"st-cube-anim":""}`} draggable={false} style={{filter:"drop-shadow(0 0 24px rgba(56,224,208,.25))"}}/>
                <div className="flex items-center gap-3">
                  <button className="st-ip" onClick={()=>go("full")}    type="button"><span style={{fontSize:"1rem",marginRight:"2px"}}>↩</span> Return</button>
                  <button className="st-ip" onClick={()=>go("provide")} type="button">Provide To <span className="a af">›</span></button>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop: Provide */}
          <div className={`strength-stage hidden md:block ${view==="provide"?"is-show":"is-hide"}`}>
            {view==="provide" && (
              <div className="flex justify-center mb-8">
                <span className="st-bdg inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/5 px-5 py-2 text-sm font-medium text-sky-300 backdrop-blur-sm">
                  <span className="h-2 w-2 rounded-full bg-sky-400 animate-pulse"/>Provide To — สิ่งที่เราส่งมอบ
                </span>
              </div>
            )}
            <div className="relative mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-2" key={`p${vk}`}>
              <div className="relative flex flex-col items-center gap-8">
                <img src={cubeImg} alt="Cube" className={`w-[300px] select-none ${inV?"st-cube-anim":""}`} draggable={false} style={{filter:"drop-shadow(0 0 24px rgba(56,224,208,.25))"}}/>
                <div className="flex items-center gap-3">
                  <button className="st-ip" onClick={()=>go("trust")} type="button"><span className="a ab">‹</span> Trust By</button>
                  <button className="st-ip" onClick={()=>go("full")}  type="button"><span style={{fontSize:"1rem",marginRight:"2px"}}>↩</span> Return</button>
                </div>
              </div>
              <div className="space-y-4">{provC.map((it,i)=><EC key={it.id} item={it} dir="right" dl={i*140} on={view==="provide"}/>)}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}