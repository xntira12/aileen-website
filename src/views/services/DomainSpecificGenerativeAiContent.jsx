"use client";

import Navbar from "@/components/Navbar";
import DsaiHeroSection from "@/components/DsaiHeroSection";
import RpaBenefitsCards from "@/components/RpaBenefitsCards";
import DsaiFeaturesAccordion from "@/components/DsaiFeaturesAccordion";
import SectionContactFooter from "@/components/SectionContactFooter";
import { useLocale } from "@/i18n/LocaleProvider";
import { getServiceContent } from "@/i18n/messages";

export default function DomainSpecificGenerativeAiContent() {
  const { locale } = useLocale();
  const content = getServiceContent(locale, "dsai");
  const benefits = content.benefits ?? {};

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <main className="overflow-hidden">
        <DsaiHeroSection />
        <DsaiFeaturesAccordion features={content.features} accordion={content.accordion} />
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
