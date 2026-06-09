"use client";

import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import SectionContactFooter from "../components/SectionContactFooter";
import { NEWS_ARTICLES } from "../content/news";
import {
  ArticleCard,
  CategoryFilter,
  FeaturedArticle,
  SectionHeading,
} from "../components/news/NewsComponents";

const [featuredArticle, ...restArticles] = NEWS_ARTICLES;

const pageStats = [
  { value: String(NEWS_ARTICLES.length), label: "ข่าวสารและกิจกรรม" },
  { value: "3", label: "หมวดหมู่หลัก" },
  { value: "พ.ค. 69", label: "อัปเดตล่าสุด" },
];

const topicTags = [
  "ความปลอดภัย",
  "AI & Automation",
  "อุตสาหกรรม",
  "Digital Transformation",
];

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
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredArticles =
    activeCategory === "all"
      ? restArticles
      : restArticles.filter((item) => item.category === activeCategory);

  return (
    <div className="min-h-screen overflow-hidden bg-[#06101d] text-white">
      <div className="pointer-events-none fixed inset-x-0 top-0 z-[49] h-24 bg-gradient-to-b from-[#06101d] via-[#06101d]/80 to-transparent" />
      <Navbar />

      <main className="relative">
        <section
          ref={heroRef}
          className="relative overflow-hidden border-b border-white/10"
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-[-8%] top-24 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl" />
            <div className="absolute right-[-10%] top-10 h-[28rem] w-[28rem] rounded-full bg-emerald-400/10 blur-3xl" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.12),transparent_36%),linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0))]" />
            <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:72px_72px]" />
          </div>

          <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-32 md:px-8 md:pb-20 md:pt-36">
            <div
              className={`max-w-3xl transition-all duration-700 ${
                heroInView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-cyan-100">
                <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.8)]" />
                News & Events
              </span>

              <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-[-0.04em] text-white md:text-6xl">
                ข่าวสารและกิจกรรม
                <span className="block bg-gradient-to-r from-cyan-300 via-teal-200 to-sky-300 bg-clip-text text-transparent">
                  จาก Aileen Solutions
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
                ติดตามข่าวสาร กิจกรรม และมุมมองจากงานสัมมนา งานแสดงเทคโนโลยี
                และเวทีแลกเปลี่ยนความรู้ ที่สะท้อนแนวทางการขับเคลื่อนองค์กรด้วย Process,
                Automation และ AI อย่างเป็นรูปธรรม
              </p>

              <div className="mt-8 flex flex-wrap gap-2">
                {topicTags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-slate-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div
              className={`mt-10 grid gap-4 sm:grid-cols-3 transition-all duration-700 ${
                heroInView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
              style={{ transitionDelay: "120ms" }}
            >
              {pageStats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-3xl border border-white/10 bg-white/[0.04] px-5 py-5 backdrop-blur transition hover:border-cyan-300/20 hover:bg-white/[0.06]"
                >
                  <div className="text-3xl font-semibold tracking-[-0.04em] text-white">
                    {item.value}
                  </div>
                  <div className="mt-2 text-sm text-slate-300">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-20">
          <SectionHeading
            eyebrow="Featured Story"
            title="ข่าวเด่นประจำช่วงนี้"
            description="บทความล่าสุดที่สะท้อนทิศทางและประสบการณ์จากเวทีสำคัญของ Aileen Solutions"
          />

          <FeaturedArticle article={featuredArticle} />
        </section>

        <section id="all-news" className="mx-auto max-w-7xl px-6 pb-16 md:px-8 md:pb-20">
          <SectionHeading
            eyebrow="All Stories"
            title="ข่าวสารและกิจกรรมทั้งหมด"
            description="เลือกดูตามหมวดหมู่ หรือเลื่อนอ่านข่าวทั้งหมดจาก Aileen Solutions"
          />

          <div className="mb-8">
            <CategoryFilter active={activeCategory} onChange={setActiveCategory} />
          </div>

          {filteredArticles.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2">
              {filteredArticles.map((item) => (
                <ArticleCard key={item.slug} article={item} />
              ))}
            </div>
          ) : (
            <div className="rounded-[28px] border border-dashed border-white/15 bg-white/[0.02] px-6 py-14 text-center">
              <p className="text-lg font-medium text-white">ยังไม่มีข่าวในหมวดนี้</p>
              <p className="mt-2 text-sm text-slate-400">ลองเลือกหมวดอื่นหรือดูข่าวทั้งหมด</p>
              <button
                type="button"
                onClick={() => setActiveCategory("all")}
                className="mt-6 inline-flex rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                แสดงข่าวทั้งหมด
              </button>
            </div>
          )}
        </section>
      </main>

      <SectionContactFooter />
    </div>
  );
}
