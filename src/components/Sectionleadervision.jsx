"use client";
import { useEffect, useRef, useState } from "react";
import { useLocale } from "../i18n/LocaleProvider";
const executivePhoto1 = "/img/profile/executive.png";
const executivePhoto2 = "/img/profile/member5.png";

const LEADER_PHOTOS = [executivePhoto2, executivePhoto1];

function useInView(threshold = 0.08) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

export default function SectionLeaderVision() {
  const { messages } = useLocale();
  const copy = messages.home?.leaderVision ?? {};
  const leaders = copy.leaders ?? [];
  const [secRef, inView] = useInView(0.06);
  const anim = (kf, delay) => ({
    opacity: inView ? 1 : 0,
    animation: inView ? `${kf} .8s cubic-bezier(.22,1,.36,1) ${delay}ms both` : "none",
  });

  return (
    <section ref={secRef} className="lv8 pb-20 pt-20">
      <div className="lv8-header">
        <span className={`lv8-pill lv8-rv ${inView ? "on" : ""}`} style={{ animationDelay: "0ms" }}>
          <span className="lv8-hdot" />
          {copy.eyebrow}
        </span>
        <h2 className={`lv8-h2 lv8-rv ${inView ? "on" : ""}`} style={{ animationDelay: "80ms" }}>
          {copy.title}{" "}
          <span className="lv8-grad">{copy.titleHighlight}</span>
        </h2>
        <p className={`lv8-subtitle lv8-rv ${inView ? "on" : ""}`} style={{ animationDelay: "160ms" }}>
          {copy.subtitle}
        </p>
      </div>

      <div className="lv8-leaders">
        {leaders[0] && (
          <div className="lv8-row lv8-row-reverse" style={anim("lv8Sc", 300)}>
            <div className="lv8-content-panel" style={anim("lv8L", 440)}>
              <div className="lv8-accent-bar" />
              <div className="lv8-role-label">{leaders[0].role}</div>
              <span className="lv8-openquote">&ldquo;</span>
              <p className="lv8-quote">
                {leaders[0].quoteLine1}
                <br />
                <mark>{leaders[0].quoteHighlight}</mark>
              </p>
              <p className="lv8-body">
                {leaders[0].body}
              </p>
              <div className="lv8-tags">
                {leaders[0].tags?.map((tag) => (
                  <span key={tag} className="lv8-tag lv8-tag-b">{tag}</span>
                ))}
              </div>
            </div>

            <div className="lv8-photo-panel" style={anim("lv8R", 520)}>
              <div className="lv8-photo-inner">
                <img src={LEADER_PHOTOS[0]} alt={leaders[0].name} />
                <div className="lv8-photo-overlay" />
                <div className="lv8-nameplate">
                  <div className="lv8-person-name">{leaders[0].name}</div>
                  <div className="lv8-person-role">{leaders[0].role}</div>
                  <div className="lv8-person-co">{leaders[0].company}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {leaders[1] && (
          <div className="lv8-row" style={anim("lv8Sc", 220)}>
            <div className="lv8-photo-panel">
              <div className="lv8-photo-inner">
                <img src={LEADER_PHOTOS[1]} alt={leaders[1].name} />
                <div className="lv8-photo-overlay" />
                <div className="lv8-nameplate">
                  <div className="lv8-person-name">{leaders[1].name}</div>
                  <div className="lv8-person-role">{leaders[1].role}</div>
                  <div className="lv8-person-co">{leaders[1].company}</div>
                </div>
              </div>
            </div>

            <div className="lv8-content-panel" style={anim("lv8R", 360)}>
              <div className="lv8-accent-bar" />
              <div className="lv8-role-label">{leaders[1].role}</div>
              <span className="lv8-openquote">&ldquo;</span>
              <p className="lv8-quote">
                {leaders[1].quoteLine1}
                <mark>{leaders[1].quoteHighlight}</mark>
                <br />
                {leaders[1].quoteLine2}
              </p>
              <p className="lv8-body">{leaders[1].body}</p>
              <div className="lv8-tags">
                {leaders[1].tags?.map((tag, i) => (
                  <span key={tag} className={`lv8-tag ${i < 2 ? "lv8-tag-b" : i === 2 ? "lv8-tag-g" : "lv8-tag-s"}`}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
