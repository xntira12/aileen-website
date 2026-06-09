"use client";

import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import SectionContactFooter from "../components/SectionContactFooter";
import { NEWS_ARTICLES } from "../content/news";
import {
  ArticleCard,
  FeaturedArticle,
  SectionHeading,
} from "../components/news/NewsComponents";

const featuredArticle = NEWS_ARTICLES[0];
const remainingArticles = NEWS_ARTICLES.slice(1);

const pageStats = [
  { value: String(NEWS_ARTICLES.length), label: "ข่าวสารและกิจกรรม" },
  { value: "4", label: "ข่าวล่าสุด" },
  { value: "มิถุนายน 2026", label: "อัปเดตล่าสุด" },
];

const topicTags = ["AI & Automation", "Safety", "Digital Transformation", "Sustainability"];

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}

export default function News() {
  const [heroRef, heroInView] = useInView(0.1);

  return (
    <div className="min-h-screen bg-[#f5f8fb] text-slate-900">
      <Navbar />

      <main className="pb-4 pt-28 md:pt-32">
        <section ref={heroRef} className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="relative overflow-hidden rounded-[36px] border border-slate-200 bg-[linear-gradient(135deg,#ffffff_0%,#eef7ff_52%,#f8fbff_100%)] px-6 py-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)] md:px-10 md:py-12">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute left-0 top-0 h-44 w-44 rounded-full bg-sky-100 blur-3xl" />
              <div className="absolute right-0 top-10 h-52 w-52 rounded-full bg-emerald-100 blur-3xl" />
              <div className="absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(148,163,184,0.10)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.10)_1px,transparent_1px)] [background-size:56px_56px]" />
            </div>

            <div
              className={`relative max-w-3xl transition-all duration-700 ${
                heroInView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-sky-100 bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-sky-700 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-sky-500" />
                News & Events
              </span>

              <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.04em] text-slate-900 md:text-6xl">
                ข่าวสารและกิจกรรม
                <span className="block text-sky-700">จาก Aileen Solutions</span>
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
                รวมข่าวสาร กิจกรรม และมุมมองจากงานสัมมนา งานเทคโนโลยี และการแลกเปลี่ยนความรู้
                ที่สะท้อนแนวทางการประยุกต์ใช้ Process, Automation และ AI ในองค์กรอย่างเรียบง่ายและใช้งานได้จริง
              </p>

              <div className="mt-7 flex flex-wrap gap-2">
                {topicTags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div
              className={`relative mt-8 grid gap-4 sm:grid-cols-3 transition-all duration-700 ${
                heroInView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: "100ms" }}
            >
              {pageStats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.04)]"
                >
                  <div className="text-3xl font-semibold tracking-[-0.04em] text-slate-900">
                    {item.value}
                  </div>
                  <div className="mt-2 text-sm text-slate-500">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-14 md:px-8 md:py-16">
          <SectionHeading
            eyebrow="Featured Story"
            title="ข่าวไฮไลต์ล่าสุด"
           
          />

          <FeaturedArticle article={featuredArticle} />
        </section>

        <section id="all-news" className="mx-auto max-w-7xl px-6 pb-16 md:px-8 md:pb-20 mt-12">
          <SectionHeading
            eyebrow="All Stories"
            title="ข่าวสารและกิจกรรมทั้งหมด"
            
            compact
          />

          {remainingArticles.length > 0 ? (
            <div className="mt-6 grid gap-4 md:mt-8 md:grid-cols-2 xl:grid-cols-3">
              {remainingArticles.map((item) => (
                <ArticleCard key={item.slug} article={item} compact />
              ))}
            </div>
          ) : (
            <div className="rounded-[28px] border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
              <p className="text-lg font-medium text-slate-900">ยังไม่มีข่าวในขณะนี้</p>
              <p className="mt-2 text-sm text-slate-500">สามารถกลับมาเช็กอัปเดตใหม่ได้ในภายหลัง</p>
            </div>
          )}
        </section>
      </main>

      <SectionContactFooter />
    </div>
  );
}
