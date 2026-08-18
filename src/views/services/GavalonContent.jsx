"use client";

import Navbar from "@/components/Navbar";
import AnimatedBgFlux from "@/components/AnimatedBgFlux";
import SectionContactFooter from "@/components/SectionContactFooter";
import GavalonWhySection from "@/components/GavalonWhySection";
import GavalonOverviewSection from "@/components/GavalonOverviewSection";
import GavalonIndustriesSection from "@/components/GavalonIndustriesSection";
import { Reveal, RevealSection } from "@/components/GavalonReveal";
import ButtonArrow from "@/components/ButtonArrow";
import gavalonFullLogo from "@/assets/img/gavalon/GVL-full-logo-w.png";
import aileenLogo from "@/assets/img/logo/aileen-logo.png";
import npcLogo from "@/assets/img/gavalon/npc.png";
import { useLocale } from "@/i18n/LocaleProvider";
import { getServiceContent } from "@/i18n/messages";

const PARTNER_LOGOS = {
  aileen: {
    logo: aileenLogo,
    logoClass: "h-14 w-auto max-w-[220px] object-contain object-left md:h-[4.5rem]",
  },
  npc: {
    logo: npcLogo,
    logoClass: "h-10 w-auto max-w-[180px] object-contain object-left md:h-12",
  },
};

const gavalonBtn =
  "inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0a3d66] via-[#0b639b] to-[#4fc3f7] px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(11,99,155,0.28)] transition hover:-translate-y-0.5 hover:brightness-105";

const contactBtnDark =
  "btn-fancy group relative inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/5 px-7 py-3 text-sm font-semibold text-white backdrop-blur transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-500/15";

const sectionX = "px-8 sm:px-12 md:px-16 lg:px-24 xl:px-32 2xl:px-40";

function SectionTitle({
  eyebrow,
  title,
  highlight,
  description,
  center = false,
  dark = false,
  delay = 0,
}) {
  const textClass = dark ? "text-white" : "text-slate-900";
  const descriptionClass = dark ? "text-slate-300" : "text-slate-600";

  return (
    <div className={center ? "mx-auto max-w-4xl text-center" : "max-w-4xl"}>
      {eyebrow ? (
        <Reveal delay={delay} variant="fade">
          <span className={`lv8-pill ${dark ? "border-white/12 bg-white/6 text-white/70" : ""}`}>
            <span className="lv8-hdot" />
            {eyebrow}
          </span>
        </Reveal>
      ) : null}
      <Reveal delay={delay + (eyebrow ? 90 : 0)} variant="up">
        <h2 className={`${eyebrow ? "mt-5" : ""} text-3xl font-extrabold leading-[1.05] tracking-tight md:text-5xl ${textClass}`}>
          {title}
          {highlight ? (
            <span className="mt-1 block bg-[linear-gradient(90deg,#0b639b,#62e5da)] bg-clip-text text-transparent">
              {highlight}
            </span>
          ) : null}
        </h2>
      </Reveal>
      {description ? (
        <Reveal delay={delay + (eyebrow ? 180 : 90)} variant="up">
          <p className={`mt-5 text-base leading-8 md:text-lg ${descriptionClass}`}>
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}

function HeroCard({ title, body }) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/[0.05] px-5 py-4 shadow-[0_14px_40px_rgba(2,6,23,0.18)] backdrop-blur">
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-100/65">{title}</p>
      <p className="mt-2 text-sm leading-7 text-slate-100/82">{body}</p>
    </div>
  );
}

export default function GavalonContent() {
  const { locale } = useLocale();
  const content = getServiceContent(locale, "gvl");
  const hero = content.hero ?? {};
  const overview = content.overview ?? {};
  const benefits = content.benefits ?? {};
  const capabilities = content.capabilities ?? {};
  const industries = content.industries ?? {};
  const partner = content.partner ?? {};

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />

      <main className="overflow-hidden">
        <RevealSection
          as="section"
          immediate
          className={`relative isolate overflow-hidden bg-[#041824] ${sectionX} pb-16 pt-28 text-white md:pb-24 md:pt-32`}
        >
          <div className="absolute inset-0 opacity-95">
            <AnimatedBgFlux side="left" />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.32)_0%,rgba(2,6,23,0.08)_28%,rgba(2,6,23,0.2)_100%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(56,189,248,0.12),transparent_26%),radial-gradient(circle_at_76%_74%,rgba(34,197,94,0.08),transparent_24%)]" />

          <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
            <div className="max-w-3xl">
              <Reveal delay={0} variant="scale">
                <h1 className="mt-0 w-full">
                  <img
                    src={gavalonFullLogo.src}
                    alt="GAVALON"
                    className="h-auto w-full max-w-[min(100%,440px)] object-contain object-left"
                  />
                </h1>
              </Reveal>

              <Reveal delay={120} variant="up">
                <p className="mt-5 max-w-2xl text-left text-sm font-medium uppercase tracking-[0.14em] text-cyan-100/75 md:text-[15px]">
                  {hero.subtitle}
                </p>
              </Reveal>

              <Reveal delay={220} variant="up">
                <p className="mt-6 max-w-3xl text-2xl font-semibold leading-[1.35] text-slate-50 md:text-[2rem]">
                  {hero.headline}
                </p>
              </Reveal>

              <Reveal delay={320} variant="up">
                <p className="mt-6 max-w-3xl text-base leading-8 text-slate-100/80 md:text-lg">
                  {hero.description}
                </p>
              </Reveal>

              <Reveal delay={420} variant="up">
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="https://npc-gavalon.com"
                    target="_blank"
                    rel="noreferrer noopener"
                    className={gavalonBtn}
                  >
                    {hero.visitGavalon}
                    <ButtonArrow />
                  </a>
                  <a href="/contact" className={contactBtnDark}>
                    {hero.contactUs}
                  </a>
                </div>
              </Reveal>
            </div>

            <div className="relative">
              <div className="absolute -left-10 top-0 h-36 w-36 rounded-full bg-sky-400/18 blur-3xl" />
              <div className="absolute -right-12 bottom-2 h-40 w-40 rounded-full bg-emerald-300/12 blur-3xl" />

              <Reveal delay={280} variant="right" className="relative overflow-hidden rounded-[34px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_20px_60px_rgba(2,6,23,0.28)] backdrop-blur md:p-8">
                <div className="grid gap-4">
                  {(hero.cards ?? []).map((card, i) => (
                    <Reveal key={card.title} delay={400 + i * 110} variant="up">
                      <HeroCard title={card.title} body={card.body} />
                    </Reveal>
                  ))}
                </div>

                <Reveal delay={400 + (hero.cards?.length ?? 0) * 110} variant="up">
                  <div className="mt-6 rounded-[28px] border border-cyan-200/15 bg-slate-950/20 p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-100/70">
                      {hero.panelLabel}
                    </p>
                    <p className="mt-3 text-base leading-8 text-slate-100/82">
                      {hero.panelBody}
                    </p>
                  </div>
                </Reveal>
              </Reveal>
            </div>
          </div>
        </RevealSection>

        <GavalonOverviewSection sectionX={sectionX} overview={overview} />

        <RevealSection as="section" id="benefits" className={`bg-[#f4f8fc] ${sectionX} py-24`}>
          <div className="mx-auto max-w-6xl">
            <SectionTitle
              eyebrow={benefits.eyebrow}
              title={benefits.title}
              description={benefits.description}
              center
            />

            <div className="mt-10 grid auto-rows-fr gap-6 md:grid-cols-2 xl:grid-cols-3">
              {(benefits.items ?? []).map((benefit, index, items) => (
                <Reveal
                  key={benefit.title}
                  as="article"
                  delay={220 + index * 100}
                  variant="scale"
                  className={`flex h-full flex-col rounded-[28px] border border-slate-200/70 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)] md:p-7 ${
                    index === items.length - 1 ? "md:col-span-2 xl:col-span-1" : ""
                  }`}
                >
                  <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-700/80">
                    {benefit.title}
                  </div>
                  <p className="mt-3 text-sm leading-7 text-slate-600 md:text-[15px]">{benefit.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </RevealSection>

        <RevealSection as="section" className={`bg-white ${sectionX} py-24`}>
          <div className="mx-auto max-w-6xl">
            <SectionTitle
              eyebrow={capabilities.eyebrow}
              title={capabilities.title}
              description={capabilities.description}
            />

            <div className="mt-10 grid gap-3 md:grid-cols-2">
              {(capabilities.items ?? []).map((item, index) => (
                <Reveal
                  key={item}
                  delay={220 + index * 70}
                  variant={index % 2 === 0 ? "left" : "right"}
                  className="flex gap-4 rounded-2xl border border-slate-200/70 bg-white p-5 shadow-[0_4px_12px_rgba(15,23,42,0.02)]"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#0b639b,#62e5da)]">
                    <svg viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
                      <path
                        d="M4.5 10.5L7.8 13.8L15.5 6.5"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <p className="text-sm font-medium leading-6 text-slate-800 md:text-[15px]">{item}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </RevealSection>

        <GavalonIndustriesSection sectionX={sectionX} industries={industries} />

        <RevealSection as="section" id="partner" className={`bg-[#f4f8fc] ${sectionX} py-24`}>
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              eyebrow={partner.eyebrow}
              title={partner.title}
              highlight={partner.highlight}
              center
            />

            <Reveal delay={200} variant="up">
              <p className="mx-auto mt-8 max-w-4xl text-center text-base leading-8 text-slate-600 md:text-lg">
                {partner.introBefore}{" "}
                <strong className="text-slate-900">{partner.aileenName}</strong>{" "}
                {partner.introMiddle}{" "}
                <strong className="text-slate-900">{partner.npcName}</strong>{" "}
                {partner.introAfter}
              </p>
            </Reveal>

            <div className="mt-12 grid gap-5 lg:grid-cols-2">
              {(partner.cards ?? []).map((card, index) => {
                const logoMeta = PARTNER_LOGOS[card.id] ?? PARTNER_LOGOS.aileen;
                return (
                  <Reveal
                    key={card.id}
                    as="article"
                    delay={300 + index * 140}
                    variant={index === 0 ? "left" : "right"}
                    className="rounded-[30px] border border-slate-200/80 bg-white p-8 shadow-[0_16px_48px_rgba(15,23,42,0.06)]"
                  >
                    <img
                      src={logoMeta.logo.src}
                      alt={card.logoAlt}
                      className={logoMeta.logoClass}
                    />
                    <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-700/80">
                      {card.title}
                    </p>
                    <p className="mt-4 text-base leading-8 text-slate-600 md:text-lg">{card.body}</p>
                  </Reveal>
                );
              })}
            </div>

            <Reveal delay={560} variant="up">
              <p className="mx-auto mt-10 max-w-4xl text-center text-base leading-8 text-slate-600 md:text-lg">
                {partner.closing}
              </p>
            </Reveal>
          </div>
        </RevealSection>

        <GavalonWhySection sectionX={sectionX} />
      </main>

      <SectionContactFooter />
    </div>
  );
}
