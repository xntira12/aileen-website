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

const latestPublishedAt = NEWS_ARTICLES.reduce(
  (latest, article) => (article.publishedAt > latest ? article.publishedAt : latest),
  NEWS_ARTICLES[0]?.publishedAt ?? "",
);

const latestUpdateLabel = latestPublishedAt
  ? new Intl.DateTimeFormat("th-TH", { month: "long", year: "numeric" }).format(
      new Date(`${latestPublishedAt}T00:00:00`),
    )
  : "-";

const pageStats = [
  { value: String(NEWS_ARTICLES.length), label: "ข่าวสารและกิจกรรม", accent: "from-sky-500/20 to-cyan-400/10" },
  { value: String(NEWS_ARTICLES.length), label: "ข่าวล่าสุด", accent: "from-emerald-500/20 to-teal-400/10" },
  { value: latestUpdateLabel, label: "อัปเดตล่าสุด", accent: "from-amber-500/20 to-orange-400/10" },
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
          <div className="relative overflow-hidden rounded-[40px] border border-slate-200/80 bg-[linear-gradient(135deg,#f8fbff_0%,#eef6ff_48%,#f6fbff_100%)] px-6 py-7 md:px-10 md:py-10">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(148,163,184,0.11)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.11)_1px,transparent_1px)] [background-size:56px_56px]" />
              <div className="absolute -left-10 top-10 h-44 w-44 rounded-full bg-sky-200/40 blur-3xl" />
              <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-emerald-200/35 blur-3xl" />
              <div className="absolute right-[14%] top-[16%] h-64 w-64 rounded-full bg-sky-700/12 blur-3xl" />
              <div className="absolute right-[6%] bottom-[8%] h-56 w-56 rounded-full bg-teal-400/18 blur-3xl" />
              <div className="absolute bottom-0 left-1/3 h-48 w-48 rounded-full bg-cyan-200/25 blur-3xl" />
              <div className="absolute inset-y-0 right-0 w-[42%] bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.16),transparent_52%)]" />
            </div>

            <div className="relative">
              <div
                className={`max-w-4xl transition-all duration-700 ${
                  heroInView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
              >
                <span className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/90 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-sky-700 backdrop-blur">
                  <span className="h-2 w-2 rounded-full bg-sky-500" />
                  News & Events
                </span>

                <h1 className="mt-6 max-w-4xl text-[2.8rem] font-semibold leading-[0.95] tracking-[-0.06em] text-slate-950 md:text-[4.75rem]">
                  ข่าวสารและกิจกรรม
                  <span className="mt-2 block bg-[linear-gradient(90deg,#0f172a_0%,#0f6aa8_46%,#0ea5e9_100%)] bg-clip-text text-transparent">
                    จาก Aileen Solutions
                  </span>
                </h1>

                <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 md:text-[1.05rem]">
                  รวมข่าวสาร กิจกรรม และมุมมองจากงานสัมมนา งานเทคโนโลยี และการแลกเปลี่ยนความรู้
                  ที่สะท้อนแนวทางการประยุกต์ใช้ Process, Automation และ AI
                  ในองค์กรให้เกิดผลลัพธ์ที่ชัดเจน ใช้งานได้จริง และต่อยอดสู่การเติบโตอย่างยั่งยืน
                </p>

                <div className="mt-7 flex flex-wrap gap-2.5">
                  {topicTags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/70 bg-white/85 px-3.5 py-2 text-xs font-medium text-slate-600 backdrop-blur"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <a
                    href={`#featured-${featuredArticle.slug}`}
                    className="inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
                  >
                    ดูข่าวเด่นล่าสุด
                  </a>
                  <a
                    href="#all-news"
                    className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white/85 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white"
                  >
                    ดูข่าวทั้งหมด
                  </a>
                </div>
              </div>
            </div>

            <div
              className={`relative mt-8 grid gap-4 transition-all duration-700 md:grid-cols-3 ${
                heroInView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: "220ms" }}
            >
              {pageStats.map((item) => (
                <div
                  key={item.label}
                  className="group relative overflow-hidden rounded-[26px] border border-white/70 bg-white/86 p-5 backdrop-blur"
                >
                  <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${item.accent}`} />
                  <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-sky-100/60 blur-2xl transition duration-300 group-hover:scale-110" />
                  <div className="relative">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                      Snapshot
                    </p>
                    <div className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-slate-950 md:text-[2.35rem]">
                      {item.value}
                    </div>
                    <div className="mt-2 text-sm text-slate-500">{item.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id={`featured-${featuredArticle.slug}`}
          className="mx-auto max-w-7xl px-6 py-14 md:px-8 md:py-16"
        >
          <SectionHeading eyebrow="Featured Story" title="ข่าวไฮไลต์ล่าสุด" />
          <FeaturedArticle article={featuredArticle} />
        </section>

        <section id="all-news" className="mx-auto mt-12 max-w-7xl px-6 pb-16 md:px-8 md:pb-20">
          <SectionHeading eyebrow="All Stories" title="ข่าวสารและกิจกรรมทั้งหมด" compact />

          {remainingArticles.length > 0 ? (
            <div className="mt-6 grid gap-4 md:mt-8 md:grid-cols-2 xl:grid-cols-3">
              {remainingArticles.map((item) => (
                <ArticleCard key={item.slug} article={item} compact />
              ))}
            </div>
          ) : (
            <div className="rounded-[28px] border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
              <p className="text-lg font-medium text-slate-900">ยังไม่มีข่าวในขณะนี้</p>
              <p className="mt-2 text-sm text-slate-500">
                สามารถกลับมาเช็กอัปเดตใหม่ได้ในภายหลัง
              </p>
            </div>
          )}
        </section>
      </main>

      <SectionContactFooter />
    </div>
  );
}
