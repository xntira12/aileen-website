"use client";
import { useEffect, useRef, useState } from "react";
import { useLocale } from "../i18n/LocaleProvider";
const member1  = "/img/profile/member1.png";
const member2  = "/img/profile/member2.png";
const member3  = "/img/profile/member3.png";
const member4  = "/img/profile/member4.png";
const member5  = "/img/profile/member5.png";
const member6  = "/img/profile/member6.png";
const member7  = "/img/profile/member7.png";
const member8  = "/img/profile/member8.png";
const member9  = "/img/profile/member9.png";
const member10 = "/img/profile/member10.png";
const member11 = "/img/profile/member11.png";
const member12 = "/img/profile/member12.png";
const member13 = "/img/profile/member13.png";
const member14 = "/img/profile/member14.png";
const member15 = "/img/profile/member15.png";
const member16 = "/img/profile/member16.png";
const member17 = "/img/profile/member17.png";
const member18 = "/img/profile/member18.png";

const TEAM = [
  { photo: member5,  name: "Surinna.T",    role: "Managing Director",          dept: "sales"   },
  { photo: member12, name: "Peerapat.A",   role: "Sale Representative",        dept: "sales"   },
  { photo: member1,  name: "Kangsadan.S",  role: "Solutions Consultant",       dept: "sales"   },
  { photo: member14, name: "Pramote.T",    role: "Professional Services Director", dept: "tech" },
  { photo: member13, name: "Sittichai.S",  role: "Technical Lead",             dept: "tech"    },
  { photo: member9,  name: "Suphakorn.D",  role: "AI Engineer",                dept: "tech"    },
  { photo: member4,  name: "Ranuka.M",     role: "Software Developer",         dept: "tech"    },
  { photo: member10, name: "Phurich.J",    role: "Software Developer",         dept: "tech"    },
  { photo: member11, name: "Nithitthak.C", role: "Software Developer",         dept: "tech"    },
  { photo: member17, name: "Peerakit.R",   role: "Software Developer",         dept: "tech"    },
  { photo: member18, name: "Pongthorn.w",  role: "Software Developer",         dept: "tech"    },
  { photo: member16, name: "Chanawee.S",   role: "System Engineer",            dept: "tech"    },
  { photo: member8,  name: "Intira.N",     role: "UX/UI Developer",            dept: "tech"    },
  { photo: member6,  name: "Rungrat.K",    role: "Enterprise Project Lead",    dept: "support" },
  { photo: member3,  name: "Prapaporn.M",  role: "Business Analysis",          dept: "support" },
  { photo: member7,  name: "Chanakan.S",   role: "Business Analysis",          dept: "support" },
  { photo: member15, name: "Suwat.M",      role: "Technical Support",          dept: "support" },
  { photo: member2,  name: "Nattida.T",    role: "Technical Support",          dept: "support" },
];

const DEPT_CHIP = { sales: "Sales & Marketing", tech: "Technical Development", support: "Project & Support" };

const CARD_W = 178;

function useInView(threshold = 0.08) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

const Icons = {
  all:     <svg viewBox="0 0 20 20" fill="currentColor" style={{ width:13,height:13 }}><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>,
  sales:   <svg viewBox="0 0 20 20" fill="currentColor" style={{ width:13,height:13 }}><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zm6-4a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zm6-3a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/></svg>,
  tech:    <svg viewBox="0 0 20 20" fill="currentColor" style={{ width:13,height:13 }}><path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"/></svg>,
  support: <svg viewBox="0 0 20 20" fill="currentColor" style={{ width:13,height:13 }}><path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd"/><path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"/></svg>,
};

/* ── Card — pause fires ONLY when pointer is inside the photo box ── */
function Card({ member, delay, inView, onHoverStart, onHoverEnd }) {
  return (
    <div
      className={`t9-card ${inView ? "on" : ""}`}
      style={{ animationDelay:`${delay}ms` }}
    >
      <div
        className="t9-box"
        onPointerEnter={onHoverStart}
        onPointerLeave={onHoverEnd}
      >
        {member.photo
          ? <img src={member.photo} alt={member.role} className="t9-img" />
          : <div className="t9-avatar">{member.name.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase()}</div>}
        <div className="t9-wash" />
      </div>
      <div className="t9-meta">
        <div className="t9-role">{member.role}</div>
      </div>
    </div>
  );
}

/* ── Mobile Dropdown ── */
function MobileDropdown({ tab, onChange, tabs }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const current = tabs.find(t => t.key === tab);

  useEffect(() => {
    if (!open) return;
    const h = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("pointerdown", h);
    return () => document.removeEventListener("pointerdown", h);
  }, [open]);

  return (
    <div className="t9-dropdown-wrap">
      <div className="t9-dropdown" ref={ref}>
        <button type="button" className="t9-dropdown-btn" onClick={() => setOpen(o => !o)}>
          <span style={{ display:"flex", alignItems:"center", gap:8 }}>
            {Icons[tab]}
            <span>{current.label}</span>
          </span>
          <span className={`t9-dropdown-arr ${open ? "op" : ""}`}>▾</span>
        </button>
        <div className={`t9-dropdown-list ${open ? "op" : ""}`}>
          {tabs.map(t => {
            const count = t.key === "all" ? TEAM.length : TEAM.filter(m => m.dept === t.key).length;
            return (
              <div key={t.key} className={`t9-dropdown-item ${t.key === tab ? "act" : ""}`}
                onClick={() => { onChange(t.key); setOpen(false); }}>
                <span style={{ display:"flex", alignItems:"center", gap:8 }}>
                  {Icons[t.key]}<span>{t.label}</span>
                </span>
                <span className="t9-dropdown-badge">{count}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function SectionTeam() {
  const { messages } = useLocale();
  const teamCopy = messages.home?.team ?? {};
  const TABS = (teamCopy.tabs ?? []).map((tab) => ({
    key: tab.key,
    label: tab.label,
    chip: teamCopy.departments?.[tab.key] ?? null,
  }));

  const [secRef, inView] = useInView(0.08);
  const [tab, setTab]    = useState("all");
  const trackRef   = useRef(null);
  const marqueeRef = useRef(null); // ref to marquee track element
  const [canL, setCanL]         = useState(false);
  const [canR, setCanR]         = useState(false);
  const [activeDot, setActiveDot] = useState(0);
  const [isMobile, setIsMobile]   = useState(false);
  const dragRef = useRef({ dragging:false, startX:0, scrollLeft:0 });

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const isAll    = tab === "all";
  const filtered = isAll ? TEAM : TEAM.filter(m => m.dept === tab);
  const curTab   = TABS.find(t => t.key === tab);
  const dotCount = Math.max(1, Math.ceil(filtered.length / 2));

  /* pause marquee only when hovering a card */
  const pauseMarquee  = () => { marqueeRef.current?.classList.add("paused"); };
  const resumeMarquee = () => { marqueeRef.current?.classList.remove("paused"); };

  const syncNav = () => {
    if (isAll || isMobile) return;
    const el = trackRef.current; if (!el) return;
    const sl = el.scrollLeft, maxScroll = el.scrollWidth - el.clientWidth;
    setCanL(sl > 8);
    setCanR(sl < maxScroll - 8);
    setActiveDot(Math.round((sl / (maxScroll || 1)) * (dotCount - 1)));
  };

  const switchTab = key => {
    if (key === tab) return;
    setTab(key); setCanL(false); setActiveDot(0);
    requestAnimationFrame(() => {
      const el = trackRef.current; if (!el) return;
      el.scrollLeft = 0;
      setTimeout(() => setCanR(el.scrollWidth > el.clientWidth + 8), 80);
    });
  };

  const scroll = dir => trackRef.current?.scrollBy({ left: dir * CARD_W * 2, behavior:"smooth" });

  useEffect(() => {
    if (isAll || isMobile) return;
    const el = trackRef.current; if (!el) return;
    const check = () => setCanR(el.scrollWidth > el.clientWidth + 8);
    check();
    const ro = new ResizeObserver(check); ro.observe(el);
    return () => ro.disconnect();
  }, [tab, inView, isAll, isMobile]);

  const onMouseDown = e => {
    if (isMobile) return;
    const el = trackRef.current; if (!el) return;
    dragRef.current = { dragging:true, startX:e.pageX - el.offsetLeft, scrollLeft:el.scrollLeft };
    el.classList.add("dragging");
  };
  const onMouseMove = e => {
    if (!dragRef.current.dragging || isMobile) return;
    e.preventDefault();
    const el = trackRef.current; if (!el) return;
    el.scrollLeft = dragRef.current.scrollLeft - (e.pageX - el.offsetLeft - dragRef.current.startX) * 1.2;
  };
  const onMouseUp = () => { dragRef.current.dragging = false; trackRef.current?.classList.remove("dragging"); };

  return (
    <section ref={secRef} className="t9 py-24">
      <div className="t9-blob t9-blob-tl" />
      <div className="t9-blob t9-blob-br" />

      {/* header */}
      <div style={{ position:"relative", zIndex:1, textAlign:"center", padding:"0 24px" }}>
        <span className={`t9-pill t9-rv ${inView ? "on" : ""}`} style={{ animationDelay:"0ms" }}>
          <span className="t9-hdot" /> {teamCopy.eyebrow}
        </span>
        <h2 className={`t9-h2 t9-rv ${inView ? "on" : ""}`} style={{ animationDelay:"80ms" }}>
          {teamCopy.title} <span className="t9-grad">{teamCopy.titleHighlight}</span>
        </h2>
      </div>

      {/* ── Desktop tabs ── */}
      <div style={{ position:"relative", zIndex:1, maxWidth:1152, margin:"0 auto", padding:"0 12px" }}>
        <div className={`t9-ctrl-wrap t9-rv ${inView ? "on" : ""}`} style={{ animationDelay:"160ms" }}>
          <div className="t9-tabs">
            {TABS.map(t => {
              const count = t.key === "all" ? TEAM.length : TEAM.filter(m => m.dept === t.key).length;
              const on = tab === t.key;
              return (
                <button key={t.key} className={`t9-tab ${on ? "on" : ""}`} onClick={() => switchTab(t.key)}>
                  {Icons[t.key]}{t.label}
                  <span className="t9-cnt" style={{ background:on?"rgba(255,255,255,.25)":"#e2e8f0", color:on?"#fff":"#64748b" }}>{count}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Mobile dropdown ── */}
      <div className={`t9-rv ${inView ? "on" : ""}`} style={{ animationDelay:"160ms", position:"relative", zIndex:10 }}>
        <MobileDropdown tab={tab} onChange={switchTab} tabs={TABS} />
      </div>

      {/* ── ALL TAB: CSS marquee, pause only on card hover ── */}
      {isAll && (
        <div style={{ position:"relative", zIndex:1 }}>
          <div className="t9-marquee-wrap">
            <div ref={marqueeRef} className="t9-marquee-track">
              {[0, 1].map(copy => (
                <div key={copy} className="t9-marquee-list">
                  {TEAM.map((m, i) => (
                    <Card
                      key={`all-${copy}-${i}`}
                      member={m}
                      delay={0}
                      inView={inView}
                      onHoverStart={pauseMarquee}
                      onHoverEnd={resumeMarquee}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div style={{ height:52 }} />
        </div>
      )}

      {/* ── FILTERED TABS ── */}
      {!isAll && (
        <div style={{ position:"relative", zIndex:1, maxWidth:1152, margin:"0 auto" }}>
          <div className="t9-viewport-wrap">
            <div ref={trackRef} className="t9-track"
              onScroll={syncNav}
              onMouseDown={onMouseDown} onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}    onMouseLeave={onMouseUp}>
              <div className="t9-inner">
                {filtered.map((m, i) => (
                  <Card
                    key={`${tab}-${i}`}
                    member={m}
                    delay={200 + i * 60}
                    inView={inView}
                    onHoverStart={() => {}} // no marquee to pause
                    onHoverEnd={() => {}}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="t9-bottom-nav">
            <button className="t9-btn" disabled={!canL} onClick={() => scroll(-1)} aria-label={teamCopy.prev}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <div className="t9-dots">
              {Array.from({ length: dotCount }).map((_, i) => (
                <span key={i} className={`t9-dot-item ${i === activeDot ? "on" : ""}`} />
              ))}
            </div>
            <button className="t9-btn" disabled={!canR} onClick={() => scroll(1)} aria-label={teamCopy.next}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}