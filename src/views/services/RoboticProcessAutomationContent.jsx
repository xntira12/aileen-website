"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar";
import RpaHeroSection from "@/components/RpaHeroSection";
import RpaBenefitsCards from "@/components/RpaBenefitsCards";
import RpaFeaturesAccordion from "@/components/RpaFeaturesAccordion";
import SectionContactFooter from "@/components/SectionContactFooter";
import { useLocale } from "@/i18n/LocaleProvider";
import { getServiceContent } from "@/i18n/messages";
import rpaSceneImage from "@/assets/img/RPA/rpa.png";

export default function RoboticProcessAutomationContent() {
  const { locale } = useLocale();
  const content = getServiceContent(locale, "rpa");
  const alwaysOn = content.alwaysOn ?? {};
  const benefits = content.benefits ?? {};
  const chooseGuides = content.chooseGuides ?? {};

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <main className="overflow-hidden">
        <RpaHeroSection />

        <section id="always-on" className="relative z-10 -mt-12 px-6 md:px-10">
          <div className="mx-auto max-w-6xl rounded-[32px] border border-slate-200/80 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] md:p-8">
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl py-8 px-2">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-700">
                  {alwaysOn.eyebrow}
                </p>
                <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
                  <span className="block">{alwaysOn.titleLine1}</span>
                  <span className="mt-1 block bg-[linear-gradient(90deg,#0b639b,#62e5da)] bg-clip-text text-transparent">
                    {alwaysOn.titleLine2}
                  </span>
                </h2>
              </div>
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4 pb-10">
              {(alwaysOn.valuePillars ?? []).map((item) => (
                <div
                  key={item.title}
                  className="group relative overflow-hidden rounded-[28px] border border-slate-100 bg-[linear-gradient(180deg,#fbfeff_0%,#ffffff_52%,#f6fbff_100%)] p-6 shadow-[0_4px_12px_rgba(15,23,42,0.02)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_18px_rgba(15,23,42,0.035)]"
                >
                  <div className="relative flex items-start justify-between gap-4">
                    <div className="inline-flex items-center gap-2 rounded-full border border-slate-100 bg-cyan-50/85 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-800">
                      <span className="h-2 w-2 rounded-full bg-[linear-gradient(90deg,#0b639b,#62e5da)]" />
                      {item.value}
                    </div>
                  </div>
                  <div className="relative mt-6 h-px w-full bg-gradient-to-r from-cyan-200 via-slate-200 to-transparent" />
                  <h3 className="relative mt-5 text-xl font-semibold leading-8 tracking-tight text-slate-900">{item.title}</h3>
                  <p className="relative mt-3 text-sm leading-7 text-slate-600">{item.body}</p>
                  <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#0b639b,#62e5da)] opacity-90" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-6 py-20 md:px-10 md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="py-6 md:py-10">
              <div className="relative mx-auto w-full max-w-[940px]">
                <Image src={rpaSceneImage} alt="RPA working across connected systems" priority className="h-auto w-full object-contain" />
              </div>
            </div>
          </div>
        </section>

        <RpaBenefitsCards
          benefits={benefits.items}
          eyebrow={benefits.eyebrow}
          title={benefits.title}
          subtitle={benefits.subtitle}
          description={benefits.description}
        />

        <RpaFeaturesAccordion features={content.features} accordion={content.accordion} />

        <section className="bg-[#f4f8fc] px-6 py-24 md:px-10">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto mb-4 max-w-2xl text-center">
              <span className="lv8-pill">
                <span className="lv8-hdot" />
                {chooseGuides.eyebrow}
              </span>
              <h2 className="mt-5 text-3xl font-extrabold leading-[1.05] tracking-tight text-slate-900 md:text-5xl">
                {chooseGuides.title}
                <span className="mt-1 block bg-[linear-gradient(90deg,#0b639b,#62e5da)] bg-clip-text text-transparent">
                  {chooseGuides.titleHighlight}
                </span>
              </h2>
              <p className="mt-5 text-base leading-8 text-slate-500">{chooseGuides.description}</p>
            </div>
            <div className="mt-12 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {(chooseGuides.items ?? []).map((guide) => (
                <div
                  key={guide.title}
                  className="group flex gap-4 rounded-2xl border border-slate-200/70 bg-white p-5 shadow-[0_4px_12px_rgba(15,23,42,0.02)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_18px_rgba(15,23,42,0.035)]"
                >
                  <div className="mt-0.5 shrink-0">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[linear-gradient(135deg,#0b639b,#62e5da)]">
                      <svg viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
                        <path d="M4.5 10.5L7.8 13.8L15.5 6.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-600">{guide.eyebrow}</p>
                    <h3 className="mt-1.5 text-sm font-bold leading-6 text-slate-900">{guide.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-500">{guide.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SectionContactFooter />
    </div>
  );
}
