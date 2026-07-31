"use client";

import Navbar from "@/components/Navbar";
import LcbpHeroSection from "@/components/LcbpHeroSection";
import RpaBenefitsCards from "@/components/RpaBenefitsCards";
import LcbpFeaturesAccordion from "@/components/LcbpFeaturesAccordion";
import SectionContactFooter from "@/components/SectionContactFooter";
import { useLocale } from "@/i18n/LocaleProvider";
import { getServiceContent } from "@/i18n/messages";

export default function LowCodeBusinessOrchestratorContent() {
  const { locale } = useLocale();
  const content = getServiceContent(locale, "lcbp");
  const benefits = content.benefits ?? {};

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <main className="overflow-hidden">
        <LcbpHeroSection />
        <LcbpFeaturesAccordion features={content.features} accordion={content.accordion} />
        <RpaBenefitsCards
          benefits={benefits.items}
          eyebrow={benefits.eyebrow}
          title={benefits.title}
          subtitle={benefits.subtitle}
          description={benefits.description}
        />
      </main>
      <SectionContactFooter />
    </div>
  );
}
