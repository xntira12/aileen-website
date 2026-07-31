"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
const PMT = "/img/home/productsSolutions/PMT.svg";
const RPA = "/img/home/productsSolutions/RPA.svg";
const AI = "/img/home/productsSolutions/AI.svg";
const LPM = "/img/home/productsSolutions/LPM.svg";
const QMS = "/img/home/productsSolutions/QMS.svg";
const GVL = "/img/home/productsSolutions/GVL.svg";
const SPC = "/img/home/productsSolutions/SPC.svg";
const ERP = "/img/home/productsSolutions/ERP.svg";

/* ══════════════════════════════════════════
   useScrollReveal — triggers .on when element enters viewport
══════════════════════════════════════════ */
function useScrollReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reveal = () => setOn(true);
    const ob = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { reveal(); ob.disconnect(); } },
      { threshold: Math.min(threshold, 0.01), rootMargin: "100px 0px" },
    );
    ob.observe(el);
    const id = requestAnimationFrame(() => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight + 100 && r.bottom > -100) reveal();
    });
    return () => { ob.disconnect(); cancelAnimationFrame(id); };
  }, [threshold]);
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
  { id:"gvl", n:"", t:"GAVALON", st:"Enterprise Legal & Regulatory Management Platform", ic:GVL, tags:["Legal","Compliance"], group:"ops", href:"/service/gavalon",
    summary:"เปลี่ยนเรื่องกฎหมายที่ซับซ้อน ให้เป็นข้อมูลที่ค้นหา เข้าใจ และนำไปปฏิบัติได้อย่างเป็นระบบ",
    detail:"GAVALON แพลตฟอร์มบริหารจัดการกฎหมายและข้อกำหนดสำหรับองค์กร ช่วยรวบรวมข้อมูลกฎหมาย ติดตามข้อกำหนดที่เกี่ยวข้อง และสนับสนุนการปฏิบัติตามกฎหมายผ่านระบบดิจิทัล เพื่อให้องค์กรเข้าถึงข้อมูลที่ถูกต้อง ลดความซ้ำซ้อนในการทำงาน และบริหารความเสี่ยงด้านการปฏิบัติตามกฎหมายได้อย่างมีประสิทธิภาพ พัฒนาร่วมกับ NPC S&E",
    features:["ศูนย์กลางข้อมูลกฎหมายและข้อกำหนดขององค์กร","การค้นหาและจัดหมวดหมู่ข้อมูลกฎหมาย","การประเมินความเกี่ยวข้องของกฎหมายต่อองค์กร","การกำหนดหน่วยงานและผู้รับผิดชอบ","การติดตามสถานะการปฏิบัติตามข้อกำหนด","การแจ้งเตือนข้อมูลหรือรายการที่ต้องดำเนินการ","Dashboard และรายงานภาพรวม","การกำหนดสิทธิ์การเข้าถึงตามบทบาท"] },
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

function GrpHead({ label }) {
  const [ref, on] = useScrollReveal(0.15);
  return (
    <div ref={ref} className={`svs-grp svs-grp-rv${on ? " on" : ""}`}>
      <div className="svs-gl" />
      <div className="svs-gb">{label}</div>
      <div className="svs-gl r" />
    </div>
  );
}

function useCardSide(colIndex, cols = 4) {
  const [side, setSide] = useState(colIndex < cols / 2 ? "left" : "right");

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setSide(mq.matches ? "up" : (colIndex < cols / 2 ? "left" : "right"));
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [colIndex, cols]);

  return side;
}

function GCard({ item, colIndex, onClick, interactive = true, cols = 4, revealed = false, delayMs = 0 }) {
  const innerRef = useRef(null);
  const side = useCardSide(colIndex, cols);
  const animClass = side === "left" ? "svs-card-in-l" : side === "right" ? "svs-card-in-r" : "svs-card-in-u";

  const onMv = useCallback((e) => {
    if (!interactive) return;
    const el = innerRef.current; if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.transform = `perspective(700px) rotateX(${((e.clientY-r.top)/r.height-0.5)*-5}deg) rotateY(${((e.clientX-r.left)/r.width-0.5)*5}deg) translateZ(4px)`;
  }, [interactive]);
  const onLv = useCallback(() => { if (innerRef.current) innerRef.current.style.transform = ""; }, []);

  return (
    <div
      className={`svs-c-wrap ${animClass}${revealed ? " on" : ""}`}
      style={revealed ? { animationDelay: `${delayMs}ms` } : undefined}
    >
      <div
        ref={innerRef}
        className={`svs-c ${interactive ? "" : "svs-c--static"}`}
        style={{ cursor: interactive ? "pointer" : "default" }}
        onClick={onClick}
        onMouseMove={onMv}
        onMouseLeave={onLv}
      >
      <span className="svs-n">{item.n}</span>
      <div className="svs-ic"><Ico src={item.ic} size={30} /><div className="svs-ir" /></div>
      <h3 style={{ marginTop:14, fontSize:"1.08rem", fontWeight:800, color:"#ffffff", lineHeight:1.35, paddingRight:28 }}>{item.t}</h3>
      {item.st ? (
        <p style={{ marginTop:6, fontSize:".78rem", lineHeight:1.5, color:"rgba(255,255,255,.55)", fontWeight:500 }}>{item.st}</p>
      ) : null}
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

/* ══════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════ */
export default function SectionServiceAndSolutions() {
  const router = useRouter();

  /* ── service state ── */
  const [view, setView]   = useState("grid");
  const [vk,   setVk]     = useState(0);
  const go = useCallback(v => { setView(v); setVk(k => k+1); }, []);
  const openService = useCallback((item) => {
    if (item.href) {
      router.push(item.href);
      return;
    }
    if (!DETAIL_HIDDEN_SERVICE_IDS.has(item.id)) go(item.id);
  }, [go, router]);
  const ai = DETAIL_SVC.find(s => s.id === view);

  /* ── viewport reveals ── */
  const [svcRef] = useScrollReveal(0.06);
  const [hdrRef, hdrOn] = useScrollReveal(0);
  const [autoFlowRef, flowOn] = useScrollReveal(0.1);
  const [autoGridRef, autoGridOn] = useScrollReveal(0.08);
  const [opsGridRef, opsGridOn] = useScrollReveal(0.08);
  const [statRef, statOn] = useScrollReveal(0.12);

  return (
    <section className="relative" style={{ contain:"paint" }}>
      {/* top curve */}
      <div className="pointer-events-none absolute left-0 right-0 top-0 z-[1]">
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="block w-full" style={{ height: "80px" }}>
          <path d="M0,80 Q720,0 1440,80 L1440,0 L0,0 Z" fill="white" />
        </svg>
      </div>

      {/* ════════════ SERVICES ════════════ */}
      <div ref={svcRef} style={{ position:"relative", zIndex:10, maxWidth:1180, margin:"0 auto", padding:"96px 24px 100px" }}>

        {/* Header */}
        <div ref={hdrRef} className={`svs-hdr${hdrOn ? " on" : ""}`} style={{ textAlign:"center" }}>
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
            <GrpHead label="TRANSFORMING PROCESSES INTO INTELLIGENT AI" />
            <div className="svs-flow" ref={autoFlowRef}>
              <div className={`svs-vline ${flowOn ? "on" : ""}`} />
              <div className={`svs-flow-top ${flowOn ? "on" : ""}`}>
                {AUTO_GROUP.map((it, i) => (
                  <div key={it.id} className="svs-flow-node">
                    <div
                      className={`svs-flow-node-rv${flowOn ? " on" : ""}`}
                      style={flowOn ? { animationDelay: `${i * 90}ms` } : undefined}
                    >
                      <div className="svs-flow-circle">{i+1}</div>
                    </div>
                    <div
                      className={`svs-flow-stem svs-flow-stem-rv${flowOn ? " on" : ""}`}
                      style={flowOn ? { animationDelay: `${120 + i * 90}ms` } : undefined}
                    />
                  </div>
                ))}
              </div>
              <div className="svs-grid4" ref={autoGridRef}>
                {AUTO_GROUP.map((it, i) => (
                  <React.Fragment key={it.id}>
                    {i > 0 && <div className="svs-connector"><div className="svs-connector-dot" /><div className="svs-connector-line" /></div>}
                    <GCard item={it} colIndex={i} onClick={() => go(it.id)} revealed={autoGridOn} delayMs={i * 90} />
                  </React.Fragment>
                ))}
              </div>
            </div>
            <div className={`svs-divider svs-rv${opsGridOn ? " on" : ""}`}>
              <div className="svs-divider-line" /><div className="svs-divider-dot" /><div className="svs-divider-line" />
            </div>
            <GrpHead label="ENTERPRISE OPERATIONS & PLATFORMS" />
            <div className="svs-grid4" ref={opsGridRef}>
              {OPS_GROUP.map((it, i) => (
                <GCard
                  key={it.id}
                  item={it}
                  colIndex={i}
                  onClick={() => openService(it)}
                  revealed={opsGridOn}
                  delayMs={i * 90}
                  cols={4}
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
                  {ai.href ? (
                    <a
                      href={ai.href}
                      className="btn-fancy group relative mt-6 inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/5 px-6 py-2.5 text-sm font-semibold text-white backdrop-blur transition hover:-translate-y-0.5"
                    >
                      <span className="relative z-10">ดูหน้า Product</span>
                      <span style={{ color:"#38e0d0" }}>›</span>
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Stats */}
        {view === "grid" && (
          <div ref={statRef} className="svs-stats-row" style={{ display:"flex", justifyContent:"center", alignItems:"center", gap:0, marginTop:68, flexWrap:"wrap" }}>
            {[{ v:String(SVC.length), l:"Solutions", side:"left" }, { v:"10+", l:"Enterprise Clients", side:"up" }, { v:"50+", l:"Enterprise Projects", side:"right" }].map((st, i) => (
              <React.Fragment key={st.l}>
                {i > 0 && <div className="svs-stat-sep" />}
                <div
                  className={`svs-st${statOn ? " on" : ""}`}
                  style={{ textAlign:"center", padding:"0 48px", animationDelay: statOn ? `${i * 100}ms` : undefined }}
                >
                  <div style={{ fontSize:"clamp(1.5rem,3vw,2rem)", fontWeight:800, background:"linear-gradient(135deg,#38e0d0,#0ea5e9)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>{st.v}</div>
                  <div style={{ fontSize:".82rem", color:"rgba(255,255,255,.6)", marginTop:4, fontWeight:500, letterSpacing:".04em" }}>{st.l}</div>
                </div>
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
