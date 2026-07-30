"use client";

import { useEffect, useRef } from "react";
import { useAnimationActive } from "../hooks/useAnimationActive";

/* ─────────────────────────────────────────────
   AnimatedBg — canvas hero background
───────────────────────────────────────────── */
export default function AnimatedBg() {
  const containerRef = useRef(null);
  const active = useAnimationActive(containerRef, { rootMargin: "160px", initialVisible: true });
  const activeRef = useRef(true);
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const loopRef = useRef(null);

  useEffect(() => {
    activeRef.current = active;
    if (active && loopRef.current) {
      rafRef.current = requestAnimationFrame(loopRef.current);
    } else {
      cancelAnimationFrame(rafRef.current);
    }
  }, [active]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ct = canvas.getContext("2d", { alpha: false, desynchronized: true });
    const TARGET_FPS = 30;
    const FRAME_MS = 1000 / TARGET_FPS;
    let W, H;
    let DPR = 1.5;
    let isMobile = false;

    function isMobileCheck() {
      return window.innerWidth <= 768;
    }

    function updateScale() {
      isMobile = isMobileCheck();
      DPR = Math.min(window.devicePixelRatio || 1, isMobile ? 1.25 : 1.5);
    }

    updateScale();

    function resize() {
      const vw = window.innerWidth;
      const container = canvas.parentElement;
      const vh = container ? container.offsetHeight : window.innerHeight;

      updateScale();

      W = canvas.width = Math.round(vw * DPR);
      H = canvas.height = Math.round(vh * DPR);
      canvas.style.width = vw + "px";
      canvas.style.height = vh + "px";
    }

    resize();
    window.addEventListener("resize", resize);

    function drawBg(t) {
  // mobile: ลดความดำของ base ลงชัดเจน
  ct.fillStyle = isMobile ? "#0a1d2d" : "#040c18";
  ct.fillRect(0, 0, W, H);

  const sweep = ct.createLinearGradient(0, 0, W * 0.85, H);
  if (isMobile) {
    sweep.addColorStop(0, "rgba(8, 24, 40, 0.22)");
    sweep.addColorStop(0.22, "rgba(12, 42, 72, 0.55)");
    sweep.addColorStop(0.55, "rgba(16, 66, 110, 0.72)");
    sweep.addColorStop(1, "rgba(10, 48, 82, 0.58)");
  } else {
    sweep.addColorStop(0, "rgba(2, 8, 20, 0)");
    sweep.addColorStop(0.3, "rgba(6, 25, 48, 0.55)");
    sweep.addColorStop(0.6, "rgba(9, 38, 68, 0.80)");
    sweep.addColorStop(1, "rgba(7, 30, 58, 0.55)");
  }
  ct.fillStyle = sweep;
  ct.fillRect(0, 0, W, H);

  const mx = 0.5 + 0.04 * Math.sin(t * 0.09);
  const my = 0.5 + 0.03 * Math.sin(t * 0.11);

  const pulseA = isMobile
    ? 0.50 + 0.05 * Math.sin(t * 0.22)
    : 0.52 + 0.09 * Math.sin(t * 0.22);

  const cX = W * (isMobile ? 0.50 + (mx - 0.5) * 0.05 : 0.48 + (mx - 0.5) * 0.1);
  const cY = H * (isMobile ? 0.52 + (my - 0.5) * 0.04 : 0.52 + (my - 0.5) * 0.08);

  const bloom = ct.createRadialGradient(cX, cY, 0, cX, cY, W * (isMobile ? 0.90 : 0.62));
  bloom.addColorStop(0, `rgba(24,125,182, ${pulseA})`);
  bloom.addColorStop(0.30, `rgba(16,98,152, ${pulseA * 0.72})`);
  bloom.addColorStop(0.62, `rgba(10,70,118, ${pulseA * 0.34})`);
  bloom.addColorStop(1, "rgba(0,0,0,0)");
  ct.fillStyle = bloom;
  ct.fillRect(0, 0, W, H);

  const hlA = isMobile
    ? 0.26 + 0.04 * Math.sin(t * 0.17 + 1.4)
    : 0.3 + 0.07 * Math.sin(t * 0.17 + 1.4);

  const hlX = W * (0.50 + (mx - 0.5) * (isMobile ? 0.06 : 0.12));
  const hlY = H * (0.46 + (my - 0.5) * (isMobile ? 0.05 : 0.09));
  const hl = ct.createRadialGradient(hlX, hlY, 0, hlX, hlY, W * (isMobile ? 0.52 : 0.3));
  hl.addColorStop(0, `rgba(42,160,210, ${hlA})`);
  hl.addColorStop(0.45, `rgba(20,118,170, ${hlA * 0.48})`);
  hl.addColorStop(1, "rgba(0,0,0,0)");
  ct.fillStyle = hl;
  ct.fillRect(0, 0, W, H);

  // mobile: เติม ambient light ด้านล่างให้พื้นที่ดำหายไป
  if (isMobile) {
    const bottomWash = ct.createRadialGradient(
      W * 0.50,
      H * 1.02,
      0,
      W * 0.50,
      H * 1.02,
      W * 0.95
    );
    bottomWash.addColorStop(0, "rgba(0,180,170,0.30)");
    bottomWash.addColorStop(0.35, "rgba(0,120,150,0.18)");
    bottomWash.addColorStop(0.70, "rgba(0,70,110,0.08)");
    bottomWash.addColorStop(1, "rgba(0,0,0,0)");
    ct.fillStyle = bottomWash;
    ct.fillRect(0, 0, W, H);
  }

  const blX = W * (-0.02 + 0.04 * Math.sin(t * 0.10));
  const blY = H * (1.08 - 0.03 * Math.cos(t * 0.13));
  const bl = ct.createRadialGradient(
    blX,
    blY,
    0,
    W * 0.08,
    H * 0.90,
    W * (isMobile ? 0.62 : 0.55)
  );
  bl.addColorStop(0, isMobile ? "rgba(0,205,160,0.56)" : "rgba(0,200,152,0.78)");
  bl.addColorStop(0.28, isMobile ? "rgba(0,170,138,0.24)" : "rgba(0,162,125,0.38)");
  bl.addColorStop(0.60, isMobile ? "rgba(0,110,98,0.06)" : "rgba(0,105,92,0.13)");
  bl.addColorStop(1, "rgba(0,0,0,0)");
  ct.fillStyle = bl;
  ct.fillRect(0, 0, W, H);

  const trX = W * (1.10 - (mx - 0.5) * (isMobile ? 0.12 : 0.22));
  const trY = H * (-0.04 + (my - 0.5) * (isMobile ? 0.08 : 0.18));
  const tr = ct.createRadialGradient(
    trX,
    trY,
    0,
    W * 0.88,
    H * 0.10,
    W * (isMobile ? 0.50 : 0.46)
  );
  tr.addColorStop(0, isMobile ? "rgba(62,235,220,0.52)" : "rgba(52,232,212,0.95)");
  tr.addColorStop(0.10, isMobile ? "rgba(40,210,195,0.34)" : "rgba(36,215,195,0.72)");
  tr.addColorStop(0.30, isMobile ? "rgba(20,168,160,0.14)" : "rgba(18,175,158,0.30)");
  tr.addColorStop(0.60, isMobile ? "rgba(8,118,115,0.04)" : "rgba(8,118,115,0.09)");
  tr.addColorStop(1, "rgba(0,0,0,0)");
  ct.fillStyle = tr;
  ct.fillRect(0, 0, W, H);
}

    function drawGlassWaves(t) {
      ct.save();

      const bands = isMobile
        ? [
            {
              baseY: 0.24,
              thick: 0.105,
              cpx1: 0.34,
              cpy1: 0.12,
              cpx2: 0.66,
              cpy2: -0.10,
              spd: 0.020,
              ph: 0.5,
            },
            {
              baseY: 0.66,
              thick: 0.11,
              cpx1: 0.35,
              cpy1: -0.10,
              cpx2: 0.65,
              cpy2: 0.10,
              spd: 0.018,
              ph: 2.4,
            },
          ]
        : [
            { baseY: 0.16, thick: 0.14, cpx1: 0.28, cpy1: 0.28, cpx2: 0.72, cpy2: -0.24, spd: 0.025, ph: 0.0 },
            { baseY: 0.48, thick: 0.13, cpx1: 0.30, cpy1: -0.26, cpx2: 0.70, cpy2: 0.22, spd: 0.020, ph: 2.1 },
            { baseY: 0.76, thick: 0.14, cpx1: 0.26, cpy1: 0.24, cpx2: 0.74, cpy2: -0.22, spd: 0.030, ph: 4.0 },
          ];

      for (const b of bands) {
        // multi-frequency twist — more organic motion
        const f1 = Math.sin(t * b.spd + b.ph);
        const f2 = Math.sin(t * b.spd * 1.73 + b.ph + 1.2) * 0.42;
        const f3 = Math.sin(t * b.spd * 0.58 + b.ph - 0.8) * 0.20;
        const twist = f1 + f2 + f3;

        const yt = H * b.baseY;
        const yb = yt + H * b.thick;

        ct.beginPath();
        ct.moveTo(0, yt);
        ct.bezierCurveTo(
          W * b.cpx1, yt + H * b.cpy1 * twist,
          W * b.cpx2, yt + H * b.cpy2 * twist,
          W, yt
        );
        ct.lineTo(W, yb);
        ct.bezierCurveTo(
          W * b.cpx2, yb + H * b.cpy2 * twist,
          W * b.cpx1, yb + H * b.cpy1 * twist,
          0, yb
        );
        ct.closePath();

        const fillAlpha = isMobile ? 0.022 : 0.028;
        const g = ct.createLinearGradient(0, yt, 0, yb);
        g.addColorStop(0,   "rgba(178,224,255,0)");
        g.addColorStop(0.4, `rgba(200,235,255,${fillAlpha})`);
        g.addColorStop(0.6, `rgba(200,235,255,${fillAlpha})`);
        g.addColorStop(1,   "rgba(178,224,255,0)");
        ct.fillStyle = g;
        ct.fill();

        ct.beginPath();
        ct.moveTo(0, yt);
        ct.bezierCurveTo(
          W * b.cpx1, yt + H * b.cpy1,
          W * b.cpx2, yt + H * b.cpy2,
          W, yt
        );
        ct.strokeStyle = isMobile ? "rgba(210,240,255,0.050)" : "rgba(210,240,255,0.065)";
        ct.lineWidth = DPR * (isMobile ? 0.7 : 0.8);
        ct.stroke();
      }

      ct.restore();
    }

    function drawAccents(t) {
      ct.save();

      const lines = isMobile
        ? [
            { y: 0.18, cpx1: 0.34, cpy1: 0.10, cpx2: 0.66, cpy2: -0.09, spd: 0.015, ph: 0.8 },
            { y: 0.84, cpx1: 0.35, cpy1: -0.08, cpx2: 0.65, cpy2: 0.08, spd: 0.017, ph: 3.0 },
          ]
        : [
            { y: 0.08, cpx1: 0.22, cpy1: 0.18, cpx2: 0.78, cpy2: -0.15, spd: 0.018, ph: 0.4 },
            { y: 0.33, cpx1: 0.30, cpy1: -0.20, cpx2: 0.70, cpy2: 0.17, spd: 0.022, ph: 1.9 },
            { y: 0.63, cpx1: 0.25, cpy1: 0.22, cpx2: 0.75, cpy2: -0.18, spd: 0.016, ph: 3.3 },
            { y: 0.90, cpx1: 0.32, cpy1: -0.16, cpx2: 0.68, cpy2: 0.14, spd: 0.024, ph: 5.0 },
          ];

      for (const l of lines) {
        // multi-frequency twist
        const f1 = Math.sin(t * l.spd + l.ph);
        const f2 = Math.sin(t * l.spd * 1.85 + l.ph + 0.9) * 0.38;
        const twist = f1 + f2;

        const y = H * l.y;

        const a = isMobile
          ? 0.026 + 0.012 * Math.abs(twist)
          : 0.038 + 0.02 * Math.abs(twist);

        ct.beginPath();
        ct.moveTo(0, y);
        ct.bezierCurveTo(
          W * l.cpx1, y + H * l.cpy1 * twist,
          W * l.cpx2, y + H * l.cpy2 * twist,
          W, y
        );
        ct.strokeStyle = `rgba(185,230,255,${a})`;
        ct.lineWidth = DPR * (isMobile ? 0.45 : 0.55);
        ct.stroke();
      }

      ct.restore();
    }

    const particles = Array.from({ length: isMobile ? 18 : 28 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: (0.4 + Math.random() * (isMobile ? 1.1 : 1.5)) * DPR,
      vy: -(0.003 + Math.random() * 0.008),
      vx: (Math.random() - 0.5) * 0.0008,
      phase: Math.random() * Math.PI * 2,
      alpha: isMobile ? 0.04 + Math.random() * 0.12 : 0.05 + Math.random() * 0.20,
    }));

    function drawParticles(t) {
      ct.save();

      for (const p of particles) {
        const x = (((p.x + p.vx * t) % 1) + 1) % 1 * W;
        const y = (((p.y + p.vy * t) % 1) + 1) % 1 * H;
        const a = p.alpha * (0.55 + 0.45 * Math.sin(t * 0.65 + p.phase));

        ct.beginPath();
        ct.arc(x, y, p.r, 0, Math.PI * 2);
        ct.fillStyle = `rgba(140,218,240,${a})`;
        ct.fill();
      }

      ct.restore();
    }

    /* ─────────────────────────────────────────
       WAVE RIBBON
    ───────────────────────────────────────── */
    function smoothstep(a, b, x) {
      const tt = Math.max(0, Math.min(1, (x - a) / (b - a)));
      return tt * tt * (3 - 2 * tt);
    }

    function drawWave(t) {
      const N = isMobile ? 22 : 38;
      const LINE_GAP = (isMobile ? 1.45 : 1.92) * DPR;
      const PHASE_SPREAD = Math.PI * (isMobile ? 0.62 : 0.95);
      const xStep = (isMobile ? 10 : 8) * DPR;

      const nPts = Math.ceil(W / xStep) + 1;
      const baseY = H * (isMobile ? 0.71 : 0.67);

      ct.save();
      ct.lineCap = "round";
      ct.lineJoin = "round";

      for (let i = 0; i < N; i++) {
        const u = i / (N - 1);
        const c = Math.sin(u * Math.PI);

        const phase = u * PHASE_SPREAD;
        const ribbonOff = (u - 0.5) * LINE_GAP * (N - 1);

        const ampMain = H * (isMobile ? 0.050 - u * 0.008 : 0.072 - u * 0.014);
        const ampFine = H * (isMobile ? 0.052 + c * 0.006 : 0.090 + c * 0.010);
        const perLineDrift = H * (isMobile ? 0.060 : 0.108) * Math.sin(t * 0.20 + u * 1.25);

        const alpha = isMobile ? 0.10 + c * 0.42 : 0.12 + c * 0.56;
        const lw = (isMobile ? 0.58 + c * 0.10 : 0.65 + c * 0.10) * DPR;

        const grad = ct.createLinearGradient(0, 0, W, 0);
        grad.addColorStop(0.00, `rgba(185,238,255,${alpha * 0.34})`);
        grad.addColorStop(0.24, `rgba(210,245,255,${alpha * 0.72})`);
        grad.addColorStop(0.52, `rgba(236,252,255,${alpha})`);
        grad.addColorStop(0.78, `rgba(212,244,255,${alpha * 0.74})`);
        grad.addColorStop(1.00, `rgba(192,237,255,${alpha * 0.30})`);

        ct.beginPath();

        for (let pi = 0; pi < nPts; pi++) {
          const x = pi * xStep;
          const nx = x / W;

          // envelope pins both endpoints (0 at edges, 1 at center)
          const envelope = Math.sin(nx * Math.PI);

          const crestCenter = 0.50 + (isMobile ? 0.28 : 0.42) * Math.sin(t * 0.16 + u * 0.22);
          const troughCenter = 0.46 + (isMobile ? 0.24 : 0.38) * Math.sin(t * 0.16 + u * 0.22 - 1.15);

          const crest  = Math.exp(-Math.pow((nx - crestCenter)  / (isMobile ? 0.24 : 0.19), 2));
          const trough = Math.exp(-Math.pow((nx - troughCenter) / (isMobile ? 0.30 : 0.26), 2));

          const rightRise =
            smoothstep(0.80, 1.00, nx) *
            ((isMobile ? 0.14 : 0.22) +
              (isMobile ? 0.28 : 0.50) * (0.5 + 0.5 * Math.sin(t * 0.18 + u * 0.6)));

          const macro = (-trough * 0.82 + crest * 0.92 + rightRise * 0.42) * ampMain;

          const sway =
            Math.sin(nx * Math.PI * 1.02 - t * 0.18 + phase * 0.30) *
            H * (isMobile ? 0.006 : 0.010);

          const fine =
            Math.sin(nx * Math.PI * 1.55 - t * 0.30 + phase) * ampFine * (isMobile ? 0.46 : 0.70) +
            Math.sin(nx * Math.PI * 2.10 + t * 0.22 - phase * 0.70) * ampFine * (isMobile ? 0.22 : 0.35);

          const y =
            baseY + ribbonOff +
            envelope * (perLineDrift + macro + sway + fine);

          if (pi === 0) ct.moveTo(x, y);
          else ct.lineTo(x, y);
        }

        ct.strokeStyle = grad;
        ct.lineWidth = lw;
        ct.stroke();
      }

      ct.restore();
    }

    let t = 0;
    let lastTs = 0;
    let lastFrameTs = 0;
    let dtFiltered = 1 / 60;

    function loop(ts) {
      if (!activeRef.current) return;

      rafRef.current = requestAnimationFrame(loop);

      if (!lastFrameTs) lastFrameTs = ts;
      if (ts - lastFrameTs < FRAME_MS) return;
      lastFrameTs = ts;

      if (!lastTs) {
        lastTs = ts;
        return;
      }

      let dt = (ts - lastTs) / 1000;
      lastTs = ts;

      dt = Math.max(1 / 240, Math.min(dt, 1 / 30));
      dtFiltered += (dt - dtFiltered) * 0.12;
      t += dtFiltered;

      drawBg(t);
      drawGlassWaves(t);
      drawAccents(t);
      drawParticles(t);
      drawWave(t);
    }

    loopRef.current = loop;

    if (activeRef.current) {
      rafRef.current = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0">
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          display: "block",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
