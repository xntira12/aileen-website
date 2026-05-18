import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "../components/Navbar";
import SectionContactFooter from "../components/SectionContactFooter";
import { getNewsArticle, NEWS_ARTICLES } from "../content/news";
import {
  ArticleCard,
  ArticleCover,
  GalleryTile,
  getCategoryTheme,
  SectionHeading,
} from "../components/news/NewsComponents";

export default function NewsArticle({ slug }) {
  const article = getNewsArticle(slug);

  if (!article) notFound();

  const relatedArticles = NEWS_ARTICLES.filter((item) => item.slug !== article.slug);
  const theme = getCategoryTheme(article.category);

  return (
    <div className="min-h-screen overflow-hidden bg-[#06101d] text-white">
      <div className="pointer-events-none fixed inset-x-0 top-0 z-[49] h-24 bg-gradient-to-b from-[#06101d] via-[#06101d]/80 to-transparent" />
      <Navbar />

      <main className="relative">
        <section className="relative overflow-hidden border-b border-white/10">
          <div className="pointer-events-none absolute inset-0">
            <div className={`absolute left-[-8%] top-24 h-80 w-80 rounded-full blur-3xl ${theme.glow}`} />
            <div className="absolute right-[-10%] top-10 h-[28rem] w-[28rem] rounded-full bg-cyan-400/10 blur-3xl" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.12),transparent_36%),linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0))]" />
          </div>

          <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-32 md:px-8 md:pb-20 md:pt-36">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100/85 transition hover:border-cyan-300/30 hover:bg-white/10"
            >
              <span aria-hidden>←</span>
              กลับไปหน้าข่าวสาร
            </Link>

            <div className="mt-8 grid gap-8 xl:grid-cols-[minmax(0,1.05fr)_380px] xl:items-start">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className={[
                      "rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em]",
                      theme.badge,
                    ].join(" ")}
                  >
                    {article.category}
                  </span>
                  <span className="text-sm text-slate-400">{article.date}</span>
                  <span className="text-sm text-slate-400">{article.location}</span>
                </div>

                <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-[-0.04em] text-white md:text-5xl lg:text-6xl">
                  {article.title}
                </h1>

                <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
                  {article.excerpt}
                </p>

                <div className="mt-8 flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/12 bg-white/[0.05] px-3 py-1.5 text-xs text-slate-100"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur md:p-7">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-200/80">
                  ไฮไลต์
                </p>
                <ul className="mt-5 space-y-3">
                  {article.highlights.map((item, index) => (
                    <li
                      key={item}
                      className="rounded-[20px] border border-white/8 bg-black/10 p-4"
                    >
                      <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-100/60">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <p className="mt-2 text-sm leading-7 text-slate-200">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-12 md:px-8 md:py-16">
          <ArticleCover article={article} tall className="rounded-[32px]" />
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-10 md:px-8">
          <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_300px]">
            <article className="rounded-[32px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur md:p-8">
              {article.sections.map((section) => (
                <div key={section.heading} className="mb-10 last:mb-0">
                  <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white md:text-3xl">
                    {section.heading}
                  </h2>
                  <div className="mt-5 space-y-4 text-base leading-8 text-slate-300">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              ))}
            </article>

            <aside className="space-y-5 xl:sticky xl:top-28 xl:self-start">
              <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-200/80">
                  ข้อมูลบทความ
                </p>
                <dl className="mt-5 space-y-4 text-sm leading-7 text-slate-300">
                  <div>
                    <dt className="text-xs uppercase tracking-[0.18em] text-slate-500">หมวดหมู่</dt>
                    <dd className="mt-1 text-white">{article.category}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-[0.18em] text-slate-500">วันที่</dt>
                    <dd className="mt-1 text-white">{article.date}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-[0.18em] text-slate-500">สถานที่</dt>
                    <dd className="mt-1 text-white">{article.location}</dd>
                  </div>
                </dl>
              </div>

              <div className="rounded-[28px] border border-cyan-300/12 bg-gradient-to-br from-cyan-400/10 via-sky-400/5 to-transparent p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-100/80">
                  สอบถามเพิ่มเติม
                </p>
                <p className="mt-4 text-sm leading-7 text-slate-200">
                  หากต้องการรายละเอียดเพิ่มเติมเกี่ยวกับงาน แนวคิด หรือโซลูชั่นที่เกี่ยวข้อง
                  ติดต่อทีมงาน Aileen Solutions ได้โดยตรง
                </p>
                <Link
                  href="/contact"
                  className="mt-6 inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100"
                >
                  ติดต่อทีมงาน
                </Link>
              </div>
            </aside>
          </div>
        </section>

        {article.media.gallery?.length > 0 ? (
          <section className="mx-auto max-w-7xl px-6 py-10 md:px-8 md:py-14">
            <SectionHeading
              eyebrow="Gallery"
              title="ภาพกิจกรรม"
              description="ภาพจากงานและกิจกรรม — สามารถอัปเดตรูปจริงได้เมื่อพร้อม"
            />

            <div className="grid gap-5 md:grid-cols-3">
              {article.media.gallery.map((item) => (
                <GalleryTile
                  key={item.title}
                  title={item.title}
                  ratio={item.ratio}
                  category={article.category}
                />
              ))}
            </div>
          </section>
        ) : null}

        <section className="mx-auto max-w-7xl px-6 pb-16 pt-4 md:px-8 md:pb-20">
          <SectionHeading eyebrow="More Stories" title="ข่าวสารและกิจกรรมอื่น ๆ" />

          <div className="grid gap-5 md:grid-cols-2">
            {relatedArticles.map((item) => (
              <ArticleCard key={item.slug} article={item} />
            ))}
          </div>
        </section>
      </main>

      <SectionContactFooter />
    </div>
  );
}

