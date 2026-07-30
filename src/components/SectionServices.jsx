"use client";
import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
const stBg = "/img/home/st-bg.jpg";
const PMT = "/img/home/productsSolutions/PMT.svg";
const RPA = "/img/home/productsSolutions/RPA.svg";
const AI = "/img/home/productsSolutions/AI.svg";
const LPM = "/img/home/productsSolutions/LPM.svg";
const QMS = "/img/home/productsSolutions/QMS.svg";
const SPC = "/img/home/productsSolutions/SPC.svg";
const ERP = "/img/home/productsSolutions/ERP.svg";
const cubeImg       = "/img/home/cube.png";
const consultIco    = "/img/home/icon/consult.svg";
const experienceIco = "/img/home/icon/experience.svg";
const heartIco      = "/img/home/icon/heart.svg";
const platformIco   = "/img/home/icon/platform.svg";
const rapidlyIco    = "/img/home/icon/rapidly.svg";
const simplifyIco   = "/img/home/icon/simplify.svg";

/* ══════════════════════════════════════════
   useScrollReveal — triggers .on when element enters viewport
══════════════════════════════════════════ */
function useScrollReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); ob.disconnect(); } }, { threshold });
    ob.observe(el);
    return () => ob.disconnect();
  }, []);
  return [ref, on];
}

/* ══════════════════════════════════════════
   Data
══════════════════════════════════════════ */
const SVC = [
  { id:"pmp", n:"", t:"Process Management Platform", ic:PMT, tags:["BPM","Process"], group:"auto",
    summary:'จัดการ "กระบวนการทำงาน" จากรูปแบบเอกสาร กระดาษหรือ Visio ให้สามารถบริหาร จัดเก็บ และปรับปรุงกระบวนการได้ผ่านระบบเดียว',
    detail:"เพื่อให้ทุกคนในองค์กรเห็นภาพการทำงานเดียวกันและสามารถพัฒนา Process ได้อย่างต่อเนื่องในอนาคต",
    features:["เปลี่ยนความซับซ้อนของแผนผังกระบวนการ ข้อมูลที่กระจัดกระจาย (Silos) เอกสาร หรือไฟล์ Visio ที่ดูยาก ให้กลายเป็นกระบวนการทำงานที่เป็นระบบ สามารถจัดการและเข้าถึงได้ง่ายขึ้น","ค้นหา เจาะลึก และควบคุมกระบวนการทำงานของคุณให้เป็นมาตรฐาน ถูกต้องตามข้อกำหนด (Compliance) ทำงานร่วมกันได้ราบรื่น พร้อมสำหรับการปรับปรุงและรองรับทุกการเปลี่ยนแปลง","รักษาประสิทธิภาพการทำงาน ลดความเสี่ยง Knowledge Loss เมื่อพนักงานลาออกหรือหยุดงานยาว","ติดตามสถานะได้แบบเรียลไทม์ ตรวจสอบได้ทันทีว่ารายการใดเผยแพร่แล้ว รอดำเนินการ หรือรอการตรวจสอบ","ใช้เป็นฐานข้อมูลสำหรับต่อยอดในการนำระบบ Automation หรือ RPA มาปรับใช้ในองค์กร"] },
  { id:"rpa", n:"", t:"Robotic Process Automation", ic:RPA, tags:["Automation","RPA"], group:"auto",
    summary:"หุ่นยนต์ซอฟต์แวร์ (Bot) ที่ช่วยทำงานซ้ำๆ บนคอมพิวเตอร์ ทำหน้าที่เป็น ผู้ช่วยส่วนตัวอัตโนมัติของเราตลอด 24 ชั่วโมง",
    detail:"สามารถทำงานตามการ คลิ๊กเมาส์ หรือ กดคีย์บอร์ด ของเราได้ ในงานที่มีรูปแบบซ้ำๆเดิมๆหรือว่างาน Routine ที่เราต้องทำประจำทุกวัน , สัปดาห์ หรือเดือน Bot สามารถช่วยเราทำได้ทุกขั้นตอนอย่างแม่นยำ และรวดเร็ว",
    features:["ดำเนินการขั้นตอน ตามเงื่อนไขเวลา และเหตุการณ์ที่กำหนดใว้ ","ดำเนินการขั้นตอนซ้ำๆ ใช้เวลานาน ให้ทำเสร็จเร็วขึ้น ","อ่านข้อมูลจากระบบต้นทาง และบันทึกข้อมูลเข้าสู่ระบบอื่นๆ","เชื่อมโยง และแลกเปลี่ยนฟิลด์ข้อมูลระหว่างหลายๆ ระบบได้ ","ช่วยแนะนำขั้นตอนการใช้งาน Application ที่ถูกต้อง (Guide Me Mode)"] },
  { id:"dsai", n:"", t:"Domain-Specific Generative AI", ic:AI, tags:["AI","Generative"], group:"auto",
    summary:"AI ที่ถูกออกแบบให้เข้าใจ บริบทเฉพาะขององค์กร โดยทำงานบนฐานข้อมูลและโครงสร้างความรู้เฉพาะทางภายในองค์กร",
    detail:"ช่วยให้องค์กรสามารถใช้ Generative AI เพื่อ วิเคราะห์ข้อมูล สรุปความรู้ และสนับสนุนการตัดสินใจ ได้อย่างมีประสิทธิภาพ และสอดคล้องกับกระบวนการทำงานจริง ",
    features:["สร้าง AI Knowledge Assistant สำหรับองค์กร ","วิเคราะห์และสรุปข้อมูลจากเอกสารจำนวนมากได้อัตโนมัติ ","ค้นหาข้อมูลจาก Knowledge Base ขององค์กรได้อย่างแม่นยำ ","ทำงานร่วมกับ Document Control และ Process Framework ","รองรับการเชื่อมต่อกับระบบองค์กร เช่น ERP, Workflow และ Database ","สร้าง AI Chat Interface สำหรับการค้นหาความรู้ภายในองค์กร "] },
  { id:"lcbo", n:"", t:"Low-Code Business Orchestrator", ic:LPM, tags:["Low-Code","Workflow"], group:"auto",
    summary:"แพลตฟอร์มสำหรับพัฒนา Application และ Workflow ภายในองค์กรได้อย่างรวดเร็ว โดยใช้การออกแบบแบบ Visual Model ",
    detail:"แทนการเขียนโค้ดจำนวนมาก ช่วยให้องค์กรสามารถสร้างระบบดิจิทัลที่สอดคล้องกับกระบวนการทำงานจริง โดยไม่ต้องพัฒนาซอฟต์แวร์แบบ Traditional ที่ใช้เวลานานและมีความซับซ้อนสูง",
    features:["ออกแบบ Workflow และ Application ด้วย Visual Process Model","สร้างฟอร์ม ระบบอนุมัติ และ Workflow Automation ได้อย่างรวดเร็ว","จัดการเอกสารและข้อมูลภายในระบบอย่างเป็นโครงสร้าง","ติดตามสถานะงาน และวิเคราะห์ข้อมูลผ่าน Dashboard","รองรับการพัฒนา Application สำหรับหน่วยงานเฉพาะทาง เช่น Quality, Safety, Risk, Audit, Maintenance เป็นต้น"] },
  { id:"qmp", n:"", t:"Quality Management Platform", ic:QMS, tags:["Quality","Compliance"], group:"ops",
    summary:"แพลตฟอร์มที่ช่วยองค์กรบริหารจัดการคุณภาพ ควบคุม และยกระดับมาตรฐานการทำงานแบบครบวงจร",
    detail:"เพื่อให้มั่นใจว่าทุกกระบวนการสอดคล้องกับมาตรฐานสากล (เช่น ISO) และข้อกำหนดทางกฎหมายอย่างถูกต้อง โดยเปลี่ยนการทำงานที่กระจัดกระจายให้เป็นระบบอัตโนมัติที่สามารถตรวจสอบได้จริง",
    features:["Version Control & History Tracking: ระบบสามารถจัดการเวอร์ชันเอกสารให้อัตโนมัติและเก็บประวัติว่าใครแก้ แก้เมื่อไหร่ เพื่อป้องกันความสับสนจากการใช้เอกสารผิดเวอร์ชั่น ","ช่่วยให้ตรวจสอบได้ว่าเอกสารหรือข้อมูลต่าง ๆ ใครเป็นผู้แก้ไขและแก้ไขเมื่อใด เพื่อป้องกันความสับสนและตรวจสอบความถูกต้องของข้อมูลได้ตลอดเวลา","Executive Dashboard & Analytics: หน้าจอสรุปผลแบบกราฟิกเรียลไทม์ เพื่อให้ผู้บริหารเห็นภาพรวมของการดำเนินงานได้ทันทีโดยไม่ต้องรอรายงานสรุปแบบเดิม ","Email & In-App Notifications: ระบบแจ้งเตือนที่รวดเร็ว เพื่อลดปัญหาคอขวดในการรอคอยงาน","Enterprise Security & SSO (Single Sign-On): รองรับการล็อกอินด้วยบัญชีเดิมของบริษัท (เช่น Microsoft 365 หรือ Active Directory) และมีการกำหนดสิทธิ์การเข้าถึงข้อมูล (Role-Based Access Control) อย่างรัดกุม "] },
  { id:"scr", n:"", t:"Supply Chain Resilience", ic:SPC, tags:["Supply Chain","Digital"], group:"ops",
    summary:"แนวทางในการออกแบบและบริหาร ห่วงโซ่อุปทานให้สามารถรับมือกับความไม่แน่นอนและความเสี่ยงได้อย่างมีประสิทธิภาพ",
    detail:"ช่วยให้องค์กรสามารถติดตามสถานะของวัตถุดิบ สินค้า และกระบวนการจัดซื้อจัดจ้างได้แบบ Real-Time",
    features:["ติดตามสถานะคำสั่งซื้อและการจัดส่งสินค้าแบบ Real-Time","บริหารจัดการ Supplier และ Vendor Performance","วิเคราะห์ความเสี่ยงใน Supply Chain","Dashboard สำหรับติดตาม Inventory และ Logistics","เชื่อมโยงข้อมูลกับระบบ ERP และระบบจัดซื้อ","แจ้งเตือนความผิดปกติในกระบวนการ Supply Chain"] },
  { id:"erp", n:"", t:"ERP Workspace", ic:ERP, tags:["ERP","Workspace"], group:"ops",
    summary:"แพลตฟอร์มสำหรับ รวมการทำงานของระบบ ERP และ Application ต่างๆ ขององค์กรไว้ในพื้นที่เดียว",
    detail:"ช่วยให้ผู้ใช้งานสามารถเข้าถึงข้อมูล กระบวนการทำงาน และระบบต่างๆ ได้จาก Interface เดียว ลดความซับซ้อนของการใช้งานหลายระบบ",
    features:["Dashboard สำหรับติดตามข้อมูลธุรกิจจากหลายระบบ","เชื่อมต่อข้อมูลจาก ERP และระบบอื่นๆ ขององค์กร","ระบบค้นหาข้อมูลและเอกสารจากหลายระบบ","กำหนดสิทธิ์การเข้าถึงข้อมูลตามบทบาทของผู้ใช้งาน","รองรับการใช้งานผ่าน Web และ Mobile"] },
];
const DETAIL_HIDDEN_SERVICE_IDS = new Set(["scr", "erp"]);
const DETAIL_SVC = SVC.filter(s => !DETAIL_HIDDEN_SERVICE_IDS.has(s.id));
const AUTO_GROUP = SVC.filter(s => s.group === "auto");
const OPS_GROUP  = SVC.filter(s => s.group === "ops");

/* ══════════════════════════════════════════
   Sub-components
══════════════════════════════════════════ */
function Ico({ src, size = 28, style = {} }) {
  return <img src={src} alt="" width={size} height={size} style={{ display:"block", objectFit:"contain", ...style }} />;
}

function Particles({ n = 16 }) {
  const d = useMemo(() => Array.from({ length: n }, () => ({
    l:`${Math.random()*100}%`, b:`${Math.random()*25}%`,
    d:`${7+Math.random()*7}s`, dl:`${Math.random()*5}s`, s:`${2+Math.random()*2.5}px`,
  })), [n]);
  return <>{d.map((p, i) => <div key={i} className="st-p" style={{ left:p.l, bottom:p.b, width:p.s, height:p.s, "--d":p.d, "--dl":p.dl }} />)}</>;
}

function GrpHead({ label, on, delay = 0 }) {
  return (
    <div className={`svs-grp svs-grp-rv ${on ? "on" : ""}`} style={{ animationDelay:`${delay}ms` }}>
      <div className="svs-gl" /><div className="svs-gb">{label}</div><div className="svs-gl r" />
    </div>
  );
}

function GCard({ item, idx, onClick, on, interactive = true }) {
  const ref = useRef(null);
  const onMv = useCallback((e) => {
    if (!interactive) return;
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.transform = `perspective(700px) rotateX(${((e.clientY-r.top)/r.height-0.5)*-5}deg) rotateY(${((e.clientX-r.left)/r.width-0.5)*5}deg) translateZ(4px)`;
  }, [interactive]);
  const onLv = useCallback(() => { if (ref.current) ref.current.style.transform = ""; }, []);
  return (
    <div ref={ref} className={`svs-c svs-rv ${on ? "on" : ""}`} style={{ animationDelay:`${idx*80}ms`, cursor: interactive ? "pointer" : "default" }}
      onClick={onClick} onMouseMove={onMv} onMouseLeave={onLv}>
      <span className="svs-n">{item.n}</span>
      <div className="svs-ic"><Ico src={item.ic} size={30} /><div className="svs-ir" /></div>
      <h3 style={{ marginTop:14, fontSize:"1.08rem", fontWeight:800, color:"#ffffff", lineHeight:1.35, paddingRight:28 }}>{item.t}</h3>
      <div style={{ display:"flex", gap:5, marginTop:10, flexWrap:"wrap" }}>
        {item.tags.map(t => <span key={t} className="svs-tg">{t}</span>)}
      </div>
      <p style={{ marginTop:11, fontSize:".9rem", lineHeight:1.7, color:"rgba(255,255,255,.65)" }}>{item.summary}</p>
      {interactive ? (
        <div style={{ marginTop:14, fontSize:".8rem", fontWeight:700, background:"linear-gradient(135deg,#38e0d0,#0ea5e9)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", display:"flex", alignItems:"center", gap:4 }}>
        ดูรายละเอียด <span style={{ WebkitTextFillColor:"#38e0d0" }}>›</span>
        </div>
      ) : null}
    </div>
  );
}

function MobDD({ items, activeId, onSelect }) {
  const [open, setOpen] = useState(false);
  const active = items.find(s => s.id === activeId);
  const ref = useRef(null);
  useEffect(() => {
    if (!open) return;
    const h = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("pointerdown", h);
    return () => document.removeEventListener("pointerdown", h);
  }, [open]);
  return (
    <div className="svs-mdd" ref={ref}>
      <button type="button" className="svs-mdd-btn" onClick={() => setOpen(o => !o)}>
        <span style={{ display:"flex", alignItems:"center", gap:8 }}>
          <Ico src={active?.ic} size={20} />
          <span style={{ color:"rgba(255,255,255,.9)" }}>{active?.t}</span>
        </span>
        <span className={`svs-mdd-arr ${open ? "op" : ""}`}>▾</span>
      </button>
      <div className={`svs-mdd-list ${open ? "op" : ""}`}>
        {items.map(s => (
          <div key={s.id} className={`svs-mdd-item ${s.id === activeId ? "act" : ""}`} onClick={() => { onSelect(s.id); setOpen(false); }}>
            <Ico src={s.ic} size={18} style={{ flexShrink:0 }} /><span>{s.t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Strength card */
function EC({ item, dir = "left", dl = 0, on = false }) {
  return (
    <div className={`st-ec ${on ? (dir==="left" ? "st-cl" : "st-cr") : ""}`}
      style={{ animationDelay:`${dl}ms`, opacity:on ? undefined : 0, animationFillMode:"forwards" }}>
      <div className={`st-ico ${on ? "st-ring" : ""}`}>
        <img src={item.icon} alt="" className="h-8 w-8 select-none" draggable={false} />
      </div>
      <div>
        <div className="font-semibold text-white text-[.95rem]">{item.title}</div>
        <div className="mt-1 text-sm leading-relaxed text-white/65">{item.tooltip}</div>
      </div>
    </div>
  );
}

function MobileKeysList({ items, inV = false }) {
  return (
    <div className="md:hidden space-y-3">
      {items.map((it, idx) => (
        <div key={it.id} className={`st-mCard p-4 st-mu ${inV ? "on" : ""}`} style={{ animationDelay:`${180+idx*90}ms` }}>
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

/* ══════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════ */
export default function SectionServiceAndSolutions() {

  /* ── service state ── */
  const [view, setView]   = useState("grid");
  const [vk,   setVk]     = useState(0);
  const go = useCallback(v => { setView(v); setVk(k => k+1); }, []);
  const ai = DETAIL_SVC.find(s => s.id === view);

  /* ── strengths state ── */
  const [stView, setStView] = useState("full");
  const [stVk,   setStVk]   = useState(0);
  const goSt = useCallback(v => { setStView(v); setStVk(k => k+1); }, []);
  const mobileView = (stView === "center" || stView === "full") ? "trust" : stView;

  const keys = useMemo(() => [
    { id:"simplicity", title:"Simplicity", icon:simplifyIco,   tooltip:"เราเชื่อในระบบที่ใช้งานง่าย ช่วยให้ผู้ใช้เข้าใจกระบวนการ และทำงานได้ด้วยตนเองอย่างมีประสิทธิภาพ" },
    { id:"rapidly",    title:"Rapidly",    icon:rapidlyIco,    tooltip:"ให้ความสำคัญและตอบรับกับการเปลี่ยนแปลงทางธุรกิจที่เป็นไปอย่างรวดเร็วในปัจจุบัน" },
    { id:"experience", title:"Experience", icon:experienceIco, tooltip:"เรานำเสนอโซลูชั่นที่มีคุณภาพ เหมาะสมกับความต้องการ ตอบโจทย์ผู้ใช้งานได้อย่างตรงจุด และคุ้มค่ากับการลงทุน" },
    { id:"platform",   title:"Platform",   icon:platformIco,   tooltip:"แพลตฟอร์มที่เชื่อถือได้และยืดหยุ่น รองรับโซลูชั่นหลากหลาย เพิ่มคุณภาพการทำงานและขยายศักยภาพทางธุรกิจ" },
    { id:"services",   title:"Services",   icon:heartIco,      tooltip:"บริการครบวงจร ครอบคลุมการบูรณาการเทคโนโลยี เพื่อยกระดับการทำงานในองค์กร และตอบโจทย์ทางธุรกิจ" },
    { id:"consulting", title:"Consulting", icon:consultIco,    tooltip:"ที่ปรึกษามืออาชีพ ให้คำแนะนำ รวมทั้งช่วยวางแผน และขับเคลื่อนกลยุทธ์ด้วยความมั่นใจ" },
  ], []);
  const trustC = useMemo(() => [keys[0], keys[1], keys[2]], [keys]);
  const provC  = useMemo(() => [keys[3], keys[4], keys[5]], [keys]);

  /* ── scroll reveals (separate observers per block) ── */
  const [svcRef,  svcOn]  = useScrollReveal(0.06);
  const [divRef,  divOn]  = useScrollReveal(0.3);
  const [stRef,   stOn]   = useScrollReveal(0.1);
  const [statRef, statOn] = useScrollReveal(0.3);

  return (
    <section className="relative isolate overflow-hidden strength-dark" style={{ contain:"paint" }}>
      {/* top curve */}
      <div className="pointer-events-none absolute left-0 right-0 top-0 z-[60]">
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="block w-full" style={{ height: "80px" }}>
          <path d="M0,80 Q720,0 1440,80 L1440,0 L0,0 Z" fill="white" />
        </svg>
      </div>

      <img src={stBg} alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 -z-30 h-full w-full object-cover opacity-60" />
      <div className="strength-dark__bg pointer-events-none absolute inset-0 -z-20" />

      {/* ════════════ SERVICES ════════════ */}
      <div ref={svcRef} style={{ position:"relative", zIndex:1, maxWidth:1180, margin:"0 auto", padding:"80px 24px 60px" }}>

        {/* Header */}
        <div className={`svs-hdr ${svcOn ? "on" : ""}`} style={{ textAlign:"center" }}>
          <span style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"7px 16px", borderRadius:9999, border:"1px solid rgba(255,255,255,.18)", background:"rgba(255,255,255,.07)", backdropFilter:"blur(6px)", fontSize:".72rem", fontWeight:400, letterSpacing:".12em", color:"rgba(255,255,255,.85)" }}>
            <span style={{ width:8, height:8, borderRadius:"50%", background:"#6ee7b7", flexShrink:0 }} />
            SERVICES &amp; SOLUTIONS
          </span>
          <h2 style={{ marginTop:20, fontSize:"clamp(1.6rem,4vw,2.5rem)", fontWeight:800, letterSpacing:"-.02em", color:"white", lineHeight:1.15 }}>
            โซลูชั่นครบวงจรเพื่อ{" "}
            <span style={{ background:"linear-gradient(to right,#7dd3fc,#6ee7b7)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>ธุรกิจยุคใหม่</span>
          </h2>
          <p style={{ marginTop:16, maxWidth:580, marginLeft:"auto", marginRight:"auto", fontSize:"clamp(.88rem,1vw,1rem)", lineHeight:1.75, color:"rgba(255,255,255,.78)" }}>
            โซลูชั่นที่ออกแบบมาเพื่อเปลี่ยนกระบวนการทำงานให้ชาญฉลาดยิ่งขึ้น ด้วย AI และ Automation ที่ตอบโจทย์ทุกความต้องการทางธุรกิจ
          </p>
        </div>

        {/* Stages */}
        <div style={{ marginTop:52, position:"relative" }}>
          {/* GRID */}
          <div className={`svs-stage ${view === "grid" ? "show" : "hide"}`}>
            <GrpHead label="TRANSFORMING PROCESSES INTO INTELLIGENT AI" on={svcOn} delay={0} />
            <div className="svs-flow">
              <div className={`svs-vline ${svcOn ? "on" : ""}`} />
              <div className={`svs-flow-top ${svcOn ? "on" : ""}`}>
                {AUTO_GROUP.map((it, i) => (
                  <div key={it.id} className="svs-flow-node">
                    <div className={`svs-flow-node-rv ${svcOn ? "on" : ""}`} style={{ animationDelay:`${i*100}ms` }}>
                      <div className="svs-flow-circle">{i+1}</div>
                    </div>
                    <div className={`svs-flow-stem svs-flow-stem-rv ${svcOn ? "on" : ""}`} style={{ animationDelay:`${i*100+180}ms` }} />
                  </div>
                ))}
              </div>
              <div className="svs-grid4">
                {AUTO_GROUP.map((it, i) => (
                  <React.Fragment key={it.id}>
                    {i > 0 && <div className="svs-connector"><div className="svs-connector-dot" /><div className="svs-connector-line" /></div>}
                    <GCard item={it} idx={i} onClick={() => go(it.id)} on={svcOn} />
                  </React.Fragment>
                ))}
              </div>
            </div>
            <div className={`svs-divider svs-grp-rv ${svcOn ? "on" : ""}`} style={{ animationDelay:"250ms" }}>
              <div className="svs-divider-line" /><div className="svs-divider-dot" /><div className="svs-divider-line" />
            </div>
            <GrpHead label="ENTERPRISE OPERATIONS & PLATFORMS" on={svcOn} delay={350} />
            <div className="svs-grid3">
              {OPS_GROUP.map((it, i) => (
                <GCard
                  key={it.id}
                  item={it}
                  idx={i+4}
                  onClick={() => {
                    if (!DETAIL_HIDDEN_SERVICE_IDS.has(it.id)) go(it.id);
                  }}
                  on={svcOn}
                  interactive={!DETAIL_HIDDEN_SERVICE_IDS.has(it.id)}
                />
              ))}
            </div>
          </div>

          {/* DETAIL */}
          {ai && (
            <div className={`svs-stage ${view !== "grid" ? "show" : "hide"}`} key={`d-${vk}`}>
              <div className="svs-bdg-wrap" style={{ display:"flex", justifyContent:"center", marginBottom:20 }} />
              <MobDD items={DETAIL_SVC} activeId={ai.id} onSelect={id => go(id)} />
              <div className="svs-dg" style={{ display:"grid", gridTemplateColumns:"260px 1fr", gap:24, maxWidth:960, margin:"0 auto", alignItems:"start" }}>
                <div className="svs-dl svs-sidebar-desk" style={{ display:"flex", flexDirection:"column", gap:4 }}>
                  {DETAIL_SVC.map(s => (
                    <div key={s.id} className={`svs-sli ${s.id === ai.id ? "act" : ""}`} onClick={() => go(s.id)}>
                      <div style={{ width:34, height:34, borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", background:s.id===ai.id?"rgba(56,224,208,.14)":"rgba(255,255,255,.07)", flexShrink:0, transition:"background .2s" }}>
                        <Ico src={s.ic} size={20} />
                      </div>
                      <div style={{ fontSize:".82rem", fontWeight:600, lineHeight:1.3, color:"#ffffff" }}>{s.t}</div>
                    </div>
                  ))}
                  <div style={{ marginTop:12 }}>
                    <button className="svs-np" onClick={() => go("grid")} type="button"><span className="ar ab">‹</span> ย้อนกลับ</button>
                  </div>
                </div>
                <div className="svs-dr svs-dtl">
                  <div style={{ display:"flex", alignItems:"center", gap:14 }}>
                    <div style={{ width:54, height:54, borderRadius:14, display:"flex", alignItems:"center", justifyContent:"center", background:"rgba(56,224,208,.12)", border:"1px solid rgba(56,224,208,.24)", flexShrink:0 }}>
                      <Ico src={ai.ic} size={32} />
                    </div>
                    <div>
                      <div style={{ fontSize:".68rem", fontWeight:700, background:"linear-gradient(135deg,#38e0d0,#0ea5e9)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", letterSpacing:".07em", textTransform:"uppercase" }}>Service {ai.n}</div>
                      <h3 style={{ fontSize:"clamp(1.05rem,2.5vw,1.28rem)", fontWeight:800, color:"#ffffff", lineHeight:1.3, marginTop:3 }}>{ai.t}</h3>
                    </div>
                  </div>
                  <div style={{ display:"flex", gap:6, marginTop:14, flexWrap:"wrap" }}>
                    {ai.tags.map(t => <span key={t} className="svs-tg">{t}</span>)}
                  </div>
                  <p style={{ marginTop:16, fontSize:"clamp(.9rem,.95vw,.96rem)", fontWeight:400, lineHeight:1.85, color:"#ffffffa1" }}>{ai.summary} {ai.detail}</p>
                  <div style={{ height:1, background:"linear-gradient(90deg,transparent,rgba(56,224,208,.18),rgba(14,165,233,.12),transparent)", margin:"20px 0" }} />
                  <div style={{ fontSize:".72rem", fontWeight:700, background:"linear-gradient(135deg,#38e0d0,#0ea5e9)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", letterSpacing:".06em", textTransform:"uppercase", marginBottom:10 }}>Key Features</div>
                  <div>
                    {ai.features.map((f, i) => (
                      <div key={i} className="svs-feat">
                        <div style={{ width:24, height:24, borderRadius:7, display:"flex", alignItems:"center", justifyContent:"center", background:"rgba(56,224,208,.12)", color:"rgba(180,245,240,1)", fontSize:".7rem", fontWeight:800, flexShrink:0, marginTop:1, border:"1px solid rgba(56,224,208,.22)" }}>{String(i+1).padStart(2,"0")}</div>
                        <div style={{ fontSize:".9rem", color:"#ffffff", lineHeight:1.65, fontWeight:500 }}>{f}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Stats */}
        {view === "grid" && (
          <div ref={statRef} className="svs-stats-row" style={{ display:"flex", justifyContent:"center", alignItems:"center", gap:0, marginTop:68, flexWrap:"wrap" }}>
            {[{ v:String(SVC.length), l:"Solutions" }, { v:"10+", l:"Enterprise Clients" }, { v:"50+", l:"Enterprise Projects" }].map((st, i) => (
              <React.Fragment key={st.l}>
                {i > 0 && <div className="svs-stat-sep" />}
                <div className={`svs-st ${statOn ? "on" : ""}`} style={{ textAlign:"center", padding:"0 48px", animationDelay:`${0.8+i*0.12}s` }}>
                  <div style={{ fontSize:"clamp(1.5rem,3vw,2rem)", fontWeight:800, background:"linear-gradient(135deg,#38e0d0,#0ea5e9)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>{st.v}</div>
                  <div style={{ fontSize:".82rem", color:"rgba(255,255,255,.6)", marginTop:4, fontWeight:500, letterSpacing:".04em" }}>{st.l}</div>
                </div>
              </React.Fragment>
            ))}
          </div>
        )}
      </div>

      {/* ════════════ DIVIDER ════════════ */}
      <div ref={divRef} style={{ maxWidth:1180, margin:"0 auto", padding:"0 24px" }}>
        <div className="svs-sec-div">
          <div className={`svs-sec-div-line ${divOn ? "on" : ""}`} />
          <div className="svs-sec-div-icon" />
          <div className={`svs-sec-div-line ${divOn ? "on" : ""}`} style={{ animationDelay:"0.05s" }} />
        </div>
      </div>

      {/* ════════════ STRENGTHS ════════════ */}
      <div ref={stRef} style={{ position:"relative", zIndex:1, maxWidth:1180, margin:"0 auto", padding:"0 24px 100px" }}>
        {stOn && <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"><Particles /></div>}

        {/* Header */}
        <div className="flex flex-col items-center text-center"
          style={{ opacity:stOn?1:0, transform:stOn?"translateY(0)":"translateY(24px)", transition:"opacity .7s ease, transform .7s ease" }}>
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
            <button type="button" onClick={() => goSt("trust")}   className={`st-mTab ${mobileView==="trust"?"is-active":""}`}>Trust By</button>
            <button type="button" onClick={() => goSt("provide")} className={`st-mTab ${mobileView==="provide"?"is-active":""}`}>Provide To</button>
          </div>
        </div>

        {/* Stages */}
        <div className="mt-10 md:mt-14 relative">
          {/* Mobile */}
          <div className="md:hidden">
            <div className="flex justify-center mb-5">
              {mobileView==="trust"
                ? <span className="st-mCue inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs text-white/80"><span className="h-2 w-2 rounded-full bg-emerald-300"/>Trust By — สิ่งที่เรายึดมั่น</span>
                : <span className="st-mCue inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs text-white/80"><span className="h-2 w-2 rounded-full bg-sky-300"/>Provide To — สิ่งที่เราส่งมอบ</span>}
            </div>
            {mobileView==="trust"
              ? <MobileKeysList key="m-trust"   items={trustC} inV={stOn} />
              : <MobileKeysList key="m-provide" items={provC}  inV={stOn} />}
          </div>

          {/* Desktop: Full */}
          <div className={`strength-stage hidden md:block ${stView==="full"?"is-show":"is-hide"}`}>
            <div className="relative mx-auto max-w-6xl" key={`f${stVk}`}>
              <div className="grid md:grid-cols-[1fr_280px_1fr] gap-8 mb-6">
                <div className={`flex justify-center svs-rv ${stOn?"on":""}`} style={{ animationDelay:"0ms" }}>
                  <span className="st-bdg inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-5 py-2 text-sm font-medium text-emerald-300 backdrop-blur-sm">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"/>Trust By — สิ่งที่เรายึดมั่น
                  </span>
                </div>
                <div />
                <div className={`flex justify-center svs-rv ${stOn?"on":""}`} style={{ animationDelay:"100ms" }}>
                  <span className="st-bdg inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/5 px-5 py-2 text-sm font-medium text-sky-300 backdrop-blur-sm">
                    <span className="h-2 w-2 rounded-full bg-sky-400 animate-pulse"/>Provide To — สิ่งที่เราส่งมอบ
                  </span>
                </div>
              </div>
              <div className="grid md:grid-cols-[1fr_280px_1fr] items-stretch gap-8">
                <div className="flex flex-col gap-4">{trustC.map((it,i) => <EC key={it.id} item={it} dir="left"  dl={i*120} on={stView==="full"} />)}</div>
                <div className={`flex items-center justify-center svs-rvS ${stOn?"on":""}`} style={{ minHeight:340, animationDelay:"200ms" }}>
                  <img src={cubeImg} alt="Cube" className={`w-[240px] select-none ${stOn?"st-cube-anim":""}`} draggable={false} style={{ filter:"drop-shadow(0 0 24px rgba(56,224,208,.25))" }} />
                </div>
                <div className="flex flex-col gap-4">{provC.map((it,i) => <EC key={it.id} item={it} dir="right" dl={i*120} on={stView==="full"} />)}</div>
              </div>
              <div className={`flex justify-center items-center gap-3 mt-10 svs-rv ${stOn?"on":""}`} style={{ animationDelay:"400ms" }}>
                <button className="st-ip" onClick={() => goSt("trust")}   type="button"><span className="a ab">‹</span> Trust By</button>
                <button className="st-ip" onClick={() => goSt("provide")} type="button">Provide To <span className="a af">›</span></button>
              </div>
            </div>
          </div>

          {/* Desktop: Trust */}
          <div className={`strength-stage hidden md:block ${stView==="trust"?"is-show":"is-hide"}`}>
            {stView==="trust" && (
              <div className="flex justify-center mb-8">
                <span className="st-bdg inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-5 py-2 text-sm font-medium text-emerald-300 backdrop-blur-sm">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"/>Trust By — สิ่งที่เรายึดมั่น
                </span>
              </div>
            )}
            <div className="relative mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-2" key={`t${stVk}`}>
              <div className="space-y-4">{trustC.map((it,i) => <EC key={it.id} item={it} dir="left" dl={i*140} on={stView==="trust"} />)}</div>
              <div className="relative flex flex-col items-center gap-8">
                <img src={cubeImg} alt="Cube" className={`w-[300px] select-none ${stOn?"st-cube-anim":""}`} draggable={false} style={{ filter:"drop-shadow(0 0 24px rgba(56,224,208,.25))" }} />
                <div className="flex items-center gap-3">
                  <button className="st-ip" onClick={() => goSt("full")}    type="button"><span style={{ fontSize:"1rem",marginRight:"2px" }}>↩</span> Return</button>
                  <button className="st-ip" onClick={() => goSt("provide")} type="button">Provide To <span className="a af">›</span></button>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop: Provide */}
          <div className={`strength-stage hidden md:block ${stView==="provide"?"is-show":"is-hide"}`}>
            {stView==="provide" && (
              <div className="flex justify-center mb-8">
                <span className="st-bdg inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/5 px-5 py-2 text-sm font-medium text-sky-300 backdrop-blur-sm">
                  <span className="h-2 w-2 rounded-full bg-sky-400 animate-pulse"/>Provide To — สิ่งที่เราส่งมอบ
                </span>
              </div>
            )}
            <div className="relative mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-2" key={`p${stVk}`}>
              <div className="relative flex flex-col items-center gap-8">
                <img src={cubeImg} alt="Cube" className={`w-[300px] select-none ${stOn?"st-cube-anim":""}`} draggable={false} style={{ filter:"drop-shadow(0 0 24px rgba(56,224,208,.25))" }} />
                <div className="flex items-center gap-3">
                  <button className="st-ip" onClick={() => goSt("trust")} type="button"><span className="a ab">‹</span> Trust By</button>
                  <button className="st-ip" onClick={() => goSt("full")}  type="button"><span style={{ fontSize:"1rem",marginRight:"2px" }}>↩</span> Return</button>
                </div>
              </div>
              <div className="space-y-4">{provC.map((it,i) => <EC key={it.id} item={it} dir="right" dl={i*140} on={stView==="provide"} />)}</div>
            </div>
          </div>
        </div>
      </div>

      {/* bottom curve */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-[60]">
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="block w-full" style={{ height: "80px" }}>
          <path d="M0,0 Q720,80 1440,0 L1440,80 L0,80 Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
