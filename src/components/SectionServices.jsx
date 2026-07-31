"use client";
import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "../i18n/LocaleProvider";
import gvlLogo from "@/assets/img/gavalon/GVL-logo-w.png";
const PMT = "/img/home/productsSolutions/PMT.svg";
const RPA = "/img/home/productsSolutions/RPA.svg";
const AI = "/img/home/productsSolutions/AI.svg";
const LPM = "/img/home/productsSolutions/LPM.svg";
const QMS = "/img/home/productsSolutions/QMS.svg";
const GVL = gvlLogo.src;
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
const ICON_MAP = {
  pmp: PMT,
  rpa: RPA,
  dsai: AI,
  lcbo: LPM,
  qmp: QMS,
  gvl: GVL,
  scr: SPC,
  erp: ERP,
};
const AUTO_IDS = ["pmp", "rpa", "dsai", "lcbo"];
const DETAIL_HIDDEN_SERVICE_IDS = new Set(["scr", "erp"]);

function buildSvcItems(items = []) {
  return items.map((item) => ({
    id: item.id,
    n: item.n ?? "",
    t: item.title,
    st: item.subtitle,
    ic: ICON_MAP[item.id],
    tags: item.tags ?? [],
    group: AUTO_IDS.includes(item.id) ? "auto" : "ops",
    href: item.href,
    summary: item.summary,
    detail: item.detail,
    features: item.features ?? [],
  }));
}

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

function GCard({ item, colIndex, onClick, interactive = true, cols = 4, revealed = false, delayMs = 0, viewDetailsLabel = "View details" }) {
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
        {viewDetailsLabel} <span style={{ WebkitTextFillColor:"#38e0d0" }}>›</span>
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
  const { messages } = useLocale();
  const svcLabels = messages.home?.services ?? {};

  const SVC = useMemo(() => buildSvcItems(svcLabels.items), [svcLabels.items]);
  const DETAIL_SVC = useMemo(() => SVC.filter((s) => !DETAIL_HIDDEN_SERVICE_IDS.has(s.id)), [SVC]);
  const AUTO_GROUP = useMemo(() => SVC.filter((s) => s.group === "auto"), [SVC]);
  const OPS_GROUP = useMemo(() => SVC.filter((s) => s.group === "ops"), [SVC]);
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
      <div ref={svcRef} style={{ position:"relative", zIndex:10, maxWidth:1180, margin:"0 auto", padding:"220px 24px 100px" }}>

        {/* Header */}
        <div ref={hdrRef} className={`svs-hdr${hdrOn ? " on" : ""}`} style={{ textAlign:"center" }}>
          <span style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"7px 16px", borderRadius:9999, border:"1px solid rgba(255,255,255,.18)", background:"rgba(255,255,255,.07)", backdropFilter:"blur(6px)", fontSize:".72rem", fontWeight:400, letterSpacing:".12em", color:"rgba(255,255,255,.85)" }}>
            <span style={{ width:8, height:8, borderRadius:"50%", background:"#6ee7b7", flexShrink:0 }} />
            {svcLabels.eyebrow}
          </span>
          <h2 style={{ marginTop:20, fontSize:"clamp(1.6rem,4vw,2.5rem)", fontWeight:800, letterSpacing:"-.02em", color:"white", lineHeight:1.15 }}>
            {svcLabels.title}{" "}
            <span style={{ background:"linear-gradient(to right,#7dd3fc,#6ee7b7)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>{svcLabels.titleHighlight}</span>
          </h2>
          <p style={{ marginTop:16, maxWidth:580, marginLeft:"auto", marginRight:"auto", fontSize:"clamp(.88rem,1vw,1rem)", lineHeight:1.75, color:"rgba(255,255,255,.78)" }}>
            {svcLabels.description}
          </p>
        </div>

        {/* Stages */}
        <div style={{ marginTop:52, position:"relative" }}>
          {/* GRID */}
          <div className={`svs-stage ${view === "grid" ? "show" : "hide"}`}>
            <GrpHead label={svcLabels.autoGroupLabel} />
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
                    <GCard item={it} colIndex={i} onClick={() => go(it.id)} revealed={autoGridOn} delayMs={i * 90} viewDetailsLabel={svcLabels.viewDetails} />
                  </React.Fragment>
                ))}
              </div>
            </div>
            <div className={`svs-divider svs-rv${opsGridOn ? " on" : ""}`}>
              <div className="svs-divider-line" /><div className="svs-divider-dot" /><div className="svs-divider-line" />
            </div>
            <GrpHead label={svcLabels.opsGroupLabel} />
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
                  viewDetailsLabel={svcLabels.viewDetails}
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
                    <button className="svs-np" onClick={() => go("grid")} type="button"><span className="ar ab">‹</span> {svcLabels.back}</button>
                  </div>
                </div>
                <div className="svs-dr svs-dtl">
                  <div style={{ display:"flex", alignItems:"center", gap:14 }}>
                    <div style={{ width:54, height:54, borderRadius:14, display:"flex", alignItems:"center", justifyContent:"center", background:"rgba(56,224,208,.12)", border:"1px solid rgba(56,224,208,.24)", flexShrink:0 }}>
                      <Ico src={ai.ic} size={32} />
                    </div>
                    <div>
                      <div style={{ fontSize:".68rem", fontWeight:700, background:"linear-gradient(135deg,#38e0d0,#0ea5e9)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", letterSpacing:".07em", textTransform:"uppercase" }}>{svcLabels.serviceLabel} {ai.n}</div>
                      <h3 style={{ fontSize:"clamp(1.05rem,2.5vw,1.28rem)", fontWeight:800, color:"#ffffff", lineHeight:1.3, marginTop:3 }}>{ai.t}</h3>
                    </div>
                  </div>
                  <div style={{ display:"flex", gap:6, marginTop:14, flexWrap:"wrap" }}>
                    {ai.tags.map(t => <span key={t} className="svs-tg">{t}</span>)}
                  </div>
                  <p style={{ marginTop:16, fontSize:"clamp(.9rem,.95vw,.96rem)", fontWeight:400, lineHeight:1.85, color:"#ffffffa1" }}>{ai.summary} {ai.detail}</p>
                  <div style={{ height:1, background:"linear-gradient(90deg,transparent,rgba(56,224,208,.18),rgba(14,165,233,.12),transparent)", margin:"20px 0" }} />
                  <div style={{ fontSize:".72rem", fontWeight:700, background:"linear-gradient(135deg,#38e0d0,#0ea5e9)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", letterSpacing:".06em", textTransform:"uppercase", marginBottom:10 }}>{svcLabels.keyFeatures}</div>
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
                      <span className="relative z-10">{svcLabels.viewProductPage}</span>
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
            {(svcLabels.stats ?? []).map((st, i) => (
              <React.Fragment key={st.label}>
                {i > 0 && <div className="svs-stat-sep" />}
                <div
                  className={`svs-st${statOn ? " on" : ""}`}
                  style={{ textAlign:"center", padding:"0 48px", animationDelay: statOn ? `${i * 100}ms` : undefined }}
                >
                  <div style={{ fontSize:"clamp(1.5rem,3vw,2rem)", fontWeight:800, background:"linear-gradient(135deg,#38e0d0,#0ea5e9)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>{st.value}</div>
                  <div style={{ fontSize:".82rem", color:"rgba(255,255,255,.6)", marginTop:4, fontWeight:500, letterSpacing:".04em" }}>{st.label}</div>
                </div>
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
