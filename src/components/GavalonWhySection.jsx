"use client";

import { useCallback, useRef, useState } from "react";
import { useLocale } from "@/i18n/LocaleProvider";
import { getServiceContent } from "@/i18n/messages";
import ButtonArrow from "@/components/ButtonArrow";
import { Reveal, RevealSection } from "@/components/GavalonReveal";

const gavalonVisitBtn =
  "inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#1a2838] via-[#1a4d72] to-[#2b9fd9] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_8px_28px_rgba(43,159,217,0.28)] transition hover:-translate-y-0.5 hover:brightness-110 sm:w-auto";

const contactBtn =
  "btn-fancy group relative inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/[0.04] px-7 py-3.5 text-sm font-semibold text-white/90 backdrop-blur transition hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/[0.07] sm:w-auto";

function SpotlightCard({ children }) {
  const cardRef = useRef(null);
  const [spot, setSpot] = useState({ x: 0, y: 0, active: false });

  const onMouseMove = useCallback((event) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setSpot({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      active: true,
    });
  }, []);

  const onMouseLeave = useCallback(() => {
    setSpot((prev) => ({ ...prev, active: false }));
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative mx-auto mt-10 max-w-3xl rounded-[24px] p-px"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[24px] transition-opacity duration-300"
        style={{
          opacity: spot.active ? 1 : 0.4,
          background: spot.active
            ? `radial-gradient(420px circle at ${spot.x}px ${spot.y}px, rgba(79, 195, 247, 0.8), rgba(26, 77, 114, 0.4) 36%, rgba(12, 22, 36, 0.12) 58%)`
            : "linear-gradient(165deg, rgba(79, 195, 247, 0.22), rgba(30, 58, 95, 0.14) 50%, rgba(15, 25, 40, 0.18))",
        }}
      />

      <div className="relative rounded-[23px] border border-white/[0.1] bg-[linear-gradient(180deg,rgba(11,20,34,0.82)_0%,rgba(6,12,22,0.9)_100%)] p-1.5 shadow-[0_40px_120px_rgba(0,0,0,0.55)] backdrop-blur-xl">
        <div className="relative overflow-hidden rounded-[18px] border border-white/[0.06] bg-[linear-gradient(165deg,rgba(9,17,28,0.98)_0%,rgba(5,10,18,0.99)_100%)] px-6 py-8 text-center md:px-10 md:py-9">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-[radial-gradient(ellipse_at_top,rgba(79,195,247,0.09),transparent_70%)]"
          />
          <div className="relative">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default function GavalonWhySection({
  sectionX = "px-8 sm:px-12 md:px-16 lg:px-24 xl:px-32 2xl:px-40",
}) {
  const { locale } = useLocale();
  const why = getServiceContent(locale, "gvl").why ?? {};

  return (
    <RevealSection
      as="section"
      id="why-gavalon"
      className={`relative overflow-hidden ${sectionX} py-24 text-white`}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[#050a12]" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_18%_22%,rgba(30,58,95,0.55),transparent_52%),radial-gradient(ellipse_at_82%_78%,rgba(15,45,78,0.45),transparent_48%),linear-gradient(180deg,#040810_0%,#0a1525_42%,#060d18_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[8%] top-[8%] h-[min(520px,70vw)] w-[min(720px,90vw)] rounded-full bg-[#1a3a5c]/18 blur-[110px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[6%] bottom-[6%] h-[min(460px,65vw)] w-[min(600px,85vw)] rounded-full bg-[#0d2847]/22 blur-[100px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 800' preserveAspectRatio='none'%3E%3Cpath d='M0 420 C200 280 400 520 600 400 C800 280 1000 480 1200 360 L1200 800 L0 800 Z' fill='%231e3a5f' fill-opacity='0.35'/%3E%3Cpath d='M0 520 C250 380 450 600 700 460 C900 350 1050 500 1200 440 L1200 800 L0 800 Z' fill='%230f2847' fill-opacity='0.4'/%3E%3C/svg%3E\")",
          backgroundSize: "cover",
          backgroundPosition: "center bottom",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(5,10,18,0.25)_55%,rgba(5,10,18,0.55)_100%)]"
      />

      <div className="relative mx-auto max-w-5xl">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal delay={0} variant="fade">
            <span className="lv8-pill border-white/12 bg-white/6 text-white/70">
              <span className="lv8-hdot" />
              {why.eyebrow}
            </span>
          </Reveal>
          <Reveal delay={100} variant="up">
            <h2 className="mt-5 text-3xl font-extrabold leading-[1.05] tracking-tight text-white md:text-5xl">
              {why.title}
            </h2>
          </Reveal>
        </div>

        <Reveal delay={200} variant="scale">
          <SpotlightCard>
            <Reveal delay={280} variant="up">
              <p className="text-base font-medium leading-7 text-white/90 md:text-lg md:leading-8">
                {why.body}
              </p>
            </Reveal>
            <Reveal delay={380} variant="up">
              <p className="mt-4 text-sm leading-6 text-slate-400 md:text-[15px]">
                {why.tagline}
              </p>
            </Reveal>

            <Reveal delay={480} variant="up">
              <div className="mt-7 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
                <a
                  href="https://npc-gavalon.com"
                  target="_blank"
                  rel="noreferrer noopener"
                  className={gavalonVisitBtn}
                >
                  {why.visitGavalon}
                  <ButtonArrow />
                </a>
                <a href="/contact" className={contactBtn}>
                  {why.contactUs}
                </a>
              </div>
            </Reveal>
          </SpotlightCard>
        </Reveal>
      </div>
    </RevealSection>
  );
}
