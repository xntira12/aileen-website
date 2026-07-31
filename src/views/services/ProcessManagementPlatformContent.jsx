"use client";

import Navbar from "@/components/Navbar";
import PmpHeroSection from "@/components/PmpHeroSection";
import RpaBenefitsCards from "@/components/RpaBenefitsCards";
import PmpFeaturesAccordion from "@/components/PmpFeaturesAccordion";
import SectionContactFooter from "@/components/SectionContactFooter";
import { useLocale } from "@/i18n/LocaleProvider";
import { getServiceContent } from "@/i18n/messages";

export default function ProcessManagementPlatformContent() {
  const { locale } = useLocale();
  const content = getServiceContent(locale, "pmp");
  const benefits = content.benefits ?? {};
  const video = content.video ?? {};

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <main className="overflow-hidden">
        <PmpHeroSection />
        <RpaBenefitsCards
          benefits={benefits.items}
          eyebrow={benefits.eyebrow}
          title={benefits.title}
          subtitle={benefits.subtitle}
          description={benefits.description}
        />
        <PmpFeaturesAccordion features={content.features} accordion={content.accordion} />
        <section className="mx-auto max-w-4xl px-6 py-16 md:px-8 md:py-20">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">{video.title}</h2>
            <p className="mt-2 text-sm text-slate-500">{video.subtitle}</p>
          </div>
          <div
            className="overflow-hidden rounded-2xl border border-slate-200 bg-black shadow-[0_16px_48px_rgba(15,23,42,0.12)]"
            style={{ aspectRatio: "16/9" }}
          >
            <iframe
              src="https://www.youtube.com/embed/qXYR-0eztjE?cc_load_policy=1&cc_lang_pref=en"
              title={video.iframeTitle}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full"
            />
          </div>
        </section>
      </main>
      <SectionContactFooter />
    </div>
  );
}
