"use client";
import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import SectionContactFooter from "../components/SectionContactFooter";
import SectionTeam from "../components/SectionTeam";
const aboutImg = "/img/about/aileen-about.jpg";

function useInView(t = 0.06) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const o = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setV(true); o.disconnect(); } },
      { threshold: t }
    );
    o.observe(el); return () => o.disconnect();
  }, []);
  return [ref, v];
}

const W = { maxWidth:"1280px", margin:"0 auto", padding:"0 32px" };

export default function AboutUs() {
  const [hr, hv] = useInView(0.04);
  const [s2, sv] = useInView(0.08);
  const [s3, tv] = useInView(0.06);
  const [s4, qv] = useInView(0.06);

  return (
    <div className="min-h-screen bg-[#060A14] text-white">
      <div style={{ position:"fixed", top:0, left:0, right:0, height:80, zIndex:49, pointerEvents:"none", background:"linear-gradient(to bottom,rgba(6,10,20,.88),rgba(6,10,20,.45) 60%,transparent)" }}/>
      <Navbar />

      <main style={{ position:"relative", zIndex:1 }}>

        {/* ══ S1 HERO ══ */}
        <div className="ab-hero" ref={hr}>
          <div className="ab-ph-col">
            <img src={aboutImg} alt="Aileen Solutions" className={`r-fd ${hv?"on":""}`} />
          </div>
          <div style={{ position:"relative", zIndex:2, width:"100%", maxWidth:"1280px", margin:"0 auto", padding:"0 32px", display:"flex", alignItems:"center" }}>
            <div className="ab-tx-col">
              <p className={`ab-lbl r-up ${hv?"on":""}`} style={{ animationDelay:"80ms" }}>ที่ปรึกษาและผู้ให้บริการด้าน</p>
              <h1 className={`ab-h1 r-up ${hv?"on":""}`} style={{ animationDelay:"160ms" }}>
                Digital<br/>
                <span className="gc">Transformation</span><br/>
                <span style={{ fontSize:"clamp(1.5rem,2.6vw,2.2rem)", color:"rgba(255, 255, 255, 0.66)", fontWeight:700 }}>ของประเทศไทย</span>
              </h1>
              <div className={`ab-uline ${hv?"on":""}`} />
              <p className={`ab-sub r-up ${hv?"on":""}`} style={{ animationDelay:"300ms" }}>
                บริษัท ไอลีน โซลูชั่น จำกัด · ก่อตั้ง 2561<br/>
                ยกระดับประสิทธิภาพองค์กรทั้งในระดับบริหาร<br/>
                และระดับปฏิบัติการ
              </p>
              <div className={`r-up ${hv?"on":""}`} style={{ animationDelay:"380ms" }}>
                <div className="ab-chip">
                  อุตสาหกรรม · พลังงาน · Manufacturing
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ══ S2 WHITE ══ */}
        <div className="ab-s2">
          <div style={W} ref={s2}>
            <div className="ab-s2-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:64, alignItems:"center" }}>
              <div>
                <div className={`ab-focus-lbl r-up ${sv?"on":""}`}>
                  <div className="ab-focus-bar"/><span className="ab-focus-tag">OUR FOCUS</span>
                </div>
                <p className={`r-up ${sv?"on":""}`} style={{ animationDelay:"60ms", margin:"0 0 12px", fontSize:"clamp(1.1rem,1.8vw,1.28rem)", fontWeight:700, color:"#0f172a", lineHeight:1.6 }}>
                  มุ่งเน้นการยกระดับประสิทธิภาพองค์กร<br/>ทั้งในระดับบริหารและระดับปฏิบัติการ
                </p>
                <p className={`r-up ${sv?"on":""}`} style={{ animationDelay:"120ms", margin:0, fontSize:"14px", fontWeight:400, color:"#64748b", lineHeight:1.75 }}>
                  โดยเฉพาะในภาคอุตสาหกรรม พลังงาน<br/>และสายการผลิต (Manufacturing &amp; Production Line)
                </p>
              </div>
              <div className={`r-up ${sv?"on":""} ab-stats-row`} style={{ animationDelay:"160ms", display:"flex", gap:0, alignItems:"center", justifyContent:"flex-end" }}>
                {[{ v:"2561", l:"ปีที่ก่อตั้ง" }, { v:"10+", l:"โซลูชั่นหลัก" }, { v:"10+", l:"องค์กรที่ไว้วางใจ" },{ v:"50+", l:"โครงการระดับองค์กร" }].map((st,i) => (
                  <div key={st.l} className="ab-stat-min" style={{ paddingLeft:i===0?0:28, marginLeft:i===0?0:28, borderLeft:i===0?"none":"1px solid #e2e8f0" }}>
                    <span style={{ fontSize:"clamp(1.6rem,3vw,2.1rem)", fontWeight:800, lineHeight:1, display:"block", background:"linear-gradient(120deg,#0891b2 30%,#0891b2)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>{st.v}</span>
                    <span style={{ fontSize:".72rem", color:"#94a3b8", fontWeight:500, marginTop:5, display:"block", letterSpacing:".04em" }}>{st.l}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ══ S3 LIGHT ══ */}
        <div className="ab-s3 pt-32 pb-32">
          <div style={W} ref={s3}>
            <div style={{ textAlign:"center", marginBottom:52 }}>
              <span className={`ab-pill-l r-up ${tv?"on":""}`}><span className="ab-dotb"/>OUR APPROACH</span>
              <h2 className={`r-up ${tv?"on":""}`} style={{ animationDelay:"80ms", marginTop:14, fontSize:"clamp(1.6rem,3vw,2.1rem)", fontWeight:800, color:"#0f172a", letterSpacing:"-.02em", lineHeight:1.2 }}>
                โซลูชั่นที่เชื่อมโยง<span className="gb">กระบวนการ ข้อมูล และเทคโนโลยี</span>
              </h2>
              <p className={`r-up ${tv?"on":""}`} style={{ animationDelay:"150ms", marginTop:10, fontSize:".88rem", color:"#64748b", maxWidth:400, marginLeft:"auto", marginRight:"auto", lineHeight:1.7 }}>
                แนวคิดการออกแบบโซลูชั่นที่ช่วยให้องค์กรสามารถพัฒนาได้จริง
              </p>
            </div>
            <div className="ab-ww-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16 }}>
              {[
                { ic:"🔗", t:"เชื่อมโยงกลยุทธ์ กระบวนการ และเทคโนโลยี", b:"เราออกแบบโซลูชั่นที่เชื่อมโยง กลยุทธ์องค์กร เข้ากับ กระบวนการทำงาน และ ระบบดิจิทัล เพื่อให้องค์กรดำเนินงานได้อย่างมีโครงสร้าง โปร่งใส ตรวจสอบได้ และพัฒนาต่อเนื่อง" },
                { ic:"⚙️", t:"Process ก่อน Technology", b:"เราให้ความสำคัญกับความถูกต้องของกระบวนการก่อนการเลือกใช้เทคโนโลยี เพราะเทคโนโลยีที่ดีต้องตั้งอยู่บนโครงสร้างที่ชัดเจน มีลำดับขั้นตอน และเข้าใจบทบาทหน้าที่อย่างแท้จริง" },
                { ic:"🚀", t:"Digital Transformation ที่แท้จริง", b:"สำหรับเรา Digital Transformation ไม่ใช่แค่ติดตั้งระบบใหม่ แต่คือการออกแบบโครงสร้างการทำงานที่สอดคล้องกันทั้งองค์กร ตั้งแต่ระดับนโยบาย กลยุทธ์ ไปจนถึงการปฏิบัติงานจริง" },
              ].map((c,i) => (
                <div key={i} className={`ab-wcard r-up ${tv?"on":""}`} style={{ animationDelay:`${200+i*90}ms` }}>
                  <div className="ab-wic">{c.ic}</div>
                  <div style={{ fontSize:".95rem", fontWeight:800, color:"#0f172a", lineHeight:1.4, marginBottom:10 }}>{c.t}</div>
                  <div style={{ fontSize:".84rem", color:"#64748b", lineHeight:1.85 }}>{c.b}</div>
                </div>
              ))}
            </div>

            {/* ── Current Focus Pillars ── */}
            <div className={`ab-diagram-wrap r-up ${tv?"on":""}`} style={{ animationDelay:"460ms" }}>

              <div className="ab-rm-eyebrow">
                <div className="ab-rm-pill"><span className="ab-rm-dot"/>OUR FOCUS</div>
                <h3 className="ab-rm-title">
                  มุ่งพัฒนาระบบองค์กร — <span className="gb">ที่ทำงานร่วมกับ AI</span>
                </h3>
               
              </div>

              <div className="ab-pillar-layout">

                {/* LEFT — two supporting rows */}
                <div className="ab-pillar-stack">

                  <div className="ab-pillar-row">
                    <div className="ab-pillar-row-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#0499a5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width:18,height:18}}>
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                        <circle cx="9" cy="7" r="4"/>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
                      </svg>
                    </div>
                    <div className="ab-pillar-row-body">
                      <span className="ab-pillar-row-num">01 — รากฐาน</span>
                      <span className="ab-pillar-row-title">กลยุทธ์และกระบวนการที่ชัดเจน</span>
                      <span className="ab-pillar-row-desc">วางโครงสร้างองค์กรและกระบวนการทำงานให้มั่นคงก่อน เพื่อให้ระบบที่จะตามมาทำงานได้อย่างมีประสิทธิภาพ</span>
                      <span className="ab-pillar-row-tag">Process-First</span>
                    </div>
                  </div>

                  <div className="ab-pillar-row">
                    <div className="ab-pillar-row-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#0499a5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width:18,height:18}}>
                        <rect x="2" y="4" width="20" height="14" rx="2"/>
                        <path d="M8 20h8M12 18v2"/>
                      </svg>
                    </div>
                    <div className="ab-pillar-row-body">
                      <span className="ab-pillar-row-num">02 — ระบบดิจิทัล</span>
                      <span className="ab-pillar-row-title">Platform ที่เชื่อมทุกส่วนขององค์กร</span>
                      <span className="ab-pillar-row-desc">ระบบดิจิทัลที่ยืดหยุ่นและขยายได้ เชื่อมโยงข้อมูลและการดำเนินงานทุกระดับแบบ Real-time</span>
                      <span className="ab-pillar-row-tag">Digital Platform</span>
                    </div>
                  </div>

                </div>

                {/* RIGHT — AI hero card */}
                <div className="ab-pillar-ai">
                  <div>
                    <span className="ab-pillar-ai-num">03 — จุดมุ่งหมาย</span>
                    <div className="ab-pillar-ai-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.95)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={{width:30,height:30}}>
                        <path d="M9.663 17h4.673M12 3v1m6.364 1.636-.707.707M21 12h-1M4 12H3m3.343-5.657-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                      </svg>
                    </div>
                    <span className="ab-pillar-ai-phase">AI &amp; Intelligence</span>
                    <span className="ab-pillar-ai-title">AI ที่ทำงานร่วมกับระบบได้จริง</span>
                    <span className="ab-pillar-ai-desc">นี่คือสิ่งที่เรามุ่งเน้น — บูรณาการ AI เข้ากับกระบวนการและระบบดิจิทัลขององค์กร ให้ทำงานร่วมกันได้อย่างเป็นธรรมชาติและสร้างคุณค่าได้จริง</span>
                  </div>
                  <span className="ab-pillar-ai-tag">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{width:11,height:11}}>
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                    </svg>
                    AI-Integrated System
                  </span>
                </div>

              </div>

              <div className="ab-rm-footnote">
                <div className="ab-rm-fn-bar"/>
                <p className="ab-rm-fn-text">
                  <strong>ไอลีน โซลูชั่น</strong> มุ่งพัฒนาระบบและโซลูชันที่ผสาน AI เข้ากับกระบวนการทำงานขององค์กร เพื่อสร้างคุณค่าอย่างแท้จริงและรองรับการเติบโตในอนาคต
                </p>
              </div>

            </div>
            {/* ── end focus pillars ── */}

          </div>
        </div>

        {/* ══ S4 WHITE VISION ══ */}
        <div className="ab-s4" ref={s4}>
          <div style={W}>

            {/* top label */}
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", marginBottom:0 }}>
              <span className={`ab-pill-d r-up ${qv?"on":""}`}>
                <span className="ab-dotc"/>VISION &amp; VALUES
              </span>
              <h2 className={`r-up ${qv?"on":""}`}
                style={{ animationDelay:"80ms", marginTop:16, fontSize:"clamp(1.7rem,3vw,2.3rem)",
                  fontWeight:800, letterSpacing:"-.03em", color:"#0f172a", textAlign:"center", lineHeight:1.15 }}>
                สิ่งที่เราเชื่อ และ<span className="gb"> สิ่งที่เราส่งมอบ</span>
              </h2>
            </div>

            {/* 2-col grid */}
            <div className="ab-v-grid">

              {/* LEFT — quote */}
              <div className={`ab-v-left r-up ${qv?"on":""}`} style={{ animationDelay:"160ms" }}>
                <div className="ab-v-corner" />
                <span className="lv8-openquote">&ldquo;</span>
                <p className="ab-v-qtext">
                  เราเชื่อว่าความเชี่ยวชาญที่แท้จริง ไม่ได้อยู่ที่เครื่องมือ<br/>
                  แต่อยู่ที่<strong>ความเข้าใจในระบบการทำงาน</strong>ขององค์กรทั้งภาพรวม<br/>
                  และความสามารถในการทำให้สิ่งที่ซับซ้อน<br/>
                  กลายเป็นระบบที่{" "}
                  <span className="gb" style={{ fontWeight:800 }}>
                    ชัดเจน บริหารจัดการได้ และเติบโตได้อย่างยั่งยืน
                  </span>
                </p>
                <div className="ab-v-source">
                  <div className="ab-v-sbar" />
                  <span className="ab-v-sname">บริษัท ไอลีน โซลูชั่น จำกัด · ก่อตั้ง 2561</span>
                </div>

                {/* tags */}
                <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginTop:32 }}>
                  {["Smart Systems","Clear Operations","Reliable Processes","Adaptive Solutions","Sustainable Impact"].map(t => (
                    <span key={t} className="ab-tag">{t}</span>
                  ))}
                </div>
              </div>

              {/* RIGHT — value pillars */}
              <div className={`ab-v-right r-up ${qv?"on":""}`} style={{ animationDelay:"260ms" }}>
                {[
                  { n:"01", title:"Simplicity", desc:"เราเชื่อในระบบที่ใช้งานง่าย ช่วยให้ผู้ใช้เข้าใจกระบวนการ และทำงานได้ด้วยตนเองอย่างมีประสิทธิภาพ" },
                  { n:"02", title:"Rapidly", desc:"ให้ความสำคัญและตอบรับกับการเปลี่ยนแปลงทางธุรกิจที่เป็นไปอย่างรวดเร็วในปัจจุบัน" },
                  { n:"03", title:"Experience", desc:"เรานำเสนอโซลูชั่นที่มีคุณภาพ เหมาะสมกับความต้องการ ตอบโจทย์ผู้ใช้งานได้อย่างตรงจุด" },
                  { n:"04", title:"Platform", desc:"แพลตฟอร์มที่เชื่อถือได้และยืดหยุ่น รองรับโซลูชั่นหลากหลาย" },
                  { n:"05", title:"Services", desc:"บริการครบวงจร ครอบคลุมการบูรณาการเทคโนโลยี เพื่อยกระดับการทำงานในองค์กร" },
                  { n:"06", title:"Consulting", desc:"ที่ปรึกษามืออาชีพ ให้คำแนะนำ รวมทั้งช่วยวางแผน และขับเคลื่อนกลยุทธ์ด้วยความมั่นใจ" },
                ].map((p, i) => (
                  <div key={p.n} className={`ab-v-pillar r-up ${qv?"on":""}`}
                    style={{ animationDelay:`${300 + i*80}ms` }}>
                    <span className="ab-v-pnum">{p.n}</span>
                    <div className="ab-v-ptxt">
                      <p className="ab-v-ptitle">{p.title}</p>
                      <p className="ab-v-pdesc">{p.desc}</p>
                    </div>
                    <div className="ab-v-pillar-line" />
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>

        <section className="py-0 bg-slate-50"><SectionTeam /></section>

      </main>
      <SectionContactFooter/>
    </div>
  );
}