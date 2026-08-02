"use client";
import React, { useEffect, useRef, useState } from "react";
import { useLocale } from "../i18n/LocaleProvider";
const stBg = "/img/home/st-bg.jpg";
const logo = "/img/logo/aileen-logo.png";

const GMAP_URL =
  "https://www.google.com/maps/place/%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%A9%E0%B8%B1%E0%B8%97+%E0%B9%84%E0%B8%AD%E0%B8%A5%E0%B8%B5%E0%B8%99+%E0%B9%82%E0%B8%8B%E0%B8%A5%E0%B8%B9%E0%B8%8A%E0%B8%B1%E0%B9%88%E0%B8%99+%E0%B8%88%E0%B8%B3%E0%B8%81%E0%B8%B1%E0%B8%94+(%E0%B8%AA%E0%B8%B3%E0%B8%99%E0%B8%B1%E0%B8%81%E0%B8%87%E0%B8%B2%E0%B8%99%E0%B9%83%E0%B8%AB%E0%B8%8D%E0%B9%88)/@13.6729041,100.5047046,17z/data=!3m1!4b1!4m6!3m5!1s0x30e2a3ec06e79007:0xe094e844fc8ed3ed!8m2!3d13.6728989!4d100.5072795!16s%2Fg%2F11svmr065j?entry=ttu&g_ep=EgoyMDI2MDcyOS4wIKXMDSoASAFQAw%3D%3D";

const GMAP_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3876.5233680716533!2d100.5047046!3d13.6728989!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e2a3ec06e79007%3A0xe094e844fc8ed3ed!2z4Lia4Lij4Li04Lip4Lix4LiXIOC5hOC4reC4peC4teC4mSDguYLguIvguKXguLnguIrguLHguYjguJkg4LiI4Liz4LiB4Lix4LiUICjguKrguLPguJnguLHguIHguIfguLLguJnguYPguKvguI3guYgp!5e0!3m2!1sth!2sth!4v1730000000000";

export default function SectionContactDark() {
  const { messages } = useLocale();
  const footer = messages.footer ?? {};
  const brand = footer.brand ?? {};
  const cta = footer.cta ?? {};

  const secRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = secRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const rv = (delay) => ({
    className: `ct5-rv ${inView ? "on" : ""}`,
    style: { animationDelay: `${delay}ms` },
  });

  return (
    <section
      ref={secRef}
      className="relative isolate overflow-hidden strength-dark"
      style={{ padding: "100px 24px 0" }}
    >
      <img
        src={stBg}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-30 h-full w-full object-cover opacity-60"
      />
      <div
        className="strength-dark__bg pointer-events-none absolute inset-0 -z-20"
      />

      <div
        style={{
          maxWidth: 960,
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* ═══ CTA CARD ═══ */}
        <div {...rv(100)}>
          <div className="ct5-card">
            <div style={{ textAlign: "center" }}>
              <span
                {...rv(180)}
                style={{
                  ...rv(180).style,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "6px 18px",
                  borderRadius: 999,
                  border: "1px solid rgba(255,255,255,.12)",
                  background: "rgba(255,255,255,.05)",
                  color: "rgba(255,255,255,.65)",
                  fontSize: ".73rem",
                  letterSpacing: ".08em",
                }}
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: "#38e0d0",
                  }}
                />
                {cta.eyebrow}
              </span>

              <h2
                {...rv(300)}
                style={{
                  ...rv(300).style,
                  marginTop: 22,
                  fontSize: "clamp(1.7rem,3.5vw,2.4rem)",
                  fontWeight: 800,
                  color: "white",
                  lineHeight: 1.25,
                }}
              >
                {cta.title}
                <br />
                <span
                  style={{
                    background: "linear-gradient(135deg,#38e0d0,#38bdf8)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {cta.titleHighlight}
                </span>
              </h2>

              <p
                {...rv(420)}
                style={{
                  ...rv(420).style,
                  marginTop: 14,
                  maxWidth: 480,
                  marginLeft: "auto",
                  marginRight: "auto",
                  color: "rgba(255,255,255,.5)",
                  lineHeight: 1.7,
                  fontSize: ".88rem",
                }}
              >
                {cta.description}
              </p>

              <div {...rv(540)} style={{ ...rv(540).style, marginTop: 32 }}>
                <a
                  href="/contact"
                  className="btn-fancy group relative inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/5 px-7 py-3 text-sm font-semibold text-white backdrop-blur transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-500/15"
                >
                  <span className="relative z-10">{cta.button}</span>
                  <svg
                    className="w-3.5 text-white relative z-10"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ═══ DIVIDER ═══ */}
        <div style={{ padding: "0 40px", marginTop: 72 }}>
          <div className="ct5-divider" />
        </div>

        {/* ═══ FOOTER ═══ */}
        <footer style={{ padding: "48px 0 40px" }}>
          <div
            {...rv(700)}
            className={`ct5-fg ${rv(700).className}`}
            style={{
              ...rv(700).style,
              display: "grid",
              gridTemplateColumns: "1.3fr 1fr 1fr 1.2fr",
              gap: 40,
              alignItems: "start",
            }}
          >
            {/* Col 1: Logo */}
            <div>
              <div
                className="ct5-logoRow"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 16,
                }}
              >
                <img
                  src={logo}
                  alt="Aileen"
                  style={{ height: 28, width: "auto", opacity: 0.9 }}
                />
                <span
                  style={{
                    color: "rgba(255,255,255,.8)",
                    fontWeight: 700,
                    fontSize: ".82rem",
                    letterSpacing: ".04em",
                  }}
                >
                  {brand.name}
                </span>
              </div>

              <p
                style={{
                  color: "rgba(255,255,255,.35)",
                  fontSize: ".8rem",
                  lineHeight: 1.65,
                }}
              >
                {brand.tagline1}
                <br />
                {brand.tagline2}
              </p>

              {/* Social row */}
              <div
                className="ct5-socialRow"
                style={{ display: "flex", gap: 12, marginTop: 16 }}
              >
                <a
                  href="https://www.facebook.com/profile.php?id=61565288523413"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 10,
                    border: "1px solid rgba(255,255,255,.08)",
                    background: "rgba(255,255,255,.03)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "rgba(255,255,255,.4)",
                    fontSize: ".85rem",
                    textDecoration: "none",
                    transition: "all .25s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(56,224,208,.25)";
                    e.currentTarget.style.color = "#38e0d0";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,.08)";
                    e.currentTarget.style.color = "rgba(255,255,255,.4)";
                  }}
                >
                  f
                </a>
                <a
                  href="mailto:info@aileensolutions.com"
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 10,
                    border: "1px solid rgba(255,255,255,.08)",
                    background: "rgba(255,255,255,.03)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "rgba(255,255,255,.4)",
                    fontSize: ".75rem",
                    textDecoration: "none",
                    transition: "all .25s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(56,224,208,.25)";
                    e.currentTarget.style.color = "#38e0d0";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,.08)";
                    e.currentTarget.style.color = "rgba(255,255,255,.4)";
                  }}
                >
                  ✉
                </a>
              </div>
            </div>

            {/* Col 2: Solutions */}
            <div className="ct5-solCol">
              <div className="ct5-colTitle">{footer.solutionsTitle}</div>
              {(footer.solutions ?? []).map((item) => (
                <a key={item.label} href={item.href} className="ct5-link">{item.label}</a>
              ))}
            </div>

            <div className="ct5-contactCol">
              <div className="ct5-colTitle">{footer.contactTitle}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <a href={`mailto:${footer.email}`} className="ct5-chip">
                  <span style={{ color: "rgba(255,255,255,.35)" }}>✉</span>
                  <span>{footer.email}</span>
                </a>
                <a href={`tel:${footer.phone?.replace(/-/g, "")}`} className="ct5-chip">
                  <span style={{ color: "rgba(255,255,255,.35)" }}>☎</span>
                  <span>{footer.phone}</span>
                </a>
              </div>
            </div>

            <div className="ct5-mapCol">
              <div className="ct5-colTitle">{footer.locationTitle}</div>
              <a
                href={GMAP_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                <div className="ct5-map-wrap">
                  <iframe
                    src={GMAP_EMBED}
                    title={footer.mapTitle}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    style={{ border: 0 }}
                  />
                  <div className="ct5-map-overlay">
                    <span className="ct5-map-btn">{footer.mapButton}</span>
                  </div>
                </div>
              </a>
              <a
                href={GMAP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="ct5-chip"
                style={{ marginTop: 8, fontSize: ".78rem" }}
              >
               
                <span>
                  {(footer.addressLines ?? []).map((line, i) => (
                    <span key={line}>
                      {line}
                      {i < footer.addressLines.length - 1 ? <br /> : null}
                    </span>
                  ))}
                </span>
              </a>
            </div>
          </div>

          {/* Bottom */}
          <div style={{ padding: "0 40px", marginTop: 40 }}>
            <div className="ct5-divider" />
          </div>
          <div
            style={{
              marginTop: 20,
              textAlign: "center",
              fontSize: ".75rem",
              color: "rgba(255,255,255,.25)",
            }}
          >
            © {new Date().getFullYear()} {footer.copyright}
          </div>
        </footer>
      </div>
    </section>
  );
}
