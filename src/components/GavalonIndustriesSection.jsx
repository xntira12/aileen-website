"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Reveal, RevealSection } from "@/components/GavalonReveal";

const CX = 50;
const CY = 50;
const RADIUS = 34;

/** Soft chords across the ring for constellation feel (by node index step) */
const CHORD_STEPS = [2, 3];

const STAR_DOTS = [
  { x: 8, y: 12, s: 1.2, d: 0.2 },
  { x: 24, y: 8, s: 0.9, d: 0.35 },
  { x: 58, y: 6, s: 1.4, d: 0.25 },
  { x: 78, y: 10, s: 1, d: 0.45 },
  { x: 92, y: 22, s: 1.1, d: 0.3 },
  { x: 6, y: 48, s: 0.8, d: 0.4 },
  { x: 40, y: 40, s: 1.3, d: 0.15 },
  { x: 60, y: 72, s: 1, d: 0.5 },
  { x: 90, y: 68, s: 1.2, d: 0.28 },
  { x: 48, y: 88, s: 0.9, d: 0.38 },
  { x: 16, y: 78, s: 1.1, d: 0.22 },
  { x: 34, y: 70, s: 0.7, d: 0.55 },
];

function polar(index, total, radius = RADIUS) {
  const deg = (index / total) * 360 - 90;
  const rad = (deg * Math.PI) / 180;
  return {
    x: CX + radius * Math.cos(rad),
    y: CY + radius * Math.sin(rad),
    baseDeg: deg,
  };
}

export default function GavalonIndustriesSection({
  sectionX = "",
  industries = {},
}) {
  const stageRef = useRef(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0, active: false });
  const [hovered, setHovered] = useState(null);
  const [idleSpin, setIdleSpin] = useState(0);
  const reducedMotion = useRef(false);

  const items = industries.items ?? [];
  const count = items.length;

  const nodes = useMemo(
    () =>
      items.map((label, i) => ({
        label,
        ...polar(i, Math.max(count, 1)),
      })),
    [items, count],
  );

  const edges = useMemo(() => {
    if (count < 2) return [];
    const list = [];
    for (let i = 0; i < count; i += 1) {
      list.push([i, (i + 1) % count]);
    }
    CHORD_STEPS.forEach((step) => {
      for (let i = 0; i < count; i += 1) {
        const j = (i + step) % count;
        if (i < j) list.push([i, j]);
      }
    });
    return list;
  }, [count]);

  // Gentle idle rotation when mouse is idle
  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion.current) return undefined;

    let frame = 0;
    let raf = 0;
    const tick = () => {
      frame += 1;
      if (frame % 2 === 0) {
        setIdleSpin((v) => (v + 0.08) % 360);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const onMouseMove = useCallback((event) => {
    const el = stageRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const nx = (event.clientX - rect.left) / rect.width - 0.5;
    const ny = (event.clientY - rect.top) / rect.height - 0.5;
    setMouse({ x: nx, y: ny, active: true });
  }, []);

  const onMouseLeave = useCallback(() => {
    setMouse({ x: 0, y: 0, active: false });
    setHovered(null);
  }, []);

  const mouseRot = mouse.x * 52 + mouse.y * 22;
  const totalRot = idleSpin + mouseRot;

  return (
    <RevealSection
      as="section"
      id="industries"
      className={`relative overflow-hidden ${sectionX} py-24 text-white md:py-28`}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[#050a12]" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_18%,rgba(30,58,95,0.55),transparent_52%),radial-gradient(ellipse_at_82%_72%,rgba(11,99,155,0.28),transparent_48%),linear-gradient(180deg,#040810_0%,#0a1525_45%,#060d18_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[10%] top-[5%] h-[min(520px,70vw)] w-[min(680px,90vw)] rounded-full bg-[#1a3a5c]/20 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[8%] bottom-[8%] h-[min(420px,60vw)] w-[min(560px,80vw)] rounded-full bg-[#0b639b]/14 blur-[110px]"
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal delay={0} variant="fade">
            <span className="lv8-pill border-white/12 bg-white/6 text-white/70">
              <span className="lv8-hdot" />
              {industries.eyebrow}
            </span>
          </Reveal>
          <Reveal delay={90} variant="up">
            <h2 className="mt-5 text-3xl font-extrabold leading-[1.05] tracking-tight text-white md:text-5xl">
              {industries.title}
            </h2>
          </Reveal>
          {industries.description ? (
            <Reveal delay={180} variant="up">
              <p className="mt-5 text-base leading-8 text-slate-300 md:text-lg">
                {industries.description}
              </p>
            </Reveal>
          ) : null}
        </div>

        <Reveal delay={260} variant="fade">
          <div
            ref={stageRef}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            className="gvl-ind-stage relative mx-auto mt-12 aspect-square w-full max-w-[560px] touch-pan-y sm:max-w-[620px] md:mt-14 md:max-w-[680px]"
          >
            {/* Soft mouse spotlight */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-full transition-opacity duration-500"
              style={{
                opacity: mouse.active ? 1 : 0.55,
                background: mouse.active
                  ? `radial-gradient(460px circle at ${(mouse.x + 0.5) * 100}% ${(mouse.y + 0.5) * 100}%, rgba(79,195,247,0.16), transparent 55%)`
                  : "radial-gradient(circle at 50% 50%, rgba(79,195,247,0.1), transparent 62%)",
              }}
            />

            {/* Distant stars (subtle counter parallax) */}
            <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
              {STAR_DOTS.map((dot) => (
                <span
                  key={`${dot.x}-${dot.y}`}
                  className="absolute rounded-full bg-cyan-100/70 transition-transform duration-300 ease-out"
                  style={{
                    left: `${dot.x}%`,
                    top: `${dot.y}%`,
                    width: `${dot.s * 3}px`,
                    height: `${dot.s * 3}px`,
                    boxShadow: `0 0 ${6 + dot.s * 4}px rgba(79,195,247,0.55)`,
                    opacity: 0.3 + dot.d * 0.35,
                    transform: `translate(${mouse.x * dot.d * -12}px, ${mouse.y * dot.d * -12}px)`,
                  }}
                />
              ))}
            </div>

            {/* Rotating constellation ring */}
            <div
              className="absolute inset-0 will-change-transform"
              style={{ transform: `rotate(${idleSpin}deg)` }}
            >
              <div
                className="absolute inset-0 will-change-transform"
                style={{
                  transform: `rotate(${mouseRot}deg)`,
                  transition: mouse.active ? "none" : "transform 500ms cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              >
              <svg
                className="pointer-events-none absolute inset-0 h-full w-full"
                viewBox="0 0 100 100"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="gvlIndRing" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0b639b" stopOpacity="0.35" />
                    <stop offset="45%" stopColor="#4fc3f7" stopOpacity="0.75" />
                    <stop offset="100%" stopColor="#62e5da" stopOpacity="0.4" />
                  </linearGradient>
                  <linearGradient id="gvlIndLine" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4fc3f7" stopOpacity="0.2" />
                    <stop offset="50%" stopColor="#62e5da" stopOpacity="0.55" />
                    <stop offset="100%" stopColor="#0b639b" stopOpacity="0.22" />
                  </linearGradient>
                  <filter id="gvlIndGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="0.6" result="b" />
                    <feMerge>
                      <feMergeNode in="b" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Outer soft ring */}
                <circle
                  cx={CX}
                  cy={CY}
                  r={RADIUS}
                  fill="none"
                  stroke="url(#gvlIndRing)"
                  strokeWidth="0.55"
                  filter="url(#gvlIndGlow)"
                  opacity="0.9"
                />
                <circle
                  cx={CX}
                  cy={CY}
                  r={RADIUS}
                  fill="none"
                  stroke="rgba(79,195,247,0.12)"
                  strokeWidth="2.2"
                  opacity="0.7"
                />

                {/* Constellation chords + rim segments */}
                {edges.map(([a, b]) => {
                  const na = nodes[a];
                  const nb = nodes[b];
                  if (!na || !nb) return null;
                  const active = hovered === a || hovered === b;
                  const isAdjacent = (a + 1) % count === b || (b + 1) % count === a;
                  return (
                    <line
                      key={`${a}-${b}`}
                      x1={na.x}
                      y1={na.y}
                      x2={nb.x}
                      y2={nb.y}
                      stroke="url(#gvlIndLine)"
                      strokeWidth={active ? 0.45 : isAdjacent ? 0.28 : 0.14}
                      opacity={active ? 1 : isAdjacent ? 0.85 : 0.4}
                      className="transition-[stroke-width,opacity] duration-300"
                    />
                  );
                })}
              </svg>

              {/* Nodes on the circle — labels counter-rotate to stay readable */}
              {nodes.map((node, index) => {
                const isHot = hovered === index;
                return (
                  <button
                    key={node.label}
                    type="button"
                    className="gvl-ind-node absolute outline-none"
                    style={{
                      left: `${node.x}%`,
                      top: `${node.y}%`,
                      transform: "translate(-50%, -50%)",
                      zIndex: isHot ? 5 : 1,
                    }}
                    onMouseEnter={() => setHovered(index)}
                    onFocus={() => setHovered(index)}
                    onBlur={() => setHovered(null)}
                    aria-label={node.label}
                  >
                    <span
                      className="block will-change-transform"
                      style={{ transform: `rotate(${-totalRot}deg)` }}
                    >
                      <span
                        className={`relative flex max-w-[10rem] items-center gap-2 rounded-full border px-2.5 py-1.5 backdrop-blur-md transition duration-300 sm:max-w-[12rem] sm:gap-2.5 sm:px-3 sm:py-2 md:max-w-[13.5rem] ${
                          isHot
                            ? "scale-105 border-cyan-300/45 bg-white/[0.12] shadow-[0_0_28px_rgba(79,195,247,0.3)]"
                            : "border-white/12 bg-white/[0.05] shadow-[0_8px_24px_rgba(0,0,0,0.28)]"
                        }`}
                      >
                        <span
                          className={`relative flex h-2.5 w-2.5 shrink-0 rounded-full ${
                            isHot ? "bg-cyan-200" : "bg-[#4fc3f7]"
                          }`}
                          style={{
                            boxShadow: isHot
                              ? "0 0 16px rgba(125,211,252,0.9), 0 0 4px #fff"
                              : "0 0 10px rgba(79,195,247,0.7)",
                          }}
                        >
                          <span className="absolute inset-[-5px] animate-ping rounded-full bg-cyan-300/30 [animation-duration:2.8s]" />
                        </span>
                        <span
                          className={`text-[10px] font-semibold leading-snug sm:text-[11px] md:text-xs ${
                            isHot ? "text-white" : "text-slate-200/90"
                          }`}
                        >
                          {node.label}
                        </span>
                      </span>
                    </span>
                  </button>
                );
              })}
              </div>
            </div>

            {/* Center glow hub */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 h-[28%] w-[28%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(79,195,247,0.22),rgba(11,99,155,0.06)_55%,transparent_72%)] blur-md"
            />
          </div>
        </Reveal>
      </div>
    </RevealSection>
  );
}
