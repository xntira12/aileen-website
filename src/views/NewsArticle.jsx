import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "../components/Navbar";
import SectionContactFooter from "../components/SectionContactFooter";
import NewsGallery from "../components/news/NewsGallery";
import { getNewsArticle, NEWS_ARTICLES } from "../content/news";
import {
  ArticleCard,
  SectionHeading,
} from "../components/news/NewsComponents";

export default function NewsArticle({ slug }) {
  const article = getNewsArticle(slug);

  if (!article) notFound();

  const relatedArticles = NEWS_ARTICLES.filter((item) => item.slug !== article.slug);

  return (
    <div className="min-h-screen bg-[#f5f8fb] text-slate-900">
      <Navbar />

      <main className="pb-4 pt-28 md:pt-32">
        <section className="mx-auto max-w-7xl px-6 py-4 md:px-8 md:py-6">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
          >
            <span aria-hidden>←</span>
            กลับไปหน้าข่าวสาร
          </Link>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-10 md:px-8 md:pb-12">
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_280px]">
            <article className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.05)]">
              <div className="px-6 py-6 md:px-8 md:py-7">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-sm text-slate-500">{article.date}</span>
                  <span className="text-sm text-slate-500">{article.location}</span>
                </div>

                <h1 className="mt-4 max-w-4xl text-3xl font-semibold leading-tight tracking-[-0.03em] text-slate-900 md:text-4xl lg:text-[2.7rem]">
                  {article.title}
                </h1>

                <p className="mt-4 max-w-3xl text-[15px] leading-7 text-slate-600 md:text-base">
                  {article.excerpt}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-t border-slate-200 px-6 py-6 md:px-8 md:py-8">
                {article.sections.map((section) => (
                  <div key={section.heading} className="mb-9 last:mb-0">
                    <h2 className="text-xl font-semibold tracking-[-0.02em] text-slate-900 md:text-2xl">
                      {section.heading}
                    </h2>
                    <div className="mt-4 space-y-4 text-[15px] leading-7 text-slate-600 md:text-base">
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <aside className="space-y-5 xl:sticky xl:top-28 xl:self-start">
              <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_12px_32px_rgba(15,23,42,0.04)]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                  ข้อมูลบทความ
                </p>
                <dl className="mt-5 space-y-4 text-sm leading-7 text-slate-600">
                  <div>
                    <dt className="text-xs uppercase tracking-[0.18em] text-slate-400">วันที่</dt>
                    <dd className="mt-1 text-slate-900">{article.date}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-[0.18em] text-slate-400">สถานที่</dt>
                    <dd className="mt-1 text-slate-900">{article.location}</dd>
                  </div>
                </dl>
              </div>

              <div className="rounded-[28px] border border-slate-200 bg-[linear-gradient(135deg,#ffffff_0%,#eef7ff_100%)] p-6 shadow-[0_12px_32px_rgba(15,23,42,0.04)]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-700">
                  สอบถามเพิ่มเติม
                </p>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  หากต้องการรายละเอียดเพิ่มเติมเกี่ยวกับงาน แนวคิด หรือโซลูชันที่เกี่ยวข้อง
                  สามารถติดต่อทีม Aileen Solutions ได้โดยตรง
                </p>
                <Link
                  href="/contact"
                  className="mt-6 inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  ติดต่อทีมงาน
                </Link>
              </div>
            </aside>
          </div>
        </section>

        {article.media.gallery?.length > 0 ? (
          <section className="mx-auto max-w-7xl px-6 py-2 md:px-8 md:py-4">
            <SectionHeading
              eyebrow="Gallery"
              title="ภาพกิจกรรม"
              description="พื้นที่สำหรับภาพบรรยากาศและภาพประกอบของงาน สามารถอัปเดตรูปจริงได้ภายหลัง"
            />

            <NewsGallery items={article.media.gallery} category={article.category} />
          </section>
        ) : null}

        <section className="mx-auto max-w-7xl px-6 pb-16 pt-14 md:px-8 md:pb-20">
          <div className="rounded-[32px] border border-slate-200 bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_100%)] px-5 py-6 shadow-[0_16px_40px_rgba(15,23,42,0.04)] md:px-7 md:py-7">
            <SectionHeading
              eyebrow="More Stories"
              title="ข่าวสารและกิจกรรมอื่น"
              description="ส่วนแนะนำข่าวเพิ่มเติมสำหรับอ่านต่อ ไม่ใช่เนื้อหาของข่าวนี้โดยตรง"
              compact
            />

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {relatedArticles.map((item) => (
                <ArticleCard key={item.slug} article={item} compact />
              ))}
            </div>
          </div>
        </section>
      </main>

      <SectionContactFooter />
    </div>
  );
}
